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
    <div className="flex bg-white min-h-screen">
      <div className="p-10 w-full text-black">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">ByteBack Inventory</h1>
          <Link href="/admin/products/new" className="btn btn-primary bg-black border-none text-white hover:bg-gray-800">
            Add New Product
          </Link>
        </div>

        {loading ? (
          <p>Scanning ByteBack database...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr className="bg-gray-100 text-black">
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id || product._id} className="hover:bg-gray-50">
                    <td>
                      <img src={product.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="font-medium">{product.name}</td>
                    <td className="uppercase text-xs">{product.category}</td>
                    <td>R {product.price}</td>
                    <td>
                      <Link 
                        href={`/admin/products/${product.id}`} 
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Edit Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllProductsList;