import { About } from "@/components/sections/About";
import { Challenge } from "@/components/sections/Challenge";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Partnerships } from "@/components/sections/Partnerships";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyRevex } from "@/components/sections/WhyRevex";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqs } from "@/config/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "RevEx Consultancy | B2B Lead Generation & Outsourced Business Development India",
  description:
    "RevEx Consultancy is an outsourced business development partner for startups, SaaS and technology companies — B2B lead generation, cold calling, lead qualification and discovery-call generation across India and international markets.",
  path: "/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Challenge />
      <Services />
      <Process />
      <Industries />
      <Partnerships />
      <WhyRevex />
      <EngagementModels />
      <About />
      <FAQ />
      <FinalCTA />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
