import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const CONTENT_UPDATED = new Date("2026-11-09T00:00:00.000Z");

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/book-a-call", priority: 0.9, changeFrequency: "monthly" },
  { path: "/partnerships", priority: 0.8, changeFrequency: "monthly" },
  { path: "/approach", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
