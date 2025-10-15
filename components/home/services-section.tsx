"use client";

import React, { useState, useEffect } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { ServiceExpansionItem } from "@/components/ui/service-expansion-item";
import { useSection } from "@/components/content/providers/ContentProvider";

export function ServicesSection() {
  const { data: servicesContent, isLoaded } = useSection("services");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Set initial expanded service when content is loaded
  useEffect(() => {
    if (isLoaded && servicesContent?.services && servicesContent.services.length > 0) {
      const firstServiceId = servicesContent.services[0].id || `service-0`;
      setExpandedService(firstServiceId);
    }
  }, [isLoaded, servicesContent]);

  // Default image for services
  const defaultServiceImage = "https://s3-alpha-sig.figma.com/img/a6ca/e0eb/c62f77205434383aa4fa6abda5c879d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bc1vW0nSVsqCzJp-aLwT-5LNxLKokqNHDauxBQua0CoW~gThFF2DU3KPBbqkFGS-S48GutO7~kmrfIbQT9WZjYUgYskNd4FKkFEPi0zAs8LozbY7HZfD4Z0OQnDgxvfjPB5lxuizflRNZ~NdRiMD6ijpSnyeKT5hliROJjLk9MhQHe7iuQ3L3So4x0X5VJGXvmzcS7UiV91L3gJ76CJ8kShFtOqlmfgQRrzTep71EmeqkqI2FwJ0auXCZW-iCECBleeAHv50oKFX9PPlvSXPntjWaT1S9j3FEXSFRKdQO7plHY8BIJ2kVVWduxIxvDyG2~JnnNf~OHOgnjpKkRZRjg__";

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:94" id="services">
      {/* Section header */}
      <div className="mb-[58px]">
        <Typography variant="section-label" nodeId="115:10796" className="mb-[12px]">
          {isLoaded && servicesContent?.subheading ? servicesContent.subheading : "Our Service"}
        </Typography>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <Typography variant="section-title" className="w-full max-w-full sm:max-w-[500px] md:max-w-[546px]" nodeId="115:10781">
              {isLoaded && servicesContent?.title ? servicesContent.title : (
                <>
                  What We Offer
                  <br />
                  Our Expertise, Your Advantage
                </>
              )}
            </Typography>
          </div>

        <Typography variant="section-description" className="w-full max-w-full sm:max-w-[400px] md:max-w-[432px] mt-4 sm:mt-0" nodeId="115:10871">
            {isLoaded && servicesContent?.description ? servicesContent.description : "Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non."}
          </Typography>
        </div>
      </div>

      {/* Service items using reusable component */}
      <div className="space-y-0">
    {(isLoaded && servicesContent?.services ? servicesContent.services : []).map((service, index) => {
          const serviceId = service.id || `service-${index}`;
          return (
            <ServiceExpansionItem
              key={serviceId}
              title={service.title}
              description={service.subtitle || "Service description"}
              imageUrl={service.image?.url || service.image?.supabase_url || defaultServiceImage}
              isExpanded={expandedService === serviceId}
              onToggle={() => {
                setExpandedService(expandedService === serviceId ? null : serviceId);
              }}
              nodeId={`service-${index}`}
              isFirst={index === 0}
              showCTA={!!service.cta_button}
              ctaText={service.cta_button?.text || "Let's Discuss"}
              ctaHref={service.cta_button?.href || "/contact"}
              isExternal={service.cta_button?.is_external || false}
              imagePosition="right"
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}