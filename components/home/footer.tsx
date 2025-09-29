"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Phone } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "LinkedIn", icon: "/placeholder-linkedin.svg" },
    { name: "TikTok", icon: "/placeholder-tiktok.svg" },
    { name: "Twitter", icon: "/placeholder-twitter.svg" },
    { name: "Instagram", icon: "/placeholder-instagram.svg" }
  ];

  const footerLinks = {
    services: ["Our Services", "About Us", "Portfolio", "Digital Partner"],
    legal: ["Privacy Policy", "Terms of Service"]
  };

  return (
    <footer className="bg-[#fcfcf4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Newsletter section */}
            <div className="lg:col-span-1">
              <h3 className="mb-4 font-['Public_Sans:Regular',_sans-serif] text-[32px] font-normal text-[#1e1e1e]">
                Stay update with us
              </h3>
              <p className="mb-6 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#646464]">
                Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis.
                Pellentesque quis aliquet auctor
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-none border-0 border-b border-[#dedacf] bg-[#fcfcf4] pb-3 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1] placeholder-[#b1b1b1] focus:outline-none focus:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 text-[#1e1e1e] hover:bg-transparent"
                >
                  <ExternalLink className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            </div>

            {/* Services links */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                {footerLinks.services.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-[#334e4d] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal links */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-[#334e4d] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                    Address
                  </div>
                  <div className="font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#1e1e1e]">
                    Jl. Pasir Luyu Hilir No.33, Pasirluyu, Kec. Regol, Kota Bandung, Jawa Barat 40254
                  </div>
                </div>
                <div>
                  <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                    Contact
                  </div>
                  <div className="space-y-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[24px] text-[#1e1e1e]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">P.</span>
                      <a href="tel:+6281234567890" className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                        +62 812 3456 7890
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">E.</span>
                      <a href="mailto:contact@adana.com" className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                        contact@adana.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-12 flex items-center gap-4">
            <span className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
              Follow Us
            </span>
            <div className="flex gap-[38px]">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#fcfcf4] border border-[#dedacf] transition-all hover:bg-[#f1ff66]"
                >
                  <div className="h-4 w-4 bg-[#1e1e1e]/50 rounded" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#dedacf] py-8">
          <div className="text-right">
            <p className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[rgba(30,30,30,0.5)]">
              © 2025 Adana Digital. All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}