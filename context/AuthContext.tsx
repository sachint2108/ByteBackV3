"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTimeout } from "@/hooks/useTimeout";

interface AuthContextType {
  user: any; 
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);


const trackUserActivity = async (userId: string) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `tracked_${userId}_${today}`;

    if (localStorage.getItem(storageKey)) return;

    const activityRef = collection(db, "user_activity");
    await addDoc(activityRef, {
      uid: userId,
      timestamp: serverTimestamp(),
      type: "session_start"
    });

    localStorage.setItem(storageKey, "true");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("byteback_token");
      console.log("Logged out everywhere");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          if (firebaseUser.email) {
            console.log("Fetching user document for:", firebaseUser.email);
            const userDoc = await getDoc(doc(db, "Users", firebaseUser.email));
            const isAdmin = userDoc.exists() && userDoc.data().role === "admin";


            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              isAdmin: isAdmin,
              displayName: firebaseUser.displayName,
            });

            await trackUserActivity(firebaseUser.uid);



          } else {
            setUser({ ...firebaseUser, isAdmin: false });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser({...firebaseUser, isAdmin: false}); 
        }
      } else {
        setUser(null);
      }
      
      console.log("Auth setup finished. Loading = false");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  useTimeout(user);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};