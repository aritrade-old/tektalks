"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

import { bookingCta } from "@/config/navigation";
import { CalPopup } from "@/components/shared/CalPopup";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 560;

export function FloatingBookingButton() {
  const pathname = usePathname();
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.getElementById("site-footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
          rootMargin: "0px 0px -40px 0px",
        })
      : null;
    if (footer && observer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  if (pathname === bookingCta.href) return null;

  const visible = scrolledEnough && !footerVisible;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-all duration-300 sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <CalPopup
        location="floating_button"
        className="group flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-navy/95 py-2 pr-5 pl-2 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgb(11_16_32/0.7)] backdrop-blur transition hover:border-electric/50 hover:bg-navy focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none"
        aria-label="Book a 20-minute discovery call"
        tabIndex={visible ? undefined : -1}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-electric transition group-hover:bg-electric-400">
          <CalendarClock aria-hidden="true" className="size-4" />
        </span>
        <span>Book a 20-Min Call</span>
      </CalPopup>
    </div>
  );
}
