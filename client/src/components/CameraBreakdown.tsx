/**
 * Camera Video Section — Auto-playing video (not scroll-driven)
 * Plays the cinematic camera macro video
 * When video ends, holds on last frame and shows WDG Videography logo for 4 seconds
 * Then transitions to the hero section
 * Hardened: max-wait failsafe, unmount guard, autoplay fallback
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CAMERA_VIDEO = "/assets/camera-video.mp4";
const LOGO_IMG = "/assets/wdg-logo.png";
/** Max time to wait for video before skipping — prevents infinite black screen */
const MAX_WAIT_MS = 12000;

interface CameraBreakdownProps {
  onComplete: () => void;
}

export default function CameraBreakdown({ onComplete }: CameraBreakdownProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const mountedRef = useRef(true);
  const autoplayBlocked = useRef(false);
  const [showTapToPlay, setShowTapToPlay] = useState(false);

  const handleExit = useCallback(() => {
    if (!mountedRef.current || isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (mountedRef.current) onComplete();
    }, 1000);
  }, [isExiting, onComplete]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // When video ends, show logo for 4 seconds then exit
  useEffect(() => {
    if (!videoEnded) return;
    const timer = setTimeout(() => handleExit(), 4000);
    return () => clearTimeout(timer);
  }, [videoEnded, handleExit]);

  // Start video playback + max-wait failsafe
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Failsafe: if video hasn't started playing within MAX_WAIT_MS, skip intro
    const failsafe = setTimeout(() => {
      if (mountedRef.current && video.paused && !videoEnded) {
        handleExit();
      }
    }, MAX_WAIT_MS);

    const tryPlay = async () => {
      try {
        await video.play();
        autoplayBlocked.current = false;
        setShowTapToPlay(false);
      } catch {
        autoplayBlocked.current = true;
        setShowTapToPlay(true);
      }
    };

    const handleCanPlay = () => tryPlay();
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    if (video.readyState >= 2) tryPlay();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      clearTimeout(failsafe);
    };
  }, [handleExit, videoEnded]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[190] bg-black overflow-hidden"
        >
          <video
            ref={videoRef}
            src={CAMERA_VIDEO}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={() => setVideoEnded(true)}
          />

          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-black"
                />
                <motion.img
                  src={LOGO_IMG}
                  alt="WDG Videography"
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative z-10 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6"
                >
                  WDG Videography
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="relative z-10 font-body text-sm sm:text-base text-gold uppercase tracking-[0.35em] mt-3"
                >
                  Cinematic Production & Marketing
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {showTapToPlay && !videoEnded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-40 cursor-pointer"
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.play()
                    .then(() => setShowTapToPlay(false))
                    .catch(() => handleExit());
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

          <button
            onClick={handleExit}
            className="absolute bottom-8 right-6 sm:right-10 z-50 flex items-center gap-2 px-5 py-2.5 text-[10px] font-body text-white/50 tracking-[0.25em] uppercase hover:text-white transition-all duration-300 border border-white/10 rounded-sm hover:border-gold/50 hover:bg-gold/5 backdrop-blur-sm"
          >
            Skip
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[190] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
