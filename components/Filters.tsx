"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get("price")) || 50000);
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "newest");

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (maxPrice !== 50000) params.set("price", maxPrice.toString());
    if (sortBy !== "newest") params.set("sort", sortBy);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories, maxPrice, sortBy, router]);

  const handleCategoryChange = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    setSelectedCategories(prev => 
      prev.includes(lowerCat) ? prev.filter(c => c !== lowerCat) : [...prev, lowerCat]
    );
  };

  return (
    <div className="flex flex-col gap-10">
      
      
      
      {/* 1. SORTING SECTION */}
      <section>
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
          Order By
        </label>
        <div className="relative">
          <select 
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold text-gray-900 appearance-none cursor-pointer focus:ring-2 focus:ring-black/5 transition-all"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetical: A - Z</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      
      
      
      
      {/* 2. PRICE SECTION - Neutral Styling */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Budget Limit
          </label>
          <span className="text-sm font-black text-gray-900 tabular-nums">
            R {maxPrice.toLocaleString()}
          </span>
        </div>
        
        <div className="relative group px-1">
          <input
            type="range" 
            min={1000} 
            max={50000} 
            step={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black transition-all hover:bg-gray-200"
          />
          <div className="flex justify-between mt-3">
             <span className="text-[10px] font-bold text-gray-300">R1,000</span>
             <span className="text-[10px] font-bold text-gray-300">R50k</span>
          </div>
        </div>
      </section>

      
      
      
      
      {/* 3. CATEGORIES SECTION */}
      <section>
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
          Device Type
        </label>
        <div className="space-y-2">
          {["Phone", "Laptop", "Tablet"].map((cat) => {
            const isSelected = selectedCategories.includes(cat.toLowerCase());
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                  isSelected 
                    ? "bg-black border-black text-white shadow-lg shadow-black/10 scale-[1.02]" 
                    : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {cat}
                {isSelected && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. RESET ACTION */}
      {(selectedCategories.length > 0 || maxPrice !== 50000 || sortBy !== "newest") && (
        <button 
          onClick={() => {
            setSelectedCategories([]);
            setMaxPrice(50000);
            setSortBy("newest");
          }}
          className="group flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest transition-all hover:bg-red-100 active:scale-95"
        >
          <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset View
        </button>
      )}
    </div>
  );
};

export default ProductFilters;