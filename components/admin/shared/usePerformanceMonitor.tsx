"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// Type definitions for extended navigator APIs
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
  };
}

interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

interface PerformanceMetrics {
  // Navigation timing
  domContentLoaded: number;
  loadComplete: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;

  // Memory usage (if available)
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };

  // Network information (if available)
  networkInfo?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };

  // Device capabilities
  deviceInfo: {
    cores: number;
    memory: number;
    connectionType: string;
  };

  // Custom metrics
  renderTime: number;
  interactionDelay: number;
}

interface PerformanceEntry {
  name: string;
  value: number;
  timestamp: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const performanceEntries = useRef<PerformanceEntry[]>([]);

  // Detect if this is a low-end device
  const detectLowEndDevice = useCallback(() => {
    const extendedNavigator = navigator as ExtendedNavigator;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = extendedNavigator.deviceMemory || 4;
    const connection = extendedNavigator.connection;

    const lowEndByCores = cores <= 4;
    const lowEndByMemory = memory <= 2;
    const lowEndByConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    );

    return lowEndByCores || lowEndByMemory || lowEndByConnection;
  }, []);

  // Detect slow connection
  const detectSlowConnection = useCallback(() => {
    const extendedNavigator = navigator as ExtendedNavigator;
    const connection = extendedNavigator.connection;
    if (!connection) return false;

    return (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.downlink < 1.5
    );
  }, []);

  // Collect performance metrics
  const collectMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');

    // Get paint timings
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

    // Get memory usage (Chrome only)
    let memoryUsage;
    const extendedPerformance = performance as ExtendedPerformance;
    if (extendedPerformance.memory) {
      memoryUsage = {
        used: Math.round(extendedPerformance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(extendedPerformance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(extendedPerformance.memory.jsHeapSizeLimit / 1048576), // MB
      };
    }

    // Get network information
    let networkInfo;
    const extendedNavigator = navigator as ExtendedNavigator;
    const connection = extendedNavigator.connection;
    if (connection) {
      networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      };
    }

    // Get device info
    const deviceInfo = {
      cores: navigator.hardwareConcurrency || 4,
      memory: extendedNavigator.deviceMemory || 4,
      connectionType: connection?.effectiveType || 'unknown',
    };

    const newMetrics: PerformanceMetrics = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      firstContentfulPaint: fcpEntry ? fcpEntry.startTime : 0,
      largestContentfulPaint: 0, // Will be updated by LCP observer
      memoryUsage,
      networkInfo,
      deviceInfo,
      renderTime: 0,
      interactionDelay: 0,
    };

    setMetrics(newMetrics);
    setIsLowEndDevice(detectLowEndDevice());
    setIsSlowConnection(detectSlowConnection());
  }, [detectLowEndDevice, detectSlowConnection]);

  // Monitor Largest Contentful Paint
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      setMetrics(prev => prev ? {
        ...prev,
        largestContentfulPaint: lastEntry.startTime
      } : null);
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      return () => observer.disconnect();
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }, []);

  // Monitor long tasks (indicative of performance issues)
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 50) { // Tasks longer than 50ms
          performanceEntries.current.push({
            name: 'long-task',
            value: entry.duration,
            timestamp: entry.startTime,
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    } catch (e) {
      console.warn('Long task observer not supported');
    }
  }, []);

  // Measure interaction delay
  const measureInteractionDelay = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    let totalDelay = 0;
    let measurements = 0;

    const measureClick = (event: Event) => {
      const startTime = performance.now();

      requestAnimationFrame(() => {
        const endTime = performance.now();
        const delay = endTime - startTime;
        totalDelay += delay;
        measurements++;

        setMetrics(prev => prev ? {
          ...prev,
          interactionDelay: totalDelay / measurements
        } : null);
      });
    };

    document.addEventListener('click', measureClick, { passive: true });

    return () => {
      document.removeEventListener('click', measureClick);
    };
  }, []);

  // Initialize monitoring
  useEffect(() => {
    collectMetrics();
    measureInteractionDelay();

    // Collect metrics periodically
    const interval = setInterval(() => {
      collectMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, [collectMetrics, measureInteractionDelay]);

  // Performance optimization recommendations
  const getOptimizations = useCallback(() => {
    if (!metrics) return [];

    const optimizations = [];

    if (metrics.domContentLoaded > 3000) {
      optimizations.push({
        type: 'critical',
        message: 'DOM loading is slow. Consider code splitting and reducing initial bundle size.',
      });
    }

    if (metrics.firstContentfulPaint > 2000) {
      optimizations.push({
        type: 'critical',
        message: 'First Contentful Paint is slow. Optimize critical rendering path.',
      });
    }

    if (metrics.memoryUsage && metrics.memoryUsage.used / metrics.memoryUsage.limit > 0.8) {
      optimizations.push({
        type: 'warning',
        message: 'High memory usage detected. Implement better memory management.',
      });
    }

    if (isLowEndDevice) {
      optimizations.push({
        type: 'info',
        message: 'Low-end device detected. Enable reduced motion and simpler animations.',
      });
    }

    if (isSlowConnection) {
      optimizations.push({
        type: 'warning',
        message: 'Slow connection detected. Optimize images and reduce data usage.',
      });
    }

    return optimizations;
  }, [metrics, isLowEndDevice, isSlowConnection]);

  // Report performance metrics
  const reportMetrics = useCallback(() => {
    if (!metrics) return;

    const report = {
      timestamp: Date.now(),
      metrics,
      optimizations: getOptimizations(),
      isLowEndDevice,
      isSlowConnection,
      performanceEntries: performanceEntries.current,
    };

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log('Metrics:', metrics);
      console.log('Optimizations:', getOptimizations());
      console.log('Low-end device:', isLowEndDevice);
      console.log('Slow connection:', isSlowConnection);
      console.groupEnd();
    }

    // In production, you could send this to your analytics service
    // analytics.track('performance_metrics', report);

    return report;
  }, [metrics, getOptimizations, isLowEndDevice, isSlowConnection]);

  return {
    metrics,
    isLowEndDevice,
    isSlowConnection,
    getOptimizations,
    reportMetrics,
  };
}

// Performance optimization component for mobile
interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableReducedMotion?: boolean;
  enableLowQualityImages?: boolean;
  enableVirtualization?: boolean;
}

export function PerformanceOptimizer({
  children,
  enableReducedMotion,
  enableLowQualityImages,
  enableVirtualization,
}: PerformanceOptimizerProps) {
  const { isLowEndDevice, isSlowConnection } = usePerformanceMonitor();

  // Apply performance optimizations based on device capabilities
  const shouldReduceMotion = enableReducedMotion || isLowEndDevice;
  const shouldUseLowQualityImages = enableLowQualityImages || isSlowConnection;
  const shouldEnableVirtualization = enableVirtualization || isLowEndDevice;

  useEffect(() => {
    // Add performance classes to document
    const root = document.documentElement;

    if (shouldReduceMotion) {
      root.classList.add('reduce-motion');
    }

    if (shouldUseLowQualityImages) {
      root.classList.add('low-quality-images');
    }

    if (shouldEnableVirtualization) {
      root.classList.add('enable-virtualization');
    }

    return () => {
      root.classList.remove('reduce-motion', 'low-quality-images', 'enable-virtualization');
    };
  }, [shouldReduceMotion, shouldUseLowQualityImages, shouldEnableVirtualization]);

  return <>{children}</>;
}