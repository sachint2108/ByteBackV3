import { Loader } from "@/components/Loader";
import { CartModule } from "@/components/modules/cart";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">

      <div className="mx-auto max-w-screen-2xl px-5 pb-24 pt-12 sm:px-6 lg:px-12">
        

        <div className="border-b border-gray-100 pb-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            ByteBack Shopping Cart
          </h1>
        </div>

        <Suspense fallback={<Loader />}>
          <CartModule />
        </Suspense>
        
      </div>
    </div>
  );
};

export default CartPage;
