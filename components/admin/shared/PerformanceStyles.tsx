"use client";

import { useEffect } from "react";

// Type definitions for extended navigator APIs
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
  };
}

interface PerformanceStylesProps {
  isLowEndDevice?: boolean;
  isSlowConnection?: boolean;
  prefersReducedMotion?: boolean;
  prefersReducedData?: boolean;
}

export function PerformanceStyles({
  isLowEndDevice = false,
  isSlowConnection = false,
  prefersReducedMotion = false,
  prefersReducedData = false,
}: PerformanceStylesProps) {
  useEffect(() => {
    const root = document.documentElement;

    // Add performance classes to document
    const classes: string[] = [];

    if (isLowEndDevice) {
      classes.push('low-end-device');
    }

    if (isSlowConnection) {
      classes.push('slow-connection');
    }

    if (prefersReducedMotion) {
      classes.push('reduce-motion');
    }

    if (prefersReducedData) {
      classes.push('reduce-data');
    }

    // Add classes to root element
    root.classList.add(...classes);

    // Add device-specific optimizations
    if (isLowEndDevice) {
      // Disable complex animations
      root.style.setProperty('--animation-duration-fast', '0ms');
      root.style.setProperty('--animation-duration-normal', '0ms');
      root.style.setProperty('--animation-duration-slow', '0ms');

      // Reduce shadow complexity
      root.style.setProperty('--shadow-sm', 'none');
      root.style.setProperty('--shadow-md', 'none');
      root.style.setProperty('--shadow-lg', 'none');

      // Disable backdrop filters
      root.style.setProperty('--backdrop-blur', 'none');
      root.style.setProperty('--backdrop-brightness', '1');
    }

    if (isSlowConnection || prefersReducedData) {
      // Set image quality variables
      root.style.setProperty('--image-quality', '50');
      root.style.setProperty('--lazy-load-delay', '300ms');
      root.style.setProperty('--lazy-load-margin', '200px');

      // Disable custom fonts loading
      root.style.setProperty('--font-display', 'swap');
    }

    if (prefersReducedMotion) {
      // Disable all animations and transitions
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        // Cleanup
        document.head.removeChild(style);
        root.classList.remove(...classes);
      };
    }

    // Cleanup function
    return () => {
      root.classList.remove(...classes);
    };
  }, [isLowEndDevice, isSlowConnection, prefersReducedMotion, prefersReducedData]);

  return null;
}

// Hook for performance CSS classes
export function usePerformanceStyles() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Detect device capabilities
    const extendedNavigator = navigator as ExtendedNavigator;
    const isLowEndDevice =
      (navigator.hardwareConcurrency || 4) <= 4 ||
      (extendedNavigator.deviceMemory || 4) <= 2 ||
      (extendedNavigator.connection?.effectiveType === 'slow-2g' ||
       extendedNavigator.connection?.effectiveType === '2g');

    const isSlowConnection =
      extendedNavigator.connection?.effectiveType === 'slow-2g' ||
      extendedNavigator.connection?.effectiveType === '2g' ||
      (extendedNavigator.connection?.downlink || 10) < 1.5;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;

    // Add performance classes
    const classes: string[] = [];
    if (isLowEndDevice) classes.push('low-end-device');
    if (isSlowConnection) classes.push('slow-connection');
    if (prefersReducedMotion) classes.push('reduce-motion');
    if (prefersReducedData) classes.push('reduce-data');

    root.classList.add(...classes);

    // Add CSS custom properties
    const cssVars: Record<string, string> = {};

    if (isLowEndDevice) {
      cssVars['--animation-duration-fast'] = '0ms';
      cssVars['--animation-duration-normal'] = '0ms';
      cssVars['--animation-duration-slow'] = '0ms';
      cssVars['--transition-duration-fast'] = '0ms';
      cssVars['--transition-duration-normal'] = '0ms';
      cssVars['--transition-duration-slow'] = '0ms';
    }

    if (isSlowConnection || prefersReducedData) {
      cssVars['--image-quality'] = '50';
      cssVars['--lazy-load-delay'] = '300ms';
      cssVars['--lazy-load-margin'] = '200px';
      cssVars['--font-display'] = 'swap';
    }

    // Apply CSS variables
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Add dynamic styles for reduced motion
    if (prefersReducedMotion) {
      const style = document.createElement('style');
      style.id = 'performance-reduced-motion';
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        .performance-animation {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Add performance monitoring class for development
    if (process.env.NODE_ENV === 'development') {
      const performanceMonitor = document.createElement('div');
      performanceMonitor.className = 'performance-monitor';
      performanceMonitor.id = 'performance-monitor';
      performanceMonitor.innerHTML = `
        <div>Device: ${isLowEndDevice ? 'Low-end' : 'Standard'}</div>
        <div>Connection: ${extendedNavigator.connection?.effectiveType || 'Unknown'}</div>
        <div>Memory: ${extendedNavigator.deviceMemory || 'Unknown'}GB</div>
        <div>Cores: ${navigator.hardwareConcurrency || 'Unknown'}</div>
      `;
      document.body.appendChild(performanceMonitor);
    }

    // Cleanup
    return () => {
      root.classList.remove(...classes);

      // Remove CSS variables
      Object.keys(cssVars).forEach(key => {
        root.style.removeProperty(key);
      });

      // Remove dynamic styles
      const reducedMotionStyle = document.getElementById('performance-reduced-motion');
      if (reducedMotionStyle) {
        document.head.removeChild(reducedMotionStyle);
      }

      // Remove performance monitor
      const monitor = document.getElementById('performance-monitor');
      if (monitor) {
        document.body.removeChild(monitor);
      }
    };
  }, []);
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce for performance
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    immediate?: boolean
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };

      const callNow = immediate && !timeout;

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func(...args);
    };
  },

  // Throttle for performance
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // RequestAnimationFrame callback
  rafCallback: (callback: () => void) => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  },

  // Memory-efficient event listener
  addEventListenerWithCleanup: (
    element: Element | Window | Document,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);

    return () => {
      element.removeEventListener(event, handler, options);
    };
  },

  // Optimize image loading based on network
  getOptimalImageQuality: () => {
    const extendedNavigator = navigator as ExtendedNavigator;
    const connection = extendedNavigator.connection;
    if (!connection) return 75;

    const effectiveType = connection.effectiveType;
    switch (effectiveType) {
      case 'slow-2g':
        return 30;
      case '2g':
        return 50;
      case '3g':
        return 70;
      case '4g':
        return 85;
      default:
        return 75;
    }
  },

  // Check if should use lazy loading
  shouldUseLazyLoading: () => {
    const extendedNavigator = navigator as ExtendedNavigator;
    const connection = extendedNavigator.connection;
    if (!connection) return true;

    return (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.downlink < 2
    );
  },

  // Get device performance profile
  getPerformanceProfile: () => {
    const extendedNavigator = navigator as ExtendedNavigator;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = extendedNavigator.deviceMemory || 4;
    const connection = extendedNavigator.connection;

    let score = 0;
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;

    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;

    if (connection) {
      if (connection.effectiveType === '4g') score += 4;
      else if (connection.effectiveType === '3g') score += 3;
      else if (connection.effectiveType === '2g') score += 2;
      else if (connection.effectiveType === 'slow-2g') score += 1;
    } else {
      score += 2; // Assume moderate connection
    }

    if (score >= 8) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  },
};