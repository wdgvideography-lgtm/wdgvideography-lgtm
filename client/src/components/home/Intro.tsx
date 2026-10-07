/** Intro — paragraph lights up word by word as it scrolls into view. */
import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/hooks/useReveal";

const WORDS: Array<string | { i: string }> =
  "We’re a Cheltenham studio that films farms, restaurants and local brands, then builds the".split(" ").map((w) => w);
WORDS.push({ i: "websites and socials" });
WORDS.push(..."that put those films in front of the right people.".split(" "));

export default function Intro() {
  const p = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = p.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (prefersReducedMotion()) { spans.forEach((s) => (s.style.opacity = "1")); return; }
    let raf = 0;
    const tick = () => {
      const b = el.getBoundingClientRect();
      const bp = clamp((window.innerHeight * 0.85 - b.top) / (b.height + window.innerHeight * 0.35));
      spans.forEach((s, i) => (s.style.opacity = i / spans.length < bp ? "1" : ".14"));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="about" className="px-5 sm:px-8 lg:px-14 pt-[18vh] pb-[12vh] grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-[6vw]">
      <span className="eyebrow">01 — Who we are</span>
      <p ref={p} className="text-[clamp(30px,3.6vw,58px)] leading-[1.12] tracking-[-.02em]">
        {WORDS.map((w, i) =>
          typeof w === "string" ? (
            <span key={i} data-w className="transition-opacity duration-300" style={{ opacity: 0.14 }}>{w} </span>
          ) : (
            <span key={i} data-w className="serif-accent transition-opacity duration-300" style={{ opacity: 0.14 }}>{w.i} </span>
          ),
        )}
      </p>
    </section>
  );
}
