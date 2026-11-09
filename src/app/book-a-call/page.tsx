import Link from "next/link";
import { CalendarCheck, Clock, MessageSquare, Target, Video } from "lucide-react";

import { CalEmbed } from "@/components/shared/CalEmbed";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Book a 20-Minute Discovery Call",
  description:
    "Schedule a 20-minute discovery call with RevEx Consultancy. Discuss B2B lead generation, outbound sales and business development support for your startup, SaaS or technology business.",
  path: "/book-a-call",
});

const agenda = [
  {
    icon: Target,
    title: "What you're building",
    body: "Your product or service, value proposition and current stage.",
  },
  {
    icon: MessageSquare,
    title: "Who you want to reach",
    body: "Target industries, geographies and decision-makers.",
  },
  {
    icon: CalendarCheck,
    title: "Where you need support",
    body: "Lead generation, outreach, qualification, meetings or follow-ups — and which engagement model could fit.",
  },
];

export default function BookACallPage() {
  return (
    <>
      <section className="dark relative isolate overflow-hidden bg-navy pt-36 pb-48 text-white sm:pt-44">
        <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden="true" className="glow-electric absolute -top-40 left-1/2 -z-10 size-[44rem] -translate-x-1/2 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow text-electric-300">
                <span aria-hidden="true" className="h-px w-6 bg-electric-300/60" />
                Book a discovery call
              </p>
              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
                Let&apos;s Talk About Growing Your Business.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">
                Tell us what you&apos;re building, who you&apos;re trying to reach and where you need
                business development support. Let&apos;s explore how RevEx can help.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Clock aria-hidden="true" className="size-5 text-electric-300" />
                <dt className="mt-4 text-xs tracking-wider text-steel uppercase">Duration</dt>
                <dd className="mt-1 font-medium">20 minutes</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Video aria-hidden="true" className="size-5 text-electric-300" />
                <dt className="mt-4 text-xs tracking-wider text-steel uppercase">Format</dt>
                <dd className="mt-1 font-medium">Details in your invite</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="relative -mt-36 pb-24 sm:pb-32" aria-labelledby="scheduler-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_2fr]">
          <aside className="order-2 lg:order-1 lg:pt-44">
            <h2 className="text-lg font-semibold text-navy">What we&apos;ll cover</h2>
            <ul className="mt-6 space-y-6">
              {agenda.map(({ icon: IconComponent, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <IconComponent aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-ink">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-border bg-mist p-6 text-sm leading-relaxed text-slate-ink">
              <p>
                Availability and confirmations are managed by Cal.com. You&apos;ll receive a calendar
                invitation by email as soon as your booking is confirmed.
              </p>
              <p className="mt-3">
                Prefer to write first?{" "}
                <Link href="/contact" className="font-medium text-electric-600 underline underline-offset-2 hover:text-navy">
                  Send a business enquiry
                </Link>
                .
              </p>
            </div>
          </aside>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_40px_100px_-40px_rgb(11_16_32/0.45)]">
              <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
                <h2 id="scheduler-heading" className="text-sm font-semibold text-navy">
                  Choose a date and time
                </h2>
                <span className="flex items-center gap-2 text-xs text-slate-ink">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live availability
                </span>
              </div>
              <CalEmbed />
            </div>
            <p className="mt-4 text-center text-xs text-slate-ink">
              Having trouble with the scheduler?{" "}
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-600 underline underline-offset-2 hover:text-navy"
              >
                Open the booking page on Cal.com
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
