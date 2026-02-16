using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:3000", "https://your-frontend-name.onrender.com") //replace later with front end url
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