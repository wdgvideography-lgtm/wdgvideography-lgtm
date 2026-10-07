/** Services — three ways we help, then the full price list. */
import { useReveal } from "@/hooks/useReveal";
import { PriceMenu, type PriceRow } from "@/components/editorial";

const WAYS = [
  { file: "butchery", n: "01", title: "Brand & promo films", text: "Your story, shot and graded properly, with reels included.", href: "/video-production" },
  { file: "salami", n: "02", title: "Social media reels", text: "Vertical edits, captions and a posting plan that keeps you visible.", href: "/social-media-marketing" },
  { file: "", img: "/sites/longhorn-desktop.webp", n: "03", title: "Websites & apps", text: "Fast, search-ready sites and custom software. Five live client sites and counting.", href: "/website-design" },
];

export const TIERS: PriceRow[] = [
  { name: "Basic Service", price: "£450", href: "/video-production", features: ["2 hour single location shoot", "10 miles of free travel", "1× 60 second video with 1 revision", "4× 15 second reels"] },
  { name: "Business Growth", price: "£650", popular: true, href: "/video-production", features: ["4 hour shoot in up to 2 locations", "1× 2 min brand video", "Up to 2 revisions on brand video", "5× 15–30 second reels", "Up to 1 revision per reel"] },
  { name: "Bespoke Project", price: "£1,200", href: "/video-production", features: ["8 hour shoot in up to 3 locations", "Pre-production storyboarding meeting", "1× 3–5 min cinematic video", "Up to 4 revisions on main video", "8× 15–30 sec reels with 1 revision each"] },
  { name: "Website Design", price: "£1,000 – £7,000", href: "/website-design", features: ["Custom-designed for your brand", "Mobile-responsive and fast-loading", "SEO-optimised from the ground up", "Conversion-focused layouts", "Price depends on each project"] },
  { name: "Product Photography", price: "From £25/image", href: "/product-photography", features: ["Studio-lit, professionally edited", "5 images from £100", "10 images from £175", "20 images from £300", "Photography + video bundles available"] },
  { name: "Product Videography", price: "From £50", href: "/product-videography", features: ["Quick-cut reel from £50", "15-sec social reel from £100", "60-sec hero video from £350", "Hero video + social cutdowns from £500", "360° turntable option available"] },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="services" className="px-5 sm:px-8 lg:px-14 pt-[16vh] pb-[10vh]" style={{ scrollMarginTop: 80 }}>
      <div className="rv flex flex-wrap items-end justify-between gap-6 mb-[8vh]">
        <h2 className="display text-[clamp(44px,6vw,100px)]">Three ways we<br />help you <i>grow</i>.</h2>
        <p className="text-muted-foreground max-w-sm">Film, social and web from one studio, so everything matches and nothing gets lost between suppliers.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {WAYS.map((w) => (
          <a key={w.n} href={w.href} className="rv card-media aspect-[3/4] text-white block group">
            {w.file ? (
              <video src={`/media/${w.file}.mp4`} poster={`/media/${w.file}.jpg`} muted loop playsInline preload="none"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})} onMouseLeave={(e) => e.currentTarget.pause()} aria-hidden="true" />
            ) : (
              <img src={w.img} alt="" loading="lazy" style={{ objectPosition: "top" }} />
            )}
            <span className="absolute top-5 left-5 text-[13px] font-semibold">{w.n}</span>
            <div className="absolute inset-x-0 bottom-0 p-6" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.75))" }}>
              <h3 className="font-display text-[30px] leading-[1.05]">{w.title}</h3>
              <p className="text-sm opacity-85 mt-1.5">{w.text}</p>
              <span className="inline-block mt-4 text-sm font-medium border-b border-white/60 group-hover:border-gold group-hover:text-gold transition-colors">Learn more</span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}

export function Prices() {
  return (
    <PriceMenu id="prices" title={<>Packages and <i>prices</i>.</>} intro="Fixed prices, no hidden extras. Every video package includes vertical reels for your socials." rows={TIERS} cta="Full details" />
  );
}
