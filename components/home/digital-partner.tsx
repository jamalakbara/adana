"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";

const imgImage265 = "https://s3-alpha-sig.figma.com/img/1b36/d851/62005bd1ffa39c21001b3d7c9f6200f4?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rQzdy--4cZxepGPh8k5Ijj3vgTIa~Xw~QshZ~-U5sVP3j2EBaGwxHPzwRQXMGuqxBQNQDaFZ1iSUGtcB734nb3How0aSClKqloOG~-lEx1dlQ-CDc2TEYOhjBcMbvwmCmcuzSH5mx4FVlDDnVQH9A~g64m6Hml29h1agBoEq1eth39MkUTm3R5IaGkYbXdJZXYZ-zQFDNVNkxHK671y-bswXD0vpqXRLtn4nyCYvTUdjmCTGLmxCPwDN9OPJ9t0l5xMX~nEifZ0I73RP4oVi5Qspk62l87AOv8FD8WgxDk4Djs3~3yUBIdhbQjkzfudhb4s8bUgBIHX7nlSDyxyv2g__";
const imgPowerBiLogo1 = "https://s3-alpha-sig.figma.com/img/49ff/4fa2/c9e9f64e7769b8dc6246fb305011c527?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oF3ub1wvv3rSjzK4R5OSX33OmgoWz~rDWGwNIFITTk6ogEkMP9Ol~UIw6hRCQCxUBRA4vCjjKVkpRtgiuTzX9AAVapTnO4thl~dLWdasfrMh8riX~gvsgJfFlAFPVObmIN9XGIEjYOBKqwckXrFVzKHHHgKvkNJ6jfS~XZuA2cnp4MYim-ljHjkB-4PWW-YEjAjd9wMr8THH1G-0kpzxuKFeBwW7xPggotYCcSWpDQwuAy9u-rXbxMhDHEo9I4lLSYkWM3fM1JAfbmfSJXp-zcvwvCd8MihwuOXJXyGurKj7kvxsE2hcg0TsHhHE30dq2Hmeq8ebzmoo3Yx6y1YAWA__";
const imgImage266 = "https://s3-alpha-sig.figma.com/img/8755/6ca6/26c3cc01b8adc9ca461e6b4a2d0f9376?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s5tXOwPxDq4lK-DQc2lx7To-xXFMwBDfWPnOhrKOOHCQlewQ~GBbCo98u6A24i3I6guzXD6vF85Y-A9~zCSxMu9mWpbrSy2Pi3bB35Ez7VJJeceTInGp~eIzgFJRii83acPd40kpmHFnAMHjMHkh-4oM-Z4ugZwULNIB5wUfxiSOPA8E9uuVR4ZuWYQOYRTpS-a1CT1GFnPCt6kgviGR6smbDQVGMCpdG1Kgdhp~xUhfgDari2hmByyFZRbA7u5j9W9ePvfKt2LNMnuSc0fyOaXeX4nwNoB9S~53hbnEJSSVtbiwRYTWCHD7uMi1w908Ik3Fk-z43lvJDG5GK5JOxg__";
const imgImage267 = "https://s3-alpha-sig.figma.com/img/e723/6037/22b821f302aeeadffd325c67f30a6968?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gyoraJmcUy8EwG0pHHmkfsZZ8lnxZPcNmSsmoGiX-08o8Q5q5Pyb0GE9l9HcIPujEqJVJRCu8w4lYIJCtOdXaucqJlZFGz7HqW1G0uIVj66ZROXbUgdAATYEgSyEnosdpQHryZEjJtDvyrEMf5B~~gF2NrASsZ~puMVke7JnBKf0C2yFN6W70zVVUolpWWnURYJK9I7tDjUH7taQGDafdWroywgWrI3B4mjJuFCxM3fc2PPjG12OvGo9zY2IInTkrnvtYCKbqllfMRpDiE4IGvIksNvzGTL0GoyRMn8y9iv-r8AkFwExys7xJ65hYAygjP8kOcoUA-IuESOuck9SCg__";

// Define partner data with their corresponding images
const partnerData = {
  "Agency Partner": [
    { src: imgImage265, alt: "Agency Partner 1" },
    { src: imgImage266, alt: "Agency Partner 2" },
    { src: imgPowerBiLogo1, alt: "Agency Partner 3" },
    { src: imgImage267, alt: "Agency Partner 4" }
  ],
  "Publisher Partner": [
    { src: imgPowerBiLogo1, alt: "Publisher Partner 1" },
    { src: imgImage265, alt: "Publisher Partner 2" }
  ],
  "e-Commerce Platform": [
    { src: imgImage266, alt: "e-Commerce Platform 1" },
    { src: imgImage267, alt: "e-Commerce Platform 2" },
    { src: imgImage265, alt: "e-Commerce Platform 3" }
  ],
  "Marketplace Partner": [
    { src: imgImage267, alt: "Marketplace Partner 1" },
    { src: imgImage265, alt: "Marketplace Partner 2" }
  ],
  "Email Marketing Partner": [
    { src: imgImage265, alt: "Email Marketing Partner 1" },
    { src: imgPowerBiLogo1, alt: "Email Marketing Partner 2" },
    { src: imgImage266, alt: "Email Marketing Partner 3" },
    { src: imgImage267, alt: "Email Marketing Partner 4" }
  ],
  "Social Partner": [
    { src: imgImage265, alt: "Social Partner 1" },
    { src: imgImage266, alt: "Social Partner 2" },
    { src: imgPowerBiLogo1, alt: "Social Partner 3" },
    { src: imgImage267, alt: "Social Partner 4" }
  ]
};

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
      className="bg-[#FCFCF4] h-[60px] sm:h-[70px] md:h-[90px] w-[120px] sm:w-[140px] md:w-[204px] rounded-lg flex items-center justify-center transition-all duration-500 hover:shadow-lg hover:scale-105 hover:bg-white animate-fadeInUp flex-shrink-0"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={152}
        height={40}
        className="max-h-[30px] sm:max-h-[35px] md:max-h-[40px] max-w-[100px] sm:max-w-[120px] md:max-w-[152px] object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}

export function DigitalPartner() {
  const [activePartner, setActivePartner] = useState<string>("Social Partner");

  const currentPartners = partnerData[activePartner as keyof typeof partnerData] || [];
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
            {Object.keys(partnerData).map((partner, index) => (
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