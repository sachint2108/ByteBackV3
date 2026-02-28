import {
  Breadcrumb,
  Products,
} from "@/components";
import React from "react";



export const dynamic = "force-dynamic";

const ShopPage = async ({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug?: string[] }> 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  return (
    <div className="text-black bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-10 max-sm:px-5 py-10">

        <Breadcrumb />
        
        <div className="mt-8">
         
          <Products 
            params={awaitedParams} 
            searchParams={awaitedSearchParams} 
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;