import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useProductStore } from "@/app/_zustand/store";
import { isValidNameOrLastname, EmailAddressFormat } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export const useCheckout = () => {
    
    const {user} = useAuth();

    const route = useRouter();



    const {products, subtotal, vat, total, clearCart} = useProductStore();


    const [isSubmitting, setIsSubmitting] = useState (false);
    const [checkoutform, setCheckoutform] = useState({
        name: "",
        lastname: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        hOraNumber: "",
        city: "",
        country: "",
        postalCode: "",
        orderNotice: "",
    });

    // Won't let the user checkout unless they sign in
    useEffect(() => {
    const toastid = "auth-check";
    
    
    if (user === null) {
      toast.error("Please sign in to complete your purchase", {id :toastid});
      route.push("/login?callbackUrl=/checkout"); 
    }

    if (user && products.length === 0) {
        route.push("/cart");
    }


    }, [user, products.length, route]);

    const fieldValidation = () =>{
        if (!isValidNameOrLastname(checkoutform.name)) {
        toast.error("Please enter a valid Name", { id: "val-name"});
        return false;
        }
        if (!isValidNameOrLastname(checkoutform.lastname)) {
        toast.error("Please enter a valid Lastname", { id: "val-last" });
        return false;
        }
        if (!EmailAddressFormat(checkoutform.email)) {
        toast.error("Please enter a valid Email address", { id: "val-email" } );
        return false;
        }
        if (checkoutform.email !== user?.email) {
        toast.error("Please use the email address your are currently signed in with");
         return false;
        }
        if (checkoutform.phone.trim().length < 10) {
        toast.error("Phone number must be at least 10 digits");
        return false;
        }
        if (checkoutform.address.trim().length < 5) {
        toast.error("Please enter a full shipping address");
        return false;
        }
        return true;

    };

    const purchase = async () => {
        
        if (!user) {
         toast.error(" Your authentication has expired. Please sign in again.");
         return;
        }
        
        
        if(!fieldValidation())return;

        setIsSubmitting(true);



        try{
            const orderPayload = {
                customerInformation : {
                    firstName: checkoutform.name,
                    lastName: checkoutform.lastname,
                    email: checkoutform.email,
                    phone: checkoutform.phone,
                    company: checkoutform.company,
                },
                shippingInformation : {
                    address: checkoutform.address,
                    houseOrapartmentNumber: checkoutform.hOraNumber,
                    city: checkoutform.city,
                    country: checkoutform.country,
                    postalCode: checkoutform.postalCode,
                },
                goods: products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.totalQuantity,
                })),
                moneyInformation: {
                    subtotal,
                    vat,
                    shipping: 200,
                    total,
                },
                status: "Awaiting Payment",
                paymentStatus: "Unpaid",
                createdAt: serverTimestamp(),
                userEmail: user.email,
                userId: user.uid

            };

            const docRef = await addDoc(collection(db, "Orders"), orderPayload);
            
            clearCart();

            toast.success("Please proceed to the payment section")
       

            setTimeout(() => {
                route.push(`/payment/${docRef.id}`);
            }, 2000);
        }catch{
           toast.error("Something went wrong. Please try again."); 
        }finally{
           setIsSubmitting(false); 
        }
    };

    return{
        checkoutform,
        setCheckoutform,
        isSubmitting,
        purchase,
        products,
        subtotal,
        vat,
        total,
        user
    };

};