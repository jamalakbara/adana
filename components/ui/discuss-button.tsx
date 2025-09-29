"use client";

import React from "react";

interface DiscussButtonProps {
  className?: string;
  onClick?: () => void;
}

export function DiscussButton({ className, onClick }: DiscussButtonProps) {
  return (
    <button
      className={`group bg-[#F1FF66] inline-flex items-center justify-center gap-[12px] px-[18px] py-[12px] rounded-[6px] hover:bg-[#e6ee5f] transition-all duration-300 transform hover:scale-105 active:scale-95 active:bg-[#dde554] shadow-sm hover:shadow-md ${className}`}
      data-node-id="115-10849"
      onClick={onClick}
    >
      <div className="font-['Funnel_Display:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#334E4D] text-[14px] whitespace-nowrap" data-node-id="115-10850"
        style={{
          color: "#334E4D",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal"
        }}>
        <p className="leading-[normal]">Let&apos;s Discuss</p>
      </div>
      <div className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" data-name="arrow-up-right" data-node-id="115-10851">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-[#334e4d]">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}