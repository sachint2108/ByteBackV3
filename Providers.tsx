"use client";
import { Toaster } from "react-hot-toast";
import React from "react";
import { AuthContextProvider } from "@/context/AuthContext";
import { WishlistProvider } from "./context/WishListContext";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (

      <AuthContextProvider>
        <WishlistProvider>
        <Toaster
          toastOptions={{
           className: "",
            style: {
             fontSize: "17px",
            },
          } }
        />
        {children}
        </WishlistProvider>
      
      </AuthContextProvider>

  );
};

export default Providers;