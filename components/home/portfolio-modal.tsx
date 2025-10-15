"use client";

import React from "react";
import { X } from "lucide-react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    category: string;
    client: string;
    description: string;
    bgColor: string;
    textColor: string;
    borderColor?: string;
    logo: string;
    backgroundImage?: string;
  };
}

export function PortfolioModal({ isOpen, onClose, item }: PortfolioModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center lg:p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#FCFCF4] border border-[#DEDACF] rounded-[24px] w-full max-w-6xl h-[566px] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Absolute Position */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] transition-colors flex items-center justify-center group"
        >
          <X className="w-5 h-5 text-[#666] group-hover:text-[#333] transition-colors" />
        </button>

        <div className="flex flex-col h-full">
          {/* Mobile/Tablet - Full Width Content Only */}
          <div className="w-full lg:hidden p-6 overflow-y-auto flex-1">
            {/* Content */}
            <div>
              {/* Category */}
              <div className="mb-2">
                <span className="text-[#1E1E1E] text-[14px] font-normal font-['Inter']">
                  {item.category}
                </span>
              </div>

              {/* Client Name */}
              <div className="mb-3">
                <h1 className="text-[#1E1E1E] text-[18px] font-medium font-['Inter']">
                  {item.client}
                </h1>
              </div>

              {/* Description */}
              <div>
                <p className="text-[#1E1E1E] text-[14px] font-normal font-['Inter'] leading-5">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop - Side by Side Layout */}
          <div className="hidden lg:flex lg:flex-row lg:h-full w-full">
            {/* Left Side - Image */}
            <div className="lg:w-1/2 lg:h-full relative">
              {item.backgroundImage ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ) : (
                <div className={`w-full h-full ${item.bgColor}`} />
              )}
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
              {/* Content */}
              <div>
                {/* Category */}
                <div className="mb-2">
                  <span className="text-[#1E1E1E] text-[14px] font-normal font-['Inter']">
                    {item.category}
                  </span>
                </div>

                {/* Client Name */}
                <div className="mb-3">
                  <h1 className="text-[#1E1E1E] text-[18px] font-medium font-['Inter']">
                    {item.client}
                  </h1>
                </div>

                {/* Description */}
                <div>
                  <p className="text-[#1E1E1E] text-[14px] font-normal font-['Inter'] leading-5 w-[522px] max-w-full">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}