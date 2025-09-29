"use client";

import React from "react";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "custom";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
  fallback?: React.ReactNode;
  loading?: "lazy" | "eager";
  nodeId?: string;
}

const borderRadiusClasses = {
  none: "rounded-none",
  sm: "rounded-[8px]",
  md: "rounded-[12px]",
  lg: "rounded-[18px]",
  xl: "rounded-[24px]",
  custom: ""
};

export function ImageWrapper({
  src,
  alt,
  width = "100%",
  height = "auto",
  aspectRatio,
  borderRadius = "none",
  objectFit = "cover",
  className = "",
  fallback,
  loading = "lazy",
  nodeId
}: ImageWrapperProps) {
  const [imgError, setImgError] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const handleError = () => {
    setImgError(true);
  };

  const handleLoad = () => {
    setImgLoaded(true);
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    aspectRatio,
    borderRadius: borderRadius === "custom" ? undefined : undefined
  };

  if (imgError && fallback) {
    return (
      <div
        className={`overflow-hidden ${borderRadiusClasses[borderRadius]} ${className}`}
        style={style}
        data-node-id={nodeId}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${borderRadiusClasses[borderRadius]} ${className}`}
      style={style}
      data-node-id={nodeId}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
      />
    </div>
  );
}

// Specialized image components for common use cases
interface RoundedImageProps extends Omit<ImageWrapperProps, 'borderRadius'> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function RoundedImage({ size = "lg", ...props }: RoundedImageProps) {
  const sizeToRadius = {
    sm: "md" as const,
    md: "lg" as const,
    lg: "xl" as const,
    xl: "xl" as const
  };

  return (
    <ImageWrapper
      {...props}
      borderRadius={sizeToRadius[size]}
    />
  );
}

interface CircleImageProps extends Omit<ImageWrapperProps, 'borderRadius'> {
  size?: number | string;
}

export function CircleImage({ size = 100, ...props }: CircleImageProps) {
  const style: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    borderRadius: '50%'
  };

  return (
    <div className="overflow-hidden" style={style}>
      <ImageWrapper
        {...props}
        width="100%"
        height="100%"
        borderRadius="none"
        className="rounded-full"
      />
    </div>
  );
}