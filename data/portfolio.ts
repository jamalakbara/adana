export interface PortfolioItem {
  id: number;
  category: string;
  client: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  logo: string;
  backgroundImage?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: "Performance Marketing",
    client: "Cloxvox",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-[#1e1e1e]",
    borderColor: "border-[#dedacf]",
    logo: "/logo-portofolio-1.png",
    backgroundImage: "/portfolio-1.png",
  },
  {
    id: 2,
    category: "Performance Marketing",
    client: "World ID",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    borderColor: "border-[#dedacf]",
    logo: "/logo-portofolio-2.png",
    backgroundImage: "/portfolio-1.png",
  },
  {
    id: 3,
    category: "Digital Media Buying",
    client: "Telkomsel",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    logo: "/logo-portofolio-3.png",
    backgroundImage: "/portfolio-1.png",
  },
];