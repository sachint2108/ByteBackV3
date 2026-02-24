"use server";

import { db } from "@/firebase/config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function changeStatus(id: string, status: "Approved" | "Rejected") {
  try {
    const tradeInRef = doc(db, "TradeIns", id);
    await updateDoc(tradeInRef, {
      status: status,
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/admin/tradeins");
    return {success: true};
    }catch (err: any){
        throw new Error(err.message);
    }
}


export async function deleteTradeIn(id: string){
    try{
        const tradeInRef = doc(db, "TradeIns", id);
        await deleteDoc(tradeInRef);
        revalidatePath("/admin/tradeins");
        return {success: true};
    }catch (err: any){
        throw new Error ("Failed to Delete Record");
   }
}