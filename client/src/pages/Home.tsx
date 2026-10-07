/**
 * WDG Videography — Home (2026 editorial redesign).
 * Each section is wrapped in a silent ErrorBoundary so one crash never kills the page.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import WorkShowcase from "@/components/home/WorkShowcase";
import Websites from "@/components/home/Websites";
import PhoneFan from "@/components/home/PhoneFan";
import ColourGrade from "@/components/home/ColourGrade";
import Services, { Prices } from "@/components/home/Services";
import { Marquee, Apps } from "@/components/home/Closing";
import Journey from "@/components/home/Journey";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <SEO
        title="Cinematic Video Production & Marketing in Cheltenham"
        description="WDG Videography offers high-end cinematic video production, brand videos, social media content, website design, custom app development, and full-scale digital marketing. Based in Cheltenham, Gloucestershire."
        keywords="videography Cheltenham, app development Cheltenham, video production Gloucestershire, cinematic video production, brand videos, social media content creation, corporate video, promotional video, marketing agency Cheltenham, website design Cheltenham, digital marketing Gloucestershire, WDG Videography"
        canonicalUrl="https://www.wdgvideography.com/"
      />
      <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
        <ErrorBoundary silent><Navbar /></ErrorBoundary>
        <main>
          <ErrorBoundary silent><Hero /></ErrorBoundary>
          <ErrorBoundary silent><Intro /></ErrorBoundary>
          <ErrorBoundary silent><WorkShowcase /></ErrorBoundary>
        <ErrorBoundary silent><Websites /></ErrorBoundary>
          <ErrorBoundary silent><PhoneFan /></ErrorBoundary>
          <ErrorBoundary silent><Marquee /></ErrorBoundary>
          <ErrorBoundary silent><ColourGrade /></ErrorBoundary>
          <ErrorBoundary silent><Services /></ErrorBoundary>
          <ErrorBoundary silent><Prices /></ErrorBoundary>
          <ErrorBoundary silent><Apps /></ErrorBoundary>
          <ErrorBoundary silent><Journey /></ErrorBoundary>
          <ErrorBoundary silent><CTA /></ErrorBoundary>
        </main>
        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>
    </>
  );
}
