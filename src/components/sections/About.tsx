import { CtaLink } from "@/components/shared/CtaLink";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { aboutCopy } from "@/config/content";

const principles = [
  { label: "Research", body: "Every conversation starts with understanding the market and the buyer." },
  { label: "Communication", body: "Clear, credible and professional representation of your brand." },
  { label: "Persistence", body: "Consistent follow-up that keeps genuine opportunities moving." },
  { label: "Strategy", body: "Commercial thinking applied to who, how and when to engage." },
];

export function About({ variant = "teaser" }: { variant?: "teaser" | "full" }) {
  const paragraphs = variant === "teaser" ? aboutCopy.paragraphs.slice(0, 3) : aboutCopy.paragraphs;
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="about-heading" eyebrow="About RevEx" title={aboutCopy.headline} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-ink">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {variant === "teaser" ? (
            <CtaLink href="/about" variant="outlineLight" className="mt-10">
              More about RevEx
            </CtaLink>
          ) : null}
        </div>
        <ul className="grid content-start gap-4 sm:grid-cols-2">
          {principles.map((item, index) => (
            <Reveal
              as="li"
              key={item.label}
              delay={index * 0.05}
              className="relative overflow-hidden rounded-2xl border border-border bg-mist/60 p-7"
            >
              <span aria-hidden="true" className="absolute top-0 left-7 h-0.5 w-10 bg-electric" />
              <h3 className="text-lg font-semibold text-navy">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
