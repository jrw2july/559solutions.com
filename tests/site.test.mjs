import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const dist = path.join(root, "dist");

test("required routes exist", async () => {
  const routes = [
    "index.html",
    "resources/index.html",
    "resources/ai-tool-selection-workbook/index.html",
    "services/index.html",
    "code559/index.html",
    "blog/index.html",
    "blog/the-hero-trap/index.html",
    "about/index.html",
    "contact/index.html",
    "privacy/index.html",
    "terms/index.html",
    "accessibility/index.html",
    "404.html",
  ];
  for (const route of routes) {
    await assert.doesNotReject(access(path.join(dist, route)), route);
  }
});

test("homepage communicates the core promise and the floor plan of the site", async () => {
  const html = await readFile(path.join(dist, "index.html"), "utf8");
  assert.match(html, /aria-label="Site map"/);
  for (const room of ["The Library", "The Study", "The Classroom"]) {
    assert.match(html, new RegExp(room), room);
  }
  assert.match(html, /C’mon in\./);
});

test("the free checklist is no longer promoted anywhere", async () => {
  const pages = ["index.html", "about/index.html", "resources/index.html", "blog/the-hero-trap/index.html"];
  for (const page of pages) {
    const html = await readFile(path.join(dist, page), "utf8");
    assert.doesNotMatch(html, /Free Checklist/i, page);
    assert.doesNotMatch(html, /ai-project-readiness-checklist/, page);
  }
  await assert.rejects(access(path.join(dist, "resources", "ai-project-readiness-checklist")));
});

test("forms post to the configured endpoint and never to an empty address", async () => {
  const contact = await readFile(path.join(dist, "contact", "index.html"), "utf8");
  const code559 = await readFile(path.join(dist, "code559", "index.html"), "utf8");
  const endpoint = /action="https:\/\/script\.google\.com\/[^"]+\/exec"/;
  assert.match(contact, endpoint);
  assert.match(contact, /data-ajax-form="contact-form"/);
  assert.match(code559, endpoint);
  assert.match(code559, /data-ajax-form="code559-coming-soon"/);
  assert.doesNotMatch(contact, /The online form is not active/);
  assert.doesNotMatch(contact, /action=""/);
});

test("only published articles (draft: false) are in the production blog", async () => {
  const blogRoot = path.join(dist, "blog");
  const entries = await readdir(blogRoot, { withFileTypes: true });
  const names = entries.map((entry) => entry.name);
  const articleRoot = path.join(dist, "..", "src", "content", "articles");
  const published = [];
  for (const entry of await readdir(articleRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const source = await readFile(path.join(articleRoot, entry.name), "utf8");
    if (/^draft:\s*false\s*$/m.test(source)) published.push(entry.name.replace(/\.md$/, ""));
  }
  // blog/category/ holds the category pages (2026-11-05), so no article may use the slug "category".
  // blog/category/ and blog/format/ hold list pages, so no article may use either slug.
  assert.deepEqual(names.filter((name) => !["index.html", "category", "format"].includes(name)).sort(), published.sort());
});

test("sitemap, RSS, robots, and Apache configuration use the canonical host", async () => {
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const rss = await readFile(path.join(dist, "rss.xml"), "utf8");
  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  const htaccess = await readFile(path.join(dist, ".htaccess"), "utf8");
  for (const content of [sitemap, rss, robots, htaccess]) {
    assert.match(content, /559solutions\.com/);
  }
  assert.match(htaccess, /RewriteCond %\{HTTPS\} !=on/);
  assert.match(htaccess, /Options -Indexes/);
  assert.match(htaccess, /Content-Security-Policy/);
});

test("blog categories are real links to static, noindex category pages", async () => {
  const blog = await readFile(path.join(dist, "blog", "index.html"), "utf8");
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const slugs = ["ai-without-the-hype", "systems-thinking", "small-business-tools", "builder-notes", "architects-notebook"];
  for (const slug of slugs) {
    assert.match(blog, new RegExp(`href="/blog/category/${slug}/"`), slug);
    const page = await readFile(path.join(dist, "blog", "category", slug, "index.html"), "utf8");
    assert.match(page, /<meta name="robots" content="noindex, nofollow">/, slug);
    assert.match(page, /aria-current="page"/, slug);
    assert.doesNotMatch(sitemap, new RegExp(`/blog/category/${slug}/`), slug);
  }
});

test("blog filters run live: no Apply button, results announced, problem links present", async () => {
  const blog = await readFile(path.join(dist, "blog", "index.html"), "utf8");
  assert.doesNotMatch(blog, /Apply filters/);
  assert.match(blog, /role="search"[^>]*hidden|hidden[^>]*role="search"/);
  assert.match(blog, /data-filter-status[^>]*role="status"|role="status"[^>]*data-filter-status/);
  assert.match(blog, /What are you trying to work through\?/);
  const resources = await readFile(path.join(dist, "resources", "index.html"), "utf8");
  assert.match(resources, /Apply filters/, "resources keeps its own filter form");
});

test("the decision-first pilot renders its lesson in place and keeps its source", async () => {
  const html = await readFile(path.join(dist, "blog", "start-with-the-decision-not-the-ai-tool", "index.html"), "utf8");
  assert.doesNotMatch(html, /ieia:/, "every lesson marker is replaced");
  for (const part of ["Introduce", "Explain", "Illustrate", "Apply"]) {
    assert.match(html, new RegExp(`class="ieia-kicker[^"]*"[^>]*>${part}<`), part);
  }
  assert.match(html, /What fails first when a team starts with the product\?/);
  assert.match(html, /<figure class="ieia-example">/);
  for (const field of ["decision", "owner", "evidence", "human", "experiment", "measure"]) {
    assert.match(html, new RegExp(`id="decision-brief-${field}"`), field);
  }
  // The worksheet sits between the checklist and the closing section.
  assert.ok(html.indexOf('id="a-short-decision-first-checklist"') < html.indexOf('id="lesson-apply"'));
  assert.ok(html.indexOf('id="lesson-apply"') < html.indexOf('id="the-practical-test"'));
  assert.match(html, /href="https:\/\/www\.nist\.gov\/itl\/ai-risk-management-framework"/);
  await assert.rejects(access(path.join(dist, "ieia-demo")), "the component demo page is gone");
});

test("email signup: one tagged form at every article end, and on /subscribe/", async () => {
  const endpoint = /action="https:\/\/script\.google\.com\/[^"]+\/exec"/;
  const articles = (await readdir(path.join(dist, "blog"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !["category", "format"].includes(entry.name))
    .map((entry) => entry.name);
  for (const slug of articles) {
    const html = await readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`name="source" value="newsletter:article-end-${slug}"`), slug);
    assert.match(html, endpoint, slug);
    // One signup per article (2026-11-05): the "Want the next one?" form after Apply is gone.
    assert.equal((html.match(/<section class="newsletter-card"/g) || []).length, 1, `${slug}: one signup form`);
    assert.doesNotMatch(html, /Want the next one\?/, slug);
  }
  const pilot = await readFile(path.join(dist, "blog", "start-with-the-decision-not-the-ai-tool", "index.html"), "utf8");
  // No signup form holds a worksheet box: every <form> that posts is free of <textarea>.
  for (const form of pilot.match(/<form[^>]*action="https:[\s\S]*?<\/form>/g) || []) {
    assert.doesNotMatch(form, /<textarea/);
  }
  const subscribe = await readFile(path.join(dist, "subscribe", "index.html"), "utf8");
  assert.match(subscribe, /name="source" value="newsletter:subscribe-page"/);
  assert.match(subscribe, /href="\/rss\.xml"/);
  assert.doesNotMatch(subscribe, /type="checkbox"[^>]*checked/, "consent is never preselected");
  const home = await readFile(path.join(dist, "index.html"), "utf8");
  assert.match(home, /href="\/subscribe\/"/, "footer links to /subscribe/");
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  assert.match(sitemap, /\/subscribe\//);
});

test("every article ends with a Work with me band that opens the matching inquiry", async () => {
  const contact = await readFile(path.join(dist, "contact", "index.html"), "utf8");
  const articleRoot = path.join(root, "src", "content", "articles");
  for (const entry of await readdir(articleRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const source = await readFile(path.join(articleRoot, entry.name), "utf8");
    if (!/^draft:\s*false\s*$/m.test(source)) continue;
    const slug = entry.name.replace(/\.md$/, "");
    const service = /^service:\s*"([^"]+)"/m.exec(source)?.[1];
    assert.ok(service, `${slug} names a service`);
    assert.match(contact, new RegExp(`<option value="${service}">`), `${service} is a contact option`);
    const html = await readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
    assert.match(html, /id="work-with-me-heading"/, slug);
    assert.match(html, new RegExp(`href="/contact/\\?inquiry=${service}"`), slug);
    assert.doesNotMatch(html, /Explore Practical Resources/, slug);
  }
});

test("the entry offer stays out of the build until the owner fills it in", async () => {
  const services = await readFile(path.join(dist, "services", "index.html"), "utf8");
  assert.doesNotMatch(services, /entry-offer|Fixed-scope first step/);
  const contact = await readFile(path.join(dist, "contact", "index.html"), "utf8");
  assert.match(contact, /<option value="systems-clarity-sprint">/, "the Services sprint link has a matching option");
});

test("every link to a coming-soon resource lands on a page with a waitlist form", async () => {
  const resourceRoot = path.join(root, "src", "content", "resources");
  const comingSoon = [];
  for (const entry of await readdir(resourceRoot)) {
    const source = await readFile(path.join(resourceRoot, entry), "utf8");
    if (/^availability:\s*"coming soon"/m.test(source) && /^draft:\s*false/m.test(source)) {
      comingSoon.push(/^slug:\s*"([^"]+)"/m.exec(source)[1]);
    }
  }
  assert.ok(comingSoon.length > 0);
  for (const slug of comingSoon) {
    const html = await readFile(path.join(dist, "resources", slug, "index.html"), "utf8");
    assert.match(html, /<section class="newsletter-card" id="waitlist"/, slug);
    assert.match(html, /name="source" value="waitlist:/, slug);
  }
  for (const slug of ["the-simplest-useful-architecture-diagram", "what-architects-should-document"]) {
    const html = await readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
    assert.match(html, /href="\/resources\/solution-architect-starter-kit\/#waitlist"/, slug);
  }
});

test("the three process articles each render one primary lesson exercise", async () => {
  const read = (slug) => readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
  const expected = {
    "how-to-run-a-better-discovery-meeting": /data-worksheet="discovery-worksheet"/,
    "when-a-process-depends-on-one-person": /data-selfcheck="dependency-check"/,
    "why-good-processes-fail": /id="rehearse-absence"/,
  };
  for (const [slug, marker] of Object.entries(expected)) {
    const html = await read(slug);
    assert.doesNotMatch(html, /ieia:/, `${slug}: markers replaced`);
    assert.match(html, marker, slug);
    assert.equal((html.match(/id="lesson-apply"/g) || []).length, 1, `${slug}: one Apply step`);
    assert.match(html, /<details class="article-fold ieia-deeper" id="lesson-deeper">/, `${slug}: Go deeper, closed`);
    assert.doesNotMatch(html, /id="lesson-deeper" open/, `${slug}: Go deeper starts closed`);
    assert.match(html, /name="source" value="newsletter:/, slug);
  }
  // The self-check shows no number or score anywhere in its markup.
  const check = (await read("when-a-process-depends-on-one-person")).match(/<div class="selfcheck"[\s\S]*?Your answers are not sent/)[0];
  assert.doesNotMatch(check.replace(/<[^>]+>/g, " "), /\d|%|score/i);
});

test("chess and science-fiction lessons render, with a labeled diagram and unchanged sources", async () => {
  const chess = await readFile(path.join(dist, "blog", "what-chess-teaches-about-technology-decisions", "index.html"), "utf8");
  const scifi = await readFile(path.join(dist, "blog", "science-fiction-and-architecture-of-consequences", "index.html"), "utf8");
  for (const html of [chess, scifi]) {
    assert.doesNotMatch(html, /ieia:/);
    assert.equal((html.match(/id="lesson-apply"/g) || []).length, 1);
    assert.match(html, /id="lesson-deeper"/);
  }
  assert.match(chess, /<form class="ieia-call" id="chess-call"/);
  // Both diagram layouts are labeled images with a title and description; no inline styles.
  assert.equal((chess.match(/<svg class="trade-diagram-(wide|tall)"[^>]*role="img"/g) || []).length, 2);
  assert.match(chess, /<title id="lesson-diagram-wide-title">/);
  assert.match(chess, /<desc id="lesson-diagram-wide-desc">/);
  assert.match(chess, /href="https:\/\/www\.sec\.gov\/Archives\/edgar\/data\/1018724\/000119312516530910\/d168744dex991\.htm"/);
  assert.match(scifi, /data-worksheet="consequence-chain"/);
  assert.match(scifi, /href="https:\/\/quoteinvestigator\.com\/2019\/10\/23\/traffic\/"/);
  assert.match(scifi, /href="https:\/\/en\.wikipedia\.org\/wiki\/The_Machine_Stops"/);
});

test("the reading sequence chains from step 1 to the last with no dead end, and labels match exercises", async () => {
  const order = [
    "how-to-run-a-better-discovery-meeting",
    "what-architects-should-document",
    "the-simplest-useful-architecture-diagram",
    "when-a-process-depends-on-one-person",
    "why-good-processes-fail",
    "the-hero-trap",
  ];
  for (const [i, slug] of order.entries()) {
    const html = await readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`Step ${i + 1} of ${order.length}`), slug);
    const target = i + 1 < order.length ? order[i + 1] : order[0];
    assert.match(html, new RegExp(`class="series-next-link" href="/blog/${target}/"`), `${slug} links on`);
    await assert.doesNotReject(access(path.join(dist, "blog", target, "index.html")));
  }
  const pilot = await readFile(path.join(dist, "blog", "start-with-the-decision-not-the-ai-tool", "index.html"), "utf8");
  assert.doesNotMatch(pilot, /series-next/, "articles outside a series have no Next block");
  // Format labels on the index only where the article has that exercise.
  const index = await readFile(path.join(dist, "blog", "index.html"), "utf8");
  const cards = index.match(/<article class="card article-card"[\s\S]*?<\/article>/g);
  assert.equal(cards.length, 10);
  for (const card of cards) {
    const hasLabel = /class="article-format"/.test(card);
    // Astro writes an empty attribute without a value, so a missing value means "no format".
    const format = /data-format(?:="([^"]*)")?/.exec(card)?.[1] ?? "";
    assert.equal(hasLabel, format !== "", card.slice(0, 120));
  }
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  for (const format of ["worksheet", "self-check", "scenario"]) {
    const page = await readFile(path.join(dist, "blog", "format", format, "index.html"), "utf8");
    assert.match(page, /noindex/);
    assert.doesNotMatch(sitemap, new RegExp(`/blog/format/${format}/`));
  }
  assert.match(index, /<select id="filter-format"/);
});

test("every published article now has one lesson exercise, and the pilot has Go deeper", async () => {
  const articleRoot = path.join(root, "src", "content", "articles");
  for (const entry of await readdir(articleRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const source = await readFile(path.join(articleRoot, entry.name), "utf8");
    if (!/^draft:\s*false\s*$/m.test(source)) continue;
    const slug = entry.name.replace(/\.md$/, "");
    const html = await readFile(path.join(dist, "blog", slug, "index.html"), "utf8");
    assert.equal((html.match(/id="lesson-apply"/g) || []).length, 1, `${slug}: one Apply step`);
    assert.match(html, /id="lesson-deeper"/, `${slug}: Go deeper`);
    assert.doesNotMatch(html, /ieia:/, `${slug}: markers replaced`);
    assert.doesNotMatch(html, /style="/, `${slug}: no inline styles`);
  }
  const diagram = await readFile(path.join(dist, "blog", "the-simplest-useful-architecture-diagram", "index.html"), "utf8");
  assert.equal((diagram.match(/<svg class="context-diagram-(wide|tall)"[^>]*role="img"/g) || []).length, 2);
  assert.match(diagram, /href="https:\/\/c4model\.com\/"/, "C4 citation unchanged");
  const record = await readFile(path.join(dist, "blog", "what-architects-should-document", "index.html"), "utf8");
  assert.match(record, /data-worksheet="decision-record"/);
  assert.match(record, /cognitect\.com\/blog\/2011\/11\/15\/documenting-architecture-decisions/, "Nygard citation unchanged");
});

test("measurement stays a no-op: no analytics script, no assertive live regions, and track() only knows five events", async () => {
  const script = await readFile(path.join(root, "public", "scripts", "site.js"), "utf8");
  assert.match(script, /const TRACK_EVENTS = \["article_open", "exercise_start", "exercise_complete", "output_copy", "next_step_click"\]/);
  assert.equal((script.match(/fetch\(/g) || []).length, 1, "the form sender is the only fetch");
  const files = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".html")) files.push(full);
    }
  };
  await walk(dist);
  for (const file of files) {
    const html = await readFile(file, "utf8");
    assert.doesNotMatch(html, /googletagmanager|plausible\.io|usefathom|goatcounter|matomo/, file);
    assert.doesNotMatch(html, /role="alert"|aria-live="assertive"/, file);
  }
});

// Release 1 (2026-11-05): the Code559 packets are easy to find and buy, and Services is in the header.
test("packet prices and links come from one data file and appear where they should", async () => {
  const packets = await import(path.join(root, "src", "data", "code559-packets.mjs"));
  assert.equal(packets.prices.single, "$8.99");
  assert.equal(packets.prices.bundle, "$89");
  assert.equal(packets.prices.separateTotal, "$116.87");
  assert.equal(packets.paidCount, 13);
  assert.equal(packets.bundleSavingsPercent, 24);
  assert.equal(packets.bundleUrl, "https://code559.gumroad.com/l/all-packets");

  // The synced lessons carry their own packet links; they must match the data file.
  for (const packet of packets.modulePackets) {
    const slug = new URL(packet.url).pathname.split("/").pop();
    const lesson = await readFile(path.join(root, "src", "content", "code559", `${slug}.md`), "utf8");
    assert.ok(lesson.includes(`href="${packet.url}"`), `${slug} links its packet at ${packet.url}`);
  }

  const course = await readFile(path.join(dist, "code559", "front-end-developer", "index.html"), "utf8");
  assert.match(course, /<aside class="packet-note" id="packets"/);
  assert.ok(course.indexOf('id="packets"') < course.indexOf('id="the-modules"'), "packet note sits before the module table");
  assert.match(course, /href="https:\/\/code559\.gumroad\.com\/l\/all-packets"[^>]*>Get all 13 packets: \$89<span class="visually-hidden"> \(opens in a new tab\)/);
  assert.match(course, /href="https:\/\/code559\.gumroad\.com\/l\/all-packets"[^>]*>See the packets/);
  assert.match(course, /href="https:\/\/code559\.gumroad\.com"[^>]*>Buy a single packet/);
  assert.match(course, /\$116\.87/);

  const home = await readFile(path.join(dist, "index.html"), "utf8");
  const available = home.match(/<section class="section-compact available-now"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(available, /\$89 for all 13, or \$8\.99 each/);
  assert.match(available, /href="\/code559\/front-end-developer\/#packets"/);
  assert.doesNotMatch(available, /gumroad/, "home links to the packet note, not the store");
  assert.ok(home.indexOf('class="walled plan"') < home.indexOf("available-now"), "after the rooms");
  assert.ok(home.indexOf("available-now") < home.indexOf("From the Study"), "before From the Study");

  const index = await readFile(path.join(dist, "code559", "index.html"), "utf8");
  assert.match(index, /<a href="\/code559\/front-end-developer\/#packets">Optional packets with the full project<\/a>: \$8\.99 each, or \$89 for all 13\./);

  // Every Gumroad link in the build opens in a new tab and says so.
  for (const file of ["index.html", "code559/index.html", "code559/front-end-developer/index.html", "resources/index.html"]) {
    const html = await readFile(path.join(dist, file), "utf8");
    for (const link of html.match(/<a [^>]*gumroad[\s\S]*?<\/a>/g) || []) {
      assert.match(link, /target="_blank"/, link);
      assert.match(link, /rel="noopener/, link);
      assert.match(link, /\(opens in a new tab\)/, link);
    }
  }
});

test("Resources lists the packets first, as available and priced; coming-soon items stay unpriced", async () => {
  const html = await readFile(path.join(dist, "resources", "index.html"), "utf8");
  const cards = html.match(/<article class="card resource-card"[\s\S]*?<\/article>/g) || [];
  assert.ok(cards.length >= 2);
  const [first, ...rest] = cards;
  assert.match(first, /Code559 Front-End Developer Packets/);
  assert.match(first, /data-category="courses and walkthroughs"/);
  assert.match(first, /data-audience="[^"]*adult beginners[^"]*"/);
  assert.match(first, /data-audience="[^"]*technical builders[^"]*"/);
  assert.match(first, /status-available/);
  assert.match(first, /<span class="price">\$89 for all 13, or \$8\.99 each<\/span>/);
  assert.match(first, /href="\/code559\/front-end-developer\/"[^>]*aria-label="View details for/);
  assert.match(first, /href="https:\/\/code559\.gumroad\.com\/l\/all-packets"[^>]*>Get all 13 packets: \$89/);
  for (const card of rest) {
    assert.match(card, /status-coming-soon/);
    assert.doesNotMatch(card, /class="price"|\$\d/, "coming-soon items show no price");
  }
});

test("Services is in the desktop header and the mobile menu on every page", async () => {
  const pages = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".html")) pages.push(full);
    }
  };
  await walk(dist);
  for (const file of pages) {
    const html = await readFile(file, "utf8");
    if (!html.includes('class="site-header"')) continue;
    const desktop = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
    const mobile = html.match(/<details class="mobile-nav"[\s\S]*?<\/details>/)?.[0] ?? "";
    for (const nav of [desktop, mobile]) {
      assert.match(nav, /<a href="\/services\/"[^>]*>Services<\/a>/, file);
      for (const label of ["The Curious Architect", "The Classroom", "About 559", "Contact Us"]) assert.match(nav, new RegExp(label), file);
    }
    assert.match(html, /<a href="\/code559\/front-end-developer\/#packets">Code559 packets<\/a>/, `${file}: footer link`);
  }
});
