"use server";




export async function evaluateTradeIn(formData: any) {
  try {
    const { deviceType, model, storage, condition, serialNumber } = formData;

    if (!serialNumber || serialNumber.length < 8) {
      throw new Error("Invalid Serial Number or IMEI");
    }



    /*
    const imeiResponse = await fetch("https://api.imeicheck.net/v1/checks", {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.IMEI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deviceId: serialNumber,
            serviceId: 1
        }),
    });

    const imeiData = await imeiResponse.json();
    console.log("IMEI API Response:", imeiData);
    if (!imeiResponse.ok || imeiData.status === "failed") {
      throw new Error("Invalid or unsupported IMEI/Serial Number.");
    }

    */
    

    const aiPrompt = `
        You are an expert electronics appraiser in South Africa. 
        Estimate the fair trade-in value in ZAR (South African Rand) for this device:
        Device: Apple ${deviceType} ${model}
        Storage: ${storage}
        Condition: ${condition} (Note: Flawless = pristine, Good = minor wear, Fair = heavy wear, Cracked = broken glass/screen).
      
         Return ONLY a valid JSON object with a single key "estimatedValue" containing the integer amount. Do not include markdown formatting or any other text.
        Example: {"estimatedValue": 8500}
    `;

    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const aiResponse = await fetch(geminiURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [{ parts: [{ text: aiPrompt }] }]
        })
    });

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("Gemini Error Details:", aiData);
      const errorMsg = aiData.error?.message || "AI Pricing Engine failed.";
      throw new Error(`Google AI Error: ${errorMsg}`);
    }

    let rawAiText = aiData.candidates[0].content.parts[0].text;
    rawAiText = rawAiText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedEstimate = JSON.parse(rawAiText);

    return { 
      status: "success", 
      estimatedValue: parsedEstimate.estimatedValue 
    };
  }catch (err: any) {
    throw new Error(err.message || "Failed to evaluate Device");
  }

};