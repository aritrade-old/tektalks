"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { CONSENT_EVENT, CONSENT_STORAGE_KEY, readConsent, writeConsent, type ConsentState } from "@/lib/analytics";

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) callback();
  };
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function useConsent(): ConsentState | "unknown" {
  return useSyncExternalStore<ConsentState | "unknown">(subscribe, readConsent, () => "unknown");
}

/**
 * Google Analytics 4, loaded only when NEXT_PUBLIC_GA_ID is set and the
 * visitor accepts analytics cookies. Without a GA ID nothing is rendered,
 * no consent banner is shown and no tracking happens.
 */
export function Analytics({ gaId }: { gaId?: string }) {
  const consent = useConsent();
  const pathname = usePathname();
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || consent !== "granted" || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.origin + pathname,
      page_title: document.title,
    });
  }, [pathname, scriptReady, consent]);

  if (!gaId) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{send_page_view:false,anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent === null ? <ConsentBanner /> : null}
    </>
  );
}

function ConsentBanner() {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/10 bg-navy/95 p-5 text-sm text-steel shadow-2xl backdrop-blur sm:bottom-6"
    >
      <p className="leading-relaxed">
        We use optional analytics cookies to understand how visitors use this site and improve it. No
        booking or enquiry details are shared with analytics. See our{" "}
        <Link href="/privacy" className="text-electric-300 underline underline-offset-2 hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="h-10 rounded-full bg-electric px-5 font-medium text-white transition hover:bg-electric-400 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className="h-10 rounded-full border border-white/15 px-5 font-medium text-white transition hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
