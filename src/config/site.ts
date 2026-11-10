const DEFAULT_BOOKING_URL = "https://cal.com/revex-consultancy-0hcrw5/20min?overlayCalendar=true";
const DEFAULT_BUSINESS_EMAIL = "revexconsultancy@gmail.com";

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function withoutTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

function resolveSiteUrl() {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return withoutTrailingSlash(explicit);
  const vercelProduction =
    clean(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
    clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    clean(process.env.VERCEL_URL);
  if (vercelProduction) return `https://${withoutTrailingSlash(vercelProduction)}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "RevEx Consultancy",
  shortName: "RevEx",
  logoText: "REVEX",
  logoSubtext: "CONSULTANCY",
  tagline: "We Build Conversations. You Build Customers.",
  positioning: "Your Outsourced Business Development Partner.",
  description:
    "RevEx Consultancy is an independent B2B business development consultancy in India helping startups, SaaS and technology companies acquire customers through lead generation, outbound sales, prospect qualification and discovery-call generation.",
  url: resolveSiteUrl(),
  bookingUrl: clean(process.env.NEXT_PUBLIC_CAL_BOOKING_URL) ?? DEFAULT_BOOKING_URL,
  linkedinUrl: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  businessEmail: clean(process.env.NEXT_PUBLIC_BUSINESS_EMAIL) ?? DEFAULT_BUSINESS_EMAIL,
  gaId: clean(process.env.NEXT_PUBLIC_GA_ID),
  location: "India",
  serviceGeography: "India and international markets",
  discoveryCallLength: "20-minute",
  copyrightYear: 2026,
  keywords: [
    "B2B lead generation consultancy India",
    "business development consultant India",
    "outsourced business development services",
    "B2B appointment setting services",
    "cold calling services for startups",
    "SaaS lead generation",
    "customer acquisition consultancy",
    "go-to-market consulting",
    "B2B sales development",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
