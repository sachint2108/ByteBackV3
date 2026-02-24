"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";

export const useUserAccountData = () =>{
    const { user } = useAuth();
    const route = useRouter();

    const [orders, setOrders] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
    if (user === null) {
      route.push("/login?callbackUrl=/account");
    }
  }, [user, route]);


    useEffect(() => {
        if (!user) return;

        const readUserData = async () =>{
            setLoading (true);
            try{
                //Fetch Orders
                const ordersRef = collection(db, "Orders");
                const qOrders = query(ordersRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
                const orderSnap = await getDocs(qOrders);
                setOrders(orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                //Fetch Wishlist
                const wishlistRef = collection(db, "Wishlist");
                const qWishlist = query(wishlistRef, where("userId", "==", user.uid));
                const wishlistSnap = await getDocs(qWishlist);
                setWishlist(wishlistSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }catch(err){
              console.error("Error Fetching User Data:", err);
                toast.error("Failed to Load Account Details.");  
            }finally{
                setLoading(false);
            }
        };


        readUserData();
    }, [user]);

    return {user, orders, wishlist, loading}
}