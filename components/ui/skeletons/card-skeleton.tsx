"use client";

import React from "react";
import { ImageSkeleton } from "./image-skeleton";

interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  imageHeight?: string;
}

export function CardSkeleton({
  className = "",
  showImage = true,
  showTitle = true,
  showDescription = true,
  imageHeight = "200px"
}: CardSkeletonProps) {
  return (
    <div className={`bg-[#fcfcf4] rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {/* Image Skeleton */}
      {showImage && (
        <ImageSkeleton
          height={imageHeight}
          className="w-full rounded-none"
          variant="banner"
        />
      )}

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        {showTitle && (
          <div className="space-y-2">
            <div className="h-6 bg-[#e5e5e5] rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-[#e5e5e5] rounded animate-pulse w-1/2"></div>
          </div>
        )}

        {/* Description Skeleton */}
        {showDescription && (
          <div className="space-y-2">
            <div className="h-3 bg-[#e5e5e5] rounded animate-pulse w-full"></div>
            <div className="h-3 bg-[#e5e5e5] rounded animate-pulse w-full"></div>
            <div className="h-3 bg-[#e5e5e5] rounded animate-pulse w-2/3"></div>
          </div>
        )}

        {/* Action Button Skeleton */}
        <div className="pt-4">
          <div className="h-10 bg-[#e5e5e5] rounded animate-pulse w-32"></div>
        </div>
      </div>
    </div>
  );
}