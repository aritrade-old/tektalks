"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CtaLink } from "@/components/shared/CtaLink";
import { bookingCta, mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-navy/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-electric px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none",
                    active ? "text-white" : "text-steel hover:text-white",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <CtaLink href={bookingCta.href} size="sm" className="hidden sm:inline-flex">
            {bookingCta.label}
          </CtaLink>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
