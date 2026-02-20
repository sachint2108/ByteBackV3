"use client";
import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";





const AddToCartSingleProductBtn = ({ product, quantityCount} : {product: any, quantityCount: number}) => {
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      totalQuantity: quantityCount
    });
    calculateTotals();
    toast.success(`${quantityCount} ${product.name} added to cart`);
  };
  return (
    <button 
      onClick={handleAddToCart}
      className="w-full flex items-center justify-center gap-x-3 bg-black text-white text-lg font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      Add to Cart
    </button>
  );
};

export default AddToCartSingleProductBtn;
