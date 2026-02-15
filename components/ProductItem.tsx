"use client";
import React from "react";
import Link from "next/link";
import { sanitize } from "@/lib/sanitize";

const ProductItem = ({
  product,
  color,
}: {
  product: any;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.imageUrl ? product.imageUrl : "/product_placeholder.jpg"}
          className="w-auto h-[300px] object-contain"
          alt={product?.name || "Product image"}
          loading="lazy" 
        />
      </Link>
      
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