"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdanaLogo } from "@/components/ui/adana-logo";
import { DiscussButton } from "@/components/ui/discuss-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { name: "Our Services", href: "#services" },
  { name: "About Us", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Digital Partner", href: "#digital-partners" },
];

// Animation variants

const navLinkVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  hover: {
    scale: 1.05,
    color: "#334e4d",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const menuButtonVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 }
};

const logoVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.2
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.nav
      className={cn(
        "sticky top-0 w-full h-[60px] sm:h-[70px] md:h-[80px] z-50 bg-[#fcfcf4]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Mobile layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-[4px]">
              <motion.div
                variants={menuButtonVariants}
                animate={isMenuOpen ? "open" : "closed"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#1e1e1e] hover:bg-[#f1ff66] hover:text-[#334e4d]"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex-shrink-0 cursor-pointer"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
                  <AdanaLogo className="absolute inset-0" />
                </div>
              </motion.div>
            </div>
            <DiscussButton />
          </div>

          {/* Desktop Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="hidden md:block flex-shrink-0 cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          >
            <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
              <AdanaLogo className="absolute inset-0" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={navLinkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      const navbarHeight = 80; // Account for sticky navbar height
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - navbarHeight;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="relative text-[#1E1E1E] text-[14px] font-normal cursor-pointer"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Geist",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal"
                  }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#334e4d]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <DiscussButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 bg-[#fcfcf4] border-t border-[#e5e5e5] shadow-lg overflow-hidden"
            >
              <div className="py-6">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    className="border-b border-[#e5e5e5] last:border-b-0"
                  >
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 10, color: "#334e4d" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          const navbarHeight = 80; // Account for fixed navbar height
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - navbarHeight;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                          setIsMenuOpen(false);
                        }
                      }}
                      className="block w-full text-left text-[#1E1E1E] text-[14px] font-normal py-3 px-4 cursor-pointer"
                      style={{
                        color: "#1E1E1E",
                        fontFamily: "Geist",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                      }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    >
                      {item.name}
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}