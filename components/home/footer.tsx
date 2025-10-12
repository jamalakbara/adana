"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { useSection } from "@/components/content/providers/ContentProvider";

export function Footer() {
  const { data: footerContent, isLoaded } = useSection("footer");

  // Social media icons mapping
  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    github: Github,
  };

  // Fallback data
  const socialLinks = isLoaded && footerContent?.social_links
    ? footerContent.social_links.map(link => ({
        name: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
        icon: socialIcons[link.platform as keyof typeof socialIcons] || ExternalLink,
        href: link.url
      }))
    : [
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "GitHub", icon: Github, href: "#" },
      ];

  const footerLinks = {
    services: (isLoaded && footerContent?.navigation_sections?.[0]?.links?.map(link => link.title)) || ["Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing"],
    legal: (isLoaded && footerContent?.navigation_sections?.[1]?.links?.map(link => link.title)) || ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  // Ensure services and legal are always arrays
  const servicesLinks = Array.isArray(footerLinks.services) ? footerLinks.services : ["Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing"];
  const legalLinks = Array.isArray(footerLinks.legal) ? footerLinks.legal : ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-[#fcfcf4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 px-4">
          {/* Mobile layout - stacked */}
          <div className="lg:hidden">
            <div className="max-w-md mx-auto">
              {/* Company description */}
              <div className="mb-[50px]">
                <h3 className="mb-[12px] font-['Public_Sans:Regular',_sans-serif] text-[24px] font-normal text-[#1e1e1e]">
                  About Us
                </h3>
                <p className="mb-[32px] font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#646464]">
                  {isLoaded && footerContent?.description
                    ? footerContent.description
                    : "Creating exceptional digital experiences that help businesses thrive in the modern world."}
                </p>
                <div className="relative h-12">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="absolute left-0 top-0 w-full h-12 rounded-none border-0 border-b border-[#dedacf] bg-[#fcfcf4] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1] placeholder-[#b1b1b1] focus:outline-none focus:ring-0 pt-[15px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-[13px] h-6 w-6 text-[#1e1e1e] hover:bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 rotate-45" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[24px]">
                {/* Services links */}
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {servicesLinks.map((link, index) => (
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
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {legalLinks.map((link, index) => (
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
                <div>
                  <div className="space-y-[24px]">
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

              {/* Mobile Social links */}
              <div className="flex items-center gap-[12px] mb-[42px]">
                <span className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                  Follow Us
                </span>
                <div className="flex gap-[2px]">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#fcfcf4] border border-[#dedacf] transition-all hover:bg-[#f1ff66]"
                      aria-label={social.name}
                    >
                      {typeof social.icon === 'string' ? (
                        <div className="h-4 w-4 bg-[#1e1e1e]/50 rounded" />
                      ) : (
                        <social.icon className="h-4 w-4 text-[#1e1e1e]" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Copyright */}
              <div className="text-left">
                <p className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[rgba(30,30,30,0.5)]">
                  © 2025 Adana Digital. All Right Reserved
                </p>
              </div>
            </div>
          </div>

          {/* Desktop layout - horizontal */}
          <div className="hidden lg:block">
            <div className="flex">
              {/* Left side - Company description */}
              <div className="w-[432px] pr-12">
                <h3 className="mb-4 font-['Public_Sans:Regular',_sans-serif] text-[32px] font-normal text-[#1e1e1e]">
                  About Us
                </h3>
                <p className="mb-6 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#646464]">
                  {isLoaded && footerContent?.description
                    ? footerContent.description
                    : "Creating exceptional digital experiences that help businesses thrive in the modern world."}
                </p>
                <div className="relative h-12 w-[432px]">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="absolute left-0 top-0 w-[432px] h-12 rounded-none border-0 border-b border-[#dedacf] bg-[#fcfcf4] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1] placeholder-[#b1b1b1] focus:outline-none focus:ring-0 pt-[15px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-[13px] h-6 w-6 text-[#1e1e1e] hover:bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 rotate-45" />
                  </Button>
                </div>
              </div>

              {/* Center - Links */}
              <div className="flex-1 flex justify-center gap-24">
                {/* Services links */}
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {servicesLinks.map((link, index) => (
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
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {legalLinks.map((link, index) => (
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
              </div>

              {/* Right side - Contact */}
              <div className="w-[318px] pl-12">
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
          </div>

          {/* Desktop Social links and Copyright */}
          <div className="hidden lg:block mt-16">
            <div className="flex items-center justify-between">
              {/* Social links */}
              <div className="flex items-center gap-3">
                <span className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                  Follow Us
                </span>
                <div className="flex gap-[2px]">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#fcfcf4] border border-[#dedacf] transition-all hover:bg-[#f1ff66]"
                      aria-label={social.name}
                    >
                      {typeof social.icon === 'string' ? (
                        <div className="h-4 w-4 bg-[#1e1e1e]/50 rounded" />
                      ) : (
                        <social.icon className="h-4 w-4 text-[#1e1e1e]" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div>
                <p className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[rgba(30,30,30,0.5)]">
                  {isLoaded && footerContent?.copyright_text
                    ? footerContent.copyright_text
                    : "© 2024 Your Company. All rights reserved."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}