"use client";
import { DashboardSidebar } from "@/components";
import { convertProductNameToURL as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productService } from "@/services/productService";
import { useRouter } from "next/navigation";

const AddNewProduct = () => {
  const router = useRouter();
  
//Fields from Firbase Database
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

  const addProduct = async () => {
    if (!product.name || !product.id || product.description === "" || !product.imageUrl || product.price === "") {
      toast.error("Please fill out all required fields to be able to add a product.");
      return;
    }

    try {
      const toastId = toast.loading("Saving product to ByteBack database...");
      
      const productPayload = {
        id: product.id,
        name: product.name,
        price: Number(product.price), 
        category: product.category,
        condition: product.condition,
        isSold: product.isSold,
        imageUrl: product.imageUrl,
        description: product.description
      };

      await productService.createProduct(productPayload);

      toast.success("Product Added to Website!", { id: toastId });
      router.push("/admin/products");
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 flex justify-start min-h-screen text-black font-sans">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 p-10 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight">Add New Apple Product</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6">
          
          {/* Product Name*/}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Product Name:</span></div>
              <input
                type="text"
                placeholder="e.g. iPad Air 5 (Wi-Fi)"
                className="input input-bordered w-full"
                value={product.name}
                onChange={(e) => {
                  setProduct({ 
                    ...product, 
                    name: e.target.value,
                    id: convertSlugToURLFriendly(e.target.value) 
                  });
                }}
              />
            </label>




                {/* Custom ID (SKU) */}
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Custom ID (SKU):</span></div>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-50 text-gray-500"
                value={product.id}
                onChange={(e) => setProduct({ ...product, id: e.target.value })}
              />
            </label>
          </div>

          
          
          
          
          {/* Price*/}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Price (ZAR):</span></div>
              <input
                type="number"
                placeholder="e.g. 9500"
                min="0"
                step="any"
                className="input input-bordered w-full"
                value={product.price === 0 ? "" : product.price}
                onChange={(e) => {
                  const cleanNumber = e.target.value.replace(/^0+(?=\d)/, ''); 
                  setProduct({ ...product, price: cleanNumber }); 
              }}
              />
            </label>

            
            
            
            
            {/* Category */}
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Category:</span></div>
              <select
                className="select select-bordered w-full"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
              >
                <option value="Phone">Phone</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Watch">Watch</option>
              </select>
            </label>
          </div>

          
          
          
          {/* Condition*/}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Condition:</span></div>
              <select
                className="select select-bordered w-full"
                value={product.condition}
                onChange={(e) => setProduct({ ...product, condition: e.target.value })}
              >
                <option value="Grade A">Grade A (Like New)</option>
                <option value="Grade B">Grade B (Good)</option>
                <option value="Grade C">Grade C (Fair)</option>
              </select>
            </label>


            
            
            
            {/* Availability Status */}
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Availability Status:</span></div>
              <select
                className="select select-bordered w-full"
                value={product.isSold ? "sold" : "available"}
                onChange={(e) => setProduct({ ...product, isSold: e.target.value === "sold" })}
              >
                <option value="available">Available (In Stock)</option>
                <option value="sold">Sold Out</option>
              </select>
            </label>
          </div>

          
          
          
          
          {/* Image Url */}
          <div>
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Product Image URL:</span></div>
              <input
                type="url"
                placeholder="https://example.com/image.png"
                className="input input-bordered w-full"
                value={product.imageUrl}
                onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              />
            </label>
            
            {product.imageUrl && (
              <div className="mt-4 border p-4 rounded-xl inline-block bg-gray-50">
                <img
                  src={product.imageUrl}
                  alt="Product Preview"
                  className="w-32 h-32 object-contain rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/product_placeholder.jpg";
                  }}
                />
              </div>
            )}
          </div>

          
          
          
          
          
          {/* Description */}
          <div>
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Description:</span></div>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Blue finish. M1 chip. Like new condition..."
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </label>
          </div>





            {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={addProduct}
              type="button"
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full text-lg h-14 border-none shadow-sm"
            >
              Save Product to ByteBack
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;