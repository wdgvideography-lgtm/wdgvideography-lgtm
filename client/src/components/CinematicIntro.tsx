/**
 * Cinematic Intro — Continuous Drone Flight
 * Directional transitions (fly left, fly right, push forward, swoop)
 * Each scene has a unique text animation
 * Outdoor/drone shots throughout, ending on bar shot
 * Slow and deliberate pacing
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Scene configuration with transition directions and text animation types
const scenes = [
  {
    image: "/manus-storage/harvest_hq_a3f79b16.jpg",
    title: "CINEMATIC",
    subtitle: "PRODUCTION",
    transition: "flyRight", // enters from left, exits to right
    textAnim: "slideLeft", // text slides in from left
  },
  {
    image: "/manus-storage/drone_02_d52a8c6d.jpg",
    title: "YOUR VISION",
    subtitle: "OUR CRAFT",
    transition: "flyLeft", // enters from right
    textAnim: "scaleBlur", // scales up from blur
  },
  {
    image: "/manus-storage/tractor_sunset_hq_855704b4.jpg",
    title: "EVERY FRAME",
    subtitle: "TELLS A STORY",
    transition: "pushForward", // zooms in from behind
    textAnim: "typewriter", // letters reveal one by one
  },
  {
    image: "/manus-storage/landscape_hq_5f1705e8.jpg",
    title: "STORIES",
    subtitle: "THAT MOVE",
    transition: "flyRight",
    textAnim: "dropIn", // drops from above
  },
  {
    image: "/manus-storage/drone_03_7722cf9f.jpg",
    title: "FROM CONCEPT",
    subtitle: "TO SCREEN",
    transition: "swoopUp", // rises from below
    textAnim: "splitSlide", // title from left, subtitle from right
  },
  {
    image: "/manus-storage/drone_04_7d274bb4.jpg",
    title: "BRANDS",
    subtitle: "BROUGHT TO LIFE",
    transition: "flyLeft",
    textAnim: "glitch", // flicker/glitch reveal
  },
  {
    image: "/manus-storage/greentractor_hq_856fb435.jpg",
    title: "THE FUTURE",
    subtitle: "STARTS HERE",
    transition: "pushForward",
    textAnim: "fadeScale", // gentle fade with scale
  },
  {
    image: "/manus-storage/bar_hq_ca7624c4.jpg",
    title: "WDG",
    subtitle: "VIDEOGRAPHY",
    transition: "flyRight",
    textAnim: "buildUp", // letters build up one by one then hold
  },
];

const SCENE_DURATION = 2400; // 2.4s per scene
const TOTAL_DURATION = scenes.length * SCENE_DURATION;

// Transition variants for the image container
const imageTransitions: Record<string, { initial: any; animate: any; exit: any }> = {
  flyRight: {
    initial: { x: "-100%", scale: 1.1 },
    animate: { x: "0%", scale: 1 },
    exit: { x: "100%", scale: 0.95 },
  },
  flyLeft: {
    initial: { x: "100%", scale: 1.1 },
    animate: { x: "0%", scale: 1 },
    exit: { x: "-100%", scale: 0.95 },
  },
  pushForward: {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
  },
  swoopUp: {
    initial: { y: "100%", scale: 1.1, rotate: 2 },
    animate: { y: "0%", scale: 1, rotate: 0 },
    exit: { y: "-100%", scale: 0.95, rotate: -1 },
  },
};

// Text animation variants
function getTextVariants(type: string) {
  switch (type) {
    case "slideLeft":
      return {
        title: { initial: { x: -200, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        subtitle: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
      };
    case "scaleBlur":
      return {
        title: { initial: { scale: 0.2, opacity: 0, filter: "blur(20px)" }, animate: { scale: 1, opacity: 1, filter: "blur(0px)" } },
        subtitle: { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
      };
    case "typewriter":
      return {
        title: { initial: { opacity: 0, width: 0 }, animate: { opacity: 1, width: "auto" } },
        subtitle: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
      };
    case "dropIn":
      return {
        title: { initial: { y: -150, opacity: 0, rotateX: 45 }, animate: { y: 0, opacity: 1, rotateX: 0 } },
        subtitle: { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 } },
      };
    case "splitSlide":
      return {
        title: { initial: { x: -300, opacity: 0 }, animate: { x: 0, opacity: 1 } },
        subtitle: { initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 } },
      };
    case "glitch":
      return {
        title: { initial: { opacity: 0, skewX: 20, x: 50 }, animate: { opacity: 1, skewX: 0, x: 0 } },
        subtitle: { initial: { opacity: 0, skewX: -10 }, animate: { opacity: 1, skewX: 0 } },
      };
    case "fadeScale":
      return {
        title: { initial: { scale: 0.8, opacity: 0, y: 30 }, animate: { scale: 1, opacity: 1, y: 0 } },
        subtitle: { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } },
      };
    case "buildUp":
      return {
        title: { initial: { opacity: 0, scale: 0.5, letterSpacing: "0.5em" }, animate: { opacity: 1, scale: 1, letterSpacing: "0.02em" } },
        subtitle: { initial: { opacity: 0, letterSpacing: "1em" }, animate: { opacity: 1, letterSpacing: "0.5em" } },
      };
    default:
      return {
        title: { initial: { opacity: 0 }, animate: { opacity: 1 } },
        subtitle: { initial: { opacity: 0 }, animate: { opacity: 1 } },
      };
  }
}

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
    sessionStorage.setItem("wdg-intro-seen", "true");
    if (timerRef.current) clearInterval(timerRef.current);
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    setTimeout(() => onComplete(), 1200);
  }, [isExiting, onComplete]);

  useEffect(() => {
    // Progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: TOTAL_DURATION / 1000,
        ease: "none",
      });
    }

    // Scene cycling
    timerRef.current = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev >= scenes.length - 1) return prev;
        return prev + 1;
      });
    }, SCENE_DURATION);

    // Auto-complete after all scenes
    completeTimerRef.current = setTimeout(() => {
      handleComplete();
    }, TOTAL_DURATION + 800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [handleComplete]);

  const scene = scenes[currentScene];
  const transition = imageTransitions[scene.transition];
  const textVariants = getTextVariants(scene.textAnim);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Image transitions - continuous drone flight */}
          <AnimatePresence mode="sync">
            <motion.div
              key={currentScene}
              initial={transition.initial as any}
              animate={transition.animate as any}
              exit={transition.exit as any}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              {/* Image with slow drift */}
              <motion.div
                animate={{
                  scale: [1, 1.08],
                  x: [0, currentScene % 2 === 0 ? 15 : -15],
                }}
                transition={{ duration: SCENE_DURATION / 1000 + 1, ease: "linear" }}
                className="absolute inset-0"
              >
                <img
                  src={scene.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35" />

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Text overlays - unique per scene */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentScene}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.h1
                  initial={textVariants.title.initial}
                  animate={textVariants.title.animate}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-bold text-white leading-[0.85] tracking-tight"
                  style={{ textShadow: "0 4px 60px rgba(0,0,0,0.7), 0 0 120px rgba(0,0,0,0.4)" }}
                >
                  {scene.title}
                </motion.h1>
                <motion.p
                  initial={textVariants.subtitle.initial}
                  animate={textVariants.subtitle.animate}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gold uppercase tracking-[0.5em] mt-6"
                  style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
                >
                  {scene.subtitle}
                </motion.p>
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
            transition={{ delay: 2 }}
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
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
