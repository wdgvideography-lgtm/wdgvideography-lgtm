// Post-build: write route-specific static HTML so crawlers and link previews
// get the correct <title>, description, canonical and OG tags without running JS.
import fs from "node:fs";
import path from "node:path";
const out = path.resolve("dist/public");
const base = fs.readFileSync(path.join(out, "index.html"), "utf8");
const SITE = "https://www.wdgvideography.com";
const routes = {
  portfolio: {
    title: "Video Portfolio — Brand Films, Reels & Event Videos | WDG Videography",
    desc: "Browse WDG Videography's portfolio of cinematic brand films, social media reels, product videos and event coverage, filmed across Cheltenham, Gloucestershire and England.",
  },
  "app-development": {
    title: "App Development & Custom Software | AI Business Apps | WDG Videography",
    desc: "WDG designs and builds custom business apps and AI software: farm management, restaurant operations, instant ops authorisation, marketing automation and client portals. Real apps, live and in use, built in Cheltenham.",
  },
  contact: {
    title: "Contact Us — Book a Consultation | WDG Videography",
    desc: "Get in touch with WDG Videography for cinematic video production, brand videos, social media content, website design, and digital marketing services in Cheltenham, Gloucestershire. Free consultation available.",
  },
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
for (const [slug, m] of Object.entries(routes)) {
  const url = `${SITE}/${slug}`;
  let h = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(m.desc)}`);
  fs.mkdirSync(path.join(out, slug), { recursive: true });
  fs.writeFileSync(path.join(out, slug, "index.html"), h);
  console.log("prerendered meta:", slug);
}
