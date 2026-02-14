"use client"; // This is required to use the AuthContext and Guard
import AdminGuard from "@/components/adminGuard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      {/* Everything inside this Guard is protected. 
          If you aren't an admin, you'll be redirected to /login 
      */}
      <div className="min-h-screen bg-gray-50">
        {/* You can add your Admin Sidebar here later */}
        <main>{children}</main>
      </div>
    </AdminGuard>
  );
}