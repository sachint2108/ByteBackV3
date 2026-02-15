"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
      console.log("Auth State Changed detected.");

      if (firebaseUser) {
        try {
          if (firebaseUser.email) {
            console.log("Fetching user document for:", firebaseUser.email);
            const userDoc = await getDoc(doc(db, "Users", firebaseUser.email));
            const isAdmin = userDoc.exists() && userDoc.data().role === "admin";
            
            console.log("User document fetched. Is Admin?:", isAdmin);

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              isAdmin: isAdmin,
              displayName: firebaseUser.displayName,
            });
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

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};