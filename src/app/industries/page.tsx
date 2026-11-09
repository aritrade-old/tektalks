import { Compass, Search, Users } from "lucide-react";

import { FinalCTA } from "@/components/sections/FinalCTA";
import { Industries } from "@/components/sections/Industries";
import { CtaLink } from "@/components/shared/CtaLink";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { bookingCta } from "@/config/navigation";
import { industriesNote } from "@/config/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Industries — SaaS, Cybersecurity, IT Services & B2B Startups",
  description:
    "RevEx Consultancy provides B2B business development and lead generation for technology-led industries including cybersecurity, SaaS, digital agencies, IT and managed services, technology consulting and B2B startups.",
  path: "/industries",
});

const approach = [
  {
    icon: Search,
    title: "Learn the market first",
    body: "Each engagement starts by studying your category, competitors, buyers and the language they use.",
  },
  {
    icon: Users,
    title: "Map the decision-makers",
    body: "We identify who evaluates, influences and approves purchases in your target organisations.",
  },
  {
    icon: Compass,
    title: "Shape the conversation",
    body: "Outreach is built around the specific challenges your offering solves for that audience.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Business development across{" "}
            <span className="text-gradient-electric">technology-led</span> industries.
          </>
        }
        description={industriesNote}
      >
        <CtaLink href={bookingCta.href} size="lg">
          {bookingCta.label}
        </CtaLink>
      </PageHero>
      <Industries showHeading={false} className="pt-16 sm:pt-20" />
      <section className="bg-mist py-24 sm:py-28" aria-labelledby="industry-approach-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="industry-approach-heading"
            eyebrow="How we enter a new sector"
            title="Every market is different. The discipline is the same."
            description="RevEx positions these sectors as focus areas and areas of collaboration. We don't claim deep history in every one — we apply a consistent, research-led approach to each."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {approach.map(({ icon: IconComponent, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-7">
                <IconComponent aria-hidden="true" className="size-6 text-electric" />
                <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-ink">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA title="Selling into one of these markets?" description="Tell us what you offer and who you want to reach. We'll explore whether RevEx is the right business development partner for you." />
    </>
  );
}
