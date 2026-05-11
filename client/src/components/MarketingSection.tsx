/**
 * Marketing Management Section — Noir Cinema Design
 * Split layout with parallax image and staggered content reveals
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARKETING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/marketing-bg-2mbH7FzBg8iW7WUq3LdfyV.webp";

const marketingServices = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Social Media",
    description: "Strategic content planning and posting across all platforms.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Website Design",
    description: "Custom websites that convert visitors into customers.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Brand Strategy",
    description: "Building a visual identity that sets you apart.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Content Creation",
    description: "Reels, videos, and visuals that stop the scroll.",
  },
];

export default function MarketingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const ctx = gsap.context(() => {
      // Parallax on the background image
      gsap.fromTo(
        image,
        { y: 60, scale: 1.08 },
        {
          y: -60,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="marketing"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background with parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
          <img src={MARKETING_BG} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4"
            >
              Full-Service
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.1]"
            >
              Marketing Management{" "}
              <span className="text-gradient-gold">Services</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground font-body text-lg leading-relaxed mb-4"
            >
              We manage your entire digital presence — from social media to websites — ensuring your brand's image is perfectly portrayed. Our targeted strategies are tailored to your business, aligning with your vision to deliver the results you actually need.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground/80 font-body leading-relaxed mb-10"
            >
              We don't just post; we strategise, tailoring our services and providing real results for your business.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="/contact?service=social-media"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)] group"
            >
              Book a Marketing Meeting
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Right - Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {marketingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="relative p-6 lg:p-7 rounded-sm border border-border/40 bg-card/30 backdrop-blur-sm hover:border-gold/30 hover:bg-card/50 transition-all duration-500 group overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-sm border border-gold/20 bg-gold/5 flex items-center justify-center text-gold mb-5 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
