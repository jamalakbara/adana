import { z } from "zod";
import type { Json } from "@/types/database";

// Base schemas
const MediaAssetSchema = z.object({
  media_id: z.string().uuid("Invalid media ID").optional(),
  alt_text: z.string().min(1, "Alt text is required").max(500, "Alt text too long"),
  url: z.string().url("Invalid URL"),
  width: z.number().positive("Width must be positive").optional(),
  height: z.number().positive("Height must be positive").optional(),
});

const CTAButtonSchema = z.object({
  text: z.string().min(1, "Button text is required").max(100, "Button text too long"),
  href: z.string().max(500, "Button URL too long").optional(),
  variant: z.enum(["primary", "secondary", "outline"]).default("primary"),
  is_external: z.boolean().default(false),
}).transform((data) => {
  // Ensure href has a default value
  return {
    text: data.text,
    href: data.href || '/contact',
    variant: data.variant,
    is_external: data.is_external,
  };
});

const NavigationItemSchema = z.object({
  text: z.string().min(1, "Navigation text is required").max(50, "Text too long").optional(),
  href: z.string().min(1, "Navigation URL is required").optional(),
  is_external: z.boolean().optional(),
}).transform((data) => {
  // Transform to ensure required fields have defaults
  return {
    text: data.text || 'New Item',
    href: data.href || '/',
    is_external: data.is_external ?? false,
  };
}).refine((data) => {
  // Final validation to ensure we have valid data
  return typeof data.text === 'string' &&
         typeof data.href === 'string' &&
         typeof data.is_external === 'boolean';
}, {
  message: "Navigation item must have valid text, href, and is_external fields",
});

// Content section schemas

export const NavbarContentSchema = z.object({
  logo: MediaAssetSchema.optional(),
  navigation_items: z.array(z.any()).max(10, "Too many navigation items").transform((items) => {
    // Clean each navigation item to ensure it has all required fields
    const cleanedItems = items.map((item, index) => {
      // If item is undefined or null, provide a default navigation item
      if (!item || typeof item !== 'object') {
        return { text: 'New Item', href: '/', is_external: false };
      }
      return item;
    });
    return cleanedItems;
  }).pipe(z.array(NavigationItemSchema)),
  cta_button: CTAButtonSchema.optional(),
});

export const HeroContentSchema = z.object({
  headline: z.string().min(1, "Headline is required").max(200, "Headline too long"),
  subheadline: z.string().min(1, "Subheadline is required").max(500, "Subheadline too long"),
  background_image: MediaAssetSchema.optional(),
  cta_button: CTAButtonSchema.optional(),
}).transform((data): z.infer<typeof HeroContentSchema> => {
  // Migrate legacy data format
  const transformed = { ...data } as z.infer<typeof HeroContentSchema> & {
    cta_buttons?: unknown[];
    primary_cta?: unknown;
    secondary_cta?: unknown;
  };

  // Handle legacy background_image URL format
  if (typeof data.background_image === 'string' && data.background_image) {
    transformed.background_image = {
      media_id: null,
      alt_text: "Hero background",
      url: data.background_image,
      width: 1920,
      height: 1080,
    };
  }

  // Handle legacy cta_buttons array format
  if ('cta_buttons' in data && Array.isArray(data.cta_buttons)) {
    const legacyButtons = data.cta_buttons as Array<{
      text?: string;
      href?: string;
      is_external?: boolean;
    }>;
    if (legacyButtons.length > 0) {
      // Use the first button as the primary CTA
      transformed.cta_button = {
        text: legacyButtons[0]?.text || "Get Started",
        href: legacyButtons[0]?.href || "/contact",
        is_external: legacyButtons[0]?.is_external ?? false,
      };
    }
    // Remove legacy fields
    delete (transformed as any).cta_buttons;
  }

  // Handle legacy primary_cta/secondary_cta format
  if ('primary_cta' in data && data.primary_cta && !transformed.cta_button) {
    const primaryCta = data.primary_cta as {
      text?: string;
      href?: string;
      is_external?: boolean;
    };
    transformed.cta_button = {
      text: primaryCta?.text || "Get Started",
      href: primaryCta?.href || "/contact",
      is_external: primaryCta?.is_external ?? false,
    };
    // Remove legacy fields
    delete (transformed as any).primary_cta;
    delete (transformed as any).secondary_cta;
  }

  // Ensure cta_button has default values if it exists but is incomplete
  if (transformed.cta_button && typeof transformed.cta_button === 'object') {
    const cta = transformed.cta_button as any;
    transformed.cta_button = {
      text: cta.text || "Get Started",
      href: cta.href || "/contact",
      is_external: cta.is_external ?? false,
    };
  }

  return transformed;
});

export const MarqueeClientsContentSchema = z.object({
  clients: z.array(
    z.object({
      id: z.string().uuid(),
      logo: MediaAssetSchema.nullable(),
    })
  ).max(50, "Too many clients"),
  auto_scroll: z.boolean(),
  scroll_speed: z.enum(["slow", "medium", "fast"]).optional(),
});

export const AboutContentSchema = z.object({
  subheading: z.string().min(1, "Subheading is required").max(100, "Subheading too long").optional(),
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  description: z.string().min(1, "Description is required").max(2000, "Description too long").optional(),
  image: MediaAssetSchema.optional(),
}).transform((data): z.infer<typeof AboutContentSchema> => {
  // Migrate legacy data format
  const transformed = { ...data } as z.infer<typeof AboutContentSchema> & {
    headline?: string;
    features?: unknown[];
    team_members?: unknown[];
    stats?: unknown[];
  };

  // Handle legacy headline format
  if ('headline' in data && data.headline && !transformed.title) {
    transformed.title = data.headline;
    delete (transformed as any).headline;
  }

  // Remove legacy complex fields
  delete (transformed as any).features;
  delete (transformed as any).team_members;
  delete (transformed as any).stats;

  // Handle legacy image URL format
  if (typeof data.image === 'string' && data.image) {
    transformed.image = {
      media_id: null,
      alt_text: "About section image",
      url: data.image,
      width: 600,
      height: 400,
    };
  }

  // Provide default values if empty
  if (!transformed.subheading) {
    transformed.subheading = "About Us";
  }
  if (!transformed.title) {
    transformed.title = "About Our Company";
  }
  if (!transformed.description) {
    transformed.description = "We are a passionate team of creators, developers, and designers dedicated to building exceptional digital experiences. With years of experience and a commitment to excellence, we help businesses transform their ideas into reality.";
  }

  return transformed;
});

export const ServicesContentSchema = z.object({
  subheading: z.string().min(1, "Subheading is required").max(100, "Subheading too long").optional(),
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  description: z.string().min(1, "Description is required").max(1000, "Description too long").optional(),
  services: z.array(
    z.object({
      title: z.string().min(1, "Service title is required").max(100, "Title too long"),
      subtitle: z.string().max(200, "Subtitle too long").optional(),
      image: MediaAssetSchema.nullable().optional(),
      cta_button: CTAButtonSchema.optional(),
    })
  ).max(20, "Too many services"),
}).transform((data): z.infer<typeof ServicesContentSchema> => {
  // Migrate legacy data format
  const transformed = { ...data } as z.infer<typeof ServicesContentSchema> & {
    headline?: string;
    services?: Array<{
      id?: string;
      title?: string;
      description?: string;
      icon?: string;
      features?: string[];
    }>;
  };

  // Handle legacy headline format
  if ('headline' in data && data.headline && !transformed.title) {
    transformed.title = data.headline;
    delete (transformed as any).headline;
  }

  // Migrate legacy services array format
  if ('services' in data && Array.isArray(data.services)) {
    transformed.services = data.services.map((service) => {
      const migratedService: any = {
        title: service.title || "Service Title",
        subtitle: service.description ? (service.description as string).substring(0, 200) : "Service description",
        image: null,
        cta_button: {
          text: "Learn More",
          href: "/contact",
          is_external: false,
        },
      };

      // Clean up legacy fields
      delete migratedService.id;
      delete migratedService.icon;
      delete migratedService.features;
      delete migratedService.description; // Remove legacy description field

      return migratedService;
    });
  }

  // Provide default values if empty
  if (!transformed.subheading) {
    transformed.subheading = "Our Services";
  }
  if (!transformed.title) {
    transformed.title = "What We Offer Our Expertise, Your Advantage";
  }
  if (!transformed.description) {
    transformed.description = "Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.";
  }

  return transformed;
});

export const PortfolioContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  subtitle: z.string().max(1000, "Subtitle too long").optional(),
  items: z.array(
    z.object({
      id: z.string().uuid().optional(),
      logo_image: MediaAssetSchema,
      title: z.string().min(1, "Item title is required").max(200, "Title too long"),
      subtitle: z.string().max(200, "Subtitle too long").optional(),
      description: z.string().min(1, "Description is required").max(2000, "Description too long"),
      item_image: MediaAssetSchema.nullable().optional(),
    })
  ).max(100, "Too many items"),
}).transform((data): z.infer<typeof PortfolioContentSchema> => {
  // Migrate legacy data format
  const transformed = { ...data } as z.infer<typeof PortfolioContentSchema> & {
    headline?: string;
    description?: string;
    projects?: Array<{
      id?: string;
      title?: string;
      description?: string;
      images?: unknown[];
      technologies?: string;
      project_url?: string;
      github_url?: string;
      featured?: boolean;
      order?: number;
    }>;
  };

  // Handle legacy headline/description format
  if ('headline' in data && data.headline && !transformed.title) {
    transformed.title = data.headline;
    delete (transformed as any).headline;
  }
  if ('description' in data && data.description && !transformed.subtitle) {
    transformed.subtitle = data.description;
    delete (transformed as any).description;
  }

  // Migrate legacy projects array format
  if ('projects' in data && Array.isArray(data.projects)) {
    transformed.items = data.projects.map((project) => {
      const migratedItem: any = {
        logo_image: null, // Will need to be set manually
        title: project.title || "Project Title",
        subtitle: project.technologies || "Project Category",
        description: project.description || "Project description",
        item_image: null, // Will need to be set manually
      };

      // Use first image as logo_image if available
      if (project.images && Array.isArray(project.images) && project.images.length > 0) {
        migratedItem.logo_image = project.images[0];
      }

      // Clean up legacy fields
      delete migratedItem.technologies;
      delete migratedItem.project_url;
      delete migratedItem.github_url;
      delete migratedItem.featured;
      delete migratedItem.order;

      return migratedItem;
    });
  }

  // Provide default values if empty
  if (!transformed.title) {
    transformed.title = "Our Portfolio";
  }
  if (!transformed.subtitle) {
    transformed.subtitle = "Showcase of our best work and successful projects";
  }

  return transformed;
});

export const DigitalPartnersContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  subtitle: z.string().min(1, "Subtitle is required").max(500, "Subtitle too long"),
  partner_tags: z.array(
    z.object({
      id: z.string().uuid(),
      label: z.string().min(1, "Tag label is required").max(100, "Tag label too long"),
      partners: z.array(
        z.object({
          id: z.string().uuid(),
          logo: MediaAssetSchema.nullable(),
        })
      ).max(20, "Too many partners in tag"),
    })
  ).max(10, "Too many partner tags"),
});

export const CTAContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  subtitle: z.string().min(1, "Subtitle is required").max(1000, "Subtitle too long"),
  image: MediaAssetSchema.optional(),
  primary_button: CTAButtonSchema,
  secondary_button: z.object({
    text: z.string().min(1, "Button text is required").max(100, "Button text too long"),
    href: z.string().max(500, "Button URL too long").optional(),
    variant: z.enum(["primary", "secondary", "outline"]).default("secondary"),
    is_external: z.boolean().default(false),
  }).transform((data) => ({
    text: data.text,
    href: data.href || '/about',
    variant: data.variant,
    is_external: data.is_external,
  })).optional(),
});

export const FooterContentSchema = z.object({
  logo: MediaAssetSchema.optional().transform(val => val || null),
  description: z.string().max(1000, "Description too long").default("Creating exceptional digital experiences that help businesses thrive in the modern world."),
  newsletter: z.object({
    title: z.string().max(100, "Title too long").default("Stay Updated"),
    description: z.string().max(500, "Description too long").default("Subscribe to our newsletter for the latest updates and insights"),
  }),
  address: z.object({
    street: z.string().max(200, "Address too long").default("123 Business Street"),
    city: z.string().max(100, "City too long").default("New York"),
    state: z.string().max(100, "State too long").default("NY"),
    postal_code: z.string().max(20, "Postal code too long").default("10001"),
    country: z.string().max(100, "Country too long").default("United States"),
  }),
  contacts: z.array(
    z.object({
      type: z.enum(["email", "phone", "whatsapp"]).default("email"),
      label: z.string().max(50, "Label too long").default("Contact"),
      value: z.string().max(200, "Value too long").default("contact@example.com"),
    })
  ).max(5, "Too many contacts").default([]),
  social_links: z.array(
    z.object({
      platform: z.enum(["twitter", "linkedin", "github", "facebook", "instagram", "youtube"]).default("linkedin"),
      url: z.string().max(500, "Social URL too long").optional().transform(val => {
        if (!val || val.trim() === '') {
          return "https://linkedin.com";
        }
        // Basic URL validation without strict .url() check
        return val.startsWith('http') ? val : `https://${val}`;
      }),
      label: z.string().max(50, "Label too long").optional().transform(val => val || "@company"),
    })
  ).max(10, "Too many social links").default([]),
  footer_links: z.array(
    z.object({
      title: z.string().max(100, "Link text too long").default("Privacy Policy"),
      href: z.string().max(500, "URL too long").default("/privacy"),
    })
  ).max(20, "Too many footer links").default([]),
  copyright_text: z.string().max(200, "Text too long").default(`© ${new Date().getFullYear()} Your Company. All rights reserved.`),
});

// Section type to schema mapping
export const SectionValidationSchemas = {
  navbar: NavbarContentSchema,
  hero: HeroContentSchema,
  marquee_clients: MarqueeClientsContentSchema,
  about: AboutContentSchema,
  services: ServicesContentSchema,
  portfolio: PortfolioContentSchema,
  digital_partners: DigitalPartnersContentSchema,
  cta: CTAContentSchema,
  footer: FooterContentSchema,
} as const;

// Data migration utilities - handle legacy string URLs
function migrateLegacyContent(content: unknown): unknown {
  if (content === null || content === undefined) {
    return content;
  }
  if (Array.isArray(content)) {
    return content.map(item => migrateLegacyContent(item));
  }
  if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
    const migrated: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(content)) {
      // Handle legacy logo URL strings - convert to media asset objects
      if (key === 'logo' && typeof value === 'string' && value) {
        migrated[key] = {
          media_id: null, // No ID for legacy URLs
          alt_text: 'Logo',
          url: value,
          width: 200, // Default width for logos
          height: 60, // Default height for logos
        };
      } else if (key === 'cta_button' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Handle legacy CTA button - remove variant field if present
        const { variant, ...rest } = value as any;
        migrated[key] = rest;
      } else {
        migrated[key] = migrateLegacyContent(value);
      }
    }
    return migrated;
  }
  return content;
}

// Data cleaning utilities
export function cleanContentForValidation(content: unknown): unknown {
  if (content === null || content === undefined) {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map(item => cleanContentForValidation(item));
  }

  if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
    const cleaned: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(content)) {
      if (value === undefined) {
        // Provide default values for common undefined fields
        if (key === 'text' || key === 'label' || key === 'title' || key === 'name') {
          cleaned[key] = 'New Item';
        } else if (key === 'href' || key === 'url') {
          cleaned[key] = '/';
        } else if (key === 'is_external' || key === 'featured' || key === 'auto_scroll') {
          cleaned[key] = false;
        } else if (key === 'order' || key === 'width' || key === 'height') {
          cleaned[key] = 0;
        } else {
          cleaned[key] = null;
        }
      } else if (
        // Special handling for button objects to ensure they have required fields
        (key === 'primary_button' || key === 'secondary_button') &&
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const buttonObj = value as Record<string, unknown>;
        cleaned[key] = {
          text: buttonObj.text || 'Get Started',
          href: buttonObj.href || '/contact',
          is_external: buttonObj.is_external ?? false,
          variant: buttonObj.variant || 'primary',
        };
      } else if (
        // Special handling for social links to ensure they have valid URLs
        key === 'social_links' && Array.isArray(value)
      ) {
        cleaned[key] = value.map((link: any) => ({
          platform: link.platform || 'linkedin',
          url: link.url && link.url.trim() ? link.url : 'https://linkedin.com',
          label: link.label || '@company',
        }));
      } else if (
        // Special handling for footer links
        key === 'footer_links' && Array.isArray(value)
      ) {
        cleaned[key] = value.map((link: any) => ({
          title: link.title || 'Privacy Policy',
          href: link.href || '/privacy',
        }));
      } else if (
        // Special handling for contacts
        key === 'contacts' && Array.isArray(value)
      ) {
        cleaned[key] = value.map((contact: any) => ({
          type: contact.type || 'email',
          label: contact.label || 'Contact',
          value: contact.value || 'contact@example.com',
        }));
      } else {
        cleaned[key] = cleanContentForValidation(value);
      }
    }

    return cleaned;
  }

  return content;
}

// Validation functions
export function validateSectionContent(
  sectionType: keyof typeof SectionValidationSchemas,
  content: unknown
): { success: true; data: z.infer<(typeof SectionValidationSchemas)[typeof sectionType]> } | { success: false; error: z.ZodError } {
  const schema = SectionValidationSchemas[sectionType];

  // First migrate legacy content (e.g., string URLs to media asset objects)
  const migratedContent = migrateLegacyContent(content);
  // Then clean content to handle undefined values
  const cleanedContent = cleanContentForValidation(migratedContent);

  try {
    const result = schema.parse(cleanedContent);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

export function validateSectionContentSafe(
  sectionType: keyof typeof SectionValidationSchemas,
  content: unknown
): { success: true; data: unknown } | { success: false; error: string[] } {
  const schema = SectionValidationSchemas[sectionType];

  // First migrate legacy content (e.g., string URLs to media asset objects)
  const migratedContent = migrateLegacyContent(content);
  // Then clean content to handle undefined values
  const cleanedContent = cleanContentForValidation(migratedContent);

  try {
    const result = schema.parse(cleanedContent);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues?.map(err =>
        `${err.path.join('.')}: ${err.message}`
      ) || ['Validation error'];
      return { success: false, error: errorMessages };
    }
    throw error;
  }
}

// Type helpers
export type SectionType = keyof typeof SectionValidationSchemas;
export type CTAButton = z.infer<typeof CTAButtonSchema>;
export type NavbarContent = z.infer<typeof NavbarContentSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type MarqueeClientsContent = z.infer<typeof MarqueeClientsContentSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;
export type ServicesContent = z.infer<typeof ServicesContentSchema>;
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>;
export type DigitalPartnersContent = z.infer<typeof DigitalPartnersContentSchema>;
export type CTAContent = z.infer<typeof CTAContentSchema>;
export type FooterContent = z.infer<typeof FooterContentSchema>;

export type SectionContentType =
  | NavbarContent
  | HeroContent
  | MarqueeClientsContent
  | AboutContent
  | ServicesContent
  | PortfolioContent
  | DigitalPartnersContent
  | CTAContent
  | FooterContent;

// Default content generators
export function getDefaultSectionContent(sectionType: keyof typeof SectionValidationSchemas): Json {
  switch (sectionType) {
    case 'navbar':
      return {
        navigation_items: [],
      };

    case 'hero':
      return {
        headline: "Welcome to Our Website",
        subheadline: "We build amazing things",
        cta_buttons: [
          {
            text: "Get Started",
            href: "/contact",
            variant: "primary",
            is_external: false,
          },
        ],
      };

    case 'marquee_clients':
      return {
        clients: [],
        auto_scroll: true,
        scroll_speed: "medium",
      };

    case 'about':
      return {
        headline: "About Us",
        description: "Learn more about our company and team.",
        features: [],
        team_members: [],
      };

    case 'services':
      return {
        headline: "Our Services",
        description: "Discover how we can help you achieve your goals.",
        services: [],
      };

    case 'portfolio':
      return {
        title: "Our Portfolio",
        subtitle: "Explore our latest projects and success stories.",
        items: [],
      };

    case 'digital_partners':
      return {
        title: "Digital Partner",
        subtitle: "Your Trusted Digital Partner for Your Digital Transformation",
        partner_tags: [],
      };

    case 'cta':
      return {
        title: "Ready to Start Your Project?",
        subtitle: "Let's work together to bring your ideas to life. Get in touch with our team today.",
        primary_button: {
          text: "Get Started Now",
          href: "/contact",
          is_external: false,
        },
        secondary_button: {
          text: "Learn More",
          href: "/about",
          is_external: false,
        },
      };

    case 'footer':
      return {
        description: "Creating exceptional digital experiences that help businesses thrive in the modern world.",
        newsletter: {
          title: "Stay Updated",
          description: "Subscribe to our newsletter for the latest updates and insights",
        },
        address: {
          street: "123 Business Street",
          city: "New York",
          state: "NY",
          postal_code: "10001",
          country: "United States",
        },
        contacts: [
          {
            type: "email",
            label: "Email",
            value: "contact@company.com",
          },
          {
            type: "phone",
            label: "Phone",
            value: "+1 (555) 123-4567",
          },
        ],
        social_links: [
          {
            platform: "linkedin",
            url: "https://linkedin.com/company/yourcompany",
            label: "@yourcompany",
          },
          {
            platform: "twitter",
            url: "https://twitter.com/yourcompany",
            label: "@yourcompany",
          },
        ],
        footer_links: [
          {
            title: "Privacy Policy",
            href: "/privacy",
          },
          {
            title: "Terms of Service",
            href: "/terms",
          },
          {
            title: "Cookie Policy",
            href: "/cookies",
          },
        ],
        copyright_text: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
      };

    default:
      return {};
  }
}