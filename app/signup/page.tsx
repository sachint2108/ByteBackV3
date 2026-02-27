"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import Link from "next/link";


const SignUpContent = () => {
  const [error, createError] = useState("");
  const router = useRouter();
  const sParams = useSearchParams();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const passwordConfirm = (form.elements.namedItem("confirmpassword") as HTMLInputElement).value;

    // Validation
    if (!isValidEmail(email)) {
      toast.error("Email is invalid, Please enter email correctly");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (passwordConfirm !== password) {
      toast.error("Passwords entered do not match");
      return;
    }

    try {
      const toastId = toast.loading("Creating your ByteBack account");
      
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

     //Ensuring that user is stored as user and that the DOC ID is the email so that it works with Auth context
      await setDoc(doc(db, "Users", email), {
        email: email,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! You can continue shopping", { id: toastId });

      const callbackUrl = sParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      
    } catch (err: any) {
      // Firebase returns specific error codes we can catch
      if (err.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists.");
        createError("Email already in use. Please try a different one.");
      } else {
        toast.error("Registration failed. Please try again.");
        createError(err.message);
      }
    }
  };

  const loginUrl = `/login?callbackUrl=${encodeURIComponent(sParams.get("callbackUrl") || "/")}`;

  return (
    <div className="bg-white font-sans">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-center flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Create a ByteBack Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm border border-gray-200 sm:rounded-2xl sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
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
                    autoComplete="new-password"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-semibold leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn bg-black hover:bg-gray-800 text-white w-full text-lg h-12 border-none rounded-lg"
                >
                  Sign up
                </button>

                {error && (
                  <p className="text-red-600 text-center text-sm mt-4 font-medium">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const SignUpPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
        <span className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></span>
        <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Loading...</p>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUpPage;