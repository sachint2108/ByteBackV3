import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";

export const usePayment = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [load, setLoading] = useState(true);

  useEffect(() => {
    const readOrder = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "Orders", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        } else {
          toast.error("Order not found");
        }
      } catch {
        toast.error("Could not load payment details");
      } finally {
        setLoading(false);
      }
    };
    readOrder();
  }, [id]);


  const paystackConfig = useMemo(() => {
    if (!order) return null;

 
    const items = order.cartItems || order.items || [];
    
    
    const productSummary = items
      ?.map((item: any) => item.product?.name || item.name)
      .filter((name: string) => name && typeof name === "string")
      .join(", ");

    return {
      reference: new Date().getTime().toString(),
      email: order.customerInformation.email,
      amount: order.moneyInformation.total * 100,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY as string,
      currency: "ZAR",
      metadata: {
       
        ...(productSummary && { product_name: productSummary }),
        order_id: id,
        custom_fields: [
          {
            display_name: "Items Purchased",
            variable_name: "items_purchased",
            value: productSummary || "N/A",
          },
        ],
      },
    };
  }, [order, id]);

  const paymentSuccess = async (reference: any) => {
    try {
      const orderRef = doc(db, "Orders", id as string);
      
  
      await updateDoc(orderRef, {
        status: "Processing",
        paymentStatus: "Paid",
        paymentReference: reference.reference,
        paidAt: new Date().toISOString(),
      });

      toast.success("Payment Received");
      
     
      setTimeout(() => router.push("/"), 2000);
    } catch {
      toast.error("Payment successful but database update failed.");
    }
  };

  const handleClose = () => toast.error("Payment window closed.");

  return {
    order,
    load,
    id,
    paystackConfig,
    paymentSuccess,
    handleClose,
  };
};