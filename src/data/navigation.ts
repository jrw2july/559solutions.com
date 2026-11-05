export const primaryNavigation = [
  { label: "Resources", href: "/resources/" },
  { label: "Services", href: "/services/" },
  { label: "The Curious Architect", href: "/blog/" },
  { label: "Code559", href: "/code559/" },
  { label: "About 559", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
] as const;

export const legalNavigation = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
] as const;

// Header and footer menus. Resources is left out of the header for now (2026-10-14); it is listed in the
// footer drawing index and is a room on the homepage plan. Services is back in the header (2026-11-05).
const hiddenFromHeader: string[] = ["/resources/"];
export const headerNavigation = primaryNavigation.filter((item) => !hiddenFromHeader.includes(item.href));
