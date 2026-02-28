"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { DashboardSidebar } from "@/components";
import TagInput from "@/components/TagInput"; // <--- Import the TagInput component here
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
    tags: [] as string[], // <--- Added tags state
  });

  // Fetch current data while on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id as string);
        // Safely set tags, defaulting to an empty array if older products don't have any
        setProduct({ ...data, tags: data.tags || [] }); 
      } catch (error) {
        toast.error("Could not Load Product Details. Please Try Again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const toastId = toast.loading("Updating ByteBack Inventory");
      
      const payload = { ...product, price: Number(product.price) };
      await productService.updateProduct(id as string, payload);
      
      toast.success("Product Updated Successfully", { id: toastId });
      router.push("/admin/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  const handleDelete = async () => {
    const deleteConfirm = window.confirm(`Are you Sure you Want to Delete ${product.name}?`);

    if (deleteConfirm){
      const toastId = toast.loading("Deleting Product");
      try{
        await productService.deleteProduct(id as string);
        toast.success("Product Deleted", { id: toastId });
        router.push("/admin/products");
      }
      catch (error:any){
        toast.error(error.message || "Product Failed to Delete");
      }
    };
  }

  if (loading) return <div className="p-10">Loading product data...</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="bg-[#fbfbfd] flex min-h-screen text-gray-900 font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
                Inventory / Edit Record
              </nav>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900">
                Update {product.name}
              </h1>
            </div>
            <button 
              onClick={handleDelete}
              className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors pb-1"
            >
              Delete Product
            </button>
          </header>
          
          {/* Main Form Container */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-10">
            
            {/* Name & ID Group */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-black/5 transition-all outline-none"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Unique SKU (Read Only)</label>
                <input
                  type="text"
                  className="w-full bg-gray-100 border-none rounded-2xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed outline-none"
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
                    value={product.price}
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
                  <option value="Phone">iPhone</option>
                  <option value="Laptop">MacBook</option>
                  <option value="Tablet">iPad</option>
                  <option value="Watch">Apple Watch</option>
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
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Status</label>
                <select
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                  value={product.isSold ? "sold" : "available"}
                  onChange={(e) => setProduct({ ...product, isSold: e.target.value === "sold" })}
                >
                  <option value="available">In Stock</option>
                  <option value="sold">Sold Out</option>
                </select>
              </div>
            </section>

            {/* Image Link & Visual Preview */}
            <section className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Image Reference URL</label>
                <input
                  type="url"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5"
                  value={product.imageUrl}
                  onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                />
              </div>
              
              {product.imageUrl && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl w-fit border border-gray-100">
                  <img
                    src={product.imageUrl}
                    alt="Current Product"
                    className="w-20 h-20 object-contain rounded-xl bg-white p-2 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Active Preview</span>
                    <span className="text-[9px] text-gray-400 font-medium">Verify image clarity before saving</span>
                  </div>
                </div>
              )}
            </section>

            {/* TAG INPUT SECTION*/}
            <section className="space-y-2">
              <TagInput 
                tags={product.tags} 
                setTags={(newTags) => setProduct({ ...product, tags: newTags })} 
              />
            </section>

            {/* Product Story/Description */}
            <section className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Description</label>
              <textarea
                className="w-full bg-gray-50 border-none rounded-[2rem] p-6 text-sm font-bold min-h-[150px] outline-none focus:ring-2 focus:ring-black/5"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </section>

            
            
            {/* Action Bar */}
            <footer className="pt-6 border-t border-gray-100 flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-800 hover:scale-[1.01] active:scale-95 shadow-lg shadow-black/5"
              >
                Save All Changes
              </button>
              <button
                onClick={() => router.push("/admin/products")}
                className="px-8 bg-gray-100 text-gray-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-200 hover:text-gray-600"
              >
                Back
              </button>
            </footer>

          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProductPage;