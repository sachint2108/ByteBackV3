"use client";
import { ProductInCart, useProductStore } from "@/app/_zustand/store";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";


const QuantityInputCart = ({ product } : { product: ProductInCart }) => {
  const [quantityCount, setQuantityCount] = useState<number>(product.totalQuantity);
  const { updateCartAmount, calculateTotals } = useProductStore();

  const handleQuantityChange = (actionName: string): void => {
    if (actionName === "plus") {
      setQuantityCount(() => quantityCount + 1);
      updateCartAmount(product.id, quantityCount + 1);
      calculateTotals();

      
    } else if (actionName === "minus" && quantityCount !== 1) {
      setQuantityCount(() => quantityCount - 1);
      updateCartAmount(product.id, quantityCount - 1);
      calculateTotals();
    }
  };

  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        {" "}
        Quantity{" "}
      </label>

      <div className="flex items-center justify-center rounded border border-gray-200 w-32">
        <button
          type="button"
          className="w-10 h-10 flex justify-center items-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus className="text-sm" />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="h-10 w-12 bg-transparent text-center text-lg font-semibold text-gray-900 border-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="w-10 h-10 flex justify-center items-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default QuantityInputCart;
