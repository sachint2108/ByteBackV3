using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:3000", "https://your-frontend-name.onrender.com") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<FirestoreDb>(s => {
    string projectId = "byteback-6bb5d"; 
    
    string? jsonConfig = Environment.GetEnvironmentVariable("FIREBASE_CONFIG_JSON");

    if (!string.IsNullOrEmpty(jsonConfig)) {
        return new FirestoreDbBuilder {
            ProjectId = projectId,
            JsonCredentials = jsonConfig
        }.Build();
    } else {
        string keyPath = Path.Combine(Directory.GetCurrentDirectory(), "firebase-key.json");
        return new FirestoreDbBuilder {
            ProjectId = projectId,
            CredentialsPath = keyPath
        }.Build();
    }
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