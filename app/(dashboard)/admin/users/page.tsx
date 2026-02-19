"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {collection, doc, getDocs} from "firebase/firestore";



interface User{
  id: string;
  email: string;
  role: string;
}

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db,"Users"));

        const uList: User[] = querySnapshot.docs.map((doc, index) =>{
          const userdata = doc.data();


          return{
            id: '${doc.id}-${index}',
            email: userdata.email || doc.id,
            role: userdata.role
          };
        });

        setUsers(uList);
      }catch{
        console.error("Failed to get user");
      }finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-50/30 flex justify-start mx-auto h-screen max-xl:flex-col font-sans">
      <DashboardSidebar />
      



      {/*Heading*/}
      <div className="w-full max-w-5xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">System Users</h1>
        
        
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                
                 {/*Email Address and Role section*/}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>





                
                <tbody className="divide-y divide-gray-100 bg-white">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium uppercase tracking-wide ring-1 ring-inset ${
                            user.role?.toLowerCase() === 'admin' 
                              ? 'bg-blue-50 text-blue-700 ring-blue-600/20' 
                              : 'bg-gray-50 text-gray-600 ring-gray-500/10'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-6 py-12 text-center text-gray-500 text-sm">
                        No users found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
