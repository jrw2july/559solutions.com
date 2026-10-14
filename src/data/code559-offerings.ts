// Code559 offerings (2026-10-14). Code559 is an initiative of 559 Solutions to help regular people
// use coding and AI tools to get results. Add a course here when its content exists; until then it
// shows as "Coming soon" with no link.
export interface Code559Offering {
  id: string;
  title: string;
  summary: string;
  status: "Available" | "Coming soon";
  href?: string;
  facts?: string[];
}

export const code559Offerings: Code559Offering[] = [
  {
    id: "front-end-developer",
    title: "Front-End Developer Course",
    summary:
      "Learn HTML, CSS, JavaScript and Git from zero, one module at a time, and finish with a personal website and a portfolio on GitHub.",
    status: "Available",
    href: "/code559/front-end-developer/",
    facts: ["14 modules", "Every lesson free", "Optional packets with the full project"],
  },
  {
    id: "understanding-ai",
    title: "Understanding AI",
    summary:
      "What today's AI tools can and cannot do, in plain language, and how to use them carefully at work and at home.",
    status: "Coming soon",
  },
  {
    id: "tech-behind-gpt",
    title: "Understanding the Tech Behind GPT",
    summary:
      "How large language models turn your words into an answer, explained one step at a time, with small examples you can try.",
    status: "Coming soon",
  },
  {
    id: "choose-the-right-ai-tool",
    title: "How to Choose the Right AI Tool",
    summary:
      "Start with the result you need, compare a few tools against the same test, and try one small, safe experiment before you commit.",
    status: "Coming soon",
  },
];
