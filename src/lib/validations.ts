import { z } from "zod";

export const serviceOptions = [
  "B2B Lead Generation",
  "Cold Calling & Outbound Sales",
  "Lead Qualification",
  "Discovery Call Generation",
  "Customer Acquisition",
  "GTM & Strategic Partnerships",
  "Other",
] as const;

export const engagementOptions = [
  "Commission-Based",
  "Monthly Retainer",
  "Hybrid",
  "Project-Based",
  "Not Sure Yet",
] as const;

export const industryOptions = [
  "Cybersecurity & Information Security",
  "SaaS & Enterprise Software",
  "Website Development & Digital Agencies",
  "Technology Consulting",
  "IT Services & Managed Services",
  "B2B Startup",
  "Professional Services",
  "Emerging Technology",
  "Other",
] as const;

export const geographyOptions = [
  "India",
  "North America",
  "United Kingdom & Europe",
  "Middle East",
  "Asia-Pacific",
  "Global / Multiple Regions",
  "Other",
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(200, "Website URL is too long")
  .transform((value) => {
    if (!value) return "";
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  })
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Enter a valid website URL, for example example.com");

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(160, "Email is too long")
    .pipe(z.email("Enter a valid email address")),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name")
    .max(120, "Company name is too long"),
  website: optionalUrl,
  designation: z
    .string()
    .trim()
    .min(2, "Please enter your designation")
    .max(100, "Designation is too long"),
  industry: z.enum(industryOptions, { error: "Please select your industry" }),
  geography: z.enum(geographyOptions, { error: "Please select a target geography" }),
  services: z
    .array(z.enum(serviceOptions))
    .min(1, "Select at least one service")
    .max(serviceOptions.length),
  engagement: z.enum(engagementOptions, { error: "Please select an engagement model" }),
  requirements: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters)")
    .max(3000, "Please keep this under 3000 characters"),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

/** Fields that are checked on the server only and never shown to humans. */
export const antiSpamSchema = z.object({
  companyFax: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative(),
});

const utmValue = z.string().trim().max(120).optional();

export const attributionSchema = z
  .object({
    utm_source: utmValue,
    utm_medium: utmValue,
    utm_campaign: utmValue,
    utm_content: utmValue,
    utm_term: utmValue,
  })
  .strip()
  .optional();

export const contactRequestSchema = contactFormSchema.extend({
  ...antiSpamSchema.shape,
  attribution: attributionSchema,
});

export const MIN_FORM_FILL_MS = 3000;
