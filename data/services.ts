export interface ServiceData {
  id: string;
  title: string;
  description: string;
  nodeId: string;
  image?: string;
}

export const servicesData: ServiceData[] = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: `Strategize for effectiveness and optimize for optimum impact.<br><br><b>01. Social Media Advertising</b><br>Meta Ads, Tiktok Ads, LinkedIn Ads, Youtube Ads<br><br><b>02. Marketplace Advertising</b><br>Shopee Iklanku, TokopediaAds, and Lazada Ads<br><br><b>03. Search Engine Marketing</b><br>Google Search Engine Marketing<br><br><b>04. Email Marketing</b><br>Mailchimp, Hubspot, Sender, Sendinblue`,
    image: "/service-1.png",
    nodeId: "115:10801"
  },
  {
    id: "digital-media-buying",
    title: "Digital Media Buying",
    description: `Emphasizing media mix modelling to tailor efficient media buying strategies. <br><br>01.<b>Digital Marketing Introduction Class</b><br>Learn about digital marketing fundamentals and tools to maximize your team digital business capabilities<br><br>02.<b>Performance Marketing Class</b><br>Focus on Digital Advertising Tools introduction, implementation, and optimization<br><br>03.<b>Marketplace Advertising Class</b><br>Learn on how to maximize you marketplace marketing efforts.`,
    image: "/service-1.png",
    nodeId: "115:10803"
  },
  {
    id: "marketplace-management",
    title: "Marketplace Management",
    description: `Managing end to end business and marketing strategy for marketplace <br><br><b>01. Affiliate Marketing</b> <br>Enable in platform affiliate marketing strategy for marketplace <br><br><b>03. Marketplace Search Engine Optimization</b>  <br>Optimize marketplace SEO using queries and keywords analysis <br><br><b>02. Marketplace Program Consultation</b><br>Choose and update marketplace promotion event to maximize brand visibility and conversion`,
    image: "/service-1.png",
    nodeId: "115:10804"
  },
  {
    id: "corporate-training",
    title: "Digital Marketing Corporate Training",
    description: `Accelerate digital knowledge to maximize digital presence or digital business penetration <br><br><b>01. Digital Marketing Introduction Class</b><br>Learn about digital marketing fundamentals and tools to maximize your team digital business capabilities<br><br><b>02. Performance Marketing Class</b><br>Focus on Digital Advertising Tools introduction, implementation, and optimization<br><br><b>03. Marketplace Advertising Class</b><br>Learn on how to maximize you marketplace marketing efforts.`,
    image: "/service-1.png",
    nodeId: "115:10805"
  },
];