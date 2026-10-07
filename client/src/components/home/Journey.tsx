/**
 * Journey — "A project, start to finish". Instead of describing the process, we show the actual
 * artefacts a client sees along the way: the brief and reply, the storyboard, the call sheet, the
 * delivery folder. A sticky stage; scrolling deals each document onto the desk.
 */
import { useEffect, useRef, useState } from "react";
import { clamp } from "@/hooks/useReveal";

const STEPS = [
  { n: "01", t: "It starts with a conversation", d: "Tell us what you do and who you want to reach. We come back with a plan and a fixed price, so you know exactly what you're getting before anything is filmed." },
  { n: "02", t: "Then we plan every shot", d: "A storyboard and shot list built from your business: the hero moments, the people, the details. You see it and approve it before the shoot." },
  { n: "03", t: "The shoot day runs to a schedule", d: "A call sheet with times, locations and kit. We work around your trade, keep disruption minimal and leave with everything on the list." },
  { n: "04", t: "You get everything, ready to use", d: "A graded brand film, reels cut for each platform, stills and website-ready files, all named, organised and delivered online." },
];
const N = STEPS.length;

const BOARD = [
  { img: "/media/tractor-wide.jpg", note: "1A · Drone establishing, golden hour" },
  { img: "/media/butchery.jpg", note: "2B · Counter, hands at work, 50mm" },
  { img: "/media/tack-shop.jpg", note: "3A · Owner interview, natural light" },
  { img: "/media/dining.jpg", note: "4C · Slow push through the room" },
  { img: "/media/amc-truck.jpg", note: "5A · Aerial track, vehicle in motion" },
  { img: "/media/club-one.jpg", note: "6B · Detail pass, shallow focus" },
];

function Brief() {
  return (
    <div className="p-6 sm:p-8 text-[14px] sm:text-[15px] leading-relaxed">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[.14em] text-black/45 mb-5"><span>ENQUIRY</span><span>FORM · WDGVIDEOGRAPHY.COM</span></div>
      <div className="rounded-2xl bg-black/[.05] p-4 sm:p-5 max-w-[88%]">
        <p className="text-black/85">Hi Will. We run a farm shop and butchery near Tewkesbury. We’ve just refitted the shop and want people to see what we actually do: the farm, the counter, the people. Instagram mostly, but the website needs it too.</p>
      </div>
      <div className="rounded-2xl bg-[#1b1a18] text-white/90 p-4 sm:p-5 max-w-[88%] ml-auto mt-4">
        <p>Love this. Half a day on the farm at first light for the drone, then the counter and the team mid-morning when the light comes through the front windows.</p>
        <p className="mt-3">You’d get a 2-minute brand film for the site and five vertical reels for Instagram, graded to match. <span className="text-gold">Fixed price £650</span>, no surprises.</p>
      </div>
      <div className="flex items-center gap-2 mt-5 text-[12px] text-black/50"><span className="w-2 h-2 rounded-full bg-[#28c840]" />Fixed price agreed · shoot booked</div>
    </div>
  );
}

function Storyboard() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[.14em] text-black/45 mb-4"><span>STORYBOARD · SHOT LIST</span><span>v2 · APPROVED</span></div>
      <div className="grid grid-cols-3 gap-3">
        {BOARD.map((b) => (
          <figure key={b.note} className="m-0">
            <div className="aspect-video overflow-hidden rounded-md bg-black"><img src={b.img} alt="" className="w-full h-full object-cover" loading="lazy" /></div>
            <figcaption className="text-[11px] sm:text-[12px] text-black/70 mt-1.5 leading-snug">{b.note}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-[12px] text-black/50 mt-4">Music: warm, acoustic, builds at 0:45 · Titles: Instrument Serif · Grade: natural, lifted shadows</p>
    </div>
  );
}

function CallSheet() {
  const rows = [
    ["06:40", "Sunrise", "Drone: fields, herd, approach to the farm"],
    ["08:00", "Yard", "Tractor and feed run, handheld + gimbal"],
    ["09:30", "Shop", "Counter, hands, product details, 50mm"],
    ["10:30", "Shop", "Owner interview, two angles, lav mic"],
    ["11:30", "Café", "Customers, plates, the room, slow pushes"],
    ["12:30", "Wrap", "Backup cards on site, drive home"],
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[.14em] text-black/45 mb-4"><span>CALL SHEET</span><span>DAY 1 OF 1</span></div>
      <table className="w-full text-[13px] sm:text-[14px]">
        <tbody>
          {rows.map(([t, w, s]) => (
            <tr key={t} className="border-t border-black/10">
              <td className="py-2.5 pr-3 font-mono text-[12px] text-black/55 whitespace-nowrap">{t}</td>
              <td className="py-2.5 pr-3 font-semibold text-black/85 whitespace-nowrap">{w}</td>
              <td className="py-2.5 text-black/70">{s}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-2 mt-5 text-[12px]">
        {["Cinema camera", "Gimbal", "Drone", "Lights", "Lav + boom"].map((k) => <span key={k} className="px-2.5 py-1 rounded-full bg-black/[.06] text-black/70">{k}</span>)}
      </div>
    </div>
  );
}

function Delivery() {
  const files = [
    ["Brand_Film_16x9_2m04.mp4", "graded · captions · music licensed"],
    ["Reel_01_Sunrise.mp4", "9:16 · 18s"],
    ["Reel_02_Counter.mp4", "9:16 · 22s"],
    ["Reel_03_Owner.mp4", "9:16 · 27s"],
    ["Reel_04_Cafe.mp4", "9:16 · 15s"],
    ["Reel_05_Herd.mp4", "9:16 · 19s"],
    ["Website_Hero_Loop.mp4", "1080p · 8s · silent"],
    ["Stills/ (24 images)", "web + print sizes"],
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[.14em] text-black/45 mb-4"><span>DELIVERY</span><span>SHARED FOLDER · READY</span></div>
      <ul className="divide-y divide-black/10">
        {files.map(([f, m]) => (
          <li key={f} className="flex items-center justify-between gap-4 py-2.5 text-[13px] sm:text-[14px]">
            <span className="flex items-center gap-3 min-w-0"><span className="w-7 h-7 rounded-md bg-gold/20 text-gold grid place-items-center text-[11px] font-mono shrink-0">{f.endsWith("/ (24 images)") ? "IMG" : "MP4"}</span><span className="font-mono text-black/80 truncate">{f}</span></span>
            <span className="text-black/50 whitespace-nowrap">{m}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-5 text-[12px] text-black/55"><span>Private review link · download anything, any time</span><span className="font-mono">8 items</span></div>
    </div>
  );
}

const CARDS = [Brief, Storyboard, CallSheet, Delivery];

export default function Journey() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const s = section.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - window.innerHeight));
        const f = p * (N - 1);
        const a = Math.min(N - 1, Math.floor(f + 0.5));
        if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
        const mobile = window.innerWidth < 1024;
        cards.current.forEach((c, i) => {
          if (!c) return;
          const d = i - f; // <0 dealt (behind), >0 waiting (off to the right)
          if (d > 0) {
            const k = clamp(d, 0, 1);
            c.style.transform = `translate(${k * 110}%, ${k * 8}%) rotate(${k * 8}deg)`;
            c.style.opacity = String(1 - clamp(d - 0.6, 0, 1));
            c.style.zIndex = String(20 + i);
          } else {
            const k = clamp(-d, 0, 3);
            c.style.transform = mobile
              ? `translate(0, ${-k * 10}px) scale(${1 - k * 0.04})`
              : `translate(${-k * 26}px, ${-k * 22}px) rotate(${-k * 3}deg) scale(${1 - k * 0.04})`;
            c.style.opacity = String(mobile ? 1 - clamp(k, 0, 1) : 1 - k * 0.22);
            c.style.zIndex = String(20 - Math.round(k * 4));
          }
        });
        if (rail.current) rail.current.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={section} id="process" className="relative" style={{ height: `${(N + 1) * 85}vh` }} aria-label="A project, start to finish">
      <div className="sticky top-0 h-[100svh] overflow-hidden px-5 sm:px-8 lg:px-14 pt-[84px] pb-6 lg:pb-10 flex flex-col">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4 lg:mb-6">
          <h2 className="font-display text-[clamp(34px,4.6vw,76px)] leading-[.95]">A project, <i className="text-gold">start to finish</i>.</h2>
          <span className="eyebrow">What you actually receive</span>
        </div>
        <div className="relative h-px bg-border mb-5 lg:mb-8"><div ref={rail} className="absolute inset-0 bg-gold origin-left" style={{ transform: "scaleX(0)" }} /></div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5 lg:gap-14 flex-1 min-h-0 items-start">
          {/* copy */}
          <div className="lg:pt-6">
            <div className="flex items-center gap-3 mono-tag text-muted-foreground"><span className="text-gold">{STEPS[active].n}</span><span>/ 04</span></div>
            <div key={active} style={{ animation: "scene-in .55s cubic-bezier(.2,.8,.2,1)" }}>
              <h3 className="font-display text-[clamp(26px,3.2vw,52px)] leading-[1.02] mt-3 max-w-[16ch]">{STEPS[active].t}</h3>
              <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed mt-4 max-w-[46ch]">{STEPS[active].d}</p>
            </div>
            <ol className="hidden lg:flex gap-6 mt-10">
              {STEPS.map((s, i) => (
                <li key={s.n} className="flex items-center gap-2 text-[13px]" style={{ opacity: i <= active ? 1 : 0.4 }}>
                  <span className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-mono ${i < active ? "bg-gold text-white" : i === active ? "border border-gold text-gold" : "border border-border"}`}>{i < active ? "✓" : i + 1}</span>
                  {["Brief", "Storyboard", "Call sheet", "Delivery"][i]}
                </li>
              ))}
            </ol>
          </div>

          {/* desk */}
          <div className="relative min-h-0 h-[52vh] lg:h-full">
            {CARDS.map((Card, i) => (
              <div key={i} ref={(el) => { cards.current[i] = el; }}
                className="absolute inset-x-0 top-0 lg:top-2 mx-auto max-w-[640px] rounded-[18px] bg-[#faf7f1] text-black shadow-[0_40px_90px_-30px_rgba(0,0,0,.45)] border border-black/5 will-change-transform max-h-full overflow-hidden"
                style={{ transformOrigin: "50% 100%" }}>
                <div className="flex items-center gap-1.5 px-4 h-8 border-b border-black/5"><span className="w-2 h-2 rounded-full bg-black/15" /><span className="w-2 h-2 rounded-full bg-black/15" /><span className="w-2 h-2 rounded-full bg-black/15" /><span className="ml-auto text-[10px] font-mono text-black/35">WDG · {["BRIEF", "STORYBOARD", "CALL SHEET", "DELIVERY"][i]}</span></div>
                <Card />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
