/**
 * Camera Breakdown — Scroll-driven animation
 * Uses photorealistic AI-generated images of exploded camera parts
 * Parts start scattered, spin and assemble together as you scroll
 * Then "WDG Videography" text appears after assembly
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPLODED_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/camera-exploded-EEmvjQYcttomguBeY9TntF.webp";
const ASSEMBLED_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663571760510/79C4qyHCxe8ZKeaXP3ZwkD/camera-assembled-RU3jkvXh9WTcaprBrGmwUM.webp";
const LOGO_IMG = "/manus-storage/wdg-logo-full_f80b9d25.png";

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
          scrub: 1.2,
          pinSpacing: false,
        },
      });

      const exploded = pinned.querySelector(".cam-exploded") as HTMLElement;
      const assembled = pinned.querySelector(".cam-assembled") as HTMLElement;
      const logoEl = pinned.querySelector(".cam-logo") as HTMLElement;
      const titleEl = pinned.querySelector(".cam-title") as HTMLElement;
      const subtitleEl = pinned.querySelector(".cam-subtitle") as HTMLElement;
      const glowEl = pinned.querySelector(".cam-glow") as HTMLElement;

      // Phase 1: Exploded view visible, spinning/floating (0 - 0.35)
      // Exploded image starts visible with rotation and scale animation
      tl.fromTo(exploded,
        { opacity: 1, scale: 1.1, rotation: -3 },
        { opacity: 1, scale: 1, rotation: 3, duration: 0.35 },
        0
      );

      // Phase 2: Exploded fades out, assembled fades in (0.3 - 0.55)
      tl.to(exploded, { opacity: 0, scale: 0.8, rotation: 5, duration: 0.15 }, 0.35);
      tl.fromTo(assembled,
        { opacity: 0, scale: 1.3, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.2 },
        0.38
      );

      // Phase 3: Assembled camera holds, then zooms in slightly (0.55 - 0.7)
      tl.to(assembled, { scale: 1.05, duration: 0.15 }, 0.58);

      // Phase 4: Camera fades, glow appears, logo and text emerge (0.7 - 0.9)
      tl.to(assembled, { opacity: 0, scale: 1.2, filter: "blur(4px)", duration: 0.1 }, 0.7);
      tl.fromTo(glowEl, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.72);

      tl.fromTo(logoEl,
        { opacity: 0, scale: 0.5, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.12, ease: "back.out(1.5)" },
        0.75
      );

      tl.fromTo(titleEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.82
      );

      tl.fromTo(subtitleEl,
        { opacity: 0, y: 15, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.08 },
        0.85
      );

      // Phase 5: Everything fades out (0.9 - 1.0)
      tl.to(logoEl, { opacity: 0, y: -20, duration: 0.06 }, 0.93);
      tl.to(titleEl, { opacity: 0, duration: 0.05 }, 0.94);
      tl.to(subtitleEl, { opacity: 0, duration: 0.05 }, 0.95);
      tl.to(glowEl, { opacity: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "350vh" }}>
      <div ref={pinnedRef} className="h-screen w-full overflow-hidden bg-background relative flex items-center justify-center">
        {/* Exploded camera parts */}
        <img
          src={EXPLODED_IMG}
          alt="Camera parts exploded"
          className="cam-exploded absolute inset-0 w-full h-full object-contain p-8 sm:p-12 md:p-16 will-change-transform"
        />

        {/* Assembled camera */}
        <img
          src={ASSEMBLED_IMG}
          alt="Camera assembled"
          className="cam-assembled absolute inset-0 w-full h-full object-contain p-8 sm:p-12 md:p-16 opacity-0 will-change-transform"
        />

        {/* Background glow */}
        <div className="cam-glow absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.06] blur-[100px]" />
        </div>

        {/* Logo and text that emerge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
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
