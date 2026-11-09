import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { challenges } from "@/config/services";

export function Challenge() {
  return (
    <section className="relative bg-white py-24 sm:py-32" aria-labelledby="challenge-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="challenge-heading"
              eyebrow="The business challenge"
              title="Great Products Deserve Better Sales Opportunities."
              description="Many growing businesses have the product, the expertise and the ambition — but not the business development engine needed to reach buyers consistently."
            />
            <blockquote className="mt-10 border-l-2 border-electric pl-6 text-xl leading-snug font-medium tracking-[-0.01em] text-navy">
              RevEx bridges the gap between having something valuable to sell and reaching the people who
              are ready to buy.
            </blockquote>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {challenges.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={(index % 2) * 0.06}
                className="group relative rounded-2xl border border-border bg-mist/60 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-electric/30 hover:bg-white hover:shadow-[0_20px_50px_-24px_rgb(11_16_32/0.25)]"
              >
                <span className="font-mono text-xs tracking-wider text-electric">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-navy">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
