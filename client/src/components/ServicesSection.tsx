/**
 * Services Section — Noir Cinema Design
 * Hardened: removed sectionRef.current! force-cast, null-safe GSAP scope
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ServiceTier {
  name: string;
  price: string;
  numericPrice: number;
  popular?: boolean;
  features: string[];
  serviceId: string;
}

const services: ServiceTier[] = [
  {
    name: "Basic Service",
    price: "£450",
    numericPrice: 450,
    serviceId: "basic-service",
    features: [
      "2 hour single location shoot",
      "10 miles of free travel",
      "1× 60 second video with 1 revision",
      "4× 15 second reels",
    ],
  },
  {
    name: "Business Growth",
    price: "£650",
    numericPrice: 650,
    popular: true,
    serviceId: "business-growth",
    features: [
      "4 hour shoot in up to 2 locations",
      "1× 2 min brand video",
      "Up to 2 revisions on brand video",
      "5× 15-30 second reels",
      "Up to 1 revision per reel",
    ],
  },
  {
    name: "Bespoke Project",
    price: "£1,200",
    numericPrice: 1200,
    serviceId: "bespoke-project",
    features: [
      "8 hour shoot in up to 3 locations",
      "Pre-production storyboarding meeting",
      "1× 3-5 min cinematic video",
      "Up to 4 revisions on main video",
      "8× 15-30 sec reels with 1 revision each",
    ],
  },
  {
    name: "Website Design",
    price: "£1,000 – £7,000",
    numericPrice: 1000,
    serviceId: "website-design",
    features: [
      "Custom-designed for your brand",
      "Mobile-responsive & fast-loading",
      "SEO-optimised from the ground up",
      "Conversion-focused layouts",
      "Price depends on each project",
    ],
  },
];

function AnimatedPrice({ price, numericPrice }: { price: string; numericPrice: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("£0");
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * numericPrice);

      if (progress < 1) {
        setDisplay("£" + currentVal.toLocaleString());
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(price);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [isInView, price, numericPrice]);

  return <span ref={ref}>{display}</span>;
}

function ServiceCard({ service, index }: { service: ServiceTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -12, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`relative group rounded-sm border backdrop-blur-sm transition-all duration-500 ${
        service.popular
          ? "border-gold/50 bg-gradient-to-b from-gold/8 to-gold/2 shadow-[0_0_60px_oklch(0.78_0.12_75/0.08)]"
          : "border-border/40 bg-card/40 hover:border-gold/30 hover:bg-card/60"
      }`}
    >
      {service.popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gold text-primary-foreground text-[10px] font-body font-bold tracking-[0.2em] uppercase rounded-sm shadow-[0_4px_20px_oklch(0.78_0.12_75/0.3)]"
        >
          Most Popular
        </motion.div>
      )}

      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-3">
            {service.name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted-foreground font-body uppercase tracking-wider">Starting at</span>
            <span className="font-mono text-2xl lg:text-3xl font-bold text-gold">
              <AnimatedPrice price={service.price} numericPrice={service.numericPrice} />
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <ul className="space-y-3">
          {service.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
              className="flex items-start gap-3"
            >
              <div className="w-4 h-4 mt-0.5 shrink-0 rounded-full border border-gold/40 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground font-body leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <a
          href={`/contact?service=${service.serviceId}`}
          className={`block w-full text-center py-3.5 font-body font-medium text-sm tracking-wide rounded-sm transition-all duration-500 ${
            service.popular
              ? "bg-gold text-primary-foreground hover:bg-gold-light hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
              : "border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60"
          }`}
        >
          Request a Booking
        </a>
      </div>

      <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent rounded-sm" />
        <div className="absolute inset-px rounded-sm border border-gold/10" />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {



  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.02] blur-[120px]" />
      </div>

      <div className="relative container">
        <div className="text-center mb-16 lg:mb-24">
          <motion.span initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
            Our Services
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Discover Our Services
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Structured service tiers designed to scale with your business. From a targeted boost to a complete digital overhaul.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
