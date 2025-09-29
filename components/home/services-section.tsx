"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { ServiceExpansionItem } from "@/components/ui/service-expansion-item";
import { servicesData } from "./services-data";

export function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(servicesData[0]?.id || null);

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:94">
      {/* Section header */}
      <div className="mb-[40px] sm:mb-[60px] md:mb-[80px]">
        <Typography variant="section-label" nodeId="115:10796" className="mb-[16px]">
          Our Service
        </Typography>

        <div className="flex justify-between items-end">
          <div>
            <Typography variant="section-title" className="w-full max-w-full sm:max-w-[500px] md:max-w-[546px]" nodeId="115:10781">
              What We Offer
              <br />
              Our Expertise, Your Advantage
            </Typography>
          </div>

          <Typography variant="section-description" className="w-full max-w-full sm:max-w-[400px] md:max-w-[432px]" nodeId="115:10871">
            Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.
          </Typography>
        </div>
      </div>

      {/* Service items using reusable component */}
      <div className="space-y-0">
        {servicesData.map((service, index) => (
          <ServiceExpansionItem
            key={service.id}
            title={service.title}
            description={service.description}
            imageUrl="https://s3-alpha-sig.figma.com/img/a6ca/e0eb/c62f77205434383aa4fa6abda5c879d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bc1vW0nSVsqCzJp-aLwT-5LNxLKokqNHDauxBQua0CoW~gThFF2DU3KPBbqkFGS-S48GutO7~kmrfIbQT9WZjYUgYskNd4FKkFEPi0zAs8LozbY7HZfD4Z0OQnDgxvfjPB5lxuizflRNZ~NdRiMD6ijpSnyeKT5hliROJjLk9MhQHe7iuQ3L3So4x0X5VJGXvmzcS7UiV91L3gJ76CJ8kShFtOqlmfgQRrzTep71EmeqkqI2FwJ0auXCZW-iCECBleeAHv50oKFX9PPlvSXPntjWaT1S9j3FEXSFRKdQO7plHY8BIJ2kVVWduxIxvDyG2~JnnNf~OHOgnjpKkRZRjg__"
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