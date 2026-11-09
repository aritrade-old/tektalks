import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { differentiators } from "@/config/content";

export function WhyRevex() {
  return (
    <section className="bg-mist py-24 sm:py-32" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="why-heading"
          eyebrow="Why RevEx"
          title="An Extension of Your Business Development Team."
          description="RevEx works alongside your team as a focused, flexible business development partner — not a high-volume call centre."
          align="center"
          className="mb-14"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              delay={(index % 2) * 0.06}
              className="group relative flex gap-6 overflow-hidden rounded-2xl border border-border bg-white p-7 transition duration-300 hover:border-electric/30 hover:shadow-[0_24px_60px_-32px_rgb(11_16_32/0.35)] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 bg-electric opacity-0 transition group-hover:opacity-100"
              />
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-electric-300">
                <Icon name={item.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-ink">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
