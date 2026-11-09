"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";
import { CALENDLY_EVENTS, isCalendlyMessage, type CalendlyEventName } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";

const trackedCalendlyEvents = new Set<string>(CALENDLY_EVENTS);

/**
 * Captures UTM / referrer attribution on every navigation and forwards
 * Calendly lifecycle events to analytics. Only the event name and page path
 * are recorded — Calendly payloads (invitee and event URIs) are discarded.
 */
export function SiteTracking() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!isCalendlyMessage(event)) return;
      const name = event.data.event as CalendlyEventName;
      if (!trackedCalendlyEvents.has(name)) return;
      trackEvent(name.replace(".", "_"), { page_path: window.location.pathname });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
