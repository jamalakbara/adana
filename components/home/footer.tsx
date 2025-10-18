"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { socialLinks, footerLinks, contactInfo, companyInfo } from "@/data";
import { motion, useInView } from "framer-motion";

// Form validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const staggeredContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export function Footer() {
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  // Form submission handler
  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        reset(); // Clear the form
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-[#fcfcf4]" ref={footerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-16 px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mobile layout - stacked */}
          <div className="lg:hidden">
            <div className="max-w-md mx-auto">
              {/* Newsletter section */}
              <motion.div
                className="mb-[50px]"
                variants={sectionVariants}
                transition={{ delay: 0.1 }}
              >
                <h3 className="mb-[12px] font-['Public_Sans:Regular',_sans-serif] text-[24px] font-normal text-[#1e1e1e]">
                  Stay update with us
                </h3>
                <p className="mb-[32px] font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#646464]">
                  Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="relative h-12">
                    <input
                      type="email"
                      placeholder="Email address"
                      {...register('email')}
                      disabled={isSubmitting}
                      className={`absolute left-0 top-0 w-full h-12 rounded-none border-0 border-b ${
                        errors.email
                          ? 'border-red-500'
                          : 'border-[#dedacf] focus:border-[#334e4d]'
                      } bg-[#fcfcf4] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e] placeholder-[#b1b1b1] focus:outline-none focus:ring-0 pt-[15px] disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      disabled={isSubmitting}
                      className="absolute right-0 top-[13px] h-6 w-6 text-[#1e1e1e] hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1e1e1e] border-t-transparent" />
                      ) : (
                        <ExternalLink className="h-4 w-4 rotate-45" />
                      )}
                    </Button>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                  {submitStatus !== 'idle' && (
                    <div className={`text-sm ${
                      submitStatus === 'success' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[24px]"
                variants={sectionVariants}
                transition={{ delay: 0.2 }}
              >
                {/* Services links */}
                <div>
                  <div className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                    {footerLinks.services.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="hover:text-[#334e4d] transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Legal links */}
                {/* <div>
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
                </div> */}

                {/* Contact info */}
                <div>
                  <div className="space-y-[24px]">
                    <div>
                      <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                        Address
                      </div>
                      <div className="font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#1e1e1e]">
                        {contactInfo.address}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                        Contact
                      </div>
                      <div className="space-y-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[24px] text-[#1e1e1e]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">P.</span>
                          <a href={contactInfo.phoneUrl} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                            {contactInfo.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">E.</span>
                          <a href={contactInfo.emailUrl} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                            contact@adana.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Social links */}
              <motion.div
                className="flex items-center gap-[12px] mb-[42px]"
                variants={sectionVariants}
                transition={{ delay: 0.3 }}
              >
                <span className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                  Follow Us
                </span>
                <motion.div
                  className="flex gap-[2px]"
                  variants={staggeredContainerVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1CEC4] border border-[#dedacf] transition-all hover:bg-[#334E4D]"
                      aria-label={social.name}
                      variants={socialIconVariants}
                    >
                      {typeof social.icon === 'string' ? (
                        <img
                          src={social.icon}
                          alt={social.name}
                          className="h-4 w-4 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            filter: 'grayscale(1) brightness(0) invert(1)'
                          }}
                        />
                      ) : (
                        <social.icon className="h-4 w-4 text-[#1e1e1e]" />
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Mobile Copyright */}
              <motion.div
                className="text-left"
                variants={sectionVariants}
                transition={{ delay: 0.4 }}
              >
                <p className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[rgba(30,30,30,0.5)]">
                  {companyInfo.copyright}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Desktop layout - horizontal */}
          <motion.div
            className="hidden lg:block"
            variants={staggeredContainerVariants}
          >
            <div className="flex">
              {/* Left side - Newsletter */}
              <motion.div
                className="w-[432px] pr-12"
                variants={sectionVariants}
              >
                <h3 className="mb-4 font-['Public_Sans:Regular',_sans-serif] text-[32px] font-normal text-[#1e1e1e]">
                  Stay update with us
                </h3>
                <p className="mb-6 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#646464]">
                  Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="relative h-12 w-[432px]">
                    <input
                      type="email"
                      placeholder="Email address"
                      {...register('email')}
                      disabled={isSubmitting}
                      className={`absolute left-0 top-0 w-[432px] h-12 rounded-none border-0 border-b ${
                        errors.email
                          ? 'border-red-500'
                          : 'border-[#dedacf] focus:border-[#334e4d]'
                      } bg-[#fcfcf4] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e] placeholder-[#b1b1b1] focus:outline-none focus:ring-0 pt-[15px] disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      disabled={isSubmitting}
                      className="absolute right-0 top-[13px] h-6 w-6 text-[#1e1e1e] hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1e1e1e] border-t-transparent" />
                      ) : (
                        <ExternalLink className="h-4 w-4 rotate-45" />
                      )}
                    </Button>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                  {submitStatus !== 'idle' && (
                    <div className={`text-sm ${
                      submitStatus === 'success' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </motion.div>

              {/* Center - Links */}
              <motion.div
                className="flex-1 flex justify-center gap-24"
                variants={sectionVariants}
              >
                {/* Services links */}
                <div>
                  <motion.div
                    className="flex flex-col gap-[18px] font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]"
                    variants={staggeredContainerVariants}
                  >
                    {footerLinks.services.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        className="hover:text-[#334e4d] transition-colors"
                        variants={sectionVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                {/* Legal links */}
                {/* <div>
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
                </div> */}
              </motion.div>

              {/* Right side - Contact */}
              <motion.div
                className="w-[318px] pl-12"
                variants={sectionVariants}
              >
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                      Address
                    </div>
                    <div className="font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[20px] text-[#1e1e1e]">
                      {contactInfo.address}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#b1b1b1]">
                      Contact
                    </div>
                    <div className="space-y-2 font-['Public_Sans:Regular',_sans-serif] text-[14px] leading-[24px] text-[#1e1e1e]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">P.</span>
                        <a href={contactInfo.phoneUrl} className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">E.</span>
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="underline decoration-solid underline-offset-auto hover:text-[#334e4d] transition-colors">
                          contact@adana.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Social links and Copyright */}
          <motion.div
            className="hidden lg:block mt-16"
            variants={sectionVariants}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              {/* Social links */}
              <div className="flex items-center gap-3">
                <span className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[#1e1e1e]">
                  Follow Us
                </span>
                <motion.div
                  className="flex gap-[2px]"
                  variants={staggeredContainerVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1CEC4] border border-[#dedacf] transition-all hover:bg-[#334E4D]"
                      aria-label={social.name}
                      variants={socialIconVariants}
                    >
                      {typeof social.icon === 'string' ? (
                        <img
                          src={social.icon}
                          alt={social.name}
                          className="h-4 w-4 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            filter: 'grayscale(1) brightness(0) invert(1)'
                          }}
                        />
                      ) : (
                        <social.icon className="h-4 w-4 text-[#1e1e1e]" />
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Copyright */}
              <div>
                <p className="font-['Public_Sans:Regular',_sans-serif] text-[14px] text-[rgba(30,30,30,0.5)]">
                  {companyInfo.copyright}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}