export type Service = {
  slug: string;
  title: string;
  purpose: string;
  deliverables: string[];
  note?: string;
  status: "by inquiry";
};

export const services: Service[] = [
  {
    slug: "business-systems-clarity-session",
    title: "Business Systems Clarity Session",
    purpose:
      "Turn scattered tools, repeated manual work, and unclear ownership into a practical system map and next-step plan.",
    deliverables: [
      "A focused conversation about the current process",
      "A plain-language summary of the main bottlenecks",
      "A practical set of recommended next steps",
      "A simple workflow or system view when it fits the scope",
      "Follow-up notes based on the agreed scope",
    ],
    note: "Scope and deliverables are confirmed before scheduling.",
    status: "by inquiry",
  },
  {
    slug: "ai-workflow-assessment",
    title: "AI Workflow Assessment",
    purpose:
      "Identify realistic places where AI may reduce repetitive work without adding unnecessary complexity.",
    deliverables: [
      "Workflow review",
      "A short list of practical use cases",
      "Readiness and risk notes",
      "A recommendation for the smallest useful pilot",
      "Tool-neutral guidance",
    ],
    status: "by inquiry",
  },
  {
    slug: "low-code-solution-design",
    title: "Low-Code Solution Design",
    purpose:
      "Map a process into a lightweight form, application, dashboard, automation, or workflow.",
    deliverables: [
      "Process and decision map",
      "Proposed low-code solution outline",
      "Data and integration considerations",
      "Risks, assumptions, and next-step options",
    ],
    note: "Implementation is quoted separately after the design scope is understood.",
    status: "by inquiry",
  },
  {
    slug: "technical-mentoring",
    title: "Technical Mentoring",
    purpose:
      "Help analysts, architects, builders, instructors, and junior technologists understand systems and work more independently.",
    deliverables: [
      "Focused mentoring around a real technical challenge",
      "Reusable documentation and decision habits",
      "Plain-language explanations of architecture and tradeoffs",
      "A practical learning path for the next step",
    ],
    status: "by inquiry",
  },
  {
    slug: "systems-clarity-sprint",
    title: "Systems Clarity Sprint",
    purpose:
      "A limited, fixed-scope engagement for a process or decision that needs concentrated attention.",
    deliverables: [
      "An owner-configured scope",
      "A concise current-state view",
      "A prioritized improvement plan",
      "Reusable notes or templates suited to the work",
    ],
    note: "Availability, scope, timing, and deliverables are confirmed by inquiry.",
    status: "by inquiry",
  },
];
