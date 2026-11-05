export const primaryNavigation = [
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

// Header and footer menus. Services is left out of the header for now (2026-10-14);
// its page is unchanged and it is listed in the footer drawing index.
const hiddenFromHeader: string[] = ["/services/"];
export const headerNavigation = primaryNavigation.filter((item) => !hiddenFromHeader.includes(item.href));
