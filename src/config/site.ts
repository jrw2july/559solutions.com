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
  publicEmail: "",
  contactFormEndpoint: formEndpoint,
  newsletterEndpoint: formEndpoint,
  formSuccessUrl: "",
  leadMagnetDeliveryUrl: "",
  schedulingUrl: "",
  linkedInUrl: "",
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
