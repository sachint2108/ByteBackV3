"use client";
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface QuantityInputProps {
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({quantityCount, setQuantityCount} : QuantityInputProps) => {


  const handleQuantityChange = (action: string): void => {
    if (action === "plus") {
      setQuantityCount(quantityCount + 1);
    } else if (action === "minus" && quantityCount !== 1) {
      setQuantityCount(quantityCount - 1);
    }
  };

  return (
    <div className="flex items-center gap-x-6">
      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quantity</p>

      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-1 shadow-sm">
        <button
          type="button"
          className="w-10 h-10 flex justify-center items-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus className="text-sm" />
        </button>

        <input
          type="number"
          disabled={true}
          value={quantityCount}
          className="h-10 w-16 bg-transparent text-center text-lg font-semibold text-gray-900 border-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
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

export default QuantityInput;
