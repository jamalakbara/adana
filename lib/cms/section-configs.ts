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
    name: "subtitle",
    label: "Section Subtitle",
    type: "textarea",
    placeholder: "Your Trusted Digital Partner for Your Digital Transformation",
    required: true,
    rows: 2,
  },
  {
    name: "partner_tags",
    label: "Partner Categories",
    type: "array",
    helperText: "Create partner categories and add partner logos to each category",
    required: true,
    fields: [
      {
        name: "id",
        label: "Category ID",
        type: "id",
        required: true,
        hidden: true,
      },
      {
        name: "label",
        label: "Category Name",
        type: "text",
        placeholder: "e.g., Agency Partner, Technology Partner",
        required: true,
      },
      {
        name: "partners",
        label: "Partner Logos",
        type: "array",
        helperText: "Add partner logos for this category",
        required: false,
        fields: [
          {
            name: "id",
            label: "Partner ID",
            type: "id",
            required: true,
            hidden: true,
          },
          {
            name: "logo",
            label: "Partner Logo",
            type: "logo",
            helperText: "Upload partner logo image",
            required: false,
          },
        ],
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
    name: "subtitle",
    label: "Section Subtitle",
    type: "textarea",
    placeholder: "Encourage visitors to take action with our services",
    required: true,
    rows: 3,
  },
  {
    name: "image",
    label: "Background Image",
    type: "logo",
    helperText: "CTA section background image. Recommended: 1920x600px",
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
      {
        name: "is_external",
        label: "External Link",
        type: "boolean",
        helperText: "Open button link in new tab",
        required: false,
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

// Footer Configuration
export const footerConfig: EditorFieldConfig[] = [
  {
    name: "logo",
    label: "Footer Logo",
    type: "logo",
    helperText: "Company logo for footer. Recommended size: 200x60px",
    required: false,
  },
  {
    name: "description",
    label: "Company Description",
    type: "textarea",
    placeholder: "Brief company description for footer",
    required: true,
    rows: 4,
  },
  {
    name: "newsletter",
    label: "Newsletter Section",
    type: "object",
    helperText: "Newsletter signup section",
    required: true,
    fields: [
      {
        name: "title",
        label: "Newsletter Title",
        type: "text",
        placeholder: "Stay Updated",
        required: true,
      },
      {
        name: "description",
        label: "Newsletter Description",
        type: "textarea",
        placeholder: "Subscribe to our newsletter for the latest updates and insights",
        required: true,
        rows: 2,
      },
    ],
  },
  {
    name: "address",
    label: "Company Address",
    type: "object",
    helperText: "Company physical address",
    required: true,
    fields: [
      {
        name: "street",
        label: "Street Address",
        type: "text",
        placeholder: "123 Business Street",
        required: true,
      },
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "New York",
        required: true,
      },
      {
        name: "state",
        label: "State/Province",
        type: "text",
        placeholder: "NY",
        required: false,
      },
      {
        name: "postal_code",
        label: "Postal Code",
        type: "text",
        placeholder: "10001",
        required: true,
      },
      {
        name: "country",
        label: "Country",
        type: "text",
        placeholder: "United States",
        required: true,
      },
    ],
  },
  {
    name: "contacts",
    label: "Contact Information",
    type: "array",
    helperText: "Contact details (email, phone, WhatsApp)",
    required: true,
    fields: [
      {
        name: "type",
        label: "Contact Type",
        type: "select",
        options: [
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "whatsapp", label: "WhatsApp" },
        ],
        required: true,
      },
      {
        name: "label",
        label: "Label",
        type: "text",
        placeholder: "Business Hours",
        required: true,
      },
      {
        name: "value",
        label: "Value",
        type: "text",
        placeholder: "contact@company.com",
        required: true,
      },
    ],
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
      {
        name: "label",
        label: "Display Label",
        type: "text",
        placeholder: "@handle",
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

// Export all configurations (use database format - underscores)
export const sectionConfigs = {
  navbar: navbarConfig,
  hero: heroConfig,
  about: aboutConfig,
  services: servicesConfig,
  portfolio: portfolioConfig,
  marquee_clients: marqueeClientsConfig,
  digital_partners: digitalPartnersConfig,
  cta: ctaConfig,
  footer: footerConfig,
} as const;