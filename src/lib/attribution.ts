export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type Attribution = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "revex_attribution";
const MAX_VALUE_LENGTH = 120;

function sanitise(value: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_VALUE_LENGTH);
}

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: Attribution = {};
    for (const key of UTM_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value) result[key] = value;
    }
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

function writeStored(attribution: Attribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage can be unavailable (private mode, blocked storage); attribution is best-effort.
  }
}

function fromUrl(search: string): Attribution {
  const params = new URLSearchParams(search);
  const result: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = sanitise(params.get(key));
    if (value) result[key] = value;
  }
  // `?ref=partner-name` is a shorthand for referral partners sharing a link.
  const ref = sanitise(params.get("ref"));
  if (ref && !result.utm_source) {
    result.utm_source = ref;
    result.utm_medium ??= "referral";
  }
  return result;
}

function fromReferrer(referrer: string, currentHost: string): Attribution | null {
  if (!referrer) return null;
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (!host || host === currentHost.replace(/^www\./, "")) return null;

  if (/(^|\.)google\./.test(host)) return { utm_source: "google", utm_medium: "organic" };
  if (/(^|\.)bing\.com$/.test(host)) return { utm_source: "bing", utm_medium: "organic" };
  if (/(^|\.)duckduckgo\.com$/.test(host)) return { utm_source: "duckduckgo", utm_medium: "organic" };
  if (/(^|\.)linkedin\.com$/.test(host) || host === "lnkd.in") {
    return { utm_source: "linkedin", utm_medium: "social" };
  }
  return { utm_source: host, utm_medium: "referral" };
}

/**
 * Captures attribution for the current session. Explicit UTM parameters in the
 * URL take priority and are merged key-by-key so that a valid stored value is
 * never replaced by an empty one. Referrer-derived values are only used when
 * nothing has been recorded yet. Direct visits without a referrer record nothing.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  const stored = readStored();
  const explicit = fromUrl(window.location.search);

  if (Object.keys(explicit).length > 0) {
    const merged = { ...(stored ?? {}), ...explicit };
    writeStored(merged);
    return merged;
  }
  if (stored) return stored;

  const referred = fromReferrer(document.referrer, window.location.hostname);
  if (referred) {
    writeStored(referred);
    return referred;
  }
  return null;
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  return readStored();
}
