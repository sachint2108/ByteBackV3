"use client";
import React, { useState } from "react";
import { FaHeart, FaBoxOpen, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import { useUserAccountData } from "@/hooks/useUserAccountData";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/context/WishListContext";


const UserAccountPage = () => {
    const { user, orders, loading: accountLoading } = useUserAccountData();

    const { wishlist, toggleWishlist, loading: wishlistLoading } = useWishlist();

    const loading = accountLoading || wishlistLoading;// This ensures it will get removed while live

    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist">(
    tabFromUrl === "wishlist" ? "wishlist" : "orders"
  );

  React.useEffect(() => {
    if (tabFromUrl === "wishlist") {
      setActiveTab("wishlist");
    } else if (tabFromUrl === "orders") {
      setActiveTab("orders");
    }
  }, [tabFromUrl]);

    const [orderExpand, setOrderExpand] = useState<string[]>([]);


    const toggleOrder = (orderId: string) => {
    setOrderExpand((prev) => 
    prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };


    
    if (!user) return null; //Prevents Flashing




    return (
    <div className="bg-white min-w-screen py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-2">Welcome Back, {user.email}</p>
        </div>

        
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-px">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-colors ${
              activeTab === "orders" 
                ? "border-b-2 border-black text-black" 
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <FaBoxOpen className="text-lg" />
            Order History
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-colors ${
              activeTab === "wishlist" 
                ? "border-b-2 border-black text-black" 
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <FaHeart className="text-lg" />
            My Wishlist ({wishlist.length})
          </button>
        </div>

        
        
        
        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-200">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-lg text-gray-300"></span>
              <p className="text-sm font-medium text-gray-400 animate-pulse">Loading your Account</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 p-6 sm:p-10">
            
            
            
            
            
            
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <FaBoxOpen className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">You Haven't Placed any Orders yet.</p>
                    <Link href="/products" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map(order => {
                    const isExpanded = orderExpand.includes(order.id);

                    return (
                      <div key={order.id} className="border border-gray-100 rounded-2xl bg-gray-50/50 overflow-hidden transition-all">
                        
                        {/* The Clickable Header */}
                        <div 
                          onClick={() => toggleOrder(order.id)}
                          className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                        >
                          <div>
                            <p className="text-xs text-gray-400 font-mono mb-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="font-bold text-gray-900">
                              {order.createdAt?.seconds 
                                ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-GB') 
                                : 'Recent'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{order.goods?.length || 0} items</p>
                          </div>
                          
                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-left sm:text-right">
                              <p className="text-lg font-black text-gray-900">R {order.moneyInformation?.total?.toLocaleString()}</p>
                              <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                {order.orderStatus || order.status || "Processing"}
                              </span>
                            </div>
                            
                            
                            
                            {/* The Dropdown Arrow */}
                            <div className="text-gray-400">
                              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                          </div>
                        </div>

                        
                        
                        {/* The Expandable Details Section */}
                        {isExpanded && (
                          <div className="px-6 pb-6 pt-2 border-t border-gray-200/60 bg-white">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2">Order Items</h4>
                            <div className="space-y-3">
                              {order.goods?.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-3">
                                    <span className="bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded-md text-xs">
                                      x{item.quantity || 1}
                                    </span>
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                  </div>
                                  <span className="font-bold text-gray-900">R {item.price?.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            
                            
                            
                            

                            <div className="mt-4 pt-4 border-t border-dashed border-gray-200 text-xs text-gray-500 flex flex-col gap-1 items-end">
                              <p>Subtotal: R {order.moneyInformation?.subtotal?.toLocaleString()}</p>
                              <p>Shipping: R {order.moneyInformation?.shipping?.toLocaleString()}</p>
                              <p>VAT: R {order.moneyInformation?.vat?.toLocaleString()}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlist.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <FaHeart className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
                    <Link href="/products" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  wishlist?.map((item) => (
                    <div key={item.id} className="relative border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                      

                      <button 
                        onClick={() => toggleWishlist({ id: item.productId })}
                        className="absolute top-3 right-3 z-10 p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        title="Remove from wishlist"
                      >
                        <FaTrash className="text-sm" />
                      </button>

                      <div className="h-40 w-full mb-4 bg-white rounded-xl flex items-center justify-center p-2">
                        <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-green-600 font-black mb-4">R {Number(item.price).toLocaleString()}</p>
                      

                      <Link 
                        href={`/product/${item.productId}`}
                        className="w-full flex justify-center items-center bg-black text-white py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                      >
                        View Product
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default UserAccountPage;