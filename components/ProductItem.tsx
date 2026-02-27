"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "@/context/WishListContext";

const ProductItem = ({
  product,
  color,
}: {
  product: any;
  color: string;
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist?.some((item) => item.productId === product.id);

  return (
    <div className="group relative flex flex-col w-full">
      
      

      <div className="relative w-full aspect-square bg-white rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-out group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:scale-[1.02]">
        

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-6 right-6 z-20 p-3 bg-white/40 backdrop-blur-md rounded-full shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white active:scale-90"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-900 text-lg" />
          )}
        </button>

    
        <Link href={`/product/${product.id}`} className="block w-full h-full p-8">
          <img
            src={product.imageUrl || "/product_placeholder.jpg"}
            className="w-full h-full object-contain transition-transform duration-1000 ease-in-out group-hover:scale-110"
            alt={product?.name || "Product image"}
          />
        </Link>


        <Link
          href={`/product/${product?.id}`}
          className="absolute bottom-0 left-0 w-full py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10"
        >
          View
        </Link>
      </div>


      <div className="mt-6 px-2 flex flex-col items-start gap-1">
        <div className="flex justify-between items-start w-full">
          <Link
            href={`/product/${product.id}`}
            className="text-sm font-black text-gray-900 tracking-tight leading-tight max-w-[70%] group-hover:text-gray-600 transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-sm font-bold text-gray-900 tabular-nums">
            R {product.price?.toLocaleString()}
          </p>
        </div>
        

        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
          {product.category || "Verified Tech"} • {product.condition || "Pristine"}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;