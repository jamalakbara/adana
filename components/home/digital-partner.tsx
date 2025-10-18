"use client";

import React, { useState, useRef } from "react";
import { LazyImage } from "@/components/ui/lazy";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { partnersData } from "@/data";
import { motion, useInView } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const labelVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

interface PartnerTagProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

function PartnerTag({ label, isActive = false, onClick }: PartnerTagProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-[15px] rounded-[100px] border border-[#DEDACF] cursor-pointer relative ${
        isActive
          ? 'bg-[#334e4d] text-[#FCFCF4] font-medium shadow-md'
          : 'bg-[#FCFCF4] text-[#646464] font-normal hover:bg-[#f5f5ed] hover:shadow-sm hover:border-[#c8c4b3]'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <p className="font-['Public_Sans'] leading-[normal] text-[14px] sm:text-[16px] whitespace-nowrap relative z-10">{label}</p>
    </motion.button>
  );
}

interface PartnerCardProps {
  imageSrc: string;
  alt: string;
}

function PartnerCard({ imageSrc, alt }: PartnerCardProps) {
  return (
    <div
      className="bg-[#FCFCF4] h-[60px] sm:h-[70px] md:h-[90px] w-[120px] sm:w-[140px] md:w-[204px] rounded-lg flex items-center justify-center flex-shrink-0"
    >
      <LazyImage
        src={imageSrc}
        alt={alt}
        width={152}
        height={40}
        className="max-h-[30px] sm:max-h-[35px] md:max-h-[40px] max-w-[100px] sm:max-w-[120px] md:max-w-[152px] object-contain"
        skeletonVariant="avatar"
        rootMargin="100px"
      />
    </div>
  );
}

export function DigitalPartner() {
  const [activePartner, setActivePartner] = useState<string>("Social Partner");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentPartners = partnersData[activePartner as keyof typeof partnersData] || [];
  const isSmallList = currentPartners.length <= 3;

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="213-124" id="digital-partners" ref={ref}>
        {/* Section title */}
        <motion.div
          className="text-center mb-[12px]"
          variants={labelVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Typography
            variant="section-label"
            className="text-center"
            nodeId="115:10797"
          >
            Digital Partner
          </Typography>
        </motion.div>

        {/* Main headline */}
        <motion.div
          className="text-center mb-[32px] flex justify-center"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Typography
            variant="section-title"
            className="text-center w-full max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[888px]"
            nodeId="115:10782"
          >
            Your Trusted Digital Partner for
            <br />
            Your Digital Transformation
          </Typography>
        </motion.div>

        {/* Partner tags */}
        <motion.div
          className="mb-[50px] sm:relative"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute left-0 right-0 sm:relative sm:left-auto sm:right-auto">
            <div className="flex sm:flex-wrap sm:justify-center overflow-x-auto scrollbar-hide sm:overflow-visible p-4 sm:px-0"
                 style={{
                   scrollbarWidth: 'none',
                   msOverflowStyle: 'none',
                   maskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                 }}>
            {Object.keys(partnersData).map((partner) => (
              <motion.div
                key={partner}
                className="flex-shrink-0"
                variants={contentVariants}
              >
                <PartnerTag
                  label={partner}
                  isActive={activePartner === partner}
                  onClick={() => setActivePartner(partner)}
                />
              </motion.div>
            ))}
          </div>
          </div>
        </motion.div>

        {/* Partner cards grid */}
        <motion.div
          className="flex justify-center pt-[120px] sm:pt-0 sm:relative"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <div className={`absolute left-0 right-0 sm:relative sm:left-auto sm:right-auto ${isSmallList ? 'flex justify-center' : ''}`}>
            <div className={`flex ${isSmallList ? 'justify-center' : 'sm:flex-wrap sm:justify-center'} gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide sm:overflow-visible px-4 sm:px-0`}
                 style={{
                   scrollbarWidth: 'none',
                   msOverflowStyle: 'none',
                   maskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                 }}>
              {currentPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.src}-${partner.alt}-${activePartner}`}
                  variants={contentVariants}
                  initial={isInView ? "hidden" : false}
                  animate={isInView ? "visible" : false}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] as const
                  }}
                >
                  <PartnerCard
                    imageSrc={partner.src}
                    alt={partner.alt}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </SectionContainer>
  );
}