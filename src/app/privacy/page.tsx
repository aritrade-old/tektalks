import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/shared/LegalPage";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How RevEx Consultancy collects, uses and protects personal information submitted through its website, contact form and Calendly booking integration.",
  path: "/privacy",
});

const contactLine = siteConfig.businessEmail ? (
  <>
    by email at <a href={`mailto:${siteConfig.businessEmail}`}>{siteConfig.businessEmail}</a> or through
    our <Link href="/contact">contact form</Link>
  </>
) : (
  <>
    through our <Link href="/contact">contact form</Link>
  </>
);

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        RevEx Consultancy (&quot;RevEx&quot;, &quot;we&quot;, &quot;us&quot;) is an independent business
        development consultancy based in India. This policy explains how we handle personal information
        collected through this website.
      </p>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We only collect information you choose to provide, or that is needed to operate the site:</p>
        <ul>
          <li>
            <strong>Business enquiries:</strong> your name, business email, company, website, designation,
            industry, target geography, services of interest, preferred engagement model and the details
            you write in the enquiry.
          </li>
          <li>
            <strong>Discovery-call bookings:</strong> bookings are made through Calendly, which collects
            the details you enter in its scheduler (such as name, email and any answers you provide).
          </li>
          <li>
            <strong>Campaign attribution:</strong> where present, campaign parameters in the link you used
            to reach us (for example utm_source or utm_campaign) or the referring website. These are kept in
            your browser session and passed to Calendly or included with an enquiry so we know which channel
            you came from.
          </li>
          <li>
            <strong>Analytics (optional):</strong> if analytics is enabled and you accept analytics cookies,
            aggregated usage information such as pages viewed and booking-step events, without booking or
            enquiry contents.
          </li>
          <li>
            <strong>Technical data:</strong> IP addresses are processed transiently to protect the contact
            form against abuse (rate limiting) and by our hosting provider for security and operations.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use information",
    body: (
      <ul>
        <li>To respond to your enquiry and assess whether RevEx is a suitable business development partner.</li>
        <li>To schedule, prepare for and hold discovery calls you book.</li>
        <li>To understand which channels bring visitors to the site and improve it.</li>
        <li>To protect the website and its forms against spam and misuse.</li>
      </ul>
    ),
  },
  {
    heading: "Service providers",
    body: (
      <>
        <p>We use a small number of trusted providers who process data on our behalf:</p>
        <ul>
          <li>
            <strong>Calendly</strong> — scheduling and booking confirmations (
            <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
              Calendly privacy notice
            </a>
            ).
          </li>
          <li>
            <strong>Resend</strong> — delivering contact-form notifications by email.
          </li>
          <li>
            <strong>Vercel</strong> — website hosting.
          </li>
          <li>
            <strong>Google Analytics</strong> — only if enabled and only after you consent.
          </li>
        </ul>
        <p>
          We do not sell personal information. When RevEx works on behalf of a partner company, we may share
          relevant enquiry details with that partner only where it is necessary to respond to your request
          and you would reasonably expect it.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies and local storage",
    body: (
      <p>
        The site stores a small amount of data in your browser: your analytics consent choice (local storage)
        and campaign attribution for the current session (session storage). Analytics cookies are only set
        if you accept them. The embedded Calendly scheduler may set its own cookies necessary for booking.
      </p>
    ),
  },
  {
    heading: "Retention",
    body: (
      <p>
        Enquiry and booking information is kept for as long as needed to respond, manage a potential or
        ongoing business relationship, and meet legal obligations, after which it is deleted or anonymised.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        Subject to applicable law, including India&apos;s Digital Personal Data Protection Act, 2023 and, where
        relevant, other data protection laws, you may request access to, correction of, or deletion of your
        personal information, and withdraw consent at any time. Contact us {contactLine}.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: <p>We may update this policy from time to time. The &quot;last updated&quot; date shows the latest revision.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How RevEx Consultancy collects, uses and protects the information you share through this website."
      lastUpdated="9 November 2026"
      sections={sections}
    />
  );
}
