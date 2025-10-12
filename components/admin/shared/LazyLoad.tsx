"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  delay?: number;
  placeholder?: React.ReactNode;
}

interface LazyLoadComponentProps {
  component: React.ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

// Simple lazy loading wrapper for any content
export function LazyLoad({
  children,
  fallback,
  rootMargin = "50px",
  threshold = 0.1,
  className,
  delay = 0,
  placeholder,
}: LazyLoadProps) {
  const [isInView, setIsInView] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);

          // Apply delay if specified
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setShouldShow(true);
            }, delay);
          } else {
            setShouldShow(true);
          }

          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [rootMargin, threshold, delay]);

  const defaultFallback = (
    <div className="animate-pulse">
      <div className="h-24 bg-gray-200 rounded"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  const defaultPlaceholder = (
    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
      <div className="text-center text-gray-500">
        <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p className="text-sm">Loading content...</p>
      </div>
    </div>
  );

  return (
    <div ref={elementRef} className={cn("min-h-[100px]", className)}>
      {shouldShow ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        placeholder || defaultPlaceholder
      )}
    </div>
  );
}

// Lazy load React components with error boundaries
export function LazyLoadComponent({
  component: Component,
  props,
  fallback,
  rootMargin = "50px",
  threshold = 0.1,
}: LazyLoadComponentProps) {
  const [ComponentToRender, setComponentToRender] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [hasError, setHasError] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !ComponentToRender && !hasError) {
          try {
            // Dynamic import with error handling
            const componentModule = await Promise.resolve({ default: Component });
            setComponentToRender(() => componentModule.default);
          } catch (error) {
            console.error('Failed to load component:', error);
            setHasError(true);
          }

          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [Component, ComponentToRender, hasError, rootMargin, threshold]);

  const defaultFallback = (
    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
      <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div>
    </div>
  );

  const errorFallback = (
    <div className="flex items-center justify-center h-48 bg-red-50 rounded-lg">
      <div className="text-center text-red-600">
        <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p className="text-sm">Failed to load content</p>
      </div>
    </div>
  );

  return (
    <div ref={elementRef}>
      {hasError ? (
        errorFallback
      ) : ComponentToRender ? (
        <Suspense fallback={fallback || defaultFallback}>
          <ComponentToRender {...props} />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}

// Hook for lazy loading images with progressive enhancement
export function useLazyImage(src: string, options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { rootMargin = "50px", threshold = 0.1 } = options || {};

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [src, rootMargin, threshold]);

  useEffect(() => {
    if (!imageSrc || !imgRef.current) return;

    const img = imgRef.current;

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [imageSrc]);

  return {
    ref: imgRef,
    src: imageSrc,
    isLoaded,
    hasError,
  };
}

// Virtual list component for large datasets (mobile optimized)
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile-optimized lazy loading wrapper with touch support
interface MobileLazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  delay?: number;
  placeholder?: React.ReactNode;
  preloadOnTouch?: boolean;
  touchThreshold?: number;
}

export function MobileLazyLoad({
  children,
  fallback,
  rootMargin = "100px", // Larger root margin for mobile
  threshold = 0.05, // Lower threshold for mobile
  className,
  delay = 0,
  placeholder,
  preloadOnTouch = true,
  touchThreshold = 50,
}: MobileLazyLoadProps) {
  const [shouldPreload, setShouldPreload] = useState(false);
  const touchStartY = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!preloadOnTouch) return;

      const touchY = e.touches[0].clientY;
      const deltaY = Math.abs(touchY - touchStartY.current);

      // Preload content when user scrolls close to it
      if (deltaY > touchThreshold) {
        setShouldPreload(true);
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [preloadOnTouch, touchThreshold]);

  return (
    <div ref={elementRef}>
      <LazyLoad
        rootMargin={rootMargin}
        threshold={threshold}
        className={className}
        delay={delay || (shouldPreload ? 0 : 200)}
        fallback={fallback}
        placeholder={placeholder}
      >
        {children}
      </LazyLoad>
    </div>
  );
}