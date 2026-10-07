/**
 * App Development — the apps we've designed, built and run.
 * Screens are real screenshots from the live builds in /public/app-screens/.
 */
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import AppBriefWizard from "@/components/AppBriefWizard";
import { PageHero, Statement, AppsRail, Pillars, FAQ, words, type AppScreen } from "@/components/editorial";
import CTA from "@/components/home/CTA";
import { useReveal } from "@/hooks/useReveal";

const FARM: AppScreen[] = [
  { img: "/app-screens/farmdash-dashboard.jpg", name: "WDG Farm Dash", tag: "Dashboard", caption: "Everything at a glance: fields, stock, jobs and surveys." },
  { img: "/app-screens/farmdash-ndvi.jpg", name: "WDG Farm Dash", tag: "Field map", caption: "Interactive field map with crop-health overlays from our drone surveys." },
  { img: "/app-screens/farmdash-livestock.jpg", name: "WDG Farm Dash", tag: "Livestock", caption: "Herd records, movements and task allocation." },
  { img: "/app-screens/farmdash-agronomist.jpg", name: "WDG Farm Dash", tag: "Agronomist", caption: "Planning tools for the agronomist's visit." },
  { img: "/app-screens/farmdash-worker.jpg", name: "WDG Farm Dash", tag: "Worker app", caption: "Mobile-first for use out in the field." },
  { img: "/app-screens/farmdash-portals.jpg", name: "WDG Farm Dash", tag: "Portals", caption: "Owner, agronomist, worker and contractor logins, each seeing only what they need." },
];

interface Build { n: string; name: string; sector: string; desc: string; bullets: string[]; live?: { href: string; label: string }; shots: { src: string; alt: string }[] }

const BUILDS: Build[] = [
  {
    n: "01", name: "WDG Farm Dash", sector: "Agriculture · flagship",
    desc: "A complete farm management platform with role-based portals for owners, agronomists, workers and contractors. Field mapping, crop-health data, livestock records and job planning in one place.",
    bullets: ["Role-based portals: owner, agronomist, worker and demo access", "Interactive field mapping with crop-health overlays", "Livestock records, movements and task allocation", "Mobile-first for use out in the fields"],
    live: { href: "https://wdg-farm-dash.base44.app", label: "Open Farm Dash" },
    shots: [{ src: "/app-screens/farmdash-home.jpg", alt: "WDG Farm Dash home screen" }],
  },
  {
    n: "02", name: "Longhorn Operations", sector: "Hospitality · live in production",
    desc: "The restaurant management platform running a real Cheltenham bar and grill every day. Staff rostering, booking forecasts, stock takes, Z-reports and financial performance from one dashboard.",
    bullets: ["Rota builder with staff logins and shift confirmation", "Bookings with deposits, pre-orders and automated confirmations", "Stock takes, Z-reports and live financial reporting", "Staff app for shifts, requests and documents"],
    live: { href: "https://longhorn-ops.com", label: "Open Longhorn Ops" },
    shots: [{ src: "/app-screens/longhorn-login.jpg", alt: "Longhorn Operations manager and staff portals" }, { src: "/app-screens/longhorn-customer.jpg", alt: "Longhorn customer-facing home page" }],
  },
  {
    n: "03", name: "RE-Quest", sector: "Logistics · ops authorisation",
    desc: "A QR-powered authorisation app for construction and logistics. Drivers and site staff request access on the spot, managers approve from their phone, and every decision is logged with a full audit trail.",
    bullets: ["Instant QR-code approvals from any phone", "Multi-company, multi-site role management", "Expiring requests and automatic audit logging", "Two-tap confirmation for every critical action"],
    live: { href: "https://clearauth.vercel.app", label: "Open RE-Quest" },
    shots: [{ src: "/app-screens/clearauth.jpg", alt: "RE-Quest sign-in screen" }],
  },
];

const MORE = [
  { name: "PromoteAI", tag: "AI marketing", desc: "Plans, drafts and schedules social content, tracks campaign return and recommends what to do next." },
  { name: "WDG Construct", tag: "Construction surveys", desc: "Drone survey management for sites: orthomosaics, 3D models, defect tracking, cut and fill, client portals." },
  { name: "WDG AgriCalc", tag: "Pricing tools", desc: "Calculators for agricultural service pricing: survey coverage, acreage and call-out logic." },
  { name: "WDG PriceFlow", tag: "Quoting", desc: "Quoting and pricing workflow for fast-moving service businesses." },
  { name: "PlanCheck AI", tag: "AI review", desc: "Reviews documents and drawings against rules and flags issues before they cost money." },
  { name: "Longhorn Reservations", tag: "Guest bookings", desc: "Table planning, deposits and automated confirmations, running alongside the operations app." },
];

function Builds() {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <section ref={ref} id="builds" className="px-5 sm:px-8 lg:px-14 py-[10vh]" style={{ scrollMarginTop: 80 }}>
      <div className="rv grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-16">
        <span className="eyebrow">02 — Three builds, all live</span>
        <h2 className="display text-[clamp(38px,5vw,84px)]">Designed, built and <i>in use</i>.</h2>
      </div>
      <div className="space-y-[12vh]">
        {BUILDS.map((b, i) => (
          <article key={b.name} className={`grid gap-8 lg:gap-[5vw] lg:grid-cols-12 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className={`rv lg:col-span-7 ${b.shots.length > 1 ? "grid grid-cols-[1.4fr_1fr] gap-4 items-end" : ""}`}>
              {b.shots.map((s) => (
                <div key={s.src} className="rounded-2xl overflow-hidden bg-[#0f0f10] border border-black/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]">
                  <div className="flex items-center gap-2 px-4 h-9 bg-[#1a1a1c]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    {b.live && <span className="ml-3 mono-tag text-white/50 truncate">{b.live.href.replace("https://", "")}</span>}
                  </div>
                  <img src={s.src} alt={s.alt} loading="lazy" className="w-full aspect-[16/10] object-cover object-top" />
                </div>
              ))}
            </div>
            <div className="rv lg:col-span-5" style={{ transitionDelay: "120ms" }}>
              <span className="mono-tag text-gold">{b.n} · {b.sector.toUpperCase()}</span>
              <h3 className="display text-[clamp(34px,3.6vw,60px)] mt-4">{b.name}</h3>
              <p className="text-muted-foreground mt-5 leading-relaxed">{b.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {b.bullets.map((x) => <li key={x} className="flex gap-3 text-[15px]"><span className="text-gold mt-[3px]">✦</span>{x}</li>)}
              </ul>
              {b.live && <a href={b.live.href} target="_blank" rel="noopener noreferrer" className="pill ghost mt-8">{b.live.label} ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function More() {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <section ref={ref} className="px-5 sm:px-8 lg:px-14 py-[10vh]">
      <div className="rv grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-10">
        <span className="eyebrow">03 — Also built here</span>
        <h2 className="display text-[clamp(38px,5vw,84px)]">Tools we needed, so we <i>made them</i>.</h2>
      </div>
      <div className="hairline" />
      {MORE.map((m, i) => (
        <div key={m.name} className="rv grid gap-2 md:grid-cols-[56px_1fr_1.6fr_auto] md:gap-8 items-baseline py-6 border-b border-border" style={{ transitionDelay: `${i * 60}ms` }}>
          <span className="mono-tag text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-.02em]">{m.name}</h3>
          <p className="text-muted-foreground text-[15px] leading-relaxed">{m.desc}</p>
          <span className="mono-tag text-muted-foreground">{m.tag.toUpperCase()}</span>
        </div>
      ))}
    </section>
  );
}

function Brief() {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <section ref={ref} id="app-brief" className="px-5 sm:px-8 lg:px-14 py-[12vh]" style={{ scrollMarginTop: 80 }}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-[5vw] items-start">
        <div className="rv lg:col-span-5 lg:sticky lg:top-28">
          <span className="eyebrow">04 — Your turn</span>
          <h2 className="display text-[clamp(38px,5vw,84px)] mt-5">Have an app in your <i>head</i>?</h2>
          <p className="text-muted-foreground mt-6 leading-relaxed max-w-md">Four quick steps. Tell us what you need built and what it's replacing, and we'll come back with a real scope rather than a sales pitch.</p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {["Business process apps: rotas, bookings, stock, finance", "Client portals and role-based dashboards", "AI-powered tools and automation", "Full brand match, so it looks and feels like you"].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-gold mt-[3px]">✦</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rv lg:col-span-7 rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-[0_40px_80px_-50px_rgba(0,0,0,.35)]" style={{ transitionDelay: "120ms" }}>
          <ErrorBoundary silent><AppBriefWizard /></ErrorBoundary>
        </div>
      </div>
    </section>
  );
}

export default function AppDevelopment() {
  return (
    <>
      <SEO
        title="App Development & Custom Software | AI Business Apps"
        description="WDG designs and builds custom business apps and AI software: farm management, restaurant operations, instant ops authorisation, marketing automation and client portals. Real apps, live and in use, built in Cheltenham."
        keywords="app development Cheltenham, custom software Gloucestershire, AI app development UK, business app development, web app development Cheltenham, custom database apps, farm management software, restaurant management app, WDG Videography"
        canonicalUrl="https://www.wdgvideography.com/app-development"
      />
      <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
        <ErrorBoundary silent><Navbar /></ErrorBoundary>
        <main>
          <PageHero
            eyebrow="App Development"
            title={<>Software that runs the <i>business</i>.</>}
            lead="Farm management, restaurant operations and instant authorisation tools. Every app here was designed, built and shipped by us, and every one is live and in use today."
            image="/app-screens/farmdash-home.jpg" imageAlt="WDG Farm Dash home screen" imagePosition="top"
            primary={{ label: "Brief us", href: "#app-brief" }}
            secondary={{ label: "See the apps", href: "#builds" }}
          />
          <ErrorBoundary silent>
            <Statement eyebrow="01 — Why we build" words={words("If your business runs on spreadsheets, WhatsApp threads and memory, you already know the pain. We replace all of it with {one app that looks like you}, usually for a fraction of what a software house would charge.")} />
          </ErrorBoundary>
          <ErrorBoundary silent>
            <AppsRail id="farm-dash" eyebrow="Flagship · WDG Farm Dash" title={<>One dashboard for the <i>whole farm</i>.</>} intro="Six screens from the live platform, left to right as a farm owner would see them." screens={FARM} cta={{ label: "Open Farm Dash ↗", href: "https://wdg-farm-dash.base44.app" }} />
          </ErrorBoundary>
          <ErrorBoundary silent><Builds /></ErrorBoundary>
          <ErrorBoundary silent><More /></ErrorBoundary>
          <ErrorBoundary silent>
            <Pillars eyebrow="How we work" title={<>Why it <i>ships</i>.</>} items={[
              { title: "We use what we build", text: "Our own farm, restaurant and survey tools run on this software, so it gets fixed the moment it annoys us." },
              { title: "Design and build in one room", text: "The same studio that shoots your films designs your app, so the brand carries straight through." },
              { title: "Scoped before it's priced", text: "You get a written scope of what it does, what it replaces and what it costs before anything is built." },
            ]} />
          </ErrorBoundary>
          <ErrorBoundary silent>
            <FAQ items={[
              { q: "What does an app cost?", a: "It depends entirely on what it has to do. After the brief we send a written scope with a fixed price, and most builds come in well under what a traditional software house would quote." },
              { q: "Can it connect to what we already use?", a: "Usually, yes. We've connected to booking systems, payment providers, mapping data and accounting tools. Tell us what you use in the brief." },
              { q: "Who owns it?", a: "You do. We build it, host it if you want us to, and hand over the code and accounts if you ever want to take it elsewhere." },
              { q: "Do you support it afterwards?", a: "Yes. We offer monthly support and hosting so the app keeps working as your business changes." },
            ]} />
          </ErrorBoundary>
          <ErrorBoundary silent><Brief /></ErrorBoundary>
          <ErrorBoundary silent><CTA /></ErrorBoundary>
        </main>
        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>
    </>
  );
}
