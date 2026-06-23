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
 *   {
    id: "v8",
    src: "/portfolio/showreel-8.mp4",
    poster: "/portfolio/poster-1.jpg",
    title: "Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "landscape",
  },
  { id: "v1", src: "/portfolio/brand-shoot-acme.mp4",
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
    aspect: "portrait",
  },
  {
    id: "v2",
    src: "/portfolio/showreel-2.mp4",
    poster: "/portfolio/poster-2.jpg",
    title: "Brand Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "portrait",
  },
  {
    id: "v3",
    src: "/portfolio/showreel-3.mp4",
    poster: "/portfolio/poster-3.jpg",
    title: "Social Reel",
    client: "WDG Videography",
    category: "social",
    aspect: "portrait",
  },
  {
    id: "v4",
    src: "/portfolio/showreel-4.mp4",
    poster: "/portfolio/poster-4.jpg",
    title: "Event Film",
    client: "WDG Videography",
    category: "event",
    aspect: "landscape",
  },
  {
    id: "v5",
    src: "/portfolio/showreel-5.mp4",
    poster: "/portfolio/poster-5.jpg",
    title: "Brand Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "portrait",
  },
  {
    id: "v6",
    src: "/portfolio/showreel-6.mp4",
    poster: "/portfolio/poster-6.jpg",
    title: "Social Reel",
    client: "WDG Videography",
    category: "social",
    aspect: "portrait",
  },
  {
    id: "v7",
    src: "/portfolio/showreel-7.mp4",
    poster: "/portfolio/poster-7.jpg",
    title: "Brand Film",
    client: "WDG Videography",
    category: "brand",
    aspect: "portrait",
  },
  {
    id: "v8",
    src: "/portfolio/showreel-8.mp4",
    poster: "/portfolio/poster-8.jpg",
    title: "Social Reel",
    client: "WDG Videography",
    category: "social",
    aspect: "portrait",
  },
  {
    id: "v9",
    src: "/portfolio/showreel-9.mp4",
    poster: "/portfolio/poster-9.jpg",
    title: "Event Film",
    client: "WDG Videography",
    category: "event",
    aspect: "landscape",
  },
  {
    id: "v10",
    src: "/portfolio/showreel-10.mp4",
    poster: "/portfolio/poster-10.jpg",
    title: "Brand Showreel",
    client: "WDG Videography",
    category: "brand",
    aspect: "portrait",
  },
  {
    id: "v11",
    src: "/portfolio/showreel-11.mp4",
    poster: "/portfolio/poster-11.jpg",
    title: "Social Reel",
    client: "WDG Videography",
    category: "social",
    aspect: "portrait",
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