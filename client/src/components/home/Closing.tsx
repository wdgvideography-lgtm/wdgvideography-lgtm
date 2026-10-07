/** Marquee and Apps. */
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

