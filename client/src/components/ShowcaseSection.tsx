/**
 * ShowcaseSection — Product Photography & Web Design Portfolio
 * Tabbed layout: Photography | Web Design
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "photography" | "web";

const productImages = [
  { src: "/assets/product-whisky.png",   label: "Premium Spirits",   style: "Dark Luxury Studio" },
  { src: "/assets/product-perfume.png",  label: "Luxury Fragrance",  style: "Clean White Studio" },
  { src: "/assets/product-skincare.png", label: "Skincare Range",    style: "Moody Lifestyle" },
  { src: "/assets/product-coffee.png",   label: "Artisan Coffee",    style: "Warm Lifestyle" },
  { src: "/assets/product-watch.png",    label: "Premium Timepiece", style: "Dramatic Dark Studio" },
  { src: "/assets/product-handbag.png",  label: "Luxury Fashion",    style: "Pastel Editorial" },
];

const webProjects = [
  {
    name: "Gordon Gilder Transport",
    category: "Haulage & Logistics",
    url: "https://gildertrans-cgmcjhhz.manus.space",
    description: "Full cinematic intro, fleet showcase and service pages for a fourth-generation family haulage company.",
    accent: "#1a472a",
  },
  {
    name: "V.C. Estate Planning",
    category: "Legal & Financial",
    url: "https://www.vcestateplanning.com",
    description: "Warm, trust-focused website with bespoke branding, consultation booking and service breakdowns.",
    accent: "#2d4a3e",
  },
  {
    name: "AMC Transport Solutions",
    category: "Transport & Drainage",
    url: "https://www.amc-transport.com",
    description: "Bold, professional site for a 24/7 drainage and bulk transport company with gallery and contact system.",
    accent: "#1a2a4a",
  },
];

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<Tab>("photography");
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="showcase" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-gold/[0.015] blur-[100px]" />
      </div>

      <div className="relative container">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground font-body text-lg max-w-2xl mx-auto"
          >
            From studio product photography to full bespoke web builds — here's what we do.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 rounded-sm border border-border/40 bg-card/30 backdrop-blur-sm">
            {([["photography", "Product Photography"], ["web", "Web Design"]] as [Tab, string][]).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-body font-medium tracking-wide rounded-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gold text-primary-foreground shadow-[0_2px_12px_oklch(0.78_0.12_75/0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "photography" && (
            <motion.div
              key="photography"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {productImages.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="group relative overflow-hidden rounded-sm cursor-pointer aspect-square bg-card/40"
                    onClick={() => setLightbox(img.src)}
                  >
                    <img
                      src={img.src} alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-display font-semibold text-sm">{img.label}</p>
                      <p className="text-gold text-xs font-body mt-0.5">{img.style}</p>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="text-center text-muted-foreground font-body text-sm mt-8"
              >
                All images produced in our Cheltenham studio. 
                <a href="/contact?service=product-photography" className="text-gold hover:text-gold-light ml-1 transition-colors">Book a shoot →</a>
              </motion.p>
            </motion.div>
          )}

          {activeTab === "web" && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {webProjects.map((project, i) => (
                  <motion.a
                    key={project.url}
                    href={project.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative block rounded-sm border border-border/40 bg-card/40 hover:border-gold/30 hover:bg-card/60 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    {/* Accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-6 lg:p-7">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-body text-gold tracking-[0.2em] uppercase">{project.category}</span>
                          <h3 className="font-display text-xl font-semibold text-foreground mt-1">{project.name}</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-300">
                          <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{project.description}</p>
                      <div className="mt-5 flex items-center gap-2 text-gold text-xs font-body font-medium">
                        <span>View live site</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="text-center text-muted-foreground font-body text-sm mt-8"
              >
                Want a site like these? 
                <a href="/contact?service=website-design" className="text-gold hover:text-gold-light ml-1 transition-colors">Get in touch →</a>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3 }}
              src={lightbox} alt="Product photography"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
