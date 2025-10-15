"use client";

import React from "react";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useSection } from "@/components/content/providers/ContentProvider";

export function HeroSection() {
  const { data: heroContent, isLoaded } = useSection("hero");
  return (
    <section className="relative h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] bg-[#ECEAE4] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden z-0"
        data-node-id="115-7375"
      >
      <div className="absolute inset-0">
          {isLoaded && heroContent?.background_image ? (
            <img
              src={heroContent.background_image.url || heroContent.background_image.supabase_url}
              alt={heroContent.background_image.alt_text || "Hero background"}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/Vector.png"
              alt="Background pattern"
              className="w-full h-full object-cover opacity-20"
            />
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 sm:px-6 py-[80px] sm:py-[100px] md:py-[120px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-center font-['Public_Sans'] text-[#1E1E1E] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-semibold leading-normal tracking-[-0.64px] sm:tracking-[-0.8px] md:tracking-[-0.96px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] w-[343px] sm:w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] mx-auto px-4">
        {isLoaded && heroContent?.headline ? heroContent.headline : "Collaborative Growth Through Impactful Digital Strategies."}
          </h1>
          <p className="text-center mt-4 font-['Public_Sans'] text-[#1E1E1E] text-[14px] sm:text-[13px] md:text-[14px] font-normal leading-[20px] sm:leading-[19px] md:leading-[20px] w-[333px] sm:w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] mx-auto px-4">
            {isLoaded && heroContent?.subheadline ? heroContent.subheadline : "Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non."}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {isLoaded && heroContent?.cta_button && (
            <AnimatedButton
              variant="primary"
              hasArrow={true}
              href={heroContent.cta_button.href}
              target={heroContent.cta_button.is_external ? "_blank" : "_self"}
              rel={heroContent.cta_button.is_external ? "noopener noreferrer" : undefined}
              className="rounded-[100px]"
            >
              {heroContent.cta_button.text}
            </AnimatedButton>
          )}
        </div>
      </div>
    </section>
  );
}