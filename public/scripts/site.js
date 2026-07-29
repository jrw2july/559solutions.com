const normalize = (value) => String(value || "").trim().toLowerCase();

document.querySelectorAll("[data-filter-list]").forEach((list) => {
  const form = list.querySelector("[data-filter-form]");
  const cards = [...list.querySelectorAll("[data-filter-card]")];
  const emptyState = list.querySelector("[data-empty-state]");
  const status = list.querySelector("[data-filter-status]");

  if (!form || cards.length === 0) return;

  const applyFilters = () => {
    const search = normalize(form.querySelector("[data-filter-search]")?.value);
    const category = normalize(form.querySelector("[data-filter-category]")?.value);
    const secondary = normalize(form.querySelector("[data-filter-secondary]")?.value);
    const secondaryAttribute = form.dataset.secondaryAttribute || "topics";
    let visible = 0;

    cards.forEach((card) => {
      const matchesSearch = !search || normalize(card.dataset.search).includes(search);
      const matchesCategory = !category || normalize(card.dataset.category) === category;
      const matchesSecondary =
        !secondary || normalize(card.dataset[secondaryAttribute]).includes(secondary);
      const matches = matchesSearch && matchesCategory && matchesSecondary;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
    if (status) {
      status.textContent = `${visible} ${visible === 1 ? "item" : "items"} shown`;
    }
  };

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
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("The form provider returned an error.");

      const successUrl = form.dataset.successUrl;
      if (status) status.textContent = "Thank you. Your request was received.";
      form.reset();
      if (successUrl) window.location.assign(successUrl);
    } catch {
      if (status) {
        status.textContent =
          "Your request could not be sent. Please try again or use the listed contact fallback.";
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
