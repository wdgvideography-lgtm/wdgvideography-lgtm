/**
 * WorkShowcase — a scroll-driven showreel. The stage goes dark and letterboxed; each project
 * slides into the centre in turn with its title set huge behind it, neighbours waiting at the sides.
 */
import { useEffect, useRef, useState } from "react";
import { clamp, claimDarkNav } from "@/hooks/useReveal";

type Project = { file: string; title: string; client: string; type: string; portrait?: boolean };

const PROJECTS: Project[] = [
  { file: "tractor-wide", title: "Harvest", client: "Gloucestershire farm", type: "Drone & ground film" },
  { file: "butchery", title: "Teddington’s", client: "Farm shop & butchery", type: "Brand film", portrait: true },
  { file: "amc-truck", title: "AMC Transport", client: "Haulage & drainage", type: "Aerial promo" },
  { file: "dining", title: "The Longhorn", client: "Restaurant", type: "Venue reel", portrait: true },
  { file: "tack-shop", title: "Tack shop", client: "Equestrian retail", type: "Brand film" },
  { file: "club-one", title: "Club One", client: "Nightclub", type: "Venue film" },
];
const N = PROJECTS.length;

export default function WorkShowcase() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const titles = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const near = r.top < window.innerHeight && r.bottom > 0;
        const p = clamp(-r.top / (r.height - window.innerHeight));
        claimDarkNav("showreel", r.top <= 40 && r.bottom >= window.innerHeight - 40);
        const f = p * (N - 1); // fractional index
        const a = Math.round(f);
        if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
        const vw = window.innerWidth;
        const gap = Math.min(vw * 0.62, 760);
        cards.current.forEach((c, i) => {
          if (!c) return;
          const d = i - f, ad = Math.abs(d);
          c.style.transform = `translate(-50%,-50%) translateX(${d * gap}px) scale(${1 - Math.min(ad, 2) * 0.18}) rotateY(${clamp(d, -1, 1) * -10}deg)`;
          c.style.opacity = String(clamp(1 - (ad - 0.5) * 0.9, 0.18, 1));
          c.style.zIndex = String(10 - Math.round(ad));
          c.style.filter = `brightness(${1 - Math.min(ad, 1) * 0.55})`;
        });
        titles.current.forEach((t, i) => {
          if (!t) return;
          const d = i - f, ad = Math.abs(d);
          t.style.opacity = String(clamp(1 - ad * 2));
          t.style.transform = `translateX(${d * -140}px)`;
        });
        vids.current.forEach((v, i) => {
          if (!v) return;
          const on = near && Math.abs(i - f) < 1.2;
          if (on && v.paused) v.play().catch(() => {});
          if (!on && !v.paused) v.pause();
        });
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); claimDarkNav("showreel", false); };
  }, []);

  const cur = PROJECTS[active];

  return (
    <section ref={section} id="showreel" className="relative" style={{ height: `${(N + 1) * 100}vh` }} aria-label="Featured work">
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white" style={{ background: "oklch(0.13 0.008 60)", perspective: 1400 }}>
        {/* header */}
        <div className="absolute top-[88px] left-5 right-5 sm:left-8 sm:right-8 lg:left-14 lg:right-14 flex justify-between items-start z-20 pointer-events-none">
          <div>
            <span className="eyebrow !text-white/50">Featured work</span>
            <p className="font-display text-[clamp(22px,2.2vw,32px)] leading-tight mt-1.5">Scroll through the <i className="text-gold">reel</i>.</p>
          </div>
          <div className="mono-tag text-white/60 text-right">
            <span className="text-white text-[22px] font-display">{String(active + 1).padStart(2, "0")}</span> / {String(N).padStart(2, "0")}
          </div>
        </div>

        {/* giant titles behind the cards */}
        {PROJECTS.map((p, i) => (
          <div key={p.file} ref={(el) => { titles.current[i] = el; }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden="true">
            <span className="display text-[clamp(72px,16vw,300px)] leading-none text-white/[.07] whitespace-nowrap">{p.title}</span>
          </div>
        ))}

        {/* cards */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {PROJECTS.map((p, i) => (
            <div key={p.file} ref={(el) => { cards.current[i] = el; }}
              className="absolute top-1/2 left-1/2 rounded-[18px] overflow-hidden bg-black shadow-[0_60px_120px_-40px_rgba(0,0,0,.8)] will-change-transform"
              style={{
                width: p.portrait ? "min(40vh, 78vw)" : "min(92vw, 118vh)",
                aspectRatio: p.portrait ? "9/16" : "16/9",
                transform: "translate(-50%,-50%)",
                opacity: i === 0 ? 1 : 0.18,
              }}>
              <video ref={(el) => { vids.current[i] = el; }} src={`/media/${p.file}.mp4`} poster={`/media/${p.file}.jpg`}
                muted loop playsInline preload={i < 2 ? "auto" : "metadata"} className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
              <span className="absolute top-3.5 left-4 mono-tag text-white/80">{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>

        {/* caption */}
        <div className="absolute left-5 right-5 sm:left-8 sm:right-8 lg:left-14 lg:right-14 bottom-[6vh] z-20 flex flex-wrap items-end justify-between gap-4">
          <div key={active} style={{ animation: "scene-in .6s cubic-bezier(.2,.8,.2,1)" }}>
            <h3 className="font-display text-[clamp(32px,4vw,64px)] leading-none">{cur.title}</h3>
            <p className="text-white/65 mt-2">{cur.client} · {cur.type}</p>
          </div>
          <a href="/portfolio" className="pill !bg-white !text-foreground hover:!bg-gold">Full portfolio →</a>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10"><div ref={bar} className="h-full bg-gold origin-left" style={{ transform: "scaleX(0)" }} /></div>
      </div>
    </section>
  );
}
