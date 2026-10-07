import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { servicePages } from "@/data/servicePages";

const BASE = "https://www.wdgvideography.com";

export default function ServicePage({ slug }: { slug: string }) {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
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
    <div className="relative min-h-screen bg-background overflow-hidden">
      <SEO title={page.seoTitle} description={page.seoDescription} keywords={page.keywords} canonicalUrl={url} ogImage={`${BASE}${page.image}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-16 lg:pb-24">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <nav aria-label="Breadcrumb" className="text-xs font-body text-muted-foreground mb-6">
              <a href="/" className="hover:text-gold">Home</a> <span aria-hidden="true">/</span> <span>{page.eyebrow}</span>
            </nav>
            <span className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">{page.eyebrow}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{page.h1}</h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">{page.intro}</p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href={`/contact?service=${page.serviceId}`} className="px-8 py-4 bg-gold text-background font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">
                Get a Quote
              </a>
              {page.priceFrom !== "Custom" && <span className="text-sm font-body text-muted-foreground">From <span className="text-gold font-semibold">{page.priceFrom}</span></span>}
            </div>
          </motion.div>
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src={page.image} alt={page.imageAlt} width={1200} height={800} className="w-full aspect-[3/2] object-cover rounded-sm border border-border/50" />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Packages &amp; Pricing</h2>
          <div className={`grid gap-6 sm:grid-cols-2 ${page.packages.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {page.packages.map((p) => (
              <div key={p.name} className="p-8 bg-card/50 border border-border/50 rounded-sm flex flex-col">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-gold font-display text-2xl font-bold mb-6">{p.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm font-body text-muted-foreground flex gap-2"><span className="text-gold">✓</span>{f}</li>
                  ))}
                </ul>
                <a href={`/contact?service=${page.serviceId}`} className="text-sm font-body text-gold hover:underline">Enquire →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container grid gap-8 md:grid-cols-3">
          {page.benefits.map((b) => (
            <div key={b.title}>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((f) => (
              <details key={f.q} className="group p-6 bg-card/50 border border-border/50 rounded-sm">
                <summary className="cursor-pointer font-body font-semibold text-foreground">{f.q}</summary>
                <p className="mt-4 text-muted-foreground font-body leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground font-body mb-4">Other services:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {servicePages.filter((s) => s.slug !== page.slug).map((s) => (
                <a key={s.slug} href={`/${s.slug}`} className="text-sm font-body text-gold hover:underline">{s.eyebrow}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
