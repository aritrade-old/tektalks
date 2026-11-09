"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";

import { isActivePath } from "@/components/layout/Navbar";
import { LogoMark } from "@/components/layout/Logo";
import { ctaVariants } from "@/components/shared/CtaLink";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { bookingCta, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="dark w-full max-w-sm! border-l border-white/10 bg-navy p-0 text-white"
      >
        <div className="flex h-18 items-center gap-2.5 border-b border-white/10 px-6">
          <LogoMark className="size-7" />
          <SheetTitle className="text-sm font-bold tracking-[0.16em] text-white">
            {siteConfig.logoText}
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {[...mainNav, { label: "Contact", href: "/contact" }].map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none",
                      active ? "bg-white/8 text-white" : "text-steel hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      aria-hidden="true"
                      className={cn("size-4", active ? "text-electric-300" : "text-white/30")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-white/10 p-6">
          <p className="mb-4 text-sm text-steel">
            Ready to talk? Book a {siteConfig.discoveryCallLength} discovery call.
          </p>
          <Link href={bookingCta.href} onClick={close} className={cn(ctaVariants({ size: "lg" }), "w-full")}>
            {bookingCta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
