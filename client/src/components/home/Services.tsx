/** Services — the four things we do for a business (one studio for all of it), then the full price list. */
import { useReveal } from "@/hooks/useReveal";
import { PriceMenu, type PriceRow } from "@/components/editorial";

const WAYS = [
  { file: "", img: "/app-screens/farmdash-dashboard.jpg", imgAlt: "WDG Farm Dash, a farm management system designed and built by WDG", n: "01", title: "Systems to run your business", text: "Bookings, staff, stock and records in one app built around how you work. From £1,500.", href: "/app-development" },
  { file: "butchery", n: "02", title: "Brand & promo films", text: "Your story, shot and graded properly, with reels included.", href: "/video-production" },
  { file: "salami", n: "03", title: "Photos & social media", text: "Product photos from £15 an image, plus reels and a posting plan that keeps you visible.", href: "/social-media-marketing" },
  { file: "", img: "/sites/longhorn-desktop.webp", imgAlt: "The Longhorn Bar & Grill website, designed and built by WDG Videography", n: "04", title: "Websites", text: "Fast, search-ready sites from £800, filled with our own photos and video. Live for The Longhorn, AMC Transport and VC Estate Planning.", href: "/website-design" },
];

export const TIERS: PriceRow[] = [
  { name: "Basic Service", price: "£450", href: "/video-production", features: ["2 hour single location shoot", "10 miles of free travel", "1× 60 second video with 1 revision", "4× 15 second reels"] },
  { name: "Business Growth", price: "£650", popular: true, href: "/video-production", features: ["4 hour shoot in up to 2 locations", "1× 2 min brand video", "Up to 2 revisions on brand video", "5× 15–30 second reels", "Up to 1 revision per reel"] },
  { name: "Bespoke Project", price: "£1,200", href: "/video-production", features: ["8 hour shoot in up to 3 locations", "Pre-production storyboarding meeting", "1× 3–5 min cinematic video", "Up to 4 revisions on main video", "8× 15–30 sec reels with 1 revision each"] },
  { name: "Website Design", price: "£800 – £7,000", href: "/website-design", features: ["Custom-designed for your brand", "Mobile-responsive and fast-loading", "SEO-optimised from the ground up", "Conversion-focused layouts", "Price depends on each project"] },
  { name: "Product Photography", price: "From £15/image", href: "/product-photography", features: ["Studio-lit, professionally edited", "5 images from £60", "10 images from £110", "20 images from £200", "Photography + video bundles available"] },
  { name: "Product Videography", price: "From £50", href: "/product-videography", features: ["Quick-cut reel from £50", "15-sec social reel from £100", "60-sec hero video from £350", "Hero video + social cutdowns from £500", "360° turntable option available"] },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="services" className="px-5 sm:px-8 lg:px-14 pt-[16vh] pb-[10vh]" style={{ scrollMarginTop: 80 }}>
      <div className="rv flex flex-wrap items-end justify-between gap-6 mb-[8vh]">
        <h2 className="display text-[clamp(44px,6vw,100px)]">Everything your<br />business <i>needs</i>.</h2>
        <p className="text-muted-foreground max-w-sm">No juggling a developer, a photographer, a videographer and a web designer. One studio that knows your business, so everything matches and nothing gets lost between suppliers. The Longhorn Bar &amp; Grill runs on our staff and booking system, our films and our website.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WAYS.map((w) => (
          <a key={w.n} href={w.href} className="rv card-media aspect-[3/4] text-white block group">
            {w.file ? (
              <video src={`/media/${w.file}.mp4`} poster={`/media/${w.file}.jpg`} muted loop playsInline preload="none"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})} onMouseLeave={(e) => e.currentTarget.pause()} aria-hidden="true" />
            ) : (
              <img src={w.img} alt={w.imgAlt ?? ""} loading="lazy" style={{ objectPosition: "top" }} />
            )}
            <span className="absolute top-5 left-5 text-[13px] font-semibold rounded-full bg-black/45 px-2 py-0.5">{w.n}</span>
            {/* Screenshots are bright, so they get a deeper shade behind the words than the darker films do. */}
            <div className="absolute inset-x-0 bottom-0 p-6 pt-16" style={{ background: w.file ? "linear-gradient(transparent, rgba(0,0,0,.75))" : "linear-gradient(transparent, rgba(0,0,0,.82) 28%, rgba(0,0,0,.92))" }}>
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
