import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", dark ? "text-electric-300" : "text-electric")}>
          <span
            aria-hidden="true"
            className={cn("h-px w-6", dark ? "bg-electric-300/60" : "bg-electric/60")}
          />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.85rem]",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            dark ? "text-steel" : "text-slate-ink",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
