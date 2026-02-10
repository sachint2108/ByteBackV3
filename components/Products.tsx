import React from "react";
import ProductItem from "./ProductItem";
import { productService } from "@/services/productService";

const Products = async () => {
  const products = await productService.getAllProducts();
  
  return (<div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full text-black">
          No products found in Firestore
        </h3>
      )}
    </div>
  );
};

export default Products;