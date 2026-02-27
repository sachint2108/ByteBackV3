import React from "react";
import { ProductItem } from "@/components";
import { aiSmartSearch } from "@/services/aiSearchService";

interface Props {
  searchParams: any;
}

const SearchPage = async ({ searchParams }: Props) => {

  const sp = await searchParams;
  

  const searchQuery = sp?.query || sp?.search || ""; // Cheack query and url to be safe

  let products: any[] = [];

  try {
    if (searchQuery) {
      const aiResult = await aiSmartSearch(searchQuery);
      if (aiResult.success) {
        products = aiResult.matchedProducts || [];
      } else {
        console.error("Smart Search Failed:", aiResult.error);
      }
    }
  } catch (error) {
    console.error('Error Fetching Search Results:', error);
  }

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-16 animate-fade-in-up">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            AI Search Results
          </p>
          {searchQuery ? (
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">
              Matches For <span className="text-black">&quot;{searchQuery}&quot;</span>
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">
              All Products
            </h1>
          )}
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <div className="col-span-full w-full max-w-2xl mx-auto text-center py-20 px-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mt-8">

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-8 ring-1 ring-inset ring-gray-100">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
                No Exact Matches Found
              </h3>
              
             <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-10">
                We Couldn&apos;t Find any Devices Matching <span className="font-semibold text-gray-900">&quot;{searchQuery}&quot;</span>. Try adjusting your AI prompt or browsing our main categories.
              </p>
              
              <a 
                href="/products" 
                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
              >
                Browse All Inventory
              </a>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SearchPage;