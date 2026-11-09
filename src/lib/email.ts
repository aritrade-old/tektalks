import "server-only";

import { Resend } from "resend";

import type { ContactFormValues } from "@/lib/validations";

const DEFAULT_FROM = "RevEx Website <onboarding@resend.dev>";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured. Set RESEND_API_KEY and CONTACT_EMAIL.");
    this.name = "EmailNotConfiguredError";
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  if (!apiKey || !to) return null;
  return {
    apiKey,
    to: to.split(",").map((address) => address.trim()).filter(Boolean),
    from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM,
  };
}

export function isEmailConfigured() {
  return getEmailConfig() !== null;
}

type EnquiryMeta = {
  submittedAt: string;
  pageUrl?: string;
  attribution?: string;
};

export async function sendEnquiryNotification(enquiry: ContactFormValues, meta: EnquiryMeta) {
  const config = getEmailConfig();
  if (!config) throw new EmailNotConfiguredError();

  const rows: [string, string][] = [
    ["Full name", enquiry.fullName],
    ["Business email", enquiry.email],
    ["Company", enquiry.company],
    ["Website", enquiry.website || "Not provided"],
    ["Designation", enquiry.designation],
    ["Industry", enquiry.industry],
    ["Target geography", enquiry.geography],
    ["Services required", enquiry.services.join(", ")],
    ["Preferred engagement", enquiry.engagement],
    ["Submitted", meta.submittedAt],
  ];
  if (meta.attribution) rows.push(["Attribution", meta.attribution]);

  const text = [
    "New business enquiry from the RevEx website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Business development requirements:",
    enquiry.requirements,
  ].join("\n");

  const html = `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0B1020">
    <div style="background:#0B1020;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
      <div style="font-size:12px;letter-spacing:.18em;color:#8AA6FF">REVEX CONSULTANCY</div>
      <div style="font-size:20px;font-weight:600;margin-top:6px">New business enquiry</div>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E4E8F0;border-top:0">
      ${rows
        .map(
          ([label, value]) => `<tr>
        <td style="padding:10px 16px;border-bottom:1px solid #E4E8F0;background:#F5F7FB;font-size:13px;color:#4B5468;width:180px;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #E4E8F0;font-size:14px">${escapeHtml(value)}</td>
      </tr>`,
        )
        .join("")}
    </table>
    <div style="border:1px solid #E4E8F0;border-top:0;padding:16px;border-radius:0 0 12px 12px">
      <div style="font-size:13px;color:#4B5468;margin-bottom:8px">Business development requirements</div>
      <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(enquiry.requirements)}</div>
    </div>
    <p style="font-size:12px;color:#9CA3AF;margin-top:16px">Reply directly to this email to respond to ${escapeHtml(enquiry.fullName)}.</p>
  </div>`;

  const resend = new Resend(config.apiKey);
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.company} — ${enquiry.fullName}`.slice(0, 200),
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.name ?? "error"} — ${error.message}`);
  }
  return data?.id;
}
