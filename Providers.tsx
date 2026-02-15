"use client";
import { Toaster } from "react-hot-toast";
import React from "react";
import { AuthContextProvider } from "@/context/AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "17px",
          },
        }}
      />
      {children}
      
    </AuthContextProvider>
  );
};

export default Providers;