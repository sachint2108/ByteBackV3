"use client";
import {AdminGuard} from "@/components/AdminGuard";
import  {DashboardSidebar}  from "@/components";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-white">
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="p-4 md:p-8 lg:p-12">
        {children}</main>
      </div>
    </div>
    </AdminGuard>
  );
}