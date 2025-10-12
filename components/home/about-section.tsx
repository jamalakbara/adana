"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";
import { useSection } from "@/components/content/providers/ContentProvider";

export function AboutSection() {
  const { data: aboutContent, isLoaded } = useSection("about");
  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:95">
      <div className="flex flex-col lg:flex-row items-center gap-[40px] sm:gap-[60px] md:gap-[80px]">
        {/* Left side - Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[400px] sm:max-w-[546px] aspect-square rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden" data-node-id="115:10868">
            {isLoaded && aboutContent?.image ? (
              <img
                src={aboutContent.image.url || aboutContent.image.supabase_url}
                alt={aboutContent.image.alt_text || "About us"}
                className="w-full h-full object-cover"
                data-node-id="115:10868"
              />
            ) : (
              <img
                src="https://s3-alpha-sig.figma.com/img/0b7f/a533/ad5d553f5906987829b61e5ee1036cec?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U6tfDSJFgnrEGA1Rlf~jJWbsNXfx8k8dI~vU0kOM8kz8um9CCqV38SPOE2A8VEWj1FJ8nBuYPqVQKQz6m6PgPqTKnv~2f0g7Hd1uXLkhqiieVKbNi~EQRk6bNj7WqHCjjD~3YpvvoLSNTm-C7p~0pNZt0Ry4yeFKijiYBqgqLeoZl-YgwZRJvgIwwwj3S0zV7lbg4WhmLOgA7EHreREdUw3oUryUHX4n7te7BK9yUKOmnc2LNqp-61BzetspHR~qsdpbt0TXKb-1pEvqEiRkEq0ZbEEg~dGX6VPWdNcKOD5yWHU~ByisX7Mdy2SBLkT2C2ESESii4APFa3Td7~9Fjg__"
                alt="About us"
                className="w-full h-full object-cover"
                data-node-id="115:10868"
              />
            )}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-[16px]">
            <Typography variant="section-label" nodeId="115:10870" className="mb-[12px]">
              {isLoaded && aboutContent?.subheading ? aboutContent.subheading : "About Us"}
            </Typography>

            <Typography variant="section-title" style={{ width: "100%" }} nodeId="115:10869">
              {isLoaded && aboutContent?.title ? aboutContent.title : "Performance and Media Marketing Agency Which Aim to Help Industries"}
            </Typography>

            <Typography variant="section-description" style={{ width: "100%" }} className="mt-[50px] space-y-4" nodeId="115:10871">
              {isLoaded && aboutContent?.description ? (
                <div className="space-y-4">
                  {aboutContent.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. At molestie elit mauris scelerisque sed in. Nisl cursus tristique interdum donec. Euismod aenean non quis suspendisse. Mattis id aliquam purus nibh vel urna sed.
                  </p>
                  <p>
                    Aenean sed volutpat quam rutrum scelerisque turpis sit. Tristique nisl auctor sit pretium quisque sit neque consectetur gravida. Purus aliquet congue commodo nisi non bibendum diam duis turpis. Praesent nisl nulla ligula amet lobortis. Viverra sodales vel egestas leo pretium non ut. Consequat aliquet dignissim egestas fusce non ultrices dignissim ut purus. Eget semper ultrices a tellus.
                  </p>
                  <p>
                    Tristique nisl auctor sit pretium quisque sit neque consectetur gravida. Purus aliquet congue commodo nisi non bibendum diam duis turpis. Praesent nisl nulla ligula amet lobortis. Viverra sodales vel egestas leo pretium non ut.
                  </p>
                </div>
              )}
            </Typography>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}