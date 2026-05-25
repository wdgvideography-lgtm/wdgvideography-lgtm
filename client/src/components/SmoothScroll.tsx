/**
 * SmoothScroll wrapper — stripped down.
 * GSAP ScrollTrigger removed from here. Cursor spotlight only, paused when tab hidden.
 */

import { useEffect, useRef, type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const animate = () => {
      if (!document.hidden) {
        cursorX += (mouseX - cursorX) * 0.08;
        cursorY += (mouseY - cursorY) * 0.08;
        cursor.style.transform = `translate(${cursorX - 150}px, ${cursorY - 150}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[5] hidden lg:block"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.03) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {children}
    </div>
  );
}
