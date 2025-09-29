"use client";

import React from "react";
import { AnimatedButton } from "./animated-button";

interface ServiceExpansionItemProps {
  title: string;
  description: string;
  imageUrl?: string;
  isExpanded: boolean;
  onToggle: () => void;
  nodeId?: string;
  isFirst?: boolean;
  showCTA?: boolean;
  ctaText?: string;
  imagePosition?: "right" | "left";
  expandedHeight?: string;
}

export function ServiceExpansionItem({
  title,
  description,
  imageUrl,
  isExpanded,
  onToggle,
  nodeId,
  isFirst = false,
  showCTA = true,
  ctaText = "Let's Discuss",
  imagePosition = "right",
  expandedHeight = "512px"
}: ServiceExpansionItemProps) {
  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
        isFirst ? 'border-t border-b' : 'border-b'
      } border-[#DEDACF]`}
      style={{ maxHeight: isExpanded ? expandedHeight : '92px' }}
      data-node-id={nodeId}
    >
      <div
        className={`flex transition-colors duration-300 ${
          isExpanded
            ? 'bg-[#334e4d]'
            : 'bg-[#FCFCF4] hover:bg-[#f5f5ed]'
        } ${imagePosition === 'left' ? 'flex-row-reverse' : ''}`}
        onClick={onToggle}
      >
        {/* Content Side */}
        <div className="flex flex-col justify-center p-4 sm:p-5 md:p-6 flex-1">
          <h2 className={`font-['Public_Sans'] text-[24px] font-normal leading-normal self-stretch ${
            isExpanded ? 'text-white' : 'text-[#1E1E1E]'
          }`}>
            {title}
          </h2>

          {isExpanded && (
            <>
              <div className="mb-[12px] sm:mb-[14px] md:mb-[16px]"></div>
              <div
                className="font-['Public_Sans'] text-[14px] font-normal leading-[20px] self-stretch text-white"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {showCTA && (
                <>
                  <div className="mb-[16px] sm:mb-[20px] md:mb-[24px]"></div>
                  <AnimatedButton
                    variant="primary"
                    hasArrow={true}
                    className="w-fit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ctaText}
                  </AnimatedButton>
                </>
              )}
            </>
          )}
        </div>

        {/* Image Side */}
        {imageUrl && isExpanded && (
          <div className="relative w-[250px] sm:w-[300px] md:w-[366px] overflow-hidden" style={{ height: expandedHeight === "512px" ? "200px sm:[250px] md:[320px]" : expandedHeight }}>
            <div className="absolute right-0 top-0 w-[250px] sm:w-[300px] md:w-[366px] h-[200px] sm:h-[250px] md:h-[320px]">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}