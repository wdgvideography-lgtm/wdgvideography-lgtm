/**
 * Camera Video Section — Replaces the camera breakdown animation
 * Plays the cinematic macro camera video as a full-screen pinned section
 * WDG Videography text appears after the video completes
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAMERA_VIDEO = "/manus-storage/camera-video_a2989dd1.mp4";
const LOGO_IMG = "/manus-storage/wdg-logo-transparent_d82f27ab.png";

export default function CameraBreakdown() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const video = videoRef.current;
    if (!section || !pinned || !video) return;

    const ctx = gsap.context(() => {
      // Pin the section and scrub the video with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pinned,
          scrub: 0.5,
          pinSpacing: false,
          onUpdate: (self) => {
            if (video.duration) {
              // Scrub video playback with scroll position
              const progress = self.progress;
              if (progress < 0.85) {
                // First 85% of scroll = video playback
                video.currentTime = (progress / 0.85) * video.duration;
              }
            }
          },
        },
      });

      // Logo and text appear in the last 15% of scroll
      const logoEl = pinned.querySelector(".cam-logo") as HTMLElement;
      const titleEl = pinned.querySelector(".cam-title") as HTMLElement;
      const subtitleEl = pinned.querySelector(".cam-subtitle") as HTMLElement;
      const overlayEl = pinned.querySelector(".cam-overlay") as HTMLElement;

      // Darken video and show logo
      tl.fromTo(overlayEl, { opacity: 0 }, { opacity: 0.7, duration: 0.05 }, 0.82);
      tl.fromTo(logoEl,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.06, ease: "back.out(1.5)" },
        0.85
      );
      tl.fromTo(titleEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.89
      );
      tl.fromTo(subtitleEl,
        { opacity: 0, y: 15, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.04 },
        0.91
      );

      // Fade everything out at the end
      tl.to(logoEl, { opacity: 0, y: -15, duration: 0.04 }, 0.96);
      tl.to(titleEl, { opacity: 0, duration: 0.03 }, 0.97);
      tl.to(subtitleEl, { opacity: 0, duration: 0.03 }, 0.97);
      tl.to(overlayEl, { opacity: 0, duration: 0.03 }, 0.97);
    }, section);

    return () => ctx.revert();
  }, [videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => setVideoReady(true);
    video.addEventListener("loadeddata", handleReady);
    if (video.readyState >= 2) setVideoReady(true);

    return () => video.removeEventListener("loadeddata", handleReady);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "400vh" }}>
      <div ref={pinnedRef} className="h-screen w-full overflow-hidden bg-black relative flex items-center justify-center">
        {/* Video */}
        <video
          ref={videoRef}
          src={CAMERA_VIDEO}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text (starts invisible) */}
        <div className="cam-overlay absolute inset-0 bg-black opacity-0 z-10" />

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
          <span className="text-[9px] text-white/30 font-body tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/40 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
