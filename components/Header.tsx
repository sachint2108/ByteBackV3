"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import toast from "react-hot-toast";
import HeaderTop from "@/components/HeaderTop";

import { useAuth } from "@/context/AuthContext";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";

const Header = () => {

  const { user, loading, logout } = useAuth(); 
  const pathname = usePathname();
  const router = useRouter();
  const { wishQuantity } = useWishlistStore();

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      }
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <header className="bg-gradient-to-l from-white to-black-600">
      <HeaderTop />
      <div className="max-w-screen-2xl mx-auto px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
  <Image
    src="/bytebacklogo.png"
    alt="ByteBack Logo"
    width={100}
    height={100}
    priority
    className="rounded-full object-cover border-2 border-gray-300"
  />
</Link>

          <SearchInput />

        <div className="flex items-center gap-x-6">
          <NotificationBell />
          <CartElement />
        </div>
      </div>
    </header>
  );
};

export default Header;