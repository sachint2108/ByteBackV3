"use client";
import { DashboardSidebar } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";
import toast from "react-hot-toast";

const AdminDashboardCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readCategories = async () => {
      try {
        const data = await categoryService.readAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to Load Categories");
      } finally {
        setLoading(false);
      }
    };
    readCategories();
  }, []);


  return (
    <div className="flex justify-start min-h-screen bg-gray-50/30 font-sans w-full">
      <DashboardSidebar />
      
      <div className="flex-1 pb-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
          {/* Header Section */}
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categories</h1>
              <p className="mt-2 text-sm text-gray-500">Manage your ByteBack product categories and collections.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link 
                href="/admin/categories/new" 
                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                + Add New Category
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <span className="loading loading-spinner loading-md text-gray-400"></span>
                <p className="text-sm font-medium text-gray-500 animate-pulse">Loading Categories...</p>
              </div>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-center">
                <p className="text-gray-500 font-medium mb-4">No categories found.</p>
                <Link href="/admin/categories/new" className="text-blue-600 hover:text-blue-800 font-bold underline text-sm">
                  Create your first category
                </Link>
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
                        Category Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        System Slug
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  
                  {/* Body */}
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                        
                        {/* Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900 text-sm">{category.name}</div>
                        </td>

                        {/* Slug (Using the pill badge style from your products) */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 tracking-wide font-mono">
                            {category.slug}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            href={`/admin/categories/${category.id}`} 
                            className="text-white hover:text-black transition-colors bg-black border border-black hover:bg-white px-4 py-1.5 rounded-md shadow-sm"
                          >
                            Edit || Delete
                          </Link>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default AdminDashboardCategory