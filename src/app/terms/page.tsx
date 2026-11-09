import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/shared/LegalPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing the use of the RevEx Consultancy website, discovery-call bookings and business enquiries.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        These terms govern your use of the RevEx Consultancy website. By using the site, you agree to them.
        Any business development engagement with RevEx is governed by a separate written agreement, which
        takes precedence over these terms.
      </p>
    ),
  },
  {
    heading: "Nature of our services",
    body: (
      <>
        <p>
          RevEx is an independent business development consultancy. We support prospect research, lead
          generation, outbound outreach, qualification, discovery-call generation and follow-ups on behalf
          of our clients and partners.
        </p>
        <p>
          Products, technology and delivery services referenced on this site — including those of partner
          companies such as Sentinel Layer and Dev Creates — are owned and delivered by those companies, not
          by RevEx.
        </p>
      </>
    ),
  },
  {
    heading: "No guarantee of results",
    body: (
      <p>
        Information on this website is provided for general purposes. RevEx does not guarantee any specific
        number of leads, meetings, sales or customers. Outcomes depend on many factors, including the
        client&apos;s offering, pricing, sales process, delivery capability and market conditions.
      </p>
    ),
  },
  {
    heading: "Bookings and enquiries",
    body: (
      <p>
        Discovery calls are scheduled through Calendly and are subject to Calendly&apos;s terms. Submitting an
        enquiry or booking a call does not create a contract or obligation for either party. Please provide
        accurate information and do not submit confidential information you are not authorised to share.
      </p>
    ),
  },
  {
    heading: "Acceptable use",
    body: (
      <ul>
        <li>Do not misuse the website, attempt to disrupt it or gain unauthorised access to it.</li>
        <li>Do not submit spam, automated submissions or unlawful content through our forms.</li>
        <li>Do not copy or reuse site content or design for commercial purposes without permission.</li>
      </ul>
    ),
  },
  {
    heading: "Third-party links",
    body: (
      <p>
        The site links to external websites, including partner websites and Calendly. We are not responsible
        for the content, policies or practices of those sites.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The RevEx Consultancy name, logo, website content and design are owned by RevEx Consultancy. Partner
        names and trademarks belong to their respective owners and are used to describe our engagements.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, RevEx is not liable for any indirect or consequential loss
        arising from use of this website. Nothing in these terms limits liability that cannot be limited by
        law.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: <p>These terms are governed by the laws of India.</p>,
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about these terms? Reach us through the <Link href="/contact">contact page</Link>. See also
        our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The terms that apply when you use the RevEx Consultancy website, book a call or send an enquiry."
      lastUpdated="9 November 2026"
      sections={sections}
    />
  );
}
