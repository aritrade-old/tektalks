import { CalendarClock, Globe, Mail, MapPin } from "lucide-react";

import { CalPopup } from "@/components/shared/CalPopup";
import { ContactForm } from "@/components/shared/ContactForm";
import { CtaLink } from "@/components/shared/CtaLink";
import { LinkedInIcon } from "@/components/shared/Icon";
import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type ContactOptionsProps = {
  className?: string;
};

/** Booking CTA, contact details and the enquiry form, shared by the home page and /contact. */
export function ContactOptions({ className }: ContactOptionsProps) {
  return (
    <div data-hide-floating-cta className={cn("grid gap-6 lg:grid-cols-[0.75fr_1.25fr]", className)}>
      <div className="space-y-6">
        <div className="dark relative overflow-hidden rounded-[1.75rem] border border-electric/30 bg-navy-700 p-8 text-white">
          <div aria-hidden="true" className="glow-electric absolute -top-20 -right-20 size-60 opacity-70" />
          <span className="relative eyebrow text-electric-300">Option 01</span>
          <CalendarClock aria-hidden="true" className="relative mt-6 size-7 text-electric-300" />
          <h3 className="relative mt-4 text-2xl font-semibold tracking-[-0.02em]">Ready to talk?</h3>
          <p className="relative mt-3 leading-relaxed text-steel">
            Pick a time for a 20-minute discovery call directly in our live calendar — no form required.
          </p>
          <CtaLink href={bookingCta.href} className="relative mt-7 w-full">
            {bookingCta.label}
          </CtaLink>
          <CalPopup
            location="contact_section"
            className="relative mt-3 block text-center text-sm text-steel underline-offset-4 hover:text-white hover:underline"
          >
            Or open the calendar here
          </CalPopup>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-white p-8">
          <h3 className="text-base font-semibold text-navy">Contact information</h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-ink">
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
              <a href={`mailto:${siteConfig.businessEmail}`} className="break-all font-medium text-navy hover:text-electric">
                {siteConfig.businessEmail}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
              Based in {siteConfig.location}
            </li>
            <li className="flex items-start gap-3">
              <Globe aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
              Serving {siteConfig.serviceGeography}
            </li>
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
          <a
            href={`mailto:${siteConfig.businessEmail}?subject=${encodeURIComponent("Business enquiry for RevEx Consultancy")}`}
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-navy/15 px-5 text-sm font-medium text-navy transition hover:border-electric/40 hover:text-electric focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:outline-none"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email us
          </a>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_40px_100px_-50px_rgb(11_16_32/0.45)] sm:p-10">
        <span className="eyebrow text-electric-600">Option 02</span>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-navy">Send a business enquiry</h3>
        <p className="mt-2 mb-8 text-slate-ink">
          Prefer to share details first? Complete the form and RevEx will reply by email from{" "}
          {siteConfig.businessEmail}.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
