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
    description: `<p>Cloxvox is a women’s sandal brand that began by focusing on the Indonesian market. The brand is dedicated to creating high-quality footwear with a strong emphasis on unique and original heel designs. Combining style, comfort, and durability, Cloxvox aims to meet the needs of modern women looking for both fashion and function</p>
<br>
<ul>
  <li>Category: Fashion </li>
  <li>Objectives: Full </li>
  <li>Channels: Meta Ads, Google Ads, Marketplace Ads </li>
  <li>Achievements: Market Expansion to Singapore and Malaysia ROAS Performance up to 45</li>
</ul>`,
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
    description: `<p>World ID is a digital identity system developed by Tools for Humanity and backed by Worldcoin. It allows people to prove they are unique humans online using biometric data, like iris scans, without sharing personal information. This helps protect against bots and fake accounts in a growing digital world.</p>
<br>
<p>During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.</p>
<br>
<ul>
  <li>Category: Technology </li>
  <li>Objectives: Launch </li>
  <li>Channels: Meta Ads, Google Ads, Tiktok Ads </li>
  <li>Achievements: Market Expansion to Indonesia, with 3000++ downloads, with CPC less than Rp 300</li>
</ul>`,
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
    description: `<p>Buttonscarves is a homegrown Indonesian brand, established in 2016. They've grown from just scarves to a full fashion and lifestyle brand. Their focus is on providing premium quality materials and design for hijabs, scarves, and womenswear. </p>
<br>
<p>They have a strong presence in Indonesia with 25 stores across the country and also building their brand recognition also in digital media for their target audience.</p>
<br>
<li>Category: Fashion </li>
<li>Objectives: Full </li>
<li>Channels: Meta Ads, Google Ads, Marketplace Ads </li>
<li>Achievements: Achieved ROAS 15X on Social Ads up to 10X on Marketplace Ads</li>`,
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    logo: "/Portfolio/button-scarved-logo.png",
    backgroundImage: "/Portfolio/button-scarved.png",
  },
  {
    id: 4,
    category: "Food and Beverage Industry",
    client: "Slab - Steak Lab",
    description: `<p>Steak Lab (SLAB) is a boutique steakhouse based in South Jakarta, known for offering premium yet affordable steak cuts like Picanha and Flat Iron. Guests can customize their meal with house-made butters and sauces, and the steaks are uniquely finished with a torch at the table for extra flavor and flair.</p>
<br>
<p>Growing together with Adana Digital, SLAB focusing their digital strategy trough out Google Ads, Meta, and Tiktok Ads to excel their offline traffic</p>
<br>
<ul>
  <li>Category: Food and Beverage Industry </li>
  <li>Objectives: Offline Traffic </li>
  <li>Channels: Meta Ads, Google Ads, Tiktok Ads </li>
  <li>Achievements: Achieved Highest Traffic All Time, Google Ads CPC Rp 500,Meta CP WhatsApp Reservation < Rp  10,000
</li>
</ul>`,
    bgColor: "bg-[#334e4d]",
    textColor: "text-white",
    logo: "/Portfolio/slab-logo.png",
    backgroundImage: "/Portfolio/slab.png",
  },
];