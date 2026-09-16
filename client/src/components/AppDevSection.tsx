/**
 * App Development Section — Noir Cinema Design
 * Prominent home-page showcase of WDG-built apps, linking to /app-development
 */

import { motion } from "framer-motion";

const apps = [
  {
    name: "WDG Farm Dash",
    tag: "Farm Management Platform",
    img: "/app-screens/farmdash-dashboard.jpg",
    alt: "WDG Farm Dash farm management dashboard",
  },
  {
    name: "Longhorn Operations",
    tag: "Restaurant Ops, Live Daily",
    img: "/app-screens/longhorn-login.jpg",
    alt: "Longhorn Operations restaurant management app",
  },
  {
    name: "RE-Quest",
    tag: "Instant Ops Authorisation",
    img: "/app-screens/clearauth.jpg",
    alt: "RE-Quest instant ops authorisation app",
  },
];

export default function AppDevSection() {
  return (
    <section id="app-development" className="relative py-28 lg:py-36 overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gold/[0.03] blur-[140px]" />
      </div>

      <div className="relative container">
        <div className="text-center mb-16 lg:mb-20">
          <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
            WDG App Development
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            We Don't Just Film Businesses.
            <br />
            <span className="text-gold">We Build Their Software.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Farm management platforms, restaurant operations, AI marketing tools and client
            portals — designed, built and shipped by WDG. All live and in use today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {apps.map((app, i) => (
            <motion.a
              key={app.name}
              href="/app-development"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group block rounded-sm border border-border/40 bg-card/40 overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_50px_oklch(0.78_0.12_75/0.1)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={app.img}
                  alt={app.alt}
                  loading="lazy"
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                  {app.name}
                </h3>
                <p className="text-xs text-muted-foreground font-body tracking-wide uppercase">
                  {app.tag}
                </p>
              </div>
            </motion.a>
          ))}
          <motion.a
            href="/app-development"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group flex flex-col justify-between rounded-sm border border-gold/40 bg-gradient-to-b from-gold/10 to-transparent p-6 transition-all duration-500 hover:border-gold/70 hover:shadow-[0_0_50px_oklch(0.78_0.12_75/0.15)]"
          >
            <div>
              <div className="w-12 h-12 rounded-sm border border-gold/40 bg-gold/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                PromoteAI, WDG Construct, AgriCalc &amp; more
              </h3>
              <p className="text-xs text-muted-foreground font-body tracking-wide uppercase mb-6">
                AI marketing · construction surveys · pricing tools
              </p>
            </div>
            <span className="text-gold text-sm font-body font-medium inline-flex items-center gap-2">
              See all WDG apps
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/app-development"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground font-body font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
          >
            Explore Our Apps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/app-development#app-brief"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gold/40 text-gold font-body font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
          >
            Get Your App Built
          </a>
        </motion.div>
      </div>
    </section>
  );
}
