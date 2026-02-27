import PaymentClient from "./client/PaymentClient";


export const viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Secure Payment | ByteBack",
  description: "Complete your purchase securely via Paystack",
};

export default function Page() {
  return <PaymentClient />;
}