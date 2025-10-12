"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TouchCardProps {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  delayLongPress?: number;
  disabled?: boolean;
  hapticFeedback?: boolean;
  activeScale?: number;
  pressOpacity?: number;
}

export function TouchCard({
  children,
  className,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  delayLongPress = 500,
  disabled = false,
  hapticFeedback = true,
  activeScale = 0.95,
  pressOpacity = 0.7,
}: TouchCardProps) {
  const [isActive, setIsActive] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    setIsActive(true);
    onPressIn?.();

    // Haptic feedback
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Set up long press
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(20);
        }
        onLongPress();
      }, delayLongPress);
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;

    setIsActive(false);
    onPressOut?.();

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Handle press
    if (onPress) {
      onPress();
    }
  };

  const handleTouchCancel = () => {
    if (disabled) return;

    setIsActive(false);
    onPressOut?.();

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [disabled, onPress, onPressIn, onPressOut, onLongPress, delayLongPress]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-150",
        "touch-manipulation",
        !disabled && "active:scale-100 active:shadow-md cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        isActive && !disabled && "scale-95 shadow-md",
        className
      )}
      style={{
        transform: isActive && !disabled ? `scale(${activeScale})` : 'scale(1)',
        opacity: isActive && !disabled ? pressOpacity : 1,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, box-shadow 0.1s ease-out',
      }}
      onClick={disabled ? undefined : onPress}
    >
      {/* Ripple effect */}
      {isActive && !disabled && (
        <div className="absolute inset-0 bg-blue-500 opacity-10 pointer-events-none" />
      )}

      {children}
    </div>
  );
}

// Touch-optimized button component
interface TouchButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  hapticFeedback?: boolean;
  loading?: boolean;
}

export function TouchButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  disabled = false,
  hapticFeedback = true,
  loading = false,
}: TouchButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const getVariantClasses = () => {
    const baseClasses = "relative overflow-hidden rounded-lg font-medium transition-all duration-150 touch-manipulation";

    const variants = {
      primary: "bg-blue-600 text-white border border-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:border-gray-300",
      secondary: "bg-gray-600 text-white border border-gray-600 active:bg-gray-700 disabled:bg-gray-300 disabled:border-gray-300",
      outline: "bg-transparent text-gray-700 border border-gray-300 active:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200",
      ghost: "bg-transparent text-gray-700 active:bg-gray-100 disabled:text-gray-400",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm min-h-[32px]",
      md: "px-4 py-2 text-sm min-h-[40px]",
      lg: "px-6 py-3 text-base min-h-[48px]",
    };

    return cn(
      baseClasses,
      variants[variant],
      sizes[size],
      disabled && "cursor-not-allowed opacity-50",
      isActive && !disabled && "scale-95"
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || loading) return;

    setIsActive(true);
    onPressIn?.();

    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (hapticFeedback && 'vibrate' in navigator) {
          navigator.vibrate(20);
        }
        onLongPress();
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    if (disabled || loading) return;

    setIsActive(false);
    onPressOut?.();

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (onPress) {
      onPress();
    }
  };

  const handleTouchCancel = () => {
    setIsActive(false);
    onPressOut?.();

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  useEffect(() => {
    const element = document.createElement('div');
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [disabled, loading, onPress, onPressIn, onPressOut, onLongPress]);

  return (
    <button
      className={cn(getVariantClasses(), className)}
      disabled={disabled || loading}
      style={{
        transform: isActive && !disabled && !loading ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.1s ease-out',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Ripple effect */}
      {isActive && !disabled && !loading && (
        <div className="absolute inset-0 bg-white opacity-20 pointer-events-none" />
      )}

      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        </div>
      )}

      <span className={cn("relative z-10", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
}

// Touch-optimized list item component
interface TouchListItemProps {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  disabled?: boolean;
  active?: boolean;
  hapticFeedback?: boolean;
}

export function TouchListItem({
  children,
  className,
  onPress,
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
  active = false,
  hapticFeedback = true,
}: TouchListItemProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    if (disabled) return;
    setIsPressed(true);

    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(5);
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    setIsPressed(false);

    if (onPress) {
      onPress();
    }
  };

  return (
    <div
      className={cn(
        "relative touch-manipulation transition-all duration-150",
        "border-b border-gray-100 last:border-b-0",
        !disabled && "active:bg-gray-50 cursor-pointer",
        active && "bg-blue-50 border-l-4 border-l-blue-500",
        disabled && "opacity-50 cursor-not-allowed",
        isPressed && "bg-gray-100",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Press effect */}
      {isPressed && !disabled && (
        <div className="absolute inset-0 bg-gray-200 opacity-20 pointer-events-none" />
      )}

      <div className="px-4 py-3">
        {children}
      </div>
    </div>
  );
}

// Touch feedback utilities
export const touchFeedback = {
  // Trigger haptic feedback
  vibrate: (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  },

  // Success feedback
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  },

  // Error feedback
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  },

  // Warning feedback
  warning: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  },

  // Selection feedback
  selection: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  },
};

// Touch gesture styles
export const touchStyles = `
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .touch-feedback {
    position: relative;
    overflow: hidden;
  }

  .touch-feedback::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .touch-feedback.active::after {
    width: 200px;
    height: 200px;
  }

  /* Optimize touch targets for mobile */
  @media (max-width: 640px) {
    .touch-target {
      min-height: 44px;
      min-width: 44px;
    }

    .touch-target-large {
      min-height: 48px;
      min-width: 48px;
    }
  }

  /* Disable hover effects on touch devices */
  @media (hover: none) {
    .no-hover:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;