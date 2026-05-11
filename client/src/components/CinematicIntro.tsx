/**
 * Cinematic Intro — Full-screen opening animation
 * Scrolls through frames from the user's actual projects with text overlays
 * 6-10 second duration, skip button for returning visitors
 * Uses localStorage to remember if user has seen it before
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Frames from the user's actual projects
const introFrames = [
  "/manus-storage/v24044gl0000d2j1hovog65n6opebqtg_0c6e0e5b.jpg",
  "/manus-storage/BEEFBOOMS_5181102e.jpg",
  "/manus-storage/v24044gl0000d2l0pd7og65rlj280s60_56dd821e.jpg",
  "/manus-storage/scene_food1_15e7c2f2.jpg",
  "/manus-storage/v24044gl0000d2pf6rfog65kisjf8rmg_f15652a9.jpg",
  "/manus-storage/v24044gl0000d2gelrnog65nbvibc960_5db9d5d6.jpg",
  "/manus-storage/scene_mov1_bcbe7ec9.jpg",
  "/manus-storage/v24044gl0000d1pagkvog65st33bk2i0_7ff7f72b.jpg",
  "/manus-storage/scene_project2_f22fb1e8.jpg",
  "/manus-storage/v24044gl0000d2cq8tvog65s01lolih0_7b87955f.jpg",
];

// Text overlays that appear during the sequence
const textSequence = [
  { text: "WDG", subtext: "VIDEOGRAPHY", delay: 0.3 },
  { text: "CINEMATIC", subtext: "PRODUCTION", delay: 2.5 },
  { text: "YOUR STORY", subtext: "OUR CRAFT", delay: 4.5 },
  { text: "THE FUTURE", subtext: "STARTS HERE", delay: 6.5 },
];

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeText, setActiveText] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const TOTAL_DURATION = 8000; // 8 seconds
  const FRAME_INTERVAL = TOTAL_DURATION / introFrames.length;

  const handleSkip = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    // Store that user has seen the intro
    localStorage.setItem("wdg-intro-seen", Date.now().toString());
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (frameTimerRef.current) clearInterval(frameTimerRef.current);

    // Dramatic exit animation
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [isExiting, onComplete]);

  useEffect(() => {
    // Progress bar animation
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: TOTAL_DURATION / 1000,
        ease: "none",
      });
    }

    // Cycle through frames
    frameTimerRef.current = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= introFrames.length - 1) return prev;
        return prev + 1;
      });
    }, FRAME_INTERVAL);

    // Text sequence timing
    textSequence.forEach((item, index) => {
      setTimeout(() => {
        setActiveText(index);
      }, item.delay * 1000);
    });

    // Auto-complete after duration
    timerRef.current = setTimeout(() => {
      handleSkip();
    }, TOTAL_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (frameTimerRef.current) clearInterval(frameTimerRef.current);
    };
  }, [FRAME_INTERVAL, handleSkip]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Background frames with Ken Burns effect */}
          <div className="absolute inset-0">
            {introFrames.map((frame, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: currentFrame === index ? 1 : 0,
                  scale: currentFrame === index ? 1.05 : 1.15,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={frame}
                  alt=""
                  className="w-full h-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Cinematic letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black z-10" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Center text content */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeText}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-3">
                  {textSequence[activeText].text}
                </h1>
                <p className="font-body text-sm sm:text-base md:text-lg tracking-[0.4em] text-gold uppercase">
                  {textSequence[activeText].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Horizontal scan lines effect */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleSkip}
            className="absolute bottom-[10vh] right-6 sm:right-10 z-50 flex items-center gap-2 px-4 py-2 text-xs font-body text-white/60 tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 border border-white/20 rounded-sm hover:border-white/40 backdrop-blur-sm"
          >
            Skip
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Progress bar */}
          <div className="absolute bottom-[8vh] left-0 right-0 h-[2px] bg-white/10 z-50">
            <div
              ref={progressRef}
              className="h-full bg-gold w-0"
              style={{ boxShadow: "0 0 10px oklch(0.78 0.12 75 / 0.5)" }}
            />
          </div>

          {/* Frame counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[9vh] left-6 sm:left-10 z-50 font-mono text-xs text-white/40 tracking-wider"
          >
            {String(currentFrame + 1).padStart(2, "0")} / {String(introFrames.length).padStart(2, "0")}
          </motion.div>

          {/* WDG Logo watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-[9vh] right-6 sm:right-10 z-50 flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full border border-gold/60 flex items-center justify-center">
              <span className="font-display font-bold text-gold text-[10px]">W</span>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
