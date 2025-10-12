// Mobile gesture configuration and utilities

export interface GestureConfig {
  // Swipe gestures
  swipe: {
    enabled: boolean;
    threshold: number;
    velocityThreshold: number;
    preventDefault: boolean;
    hapticFeedback: boolean;
  };

  // Tap gestures
  tap: {
    enabled: boolean;
    threshold: number;
    hapticFeedback: boolean;
    doubleTapEnabled: boolean;
    doubleTapThreshold: number;
  };

  // Long press gestures
  longPress: {
    enabled: boolean;
    threshold: number;
    hapticFeedback: boolean;
  };

  // Pinch gestures
  pinch: {
    enabled: boolean;
    threshold: number;
    hapticFeedback: boolean;
  };

  // Touch feedback
  feedback: {
    rippleEnabled: boolean;
    scaleEnabled: boolean;
    opacityEnabled: boolean;
    activeScale: number;
    activeOpacity: number;
  };

  // Accessibility
  accessibility: {
    announceGestures: boolean;
    visualIndicators: boolean;
    reducedMotion: boolean;
  };
}

export const defaultGestureConfig: GestureConfig = {
  swipe: {
    enabled: true,
    threshold: 50,
    velocityThreshold: 0.3,
    preventDefault: false,
    hapticFeedback: true,
  },

  tap: {
    enabled: true,
    threshold: 10,
    hapticFeedback: true,
    doubleTapEnabled: false,
    doubleTapThreshold: 300,
  },

  longPress: {
    enabled: false,
    threshold: 500,
    hapticFeedback: true,
  },

  pinch: {
    enabled: false,
    threshold: 10,
    hapticFeedback: true,
  },

  feedback: {
    rippleEnabled: true,
    scaleEnabled: true,
    opacityEnabled: true,
    activeScale: 0.95,
    activeOpacity: 0.7,
  },

  accessibility: {
    announceGestures: false,
    visualIndicators: true,
    reducedMotion: false,
  },
};

// Gesture patterns for common interactions
export const gesturePatterns = {
  // Navigation gestures
  navigation: {
    openSidebar: {
      swipeEdge: 'left',
      swipeThreshold: 30,
      hapticFeedback: true,
    },
    closeSidebar: {
      swipeEdge: 'right',
      swipeThreshold: 50,
      hapticFeedback: true,
    },
    navigateBack: {
      swipeEdge: 'left',
      swipeThreshold: 100,
      hapticFeedback: true,
    },
  },

  // Content gestures
  content: {
    pullToRefresh: {
      direction: 'down',
      threshold: 80,
      hapticFeedback: true,
      visualIndicator: true,
    },
    infiniteScroll: {
      direction: 'up',
      threshold: 100,
      hapticFeedback: false,
    },
    scrollToTop: {
      direction: 'down',
      threshold: 200,
      hapticFeedback: true,
    },
  },

  // List gestures
  list: {
    swipeToAction: {
      leftAction: 'delete',
      rightAction: 'archive',
      threshold: 80,
      hapticFeedback: true,
    },
    swipeToReorder: {
      enabled: false,
      threshold: 50,
      hapticFeedback: true,
    },
  },

  // Form gestures
  form: {
    swipeToSubmit: {
      direction: 'right',
      threshold: 100,
      hapticFeedback: true,
    },
    swipeToCancel: {
      direction: 'left',
      threshold: 100,
      hapticFeedback: true,
    },
    longPressToEdit: {
      threshold: 800,
      hapticFeedback: true,
    },
  },

  // Media gestures
  media: {
    swipeToNext: {
      direction: 'left',
      threshold: 60,
      hapticFeedback: true,
    },
    swipeToPrevious: {
      direction: 'right',
      threshold: 60,
      hapticFeedback: true,
    },
    pinchToZoom: {
      enabled: true,
      minScale: 0.5,
      maxScale: 3,
      hapticFeedback: true,
    },
  },
};

// Haptic feedback patterns
export const hapticPatterns = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  error: [100, 50, 100],
  warning: [50, 30, 50],
  selection: 25,
  notification: [20, 100],
  doubleTap: [10, 30],
  longPress: 50,
  swipe: 15,
  pinch: 20,
};

// Gesture recognition utilities
export class GestureRecognition {
  private static instance: GestureRecognition;
  private config: GestureConfig;
  private isEnabled: boolean = true;

  constructor(config: Partial<GestureConfig> = {}) {
    this.config = { ...defaultGestureConfig, ...config };
  }

  public static getInstance(config?: Partial<GestureConfig>): GestureRecognition {
    if (!GestureRecognition.instance) {
      GestureRecognition.instance = new GestureRecognition(config);
    }
    return GestureRecognition.instance;
  }

  public updateConfig(newConfig: Partial<GestureConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): GestureConfig {
    return this.config;
  }

  public enable(): void {
    this.isEnabled = true;
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public isGestureEnabled(type: keyof GestureConfig): boolean {
    return this.isEnabled && this.config[type].enabled;
  }

  public triggerHapticFeedback(pattern: keyof typeof hapticPatterns | number | number[]): void {
    if (!this.config.tap.hapticFeedback) return;

    const vibrationPattern = typeof pattern === 'string'
      ? hapticPatterns[pattern]
      : pattern;

    if ('vibrate' in navigator) {
      navigator.vibrate(vibrationPattern);
    }
  }

  public shouldPreventDefault(element: HTMLElement, gestureType: string): boolean {
    // Check if element has specific gesture handling
    const hasGestureAttribute = element.hasAttribute(`data-gesture-${gestureType}`);
    const hasPreventDefault = element.hasAttribute('data-prevent-default');

    return hasPreventDefault || hasGestureAttribute || this.config.swipe.preventDefault;
  }

  public getOptimalThreshold(element: HTMLElement, gestureType: string): number {
    // Check for custom threshold
    const customThreshold = element.getAttribute(`data-threshold-${gestureType}`);
    if (customThreshold) {
      return parseInt(customThreshold, 10);
    }

    // Get default threshold based on gesture type
    switch (gestureType) {
      case 'swipe':
        return this.config.swipe.threshold;
      case 'tap':
        return this.config.tap.threshold;
      case 'longPress':
        return this.config.longPress.threshold;
      case 'pinch':
        return this.config.pinch.threshold;
      default:
        return 50;
    }
  }
}

// Gesture accessibility utilities
export class GestureAccessibility {
  public static announceGesture(gestureType: string, direction?: string): void {
    if (typeof window === 'undefined') return;

    const announcement = this.getGestureAnnouncement(gestureType, direction);
    const announcer = document.getElementById('gesture-announcer');

    if (announcer) {
      announcer.textContent = announcement;
      announcer.setAttribute('aria-live', 'polite');
    } else {
      // Create announcer if it doesn't exist
      const div = document.createElement('div');
      div.id = 'gesture-announcer';
      div.setAttribute('aria-live', 'polite');
      div.setAttribute('aria-atomic', 'true');
      div.className = 'sr-only';
      div.textContent = announcement;
      document.body.appendChild(div);

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(div);
      }, 1000);
    }
  }

  private static getGestureAnnouncement(gestureType: string, direction?: string): string {
    const announcements = {
      swipe: {
        left: 'Swiped left',
        right: 'Swiped right',
        up: 'Swiped up',
        down: 'Swiped down',
      },
      tap: 'Tapped',
      doubleTap: 'Double tapped',
      longPress: 'Long pressed',
      pinch: 'Pinched',
    };

    if (gestureType === 'swipe' && direction) {
      return announcements.swipe[direction as keyof typeof announcements.swipe] || 'Swiped';
    }

    return announcements[gestureType as keyof typeof announcements] || `Performed ${gestureType}`;
  }

  public static addVisualIndicator(element: HTMLElement, gestureType: string): void {
    const indicator = document.createElement('div');
    indicator.className = 'gesture-indicator';
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-label', `${gestureType} gesture detected`);

    // Position indicator relative to element
    const rect = element.getBoundingClientRect();
    indicator.style.position = 'fixed';
    indicator.style.top = `${rect.top + rect.height / 2}px`;
    indicator.style.left = `${rect.left + rect.width / 2}px`;
    indicator.style.transform = 'translate(-50%, -50%)';

    // Add visual styling
    indicator.className += ' fixed z-50 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded pointer-events-none';

    document.body.appendChild(indicator);

    // Remove after animation
    setTimeout(() => {
      if (document.body.contains(indicator)) {
        document.body.removeChild(indicator);
      }
    }, 1000);
  }
}

// Touch optimization utilities
export const touchOptimization = {
  // Optimize touch targets
  optimizeTouchTargets: (container: HTMLElement) => {
    const touchTargets = container.querySelectorAll('button, a, [role="button"], input, select, textarea');

    touchTargets.forEach((target) => {
      const element = target as HTMLElement;
      const rect = element.getBoundingClientRect();

      // Ensure minimum touch target size (44x44px on iOS)
      if (rect.width < 44 || rect.height < 44) {
        element.style.minWidth = `${Math.max(rect.width, 44)}px`;
        element.style.minHeight = `${Math.max(rect.height, 44)}px`;
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }

      // Add touch-friendly properties
      element.style.touchAction = 'manipulation';
      element.style.WebkitUserSelect = 'none';
      element.style.userSelect = 'none';
      element.style.WebkitTapHighlightColor = 'transparent';
    });
  },

  // Add touch feedback styles
  addTouchFeedback: (element: HTMLElement) => {
    element.addEventListener('touchstart', () => {
      element.classList.add('touch-active');
    }, { passive: true });

    element.addEventListener('touchend', () => {
      element.classList.remove('touch-active');
    }, { passive: true });

    element.addEventListener('touchcancel', () => {
      element.classList.remove('touch-active');
    }, { passive: true });
  },

  // Prevent default touch behaviors
  preventDefaultTouch: (element: HTMLElement) => {
    element.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  },

  // Enable smooth scrolling
  enableSmoothScroll: (container: HTMLElement) => {
    container.style.scrollBehavior = 'smooth';
    container.style.WebkitOverflowScrolling = 'touch';
  },
};

// Export singleton instances
export const gestureRecognition = GestureRecognition.getInstance();
export const gestureAccessibility = GestureAccessibility;

// CSS for gesture feedback
export const gestureCSS = `
  .touch-active {
    transform: scale(0.95);
    opacity: 0.7;
    transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  }

  .gesture-indicator {
    animation: fadeInOut 1s ease-in-out;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  }

  .swipe-hint {
    position: relative;
    overflow: hidden;
  }

  .swipe-hint::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 2px;
    background: currentColor;
    transform: translate(-50%, -50%);
    opacity: 0.3;
    animation: swipeHint 2s infinite;
  }

  @keyframes swipeHint {
    0%, 100% { transform: translate(-50%, -50%) scaleX(1); }
    50% { transform: translate(-50%, -50%) scaleX(0.5); }
  }

  .ripple-effect {
    position: relative;
    overflow: hidden;
  }

  .ripple-effect::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .ripple-effect.active::after {
    width: 200px;
    height: 200px;
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .touch-active,
    .gesture-indicator,
    .swipe-hint::after,
    .ripple-effect::after {
      transition: none;
      animation: none;
    }
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;