import { PartnerCard } from "@/components/shared/PartnerCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { partners } from "@/config/partners";

type PartnershipsProps = {
  showHeading?: boolean;
};

export function Partnerships({ showHeading = true }: PartnershipsProps) {
  return (
    <section
      className="dark relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32"
      aria-labelledby={showHeading ? "partners-heading" : undefined}
      aria-label={showHeading ? undefined : "Partner engagements"}
    >
      <div aria-hidden="true" className="glow-electric absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 opacity-30" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading ? (
          <SectionHeading
            id="partners-heading"
            tone="dark"
            eyebrow="Featured partner engagements"
            title="Current Business Development Engagements."
            description="RevEx is currently the business development partner for two specialised technology businesses. Each partner owns and delivers its own products and services; RevEx focuses on reaching, qualifying and engaging their prospective customers."
            className="mb-14"
          />
        ) : null}
        <div className="space-y-8">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.slug} partner={partner} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
