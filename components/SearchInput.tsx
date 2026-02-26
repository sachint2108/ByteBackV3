"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSmartSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsSearching(true);
    const toastId = toast.loading("Fetching Products Using AI Search");
    
    router.push(`/search?query=${encodeURIComponent(searchInput)}`);
    setSearchInput("");


    setTimeout(() => {
      toast.success("Search complete", { id: toastId });
      setIsSearching(false);
    }, 3000);
  };

  return (
  <form 

    className="flex w-full max-w-2xl mx-auto h-14 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all items-center pl-4 pr-1.5" 
    onSubmit={handleSmartSearch}
  >
    
   
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Search using AI... e.g. 'iPhone under 15k'"
      disabled={isSearching}

      className="flex-grow bg-transparent px-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:outline-none focus:ring-0 border-none disabled:bg-transparent"
    />


    <Link 
      href="/image-search"
      title="Search by Image"
      className="flex items-center justify-center p-2 mr-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    </Link>


    <button 
      type="submit" 
      disabled={isSearching}
      className="h-11 bg-black text-white rounded-full px-8 hover:bg-gray-800 transition-all font-bold text-xs uppercase tracking-widest disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
    >
      {isSearching ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        </>
      ) : (
        "Search"
      )}
    </button>
  </form>
);
};

export default SearchInput;