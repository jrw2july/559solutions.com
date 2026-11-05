// Code559 offerings (2026-10-14). Code559 is an initiative of 559 Solutions to help regular people
// use coding and AI tools to get results. Add a course here when its content exists; until then it
// shows as "Coming soon" with no link.
import { packetNotePath, paidCount, prices } from "./code559-packets.mjs";

/** A fact chip on a course card: plain text, or a link with optional text after it (2026-11-05). */
export type Code559Fact = string | { label: string; href: string; after?: string };

export interface Code559Offering {
  id: string;
  title: string;
  summary: string;
  status: "Available" | "Coming soon";
  href?: string;
  facts?: Code559Fact[];
}

export const code559Offerings: Code559Offering[] = [
  {
    id: "front-end-developer",
    title: "Front-End Developer Course",
    summary:
      "Learn HTML, CSS, JavaScript and Git from zero, one module at a time, and finish with a personal website and a portfolio on GitHub.",
    status: "Available",
    href: "/code559/front-end-developer/",
    facts: [
      "14 modules",
      "Every lesson free",
      // Prices come from src/data/code559-packets.mjs; the link goes to the course page's packet note.
      {
        label: "Optional packets with the full project",
        href: packetNotePath,
        after: `: ${prices.single} each, or ${prices.bundle} for all ${paidCount}.`,
      },
    ],
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
    status: "Available",
    href: "/code559/choose-the-right-ai-tool/",
    facts: ["Free guide", "17 tools checked", "Assessment on request"],
  },
];
