# RevEx Consultancy — Website

Marketing website for **RevEx Consultancy**, an independent B2B business development and revenue growth consultancy.

> We Build Conversations. You Build Customers.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Framer Motion, React Hook Form + Zod, Resend and Cal.com's official embed. Ready to deploy on Vercel.

---

## Features

- **10 pages**: Home, Services, Industries, Our Approach, Partnerships, About, Book a Discovery Call, Contact, Privacy Policy, Terms of Service — plus a custom 404.
- **Cal.com booking (central feature)**
  - `/book-a-call` embeds the live Cal.com 20-minute discovery-call calendar inline using Cal.com's official `embed.js` (`Cal("inline")`), with auto-resize, a loading state, error handling with retry, and a fallback link.
  - "Book a 20-Min Call" floating button opens Cal.com's official modal booker (falls back to `/book-a-call` if Cal.com is blocked). Hidden on `/book-a-call` and when the footer is in view.
  - Every "Book a Discovery Call" CTA (navigation, mobile menu, hero, services, partnerships, about, contact, footer) uses the same booking flow and the same Cal.com URL.
  - Cal.com embed events (`linkReady`, `bookingSuccessfulV2`, `linkFailed`) are forwarded to analytics as event names only — no invitee data.
  - UTM attribution is captured per session and passed to Cal.com (see below).
- **Contact form** with React Hook Form + Zod (shared client/server schema), server-side validation, honeypot field, minimum fill-time check, same-origin check, per-IP rate limiting, loading/success/error states, and a real email notification via Resend. Submissions are never simulated: if email isn't configured the API returns an error.
- **Partner engagements** (Sentinel Layer, Dev Creates) rendered from `src/config/partners.ts` through a reusable `PartnerCard` — add a partner by adding an object.
- **SEO**: per-page titles/descriptions, canonical URLs, Open Graph + Twitter cards with a generated OG image, `sitemap.xml`, `robots.txt`, web manifest, SVG favicon + Apple touch icon, JSON-LD (`ProfessionalService`, `WebSite`, `FAQPage`, service list, `AboutPage`). No reviews, ratings or testimonials are included in structured data.
- **Privacy-respecting analytics**: Google Analytics 4 loads only when `NEXT_PUBLIC_GA_ID` is set **and** the visitor accepts the consent banner.
- **Accessibility**: semantic landmarks, skip link, one `h1` per page, keyboard-operable pipeline/timeline/accordion/menu, visible focus states, `prefers-reduced-motion` support.
- **Security headers**: HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

## Project structure

```
src/
  app/
    layout.tsx               Root layout, global metadata, JSON-LD, navbar/footer
    page.tsx                 Home
    services/ industries/ approach/ partnerships/ about/
    book-a-call/             Cal.com inline embed
    contact/                 Contact form + direct booking option
    privacy/ terms/          Legal pages
    api/contact/route.ts     Validated, rate-limited enquiry endpoint (Resend)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx apple-icon.tsx icon.svg
    not-found.tsx globals.css
  components/
    layout/                  Navbar, MobileMenu, Footer, Logo
    sections/                Hero, Challenge, Services, Process(+Timeline), Industries,
                             Partnerships, WhyRevex, EngagementModels, About,
                             FounderProfile, FAQ, FinalCTA
    shared/                  CalEmbed, CalPopup, FloatingBookingButton,
                             PartnerCard, SectionHeading, ContactForm, CtaLink,
                             PageHero, LegalPage, Reveal, Icon, JsonLd
    visuals/                 PipelineVisual, SentinelVisual, DevCreatesVisual
    analytics/               SiteTracking (UTM capture), Analytics (GA4 + consent)
    ui/                      shadcn/ui primitives (accordion, sheet, input, textarea, label, button)
  config/
    site.ts                  Brand, URLs, env-driven settings
    navigation.ts            Nav, footer and booking CTA
    services.ts              Services, challenges, pipeline stages
    content.ts               Process, industries, differentiators, engagement models, about, FAQ
    partners.ts              Partner engagements
    founder.ts               Founder profile (editable bio, photo, LinkedIn)
  lib/
    cal.ts                   Cal.com embed loader (single injection), events, UTM mapping
    attribution.ts           UTM / referrer attribution capture
    analytics.ts             Consent state + privacy-safe event tracking
    validations.ts           Zod schemas and form options
    email.ts                 Resend notification (server-only)
    rate-limit.ts            In-memory rate limiter
    seo.ts                   Metadata helper
public/images/founder/       Place the founder photograph here
```

## Run on your laptop (quick start)

1. Install **Node.js LTS** (version 20.9 or newer) from [nodejs.org](https://nodejs.org) — accept the defaults.
2. Unzip the project and open the folder.
3. Start the site:
   - **Windows:** double-click `start-local.bat`.
   - **macOS:** right-click `start-local.command` → **Open** (the first time macOS asks for confirmation). Or in Terminal: `bash start-local.command`.
   - **Linux:** `bash start-local.command`.
4. Your browser opens **http://localhost:3000** once it's ready (first run installs dependencies, ~1–2 minutes). Keep the window open while browsing; close it (or press Ctrl+C) to stop.

The launcher creates `.env.local` from `.env.example` on first run. The Cal.com booking works immediately; the contact form needs `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local` (then run the launcher again).

## Run locally (developer commands)

Requires Node.js 20.9+ (tested with Node 22).

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Quality checks and production build:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Environment variables

| Variable | Required | Scope | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public | Canonical site URL (no trailing slash). Falls back to the Vercel production domain, then `http://localhost:3000`. |
| `NEXT_PUBLIC_CAL_BOOKING_URL` | Optional | Public | Cal.com booking page used everywhere. Defaults to the 20-minute discovery call: `https://cal.com/revexconsultancy/20min?overlayCalendar=true`. |
| `RESEND_API_KEY` | Yes, for the form | Server | Resend API key. |
| `CONTACT_EMAIL` | Optional | Server | Inbox that receives enquiries (comma-separate multiple). Defaults to the business email. |
| `RESEND_FROM_EMAIL` | Recommended | Server | Verified sender, e.g. `RevEx Website <enquiries@yourdomain.com>`. Defaults to `onboarding@resend.dev`. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Public | LinkedIn profile; links are hidden when empty. |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Optional | Public | Email shown in the footer, contact page, privacy policy and structured data. Defaults to `revexconsultancy@gmail.com`. |
| `NEXT_PUBLIC_GA_ID` | Optional | Public | GA4 measurement ID; no analytics or consent banner when empty. |

`NEXT_PUBLIC_*` values are embedded at build time — redeploy after changing them. Server-only values (`RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL`) are never sent to the browser.

### Setting up Resend

1. Create an account at [resend.com](https://resend.com) and an API key → `RESEND_API_KEY`.
2. Until you verify a domain, Resend's `onboarding@resend.dev` sender can **only deliver to the email address that owns the Resend account** — so the Resend account should be owned by `revexconsultancy@gmail.com`, the inbox that receives enquiries.
3. For production, verify your domain in Resend (DNS records), then set `RESEND_FROM_EMAIL` to an address on that domain.

## Cal.com integration

- The booking URL lives in one place: `NEXT_PUBLIC_CAL_BOOKING_URL` (read in `src/config/site.ts`). The path (`username/event-slug`) is the embed's `calLink`; query parameters such as `overlayCalendar=true` are forwarded to the embed.
- Event title, description, duration and availability are edited in Cal.com, not in this codebase.
- Availability, booking and confirmation emails come entirely from Cal.com — the site never fabricates slots or confirmations.

### UTM attribution

Attribution is stored in `sessionStorage` and passed to Cal.com as `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` parameters. Rules:

- UTM parameters in the landing URL win and are merged key-by-key — a stored value is never replaced by an empty one.
- `?ref=partner-name` is shorthand for `utm_source=partner-name&utm_medium=referral`.
- Without UTMs, a referrer from Google/Bing/DuckDuckGo becomes `<engine>/organic`, LinkedIn becomes `linkedin/social`, other sites `<hostname>/referral`.
- Direct visits with no referrer send no attribution (nothing is invented).

Suggested link conventions:

| Channel | Example link |
| --- | --- |
| LinkedIn post / profile | `https://yourdomain.com/?utm_source=linkedin&utm_medium=social&utm_campaign=founder-posts` |
| Cold-calling follow-up | `https://yourdomain.com/book-a-call?utm_source=cold-call&utm_medium=phone&utm_campaign=q4-saas` |
| Outreach email | `https://yourdomain.com/book-a-call?utm_source=outreach-email&utm_medium=email&utm_campaign=cyber-cisos` |
| Referral partner | `https://yourdomain.com/?ref=partner-name` |
| Google Ads | `...?utm_source=google&utm_medium=cpc&utm_campaign=b2b-leadgen` |

Cal.com receives the UTM values as booking-page query parameters.

## Editing content

- Copy for services, process, industries, engagement models, FAQ and About: `src/config/content.ts` and `src/config/services.ts`.
- Partners: `src/config/partners.ts`. Add an object (and optionally a new visual in `src/components/visuals/`) to feature another partner.
- Founder: `src/config/founder.ts` — edit the bio; to add a photo, put it in `public/images/founder/` and set `photo: "/images/founder/your-file.jpg"`.
- Legal text: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` (have these reviewed by a legal professional).

## Push to GitHub

```bash
cd revex-consultancy
git init -b main            # skip if already a repository
git add -A
git commit -m "RevEx Consultancy website"
# Create an empty repository on github.com (no README/licence), then:
git remote add origin https://github.com/<your-account>/revex-consultancy.git
git push -u origin main
```

`.env.local` and all `.env*` files except `.env.example` are git-ignored. Never commit API keys.

## Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. Framework preset: **Next.js** (auto-detected). Build command `next build`, output default. Root directory: the folder containing `package.json`.
3. Add environment variables (Settings → Environment Variables) for **Production** (and Preview if desired): `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL`, plus optional `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_GA_ID`.
4. Click **Deploy**.
5. Verify on the live URL:
   - Every page loads and navigation works on desktop and mobile.
   - `/book-a-call` shows live Cal.com availability; make a test booking and confirm it appears in Cal.com; cancel it afterwards.
   - The floating "Book a 20-Min Call" button opens the Cal.com popup.
   - Submit the contact form and confirm the email arrives at `CONTACT_EMAIL`.
   - `/sitemap.xml` and `/robots.txt` use your production domain.

### Custom domain (later)

1. Vercel → Project → Settings → Domains → add `yourdomain.com` (and `www`).
2. Add the DNS records Vercel shows (an `A` record for the apex, `CNAME` for `www`) at your registrar.
3. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and redeploy so canonical URLs, Open Graph tags and the sitemap use the new domain.
4. Verify the domain in Resend and update `RESEND_FROM_EMAIL` to use it.

## Notes

- The contact-form rate limiter is in-memory, so each serverless instance keeps its own window. It is combined with honeypot, timing and same-origin checks; for stricter global limits, back it with a shared store such as Upstash Redis.
- The Cal.com embed may set its own cookies needed for booking.
