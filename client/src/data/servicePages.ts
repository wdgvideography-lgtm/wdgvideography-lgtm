export interface ServicePageData {
  slug: string;
  serviceId: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  intro: string;
  image: string;
  imageAlt: string;
  priceFrom: string;
  packages: { name: string; price: string; features: string[] }[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const servicePages: ServicePageData[] = [
  {
    slug: "video-production",
    serviceId: "business-growth",
    eyebrow: "Video Production",
    h1: "Video Production in Cheltenham & Gloucestershire",
    seoTitle: "Video Production Cheltenham — Brand Films & Business Videos",
    seoDescription:
      "Cinematic brand films, promotional videos and social reels for businesses in Cheltenham, Gloucester and across Gloucestershire. Packages from £450 with reels included.",
    keywords:
      "video production Cheltenham, videographer Gloucestershire, brand film, corporate video Gloucester, promotional video, business video production",
    intro:
      "We plan, film and edit cinematic videos that show what your business does and why people should choose you. Every package includes short-form reels cut for Instagram, TikTok and Facebook, so one shoot gives you weeks of content.",
    image: "/assets/hero-bg.webp",
    imageAlt: "WDG Videography cinema camera filming a brand video",
    priceFrom: "£450",
    packages: [
      { name: "Basic Service", price: "£450", features: ["2 hour single location shoot", "10 miles of free travel", "1× 60 second video with 1 revision", "4× 15 second reels"] },
      { name: "Business Growth", price: "£650", features: ["4 hour shoot in up to 2 locations", "1× 2 min brand video", "Up to 2 revisions on brand video", "5× 15-30 second reels", "Up to 1 revision per reel"] },
      { name: "Bespoke Project", price: "£1,200", features: ["8 hour shoot in up to 3 locations", "Pre-production storyboarding meeting", "1× 3-5 min cinematic video", "Up to 4 revisions on main video", "8× 15-30 sec reels with 1 revision each"] },
    ],
    benefits: [
      { title: "Cinematic quality", text: "Cinema cameras, lighting and professional colour grading in DaVinci Resolve." },
      { title: "Built for social", text: "Vertical reels cut from every shoot, ready to post." },
      { title: "Aerial footage", text: "Drone shots of your site, land or venue, flown by us as part of the shoot rather than hired in." },
    ],
    faqs: [
      { q: "How much does a business video cost?", a: "Our video packages start at £450 for a 2 hour shoot with a 60 second video and four reels. Most businesses choose Business Growth at £650." },
      { q: "Which areas do you cover?", a: "We're based in Cheltenham and regularly film across Gloucestershire, Worcestershire, the Cotswolds and the rest of England." },
      { q: "How does the edit work?", a: "You get a first cut to review, then the revisions included in your package. We agree a delivery date with you before the shoot so it fits your launch or campaign." },
    ],
  },
  {
    slug: "product-photography",
    serviceId: "product-photography",
    eyebrow: "Product Photography",
    h1: "Product Photography for E-commerce & Brands",
    seoTitle: "Product Photography Cheltenham — From £25 per Image",
    seoDescription:
      "Studio-lit, professionally edited product photography for e-commerce, Amazon and social media. From £25 per image, with photo and video bundles. Based in Cheltenham, Gloucestershire.",
    keywords:
      "product photography Cheltenham, e-commerce product photos, Amazon product photography UK, packshot photography Gloucestershire, lifestyle product photography",
    intro:
      "Clean packshots and styled lifestyle images that make your products look their best on your website, Amazon, Etsy and social media. Every image is studio-lit and professionally retouched.",
    image: "/reference/perfume-dark.webp",
    imageAlt: "Reference image: dark perfume bottle lit from behind (Pexels)",
    priceFrom: "£25/image",
    packages: [
      { name: "Starter", price: "£100", features: ["5 edited product images", "White or styled background", "Web-optimised files"] },
      { name: "Standard", price: "£175", features: ["10 edited product images", "Mix of packshot and lifestyle", "Marketplace-ready sizes"] },
      { name: "Catalogue", price: "£300", features: ["20 edited product images", "Multiple angles per product", "Photo + video bundles available"] },
    ],
    benefits: [
      { title: "Marketplace ready", text: "Images sized and lit to meet Amazon, Etsy and Shopify requirements." },
      { title: "Consistent look", text: "Matching lighting and colour across your whole range." },
      { title: "Ready to list", text: "Edited, colour-matched and exported to the exact sizes your marketplace or site needs." },
    ],
    faqs: [
      { q: "How much is product photography?", a: "Prices start at £25 per image, with packs of 5 images from £100, 10 from £175 and 20 from £300." },
      { q: "Can I post my products to you?", a: "Yes. Get in touch and we'll arrange delivery and return of your products." },
      { q: "Do you offer product video too?", a: "Yes — we offer photography and video bundles, including 360° turntable shots." },
    ],
  },
  {
    slug: "product-videography",
    serviceId: "product-videography",
    eyebrow: "Product Videography",
    h1: "Product Videos That Sell",
    seoTitle: "Product Videography — Social Reels & Hero Videos from £50",
    seoDescription:
      "Product videos for e-commerce, ads and social media: quick-cut reels from £50, 60 second hero videos from £350 and 360° turntable shots. WDG Videography, Cheltenham.",
    keywords:
      "product videography UK, product video Cheltenham, e-commerce product video, social media product reels, 360 product video, product advert video",
    intro:
      "Short, scroll-stopping product videos for your website, paid ads and social channels. From quick reels to full hero videos with social cutdowns.",
    image: "/reference/earbuds.webp",
    imageAlt: "Reference image: wireless earbuds floating on black (Pexels)",
    priceFrom: "£50",
    packages: [
      { name: "Quick-cut Reel", price: "From £50", features: ["Short punchy edit", "Vertical format for social"] },
      { name: "Social Reel", price: "From £100", features: ["15 second social reel", "Music and on-screen text"] },
      { name: "Hero Video", price: "From £350", features: ["60 second hero video", "Ideal for websites and ads"] },
      { name: "Hero + Cutdowns", price: "From £500", features: ["60 second hero video", "Social cutdowns in all formats", "360° turntable option"] },
    ],
    benefits: [
      { title: "Made for ads", text: "Formats for Meta, TikTok, YouTube and Amazon listings." },
      { title: "Studio quality", text: "Controlled lighting and motion for a premium finish." },
      { title: "Bundle and save", text: "Combine with product photography in one session." },
    ],
    faqs: [
      { q: "What formats do I get?", a: "We deliver in vertical, square and landscape so videos fit every platform." },
      { q: "Can you film 360° product spins?", a: "Yes, a 360° turntable option is available on all product video packages." },
    ],
  },
  {
    slug: "website-design",
    serviceId: "website-design",
    eyebrow: "Website Design",
    h1: "Website Design in Cheltenham & Gloucestershire",
    seoTitle: "Website Design Cheltenham — Fast, SEO-Optimised Business Websites",
    seoDescription:
      "Custom, mobile-friendly, SEO-optimised websites for local businesses in Cheltenham and Gloucestershire, with professional photography and video built in. From £1,000.",
    keywords:
      "website design Cheltenham, web designer Gloucestershire, small business website, SEO website design, restaurant website design, local business web design",
    intro:
      "Fast, custom-designed websites that rank on Google and turn visitors into enquiries. Because we're filmmakers too, your site launches with professional photos and video rather than stock images.",
    image: "/assets/site-amc.jpg",
    imageAlt: "AMC Transport Solutions website designed by WDG Videography",
    priceFrom: "£1,000",
    packages: [
      { name: "Business Website", price: "From £1,000", features: ["Custom design for your brand", "Mobile-responsive & fast-loading", "SEO set-up and sitemap", "Contact forms"] },
      { name: "Growth Website", price: "From £3,000", features: ["Multiple service and location pages", "Photography and video included", "Google Business Profile set-up"] },
      { name: "Bespoke Platform", price: "Up to £7,000", features: ["Booking, ordering or client portals", "Integrations and automation", "Ongoing support available"] },
    ],
    benefits: [
      { title: "SEO from day one", text: "Structured data, fast load times and local keywords built in." },
      { title: "Real visuals", text: "We shoot your photos and video, so your site looks like your business." },
      { title: "Proven work", text: "Sites for The Longhorn Bar & Grill, AMC Transport Solutions and WDG Agriculture." },
    ],
    faqs: [
      { q: "How much does a website cost?", a: "Websites range from £1,000 to £7,000 depending on the number of pages, features and content needed." },
      { q: "Will my website show up on Google?", a: "Every site is built with technical SEO, structured data and a sitemap, and we can help set up Google Search Console and your Business Profile." },
      { q: "How long does a website take?", a: "It depends on the size of the site and how quickly content comes together. We agree a launch date with you at the start and build to it." },
    ],
  },
  {
    slug: "social-media-marketing",
    serviceId: "social-media",
    eyebrow: "Social Media & Marketing",
    h1: "Social Media Management & Content Creation",
    seoTitle: "Social Media Management Cheltenham — Content Creation & Marketing",
    seoDescription:
      "Social media management, content creation and brand strategy for Gloucestershire businesses. We film, edit, schedule and report so your channels grow while you run your business.",
    keywords:
      "social media management Cheltenham, content creation Gloucestershire, social media marketing agency, Instagram content creator, TikTok marketing UK, brand strategy",
    intro:
      "We plan, film, edit and post content for your social channels, then report on what's working. One partner for strategy, filming and management.",
    image: "/assets/marketing-bg.webp",
    imageAlt: "Social media content creation by WDG Videography",
    priceFrom: "Custom",
    packages: [
      { name: "Content Creation", price: "Quote", features: ["Monthly filming day", "Edited reels and photos", "Captions and hashtags"] },
      { name: "Full Management", price: "Quote", features: ["Content strategy and calendar", "Posting and community management", "Monthly analytics report"] },
      { name: "Brand Building", price: "Quote", features: ["Brand strategy and positioning", "Visual identity", "Launch campaigns"] },
    ],
    benefits: [
      { title: "Filmmaker quality", text: "Content that stands out from phone-shot posts." },
      { title: "Consistent posting", text: "A planned calendar so your channels never go quiet." },
      { title: "Clear reporting", text: "Monthly numbers on reach, engagement and enquiries." },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Instagram, Facebook, TikTok and LinkedIn." },
      { q: "Do I need to be on camera?", a: "No. We can build content around your products, team, premises and customers." },
    ],
  },
];
