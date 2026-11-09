"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  engagementOptions,
  geographyOptions,
  industryOptions,
  serviceOptions,
  type ContactFormInput,
  type ContactFormValues,
} from "@/lib/validations";

type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const engagementParamMap: Record<string, (typeof engagementOptions)[number]> = {
  commission: "Commission-Based",
  retainer: "Monthly Retainer",
  hybrid: "Hybrid",
  project: "Project-Based",
};

const fieldClass =
  "h-11 rounded-xl border-input bg-white px-3.5 text-[0.95rem] text-navy shadow-none placeholder:text-steel focus-visible:border-electric focus-visible:ring-electric/20";
const selectClass = cn(
  fieldClass,
  "w-full appearance-none border bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234B5468%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10 outline-none focus-visible:ring-3 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
);

function FieldMessage({ id, error }: { id: string; error?: FieldError | { message?: string } }) {
  if (!error?.message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive">
      <CircleAlert aria-hidden="true" className="size-3.5" />
      {error.message}
    </p>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-electric">
      *
    </span>
  );
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const startedAtInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      website: "",
      designation: "",
      services: [],
      requirements: "",
    },
  });

  useEffect(() => {
    if (startedAtInput.current) startedAtInput.current.value = String(Date.now());
    const engagement = new URLSearchParams(window.location.search).get("engagement");
    const mapped = engagement ? engagementParamMap[engagement] : undefined;
    if (mapped) setValue("engagement", mapped);
  }, [setValue]);

  async function onSubmit(values: ContactFormValues, event?: React.BaseSyntheticEvent) {
    setSubmitState({ status: "idle" });
    const form = event?.target as HTMLFormElement | undefined;
    const readHidden = (name: string) =>
      (form?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";
    const attribution = getAttribution();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          companyFax: readHidden("companyFax"),
          startedAt: Number(readHidden("startedAt")) || 0,
          attribution: attribution ?? undefined,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;
      if (!response.ok || !result?.ok) {
        for (const [field, message] of Object.entries(result?.fieldErrors ?? {})) {
          if (field in contactFormSchema.shape) {
            setError(field as keyof ContactFormInput, { type: "server", message });
          }
        }
        setSubmitState({
          status: "error",
          message: result?.error ?? "Something went wrong while sending your enquiry. Please try again.",
        });
        return;
      }
      trackEvent("contact_form_submitted", { engagement: values.engagement });
      reset();
      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({
        status: "error",
        message: "We couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CircleCheck aria-hidden="true" className="size-6" />
        </span>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-navy">Thank you — your enquiry has been sent.</h3>
          <p className="mt-3 max-w-lg leading-relaxed text-slate-ink">
            RevEx has received your business enquiry and will review it and reply by email. If you&apos;d
            like to talk sooner, you can book a 20-minute discovery call at a time that suits you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={bookingCta.href}
            className="inline-flex h-11 items-center rounded-full bg-electric px-5 text-sm font-medium text-white transition hover:bg-electric-400"
          >
            {bookingCta.label}
          </Link>
          <button
            type="button"
            onClick={() => setSubmitState({ status: "idle" })}
            className="inline-flex h-11 items-center rounded-full border border-navy/15 px-5 text-sm font-medium text-navy transition hover:border-electric/40"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (name: string) => (errors[name as keyof typeof errors] ? `${name}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-6" aria-label="Business enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName" className="mb-2 text-navy">
            Full name <RequiredMark />
          </Label>
          <Input id="fullName" autoComplete="name" placeholder="Your full name" className={fieldClass} aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy("fullName")} aria-required="true" {...register("fullName")} />
          <FieldMessage id="fullName-error" error={errors.fullName} />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 text-navy">
            Business email <RequiredMark />
          </Label>
          <Input id="email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" className={fieldClass} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} aria-required="true" {...register("email")} />
          <FieldMessage id="email-error" error={errors.email} />
        </div>
        <div>
          <Label htmlFor="company" className="mb-2 text-navy">
            Company name <RequiredMark />
          </Label>
          <Input id="company" autoComplete="organization" placeholder="Company name" className={fieldClass} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("company")} aria-required="true" {...register("company")} />
          <FieldMessage id="company-error" error={errors.company} />
        </div>
        <div>
          <Label htmlFor="website" className="mb-2 text-navy">
            Website URL <span className="font-normal text-steel">(optional)</span>
          </Label>
          <Input id="website" type="text" inputMode="url" autoComplete="url" placeholder="company.com" className={fieldClass} aria-invalid={Boolean(errors.website)} aria-describedby={describedBy("website")} {...register("website")} />
          <FieldMessage id="website-error" error={errors.website} />
        </div>
        <div>
          <Label htmlFor="designation" className="mb-2 text-navy">
            Designation <RequiredMark />
          </Label>
          <Input id="designation" autoComplete="organization-title" placeholder="e.g. Founder, Head of Sales" className={fieldClass} aria-invalid={Boolean(errors.designation)} aria-describedby={describedBy("designation")} aria-required="true" {...register("designation")} />
          <FieldMessage id="designation-error" error={errors.designation} />
        </div>
        <div>
          <Label htmlFor="industry" className="mb-2 text-navy">
            Industry <RequiredMark />
          </Label>
          <select id="industry" defaultValue="" className={selectClass} aria-invalid={Boolean(errors.industry)} aria-describedby={describedBy("industry")} aria-required="true" {...register("industry")}>
            <option value="" disabled>
              Select your industry
            </option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldMessage id="industry-error" error={errors.industry} />
        </div>
        <div>
          <Label htmlFor="geography" className="mb-2 text-navy">
            Target geography <RequiredMark />
          </Label>
          <select id="geography" defaultValue="" className={selectClass} aria-invalid={Boolean(errors.geography)} aria-describedby={describedBy("geography")} aria-required="true" {...register("geography")}>
            <option value="" disabled>
              Where are your customers?
            </option>
            {geographyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldMessage id="geography-error" error={errors.geography} />
        </div>
        <div>
          <Label htmlFor="engagement" className="mb-2 text-navy">
            Preferred engagement model <RequiredMark />
          </Label>
          <select id="engagement" defaultValue="" className={selectClass} aria-invalid={Boolean(errors.engagement)} aria-describedby={describedBy("engagement")} aria-required="true" {...register("engagement")}>
            <option value="" disabled>
              Select a model
            </option>
            {engagementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldMessage id="engagement-error" error={errors.engagement} />
        </div>
      </div>

      <fieldset aria-describedby={describedBy("services")}>
        <legend className="mb-3 text-sm font-medium text-navy">
          Services required <RequiredMark />
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-input bg-white px-3.5 py-3 text-sm text-navy transition hover:border-electric/40 has-checked:border-electric has-checked:bg-electric/[0.05] has-focus-visible:ring-3 has-focus-visible:ring-electric/20"
            >
              <input type="checkbox" value={option} className="size-4 shrink-0 accent-electric" {...register("services")} />
              {option}
            </label>
          ))}
        </div>
        <FieldMessage id="services-error" error={errors.services as FieldError | undefined} />
      </fieldset>

      <div>
        <Label htmlFor="requirements" className="mb-2 text-navy">
          Business development requirements <RequiredMark />
        </Label>
        <Textarea
          id="requirements"
          rows={6}
          placeholder="What do you sell, who are you trying to reach, and where do you need business development support?"
          className={cn(fieldClass, "min-h-36 py-3")}
          aria-invalid={Boolean(errors.requirements)}
          aria-describedby={describedBy("requirements")}
          aria-required="true"
          {...register("requirements")}
        />
        <FieldMessage id="requirements-error" error={errors.requirements} />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="companyFax">Company fax (leave blank)</label>
        <input id="companyFax" name="companyFax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtInput} type="hidden" name="startedAt" defaultValue="0" />

      {submitState.status === "error" ? (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">{submitState.message}</p>
            <p className="mt-1 text-red-700/90">
              You can also{" "}
              <Link href={bookingCta.href} className="underline underline-offset-2">
                book a discovery call
              </Link>
              {siteConfig.businessEmail ? (
                <>
                  {" "}or email{" "}
                  <a href={`mailto:${siteConfig.businessEmail}`} className="underline underline-offset-2">
                    {siteConfig.businessEmail}
                  </a>
                </>
              ) : null}
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-slate-ink">
          By submitting, you agree that RevEx may use these details to respond to your enquiry, as described
          in our{" "}
          <Link href="/privacy" className="text-electric underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-electric px-7 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgb(56_103_255/0.6)] transition hover:bg-electric-400 focus-visible:ring-3 focus-visible:ring-electric/50 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending enquiry…
            </>
          ) : (
            <>
              Submit Business Enquiry
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
