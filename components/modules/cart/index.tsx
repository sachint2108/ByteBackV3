"use client"

import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import Image from "next/image"
import Link from "next/link";
import { FaCheck, FaXmark } from "react-icons/fa6";
import QuantityInputCart from "@/components/QuantityInputCart";

export const CartModule = () => {

  const { products, removeFromCart, calculateTotals, subtotal, vat, total } =
    useProductStore(); // Pulling from Zustand

  const removeQuantity = (id: string) => {
    removeFromCart(id);
    calculateTotals();
    toast.success("Product removed from the cart");
  };
  return (
    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
            <Link href="/shop" className="text-black font-semibold mt-4 inline-block hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {products.map((product) => (
              <li key={product.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <Image
                    width={192}
                    height={192}
                    src={product.image || "/product_placeholder.jpg"}
                    alt={product.name}
                    className="h-24 w-24 rounded-xl border border-gray-100 object-contain object-center sm:h-32 sm:w-32 p-2 bg-gray-50"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">

                          <Link href={`/product/${product.id}`} className="hover:text-gray-600 transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-500">

                        R {Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <QuantityInputCart product={product} />
                      <div className="absolute right-0 top-0">
                        <button
                          onClick={() => removeQuantity(product.id)}
                          type="button"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <span className="sr-only">Remove</span>
                          <FaXmark className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>





                  {/*No stock is checked for since it was not in the requirements*/}
                  <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    <FaCheck className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span>In stock and ready to ship</span>
                  </p>




                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      
      
      
      
      
      {/* Order summary Section in the Cart Module */}
      <section
        aria-labelledby="summary-heading"
        className="mt-16 rounded-2xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-100"
      >
        <h2 id="summary-heading" className="text-xl font-bold text-gray-900">
          Order summary
        </h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal (Excl. VAT)</dt>

            <dd className="text-sm font-medium text-gray-900">R {subtotal.toLocaleString()}</dd>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex items-center text-sm text-gray-600">
              <span>Shipping</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {subtotal > 0 ? "R 200" : "R 0"}
            </dd>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex text-sm text-gray-600">
              <span>VAT (15%)</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              R {Math.round(vat).toLocaleString()}
            </dd>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-lg font-bold text-gray-900">Order total</dt>
            <dd className="text-lg font-bold text-gray-900">
              R {total.toLocaleString()}
            </dd>
          </div>
        </dl>

        
        
        
        {products.length > 0 && (
          <div className="mt-8">
            <Link
              href="/checkout"
              className="w-full flex justify-center items-center gap-x-3 bg-black text-white text-lg font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </section>
    </form>
  );

}
