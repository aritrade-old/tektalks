"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";

/**
 * Captures UTM / referrer attribution on every navigation. Booking lifecycle
 * events are tracked from the Cal.com embed API in `src/lib/cal.ts`.
 */
export function SiteTracking() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
