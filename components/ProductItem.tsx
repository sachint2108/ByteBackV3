"use client";
import React from "react";
import Link from "next/link";
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
    <div className="flex flex-col items-center gap-y-2 w-full relative">

      <div className="relative w-full flex justify-center">
        

        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents navigating to the product page when clicking the heart
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-400 text-xl hover:text-red-500 transition-colors" />
          )}
        </button>












      <Link href={`/product/${product.id}`}>
        <img
          src={product.imageUrl ? product.imageUrl : "/product_placeholder.jpg"}
          className="w-auto h-[300px] object-contain"
          alt={product?.name || "Product image"}
          loading="lazy" 
        />
      </Link>
      </div>
      
      <Link
        href={`/product/${product.id}`}
        className={
          color === "black"
            ? `text-xl text-black font-normal mt-2 uppercase text-center`
            : `text-xl text-white font-normal mt-2 uppercase text-center`
        }
      >
        {product.name}
      </Link>
      
      <p
        className={
          color === "black"
            ? "text-lg text-black font-semibold"
            : "text-lg text-white font-semibold"
        }
      >
        R{product.price}
      </p>

      <Link
        href={`/product/${product?.id}`}
        className="block flex justify-center items-center w-full uppercase bg-white px-0 py-2 text-base border border-gray-300 font-bold text-black-600 shadow-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2"
      >
        <p>View product</p>
      </Link>
    </div>
  );
};

export default ProductItem;