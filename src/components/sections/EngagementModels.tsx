import { Check } from "lucide-react";

import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { engagementDisclaimer, engagementModels } from "@/config/content";
import { cn } from "@/lib/utils";

export function EngagementModels() {
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="models-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="models-heading"
          eyebrow="Engagement models"
          title="Business Development That Fits Your Business."
          description="Choose the structure that matches your stage, sales cycle and budget. Every engagement is scoped individually."
          align="center"
          className="mb-14"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {engagementModels.map((model, index) => (
            <Reveal
              as="article"
              key={model.title}
              delay={index * 0.06}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl border p-8 transition duration-300 hover:-translate-y-1",
                model.featured
                  ? "dark border-electric/50 bg-navy text-white shadow-[0_40px_80px_-40px_rgb(56_103_255/0.6)]"
                  : "border-border bg-mist/50 hover:border-electric/30 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgb(11_16_32/0.3)]",
              )}
            >
              {model.featured ? (
                <>
                  <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
                  <div aria-hidden="true" className="glow-electric absolute -top-24 -right-24 size-64 opacity-60" />
                </>
              ) : null}
              <div className="relative flex items-center justify-between">
                <span className={cn("eyebrow", model.featured ? "text-electric-300" : "text-electric")}>
                  {model.label}
                </span>
                {model.featured ? (
                  <span className="rounded-full border border-electric/40 bg-electric/15 px-3 py-1 text-[0.7rem] font-medium text-electric-300">
                    Dedicated support
                  </span>
                ) : null}
              </div>
              <h3 className={cn("relative mt-5 text-2xl font-semibold tracking-[-0.02em]", model.featured ? "text-white" : "text-navy")}>
                {model.title}
              </h3>
              <p className={cn("relative mt-3 leading-relaxed", model.featured ? "text-steel" : "text-slate-ink")}>
                {model.idealFor}
              </p>
              <p className={cn("relative mt-6 border-t pt-6 text-xs font-semibold tracking-wider uppercase", model.featured ? "border-white/10 text-white/60" : "border-border text-navy/60")}>
                Includes
              </p>
              <ul className="relative mt-4 flex-1 space-y-3">
                {model.includes.map((item) => (
                  <li key={item} className={cn("flex items-start gap-3 text-sm", model.featured ? "text-white/90" : "text-navy/85")}>
                    <span className={cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full", model.featured ? "bg-electric" : "bg-electric/10")}>
                      <Check aria-hidden="true" className={cn("size-3", model.featured ? "text-white" : "text-electric")} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <CtaLink
                href={`/contact?engagement=${model.engagement}`}
                variant={model.featured ? "primary" : "outlineLight"}
                className="relative mt-8 w-full"
              >
                {model.cta}
              </CtaLink>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-ink">
          {engagementDisclaimer}
        </p>
      </div>
    </section>
  );
}
