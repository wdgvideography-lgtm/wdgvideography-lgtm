/**
 * WDG Videography - Home Page
 * Design: Noir Cinema — Neo-Noir Cinematography meets Swiss Brutalist Typography
 * Dark obsidian background with warm amber/gold accents
 * GSAP scroll animations, parallax depth, cinematic reveals
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ShowreelStrip from "@/components/ShowreelStrip";
import MarketingSection from "@/components/MarketingSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background overflow-hidden">
        <FilmGrainOverlay />
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ShowreelStrip />
        <MarketingSection />
        <ProcessSection />
        <CTASection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
