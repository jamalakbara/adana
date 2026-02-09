export interface ServiceDataItem {
  title: string;
  subtitle: string;
}

export interface ServiceData {
  id: string;
  title: string;
  intro: string;
  items: ServiceDataItem[];
  nodeId: string;
  image?: string;
}

export const servicesData: ServiceData[] = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    intro: "Strategize for effectiveness and optimize for optimum impact.",
    items: [
      {
        title: "01. Social Media Advertising",
        subtitle: "Meta Ads, Tiktok Ads, LinkedIn Ads, Youtube Ads"
      },
      {
        title: "02. Marketplace Advertising",
        subtitle: "Shopee Iklanku, TokopediaAds, and Lazada Ads"
      },
      {
        title: "03. Search Engine Marketing",
        subtitle: "Google Search Engine Marketing"
      },
      {
        title: "04. Email Marketing",
        subtitle: "Mailchimp, Hubspot, Sender, Sendinblue"
      }
    ],
    image: "/service-1.png",
    nodeId: "115:10801"
  },
  {
    id: "digital-media-buying",
    title: "Digital Media Buying",
    intro: "Emphasizing media mix modelling to tailor efficient media buying strategies.",
    items: [
      {
        title: "01. Digital Marketing Introduction Class",
        subtitle: "Learn about digital marketing fundamentals and tools to maximize your team digital business capabilities"
      },
      {
        title: "02. Performance Marketing Class",
        subtitle: "Focus on Digital Advertising Tools introduction, implementation, and optimization"
      },
      {
        title: "03. Marketplace Advertising Class",
        subtitle: "Learn on how to maximize you marketplace marketing efforts."
      }
    ],
    image: "/service-1.png",
    nodeId: "115:10803"
  },
  {
    id: "marketplace-management",
    title: "Marketplace Management",
    intro: "Managing end to end business and marketing strategy for marketplace",
    items: [
      {
        title: "01. Affiliate Marketing",
        subtitle: "Enable in platform affiliate marketing strategy for marketplace"
      },
      {
        title: "03. Marketplace Search Engine Optimization",
        subtitle: "Optimize marketplace SEO using queries and keywords analysis"
      },
      {
        title: "02. Marketplace Program Consultation",
        subtitle: "Choose and update marketplace promotion event to maximize brand visibility and conversion"
      }
    ],
    image: "/service-1.png",
    nodeId: "115:10804"
  },
  {
    id: "corporate-training",
    title: "Digital Marketing Corporate Training",
    intro: "Accelerate digital knowledge to maximize digital presence or digital business penetration",
    items: [
      {
        title: "01. Digital Marketing Introduction Class",
        subtitle: "Learn about digital marketing fundamentals and tools to maximize your team digital business capabilities"
      },
      {
        title: "02. Performance Marketing Class",
        subtitle: "Focus on Digital Advertising Tools introduction, implementation, and optimization"
      },
      {
        title: "03. Marketplace Advertising Class",
        subtitle: "Learn on how to maximize you marketplace marketing efforts."
      }
    ],
    image: "/service-1.png",
    nodeId: "115:10805"
  },
];