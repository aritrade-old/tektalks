import { CalendarClock, Globe, Mail, MapPin } from "lucide-react";

import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/shared/ContactForm";
import { CtaLink } from "@/components/shared/CtaLink";
import { LinkedInIcon } from "@/components/shared/Icon";
import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact — Start a Business Development Conversation",
  description:
    "Contact RevEx Consultancy about B2B lead generation, outbound sales, appointment setting or go-to-market support. Send a business enquiry or book a 20-minute discovery call.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="dark relative isolate overflow-hidden bg-navy pt-36 pb-44 text-white sm:pt-44">
        <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden="true" className="glow-electric absolute -top-40 right-0 -z-10 size-[40rem] opacity-60" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-electric-300">
            <span aria-hidden="true" className="h-px w-6 bg-electric-300/60" />
            Contact
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s Explore How We Can Grow Together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">
            Tell us about your business, target customers and growth objectives. We&apos;ll explore whether
            RevEx is the right business development partner for you.
          </p>
        </div>
      </section>

      <section className="relative -mt-28 pb-24 sm:pb-32" aria-label="Ways to get in touch">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <div className="dark relative overflow-hidden rounded-[1.75rem] border border-electric/30 bg-navy-700 p-8 text-white">
              <div aria-hidden="true" className="glow-electric absolute -top-20 -right-20 size-60 opacity-70" />
              <span className="relative eyebrow text-electric-300">Option 01</span>
              <CalendarClock aria-hidden="true" className="relative mt-6 size-7 text-electric-300" />
              <h2 className="relative mt-4 text-2xl font-semibold tracking-[-0.02em]">Ready to talk?</h2>
              <p className="relative mt-3 leading-relaxed text-steel">
                Pick a time for a 20-minute discovery call directly in our live calendar — no form required.
              </p>
              <CtaLink href={bookingCta.href} className="relative mt-7 w-full">
                {bookingCta.label}
              </CtaLink>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white p-8">
              <h2 className="text-base font-semibold text-navy">RevEx Consultancy</h2>
              <ul className="mt-5 space-y-4 text-sm text-slate-ink">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                  Based in {siteConfig.location}
                </li>
                <li className="flex items-start gap-3">
                  <Globe aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                  Serving {siteConfig.serviceGeography}
                </li>
                {siteConfig.businessEmail ? (
                  <li className="flex items-start gap-3">
                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                    <a href={`mailto:${siteConfig.businessEmail}`} className="break-all text-navy hover:text-electric">
                      {siteConfig.businessEmail}
                    </a>
                  </li>
                ) : null}
                {siteConfig.linkedinUrl ? (
                  <li className="flex items-start gap-3">
                    <LinkedInIcon className="mt-0.5 size-4 shrink-0 text-electric" />
                    <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-navy hover:text-electric">
                      Connect on LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_40px_100px_-50px_rgb(11_16_32/0.45)] sm:p-10">
            <span className="eyebrow text-electric">Option 02</span>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-navy">Send a business enquiry</h2>
            <p className="mt-2 mb-8 text-slate-ink">
              Prefer to share details first? Complete the form and RevEx will reply by email.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
