"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { DashboardSidebar } from "@/components";
import toast from "react-hot-toast";

const EditProductPage = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "" as string | number,
    category: "Tablet",
    condition: "Grade A",
    isSold: false,
    imageUrl: "",
    description: "",
  });

  // Fetch current data on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id as string);
        setProduct(data);
      } catch (error) {
        toast.error("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const toastId = toast.loading("Updating ByteBack inventory...");
      
      const payload = { ...product, price: Number(product.price) };
      await productService.updateProduct(id as string, payload);
      
      toast.success("Product updated!", { id: toastId });
      router.push("/admin/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="p-10">Loading product data...</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="bg-gray-50 flex justify-start min-h-screen text-black">
      <DashboardSidebar />
      <div className="p-10 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit {product?.name}</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6">
          
          {/* Reuse your form inputs from AddNewProduct here */}
          <label className="form-control">
            <span className="label-text font-semibold">Product Name</span>
            <input 
              className="input input-bordered" 
              value={product.name} 
              onChange={(e) => setProduct({...product, name: e.target.value})} 
            />
          </label>

          <label className="form-control">
            <span className="label-text font-semibold">Price (ZAR)</span>
            <input 
              type="number" 
              className="input input-bordered" 
              value={product.price} 
              onChange={(e) => setProduct({...product, price: e.target.value})} 
            />
          </label>

          {/* ... Add the rest of your inputs (Category, Condition, Image, Description) ... */}

          <button onClick={handleUpdate} className="btn btn-primary bg-blue-600 text-white mt-4">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;