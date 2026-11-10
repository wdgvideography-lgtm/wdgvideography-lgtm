// Post-build: write route-specific static HTML so crawlers, AI assistants and link previews
// get the right <title>, description, canonical and OG tags — and the page's actual words —
// without running JavaScript. The words written into #root are the same content the page shows;
// React replaces them as soon as the app starts, so visitors never see two versions.
// Run with tsx (see package.json) so the shared service data can be imported directly.
import fs from "node:fs";
import path from "node:path";
import { servicePages } from "../client/src/data/servicePages.ts";

const out = path.resolve("dist/public");
const base = fs.readFileSync(path.join(out, "index.html"), "utf8");
const SITE = "https://www.wdgvideography.com";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const CONTACT = `<section><h2>Contact WDG Videography</h2><p>Based in Cheltenham, Gloucestershire, working with businesses across England. Run by Will Davey.</p>
<ul><li>Phone: <a href="tel:+447584065559">+44 7584 065559</a></li><li>Email: <a href="mailto:will@wdgvideography.com">will@wdgvideography.com</a></li><li><a href="${SITE}/contact">Book a free consultation</a></li></ul></section>`;

const from = (v) => (/^£/.test(v) ? ` — from ${esc(v)}` : "");
const NAV = `<nav aria-label="Services"><ul>${servicePages.map((p) => `<li><a href="${SITE}/${p.slug}">${esc(p.eyebrow)}${from(p.priceFrom)}</a></li>`).join("")}<li><a href="${SITE}/app-development">Custom app development — from £1,500</a></li><li><a href="${SITE}/portfolio">Portfolio</a></li></ul></nav>`;

const RELATED = `<section><h2>Also from WDG</h2><ul>
<li><a href="https://wdg-agriculture.co.uk">WDG Agriculture</a> — drone surveys for farms, construction and inspection in Gloucestershire</li>
<li><a href="https://www.miseteam.com">Mise Team</a> — restaurant management software built by WDG</li>
<li><a href="https://wdg-farm-dash.com">WDG Farm Dash</a> — farm management app from WDG Agriculture</li></ul></section>`;

const SUMMARY = `<h1>WDG Videography — cinematic video, photography, websites and apps in Cheltenham</h1>
<p>WDG Videography makes brand films, product photography and product videos, builds websites and custom business apps, and runs social media and marketing for businesses in Cheltenham, Gloucestershire and across England.</p>${NAV}`;

const wrap = (inner) => `<div id="root"><main>${inner}${CONTACT}${RELATED}</main></div>`;

function servicePage(p) {
  const pk = p.packages.map((k) => `<li><strong>${esc(k.name)} — ${esc(k.price)}</strong><ul>${k.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></li>`).join("");
  const bn = p.benefits.map((b) => `<li><strong>${esc(b.title)}</strong>: ${esc(b.text)}</li>`).join("");
  const fq = p.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("");
  return wrap(`<h1>${esc(p.h1)}</h1><p>${esc(p.intro)}</p><h2>Packages${from(p.priceFrom).replace(' — ', ' (').replace(/$/, from(p.priceFrom) ? ')' : '')}</h2><ul>${pk}</ul><h2>Why WDG</h2><ul>${bn}</ul><h2>Questions</h2>${fq}${NAV}`);
}

const faqLd = (p) => `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}).replace(/</g, "\\u003c")}</script>`;

const routes = {
  portfolio: {
    title: "Video Portfolio — Brand Films, Reels & Event Videos | WDG Videography",
    desc: "Browse WDG Videography's portfolio of cinematic brand films, social media reels, product videos and event coverage, filmed across Cheltenham, Gloucestershire and England.",
    body: wrap(`<h1>WDG Videography portfolio</h1><p>Brand films, social media reels, product videos and event coverage filmed across Cheltenham, Gloucestershire and England.</p>${NAV}`),
  },
  "app-development": {
    title: "App Development & Custom Software | AI Business Apps | WDG Videography",
    desc: "WDG designs and builds custom business apps and AI software: farm management, restaurant operations, instant ops authorisation, marketing automation and client portals. Real apps, live and in use, built in Cheltenham.",
    body: wrap(`<h1>Custom app development</h1><p>WDG designs and builds custom business apps and AI software — farm management, restaurant operations, booking tools, client portals and automation — from £1,500. Apps WDG has built and runs include <a href="https://www.miseteam.com">Mise Team</a> for restaurants and <a href="https://wdg-farm-dash.com">WDG Farm Dash</a> for farms.</p>${NAV}`),
  },
  contact: {
    title: "Contact Us — Book a Consultation | WDG Videography",
    desc: "Get in touch with WDG Videography for cinematic video production, brand videos, social media content, website design, and digital marketing services in Cheltenham, Gloucestershire. Free consultation available.",
    body: wrap(`<h1>Contact WDG Videography</h1>${NAV}`),
  },
};
for (const p of servicePages) {
  routes[p.slug] = { title: `${p.seoTitle} | WDG Videography`, desc: p.seoDescription, body: servicePage(p), ld: faqLd(p) };
}

const fill = (h, body, ld = "") => h.replace(/<div id="root"><\/div>/, body).replace("</head>", `${ld}</head>`);

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
  h = fill(h, m.body, m.ld);
  fs.mkdirSync(path.join(out, slug), { recursive: true });
  fs.writeFileSync(path.join(out, slug, "index.html"), h);
  console.log("prerendered:", slug);
}

// Home page last, so the routes above were built from the empty shell.
fs.writeFileSync(path.join(out, "index.html"), fill(base, wrap(SUMMARY)));
console.log("prerendered: /");
