/**
 * Portfolio — every film, reel, live site and app in one place.
 * Videos are the real client reels in /public/portfolio/.
 */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PageHero, Statement, AppsRail, words } from "@/components/editorial";
import Websites from "@/components/home/Websites";
import CTA from "@/components/home/CTA";
import { useReveal, playVideo, pauseVideo } from "@/hooks/useReveal";

type Category = "all" | "farm" | "food" | "venue";

interface Item { id: string; src: string; poster: string; title: string; client: string; category: Category; portrait: boolean }

const ITEMS: Item[] = [
  { id: "v4",  src: "/portfolio/showreel-4.mp4",  poster: "/portfolio/poster-4.jpg",  title: "Harvest at sunset", client: "Farm film",      category: "farm",  portrait: false },
  { id: "v3",  src: "/portfolio/showreel-3.mp4",  poster: "/portfolio/poster-3.jpg",  title: "The Longhorn",      client: "Restaurant",     category: "venue", portrait: true },
  { id: "v5",  src: "/portfolio/showreel-5.mp4",  poster: "/portfolio/poster-5.jpg",  title: "Teddington’s",      client: "Butchery",       category: "food",  portrait: true },
  { id: "v9",  src: "/portfolio/showreel-9.mp4",  poster: "/portfolio/poster-9.jpg",  title: "Bringing it in",    client: "Farm film",      category: "farm",  portrait: false },
  { id: "v2",  src: "/portfolio/showreel-2.mp4",  poster: "/portfolio/poster-2.jpg",  title: "Pasture from above",client: "Drone",          category: "farm",  portrait: true },
  { id: "v7",  src: "/portfolio/showreel-7.mp4",  poster: "/portfolio/poster-7.jpg",  title: "Bar & grill",       client: "The Longhorn",   category: "venue", portrait: true },
  { id: "v10", src: "/portfolio/showreel-10.mp4", poster: "/portfolio/poster-10.jpg", title: "Charcuterie",       client: "Teddington’s",   category: "food",  portrait: true },
  { id: "v8",  src: "/portfolio/showreel-8.mp4",  poster: "/portfolio/poster-8.jpg",  title: "The herd",          client: "Farm film",      category: "farm",  portrait: true },
  { id: "v6",  src: "/portfolio/showreel-6.mp4",  poster: "/portfolio/poster-6.jpg",  title: "Header, close",     client: "Harvest reel",   category: "farm",  portrait: true },
  { id: "v1",  src: "/portfolio/showreel-1.mp4",  poster: "/portfolio/poster-1.jpg",  title: "Dairy",             client: "Farm reel",      category: "farm",  portrait: true },
  { id: "v11", src: "/portfolio/showreel-11.mp4", poster: "/portfolio/poster-11.jpg", title: "Behind the counter",client: "Teddington’s",   category: "food",  portrait: true },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "farm", label: "Farm & land" },
  { key: "food", label: "Food & drink" },
  { key: "venue", label: "Venues" },
];

function Card({ item, onOpen, i }: { item: Item; onOpen: () => void; i: number }) {
  const v = useRef<HTMLVideoElement>(null);
  return (
    <button type="button" onClick={onOpen}
      className={`rv group relative text-left overflow-hidden rounded-2xl bg-[#111] text-white w-full ${item.portrait ? "aspect-[9/16]" : "aspect-[16/9] col-span-2"}`}
      style={{ transitionDelay: `${(i % 3) * 80}ms` }}
      onMouseEnter={() => { if (v.current) { v.current.currentTime = 0; playVideo(v.current); } }}
      onMouseLeave={() => pauseVideo(v.current)}
      aria-label={`Play ${item.title} for ${item.client}`}>
      <img src={item.poster} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" loading="lazy" />
      <video ref={v} src={item.src} muted loop playsInline preload="none" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.72))" }}>
        <span className="font-display text-[clamp(22px,1.8vw,30px)] leading-none">{item.title}</span>
        <span className="mono-tag opacity-70 shrink-0">{item.client.toUpperCase()}</span>
      </div>
      <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5v9l7-4.5z" /></svg>
      </span>
    </button>
  );
}

function Lightbox({ item, onClose }: { item: Item; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white mono-tag">CLOSE ✕</button>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <video src={item.src} poster={item.poster} controls autoPlay playsInline
          className={`rounded-2xl bg-black ${item.portrait ? "h-[85svh] w-auto" : "w-[min(92vw,1280px)]"}`} />
        <div className="flex items-baseline justify-between gap-4 mt-4 text-white">
          <span className="font-display text-2xl">{item.title}</span>
          <span className="mono-tag opacity-70">{item.client.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

function Grid() {
  const [filter, setFilter] = useState<Category>("all");
  const [open, setOpen] = useState<Item | null>(null);
  const ref = useReveal<HTMLElement>(0.05);
  const shown = ITEMS.filter((it) => filter === "all" || it.category === filter);
  return (
    <section ref={ref} id="films" className="px-5 sm:px-8 lg:px-14 pb-[10vh]" style={{ scrollMarginTop: 80 }}>
      <div className="rv flex flex-wrap items-end justify-between gap-6 mb-10">
        <h2 className="display text-[clamp(38px,5vw,84px)]">Films and <i>reels</i>.</h2>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
          {FILTERS.map((f) => (
            <button key={f.key} type="button" role="tab" aria-selected={filter === f.key} onClick={() => setFilter(f.key)}
              className={`pill ${filter === f.key ? "" : "ghost"}`}>{f.label}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" key={filter}>
        {shown.map((it, i) => <Card key={it.id} item={it} i={i} onOpen={() => setOpen(it)} />)}
      </div>
      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <SEO
        title="Video Portfolio — Brand Films, Reels & Event Video"
        description="Watch brand films, social reels and venue videos by WDG Videography, plus the live websites and apps we've built for businesses across Gloucestershire."
        keywords="video portfolio Cheltenham, brand film examples, social media reels, restaurant video, farm video, videographer showreel Gloucestershire"
        canonicalUrl="https://www.wdgvideography.com/portfolio"
      />
      <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
        <ErrorBoundary silent><Navbar /></ErrorBoundary>
        <main>
          <PageHero
            eyebrow="Work"
            title={<>The work, <i>unedited</i>.</>}
            lead="Real films for real businesses: farms, butchers, restaurants and bars across Gloucestershire. Hover to preview, click to watch."
            video="/media/club-one.mp4" poster="/media/club-one.jpg"
            primary={{ label: "Start a project", href: "/contact" }}
            secondary={{ label: "Films", href: "#films" }}
            compact
          />
          <ErrorBoundary silent>
            <Statement eyebrow="01 — Everything here is live" words={words("No stock footage, no mock-ups. Every clip was shot by us, every site is {online right now}, every app is in daily use.")} />
          </ErrorBoundary>
          <ErrorBoundary silent><Grid /></ErrorBoundary>
          <ErrorBoundary silent><Websites /></ErrorBoundary>
          <ErrorBoundary silent>
            <AppsRail title={<>And the <i>software</i> behind the scenes.</>} intro="Dashboards and operations tools we designed and built, screenshotted from the live apps." cta={{ label: "About the apps →", href: "/app-development" }} />
          </ErrorBoundary>
          <ErrorBoundary silent><CTA /></ErrorBoundary>
        </main>
        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>
    </>
  );
}
