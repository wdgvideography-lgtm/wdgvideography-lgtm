/** Footer — editorial redesign (dark block that closes every page). */

const quickLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Services & prices", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
  { label: "App Development", href: "/app-development" },
  { label: "Video Production", href: "/video-production" },
  { label: "Product Photography", href: "/product-photography" },
  { label: "Product Videography", href: "/product-videography" },
  { label: "Website Design", href: "/website-design" },
  { label: "Social Media Marketing", href: "/social-media-marketing" },
];

const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@wdg.videography",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.07a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.5z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/wdgvideography",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wdg.videography",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: "oklch(0.17 0.01 60)" }}>
      <div className="px-5 sm:px-8 lg:px-14 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/assets/wdg-logo.png" alt="WDG Videography" width={160} height={90} className="h-10 w-auto mb-6" />
            <p className="text-white/70 max-w-sm">
              Cinematic films, social reels, websites and apps for businesses in Cheltenham, Gloucestershire and beyond. Shot, edited and graded in-house.
            </p>
            <div className="flex gap-3 mt-7">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-11 h-11 grid place-items-center rounded-full border border-white/15 hover:bg-gold hover:text-ink hover:border-gold transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="eyebrow !text-white/50 mb-5">Pages</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="text-white/85 hover:text-gold transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow !text-white/50 mb-5">Get in touch</h3>
            <ul className="space-y-2.5 text-white/85">
              <li><a href="mailto:will@wdgvideography.com" className="hover:text-gold transition-colors">will@wdgvideography.com</a></li>
              <li><a href="tel:+447584065559" className="hover:text-gold transition-colors">+44 7584 065559</a></li>
              <li>Cheltenham, Gloucestershire</li>
            </ul>
            <a href="/contact" className="pill gold mt-7">Start a project</a>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 mono-tag text-white/45">
          <span>© 2026 WDG VIDEOGRAPHY. ALL RIGHTS RESERVED.</span>
          <span>FILM · SOCIAL · WEB · APPS</span>
        </div>
      </div>
    </footer>
  );
}
