"use client";

import React from "react";
import { LazyImage } from "./lazy";
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
  onCTAClick?: () => void;
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
  imagePosition = "right",
  onCTAClick
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
        className={`flex flex-col sm:flex-row sm:gap-8 transition-colors duration-300 ${
          isExpanded
            ? 'bg-[#334e4d]'
            : 'bg-[#FCFCF4] hover:bg-[#f5f5ed]'
        } ${imagePosition === 'left' ? 'sm:flex-row-reverse' : ''}`}
        onClick={onToggle}
        style={{
          backgroundColor: isExpanded ? '#334e4d' : '#FCFCF4'
        }}
      >
        {/* Content Side */}
        <div className="flex flex-col justify-center p-4 sm:p-5 md:p-6 flex-1 max-w-[546px] sm:max-w-none sm:justify-center">
          <h2 className={`font-['Public_Sans'] text-[18px] sm:text-[24px] font-normal leading-normal self-stretch transition-colors duration-300 ${
            isExpanded ? '!text-white' : '!text-[#1E1E1E]'
          }`}>
            {title}
          </h2>

          {isExpanded && (
            <>
              <div className="mb-[12px] sm:mb-[14px] md:mb-[16px]"></div>
              <div
                className="font-['Public_Sans'] text-[14px] font-normal leading-[20px] self-stretch !text-white transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {showCTA && (
                <>
                  <div className="mb-[16px] sm:mb-[20px] md:mb-[24px]"></div>
                  <AnimatedButton
                    variant="primary"
                    hasArrow={true}
                    className="w-fit"
                    onClick={() => {
                      if (onCTAClick) {
                        onCTAClick();
                      } else if (isExternal) {
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
          <div className="relative aspect-square w-72 sm:w-80 lg:w-96 max-w-[384px] overflow-hidden flex-shrink-0 mx-auto sm:mx-0 rounded-xl p-6 flex items-center justify-center">
            <LazyImage
              src={imageUrl}
              alt={title}
              width={384}
              height={384}
              className="flex items-center justify-center w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              skeletonVariant="card"
              rootMargin="50px"
            />
          </div>
        )}
      </div>
    </div>
  );
}