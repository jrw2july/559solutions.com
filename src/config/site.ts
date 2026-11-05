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
  // Owner and legal details for /terms/ and /privacy/ (2026-11-05). Only the owner can set these; none is
  // guessed. Each starts as a placeholder. While any value is still a placeholder, both pages show the
  // review banner and the build prints a warning with this file and line (scripts/check-legal.mjs).
  //   legalName          the business's legal name: the sole proprietor's name or the LLC's name
  //   businessAddress    a mailing address or PO box, on one line
  //   privacyEmail       the address for privacy requests, e.g. privacy@559solutions.com
  //   governingLawState  the U.S. state whose law governs the Terms, e.g. "California"
  //   venueCounty        the county for court cases, e.g. "Fresno County"
  //   refundPolicy       one or two plain sentences on refunds for digital products
  //   dataRetention      one or two plain sentences on how long form submissions are kept
  //   effectiveDate      the date both pages take effect, e.g. "December 1, 2026"
  //   emailTool          the tool used to send emails to people who sign up, e.g. "Gmail"
  //   hostingLogs        one sentence on what the web host logs and how long it keeps the logs
  //   gumroadPrivacyUrl  the address of Gumroad's privacy policy, checked in a browser
  legal: {
    legalName: "TODO-JR-LEGAL-NAME",
    businessAddress: "TODO-JR-ADDRESS",
    privacyEmail: "TODO-JR-PRIVACY-EMAIL",
    governingLawState: "TODO-JR-STATE",
    venueCounty: "TODO-JR-COUNTY",
    refundPolicy: "TODO-JR-REFUND",
    dataRetention: "TODO-JR-RETENTION",
    effectiveDate: "TODO-JR-DATE",
    emailTool: "TODO-JR-EMAIL-TOOL",
    hostingLogs: "TODO-JR-HOSTING-LOGS",
    gumroadPrivacyUrl: "TODO-JR-GUMROAD-PRIVACY-URL",
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

// A legal value is unset while it still starts with the placeholder prefix.
export const isLegalPlaceholder = (value: string) => value.startsWith("TODO-JR-");
export const legalPlaceholders = Object.values(site.legal).filter((value) => isLegalPlaceholder(value));
export const legalReady = legalPlaceholders.length === 0;
