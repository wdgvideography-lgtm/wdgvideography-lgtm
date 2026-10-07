/**
 * Contact Page — Full form with service type dropdown
 * Hardened: email validation, submit debounce, disabled state on pending
 */

import { useState, useEffect, useRef } from "react";
const ENQUIRY_ENDPOINT = "https://assistant-36b1ac32.base44.app/functions/wdgSiteEnquiry";
import { useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useReveal } from "@/hooks/useReveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const serviceOptions = [
  { value: "consultation", label: "Book a Consultation" },
  { value: "product-photography", label: "Product Photography (From £25/image)" },
  { value: "product-videography", label: "Product Videography (From £50)" },
  { value: "social-media", label: "Social Media Management" },
  { value: "website-design", label: "Website Design" },
  { value: "app-development", label: "App Development" },
  { value: "content-creation", label: "Content Creation" },
  { value: "brand-building", label: "Brand Building" },
  { value: "basic-service", label: "Basic Service Video (From £450)" },
  { value: "business-growth", label: "Business Growth Video (From £650)" },
  { value: "bespoke-project", label: "Bespoke Project (From £1,200)" },
];

export default function Contact() {
  const searchString = useSearch();
  const lastSubmitRef = useRef<number>(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const service = params.get("service");
    if (service) {
      setFormData((prev) => ({ ...prev, service }));
    }
  }, [searchString]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Debounce: prevent double-submits within 3 seconds
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    if (!formData.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!formData.email.trim() || !EMAIL_RE.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.service) {
      setError("Please select a service.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError("Please enter a message (at least 10 characters).");
      return;
    }

    setSubmitting(true);
    fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.firstName.trim(),
        lastName: (formData.lastName || "").trim(),
        email: formData.email.trim(),
        phone: (formData.phone || "").trim(),
        service: formData.service,
        message: formData.message.trim(),
        source: "contact",
        honeypot,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.success !== true) {
          setError(data?.error || "Something went wrong. Please try again.");
          return;
        }
        setSubmitted(true);
        setError("");
      })
      .catch(() => setError("Network error — please check your connection and try again."))
      .finally(() => setSubmitting(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPending = submitting;

  const ref = useReveal<HTMLElement>(0.05);
  const field = (name: keyof typeof formData, label: string, props: Record<string, unknown> = {}) => (
    <label className="block">
      <span className="mono-tag text-muted-foreground">{label.toUpperCase()}</span>
      <input name={name} value={formData[name]} onChange={handleChange} className="field mt-1" {...props} />
    </label>
  );

  return (
    <div className="relative min-h-screen bg-background" style={{ overflowX: "clip" }}>
      <SEO
        title="Contact Us — Book a Consultation"
        description="Get in touch with WDG Videography for cinematic video production, brand videos, social media content, website design, and digital marketing services in Cheltenham, Gloucestershire. Free consultation available."
        keywords="contact WDG Videography, book videographer Cheltenham, video production enquiry, marketing consultation Gloucestershire, brand video quote"
        canonicalUrl="https://www.wdgvideography.com/contact"
      />
      <ErrorBoundary silent><Navbar /></ErrorBoundary>

      <main ref={ref} className="px-5 sm:px-8 lg:px-14 pt-36 lg:pt-44 pb-[12vh]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-[5vw]">
          {/* left: the invitation */}
          <div className="lg:col-span-6">
            <span className="rise mono-tag text-gold" style={{ animationDelay: ".05s" }}>CONTACT</span>
            <h1 className="rise display text-[clamp(52px,8.4vw,140px)] mt-5 text-balance" style={{ animationDelay: ".15s" }}>Tell us what you're <i>making</i>.</h1>
            <p className="rise text-lg text-muted-foreground max-w-md mt-8 leading-relaxed" style={{ animationDelay: ".3s" }}>
              A few lines about your business and what you need is plenty. We'll reply personally, usually with a couple of questions and a rough price.
            </p>

            <dl className="rise mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-8" style={{ animationDelay: ".4s" }}>
              <div className="hairline pt-5">
                <dt className="mono-tag text-muted-foreground">EMAIL</dt>
                <dd className="mt-2"><a href="mailto:will@wdgvideography.com" className="font-display text-[clamp(22px,2vw,30px)] hover:text-gold transition-colors break-all">will@wdgvideography.com</a></dd>
              </div>
              <div className="hairline pt-5">
                <dt className="mono-tag text-muted-foreground">PHONE</dt>
                <dd className="mt-2"><a href="tel:+447584065559" className="font-display text-[clamp(22px,2vw,30px)] hover:text-gold transition-colors">07584 065559</a></dd>
              </div>
              <div className="hairline pt-5">
                <dt className="mono-tag text-muted-foreground">STUDIO</dt>
                <dd className="mt-2 font-display text-[clamp(22px,2vw,30px)] leading-tight">Cheltenham, Gloucestershire</dd>
              </div>
              <div className="hairline pt-5">
                <dt className="mono-tag text-muted-foreground">WE TRAVEL</dt>
                <dd className="mt-2 font-display text-[clamp(22px,2vw,30px)] leading-tight">Cotswolds, Worcestershire and across England</dd>
              </div>
            </dl>

            <ol className="rise mt-14 space-y-5" style={{ animationDelay: ".5s" }}>
              {[
                ["01", "You send the form.", "Or call, if that's quicker."],
                ["02", "We talk it through.", "A short call to understand the business, the audience and what success looks like."],
                ["03", "You get a plan and a price.", "Fixed, in writing, with what's included and what happens on the day."],
              ].map(([n, t, d]) => (
                <li key={n} className="grid grid-cols-[48px_1fr] gap-4 items-baseline">
                  <span className="mono-tag text-gold">{n}</span>
                  <div><p className="font-semibold text-lg">{t}</p><p className="text-muted-foreground text-sm mt-0.5">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>

          {/* right: the form */}
          <div className="lg:col-span-6 rise" style={{ animationDelay: ".3s" }}>
            <div className="lg:sticky lg:top-28 rounded-3xl bg-card border border-border p-7 sm:p-10 shadow-[0_40px_80px_-50px_rgba(0,0,0,.35)]">
              {submitted ? (
                <div className="py-10 text-center">
                  <span className="mono-tag text-gold">SENT</span>
                  <h2 className="display text-[clamp(32px,4vw,56px)] mt-4">Thanks, we've <i>got it</i>.</h2>
                  <p className="text-muted-foreground mt-5 max-w-sm mx-auto">We'll come back to you personally. If it's urgent, call 07584 065559.</p>
                  <a href="/portfolio" className="pill mt-8">See the work while you wait</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <input type="text" name="company_website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid sm:grid-cols-2 gap-7">
                    {field("firstName", "First name *", { type: "text", autoComplete: "given-name", required: true, placeholder: "Will" })}
                    {field("lastName", "Last name", { type: "text", autoComplete: "family-name", placeholder: "Smith" })}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-7">
                    {field("email", "Email *", { type: "email", autoComplete: "email", required: true, placeholder: "you@business.co.uk" })}
                    {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "07…" })}
                  </div>
                  <label className="block relative">
                    <span className="mono-tag text-muted-foreground">WHAT DO YOU NEED? *</span>
                    <select name="service" value={formData.service} onChange={handleChange} required className="field mt-1 pr-8">
                      <option value="" disabled>Choose one</option>
                      {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <span aria-hidden="true" className="absolute right-0 bottom-4 text-muted-foreground">↓</span>
                  </label>
                  <label className="block">
                    <span className="mono-tag text-muted-foreground">TELL US ABOUT IT *</span>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required minLength={10} className="field mt-1 resize-none"
                      placeholder="The business, the audience, any dates you're working to…" />
                  </label>
                  {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button type="submit" disabled={isPending} className="pill gold disabled:opacity-60 disabled:cursor-wait">
                      {isPending ? "Sending…" : "Send enquiry →"}
                    </button>
                    <span className="text-xs text-muted-foreground max-w-[220px]">No mailing lists. We only use this to reply to you.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <ErrorBoundary silent><Footer /></ErrorBoundary>
    </div>
  );
}
