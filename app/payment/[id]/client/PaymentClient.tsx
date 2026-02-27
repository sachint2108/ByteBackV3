"use client";
import React from "react";
import { usePayment } from "@/hooks/payment";
import { PaystackButton } from "react-paystack";

export default function PaymentClient() {
  const { order, load, id, paystackConfig, paymentSuccess, handleClose } = usePayment();

  if (load) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden">
            <div className="w-full h-full bg-black animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Initialising Gateway
          </p>
        </div>
      </div>
    );
  }

  if (!order || !paystackConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-xs">
          <h2 className="text-2xl font-black tracking-tighter mb-2">Order Not Found</h2>
          <p className="text-sm text-gray-500 mb-8">
            We couldn't retrieve the details for this transaction. It may have expired.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const componentProps = {
    ...paystackConfig,
    text: `Pay R${order.moneyInformation.total.toLocaleString()}`,
    onSuccess: (reference: any) => paymentSuccess(reference),
    onClose: handleClose,
    className: "w-full bg-black text-white font-black py-5 rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl shadow-black/10 uppercase text-[11px] tracking-[0.2em]"
  };

  return (
    <div className="bg-[#fbfbfd] min-h-screen flex items-center justify-center px-6 font-sans text-gray-900">
      <div className="max-w-md w-full">
        <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 text-center">
          
          <header className="mb-12">
            <nav className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-3">
              Checkout Intelligence
            </nav>
            <h1 className="text-3xl font-black tracking-tighter uppercase">Secure Payment</h1>
            <div className="mt-4 inline-block bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
              <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                REF: {id}
              </p>
            </div>
          </header>

          <div className="mb-14">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] mb-2">
              Total Amount Due
            </p>
            <div className="flex items-start justify-center">
              <span className="text-xl font-black mt-2 mr-1">R</span>
              <p className="text-7xl font-black tracking-tighter text-black">
                {order.moneyInformation.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-8">
             <PaystackButton {...componentProps} />
             
             <div className="flex items-center justify-center gap-4 opacity-30">
               <div className="h-[1px] flex-1 bg-gray-300"></div>
               <p className="text-[8px] font-black uppercase tracking-[0.3em]">
                 End-to-End Encrypted
               </p>
               <div className="h-[1px] flex-1 bg-gray-300"></div>
             </div>
          </div>
          
          <footer className="mt-12 pt-8 border-t border-gray-50">
             <p className="text-[9px] font-black text-gray-300 uppercase mb-3 tracking-widest">Sandbox Credentials</p>
             <div className="bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
                <p className="text-[11px] font-medium text-gray-500">
                  Card: <span className="font-mono font-bold text-black tracking-wider">4084 0840 8408 4084</span>
                </p>
             </div>
          </footer>
        </div>

        <button 
          onClick={() => window.history.back()}
          className="mt-8 text-gray-400 text-[10px] font-black hover:text-black transition-colors w-full text-center uppercase tracking-[0.3em]"
        >
          ← Abort Transaction
        </button>
      </div>
    </div>
  );
}