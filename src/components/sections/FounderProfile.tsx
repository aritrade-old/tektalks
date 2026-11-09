import Image from "next/image";

import { CtaLink } from "@/components/shared/CtaLink";
import { LinkedInIcon } from "@/components/shared/Icon";
import { bookingCta } from "@/config/navigation";
import { founder } from "@/config/founder";

export function FounderProfile() {
  return (
    <section className="bg-mist py-24 sm:py-32" aria-labelledby="founder-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-border bg-white p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-navy">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.photoAlt}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="dark absolute inset-0 flex flex-col items-center justify-center" role="img" aria-label={`${founder.name} monogram`}>
                <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
                <div aria-hidden="true" className="glow-electric absolute inset-0 opacity-60" />
                <span className="relative flex size-32 items-center justify-center rounded-full border border-white/15 bg-white/5 text-4xl font-semibold tracking-wider text-white backdrop-blur">
                  {founder.initials}
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow text-electric-600">
              <span aria-hidden="true" className="h-px w-6 bg-electric/60" />
              Founder
            </p>
            <h2 id="founder-heading" className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-navy sm:text-4xl">
              {founder.name}
            </h2>
            <p className="mt-2 font-medium text-electric-600">{founder.designation}</p>
            <p className="text-sm text-slate-ink">{founder.organisation}</p>
            <div className="mt-8 space-y-4 leading-relaxed text-slate-ink">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CtaLink href={bookingCta.href}>{bookingCta.label}</CtaLink>
              {founder.linkedinUrl ? (
                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-5 text-sm font-medium text-navy transition hover:border-electric/40 hover:text-electric focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:outline-none"
                >
                  <LinkedInIcon className="size-4" />
                  Connect on LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
