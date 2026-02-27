import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";
import Filters from "./Filters";

const Products = async ({ params, searchParams }:any) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  const slug = awaitedParams?.slug;
  const categoryFromUrl = slug ? slug[0] : null;

  const selectedCategories = awaitedSearchParams?.categories?.split(",") || [];
  const maxPrice = Number(awaitedSearchParams?.price) || 50000;

  



  const prodfromService = categoryFromUrl
  ? await productService.getProductsByCategory(categoryFromUrl)
  : await productService.getAllProducts();

  
  let displayProd = prodfromService || [];

  displayProd = displayProd.filter((product: any) => {
    const productPrice = Number(product.price) || 0;
    const productCategory = (product.category || "").toLowerCase();


    const passesPrice = productPrice <= maxPrice;


    const passesCategory = selectedCategories.length === 0 || selectedCategories.includes(productCategory);


    return passesPrice && passesCategory;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter capitalize">
          {categoryFromUrl ? categoryFromUrl : "All Devices"}
        </h1>
      </div>

      {/*Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        
        {/* Filters */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <Filters />
        </aside>

       
       
       
        {/* Product Grid */}
        <main className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProd.length > 0 ? (
              displayProd.map((product: any) => (
                <ProductItem key={product.id || product._id} product={product} color="black" />
              ))
            ) : (

              <div className="col-span-full text-center py-20 px-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
                  No products match your filters.
                </h3>
                <p className="text-gray-500 text-sm">
                  Try Increasing your Max price or Clearing Some Categories to See More ByteBack Gear.
                </p>
              </div>
            )}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default Products;