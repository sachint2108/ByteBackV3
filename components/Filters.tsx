"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";

const AVAILABLE_CATEGORIES = [
  { id: "phone", label: "Phones" },
  { id: "laptop", label: "Laptops" },
  { id: "tablet", label: "iPads" },
];

const MAX_STORE_PRICE = 50000;

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    Number(searchParams.get("price")) || MAX_STORE_PRICE
  );

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }


    if (maxPrice < MAX_STORE_PRICE) {
      params.set("price", maxPrice.toString());
    } else {
      params.delete("price");
    }

    params.set("sort", sortBy);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  }, [selectedCategories, maxPrice, sortBy, page, pathname, replace]);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm h-fit sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          Filter
        </h3>
        
        
        
        
        {/* Reset Button */}
        {(selectedCategories.length > 0 || maxPrice < MAX_STORE_PRICE) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setMaxPrice(MAX_STORE_PRICE);
            }}
            className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="h-px w-full bg-gray-100 mb-8"></div>

      
      
      
      {/* Categories Filter */}
      <div className="mb-10">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Categories
        </h4>
        <div className="flex flex-col gap-y-3">
          {AVAILABLE_CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="group flex items-center cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-black checked:border-black transition-all cursor-pointer"
                />
                
                
                
                
                {/* Custom Checkmark SVG */}
                <svg
                  className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-black transition-colors">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 mb-8"></div>

      
      
      
      
      
      {/* Price Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Max Price
          </h4>
          <span className="text-sm font-black text-gray-900">
            R {maxPrice.toLocaleString()}
          </span>
        </div>
        
        <input
          type="range"
          min={0}
          max={MAX_STORE_PRICE}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-bold text-gray-400">R 0</span>
          <span className="text-[10px] font-bold text-gray-400">R {MAX_STORE_PRICE.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
};

export default Filters;