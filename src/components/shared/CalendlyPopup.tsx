"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { captureAttribution } from "@/lib/attribution";
import { ensureCalendlyStylesheet, loadCalendly, toCalendlyUtm } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";

type CalendlyPopupProps = {
  children: React.ReactNode;
  className?: string;
  url?: string;
  location?: string;
  "aria-label"?: string;
  tabIndex?: number;
};

/**
 * Opens Calendly's official popup widget. Renders as a link to the booking page
 * so it still works without JavaScript or if the Calendly script is blocked.
 */
export function CalendlyPopup({
  children,
  className,
  url = siteConfig.calendlyUrl,
  location = "popup",
  ...rest
}: CalendlyPopupProps) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function preload() {
    ensureCalendlyStylesheet();
    loadCalendly().catch(() => undefined);
  }

  async function open(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setOpening(true);
    trackEvent("booking_cta_click", { location });
    try {
      ensureCalendlyStylesheet();
      const calendly = await loadCalendly();
      calendly.initPopupWidget({ url, utm: toCalendlyUtm(captureAttribution()) });
    } catch {
      router.push(bookingCta.href);
    } finally {
      setOpening(false);
    }
  }

  return (
    <a
      href={bookingCta.href}
      onClick={open}
      onPointerEnter={preload}
      onFocus={preload}
      aria-busy={opening}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
