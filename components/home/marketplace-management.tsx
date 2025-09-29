"use client";

import React from "react";

interface MarketplaceManagementProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function MarketplaceManagement({ isExpanded, onToggle }: MarketplaceManagementProps) {
  return (
    <>
      {/* Marketplace Management Header */}
      <div
        className="relative cursor-pointer group"
        onClick={onToggle}
      >
        <div className="bg-[#fcfcf4] h-[92px] w-full border-y border-[#dedacf] border-solid transition-all duration-300 group-hover:bg-[#f5f5ed]">
          <div className="absolute inset-x-[-1px] inset-y-[-1px] border-y border-[#dedacf] border-solid pointer-events-none" />
        </div>
        <div
          className="font-['Public_Sans'] text-[#1E1E1E] text-[24px] font-normal leading-[normal] absolute top-[26px] w-[546px] flex justify-between items-center"
          style={{ left: "calc(50% - 558px)" }}
          data-node-id="115:10805"
        >
          <span>Marketplace Management</span>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:rotate-180`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Detailed Marketplace Management section */}
      {isExpanded && (
        <div className="relative bg-[#334e4d] h-[320px] w-full transition-all duration-300">
          <div className="absolute -inset-1 border border-[#DEDACF] border-solid pointer-events-none" style={{ border: "1px solid #DEDACF" }} />

          {/* Right side image */}
          <div className="absolute h-[320px] right-[162px] top-0 w-[366px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src="https://s3-alpha-sig.figma.com/img/a6ca/e0eb/c62f77205434383aa4fa6abda5c879d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bc1vW0nSVsqCzJp-aLwT-5LNxLKokqNHDauxBQua0CoW~gThFF2DU3KPBbqkFGS-S48GutO7~kmrfIbQT9WZjYUgYskNd4FKkFEPi0zAs8LozbY7HZfD4Z0OQnDgxvfjPB5lxuizflRNZ~NdRiMD6ijpSnyeKT5hliROJjLk9MhQHe7iuQ3L3So4x0X5VJGXvmzcS7UiV91L3gJ76CJ8kShFtOqlmfgQRrzTep71EmeqkqI2FwJ0auXCZW-iCECBleeAHv50oKFX9PPlvSXPntjWaT1S9j3FEXSFRKdQO7plHY8BIJ2kVVWduxIxvDyG2~JnnNf~OHOgnjpKkRZRjg__"
                alt="Marketplace Management"
                className="absolute h-full left-[-1.64%] max-w-none top-0 w-[116.39%]"
              />
            </div>
          </div>

          {/* Left side content */}
          <div className="absolute flex flex-col gap-[24px] items-start left-[162px] top-[50px] w-[546px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="font-['Public_Sans'] text-white text-[24px] font-normal leading-[normal] w-full">
                E-commerce Optimization
              </div>
              <div className="font-['Public_Sans'] text-white text-[14px] font-normal leading-[20px] w-full space-y-[12px]">
                <p>Lorem ipsum dolor sit amet consectetur. Consectetur urna fermentum ut lacus. Auctor nisi nulla ornare purus nec cras massa.</p>
                <p>Risus dui tristique elementum adipiscing nunc at eu morbi. Eu semper sagittis amet suspendisse morbi. In suspendisse tincidunt rutrum non vitae lorem amet nam.</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-[#f1ff66] flex gap-[6px] items-center justify-center px-[18px] py-[10px] rounded-[6px] cursor-pointer hover:bg-[#e6ee5f] transition-all duration-300 transform hover:scale-105 active:scale-95">
              <div className="font-['Public_Sans'] text-[#334e4d] text-[14px] font-semibold leading-[normal] whitespace-nowrap">
  Let&apos;s Discuss
              </div>
              <div className="relative shrink-0 size-[20px] transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5">
                <div className="absolute flex inset-[11.748%] items-center justify-center">
                  <div className="flex-none h-[11.966px] rotate-[315deg] w-[14px]">
                    <div className="relative size-full">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#334e4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}