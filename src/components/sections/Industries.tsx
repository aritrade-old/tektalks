import { CtaLink } from "@/components/shared/CtaLink";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { industries, industriesNote } from "@/config/content";
import { cn } from "@/lib/utils";

type IndustriesProps = {
  showHeading?: boolean;
  showLink?: boolean;
  className?: string;
};

export function Industries({ showHeading = true, showLink = true, className }: IndustriesProps) {
  return (
    <section className={cn("bg-white py-24 sm:py-32", className)} aria-labelledby={showHeading ? "industries-heading" : undefined} aria-label={showHeading ? undefined : "Target industries"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading ? (
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="industries-heading"
              eyebrow="Industries"
              title="Business Development Across Technology-Led Industries."
              description={industriesNote}
            />
            {showLink ? (
              <CtaLink href="/industries" variant="outlineLight" className="shrink-0">
                Explore industries
              </CtaLink>
            ) : null}
          </div>
        ) : null}

        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal
              as="li"
              key={industry.title}
              delay={(index % 4) * 0.05}
              className="group relative bg-white p-7 transition duration-300 hover:bg-mist"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-electric/20 bg-electric/[0.06] text-electric transition group-hover:bg-electric group-hover:text-white">
                <Icon name={industry.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-base leading-snug font-semibold text-navy">{industry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink">{industry.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
