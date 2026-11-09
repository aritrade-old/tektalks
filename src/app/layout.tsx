import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@/components/analytics/Analytics";
import { SiteTracking } from "@/components/analytics/SiteTracking";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingBookingButton } from "@/components/shared/FloatingBookingButton";
import { JsonLd } from "@/components/shared/JsonLd";
import { founder } from "@/config/founder";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | B2B Lead Generation & Business Development Consultancy India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: founder.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Business",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/opengraph-image`,
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Worldwide" },
  ],
  founder: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.designation,
    ...(founder.linkedinUrl ? { sameAs: [founder.linkedinUrl] } : {}),
  },
  knowsAbout: services.map((service) => service.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business development services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.summary },
    })),
  },
  ...(siteConfig.linkedinUrl ? { sameAs: [siteConfig.linkedinUrl] } : {}),
  ...(siteConfig.businessEmail ? { email: siteConfig.businessEmail } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://app.cal.com" />
        <link rel="dns-prefetch" href="https://cal.com" />
      </head>
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingBookingButton />
        <SiteTracking />
        <Analytics gaId={siteConfig.gaId} />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </body>
    </html>
  );
}
