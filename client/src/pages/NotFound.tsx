import { useLocation } from "wouter";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEO title="Page Not Found" noIndex={true} />
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
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
              The page you're looking for doesn't exist or has been moved.
            </p>

            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)]"
            >
              Return Home
            </button>

            <div className="w-16 h-px bg-gold/60 mx-auto mt-8" />
          </div>
        </div>
      </div>
    </>
  );
}
