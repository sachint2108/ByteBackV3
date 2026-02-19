"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";

interface Orders{
  id: string;
  customerEmail: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: Date;
}


const AdminOrders = () =>{
  const [orders, setOrders] = useState<Orders[]>([]);
  const [load, setLoad] = useState(true);


// Fetching the Orders from the Firebase
useEffect(() =>{
  const readOrders = async () =>{
    try{
      setLoad(true);
      const querySnapshot = await getDocs(collection(db, "Orders")); //Fetching it from the Orders Collection
      
      const listOrder : Orders[] = querySnapshot.docs.map(doc =>{
        const data = doc.data();
          return{
            id: doc.id,
            customerEmail: data.customerEmail,
            orderStatus: data.orderStatus,
            totalAmount: data.totalAmount,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),

          };
      });


      listOrder.sort((aa, bb) => bb.createdAt.getTime() - aa.createdAt.getTime());

      setOrders(listOrder);
      
    } catch (err){
      console.error("Can't fetch Orders");
    }finally{
      setLoad(false);
    }
  };

  readOrders();
}, []);

return (
    <div className="min-h-screen bg-gray-50/30 pb-12 font-sans w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header*/}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight"> All Orders</h1>
          </div>
        </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                
                {/* Table Header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100 bg-white">
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr key={`${order.id}-${index}`} className="hover:bg-gray-50/50 transition-colors">
                        
                        {/* Order ID */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                          #{order.id.substring(0, 8)}
                        </td>

                        {/* Customer Email */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{order.customerEmail}</div>
                            </div>
                          </div>
                        </td>

                        {/* Date and Time*/}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.createdAt.toLocaleDateString("en-ZA", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {order.createdAt.toLocaleTimeString("en-ZA", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700 ring-1 ring-inset ring-gray-500/20">
                            {order.orderStatus}
                          </span>
                        </td>

                        {/* Total Price */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          R {order.totalAmount.toLocaleString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            href={`/admin/orders/${order.id}`} 
                            className="text-white hover:text-black transition-colors bg-black border border-black hover:bg-white px-4 py-2 rounded-lg shadow-sm"
                          >
                            View Details
                          </Link>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                        No orders found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  )
};

export default AdminOrders;



//This Code fetches the Orders and places it in a table
