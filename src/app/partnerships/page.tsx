import { Building2, Handshake, Rocket } from "lucide-react";

import { EngagementModels } from "@/components/sections/EngagementModels";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Partnerships } from "@/components/sections/Partnerships";
import { CtaLink } from "@/components/shared/CtaLink";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { bookingCta } from "@/config/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Partnerships — Business Development Engagements",
  description:
    "RevEx Consultancy's current business development engagements with Sentinel Layer (cybersecurity) and Dev Creates (website development and SaaS), and how startups and agencies can partner with RevEx.",
  path: "/partnerships",
});

const partnerTypes = [
  {
    icon: Rocket,
    title: "Startups & SaaS companies",
    body: "Products that are ready for customers, but without a dedicated outbound or business development function yet.",
  },
  {
    icon: Building2,
    title: "Agencies & service providers",
    body: "Development, digital and technology service firms looking for a consistent flow of qualified conversations.",
  },
  {
    icon: Handshake,
    title: "Channel & delivery partners",
    body: "Specialist companies who want an independent partner to represent their offering in new segments or markets.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title={
          <>
            Independent business development for{" "}
            <span className="text-gradient-electric">specialised partners.</span>
          </>
        }
        description="RevEx works with specialised companies as their business development partner. The partner owns and delivers its products and services; RevEx focuses on reaching, qualifying and engaging the right prospective customers."
      >
        <CtaLink href={bookingCta.href} size="lg">
          {bookingCta.label}
        </CtaLink>
        <CtaLink href="#become-a-partner" size="lg" variant="outlineDark" icon="none">
          Partner with RevEx
        </CtaLink>
      </PageHero>

      <Partnerships showHeading={false} />

      <section id="become-a-partner" className="scroll-mt-20 bg-white py-24 sm:py-32" aria-labelledby="become-partner-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="become-partner-heading"
            eyebrow="Become a partner"
            title="Have a strong offering that needs more of the right conversations?"
            description="RevEx works best with businesses that have a clear offering and the capacity to deliver it. Every partnership starts with a conversation about fit, target customers and the right engagement model."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partnerTypes.map(({ icon: IconComponent, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-mist/50 p-7">
                <IconComponent aria-hidden="true" className="size-6 text-electric" />
                <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-ink">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink href={bookingCta.href}>{bookingCta.label}</CtaLink>
            <CtaLink href="/contact" variant="outlineLight" icon="none">
              Send a partnership enquiry
            </CtaLink>
          </div>
        </div>
      </section>

      <EngagementModels />
      <FinalCTA />
    </>
  );
}
