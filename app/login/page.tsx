"use client";
import { CustomButton, SectionTitle } from "@/components";
import { EmailAddressFormat } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";// Notfication library for showing success and error messages to the user
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import {db } from "@/firebase/config";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    
    const expired = searchParams.get('expired');
  if (expired === 'true') {
    setError("Session has expired. Log in again.");
    toast.error("Session has expired. Log in again.");
  }  



    if (user){
      if (user.isAdmin) {
        console.log("Admin user detected, redirecting to admin dashboard"); //admin page redirect
        router.replace("/admin");
      }
      else {
        console.log("Regular user detected, redirecting to homepage"); //regular user redirect
        router.replace("/");
      }
    }
  }, [user, router, searchParams]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!EmailAddressFormat(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password needs to be longer. More than 8 characters please.");
      toast.error("Password is invalid");
      return;
    }

    try {
    const uCredential = await signInWithEmailAndPassword(auth, email, password);
    const userFirebase = uCredential.user;

    const userDoc = await getDoc(doc(db, "users", userFirebase.email!));
    const isAdmin = userDoc.exists() && userDoc.data().role === "admin";

    setError("");
    toast.success("Welcome back to ByteBack");

      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }

  };
  return (
    <div className="bg-gradient-to-l from-white to-black-600">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-black hover:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <CustomButton
                  buttonType="submit"
                  text="Sign in"
                  paddingX={3}
                  paddingY={1.5}
                  customWidth="full"
                  textSize="sm"
                />
              </div>
            </form>

              <p className="text-red-600 text-center text-[16px] my-4">
                {error && error}
              </p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default LoginPage;
