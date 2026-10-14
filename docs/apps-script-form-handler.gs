/**
 * 559 Solutions form handler (Google Apps Script web app).
 * Receives JSON posted as text/plain from:
 *   - the coming-soon page   { email, source: "coming-soon-page" }
 *   - the website contact form { name, email, organization, inquiry_type, message, privacy_consent, source: "contact-form", page }
 *   - the checklist sign-up    { first_name, email, consent, source: "checklist-form", page }
 *   - the Code559 course list  { first_name, email, course, consent, source: "code559-coming-soon", page }
 * and appends one row per submission to the "Submissions" sheet.
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

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return text_("bad request");
  }

  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return text_("invalid email");
  if (data.company_website) return text_("ok"); // spam trap field; the website strips it, bots may not

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
  return text_("ok");
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
