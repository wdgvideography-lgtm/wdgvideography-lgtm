import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

/** Privacy policy. Keep the "Who we share it with" list in step with the code:
 *  client/src/lib/enquiry.ts sends the contact form to WDG Business Management
 *  (Supabase) and the Base44 email handler. */
const UPDATED = "17 November 2026";

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="How WDG Videography collects, uses and looks after your personal information."
        canonicalUrl="https://www.wdgvideography.com/privacy"
      />
      <ErrorBoundary silent><Navbar /></ErrorBoundary>
      <main className="px-5 sm:px-8 lg:px-14 pt-36 pb-24 max-w-3xl mx-auto text-foreground font-body leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:underline">
        <p className="mono-tag text-muted-foreground">LAST UPDATED {UPDATED.toUpperCase()}</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-8">Privacy policy</h1>

        <h2>Who we are</h2>
        <p>
          WDG Videography is run by William Davey, a sole trader based in Gloucestershire, UK. He is the
          "controller" of your personal information. Address: Grafton House, Gretton Fields, Gretton,
          Cheltenham, Gloucestershire GL54 5HH. Email: <a href="mailto:will@wdgvideography.com">will@wdgvideography.com</a>.
          We are registered with the Information Commissioner's Office (ICO).
        </p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>When you send an enquiry:</strong> your name, email address, phone number (if you give it), the service you're interested in and your message.</li>
          <li><strong>When you become a client:</strong> the contact and billing details needed to quote, deliver the work and invoice you, plus the files and footage you share with us or that we film for you.</li>
          <li><strong>When you visit the site:</strong> our hosting provider keeps short-lived technical logs (such as IP address and browser type) to keep the site secure. We don't use advertising or analytics cookies on this website.</li>
        </ul>

        <h2>How we use it and why we're allowed to</h2>
        <ul>
          <li>To reply to your enquiry and give you a quote — because you asked us to (steps before a contract).</li>
          <li>To carry out and invoice the work you book — to perform our contract with you.</li>
          <li>To keep business and tax records — because the law requires it.</li>
          <li>To keep the website and our systems secure — our legitimate interests.</li>
        </ul>
        <p>We never sell your personal information, and we don't send marketing emails unless you've asked for them.</p>

        <h2>Use of AI</h2>
        <p>
          We use AI assistants (for example Anthropic's Claude) to help run the business — such as drafting
          replies, summarising enquiries and organising our records. A person (Will) reviews what goes out
          and makes every decision about your enquiry or project; no decision with legal or similar effect
          is made about you automatically.
        </p>

        <h2>Who we share it with</h2>
        <p>We only share your information with the services we use to run the business, under contracts that require them to protect it:</p>
        <ul>
          <li><strong>Vercel</strong> — hosts this website.</li>
          <li><strong>Google Fonts</strong> — supplies the website fonts, so Google receives your IP address when a page loads.</li>
          <li><strong>Supabase</strong> — stores enquiries and client records in our business management system (data held in London).</li>
          <li><strong>Base44</strong> — forwards website enquiries to our inbox.</li>
          <li><strong>Zoho Mail</strong> — our business email.</li>
          <li><strong>Anthropic</strong> — the AI assistant described above.</li>
          <li><strong>Revolut</strong> and <strong>Stripe</strong> — when you pay an invoice.</li>
          <li>Our accountant and HMRC, where needed for tax.</li>
        </ul>
        <p>Some of these providers may process data outside the UK; where they do, they use UK-approved safeguards such as the International Data Transfer Addendum or adequacy regulations.</p>

        <h2>How long we keep it</h2>
        <ul>
          <li>Enquiries that don't lead to work: up to 2 years, then deleted.</li>
          <li>Client, invoice and payment records: 6 years after the end of the tax year they relate to, as HMRC requires.</li>
          <li>Footage and project files: for the length of the project and any agreed archive period.</li>
        </ul>

        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete the personal information we hold about you, ask us to limit or
          stop using it, or ask for a copy to take elsewhere. Email <a href="mailto:will@wdgvideography.com">will@wdgvideography.com</a>.
          If you're unhappy with how we've handled your information you can complain to the ICO at{" "}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
}
