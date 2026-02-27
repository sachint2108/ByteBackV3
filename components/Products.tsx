import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";
import ProductFilters from "./Filters";

const Products = async ({ params, searchParams }: any) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  const slug = awaitedParams?.slug;
  const categoryFromUrl = slug ? slug[0] : null;

  const selectedCategories = (awaitedSearchParams?.categories?.split(",") || [])
    .filter(Boolean)
    .map((cat: string) => cat.toLowerCase());

  const maxPrice = Number(awaitedSearchParams?.price) || 50000;
  const sortBy = awaitedSearchParams?.sort || "newest";

  const prodfromService = categoryFromUrl
    ? await productService.getProductsByCategory(categoryFromUrl)
    : await productService.getAllProducts();
  
  let displayProd = prodfromService || [];

  displayProd = displayProd.filter((product: any) => {
    const productPrice = Number(product.price) || 0;
    const productCategory = (product.category || "").toLowerCase();
    return productPrice <= maxPrice && (selectedCategories.length === 0 || selectedCategories.includes(productCategory));
  });


  if (sortBy === "price-asc") displayProd.sort((a: any, b: any) => (Number(a.price) || 0) - (Number(b.price) || 0));
  else if (sortBy === "price-desc") displayProd.sort((a: any, b: any) => (Number(b.price) || 0) - (Number(a.price) || 0));
  else if (sortBy === "title-asc") displayProd.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));

  return (
    <div className="bg-[#f5f5f7] min-h-screen pb-32">
      
      
      {/* Dynamic Header: Monochromatic & Sleek */}
      <header className="max-w-[1400px] mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            ByteBack Verified Tech
          </span>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter capitalize leading-[0.9]">
              {categoryFromUrl ? categoryFromUrl.replace("-", " ") : "All Store"}
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-bold text-gray-500 tabular-nums uppercase tracking-widest">
                {displayProd.length} Units Available
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-16">
        
        {/* Neutral Glass Sidebar */}
        <aside className="w-full lg:w-[300px] shrink-0">
          <div className="sticky top-12 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Filters</h2>
               <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
            </div>
            <ProductFilters />
          </div>
        </aside>

        {/* The Grid */}
        <main className="flex-1">
          {displayProd.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {displayProd.map((product: any) => (
                <div key={product.id} className="group transition-all duration-700">
                  <ProductItem product={product} color="black" />
                </div>
              ))}
            </div>
          ) : (

            <div className="w-full py-40 flex flex-col items-center justify-center bg-white/50 rounded-[4rem] border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Stock unavailable.</h3>
              <p className="text-gray-400 text-sm mt-2 font-medium">Try adjusting your filters for better results.</p>
              <button className="mt-8 px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors">
                Reset Storefront
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;