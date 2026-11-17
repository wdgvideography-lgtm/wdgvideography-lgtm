/**
 * Get a quote: the instant price checker. The quote box itself is /quote-widget.js,
 * built in WDG Business Management (scripts/build-quote-widget.mjs) and copied here.
 * It shows a guide price from the live price list, then sends the answers to Business
 * Management, which prices the request again on the server and files it as an enquiry.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

declare global { interface Window { WDGQuote?: { boot: () => void } } }

export default function GetAQuote() {
  useEffect(() => {
    if (window.WDGQuote) { window.WDGQuote.boot(); return; }
    if (document.getElementById("wdg-quote-script")) return;
    const s = document.createElement("script");
    s.id = "wdg-quote-script"; s.src = "/quote-widget.js"; s.defer = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
      <SEO
        title="Get an Instant Price — Video, Websites & Apps"
        description="Answer a few quick questions and see what your video, website, app or social media would cost straight away. Cheltenham, Gloucestershire. No sign-up."
        keywords="video production price Cheltenham, website cost Gloucestershire, app development quote, social media management price"
        canonicalUrl="https://www.wdgvideography.com/get-a-quote"
      />
      <ErrorBoundary silent><Navbar /></ErrorBoundary>
      <main className="px-5 sm:px-8 lg:px-14 pt-36 lg:pt-44 pb-[12vh]">
        <span className="rise mono-tag text-gold" style={{ animationDelay: ".05s" }}>INSTANT PRICE</span>
        <h1 className="rise display text-[clamp(44px,7vw,112px)] mt-5 text-balance" style={{ animationDelay: ".15s" }}>See what it <i>costs</i>.</h1>
        <p className="rise text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed" style={{ animationDelay: ".3s" }}>
          Answer a few quick questions and you'll see a guide price straight away. We'll then send your exact quote, usually within one working day. No sign-up.
        </p>
        <div className="mt-12 text-foreground" data-wdg-quote="videography">
          <noscript>Our price checker needs JavaScript. Use the <a href="/contact">contact form</a> or call 07584 065559.</noscript>
        </div>
        <p className="text-center text-muted-foreground mt-8">Rather talk it through? <a className="underline hover:text-gold" href="/contact">Send us a message</a> or call <a className="underline hover:text-gold" href="tel:07584065559">07584 065559</a>.</p>
      </main>
      <ErrorBoundary silent><Footer /></ErrorBoundary>
    </div>
  );
}
