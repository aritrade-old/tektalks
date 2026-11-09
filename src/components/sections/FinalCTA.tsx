import { CalendarCheck, CalendarClock, Clock } from "lucide-react";

import { CtaLink } from "@/components/shared/CtaLink";
import { bookingCta } from "@/config/navigation";

type FinalCTAProps = {
  title?: string;
  description?: string;
  showContact?: boolean;
};

export function FinalCTA({
  title = "Your Next Customer Could Be One Conversation Away.",
  description = "Let's identify the right opportunities, start meaningful conversations and build a stronger customer acquisition pipeline.",
  showContact = true,
}: FinalCTAProps) {
  return (
    <section aria-labelledby="final-cta-heading">
      <div className="dark relative isolate overflow-hidden bg-navy px-6 py-24 text-white sm:px-12 sm:py-32">
        <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden="true" className="glow-electric absolute -bottom-64 left-1/2 -z-10 size-[56rem] -translate-x-1/2 opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-electric-300">
            <CalendarClock aria-hidden="true" className="size-3.5" />
            Book a discovery call
          </p>
          <h2
            id="final-cta-heading"
            className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaLink href={bookingCta.href} size="lg">
              Schedule Your 20-Minute Discovery Call
            </CtaLink>
            {showContact ? (
              <CtaLink href="/contact" size="lg" variant="outlineDark" icon="none">
                Contact RevEx
              </CtaLink>
            ) : null}
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-steel">
            <li className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-4 text-electric-300" />
              20 minutes
            </li>
            <li className="flex items-center gap-2">
              <CalendarCheck aria-hidden="true" className="size-4 text-electric-300" />
              Pick a time that suits you
            </li>
            <li className="flex items-center gap-2">
              <CalendarClock aria-hidden="true" className="size-4 text-electric-300" />
              Live availability via Calendly
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
