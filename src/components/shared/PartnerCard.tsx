import { Check, Info } from "lucide-react";

import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { DevCreatesVisual } from "@/components/visuals/DevCreatesVisual";
import { SentinelVisual } from "@/components/visuals/SentinelVisual";
import type { Partner, PartnerVisual } from "@/config/partners";
import { cn } from "@/lib/utils";

const visuals: Record<PartnerVisual, React.ComponentType> = {
  sentinel: SentinelVisual,
  devcreates: DevCreatesVisual,
};

type PartnerCardProps = {
  partner: Partner;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
};

export function PartnerCard({ partner, reverse = false, headingLevel = "h3" }: PartnerCardProps) {
  const Visual = visuals[partner.visual];
  const Heading = headingLevel;

  return (
    <Reveal
      as="article"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 sm:p-10"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={cn("order-2 lg:sticky lg:top-28", reverse ? "lg:order-2" : "lg:order-1")}>
          <Visual />
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-electric/20 bg-electric/[0.06] p-4 text-sm leading-relaxed text-white/80">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
            <p>{partner.ownershipNote}</p>
          </div>
        </div>

        <div className={cn("order-1", reverse ? "lg:order-1" : "lg:order-2")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-electric-300">{partner.index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/15" />
            <span className="text-sm font-semibold tracking-wide text-white">{partner.name}</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${partner.name} categories`}>
            {partner.category.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-steel"
              >
                {item}
              </li>
            ))}
          </ul>
          <Heading className="mt-6 text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-white sm:text-3xl">
            {partner.headline}
          </Heading>
          <p className="mt-4 leading-relaxed text-steel">{partner.description}</p>

          <p className="eyebrow mt-8 text-white/60">RevEx business development responsibilities</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {partner.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-white/85">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <CtaLink href={partner.url} external icon="external" variant="outlineDark">
              {partner.ctaLabel}
            </CtaLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
