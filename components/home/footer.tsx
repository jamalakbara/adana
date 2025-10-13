"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Twitter, Instagram, Github, Mail, Phone, MessageCircle } from "lucide-react";
import { useSection } from "@/components/content/providers/ContentProvider";

export function Footer() {
  const { data: footerContent, isLoaded } = useSection("footer");

  // Social media icons mapping
  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    github: Github,
    facebook: ExternalLink,
    youtube: ExternalLink,
  };

  // Contact icons mapping
  const contactIcons = {
    email: Mail,
    phone: Phone,
    whatsapp: MessageCircle,
  };

  // Get CMS data or use fallback content
  const description = isLoaded && footerContent?.description
    ? footerContent.description
    : "Creating exceptional digital experiences that help businesses thrive in the modern world.";

  const newsletter = isLoaded && footerContent?.newsletter
    ? footerContent.newsletter
    : { title: "Stay Updated", description: "Subscribe to our newsletter for the latest updates and insights" };

  const address = isLoaded && footerContent?.address
    ? footerContent.address
    : {
        street: "Jl. Pasir Luyu Hilir No.33, Pasirluyu",
        city: "Kec. Regol, Kota Bandung",
        state: "Jawa Barat",
        postal_code: "40254",
        country: "Indonesia"
      };

  const contacts = isLoaded && footerContent?.contacts && footerContent.contacts.length > 0
    ? footerContent.contacts
    : [
        { type: "phone" as const, label: "Phone", value: "+62 812 3456 7890" },
        { type: "email" as const, label: "Email", value: "contact@adana.com" }
      ];

  const socialLinks = isLoaded && footerContent?.social_links
    ? footerContent.social_links.map(link => ({
        name: link.label,
        icon: socialIcons[link.platform as keyof typeof socialIcons] || ExternalLink,
        href: link.url
      }))
    : [
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "GitHub", icon: Github, href: "#" },
      ];

  const footerLinks = isLoaded && footerContent?.footer_links
    ? footerContent.footer_links
    : [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Cookie Policy", href: "/cookies" }
      ];

  const copyrightText = isLoaded && footerContent?.copyright_text
    ? footerContent.copyright_text
    : "© 2025 Adana Digital. All Right Reserved";

  // Format full address
  const fullAddress = [
    address.street,
    address.city,
    address.state,
    `${address.postal_code} ${address.country}`
  ].filter(Boolean).join(", ");

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
                  {description}
                </p>

                {/* Newsletter section */}
                <div className="mb-[24px]">
                  <h4 className="mb-[8px] font-['Public_Sans:Regular',_sans-serif] text-[16px] font-normal text-[#1e1e1e]">
                    {newsletter.title}
                  </h4>
                  <p className="mb-[16px] font-['Public_Sans:Regular',_sans-serif] text-[12px] leading-[16px] text-[#646464]">
                    {newsletter.description}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[24px]">
                {/* Footer links */}
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {footerLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="hover:text-[#334e4d] transition-colors"
                      >
                        {link.title}
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
                        {fullAddress}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                        Contact
                      </div>
                      <div className="space-y-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[24px] text-[#1e1e1e]">
                        {contacts.map((contact, index) => {
                          const Icon = contactIcons[contact.type];
                          const formatContactValue = (type: string, value: string) => {
                            if (type === 'email') {
                              return (
                                <a href={`mailto:${value}`} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                  {value}
                                </a>
                              );
                            } else if (type === 'phone') {
                              return (
                                <a href={`tel:${value.replace(/[^\d+]/g, '')}`} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                  {value}
                                </a>
                              );
                            } else if (type === 'whatsapp') {
                              return (
                                <a href={`https://wa.me/${value.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                  {value}
                                </a>
                              );
                            }
                            return value;
                          };

                          return (
                            <div key={index} className="flex items-center gap-2">
                              <span className="font-bold">{contact.label[0]}.</span>
                              <Icon className="h-3 w-3 mr-1" />
                              {formatContactValue(contact.type, contact.value)}
                            </div>
                          );
                        })}
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
                  {copyrightText}
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
                  {description}
                </p>

                {/* Newsletter section */}
                <div className="mb-6">
                  <h4 className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[18px] font-normal text-[#1e1e1e]">
                    {newsletter.title}
                  </h4>
                  <p className="mb-4 font-['Public_Sans:Regular',_sans-serif] text-[12px] leading-[16px] text-[#646464]">
                    {newsletter.description}
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
              </div>

              {/* Center - Links */}
              <div className="flex-1 flex justify-center gap-24">
                {/* Split footer links into two columns */}
                {footerLinks.length > 0 && (
                  <>
                    <div>
                      <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                        {footerLinks.slice(0, Math.ceil(footerLinks.length / 2)).map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className="hover:text-[#334e4d] transition-colors"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                        {footerLinks.slice(Math.ceil(footerLinks.length / 2)).map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            className="hover:text-[#334e4d] transition-colors"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right side - Contact */}
              <div className="w-[318px] pl-12">
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                      Address
                    </div>
                    <div className="font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#1e1e1e]">
                      {fullAddress}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                      Contact
                    </div>
                    <div className="space-y-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[24px] text-[#1e1e1e]">
                      {contacts.map((contact, index) => {
                        const Icon = contactIcons[contact.type];
                        const formatContactValue = (type: string, value: string) => {
                          if (type === 'email') {
                            return (
                              <a href={`mailto:${value}`} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                {value}
                              </a>
                            );
                          } else if (type === 'phone') {
                            return (
                              <a href={`tel:${value.replace(/[^\d+]/g, '')}`} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                {value}
                              </a>
                            );
                          } else if (type === 'whatsapp') {
                            return (
                              <a href={`https://wa.me/${value.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                                {value}
                              </a>
                            );
                          }
                          return value;
                        };

                        return (
                          <div key={index} className="flex items-center gap-2">
                            <span className="font-bold">{contact.label[0]}.</span>
                            <Icon className="h-3 w-3 mr-1" />
                            {formatContactValue(contact.type, contact.value)}
                          </div>
                        );
                      })}
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
                  {copyrightText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}