"use client";

import React from "react";
import { AnimatedButton } from "@/components/ui/animated-button";

export function HeroSection() {
  return (
    <section className="relative h-screen bg-[#ECEAE4] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-x-0 top-0 h-[400px] sm:h-[500px] md:h-[652px] overflow-hidden"
        data-node-id="115-7375"
      >
        <div className="absolute inset-0">
          <img
            src="/Vector.png"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between h-full px-4 sm:px-6 py-[80px] sm:py-[100px] md:py-[120px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-center font-['Public_Sans'] text-[#1E1E1E] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-semibold leading-normal tracking-[-0.64px] sm:tracking-[-0.8px] md:tracking-[-0.96px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] mx-auto px-4">
            Collaborative Growth Through Impactful Digital Strategies.
          </h1>
          <p className="text-center mt-4 font-['Public_Sans'] text-[#1E1E1E] text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[18px] sm:leading-[19px] md:leading-[20px] w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] mx-auto px-4">
            Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.
          </p>
        </div>

        {/* Scroll Down Button */}
        <div className="relative bottom-0" data-node-id="115-10838">
          <AnimatedButton
            variant="primary"
            hasArrow={true}
            arrowDirection="down"
            className="rounded-[100px]"
          >
            Scroll Down!
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}