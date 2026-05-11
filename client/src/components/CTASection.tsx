/**
 * CTA Section — Noir Cinema Design
 * About section + dramatic CTA with bokeh background
 * Scroll-triggered text reveals and parallax depth
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/cta-bg-WCke8jvRoA77RQEvuDjxXM.webp";
const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/about-bg-LoxoCYvwss2gdFWhhP58Sg.webp";

export default function CTASection() {
  const ctaRef = useRef<HTMLElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    const ctaBg = ctaBgRef.current;
    if (!cta || !ctaBg) return;

    const ctx = gsap.context(() => {
      // Parallax on CTA background
      gsap.fromTo(
        ctaBg,
        { scale: 1.2, y: 50 },
        {
          scale: 1,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: cta,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, cta);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* About / Who We Are Section */}
      <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={ABOUT_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        <div className="relative container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-6"
            >
              Who We Are
            </motion.span>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Cinematic storytelling,
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold leading-tight"
              >
                crafted for growth.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-3xl mx-auto"
            >
              Based in Cheltenham, Gloucestershire, WDG Videography delivers high-end cinematic production
              paired with full-scale digital management. We work with businesses of all sizes to create
              compelling visual content that drives real results.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground/80 font-body leading-relaxed max-w-3xl mx-auto"
            >
              From single-day shoots to full brand overhauls, our team brings a filmmaker's eye and a
              marketer's mind to every project. We don't just capture moments — we build the frameworks
              that drive real business results.
            </motion.p>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        ref={ctaRef}
        className="relative py-28 lg:py-44 overflow-hidden"
      >
        {/* Parallax Background */}
        <div ref={ctaBgRef} className="absolute inset-0 -top-20 -bottom-20">
          <img src={CTA_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-6"
          >
            Let's Talk
          </motion.span>

          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95]"
            >
              Big Ideas,
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-gold leading-[0.95]"
            >
              Real Impact.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed mb-12"
          >
            By booking a consultation, we can build you a brand image and work out exactly what you want
            to portray before the shoot. It's also a great way for us to help you understand what we can do for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="mailto:wdg.videography@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-10 py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm shadow-[0_0_20px_oklch(0.78_0.12_75/0.2)] hover:shadow-[0_0_50px_oklch(0.78_0.12_75/0.5)] transition-all duration-500"
            >
              Book a Consultation
            </motion.a>
            <motion.a
              href="mailto:wdg.videography@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-10 py-4 border border-gold/30 text-gold font-body font-medium text-sm tracking-wide rounded-sm hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 backdrop-blur-sm"
            >
              Email Us Directly
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
