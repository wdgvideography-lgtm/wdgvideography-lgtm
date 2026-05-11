/**
 * Process Section — Noir Cinema Design
 * Horizontal scroll-triggered process steps with connecting lines
 */

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We discuss your vision, goals, and brand identity to craft the perfect plan.",
  },
  {
    number: "02",
    title: "Pre-Production",
    description: "Storyboarding, location scouting, and creative direction tailored to your brand.",
  },
  {
    number: "03",
    title: "Production",
    description: "Professional cinematic filming with high-end equipment and expert direction.",
  },
  {
    number: "04",
    title: "Post & Delivery",
    description: "Colour grading, editing, and final delivery of polished content ready to deploy.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Our Process
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-center group"
            >
              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border border-gold/30 bg-background mb-6 group-hover:border-gold/60 group-hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.15)] transition-all duration-500">
                <span className="font-mono text-lg font-bold text-gold">
                  {step.number}
                </span>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border border-gold/10 animate-ping opacity-0 group-hover:opacity-30" style={{ animationDuration: "2s" }} />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
