/**
 * WDG Videography - Home Page
 * Flow: Video Intro → Camera Breakdown (scroll) → Hero → Services → etc.
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
import CameraBreakdown from "@/components/CameraBreakdown";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const lastSeen = sessionStorage.getItem("wdg-intro-seen");
    if (!lastSeen) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
    sessionStorage.setItem("wdg-intro-seen", "true");
  };

  return (
    <>
      {/* Video Intro */}
      {showIntro && !introComplete && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Main Site */}
      {introComplete && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-background overflow-hidden">
            <FilmGrainOverlay />
            <Navbar />
            <CameraBreakdown />
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
