/** PhoneFan — five phones playing reels fan out as you scroll. All five play from ONE video (a 5-up strip),
 * so phones and Safari only have to decode a single stream. */
import { useEffect, useRef } from "react";
import { clamp, easeInOut, prefersReducedMotion, playVideo, pauseVideo } from "@/hooks/useReveal";

const REELS = ["The Longhorn", "Pasture", "Teddington’s", "Harvest", "Butchery"];
// strip is 5 clips of 9:16 side by side; phone is 9:19, so each slice is 118.75% of the phone width, centred.
const SW = 450, SH = 800; // strip slice size
const CW = Math.round((SH * 9) / 19); // visible 9:19 crop of each slice

export default function PhoneFan() {
  const section = useRef<HTMLElement>(null);
  const phones = useRef<(HTMLDivElement | null)[]>([]);
  const vid = useRef<HTMLVideoElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const near = r.top < window.innerHeight && r.bottom > 0;
        const fp = reduced ? 1 : easeInOut(clamp((-r.top / (r.height - window.innerHeight)) * 1.3));
        const sp = Math.min(window.innerWidth * 0.19, 260);
        phones.current.forEach((e, i) => {
          if (!e) return;
          const k = i - 2;
          e.style.transform = `translateX(${k * sp * fp}px) translateY(${Math.abs(k) * 28 * fp}px) rotate(${k * 7 * fp}deg) scale(${1 - Math.abs(k) * 0.04 * fp})`;
          e.style.zIndex = String(10 - Math.abs(k));
        });
        const v = vid.current;
        if (near) playVideo(v); else pauseVideo(v);
        if (v && near && v.readyState >= 2) {
          canvases.current.forEach((c, i) => {
            const ctx = c?.getContext("2d");
            if (ctx) ctx.drawImage(v, i * SW + (SW - CW) / 2, 0, CW, SH, 0, 0, CW, SH);
          });
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={section} id="work" className="relative" style={{ height: "260vh" }} aria-label="Social reels">
      <div className="sticky top-0 h-[100svh] grid place-items-center overflow-hidden">
        <div className="absolute top-[9vh] w-full text-center px-5">
          <h2 className="font-display text-[clamp(36px,4.6vw,72px)] leading-none">Made for the <i className="text-gold">feed</i>.</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Every shoot comes with vertical reels cut for Instagram, TikTok and Facebook, so one day of filming gives you weeks of content.</p>
        </div>
        <div className="relative mt-[14vh]" style={{ width: "min(230px, 44vw, calc((100svh - 260px) * .47))", aspectRatio: "9/19" }}>
          {REELS.map((label, i) => (
            <div key={label} ref={(el) => { phones.current[i] = el; }}
              className="absolute inset-0 rounded-[30px] overflow-hidden border-[6px] border-[#111] bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)] will-change-transform">
              <canvas ref={(el) => { canvases.current[i] = el; }} width={CW} height={SH} className="w-full h-full rounded-[24px] block"
                style={{ background: `url(/media/reels-strip.jpg) ${(i * SW + (SW - CW) / 2) / (SW * 5 - CW) * 100}% 0 / ${(SW * 5 / CW) * 100}% 100%` }} aria-hidden="true" />
              <span className="absolute bottom-3.5 left-3.5 text-white text-[13px] font-semibold" style={{ textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>{label}</span>
            </div>
          ))}
        </div>
        <video ref={vid} src="/media/reels-strip.mp4" muted loop playsInline preload="metadata" className="absolute w-px h-px opacity-0 pointer-events-none" aria-hidden="true" />
        <a href="/portfolio" className="absolute bottom-[7vh] pill">See the full portfolio →</a>
      </div>
    </section>
  );
}
