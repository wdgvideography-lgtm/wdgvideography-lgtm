/**
 * Hero Section — Noir Cinema Design
 * Full-viewport cinematic hero with parallax background,
 * scroll-linked text transforms, and dramatic entrance animations
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/hero-bg-eDByuz2aV74bwBnYkP7UgL.webp";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const parallax = parallaxRef.current;
    const overlay = overlayRef.current;
    if (!section || !heading || !parallax || !overlay) return;

    const ctx = gsap.context(() => {
      // Parallax background movement
      gsap.to(parallax, {
        y: 200,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Heading fades and moves up on scroll
      gsap.to(heading, {
        y: -120,
        opacity: 0,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "15% top",
          end: "70% top",
          scrub: 1,
        },
      });

      // Overlay darkens on scroll
      gsap.to(overlay, {
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "30% top",
          end: "100% top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={parallaxRef} className="absolute inset-0 -top-24 -bottom-24 scale-105">
        <img
          src={HERO_BG}
          alt="Cinematic production studio"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
      <div ref={overlayRef} className="absolute inset-0 bg-background opacity-0" />

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)"
      }} />

      {/* Content */}
      <div ref={headingRef} className="relative z-10 container pt-20">
        <div className="max-w-4xl">
          {/* Location Badge */}
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

          {/* Main Heading with staggered character reveal */}
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

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-body"
          >
            High-end cinematic production paired with full-scale digital management.
            We don't just capture moments — we build the frameworks that drive real business results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/contact"
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
        <span className="text-[10px] text-muted-foreground/60 font-body tracking-[0.3em] uppercase">
          Scroll
        </span>
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

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
