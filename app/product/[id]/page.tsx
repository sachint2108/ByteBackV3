import {
  StockAvailabillity,
  ProductTabs,
  SingleProductDynamicFields,
  
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { productService } from "@/services/productService";
import Link from "next/link";


interface SingleProductPageProps {
  params: Promise<{ id: string }>;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const {id} = await params;

  
  try{
    const prod = await productService.getProductById(id);


    if (!prod){
      notFound();
    }

    return (
      <div className="bg-white min-h-screen font-sans">
        <div className="max-w-screen-xl mx-auto py-12 px-5">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-12 lg:gap-20">
            
            
            
            
            
            
            
            {/* Left Side: Product Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm w-full max-w-md flex items-center justify-center aspect-square">
                <Image
                  src={prod.imageUrl || "/product_placeholder.jpg"}
                  width={500}
                  height={500}
                  alt={prod.name || "Product image"}
                  className="w-full h-full object-contain drop-shadow-md"
                  priority
                />
              </div>
            </div>

            
            
            
            
            {/* Right Side: Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col text-black justify-between py-4">
              
              
              
              
              
              
              <div className="flex flex-col gap-y-8">
                {/* Product Header */}
                <div className="border-b border-gray-100 pb-8">
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
                    {prod.name}
                  </h1>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                    {prod.category} • {prod.condition}
                  </p>
                </div>

                
                
                
                {/* Price*/}
                <div>
                  <p className=" text-green text-5xl font-semibold text-gray-900 tracking-tight">
                    R {Number(prod.price).toLocaleString()}
                  </p>
                </div>

                
                
                
                
                {/* Dynamic Fields Component */}
                <div className="w-full">
                  <SingleProductDynamicFields product={prod} />
                </div>
                <div className="w-full mt-2">
                  <Link
                    href="/cart"
                    className="w-full flex items-center justify-center gap-x-3 bg-white text-black border-2 border-black text-lg font-semibold py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm"
                  >
                    Go to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              </div>
          </div>

          {/* Product Tabs */}
          <div className="py-16 mt-16 border-t border-gray-100">
            <ProductTabs product={prod} />
          </div>
        </div>
      </div>
    );
  }
  catch{
    notFound();
  }
  

  
};

export default SingleProductPage;
