/**
 * Cinematic Intro — Scroll-driven full-screen animation
 * ALL frames are landscape orientation
 * Slow and deliberate pacing - each scene gets plenty of scroll distance
 * Zooms into scenes with dramatic text reveals
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// All landscape frames - consistent orientation
const scenes = [
  {
    image: "/manus-storage/harvest_landscape_3cc798be.jpg",
    title: "CINEMATIC",
    subtitle: "PRODUCTION",
  },
  {
    image: "/manus-storage/new_02_558a8953.jpg",
    title: "YOUR VISION",
    subtitle: "OUR CRAFT",
  },
  {
    image: "/manus-storage/new_04_7303a2ee.jpg",
    title: "EVERY DETAIL",
    subtitle: "MATTERS",
  },
  {
    image: "/manus-storage/new_03_6e15a61a.jpg",
    title: "BRANDS",
    subtitle: "BROUGHT TO LIFE",
  },
  {
    image: "/manus-storage/new_06_eb8cdc7a.jpg",
    title: "FROM CONCEPT",
    subtitle: "TO SCREEN",
  },
  {
    image: "/manus-storage/greentractor_landscape_bc0ff71e.jpg",
    title: "STORIES",
    subtitle: "THAT MOVE",
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

      // Main scroll-driven timeline - SLOW scrub for deliberate feel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pinned,
          scrub: 1.2, // Higher scrub = smoother/slower response
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

        // === SCENE FADE IN (crossfade) ===
        if (i > 0) {
          tl.fromTo(sceneEl, { opacity: 0 }, { opacity: 1, duration: seg * 0.12 }, start);
        }

        // === SLOW ZOOM (entire scene duration) ===
        tl.fromTo(
          imgEl,
          { scale: 1.0 },
          { scale: 1.35, duration: seg, ease: "none" },
          start
        );

        // === TEXT APPEARS (early, stays visible for most of scene) ===
        tl.fromTo(
          titleEl,
          { opacity: 0, scale: 0.3, y: 80 },
          { opacity: 1, scale: 1, y: 0, duration: seg * 0.18, ease: "back.out(1.7)" },
          start + seg * 0.05
        );

        tl.fromTo(
          subEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: seg * 0.12, ease: "power2.out" },
          start + seg * 0.18
        );

        // === TEXT FADES OUT (near end of scene) ===
        tl.to(
          titleEl,
          { opacity: 0, scale: 1.3, y: -40, duration: seg * 0.12, ease: "power2.in" },
          start + seg * 0.78
        );

        tl.to(
          subEl,
          { opacity: 0, y: -20, duration: seg * 0.1 },
          start + seg * 0.8
        );

        // === SCENE FADES OUT ===
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
              scrub: 0.5,
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
    // MORE scroll distance per scene = slower, more deliberate
    <div ref={sectionRef} style={{ height: `${scenes.length * 200}vh` }}>
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
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
              }}
            />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
              <h1
                data-title={i}
                className="font-display text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-bold text-white text-center leading-[0.85] tracking-tight opacity-0 will-change-transform"
                style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.3)" }}
              >
                {scene.title}
              </h1>
              <p
                data-sub={i}
                className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gold uppercase tracking-[0.5em] mt-6 opacity-0 will-change-transform"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
              >
                {scene.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-40" />
        <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-40" />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-40 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-[7vh] right-6 sm:right-10 z-50 flex items-center gap-2 px-5 py-2.5 text-[10px] font-body text-white/50 tracking-[0.25em] uppercase hover:text-white transition-all duration-300 border border-white/10 rounded-sm hover:border-gold/50 hover:bg-gold/5 backdrop-blur-sm"
        >
          Skip
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-[6vh] left-0 right-0 h-[1px] bg-white/5 z-50">
          <div
            className="intro-progress h-full bg-gold origin-left will-change-transform"
            style={{ transform: "scaleX(0)", boxShadow: "0 0 6px oklch(0.78 0.12 75 / 0.3)" }}
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
          <span className="text-[8px] text-white/25 font-body tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/50 animate-bounce" />
          </div>
        </div>

        {/* WDG watermark */}
        <div className="absolute top-[7vh] right-6 sm:right-10 z-50">
          <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center">
            <span className="font-display font-bold text-gold text-[9px]">W</span>
          </div>
        </div>
      </div>
    </div>
  );
}
