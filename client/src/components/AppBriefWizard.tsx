/**
 * App Development Onboarding Wizard — Noir Cinema Design
 * Multi-step project brief that submits through the existing contact pipeline.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const ENQUIRY_ENDPOINT = "https://assistant-36b1ac32.base44.app/functions/wdgSiteEnquiry";

const APP_TYPES = [
  { value: "process", label: "Business Process App", desc: "Rotas, stock, jobs, finance — replacing spreadsheets" },
  { value: "portal", label: "Client Portal", desc: "Logins, dashboards and data for your customers" },
  { value: "ai", label: "AI Tool or Automation", desc: "Smart tools that do the repetitive work for you" },
  { value: "booking", label: "Booking or Rota System", desc: "Appointments, bookings, staff scheduling" },
  { value: "combo", label: "Website + App Combo", desc: "A public site with a working app behind it" },
  { value: "unsure", label: "Not Sure Yet", desc: "You know the problem — help us scope the solution" },
];

const FEATURES = [
  "Logins & user roles",
  "Dashboards & reporting",
  "Bookings or rotas",
  "Payments or invoicing",
  "Email/SMS notifications",
  "AI features",
  "Integrations with other systems",
  "Mobile-first field use",
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3", label: "Within 1–3 months" },
  { value: "3-6", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring for now" },
];

const BUDGETS = [
  { value: "2k", label: "Starting at £2,000" },
  { value: "2-5k", label: "£2,000 – £5,000" },
  { value: "5-10k", label: "£5,000 – £10,000" },
  { value: "10k+", label: "£10,000+" },
  { value: "unsure", label: "Not sure — guide me" },
];

const STEP_TITLES = ["About You", "Your Project", "Features", "Timeline & Budget"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Choice({
  label, desc, selected, onClick,
}: { label: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-sm border transition-all duration-300 ${
        selected
          ? "border-gold bg-gold/10"
          : "border-border/40 bg-card/40 hover:border-gold/40 hover:bg-card/60"
      }`}
    >
      <span className={`block font-body font-medium text-sm ${selected ? "text-gold" : "text-foreground"}`}>
        {label}
      </span>
      {desc && <span className="block text-xs text-muted-foreground font-body mt-1">{desc}</span>}
      {selected && (
        <svg className="w-4 h-4 text-gold float-right -mt-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-sm border border-border/40 bg-card/40 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-colors";

export default function AppBriefWizard() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [appType, setAppType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [problem, setProblem] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const toggleFeature = (f: string) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const next = () => {
    setError("");
    if (step === 0) {
      if (!user.firstName.trim()) return setError("Please enter your first name.");
      if (!EMAIL_RE.test(user.email.trim())) return setError("Please enter a valid email address.");
    }
    if (step === 1 && !appType) return setError("Please choose what you need — or pick 'Not Sure Yet'.");
    if (step === 2) return setStep(3);
    if (step === 3) return submit();
    setStep((s) => s + 1);
  };

  const submit = async () => {
    const typeLabel = APP_TYPES.find((t) => t.value === appType)?.label || appType;
    const timelineLabel = TIMELINES.find((t) => t.value === timeline)?.label || timeline;
    const budgetLabel = BUDGETS.find((b) => b.value === budget)?.label || budget;
    const message = [
      "APP DEVELOPMENT PROJECT BRIEF (onboarding wizard)",
      "",
      `Project type: ${typeLabel}`,
      `Features needed: ${features.length ? features.join(", ") : "None selected"}`,
      `Timeline: ${timelineLabel}`,
      `Budget: ${budgetLabel}`,
      problem.trim() ? `\nThe problem we're solving:\n${problem.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    if (message.trim().length < 10) return setError("Please tell us a little about the project.");
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.firstName.trim(),
          lastName: user.lastName.trim(),
          email: user.email.trim(),
          phone: user.phone.trim(),
          service: "app-development",
          message,
          source: "app-brief",
          honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success !== true) {
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStep(4);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (step === 4) {
    return (
      <div className="rounded-sm border border-gold/40 bg-gradient-to-b from-gold/10 to-transparent p-8 lg:p-14 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">Brief Received</h3>
          <p className="text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
            Thanks {user.firstName} — your project brief is with us. We'll review it and come back
            within 24 hours with initial thoughts, questions and a suggested scope. No jargon, no
            hard sell — just a genuine look at what your app could be.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border/40 bg-card/40 p-6 lg:p-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEP_TITLES.map((t, i) => (
          <div key={t} className="flex-1">
            <div className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-gold" : "bg-border/40"}`} />
            <span className={`hidden sm:block mt-2 text-[10px] font-body uppercase tracking-wider ${i === step ? "text-gold" : "text-muted-foreground"}`}>
              {t}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">Let's start with you</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">So we know who we're building for.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className={inputCls} placeholder="First name *" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                <input className={inputCls} placeholder="Last name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                <input className={inputCls} placeholder="Email address *" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input className={inputCls} placeholder="Phone (optional)" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            <input type="text" name="company_website" value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">What do you need built?</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">Pick the closest fit — we'll refine it together.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {APP_TYPES.map((t) => (
                  <Choice key={t.value} label={t.label} desc={t.desc} selected={appType === t.value} onClick={() => { setAppType(t.value); setError(""); }} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">What should it do?</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">Select everything that applies — skip anything you're not sure about.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <Choice key={f} label={f} selected={features.includes(f)} onClick={() => toggleFeature(f)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">Timeline & budget</h3>
                <p className="text-sm text-muted-foreground font-body mb-6">Honest answers get honest advice — there's no wrong answer here.</p>
              </div>
              <div>
                <p className="text-xs font-body text-gold uppercase tracking-wider mb-3">When do you need it?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIMELINES.map((t) => (
                    <Choice key={t.value} label={t.label} selected={timeline === t.value} onClick={() => { setTimeline(t.value); setError(""); }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-body text-gold uppercase tracking-wider mb-3">Rough budget</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUDGETS.map((b) => (
                    <Choice key={b.value} label={b.label} selected={budget === b.value} onClick={() => { setBudget(b.value); setError(""); }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-body text-gold uppercase tracking-wider mb-3">The problem, in your words (optional)</p>
                <textarea
                  className={`${inputCls} min-h-[110px] resize-y`}
                  placeholder="e.g. Our rota lives in three different spreadsheets and nobody knows if shifts are confirmed…"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 text-sm text-red-400 font-body">{error}</p>}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
        <button
          type="button"
          onClick={() => { setError(""); setStep((s) => Math.max(0, s - 1)); }}
          disabled={step === 0}
          className="px-5 py-2.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={submitting}
          className="px-8 py-3 bg-gold text-primary-foreground font-body font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)] disabled:opacity-60"
        >
          {step === 3 ? (submitting ? "Sending…" : "Submit Project Brief") : "Continue →"}
        </button>
      </div>
    </div>
  );
}
