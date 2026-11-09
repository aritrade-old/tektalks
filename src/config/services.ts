import type { IconName } from "@/components/shared/Icon";

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: IconName;
  activities: string[];
};

export const services: Service[] = [
  {
    id: "b2b-lead-generation",
    number: "01",
    title: "B2B Lead Generation",
    summary:
      "Identify relevant organisations, decision-makers and prospective customers through structured research, targeting and qualification.",
    icon: "target",
    activities: [
      "Ideal customer profile and target-segment definition",
      "Account and decision-maker research",
      "Structured, qualified prospect lists",
    ],
  },
  {
    id: "cold-calling-outbound",
    number: "02",
    title: "Cold Calling & Outbound Outreach",
    summary:
      "Initiate targeted business conversations through cold calling, email and appropriate outbound communication channels.",
    icon: "phone",
    activities: [
      "Targeted cold calling to decision-makers",
      "Personalised outbound email sequences",
      "Professional, value-led first conversations",
    ],
  },
  {
    id: "lead-qualification",
    number: "03",
    title: "Lead Qualification",
    summary:
      "Understand prospect requirements, business challenges, authority, buying intent and potential opportunities.",
    icon: "filter",
    activities: [
      "Requirement and challenge discovery",
      "Authority, timing and intent assessment",
      "Clear qualification notes for your team",
    ],
  },
  {
    id: "discovery-call-generation",
    number: "04",
    title: "Discovery Call Generation",
    summary:
      "Convert initial prospect interest into qualified meetings with the appropriate business or technical stakeholders.",
    icon: "calendar",
    activities: [
      "Meeting coordination with the right stakeholders",
      "Context briefings before every call",
      "Scheduling and reminder support",
    ],
  },
  {
    id: "relationship-management",
    number: "05",
    title: "Relationship Management & Follow-ups",
    summary:
      "Maintain prospect engagement, coordinate follow-ups and help opportunities progress through the sales cycle.",
    icon: "repeat",
    activities: [
      "Structured follow-up cadences",
      "Ongoing prospect relationship nurturing",
      "Pipeline status updates and handovers",
    ],
  },
  {
    id: "gtm-partnerships",
    number: "06",
    title: "Go-to-Market & Strategic Partnerships",
    summary:
      "Support startups and agencies with market entry, GTM execution, business development partnerships and customer acquisition strategies.",
    icon: "compass",
    activities: [
      "Market-entry and GTM execution support",
      "Business development partnership models",
      "Customer acquisition strategy input",
    ],
  },
];

export const challenges = [
  {
    title: "Strong product, limited reach",
    body: "You have something valuable to offer, but struggle to get in front of the decision-makers who can buy it.",
  },
  {
    title: "Inconsistent lead generation",
    body: "Opportunities arrive in bursts from referrals and networks rather than a structured, repeatable pipeline.",
  },
  {
    title: "Stretched internal resources",
    body: "There is no dedicated business development function, and hiring a full sales team is not yet the right move.",
  },
  {
    title: "Conversations that never start",
    body: "Cold outreach goes unanswered because it lacks targeting, context or a clear reason to talk.",
  },
  {
    title: "Interest that doesn't progress",
    body: "Prospects show initial interest, then go quiet because follow-ups and qualification are inconsistent.",
  },
  {
    title: "Founders stuck prospecting",
    body: "Leadership spends hours prospecting instead of building the product, the team and the business.",
  },
];

export const pipelineStages = [
  {
    label: "Target Prospects",
    detail: "Researched organisations and decision-makers that match your ideal customer profile.",
  },
  {
    label: "Meaningful Conversations",
    detail: "Targeted outbound calls and outreach that open genuine business dialogue.",
  },
  {
    label: "Qualified Opportunities",
    detail: "Prospects assessed for requirements, authority, timing and buying intent.",
  },
  {
    label: "Discovery Calls",
    detail: "Meetings arranged with the right business and technical stakeholders.",
  },
  {
    label: "Paying Customers",
    detail: "Follow-ups and relationship support as opportunities move towards closure with your team.",
  },
];
