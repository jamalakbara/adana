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
    category: "Digital Media Buying",
    client: "Cloxvox",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-[#1e1e1e]",
    borderColor: "border-[#dedacf]",
    logo: "/logo-portofolio-1.png",
    backgroundImage: "/Portfolio/cloxvox.png",
  },
  {
    id: 2,
    category: "Digital Media Buying",
    client: "World ID",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    borderColor: "border-[#dedacf]",
    logo: "/Portfolio/world-coin-logo.png",
    backgroundImage: "/Portfolio/world-coin.png",
  },
  {
    id: 3,
    category: "Digital Media Buying",
    client: "Buttonscarves",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    logo: "/Portfolio/button-scarved-logo.png",
    backgroundImage: "/Portfolio/button-scarved.png",
  },
  {
    id: 4,
    category: "Digital Media Buying",
    client: "Slab - Steak Lab",
    description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    logo: "/Portfolio/slab-logo.png",
    backgroundImage: "/Portfolio/slab.png",
  },
];