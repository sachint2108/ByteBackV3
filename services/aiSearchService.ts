"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const aiSearch = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function aiSmartSearch(userQuery: string) {
  try {
    if (!userQuery) return { success: true, matchedProducts: [] };

    const querySnapshot = await getDocs(collection(db, "Products"));
    
    const products = querySnapshot.docs
      .map(doc => {
        const data = doc.data(); 
        
        return {
          id: doc.id,
          name: data.name || "",
          price: Number(data.price) || 0,
          category: data.category || "",
          description: data.description || "" 
        };
      })
      .filter(Boolean);
    
      const aiModel = aiSearch.getGenerativeModel({ model: "gemini-2.5-flash" });


      const prompt = `
      You are an expert AI shopping assistant for a tech store called ByteBack.
      A customer just searched for: "${userQuery}"

      Here is our current in-stock products in JSON format:
      ${JSON.stringify(products)}

      Analyze the customer's request. Pay close attention to:
      - Budget constraints (e.g., "under 15k" means price <= 15000)
      - Specs (e.g., storage sizes like 256GB, RAM, camera quality)
      - Brand or Category (e.g., "phone", "laptop", "Apple", "Samsung")

      Find the top products that best match their request. 
      Return ONLY a valid JSON array of the matching product IDs, ordered from best match to worst. 
      Example format: ["id1", "id2", "id3"]. 
      Do not include any markdown, explanation, or extra text. Just the JSON array.
    `;

    const result = await aiModel.generateContent(prompt);
    const rawResponse = result.response.text().trim();

    const cleanJsonFile = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const matchedIds: string[] = JSON.parse(cleanJsonFile);

    const matchedProducts = querySnapshot.docs
      .filter(doc => matchedIds.includes(doc.id))
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

    matchedProducts.sort((a, b) => matchedIds.indexOf(a.id) - matchedIds.indexOf(b.id));

    return { 
      success: true, 
      matchedProducts 
    };

    } catch (err) {
    console.error("Smart Search AI Error:", err);
    return { success: false, error: "Failed to Perform Smart Search." };
  }






}