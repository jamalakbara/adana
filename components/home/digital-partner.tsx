"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { partnersData } from "@/data";



interface PartnerTagProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

function PartnerTag({ label, isActive = false, onClick }: PartnerTagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-[15px] rounded-[100px] border border-[#DEDACF] transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] relative ${
        isActive
          ? 'bg-[#334e4d] text-[#FCFCF4] font-medium shadow-md'
          : 'bg-[#FCFCF4] text-[#646464] font-normal hover:bg-[#f5f5ed] hover:shadow-sm hover:border-[#c8c4b3]'
      }`}
    >
      <p className="font-['Public_Sans'] leading-[normal] text-[14px] sm:text-[16px] whitespace-nowrap relative z-10">{label}</p>
    </button>
  );
}

interface PartnerCardProps {
  imageSrc: string;
  alt: string;
}

function PartnerCard({ imageSrc, alt, index = 0 }: PartnerCardProps & { index?: number }) {
  return (
    <div
      className="bg-[#FCFCF4] h-[60px] sm:h-[70px] md:h-[90px] w-[120px] sm:w-[140px] md:w-[204px] rounded-lg flex items-center justify-center transition-all duration-500 animate-fadeInUp flex-shrink-0"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={152}
        height={40}
        className="max-h-[30px] sm:max-h-[35px] md:max-h-[40px] max-w-[100px] sm:max-w-[120px] md:max-w-[152px] object-contain"
      />
    </div>
  );
}

export function DigitalPartner() {
  const [activePartner, setActivePartner] = useState<string>("Social Partner");

  const currentPartners = partnersData[activePartner as keyof typeof partnersData] || [];
  const isSmallList = currentPartners.length <= 3;

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="213-124" id="digital-partners">
        {/* Section title */}
        <div className="text-center mb-[12px]">
          <Typography
            variant="section-label"
            className="text-center animate-fadeInDown"
            nodeId="115:10797"
            style={{
              animationDelay: '0.2s'
            }}
          >
            Digital Partner
          </Typography>
        </div>

        {/* Main headline */}
        <div className="text-center mb-[32px] flex justify-center">
          <Typography
            variant="section-title"
            className="text-center animate-fadeInUp w-full max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[888px]"
            nodeId="115:10782"
            style={{
              animationDelay: '0.4s'
            }}
          >
            Your Trusted Digital Partner for
            <br />
            Your Digital Transformation
          </Typography>
        </div>

        {/* Partner tags */}
        <div
          className="mb-[50px] animate-fadeInUp sm:relative"
          style={{
            animationDelay: '0.6s'
          }}
        >
          <div className="absolute left-0 right-0 sm:relative sm:left-auto sm:right-auto">
            <div className="flex sm:flex-wrap sm:justify-center overflow-x-auto scrollbar-hide sm:overflow-visible px-4 sm:px-0"
                 style={{
                   scrollbarWidth: 'none',
                   msOverflowStyle: 'none',
                   maskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                 }}>
            {Object.keys(partnersData).map((partner, index) => (
              <div
                key={partner}
                className="animate-fadeInUp flex-shrink-0"
                style={{
                  animationDelay: `${0.6 + index * 0.1}s`
                }}
              >
                <PartnerTag
                  label={partner}
                  isActive={activePartner === partner}
                  onClick={() => setActivePartner(partner)}
                />
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Partner cards grid */}
        <div
          className="flex justify-center animate-fadeInUp pt-[120px] sm:pt-0 sm:relative"
          style={{
            animationDelay: '0.8s'
          }}
        >
          <div className={`absolute left-0 right-0 sm:relative sm:left-auto sm:right-auto ${isSmallList ? 'flex justify-center' : ''}`}>
            <div className={`flex ${isSmallList ? 'justify-center' : 'sm:flex-wrap sm:justify-center'} gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide sm:overflow-visible px-4 sm:px-0`}
                 style={{
                   scrollbarWidth: 'none',
                   msOverflowStyle: 'none',
                   maskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                 }}>
              {currentPartners.map((partner, index) => (
                <div
                  key={index}
                  className="animate-fadeInUp flex-shrink-0"
                  style={{
                    animationDelay: `${0.8 + index * 0.1}s`
                  }}
                >
                  <PartnerCard
                    imageSrc={partner.src}
                    alt={partner.alt}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add animation keyframes */}
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        </SectionContainer>
  );
}