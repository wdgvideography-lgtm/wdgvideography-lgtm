/**
 * Cinematic Intro — Real Video Playback
 * Plays the actual drone footage as a background video
 * Text overlays appear at timed intervals over the live footage
 * Slow, deliberate, cinematic — because it IS cinema
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_SRC = "/assets/intro-video.mp4";
const LOGO_SRC = "/assets/wdg-logo.png";

// Text overlays timed to key moments in the video
// Video is ~26.9 seconds played at normal speed (1x)
// Segments: harvest(0-11s) → equestrian(11-14.5s) → bar(14.5-20.5s) → DJI drone(20.5-26.9s)
const textOverlays = [
  { start: 0.5, end: 5.0, titleBold: "ELEVATING", titleLight: "YOUR BUSINESS", anim: "slideUp", showLogo: false },
  { start: 5.5, end: 10.5, titleBold: "ALL YOUR MARKETING", titleLight: "IN ONE PLACE", anim: "scaleIn", showLogo: false },
  { start: 11.0, end: 15.5, titleBold: "BUILDING A BRAND", titleLight: "OR A WEBSITE", anim: "splitSlide", showLogo: false },
  { start: 16.0, end: 20.5, titleBold: "WE MANAGE", titleLight: "EVERYTHING", anim: "dropIn", showLogo: false },
  { start: 21.0, end: 26.5, titleBold: "WDG", titleLight: "VIDEOGRAPHY", anim: "buildUp", showLogo: true },
];

// Unique animation variants for each text overlay
const animVariants: Record<string, { initial: any; animate: any; exit: any }> = {
  slideUp: {
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -60, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.3, opacity: 0, filter: "blur(15px)" },
    animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
    exit: { scale: 1.3, opacity: 0, filter: "blur(8px)" },
  },
  splitSlide: {
    initial: { x: -200, opacity: 0, skewX: -5 },
    animate: { x: 0, opacity: 1, skewX: 0 },
    exit: { x: 200, opacity: 0, skewX: 5 },
  },
  dropIn: {
    initial: { y: -120, opacity: 0, rotateX: 30 },
    animate: { y: 0, opacity: 1, rotateX: 0 },
    exit: { y: 80, opacity: 0, rotateX: -15 },
  },
  buildUp: {
    initial: { opacity: 0, scale: 0.5, letterSpacing: "0.8em" },
    animate: { opacity: 1, scale: 1, letterSpacing: "0.05em" },
    exit: { opacity: 0, scale: 1.2 },
  },
};

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentOverlay, setCurrentOverlay] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleComplete = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem("wdg-intro-seen", "true");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTimeout(() => onComplete(), 1200);
  }, [isExiting, onComplete]);

  // Track video time and update text overlays
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    const updateOverlays = () => {
      const time = video.currentTime;

      // Find active overlay
      let active: number | null = null;
      for (let i = 0; i < textOverlays.length; i++) {
        if (time >= textOverlays[i].start && time <= textOverlays[i].end) {
          active = i;
          break;
        }
      }
      setCurrentOverlay(active);

      // Update progress bar
      if (progressRef.current && video.duration) {
        const progress = time / video.duration;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // Check if video ended
      if (video.ended || time >= video.duration - 0.5) {
        handleComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(updateOverlays);
    };

    rafRef.current = requestAnimationFrame(updateOverlays);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady, handleComplete]);

  // Start video playback - handle desktop autoplay restrictions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasStarted = false;

    const startVideo = () => {
      if (hasStarted) return;
      hasStarted = true;
      setVideoReady(true);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked — show a play prompt
          setAutoplayBlocked(true);
        });
      }
    };

    // Try multiple events to ensure video starts
    video.addEventListener("canplaythrough", startVideo);
    video.addEventListener("canplay", startVideo);
    video.addEventListener("loadeddata", startVideo);

    // If video is already ready (cached)
    if (video.readyState >= 2) {
      startVideo();
    }

    // Fallback: try after a short delay
    const fallbackTimer = setTimeout(() => {
      if (!hasStarted) startVideo();
    }, 1500);

    return () => {
      video.removeEventListener("canplaythrough", startVideo);
      video.removeEventListener("canplay", startVideo);
      video.removeEventListener("loadeddata", startVideo);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const activeOverlay = currentOverlay !== null ? textOverlays[currentOverlay] : null;
  const activeAnim = activeOverlay ? animVariants[activeOverlay.anim] : null;

  // Determine font size for the bold title — "ALL YOUR MARKETING" needs to be slightly smaller
  const getTitleSize = (text: string) => {
    if (text.length > 14) {
      // Slightly smaller for longer text like "ALL YOUR MARKETING"
      return "text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[9rem]";
    }
    return "text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem]";
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              autoPlay
              preload="auto"
              className="w-full h-full object-cover"
              onLoadedMetadata={() => {
                // Video plays at normal speed - timings are matched to video duration
              }}
              onError={() => {
                // If video fails to load, skip the intro
                handleComplete();
              }}
            />
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Text overlays */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
            <AnimatePresence mode="wait">
              {activeOverlay && activeAnim && (
                <motion.div
                  key={currentOverlay}
                  initial={activeAnim.initial}
                  animate={activeAnim.animate}
                  exit={activeAnim.exit}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  {/* Logo appears above text on final slide */}
                  {activeOverlay.showLogo && (
                    <motion.img
                      src={LOGO_SRC}
                      alt="WDG Videography"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto mx-auto mb-6 object-contain"
                    />
                  )}
                  <h1
                    className={`font-display ${getTitleSize(activeOverlay.titleBold)} font-bold text-white leading-[0.85] tracking-tight`}
                    style={{ textShadow: "0 4px 60px rgba(0,0,0,0.7), 0 0 120px rgba(0,0,0,0.4)" }}
                  >
                    {activeOverlay.titleBold}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gold uppercase tracking-[0.5em] mt-6"
                    style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
                  >
                    {activeOverlay.titleLight}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cinematic letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-30" />

          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-[0.015] mix-blend-overlay"
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
            <img
              src={LOGO_SRC}
              alt="WDG"
              className="h-8 w-auto object-contain opacity-70"
            />
          </div>

          {/* Loading state */}
          {!videoReady && (
            <div className="absolute inset-0 flex items-center justify-center z-40">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          )}

          {/* Autoplay blocked - tap to play prompt */}
          {autoplayBlocked && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-40 cursor-pointer"
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.play().then(() => {
                    setAutoplayBlocked(false);
                  }).catch(() => {});
                }
              }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-gold/60 flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-gold/20 transition-all duration-300">
                <svg className="w-8 h-8 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs font-body tracking-[0.2em] uppercase mt-4">Tap to play</p>
            </div>
          )}
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
