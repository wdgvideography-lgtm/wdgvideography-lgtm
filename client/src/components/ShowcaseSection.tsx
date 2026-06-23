/**
 * ShowcaseSection — Three-section portfolio sneak peek
 * Tabs: Promo Videos | Websites | Products
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

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
    screenshot: "/assets/site-gilder.jpg",
  },
  {
    name: "V.C. Estate Planning",
    category: "Legal & Financial",
    url: "https://www.vcestateplanning.com",
    screenshot: "/assets/site-vc.jpg",
  },
  {
    name: "AMC Transport Solutions",
    category: "Transport & Drainage",
    url: "https://www.amc-transport.com",
    screenshot: "/assets/site-amc.jpg",
  },
];

const productImages = [
  { src: "/assets/product-whisky.png",   label: "Premium Spirits" },
  { src: "/assets/product-perfume.png",  label: "Luxury Fragrance" },
  { src: "/assets/product-skincare.png", label: "Skincare Range" },
  { src: "/assets/product-coffee.png",   label: "Artisan Coffee" },
  { src: "/assets/product-watch.png",    label: "Premium Timepiece" },
  { src: "/assets/product-handbag.png",  label: "Luxury Fashion" },
];

const TABS: [Tab, string][] = [
  ["video",   "Promo Videos"],
  ["web",     "Websites"],
  ["product", "Products"],
];

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
                    className="group relative overflow-hidden rounded-sm bg-card/40 aspect-[9/16]"
                  >
                    <video
                      src={v.src}
                      poster={v.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
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
                  <motion.div
                    key={project.url}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="flex flex-col gap-3"
                  >
                    {/* Screenshot */}
                    <div className="group relative overflow-hidden rounded-sm border border-border/30 bg-card/40">
                      <img
                        src={project.screenshot}
                        alt={project.name}
                        className="w-full object-cover aspect-video transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-sm" />
                    </div>
                    {/* Label + link */}
                    <div className="flex items-start justify-between px-1">
                      <div>
                        <p className="text-xs font-body text-gold tracking-[0.2em] uppercase mb-0.5">{project.category}</p>
                        <p className="font-display text-base font-semibold text-foreground">{project.name}</p>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gold text-xs font-body font-medium hover:text-gold/80 transition-colors mt-1 shrink-0"
                      >
                        View site
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {productImages.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-sm bg-card/40 aspect-square"
                  >
                    <img
                      src={img.src} alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-body text-sm font-medium">{img.label}</p>
                      <p className="text-gold text-xs font-body mt-0.5">From £25 / image</p>
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
