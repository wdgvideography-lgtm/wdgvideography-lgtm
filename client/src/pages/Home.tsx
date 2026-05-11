/**
 * WDG Videography - Home Page
 * Flow: Video Intro → Camera Video (with logo on last frame) → Main Site
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

type Phase = "intro" | "camera" | "site";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    // Check if user has seen the intros this session
    const seen = sessionStorage.getItem("wdg-intro-seen");
    if (seen) {
      setPhase("site");
    }
  }, []);

  const handleIntroComplete = () => {
    setPhase("camera");
  };

  const handleCameraComplete = () => {
    setPhase("site");
    sessionStorage.setItem("wdg-intro-seen", "true");
  };

  return (
    <>
      {/* Phase 1: Video Intro */}
      {phase === "intro" && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Phase 2: Camera Video with logo on last frame */}
      {phase === "camera" && (
        <CameraBreakdown onComplete={handleCameraComplete} />
      )}

      {/* Phase 3: Main Site */}
      {phase === "site" && (
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
