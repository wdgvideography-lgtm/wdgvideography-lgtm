/**
 * CTA — the bookend to the hero. The hero knocked "WDG" out of paper; here the closing line is
 * knocked out of ink, with footage running through the letters and following the cursor.
 */
import { useEffect, useRef } from "react";
import { claimDarkNav, prefersReducedMotion, playVideo, pauseVideo } from "@/hooks/useReveal";
import { CTA_LINES, CTA_UPM, CTA_CAP } from "./ctapath";

const LH = 0.86 * CTA_UPM; // line height in font units
const PAD = 60;
const W = Math.max(...CTA_LINES.map((l) => l.w)) + PAD * 2;
const H = CTA_CAP + LH * (CTA_LINES.length - 1) + 0.32 * CTA_UPM + PAD;
const INK = "oklch(0.15 0.01 60)";

export default function CTA() {
  const section = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.current?.getBoundingClientRect(); if (!r) return;
      tx = ((e.clientX - r.left) / r.width - 0.5) * -40;
      ty = ((e.clientY - r.top) / r.height - 0.5) * -24;
    };
    if (!prefersReducedMotion()) window.addEventListener("mousemove", onMove);
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        claimDarkNav("cta", r.top <= 40 && r.bottom >= 120);
        const near = r.top < window.innerHeight && r.bottom > 0;
        const v = vid.current;
        if (near) playVideo(v); else pauseVideo(v);
        cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
        if (v) v.style.transform = `scale(1.12) translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); claimDarkNav("cta", false); };
  }, []);

  return (
    <section ref={section} id="contact" className="relative text-white px-5 sm:px-8 lg:px-14 pt-[14vh] pb-[10vh] overflow-hidden" style={{ background: INK }} aria-label="Start a project">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <span className="eyebrow !text-white/50">Start a project</span>
        <span className="mono-tag text-white/40">Cheltenham · Gloucestershire · UK</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end max-w-[1500px]">
      {/* knocked-out headline */}
      <div ref={wrap} className="relative w-full lg:col-span-8 max-w-[980px] overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
        <video ref={vid} src="/media/harvest-wide.mp4" poster="/media/harvest-wide.jpg" muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover will-change-transform" aria-hidden="true" />
        <svg className="absolute -inset-px w-[calc(100%+2px)] h-[calc(100%+2px)]" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id="cta-knockout" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect width={W} height={H} fill="#fff" />
              {CTA_LINES.map((l, i) => (
                <path key={i} d={l.d} fill="#000" transform={`translate(${PAD} ${CTA_CAP + i * LH})`} />
              ))}
            </mask>
          </defs>
          <rect width={W} height={H} fill={INK} mask="url(#cta-knockout)" />
        </svg>
        <h2 className="sr-only">Let’s make something unforgettable.</h2>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-8 lg:pb-4">
        <div className="max-w-[460px]">
          <p className="text-[18px] sm:text-[20px] leading-snug">Tell us about your business. We’ll come back with ideas and a fixed, no-obligation price, usually within a couple of days.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 text-white/70">
            <a href="mailto:will@wdgvideography.com" className="hover:text-gold transition-colors">will@wdgvideography.com</a>
            <a href="tel:+447584065559" className="hover:text-gold transition-colors">+44 7584 065559</a>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/contact" className="pill gold !text-[16px] !px-7 !py-4">Book a consultation →</a>
          <a href="/#showreel" className="pill ghost !text-white hover:!bg-white hover:!text-foreground">Watch the reel again</a>
        </div>
      </div>
      </div>
    </section>
  );
}
