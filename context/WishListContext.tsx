"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

interface WishlistContextType{
    wishlist: any[];
    toggleWishlist: (product: any) => Promise<void>;
    loading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    if (!user){
        setWishlist([]);
        setLoading(false);
        return;
    }

    const readWishlist = async () =>{
      try{
        const q = query(collection(db, "Wishlist"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        setWishlist(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }catch (err){
        console.error("Error fetching wishlist:", err);
      }finally{
        setLoading(false);
      }
    };

    readWishlist();


  },[user]);

  const toggleWishlist = async (product: any) =>{
    if (!user) {
      toast.error("Please Log in to Save Items to your Wishlist.");
      return;
    }

    const existingItem = wishlist.find(item => item.productId === product.id);// Checks if item is already there(Essential)


    try{
      if(existingItem){
        await deleteDoc(doc(db, "Wishlist", existingItem.id));
        setWishlist(prev => prev.filter(item => item.id !== existingItem.id));
        toast.success("Removed from Wishlist");
      }else{
        const newItem = {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          addedAt: new Date()
        };
        const docRef = await addDoc(collection(db, "Wishlist"), newItem);
        setWishlist(prev => [...prev, { id: docRef.id, ...newItem }]);
        toast.success("Added to Wishlist");
      }
    }catch(err){
      toast.error("Failed to Update Wishlist.");
    }

      
    };

    return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

