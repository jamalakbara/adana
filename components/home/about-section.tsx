"use client";

import React from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";

export function AboutSection() {
  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:95" id="about">
      <div className="flex flex-col lg:flex-row items-center gap-[40px] sm:gap-[60px] md:gap-[80px]">
        {/* Left side - Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[400px] sm:max-w-[546px] aspect-square rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden" data-node-id="115:10868">
            <Image
              src="/about-image.png"
              alt="About us"
              width={546}
              height={546}
              className="w-full h-full object-cover"
              data-node-id="115:10868"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-[16px]">
            <Typography variant="section-label" nodeId="115:10870" className="mb-[12px]">
              About Us
            </Typography>

            <Typography variant="section-title" style={{ width: "100%" }} nodeId="115:10869">
              Adana Digital
            </Typography>

            <Typography variant="section-description" style={{ width: "100%" }} className="mt-[50px] space-y-4" nodeId="115:10871">
              <p>
                Adana Digital focus to craft performance marketing strategy and digital media to achieve measurable impact in order to accelerate business growth.
              </p>
              <p>
                Recognizing that every company is unique, we aim to provide excellence strategies by taking a customized approach for each of our partners.
              </p>
            </Typography>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}