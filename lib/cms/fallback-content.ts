import type { ContentSections } from "@/components/content/providers/ContentProvider";

// Default fallback content for when CMS is unavailable
export const fallbackContent: ContentSections = {
  navbar: {
    logo: null,
    navigation_items: [
      {
        text: "Home",
        href: "/",
        is_external: false,
      },
      {
        text: "About",
        href: "/#about",
        is_external: false,
      },
      {
        text: "Services",
        href: "/#services",
        is_external: false,
      },
      {
        text: "Portfolio",
        href: "/#portfolio",
        is_external: false,
      },
      {
        text: "Contact",
        href: "/#contact",
        is_external: false,
      },
    ],
    cta_button: {
      text: "Get Started",
      href: "/contact",
    },
  },

  hero: {
    headline: "Collaborative Growth Through Impactful Digital Strategies.",
    subheadline: "Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.",
    background_image: null,
    cta_button: {
      text: "Get Started",
      href: "/contact",
    },
  },

  about: {
    subheading: "About Us",
    title: "Performance and Media Marketing Agency Which Aim to Help Industries",
    description: "Lorem ipsum dolor sit amet consectetur. At molestie elit mauris scelerisque sed in. Nisl cursus tristique interdum donec. Euismod aenean non quis suspendisse. Mattis id aliquam purus nibh vel urna sed.\n\nAenean sed volutpat quam rutrum scelerisque turpis sit. Tristique nisl auctor sit pretium quisque sit neque consectetur gravida. Purus aliquet congue commodo nisi non bibendum diam duis turpis. Praesent nisl nulla ligula amet lobortis. Viverra sodales vel egestas leo pretium non ut. Consequat aliquet dignissim egestas fusce non ultrices dignissim ut purus. Eget semper ultrices a tellus.\n\nTristique nisl auctor sit pretium quisque sit neque consectetur gravida. Purus aliquet congue commodo nisi non bibendum diam duis turpis. Praesent nisl nulla ligula amet lobortis. Viverra sodales vel egestas leo pretium non ut.",
    image: null,
  },

  services: {
    subheading: "Our Services",
    title: "What We Offer Our Expertise, Your Advantage",
    description: "Lorem ipsum dolor sit amet consectetur. Maecenas lorem massa eleifend commodo convallis. Pellentesque quis aliquet auctor ultricies. Viverra cursus amet mi pellentesque libero non.",
    services: [
      {
        id: "default-service-1",
        title: "Web Development",
        subtitle: "Custom websites and web applications built with modern technologies and best practices. Responsive design and SEO optimization included.",
        image: null,
        cta_button: {
          text: "Let's Discuss",
          href: "/contact",
          is_external: false,
        },
      },
      {
        id: "default-service-2",
        title: "Mobile Development",
        subtitle: "Native and cross-platform mobile applications for iOS and Android devices with focus on user experience.",
        image: null,
        cta_button: {
          text: "Let's Discuss",
          href: "/contact",
          is_external: false,
        },
      },
      {
        id: "default-service-3",
        title: "UI/UX Design",
        subtitle: "Beautiful and intuitive user interfaces that delight your customers. From user research to final visual design.",
        image: null,
        cta_button: {
          text: "Let's Discuss",
          href: "/contact",
          is_external: false,
        },
      },
      {
        id: "default-service-4",
        title: "Digital Marketing",
        subtitle: "Strategic digital marketing to grow your online presence and reach. SEO, social media, and content strategy.",
        image: null,
        cta_button: {
          text: "Let's Discuss",
          href: "/contact",
          is_external: false,
        },
      },
    ],
  },

  portfolio: {
    title: "Our Portfolio",
    subtitle: "Showcase of our recent work and successful projects",
    items: [
      {
        id: "default-portfolio-1",
        logo_image: null,
        title: "Cloxvox",
        subtitle: "Performance Marketing",
        description: "During their launch in Indonesia, we maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
        item_image: null,
      },
      {
        id: "default-portfolio-2",
        logo_image: null,
        title: "World ID",
        subtitle: "Performance Marketing",
        description: "Strategic performance marketing campaign that successfully launched World ID in the Indonesian market with comprehensive digital strategy.",
        item_image: null,
      },
      {
        id: "default-portfolio-3",
        logo_image: null,
        title: "Telkomsel",
        subtitle: "Digital Media Buying",
        description: "Comprehensive digital media buying strategy that enhanced brand presence and drove significant user engagement across multiple platforms.",
        item_image: null,
      },
    ],
  },

  "marquee-clients": {
    clients: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        logo: {
          alt_text: "Tech Corp Logo",
          url: "https://s3-alpha-sig.figma.com/img/a28f/d673/96bd52d02dc33b9ee5181168e77c187f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XrMad9N7jR24fT8Ulm1uSYgiZfY~Qsi19haMhrfGhyM5vJLNxhLFs98FbGjdVYAgEKrXpApeRU29XqLBIRuhT3sr3PwkCXjaVoTBEfFIpPjMH0-Y1U0yw5Ke-F1JcBxSWhnu1UZzukb4C0-SgJllQ3TYfvf0dZJdDLNHyvtbS2O4HdxzL0dyqBkdT9mGOz1GQHYOyNSUUCP~OVuhF2n84ptLyMclH~ZNYhxvP6gZRZ6TGlp5XH7g58DbPj4iylVgGkTQVmyadF4uePnS5rDi0OSoRocHLzGCfOEapC0kc6boZ-mr3IrK6SiGQwu9JyuEY-GWWs~V5oXL9PM5SJYHAw__",
          width: 135,
          height: 27,
        },
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        logo: {
          alt_text: "Design Studio Logo",
          url: "https://s3-alpha-sig.figma.com/img/081c/e03a/aa75cffbd9531da99a8a8f09708c4489?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aQLk48BkjUtKDSfJBAWJEVvOIrBOk-N6LDp3I-nbAejm~GI04Ye7mFPrFnNmvRMVFyVi6rDgq3r5yUbDIUl3GNjyuDi4FptOgTrg4o~duuAKSKgrTXLsduMxwtTcZdTyjmeP49FxZu626mo3gSmEZn-TqmaTGX88rPQyuVdFIPJmBw~db4nB0KsaBBk4U2DOg~qaQCTgjd2PPUyRdR8g6iJs8RoZ1jsowNgbtgxFolmmor~fToKTRq~xeuE0cz3wDP4aEbdSRcfKqA2MD3Jrjo3z2JaVW9Py8STq7-0baujWYB~B5ks-yyzBS~Alv5Cn0JCOAY4IguJWps~95r7rxw__",
          width: 112,
          height: 22,
        },
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        logo: {
          alt_text: "Startup Hub Logo",
          url: "https://s3-alpha-sig.figma.com/img/b037/f877/2360865ce4c94883b2a979bfe30a5016?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dXiqVPrebwLqgA-dPkvyfaYVuHShI46udFGOZYwio4lpKws5pPukdfuiJyZGpYKiGldiWt9XWdnbEUEUioAouImRF7nfsDGVZRpUjB1swbsE-uwUawPGMqGc7aZjOI4n~uwgfnAfvj-DCSHmTFrUUPlbOEBxOzOKSPE~Lf3sp-HQeopWuEA19UaofZXorCVYVth10tk0TKCl-vP0yPoeiSDyO0yCYVV08uoP8hD7nirh81ed22Z7rZxEFv3PnfCOIcQYPViFe4aCchKdJ40ZjdiqqwdoyCviHHDI4eRTAyYm8hiPp8zeYBugDjobWX0HyqMVzbVoX7WCStE3v0st6A__",
          width: 93,
          height: 40,
        },
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        logo: {
          alt_text: "Digital Agency Logo",
          url: "https://s3-alpha-sig.figma.com/img/c58f/8a3d/e44993a94abfd76440ef2235e2cdad76?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hVSVGjh3KqR5sYlcI-IPnYnnnxYwXwvUoDTEskGsVxr2ncE8BezC~F0rcA-tAq-2hcvvN90XqnhTidWTqoA9IE6WxnMLN~oYi5zFBCYN3UWvJ~aF8MraX7GZEIGurtzl7i09sQO2ryderBi9XwjyvnfkdAIxKlxMJRkjfgYaFyWK7BYsm9Q2PrWvhAipOGvX7zuC1gYdPwQz64XjqpFcuyd9Akk9nV3kQCRJAfS4dfFAPUtvn5tu6ph7k3xT2hB6usXpg4Xf6wBSaHiPvkjN97f1rPTJ1nPRwPc2h2DhhBqQCyeP~Dtu739zS54Z2iQdFAPftig2UHcKZa2247czYw__",
          width: 135,
          height: 19,
        },
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        logo: {
          alt_text: "E-Commerce Plus Logo",
          url: "https://s3-alpha-sig.figma.com/img/5dad/7827/d5657238aaf72ddf092b55d4e6727aa5?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XhsJvAgdyhsSnqgx0mKMXklisNNx5Gh3SOBt3qBVrzr~bNsW-lrPQXo9TqQXYpwapEWaoq3bDDjiNY6lHLMMMS8nTbelrEEgKq7yduADtE95DXzg~B7SrZQlqKcCdJjwKgewSlA3s1FwoevkR4-M8Rmb1eMqluMViRbbWmfEcACUl2NQZYGiE3GOOP7n7lgyXvsG3ci6r1SWOsDuaqD8jRMKaoD1vAqOiM0J7Fn-zyRZqBDrYX4SgqmTGRQNZWGVqU8QNWJAQJ9W7rIAE05RR8FC7jlIcT1om~WynTNsepiySFhGa5AUyTOUlVAHjqivONvKsHc7FAXfrjKwSZBlgA__",
          width: 106,
          height: 39,
        },
      },
    ],
    auto_scroll: true,
    scroll_speed: "medium",
  },

  "digital-partners": {
    title: "Digital Partner",
    subtitle: "Your Trusted Digital Partner for Your Digital Transformation",
    partner_tags: [
      {
        id: "default-agency-partners",
        label: "Agency Partner",
        partners: [
          { id: "default-agency-1", logo: null },
          { id: "default-agency-2", logo: null },
          { id: "default-agency-3", logo: null },
          { id: "default-agency-4", logo: null },
        ],
      },
      {
        id: "default-publisher-partners",
        label: "Publisher Partner",
        partners: [
          { id: "default-publisher-1", logo: null },
          { id: "default-publisher-2", logo: null },
        ],
      },
      {
        id: "default-ecommerce-partners",
        label: "e-Commerce Platform",
        partners: [
          { id: "default-ecommerce-1", logo: null },
          { id: "default-ecommerce-2", logo: null },
          { id: "default-ecommerce-3", logo: null },
        ],
      },
      {
        id: "default-marketplace-partners",
        label: "Marketplace Partner",
        partners: [
          { id: "default-marketplace-1", logo: null },
          { id: "default-marketplace-2", logo: null },
        ],
      },
      {
        id: "default-email-partners",
        label: "Email Marketing Partner",
        partners: [
          { id: "default-email-1", logo: null },
          { id: "default-email-2", logo: null },
          { id: "default-email-3", logo: null },
          { id: "default-email-4", logo: null },
        ],
      },
      {
        id: "default-social-partners",
        label: "Social Partner",
        partners: [
          { id: "default-social-1", logo: null },
          { id: "default-social-2", logo: null },
          { id: "default-social-3", logo: null },
          { id: "default-social-4", logo: null },
        ],
      },
    ],
  },

  cta: {
    title: "Ready to Start Your Project?",
    description: "Let's work together to bring your ideas to life. Get in touch with our team today.",
    background_image: null,
    primary_button: {
      text: "Get Started Now",
      href: "/contact",
    },
    secondary_button: {
      text: "View Our Work",
      href: "/portfolio",
    },
  },

  footer: {
    logo: null,
    description: "Creating exceptional digital experiences that help businesses thrive in the modern world.",
    social_links: [
      {
        platform: "twitter",
        url: "https://twitter.com/yourcompany",
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/company/yourcompany",
      },
      {
        platform: "github",
        url: "https://github.com/yourcompany",
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
    copyright_text: "© 2024 Your Company. All rights reserved.",
  },
};

// Development-only content for testing
export const developmentContent: ContentSections = {
  ...fallbackContent,
  // Add development-specific overrides here if needed
};