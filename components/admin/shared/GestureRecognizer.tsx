"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

export interface GestureConfig {
  swipeThreshold?: number;
  swipeVelocityThreshold?: number;
  tapThreshold?: number;
  doubleTapThreshold?: number;
  longPressThreshold?: number;
  pinchThreshold?: number;
  enableSwipe?: boolean;
  enableTap?: boolean;
  enableDoubleTap?: boolean;
  enableLongPress?: boolean;
  enablePinch?: boolean;
  preventDefault?: boolean;
}

export interface GestureCallbacks {
  onSwipeLeft?: (event: TouchEvent) => void;
  onSwipeRight?: (event: TouchEvent) => void;
  onSwipeUp?: (event: TouchEvent) => void;
  onSwipeDown?: (event: TouchEvent) => void;
  onTap?: (event: TouchEvent) => void;
  onDoubleTap?: (event: TouchEvent) => void;
  onLongPress?: (event: TouchEvent) => void;
  onPinch?: (scale: number, event: TouchEvent) => void;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
}

const defaultConfig: Required<GestureConfig> = {
  swipeThreshold: 50,
  swipeVelocityThreshold: 0.3,
  tapThreshold: 10,
  doubleTapThreshold: 300,
  longPressThreshold: 500,
  pinchThreshold: 10,
  enableSwipe: true,
  enableTap: true,
  enableDoubleTap: false,
  enableLongPress: false,
  enablePinch: false,
  preventDefault: false,
};

export function useGestureRecognizer<T extends HTMLElement = HTMLElement>(
  callbacks: GestureCallbacks,
  config: GestureConfig = {}
) {
  const [isGesturing, setIsGesturing] = useState(false);
  const elementRef = useRef<T>(null);
  const gestureState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    lastTapTime: 0,
    tapCount: 0,
    longPressTimer: null as NodeJS.Timeout | null,
    initialDistance: 0,
    initialScale: 1,
    currentScale: 1,
  });

  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const getDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getVelocity = (distance: number, time: number): number => {
    return distance / time;
  };

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!elementRef.current || event.touches.length === 0) return;

    const touch = event.touches[0];
    gestureState.current = {
      ...gestureState.current,
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };

    if (mergedConfig.preventDefault && event.cancelable) {
      event.preventDefault();
    }

    callbacks.onTouchStart?.(event);

    // Handle tap detection
    if (mergedConfig.enableTap || mergedConfig.enableDoubleTap) {
      const now = Date.now();
      const timeSinceLastTap = now - gestureState.current.lastTapTime;

      if (timeSinceLastTap < mergedConfig.doubleTapThreshold) {
        gestureState.current.tapCount++;
        if (gestureState.current.tapCount === 2 && mergedConfig.enableDoubleTap) {
          callbacks.onDoubleTap?.(event);
          gestureState.current.tapCount = 0;
        }
      } else {
        gestureState.current.tapCount = 1;
      }
      gestureState.current.lastTapTime = now;
    }

    // Handle long press
    if (mergedConfig.enableLongPress) {
      gestureState.current.longPressTimer = setTimeout(() => {
        callbacks.onLongPress?.(event);
        setIsGesturing(false);
      }, mergedConfig.longPressThreshold);
    }

    // Handle pinch start
    if (mergedConfig.enablePinch && event.touches.length === 2) {
      gestureState.current.initialDistance = getDistance(event.touches[0], event.touches[1]);
      gestureState.current.initialScale = gestureState.current.currentScale;
    }

    setIsGesturing(true);
  }, [callbacks, mergedConfig]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!elementRef.current || event.touches.length === 0) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - gestureState.current.startX;
    const deltaY = touch.clientY - gestureState.current.startY;
    const deltaTime = Date.now() - gestureState.current.startTime;

    // Cancel long press if moved
    if (gestureState.current.longPressTimer) {
      clearTimeout(gestureState.current.longPressTimer);
      gestureState.current.longPressTimer = null;
    }

    // Handle pinch
    if (mergedConfig.enablePinch && event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      const scale = (currentDistance / gestureState.current.initialDistance) * gestureState.current.initialScale;

      if (Math.abs(scale - gestureState.current.currentScale) > mergedConfig.pinchThreshold / 100) {
        gestureState.current.currentScale = scale;
        callbacks.onPinch?.(scale, event);
      }
    }

    // Handle swipe detection
    if (mergedConfig.enableSwipe && event.touches.length === 1) {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > mergedConfig.tapThreshold || absDeltaY > mergedConfig.tapThreshold) {
        const velocity = getVelocity(Math.max(absDeltaX, absDeltaY), deltaTime);

        if (velocity > mergedConfig.swipeVelocityThreshold) {
          if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (deltaX > 0) {
              callbacks.onSwipeRight?.(event);
            } else {
              callbacks.onSwipeLeft?.(event);
            }
          } else {
            // Vertical swipe
            if (deltaY > 0) {
              callbacks.onSwipeDown?.(event);
            } else {
              callbacks.onSwipeUp?.(event);
            }
          }
        }
      }
    }

    if (mergedConfig.preventDefault && event.cancelable) {
      event.preventDefault();
    }

    callbacks.onTouchMove?.(event);
  }, [callbacks, mergedConfig]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (gestureState.current.longPressTimer) {
      clearTimeout(gestureState.current.longPressTimer);
      gestureState.current.longPressTimer = null;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - gestureState.current.startX;
    const deltaY = touch.clientY - gestureState.current.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Handle tap (if not a swipe or long press)
    if (mergedConfig.enableTap &&
        distance < mergedConfig.tapThreshold &&
        gestureState.current.tapCount === 1) {

      // Delay tap detection to ensure it's not a double tap
      setTimeout(() => {
        if (gestureState.current.tapCount === 1) {
          callbacks.onTap?.(event);
          gestureState.current.tapCount = 0;
        }
      }, mergedConfig.doubleTapThreshold);
    }

    callbacks.onTouchEnd?.(event);
    setIsGesturing(false);
  }, [callbacks, mergedConfig]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !mergedConfig.preventDefault });
    element.addEventListener('touchmove', handleTouchMove, { passive: !mergedConfig.preventDefault });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);

      if (gestureState.current.longPressTimer) {
        clearTimeout(gestureState.current.longPressTimer);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, mergedConfig.preventDefault]);

  return {
    elementRef,
    isGesturing,
    resetState: () => {
      gestureState.current = {
        startX: 0,
        startY: 0,
        startTime: 0,
        lastTapTime: 0,
        tapCount: 0,
        longPressTimer: null,
        initialDistance: 0,
        initialScale: 1,
        currentScale: 1,
      };
      setIsGesturing(false);
    },
  };
}

// Higher-order component for adding gestures to existing components
export function withGestureRecognizer<P extends object>(
  Component: React.ComponentType<P & { ref?: React.Ref<HTMLElement> }>
) {
  const WrappedComponent = React.forwardRef<HTMLElement, P & {
    gestureCallbacks?: GestureCallbacks;
    gestureConfig?: GestureConfig;
  }>((props, ref) => {
    const { gestureCallbacks, gestureConfig, ...restProps } = props;
    const { elementRef } = useGestureRecognizer(gestureCallbacks || {}, gestureConfig);

    // Merge refs
    const mergedRef = useCallback((element: HTMLElement) => {
      elementRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement>).current = element;
      }
    }, [elementRef, ref]);

    return <Component {...(restProps as P)} ref={mergedRef} />;
  });

  WrappedComponent.displayName = `withGestureRecognizer(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Hook for swipe navigation
export function useSwipeNavigation(callbacks: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}) {
  const { elementRef } = useGestureRecognizer({
    onSwipeLeft: () => callbacks.onSwipeLeft?.(),
    onSwipeRight: () => callbacks.onSwipeRight?.(),
    onSwipeUp: () => callbacks.onSwipeUp?.(),
    onSwipeDown: () => callbacks.onSwipeDown?.(),
  }, {
    enableSwipe: true,
    enableTap: false,
    enableDoubleTap: false,
    enableLongPress: false,
    enablePinch: false,
  });

  return elementRef;
}

// Hook for pull-to-refresh functionality
export function usePullToRefresh(onRefresh: () => Promise<void>, threshold: number = 80) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const gestureStateRef = useRef({ startY: 0 });

  const { elementRef } = useGestureRecognizer({
    onSwipeDown: (event) => {
      if (window.scrollY === 0) {
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
    enableTap: false,
    preventDefault: true,
  });

  return {
    elementRef,
    isPulling,
    pullDistance,
    isRefreshing,
    refreshThreshold: threshold,
  };
}