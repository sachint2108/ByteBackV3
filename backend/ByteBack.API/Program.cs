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

app.Run();

//Cors Policy to allow requests from the React frontend, both locally and on Render. 
//Adjust the URLs as needed for your deployment.