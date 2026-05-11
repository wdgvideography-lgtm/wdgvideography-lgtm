/**
 * WDG Videography - Home Page
 * Design: Noir Cinema — Neo-Noir Cinematography meets Swiss Brutalist Typography
 * Dark obsidian background with warm amber/gold accents
 * GSAP scroll animations, parallax depth, cinematic reveals
 * Full-screen cinematic intro on first visit
 */

import { useState, useEffect } from "react";
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
import CinematicIntro from "@/components/CinematicIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro within the last 24 hours
    const lastSeen = localStorage.getItem("wdg-intro-seen");
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastSeen || Date.now() - parseInt(lastSeen) > twentyFourHours) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
    localStorage.setItem("wdg-intro-seen", Date.now().toString());
  };

  return (
    <>
      {/* Cinematic Intro */}
      {showIntro && !introComplete && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Main Site */}
      {introComplete && (
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
      )}
    </>
  );
}
