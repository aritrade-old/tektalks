import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { WhyRevex } from "@/components/sections/WhyRevex";
import { CtaLink } from "@/components/shared/CtaLink";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { bookingCta } from "@/config/navigation";
import { founder } from "@/config/founder";
import { siteConfig } from "@/config/site";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About RevEx — Independent Business Development Consultancy",
  description:
    "RevEx Consultancy is an independent business development consultancy founded by Aritra De, working as an extension of partners' commercial teams to build meaningful B2B sales opportunities.",
  path: "/about",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: absoluteUrl("/about"),
  name: `About ${siteConfig.name}`,
  about: { "@id": `${siteConfig.url}/#organization` },
  mainEntity: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.designation,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    ...(founder.photo ? { image: absoluteUrl(founder.photo) } : {}),
    ...(founder.linkedinUrl ? { sameAs: [founder.linkedinUrl] } : {}),
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About RevEx"
        title={
          <>
            Great businesses need the <span className="text-gradient-electric">right conversations</span> to
            grow.
          </>
        }
        description="RevEx Consultancy is an independent business development and revenue growth consultancy working with startups, technology companies and specialised agencies across India and international markets."
      >
        <CtaLink href={bookingCta.href} size="lg">
          {bookingCta.label}
        </CtaLink>
      </PageHero>
      <About variant="full" />
      <FounderProfile />
      <WhyRevex />
      <FinalCTA />
      <JsonLd data={aboutJsonLd} />
    </>
  );
}
