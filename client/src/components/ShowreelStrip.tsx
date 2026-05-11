/**
 * Showreel Strip — Noir Cinema Design
 * Infinite horizontal scrolling marquee with keywords
 * Creates a visual break between sections with cinematic flair
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = [
  "CINEMATIC",
  "STORYTELLING",
  "BRAND VIDEOS",
  "SOCIAL MEDIA",
  "REELS",
  "MARKETING",
  "PRODUCTION",
  "STRATEGY",
  "CONTENT",
  "GROWTH",
  "CREATIVE",
  "DIGITAL",
];

export default function ShowreelStrip() {
  const innerRef = useRef<HTMLDivElement>(null);
  const innerRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const inner2 = innerRef2.current;
    if (!inner || !inner2) return;

    // Forward scroll
    const totalWidth = inner.scrollWidth / 2;
    const tl1 = gsap.to(inner, {
      x: -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    // Reverse scroll
    const totalWidth2 = inner2.scrollWidth / 2;
    gsap.set(inner2, { x: -totalWidth2 });
    const tl2 = gsap.to(inner2, {
      x: 0,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl1.kill();
      tl2.kill();
    };
  }, []);

  const renderWords = (wordList: string[]) => (
    <>
      {[...wordList, ...wordList].map((word, i) => (
        <div key={i} className="flex items-center gap-8 shrink-0">
          <span className="font-display text-xl md:text-2xl font-bold tracking-[0.15em] whitespace-nowrap text-foreground/15">
            {word}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
        </div>
      ))}
    </>
  );

  return (
    <div className="relative py-10 overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Forward */}
      <div className="mb-4">
        <div ref={innerRef} className="flex items-center gap-8">
          {renderWords(words)}
        </div>
      </div>

      {/* Row 2 - Reverse, slightly dimmer */}
      <div className="opacity-40">
        <div ref={innerRef2} className="flex items-center gap-8">
          {renderWords([...words].reverse())}
        </div>
      </div>
    </div>
  );
}
