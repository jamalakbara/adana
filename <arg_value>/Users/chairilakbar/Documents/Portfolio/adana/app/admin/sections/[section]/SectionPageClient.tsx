"use client";

import { SectionEditor } from "@/components/admin/editor/SectionEditor";
import type { SectionType } from "@/lib/cms/validation";
import { use } from "react";

// Section configurations (copied from main page)
const SECTION_CONFIGS = {
  navbar: {
    title: "Navbar",
    description: "Configure your website navigation bar, logo, and call-to-action button",
    fields: [
      {
        name: "logo",
        label: "Logo",
        type: "media" as const,
        helperText: "Upload your company logo",
      },
      {
        name: "navigation_items",
        label: "Navigation Items",
        type: "array" as const,
        required: true,
        helperText: "Add navigation menu items",
      },
      {
        name: "cta_button",
        label: "CTA Button",
        type: "object" as const,
        helperText: "Configure the main call-to-action button",
      },
    ],
  },
  hero: {
    title: "Hero Section",
    description: "Customize your landing page hero section with headline, content, and buttons",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "Enter your main headline",
      },
      {
        name: "subheadline",
        label: "Subheadline",
        type: "textarea" as const,
        required: true,
        placeholder: "Enter your subheadline",
      },
      {
        name: "background_image",
        label: "Background Image",
        type: "media" as const,
        helperText: "Upload a background image for the hero section",
      },
      {
        name: "cta_buttons",
        label: "CTA Buttons",
        type: "array" as const,
        helperText: "Add call-to-action buttons",
      },
    ],
  },
  marquee_clients: {
    title: "Client Marquee",
    description: "Display your client logos in a scrolling marquee",
    fields: [
      {
        name: "clients",
        label: "Clients",
        type: "array" as const,
        required: true,
        helperText: "Add client logos and information",
      },
      {
        name: "auto_scroll",
        label: "Auto Scroll",
        type: "boolean" as const,
        helperText: "Enable automatic scrolling",
      },
    ],
  },
  about: {
    title: "About Section",
    description: "Tell your story and introduce your company",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "About us headline",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea" as const,
        required: true,
        placeholder: "Tell your story...",
      },
      {
        name: "features",
        label: "Key Features",
        type: "array" as const,
        helperText: "Highlight your key features",
      },
    ],
  },
  services: {
    title: "Services Section",
    description: "Showcase your services and offerings",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "Our Services",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea" as const,
        placeholder: "Describe your services...",
      },
      {
        name: "services",
        label: "Services List",
        type: "array" as const,
        required: true,
        helperText: "Add your services",
      },
    ],
  },
  portfolio: {
    title: "Portfolio Section",
    description: "Display your best work and projects",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "Our Portfolio",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea" as const,
        placeholder: "Showcase your best work...",
      },
      {
        name: "projects",
        label: "Projects",
        type: "array" as const,
        required: true,
        helperText: "Add portfolio projects",
      },
    ],
  },
  digital_partners: {
    title: "Digital Partners",
    description: "Feature your technology and service partners",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "Our Partners",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea" as const,
        placeholder: "Trusted partners...",
      },
      {
        name: "partners",
        label: "Partners",
        type: "array" as const,
        required: true,
        helperText: "Add partner information",
      },
    ],
  },
  cta: {
    title: "Call-to-Action Section",
    description: "Encourage visitors to take action",
    fields: [
      {
        name: "headline",
        label: "Headline",
        type: "text" as const,
        required: true,
        placeholder: "Get Started Today",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea" as const,
        placeholder: "Ready to begin your journey...",
      },
      {
        name: "primary_button",
        label: "Primary Button",
        type: "object" as const,
        required: true,
      },
      {
        name: "secondary_button",
        label: "Secondary Button",
        type: "object" as const,
      },
    ],
  },
  footer: {
    title: "Footer",
    description: "Configure your website footer with links and information",
    fields: [
      {
        name: "company_info",
        label: "Company Information",
        type: "object" as const,
        required: true,
      },
      {
        name: "navigation_sections",
        label: "Navigation Sections",
        type: "array" as const,
        required: true,
        helperText: "Add footer navigation sections",
      },
      {
        name: "social_links",
        label: "Social Media Links",
        type: "array" as const,
        helperText: "Add social media profiles",
      },
      {
        name: "copyright_text",
        label: "Copyright Text",
        type: "text" as const,
        required: true,
        placeholder: "© 2025 Your Company. All rights reserved.",
      },
    ],
  },
} as const;

interface SectionPageClientProps {
  paramsPromise: Promise<{ section: string }>;
}

export function SectionPageClient({ paramsPromise }: SectionPageClientProps) {
  const params = use(paramsPromise);
  const section = params.section as SectionType;

  // Validate that the section exists
  if (!section || !(section in SECTION_CONFIGS)) {
    throw new Error(`Section "${section}" not found`);
  }

  const config = SECTION_CONFIGS[section];

  return (
    <SectionEditor
      sectionType={section}
      title={config.title}
      description={config.description}
      fields={config.fields}
    />
  );
}