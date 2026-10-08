/**
 * Service page — one template, five services. Built from the editorial kit so
 * every page matches the homepage: dark media hero, word-by-word statement,
 * real proof (the actual showreel / live sites / reels), menu-style pricing,
 * pillars, FAQ and the knocked-out closing line.
 */
import { Helmet } from "react-helmet-async";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { servicePages } from "@/data/servicePages";
import { PageHero, Statement, PriceMenu, Pillars, FAQ, PosterStrip, words } from "@/components/editorial";
import WorkShowcase from "@/components/home/WorkShowcase";
import Websites from "@/components/home/Websites";
import PhoneFan from "@/components/home/PhoneFan";
import ColourGrade from "@/components/home/ColourGrade";
import CTA from "@/components/home/CTA";
import { useReveal } from "@/hooks/useReveal";

const BASE = "https://www.wdgvideography.com";

/* Per-service art direction: hero media, headline, statement and proof. */
interface Treatment {
  title: ReactNode;
  video?: string; poster?: string; image?: string; imagePosition?: string;
  statementEyebrow: string;
  statement: string;
  proof: ReactNode;
}

interface RefImage { src: string; alt: string; credit: string; href: string; span: string }

/** Reference imagery, clearly labelled as such: we don't yet have a product portfolio of our own to show. */
function ReferenceMosaic({ images, eyebrow, title, note }: { images: RefImage[]; eyebrow: string; title: ReactNode; note: string }) {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <section ref={ref} className="px-5 sm:px-8 lg:px-14 py-[10vh]">
      <div className="rv grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-[6vw] items-end mb-12">
        <span className="eyebrow">{eyebrow}</span>
        <div>
          <h2 className="display text-[clamp(38px,5vw,84px)]">{title}</h2>
          <p className="text-muted-foreground mt-5 max-w-xl">{note}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-12 gap-4">
        {images.map((im, i) => (
          <figure key={im.src} className={`rv card-media group ${im.span}`} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
            <img src={im.src} alt={im.alt} loading="lazy" />
            <figcaption className="absolute left-4 bottom-3 mono-tag text-white/85 opacity-0 group-hover:opacity-100 transition-opacity" style={{ textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>
              REFERENCE · <a href={im.href} target="_blank" rel="noopener noreferrer" className="underline">{im.credit.toUpperCase()} / PEXELS</a>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="rv mono-tag text-muted-foreground mt-6">REFERENCE IMAGES VIA PEXELS, SHOWN TO ILLUSTRATE THE STYLE. NOT OUR WORK. ASK TO SEE OUR CURRENT PRODUCT SHOOTS.</p>
    </section>
  );
}

const REFERENCE: RefImage[] = [
  { src: "/reference/perfume-dark.webp", alt: "Reference: dark perfume bottle lit from behind on black", credit: "Isidor Bobinec", href: "https://www.pexels.com/photo/9202860/", span: "md:col-span-7 aspect-[3/2]" },
  { src: "/reference/serum-shadow.webp", alt: "Reference: skincare dropper bottle with leaf shadow", credit: "anfel lanane", href: "https://www.pexels.com/photo/29675497/", span: "md:col-span-5 aspect-[4/5]" },
  { src: "/reference/perfume-splash.webp", alt: "Reference: perfume bottle with water splash on blue", credit: "Bolarinwa Olasunkanmi", href: "https://www.pexels.com/photo/11705153/", span: "md:col-span-4 aspect-[4/5]" },
  { src: "/reference/coffee-bag.webp", alt: "Reference: coffee bag on roasted beans", credit: "Agencia Bonito", href: "https://www.pexels.com/photo/28495599/", span: "md:col-span-4 aspect-[4/5]" },
  { src: "/reference/earbuds.webp", alt: "Reference: wireless earbuds floating on black", credit: "HS Studio", href: "https://www.pexels.com/photo/30981655/", span: "md:col-span-4 aspect-[4/5]" },
  { src: "/reference/headphones.webp", alt: "Reference: black headphones on white", credit: "cottonbro studio", href: "https://www.pexels.com/photo/3945667/", span: "md:col-span-12 aspect-[21/9]" },
];

const TREATMENTS: Record<string, Treatment> = {
  "video-production": {
    title: <>Films that make people <i>stop</i>.</>,
    video: "/media/harvest-sunset.mp4", poster: "/media/harvest-sunset.jpg",
    statementEyebrow: "01 — What you get",
    statement: "A brand film tells your story in two minutes. The reels we cut from the same shoot keep it {in front of people} for the next two months.",
    proof: <><WorkShowcase /><ColourGrade /></>,
  },
  "social-media-marketing": {
    title: <>Content people <i>actually</i> watch.</>,
    video: "/media/club-one.mp4", poster: "/media/club-one.jpg",
    statementEyebrow: "01 — How it works",
    statement: "We plan, film, edit and post, then look at the numbers and do more of {what worked}. One studio, one monthly price, no handing files between suppliers.",
    proof: <PhoneFan />,
  },
  "website-design": {
    title: <>Websites built to be <i>found</i>.</>,
    image: "/sites/longhorn-desktop.webp", imagePosition: "top",
    statementEyebrow: "01 — Why us",
    statement: "Most web designers hand you a template and a stock-photo library. We design the site, then {shoot the photography and film} that fill it, so it looks like your business and nobody else's.",
    proof: <Websites />,
  },
  "product-photography": {
    title: <>Products that look <i>worth it</i>.</>,
    image: "/reference/perfume-dark.webp",
    statementEyebrow: "01 — The approach",
    statement: "Studio light, clean backgrounds and honest retouching. Images sized for {Amazon, Etsy and your own shop}, delivered ready to upload.",
    proof: <ReferenceMosaic images={REFERENCE} eyebrow="02 — The standard we work to" title={<>Lit, shot and <i>retouched</i>.</>} note="We're a young studio on the product side, so rather than pad this page with work that isn't ours, these are reference images that show the lighting and finish we aim for. Ask and we'll send what we've shot most recently." />,
  },
  "product-videography": {
    title: <>Short videos that <i>sell</i>.</>,
    image: "/reference/earbuds.webp",
    statementEyebrow: "01 — The approach",
    statement: "Quick-cut reels for ads and socials, longer hero videos for your product page. Shot in the studio with {motion, macro and 360°} options.",
    proof: <ReferenceMosaic images={[...REFERENCE].reverse().map((r, i) => ({ ...r, span: REFERENCE[i].span }))} eyebrow="02 — The standard we work to" title={<>Made for the <i>product page</i>.</>} note="These are reference frames, not ours, chosen to show the kind of light and movement we build product videos around. Our own product reels are available on request while the portfolio grows." />,
  },
};

export default function ServicePage({ slug }: { slug: string }) {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
  const t = TREATMENTS[slug];
  const url = `${BASE}/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.eyebrow,
        serviceType: page.eyebrow,
        description: page.seoDescription,
        url,
        image: `${BASE}${page.image}`,
        areaServed: ["Cheltenham", "Gloucester", "Gloucestershire", "England"],
        provider: { "@type": "LocalBusiness", name: "WDG Videography", url: BASE, telephone: "+447584065559" },
        offers: page.packages.map((p) => ({ "@type": "Offer", name: p.name, description: p.features.join(", ") })),
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
      <SEO title={page.seoTitle} description={page.seoDescription} keywords={page.keywords} canonicalUrl={url} ogImage={`${BASE}${page.image}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ErrorBoundary silent><Navbar /></ErrorBoundary>

      <main>
        <PageHero
          eyebrow={page.eyebrow}
          title={t?.title ?? page.h1}
          lead={page.intro}
          video={t?.video} poster={t?.poster} image={t?.image ?? page.image} imageAlt={page.imageAlt} imagePosition={t?.imagePosition}
          from={page.priceFrom !== "Custom" ? page.priceFrom : undefined}
          primary={{ label: "Start a project", href: `/contact?service=${page.serviceId}` }}
          secondary={{ label: "See prices", href: "#prices" }}
        />
        {/* The visible H1 is the headline; this keeps the long-tail phrase for search without a second heading on screen. */}
        <p className="sr-only">{page.h1}</p>

        {t && <ErrorBoundary silent><Statement eyebrow={t.statementEyebrow} words={words(t.statement)} /></ErrorBoundary>}
        {t && <ErrorBoundary silent>{t.proof}</ErrorBoundary>}

        <ErrorBoundary silent>
          <PriceMenu id="prices" title={<>Packages and <i>prices</i>.</>} intro="Fixed prices, agreed before we start. Pick the one that fits, or ask and we'll put something together."
            rows={page.packages.map((p, i) => ({ ...p, href: `/contact?service=${page.serviceId}`, popular: slug === "video-production" && i === 1 }))} />
        </ErrorBoundary>

        <ErrorBoundary silent>
          <Pillars eyebrow="Why it works" title={<>What you're <i>paying for</i>.</>} items={page.benefits} />
        </ErrorBoundary>

        <ErrorBoundary silent><FAQ items={page.faqs} /></ErrorBoundary>

        <section className="px-5 sm:px-8 lg:px-14 pb-[10vh]">
          <div className="hairline pt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="eyebrow">Also from the studio</span>
            {servicePages.filter((s) => s.slug !== page.slug).map((s) => (
              <a key={s.slug} href={`/${s.slug}`} className="font-display text-[clamp(22px,2vw,30px)] hover:text-gold transition-colors">{s.eyebrow}</a>
            ))}
            <a href="/app-development" className="font-display text-[clamp(22px,2vw,30px)] hover:text-gold transition-colors">App Development</a>
          </div>
        </section>

        <ErrorBoundary silent><CTA /></ErrorBoundary>
      </main>
      <ErrorBoundary silent><Footer /></ErrorBoundary>
    </div>
  );
}
