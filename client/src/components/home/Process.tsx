/**
 * Process — "How a project runs" as a scroll-driven sequence. A sticky stage: on the left the four
 * stages with a gold progress rail and a running timecode; on the right a film frame that cuts between
 * real footage as each stage arrives. Scroll drives everything.
 */
import { useEffect, useRef, useState } from "react";
import { clamp } from "@/hooks/useReveal";

const STEPS = [
  { n: "01", t: "Consultation", clip: "tack-shop", d: "We come to you, walk the business and listen. What do you sell, who buys it and what should they feel? You get ideas and a fixed price, not a vague quote.", meta: ["On site or over a call", "Fixed price within days"] },
  { n: "02", t: "Pre-production", clip: "dining", d: "Storyboard, shot list, locations, people, music direction and a filming date that suits you. By the time we arrive, nothing is left to chance.", meta: ["Storyboard & shot list", "Recce where it matters"] },
  { n: "03", t: "Production", clip: "tractor-wide", d: "A calm, well-planned shoot day. Cinema cameras, lighting and licensed drone work where it earns its place. We work around your trade, not the other way round.", meta: ["Cinema camera & drone", "Minimal disruption"] },
  { n: "04", t: "Post & delivery", clip: "club-one", d: "Edit, colour grade, sound and captions. You review online, we refine, then everything is delivered sized for your website, Instagram, TikTok and screens.", meta: ["Graded in DaVinci Resolve", "Every format you need"] },
];
const N = STEPS.length;

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const near = r.top < window.innerHeight && r.bottom > 0;
        const p = clamp(-r.top / (r.height - window.innerHeight));
        const f = p * (N - 1);
        const a = Math.min(N - 1, Math.floor(f + 0.5));
        if (a !== activeRef.current) {
          activeRef.current = a; setActive(a);
          if (flash.current) { flash.current.style.animation = "none"; void flash.current.offsetWidth; flash.current.style.animation = "cut-flash .5s ease-out forwards"; }
        }
        frames.current.forEach((el, i) => {
          if (!el) return;
          const on = i === a;
          el.style.opacity = on ? "1" : "0";
          el.style.transform = on ? "scale(1)" : i < a ? "scale(1.06)" : "scale(1.02)";
        });
        vids.current.forEach((v, i) => {
          if (!v) return;
          const on = near && Math.abs(i - a) <= 1;
          if (on && v.paused) v.play().catch(() => {});
          if (!on && !v.paused) v.pause();
        });
        if (rail.current) rail.current.style.transform = `scaleY(${p})`;
        if (tc.current) {
          const total = p * 84; // seconds on a pretend 1:24 timeline
          const mm = String(Math.floor(total / 60)).padStart(2, "0"), ss = String(Math.floor(total % 60)).padStart(2, "0"), ff = String(Math.floor((total % 1) * 25)).padStart(2, "0");
          tc.current.textContent = `00:${mm}:${ss}:${ff}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cur = STEPS[active];

  return (
    <section ref={section} id="process" className="relative" style={{ height: `${(N + 1) * 90}vh` }} aria-label="How a project runs">
      <div className="sticky top-0 h-[100svh] overflow-hidden px-5 sm:px-8 lg:px-14 pt-[88px] pb-6 lg:pb-10 flex flex-col">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5 lg:mb-8">
          <h2 className="font-display text-[clamp(36px,5vw,84px)] leading-[.95]">How a project <i className="text-gold">runs</i>.</h2>
          <span className="eyebrow">Process</span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-12 flex-1 min-h-0">
          {/* left: stages */}
          <div className="relative flex min-h-0">
            <div className="relative w-px bg-border mr-6 lg:mr-10 shrink-0 hidden sm:block">
              <div ref={rail} className="absolute inset-0 bg-gold origin-top" style={{ transform: "scaleY(0)" }} />
            </div>
            <ol className="flex-1 flex flex-col justify-between min-h-0">
              {STEPS.map((s, i) => {
                const on = i === active, done = i < active;
                return (
                  <li key={s.n} className="transition-all duration-500" style={{ opacity: on ? 1 : done ? 0.45 : 0.3 }}>
                    <div className="flex items-baseline gap-4">
                      <span className={`font-mono text-[12px] tracking-[.14em] ${on ? "text-gold" : "text-muted-foreground"}`}>{s.n}</span>
                      <h3 className={`font-display leading-none transition-all duration-500 ${on ? "text-[clamp(30px,3.6vw,56px)]" : "text-[clamp(20px,2vw,28px)]"}`}>{s.t}</h3>
                    </div>
                    <div className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <p className="text-[15px] sm:text-[16px] leading-relaxed text-muted-foreground max-w-[44ch] mt-3 pl-9">{s.d}</p>
                        <div className="flex flex-wrap gap-2 mt-3 pl-9">
                          {s.meta.map((m) => <span key={m} className="text-[12px] px-2.5 py-1 rounded-full border border-border">{m}</span>)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* right: film frame */}
          <div className="relative min-h-[34vh] lg:min-h-0 rounded-[18px] overflow-hidden bg-black shadow-[0_50px_100px_-40px_rgba(0,0,0,.6)]">
            {STEPS.map((s, i) => (
              <div key={s.n} ref={(el) => { frames.current[i] = el; }} className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out" style={{ opacity: i === 0 ? 1 : 0 }}>
                <video ref={(el) => { vids.current[i] = el; }} src={`/media/${s.clip}.mp4`} poster={`/media/${s.clip}.jpg`} muted loop playsInline preload={i === 0 ? "auto" : "metadata"} className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
              </div>
            ))}
            <div ref={flash} className="absolute inset-0 bg-white pointer-events-none" style={{ opacity: 0 }} />
            {/* viewfinder chrome */}
            <div className="absolute inset-0 pointer-events-none text-white/85">
              <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[11px] tracking-[.14em]">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ff3b30]" style={{ animation: "pulse 1.6s infinite" }} />REC</span>
                <span ref={tc}>00:00:00:00</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span key={active} className="font-display text-[clamp(20px,2.2vw,32px)] leading-none" style={{ animation: "scene-in .5s cubic-bezier(.2,.8,.2,1)" }}>{cur.n} · {cur.t}</span>
                <span className="font-mono text-[11px] tracking-[.14em]">WDG · 25 fps · LOG</span>
              </div>
              <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/50" /><span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/50" />
              <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/50" /><span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
