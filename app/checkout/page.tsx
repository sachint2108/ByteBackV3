"use client";
import Image from "next/image";
import { useCheckout } from "@/hooks/useCheckout"; 
import { Loader } from "@/components/Loader";

const checkoutpage = () =>{
  const { 
    checkoutform, 
    setCheckoutform, 
    isSubmitting, 
    purchase, 
    products, 
    subtotal, 
    vat, 
    total,
    user
  } = useCheckout();

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-24">

      <main className="mx-auto max-w-screen-xl px-5 lg:px-8 mt-12 grid grid-cols-1 gap-x-16 lg:grid-cols-2 lg:gap-x-24">
        
        
        
        
        
        {/* Left Side: Form */}
        <form className="lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="contact-info-heading">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
               <h2 id="contact-info-heading" className="text-2xl font-bold text-gray-900">
                Shipping Details
              </h2>
              <span className="text-xs text-gray-500 italic">Logged in as: {user.email}</span>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name *</label>
                <input
                  type="text" required disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  value={checkoutform.name}
                  onChange={(e) => setCheckoutform({ ...checkoutform, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name *</label>
                <input
                  type="text" required disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  value={checkoutform.lastname}
                  onChange={(e) => setCheckoutform({ ...checkoutform, lastname: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Email Address *</label>
                <input
                  type="email" required disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  value={checkoutform.email}
                  onChange={(e) => setCheckoutform({ ...checkoutform, email: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                <input
                  type="tel" required disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  value={checkoutform.phone}
                  onChange={(e) => setCheckoutform({ ...checkoutform, phone: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address *</label>
                <input
                  type="text" required disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  value={checkoutform.address}
                  onChange={(e) => setCheckoutform({ ...checkoutform, address: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">City *</label>
                  <input
                    type="text" required disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                    value={checkoutform.city}
                    onChange={(e) => setCheckoutform({ ...checkoutform, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Postal Code *</label>
                  <input
                    type="text" required disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-black focus:ring-black sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                    value={checkoutform.postalCode}
                    onChange={(e) => setCheckoutform({ ...checkoutform, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>
        </form>







        {/* Right Side: Order Summary */}
        <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100 lg:col-start-2 lg:row-start-1 mt-10 lg:mt-0 h-fit sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Selection</h2>

          <ul role="list" className="divide-y divide-gray-200 mb-6">
            {products.map((product) => (
              <li key={product?.id} className="flex py-4">
                <Image
                  src={product?.image || "/product_placeholder.jpg"}
                  alt={product?.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-contain bg-white border border-gray-100 p-1"
                />
                <div className="ml-4 flex flex-1 flex-col justify-center">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <h3 className="line-clamp-1">{product?.name}</h3>
                    <p className="ml-4 whitespace-nowrap">R {Number(product?.price).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Quantity: {product?.totalQuantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="space-y-4 border-t border-gray-200 pt-6 text-sm text-gray-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900">R {subtotal.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping Fee</dt>
              <dd className="font-medium text-gray-900">R 200</dd>
            </div>
            <div className="flex justify-between">
              <dt>VAT (15%)</dt>
              <dd className="font-medium text-gray-900">R {Math.round(vat).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <dt className="text-lg font-bold text-gray-900">Total Due</dt>
              <dd className="text-lg font-bold text-gray-900">R {total.toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <button
              type="button"
              onClick={purchase}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-x-3 bg-black text-white text-lg font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Finalizing Order..." : "Pay Now"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );


};
export default checkoutpage;