// Mobile performance configuration and utilities

export interface MobilePerformanceConfig {
  // Image optimization settings
  imageQuality: {
    lowEnd: number;
    standard: number;
    highEnd: number;
  };

  // Lazy loading thresholds
  lazyLoading: {
    rootMargin: string;
    threshold: number;
    delay: number;
  };

  // Animation settings
  animations: {
    reducedMotion: boolean;
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
  };

  // Virtualization settings
  virtualization: {
    enabled: boolean;
    itemHeight: number;
    overscan: number;
    threshold: number;
  };

  // Network-aware loading
  networkAware: {
    enabled: boolean;
    slowConnectionThreshold: number; // Mbps
    preloadStrategies: {
      'slow-2g': 'minimal';
      '2g': 'essential';
      '3g': 'important';
      '4g': 'all';
    };
  };

  // Memory management
  memory: {
    maxImageCache: number; // MB
    maxComponentInstances: number;
    gcInterval: number; // ms
  };
}

// Default performance configuration
export const defaultPerformanceConfig: MobilePerformanceConfig = {
  imageQuality: {
    lowEnd: 50,
    standard: 75,
    highEnd: 85,
  },

  lazyLoading: {
    rootMargin: '100px',
    threshold: 0.1,
    delay: 100,
  },

  animations: {
    reducedMotion: false,
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  },

  virtualization: {
    enabled: false,
    itemHeight: 60,
    overscan: 5,
    threshold: 100,
  },

  networkAware: {
    enabled: true,
    slowConnectionThreshold: 1.5,
    preloadStrategies: {
      'slow-2g': 'minimal',
      '2g': 'essential',
      '3g': 'important',
      '4g': 'all',
    },
  },

  memory: {
    maxImageCache: 50,
    maxComponentInstances: 50,
    gcInterval: 30000,
  },
};

// Device capability detection
export class DeviceCapabilities {
  private static instance: DeviceCapabilities;

  public static getInstance(): DeviceCapabilities {
    if (!DeviceCapabilities.instance) {
      DeviceCapabilities.instance = new DeviceCapabilities();
    }
    return DeviceCapabilities.instance;
  }

  public isLowEndDevice(): boolean {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const connection = (navigator as any).connection;

    return (
      cores <= 4 ||
      memory <= 2 ||
      (connection && this.isSlowConnection(connection.effectiveType))
    );
  }

  public isHighEndDevice(): boolean {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;

    return cores >= 8 && memory >= 8;
  }

  public isSlowConnection(connectionType?: string): boolean {
    const connection = connectionType || (navigator as any).connection?.effectiveType;
    return connection === 'slow-2g' || connection === '2g';
  }

  public isFastConnection(): boolean {
    const connection = (navigator as any).connection;
    return connection && (connection.effectiveType === '4g' || connection.downlink > 5);
  }

  public getDeviceMemory(): number {
    return (navigator as any).deviceMemory || 4;
  }

  public getCpuCores(): number {
    return navigator.hardwareConcurrency || 4;
  }

  public getScreenSize(): { width: number; height: number; isMobile: boolean } {
    const width = window.screen.width;
    const height = window.screen.height;
    const isMobile = width <= 768 || height <= 1024;

    return { width, height, isMobile };
  }

  public getPixelRatio(): number {
    return window.devicePixelRatio || 1;
  }

  public prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  public prefersReducedData(): boolean {
    return window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }

  public getBatteryLevel(): Promise<number | null> {
    return new Promise((resolve) => {
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          resolve(battery.level);
        }).catch(() => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }
}

// Performance configuration factory
export class PerformanceConfigFactory {
  private device: DeviceCapabilities;

  constructor() {
    this.device = DeviceCapabilities.getInstance();
  }

  public createConfig(): MobilePerformanceConfig {
    const isLowEnd = this.device.isLowEndDevice();
    const isSlowConnection = this.device.isSlowConnection();
    const prefersReducedMotion = this.device.prefersReducedMotion();
    const prefersReducedData = this.device.prefersReducedData();

    const config = { ...defaultPerformanceConfig };

    // Adjust for device capabilities
    if (isLowEnd) {
      config.imageQuality.lowEnd = 30;
      config.imageQuality.standard = 50;
      config.imageQuality.highEnd = 70;

      config.lazyLoading.rootMargin = '200px';
      config.lazyLoading.delay = 200;

      config.virtualization.enabled = true;
      config.virtualization.threshold = 50;

      config.memory.maxImageCache = 20;
      config.memory.maxComponentInstances = 20;
    }

    // Adjust for network conditions
    if (isSlowConnection || prefersReducedData) {
      config.imageQuality.lowEnd = 20;
      config.imageQuality.standard = 40;
      config.imageQuality.highEnd = 60;

      config.lazyLoading.rootMargin = '300px';
      config.lazyLoading.delay = 300;

      config.networkAware.enabled = true;
    }

    // Adjust for user preferences
    if (prefersReducedMotion) {
      config.animations.reducedMotion = true;
      config.animations.duration.fast = 0;
      config.animations.duration.normal = 0;
      config.animations.duration.slow = 0;
    }

    return config;
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observer: PerformanceObserver | null = null;

  public startMonitoring(): void {
    if (typeof window === 'undefined' || !window.performance) return;

    // Monitor Long Tasks
    if ('PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'longtask') {
              this.recordMetric('longTask', entry.duration);
            }
          });
        });

        this.observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task monitoring not supported');
      }
    }

    // Monitor memory usage (Chrome only)
    if ((performance as any).memory) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.recordMetric('memoryUsed', memory.usedJSHeapSize / 1048576); // MB
        this.recordMetric('memoryTotal', memory.totalJSHeapSize / 1048576); // MB
      }, 10000); // Every 10 seconds
    }
  }

  public stopMonitoring(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const values = this.metrics.get(name)!;
    values.push(value);

    // Keep only last 100 values
    if (values.length > 100) {
      values.shift();
    }
  }

  public getMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};

    for (const [name, values] of this.metrics.entries()) {
      if (values.length === 0) continue;

      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);

      result[name] = { avg, min, max };
    }

    return result;
  }

  public clearMetrics(): void {
    this.metrics.clear();
  }
}

// Cache management for mobile
export class MobileCacheManager {
  private cache: Map<string, { data: any; timestamp: number; size: number }> = new Map();
  private maxSize: number; // in MB
  private currentSize: number = 0;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize * 1024 * 1024; // Convert MB to bytes
  }

  public set(key: string, data: any, estimatedSize?: number): void {
    const size = estimatedSize || this.estimateSize(data);
    const timestamp = Date.now();

    // Remove item if it already exists
    if (this.cache.has(key)) {
      this.delete(key);
    }

    // Check if we need to make space
    while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
      this.evictOldest();
    }

    this.cache.set(key, { data, timestamp, size });
    this.currentSize += size;
  }

  public get(key: string): any {
    const item = this.cache.get(key);
    if (item) {
      item.timestamp = Date.now(); // Update access time
      return item.data;
    }
    return null;
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.currentSize -= item.size;
      return this.cache.delete(key);
    }
    return false;
  }

  public clear(): void {
    this.cache.clear();
    this.currentSize = 0;
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  private estimateSize(data: any): number {
    // Rough estimation in bytes
    const jsonString = JSON.stringify(data);
    return jsonString.length * 2; // Unicode characters are 2 bytes
  }

  public getStats(): { size: number; count: number; maxSize: number } {
    return {
      size: Math.round(this.currentSize / 1024 / 1024 * 100) / 100, // MB
      count: this.cache.size,
      maxSize: Math.round(this.maxSize / 1024 / 1024 * 100) / 100, // MB
    };
  }
}

// Export singleton instances
export const deviceCapabilities = DeviceCapabilities.getInstance();
export const performanceConfig = new PerformanceConfigFactory().createConfig();
export const performanceMonitor = new PerformanceMonitor();
export const cacheManager = new MobileCacheManager(performanceConfig.memory.maxImageCache);