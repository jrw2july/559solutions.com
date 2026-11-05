/**
 * 559 Solutions form handler (Google Apps Script web app).
 * Receives JSON posted as text/plain (when the visitor has JavaScript) from:
 *   - the coming-soon page   { email, source: "coming-soon-page" }
 *   - the website contact form { name, email, organization, inquiry_type, message, privacy_consent, source: "contact-form", page }
 *   - the checklist sign-up    { first_name, email, consent, source: "checklist-form", page }
 *   - the Code559 course list  { first_name, email, course, consent, source: "code559-coming-soon", page }
 *   - the blog email signup    { email, consent, source: "newsletter:<tag>", page }
 * and appends one row per submission to the "Submissions" sheet.
 *
 * Without JavaScript, the browser posts the form itself (form-encoded). That is accepted too (2026-11-05):
 * the script reads the same fields from e.parameter and answers with a short thank-you page that links
 * back to the site, instead of plain text.
 *
 * Use this in place of your current doPost() if that one only saves email and source.
 * The script must be bound to the Google Sheet (Extensions > Apps Script from the sheet).
 * After saving: Deploy > Manage deployments > edit the existing web app > Version: New version > Deploy,
 * so the web app address (which the website already uses) stays the same.
 */
const SHEET_NAME = "Submissions";
const COLUMNS = [
  "received", "source", "page", "email", "name", "first_name",
  "organization", "inquiry_type", "course", "message", "consent",
];
const MAX_FIELD = 5000;
const SITE = "https://559solutions.com";

function doPost(e) {
  // A browser posting the form itself (no JavaScript) sends form-encoded fields; site.js sends JSON.
  const formPost = Boolean(e.postData && e.postData.type === "application/x-www-form-urlencoded");
  let data;
  if (formPost) {
    data = e.parameter || {};
  } else {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return text_("bad request");
    }
  }
  const reply = (message, ok) => (formPost ? page_(message, ok, data.page) : text_(ok ? "ok" : message));

  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply("That email address does not look right. Please go back and check it.", false);
  }
  if (data.company_website) return reply("Thank you.", true); // spam trap field; the website strips it, bots may not

  const row = {
    received: new Date(),
    source: data.source,
    page: data.page,
    email: email,
    name: data.name,
    first_name: data.first_name,
    organization: data.organization,
    inquiry_type: data.inquiry_type,
    course: data.course,
    message: data.message,
    consent: data.privacy_consent || data.consent,
  };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
    sheet.appendRow(COLUMNS.map((key) => clean_(row[key])));
  } finally {
    lock.releaseLock();
  }
  return reply("Thank you. Your request was received.", true);
}

// Keep cells short and stop spreadsheet formulas from being injected through form text.
function clean_(value) {
  if (value === undefined || value === null) return "";
  if (value instanceof Date) return value;
  let s = String(value).slice(0, MAX_FIELD);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function text_(message) {
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.TEXT);
}

// Thank-you (or error) page for a form posted without JavaScript. It shows only fixed text, never what
// the visitor typed, and links back to the page they came from when that is a plain site path.
function page_(message, ok, fromPath) {
  const path = /^\/[a-z0-9\-\/]*$/i.test(String(fromPath || "")) ? String(fromPath) : "/";
  const html =
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>559 Solutions</title></head>" +
    '<body style="font-family: system-ui, sans-serif; max-width: 36rem; margin: 3rem auto; padding: 0 1rem; line-height: 1.6;">' +
    "<h1>" + (ok ? "Thank you" : "Something needs fixing") + "</h1>" +
    "<p>" + message + "</p>" +
    '<p><a href="' + SITE + path + '" target="_top">Back to 559 Solutions</a></p>' +
    "</body></html>";
  return HtmlService.createHtmlOutput(html).setTitle("559 Solutions");
}
