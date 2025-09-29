import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeClients } from "@/components/home/marquee-clients";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { DigitalPartner } from "@/components/home/digital-partner";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcf4]">
      <Navbar />
      <div id="content">
        <HeroSection />
        <MarqueeClients />
        <AboutSection />
        <ServicesSection />
        <DigitalPartner />
        <CtaSection />
      </div>
    </div>
  );
}