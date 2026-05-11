/**
 * Cinematic Intro — Scroll-driven full-screen animation
 * Pinned viewport where scenes zoom in and text pops up as user scrolls
 * Text stays visible for majority of each scene's scroll duration
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    image: "/manus-storage/v24044gl0000d2j1hovog65n6opebqtg_0c6e0e5b.jpg",
    title: "CINEMATIC",
    subtitle: "PRODUCTION",
  },
  {
    image: "/manus-storage/v24044gl0000d2pf6rfog65kisjf8rmg_f15652a9.jpg",
    title: "YOUR VISION",
    subtitle: "OUR CRAFT",
  },
  {
    image: "/manus-storage/v24044gl0000d2l0pd7og65rlj280s60_56dd821e.jpg",
    title: "EVERY FRAME",
    subtitle: "TELLS A STORY",
  },
  {
    image: "/manus-storage/scene_food1_15e7c2f2.jpg",
    title: "BRANDS",
    subtitle: "BROUGHT TO LIFE",
  },
  {
    image: "/manus-storage/v24044gl0000d2gelrnog65nbvibc960_5db9d5d6.jpg",
    title: "FROM CONCEPT",
    subtitle: "TO SCREEN",
  },
  {
    image: "/manus-storage/scene_mov1_bcbe7ec9.jpg",
    title: "WDG",
    subtitle: "VIDEOGRAPHY",
  },
];

export default function CinematicIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!section || !pinned) return;

    const ctx = gsap.context(() => {
      const numScenes = scenes.length;

      // Main scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pinned,
          scrub: 0.5,
          pinSpacing: false,
        },
      });

      scenes.forEach((_, i) => {
        const sceneEl = pinned.querySelector(`[data-scene="${i}"]`) as HTMLElement;
        const imgEl = pinned.querySelector(`[data-img="${i}"]`) as HTMLElement;
        const titleEl = pinned.querySelector(`[data-title="${i}"]`) as HTMLElement;
        const subEl = pinned.querySelector(`[data-sub="${i}"]`) as HTMLElement;

        if (!sceneEl || !imgEl || !titleEl || !subEl) return;

        const seg = 1 / numScenes;
        const start = i * seg;

        // === SCENE FADE IN ===
        if (i > 0) {
          tl.fromTo(sceneEl, { opacity: 0 }, { opacity: 1, duration: seg * 0.1 }, start);
        }

        // === ZOOM (entire scene duration) ===
        tl.fromTo(
          imgEl,
          { scale: 1.0 },
          { scale: 1.45, duration: seg, ease: "none" },
          start
        );

        // === TEXT IN (appears early, stays long) ===
        // Title pops in at 5% of scene
        tl.fromTo(
          titleEl,
          { opacity: 0, scale: 0.3, y: 80 },
          { opacity: 1, scale: 1, y: 0, duration: seg * 0.15, ease: "back.out(2)" },
          start + seg * 0.05
        );

        // Subtitle appears at 12%
        tl.fromTo(
          subEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: seg * 0.1, ease: "power2.out" },
          start + seg * 0.15
        );

        // === TEXT OUT (fades near end of scene) ===
        // Title fades at 75% of scene
        tl.to(
          titleEl,
          { opacity: 0, scale: 1.4, y: -50, duration: seg * 0.12, ease: "power2.in" },
          start + seg * 0.75
        );

        // Subtitle fades at 78%
        tl.to(
          subEl,
          { opacity: 0, y: -25, duration: seg * 0.1 },
          start + seg * 0.78
        );

        // === SCENE FADE OUT (crossfade) ===
        if (i < numScenes - 1) {
          tl.to(sceneEl, { opacity: 0, duration: seg * 0.1 }, start + seg * 0.9);
        } else {
          tl.to(sceneEl, { opacity: 0, duration: seg * 0.15 }, start + seg * 0.85);
        }
      });

      // Progress bar
      const progressEl = pinned.querySelector(".intro-progress") as HTMLElement;
      if (progressEl) {
        gsap.fromTo(
          progressEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSkip = () => {
    const section = sectionRef.current;
    if (!section) return;
    const end = section.offsetTop + section.offsetHeight;
    window.scrollTo({ top: end, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} style={{ height: `${scenes.length * 150}vh` }}>
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-black">
        {/* Scenes */}
        {scenes.map((scene, i) => (
          <div
            key={i}
            data-scene={i}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
          >
            {/* Image */}
            <div data-img={i} className="absolute inset-0 will-change-transform origin-center">
              <img
                src={scene.image}
                alt=""
                className="w-full h-full object-cover"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Text - centered with dramatic styling */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
              <h1
                data-title={i}
                className="font-display text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-bold text-white text-center leading-[0.85] tracking-tight opacity-0 will-change-transform"
                style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3)" }}
              >
                {scene.title}
              </h1>
              <p
                data-sub={i}
                className="font-body text-base sm:text-lg md:text-xl text-gold uppercase tracking-[0.5em] mt-6 opacity-0 will-change-transform"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                {scene.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[5vh] bg-black z-40" />
        <div className="absolute bottom-0 left-0 right-0 h-[5vh] bg-black z-40" />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-40 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-[6vh] right-6 sm:right-10 z-50 flex items-center gap-2 px-5 py-2.5 text-[10px] font-body text-white/60 tracking-[0.25em] uppercase hover:text-white transition-all duration-300 border border-white/15 rounded-sm hover:border-gold/50 hover:bg-gold/5 backdrop-blur-sm"
        >
          Skip
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-[5vh] left-0 right-0 h-[2px] bg-white/5 z-50">
          <div
            className="intro-progress h-full bg-gold origin-left will-change-transform"
            style={{ transform: "scaleX(0)", boxShadow: "0 0 8px oklch(0.78 0.12 75 / 0.4)" }}
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/30 font-body tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/60 animate-bounce" />
          </div>
        </div>

        {/* WDG watermark */}
        <div className="absolute top-[6vh] right-6 sm:right-10 z-50">
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
            <span className="font-display font-bold text-gold text-[10px]">W</span>
          </div>
        </div>

        {/* Top left text */}
        <div className="absolute top-[6vh] left-6 sm:left-10 z-50 font-mono text-[9px] text-white/20 tracking-[0.2em]">
          WDG.VIDEOGRAPHY
        </div>
      </div>
    </div>
  );
}
