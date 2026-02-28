"use client";
import { DashboardSidebar } from "@/components";
import { convertProductNameToURL as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productService } from "@/services/productService";
import { useRouter } from "next/navigation";
import TagInput from "@/components/TagInput"; 

const AddNewProduct = () => {
  const router = useRouter();
  

  const [product, setProduct] = useState({
    id: "",           
    name: "",          
    price: "" as string | number,
    category: "Tablet", 
    condition: "Grade A", 
    isSold: false,     
    imageUrl: "",      
    description: "",
    tags: [] as string[], 
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
        description: product.description,
        tags: product.tags 
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
    <div className="bg-[#fbfbfd] flex min-h-screen text-gray-900 font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-10">
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
              Inventory Management
            </nav>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">
              New Apple Listing
            </h1>
          </header>
          
          {/* Main Form Container */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-10">
            
            {/* Name & ID Group */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. iPad Pro 11"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-black/5 transition-all outline-none"
                  value={product.name}
                  onChange={(e) => setProduct({ 
                    ...product, 
                    name: e.target.value,
                    id: convertSlugToURLFriendly(e.target.value) 
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Custom SKU / ID</label>
                <input
                  type="text"
                  className="w-full bg-gray-100 border-none rounded-2xl py-4 px-5 text-sm font-bold text-gray-500 cursor-not-allowed outline-none"
                  value={product.id}
                  readOnly
                />
              </div>
            </section>

            {/* Price & Category Group */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (ZAR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">R</span>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-10 pr-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                    value={product.price === 0 ? "" : product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value.replace(/^0+/, '') })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                <select
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                >
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
            </section>

            {/* Condition & Status */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Condition</label>
                <select
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                  value={product.condition}
                  onChange={(e) => setProduct({ ...product, condition: e.target.value })}
                >
                  <option value="Grade A">Grade A (Like New)</option>
                  <option value="Grade B">Grade B (Good)</option>
                  <option value="Grade C">Grade C (Fair)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Availability</label>
                <select
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                  value={product.isSold ? "sold" : "available"}
                  onChange={(e) => setProduct({ ...product, isSold: e.target.value === "sold" })}
                >
                  <option value="available">In Stock</option>
                  <option value="sold">Mark as Sold</option>
                </select>
              </div>
            </section>

            {/* Image URL & Preview */}
            <section className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Image URL</label>
                <input
                  type="url"
                  placeholder="Paste direct link to white-background image..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                  value={product.imageUrl}
                  onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                />
              </div>
              
              {product.imageUrl && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl w-fit border border-gray-100">
                  <img
                    src={product.imageUrl}
                    alt="Preview"
                    className="w-20 h-20 object-contain rounded-xl bg-white p-2 shadow-sm"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/product_placeholder.jpg"; }}
                  />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
                </div>
              )}
            </section>

            {/* TAG INPUT SECTION*/}
            <section className="w-full">
              <TagInput 
                tags={product.tags} 
                setTags={(newTags) => setProduct({ ...product, tags: newTags })} 
              />
            </section>

            {/* Description */}
            <section className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
              <textarea
                className="w-full bg-gray-50 border-none rounded-[2rem] p-6 text-sm font-bold min-h-[150px] outline-none focus:ring-2 focus:ring-black/5"
                placeholder="Details about chip, storage, and wear..."
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </section>

            {/* Action Buttons */}
            <footer className="pt-6 border-t border-gray-100 flex gap-4">
              <button
                onClick={addProduct}
                className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-800 hover:scale-[1.01] active:scale-95 shadow-lg shadow-black/5"
              >
                Publish Product
              </button>
              <button
                onClick={() => router.push("/admin/products")}
                className="px-8 bg-gray-100 text-gray-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-200 hover:text-gray-600"
              >
                Cancel
              </button>
            </footer>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNewProduct;