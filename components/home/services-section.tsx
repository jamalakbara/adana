"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { ServiceExpansionItem } from "@/components/ui/service-expansion-item";
import { servicesData } from "@/data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.2
    }
  }
};

const serviceItemVariants = {
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

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(servicesData[0]?.id || null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionContainer
      ref={ref}
      background="light"
      padding="xl"
      maxWidth="xl"
      nodeId="201:94"
      id="services"
    >
      {/* Section header */}
      <motion.div
        className="mb-[58px]"
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Typography variant="section-label" nodeId="115:10796" className="mb-[12px]">
          Our Service
        </Typography>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <Typography variant="section-title" className="w-full max-w-full sm:max-w-[500px] md:max-w-[546px]" nodeId="115:10781">
              What We Offer
              <br />
              Our Expertise, Your Advantage
            </Typography>
          </div>

          {/* Section description hidden */}
          {/* <Typography variant="section-description" className="w-full max-w-full sm:max-w-[400px] md:max-w-[432px] mt-4 sm:mt-0" nodeId="115:10871">
            Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.
          </Typography> */}
        </div>
      </motion.div>

      {/* Service items using reusable component */}
      <motion.div
        className="space-y-0"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          delay: 0.4,
          staggerChildren: 0.1
        }}
      >
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            variants={serviceItemVariants}
            transition={{
              delay: 0.4 + (index * 0.2)
            }}
          >
            <ServiceExpansionItem
              title={service.title}
              description={service.description}
              imageUrl={service.image}
              isExpanded={expandedService === service.id}
              onToggle={() => {
                setExpandedService(expandedService === service.id ? null : service.id);
              }}
              nodeId={service.nodeId}
              isFirst={index === 0}
              showCTA={true}
              ctaText="Let's Discuss"
              imagePosition="right"
              onCTAClick={() => window.open('https://wa.me/628112114142', '_blank', 'noopener,noreferrer')}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}