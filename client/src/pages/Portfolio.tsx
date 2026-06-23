/**
 * Portfolio Page — WDG Videography
 *
 * VIDEO HOSTING NOTE:
 * All portfolio videos must be self-hosted. Place your .mp4 files and poster
 * .jpg thumbnails in /public/portfolio/ and update the `items` array below.
 *
 * Each entry needs:
 *   src:    "/portfolio/your-video.mp4"
 *   poster: "/portfolio/your-poster.jpg"   (recommended: a 2-second frame)
 *
 * The previous base44.app CDN URLs are no longer active (404).
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

type Category = "all" | "brand" | "social" | "event";

interface PortfolioItem {
  id: string;
  src: string;
  poster: string;
  title: string;
  client: string;
  category: Category;
  aspect: "landscape" | "portrait";
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ADD YOUR VIDEOS HERE
 * Place files in /public/portfolio/ and reference them as "/portfolio/name.mp4"
 *
 * Example:
 *   { id: "v1", src: "/portfolio/brand-shoot-acme.mp4",
 *     poster: "/portfolio/brand-shoot-acme-poster.jpg",
 *     title: "Acme Brand Film", client: "Acme Ltd",
 *     category: "brand", aspect: "portrait" },
 * ─────────────────────────────────────────────────────────────────────────────
 */
const items: PortfolioItem[] = [
  {
    id: "v1",
    src: "/portfolio/showreel-1.mp4",
    poster: "/portfolio/poster-1.jpg",
    title: "Brand Showreel",
    client: "WDG Videography",
    category: "brand",
    aspect: "landscape",
  },
  {
    id: "v2",
    src: "/portfolio/showreel-2.mp4",
    poster: "/portfolio/poster-2.jpg",
    title: "Brand Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "landscape",
  },
  {
    id: "v3",
    src: "/portfolio/showreel-3.mp4",
    poster: "/portfolio/poster-2.jpg",
    title: "Event Film",
    client: "WDG Videography",
    category: "event",
    aspect: "landscape",
  },
  {
    id: "v4",
    src: "/portfolio/showreel-4.mp4",
    poster: "/portfolio/poster-1.jpg",
    title: "Social Reel",
    client: "WDG Videography",
    category: "social",
    aspect: "landscape",
  },
  {
    id: "v5",
    src: "/portfolio/showreel-5.mp4",
    poster: "/portfolio/poster-2.jpg",
    title: "Brand Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "landscape",
  },
];

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-zinc-900"
      style={{ aspectRatio: item.aspect === "portrait" ? "9/16" : "16/9" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-semibold text-sm leading-tight">{item.title}</p>
        <p className="text-amber-400 text-xs mt-0.5">{item.client}</p>
      </div>
      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-sm w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            controls
            playsInline
            className="w-full rounded-lg"
            style={{ aspectRatio: item.aspect === "portrait" ? "9/16" : "16/9" }}
          />
          <div className="mt-3 text-center">
            <p className="text-white font-semibold">{item.title}</p>
            <p className="text-amber-400 text-sm">{item.client}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm"
          >
            ✕ Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function PortfolioEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <div className="w-16 h-px bg-gold/60 mx-auto mb-8" />
      <p className="text-gold text-xs font-body tracking-[0.3em] uppercase mb-4">
        Coming Soon
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
        Portfolio Being Updated
      </h2>
      <p className="text-muted-foreground font-body max-w-md leading-relaxed mb-8">
        Our latest client work is being prepared for this gallery. In the meantime,
        get in touch to discuss your project — we'd love to show you our work directly.
      </p>
      <a
        href="/contact"
        className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
      >
        Get In Touch
      </a>
      <div className="w-16 h-px bg-gold/60 mx-auto mt-8" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: "all",    label: "All Work" },
    { key: "brand",  label: "Brand Films" },
    { key: "social", label: "Social Content" },
    { key: "event",  label: "Events" },
  ];

  const filtered = activeCategory === "all" ? items : items.filter(i => i.category === activeCategory);
  const isEmpty = filtered.length === 0;

  return (
    <ErrorBoundary>
      <SEO
        title="Portfolio | WDG Videography"
        description="Our work — brand films, social content and event coverage across the UK."
        canonicalUrl="https://www.wdgvideography.com/portfolio"
      />
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <FilmGrainOverlay />

        {/* Hero */}
        <section className="pt-32 pb-12 px-6 text-center">
          <motion.p
            className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Our Work
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The Portfolio
          </motion.h1>
          <motion.p
            className="text-zinc-400 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Brand films, social content and event coverage — crafted to convert.
          </motion.p>
        </section>

        {/* Filter Tabs */}
        {!isEmpty && (
          <div className="flex justify-center gap-3 px-6 mb-10 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid or Empty State */}
        {isEmpty ? (
          <PortfolioEmpty />
        ) : (
          <section className="max-w-7xl mx-auto px-4 pb-24">
            <motion.div
              className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
              layout
            >
              {filtered.map(item => (
                <div key={item.id} className="break-inside-avoid">
                  <VideoCard item={item} onClick={() => setLightboxItem(item)} />
                </div>
              ))}
            </motion.div>
          </section>
        )}

        <Footer />
      </div>

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </ErrorBoundary>
  );
}
