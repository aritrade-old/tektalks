export const CONSENT_STORAGE_KEY = "revex_analytics_consent";
export const CONSENT_EVENT = "revex:consent-change";

export type ConsentState = "granted" | "denied" | null;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Exclude<ConsentState, null>) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Without storage the choice only lasts for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Sends a privacy-safe analytics event. It is a no-op unless Google Analytics
 * is configured and the visitor has explicitly granted consent. Never pass
 * personal data (names, emails, invitee or event URIs) as parameters.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (readConsent() !== "granted" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
