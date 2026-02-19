"use client";
import React, { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import Link from "next/link";

const AdminAllProductsList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchallProducts = async () => {
      
      try{
      const data = await productService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        
      }finally{
        setLoading(false);
      }
    };

    fetchallProducts();
  }, []);

 return (
  <div className="min-h-screen bg-gray-50/30 pb-12 font-sans w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* Header Section */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory</h1>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link 
            href="/admin/products/new" 
            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <span className="loading loading-spinner loading-md text-gray-400"></span>
            <p className="text-sm font-medium text-gray-500 animate-pulse">Getting Products from Render and Firebase </p>
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
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              {/* Body */}
              <tbody className="divide-y divide-gray-100 bg-white">
                {products.map((product) => (
                  <tr key={product.id || product._id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Image and Name Grouped */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-1">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="h-full w-full object-contain" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      R {Number(product.price).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/products/${product.id}`} 
                        className="text-white hover:text-black transition-colors bg-black hover:bg-white px-3 py-1.5 rounded-md"
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
 );
};

export default AdminAllProductsList;