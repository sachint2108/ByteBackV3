"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";

interface Orders{
 id: string;
  userEmail: string;
  customerInformation: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  paymentStatus: string;
  status: string;
  moneyInformation: {
    total: number;
  };
  shippingInformation: {
    address: string;
    city: string;
  };
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
      
      const listOrder: Orders[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userEmail: data.userEmail || "",
          customerInformation: data.customerInformation || {},
          paymentStatus: data.paymentStatus || "Unpaid",
          status: data.status || "Pending",
          moneyInformation: data.moneyInformation || { total: 0 },
          shippingInformation: data.shippingInformation || {},
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
        
        {/* Header Section */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Orders</h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage and track customer orders across your ByteBack store.
            </p>
          </div>
        </div>

        {load ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-md text-gray-400"></span>
              <p className="text-sm font-medium text-gray-500 animate-pulse">Fetching Orders from Firebase</p>
            </div>
          </div>
        ) : (
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
                      Delivery
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100 bg-white">
                  {orders.length === 0 ? (
                    <tr>
                      {/* Increased colSpan to 7 to match new column count */}
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                          No orders found.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                          #{order.id.substring(0, 8)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900 text-sm">
                            {order.customerInformation?.firstName} {order.customerInformation?.lastName}
                          </div>
                          <div className="text-xs text-gray-500">{order.userEmail}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.createdAt.toLocaleDateString("en-ZA")}
                        </td>

                        {/*Delivery Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${
                            order.status === 'Processing' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 
                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 ring-purple-600/20' :
                            order.status === 'Delivered' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'
                          }`}>
                            {order.status || 'Pending'}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${
                            order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          R {order.moneyInformation?.total?.toLocaleString() ?? "0"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            href={`/admin/orders/${order.id}`} 
                            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default AdminOrders;



//This Code fetches the Orders and places it in a table
