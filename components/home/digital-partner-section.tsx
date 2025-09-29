"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function DigitalPartnerSection() {
  const partners = [
    { name: "Agency Partner", isActive: false },
    { name: "Publisher Partner", isActive: false },
    { name: "e-Commerce Platform", isActive: false },
    { name: "Marketplace Partner", isActive: false },
    { name: "Email Marketing Partner", isActive: false },
    { name: "Social Partner", isActive: true }
  ];

  const techPartners = [
    { name: "Partner 1", logo: "/placeholder-tech1.jpg" },
    { name: "Partner 2", logo: "/placeholder-tech2.jpg" },
    { name: "Partner 3", logo: "/placeholder-tech3.jpg" },
    { name: "Partner 4", logo: "/placeholder-tech4.jpg" }
  ];

  return (
    <section className="bg-[#fcfcf4] py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center font-['Public_Sans:Medium',_sans-serif] text-[16px] text-[#1e1e1e]">
          Digital Partner
        </div>
        <h2 className="mb-8 text-center font-['Public_Sans:Regular',_sans-serif] text-[44px] font-normal leading-normal text-[#1e1e1e]">
          Your Trusted Digital Partner for
          <br />
          Your Digital Transformation
        </h2>

        {/* Partner type pills */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          {partners.map((partner, index) => (
            <button
              key={index}
              className={`box-border flex items-center justify-center gap-[10px] rounded-[100px] px-[24px] py-[15px] font-['Public_Sans:Regular',_sans-serif] text-[16px] transition-all ${
                partner.isActive
                  ? 'bg-[#334e4d] text-[#fcfcf4]'
                  : 'bg-[#fcfcf4] text-[#646464] border border-[#dedacf] hover:bg-[#f1ff66]'
              }`}
            >
              {partner.name}
            </button>
          ))}
        </div>

        {/* CTA section */}
        <div className="relative rounded-[24px] bg-[#f1ff66] p-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - image */}
            <div className="relative h-[441px] w-full overflow-hidden rounded-[24px]">
              <div className="absolute inset-0 bg-[url('/placeholder-partnership.jpg')] bg-cover bg-center" />
            </div>

            {/* Right side - content */}
            <div className="flex flex-col justify-center">
              <h3 className="mb-6 font-['Public_Sans:Medium',_sans-serif] text-[44px] font-medium leading-normal text-[#1e1e1e] tracking-[-0.88px]">
                Accelerate Your Digital Growth
              </h3>
              <p className="mb-8 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#1e1e1e]">
                Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis.
                Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.
              </p>

              <div className="flex gap-4">
                <Button
                  variant="default"
                  size="default"
                  className="bg-[#1e1e1e] border-[#1e1e1e] text-white hover:bg-[#2a2a2a] font-['Funnel_Display:Medium',_sans-serif] font-medium not-italic text-[14px] h-[44px] px-[18px] py-[12px] rounded-[6px] shadow-none"
                >
                  Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="bg-[#f1ff66] border-[#f1ff66] text-[#1e1e1e] hover:bg-[#e6ee5f] hover:border-[#e6ee5f] font-['Funnel_Display:Medium',_sans-serif] font-medium not-italic text-[14px] h-[44px] px-[18px] py-[12px] rounded-[6px] shadow-none"
                >
                  Get 1 Month Free Service Charge
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Technology partners */}
        <div className="mt-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {techPartners.map((partner, index) => (
              <div key={index} className="flex h-[90px] items-center justify-center rounded-lg bg-[#fcfcf4] border border-[#dedacf] p-6">
                <div className="h-full w-full bg-white/20 rounded flex items-center justify-center">
                  <span className="text-sm text-[#1e1e1e]">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}