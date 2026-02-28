import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-20 pt-24 bg-gradient-to-l from-white to-gray-900">
      <div className="text-center flex flex-col gap-y-5 items-center">
        <h2 className="text-white text-8xl font-extrabold text-center mb-2 max-md:text-6xl max-[480px]:text-4xl">
          INTRODUCING <span className="text-black">BYTE</span><span className="text-gray-600">BACK</span>
        </h2>
        <div>
          <p className="text-white text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base">
            Premium Tech. Second-Hand Prices.
          </p>
          <p className="text-white text-center text-1xl font-semibold max-md:text-xl max-[480px]:text-base">
            Upgrade to the Apple gear you love for a fraction of the cost. Certified, tested, and ready for a second life.
          </p>
          <Link 
  href="/shop" 
  className="block text-black bg-white font-bold px-12 py-3 text-xl hover:bg-gray-100 w-96 mt-2 max-md:text-lg max-md:w-72 max-[480px]:w-60 mx-auto rounded-full text-center transition-colors border border-gray-200"
>
  SHOP NOW
</Link>
          
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;
