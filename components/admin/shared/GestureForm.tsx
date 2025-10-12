"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGestureRecognizer } from "./GestureRecognizer";

interface GestureFormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
  disabled?: boolean;
  preventDefaultSwipe?: boolean;
}

export function GestureForm({
  children,
  onSubmit,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className,
  disabled = false,
  preventDefaultSwipe = true,
}: GestureFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { elementRef } = useGestureRecognizer(
    {
      onSwipeLeft: disabled ? undefined : onSwipeLeft,
      onSwipeRight: disabled ? undefined : onSwipeRight,
      onSwipeUp: disabled ? undefined : onSwipeUp,
      onSwipeDown: disabled ? undefined : onSwipeDown,
    },
    {
      enableSwipe: !disabled && !!(
        onSwipeLeft || onSwipeRight || onSwipeUp || onSwipeDown
      ),
      preventDefault: preventDefaultSwipe,
    }
  );

  // Combine refs to work with both gesture recognition and form element
  useEffect(() => {
    if (elementRef.current && formRef.current && elementRef.current !== formRef.current) {
      // If gesture ref is different, we need to handle this properly
      // For now, we'll just use the form ref for the form element
    }
  }, [elementRef, formRef]);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
    >
      {children}
    </form>
  );
}

// Gesture-enabled input field
interface GestureInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

export function GestureInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  disabled = false,
  required = false,
  className,
  onDoubleTap,
  onLongPress,
}: GestureInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer(
    {
      onDoubleTap: onDoubleTap,
      onLongPress: onLongPress,
    },
    {
      enableDoubleTap: !!onDoubleTap,
      enableLongPress: !!onLongPress,
    }
  );

  return (
    <div ref={containerRef} className={cn("space-y-1", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "transition-colors duration-200",
          isFocused && "ring-2 ring-blue-500 border-blue-500",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          disabled && "bg-gray-100 cursor-not-allowed",
          "touch-manipulation"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Swipeable card with actions
interface SwipeableActionCardProps {
  children: ReactNode;
  leftAction?: {
    label: string;
    icon?: ReactNode;
    color?: string;
    onPress: () => void;
  };
  rightAction?: {
    label: string;
    icon?: ReactNode;
    color?: string;
    onPress: () => void;
  };
  className?: string;
  disabled?: boolean;
}

export function SwipeableActionCard({
  children,
  leftAction,
  rightAction,
  className,
  disabled = false,
}: SwipeableActionCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipeLeft = () => {
    if (rightAction && !disabled) {
      setSwipeOffset(-100);
      rightAction.onPress();
      setTimeout(() => setSwipeOffset(0), 300);
    }
  };

  const handleSwipeRight = () => {
    if (leftAction && !disabled) {
      setSwipeOffset(100);
      leftAction.onPress();
      setTimeout(() => setSwipeOffset(0), 300);
    }
  };

  const { elementRef } = useGestureRecognizer(
    {
      onSwipeLeft: handleSwipeLeft,
      onSwipeRight: handleSwipeRight,
      onTouchStart: () => setIsSwiping(true),
      onTouchEnd: () => setIsSwiping(false),
    },
    {
      enableSwipe: !disabled && !!((leftAction || rightAction)),
      preventDefault: true,
    }
  );

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Background actions */}
      <div className="absolute inset-0 flex">
        {leftAction && (
          <div
            className={cn(
              "flex items-center justify-center w-full h-full",
              leftAction.color || "bg-green-500 text-white"
            )}
            style={{
              transform: `translateX(${Math.min(-swipeOffset, 0)}px)`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            <div className="flex items-center space-x-2">
              {leftAction.icon}
              <span className="font-medium">{leftAction.label}</span>
            </div>
          </div>
        )}
        {rightAction && (
          <div
            className={cn(
              "flex items-center justify-center w-full h-full",
              rightAction.color || "bg-red-500 text-white"
            )}
            style={{
              transform: `translateX(${Math.max(-swipeOffset, 0)}px)`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">{rightAction.label}</span>
              {rightAction.icon}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className={cn(
          "relative bg-white border border-gray-200 rounded-lg shadow-sm",
          disabled && "opacity-50 pointer-events-none",
          "touch-manipulation"
        )}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isSwiping ? 'none' : 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Pull-to-refresh form
interface PullToRefreshFormProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  className?: string;
}

export function PullToRefreshForm({
  children,
  onRefresh,
  refreshing = false,
  className,
}: PullToRefreshFormProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer({
    onSwipeDown: (event) => {
      if (refreshing || window.scrollY > 0) return;

      const touch = event.changedTouches[0];
      const distance = touch.clientY - gestureStateRef.current.startY;

      if (distance > 0) {
        setIsPulling(true);
        setPullDistance(Math.min(distance, 120));

        if (distance >= 80) {
          onRefresh();
        }
      }
    },
    onTouchEnd: () => {
      setIsPulling(false);
      setPullDistance(0);
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

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull indicator */}
      {isPulling && (
        <div
          className="absolute left-0 right-0 top-0 flex justify-center items-center bg-white border-b border-gray-200 z-10"
          style={{
            height: `${Math.min(pullDistance, 80)}px`,
            opacity: isPulling ? 1 : 0,
          }}
        >
          <div className="flex flex-col items-center py-4">
            {refreshing ? (
              <>
                <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full mb-2"></div>
                <p className="text-sm text-gray-600">Refreshing...</p>
              </>
            ) : (
              <>
                <svg
                  className={cn(
                    "w-5 h-5 text-gray-400 mb-2 transition-transform",
                    pullDistance > 60 && "text-blue-600"
                  )}
                  style={{
                    transform: `rotate(${(pullDistance / 80) * 180}deg)`,
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-sm text-gray-500">
                  {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Form content */}
      <div
        ref={containerRef}
        className="transition-transform duration-200"
        style={{
          transform: isPulling ? `translateY(${pullDistance}px)` : 'translateY(0)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Gesture-enabled toggle
interface GestureToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  className?: string;
}

export function GestureToggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  onDoubleTap,
  onLongPress,
  className,
}: GestureToggleProps) {
  const [isActive, setIsActive] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useGestureRecognizer(
    {
      onTap: () => {
        if (!disabled) {
          onChange?.(!checked);
          if ('vibrate' in navigator) {
            navigator.vibrate(10);
          }
        }
      },
      onDoubleTap: onDoubleTap,
      onLongPress: onLongPress,
      onTouchStart: () => setIsActive(true),
      onTouchEnd: () => setIsActive(false),
    },
    {
      enableTap: !disabled,
      enableDoubleTap: !!onDoubleTap,
      enableLongPress: !!onLongPress,
    }
  );

  return (
    <div ref={containerRef} className={cn("flex items-center space-x-3", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        ref={toggleRef}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          "touch-manipulation cursor-pointer",
          checked ? "bg-blue-600" : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed",
          isActive && !disabled && "scale-95"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
            isActive && !disabled && "scale-90"
          )}
        />
      </div>
    </div>
  );
}