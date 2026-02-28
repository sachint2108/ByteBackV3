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

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "iPhones", href: "/shop?categories=phone" },
    { name: "MacBooks", href: "/shop?categories=laptop" },
    { name: "iPads", href: "/shop?categories=tablet" },
    { name: "Sale", href: "/sale", isSpecial: true },
  ];

  return (
    <header className="bg-gradient-to-l from-white to-gray-900">
      <HeaderTop />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LEFT: Logo & Back Button */}
        <div className="flex items-center justify-start gap-4 md:flex-1 w-full md:w-auto">
          {pathname !== "/" && (
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-1 text-black hover:text-gray-600 transition-all font-bold text-sm bg-gray-100 px-3 py-2 rounded-full shadow-sm"
            >
              <FaChevronLeft className="text-xs" />
              <span className="hidden sm:inline">Back</span>
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

        {/* CENTER: Search Bar & Floating Nav Pill */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xl md:flex-[2]">
          <SearchInput />
          
          
          
          
          {/* The Glassmorphism Nav Pill */}
          <nav className="flex items-center gap-4 sm:gap-8 bg-white/40 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm border border-white/50 w-max max-w-full overflow-x-auto hide-scrollbar">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  link.isSpecial 
                    ? "text-red-600 hover:text-red-500 hover:scale-105 drop-shadow-sm" 
                    : "text-gray-700 hover:text-black hover:scale-105"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        
        
        {/* RIGHT: Wishlist & Cart */}
        <div className="flex items-center justify-end gap-x-6 md:flex-1 w-full md:w-auto">
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