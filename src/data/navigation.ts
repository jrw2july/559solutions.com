export const primaryNavigation = [
  // Services link commented out on all pages (2026-11-18, owner request). The /services/ page itself still exists.
  // { label: "Services", href: "/services/" },
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

// Header and footer menus. Services was left out of the header on 2026-10-14 and out of the
// footer on 2026-11-18 (see above); its page is unchanged.
const hiddenFromHeader: string[] = ["/services/"];
export const headerNavigation = primaryNavigation.filter((item) => !hiddenFromHeader.includes(item.href));
