"use client";
import { CustomButton } from "@/components";
import { EmailAddressFormat } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  
  const { user } = useAuth(); 

  useEffect(() => {
    const expired = searchParams.get('expired');
    if (expired === 'true') {
      setError("Session has expired. Log in again please.");
      toast.error("Session has expired. Log in again please.");
    }   
  }, [searchParams]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!EmailAddressFormat(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password needs to be longer. More than 8 characters please.");
      return;
    }

    try {
      const toastId = toast.loading("Verifying your ByteBack credentials...Please wait");
      const uCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "Users", email));
      const isAdmin = userDoc.exists() && userDoc.data().role === "admin";
 
      if (isAdmin) {
        toast.success("Welcome to your Admin Dashboard!", { id: toastId });
        router.push("/admin");
      } else {
        toast.success("Welcome back to ByteBack", { id: toastId });
        router.push("/");
      }

    } catch (err: any) {
      console.error("Login process failed:", err);
      setError(err.message || "Failed to verify credentials");
      toast.dismiss();
    }
  };

  return (
    <div className="bg-black">
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            Sign into ByteBack
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
                </div>
                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-black hover:text-black">Forgot password?</a>
                </div>
              </div>

              <div>
                <CustomButton buttonType="submit" text="Sign in" paddingX={3} paddingY={1.5} customWidth="full" textSize="sm" />
              </div>
            </form>
            <p className="text-red-600 text-center font-medium text-[14px] mt-6">
              {error && error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;