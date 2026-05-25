/**
 * Portfolio Page — WDG Videography
 * Showcases client work: videos, photos, categories
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

const BASE = "https://base44.app/api/apps/6a0c1534017166f536b1ac32/files/mp/public/6a0c1534017166f536b1ac32/";

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
  { id: "v1",  src: BASE + "41816deb1_1014bd7d9_video_1925110218188544.mp4", poster: BASE + "73ad22d74_v1_2s.jpg",  title: "Project 1",  client: "Client", category: "brand",  aspect: "portrait" },
  { id: "v2",  src: BASE + "7dbc8bb74_a7e2197c8_video_1602615164178826.mp4",  poster: BASE + "15252aff2_v2_2s.jpg",  title: "Project 2",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v3",  src: BASE + "51c2947a9_aa93edc33_video_1643151083626827.mp4",  poster: BASE + "c74ddbb15_v3_2s.jpg",  title: "Project 3",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v4",  src: BASE + "15a13ba50_c5fff6c6b_video_1539403330944160.mp4",  poster: BASE + "f97bdf438_v4_2s.jpg",  title: "Project 4",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v5",  src: BASE + "daeba5ad7_68ebb28ef_video_1310483361190446.mp4",  poster: BASE + "fb21454f7_v5_2s.jpg",  title: "Project 5",  client: "Client", category: "event",  aspect: "portrait" },
  { id: "v6",  src: BASE + "c672ad863_3f578fb54_video_974261825347290.mp4",   poster: BASE + "0c787f76e_v6_2s.jpg",  title: "Project 6",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v7",  src: BASE + "39b6ed3a7_f96b0bfd8_video_966490356258390.mp4",   poster: BASE + "cac14b694_v7_2s.jpg",  title: "Project 7",  client: "Client", category: "brand",  aspect: "portrait" },
  { id: "v8",  src: BASE + "5f071903d_1d056d128_video_1501162541704998.mp4",  poster: BASE + "0dd80f4a2_v8_2s.jpg",  title: "Project 8",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v9",  src: BASE + "92473ff6f_c9d060f54_video_2445815295857953.mp4",  poster: BASE + "17a933471_v9_2s.jpg",  title: "Project 9",  client: "Client", category: "social", aspect: "portrait" },
  { id: "v10", src: BASE + "262c16565_fab392c8f_video_1491984292421836.mp4",  poster: BASE + "4d6b7f69f_v10_2s.jpg", title: "Project 10", client: "Client", category: "event",  aspect: "portrait" },
  { id: "v11", src: BASE + "77579e573_3e81c1896_video_2237593870406821.mp4",  poster: BASE + "6d4f5e93b_v11_2s.jpg", title: "Project 11", client: "Client", category: "brand",  aspect: "portrait" },
  { id: "v12", src: BASE + "5db2421e2_0d5a63fde_video_882178007529442.mp4",   poster: BASE + "ae645f10e_v12_2s.jpg", title: "Project 12", client: "Client", category: "social", aspect: "portrait" },
  { id: "v13", src: BASE + "4c359ed7d_337ede89a_video_4371910569620863.mp4",  poster: BASE + "f78452b32_v13_2s.jpg", title: "Project 13", client: "Client", category: "event",  aspect: "portrait" },
  { id: "v14", src: BASE + "e0cffee09_350df3ecf_video_1511044330651926.mp4",  poster: BASE + "01a91c33b_v14_2s.jpg", title: "Project 14", client: "Client", category: "social", aspect: "portrait" },
  { id: "v15", src: BASE + "a7b4de805_22f99855f_video_1696811741634391.mp4",  poster: BASE + "008896c79_v15_2s.jpg", title: "Project 15", client: "Client", category: "social", aspect: "portrait" },
  { id: "v16", src: BASE + "06e4b5166_a033fe743_video_940455922204769.mp4",   poster: BASE + "6168a3e9e_v16_2s.jpg", title: "Project 16", client: "Client", category: "event",  aspect: "portrait" },
  { id: "v17", src: BASE + "b6ce5a2e4_10f619c48_video_1137230612814887.mp4",  poster: BASE + "2115df38b_v17_2s.jpg", title: "Project 17", client: "Client", category: "brand",  aspect: "portrait" },
  { id: "v18", src: BASE + "0309432c4_fb303dcb8_video_2144991479757183.mp4",  poster: BASE + "d4b4d7849_v18_2s.jpg", title: "Project 18", client: "Client", category: "event",  aspect: "portrait" },
];

// ── Video Card ──────────────────────────────────────────────────────────────
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

// ── Lightbox ────────────────────────────────────────────────────────────────
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

// ── Main Page ────────────────────────────────────────────────────────────────
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

  return (
    <ErrorBoundary>
      <SEO
        title="Portfolio | WDG Videography"
        description="Our work — brand films, social content and event coverage across the UK."
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

        {/* Grid */}
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

        <Footer />
      </div>

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </ErrorBoundary>
  );
}
