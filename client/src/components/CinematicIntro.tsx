/**
 * Cinematic Intro — Auto-playing video-style animation
 * Full-resolution frames with slow Ken Burns zoom
 * Slow and deliberate pacing (~14 seconds total)
 * Skip button, progress bar, cinematic letterbox
 * Uses localStorage to only show once per session
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// High-quality full-resolution frames
const scenes = [
  {
    image: "/manus-storage/harvest_hq_a3f79b16.jpg",
    title: "CINEMATIC",
    subtitle: "PRODUCTION",
  },
  {
    image: "/manus-storage/tractor_sunset_hq_855704b4.jpg",
    title: "YOUR VISION",
    subtitle: "OUR CRAFT",
  },
  {
    image: "/manus-storage/tack_detail_hq_84097a70.jpg",
    title: "EVERY DETAIL",
    subtitle: "MATTERS",
  },
  {
    image: "/manus-storage/tractor_field_hq_ada37703.jpg",
    title: "BRANDS",
    subtitle: "BROUGHT TO LIFE",
  },
  {
    image: "/manus-storage/bar_hq_ca7624c4.jpg",
    title: "FROM CONCEPT",
    subtitle: "TO SCREEN",
  },
  {
    image: "/manus-storage/greentractor_hq_856fb435.jpg",
    title: "STORIES",
    subtitle: "THAT MOVE",
  },
  {
    image: "/manus-storage/landscape_hq_5f1705e8.jpg",
    title: "WDG",
    subtitle: "VIDEOGRAPHY",
  },
];

const SCENE_DURATION = 2200; // 2.2 seconds per scene
const TOTAL_DURATION = scenes.length * SCENE_DURATION; // ~15.4 seconds total

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    localStorage.setItem("wdg-intro-seen", Date.now().toString());
    if (timerRef.current) clearInterval(timerRef.current);
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    setTimeout(() => onComplete(), 1000);
  }, [isExiting, onComplete]);

  useEffect(() => {
    // Progress bar animation
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: TOTAL_DURATION / 1000,
        ease: "none",
      });
    }

    // Cycle through scenes
    timerRef.current = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev >= scenes.length - 1) return prev;
        return prev + 1;
      });
    }, SCENE_DURATION);

    // Auto-complete
    completeTimerRef.current = setTimeout(() => {
      handleComplete();
    }, TOTAL_DURATION + 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Scene images with Ken Burns */}
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: currentScene === i ? 1 : 0,
                scale: currentScene === i ? [1, 1.12] : 1,
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: SCENE_DURATION / 1000 + 0.5, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              <img
                src={scene.image}
                alt=""
                className="w-full h-full object-cover"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Text overlays */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, scale: 0.4, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <h1
                  className="font-display text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-bold text-white leading-[0.85] tracking-tight"
                  style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.3)" }}
                >
                  {scenes[currentScene].title}
                </h1>
                <p
                  className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gold uppercase tracking-[0.5em] mt-6"
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
                >
                  {scenes[currentScene].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cinematic letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-30" />

          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleComplete}
            className="absolute bottom-[7vh] right-6 sm:right-10 z-50 flex items-center gap-2 px-5 py-2.5 text-[10px] font-body text-white/50 tracking-[0.25em] uppercase hover:text-white transition-all duration-300 border border-white/10 rounded-sm hover:border-gold/50 hover:bg-gold/5 backdrop-blur-sm"
          >
            Skip
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Progress bar */}
          <div className="absolute bottom-[6vh] left-0 right-0 h-[1px] bg-white/5 z-50">
            <div
              ref={progressRef}
              className="h-full bg-gold origin-left will-change-transform"
              style={{ transform: "scaleX(0)", boxShadow: "0 0 6px oklch(0.78 0.12 75 / 0.3)" }}
            />
          </div>

          {/* WDG watermark */}
          <div className="absolute top-[7vh] right-6 sm:right-10 z-50">
            <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center">
              <span className="font-display font-bold text-gold text-[9px]">W</span>
            </div>
          </div>

          {/* Scene counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[7vh] left-6 sm:left-10 z-50 font-mono text-[9px] text-white/20 tracking-[0.2em]"
          >
            {String(currentScene + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
