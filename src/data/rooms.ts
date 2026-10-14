// The site drawn as one floor plan (2026-10-14). The homepage shows the full plan as its navigation;
// every other page shows a small key plan with its own room filled in. Order = reading order of the plan.
export type Room = {
  id: string;
  /** Room name on the plan ("The Library"). */
  label: string;
  /** The page or pages behind the door, as the visitor knows them. */
  page: string;
  href: string;
  /** Short line under the room name on the homepage plan. */
  blurb: string;
  /** Link text on the homepage plan. */
  go: string;
  /** Paths (prefixes) that count as being in this room. */
  paths: string[];
};

export const rooms: Room[] = [
  {
    id: "entry",
    label: "Entry",
    page: "How 559 Solutions works",
    href: "/#how-it-works",
    blurb: "Three rooms explain the method: clarify, design, reuse.",
    go: "See how it works",
    paths: ["/"],
  },
  {
    id: "library",
    label: "The Library",
    page: "Resources",
    href: "/resources/",
    blurb: "Workbooks, starter kits, and templates for clearer decisions.",
    go: "Browse the shelves",
    paths: ["/resources/"],
  },
  {
    id: "study",
    label: "The Study",
    page: "The Curious Architect",
    href: "/blog/",
    blurb: "Articles about clearer systems and calmer technology decisions.",
    go: "Read the latest",
    paths: ["/blog/"],
  },
  {
    id: "workshop",
    label: "The Workshop",
    page: "Code559",
    href: "/code559/",
    blurb: "Coding and AI tools for regular people, one course at a time.",
    go: "Go to Code559",
    paths: ["/code559/"],
  },
  {
    id: "office",
    label: "The Office",
    page: "About and Services",
    href: "/about/",
    blurb: "Who is behind 559 Solutions, and the focused help on offer.",
    go: "Meet the architect",
    paths: ["/about/", "/services/"],
  },
  {
    id: "frontdesk",
    label: "The Front Desk",
    page: "Contact",
    href: "/contact/",
    blurb: "Tell me what is not working. Plain language is enough.",
    go: "Start a conversation",
    paths: ["/contact/"],
  },
];

/** The room a path belongs to, if any. Legal pages and the 404 page are not rooms. */
export const roomForPath = (path: string): Room | undefined => {
  if (path === "/") return rooms[0];
  return rooms.find((room) => room.id !== "entry" && room.paths.some((prefix) => path.startsWith(prefix)));
};
