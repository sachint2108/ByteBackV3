import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";

const Products = async ({ params, searchParams }:any) => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  
  const slug = awaitedParams?.slug;
  const catergory = slug ? slug[0] : null;



  const prodfromService = catergory
  ? await productService.getProductsByCategory(catergory)
  : await productService.getAllProducts();

  
  const displayProd = prodfromService || [];

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {displayProd.length > 0 ? (
        displayProd.map((product: any) => (
          <ProductItem key={product.id || product._id} product={product} color="black" />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <h3 className="text-2xl text-black font-medium">
            No {slug ? slug[0] : "products"} found in our inventory.
          </h3>
          <p className="text-gray-500 mt-2">Check back soon for new ByteBack arrivals!</p>
        </div>
      )}
    </div>
  );
};

export default Products;