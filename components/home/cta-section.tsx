"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion, useInView } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <SectionContainer
      background="custom"
      padding="xl"
      maxWidth="xl"
      nodeId="1-1179"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[120px]"
      ref={sectionRef}
    >
      <motion.div
        className="max-w-7xl mx-auto bg-[#F1FF66] rounded-[24px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Left side - Image */}
          <motion.div
            className="lg:w-1/3 flex justify-start"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[432/441] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden" data-node-id="115-10779">
              <Image
                src="/cta-image.png"
                alt="Digital transformation illustration"
                width={432}
                height={441}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="lg:w-2/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Typography
              variant="section-title"
              className="w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] mb-[16px]"
              style={{
                color: "#1E1E1E",
                letterSpacing: "-0.88px",
                fontWeight: "500"
              }}
            >
              Accelerate Your Digital Growth
            </Typography>

            <Typography
              variant="section-description"
              className="w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[660px] text-[12px] sm:text-[13px] md:text-[14px] mb-[24px]"
              style={{
                color: "#1E1E1E"
              }}
            >
              Transform your business with our expert digital marketing strategies and data-driven solutions. Our team combines cutting-edge technology with proven methodologies to deliver measurable results that drive sustainable growth. From performance marketing to comprehensive digital campaigns, we're committed to helping you achieve your business objectives with maximum ROI and lasting impact.
            </Typography>

            {/* Benefits */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 mb-[24px] justify-center lg:justify-start"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.8, staggerChildren: 0.2 }}
            >
              <motion.div variants={buttonVariants}>
                <AnimatedButton
                  variant="secondary"
                  hasArrow={true}
                  className="bg-[#1E1E1E]"
                  onClick={() => window.open('https://wa.me/628112114142', '_blank')}
                >
                  Free Consultation
                </AnimatedButton>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <AnimatedButton
                  variant="ghost"
                  hasArrow={true}
                  className="bg-transparent hover:bg-transparent"
                  onClick={() => window.open('https://wa.me/628112114142', '_blank')}
                >
                  Get 1 Month Free Service Charge
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}