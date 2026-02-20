"use client";
import React, { useState } from "react";
import QuantityInput from "./QuantityInput";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";
import BuyNowSingleProductBtn from "./BuyNowSingleProductBtn";

const SingleProductDynamicFields = ({ product }: { product: any }) => {
  const [quantityCount, setQuantityCount] = useState<number>(1);
  return (
    <div className="flex flex-col gap-y-8 mt-6 w-full">
      <QuantityInput
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
      />
      
      <div className="pt-8 border-t border-gray-100">
        <AddToCartSingleProductBtn
          quantityCount={quantityCount}
          product={product}
        />
      </div>
    </div>
  );
};

export default SingleProductDynamicFields;
