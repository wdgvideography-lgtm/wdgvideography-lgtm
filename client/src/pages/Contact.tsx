/**
 * Contact Page — Full form with service type dropdown
 * Sends form data to backend which emails wdg.videography@gmail.com
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";

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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Pre-select service from URL params
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

    if (!formData.firstName || !formData.email || !formData.service || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <FilmGrainOverlay />
      <Navbar />

      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
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

            {/* Form */}
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Row */}
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
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50"
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
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body text-muted-foreground mb-2">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50"
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
                      className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted-foreground/50"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    What service are you interested in? <span className="text-gold">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C8A951' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                  >
                    <option value="" disabled>Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
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
                    className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-sm text-foreground font-body text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none placeholder:text-muted-foreground/50"
                    placeholder="Tell us about your project, what you're looking for, and any specific requirements..."
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-sm font-body">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full py-4 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.12_75/0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Message Sent!</h2>
                <p className="text-muted-foreground font-body text-lg mb-8">
                  Thank you for getting in touch. We'll get back to you within 24 hours.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-8 py-3 bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300"
                >
                  Back to Home
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
