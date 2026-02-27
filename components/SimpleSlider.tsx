"use client";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    fade: true, 
    cssEase: "cubic-bezier(0.87, 0.03, 0.4, 0.9)", 
  };

  const slides = [
    {
      id: 1,
      title: "The New iPhone Collection",
      subtitle: "Premium devices, ByteBack prices.",
      link: "/shop",
      image: "https://www.istore.co.za/media/catalog/product/i/p/iphone_15_pro_natural_titanium_pdp_image_position-1__en-za_1.jpg"
    },
    {
      id: 2,
      title: "MacBook Pro Performance",
      subtitle: "Unleash your creativity with M3 power.",
      link: "/shop",
      image: "https://www.istore.co.za/media/catalog/product/m/a/macbook_pro_14-in_space_black_pdp_image_position-1__en-za.jpg"
    }
  ];

  return (
    <section className="slider-container max-w-[1440px] mx-auto px-4 lg:px-10 mb-16 mt-6">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-[3rem] overflow-hidden bg-white shadow-xl border border-gray-100">
              
              {/* CONTENT LAYER */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-transparent via-white/20 to-white/60">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                    {slide.title}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-xl lg:text-2xl text-gray-800 font-medium mb-10 max-w-xl opacity-90">
                    {slide.subtitle}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link 
                    href={slide.link} 
                    className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-black font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800"
                  >
                    Shop Now
                    <svg className="w-5 h-5 ml-2 -mr-1 transition-all duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
              </div>


              <div className="absolute inset-0 z-10">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-contain lg:object-cover transition-transform duration-10000 hover:scale-110"
                  sizes="(max-width: 1440px) 100vw"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>


      <style jsx global>{`
        .hero-slider .slick-dots {
          bottom: 30px;
        }
        .hero-slider .slick-dots li button:before {
          font-size: 12px;
          color: black;
          opacity: 0.2;
        }
        .hero-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: black;
        }
      `}</style>
    </section>
  );
}

export default SimpleSlider;