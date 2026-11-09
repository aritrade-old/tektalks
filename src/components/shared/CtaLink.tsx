import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "group/cta inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-electric text-white shadow-[0_8px_24px_-8px_rgb(56_103_255/0.6)] hover:bg-electric-400 hover:shadow-[0_10px_30px_-8px_rgb(56_103_255/0.75)] focus-visible:ring-offset-navy",
        outlineDark:
          "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10 focus-visible:ring-offset-navy",
        outlineLight:
          "border border-navy/15 bg-white text-navy hover:border-electric/40 hover:text-electric focus-visible:ring-offset-white",
        ghostLight: "text-electric hover:text-navy px-0! focus-visible:ring-offset-white",
        ghostDark: "text-electric-300 hover:text-white px-0! focus-visible:ring-offset-navy",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaLinkProps = VariantProps<typeof ctaVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  icon?: "arrow" | "external" | "none";
  "aria-label"?: string;
};

export function CtaLink({
  href,
  children,
  className,
  variant,
  size,
  external = false,
  icon = "arrow",
  ...rest
}: CtaLinkProps) {
  const IconComponent = icon === "external" ? ArrowUpRight : icon === "arrow" ? ArrowRight : null;
  const content = (
    <>
      <span>{children}</span>
      {IconComponent ? (
        <IconComponent
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform duration-200",
            icon === "external"
              ? "group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              : "group-hover/cta:translate-x-0.5",
          )}
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(ctaVariants({ variant, size }), className)}
        {...rest}
      >
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn(ctaVariants({ variant, size }), className)} {...rest}>
      {content}
    </Link>
  );
}
