"use client";

import React from "react";
import { LazyImage } from "@/components/ui/lazy";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.4
    }
  }
};

const labelVariants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", scale: 0.98 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionContainer
      ref={ref}
      background="light"
      padding="xl"
      maxWidth="xl"
      nodeId="201:95"
      id="about"
    >
      <div className="flex flex-col lg:flex-row items-center gap-[40px] sm:gap-[60px] md:gap-[80px]">
        {/* Left side - Image */}
        <div className="flex-1 flex justify-center">
          <motion.div
            className="relative w-full max-w-[400px] sm:max-w-[546px] aspect-square rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden"
            data-node-id="115:10868"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <LazyImage
              src="/about-image.png"
              alt="About us"
              width={546}
              height={546}
              className="w-full h-full object-cover"
              data-node-id="115:10868"
              skeletonVariant="card"
              priority={true}
            />
          </motion.div>
        </div>

        {/* Right side - Content */}
        <motion.div
          className="flex-1 flex flex-col justify-between"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-[16px]">
            <motion.div
              variants={labelVariants}
              transition={{ delay: 0.6 }}
            >
              <Typography variant="section-label" nodeId="115:10870" className="mb-[12px]">
                About Us
              </Typography>
            </motion.div>

            <motion.div
              variants={titleVariants}
              transition={{ delay: 0.8 }}
            >
              <Typography variant="section-title" style={{ width: "100%" }} nodeId="115:10869">
                Adana Digital
              </Typography>
            </motion.div>

            <motion.div
              variants={descriptionVariants}
              transition={{ delay: 1.0 }}
              className="mt-[24px] sm:mt-[50px]"
            >
              <Typography variant="section-description" style={{ width: "100%" }} className="space-y-4" nodeId="115:10871">
                <p>
                  Adana Digital focus to craft performance marketing strategy and digital media to achieve measurable impact in order to accelerate business growth.
                </p>
                <p>
                  Recognizing that every company is unique, we aim to provide excellence strategies by taking a customized approach for each of our partners.
                </p>
              </Typography>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}