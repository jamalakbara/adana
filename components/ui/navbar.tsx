"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AdanaLogo } from "@/components/ui/adana-logo";
import { DiscussButton } from "@/components/ui/discuss-button";
import { cn } from "@/lib/utils";
import { useSection } from "@/components/content/providers/ContentProvider";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { data: navbarContent, isLoaded } = useSection("navbar");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "relative w-full h-[60px] sm:h-[70px] md:h-[80px] bg-[#fcfcf4] transition-all duration-300 z-50",
        isScrolled ? "fixed top-0 left-0 right-0 shadow-lg bg-[#fcfcf4]/95 backdrop-blur-sm" : "",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Mobile layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-[4px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#1e1e1e] hover:bg-[#f1ff66] hover:text-[#334e4d]"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
              <div className="flex-shrink-0">
                {isLoaded && navbarContent?.logo?.url ? (
                  <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative group cursor-pointer">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                      <img
                        src={navbarContent.logo.url}
                        alt={navbarContent.logo.alt_text || "Logo"}
                        className="absolute h-[97.44%] left-[1.13%] max-w-none top-[2.56%] w-[97.74%] transition-filter duration-300 group-hover:brightness-110 group-active:brightness-95 object-contain"
                      />
                    </div>
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#f1ff66]/20 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
                    <AdanaLogo className="absolute inset-0" />
                  </div>
                )}
              </div>
            </div>
            {isLoaded && navbarContent?.cta_button?.text && navbarContent?.cta_button?.href ? (
              <AnimatedButton
                variant="primary"
                hasArrow={true}
                arrowDirection="up-right"
                animationType="scale"
                size="md"
                onClick={() => window.open(navbarContent.cta_button.href, navbarContent.cta_button.is_external ? '_blank' : '_self')}
                className="px-4 py-2 text-[14px]"
              >
                {navbarContent.cta_button.text}
              </AnimatedButton>
            ) : (
              <DiscussButton />
            )}
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block flex-shrink-0">
            {isLoaded && navbarContent?.logo?.url ? (
              <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative group cursor-pointer">
                <div className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                  <img
                    src={navbarContent.logo.url}
                    alt={navbarContent.logo.alt_text || "Logo"}
                    className="absolute h-[97.44%] left-[1.13%] max-w-none top-[2.56%] w-[97.74%] transition-filter duration-300 group-hover:brightness-110 group-active:brightness-95 object-contain"
                  />
                </div>
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#f1ff66]/20 to-transparent pointer-events-none"></div>
              </div>
            ) : (
              <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
                <AdanaLogo className="absolute inset-0" />
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {isLoaded && navbarContent?.navigation_items?.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.is_external ? "_blank" : "_self"}
                  rel={item.is_external ? "noopener noreferrer" : undefined}
                  className="relative text-[#1E1E1E] text-[14px] font-normal transition-all duration-300 hover:text-[#334e4d] hover:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#334e4d] after:transition-all after:duration-300 hover:after:w-full"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Geist",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal"
                  }}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            {isLoaded && navbarContent?.cta_button?.text && navbarContent?.cta_button?.href ? (
              <AnimatedButton
                variant="primary"
                hasArrow={true}
                arrowDirection="up-right"
                animationType="scale"
                size="md"
                onClick={() => window.open(navbarContent.cta_button.href, navbarContent.cta_button.is_external ? '_blank' : '_self')}
                className="px-6 py-2 text-[14px]"
              >
                {navbarContent.cta_button.text}
              </AnimatedButton>
            ) : (
              <DiscussButton />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#fcfcf4] border-t border-[#e5e5e5] shadow-lg">
            <div className="py-6">
              {isLoaded && navbarContent?.navigation_items?.map((item, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <a
                    href={item.href}
                    target={item.is_external ? "_blank" : "_self"}
                    rel={item.is_external ? "noopener noreferrer" : undefined}
                    className="block w-full text-left text-[#1E1E1E] text-[14px] font-normal transition-all duration-300 hover:text-[#334e4d] hover:font-medium py-3 px-4 hover:bg-[#f1ff66]/10"
                    style={{
                      color: "#1E1E1E",
                      fontFamily: "Geist",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal"
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}