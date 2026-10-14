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

// Header and footer menus. Resources and Services are left out for now (2026-10-14);
// their pages are unchanged. Resources is still linked from the homepage plan; Services has no menu link.
const hiddenFromHeader: string[] = ["/resources/", "/services/"];
export const headerNavigation = primaryNavigation.filter((item) => !hiddenFromHeader.includes(item.href));
