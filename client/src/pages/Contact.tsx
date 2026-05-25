/**
 * Contact Page — Full form with service type dropdown
 * Hardened: email validation, submit debounce, disabled state on pending
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import SEO from "@/components/SEO";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const serviceOptions = [
  { value: "consultation", label: "Book a Consultation" },
  { value: "social-media", label: "Social Media Management" },
  { value: "website-design", label: "Website Design" },
  { value: "content-creation", label: "Content Creation" },
  { value: "brand-building", label: "Brand Building" },
  { value: "basic-service", label: "Basic Service (From £450)" },
  { value: "business-growth", label: "Business Growth Service (From £650)" },
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

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError("");
    },
    onError: (err: any) => {
      setError(err.message || "Something went wrong. Please try again.");
    },
  });

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

    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPending = submitMutation.isPending ?? (submitMutation as any).isLoading ?? false;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <SEO
        title="Contact Us — Book a Consultation"
        description="Get in touch with WDG Videography for cinematic video production, brand videos, social media content, website design, and digital marketing services in Cheltenham, Gloucestershire. Free consultation available."
        keywords="contact WDG Videography, book videographer Cheltenham, video production enquiry, marketing consultation Gloucestershire, brand video quote"
        canonicalUrl="https://www.wdgvideography.com/contact"
      />
      <FilmGrainOverlay />
      <Navbar />

      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-xs font-body text-gold tracking-[0.3em] uppercase mb-4">
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
                Ready to bring your vision to life? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body text-muted-foreground mb-2">
                      First Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isPending}
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body text-muted-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isPending}
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isPending}
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
                    placeholder="+44 7xxx xxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Service <span className="text-gold">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors disabled:opacity-50"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={isPending}
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50 resize-none disabled:opacity-50"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive font-body"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Message Sent!</h2>
                <p className="text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
                  Thanks for reaching out. We'll be in touch within 24 hours to discuss your project.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
