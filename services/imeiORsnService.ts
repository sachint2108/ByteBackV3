"use server";

export async function checkStatus(serialNumber: string) {
  if (!serialNumber || serialNumber.length < 8) {
    throw new Error("Please enter a Valid Serial Number or IMEI.");
  }

  try{
    const imeiResponse = await fetch("https://api.imeicheck.net/v1/checks",{
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.IMEI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deviceId: serialNumber,
            serviceId: 1
        }),
        cache: 'no-store',

        });

        const imeiInfo = await imeiResponse.json();

        if (!imeiResponse.ok) {
        throw new Error(imeiInfo.message || `API Error: ${imeiResponse.status}`);
        }

        if (imeiInfo.status === "failed") {
        throw new Error(imeiInfo.message || "Invalid Serial or IMEI Number");
        }

        return imeiInfo.properties;

    }catch(err: any){
    console.error("IMEI SERVICE ERROR:", err.message)

    if (err.message.includes("timeout")|| err.name == "TimeoutError"){


    throw new Error("The Check Timed Out. Global Databases are slow, Please Try Again.");
    }
    throw new Error(err.message || "Failed to Check Device Status");
    }
}