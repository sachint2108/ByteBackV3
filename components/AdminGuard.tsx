"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/");
      toast.error("Access Denied");
    }
  }, [user, loading, router]);

  if (loading) {
    return(
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-y-4">
        <p className="text-lg">Verifying Admin Status for ByteBack...Please Wait</p> 
      </div>
    );
  }

  return user && user.isAdmin ? <>{children}</> : null;

  //note: This component is a guard that checks if the user is an admin. 
  // If the user is not an admin, it redirects them to the login page. 
  // While it's checking, it shows a loading message.
}