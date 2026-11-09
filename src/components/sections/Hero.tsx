import { CalendarClock, Globe, ShieldCheck } from "lucide-react";

import { CtaLink } from "@/components/shared/CtaLink";
import { PipelineVisual } from "@/components/visuals/PipelineVisual";
import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const audiences = ["Startups", "SaaS", "Cybersecurity", "Digital agencies", "IT services"];

export function Hero() {
  return (
    <section className="dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div aria-hidden="true" className="glow-electric absolute -top-48 -left-40 -z-10 size-[44rem] opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-32 pb-20 sm:px-8 sm:pt-40 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-44 lg:pb-28">
        <div>
          <p className="eyebrow text-electric-300">
            <span aria-hidden="true" className="h-px w-6 bg-electric-300/60" />
            {siteConfig.positioning}
          </p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.4rem]">
            We Build Conversations.{" "}
            <span className="text-gradient-electric">You Build Customers.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-steel">
            RevEx Consultancy helps startups, technology companies and growing businesses acquire
            customers through strategic B2B lead generation, outbound sales, prospect qualification and
            relationship-driven business development.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href={bookingCta.href} size="lg">
              Book a 20-Minute Discovery Call
            </CtaLink>
            <CtaLink href="/services" size="lg" variant="outlineDark" icon="none">
              Explore Our Services
            </CtaLink>
          </div>

          <ul className="mt-12 grid max-w-xl gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { icon: CalendarClock, term: "Discovery call", value: "20 minutes, booked online" },
              { icon: Globe, term: "Coverage", value: "India & international" },
              { icon: ShieldCheck, term: "Model", value: "Independent & partner-led" },
            ].map(({ icon: IconComponent, term, value }) => (
              <li key={term} className="flex items-start gap-3">
                <IconComponent aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
                <div>
                  <p className="text-xs font-medium tracking-wide text-white/50 uppercase">{term}</p>
                  <p className="mt-1 text-sm text-white/90">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <PipelineVisual />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-steel">Business development support for</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {audiences.map((item) => (
              <li key={item} className="text-sm font-medium tracking-wide text-white/80">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
