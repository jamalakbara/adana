"use client";

import React from "react";

interface PartnerCardSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function PartnerCardSkeleton({
  className = "",
  width = "120px",
  height = "120px"
}: PartnerCardSkeletonProps) {
  return (
    <div
      className={`
        bg-[#fcfcf4] border border-[#dedacf] rounded-[16px]
        flex items-center justify-center
        overflow-hidden
        ${className}
      `}
      style={{ width, height }}
    >
      {/* Logo placeholder skeleton */}
      <div className="relative w-16 h-16">
        <div className="w-full h-full bg-[#e5e5e5] rounded-lg animate-pulse">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
            <div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: '200% 0'
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}