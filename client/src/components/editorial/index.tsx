/**
 * Editorial kit — the building blocks every inner page and the remaining
 * homepage sections are made from, so the whole site reads as one piece.
 *
 *  PageHero    full-bleed dark stage with parallax media and a knocked-back headline
 *  Statement   paragraph that lights up word by word on scroll
 *  PriceMenu   a price list laid out like a menu, rows go to ink on hover
 *  Pillars     numbered three-up with hairlines
 *  FAQ         animated accordion
 *  PosterStrip hover-to-play marquee of real clips
 *  AppsRail    scroll-driven horizontal rail of real app screens
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReveal, clamp, prefersReducedMotion, claimDarkNav, playVideo, pauseVideo } from "@/hooks/useReveal";

/* ------------------------------------------------------------------ */
/* PageHero                                                            */
/* ------------------------------------------------------------------ */
export interface PageHeroProps {
  eyebrow: string;
  crumbs?: { label: string; href?: string }[];
  title: ReactNode;
  lead: string;
  video?: string;
  poster?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  from?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  compact?: boolean;
  id?: string;
}

export function PageHero(p: PageHeroProps) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const key = useRef(`hero-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const el = root.current, m = media.current;
    if (!el || !m) return;
    const reduced = prefersReducedMotion();
    let raf = 0;
    const tick = () => {
      const b = el.getBoundingClientRect();
      const onScreen = b.bottom > 72 && b.top < window.innerHeight;
      claimDarkNav(key.current, b.top <= 72 && b.bottom > 72);
      if (!reduced) {
        const pr = clamp(-b.top / Math.max(1, b.height));
        m.style.transform = `translate3d(0, ${pr * 22}%, 0) scale(${1 + pr * 0.08})`;
        m.style.opacity = String(1 - pr * 0.55);
      }
      if (vid.current) { if (onScreen) playVideo(vid.current); else pauseVideo(vid.current); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const k = key.current;
    return () => { cancelAnimationFrame(raf); claimDarkNav(k, false); };
  }, []);

  return (
    <section ref={root} id={p.id} className={`relative isolate bg-[#0b0b0c] text-white overflow-hidden flex flex-col justify-end ${p.compact ? "min-h-[78svh]" : "min-h-[100svh]"}`}>
      <div ref={media} className="absolute inset-0 -z-10 will-change-transform">
        {p.video ? (
          <video ref={vid} src={p.video} poster={p.poster} muted loop playsInline preload="metadata" aria-hidden="true"
            className="w-full h-full object-cover" />
        ) : (
          <img src={p.image} alt={p.imageAlt ?? ""} className="w-full h-full object-cover" style={{ objectPosition: p.imagePosition ?? "center" }} />
        )}
        {p.image && <div className="absolute inset-0 bg-black/45" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 35%, rgba(0,0,0,.72) 78%, rgba(11,11,12,.96) 100%)" }} />
      </div>

      <div className="relative px-5 sm:px-8 lg:px-14 pt-40 pb-10 lg:pb-14 w-full">
        <div className="rise flex items-center gap-3 mono-tag text-white/60 mb-7" style={{ animationDelay: ".1s" }}>
          {(p.crumbs ?? [{ label: "Home", href: "/" }, { label: p.eyebrow }]).map((c, i, a) => (
            <span key={i} className="inline-flex items-center gap-3">
              {c.href ? <a href={c.href} className="hover:text-white transition-colors">{c.label.toUpperCase()}</a> : <span className="text-gold">{c.label.toUpperCase()}</span>}
              {i < a.length - 1 && <span aria-hidden="true">/</span>}
            </span>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="rise display text-[clamp(50px,9.4vw,152px)] lg:col-span-8 text-balance" style={{ animationDelay: ".2s" }}>{p.title}</h1>
          <div className="rise lg:col-span-4 lg:pb-3" style={{ animationDelay: ".38s" }}>
            <p className="text-[17px] lg:text-lg leading-relaxed text-white/80 max-w-md">{p.lead}</p>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              {p.primary && <a href={p.primary.href} className="pill gold">{p.primary.label}</a>}
              {p.secondary && <a href={p.secondary.href} className="pill ghost text-white">{p.secondary.label}</a>}
              {p.from && <span className="mono-tag text-white/60 ml-1">FROM <span className="text-gold">{p.from}</span></span>}
            </div>
          </div>
        </div>
        <div className="hairline border-white/15 mt-10 lg:mt-14" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Statement                                                           */
/* ------------------------------------------------------------------ */
export type StatementWord = string | { i: string };

export function Statement({ eyebrow, words, className = "" }: { eyebrow: string; words: StatementWord[]; className?: string }) {
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
    <section className={`px-5 sm:px-8 lg:px-14 pt-[16vh] pb-[12vh] grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <p ref={p} className="text-[clamp(28px,3.4vw,54px)] leading-[1.12] tracking-[-.02em]">
        {words.map((w, i) =>
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

/** Helper: "plain words {italic words} plain words" → StatementWord[] */
export function words(s: string): StatementWord[] {
  const out: StatementWord[] = [];
  s.split(/(\{[^}]+\})/).forEach((part) => {
    if (!part) return;
    if (part.startsWith("{")) out.push({ i: part.slice(1, -1) });
    else part.trim().split(/\s+/).forEach((w) => w && out.push(w));
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* PriceMenu                                                           */
/* ------------------------------------------------------------------ */
export interface PriceRow { name: string; price: string; features: string[]; href?: string; popular?: boolean; note?: string }

export function PriceMenu({ title, intro, rows, id, cta = "Enquire" }: { title: ReactNode; intro?: string; rows: PriceRow[]; id?: string; cta?: string }) {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <section ref={ref} id={id} className="px-5 sm:px-8 lg:px-14 py-[12vh]" style={{ scrollMarginTop: 80 }}>
      <div className="rv flex flex-wrap items-end justify-between gap-6 mb-10">
        <h2 className="display text-[clamp(38px,5vw,84px)]">{title}</h2>
        {intro && <p className="text-muted-foreground max-w-sm">{intro}</p>}
      </div>
      <div className="hairline" />
      {rows.map((r, i) => (
        <a key={r.name} href={r.href ?? "/contact"}
          className="rv price-row group grid gap-x-8 gap-y-3 grid-cols-[auto_1fr] md:grid-cols-[56px_1.1fr_1.6fr_auto] items-baseline py-7 md:py-8 border-b border-border px-3 -mx-3 rounded-xl"
          style={{ transitionDelay: `${i * 70}ms` }}>
          <span className="mono-tag text-muted-foreground group-hover:text-gold transition-colors">{String(i + 1).padStart(2, "0")}</span>
          <div className="md:contents">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-.02em] leading-tight">{r.name}</h3>
              {r.popular && <span className="mono-tag text-gold mt-1 inline-block">MOST POPULAR</span>}
              {r.note && <span className="mono-tag text-muted-foreground mt-1 block">{r.note}</span>}
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground group-hover:text-background/75 transition-colors mt-2 md:mt-0 col-span-2 md:col-span-1">
              {r.features.map((f, j) => (
                <span key={f}>{f}{j < r.features.length - 1 && <span className="mx-2 text-gold">·</span>}</span>
              ))}
            </p>
          </div>
          <div className="flex items-baseline gap-5 col-span-2 md:col-span-1 justify-between md:justify-end">
            <span className="font-display text-[34px] md:text-[44px] leading-none whitespace-nowrap group-hover:text-gold transition-colors">{r.price}</span>
            <span className="text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">{cta} →</span>
          </div>
        </a>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */
export function Pillars({ eyebrow, title, items }: { eyebrow: string; title: ReactNode; items: { title: string; text: string }[] }) {
  const ref = useReveal<HTMLElement>(0.1);
  return (
    <section ref={ref} className="px-5 sm:px-8 lg:px-14 py-[12vh]">
      <div className="rv grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-14">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display text-[clamp(38px,5vw,84px)]">{title}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-x-10">
        {items.map((b, i) => (
          <div key={b.title} className="rv hairline pt-7 pb-10" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="mono-tag text-gold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-[clamp(30px,2.6vw,40px)] leading-[1.02] mt-5 mb-4">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function FAQ({ items, title = <>Questions, <i>answered</i>.</> }: { items: { q: string; a: string }[]; title?: ReactNode }) {
  const ref = useReveal<HTMLElement>(0.1);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section ref={ref} className="px-5 sm:px-8 lg:px-14 py-[12vh]">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[6vw]">
        <h2 className="rv display text-[clamp(38px,4.6vw,76px)] lg:sticky lg:top-28 self-start">{title}</h2>
        <div className="rv">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="hairline">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group">
                  <span className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1.1] group-hover:text-gold transition-colors">{f.q}</span>
                  <span aria-hidden="true" className={`shrink-0 mt-1 w-9 h-9 rounded-full border border-border grid place-items-center text-lg transition-all duration-500 ${isOpen ? "rotate-45 bg-foreground text-background border-foreground" : "group-hover:border-foreground"}`}>+</span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground leading-relaxed max-w-2xl pb-7">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="hairline" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PosterStrip                                                         */
/* ------------------------------------------------------------------ */
export interface StripItem { src?: string; poster: string; title: string; client: string; portrait?: boolean }

export function PosterStrip({ items, eyebrow, title, speed = 60 }: { items: StripItem[]; eyebrow?: string; title?: ReactNode; speed?: number }) {
  const ref = useReveal<HTMLElement>(0.05);
  const card = (it: StripItem, k: string) => (
    <figure key={k} className={`strip-card shrink-0 relative overflow-hidden rounded-2xl bg-[#111] text-white ${it.portrait ? "w-[200px] sm:w-[240px] aspect-[9/16]" : "w-[355px] sm:w-[430px] aspect-[16/9]"}`}>
      {it.src ? (
        <video src={it.src} poster={it.poster} muted loop playsInline preload="none" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"
          onMouseEnter={(e) => playVideo(e.currentTarget)} onMouseLeave={(e) => { pauseVideo(e.currentTarget); }} />
      ) : (
        <img src={it.poster} alt={`${it.title} for ${it.client}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.7))" }}>
        <span className="font-display text-xl leading-none">{it.title}</span>
        <span className="mono-tag opacity-70">{it.client.toUpperCase()}</span>
      </figcaption>
    </figure>
  );
  return (
    <section ref={ref} className="py-[10vh] overflow-hidden">
      {(eyebrow || title) && (
        <div className="rv px-5 sm:px-8 lg:px-14 grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-12">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display text-[clamp(38px,5vw,84px)]">{title}</h2>
        </div>
      )}
      <div className="rv strip flex gap-4 w-max pl-5" style={{ animation: `mq ${speed}s linear infinite` }}>
        {items.map((it, i) => card(it, `a${i}`))}
        {items.map((it, i) => card(it, `b${i}`))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* AppsRail                                                            */
/* ------------------------------------------------------------------ */
export interface AppScreen { img: string; name: string; tag: string; caption: string }

export const APP_SCREENS: AppScreen[] = [
  { img: "/app-screens/farmdash-dashboard.jpg", name: "WDG Farm Dash", tag: "Farm management", caption: "The whole farm on one dashboard: fields, stock, staff and surveys." },
  { img: "/app-screens/farmdash-ndvi.jpg", name: "WDG Farm Dash", tag: "Field map", caption: "Interactive field map with crop-health layers from our own drone surveys." },
  { img: "/app-screens/longhorn-customer.jpg", name: "Longhorn Operations", tag: "Guest-facing", caption: "Menus, bookings, gift vouchers and pre-orders for a working restaurant." },
  { img: "/app-screens/farmdash-livestock.jpg", name: "WDG Farm Dash", tag: "Livestock", caption: "Herd records and movements without the paperwork." },
  { img: "/app-screens/clearauth.jpg", name: "RE-Quest", tag: "Ops authorisation", caption: "Instant, audited sign-off for teams who can't wait on email." },
  { img: "/app-screens/farmdash-agronomist.jpg", name: "WDG Farm Dash", tag: "Agronomist portal", caption: "Role-based portals so every user sees only what they need." },
  { img: "/app-screens/longhorn-login.jpg", name: "Longhorn Operations", tag: "Staff & manager", caption: "Separate manager and staff logins, live in the restaurant every day." },
];

export function AppsRail({ id = "apps", eyebrow = "03 · Software", title, intro, screens = APP_SCREENS, cta }: {
  id?: string; eyebrow?: string; title: ReactNode; intro: string; screens?: AppScreen[]; cta?: { label: string; href: string };
}) {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current, r = rail.current;
    if (!el || !r) return;
    const reduced = prefersReducedMotion();
    let raf = 0;
    const tick = () => {
      const b = el.getBoundingClientRect();
      const travel = b.height - window.innerHeight;
      const pr = clamp(-b.top / Math.max(1, travel));
      const max = Math.max(0, r.scrollWidth - (r.parentElement?.clientWidth ?? window.innerWidth));
      r.style.transform = reduced ? "none" : `translate3d(${-pr * max}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${pr})`;
      const idx = Math.min(screens.length - 1, Math.round(pr * (screens.length - 1)));
      setActive((a) => (a === idx ? a : idx));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [screens.length]);

  return (
    <section ref={root} id={id} className="relative" style={{ height: `${screens.length * 60 + 100}vh`, scrollMarginTop: 0 }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <div className="px-5 sm:px-8 lg:px-14 grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-8 lg:mb-10">
          <span className="eyebrow">{eyebrow}</span>
          <div>
            <h2 className="display text-[clamp(34px,4.6vw,78px)]">{title}</h2>
            <p className="text-muted-foreground mt-4 max-w-xl">{intro}</p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={rail} className="flex gap-5 lg:gap-7 px-5 sm:px-8 lg:px-14 w-max will-change-transform">
            {screens.map((s, i) => (
              <a key={i} href="/app-development" className={`block w-[78vw] sm:w-[60vw] lg:w-[46vw] max-w-[820px] transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-60"}`}>
                <div className="rounded-2xl overflow-hidden bg-[#0f0f10] border border-black/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]">
                  <div className="flex items-center gap-2 px-4 h-9 bg-[#1a1a1c]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 mono-tag text-white/50 truncate">{s.name.toLowerCase().replace(/\s+/g, "")}.app · {s.tag.toLowerCase()}</span>
                  </div>
                  <div className="aspect-[16/10] bg-[#111]">
                    <img src={s.img} alt={`${s.name} — ${s.tag}`} loading="lazy" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">{s.caption}</p>
                  </div>
                  <span className="mono-tag text-muted-foreground shrink-0">{s.tag.toUpperCase()}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-14 mt-8 lg:mt-10 flex items-center gap-6">
          <span className="mono-tag text-muted-foreground tabular-nums">{String(active + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span>
          <div className="h-px flex-1 bg-border relative overflow-hidden"><div ref={bar} className="absolute inset-0 bg-foreground origin-left" style={{ transform: "scaleX(0)" }} /></div>
          {cta && <a href={cta.href} className="pill">{cta.label}</a>}
        </div>
      </div>
    </section>
  );
}
