import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "dark relative isolate overflow-hidden bg-navy pt-36 pb-20 text-white sm:pt-44 sm:pb-28",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="glow-electric absolute -top-40 right-[-10%] -z-10 size-[42rem] opacity-60"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow mb-6 text-electric-300">
          <span aria-hidden="true" className="h-px w-6 bg-electric-300/60" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-steel">
          {description}
        </p>
        {children ? <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div> : null}
      </div>
    </section>
  );
}
