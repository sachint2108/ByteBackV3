import { NextResponse } from "next/server";

export async function GET() {
  try {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    

    const fromDate = thirtyDaysAgo.toISOString();


    const PAYSTACK_SECRET = process.env.PAYSTACK_TEST_KEY;

    if (!PAYSTACK_SECRET) {
      console.error("Missing PAYSTACK_TEST_KEY in environment variables");
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction?status=success&from=${fromDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Paystack API Error:", errorData);
      return NextResponse.json({ error: "External API Error" }, { status: response.status });
    }

    const data = await response.json();


    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}