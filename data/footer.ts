
export interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }> | string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  services: FooterLink[];
  legal: FooterLink[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  phoneUrl: string;
  email: string;
  emailUrl: string;
}

export interface CompanyInfo {
  name: string;
  copyright: string;
}

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", icon: "/linkedin-logo.png", href: "#" },
  { name: "Twitter", icon: "/twitter-logo.png", href: "#" },
  { name: "Instagram", icon: "/instagram-logo.png", href: "#" }
];

export const footerLinks: FooterLinks = {
  services: [
    { name: "Our Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Digital Partner", href: "#digital-partners" }
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" }
  ]
};

export const contactInfo: ContactInfo = {
  address: "Jl. Pasir Luyu Hilir No.33, Pasirluyu, Kec. Regol, Kota Bandung, Jawa Barat 40254",
  phone: "+62 812 3456 7890",
  phoneUrl: "https://wa.me/6281234567890",
  email: "contact@adana.com",
  emailUrl: "mailto:contact@adana.com"
};

export const companyInfo: CompanyInfo = {
  name: "Adana Digital",
  copyright: "© 2025 Adana Digital. All Right Reserved"
};