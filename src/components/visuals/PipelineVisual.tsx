"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { pipelineStages } from "@/config/services";
import { cn } from "@/lib/utils";

const CYCLE_MS = 2800;

export function PipelineVisual() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % pipelineStages.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const stage = pipelineStages[active];

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="glow-electric absolute top-1/2 left-1/2 -z-10 size-[130%] -translate-x-1/2 -translate-y-1/2 opacity-50"
      />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 shadow-[0_40px_120px_-40px_rgb(56_103_255/0.45)] backdrop-blur-xl sm:p-7">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />

        <div className="relative mb-6 flex items-center justify-between">
          <p className="eyebrow text-steel">
            <span className="sm:hidden">BD pipeline</span>
            <span className="hidden sm:inline">Business development pipeline</span>
          </p>
          <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.68rem] tracking-wider text-electric-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-electric" />
            </span>
            {String(active + 1).padStart(2, "0")} / {String(pipelineStages.length).padStart(2, "0")}
          </span>
        </div>

        <ol className="relative flex flex-col items-center" aria-label="Pipeline stages">
          {pipelineStages.map((item, index) => {
            const isActive = index === active;
            const isPast = index < active;
            return (
              <li key={item.label} className="flex w-full flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  style={
                    {
                      "--stage-w": `${100 - index * 5}%`,
                      "--stage-w-sm": `${100 - index * 9}%`,
                    } as React.CSSProperties
                  }
                  className={cn(
                    "group relative flex h-13 w-(--stage-w) sm:w-(--stage-w-sm) items-center justify-between rounded-xl border px-4 text-left transition-colors duration-300 focus-visible:ring-3 focus-visible:ring-electric/60 focus-visible:outline-none sm:h-14 sm:px-5",
                    isActive
                      ? "border-electric/70 text-white"
                      : isPast
                        ? "border-electric/25 bg-electric/[0.07] text-white/80 hover:border-electric/40"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white/90",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="pipeline-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-electric to-[#2a4fd6] shadow-[0_10px_40px_-10px_rgb(56_103_255/0.8)]"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative font-mono text-[0.68rem] tracking-wider opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative text-[0.66rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase sm:text-xs sm:tracking-[0.14em]">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="relative w-5" />
                </button>
                {index < pipelineStages.length - 1 ? (
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "my-1 size-4 transition-colors duration-300",
                      index < active ? "text-electric" : "text-white/20",
                    )}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="relative mt-6 rounded-xl border border-white/10 bg-navy/60 p-4" aria-live="polite">
          <p className="text-xs font-semibold tracking-wide text-white">{stage.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-steel">{stage.detail}</p>
        </div>
      </div>
    </div>
  );
}
