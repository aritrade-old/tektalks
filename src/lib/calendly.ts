import type { Attribution } from "@/lib/attribution";

export const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
export const CALENDLY_STYLESHEET_HREF = "https://assets.calendly.com/assets/external/widget.css";
const SCRIPT_ID = "calendly-widget-script";
const STYLESHEET_ID = "calendly-widget-stylesheet";
const LOAD_TIMEOUT_MS = 15000;

export type CalendlyUtm = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

type InlineWidgetOptions = {
  url: string;
  parentElement: HTMLElement;
  utm?: CalendlyUtm;
  resize?: boolean;
};

type PopupWidgetOptions = {
  url: string;
  utm?: CalendlyUtm;
};

export type CalendlyGlobal = {
  initInlineWidget: (options: InlineWidgetOptions) => void;
  initPopupWidget: (options: PopupWidgetOptions) => void;
  closePopupWidget?: () => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

let scriptPromise: Promise<CalendlyGlobal> | null = null;

function hasCalendly(): boolean {
  return typeof window.Calendly?.initInlineWidget === "function";
}

export function ensureCalendlyStylesheet() {
  if (document.getElementById(STYLESHEET_ID)) return;
  const link = document.createElement("link");
  link.id = STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = CALENDLY_STYLESHEET_HREF;
  document.head.appendChild(link);
}

/**
 * Loads Calendly's official widget script once per page lifetime. Concurrent
 * callers share the same promise; a failed load is reset so it can be retried.
 */
export function loadCalendly(): Promise<CalendlyGlobal> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Calendly can only load in the browser"));
  }
  if (hasCalendly()) return Promise.resolve(window.Calendly as CalendlyGlobal);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<CalendlyGlobal>((resolve, reject) => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (script?.dataset.failed === "true") {
      script.remove();
      script = null;
    }

    const timeout = window.setTimeout(() => fail(new Error("Calendly script timed out")), LOAD_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeout);
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    }
    function fail(error: Error) {
      cleanup();
      if (script) script.dataset.failed = "true";
      scriptPromise = null;
      reject(error);
    }
    function onLoad() {
      cleanup();
      if (hasCalendly()) resolve(window.Calendly as CalendlyGlobal);
      else fail(new Error("Calendly script loaded without exposing its API"));
    }
    function onError() {
      fail(new Error("Calendly script failed to load"));
    }

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
  });

  return scriptPromise;
}

export function toCalendlyUtm(attribution: Attribution | null): CalendlyUtm | undefined {
  if (!attribution) return undefined;
  const utm: CalendlyUtm = {
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    utmContent: attribution.utm_content,
    utmTerm: attribution.utm_term,
  };
  const filtered = Object.fromEntries(Object.entries(utm).filter(([, value]) => Boolean(value)));
  return Object.keys(filtered).length > 0 ? (filtered as CalendlyUtm) : undefined;
}

/** Builds a direct (non-embedded) Calendly link carrying the same attribution. */
export function buildCalendlyLink(baseUrl: string, attribution: Attribution | null): string {
  if (!attribution) return baseUrl;
  try {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(attribution)) {
      if (value && !url.searchParams.get(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export const CALENDLY_EVENTS = [
  "calendly.profile_page_viewed",
  "calendly.event_type_viewed",
  "calendly.date_and_time_selected",
  "calendly.event_scheduled",
] as const;

export type CalendlyEventName = (typeof CALENDLY_EVENTS)[number];

export function isCalendlyMessage(event: MessageEvent): event is MessageEvent<{ event: string }> {
  const fromCalendly =
    event.origin === "https://calendly.com" || event.origin.endsWith(".calendly.com");
  return (
    fromCalendly &&
    typeof event.data === "object" &&
    event.data !== null &&
    typeof (event.data as { event?: unknown }).event === "string" &&
    (event.data as { event: string }).event.startsWith("calendly.")
  );
}
