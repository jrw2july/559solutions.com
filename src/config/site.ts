export const site = {
  siteName: "559 Solutions",
  siteDomain: "https://559solutions.com",
  canonicalHost: "559solutions.com",
  ownerName: "Joel Wells",
  publicEmail: "",
  contactFormEndpoint: "",
  newsletterEndpoint: "",
  formSuccessUrl: "",
  leadMagnetDeliveryUrl: "",
  schedulingUrl: "",
  linkedInUrl: "",
  socialLinks: [] as Array<{ label: string; url: string }>,
  logoPath: "/images/559-solutions-logo.png",
  faviconPath: "/images/559-solutions-logo.png",
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
  new URL(path, site.siteDomain).toString();

export const copyrightYear = new Date().getFullYear();
