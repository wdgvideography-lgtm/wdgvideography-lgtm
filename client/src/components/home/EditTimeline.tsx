/**
import type React from "react";
 * EditTimeline — the homepage is an edit. Scrolling moves the playhead, cuts between clips
 * and swaps the headline for each part of the business.
 */
import { useEffect, useRef, useState } from "react";
import { clamp } from "@/hooks/useReveal";

type Clip = { file: string; name: string; from: number; to: number; colour: string; title: React.ReactNode; text: string; href: string; cta: string };

const CLIPS: Clip[] = [
  { file: "harvest-wide", name: "WDG_open", from: 0, to: 0.2, colour: "#3f6bd6", href: "/video-production", cta: "Video production",
    title: <>We shoot it, cut it and <i>grade it</i>.</>, text: "Every film is planned, filmed, edited and colour-graded in-house in Cheltenham. Scroll to play through the edit." },
  { file: "combine", name: "Farm_combine", from: 0.2, to: 0.4, colour: "#2f9e6f", href: "/video-production", cta: "Farm & rural films",
    title: <>Farms that look as good as they <i>work</i>.</>, text: "Drone and ground footage of land, livestock and harvest, for diversification, sales and recruitment." },
  { file: "dining", name: "Restaurant", from: 0.4, to: 0.6, colour: "#c4542f", href: "/social-media-marketing", cta: "Social reels",
    title: <>Restaurants people <i>book</i>.</>, text: "Atmosphere, plates and people. Reels built to fill tables, not just collect likes." },
  { file: "butchery", name: "Teddingtons", from: 0.6, to: 0.8, colour: "#8a4fd1", href: "/portfolio", cta: "See the work",
    title: <>Brands with a <i>story</i>.</>, text: "Teddington’s, The Longhorn and more: brand films with matching social cut-downs." },
  { file: "bar", name: "Web_promo", from: 0.8, to: 1, colour: "#3f6bd6", href: "/website-design", cta: "Website design",
    title: <>Then we put it <i>to work</i>.</>, text: "Websites, SEO and social management so your films reach the people who matter." },
];
const V2 = [["Title", 0.02, 0.12], ["Lower third", 0.25, 0.34], ["Title", 0.45, 0.55], ["Logo", 0.66, 0.74], ["End card", 0.86, 0.98]] as const;

export default function EditTimeline() {
  const section = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const playhead = useRef<HTMLDivElement>(null);
  const lane = useRef<HTMLDivElement>(null);
  const tl = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const p = Math.min(0.9999, clamp(-r.top / (r.height - window.innerHeight)));
        const near = r.top < window.innerHeight && r.bottom > 0;
        if (playhead.current && lane.current && tl.current) {
          const lr = lane.current.getBoundingClientRect(), tr = tl.current.getBoundingClientRect();
          playhead.current.style.left = `${lr.left - tr.left + p * lr.width}px`;
        }
        const i = CLIPS.findIndex((c) => p >= c.from && p < c.to);
        if (i !== curRef.current && i >= 0) {
          if (flash.current) { flash.current.style.animation = "none"; void flash.current.offsetWidth; flash.current.style.animation = "cut-flash .25s"; }
          curRef.current = i; setCur(i);
        }
        videos.current.forEach((v, k) => {
          if (!v) return;
          const on = k === curRef.current && near;
          if (on && v.paused) v.play().catch(() => {});
          if (!on && !v.paused) v.pause();
        });
        if (tc.current) { const f = Math.floor(p * 60 * 25), pd = (n: number) => String(n).padStart(2, "0"); tc.current.textContent = `01:00:${pd(Math.floor(f / 25))}:${pd(f % 25)}`; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const c = CLIPS[cur];

  return (
    <section ref={section} id="edit" className="relative" style={{ height: "480vh" }} aria-label="What we do">
      <div className="sticky top-0 h-[100svh] grid gap-3.5 px-5 sm:px-8 lg:px-14 pt-[84px] pb-5" style={{ gridTemplateRows: "1fr auto" }}>
        <div className="grid min-h-0 gap-5 lg:gap-[3vw] grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[minmax(280px,1fr)_1.5fr] lg:items-stretch">
          <div key={cur} className="flex flex-col justify-center min-h-0" style={{ animation: "scene-in .7s cubic-bezier(.2,.8,.2,1)" }}>
            <span className="mono-tag text-gold block mb-2">● TIMELINE 01 · SCROLL TO SCRUB</span>
            <h2 className="font-display text-[34px] sm:text-[clamp(40px,5vw,84px)] leading-[.98] mb-3 lg:mb-4 [&_i]:text-gold">{c.title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-[420px]">{c.text}</p>
            <a href={c.href} className="hidden lg:inline-flex pill ghost mt-6 text-sm">{c.cta} →</a>
          </div>
          <div className="relative h-full min-h-0 lg:self-center lg:max-h-[64vh] lg:aspect-video lg:w-full rounded-[18px] overflow-hidden bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)]">
            {CLIPS.map((cl, k) => (
              <video
                key={cl.file}
                ref={(el) => { videos.current[k] = el; }}
                src={`/media/${cl.file}.mp4`}
                poster={`/media/${cl.file}.jpg`}
                muted loop playsInline preload={k === 0 ? "auto" : "metadata"}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: k === cur ? 1 : 0 }}
                aria-hidden="true"
              />
            ))}
            <div ref={flash} className="absolute inset-0 bg-white opacity-0 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none flex justify-between items-start p-4 mono-tag text-white"
              style={{ background: "linear-gradient(rgba(0,0,0,.4), transparent 22%, transparent 78%, rgba(0,0,0,.5))" }}>
              <span>PROGRAM</span><span>{c.name.toLowerCase()}.mov</span><span>4K · 25P</span>
            </div>
            <span ref={tc} className="absolute left-4 bottom-3.5 mono-tag !text-[14px] text-white">01:00:00:00</span>
          </div>
        </div>

        {/* timeline */}
        <div ref={tl} className="relative bg-card border border-border rounded-[14px] px-3.5 pt-2.5 pb-3 select-none">
          <div className="relative h-[18px] ml-11 border-b border-border text-muted-foreground mono-tag">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`absolute top-0 text-[10px] -translate-x-1/2 ${i % 2 ? "hidden sm:block" : ""}`} style={{ left: `${i * 20}%` }}>
                01:00:{String(i * 12).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          <Track label="V2">
            {V2.map(([n, a, b], i) => (
              <div key={i} className="absolute top-0.5 bottom-0.5 rounded px-2 text-[11px] font-medium text-white flex items-center overflow-hidden whitespace-nowrap opacity-50"
                style={{ left: `${a * 100}%`, width: `${(b - a) * 100}%`, background: "#7b7368" }}>{n}</div>
            ))}
          </Track>
          <Track label="V1" laneRef={lane}>
            {CLIPS.map((cl, k) => (
              <div key={cl.file} className="absolute top-0.5 bottom-0.5 rounded px-2 text-[11px] font-medium text-white flex items-center overflow-hidden whitespace-nowrap transition-all duration-300"
                style={{ left: `${cl.from * 100}%`, width: `calc(${(cl.to - cl.from) * 100}% - 2px)`, background: cl.colour, opacity: k === cur ? 1 : 0.5, boxShadow: k === cur ? "inset 0 0 0 2px var(--foreground)" : "none" }}>
                {cl.name}.mov
              </div>
            ))}
          </Track>
          <Track label="A1" className="hidden sm:flex">
            <div className="absolute inset-0 rounded opacity-60" style={{ background: "repeating-linear-gradient(90deg, rgba(232,150,15,.75) 0 2px, transparent 2px 4px)" }} />
          </Track>
          <div ref={playhead} className="absolute top-1 bottom-1.5 w-[2px] bg-gold pointer-events-none z-[3]" style={{ left: 58 }}>
            <span className="absolute -top-0.5 -left-[6px] border-[7px] border-transparent border-t-[9px] border-t-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Track({ label, children, laneRef, className = "flex" }: { label: string; children: React.ReactNode; laneRef?: React.RefObject<HTMLDivElement | null>; className?: string }) {
  return (
    <div className={`${className} items-center gap-2 h-7 mt-1.5`}>
      <b className="w-9 mono-tag text-muted-foreground font-medium">{label}</b>
      <div ref={laneRef} className="relative flex-1 h-full rounded-[5px]" style={{ background: "oklch(0.9 0.012 80)" }}>{children}</div>
    </div>
  );
}
