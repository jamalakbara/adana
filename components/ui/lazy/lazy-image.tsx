"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ImageSkeleton } from "@/components/ui/skeletons";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  skeletonClassName?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
  skeletonVariant?: "default" | "card" | "avatar" | "banner";
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  skeletonClassName = "",
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes,
  style,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = "50px",
  skeletonVariant = "default",
  imageClassName = ""
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // For priority images, load immediately; otherwise use intersection observer
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const shouldLoad = priority || isIntersecting;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show skeleton when image should load but hasn't loaded yet
  const showSkeleton = shouldLoad && !isLoaded && !hasError;

  if (fill) {
    // For fill images (like portfolio modal)
    return (
      <div
        ref={priority ? undefined : (targetRef as React.RefObject<HTMLDivElement>)}
        className={className}
        style={{ position: 'relative', ...style }}
      >
        {shouldLoad && (
          <>
            {showSkeleton && (
              <div
                className={skeletonClassName}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1
                }}
              >
                <ImageSkeleton variant={skeletonVariant} width="100%" height="100%" />
              </div>
            )}
            <Image
              src={src}
              alt={alt}
              fill
              className={imageClassName}
              style={{
                ...(showSkeleton ? { opacity: 0 } : { opacity: 1, transition: 'opacity 0.3s ease-in-out' })
              }}
              priority={priority}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              sizes={sizes}
              onLoad={handleLoad}
              onError={handleError}
            />
          </>
        )}
        {!shouldLoad && !priority && (
          <div
            className={skeletonClassName}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1
            }}
          >
            <ImageSkeleton variant={skeletonVariant} width="100%" height="100%" />
          </div>
        )}
      </div>
    );
  }

  // For regular images
  return (
    <div
      ref={priority ? undefined : (targetRef as React.RefObject<HTMLDivElement>)}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      {shouldLoad && (
        <>
          {showSkeleton && (
            <div
              className={skeletonClassName}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1
              }}
            >
              <ImageSkeleton variant={skeletonVariant} width="100%" height="100%" />
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
              ...(showSkeleton ? { opacity: 0 } : { opacity: 1, transition: 'opacity 0.3s ease-in-out' })
            }}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
      {!shouldLoad && !priority && (
        <div
          className={skeletonClassName}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1
          }}
        >
          <ImageSkeleton variant={skeletonVariant} width="100%" height="100%" />
        </div>
      )}
    </div>
  );
}