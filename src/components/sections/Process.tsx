import { Info } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { closureNote, processSteps } from "@/config/content";

export function Process({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="dark relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32" aria-labelledby="process-heading">
      <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div aria-hidden="true" className="glow-electric absolute -right-40 bottom-0 -z-10 size-[36rem] opacity-40" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="process-heading"
          as={headingAs}
          tone="dark"
          eyebrow="Our approach"
          title="From First Contact to Paying Customer."
          description="A structured, six-step engagement that turns your target market into qualified conversations and discovery calls."
        />
        <div className="mt-14">
          <ProcessTimeline steps={processSteps} />
        </div>
        <div className="mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-steel">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
          <p>{closureNote}</p>
        </div>
      </div>
    </section>
  );
}
