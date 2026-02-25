"use client";
import { DashboardSidebar } from "@/components";
import React, { use, useEffect } from "react";
import { useSingleCategory } from "@/hooks/useSingleCatergory";
import { useRouter } from "next/navigation";

interface AdminDashboardSingleCategoryProps {
  params: Promise<{ id: string }>;
}

const AdminDashboardSingleCategory = ({ params }: AdminDashboardSingleCategoryProps) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const route = useRouter();


  const { name, setName, load, updateCategory, deleteCategory } = useSingleCategory(id);




  if (load) {
    return (
      <div className="p-10 bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
  <div className="flex justify-start min-h-screen bg-gray-50/30 font-sans w-full">
    <DashboardSidebar />
    
    <div className="flex-1 pb-12 w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Category Settings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Edit the details for this collection or manage its availability.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              
              {/* Category Name Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. MacBook Pro"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Danger Zone - Styled specifically for the light theme */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <span className="font-bold uppercase text-xs tracking-widest">Danger Zone</span>
                </div>
                <p className="text-sm text-red-500/80 leading-relaxed">
                  Deleting this Category Will Permanently Remove all Associated Products from your Inventory. This Action Cannot be Undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  
                  {/* Delete Button - Outline Style */}
                  <button
                    type="button"
                    className="px-8 h-11 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    onClick={deleteCategory}
                  >
                    Delete Category
                  </button>

                  {/* Save Changes Button - Solid Style */}
                  <button
                    type="button"
                    className="px-10 h-11 rounded-lg bg-black text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95"
                    onClick={updateCategory}
                  >
                    Save Changes
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => route.push("/admin/categories")}
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to All Categories
          </button>
        </div>


      </div>
    </div>
  </div>
  );


  






};

export default AdminDashboardSingleCategory