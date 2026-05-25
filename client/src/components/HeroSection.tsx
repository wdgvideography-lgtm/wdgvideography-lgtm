/**
 * Hero Section — Noir Cinema Design
 * Parallax: pure CSS transform via single passive scroll listener (no GSAP on scroll path)
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/hero-bg-eDByuz2aV74bwBnYkP7UgL.webp";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (parallaxRef.current) {
          // Parallax: move bg at 40% of scroll speed
          parallaxRef.current.style.transform = `translateZ(0) translateY(${y * 0.4}px)`;
        }
        if (headingRef.current) {
          // Heading fades and rises as user scrolls
          const progress = Math.min(y / (window.innerHeight * 0.6), 1);
          headingRef.current.style.transform = `translateZ(0) translateY(${-progress * 80}px)`;
          headingRef.current.style.opacity = String(1 - progress);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-24 -bottom-24 scale-110"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <img
          src={HERO_BG}
          alt="Cinematic production studio"
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)"
      }} />

      {/* Content */}
      <div
        ref={headingRef}
        className="relative z-10 container pt-20"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-body text-gold tracking-[0.2em] uppercase">
              Cheltenham, Gloucestershire
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-tight text-foreground"
            >
              The Future of
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-tight text-foreground"
            >
              Your Business
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-tight text-gradient-gold"
            >
              Starts With Us.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-body"
          >
            High-end cinematic production paired with full-scale digital management.
            We don't just capture moments — we build the frameworks that drive real business results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/contact?service=consultation"
              className="group relative inline-flex items-center px-8 py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_oklch(0.78_0.12_75/0.5)]"
            >
              <span className="relative z-10">Book a Consultation</span>
              <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-8 py-4 border border-gold/30 text-gold font-body font-medium text-sm tracking-wide rounded-sm hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 backdrop-blur-sm"
            >
              Discover Our Services
              <svg className="ml-2 w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] text-muted-foreground/60 font-body tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-gold/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ height: ["20%", "60%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 rounded-full bg-gold/70"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
