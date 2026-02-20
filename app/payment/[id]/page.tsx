"use client";
import { usePayment } from "@/hooks/payment";
import { PaystackButton } from "react-paystack";

const PaymentPage = () => {
  const { order, load, id, paymentSuccess, handleClose } = usePayment();

  if (load) return <div className="py-20 text-center animate-pulse">Setting up secure gateway...</div>;
  if (!order) return <div className="py-20 text-center">Order not found.</div>;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: order.customerInformation.email,
    amount: order.moneyInformation.total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY as string,
    currency: "ZAR",
  };

  const componentProps = {
    ...config,
    text: `Pay R${order.moneyInformation.total.toLocaleString()}`,
    onSuccess: (reference: any) => paymentSuccess(reference),
    onClose: handleClose,
    className: "w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg"
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full">
        
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Secure Payment
          </h1>
          <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.3em] font-mono bg-gray-50 py-1 rounded-full w-fit mx-auto px-4">
            REF: {id}
          </p>
          
          <div className="my-12">
            <p className="text-[11px] text-gray-400 uppercase font-bold tracking-widest mb-2">
              Amount Due
            </p>
            <p className="text-6xl font-black text-black tracking-tighter">
              R {order.moneyInformation.total.toLocaleString()}
            </p>
          </div>

          <div className="space-y-6">
             <PaystackButton {...componentProps} />
             
             <div className="flex items-center justify-center gap-2">
               <span className="h-[1px] w-8 bg-gray-100"></span>
               <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
                 Powered by Paystack
               </p>
               <span className="h-[1px] w-8 bg-gray-100"></span>
             </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100">
             <p className="text-[10px] text-gray-400 uppercase mb-2 tracking-tighter">Testing Credentials</p>
             <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200">
                <p className="text-xs text-gray-600">
                  Card: <span className="font-mono font-bold text-black">4084 0840 8408 4084</span>
                </p>
             </div>
          </div>
        </div>

        <button 
          onClick={() => window.history.back()}
          className="mt-8 text-gray-400 text-xs hover:text-black transition-colors w-full text-center uppercase tracking-widest font-bold"
        >
          ← Cancel and go back
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;