import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata({ title, description, path, keywords }: PageMetadataInput): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
