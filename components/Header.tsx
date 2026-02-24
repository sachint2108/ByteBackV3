"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import toast from "react-hot-toast";
import HeaderTop from "@/components/HeaderTop";
import { useWishlist } from "@/context/WishListContext";



import { useAuth } from "@/context/AuthContext";

import CartElement from "./CartElement";
import { FaRegHeart, FaChevronLeft } from "react-icons/fa6";

const Header = () => {

  const { user, loading, logout } = useAuth(); 

  const {wishlist} = useWishlist();
  const pathname = usePathname();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

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
      
     
      <div className="flex items-center gap-4">
        {pathname !== "/" && (
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-1 text-black hover:text-gray-600 transition-all font-bold text-sm bg-gray-100 px-3 py-2 rounded-full shadow-sm"
          >
            <FaChevronLeft className="text-xs" />
            <span>Back</span>
          </button>
        )}
        
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
      </div> 

    
      <SearchInput />

 
      <div className="flex items-center gap-x-6">
        <Link href="/account?tab=wishlist" className="relative flex items-center text-black hover:text-gray-600 transition-colors">
          <FaRegHeart className="text-2xl" />
          
          {wishlist?.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {wishlist.length}
            </span>
          )}
        </Link>
        <CartElement />
      </div>

    </div>
  </header>
);
};

export default Header;