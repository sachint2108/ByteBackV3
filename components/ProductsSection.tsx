/*note: This component is responsible for displaying the products section on the homepage. 
It fetches the products from the product service and renders them using the ProductItem component. The section is styled with a gradient background and responsive grid layout to ensure a visually appealing presentation of the products.*/

import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";

const ProductsSection = async () => {
  const allproducts = await productService.getAllProducts();
  const limitedproducts = allproducts.slice(0, 8);

  return (

    <div className="bg-gradient-to-l from-white to-black-600 py-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
    
        <div className="text-center mb-12">
           <h2 className="text-4xl font-black text-white tracking-tight mb-3">
            Trending Products
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Our best Second-Hand Apple gear, Curated Just for You.
          </p>
        </div>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          {limitedproducts.length > 0 ? (
            limitedproducts.map((product: any) => (
              
             
              <div 
                key={product.id} 
                className="bg-white p-5 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <ProductItem 
                  product={product} 
  
                  color="black"
                />
              </div>
      

            ))
          ) : (
            <div className="text-xl text-gray-500 col-span-full text-center py-20">
              No products Currently Available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;