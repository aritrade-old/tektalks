import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { CtaLink } from "@/components/shared/CtaLink";
import { LinkedInIcon } from "@/components/shared/Icon";
import { bookingCta, footerNav, footerServices, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-white/50">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-steel transition hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="dark relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-lg leading-snug font-medium text-white">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-steel">{siteConfig.positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={bookingCta.href} size="sm">
                {bookingCta.label}
              </CtaLink>
            </div>
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-steel underline-offset-4 hover:text-white hover:underline"
            >
              Or open our Calendly page directly
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Navigate" links={footerNav} />
            <FooterColumn title="Services" links={footerServices} />
            <div>
              <h2 className="eyebrow text-white/50">Contact</h2>
              <ul className="mt-5 space-y-4 text-sm text-steel">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
                  <span>Based in {siteConfig.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
                  <span>Serving {siteConfig.serviceGeography}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-300" />
                  {siteConfig.businessEmail ? (
                    <a href={`mailto:${siteConfig.businessEmail}`} className="break-all transition hover:text-white">
                      {siteConfig.businessEmail}
                    </a>
                  ) : (
                    <Link href="/contact" className="transition hover:text-white">
                      Send an enquiry
                    </Link>
                  )}
                </li>
                {siteConfig.linkedinUrl ? (
                  <li className="flex items-start gap-3">
                    <LinkedInIcon className="mt-0.5 size-4 shrink-0 text-electric-300" />
                    <a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.copyrightYear} RevEx Consultancy. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
