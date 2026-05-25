/**
 * WDG Videography - Home Page
 * Each section wrapped in a silent ErrorBoundary so one crash never kills the page.
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
import ErrorBoundary from "@/components/ErrorBoundary";

type Phase = "intro" | "camera" | "site";

function getSessionItem(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function setSessionItem(key: string, value: string): void {
  try { sessionStorage.setItem(key, value); } catch { /* private browsing */ }
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    if (getSessionItem("wdg-intro-seen")) setPhase("site");
  }, []);

  const handleIntroComplete  = () => setPhase("camera");
  const handleCameraComplete = () => {
    setPhase("site");
    setSessionItem("wdg-intro-seen", "true");
  };

  return (
    <>
      <SEO
        title="Cinematic Video Production & Marketing in Cheltenham"
        description="WDG Videography offers high-end cinematic video production, brand videos, social media content, website design, and full-scale digital marketing. Based in Cheltenham, Gloucestershire."
        keywords="videography Cheltenham, video production Gloucestershire, cinematic video production, brand videos, social media content creation, corporate video, promotional video, marketing agency Cheltenham, website design Cheltenham, digital marketing Gloucestershire, WDG Videography"
        canonicalUrl="https://www.wdgvideography.com/"
      />

      {phase === "intro" && (
        <ErrorBoundary silent>
          <CinematicIntro onComplete={handleIntroComplete} />
        </ErrorBoundary>
      )}

      {phase === "camera" && (
        <ErrorBoundary silent>
          <CameraBreakdown onComplete={handleCameraComplete} />
        </ErrorBoundary>
      )}

      {phase === "site" && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-background overflow-hidden">
            <ErrorBoundary silent><FilmGrainOverlay /></ErrorBoundary>
            <ErrorBoundary silent><Navbar /></ErrorBoundary>
            <ErrorBoundary silent><HeroSection /></ErrorBoundary>
            <ErrorBoundary silent><ServicesSection /></ErrorBoundary>
            <ErrorBoundary silent><ShowreelStrip /></ErrorBoundary>
            <ErrorBoundary silent><MarketingSection /></ErrorBoundary>
            <ErrorBoundary silent><ProcessSection /></ErrorBoundary>
            <ErrorBoundary silent><CTASection /></ErrorBoundary>
            <ErrorBoundary silent><Footer /></ErrorBoundary>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
