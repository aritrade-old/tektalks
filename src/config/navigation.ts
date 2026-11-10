export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/approach" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = mainNav;

export const footerServices: NavItem[] = [
  { label: "B2B Lead Generation", href: "/services#b2b-lead-generation" },
  { label: "Outbound Sales", href: "/services#cold-calling-outbound" },
  { label: "Lead Qualification", href: "/services#lead-qualification" },
  { label: "Discovery Call Generation", href: "/services#discovery-call-generation" },
  { label: "GTM Partnerships", href: "/services#gtm-partnerships" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const bookingCta = {
  label: "Book a Discovery Call",
  href: "/book-a-call",
} as const;
