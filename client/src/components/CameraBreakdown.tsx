/**
 * Camera Breakdown — Scroll-driven animation
 * A camera made of CSS/SVG components that breaks apart as you scroll
 * "WDG Videography" emerges from the center
 * Pinned section that animates on scroll
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraBreakdown() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!section || !pinned) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pinned,
          scrub: 1,
          pinSpacing: false,
        },
      });

      // Camera body parts
      const body = pinned.querySelector(".cam-body");
      const lens = pinned.querySelector(".cam-lens");
      const lensRing1 = pinned.querySelector(".cam-ring-1");
      const lensRing2 = pinned.querySelector(".cam-ring-2");
      const lensRing3 = pinned.querySelector(".cam-ring-3");
      const topHandle = pinned.querySelector(".cam-top");
      const sideLeft = pinned.querySelector(".cam-side-left");
      const sideRight = pinned.querySelector(".cam-side-right");
      const viewfinder = pinned.querySelector(".cam-viewfinder");
      const filmStrip = pinned.querySelector(".cam-film");
      const logoEl = pinned.querySelector(".cam-logo");
      const subtitleEl = pinned.querySelector(".cam-subtitle");
      const bgGlow = pinned.querySelector(".cam-glow");

      // Phase 1: Camera assembled, slight float (0 - 0.15)
      tl.fromTo(body, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
      tl.fromTo(lens, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0.02);
      tl.fromTo(lensRing1, { scale: 0 }, { scale: 1, duration: 0.08 }, 0.04);
      tl.fromTo(lensRing2, { scale: 0 }, { scale: 1, duration: 0.08 }, 0.05);
      tl.fromTo(lensRing3, { scale: 0 }, { scale: 1, duration: 0.08 }, 0.06);
      tl.fromTo(topHandle, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.08 }, 0.03);
      tl.fromTo(sideLeft, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.08 }, 0.04);
      tl.fromTo(sideRight, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.08 }, 0.04);
      tl.fromTo(viewfinder, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.08 }, 0.05);
      tl.fromTo(filmStrip, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.08 }, 0.06);

      // Phase 2: Camera breaks apart (0.25 - 0.65)
      tl.to(topHandle, { y: -180, x: 30, rotation: -15, opacity: 0, duration: 0.2 }, 0.3);
      tl.to(sideLeft, { x: -250, y: -50, rotation: -25, opacity: 0, duration: 0.25 }, 0.32);
      tl.to(sideRight, { x: 250, y: 50, rotation: 20, opacity: 0, duration: 0.25 }, 0.32);
      tl.to(viewfinder, { y: -200, x: -80, rotation: 30, opacity: 0, duration: 0.2 }, 0.35);
      tl.to(filmStrip, { x: -300, y: 100, rotation: -40, opacity: 0, duration: 0.22 }, 0.37);
      tl.to(body, { scale: 1.2, opacity: 0, duration: 0.2 }, 0.4);

      // Lens rings expand outward
      tl.to(lensRing1, { scale: 3, opacity: 0, duration: 0.2 }, 0.35);
      tl.to(lensRing2, { scale: 4, opacity: 0, duration: 0.22 }, 0.38);
      tl.to(lensRing3, { scale: 5, opacity: 0, duration: 0.25 }, 0.4);

      // Lens zooms in and becomes the "portal"
      tl.to(lens, { scale: 8, opacity: 0, duration: 0.25 }, 0.42);

      // Phase 3: Background glow appears (0.5 - 0.6)
      tl.fromTo(bgGlow, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.15 }, 0.55);

      // Phase 4: Logo emerges from center (0.6 - 0.85)
      tl.fromTo(
        logoEl,
        { opacity: 0, scale: 0.3, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(1.5)" },
        0.6
      );

      tl.fromTo(
        subtitleEl,
        { opacity: 0, y: 20, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 0.15 },
        0.72
      );

      // Phase 5: Everything fades as we leave (0.85 - 1.0)
      tl.to(logoEl, { opacity: 0, y: -30, duration: 0.1 }, 0.9);
      tl.to(subtitleEl, { opacity: 0, y: -20, duration: 0.08 }, 0.92);
      tl.to(bgGlow, { opacity: 0, duration: 0.08 }, 0.92);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "400vh" }}>
      <div ref={pinnedRef} className="h-screen w-full overflow-hidden bg-background relative flex items-center justify-center">
        {/* Background glow */}
        <div className="cam-glow absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.06] blur-[100px]" />
        </div>

        {/* Camera Assembly */}
        <div className="relative w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[380px]">
          {/* Camera Body */}
          <div className="cam-body absolute inset-0 rounded-lg border-2 border-gold/40 bg-card/80 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {/* Body details */}
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-red-500/60" />
            <div className="absolute top-3 right-8 w-2 h-2 rounded-full bg-gold/40" />
            <div className="absolute bottom-4 left-4 right-4 h-1 bg-border/30 rounded" />
            <div className="absolute bottom-8 left-4 w-16 h-1 bg-border/20 rounded" />
          </div>

          {/* Top Handle / Hot Shoe */}
          <div className="cam-top absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-6 rounded-t-md border-2 border-gold/30 bg-card/60" />

          {/* Side Left - Grip */}
          <div className="cam-side-left absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-24 rounded-l-lg border-2 border-gold/30 bg-card/60">
            <div className="absolute top-2 left-1 right-1 h-1 bg-gold/20 rounded" />
            <div className="absolute top-5 left-1 right-1 h-1 bg-gold/20 rounded" />
            <div className="absolute top-8 left-1 right-1 h-1 bg-gold/20 rounded" />
          </div>

          {/* Side Right - Ports */}
          <div className="cam-side-right absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-20 rounded-r-lg border-2 border-gold/30 bg-card/60">
            <div className="absolute top-3 left-2 w-4 h-2 border border-gold/20 rounded-sm" />
            <div className="absolute top-8 left-2 w-4 h-2 border border-gold/20 rounded-sm" />
          </div>

          {/* Viewfinder */}
          <div className="cam-viewfinder absolute -top-12 right-8 w-14 h-10 rounded border-2 border-gold/30 bg-card/60">
            <div className="absolute inset-2 rounded-sm border border-gold/20" />
          </div>

          {/* Film Strip */}
          <div className="cam-film absolute -bottom-6 left-8 w-24 h-5 rounded border border-gold/20 bg-card/40 flex items-center gap-1 px-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-3 bg-gold/15 rounded-sm" />
            ))}
          </div>

          {/* Lens - Center */}
          <div className="cam-lens absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 border-gold/50 bg-black/80 flex items-center justify-center shadow-[0_0_30px_oklch(0.78_0.12_75/0.2)]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/30" />
          </div>

          {/* Lens Rings */}
          <div className="cam-ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full border border-gold/20" />
          <div className="cam-ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border border-gold/10" />
          <div className="cam-ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border border-dashed border-gold/10" />
        </div>

        {/* Logo that emerges */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
          <img
            src="/manus-storage/wdg-logo-cropped2_c8f7949b.png"
            alt="WDG Videography"
            className="cam-logo h-32 sm:h-40 md:h-48 lg:h-56 w-auto object-contain opacity-0"
          />
          <p className="cam-subtitle font-body text-sm sm:text-base text-gold uppercase tracking-[0.4em] mt-6 opacity-0">
            Cinematic Production
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] text-muted-foreground/40 font-body tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-gold/20 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/40 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
