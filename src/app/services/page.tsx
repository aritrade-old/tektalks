import { EngagementModels } from "@/components/sections/EngagementModels";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Services } from "@/components/sections/Services";
import { WhyRevex } from "@/components/sections/WhyRevex";
import { CtaLink } from "@/components/shared/CtaLink";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { bookingCta } from "@/config/navigation";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "B2B Lead Generation, Cold Calling & Appointment Setting Services",
  description:
    "Outsourced business development services for startups and SaaS companies: B2B lead generation, cold calling and outbound outreach, lead qualification, discovery-call generation, follow-ups and go-to-market partnerships.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "RevEx Consultancy services",
  url: absoluteUrl("/services"),
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      url: absoluteUrl(`/services#${service.id}`),
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: ["India", "Worldwide"],
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Business development that moves opportunities{" "}
            <span className="text-gradient-electric">forward.</span>
          </>
        }
        description="RevEx covers the early and middle stages of your sales cycle — identifying the right prospects, starting conversations, qualifying interest and arranging discovery calls — so your team can focus on closing and delivering."
      >
        <CtaLink href={bookingCta.href} size="lg">
          {bookingCta.label}
        </CtaLink>
        <CtaLink href="#engagement" size="lg" variant="outlineDark" icon="none">
          See engagement models
        </CtaLink>
      </PageHero>
      <Services detailed showHeading={false} className="pt-16 sm:pt-20" />
      <WhyRevex />
      <div id="engagement" className="scroll-mt-20">
        <EngagementModels />
      </div>
      <FinalCTA />
      <JsonLd data={servicesJsonLd} />
    </>
  );
}
