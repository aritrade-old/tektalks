import { Check } from "lucide-react";

import { FinalCTA } from "@/components/sections/FinalCTA";
import { Process } from "@/components/sections/Process";
import { CtaLink } from "@/components/shared/CtaLink";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { bookingCta } from "@/config/navigation";
import { processSteps } from "@/config/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Approach — From First Contact to Paying Customer",
  description:
    "How RevEx runs B2B sales development: understand, identify, connect, qualify, engage and convert. A structured outbound process from prospect research to discovery calls and follow-ups.",
  path: "/approach",
});

const responsibilities = {
  revex: [
    "Prospect research and list building",
    "Outbound calls and outreach",
    "Qualification against agreed criteria",
    "Discovery-call scheduling and context handover",
    "Follow-ups and relationship maintenance",
  ],
  client: [
    "Product knowledge, positioning input and collateral",
    "Running discovery calls and demos",
    "Proposals, pricing and commercial negotiation",
    "Contracting and closing the deal",
    "Delivering the product or service",
  ],
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title={
          <>
            A structured path from first contact to{" "}
            <span className="text-gradient-electric">paying customer.</span>
          </>
        }
        description="Six steps, applied consistently across every engagement. Explore each stage below to see what RevEx does and what you can expect."
      >
        <CtaLink href={bookingCta.href} size="lg">
          {bookingCta.label}
        </CtaLink>
      </PageHero>

      <Process />

      <section className="bg-white py-24 sm:py-32" aria-labelledby="steps-detail-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="steps-detail-heading"
            eyebrow="Step by step"
            title="What happens at each stage."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.number} delay={(index % 3) * 0.05} className="rounded-2xl border border-border bg-mist/50 p-7">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-semibold text-navy">{step.title}</span>
                  <span className="font-mono text-sm text-electric">{step.number}</span>
                </div>
                <p className="mt-3 leading-relaxed text-slate-ink">{step.summary}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-sm text-navy/85">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-28" aria-labelledby="collab-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="collab-heading"
            eyebrow="A collaborative model"
            title="Closing is a team effort."
            description="RevEx supports the journey towards closure, but final outcomes depend on the client's offering, pricing, sales process and delivery capabilities. Here is how responsibilities are typically shared."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { title: "RevEx typically handles", items: responsibilities.revex, accent: true },
              { title: "Your team typically handles", items: responsibilities.client, accent: false },
            ].map((column) => (
              <div
                key={column.title}
                className={column.accent ? "dark rounded-2xl bg-navy p-8 text-white" : "rounded-2xl border border-border bg-white p-8"}
              >
                <h3 className={column.accent ? "text-lg font-semibold text-white" : "text-lg font-semibold text-navy"}>
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className={column.accent ? "flex items-start gap-3 text-sm text-white/85" : "flex items-start gap-3 text-sm text-navy/85"}>
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
