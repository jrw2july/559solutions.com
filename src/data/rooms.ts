// The site drawn as one floor plan (2026-10-14). The homepage shows the full plan as its navigation;
// every other page shows a small key plan with its own room filled in. Order = reading order of the plan.
// Layout: open double doors in the left wall lead into a hall; the Library and Study are above it,
// the Classroom below. About and Contact are reached from the header, not the plan.
export type Room = {
  id: string;
  /** Room name on the plan ("The Library"). */
  label: string;
  /** The page or pages behind the door, as the visitor knows them. */
  page: string;
  /** Show `page` as a small label on the homepage plan. */
  showPage: boolean;
  href: string;
  /** Short line under the room name on the homepage plan. */
  blurb: string;
  /** Link text on the homepage plan. */
  go: string;
  /** Which side of the hall the room is on. Its door opens off the hall and swings into the room. */
  side: "above" | "below";
  /** Paths (prefixes) that count as being in this room. */
  paths: string[];
};

export const rooms: Room[] = [
  {
    id: "library",
    label: "The Library",
    page: "Resources",
    showPage: true,
    href: "/resources/",
    blurb: "Workbooks, starter kits, and templates for clearer decisions.",
    go: "Browse the shelves",
    side: "above",
    paths: ["/resources/"],
  },
  {
    id: "study",
    label: "The Study",
    page: "The Curious Architect",
    showPage: true,
    href: "/blog/",
    blurb: "Articles about clearer systems and calmer technology decisions.",
    go: "Read the latest",
    side: "above",
    paths: ["/blog/"],
  },
  {
    id: "classroom",
    label: "The Classroom",
    page: "Code559",
    showPage: false,
    href: "/code559/",
    blurb:
      "Coding and AI tools for regular people, one course at a time. Start with the free Front-End Developer Course, or the guide to choosing the right AI tool.",
    go: "Go to Code559",
    side: "below",
    paths: ["/code559/"],
  },
];

/** The room a path belongs to, if any. The homepage, About, Contact, legal pages and the 404 page are not rooms. */
export const roomForPath = (path: string): Room | undefined =>
  rooms.find((room) => room.paths.some((prefix) => path.startsWith(prefix)));
