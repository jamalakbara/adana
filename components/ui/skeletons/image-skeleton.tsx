"use client";

import React from "react";

interface ImageSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "default" | "card" | "avatar" | "banner";
}

export function ImageSkeleton({
  width = "100%",
  height = "100%",
  className = "",
  variant = "default"
}: ImageSkeletonProps) {
  const variantStyles = {
    default: "rounded-lg",
    card: "rounded-2xl",
    avatar: "rounded-full",
    banner: "rounded-none"
  };

  return (
    <div
      className={`
        relative overflow-hidden bg-[#e5e5e5]
        ${variantStyles[variant]}
        ${className}
      `}
      style={{ width, height }}
    >
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