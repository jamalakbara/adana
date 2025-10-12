"use client";

import { SectionEditor } from "@/components/admin/editor/SectionEditor";
import type { SectionType } from "@/lib/cms/validation";
import { use } from "react";
import { sectionConfigs } from "@/lib/cms/section-configs";
import { SECTION_TYPES } from "@/lib/db/schema";

// Section titles and descriptions for UI
const SECTION_INFO = {
  navbar: {
    title: "Navbar",
    description: "Configure your website navigation bar, logo, and call-to-action button",
  },
  hero: {
    title: "Hero Section",
    description: "Customize your landing page hero section with headline, content, and buttons",
  },
  about: {
    title: "About Section",
    description: "Tell your story and introduce your company",
  },
  services: {
    title: "Services Section",
    description: "Showcase your services and offerings",
  },
  portfolio: {
    title: "Portfolio Section",
    description: "Display your best work and projects",
  },
  "marquee-clients": {
    title: "Client Marquee",
    description: "Display your client logos in a scrolling marquee",
  },
  "digital-partners": {
    title: "Digital Partners",
    description: "Feature your technology and service partners",
  },
  cta: {
    title: "Call-to-Action Section",
    description: "Encourage visitors to take action",
  },
  footer: {
    title: "Footer",
    description: "Configure your website footer with links and information",
  },
};

interface SectionPageClientProps {
  paramsPromise: Promise<{ section: string }>;
}

export function SectionPageClient({ paramsPromise }: SectionPageClientProps) {
  const params = use(paramsPromise);
  const section = params.section as SectionType;

  // Add legacy section mappings for backwards compatibility
  const SECTION_INFO_LEGACY = {
    ...SECTION_INFO,
    marquee_clients: SECTION_INFO["marquee-clients"],
    digital_partners: SECTION_INFO["digital-partners"],
  };

  // Handle section type mapping (URL format to database format)
  const sectionTypeMapping: Record<string, string> = {
    'marquee-clients': 'marquee_clients',
    'digital-partners': 'digital_partners',
  };

  // Convert URL section format to database format for validation
  const dbSectionFormat = sectionTypeMapping[section] || section;

  // Validate that the section exists (check against database section types)
  if (!section || !(SECTION_TYPES.includes(dbSectionFormat as typeof SECTION_TYPES[number]))) {
    throw new Error(`Section "${section}" not found`);
  }

  // Handle section key mapping for configurations
  const sectionKey = dbSectionFormat as keyof typeof sectionConfigs;

  const config = SECTION_INFO_LEGACY[section];
  const fields = sectionConfigs[sectionKey];

  return (
    <SectionEditor
      sectionType={dbSectionFormat}
      title={config.title}
      description={config.description}
      fields={fields}
    />
  );
}