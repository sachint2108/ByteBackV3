import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-l from-white to-black-600" aria-labelledby="footer-heading">
      <div>
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-24 pb-14">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <Image
              src="/bytebacklogo.png"
              alt="ByteBack Logo"
              width={180}
              height={60}
              className="h-auto w-auto rounded-full object-contain bg-gray-50 border border-gray-100 p-2"
            />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
