const normalize = (value) => String(value || "").trim().toLowerCase();

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

document.querySelectorAll("[data-worksheet]").forEach((form) => {
  const fields = [...form.querySelectorAll("textarea[data-label]")];
  const status = form.querySelector("[data-worksheet-status]");
  const save = form.querySelector("[data-worksheet-save]");
  const printCopy = form.querySelector("[data-worksheet-print]");
  const storeKey = `ieia:${window.location.pathname}:${form.dataset.worksheet}`;
  const title = form.dataset.worksheetTitle || "Worksheet";
  const say = (message) => {
    if (status) status.textContent = message;
  };

  const values = () => Object.fromEntries(fields.map((field) => [field.name, field.value]));
  const persist = () => {
    if (save?.checked) writeStore(storeKey, JSON.stringify(values()));
  };

  const stored = readStore(storeKey);
  if (stored && save) {
    try {
      const data = JSON.parse(stored);
      fields.forEach((field) => {
        if (typeof data[field.name] === "string") field.value = data[field.name];
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

  const markdown = () =>
    [`## ${title}`, "", ...fields.flatMap((field) => [`**${field.dataset.label}**`, "", field.value.trim() || "_(blank)_", ""])]
      .join("\n")
      .trim() + "\n";

  form.querySelector("[data-worksheet-copy]")?.addEventListener("click", async () => {
    say((await copyText(markdown())) ? "Copied." : "Copy did not work here. Select the text and copy it yourself.");
  });

  form.querySelector("[data-worksheet-print-button]")?.addEventListener("click", () => {
    if (printCopy) {
      printCopy.replaceChildren(
        ...fields.flatMap((field) => {
          const label = document.createElement("p");
          label.className = "worksheet-print-field";
          label.textContent = field.dataset.label || "";
          const answer = document.createElement("p");
          answer.className = "worksheet-print-answer";
          answer.textContent = field.value.trim() || " ";
          return [label, answer];
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
    fields.forEach((field) => {
      field.value = "";
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
  });
});
