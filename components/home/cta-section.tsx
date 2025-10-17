"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { AnimatedButton } from "@/components/ui/animated-button";


export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SectionContainer
      background="custom"
      padding="xl"
      maxWidth="xl"
      nodeId="1-1179"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[120px]"
      ref={sectionRef}
    >
      <div
        className="max-w-7xl mx-auto bg-[#F1FF66] rounded-[24px]"
        style={{
          animation: isVisible ? 'fadeInScale 0.8s ease-out 0.2s both' : 'none'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Left side - Image */}
          <div className="lg:w-1/3 flex justify-start" style={{
            animation: isVisible ? 'slideInLeft 0.8s ease-out 0.4s both' : 'none'
          }}>
            <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[432/441] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden" data-node-id="115-10779">
              <Image
                src="/cta-image.png"
                alt="Digital transformation illustration"
                width={432}
                height={441}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-2/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left" style={{
            animation: isVisible ? 'slideInRight 0.8s ease-out 0.6s both' : 'none'
          }}>
            <Typography
              variant="section-title"
              className="w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] mb-[16px]"
              style={{
                color: "#1E1E1E",
                letterSpacing: "-0.88px",
                fontWeight: "500"
              }}
            >
              Accelerate Your Digital Growth
            </Typography>

            <Typography
              variant="section-description"
              className="w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] text-[12px] sm:text-[13px] md:text-[14px] mb-[24px]"
              style={{
                color: "#1E1E1E"
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.
            </Typography>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-6 mb-[24px] justify-center lg:justify-start" style={{
                animation: isVisible ? 'fadeInUp 0.6s ease-out 0.8s both' : 'none'
              }}>
              <AnimatedButton
                variant="secondary"
                hasArrow={true}
                className="bg-[#1E1E1E]"
                style={{
                  animation: isVisible ? 'bounceIn 0.6s ease-out 1s both' : 'none'
                }}
              >
                Free Consultation
              </AnimatedButton>

              <AnimatedButton
                variant="ghost"
                hasArrow={true}
                className="bg-transparent hover:bg-transparent"
                style={{
                  animation: isVisible ? 'bounceIn 0.6s ease-out 1.2s both' : 'none'
                }}
              >
                Get 1 Month Free Service Charge
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </SectionContainer>
  );
}