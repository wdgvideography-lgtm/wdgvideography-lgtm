import { useEffect, useRef } from "react";

/** Adds class "in" to any descendant (or the root itself) carrying class "rv" once it scrolls into view. */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>(".rv"))].filter((n) => n.classList.contains("rv"));
    if (!("IntersectionObserver" in window)) { nodes.forEach((n) => n.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Shared control of the navbar colour: several sections may ask for the dark (white-text) nav. */
const navClaims = new Set<string>();
export function claimDarkNav(key: string, on: boolean) {
  if (on) navClaims.add(key); else navClaims.delete(key);
  if (navClaims.size) document.body.dataset.nav = "dark"; else delete document.body.dataset.nav;
}

/** Play a background video the way iOS/Safari expects: muted + inline attributes set on the element itself. */
export function playVideo(v: HTMLVideoElement | null) {
  if (!v) return;
  if (!v.hasAttribute("muted")) { v.muted = true; v.defaultMuted = true; v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); }
  if (v.paused) v.play().catch(() => {});
}
export function pauseVideo(v: HTMLVideoElement | null) { if (v && !v.paused) v.pause(); }
