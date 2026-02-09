"use client";

import React from "react";
import { LazyImage } from "./lazy";
import { AnimatedButton } from "./animated-button";
import { ServiceDataItem } from "@/data/services";

interface ServiceExpansionItemProps {
  title: string;
  intro: string; // Changed from description
  items: ServiceDataItem[]; // Added structured items
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
  intro,
  items,
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
      className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer sm:max-h-none ${isFirst ? 'border-t border-b' : 'border-b'
        } border-[#DEDACF]`}
      style={{ maxHeight: isExpanded ? 'none' : '92px' }}
      data-node-id={nodeId}
    >
      <div
        className={`flex flex-col sm:flex-row sm:justify-between transition-colors duration-300 min-h-[92px] ${isExpanded
          ? 'bg-[#334e4d]'
          : 'bg-[#FCFCF4] hover:bg-[#f5f5ed]'
          } ${imagePosition === 'left' ? 'sm:flex-row-reverse' : ''}`}
        onClick={onToggle}
        style={{
          backgroundColor: isExpanded ? '#334e4d' : '#FCFCF4'
        }}
      >
        {/* Content Side */}
        <div className={`flex flex-col justify-center flex-1 max-w-[700px] px-6 sm:px-8 md:px-10 ${isExpanded ? 'py-6 sm:py-8 md:py-10' : 'py-0'}`}>
          <h2 className={`font-['Public_Sans'] text-[18px] sm:text-[24px] font-normal leading-normal self-stretch transition-colors duration-300 ${isExpanded ? '!text-white' : '!text-[#1E1E1E]'
            }`}>
            {title}
          </h2>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="mb-4 sm:mb-6"></div>
              <p className="font-['Public_Sans'] text-[16px] font-normal leading-[1.5] text-white opacity-90 mb-6">
                {intro}
              </p>

              <ul className="flex flex-col gap-4 text-white">
                {items.map((item, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-bold text-[15px] sm:text-[16px] mb-1">{item.title}</span>
                    <span className="text-[14px] sm:text-[15px] opacity-80 leading-relaxed">{item.subtitle}</span>
                  </li>
                ))}
              </ul>

              {showCTA && (
                <>
                  <div className="mb-6 sm:mb-8"></div>
                  <AnimatedButton
                    variant="primary"
                    hasArrow={true}
                    className="w-fit"
                    onClick={(e) => {
                      e?.stopPropagation(); // prevent collapsing accordion
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
            </motion.div>
          )}
        </div>

        {/* View Details Text (Desktop only, when collapsed) */}
        {!isExpanded && (
          <div className="hidden sm:flex items-center pr-6 sm:pr-8 md:pr-10">
            <span className="text-[#334e4d] text-sm font-medium">
              View Details
            </span>
          </div>
        )}

        {/* Image Side */}
        {imageUrl && isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative w-full h-[250px] sm:h-auto sm:w-[300px] lg:w-[400px] shrink-0 self-stretch"
          >
            <div className="absolute inset-0 h-full w-full">
              <LazyImage
                src={imageUrl}
                alt={title}
                fill={true}
                className="w-full h-full"
                imageClassName="object-cover"
                skeletonVariant="card"
                rootMargin="50px"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";