"use client";

import { useEffect, useState, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    triggerOnce = false
  } = options;

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Check if browser supports IntersectionObserver
    if (!window.IntersectionObserver) {
      // Fallback for older browsers
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }

        // If triggerOnce is true, disconnect after first intersection
        if (isElementIntersecting && triggerOnce) {
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected
  };
}