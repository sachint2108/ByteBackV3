using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Http; // this is included already behind the scences

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:3000", "https://bytebackv3.onrender.com") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddSingleton<FirestoreDb>(s => {
    string projectId = "byteback-6bb5d"; 
    
    bool isRender = Environment.GetEnvironmentVariable("RENDER") == "true";
    string keyPath;

    if (isRender) {
        keyPath = "/etc/secrets/firebase-key.json";
    } else {
        keyPath = Path.Combine(Directory.GetCurrentDirectory(), "firebase-key.json");
    }

    return new FirestoreDbBuilder {
        ProjectId = projectId,
        CredentialsPath = keyPath
    }.Build();
});

var app = builder.Build();

app.UseCors("AllowFrontend");


app.MapGet("/api/products", async (FirestoreDb db) => {
    try {
        var collection = db.Collection("Products");
        var snapshot = await collection.GetSnapshotAsync();
        
        var products = snapshot.Documents.Select(doc => {
            var dict = doc.ToDictionary();
            dict["id"] = doc.Id;
            return dict;
        });

        return Results.Ok(products);
    }
    catch (Exception ex) {
        return Results.Problem($"Firestore Error: {ex.Message}");
    }
});

//this with gets the a single product from the database, by ID
app.MapGet("/api/products/{id}", async (string id, FirestoreDb db) => {
    try {
        var collection = db.Collection("Products").Document(id);
        var snapshot = await collection.GetSnapshotAsync();

        if (!snapshot.Exists) return Results.NotFound($"Product with ID {id} not found.");

        var productData = snapshot.ToDictionary();
        productData["id"] = snapshot.Id;
        productData["firebaseDocId"] = snapshot.Id; // Includes Firestore document ID for reference

        return Results.Ok(productData);
    }
    catch (Exception ex) {
        return Results.Problem($"Firestore Error: {ex.Message}");
    }
});

    

app.MapPost("/api/products", async (ProductDto nProduct, FirestoreDb db) => {
    try 
    {
        var collection = db.Collection("Products");
        
        var productData = new Dictionary<string, object>
        {
            { "id", nProduct.id },
            { "name", nProduct.name },
            { "price", nProduct.price },
            { "category", nProduct.category },
            { "condition", nProduct.condition },
            { "isSold", nProduct.isSold },
            { "imageUrl", nProduct.imageUrl },
            { "description", nProduct.description }
        };

        var docRef = await collection.AddAsync(productData);
        return Results.Created($"/api/products/{docRef.Id}", productData);
    }
    catch (Exception ex) 
    {
        return Results.Problem($"Firestore Error: {ex.Message}");
    }
});

app.MapPut("/api/products/{id}", async (string id, ProductDto updatedProduct, FirestoreDb db) => {
    try 
    {
        var collection = db.Collection("Products").Document(id);
        var snapshot = await collection.GetSnapshotAsync();

        if (!snapshot.Exists) return Results.NotFound($"Product with ID {id} not found.");

        var productData = new Dictionary<string, object>
        {
            { "id", updatedProduct.id },
            { "name", updatedProduct.name },
            { "price", updatedProduct.price },
            { "category", updatedProduct.category },
            { "condition", updatedProduct.condition },
            { "isSold", updatedProduct.isSold },
            { "imageUrl", updatedProduct.imageUrl },
            { "description", updatedProduct.description }
        };

        await collection.SetAsync(productData, SetOptions.MergeAll);
        return Results.Ok(productData);
    }
    catch (Exception ex) 
    {
        return Results.Problem($"Firestore Error: {ex.Message}");
    }




    
});

app.MapDelete("/api/products/{id}", async (string id, FirestoreDb db) =>{
try {
    var refDoc = db.Collection("Products").Document(id);
    var snapshot = await refDoc.GetSnapshotAsync();

    if(!snapshot.Exists) return Results.NotFound(new{message = "Product not found"});

    await refDoc.DeleteAsync();
    return Results.Ok(new { message = "Product deleted" });
}
catch (Exception err)
    {
        return Results.Problem($"Error with Firestore: {err.Message}");
    }
    



});


app.MapGet("/api/reports/user-activity", async (FirestoreDb db) => {
    try {
        DateTime thirtyDaysAgo = DateTime.UtcNow.Date.AddDays(-30);
        var collection = db.Collection("user_activity");
        var query = collection.WhereGreaterThanOrEqualTo("timestamp", thirtyDaysAgo);
        var snapshot = await query.GetSnapshotAsync();

        var reportData = snapshot.Documents
            .Select(doc => {
                Timestamp ts = doc.GetValue<Timestamp>("timestamp");
                return ts.ToDateTime().ToLocalTime().Date;
            })
            .GroupBy(date => date)
            .Select(group => new {
                date = group.Key.ToString("MMM dd"), 
                count = group.Count()
            })
            .OrderBy(x => DateTime.ParseExact(x.date, "MMM dd", null))
            .ToList();

        return Results.Ok(reportData);
    }
    catch (Exception ex) {
        return Results.Problem($"Report Error: {ex.Message}");
    }
});

app.Run();



public class ProductDto 
    {
    public string id { get; set; } = "";        
    public string name { get; set; } = "";
    public double price { get; set; }
    public string category { get; set; } = "";
    public string condition { get; set; } = "";  
    public bool isSold { get; set; }
    public string imageUrl { get; set; } = "";
    public string description { get; set; } = "";
    }

//Cors Policy to allow requests from the React frontend, both locally and on Render. 
//Adjust the URLs as needed for your deployment.
// Not using controllers, rather usig something that catches web request and talks to firebase direclty
// I did this so that I don't have to have soo many folders and things stay in one place
// It speeds up the becuase it used less memory
// I preffred to use the built map methods from microsoft so I can route web traffic with needing controller classes