/**
 * Navbar — editorial redesign.
 * Light by default; switches to a dark/white treatment when the page sets
 * `data-nav="dark"` on <body> (used while the hero video fills the screen).
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const navLinks = [
  { label: "Work", href: "/#showreel" },
  { label: "Services", href: "/#services" },
  { label: "Websites", href: "/website-design" },
  { label: "Apps", href: "/app-development" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const body = document.body;
    const read = () => {
      setDark(body.dataset.nav === "dark");
      setScrolled(window.scrollY > 24);
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(body, { attributes: true, attributeFilter: ["data-nav"] });
    window.addEventListener("scroll", read, { passive: true });
    return () => { mo.disconnect(); window.removeEventListener("scroll", read); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onDark = dark || open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${onDark ? "text-white" : "text-foreground"} ${
          scrolled && !onDark ? "bg-background/85 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-14 h-[72px]">
          <a href="/" aria-label="WDG Videography home" className="flex items-center">
            <img
              src={onDark ? "/assets/wdg-logo.png" : "/assets/wdg-logo-dark.png"}
              alt="WDG Videography"
              width={160}
              height={90}
              className="h-9 w-auto object-contain"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[15px] font-medium opacity-85 hover:opacity-100 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/contact" className={`pill hidden sm:inline-flex ${onDark ? "!bg-white !text-foreground hover:!bg-gold" : ""}`}>
              Start a project
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-11 h-11 grid place-items-center rounded-full"
            >
              <span className="relative block w-6 h-4">
                <span className={`absolute left-0 right-0 h-[2px] bg-current transition-all ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 right-0 top-1/2 h-[2px] bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 right-0 h-[2px] bg-current transition-all ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-white transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ background: "oklch(0.17 0.01 60)" }}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col justify-end px-6 pb-10 pt-24">
          <nav aria-label="Mobile" className="flex flex-col gap-2 mb-10">
            {[...navLinks, { label: "Contact", href: "/contact" }].map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-[44px] leading-[1.05] transition-all"
                style={{ transitionDelay: `${i * 50}ms`, transform: open ? "none" : "translateY(14px)", opacity: open ? 1 : 0 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="/contact" className="pill gold justify-center">Start a project</a>
          <p className="mono-tag mt-8 text-white/50">CHELTENHAM · GLOUCESTERSHIRE</p>
        </div>
      </div>
    </>
  );
}
