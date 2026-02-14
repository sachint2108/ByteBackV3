"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth"
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

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("byteback_token");
      setUser(null); 
      console.log("Logged out everywhere");
    } catch (error) {
      console.error("Logout error", error);
    }
  };


  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {

          const userDoc = await getDoc(doc(db, "Users", user.email!));
          const isAdmin = userDoc.exists() && userDoc.data().role === "admin";

          setUser({
            uid: user.uid,
            email: user.email,
            isAdmin: isAdmin,
            displayName: user.displayName,
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser({...user, isAdmin: false}); // Fallback to basic user info if role fetch fails
        }
      } else {
        setUser(null);
      }
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