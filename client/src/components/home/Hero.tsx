/**
 * Hero — "Through the lens".
 * Footage plays inside giant WDG letters; scrolling zooms through the letters until the film fills the frame.
 */
import { useEffect, useRef } from "react";
import { clamp, easeInOut, prefersReducedMotion, claimDarkNav } from "@/hooks/useReveal";
import { WDG_PATH, WDG_W, WDG_H } from "./wdgpath";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const word = useRef<SVGGElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const under = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const rects = useRef<(SVGRectElement | null)[]>([]);
  const geo = useRef({ w: 1000, h: 1000, base: 0.18 });

  // Size the SVG stage to the viewport so the word is always ~86vw wide (capped by height).
  const fit = () => {
    const w = window.innerWidth, h = window.innerHeight;
    const base = Math.min((0.86 * w) / WDG_W, (0.42 * h) / WDG_H);
    geo.current = { w, h, base };
    svg.current?.setAttribute("viewBox", `0 0 ${w} ${h}`);
    rects.current.forEach((r) => { r?.setAttribute("width", String(w)); r?.setAttribute("height", String(h)); });
    const m = svg.current?.querySelector("mask");
    m?.setAttribute("width", String(w)); m?.setAttribute("height", String(h));
  };

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) {
      if (mask.current) mask.current.style.display = "none";
      if (overlay.current) overlay.current.style.opacity = "1";
      if (under.current) under.current.style.display = "none";
      claimDarkNav("hero", true);
      return () => claimDarkNav("hero", false);
    }
    fit();
    window.addEventListener("resize", fit);
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - window.innerHeight));
        const z = easeInOut(clamp(p / 0.75));
        const { w, h, base } = geo.current;
        if (word.current) word.current.setAttribute("transform", `translate(${w / 2} ${h / 2}) scale(${base * (1 + z * 38)})`);
        if (mask.current) mask.current.style.opacity = String(1 - clamp((p - 0.62) / 0.12));
        if (under.current) under.current.style.opacity = String(1 - clamp(p / 0.15));
        if (overlay.current) overlay.current.style.opacity = String(clamp((p - 0.76) / 0.12));
        const dark = p > 0.25 && r.bottom > 80;
        claimDarkNav("hero", dark);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", fit); claimDarkNav("hero", false); };
  }, []);

  return (
    <section ref={section} id="home" className="relative" style={{ height: "320vh" }} aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/media/tractor-wide.mp4"
          poster="/media/tractor-wide.jpg"
          autoPlay muted loop playsInline
          aria-hidden="true"
        />
        {/* Paper layer with the WDG letters knocked out, so the footage shows through crisp glyph outlines */}
        <div ref={mask} className="absolute inset-0" style={{ willChange: "opacity" }} aria-hidden="true">
          <svg ref={svg} className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <mask id="wdg-knockout" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <rect ref={(el) => { rects.current[0] = el; }} width="1000" height="1000" fill="#fff" />
                <g ref={word}>
                  <path d={WDG_PATH} fill="#000" transform={`translate(${(-WDG_W / 2).toFixed(1)} ${(WDG_H / 2).toFixed(1)})`} />
                </g>
              </mask>
            </defs>
            <rect ref={(el) => { rects.current[1] = el; }} width="1000" height="1000" fill="var(--background)" mask="url(#wdg-knockout)" />
          </svg>
          <h1 className="sr-only">WDG Videography: cinematic video production in Cheltenham, Gloucestershire</h1>
        </div>

        <div ref={under} className="absolute left-0 right-0 bottom-[6vh] flex justify-between items-end gap-5 px-5 sm:px-8 lg:px-14">
          <p className="font-display text-[clamp(24px,2.4vw,36px)] leading-[1.1] max-w-[360px]">
            Cinematic films, reels and websites for Gloucestershire businesses.
          </p>
          <div className="hidden sm:flex items-center gap-3 text-[13px] text-muted-foreground">
            <i className="block w-px h-11 bg-foreground" style={{ animation: "cue 1.8s ease-in-out infinite" }} />
            Scroll to step inside
          </div>
        </div>

        <div
          ref={overlay}
          className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-[10vh] text-white opacity-0"
          style={{ background: "linear-gradient(transparent 40%, rgba(0,0,0,.65))" }}
        >
          <p className="eyebrow !text-white/70 mb-4">WDG Videography · Cheltenham</p>
          <h2 className="font-display text-[clamp(44px,7vw,120px)] leading-[.95] max-w-[12ch]">
            Every business has a <i className="text-gold">story</i> worth filming.
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="/portfolio" className="pill !bg-white !text-foreground hover:!bg-gold">Watch the work</a>
            <a href="/contact" className="pill ghost !text-white hover:!bg-white hover:!text-foreground">Start a project</a>
          </div>
        </div>
      </div>
    </section>
  );
}
