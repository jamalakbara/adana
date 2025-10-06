import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeClients } from "@/components/home/marquee-clients";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { DigitalPartner } from "@/components/home/digital-partner";
import { CtaSection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcf4]">
      <Navbar />
      <div id="content">
        <HeroSection />
        <MarqueeClients />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <DigitalPartner />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
}