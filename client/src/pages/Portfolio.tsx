/**
 * Portfolio Page — WDG Videography
 * Showcases client work: videos, photos, categories
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

const VIDEO_1 = "https://base44.app/api/apps/6a0c1534017166f536b1ac32/files/mp/public/6a0c1534017166f536b1ac32/b7e4e37a3_88918947c_video_1457891288982719.mp4";
const VIDEO_2 = "https://base44.app/api/apps/6a0c1534017166f536b1ac32/files/mp/public/6a0c1534017166f536b1ac32/1978d3aa0_b1c2d9cbb_video_1650157482769766.mp4";

type Category = "all" | "brand" | "social" | "event";

interface PortfolioItem {
  id: string;
  type: "video";
  src: string;
  title: string;
  client: string;
  category: Category;
  aspect: "landscape" | "portrait";
  description: string;
}

const items: PortfolioItem[] = [
  {
    id: "v1",
    type: "video",
    src: VIDEO_1,
    title: "Brand Showreel",
    client: "WDG Videography",
    category: "brand",
    aspect: "landscape",
    description: "Cinematic production showcase",
  },
  {
    id: "v2",
    type: "video",
    src: VIDEO_2,
    title: "Social Content",
    client: "WDG Videography",
    category: "social",
    aspect: "portrait",
    description: "Short-form vertical content",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all",    label: "All Work" },
  { id: "brand",  label: "Brand Films" },
  { id: "social", label: "Social Content" },
  { id: "event",  label: "Events" },
];

function VideoCard({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-sm border border-border/20 hover:border-gold/30 transition-all duration-500 bg-card/20 ${item.aspect === "portrait" ? "row-span-2" : ""}`}
    >
      {/* Video thumbnail — paused, shows first frame */}
      <div className={`relative w-full overflow-hidden ${item.aspect === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}>
        <video
          src={item.src}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          playsInline
          preload="metadata"
          onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={e => {
            const v = e.currentTarget as HTMLVideoElement;
            v.pause();
            v.currentTime = 0;
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-black/50 border border-gold/40 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] text-gold font-body tracking-[0.25em] uppercase mb-1">{item.client}</p>
        <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
        <p className="text-xs text-muted-foreground font-body mt-1">{item.description}</p>
      </div>

      {/* Expand icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-sm bg-black/60 border border-gold/30 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function LightboxModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className={`relative w-full bg-card/10 border border-border/20 rounded-sm overflow-hidden ${item.aspect === "portrait" ? "max-w-sm" : "max-w-5xl"}`}
        >
          <video
            src={item.src}
            className="w-full"
            controls
            autoPlay
            playsInline
          />
          <div className="p-5">
            <p className="text-[10px] text-gold font-body tracking-[0.25em] uppercase mb-1">{item.client}</p>
            <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">{item.description}</p>
          </div>
        </motion.div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border/40 bg-black/60 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = activeCategory === "all"
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <>
      <SEO
        title="Portfolio — WDG Videography"
        description="View our client work — brand films, social content, event coverage, and more. WDG Videography, Cheltenham."
        keywords="videography portfolio, brand films Cheltenham, social media video, WDG Videography work"
        canonicalUrl="https://www.wdgvideography.com/portfolio"
      />

      <div className="relative min-h-screen bg-background overflow-hidden">
        <FilmGrainOverlay />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-36 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.03] blur-[80px] pointer-events-none" />
          <div className="container text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4"
            >
              Our Work
            </motion.span>
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-tight"
              >
                Portfolio
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-muted-foreground font-body text-lg max-w-xl mx-auto"
            >
              A selection of our latest client work — from cinematic brand films to high-converting social content.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-xs font-body tracking-[0.2em] uppercase rounded-sm border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gold text-primary-foreground border-gold"
                    : "border-border/30 text-muted-foreground hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Grid */}
        <section className="container pb-28">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(item => (
                <VideoCard
                  key={item.id}
                  item={item}
                  onClick={() => setLightboxItem(item)}
                />
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 text-muted-foreground font-body"
              >
                No work in this category yet — check back soon.
              </motion.div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 text-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto mb-8" />
            <p className="text-muted-foreground font-body mb-6">Ready to create something like this?</p>
            <a
              href="/contact?service=consultation"
              className="inline-flex items-center px-8 py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_40px_oklch(0.78_0.12_75/0.5)]"
            >
              Book a Free Consultation
            </a>
          </motion.div>
        </section>

        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  );
}
