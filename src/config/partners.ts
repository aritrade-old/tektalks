export type PartnerVisual = "sentinel" | "devcreates";

export type Partner = {
  slug: string;
  index: string;
  name: string;
  url: string;
  category: string[];
  headline: string;
  description: string;
  responsibilities: string[];
  ctaLabel: string;
  ownershipNote: string;
  visual: PartnerVisual;
};

export const partners: Partner[] = [
  {
    slug: "sentinel-layer",
    index: "Partner 01",
    name: "Sentinel Layer",
    url: "https://sentinellayer.in/",
    category: ["Cybersecurity", "Post-Login Session Security"],
    headline: "Helping Cybersecurity Innovation Reach the Right Enterprise Customers.",
    description:
      "Sentinel Layer specialises in continuous post-login session security and real-time threat detection. Its technology helps organisations identify suspicious session activity and mitigate threats such as session hijacking, credential theft and automated account takeovers.",
    responsibilities: [
      "B2B prospect research",
      "Cybersecurity lead generation",
      "Identifying enterprise prospects and decision-makers",
      "Cold calling and outbound outreach",
      "Introducing the post-login security value proposition",
      "Understanding prospect security requirements",
      "Lead qualification and nurturing",
      "Discovery-call generation",
      "Relationship management and follow-ups",
      "Supporting customer acquisition and sales progression",
    ],
    ctaLabel: "Explore Sentinel Layer",
    ownershipNote:
      "RevEx is the business development partner. Sentinel Layer owns and delivers the cybersecurity technology.",
    visual: "sentinel",
  },
  {
    slug: "dev-creates",
    index: "Partner 02",
    name: "Dev Creates",
    url: "https://dev-createss.vercel.app/",
    category: ["Website Development", "SaaS", "Digital Solutions"],
    headline: "Connecting Growing Businesses with Digital Solutions That Accelerate Growth.",
    description:
      "Dev Creates is an independent website development and SaaS agency offering business websites, portfolio websites, e-commerce solutions, custom SaaS development and digital growth services.",
    responsibilities: [
      "Identifying businesses requiring new websites",
      "Finding businesses requiring website revamps",
      "B2B prospect research",
      "Cold calling business owners and decision-makers",
      "Introducing relevant website and SaaS solutions",
      "Understanding business and technical requirements",
      "Lead qualification",
      "Arranging discovery calls with the development team",
      "Maintaining prospect relationships",
      "Following up and supporting conversion into paying customers",
    ],
    ctaLabel: "Explore Dev Creates",
    ownershipNote:
      "Dev Creates owns and delivers its development services. RevEx handles business development and customer acquisition support.",
    visual: "devcreates",
  },
];
