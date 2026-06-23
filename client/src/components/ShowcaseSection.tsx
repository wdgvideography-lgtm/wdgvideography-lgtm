/**
 * ShowcaseSection — Three-section portfolio sneak peek
 * Tabs: Promo Videos | Websites | Products
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type Tab = "video" | "web" | "product";

const promoVideos = [
  { poster: "/portfolio/poster-1.jpg",  src: "/portfolio/showreel-1.mp4",  label: "Brand Showreel" },
  { poster: "/portfolio/poster-2.jpg",  src: "/portfolio/showreel-2.mp4",  label: "Brand Film" },
  { poster: "/portfolio/poster-3.jpg",  src: "/portfolio/showreel-3.mp4",  label: "Social Reel" },
  { poster: "/portfolio/poster-5.jpg",  src: "/portfolio/showreel-5.mp4",  label: "Brand Film" },
  { poster: "/portfolio/poster-6.jpg",  src: "/portfolio/showreel-6.mp4",  label: "Social Content" },
  { poster: "/portfolio/poster-10.jpg", src: "/portfolio/showreel-10.mp4", label: "Event Coverage" },
];

const webProjects = [
  {
    name: "Gordon Gilder Transport",
    category: "Haulage & Logistics",
    url: "https://gildertrans-cgmcjhhz.manus.space",
    description: "Cinematic intro, fleet showcase and service pages for a fourth-generation family haulage company.",
  },
  {
    name: "V.C. Estate Planning",
    category: "Legal & Financial",
    url: "https://www.vcestateplanning.com",
    description: "Warm, trust-focused website with bespoke branding, consultation booking and service breakdowns.",
  },
  {
    name: "AMC Transport Solutions",
    category: "Transport & Drainage",
    url: "https://www.amc-transport.com",
    description: "Bold, professional site for a 24/7 drainage and bulk transport company with gallery and contact system.",
  },
];

const productImages = [
  { poster: "/portfolio/poster-7.jpg",  label: "Cinematic Film" },
  { poster: "/portfolio/poster-8.jpg",  label: "Social Reel" },
  { poster: "/portfolio/poster-11.jpg", label: "Brand Content" },
];

const TABS: [Tab, string][] = [
  ["video",   "Promo Videos"],
  ["web",     "Websites"],
  ["product", "Products"],
];

function PlayIcon() {
  return (
    <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<Tab>("video");

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
            Promotional video, bespoke web design, and studio product content — all under one roof.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 rounded-sm border border-border/40 bg-card/30 backdrop-blur-sm">
            {TABS.map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-body font-medium tracking-wide rounded-sm transition-all duration-300 ${
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

          {/* ── PROMO VIDEOS ── */}
          {activeTab === "video" && (
            <motion.div key="video"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
                {promoVideos.map((v, i) => (
                  <motion.div
                    key={v.src}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }}
                    className="group relative overflow-hidden rounded-sm cursor-pointer bg-card/40 aspect-[9/16]"
                  >
                    <img
                      src={v.poster} alt={v.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-body text-xs font-medium">{v.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-gold text-sm font-body font-medium hover:text-gold/80 transition-colors"
                >
                  View full portfolio →
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── WEBSITES ── */}
          {activeTab === "web" && (
            <motion.div key="web"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {webProjects.map((project, i) => (
                  <motion.a
                    key={project.url}
                    href={project.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="group relative block rounded-sm border border-border/40 bg-card/40 hover:border-gold/30 hover:bg-card/60 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="p-6 lg:p-7">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-body text-gold tracking-[0.2em] uppercase">{project.category}</span>
                          <h3 className="font-display text-xl font-semibold text-foreground mt-1">{project.name}</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-300">
                          <ExternalIcon />
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
              <div className="text-center mt-8">
                <a
                  href="/contact?service=website-design"
                  className="inline-flex items-center gap-2 text-gold text-sm font-body font-medium hover:text-gold/80 transition-colors"
                >
                  Get a quote for your website →
                </a>
              </div>
            </motion.div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === "product" && (
            <motion.div key="product"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {productImages.map((img, i) => (
                  <motion.div
                    key={img.poster}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-sm bg-card/40 aspect-square"
                  >
                    <img
                      src={img.poster} alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-body text-sm font-medium">{img.label}</p>
                      <p className="text-gold text-xs font-body mt-0.5">From £25/image</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="text-center text-muted-foreground font-body text-sm mt-8"
              >
                Studio product photography from £25/image.{" "}
                <a href="/contact?service=product-photography" className="text-gold hover:text-gold/80 transition-colors">
                  Book a shoot →
                </a>
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
