"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useGestureRecognizer, GestureCallbacks } from "./GestureRecognizer";

interface SwipeableProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  className?: string;
  threshold?: number;
  preventDefault?: boolean;
  disabled?: boolean;
  hapticFeedback?: boolean;
}

export function Swipeable({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  className,
  threshold = 50,
  preventDefault = false,
  disabled = false,
  hapticFeedback = true,
}: SwipeableProps) {
  const { elementRef, isGesturing } = useGestureRecognizer(
    {
      onSwipeLeft: disabled ? undefined : () => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
        onSwipeLeft?.();
      },
      onSwipeRight: disabled ? undefined : () => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
        onSwipeRight?.();
      },
      onSwipeUp: disabled ? undefined : () => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
        onSwipeUp?.();
      },
      onSwipeDown: disabled ? undefined : () => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
        onSwipeDown?.();
      },
      onTap: disabled ? undefined : () => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(5);
        }
        onTap?.();
      },
    },
    {
      swipeThreshold: threshold,
      enableSwipe: !disabled,
      enableTap: !disabled,
      preventDefault,
    }
  );

  return (
    <div
      ref={elementRef}
      className={cn(
        "touch-manipulation",
        isGesturing && "active",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      style={{
        touchAction: preventDefault ? 'none' : 'pan-y',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </div>
  );
}

// Swipe card component with animations
interface SwipeCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
  swipeDirection?: 'horizontal' | 'vertical' | 'both';
  bounce?: boolean;
  disabled?: boolean;
}

export function SwipeCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className,
  swipeDirection = 'horizontal',
  bounce = true,
  disabled = false,
}: SwipeCardProps) {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer({
    onSwipeLeft: disabled ? undefined : () => {
      animateSwipe('left');
      onSwipeLeft?.();
    },
    onSwipeRight: disabled ? undefined : () => {
      animateSwipe('right');
      onSwipeRight?.();
    },
    onSwipeUp: disabled ? undefined : () => {
      animateSwipe('up');
      onSwipeUp?.();
    },
    onSwipeDown: disabled ? undefined : () => {
      animateSwipe('down');
      onSwipeDown?.();
    },
    onTouchStart: () => {
      setIsDragging(true);
    },
    onTouchEnd: () => {
      setIsDragging(false);
      resetPosition();
    },
  }, {
    enableSwipe: !disabled,
    preventDefault: swipeDirection === 'both',
  });

  const animateSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (!cardRef.current) return;

    const swipeDistance = 100;
    let translate = '';

    switch (direction) {
      case 'left':
        translate = `translateX(-${swipeDistance}px)`;
        break;
      case 'right':
        translate = `translateX(${swipeDistance}px)`;
        break;
      case 'up':
        translate = `translateY(-${swipeDistance}px)`;
        break;
      case 'down':
        translate = `translateY(${swipeDistance}px)`;
        break;
    }

    cardRef.current.style.transform = translate;
    cardRef.current.style.opacity = '0.5';

    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = '';
        cardRef.current.style.opacity = '';
      }
    }, 200);
  };

  const resetPosition = () => {
    if (bounce && cardRef.current) {
      cardRef.current.style.transform = '';
      cardRef.current.style.transition = 'transform 0.3s ease-out';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
      }, 300);
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200",
        isDragging && "shadow-lg scale-105",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div
        ref={cardRef}
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        }}
      >
        {children}
      </div>

      {/* Swipe indicators */}
      {!disabled && (
        <>
          {onSwipeLeft && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 opacity-0 transition-opacity duration-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
          {onSwipeRight && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 opacity-0 transition-opacity duration-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          )}
          {onSwipeUp && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-blue-500 opacity-0 transition-opacity duration-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          )}
          {onSwipeDown && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-blue-500 opacity-0 transition-opacity duration-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Pull-to-refresh component
interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
  disabled?: boolean;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  className,
  disabled = false,
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer({
    onSwipeDown: (event) => {
      if (disabled || isRefreshing || window.scrollY > 0) return;

      const touch = event.changedTouches[0];
      const distance = touch.clientY - gestureStateRef.current.startY;

      if (distance > 0) {
        setIsPulling(true);
        setPullDistance(Math.min(distance, threshold * 1.5));

        if (distance >= threshold && !isRefreshing) {
          setIsRefreshing(true);
          onRefresh().finally(() => {
            setIsRefreshing(false);
            setIsPulling(false);
            setPullDistance(0);
          });
        }
      }
    },
    onTouchEnd: () => {
      if (!isRefreshing) {
        setIsPulling(false);
        setPullDistance(0);
      }
    },
  }, {
    enableSwipe: true,
    preventDefault: true,
  });

  const gestureStateRef = useRef({ startY: 0 });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      gestureStateRef.current.startY = e.touches[0].clientY;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []);

  const pullProgress = Math.min(pullDistance / threshold, 1);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 top-0 flex justify-center items-center bg-white border-b border-gray-200 transition-all duration-200"
        style={{
          height: `${Math.min(pullDistance, threshold)}px`,
          opacity: isPulling ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center py-4">
          {isRefreshing ? (
            <>
              <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full mb-2"></div>
              <p className="text-sm text-gray-600">Refreshing...</p>
            </>
          ) : (
            <>
              <svg
                className={cn(
                  "w-6 h-6 text-gray-400 transition-transform duration-200 mb-2",
                  pullProgress > 0.8 && "text-blue-600"
                )}
                style={{
                  transform: `rotate(${pullProgress * 180}deg)`,
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-sm text-gray-500">
                {pullProgress > 0.8 ? 'Release to refresh' : 'Pull to refresh'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        ref={elementRef}
        className="transition-transform duration-200 ease-out"
        style={{
          transform: isPulling ? `translateY(${pullDistance}px)` : 'translateY(0)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Tab swipe component for mobile navigation
interface TabSwipeProps {
  tabs: { id: string; label: string; content: ReactNode }[];
  defaultIndex?: number;
  onTabChange?: (index: number, tab: { id: string; label: string; content: ReactNode }) => void;
  className?: string;
}

export function TabSwipe({ tabs, defaultIndex = 0, onTabChange, className }: TabSwipeProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer({
    onSwipeLeft: () => {
      if (activeIndex < tabs.length - 1) {
        const newIndex = activeIndex + 1;
        setActiveIndex(newIndex);
        onTabChange?.(newIndex, tabs[newIndex]);
      }
    },
    onSwipeRight: () => {
      if (activeIndex > 0) {
        const newIndex = activeIndex - 1;
        setActiveIndex(newIndex);
        onTabChange?.(newIndex, tabs[newIndex]);
      }
    },
  }, {
    enableSwipe: true,
    preventDefault: true,
  });

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {/* Tab indicators */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveIndex(index);
              onTabChange?.(index, tab);
            }}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium transition-colors",
              activeIndex === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content with swipe */}
      <div
        ref={elementRef}
        className="relative"
        style={{
          transition: 'transform 0.3s ease-out',
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className="w-full flex-shrink-0"
              style={{
                minWidth: '100%',
              }}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}