/** Marquee, Apps, Process and the closing call to action. */
import { useReveal } from "@/hooks/useReveal";

const ITEMS = ["Brand films", "Social reels", "Drone", "Websites", "Food & venue", "Farm & land", "Product video", "Apps"];

export function Marquee() {
  const row = ITEMS.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="mx-7">{t}</span>
      <span className="font-display italic text-gold">✦</span>
    </span>
  ));
  return (
    <div className="hairline border-b border-border overflow-hidden py-6 whitespace-nowrap" aria-hidden="true">
      <div className="inline-block text-[clamp(28px,3.4vw,52px)]" style={{ animation: "mq 34s linear infinite" }}>
        {row}{row}
      </div>
    </div>
  );
}

const APPS = [
  { name: "WDG Farm Dash", tag: "Farm management platform", img: "/app-screens/farmdash-dashboard.jpg" },
  { name: "Longhorn Operations", tag: "Restaurant ops, live daily", img: "/app-screens/longhorn-login.jpg" },
  { name: "RE-Quest", tag: "Instant ops authorisation", img: "/app-screens/clearauth.jpg" },
];

export function Apps() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="apps" className="px-5 sm:px-8 lg:px-14 py-[12vh]">
      <div className="rv grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-12">
        <span className="eyebrow">03 · Software</span>
        <div>
          <h2 className="display text-[clamp(40px,5vw,84px)]">We don’t just film businesses.<br />We build their <i>software</i>.</h2>
          <p className="text-muted-foreground mt-5 max-w-xl">Farm dashboards, restaurant operations and authorisation tools, all live and in daily use. If your business runs on spreadsheets and WhatsApp, we can fix that too.</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {APPS.map((a) => (
          <a key={a.name} href="/app-development" className="rv group block">
            <div className="card-media aspect-[16/11] bg-[#111]">
              <img src={a.img} alt={`${a.name} screenshot`} loading="lazy" />
            </div>
            <div className="flex justify-between items-baseline mt-4">
              <h3 className="text-lg font-semibold group-hover:text-gold transition-colors">{a.name}</h3>
              <span className="mono-tag text-muted-foreground">{a.tag.toUpperCase()}</span>
            </div>
          </a>
        ))}
      </div>
      <a href="/app-development" className="rv pill mt-10">See the apps →</a>
    </section>
  );
}

const STEPS = [
  ["Consultation", "We talk through your business, goals and audience, then come back with ideas and a fixed price."],
  ["Pre-production", "Storyboard, shot list, locations and a filming date that suits you."],
  ["Production", "A calm, well-planned shoot day with cinema cameras, lighting and drone where it helps."],
  ["Post & delivery", "Edit, colour grade, music and captions. Files delivered ready to post and ready for your website."],
];

export function Process() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="process" className="px-5 sm:px-8 lg:px-14 py-[12vh] hairline">
      <div className="rv flex flex-wrap items-end justify-between gap-6 mb-12">
        <h2 className="display text-[clamp(40px,5vw,84px)]">How a project <i>runs</i>.</h2>
        <span className="eyebrow">04 · Process</span>
      </div>
      <ol className="grid gap-px bg-border md:grid-cols-4 rounded-2xl overflow-hidden border border-border">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="rv bg-card p-7 lg:p-9" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="font-display text-[56px] leading-none text-gold">0{i + 1}</span>
            <h3 className="text-xl font-semibold mt-5 mb-2">{t}</h3>
            <p className="text-muted-foreground text-[15px]">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CTA() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="contact" className="mx-3 sm:mx-5 lg:mx-8 mt-[6vh] rounded-t-[28px] text-white px-6 sm:px-10 lg:px-16 pt-[16vh] pb-[12vh]" style={{ background: "oklch(0.17 0.01 60)" }}>
      <h2 className="rv display text-[clamp(60px,12vw,220px)] leading-[.85] tracking-[-.05em]">Let’s make<br />something <i>good</i>.</h2>
      <div className="rv flex flex-wrap justify-between items-end gap-6 mt-[8vh]">
        <p className="max-w-[420px] text-white/70">Tell us about your business. We’ll come back with ideas and a fixed, no-obligation price.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/contact" className="pill gold !text-[16px] !px-7 !py-4">Book a consultation →</a>
          <a href="tel:+447584065559" className="pill ghost !text-white hover:!bg-white hover:!text-foreground">+44 7584 065559</a>
        </div>
      </div>
    </section>
  );
}
