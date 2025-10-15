"use client";

import React from "react";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] bg-[#ECEAE4] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden z-0"
        data-node-id="115-7375"
      >
        <Image
          src="/hero-bg.png"
          alt="Hero background"
          fill
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 sm:px-6 py-[80px] sm:py-[100px] md:py-[120px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-center font-['Public_Sans'] text-[#1E1E1E] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-semibold leading-normal tracking-[-0.64px] sm:tracking-[-0.8px] md:tracking-[-0.96px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] w-[343px] sm:w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] mx-auto px-4">
            Building Growth Through Impactful Digital Strategies
          </h1>
          <p className="text-center mt-4 font-['Public_Sans'] text-[#1E1E1E] text-[14px] sm:text-[13px] md:text-[14px] font-normal leading-[20px] sm:leading-[19px] md:leading-[20px] w-[333px] sm:w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] mx-auto px-4">
            Adana Digital drives business growth through cutting-edge performance and media marketing, empowering businesses to maximize their digital reach and achieve their goals.
          </p>
        </div>

        {/* Scroll Down Button */}
        <div className="relative bottom-0" data-node-id="115-10838">
          <AnimatedButton
            variant="primary"
            hasArrow={true}
            arrowDirection="down"
            className="rounded-[100px]"
            onClick={() => {
              const marqueeSection = document.querySelector('#marquee-clients');
              if (marqueeSection) {
                const navbarHeight = 80; // Account for fixed navbar height
                const elementPosition = marqueeSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Scroll Down!
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}