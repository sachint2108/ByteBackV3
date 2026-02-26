"use server"// This ensures it only runs on the backend server and no one can see what is happenign on the client side
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { match } from "assert";

const imageAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeProductImage(formData: FormData) {
    try {
      const file = formData.get("image") as File;
      if (!file) throw new Error("No image provided");

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString("base64");

      const model = imageAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        You are an expert tech reviewer. Analyze this image and identify the electronic device shown. 
        Return ONLY the brand and model name (e.g., 'Apple iPhone 14 Pro', 'Ipad Air', 'MacBook Air M2'). 
        Do not include any other text, punctuation, or explanation.
      `;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: file.type,
          },
        },
      ]);


      const keyword = result.response.text().trim();



      const querySnapshot = await getDocs(collection(db, "Products"));



      const allProducts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        category: data.category || "",
        price: data.price || 0,
        imageUrl: data.imageUrl || "",
      };
    });


      const search = keyword.toLowerCase().split(" ");

      const matchingProducts = allProducts.map(product => {
        const productName = (product.name || "").toLowerCase();
        let matchCount = 0;

        search.forEach(term => {
          if (productName.includes(term)) {
            matchCount++; // For every keyworded matched the it increases the likelihood of appearing
          }
        });

        return { ...product, matchCount };
      });


      const matchedProducts = matchingProducts
      .filter(product => product.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 4);


        return { 
        success: true, 
        keyword, 
        matchedProducts 
      };

    } catch (error) {
      console.error("Visual Search AI Error:", error);
      return { success: false, error: "Failed to Analyze Image." };
    }
};