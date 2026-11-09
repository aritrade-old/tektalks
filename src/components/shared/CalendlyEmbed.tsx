"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, CircleAlert, ExternalLink, LoaderCircle, RotateCw } from "lucide-react";

import { siteConfig } from "@/config/site";
import { captureAttribution } from "@/lib/attribution";
import {
  buildCalendlyLink,
  ensureCalendlyStylesheet,
  isCalendlyMessage,
  loadCalendly,
  toCalendlyUtm,
} from "@/lib/calendly";
import { cn } from "@/lib/utils";

type Status = "loading" | "ready" | "error";

const READY_TIMEOUT_MS = 20000;

type CalendlyEmbedProps = {
  url?: string;
  className?: string;
  title?: string;
};

export function CalendlyEmbed({
  url = siteConfig.calendlyUrl,
  className,
  title = "Schedule a 20-minute discovery call with RevEx Consultancy",
}: CalendlyEmbedProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [scheduled, setScheduled] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [fallbackHref, setFallbackHref] = useState(url);

  useEffect(() => {
    const parent = widgetRef.current;
    if (!parent) return;

    let cancelled = false;
    let readyTimer: number | undefined;
    const attribution = captureAttribution();
    const markReady = () => {
      if (cancelled) return;
      window.clearTimeout(readyTimer);
      setStatus("ready");
    };

    function onMessage(event: MessageEvent) {
      if (!isCalendlyMessage(event)) return;
      markReady();
      if (event.data.event === "calendly.event_scheduled") setScheduled(true);
    }
    window.addEventListener("message", onMessage);

    ensureCalendlyStylesheet();
    loadCalendly()
      .then((calendly) => {
        if (cancelled) return;
        setFallbackHref(buildCalendlyLink(url, attribution));
        parent.innerHTML = "";
        calendly.initInlineWidget({
          url,
          parentElement: parent,
          utm: toCalendlyUtm(attribution),
          resize: true,
        });
        const iframe = parent.querySelector("iframe");
        if (iframe) {
          iframe.title = title;
          iframe.addEventListener("load", markReady, { once: true });
        }
        readyTimer = window.setTimeout(() => {
          if (!cancelled) setStatus((current) => (current === "ready" ? current : "error"));
        }, READY_TIMEOUT_MS);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(readyTimer);
      window.removeEventListener("message", onMessage);
      parent.innerHTML = "";
      parent.style.removeProperty("height");
    };
  }, [url, title, attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((value) => value + 1);
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={widgetRef}
        id="calendly-embed"
        className={cn(
          "relative h-[1080px] w-full min-w-[280px] overflow-hidden sm:h-[960px] md:h-[750px]",
          status === "error" && "hidden",
        )}
        aria-busy={status === "loading"}
      />

      {status === "loading" ? (
        <div
          role="status"
          className="pointer-events-none absolute inset-x-0 top-0 flex h-[420px] flex-col items-center justify-center gap-4 bg-white text-center"
        >
          <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-electric" />
          <div>
            <p className="font-medium text-navy">Loading live availability…</p>
            <p className="mt-1 text-sm text-slate-ink">Connecting to the RevEx Calendly scheduler.</p>
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <CircleAlert aria-hidden="true" className="size-6" />
          </span>
          <div className="max-w-md">
            <p className="text-lg font-semibold text-navy">The scheduler couldn&apos;t load here</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-ink">
              This can happen when a browser extension or network blocks embedded content. You can
              retry, or book on Calendly directly — it&apos;s the same calendar.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={retry}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-5 text-sm font-medium text-navy transition hover:border-electric/40 hover:text-electric focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:outline-none"
            >
              <RotateCw aria-hidden="true" className="size-4" />
              Try again
            </button>
            <a
              href={fallbackHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-electric px-5 text-sm font-medium text-white transition hover:bg-electric-400 focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:outline-none"
            >
              Open Calendly
              <ExternalLink aria-hidden="true" className="size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      ) : null}

      {scheduled ? (
        <div
          role="status"
          className="flex items-start gap-3 border-t border-border bg-emerald-50/70 px-6 py-4 text-sm text-emerald-900"
        >
          <CalendarCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <p>
            Your discovery call is booked. Calendly has sent the confirmation and calendar invitation to
            the email address you provided.
          </p>
        </div>
      ) : null}

      <noscript>
        <p className="p-6 text-center text-sm text-slate-ink">
          JavaScript is required to show the scheduler.{" "}
          <a className="text-electric-600 underline" href={url}>
            Book directly on Calendly
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
