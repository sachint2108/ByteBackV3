"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";
import HeartElement from "./HeartElement";

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
    <header className="bg-white">

    </header>
  );
};

export default Header;