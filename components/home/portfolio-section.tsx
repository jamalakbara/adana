"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function PortfolioSection() {
  const portfolioItems = [
    {
      category: "Performance Marketing",
      title: "Telkomsel",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      bgImage: "/placeholder-telkomsel.jpg",
      logo: "/placeholder-logo.jpg",
      isFeatured: true
    },
    {
      category: "Performance Marketing",
      title: "Cloxvox",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      logo: "/placeholder-cloxvox.jpg",
      isFeatured: false
    },
    {
      category: "Performance Marketing",
      title: "World ID",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      logo: "/placeholder-worldid.jpg",
      isFeatured: false,
      isDark: true
    }
  ];

  return (
    <section className="bg-[#fcfcf4] py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 font-['Public_Sans:Medium',_sans-serif] text-center text-[16px] text-[#1e1e1e]">
          Our Portfolio
        </div>
        <h2 className="mb-16 text-center font-['Public_Sans:Regular',_sans-serif] text-[44px] font-normal leading-normal text-[#1e1e1e]">
          Our Work Speaks for Itself
          <br />
          A Showcase of What We Do Best
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured portfolio item */}
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative h-[652px] w-full overflow-hidden rounded-[24px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[url('/placeholder-telkomsel.jpg')] bg-cover bg-center" />

              <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="mb-4 h-[30px] w-[150px]">
                  <div className="h-full w-full bg-white/20 rounded flex items-center justify-center">
                    <span className="text-white text-sm">Logo</span>
                  </div>
                </div>
                <div className="mb-2 font-['Inter:Regular',_sans-serif] text-[14px] text-white">
                  Digital Media Buying
                </div>
                <h3 className="mb-4 font-['Inter:Medium',_sans-serif] text-[18px] font-medium text-white">
                  Telkomsel
                </h3>
                <p className="mb-6 font-['Inter:Regular',_sans-serif] text-[14px] leading-[20px] text-white/90">
                  During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.
                </p>
                <Button
                  variant="ghost"
                  size="default"
                  className="group text-white hover:bg-white/10 font-['Geist:Regular',_sans-serif] text-[14px] h-auto p-0"
                >
                  View Detail
                  <ExternalLink className="ml-2 h-4 w-4 rotate-45 transition-transform group-hover:rotate-0" />
                </Button>
              </div>
            </div>
          </div>

          {/* Regular portfolio items */}
          {portfolioItems.slice(1).map((item, index) => (
            <div key={index} className={`h-[342px] w-full overflow-hidden rounded-[24px] ${
              item.isDark ? 'bg-[#334e4d]' : 'bg-[#fcfcf4] border border-[#dedacf]'
            }`}>
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 h-[30px] w-[130px]">
                  <div className={`h-full w-full rounded flex items-center justify-center ${
                    item.isDark ? 'bg-white/20' : 'bg-[#fcfcf4] border border-[#dedacf]'
                  }`}>
                    <span className={`text-sm ${item.isDark ? 'text-white' : 'text-[#1e1e1e]'}`}>Logo</span>
                  </div>
                </div>

                <div className="mb-auto">
                  <div className={`mb-2 font-['Inter:Regular',_sans-serif] text-[14px] ${
                    item.isDark ? 'text-white' : 'text-[#1e1e1e]'
                  }`}>
                    {item.category}
                  </div>
                  <h3 className={`mb-2 font-['Inter:Medium',_sans-serif] text-[18px] font-medium ${
                    item.isDark ? 'text-white' : 'text-[#1e1e1e]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`font-['Inter:Regular',_sans-serif] text-[14px] leading-[20px] ${
                    item.isDark ? 'text-white/90' : 'text-[#646464]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="default"
                  className={`group mt-4 h-auto p-0 font-['Geist:Regular',_sans-serif] text-[14px] ${
                    item.isDark
                      ? 'text-[#5d93ad] hover:text-[#5d93ad]/80 hover:bg-white/10'
                      : 'text-[#5d93ad] hover:text-[#5d93ad]/80 hover:bg-[#f1ff66]/20'
                  }`}
                >
                  View Detail
                  <ExternalLink className="ml-2 h-4 w-4 rotate-45 transition-transform group-hover:rotate-0" />
                </Button>
              </div>
            </div>
          ))}

          {/* Pagination controls */}
          <div className="col-span-full flex items-center justify-center gap-4 pt-8">
            <Button
              variant="ghost"
              size="icon"
              className="h-[44px] w-[44px] rounded-[12px] bg-[#eceae4] hover:bg-[#dedacf]"
            >
              <ExternalLink className="h-5 w-5 rotate-180" />
            </Button>
            <div className="flex h-[2px] w-[159px] bg-[#334e4d]" />
            <div className="flex h-[2px] w-[377px] bg-[#eceae4]" />
            <Button
              variant="ghost"
              size="icon"
              className="h-[44px] w-[44px] rounded-[12px] bg-[#f1ff66] hover:bg-[#e6ee5f]"
            >
              <ExternalLink className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}