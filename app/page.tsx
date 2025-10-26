import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeClients } from "@/components/home/marquee-clients";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { DigitalPartner } from "@/components/home/digital-partner";
import { CtaSection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

// Structured Data for Digital Agency
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Adana Digital Agency",
  "description": "A modern digital agency specializing in performance marketing, media buying, digital transformation, and marketplace management. We help brands grow with data-driven strategies across Meta Ads, Google Ads, TikTok, and more.",
  "url": "https://by-adana.vercel.app",
  "logo": "https://by-adana.vercel.app/adana-logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/adana-digital",
    "https://www.instagram.com/adanadigital"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62 812 3456 7890",
    "contactType": "customer service",
    "availableLanguage": ["English", "Indonesian"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jakarta, Indonesia",
    "addressCountry": "ID"
  },
  "services": [
    "Performance Marketing",
    "Social Media Advertising",
    "Marketplace Advertising",
    "Search Engine Marketing",
    "Digital Media Buying",
    "Corporate Training"
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#fcfcf4]">
        <Navbar />
        <main id="content">
          <section aria-labelledby="hero">
            <HeroSection />
          </section>
          <section aria-labelledby="clients">
            <MarqueeClients />
          </section>
          <section aria-labelledby="about">
            <AboutSection />
          </section>
          <section aria-labelledby="services">
            <ServicesSection />
          </section>
          <section aria-labelledby="portfolio">
            <PortfolioSection />
          </section>
          <section aria-labelledby="partners">
            <DigitalPartner />
          </section>
          <section aria-labelledby="contact">
            <CtaSection />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}