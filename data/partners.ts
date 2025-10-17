export interface PartnerData {
  src: string;
  alt: string;
}

export interface PartnersData {
  [category: string]: PartnerData[];
}

export const partnersData: PartnersData = {
  "Agency Partner": [
    { src: "/Agency Partner /logo glos (1).png", alt: "Agency Partner 1" },
    { src: "/Agency Partner /Copy of PLABS.ID - Logo Typeface - Black.png", alt: "Agency Partner 2" }
  ],
  "Publisher Partner": [
    { src: "/Publisher Partner/Kompas Logo .webp", alt: "Publisher Partner 1" },
    { src: "/Publisher Partner/RCTI + logo .png", alt: "Publisher Partner 2" },
    { src: "/Publisher Partner/Kumparan Logo .png", alt: "Publisher Partner 3" },
    { src: "/Publisher Partner/Detik Logo .gif", alt: "Publisher Partner 4" }
  ],
  "e-Commerce Platform": [
    { src: "/Ecommerce Partner /Shopify Logo .png", alt: "e-Commerce Platform 1" },
    { src: "/Ecommerce Partner /Woo Commerce Logo .png", alt: "e-Commerce Platform 2" }
  ],
  "Marketplace Partner": [
    { src: "/Marketplace Logo /Shopee.svg.png", alt: "Marketplace Partner 1" },
    { src: "/Marketplace Logo /Tokopedia Logo .png", alt: "Marketplace Partner 2" },
    { src: "/Marketplace Logo /Zalora_Group_logo.svg.png", alt: "Marketplace Partner 3" },
    { src: "/Marketplace Logo /Lazada_(2019).svg.png", alt: "Marketplace Partner 4" }
  ],
  "Email Marketing Partner": [
    { src: "/Agency Partner /logo glos (1).png", alt: "Email Marketing Partner 1" },
    { src: "/Agency Partner /Copy of PLABS.ID - Logo Typeface - Black.png", alt: "Email Marketing Partner 2" },
    { src: "/Publisher Partner/Kompas Logo .webp", alt: "Email Marketing Partner 3" },
    { src: "/Publisher Partner/RCTI + logo .png", alt: "Email Marketing Partner 4" }
  ],
  "Social Partner": [
    { src: "/Social Platform /Meta Logo .png", alt: "Social Partner 1" },
    { src: "/Social Platform /Tiktok Ads .png", alt: "Social Partner 2" },
    { src: "/Social Platform /Google Ads Logo .svg", alt: "Social Partner 3" },
    { src: "/Social Platform /Linkedin Ads.png", alt: "Social Partner 4" }
  ]
};