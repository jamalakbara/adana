"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { ServiceExpansionItem } from "@/components/ui/service-expansion-item";
import { servicesData } from "@/data";

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(servicesData[0]?.id || null);

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:94" id="services">
      {/* Section header */}
      <div className="mb-[58px]">
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
      </div>

      {/* Service items using reusable component */}
      <div className="space-y-0">
        {servicesData.map((service, index) => (
          <ServiceExpansionItem
            key={service.id}
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
          />
        ))}
      </div>
    </SectionContainer>
  );
}