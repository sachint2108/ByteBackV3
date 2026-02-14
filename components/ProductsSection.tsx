/*note: This component is responsible for displaying the products section on the homepage. 
It fetches the products from the product service and renders them using the ProductItem component. The section is styled with a gradient background and responsive grid layout to ensure a visually appealing presentation of the products.*/

import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";

const ProductsSection = async () => {
  const products = await productService.getAllProducts();

  return (
    <div className="bg-gradient-to-l from-white to-black-600 py-10">
      <div className="max-w-screen-2xl mx-auto px-16 max-md:px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          New Arrivals
        </h2>
        
        <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem 
                key={product.id} 
                product={product} 
                color="black"
              />
            ))
          ) : (
            <div className="text-xl text-gray-500 col-span-full text-center">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;