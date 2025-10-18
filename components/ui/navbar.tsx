"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdanaLogo } from "@/components/ui/adana-logo";
import { DiscussButton } from "@/components/ui/discuss-button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Our Services", href: "#services" },
  { name: "About Us", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Digital Partner", href: "#digital-partners" },
];

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

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
        isScrolled ? "fixed top-0 left-0 shadow-lg bg-[#fcfcf4]/95 backdrop-blur-sm" : "",
        className
      )}
    >
      <div className={cn(
        "h-full",
        isScrolled ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      )}>
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
                <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
                  <AdanaLogo className="absolute inset-0" />
                </div>
              </div>
            </div>
            <DiscussButton />
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block flex-shrink-0">
            <div className="h-[32px] sm:h-[36px] md:h-[39px] w-[90px] sm:w-[100px] md:w-[111px] relative">
              <AdanaLogo className="absolute inset-0" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      const navbarHeight = isScrolled ? 80 : 80; // Account for fixed navbar height
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - navbarHeight;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="relative text-[#1E1E1E] text-[14px] font-normal transition-all duration-300 hover:text-[#334e4d] hover:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#334e4d] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
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
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <DiscussButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#fcfcf4] border-t border-[#e5e5e5] shadow-lg">
            <div className="py-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-[#e5e5e5] last:border-b-0">
                  <a
                    href={item.href}
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
                    className="block w-full text-left text-[#1E1E1E] text-[14px] font-normal transition-all duration-300 hover:text-[#334e4d] hover:font-medium py-3 px-4 hover:bg-[#f1ff66]/10 cursor-pointer"
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