"use client";
import { DashboardSidebar } from "@/components";
import React from "react";
import { useRouter } from "next/navigation";
import { useCreateCategory } from "@/hooks/useCreateCategory";


const AdminDashboardNewCategoryPage = () => {
  const route = useRouter();

  const { name, setName, createNewCategory } = useCreateCategory();

  return (
    <div className="flex justify-start min-h-screen bg-gray-50/30 font-sans w-full">
      <DashboardSidebar />
      
      <div className="flex-1 pb-12 w-full">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Category</h1>
            <p className="mt-2 text-sm text-gray-500">
              Define a New Collection to Organize your ByteBack inventory.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                
                {/* Input Field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smart Watches"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  
                </div>

                {/* Divider */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    
                    {/* Cancel Button */}
                    <button
                      type="button"
                      className="px-6 h-11 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                      onClick={() => route.push("/admin/categories")}
                    >
                      Cancel
                    </button>

                    {/* Create Button */}
                    <button
                      type="button"
                      className="px-8 h-11 rounded-lg bg-black text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95"
                      onClick={createNewCategory}
                    >
                      Create Category
                    </button>

                  </div>
                </div>

              </div>
            </div>
          </div>


    
        </div>
      </div>
    </div>
  );



};

export default AdminDashboardNewCategoryPage