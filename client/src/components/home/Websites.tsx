/**
 * Websites — live client sites, shown as stacking panels. Each panel has a browser frame whose
 * full-page screenshot scrolls on its own while in view, a phone with the mobile view, and a link to the real site.
 */
import { useReveal } from "@/hooks/useReveal";

type Site = {
  key: string; name: string; url: string; domain: string; sector: string; blurb: string; did: string[];
  tone: { bg: string; fg: string; sub: string; chip: string };
};

const SITES: Site[] = [
  {
    key: "longhorn", name: "The Longhorn", url: "https://thelonghorn.uk/", domain: "thelonghorn.uk",
    sector: "Steakhouse & restaurant · Tewkesbury",
    blurb: "A dark, editorial site for a farm-to-table steakhouse: menus, table booking, private events and gift cards, all built around the restaurant’s own photography.",
    did: ["Design", "Build", "Photography & film", "SEO", "Hosting"],
    tone: { bg: "oklch(0.22 0.02 150)", fg: "#f3eee4", sub: "rgba(243,238,228,.65)", chip: "rgba(255,255,255,.1)" },
  },
  {
    key: "amc", name: "AMC Transport Solutions", url: "https://www.amc-transport.com/", domain: "amc-transport.com",
    sector: "Drainage, haulage & waste · Derbyshire",
    blurb: "A rebuilt site for a 24/7 transport and drainage business: clear service pages, fast quote routes and the aerial footage we filmed of their fleet.",
    did: ["Rebuild", "Drone film", "Copy", "SEO", "Hosting"],
    tone: { bg: "oklch(0.2 0.03 255)", fg: "#f3eee4", sub: "rgba(243,238,228,.65)", chip: "rgba(255,255,255,.1)" },
  },
  {
    key: "mise", name: "Mise Team", url: "https://www.miseteam.com/", domain: "miseteam.com",
    sector: "Restaurant management software",
    blurb: "Marketing site and web app for a hospitality SaaS: rotas, bookings, kitchen and HACCP in one place, with sign-up, pricing and a 30-day trial flow.",
    did: ["Product design", "Web app", "Marketing site", "Hosting"],
    tone: { bg: "oklch(0.15 0.01 60)", fg: "#f3eee4", sub: "rgba(243,238,228,.65)", chip: "rgba(255,255,255,.1)" },
  },
  {
    key: "vc", name: "VC Estate Planning", url: "https://vcestateplanning.com/", domain: "vcestateplanning.com",
    sector: "Wills, LPAs & trusts",
    blurb: "A calm, trustworthy site for an estate planning practice: plain-English service pages, enquiry forms and a design that feels personal rather than corporate.",
    did: ["Brand", "Design", "Build", "Hosting"],
    tone: { bg: "oklch(0.3 0.04 160)", fg: "#f3eee4", sub: "rgba(243,238,228,.65)", chip: "rgba(255,255,255,.1)" },
  },
  {
    key: "agri", name: "WDG Agriculture", url: "https://wdg-agriculture.co.uk/", domain: "wdg-agriculture.co.uk",
    sector: "Drone surveys · our own business",
    blurb: "Our survey business, built the way we build for clients: service pages with real pricing, a quote flow and the drone photography to back it up.",
    did: ["Brand", "Design", "Build", "SEO", "Hosting"],
    tone: { bg: "oklch(0.93 0.015 80)", fg: "oklch(0.17 0.01 60)", sub: "oklch(0.4 0.01 60)", chip: "rgba(0,0,0,.06)" },
  },
];

function Panel({ s, i }: { s: Site; i: number }) {
  const ref = useReveal<HTMLDivElement>(0.25);
  const light = s.key === "agri";
  return (
    <div ref={ref} className="rv sticky" style={{ top: `calc(72px + ${i * 14}px)`, zIndex: i + 1 }}>
      <article className="rounded-[26px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]"
        style={{ background: s.tone.bg, color: s.tone.fg, minHeight: "min(82vh, 760px)" }}>
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 p-7 sm:p-10 lg:p-14 items-center h-full">
          {/* copy */}
          <div>
            <div className="flex items-center gap-3 mono-tag" style={{ color: s.tone.sub }}>
              <span>{String(i + 1).padStart(2, "0")}</span><span className="hairline w-10" style={{ background: s.tone.sub }} /><span>Live site</span>
            </div>
            <h3 className="font-display text-[clamp(34px,4.2vw,66px)] leading-[.98] mt-4">{s.name}</h3>
            <p className="mt-2 text-[15px]" style={{ color: s.tone.sub }}>{s.sector}</p>
            <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed max-w-[46ch]">{s.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {s.did.map((d) => <span key={d} className="text-[12.5px] px-3 py-1.5 rounded-full" style={{ background: s.tone.chip }}>{d}</span>)}
            </div>
            <a href={s.url} target="_blank" rel="noopener" className={`pill mt-8 ${light ? "" : "!bg-white !text-foreground hover:!bg-gold"}`}>
              Visit {s.domain} ↗
            </a>
          </div>

          {/* devices */}
          <div className="relative">
            <div className="relative rounded-[14px] overflow-hidden bg-[#0f0e0c] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] border border-white/10">
              <div className="flex items-center gap-2 px-3.5 h-9 bg-[#1b1a18] border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto text-[12px] font-mono text-white/55 bg-white/5 rounded-md px-3 py-1 min-w-[50%] text-center truncate">{s.domain}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden" style={{ containerType: "inline-size" }}>
                <img src={`/sites/${s.key}-desktop.webp`} alt={`${s.name} website on desktop`} loading="lazy" decoding="async"
                  className="site-scroll absolute inset-x-0 top-0 w-full h-auto" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-3 sm:-left-8 w-[26%] max-w-[150px] rounded-[18px] overflow-hidden border-[5px] border-[#111] bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]">
              <img src={`/sites/${s.key}-mobile.webp`} alt={`${s.name} website on mobile`} loading="lazy" decoding="async" className="w-full h-auto block" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Websites() {
  const head = useReveal<HTMLDivElement>(0.3);
  return (
    <section id="websites" className="relative pt-28 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-14" aria-label="Websites we have built">
      <div ref={head} className="rv max-w-[1500px] mx-auto mb-10 sm:mb-14 grid lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-8">
          <span className="eyebrow">Websites</span>
          <h2 className="font-display text-[clamp(40px,6.2vw,104px)] leading-[.95] mt-3">
            Built, launched <i className="text-gold">and live.</i>
          </h2>
        </div>
        <p className="lg:col-span-4 text-[17px] text-muted-foreground max-w-[40ch] lg:justify-self-end">
          Not mock-ups. These are real sites we designed, built and host for businesses across Gloucestershire and beyond. Click through to any of them.
        </p>
      </div>
      <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
        {SITES.map((s, i) => <Panel key={s.key} s={s} i={i} />)}
      </div>
      <div className="max-w-[1500px] mx-auto mt-14 flex flex-wrap items-center justify-between gap-5">
        <p className="font-display text-[clamp(22px,2.4vw,34px)] leading-tight">Want one? Websites from £1,000, designed and built around your business.</p>
        <a href="/website-design" className="pill gold">See website packages →</a>
      </div>
    </section>
  );
}
