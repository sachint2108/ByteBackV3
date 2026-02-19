"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaHeadphones, FaRegEnvelope, FaRegUser, FaGear } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


const HeaderTop = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

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
    <div className="h-10 text-black bg-black-500 max-lg:px-5 max-lg:h-16 max-[573px]:px-0">
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-12 max-[573px]:px-0">
        
        <ul className="flex items-center h-full gap-x-5 max-[370px]:text-sm max-[370px]:gap-x-2">
          <li className="flex items-center gap-x-2 font-semibold">
            <FaHeadphones className="text-black" />
            <span>+27 81 123 4567</span>
          </li>
          <li className="flex items-center gap-x-2 font-semibold">
            <FaRegEnvelope className="text-black text-xl" />
            <span>ByteBack@gmail.com</span>
          </li>
        </ul>

        <ul className="flex items-center gap-x-5 h-full max-[370px]:text-sm max-[370px]:gap-x-2 font-semibold">
          {!loading && !user ? (
            <>
              <li className="flex items-center">
                <Link href="/login" className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-white" />
                  <span>Login</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/signup" className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-white" />
                  <span>Sign Up</span>
                </Link>
              </li>
            </>
          ) : (
            <>
            {user?.isAdmin && (
                <li className="flex items-center border-r border-gray-300 pr-5">
                  <Link href="/admin" className="flex items-center gap-x-2 font-bold text-black hover:text-gray-600 transition-colors">
                    <FaGear className="text-black" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}




              
              <span className="ml-10 text-base">{user?.email}</span>
              <li className="flex items-center">
                <button onClick={handleLogout} className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-black" />
                  <span>Log out</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;