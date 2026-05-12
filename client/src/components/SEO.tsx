/**
 * SEO Component — Per-page meta tag management
 * Uses react-helmet-async to inject page-specific meta tags
 * All SEO data is rendered client-side into the DOM and persists independently of any platform
 */

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_NAME = "WDG Videography";
const BASE_URL = "https://www.wdgvideography.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/manus-storage/og-image-1200_2a58737c.png`;
const DEFAULT_DESCRIPTION =
  "WDG Videography offers high-end cinematic video production, brand videos, social media content, website design, and full-scale digital marketing. Based in Cheltenham, Gloucestershire.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Cinematic Video Production & Marketing in Cheltenham`;

  const canonical = canonicalUrl || BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
