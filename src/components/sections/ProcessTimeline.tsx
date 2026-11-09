"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useRef, useState } from "react";

import type { ProcessStep } from "@/config/content";
import { cn } from "@/lib/utils";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];

  function focusTab(index: number) {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowDown: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      ArrowUp: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(steps.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
      <div className="relative">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[1.4rem] w-px bg-white/10 sm:hidden" />
        <div
          role="tablist"
          aria-label="Engagement steps"
          aria-orientation="vertical"
          className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((item, index) => {
            const selected = index === active;
            const done = index < active;
            return (
              <button
                key={item.number}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none sm:flex-col sm:items-start sm:p-5",
                  selected
                    ? "border-electric/60 bg-electric/[0.12]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition sm:size-10",
                    selected
                      ? "border-electric bg-electric text-white"
                      : done
                        ? "border-electric/40 bg-navy text-electric-300"
                        : "border-white/15 bg-navy text-steel",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-4" /> : item.number}
                </span>
                <span>
                  <span className="block font-mono text-[0.65rem] tracking-[0.18em] text-steel">
                    STEP {item.number}
                  </span>
                  <span className={cn("mt-1 block text-lg font-semibold tracking-wide", selected ? "text-white" : "text-white/80")}>
                    {item.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7 sm:p-8"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-white/5">
          <motion.div
            className="h-full bg-electric"
            initial={false}
            animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.number}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-mono text-xs tracking-[0.18em] text-electric-300">
              STEP {step.number} — {step.title.toUpperCase()}
            </p>
            <p className="mt-4 text-xl leading-snug font-medium text-white">{step.summary}</p>
            <ul className="mt-6 space-y-3">
              {step.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm text-steel">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => setActive((active - 1 + steps.length) % steps.length)}
            className="h-9 rounded-full border border-white/15 px-4 text-xs font-medium text-white transition hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActive((active + 1) % steps.length)}
            className="h-9 rounded-full bg-electric px-4 text-xs font-medium text-white transition hover:bg-electric-400 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none"
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  );
}
