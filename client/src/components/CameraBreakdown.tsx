/**
 * Camera Breakdown — Scroll-driven multi-element animation
 * 8 individual photorealistic camera parts on transparent backgrounds
 * Each part starts scattered/spinning → assembles into center → breaks apart again
 * Then WDG Videography text appears
 * Every single part moves independently with unique rotation and trajectory
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGO_IMG = "/manus-storage/wdg-logo-transparent_d82f27ab.png";
const ASSEMBLED_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/camera-assembled-RU3jkvXh9WTcaprBrGmwUM.webp";

// Each part has: image URL, assembled position (where it sits when camera is built),
// scattered position (where it starts/ends when exploded), size, and rotation behavior
const parts = [
  {
    id: "body",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-body-Ptkb69aJFYJid4XynGZ5Xh.webp",
    // Assembled: center
    ax: 0, ay: 0, ar: 0, aScale: 0.35,
    // Scattered: offset positions
    sx: 0, sy: 0, sr: -15, sScale: 0.25,
    size: "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]",
  },
  {
    id: "lens",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-lens-idiSYKmZtekY44dFPoUgQ8.webp",
    ax: -180, ay: 10, ar: 0, aScale: 0.3,
    sx: -450, sy: -200, sr: -30, sScale: 0.22,
    size: "w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px]",
  },
  {
    id: "cage",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-cage-3uu4Xeij9aAsy3BtMD9M2T.webp",
    ax: 10, ay: -5, ar: 0, aScale: 0.38,
    sx: 400, sy: -250, sr: 25, sScale: 0.25,
    size: "w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px]",
  },
  {
    id: "mic",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-mic-RhMHT5Hqv6cm2HgHoEMWX7.webp",
    ax: 50, ay: -120, ar: -20, aScale: 0.2,
    sx: -300, sy: -350, sr: 45, sScale: 0.18,
    size: "w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]",
  },
  {
    id: "monitor",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-monitor-Ry4jNcuJHWXRVTWGYCcUjA.webp",
    ax: 180, ay: -60, ar: 5, aScale: 0.22,
    sx: 450, sy: 150, sr: -20, sScale: 0.18,
    size: "w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]",
  },
  {
    id: "battery",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-battery-3pfEizTjTeWkYUujkTCHTr.webp",
    ax: 140, ay: 50, ar: 0, aScale: 0.18,
    sx: 350, sy: 300, sr: 35, sScale: 0.15,
    size: "w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px]",
  },
  {
    id: "tripod",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-tripod-XQA6vtsbYmHxmR2dL6yzUP.webp",
    ax: 0, ay: 150, ar: 0, aScale: 0.25,
    sx: -100, sy: 380, sr: -20, sScale: 0.2,
    size: "w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]",
  },
  {
    id: "hood",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/part-hood-ZrWM6WhzfdzDnUsQD9SSds.webp",
    ax: -160, ay: -80, ar: -5, aScale: 0.2,
    sx: -500, sy: 200, sr: 40, sScale: 0.16,
    size: "w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]",
  },
];

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

      // Get all part elements
      const partEls = parts.map((p) => pinned.querySelector(`[data-part="${p.id}"]`) as HTMLElement);
      const logoEl = pinned.querySelector(".cam-logo") as HTMLElement;
      const titleEl = pinned.querySelector(".cam-title") as HTMLElement;
      const subtitleEl = pinned.querySelector(".cam-subtitle") as HTMLElement;
      const glowEl = pinned.querySelector(".cam-glow") as HTMLElement;

      // ===== PHASE 1: Parts scattered, spinning (start state) =====
      // Set initial scattered positions
      parts.forEach((part, i) => {
        const el = partEls[i];
        if (!el) return;
        gsap.set(el, {
          x: part.sx,
          y: part.sy,
          rotation: part.sr,
          scale: part.sScale,
          opacity: 1,
        });
      });

      // ===== PHASE 2: Parts fly in and assemble (0 - 0.4) =====
      parts.forEach((part, i) => {
        const el = partEls[i];
        if (!el) return;
        // Each part flies to its assembled position with unique timing
        const delay = i * 0.02; // Stagger
        tl.to(el, {
          x: part.ax,
          y: part.ay,
          rotation: part.ar,
          scale: part.aScale,
          duration: 0.35 - delay,
          ease: "power2.inOut",
        }, 0.05 + delay);
      });

      // ===== PHASE 3: Flash to assembled rig image (0.38 - 0.55) =====
      const assembledEl = pinned.querySelector(".cam-assembled") as HTMLElement;
      const flashEl = pinned.querySelector(".cam-flash") as HTMLElement;

      // Hide individual parts
      parts.forEach((_, i) => {
        const el = partEls[i];
        if (!el) return;
        tl.to(el, { opacity: 0, duration: 0.02 }, 0.38);
      });

      // Flash effect
      tl.fromTo(flashEl, { opacity: 0 }, { opacity: 0.8, duration: 0.02 }, 0.38);
      tl.to(flashEl, { opacity: 0, duration: 0.04 }, 0.4);

      // Assembled rig appears
      tl.fromTo(assembledEl,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.03 },
        0.39
      );

      // Hold assembled rig and slowly zoom
      tl.to(assembledEl, {
        scale: 1.03,
        duration: 0.15,
        ease: "none",
      }, 0.42);

      // ===== PHASE 4: Assembled rig breaks apart (0.55 - 0.75) =====
      // Flash out
      tl.fromTo(flashEl, { opacity: 0 }, { opacity: 0.6, duration: 0.02 }, 0.55);
      tl.to(flashEl, { opacity: 0, duration: 0.03 }, 0.57);

      // Hide assembled, show parts again scattered
      tl.to(assembledEl, { opacity: 0, scale: 1.1, duration: 0.02 }, 0.55);

      // Parts reappear and fly outward
      parts.forEach((part, i) => {
        const el = partEls[i];
        if (!el) return;
        const delay = i * 0.015;
        // Reset to assembled position first
        tl.set(el, { x: part.ax, y: part.ay, rotation: part.ar, scale: part.aScale, opacity: 1 }, 0.56);
        // Then fly outward
        tl.to(el, {
          x: -part.sx * 1.3,
          y: -part.sy * 0.9,
          rotation: -part.sr * 2,
          scale: part.sScale * 0.6,
          opacity: 0,
          duration: 0.16,
          ease: "power2.in",
        }, 0.57 + delay);
      });

      // ===== PHASE 5: Logo and text emerge (0.75 - 0.92) =====
      tl.fromTo(glowEl,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 0.08 },
        0.76
      );

      tl.fromTo(logoEl,
        { opacity: 0, scale: 0.4, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.1, ease: "back.out(1.5)" },
        0.78
      );

      tl.fromTo(titleEl,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.07 },
        0.84
      );

      tl.fromTo(subtitleEl,
        { opacity: 0, y: 15, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.06 },
        0.87
      );

      // ===== PHASE 6: Fade out (0.92 - 1.0) =====
      tl.to(logoEl, { opacity: 0, y: -20, duration: 0.05 }, 0.93);
      tl.to(titleEl, { opacity: 0, duration: 0.04 }, 0.94);
      tl.to(subtitleEl, { opacity: 0, duration: 0.04 }, 0.95);
      tl.to(glowEl, { opacity: 0, duration: 0.04 }, 0.96);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "500vh" }}>
      <div ref={pinnedRef} className="h-screen w-full overflow-hidden bg-background relative flex items-center justify-center">

        {/* Individual camera parts - each moves independently */}
        {parts.map((part) => (
          <div
            key={part.id}
            data-part={part.id}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${part.size} will-change-transform`}
          >
            <img
              src={part.img}
              alt={part.id}
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(200,169,81,0.15)]"
              loading="eager"
            />
          </div>
        ))}

        {/* Fully assembled rig - flashes in at peak */}
        <img
          src={ASSEMBLED_IMG}
          alt="Assembled camera rig"
          className="cam-assembled absolute inset-0 w-full h-full object-contain p-8 sm:p-12 md:p-20 opacity-0 will-change-transform"
        />

        {/* Flash effect */}
        <div className="cam-flash absolute inset-0 bg-white opacity-0 pointer-events-none z-5" />

        {/* Background glow */}
        <div className="cam-glow absolute inset-0 opacity-0 pointer-events-none z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.05] blur-[120px]" />
        </div>

        {/* Logo and text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <img
            src={LOGO_IMG}
            alt="WDG Videography"
            className="cam-logo h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain opacity-0"
          />
          <h2 className="cam-title font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 opacity-0">
            WDG Videography
          </h2>
          <p className="cam-subtitle font-body text-sm sm:text-base text-gold uppercase tracking-[0.35em] mt-3 opacity-0">
            Cinematic Production & Marketing
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] text-muted-foreground/40 font-body tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-gold/20 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/40 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
