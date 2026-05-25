/**
 * CinematicIntro — if ANY error is thrown on mount, skip to complete immediately.
 * This prevents the intro phase from ever being stuck in a crash loop.
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_SRC = "/assets/intro-video.mp4";
const LOGO_SRC  = "/assets/wdg-logo.png";
const MAX_WAIT_MS = 15000;

const textOverlays = [
  { start: 0.5,  end: 5.0,  titleBold: "ELEVATING",         titleLight: "YOUR BUSINESS", anim: "slideUp",    showLogo: false },
  { start: 5.5,  end: 10.5, titleBold: "ALL YOUR MARKETING", titleLight: "IN ONE PLACE",  anim: "scaleIn",    showLogo: false },
  { start: 11.0, end: 15.5, titleBold: "BUILDING A BRAND",   titleLight: "OR A WEBSITE",  anim: "splitSlide", showLogo: false },
  { start: 16.0, end: 20.5, titleBold: "WE MANAGE",          titleLight: "EVERYTHING",    anim: "dropIn",     showLogo: false },
  { start: 21.0, end: 26.5, titleBold: "WDG",                titleLight: "VIDEOGRAPHY",   anim: "buildUp",    showLogo: true  },
] as const;

const animVariants = {
  slideUp:    { initial: { y: 80, opacity: 0 },                             animate: { y: 0, opacity: 1 },                             exit: { y: -60, opacity: 0 } },
  scaleIn:    { initial: { scale: 0.3, opacity: 0, filter: "blur(15px)" },  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },     exit: { scale: 1.3, opacity: 0, filter: "blur(8px)" } },
  splitSlide: { initial: { x: -200, opacity: 0, skewX: -5 },                animate: { x: 0, opacity: 1, skewX: 0 },                    exit: { x: 200, opacity: 0, skewX: 5 } },
  dropIn:     { initial: { y: -120, opacity: 0, rotateX: 30 },              animate: { y: 0, opacity: 1, rotateX: 0 },                  exit: { y: 80, opacity: 0, rotateX: -15 } },
  buildUp:    { initial: { opacity: 0, scale: 0.5, letterSpacing: "0.8em" },animate: { opacity: 1, scale: 1, letterSpacing: "0.05em" }, exit: { opacity: 0, scale: 1.2 } },
} as const;

interface CinematicIntroProps { onComplete: () => void; }

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentOverlay, setCurrentOverlay] = useState<number | null>(null);
  const [isExiting, setIsExiting]           = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoReady, setVideoReady]           = useState(false);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);
  const mountedRef  = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const handleComplete = useCallback(() => {
    if (!mountedRef.current || isExiting) return;
    setIsExiting(true);
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    try { sessionStorage.setItem("wdg-intro-seen", "true"); } catch { /* private browsing */ }
    setTimeout(() => { if (mountedRef.current) onComplete(); }, 1200);
  }, [isExiting, onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;
    const tick = () => {
      if (!mountedRef.current) return;
      const time = video.currentTime;
      let active: number | null = null;
      for (let i = 0; i < textOverlays.length; i++) {
        if (time >= textOverlays[i].start && time <= textOverlays[i].end) { active = i; break; }
      }
      setCurrentOverlay(active);
      if (progressRef.current && video.duration > 0) {
        progressRef.current.style.transform = `scaleX(${time / video.duration})`;
      }
      if (video.ended || (video.duration > 0 && time >= video.duration - 0.5)) { handleComplete(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };
  }, [videoReady, handleComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const failsafe = setTimeout(() => { if (mountedRef.current && !videoReady) handleComplete(); }, MAX_WAIT_MS);
    let hasStarted = false;
    const startVideo = () => {
      if (hasStarted) return;
      hasStarted = true;
      if (!mountedRef.current) return;
      setVideoReady(true);
      video.play().catch(() => { if (mountedRef.current) setAutoplayBlocked(true); });
    };
    video.addEventListener("canplaythrough", startVideo, { once: true });
    video.addEventListener("canplay",        startVideo, { once: true });
    video.addEventListener("loadeddata",     startVideo, { once: true });
    if (video.readyState >= 2) startVideo();
    const fallback = setTimeout(() => { if (!hasStarted) startVideo(); }, 1500);
    return () => {
      clearTimeout(failsafe); clearTimeout(fallback);
      video.removeEventListener("canplaythrough", startVideo);
      video.removeEventListener("canplay",        startVideo);
      video.removeEventListener("loadeddata",     startVideo);
    };
  }, [handleComplete, videoReady]);

  const activeOverlay = currentOverlay !== null ? textOverlays[currentOverlay] : null;
  const activeAnim    = activeOverlay ? animVariants[activeOverlay.anim] : null;
  const getTitleSize  = (text: string) => text.length > 14
    ? "text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[9rem]"
    : "text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem]";

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="fixed inset-0 z-[200] bg-black overflow-hidden">
          <div className="absolute inset-0">
            <video ref={videoRef} src={VIDEO_SRC} muted playsInline autoPlay preload="auto"
                   className="w-full h-full object-cover" onError={handleComplete} />
          </div>
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
            <AnimatePresence mode="wait">
              {activeOverlay && activeAnim && (
                <motion.div key={currentOverlay} initial={activeAnim.initial} animate={activeAnim.animate} exit={activeAnim.exit} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center">
                  {activeOverlay.showLogo && (
                    <motion.img src={LOGO_SRC} alt="WDG Videography" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto mx-auto mb-6 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  )}
                  <h1 className={`font-display ${getTitleSize(activeOverlay.titleBold)} font-bold text-white leading-[0.85] tracking-tight`} style={{ textShadow: "0 4px 60px rgba(0,0,0,0.7)" }}>
                    {activeOverlay.titleBold}
                  </h1>
                  <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gold uppercase tracking-[0.5em] mt-6" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}>
                    {activeOverlay.titleLight}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-30" />
          <div className="absolute bottom-[2vh] left-0 right-0 h-[4vh] bg-black z-30" />
          <div className="absolute bottom-[2vh] left-0 right-0 h-[2px] bg-white/10 z-40 overflow-hidden">
            <div ref={progressRef} className="h-full bg-gold origin-left" style={{ transform: "scaleX(0)", transition: "none" }} />
          </div>

          {autoplayBlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 cursor-pointer bg-black/50"
                 onClick={() => { videoRef.current?.play().then(() => setAutoplayBlocked(false)).catch(handleComplete); }}>
              <div className="w-24 h-24 rounded-full border-2 border-gold/60 flex items-center justify-center bg-black/60 backdrop-blur-sm hover:bg-gold/20 transition-all duration-300">
                <svg className="w-10 h-10 text-gold ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <p className="text-white/60 text-xs font-body tracking-[0.2em] uppercase mt-5">Tap to play</p>
            </div>
          )}
          <button onClick={handleComplete} className="absolute bottom-[8vh] right-6 sm:right-10 z-50 flex items-center gap-2 px-5 py-2.5 text-[10px] font-body text-white/50 tracking-[0.25em] uppercase hover:text-white transition-all duration-300 border border-white/10 rounded-sm hover:border-gold/50 hover:bg-gold/5 backdrop-blur-sm">
            Skip
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="fixed inset-0 z-[200] bg-black" />
      )}
    </AnimatePresence>
  );
}
