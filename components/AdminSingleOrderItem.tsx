"use client";
import { DashboardSidebar } from "@/components";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

interface Items {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface SingleOrder {
  id: string;
  userEmail: string;
  customerInformation: {
    firstName: string;
    lastName: string;
    phone: string;

  };
  shippingInformation: {
    address: string;
    city: string;

    postalCode: string;

  };
  moneyInformation: {
    total: number;
    subtotal: number;
    vat: number;
    shipping: number;
  };
  paymentStatus: string;
  status: string;
  goods: Items[];
}

const ViewOrder = () =>{
  const [order, setOrder] = useState<SingleOrder | null>(null);
  const [load, setLoad] = useState (true);


  const parameters = useParams<{id: string}>();
  const route = useRouter();


  useEffect(() => {
    const readOrder = async () => {
      
      
      try{
        setLoad(true);



        const oRef = doc(db, "Orders", parameters.id);
        const oSnap = await getDoc (oRef);


        if (oSnap.exists()){
          const info = oSnap.data();

          setOrder({
            id: oSnap.id,
            userEmail: info.userEmail,
            customerInformation: info.customerInformation,
            shippingInformation: info.shippingInformation,
            moneyInformation: info.moneyInformation,
            paymentStatus: info.paymentStatus,
            status: info.status,
            goods: info.goods || [],
          }as SingleOrder);

        }else{
          toast.error("Order not found");
          route.push("/admin/orders");
        }
      
      
      }catch (err){
        toast.error("Failed to load order details.");
      }finally{
        setLoad(false);
      }
        
      
    };
    readOrder();
  }, [parameters?.id, route]);



  const updateOrder = async ()=>{
     if (!order) return;


    try {
      const oRef = doc(db, "Orders", order.id);
      await updateDoc(oRef, {
        orderStatus: order.status,
        "shippingInformation.address": order.shippingInformation.address,
      });
      toast.success("Order Updated");
       route.push("/admin/orders");
    }catch{
      toast.error("Update Failed");
    }
  };
   




    const deleteOrder = async () =>{
      if (!order) return;

      const cDelete = window.confirm("Are you sure you want to delete");
      if (!cDelete)
        return;


      try{
        const oRef = doc(db, "Orders", order.id);
        await deleteDoc(oRef);
        toast.success("Order deleted");
        route.push("/admin/orders");
      }catch{
        toast.error("Failed to delete order.");
      }
    };


  if (!order) return null;

  return (
   <div className="bg-gray-50/30 flex min-h-screen font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Order Details</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">ID: {order.id}</p>
          </div>

          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide ${
            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
            order.status === 'Processing' ? 'bg-purple-100 text-purple-800' :
            order.status === 'Paid' ? 'bg-purple-100 text-purple-800' :
            order.status === 'Canceled' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg p-2.5" value={order.userEmail} readOnly disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
              <select
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-black focus:border-black"
                value={order.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
              >
                <option value="Awaiting Payment">Awaiting Payment</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <textarea
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-black focus:border-black min-h-[80px]"
                value={order.shippingInformation.address}
                onChange={(e) => setOrder({ 
                  ...order, 
                  shippingInformation: { ...order.shippingInformation, address: e.target.value } 
                })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Purchased Items</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {order.goods.map((item, index) => (
              <li key={index} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">R {item.price.toLocaleString()}</p>
              </li>
            ))}
          </ul>
          <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-500 font-medium italic">Total (Incl. VAT & Shipping)</span>
            <span className="text-2xl font-black text-gray-900">
              R {Number(order.moneyInformation.total).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button onClick={deleteOrder} className="px-6 py-3 rounded-xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
            Delete Order
          </button>
          <button onClick={updateOrder} className="px-8 py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-800 shadow-sm transition-all active:scale-95">
            Save Changes
          </button>
        </div>
      </div>
    </div>
    </div>
  );





};

export default ViewOrder;