"use client";

import React, { useState, useEffect } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { AnimatedButton } from "@/components/ui/animated-button";

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
      className={`px-6 py-[15px] rounded-[100px] border border-[#DEDACF] transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
        isActive
          ? 'bg-[#334e4d] text-[#FCFCF4] font-medium shadow-lg'
          : 'bg-[#FCFCF4] text-[#646464] font-normal hover:bg-[#f5f5ed] hover:shadow-md'
      }`}
    >
      <p className="leading-[normal] text-[16px] whitespace-nowrap">{label}</p>
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
      className="bg-[#FCFCF4] h-[70px] sm:h-[80px] md:h-[90px] w-[160px] sm:w-[180px] md:w-[204px] rounded-lg flex items-center justify-center transition-all duration-500 hover:shadow-lg hover:scale-105 hover:bg-white"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="max-h-[40px] max-w-[152px] object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}

export function DigitalPartner() {
  const [activePartner, setActivePartner] = useState<string>("Social Partner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentPartners = partnerData[activePartner as keyof typeof partnerData] || [];

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="213-124" className="overflow-hidden">
        {/* Section title */}
        <div className="text-center mb-[16px]">
          <Typography
            variant="section-label"
            className="text-center"
            nodeId="115:10797"
            style={{
              animation: isVisible ? 'fadeInDown 0.8s ease-out 0.2s both' : 'none'
            }}
          >
            Digital Partner
          </Typography>
        </div>

        {/* Main headline */}
        <div className="text-center mb-[80px] flex justify-center">
          <h1
            className="w-full max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[888px] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
            style={{
              color: "#1E1E1E",
              textAlign: "center",
              fontFamily: '"Public Sans"',
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
            }}
            data-node-id="115:10782"
          >
            Your Trusted Digital Partner for
            <br />
            Your Digital Transformation
          </h1>
        </div>

        {/* Partner tags */}
        <div
          className="flex flex-wrap justify-center mb-[40px] sm:mb-[60px] md:mb-[80px]"
          style={{
            animation: isVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
          }}
        >
          {Object.keys(partnerData).map((partner, index) => (
            <div
              key={partner}
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${0.6 + index * 0.1}s both` : 'none',
                opacity: 0,
                transform: 'translateY(20px)'
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

        {/* Partner cards grid */}
        <div
          className="flex justify-center"
          style={{
            animation: isVisible ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none'
          }}
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 max-w-4xl">
            {currentPartners.map((partner, index) => (
              <PartnerCard
                key={index}
                imageSrc={partner.src}
                alt={partner.alt}
                index={index}
              />
            ))}
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