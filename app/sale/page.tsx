"use client";
import React, { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import ProductItem from "@/components/ProductItem"; 
import Link from "next/link";

const SalePage = () => {
  const [saleProducts, setSaleProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleItems = async () => {
      try {
   
        const products = await productService.getProductsByTag("SALE");
        setSaleProducts(products);
      } catch (error) {
        console.error("Failed to load sale items");
      } finally {
        setLoading(false);
      }
    };

    fetchSaleItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans pb-24">
      
 
      <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500 mb-4 block">
          Limited Time Offers
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6">
          ByteBack Sale
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Grab our certified refurbished tech at unbeatable prices before they are gone.
        </p>
      </header>


      <main className="max-w-7xl mx-auto px-6">
        {loading ? (
        
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></span>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Loading Deals</p>
          </div>
        ) : saleProducts.length > 0 ? (
   
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {saleProducts.map((product) => (
              <ProductItem 
                key={product.id} 
                product={product} 
                color="bg-white" 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-3">No active sales right now.</h3>
            <p className="text-gray-500 mb-8">Check back later for new discounts on our top tech.</p>
            <Link 
              href="/"
              className="bg-black text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </main>
      
    </div>
  );
};

export default SalePage;