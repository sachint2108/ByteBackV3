"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/login");
    }
    }, [user, loading, router]);
    if (loading) {
      return(
      <div className="flex items-center justify-center min-h-screen">
        <p>Verifying Admin Status for ByteBack...</p>
      </div>
      );
    }

    return user && user.isAdmin ? <>{children}</> : null;
}