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

  // Fetch current data while on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id as string);
        setProduct(data);
      } catch (error) {
        toast.error("Could not load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const toastId = toast.loading("Updating ByteBack inventory...Please Hold Tight!");
      
      const payload = { ...product, price: Number(product.price) };
      await productService.updateProduct(id as string, payload);
      
      toast.success("Product Updated Successfully!", { id: toastId });
      router.push("/admin/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    const deleteConfirm = window.confirm(`Are you sure you want to delete ${product.name}?`);

    if (deleteConfirm){
      try{
        const toastId = toast.loading("Deleting Product...");
        router.push("/admin/products");
      }
      catch (error:any){
        toast.error(error.message || "Product failed to Delete");
      }
    };
  }

  if (loading) return <div className="p-10">Loading product data...</div>;
  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="bg-gray-50 flex justify-start min-h-screen text-black font-sans">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 p-10 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight">Edit {product?.name}</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6">
          
          {/* Product Name */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Product Name:</span></div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </label>





            {/*SKU*/}

            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Custom ID (SKU):</span></div>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                value={product.id}
                readOnly
              />
            </label>
          </div>

          {/* Price*/}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-semibold">Price (ZAR):</span></div>
              <input
                type="number"
                className="input input-bordered w-full"
                value={product.price}
                onChange={(e) => {
                  const cleanNumber = e.target.value.replace(/^0+(?=\d)/, ''); 
                  setProduct({ ...product, price: cleanNumber }); 
                }}
              />
            </label>




            {/*category*/}
            
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



            {/*Status*/}
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
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </label>
          </div>





          {/* Update Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleUpdate}
              type="button"
              className="btn bg-blue-600 hover:bg-blue-700 text-white flex-1 h-14 border-none shadow-sm text-lg"
            >
              Save Changes
            </button>


            {/*Delete Btn */}
            <button
              onClick={handleDelete}
              type="button"
              className="btn bg-red-500 hover:bg-red-600 text-white px-10 h-14 border-none shadow-sm text-lg"
            >
              Delete Product
            </button>
          </div>

        </div>
      </div>
    </div>
  );


};

export default EditProductPage;