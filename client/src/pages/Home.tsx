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
import SEO from "@/components/SEO";

type Phase = "intro" | "camera" | "site";

/** Safe sessionStorage wrapper — private browsing / Safari ITP can throw */
function getSessionItem(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionItem(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Silently fail — user still gets the full site
  }
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    const seen = getSessionItem("wdg-intro-seen");
    if (seen) {
      setPhase("site");
    }
  }, []);

  const handleIntroComplete = () => {
    setPhase("camera");
  };

  const handleCameraComplete = () => {
    setPhase("site");
    setSessionItem("wdg-intro-seen", "true");
  };

  return (
    <>
      <SEO
        title="Cinematic Video Production & Marketing in Cheltenham"
        description="WDG Videography offers high-end cinematic video production, brand videos, social media content, website design, and full-scale digital marketing. Based in Cheltenham, Gloucestershire. Serving businesses across the UK."
        keywords="videography Cheltenham, video production Gloucestershire, cinematic video production, brand videos, social media content creation, corporate video, promotional video, marketing agency Cheltenham, website design Cheltenham, digital marketing Gloucestershire, WDG Videography"
        canonicalUrl="https://www.wdgvideography.com/"
      />

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
