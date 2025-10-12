"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  placeholder = "blur",
  blurDataURL,
  priority = false,
  onLoad,
  onError,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate low-quality placeholder if blurDataURL not provided
  const generateBlurDataURL = (src: string): string => {
    // For SVG or data URLs, return empty string
    if (src.startsWith('data:') || src.endsWith('.svg')) {
      return '';
    }

    // Generate a simple colored placeholder
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect width="100%" height="100%" fill="#e5e7eb" opacity="0.5"/>
      </svg>`
    )}`;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcset for different screen sizes
  const generateSrcSet = (baseSrc: string): string => {
    if (baseSrc.startsWith('data:') || baseSrc.includes('unsplash')) {
      return '';
    }

    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map(w => `${baseSrc}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  // Determine image source
  const imageSrc = hasError ? '' : src;
  const srcSet = generateSrcSet(src);
  const blurSrc = blurDataURL || generateBlurDataURL(src);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-500",
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Low-quality placeholder */}
      {placeholder && !isLoaded && blurSrc && (
        <div
          className="absolute inset-0 blur-sm scale-110 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${blurSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={imageSrc}
          srcSet={srcSet || undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            objectFit: 'cover',
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : 'auto',
          }}
        />
      )}

      {/* Performance metrics overlay (development only) */}
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1">
          Loaded
        </div>
      )}
    </div>
  );
}

// Hook for preloading critical images
export function useImagePreloader() {
  const preloadImage = (src: string, priority: 'high' | 'low' = 'high') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;

    if (priority === 'high') {
      link.fetchPriority = 'high';
    }

    document.head.appendChild(link);

    // Clean up after preload
    setTimeout(() => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }, 5000);
  };

  const preloadCriticalImages = (images: string[]) => {
    images.forEach((src, index) => {
      const priority = index < 2 ? 'high' : 'low';
      preloadImage(src, priority);
    });
  };

  return { preloadImage, preloadCriticalImages };
}

// Component for preloading above-the-fold images
interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
}

export function ImagePreloader({ images, onComplete }: ImagePreloaderProps) {
  const { preloadCriticalImages } = useImagePreloader();

  useEffect(() => {
    preloadCriticalImages(images);

    // Simulate loading completion
    const timer = setTimeout(() => {
      onComplete?.();
    }, 100);

    return () => clearTimeout(timer);
  }, [images, preloadCriticalImages, onComplete]);

  return null; // This component doesn't render anything
}