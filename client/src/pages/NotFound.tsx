import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

// A dead end loses people, so the 404 offers the three places most visitors are heading.
const NEXT = [
  { label: "Watch the work", href: "/portfolio" },
  { label: "See packages and prices", href: "/#prices" },
  { label: "Websites from £800", href: "/website-design" },
];

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" noIndex={true} />
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ErrorBoundary silent><Navbar /></ErrorBoundary>
        <div className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
          <div className="text-center max-w-md">
            {/* Cinematic divider line */}
            <div className="w-16 h-px bg-gold/60 mx-auto mb-8" />

            <p className="text-gold text-xs font-body tracking-[0.3em] uppercase mb-4">
              Error 404
            </p>

            <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground mb-4">
              404
            </h1>

            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>

            <p className="text-muted-foreground font-body leading-relaxed mb-10">
              The page you're looking for doesn't exist or has been moved. Here are good places to start:
            </p>

            <ul className="flex flex-col items-center gap-3 mb-10">
              {NEXT.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="font-display text-xl md:text-2xl hover:text-gold transition-colors">{n.label} →</a>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
            >
              Start a project
            </a>
            <p className="mt-4 text-sm text-muted-foreground font-body">or <a href="/" className="underline hover:text-gold">go to the home page</a></p>

            <div className="w-16 h-px bg-gold/60 mx-auto mt-8" />
          </div>
        </div>
        <ErrorBoundary silent><Footer /></ErrorBoundary>
      </div>
    </>
  );
}
