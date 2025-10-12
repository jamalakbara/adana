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
  ctaHref?: string;
  isExternal?: boolean;
  imagePosition?: "right" | "left";
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
  ctaHref = "/contact",
  isExternal = false,
  imagePosition = "right"
}: ServiceExpansionItemProps) {
  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer sm:max-h-none ${
        isFirst ? 'border-t border-b' : 'border-b'
      } border-[#DEDACF]`}
      style={{ maxHeight: isExpanded ? 'none' : '92px' }}
      data-node-id={nodeId}
    >
      <div
        className={`flex flex-col justify-between sm:flex-row sm:gap-8 transition-colors duration-300 ${
          isExpanded
            ? 'bg-[#334e4d]'
            : 'bg-[#FCFCF4] hover:bg-[#f5f5ed]'
        } ${imagePosition === 'left' ? 'sm:flex-row-reverse' : ''}`}
        onClick={onToggle}
      >
        {/* Content Side */}
        <div className="flex flex-col justify-center p-4 sm:p-5 md:p-6 flex-1 max-w-[546px] sm:max-w-none">
          <h2 className={`font-['Public_Sans'] text-[18px] sm:text-[24px] font-normal leading-normal self-stretch ${
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent onClick from triggering
                      if (isExternal) {
                        window.open(ctaHref, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = ctaHref;
                      }
                    }}
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
          <div className="relative w-full aspect-square sm:w-[300px] sm:h-[300px] overflow-hidden flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}