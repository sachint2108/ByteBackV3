"use client"
"use client";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useTimeout = (user: any) => {
    const router=useRouter();


    useEffect (() => {
        let timeoutId: NodeJS.Timeout;



        const userLogout = async () => {
            try{
                await signOut(auth);
                toast("Logged out due to inactivity");
                router.push("/login");

            }catch(err){
                console.error("Error logging out:", err);
            }

        };


        const timeoutReset = () => {
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(userLogout, 600000);
        };

        timeoutReset();

        const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];

        events.forEach((movement) => {
            window.addEventListener(movement, timeoutReset);
        });

        return () => {
        if (timeoutId) clearTimeout(timeoutId);
        events.forEach((movements) => {
            window.removeEventListener(movements, timeoutReset);
      });



    };


       
    }, [router, user]);
};


//This Timesout the user if they have been inactive for longer than 10 Minutes