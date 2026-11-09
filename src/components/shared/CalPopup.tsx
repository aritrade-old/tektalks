"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { captureAttribution } from "@/lib/attribution";
import { loadCal, parseCalBooking, withAttribution } from "@/lib/cal";
import { trackEvent } from "@/lib/analytics";

type CalPopupProps = {
  children: React.ReactNode;
  className?: string;
  url?: string;
  location?: string;
  "aria-label"?: string;
  tabIndex?: number;
};

/**
 * Opens Cal.com's official modal booker. Renders as a link to the booking page
 * so it still works without JavaScript or if the Cal.com script is blocked.
 */
export function CalPopup({
  children,
  className,
  url = siteConfig.bookingUrl,
  location = "popup",
  ...rest
}: CalPopupProps) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function preload() {
    loadCal()
      .then((cal) => cal("preload", { calLink: parseCalBooking(url).calLink }))
      .catch(() => undefined);
  }

  async function open(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setOpening(true);
    trackEvent("booking_cta_click", { location });
    try {
      const cal = await loadCal();
      const booking = parseCalBooking(url);
      cal("modal", {
        calLink: booking.calLink,
        config: { layout: "month_view", theme: "light", ...withAttribution(booking.config, captureAttribution()) },
      });
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
