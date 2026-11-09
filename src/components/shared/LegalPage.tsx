import { PageHero } from "@/components/shared/PageHero";

export type LegalSection = {
  heading: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} className="pb-16 sm:pb-20" />
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.6fr_1.4fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium tracking-wider text-slate-ink uppercase">Last updated</p>
            <p className="mt-1 text-sm text-navy">{lastUpdated}</p>
            <ol className="mt-8 hidden space-y-2 text-sm lg:block">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`} className="text-slate-ink transition hover:text-electric">
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-3xl space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-28">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-navy">
                  {index + 1}. {section.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-ink [&_a]:text-electric [&_a]:underline-offset-2 hover:[&_a]:underline [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
