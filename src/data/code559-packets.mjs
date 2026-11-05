// Code559 Front-End Developer Course packets (2026-11-05): the one place for packet prices and links.
// Checked against the live Gumroad store on November 5, 2026. Every page that shows a packet price or
// a packet link reads it from here (home "Available now", the course page note, the Code559 card,
// Resources and the footer), so a price change is one edit. Plain .mjs so astro.config.mjs can read it.
// The module lessons themselves are synced copies from the Code559 repository and carry their own
// packet links; tests/site.test.mjs checks that they match the URLs below.

/** Price of one paid module packet, in US dollars. */
export const singlePrice = 8.99;
/** Price of the All Packets bundle (Modules 1-13), in US dollars. */
export const bundlePrice = 89;

export const storefrontUrl = "https://code559.gumroad.com";
export const bundleUrl = "https://code559.gumroad.com/l/all-packets";

/** Where the site explains the packets: the note near the top of the course page. */
export const packetNotePath = "/code559/front-end-developer/#packets";
export const coursePath = "/code559/front-end-developer/";

/** What each packet adds to the free lesson, per the Gumroad listing. */
export const packetContents = [
  "the full project",
  "the finishing work in Git",
  "the full lesson ready to print",
  "a self-assessment with the answers",
];
export const packetFormats = "a PDF and an EPUB";
/** "the full project, the finishing work in Git, the full lesson ready to print, and a self-assessment with the answers" */
export const packetContentsText = `${packetContents.slice(0, -1).join(", ")}, and ${packetContents.at(-1)}`;

/** One packet per module. Module 0 is free; the rest are sold one at a time or in the bundle. */
export const modulePackets = [
  { module: 0, title: "Setup", url: "https://code559.gumroad.com/l/module-00-setup", free: true },
  { module: 1, title: "HTML Foundations", url: "https://code559.gumroad.com/l/module-01-html-foundations" },
  { module: 2, title: "CSS Foundations", url: "https://code559.gumroad.com/l/module-02-css-foundations" },
  { module: 3, title: "Responsive Layout", url: "https://code559.gumroad.com/l/module-03-responsive-layout" },
  { module: 4, title: "Forms and Accessibility", url: "https://code559.gumroad.com/l/module-04-forms-accessibility" },
  { module: 5, title: "JavaScript Primer", url: "https://code559.gumroad.com/l/module-05-javascript-primer" },
  { module: 6, title: "JavaScript Language Foundations", url: "https://code559.gumroad.com/l/module-06-language-foundations" },
  { module: 7, title: "Functions", url: "https://code559.gumroad.com/l/module-07-functions" },
  { module: 8, title: "Arrays, Loops, and Objects", url: "https://code559.gumroad.com/l/module-08-arrays-loops-objects" },
  { module: 9, title: "DOM and Events", url: "https://code559.gumroad.com/l/module-09-dom-events" },
  { module: 10, title: "Forms and Validation with JavaScript", url: "https://code559.gumroad.com/l/module-10-forms-validation" },
  { module: 11, title: "Debugging and Testing", url: "https://code559.gumroad.com/l/module-11-debugging-testing" },
  { module: 12, title: "Git/GitHub and Publishing", url: "https://code559.gumroad.com/l/module-12-git-github" },
  { module: 13, title: "Capstone", url: "https://code559.gumroad.com/l/module-13-capstone" },
];

export const freePacket = modulePackets.find((packet) => packet.free);
/** Number of paid packets, which is also the number in the bundle (13). */
export const paidCount = modulePackets.filter((packet) => !packet.free).length;

/** "$8.99", "$89", "$116.87": whole dollars without cents, otherwise two decimals. */
export const formatPrice = (amount) =>
  `$${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

/** The paid packets bought one at a time: 13 x $8.99 = $116.87 (rounded to the cent). */
export const separateTotal = Math.round(singlePrice * paidCount * 100) / 100;
/** How much less the bundle costs, in whole percent: 1 - 89 / 116.87 = 23.85%, shown as 24%. */
export const bundleSavingsPercent = Math.round((1 - bundlePrice / separateTotal) * 100);

export const prices = {
  single: formatPrice(singlePrice),
  bundle: formatPrice(bundlePrice),
  separateTotal: formatPrice(separateTotal),
};

/** Short price line used on cards and blocks: "$89 for all 13, or $8.99 each". */
export const priceSummary = `${prices.bundle} for all ${paidCount}, or ${prices.single} each`;
/** Label of the main bundle link: "Get all 13 packets: $89". */
export const bundleLinkLabel = `Get all ${paidCount} packets: ${prices.bundle}`;
