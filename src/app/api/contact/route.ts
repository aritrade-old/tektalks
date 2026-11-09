import { NextResponse, type NextRequest } from "next/server";

import { EmailNotConfiguredError, sendEnquiryNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactRequestSchema, MIN_FORM_FILL_MS } from "@/lib/validations";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const now = Date.now();

  if (!isSameOrigin(request)) {
    return json({ ok: false, error: "Cross-origin submissions are not allowed." }, 403);
  }

  const limit = rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS, now);
  if (!limit.allowed) {
    return json(
      { ok: false, error: "Too many enquiries from this connection. Please try again later or book a call instead." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Your enquiry is too large. Please shorten it and try again." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ ok: false, error: "Please check the highlighted fields and try again.", fieldErrors }, 422);
  }

  const { companyFax, startedAt, attribution, ...enquiry } = parsed.data;

  // Bots that fill the hidden field or submit implausibly fast are dropped
  // without sending email. They receive a generic response so the checks are not revealed.
  const filledTooFast = startedAt === 0 || now - startedAt < MIN_FORM_FILL_MS;
  if (companyFax || filledTooFast) {
    return json({ ok: false, error: "We couldn't verify this submission. Please wait a moment and try again." }, 400);
  }

  const attributionSummary = attribution
    ? Object.entries(attribution)
        .filter(([, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join(", ")
    : "";

  try {
    await sendEnquiryNotification(enquiry, {
      submittedAt: new Date(now).toISOString(),
      attribution: attributionSummary || undefined,
    });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      console.error("[contact] Email delivery is not configured: set RESEND_API_KEY and CONTACT_EMAIL.");
      return json(
        { ok: false, error: "Our enquiry inbox is temporarily unavailable. Please book a discovery call instead." },
        503,
      );
    }
    console.error("[contact] Failed to send enquiry notification", error);
    return json({ ok: false, error: "We couldn't send your enquiry right now. Please try again shortly." }, 502);
  }

  return json({ ok: true }, 200);
}
