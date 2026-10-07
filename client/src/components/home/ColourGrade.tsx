/** ColourGrade — drag between the flat camera file and the finished grade. */
import { useEffect, useRef } from "react";
import { clamp, useReveal } from "@/hooks/useReveal";

export default function ColourGrade() {
  const box = useRef<HTMLDivElement>(null);
  const graded = useRef<HTMLVideoElement>(null);
  const hand = useRef<HTMLDivElement>(null);
  const wheels = useRef<(HTMLElement | null)[]>([]);
  const dragging = useRef(false);
  const sec = useReveal<HTMLElement>();

  const setAt = (clientX: number) => {
    const b = box.current; if (!b) return;
    const r = b.getBoundingClientRect(), k = clamp((clientX - r.left) / r.width);
    if (graded.current) graded.current.style.clipPath = `inset(0 0 0 ${k * 100}%)`;
    if (hand.current) hand.current.style.left = `${k * 100}%`;
    wheels.current.forEach((w, j) => {
      if (!w) return;
      const a = k * 2.5 + j * 2.1, d = 12 * (1 - k) + 4;
      w.style.setProperty("--x", `calc(-50% + ${Math.cos(a) * d}px)`);
      w.style.setProperty("--y", `calc(-50% + ${Math.sin(a) * d}px)`);
    });
  };

  useEffect(() => {
    const b = box.current; if (!b) return;
    const up = () => (dragging.current = false);
    window.addEventListener("pointerup", up);
    let swept = false;
    const io = new IntersectionObserver((es) => {
      const e = es[0];
      b.querySelectorAll("video").forEach((v) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
      if (e.isIntersecting && !swept) {
        swept = true;
        const s = performance.now();
        const anim = (t: number) => {
          const r = b.getBoundingClientRect(), k = Math.min(1, (t - s) / 1800);
          setAt(r.left + r.width * (k < 0.5 ? 0.5 - 0.35 * Math.sin(k * 2 * Math.PI) : 0.5 + 0.35 * Math.sin((k - 0.5) * 2 * Math.PI)));
          if (k < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      }
    }, { threshold: 0.4 });
    io.observe(b);
    return () => { window.removeEventListener("pointerup", up); io.disconnect(); };
  }, []);

  return (
    <section ref={sec} id="colour" className="px-5 sm:px-8 lg:px-14 pt-[16vh] pb-[6vh] grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-[5vw] items-center">
      <div className="rv">
        <span className="eyebrow">02 · Colour</span>
        <h2 className="display text-[clamp(40px,5vw,84px)] mt-3.5">Graded by hand in <i>DaVinci Resolve</i>.</h2>
        <p className="text-muted-foreground my-6 max-w-[420px]">Every frame is colour-corrected and graded so your brand looks consistent on every screen. Drag the frame to compare the flat camera file with the finished grade.</p>
        <div className="flex gap-5 mono-tag text-muted-foreground">
          {["LIFT", "GAMMA", "GAIN"].map((n, j) => (
            <div key={n} className="w-[84px] text-center">
              <i ref={(el) => { wheels.current[j] = el; }} className="block w-[84px] h-[84px] rounded-full relative mb-2"
                style={{ background: "conic-gradient(#e55,#ee5,#5e5,#5ee,#55e,#e5e,#e55)", WebkitMask: "radial-gradient(circle,#000 0 66%,transparent 67%)", mask: "radial-gradient(circle,#000 0 66%,transparent 67%)" }}>
                <span className="absolute w-2.5 h-2.5 rounded-full border-2 border-white left-1/2 top-1/2 transition-transform duration-200" style={{ transform: "translate(var(--x,-50%),var(--y,-50%))" }} />
              </i>
              {n}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={box}
        className="rv relative aspect-video rounded-[18px] overflow-hidden cursor-ew-resize shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => { dragging.current = true; setAt(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current || e.pointerType === "mouse") setAt(e.clientX); }}
        role="img" aria-label="Before and after colour grading comparison of harvest footage"
      >
        <video src="/media/harvest-wide.mp4" muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(.35) contrast(.72) brightness(1.12) sepia(.08)" }} />
        <video ref={graded} src="/media/harvest-wide.mp4" muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: "inset(0 0 0 50%)", filter: "saturate(1.25) contrast(1.12) brightness(.96)" }} />
        <div ref={hand} className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-white text-[#111] grid place-items-center text-lg">⟷</span>
        </div>
        <span className="absolute bottom-3 left-3 mono-tag text-white bg-black/60 rounded px-2 py-1">CAMERA LOG</span>
        <span className="absolute bottom-3 right-3 mono-tag text-white bg-black/60 rounded px-2 py-1">FINAL GRADE</span>
      </div>
    </section>
  );
}
