import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-[700px] bg-gradient-to-l from-white to-black-600 max-lg:h-[900px] max-md:h-[750px]">
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
          <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            TRADE IN YOUR APPLE PRODUCTS NOW
          </h1>
          <p className="text-white max-sm:text-sm">
            Ready for an upgrade? Turn your pre-loved Apple devices into instant cash or store credit. 
            At ByteBack, we offer a hassle-free trade-in experience with top value for your old iPhones, iPads, and MacBooks. 
            Give your tech a second life and make your next upgrade seamless, sustainable, and smart.
          </p>
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
            <Link 
                href="/trade-in"
                className="bg-white text-black font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 inline-block text-center transition-colors"
              >
                TRADE IN NOW
              </Link>
            <Link href="/checkdevice">
            <button className="bg-white text-black font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 transition-colors">
              CHECK YOUR DEVICE STATUS
            </button>
          </Link>
          </div>
        </div>
        <Image
          src="/TradeInPhone.png"
          width={1200}
          height={1200}
          alt="Trade in Phone PNG"
          className="w-[1000px] h-auto max-lg:w-[800px] max-md:w-[400px] max-sm:w-[250px]"
        />
      </div>
    </div>
  );
};

export default Hero;
