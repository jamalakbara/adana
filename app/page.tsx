import { Navbar } from "@/components/ui/navbar";
import { Breadcrumbs, homeBreadcrumbs } from "@/components/ui/breadcrumbs";
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
      <header>
        <Navbar />
      </header>

      <main id="content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={homeBreadcrumbs} />
        </div>

        <section aria-labelledby="hero-heading">
          <HeroSection />
        </section>

        <section aria-labelledby="clients-heading">
          <MarqueeClients />
        </section>

        <section aria-labelledby="about-heading">
          <AboutSection />
        </section>

        <section aria-labelledby="services-heading">
          <ServicesSection />
        </section>

        <section aria-labelledby="portfolio-heading">
          <PortfolioSection />
        </section>

        <section aria-labelledby="partners-heading">
          <DigitalPartner />
        </section>

        <section aria-labelledby="cta-heading">
          <CtaSection />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}