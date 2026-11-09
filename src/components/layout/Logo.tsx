import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="#3867FF" />
      <path d="M9 23V9h7.2a4.6 4.6 0 0 1 1.3 9L23 23h-3.9l-4.9-4.6H12.4V23H9Zm3.4-7.4h3.7a1.9 1.9 0 0 0 0-3.8h-3.7v3.8Z" fill="#fff" />
      <path d="M21 9h3l-2.2 3.4-1.5-2.3L21 9Z" fill="#8AA6FF" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-bold tracking-[0.16em] text-white">
          {siteConfig.logoText}
        </span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.32em] text-steel">
          {siteConfig.logoSubtext}
        </span>
      </span>
    </Link>
  );
}
