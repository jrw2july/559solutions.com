const normalize = (value) => String(value || "").trim().toLowerCase();

// Measurement (2026-11-05). track(eventName, props) is a no-op on the live site: no analytics tool is
// enabled (src/config/site.ts, analytics.enabled is false), and none may be added without the owner's
// approval and a Privacy page update. It accepts only the five events below and only the props "slug"
// and "module"; anything else is dropped before a payload exists, so field text, answers and email
// addresses can never pass through. It respects Do Not Track and Global Privacy Control. On localhost
// it logs each payload to the console so the shape can be checked.
// To wire a provider later: inside track(), after the dev log, call the provider with `payload`
// (for example window.plausible?.(payload.event, { props: payload })) and nothing else.
const TRACK_EVENTS = ["article_open", "exercise_start", "exercise_complete", "output_copy", "next_step_click"];
const track = (eventName, props = {}) => {
  if (!TRACK_EVENTS.includes(eventName)) return;
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true) return;
  const payload = { event: eventName, slug: window.location.pathname.split("/").filter(Boolean).pop() || "home" };
  if (typeof props.module === "string" && /^[a-z0-9-]+$/.test(props.module)) payload.module = props.module;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) console.debug("track", payload);
  // No provider is enabled: the payload goes nowhere.
};

// Article pages: one article_open per load. The Apply step reports exercise_start on the first input.
if (document.querySelector("article.article-content") && /^\/blog\/[^/]+\/$/.test(window.location.pathname)) {
  track("article_open");
}
const applyStep = document.querySelector("#lesson-apply");
if (applyStep) {
  const moduleId = applyStep.querySelector("[data-worksheet], [data-selfcheck], .ieia-steps, .ieia-call")?.id;
  const started = () => {
    track("exercise_start", { module: moduleId });
    applyStep.removeEventListener("input", started);
    applyStep.removeEventListener("change", started);
  };
  applyStep.addEventListener("input", started);
  applyStep.addEventListener("change", started);
}
document.querySelectorAll(".series-next-link").forEach((link) => {
  link.addEventListener("click", () => track("next_step_click"));
});

// Category slugs, built the same way as src/data/blog-categories.ts: lower case, no apostrophes, hyphens.
const slugify = (value) =>
  normalize(value).replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

document.querySelectorAll("[data-filter-list]").forEach((list) => {
  const form = list.querySelector("[data-filter-form]");
  const cards = [...list.querySelectorAll("[data-filter-card]")];
  const emptyState = list.querySelector("[data-empty-state]");
  const status = list.querySelector("[data-filter-status]");

  if (!form || cards.length === 0) return;

  // Blog mode (/blog/): live filtering, category links that filter in place, and category and tag kept
  // in the URL. Search text is never put in the URL, so it is not sent to the server or to analytics.
  const live = form.hasAttribute("data-live");
  const searchInput = form.querySelector("[data-filter-search]");
  const categorySelect = form.querySelector("[data-filter-category]");
  const secondarySelect = form.querySelector("[data-filter-secondary]");
  const formatSelect = form.querySelector("[data-filter-format]");
  const categoryLinks = [...list.querySelectorAll("[data-category-link]")];

  const optionText = (select) => select?.selectedOptions[0]?.textContent?.trim() || "";

  const syncUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    const category = categorySelect?.value ? slugify(categorySelect.value) : "";
    const tag = secondarySelect?.value || "";
    if (category) url.searchParams.set("category", category);
    else url.searchParams.delete("category");
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    const format = formatSelect?.value || "";
    if (format) url.searchParams.set("format", format);
    else url.searchParams.delete("format");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  };

  const markCategoryLinks = () => {
    const current = categorySelect?.value ? slugify(categorySelect.value) : "";
    categoryLinks.forEach((link) => {
      const slug = link.dataset.categoryLink || "";
      if (slug === current) link.setAttribute("aria-current", current ? "true" : "page");
      else link.removeAttribute("aria-current");
    });
  };

  const applyFilters = () => {
    const search = normalize(searchInput?.value);
    const category = normalize(categorySelect?.value);
    const secondary = normalize(secondarySelect?.value);
    const secondaryAttribute = form.dataset.secondaryAttribute || "topics";
    const format = normalize(formatSelect?.value);
    let visible = 0;

    cards.forEach((card) => {
      const matchesSearch = !search || normalize(card.dataset.search).includes(search);
      const matchesCategory = !category || normalize(card.dataset.category) === category;
      const matchesSecondary =
        !secondary || normalize(card.dataset[secondaryAttribute]).includes(secondary);
      const matchesFormat = !format || normalize(card.dataset.format) === format;
      const matches = matchesSearch && matchesCategory && matchesSecondary && matchesFormat;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
    if (status && live) {
      const noun = visible === 1 ? form.dataset.nounSingular : form.dataset.nounPlural;
      let message = `Showing ${visible} ${noun}`;
      if (category) message += ` in ${optionText(categorySelect)}`;
      if (secondary) message += ` tagged ${optionText(secondarySelect)}`;
      if (format) message += ` in ${optionText(formatSelect)} format`;
      if (search) message += ` matching "${searchInput.value.trim()}"`;
      status.textContent = `${message}.`;
    } else if (status) {
      status.textContent = `${visible} ${visible === 1 ? "item" : "items"} shown`;
    }

    if (live) {
      syncUrl();
      markCategoryLinks();
    }
  };

  if (live) {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categorySelect) {
      const option = [...categorySelect.options].find((item) => item.value && slugify(item.value) === categoryParam);
      if (option) categorySelect.value = option.value;
    }
    const tagParam = normalize(params.get("tag"));
    if (tagParam && secondarySelect) {
      const option = [...secondarySelect.options].find((item) => item.value === tagParam);
      if (option) secondarySelect.value = option.value;
    }
    const formatParam = normalize(params.get("format"));
    if (formatParam && formatSelect) {
      const option = [...formatSelect.options].find((item) => item.value === formatParam);
      if (option) formatSelect.value = option.value;
    }

    categoryLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        // Let a new-tab or new-window click open the category page as usual.
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!categorySelect) return;
        const slug = link.dataset.categoryLink || "";
        const option = [...categorySelect.options].find((item) => (item.value ? slugify(item.value) : "") === slug);
        if (!option) return;
        event.preventDefault();
        categorySelect.value = option.value;
        applyFilters();
      });
    });

    form.querySelector("[data-filter-clear]")?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "";
      if (secondarySelect) secondarySelect.value = "";
      if (formatSelect) formatSelect.value = "";
      applyFilters();
    });
  }

  form.addEventListener("input", applyFilters);
  form.addEventListener("change", applyFilters);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
  });
  form.addEventListener("reset", () => window.setTimeout(applyFilters, 0));
  applyFilters();
});

document.querySelectorAll("[data-ajax-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const honeypot = form.querySelector(
      'input[name="company_website"], input[name$="website"]',
    );
    if (honeypot?.value) {
      if (status) status.textContent = "Unable to submit this request.";
      return;
    }

    const originalLabel = submit?.textContent;
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending…";
    }
    if (status) status.textContent = "Sending your request.";

    try {
      // The endpoint is a Google Apps Script web app. It sends no CORS headers, so the
      // reply cannot be read: post JSON as text/plain with no-cors and treat a request
      // that does not throw as delivered (the script validates the data itself).
      const data = Object.fromEntries(new FormData(form));
      delete data.company_website;
      data.source = form.dataset.ajaxForm;
      data.page = window.location.pathname;
      await fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });

      const successUrl = form.dataset.successUrl;
      if (status) {
        status.textContent =
          form.dataset.successMessage || "Thank you. Your request was received.";
      }
      form.reset();
      if (successUrl) window.location.assign(successUrl);
    } catch {
      if (status) {
        status.textContent =
          "Your request could not be sent. Please try again.";
      }
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
    }
  });
});

const inquiry = new URLSearchParams(window.location.search).get("inquiry");
const inquirySelect = document.querySelector("#contact-inquiry");
if (inquiry && inquirySelect) {
  const option = [...inquirySelect.options].find((item) => item.value === inquiry);
  if (option) inquirySelect.value = inquiry;
}

// IEIA lessons (The Curious Architect). Reader answers stay in this browser: nothing below sends them
// anywhere. They leave only through Copy (the clipboard) or Print, which the reader starts.
document.querySelectorAll("[data-js-only]").forEach((element) => {
  element.hidden = false;
});

document.querySelectorAll("[data-ieia-call]").forEach((form) => {
  const status = form.querySelector("[data-ieia-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const chosen = form.querySelector('input[type="radio"]:checked');
    if (!status) return;
    if (!chosen) {
      status.textContent = "Choose an answer first.";
      return;
    }
    const label = form.querySelector(`label[for="${chosen.id}"]`)?.textContent?.trim() || "";
    const verdict = chosen.dataset.correct === "true" ? "Correct:" : "Not quite:";
    status.textContent = `${verdict} ${label} ${chosen.dataset.feedback || ""}`.trim();
    // A single question completes on check; a stepped scenario completes on its last step.
    const steps = form.closest(".ieia-steps");
    if (!steps || steps.querySelector(".ieia-call:last-of-type") === form) {
      track("exercise_complete", { module: steps?.id || form.id });
    }
  });
});

const readStore = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const writeStore = (key, value) => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

// The page is served over HTTPS, so the Clipboard API is available. If it is refused, the reader is told.
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Worksheets. A field is a text box, or (2026-11-05) a comparison grid: a <table> of labeled text boxes.
// Every box has a name, so Save, Start over and Copy treat both kinds the same way.
const markdownCell = (value) => value.trim().replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|");

document.querySelectorAll("[data-worksheet]").forEach((form) => {
  const items = [...form.querySelectorAll("[data-worksheet-item]")];
  const boxes = [...form.querySelectorAll("textarea[name], input[type='text'][name]")];
  const status = form.querySelector("[data-worksheet-status]");
  const save = form.querySelector("[data-worksheet-save]");
  const printCopy = form.querySelector("[data-worksheet-print]");
  const storeKey = `ieia:${window.location.pathname}:${form.dataset.worksheet}`;
  const title = form.dataset.worksheetTitle || "Worksheet";
  const headings = form.dataset.worksheetFormat === "headings";
  const say = (message) => {
    if (status) status.textContent = message;
  };

  const values = () => Object.fromEntries(boxes.map((box) => [box.name, box.value]));
  const persist = () => {
    if (save?.checked) writeStore(storeKey, JSON.stringify(values()));
  };

  const stored = readStore(storeKey);
  if (stored && save) {
    try {
      const data = JSON.parse(stored);
      boxes.forEach((box) => {
        if (typeof data[box.name] === "string") box.value = data[box.name];
      });
      save.checked = true;
    } catch {
      writeStore(storeKey, null);
    }
  }

  form.addEventListener("input", persist);

  save?.addEventListener("change", () => {
    if (save.checked) {
      say(writeStore(storeKey, JSON.stringify(values()))
        ? "Saved on this device."
        : "This browser does not allow saving. Your answers are still on the page.");
    } else {
      writeStore(storeKey, null);
      say("Removed from this device.");
    }
  });

  // A grid as rows of plain text: the tool names first, then one row per check.
  const gridRows = (table) => {
    const tools = [...table.querySelectorAll("[data-grid-tool]")].map(
      (input) => input.value.trim() || `Tool ${input.dataset.gridTool}`,
    );
    const rows = [...table.querySelectorAll("tbody tr")].map((row) => ({
      label: row.dataset.gridRow || "",
      cells: [...row.querySelectorAll("input")].map((input) => input.value.trim()),
    }));
    return { tools, rows };
  };
  const itemLabel = (item) => [item.dataset.number, item.dataset.label].filter(Boolean).join(" ");

  const markdown = () => {
    const lines = [`## ${title}`, ""];
    items.forEach((item) => {
      lines.push(headings ? `### ${itemLabel(item)}` : `**${itemLabel(item)}**`, "");
      const table = item.querySelector("[data-worksheet-grid]");
      if (table) {
        const { tools, rows } = gridRows(table);
        lines.push(`| | ${tools.map(markdownCell).join(" | ")} |`, `|---|${tools.map(() => "---").join("|")}|`);
        rows.forEach((row) => lines.push(`| ${markdownCell(row.label)} | ${row.cells.map((cell) => markdownCell(cell) || " ").join(" | ")} |`));
        lines.push("");
      } else {
        lines.push(item.querySelector("textarea")?.value.trim() || "_(blank)_", "");
      }
    });
    return lines.join("\n").trim() + "\n";
  };

  form.querySelector("[data-worksheet-copy]")?.addEventListener("click", async () => {
    const copied = await copyText(markdown());
    say(copied ? "Copied." : "Copy did not work here. Select the text and copy it yourself.");
    if (copied) {
      track("output_copy", { module: form.dataset.worksheet });
      track("exercise_complete", { module: form.dataset.worksheet });
    }
  });

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  form.querySelector("[data-worksheet-print-button]")?.addEventListener("click", () => {
    track("exercise_complete", { module: form.dataset.worksheet });
    if (printCopy) {
      printCopy.replaceChildren(
        ...items.flatMap((item) => {
          const label = element("p", "worksheet-print-field", itemLabel(item));
          const table = item.querySelector("[data-worksheet-grid]");
          if (!table) {
            return [label, element("p", "worksheet-print-answer", item.querySelector("textarea")?.value.trim() || " ")];
          }
          const { tools, rows } = gridRows(table);
          const printed = element("table", "worksheet-print-grid");
          const head = printed.createTHead().insertRow();
          head.append(element("th", "", ""), ...tools.map((tool) => element("th", "", tool)));
          const body = printed.createTBody();
          rows.forEach((row) => {
            const line = body.insertRow();
            line.append(element("th", "", row.label), ...row.cells.map((cell) => element("td", "", cell || " ")));
          });
          return [label, printed];
        }),
      );
    }
    document.documentElement.classList.add("print-worksheet");
    form.classList.add("is-printing");
    const done = () => {
      document.documentElement.classList.remove("print-worksheet");
      form.classList.remove("is-printing");
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  });

  form.querySelector("[data-worksheet-reset]")?.addEventListener("click", () => {
    if (!window.confirm("Clear every answer in this worksheet?")) return;
    boxes.forEach((box) => {
      box.value = "";
    });
    if (save?.checked) writeStore(storeKey, JSON.stringify(values()));
    say("Cleared.");
  });
});

// Self-check (2026-11-05): lists the ticked items and the next step. It never shows a count or score,
// and nothing is sent anywhere; Copy puts the list on the clipboard only.
document.querySelectorAll("[data-selfcheck]").forEach((box) => {
  const result = box.querySelector("[data-selfcheck-result]");
  const status = box.querySelector("[data-selfcheck-status]");
  const work = box.querySelector("[data-selfcheck-work]");
  const checks = [...box.querySelectorAll('input[type="checkbox"]')];
  const guidance = box.querySelector(".selfcheck-guidance")?.textContent?.trim() || "";
  const next = box.querySelector(".selfcheck-next");
  const ticked = () => checks.filter((item) => item.checked).map((item) => item.dataset.label || "");

  const render = () => {
    if (!result) return;
    const items = ticked();
    if (items.length === 0) {
      result.replaceChildren();
      return;
    }
    const lead = document.createElement("p");
    lead.textContent = "Signals you have seen:";
    const list = document.createElement("ul");
    items.forEach((label) => {
      const item = document.createElement("li");
      item.textContent = label;
      list.append(item);
    });
    result.replaceChildren(lead, list);
  };

  box.addEventListener("change", render);

  box.querySelector("[data-selfcheck-copy]")?.addEventListener("click", async () => {
    const items = ticked();
    const lines = [`## ${box.dataset.selfcheckTitle || "Self-check"}`, ""];
    if (work?.value.trim()) lines.push(`**The piece of work:** ${work.value.trim()}`, "");
    lines.push("**Signals seen:**", "", ...(items.length ? items.map((label) => `- ${label}`) : ["- (none ticked)"]), "");
    if (guidance) lines.push(guidance, "");
    if (next) {
      const heading = next.querySelector("strong")?.textContent?.trim();
      const text = next.querySelector("p")?.textContent?.replace(heading || "", "").trim();
      lines.push(`**${heading}** ${text}`, "", ...[...next.querySelectorAll("li")].map((li) => `- ${li.textContent.trim()}`));
    }
    const ok = await copyText(lines.join("\n").trim() + "\n");
    if (status) status.textContent = ok ? "Copied." : "Copy did not work here. Select the text and copy it yourself.";
    if (ok) {
      track("output_copy", { module: box.dataset.selfcheck });
      track("exercise_complete", { module: box.dataset.selfcheck });
    }
  });
});

// AI tool finder (2026-11-05): buttons show the table rows for one job. The chosen job goes in the
// address as ?job=<slug> (replaceState, so Back still leaves the page) and is read again on load. Links
// marked data-job-link (the floor-plan rooms and their list) apply the same filter in place. Without
// JavaScript the buttons stay hidden and every row shows.
document.querySelectorAll("[data-tool-finder]").forEach((finder) => {
  const table = document.getElementById(finder.dataset.toolFinder || "");
  if (!table) return;
  const rows = [...table.querySelectorAll("tbody tr[data-job]")];
  const buttons = [...finder.querySelectorAll("button[data-job]")];
  const status = finder.querySelector("[data-tool-finder-status]");
  const region = table.closest(".table-scroll") || table;

  const apply = (slug, { announce = true } = {}) => {
    const button = buttons.find((item) => item.dataset.job === slug) || buttons.find((item) => item.dataset.job === "");
    if (!button) return;
    const job = button.dataset.job;
    let count = 0;
    rows.forEach((row) => {
      const show = !job || row.dataset.job === job;
      row.hidden = !show;
      if (show) count += 1;
    });
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    if (status && announce) {
      status.textContent = job
        ? `Showing ${count} ${count === 1 ? "tool" : "tools"} for ${button.textContent.trim()}.`
        : `Showing all ${count} tools.`;
    }
    const url = new URL(window.location.href);
    if (job) url.searchParams.set("job", job);
    else url.searchParams.delete("job");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  };

  buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.job || "")));

  document.querySelectorAll("[data-job-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Let a new-tab or new-window click open the address as usual.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      apply(link.dataset.jobLink || "");
      const url = new URL(window.location.href);
      url.hash = table.id;
      window.history.replaceState(null, "", url);
      region.scrollIntoView({ block: "start" });
      if (region.tabIndex >= 0) region.focus({ preventScroll: true });
    });
  });

  const initial = new URLSearchParams(window.location.search).get("job") || "";
  apply(initial, { announce: Boolean(initial) });
});
