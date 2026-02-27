"use client";
import { EmailAddressFormat } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

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

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    if (!EmailAddressFormat(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password needs to be longer. More than 8 characters please.");
      return;
    }

    try {
      const toastId = toast.loading("Verifying your ByteBack Credentials");
      const uCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "Users", email));
      const isAdmin = userDoc.exists() && userDoc.data().role === "admin";
 
      if (isAdmin) {
        toast.success("Welcome to your Admin Dashboard", { id: toastId });
        router.push("/admin");
      } else {
        toast.success("Welcome Back to ByteBack", { id: toastId });
        router.push(callbackUrl);
      }

    } catch (err: any) {
      console.error("Login Process Failed:", err);
      setError(err.message || "Failed to Verify Credentials");
      toast.dismiss();
    }
  };

  const registerUrl = `/signup?callbackUrl=${encodeURIComponent(searchParams.get("callbackUrl") || "/")}`;

  return (
    <div className="bg-white font-sans">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        
        <div className="flex justify-center flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Sign into ByteBack
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm border border-gray-200 sm:rounded-2xl sm:px-12">
            <form className="space-y-6" onSubmit={handleLogin}>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="input input-bordered w-full" 
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="input input-bordered w-full" 
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" 
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-black hover:underline underline-offset-4">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn bg-black hover:bg-gray-800 text-white w-full text-lg h-12 border-none rounded-lg"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <p className="text-red-600 text-center text-sm mt-6 font-medium">
                {error}
              </p>
            )}
            
            {/* Redirect to Sign Up */}
            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                New to ByteBack?{" "}
                <Link 
                  href={registerUrl}
                  className="font-bold text-black hover:underline underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;