import { useState, useEffect } from "react";
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

        if (docSnap.exists()){
            setOrder(docSnap.data());
        }else{
            toast.error("Order not found")
        }
        
        }catch{
            toast.error("Could not load payment details");

        }finally{
            setLoading(false);
            }
    
      
    
    
        };
        readOrder();

    }, [id]);

    const paymentSuccess = async (reference:any) =>{
        try{
            const orderRef = doc(db, "Orders", id as string);
            await updateDoc(orderRef, {
                status: "Processing",
                paymentStatus: "Paid",
                paymentReference: reference.reference,
                paidAt: new Date().toISOString()
            });

            toast.success("Payment Recieved");
            toast.success("More Information at Order History")

            setTimeout(() => {
            router.push("/");
             },       2000);
        }catch{
            toast.error("Payment was Successful but we could not update the order");
        }
    };

    const handleClose = () => {
    toast.error("Payment window closed.");
    };
    
    return{
        order,
        load,
        id,
        paymentSuccess,
        handleClose
    };


};
