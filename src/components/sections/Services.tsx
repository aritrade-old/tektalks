import { Check } from "lucide-react";

import { CtaLink } from "@/components/shared/CtaLink";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services, type Service } from "@/config/services";
import { cn } from "@/lib/utils";

function ServiceCard({ service, detailed, index }: { service: Service; detailed: boolean; index: number }) {
  return (
    <Reveal
      as="article"
      id={service.id}
      delay={(index % 3) * 0.06}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-[0_30px_60px_-30px_rgb(56_103_255/0.35)]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-48 rounded-full bg-electric/0 blur-3xl transition duration-500 group-hover:bg-electric/15"
      />
      <div className="relative flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-electric">
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="font-mono text-sm tracking-wider text-steel">{service.number}</span>
      </div>
      <h3 className="relative mt-7 text-xl font-semibold tracking-[-0.015em] text-navy">{service.title}</h3>
      <p className="relative mt-3 leading-relaxed text-slate-ink">{service.summary}</p>
      {detailed ? (
        <ul className="relative mt-6 space-y-2.5 border-t border-border pt-6">
          {service.activities.map((activity) => (
            <li key={activity} className="flex items-start gap-2.5 text-sm text-navy/85">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
              {activity}
            </li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}

type ServicesProps = {
  detailed?: boolean;
  showHeading?: boolean;
  className?: string;
};

export function Services({ detailed = false, showHeading = true, className }: ServicesProps) {
  return (
    <section className={cn("relative bg-mist py-24 sm:py-32", className)} aria-labelledby={showHeading ? "services-heading" : undefined} aria-label={showHeading ? undefined : "Services"}>
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading ? (
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-heading"
              eyebrow="Our services"
              title="Business Development That Moves Opportunities Forward."
              description="Six connected capabilities that cover the early and middle stages of your sales cycle — from finding the right prospects to keeping opportunities moving."
            />
            {!detailed ? (
              <CtaLink href="/services" variant="outlineLight" className="shrink-0">
                View all services
              </CtaLink>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} detailed={detailed} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
