// Role of the component: Search input element located in the header but it can be used anywhere in your application
// Name of the component: SearchInput.tsx

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sanitize } from "@/lib/sanitize";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedSearch = sanitize(searchInput);
    router.push(`/search?search=${encodeURIComponent(sanitizedSearch)}`);
    setSearchInput("");
  };

  return (
    <form className="flex w-full justify-center group" onSubmit={searchProducts}>
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Search for iPhones, MacBooks..."
    className="bg-gray-50 input input-bordered w-[70%] rounded-l-full rounded-r-none border-r-0 outline-none focus:outline-none focus:border-gray-300 transition-all px-6 max-sm:w-full"
  />
  <button 
    type="submit" 
    className="btn bg-gray-300 text-gray-700 border-l-0 border-gray-300 rounded-l-none rounded-r-full hover:bg-gray-300 hover:border-gray-400 px-8 transition-colors font-semibold"
  >
    Search
  </button>
</form>
  );
};

export default SearchInput;
