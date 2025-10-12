import type { EditorFieldConfig } from "@/components/admin/editor";

// Navbar Section Configuration
export const navbarConfig: EditorFieldConfig[] = [
  {
    name: "logo",
    label: "Logo",
    type: "logo",
    helperText: "Upload your company logo. Recommended size: 200x60px",
    required: false,
  },
  {
    name: "navigation_items",
    label: "Navigation Items",
    type: "array",
    helperText: "Add navigation menu items",
    required: false,
    fields: [
      {
        name: "text",
        label: "Label",
        type: "text",
        placeholder: "Home",
        required: true,
      },
      {
        name: "href",
        label: "URL",
        type: "text",
        placeholder: "/",
        required: true,
      },
      {
        name: "is_external",
        label: "External Link",
        type: "boolean",
        helperText: "Open in new tab",
        required: false,
      },
    ],
  },
  {
    name: "cta_button",
    label: "CTA Button",
    type: "object",
    helperText: "Call-to-action button in navbar",
    required: false,
    fields: [
      {
        name: "text",
        label: "Button Text",
        type: "text",
        placeholder: "Get Started",
        required: true,
      },
      {
        name: "href",
        label: "Button URL",
        type: "text",
        placeholder: "/contact",
        required: true,
      },
      {
        name: "is_external",
        label: "External Link",
        type: "boolean",
        helperText: "Open button link in new tab",
        required: false,
      },
    ],
  },
];

// Hero Section Configuration
export const heroConfig: EditorFieldConfig[] = [
  {
    name: "headline",
    label: "Headline",
    type: "text",
    placeholder: "Welcome to Our Amazing Service",
    required: true,
  },
  {
    name: "subheadline",
    label: "Subheadline",
    type: "textarea",
    placeholder: "Describe what makes your service unique and valuable",
    required: true,
    rows: 3,
  },
  {
    name: "background_image",
    label: "Background Image",
    type: "logo",
    helperText: "Upload hero background image. Recommended size: 1920x1080px",
    required: false,
  },
  {
    name: "cta_button",
    label: "CTA Button",
    type: "object",
    helperText: "Call-to-action button",
    required: false,
    fields: [
      {
        name: "text",
        label: "Button Text",
        type: "text",
        placeholder: "Get Started",
        required: false,
      },
      {
        name: "href",
        label: "Button URL",
        type: "text",
        placeholder: "/contact",
        required: false,
      },
      {
        name: "is_external",
        label: "External Link",
        type: "boolean",
        helperText: "Open button link in new tab",
        required: false,
      },
    ],
  },
];

// About Section Configuration
export const aboutConfig: EditorFieldConfig[] = [
  {
    name: "subheading",
    label: "Section Subheading",
    type: "text",
    placeholder: "About Us",
    required: false,
  },
  {
    name: "title",
    label: "Section Title",
    type: "text",
    placeholder: "About Our Company",
    required: false,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Tell your company story and mission",
    required: false,
    rows: 5,
  },
  {
    name: "image",
    label: "About Image",
    type: "logo",
    helperText: "Upload company or team photo. Recommended size: 600x400px",
    required: false,
  },
];

// Services Section Configuration
export const servicesConfig: EditorFieldConfig[] = [
  {
    name: "subheading",
    label: "Section Subheading",
    type: "text",
    placeholder: "Our Services",
    required: false,
  },
  {
    name: "title",
    label: "Section Title",
    type: "text",
    placeholder: "What We Offer Our Expertise, Your Advantage",
    required: false,
  },
  {
    name: "description",
    label: "Section Description",
    type: "textarea",
    placeholder: "Brief description of your services",
    required: false,
    rows: 3,
  },
  {
    name: "services",
    label: "Services",
    type: "array",
    helperText: "List of services you offer",
    required: false,
    fields: [
      {
        name: "title",
        label: "Service Title",
        type: "text",
        placeholder: "Web Development",
        required: true,
      },
      {
        name: "subtitle",
        label: "Description",
        type: "textarea",
        placeholder: "Brief service description or tagline",
        required: false,
        rows: 2,
      },
      {
        name: "image",
        label: "Service Image",
        type: "logo",
        helperText: "Upload service image. Recommended size: 400x300px",
        required: false,
      },
      {
        name: "cta_button",
        label: "CTA Button",
        type: "object",
        helperText: "Call-to-action button for this service",
        required: false,
        fields: [
          {
            name: "text",
            label: "Button Text",
            type: "text",
            placeholder: "Learn More",
            required: true,
          },
          {
            name: "href",
            label: "Button URL",
            type: "text",
            placeholder: "/contact",
            required: true,
          },
          {
            name: "is_external",
            label: "External Link",
            type: "boolean",
            helperText: "Open button link in new tab",
            required: false,
          },
        ],
      },
    ],
  },
];

// Portfolio Section Configuration
export const portfolioConfig: EditorFieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Our Portfolio",
    required: true,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    type: "textarea",
    placeholder: "Showcase of our best work and successful projects",
    required: false,
    rows: 3,
  },
  {
    name: "items",
    label: "Items",
    type: "array",
    helperText: "Portfolio items to showcase",
    required: true,
    fields: [
      {
        name: "logo_image",
        label: "Logo Image",
        type: "logo",
        helperText: "Client or company logo. Recommended size: 200x60px",
        required: true,
      },
      {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Project Title",
        required: true,
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "text",
        placeholder: "Client Name or Category",
        required: false,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Brief description of the project",
        required: true,
        rows: 3,
      },
      {
        name: "item_image",
        label: "Item Image",
        type: "logo",
        helperText: "Project screenshot or showcase image. Recommended size: 600x400px",
        required: false,
      },
    ],
  },
];

// Marquee Clients Configuration
export const marqueeClientsConfig: EditorFieldConfig[] = [
  {
    name: "clients",
    label: "Client Logos",
    type: "array",
    helperText: "Client logos to display in marquee",
    required: true,
    fields: [
      {
        name: "id",
        label: "ID",
        type: "id",
        required: true,
        hidden: true,
      },
      {
        name: "logo",
        label: "Client Logo",
        type: "logo",
        helperText: "Client logo image. Recommended: transparent background",
        required: false,
      },
    ],
  },
];

// Digital Partners Configuration
export const digitalPartnersConfig: EditorFieldConfig[] = [
  {
    name: "title",
    label: "Section Title",
    type: "text",
    placeholder: "Our Digital Partners",
    required: true,
  },
  {
    name: "description",
    label: "Section Description",
    type: "textarea",
    placeholder: "Information about your digital partners",
    required: false,
    rows: 3,
  },
  {
    name: "partners",
    label: "Partners",
    type: "array",
    helperText: "Digital partner information",
    required: true,
    fields: [
      {
        name: "name",
        label: "Partner Name",
        type: "text",
        placeholder: "Partner Company",
        required: true,
      },
      {
        name: "logo",
        label: "Partner Logo",
        type: "media",
        helperText: "Partner logo image",
        required: true,
      },
      {
        name: "description",
        label: "Partnership Description",
        type: "textarea",
        placeholder: "Describe the partnership",
        required: true,
        rows: 3,
      },
      {
        name: "website_url",
        label: "Website URL",
        type: "text",
        placeholder: "https://partner-website.com",
        required: false,
      },
    ],
  },
];

// CTA Section Configuration
export const ctaConfig: EditorFieldConfig[] = [
  {
    name: "title",
    label: "Section Title",
    type: "text",
    placeholder: "Ready to Get Started?",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Encourage visitors to take action",
    required: true,
    rows: 3,
  },
  {
    name: "background_image",
    label: "Background Image",
    type: "media",
    helperText: "CTA section background. Recommended: 1920x600px",
    required: false,
  },
  {
    name: "primary_button",
    label: "Primary Button",
    type: "object",
    required: true,
    fields: [
      {
        name: "text",
        label: "Button Text",
        type: "text",
        placeholder: "Get Started Now",
        required: true,
      },
      {
        name: "href",
        label: "Button URL",
        type: "text",
        placeholder: "/contact",
        required: true,
      },
    ],
  },
  {
    name: "secondary_button",
    label: "Secondary Button",
    type: "object",
    required: false,
    fields: [
      {
        name: "text",
        label: "Button Text",
        type: "text",
        placeholder: "Learn More",
        required: true,
      },
      {
        name: "href",
        label: "Button URL",
        type: "text",
        placeholder: "/about",
        required: true,
      },
    ],
  },
];

// Footer Configuration
export const footerConfig: EditorFieldConfig[] = [
  {
    name: "logo",
    label: "Footer Logo",
    type: "media",
    helperText: "Company logo for footer",
    required: false,
  },
  {
    name: "description",
    label: "Company Description",
    type: "textarea",
    placeholder: "Brief company description for footer",
    required: false,
    rows: 3,
  },
  {
    name: "social_links",
    label: "Social Links",
    type: "array",
    helperText: "Social media links",
    required: false,
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          { value: "twitter", label: "Twitter/X" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "github", label: "GitHub" },
          { value: "facebook", label: "Facebook" },
          { value: "instagram", label: "Instagram" },
          { value: "youtube", label: "YouTube" },
        ],
        required: true,
      },
      {
        name: "url",
        label: "Profile URL",
        type: "text",
        placeholder: "https://twitter.com/handle",
        required: true,
      },
    ],
  },
  {
    name: "footer_links",
    label: "Footer Links",
    type: "array",
    helperText: "Quick links in footer",
    required: false,
    fields: [
      {
        name: "title",
        label: "Link Text",
        type: "text",
        placeholder: "Privacy Policy",
        required: true,
      },
      {
        name: "href",
        label: "Link URL",
        type: "text",
        placeholder: "/privacy",
        required: true,
      },
    ],
  },
  {
    name: "copyright_text",
    label: "Copyright Text",
    type: "text",
    placeholder: "© 2024 Your Company. All rights reserved.",
    required: true,
  },
];

// Export all configurations
export const sectionConfigs = {
  navbar: navbarConfig,
  hero: heroConfig,
  about: aboutConfig,
  services: servicesConfig,
  portfolio: portfolioConfig,
  marquee_clients: marqueeClientsConfig,
  "digital-partners": digitalPartnersConfig,
  cta: ctaConfig,
  footer: footerConfig,
} as const;