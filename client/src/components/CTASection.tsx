/**
 * CTA Section — Noir Cinema Design
 * Parallax via passive scroll listener only. No GSAP.
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CTA_BG   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/cta-bg-WCke8jvRoA77RQEvuDjxXM.webp";
const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/about-bg-LoxoCYvwss2gdFWhhP58Sg.webp";

export default function CTASection() {
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaBgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ctaSectionRef.current;
    const bg      = ctaBgRef.current;
    if (!section || !bg) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect   = section.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.25;
        bg.style.transform = `translateZ(0) translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* About Section */}
      <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_BG} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20"
               onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0 bg-background/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-6">
              Who We Are
            </motion.span>
            <div className="overflow-hidden mb-4">
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Cinematic storytelling,
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold leading-tight">
                crafted for growth.
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-3xl mx-auto">
              Based in Cheltenham, Gloucestershire, WDG Videography delivers high-end cinematic production paired with full-scale digital management. We work with businesses of all sizes to create compelling visual content that drives real results.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }} className="text-muted-foreground/80 font-body leading-relaxed max-w-3xl mx-auto">
              From single-day shoots to full brand overhauls, our team brings a filmmaker's eye and a marketer's mind to every project. We don't just capture moments — we build the frameworks that drive real business results.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" ref={ctaSectionRef} className="relative py-28 lg:py-44 overflow-hidden">
        <div ref={ctaBgRef} className="absolute inset-0 -top-20 -bottom-20" style={{ willChange: "transform", transform: "translateZ(0)" }}>
          <img src={CTA_BG} alt="" aria-hidden="true" className="w-full h-full object-cover"
               onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[100px]" />
        </div>

        <div className="relative container text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-6">
            Let's Talk
          </motion.span>
          <div className="overflow-hidden mb-2">
            <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95]">
              Big Ideas,
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-gold leading-[0.95]">
              Real Impact.
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed mb-12">
            By booking a consultation, you'll work directly with our team to build a tailored plan. No templates, no guesswork — just results.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-wrap gap-4 justify-center">
            <a href="/contact?service=consultation" className="group relative inline-flex items-center px-10 py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_oklch(0.78_0.12_75/0.5)]">
              <span className="relative z-10">Book a Free Consultation</span>
              <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            <a href="tel:+447584065559" className="inline-flex items-center px-10 py-4 border border-gold/30 text-gold font-body font-medium text-sm tracking-wide rounded-sm hover:bg-gold/10 hover:border-gold/60 transition-all duration-300">
              Call Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
