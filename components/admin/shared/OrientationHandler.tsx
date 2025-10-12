"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OrientationHandlerProps {
  children: React.ReactNode;
  className?: string;
}

interface OrientationInfo {
  orientation: "portrait" | "landscape";
  angle: number;
  type: "primary" | "secondary";
}

export function OrientationHandler({ children, className = "" }: OrientationHandlerProps) {
  const [orientation, setOrientation] = useState<OrientationInfo>({
    orientation: "portrait",
    angle: 0,
    type: "primary"
  });
  const [isSupported, setIsSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set isClient to true after component mounts
    setIsClient(true);

    // Check if screen orientation API is supported
    const checkSupport = () => {
      const supported = 'screen' in window && 'orientation' in window.screen;
      setIsSupported(supported);
      return supported;
    };

    // Get current orientation
    const getOrientation = (): OrientationInfo => {
      if (typeof window !== 'undefined' && window.screen && window.screen.orientation) {
        const angle = window.screen.orientation.angle;
        const type = window.screen.orientation.type;

        // Determine orientation based on angle
        const isPortrait = angle === 0 || angle === 180;

        return {
          orientation: isPortrait ? "portrait" : "landscape",
          angle,
          type: type.includes("primary") ? "primary" : "secondary"
        };
      } else {
        // Fallback for browsers that don't support orientation API
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;

        return {
          orientation: isPortrait ? "portrait" : "landscape",
          angle: 0,
          type: "primary"
        };
      }
    };

    // Handle orientation change
    const handleOrientationChange = () => {
      const newOrientation = getOrientation();
      setOrientation(newOrientation);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Add stability timeout to prevent rapid re-renders
      timeoutRef.current = setTimeout(() => {
        // Trigger a reflow to ensure stable layout
        document.body.offsetHeight;
      }, 100);
    };

    // Initial orientation detection
    if (checkSupport()) {
      handleOrientationChange();

      // Add event listeners
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
    } else {
      // Fallback for browsers without orientation support
      handleOrientationChange();
      window.addEventListener('resize', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get appropriate layout classes based on orientation
  const getLayoutClasses = () => {
    const baseClasses = "transition-all duration-300 ease-in-out min-h-screen";

    switch (orientation.orientation) {
      case "portrait":
        return cn(
          baseClasses,
          "w-full overflow-y-auto",
          // Portrait-specific styling
          "flex flex-col"
        );
      case "landscape":
        return cn(
          baseClasses,
          "w-full overflow-x-auto",
          // Landscape-specific styling
          "flex flex-row"
        );
      default:
        return baseClasses;
    }
  };

  // Get viewport-specific adjustments
  const getViewportAdjustments = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0;

    return {
      isMobile: width < 640, // sm breakpoint
      isTablet: width >= 640 && width < 1024, // md breakpoint
      isDesktop: width >= 1024, // lg breakpoint
      isSmallLandscape: orientation.orientation === "landscape" && height < 500,
      isLargePortrait: orientation.orientation === "portrait" && width < 400,
    };
  };

  const viewport = getViewportAdjustments();

  // Render orientation-specific warnings or hints
  const renderOrientationHint = () => {
    if (!isSupported) {
      return (
        <div className="hidden lg:block fixed top-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-xs z-50">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Orientation Detection</p>
              <p className="text-yellow-600">Limited support in this browser</p>
            </div>
          </div>
        </div>
      );
    }

    if (viewport.isSmallLandscape) {
      return (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-50 sm:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h4m-4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <div className="text-sm">
                <p className="font-medium text-blue-800">For better experience</p>
                <p className="text-blue-600">Use portrait orientation</p>
              </div>
            </div>
            <button
              onClick={() => {
                if ('screen' in window && 'orientation' in window.screen && 'lock' in window.screen.orientation) {
                  (window.screen.orientation as ScreenOrientation).lock('portrait');
                }
              }}
              className="ml-2 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              Auto-Rotate
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn(getLayoutClasses(), className)}>
      {/* CSS Variables for responsive adjustments */}
      {isClient && (
        <style jsx global>{`
          :root {
            --viewport-width: ${typeof window !== 'undefined' ? window.innerWidth : '100vw'};
            --viewport-height: ${typeof window !== 'undefined' ? window.innerHeight : '100vh'};
            --orientation: ${orientation.orientation};
            --orientation-angle: ${orientation.angle}deg;
          }

        /* Responsive adjustments based on orientation */
        @media (orientation: portrait) {
          .orientation-responsive {
            --layout-direction: column;
          }
        }

        @media (orientation: landscape) {
          .orientation-responsive {
            --layout-direction: row;
          }
        }

        /* Small landscape device adjustments */
        @media (max-height: 500px) and (orientation: landscape) {
          .orientation-responsive {
            --font-scale: 0.9;
            --spacing-scale: 0.8;
          }
        }

        /* Large portrait device adjustments */
        @media (max-width: 400px) and (orientation: portrait) {
          .orientation-responsive {
            --font-scale: 1.1;
            --spacing-scale: 1.2;
          }
        }
      `}</style>
      )}

      {/* Main content with orientation-aware classes */}
      <div className="orientation-responsive flex-1">
        {children}
      </div>

      {/* Orientation hints */}
      {renderOrientationHint()}

      {/* Debug overlay for development */}
      {process.env.NODE_ENV === 'development' && isClient && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-75 text-white text-xs p-2 z-50 lg:hidden">
          <div>Orientation: {orientation.orientation}</div>
          <div>Angle: {orientation.angle}°</div>
          <div>Type: {orientation.type}</div>
          <div>Viewport: {viewport.isMobile ? 'Mobile' : viewport.isTablet ? 'Tablet' : 'Desktop'}</div>
        </div>
      )}
    </div>
  );
}

// Hook for consuming orientation data in other components
export function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationInfo>({
    orientation: "portrait",
    angle: 0,
    type: "primary"
  });

  useEffect(() => {
    const getOrientation = (): OrientationInfo => {
      if (typeof window !== 'undefined' && window.screen && window.screen.orientation) {
        const angle = window.screen.orientation.angle;
        const type = window.screen.orientation.type;
        const isPortrait = angle === 0 || angle === 180;

        return {
          orientation: isPortrait ? "portrait" : "landscape",
          angle,
          type
        };
      } else {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;

        return {
          orientation: isPortrait ? "portrait" : "landscape",
          angle: 0,
          type: isPortrait ? "portrait-primary" : "landscape-primary"
        };
      }
    };

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    handleOrientationChange();

    if ('screen' in window && 'orientation' in window.screen) {
      window.addEventListener('orientationchange', handleOrientationChange);
    }
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      if ('screen' in window && 'orientation' in window.screen) {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return {
    orientation,
    isPortrait: orientation.orientation === "portrait",
    isLandscape: orientation.orientation === "landscape",
    angle: orientation.angle,
    type: orientation.type
  };
}