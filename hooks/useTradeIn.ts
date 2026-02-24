import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { evaluateTradeIn } from "@/services/tradeInServices";

export const useTradeIn = () => {
  const { user } = useAuth();
  const route = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);

    const [formData, setFormData] = useState({
    deviceType: "Iphone",
    model: "",
    storage: "128GB",
    condition: "Good",
    serialNumber: "",
  });

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to trade in a device.");
      route.push("/login?callbackUrl=/trade-in");
      return;
    }


    if (formData.serialNumber.trim().length<8){
        toast.error("Please enter a valid Serial Number or IMEI");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Validating IMEI and Calculating AI estimate", { id: "estimate-toast" });

    try{
        const data = await evaluateTradeIn(formData);
        
        if (!data) {
        throw new Error("Failed to get an Estimate from the Server.");
        }

        setEstimate(data.estimatedValue)
        toast.success("Device Validated", { id: "estimate-toast" });
    
    }catch (err: any) {
        toast.error (err.message, {id: "estimate-toast"});
    }finally{
        setIsSubmitting(false);
    }
  };
     

    const tradeInConfirm = async () =>{
        if (!user || !estimate) return;
        setIsSubmitting(true);
        const saveToast = toast.loading("Submitting your Trade-In Request");

        try {
            await addDoc(collection(db, "TradeIns"), {
                userId: user.uid,
                userEmail: user.email,
                deviceDetails: formData,
                estimate: estimate,
                status: "Pending Approval",
                createdAt: serverTimestamp(),
            });

            toast.success("Trade-in submitted! Waiting for Admin Approval.", { id: saveToast, duration: 5000 });
            route.push("/");
        }catch{
            toast.error("Failed to submit. Please try again.");
        }finally{
            setIsSubmitting(false);
        }
    };

    return{
        formData,
        setFormData,
        estimate,
        setEstimate,
        isSubmitting,
        handleEstimate,
        tradeInConfirm,
    };

};