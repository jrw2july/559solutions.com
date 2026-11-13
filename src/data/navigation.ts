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

// Header and footer menus. Services is turned off (2026-11-13): no menu, page, or sitemap entry links to it.
// Its page still builds at /services/ so the URL works for testing and sharing. Remove it from this list
// to turn it back on everywhere.
const unlisted: string[] = ["/services/"];
export const headerNavigation = primaryNavigation.filter((item) => !unlisted.includes(item.href));
export const footerNavigation = primaryNavigation.filter((item) => !unlisted.includes(item.href));
