import type { IconName } from "@/components/shared/Icon";

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  details: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    summary:
      "Understand the client's product, service, value proposition, ideal customer profile and commercial objectives.",
    details: [
      "Product and value proposition deep-dive",
      "Ideal customer profile and buyer personas",
      "Commercial objectives and success criteria",
    ],
  },
  {
    number: "02",
    title: "Identify",
    summary:
      "Research target organisations, identify decision-makers and develop qualified prospect lists.",
    details: [
      "Market and account research",
      "Decision-maker mapping",
      "Prioritised prospect lists",
    ],
  },
  {
    number: "03",
    title: "Connect",
    summary: "Initiate conversations through targeted outbound engagement and cold calling.",
    details: [
      "Messaging tailored to each segment",
      "Cold calling and outbound email",
      "Professional representation of your brand",
    ],
  },
  {
    number: "04",
    title: "Qualify",
    summary:
      "Understand business requirements, identify genuine interest and assess potential opportunities.",
    details: [
      "Requirement and pain-point discovery",
      "Authority, budget and timing signals",
      "Opportunity notes shared with your team",
    ],
  },
  {
    number: "05",
    title: "Engage",
    summary: "Arrange discovery calls, coordinate stakeholders and maintain relationships.",
    details: [
      "Discovery-call scheduling",
      "Stakeholder coordination",
      "Context handover before each meeting",
    ],
  },
  {
    number: "06",
    title: "Convert",
    summary:
      "Support follow-ups, opportunity development and progression towards commercial closure.",
    details: [
      "Structured follow-up cadence",
      "Opportunity progression support",
      "Collaborative path towards closure",
    ],
  },
];

export const closureNote =
  "Final deal closure is collaborative. Outcomes depend on the client's offering, pricing, sales process and delivery capabilities — RevEx supports the journey, and the client owns the commercial agreement and delivery.";

export type Industry = {
  title: string;
  description: string;
  icon: IconName;
};

export const industries: Industry[] = [
  {
    title: "Cybersecurity & Information Security",
    description:
      "Introducing security products and services to the IT, risk and security leaders responsible for evaluating them.",
    icon: "shield",
  },
  {
    title: "SaaS & Enterprise Software",
    description:
      "Building outbound pipeline for software products that need conversations with operational and technical buyers.",
    icon: "layers",
  },
  {
    title: "Website Development & Digital Agencies",
    description:
      "Connecting agencies with businesses that need new websites, revamps, e-commerce or digital growth support.",
    icon: "browser",
  },
  {
    title: "Technology Consulting",
    description:
      "Opening doors for advisory and consulting firms that sell expertise to growing and established organisations.",
    icon: "lightbulb",
  },
  {
    title: "IT Services & Managed Services",
    description:
      "Generating qualified conversations for providers of infrastructure, support and managed technology services.",
    icon: "server",
  },
  {
    title: "B2B Startups",
    description:
      "Giving early-stage teams a structured business development function before they build an in-house sales team.",
    icon: "rocket",
  },
  {
    title: "Professional Services",
    description:
      "Supporting specialised B2B service providers in reaching new clients with a clear, credible message.",
    icon: "briefcase",
  },
  {
    title: "Emerging Technology Companies",
    description:
      "Helping new technology categories find early adopters and explain their value to the right stakeholders.",
    icon: "sparkles",
  },
];

export const industriesNote =
  "These are the technology-led sectors RevEx is focused on and actively collaborates within. Every engagement begins by learning your market in depth rather than assuming prior experience in it.";

export type Differentiator = {
  title: string;
  body: string;
  icon: IconName;
};

export const differentiators: Differentiator[] = [
  {
    title: "Flexible Engagement Models",
    body: "Work through monthly retainers, commission-based partnerships, project engagements or hybrid arrangements.",
    icon: "sliders",
  },
  {
    title: "Relationship-Driven Selling",
    body: "Focus on meaningful conversations and developing prospect relationships rather than simply chasing call volumes.",
    icon: "handshake",
  },
  {
    title: "End-to-End Prospect Engagement",
    body: "Support the sales development journey from prospect identification to qualification, meeting generation and follow-up.",
    icon: "route",
  },
  {
    title: "Independent & Partner-Led",
    body: "Collaborate with specialised startups, agencies and delivery partners to help businesses access business development capabilities without immediately building a complete internal sales team.",
    icon: "network",
  },
];

export type EngagementModel = {
  label: string;
  title: string;
  idealFor: string;
  includes: string[];
  cta: string;
  engagement: string;
  featured?: boolean;
};

export const engagementModels: EngagementModel[] = [
  {
    label: "Model 01",
    title: "Commission-Based Partnership",
    idealFor:
      "Ideal for startups and agencies looking to acquire customers without a large fixed monthly commitment.",
    includes: [
      "Prospect identification",
      "Outbound outreach",
      "Lead qualification",
      "Discovery-call generation",
      "Agreed commission-based compensation",
    ],
    cta: "Discuss Commission Partnership",
    engagement: "commission",
  },
  {
    label: "Model 02",
    title: "Monthly Retainer",
    idealFor:
      "Ideal for businesses looking for consistent outbound sales and dedicated business development support.",
    includes: [
      "Defined monthly engagement scope",
      "Prospect research",
      "Outbound sales execution",
      "Lead qualification",
      "Pipeline management",
      "Follow-up coordination",
      "Periodic reporting",
    ],
    cta: "Discuss Retainer Engagement",
    engagement: "retainer",
    featured: true,
  },
  {
    label: "Model 03",
    title: "Hybrid Engagement",
    idealFor:
      "Ideal for businesses combining predictable engagement costs with performance-linked incentives.",
    includes: [
      "Fixed engagement fee",
      "Defined sales activities",
      "Qualified opportunity generation",
      "Agreed performance-based compensation",
    ],
    cta: "Explore Hybrid Partnership",
    engagement: "hybrid",
  },
];

export const engagementDisclaimer =
  "Engagement terms are agreed individually. RevEx does not guarantee sales or customer acquisition; outcomes depend on market conditions and on each partner's offering, pricing and sales process.";

export const aboutCopy = {
  headline: "Building the Bridge Between Businesses and Their Next Customers.",
  paragraphs: [
    "RevEx Consultancy was established with a simple belief: great businesses need the right conversations to grow.",
    "We work independently with startups, technology companies and specialised agencies to support customer acquisition through structured prospecting, outbound sales and relationship-driven business development.",
    "Rather than operating as a traditional outsourcing vendor, RevEx works as an extension of its partners' commercial teams.",
    "Our approach combines research, communication, persistence and strategic thinking to help businesses build meaningful sales opportunities.",
  ],
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What does RevEx Consultancy do?",
    answer:
      "RevEx is an independent business development and revenue growth consultancy. We help startups, technology companies, SaaS businesses and agencies acquire customers by researching prospects, generating qualified B2B leads, starting conversations through cold calling and outbound outreach, qualifying opportunities, arranging discovery calls and supporting follow-ups.",
  },
  {
    question: "Does RevEx work with startups and established businesses?",
    answer:
      "Yes. RevEx works with early-stage startups that need a business development function before building an in-house sales team, as well as established businesses looking to add outbound capacity or enter new markets.",
  },
  {
    question: "Do you provide only cold calling or complete business development support?",
    answer:
      "Cold calling is one part of what we do. RevEx supports the wider sales development journey: target market research, lead generation, outbound outreach, qualification, discovery-call generation, relationship management and follow-ups.",
  },
  {
    question: "Do you offer commission-based engagements?",
    answer:
      "Yes. Alongside monthly retainers, project engagements and hybrid models, RevEx offers commission-based partnerships for suitable businesses. Terms are agreed individually based on the offering, sales cycle and scope.",
  },
  {
    question: "Can RevEx help generate B2B enterprise leads?",
    answer:
      "Yes. RevEx researches target organisations, identifies relevant decision-makers and initiates conversations with enterprise and mid-market prospects. Results depend on the offering, market and sales cycle, so we do not guarantee specific lead volumes or sales.",
  },
  {
    question: "Do you work with international businesses?",
    answer:
      "Yes. RevEx is based in India and works with businesses in India and international markets, including companies looking to reach Indian buyers and Indian companies expanding abroad.",
  },
  {
    question: "How do you qualify prospective customers?",
    answer:
      "We agree qualification criteria with you up front — typically requirement fit, business challenge, decision-making authority, timing and buying intent. Prospects are assessed against those criteria through conversation before any discovery call is arranged.",
  },
  {
    question: "Does RevEx provide technical or website development services?",
    answer:
      "No. RevEx handles business development and customer acquisition support. Specialised products and delivery services — such as cybersecurity technology, SaaS platforms or website development — are owned and delivered by the respective partner companies.",
  },
  {
    question: "How does the discovery-call process work?",
    answer:
      "Book a 20-minute discovery call directly on this website through our Calendly scheduler. On the call, we discuss what you sell, who you want to reach and where you need support, then explore whether there is a good fit and which engagement model makes sense.",
  },
  {
    question: "How do I start working with RevEx?",
    answer:
      "Either book a 20-minute discovery call or send a business enquiry through the contact form. If there is a fit, we agree the scope, engagement model and qualification criteria, then begin with the Understand phase of our approach.",
  },
];
