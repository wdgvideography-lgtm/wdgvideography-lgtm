/** Marquee (two rows, opposite directions) and the Apps rail. */
import { AppsRail } from "@/components/editorial";

const ITEMS = ["Brand films", "Social reels", "Drone", "Websites", "Food & venue", "Farm & land", "Product video", "Apps"];
const CLIENTS = ["The Longhorn", "Teddington’s", "AMC Transport", "Mise", "VC Estate Planning", "Club One", "WDG Agriculture"];

export function Marquee() {
  const row = ITEMS.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="mx-7">{t}</span>
      <span className="font-display italic text-gold">✦</span>
    </span>
  ));
  const clients = CLIENTS.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="mx-7 font-display italic">{t}</span>
      <span className="text-muted-foreground text-[0.5em]">●</span>
    </span>
  ));
  return (
    <div className="hairline border-b border-border overflow-hidden py-6 whitespace-nowrap" aria-hidden="true">
      <div className="inline-block text-[clamp(28px,3.4vw,52px)]" style={{ animation: "mq 34s linear infinite" }}>
        {row}{row}
      </div>
      <div className="inline-block text-[clamp(22px,2.6vw,40px)] text-muted-foreground mt-3" style={{ animation: "mq-rev 46s linear infinite" }}>
        {clients}{clients}
      </div>
    </div>
  );
}

export function Apps() {
  return (
    <AppsRail
      title={<>We don’t just film businesses.<br />We build their <i>software</i>.</>}
      intro="Farm dashboards, restaurant operations and authorisation tools, all live and in daily use. If your business runs on spreadsheets and WhatsApp, we can fix that too."
      cta={{ label: "See the apps →", href: "/app-development" }}
    />
  );
}
