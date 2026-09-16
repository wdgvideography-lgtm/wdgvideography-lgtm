/**
 * App Development Page — WDG Videography
 * Showcase of WDG-built apps: WDG Farm Dash, Longhorn Operations, RE-Quest,
 * PromoteAI and more. Real screenshots from live builds.
 */

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import AppBriefWizard from "@/components/AppBriefWizard";

interface AppShot {
  src: string;
  alt: string;
  caption: string;
}

const farmDashShots: AppShot[] = [
  { src: "/app-screens/farmdash-dashboard.jpg", alt: "WDG Farm Dash main farm dashboard", caption: "Farm dashboard — everything at a glance" },
  { src: "/app-screens/farmdash-ndvi.jpg", alt: "WDG Farm Dash field map with crop health data", caption: "Interactive field map & crop health" },
  { src: "/app-screens/farmdash-livestock.jpg", alt: "WDG Farm Dash livestock dashboard", caption: "Livestock records & movements" },
  { src: "/app-screens/farmdash-agronomist.jpg", alt: "WDG Farm Dash agronomist dashboard", caption: "Agronomist planning tools" },
  { src: "/app-screens/farmdash-worker.jpg", alt: "WDG Farm Dash worker app", caption: "Worker app for field teams" },
  { src: "/app-screens/farmdash-portals.jpg", alt: "WDG Farm Dash portal selection screen", caption: "Role-based portals for every user" },
];

const moreApps = [
  {
    name: "PromoteAI",
    tag: "AI Marketing Command Center",
    desc: "An autonomous marketing platform that plans, drafts and schedules social content, tracks campaign ROI in real time and serves AI-driven performance recommendations.",
  },
  {
    name: "WDG Construct",
    tag: "Construction Survey Platform",
    desc: "Drone survey management for construction sites — orthomosaics, 3D models, defect tracking, cut & fill analysis and shareable client portals.",
  },
  {
    name: "WDG AgriCalc",
    tag: "Agricultural Pricing Tools",
    desc: "Purpose-built calculators for agricultural service pricing — survey coverage, acreage and call-out fee logic automated end to end.",
  },
  {
    name: "WDG PriceFlow",
    tag: "Quoting & Workflow",
    desc: "Streamlined quoting and pricing workflow tools built to keep fast-moving service businesses on brand and on budget.",
  },
  {
    name: "PlanCheck AI",
    tag: "AI Review Tools",
    desc: "AI-assisted plan checking that reviews documents and drawings against rules and flags issues before they cost money.",
  },
  {
    name: "Longhorn Reservations",
    tag: "Guest-Facing Bookings",
    desc: "A customer-facing booking experience with table planning, deposits and automated confirmations — built to run alongside the operations app.",
  },
];

const clientShots: AppShot[] = [
  { src: "/app-screens/vc-estate.jpg", alt: "VC Estate Planning website built by WDG", caption: "VC Estate Planning — wills, LPAs & estate protection" },
  { src: "/app-screens/wgg-storage.jpg", alt: "WGG Container Storage website built by WDG", caption: "WGG Container Storage — secure container storage" },
];

function ShotCard({ shot, index }: { shot: AppShot; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative rounded-sm border border-gold/20 overflow-hidden bg-card/40 transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_oklch(0.78_0.12_75/0.12)]">
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground font-body tracking-wide">
        {shot.caption}
      </figcaption>
    </motion.figure>
  );
}

function AppSection({
  eyebrow,
  title,
  desc,
  bullets,
  shots,
  liveUrl,
  liveLabel,
  reversed,
  id,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  shots: AppShot[];
  liveUrl?: string;
  liveLabel?: string;
  reversed?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="relative py-20 lg:py-28 border-t border-border/30">
      <div className="relative container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: reversed ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={reversed ? "lg:order-2" : ""}
          >
            <span className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
              {desc}
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 mt-1 shrink-0 rounded-full border border-gold/40 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-muted-foreground font-body leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold font-body font-medium text-sm tracking-wide rounded-sm hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
              >
                {liveLabel || "View Live App"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: reversed ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={reversed ? "lg:order-1" : ""}
          >
            <ShotCard shot={shots[0]} index={0} />
          </motion.div>
        </div>
        {shots.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {shots.slice(1).map((s, i) => (
              <ShotCard key={s.src} shot={s} index={i} />
            ))}
          </div>
        )}
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
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        <ErrorBoundary silent><FilmGrainOverlay /></ErrorBoundary>
        <ErrorBoundary silent><Navbar /></ErrorBoundary>

        {/* Hero */}
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gold/[0.04] blur-[130px]" />
          </div>
          <div className="relative container text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-6"
            >
              WDG Software Division
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              We Don't Just Film Businesses.
              <br />
              <span className="text-gold">We Build Their Software.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground font-body text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
            >
              From farm management platforms to restaurant operations and AI marketing
              command centres — every app below was designed, built and shipped by WDG,
              and every one is live and in use today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#app-brief"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-primary-foreground font-body font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
              >
                Get Your App Built
              </a>
              <a
                href="#farm-dash"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gold/40 text-gold font-body font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
              >
                See The Apps
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 lg:mt-20 max-w-5xl mx-auto"
            >
              <div className="relative rounded-sm border border-gold/25 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                <img
                  src="/app-screens/farmdash-home.jpg"
                  alt="WDG Farm Dash home screen"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground font-body tracking-wide">
                WDG Farm Dash — the flagship of the WDG software division
              </p>
            </motion.div>
          </div>
        </section>

        {/* App: WDG Farm Dash */}
        <AppSection
          id="farm-dash"
          eyebrow="Flagship Build · Agriculture"
          title="WDG Farm Dash"
          desc="A complete farm management platform with role-based portals for owners, agronomists, workers and contractors. Field mapping, crop health data, livestock records and job planning — all in one place, accessible from any device in the field."
          bullets={[
            "Role-based portals: owner, agronomist, worker and demo access",
            "Interactive field mapping with crop health overlays",
            "Livestock records, movements and task allocation",
            "Mobile-first design for use out in the fields",
          ]}
          shots={farmDashShots}
          liveUrl="https://wdg-farm-dash.base44.app"
          liveLabel="Open Farm Dash Live"
        />

        {/* App: Longhorn Operations */}
        <AppSection
          id="longhorn"
          eyebrow="Live In Production · Hospitality"
          title="Longhorn Operations"
          desc="An all-in-one restaurant management platform running a real Cheltenham bar & grill every single day. Staff rostering, booking forecasts, stock takes, Z-reports and financial performance — one mobile dashboard for the whole operation."
          bullets={[
            "Rota builder with staff logins and shift confirmation",
            "Bookings with deposits, pre-orders and automated confirmations",
            "Stock takes, Z-reports and live financial reporting",
            "Staff app for shifts, requests and documents",
          ]}
          shots={[
            { src: "/app-screens/longhorn-login.jpg", alt: "Longhorn Operations portal login", caption: "Manager & staff portals" },
            { src: "/app-screens/longhorn-customer.jpg", alt: "Longhorn customer-facing home page", caption: "Customer-facing home page" },
          ]}
          liveUrl="https://longhorn-ops.com"
          liveLabel="Open Longhorn Ops"
          reversed
        />

        {/* App: RE-Quest */}
        <AppSection
          id="re-quest"
          eyebrow="Ops Authorisation · Logistics"
          title="RE-Quest — Instant Ops Authorisation"
          desc="A QR-powered authorisation app for construction and logistics. Drivers and site staff request access on the spot, managers approve from their phone in seconds, and every decision is logged with a full audit trail."
          bullets={[
            "Instant QR-code approvals from any phone",
            "Multi-company, multi-site role management",
            "Expiring requests and automatic audit logging",
            "Two-tap confirmation for every critical action",
          ]}
          shots={[
            { src: "/app-screens/clearauth.jpg", alt: "RE-Quest instant ops authorisation app", caption: "Instant authorisation, zero phone calls" },
          ]}
          liveUrl="https://clearauth.vercel.app"
          liveLabel="Open RE-Quest"
        />

        {/* More apps grid */}
        <section className="relative py-20 lg:py-28 border-t border-border/30">
          <div className="relative container">
            <div className="text-center mb-14">
              <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
                And That's Not All
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                More Apps Built By WDG
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
                Every tool WDG needs to run its own businesses, we built ourselves. The same
                standard applies to yours.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {moreApps.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="group rounded-sm border border-border/40 bg-card/40 p-6 lg:p-8 transition-all duration-500 hover:border-gold/40 hover:bg-card/60"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-semibold text-foreground">{app.name}</h3>
                    <div className="w-10 h-10 rounded-sm border border-gold/30 bg-gold/5 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gold font-body uppercase tracking-wider mb-3">{app.tag}</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{app.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client builds */}
        <section className="relative py-20 lg:py-28 border-t border-border/30">
          <div className="relative container">
            <div className="text-center mb-14">
              <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
                Websites & Client Builds
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="font-display text-3xl md:text-5xl font-bold text-foreground">
                Built For Real Clients, Live Right Now
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {clientShots.map((s, i) => (
                <ShotCard key={s.src} shot={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* What we build / CTA */}
        <section className="relative py-20 lg:py-28 border-t border-border/30">
          <div className="relative container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
                  What We Build
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Your Business, Running On Your Own Software
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                  If your business is run from spreadsheets, WhatsApp threads and memory,
                  you already know the pain. We design and build custom apps that replace
                  all of it — normally in a fraction of the time and cost of a traditional
                  software house.
                </p>
                <ul className="space-y-3">
                  {[
                    "Business process apps — rotas, bookings, stock, finance",
                    "Client portals and role-based dashboards",
                    "AI-powered tools and automation",
                    "Full brand match — your app looks and feels like you",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 mt-1 shrink-0 rounded-full border border-gold/40 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-muted-foreground font-body leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div id="app-brief" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-center mb-8">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                      Have An App In Your Head?
                    </h3>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      Four quick steps. Tell us what you need built and what it's replacing —
                      we'll come back with a real scope, not a sales pitch.
                    </p>
                  </div>
                  <AppBriefWizard />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>
    </>
  );
}
