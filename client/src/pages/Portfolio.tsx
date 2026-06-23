/**
 * Portfolio Page — WDG Videography
 * Videos hosted in /public/portfolio/
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

const items: PortfolioItem[] = [
  { id: "v1",  src: "/portfolio/showreel-1.mp4",  poster: "/portfolio/poster-1.jpg",  title: "Brand Showreel", client: "WDG Videography", category: "brand",  aspect: "portrait" },
  { id: "v2",  src: "/portfolio/showreel-2.mp4",  poster: "/portfolio/poster-2.jpg",  title: "Brand Film",     client: "WDG Videography", category: "brand",  aspect: "portrait" },
  { id: "v3",  src: "/portfolio/showreel-3.mp4",  poster: "/portfolio/poster-3.jpg",  title: "Social Reel",    client: "WDG Videography", category: "social", aspect: "portrait" },
  { id: "v4",  src: "/portfolio/showreel-4.mp4",  poster: "/portfolio/poster-4.jpg",  title: "Event Film",     client: "WDG Videography", category: "event",  aspect: "landscape" },
  { id: "v5",  src: "/portfolio/showreel-5.mp4",  poster: "/portfolio/poster-5.jpg",  title: "Brand Film",     client: "WDG Videography", category: "brand",  aspect: "portrait" },
  { id: "v6",  src: "/portfolio/showreel-6.mp4",  poster: "/portfolio/poster-6.jpg",  title: "Social Reel",    client: "WDG Videography", category: "social", aspect: "portrait" },
  { id: "v7",  src: "/portfolio/showreel-7.mp4",  poster: "/portfolio/poster-7.jpg",  title: "Brand Film",     client: "WDG Videography", category: "brand",  aspect: "portrait" },
  { id: "v8",  src: "/portfolio/showreel-8.mp4",  poster: "/portfolio/poster-8.jpg",  title: "Social Reel",    client: "WDG Videography", category: "social", aspect: "portrait" },
  { id: "v9",  src: "/portfolio/showreel-9.mp4",  poster: "/portfolio/poster-9.jpg",  title: "Event Film",     client: "WDG Videography", category: "event",  aspect: "landscape" },
  { id: "v10", src: "/portfolio/showreel-10.mp4", poster: "/portfolio/poster-10.jpg", title: "Brand Showreel", client: "WDG Videography", category: "brand",  aspect: "portrait" },
  { id: "v11", src: "/portfolio/showreel-11.mp4", poster: "/portfolio/poster-11.jpg", title: "Social Reel",    client: "WDG Videography", category: "social", aspect: "portrait" },
];

// ── Video Card — no labels, clean ─────────────────────────────────────────────
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
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full"
          style={{ aspectRatio: item.aspect === "portrait" ? "9/16" : "16/9", maxHeight: "90vh" }}
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          onClick={e => e.stopPropagation()}
        >
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-body transition-colors"
          >
            ✕ Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function PortfolioEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-muted-foreground font-body text-lg">No videos in this category yet.</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: "all",    label: "All" },
    { key: "brand",  label: "Brand" },
    { key: "social", label: "Social" },
    { key: "event",  label: "Event" },
  ];

  const filtered = activeCategory === "all" ? items : items.filter(i => i.category === activeCategory);
  const isEmpty = filtered.length === 0;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground">
        <SEO
          title="Portfolio | WDG Videography"
          description="Browse WDG Videography's full portfolio of brand films, social reels, and event coverage across England."
        />
        <FilmGrainOverlay />
        <Navbar />

        {/* Header */}
        <section className="pt-32 pb-12 text-center">
          <motion.span
            className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Our Work
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
          >
            Portfolio
          </motion.h1>

          {/* Filter tabs */}
          <motion.div
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          >
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-5 py-2 text-sm font-body font-medium rounded-sm border transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gold text-background border-gold"
                    : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </section>

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
