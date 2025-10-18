"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Hook to detect window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Mobile/Tablet variants (< lg)
const mobileModalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const mobileContentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    y: 150,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const mobileCloseButtonVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

// Desktop variants (lg+)
const desktopModalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const desktopContentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const desktopCloseButtonVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    rotate: 90,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnimationComplete?: () => void;
  isClosing?: boolean;
  item: {
    id: number;
    category: string;
    client: string;
    description: string;
    bgColor: string;
    textColor: string;
    borderColor?: string;
    logo: string;
    backgroundImage?: string;
  };
}

export function PortfolioModal({ isOpen, onClose, onAnimationComplete, isClosing, item }: PortfolioModalProps) {
  const { width } = useWindowSize();
  const isDesktop = width >= 1024; // lg breakpoint

  // Choose appropriate variants based on screen size
  const modalVariants = isDesktop ? desktopModalVariants : mobileModalVariants;
  const contentVariants = isDesktop ? desktopContentVariants : mobileContentVariants;
  const closeButtonVariants = isDesktop ? desktopCloseButtonVariants : mobileCloseButtonVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
          <motion.div
            className="bg-black/50 backdrop-blur-sm fixed inset-0"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="bg-[#FCFCF4] border border-[#DEDACF] rounded-[24px] w-full max-w-6xl h-[566px] overflow-hidden relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "exit" && onAnimationComplete && isClosing) {
                onAnimationComplete();
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Absolute Position */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#F5F5F5] hover:bg-[#E8E8E8] transition-colors flex items-center justify-center group cursor-pointer"
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <X className="w-5 h-5 text-[#666] group-hover:text-[#333] transition-colors" />
            </motion.button>

            <div className="flex flex-col h-full">
              {/* Mobile/Tablet - Full Width Content Only */}
              <div className="w-full lg:hidden p-6 overflow-y-auto flex-1">
                {/* Content */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    staggerChildren: 0.1
                  }}
                >
                  {/* Category */}
                  <motion.div className="mb-2">
                    <span className="text-[#1E1E1E] text-[14px] font-normal font-['Inter']">
                      {item.category}
                    </span>
                  </motion.div>

                  {/* Client Name */}
                  <motion.div className="mb-3">
                    <h1 className="text-[#1E1E1E] text-[18px] font-medium font-['Inter']">
                      {item.client}
                    </h1>
                  </motion.div>

                  {/* Description */}
                  <motion.div>
                    <p className="text-[#1E1E1E] text-[14px] font-normal font-['Inter'] leading-5">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Desktop - Side by Side Layout */}
              <div className="hidden lg:flex lg:flex-row lg:h-full w-full">
                {/* Left Side - Image */}
                <div className="lg:w-1/2 lg:h-full relative">
                  {item.backgroundImage ? (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${item.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full ${item.bgColor}`} />
                  )}
                </div>

                {/* Right Side - Content */}
                <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
                  {/* Content */}
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      staggerChildren: 0.1
                    }}
                  >
                    {/* Category */}
                    <motion.div className="mb-2">
                      <span className="text-[#1E1E1E] text-[14px] font-normal font-['Inter']">
                        {item.category}
                      </span>
                    </motion.div>

                    {/* Client Name */}
                    <motion.div className="mb-3">
                      <h1 className="text-[#1E1E1E] text-[18px] font-medium font-['Inter']">
                        {item.client}
                      </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.div>
                      <p className="text-[#1E1E1E] text-[14px] font-normal font-['Inter'] leading-5 w-[522px] max-w-full">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}