const configuredBase = import.meta.env.BASE_URL || "/";

export const basePath =
  configuredBase === "/" ? "" : configuredBase.replace(/\/$/, "");

export const sitePath = (path = "/") => {
  if (
    !path ||
    path.startsWith("#") ||
    path.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(path)
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (
    basePath &&
    (normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`))
  ) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
};

export const stripBase = (path: string) => {
  if (!basePath) return path;
  const stripped = path.startsWith(basePath) ? path.slice(basePath.length) : path;
  return stripped || "/";
};

const configuredSite = import.meta.env.SITE || "https://559solutions.com";

// Google Apps Script web app that records form submissions in a Google Sheet
// (the same endpoint as the "Notify me" form on the coming-soon page).
const formEndpoint =
  "https://script.google.com/macros/s/AKfycbzcwptrsBzbwFIcjNBwhYSCZxJvPrbFtnemWdxKNCXd_osP-vsE9S6E8pJqrTfxs--BZw/exec";

export const site = {
  siteName: "559 Solutions",
  siteDomain: configuredSite,
  canonicalHost: new URL(configuredSite).host,
  ownerName: "Joel Wells",
  // General address for website questions, including accessibility and privacy.
  publicEmail: "info@559solutions.com",
  contactFormEndpoint: formEndpoint,
  newsletterEndpoint: formEndpoint,
  formSuccessUrl: "",
  leadMagnetDeliveryUrl: "",
  schedulingUrl: "",
  linkedInUrl: "https://www.linkedin.com/in/jrw2july/",
  socialLinks: [] as Array<{ label: string; url: string }>,
  logoPath: "/images/559-solutions-logo-2026.png",
  faviconPath: "/images/559-icon-48.png",
  defaultSocialImage: "/images/og.png",
  antiSpamField: "company_website",
  checkoutProvider: {
    name: "",
    allowedOrigin: "",
  },
  analytics: {
    enabled: false,
    provider: "none" as "none" | "privacy" | "google" | "custom",
    siteId: "",
    scriptUrl: "",
  },
  // Fixed-scope first step on /services/ (2026-11-05). Nothing about it is built until `enabled` is true
  // AND all four fields are filled in, so a half-finished offer never shows. The owner sets every value:
  //   name        e.g. the session's name
  //   duration    how long it is, e.g. "90 minutes"
  //   deliverable what the client gets afterward, in one sentence
  //   price       the published price as it should read, e.g. "$000 (USD)"
  //   inquiry     the contact form's Inquiry type its button picks (a value from ContactForm.astro)
  entryOffer: {
    enabled: false,
    name: "",
    duration: "",
    deliverable: "",
    price: "",
    inquiry: "business-systems-clarity-session",
  },
  features: {
    courses: false,
    caseStudies: false,
    analytics: false,
  },
  productStatusOptions: [
    "available",
    "free",
    "coming soon",
    "early access",
    "by inquiry",
    "unavailable",
    "draft",
  ] as const,
} as const;

export const absoluteUrl = (path = "/") =>
  new URL(sitePath(path), `${site.siteDomain}/`).toString();

export const copyrightYear = new Date().getFullYear();
