import type { Attribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

export const CAL_EMBED_SRC = "https://app.cal.com/embed/embed.js";
export const CAL_ORIGIN = "https://app.cal.com";
const NAMESPACE = "revex-discovery";
const LOAD_TIMEOUT_MS = 15000;

export type CalConfig = Record<string, string>;

type CalEventHandler = (event: { detail?: { type?: string; data?: unknown } }) => void;

export type CalApi = {
  (action: "inline", options: { elementOrSelector: HTMLElement | string; calLink: string; config?: CalConfig }): void;
  (action: "modal", options: { calLink: string; config?: CalConfig }): void;
  (action: "preload", options: { calLink: string }): void;
  (action: "ui", options: Record<string, unknown>): void;
  (action: "on" | "off", options: { action: string; callback: CalEventHandler }): void;
};

type CalGlobal = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

export type CalBooking = {
  /** Full booking page URL, used for direct links and no-JS fallbacks. */
  url: string;
  /** `username/event-slug` as expected by the embed. */
  calLink: string;
  /** Query parameters from the booking URL (e.g. `overlayCalendar`), forwarded to the embed. */
  config: CalConfig;
};

export function parseCalBooking(bookingUrl: string): CalBooking {
  const url = new URL(bookingUrl);
  const calLink = url.pathname.replace(/^\/+|\/+$/g, "");
  return { url: url.toString(), calLink, config: Object.fromEntries(url.searchParams) };
}

/**
 * Cal.com's official embed bootstrap: defines the `Cal` command queue and
 * injects embed.js on first use.
 */
function installCalStub() {
  if (window.Cal) return;
  const queue = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
  const cal = function (...args: unknown[]) {
    const self = window.Cal as CalGlobal;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = CAL_EMBED_SRC;
      script.async = true;
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      const api = function (...apiArgs: unknown[]) {
        queue(api as unknown as { q: unknown[] }, apiArgs);
      } as unknown as CalApi & { q: unknown[] };
      api.q = api.q || [];
      if (typeof namespace === "string") {
        self.ns![namespace] = self.ns![namespace] || api;
        queue(self.ns![namespace] as unknown as { q: unknown[] }, args);
        queue(self as { q: unknown[] }, ["initNamespace", namespace]);
      } else {
        queue(self as { q: unknown[] }, args);
      }
      return;
    }
    queue(self as { q: unknown[] }, args);
  } as CalGlobal;
  window.Cal = cal;
}

function findScript() {
  return document.querySelector<HTMLScriptElement>(`script[src="${CAL_EMBED_SRC}"]`);
}

let apiPromise: Promise<CalApi> | null = null;
let analyticsAttached = false;

function attachAnalytics(api: CalApi) {
  if (analyticsAttached) return;
  analyticsAttached = true;
  const events: Record<string, string> = {
    linkReady: "cal_booker_viewed",
    bookingSuccessfulV2: "cal_booking_successful",
    linkFailed: "cal_booker_failed",
  };
  for (const [action, name] of Object.entries(events)) {
    api("on", { action, callback: () => trackEvent(name, { page_path: window.location.pathname }) });
  }
}

/**
 * Loads Cal.com's embed script once per page lifetime and returns the
 * RevEx namespace API. Concurrent callers share the same promise; a failed
 * load is reset so it can be retried.
 */
export function loadCal(): Promise<CalApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cal.com can only load in the browser"));
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<CalApi>((resolve, reject) => {
    const alreadyLoaded = findScript()?.dataset.loaded === "true";
    installCalStub();
    const cal = window.Cal as CalGlobal;
    if (!cal.ns?.[NAMESPACE]) cal("init", NAMESPACE, { origin: CAL_ORIGIN });
    const api = cal.ns![NAMESPACE];

    const ready = () => {
      api("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: { "cal-brand": "#3867ff" }, dark: { "cal-brand": "#3867ff" } },
      });
      attachAnalytics(api);
      resolve(api);
    };
    if (alreadyLoaded) return ready();

    const script = findScript();
    if (!script) {
      apiPromise = null;
      reject(new Error("Cal.com embed script was not injected"));
      return;
    }

    const timeout = window.setTimeout(() => fail(new Error("Cal.com script timed out")), LOAD_TIMEOUT_MS);
    function cleanup() {
      window.clearTimeout(timeout);
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    }
    function fail(error: Error) {
      cleanup();
      script?.remove();
      delete window.Cal;
      apiPromise = null;
      reject(error);
    }
    function onLoad() {
      cleanup();
      script!.dataset.loaded = "true";
      ready();
    }
    function onError() {
      fail(new Error("Cal.com script failed to load"));
    }
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
  });

  return apiPromise;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Booking config with attribution merged in; values already in the booking URL win. */
export function withAttribution(config: CalConfig, attribution: Attribution | null): CalConfig {
  const merged: CalConfig = { ...config };
  for (const key of UTM_KEYS) {
    const value = attribution?.[key];
    if (value && !merged[key]) merged[key] = value;
  }
  return merged;
}

/** Builds a direct (non-embedded) booking link carrying the same attribution. */
export function buildCalLink(bookingUrl: string, attribution: Attribution | null): string {
  try {
    const url = new URL(bookingUrl);
    for (const key of UTM_KEYS) {
      const value = attribution?.[key];
      if (value && !url.searchParams.get(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return bookingUrl;
  }
}
