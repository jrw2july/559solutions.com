# Form Setup

The site contains contact and newsletter forms, but no third-party endpoint or public email address was invented. Until the owner configures them, the controls fail safely and explain that online submission is not yet available.

## Configuration

Edit `src/config/site.ts`:

```ts
publicEmail: "",
contactFormEndpoint: "",
newsletterEndpoint: "",
formSuccessUrl: "",
antiSpamField: "company_website",
```

- `publicEmail`: verified public address displayed as the fallback contact method.
- `contactFormEndpoint`: HTTPS endpoint that accepts contact fields.
- `newsletterEndpoint`: HTTPS endpoint that accepts an email subscription.
- `formSuccessUrl`: optional same-site confirmation route.
- `antiSpamField`: honeypot field name expected by the endpoint.

Do not put API secrets, private tokens, SMTP credentials, or admin keys in this file. Everything shipped in a static site is public.

## Endpoint requirements

The browser script in `public/scripts/site.js` submits configured forms with `fetch` and form-encoded data. The endpoint must:

- Accept HTTPS POST requests.
- Allow requests from `https://559solutions.com`.
- Validate and normalize every field server-side.
- Ignore or reject requests when the honeypot field is populated.
- Apply rate limiting and abuse protection.
- Return an HTTP 2xx response for success and a useful non-2xx status for failure.
- Avoid reflecting unsanitized visitor input.
- Store only the data required for the stated purpose.
- Provide an accessible privacy notice and retention policy.

If the provider requires a proprietary script or JSON body, update `public/scripts/site.js`, document the change, and retest without exposing credentials.

## Contact fields

The current form collects name, email, organization, topic, and message. Map field names exactly at the receiving service. Configure notification recipients within the provider, not in client-side JavaScript.

## Newsletter fields

The Curious Architect signup (`src/components/NewsletterForm.astro`, 2026-11-05) collects an email address and a consent checkbox that starts unticked. It posts to the same Apps Script web app as the other forms and adds one row to the "Submissions" sheet. The `source` column says where the reader signed up:

- `newsletter:<article-slug>`: after an article's exercise
- `newsletter:article-end-<article-slug>`: at the end of an article
- `newsletter:subscribe-page`: on `/subscribe/`
- `waitlist:starter-kit` and `waitlist:ai-workbook`: the waitlist on a coming-soon resource page (2026-11-05). These readers asked for one email when that resource is released, not for the newsletter.

The `page` column holds the page address. Worksheet answers are never part of this form.

The script stores rows only. It sends no email and has no double opt-in. The owner sends the emails and honors unsubscribe replies. Under the U.S. CAN-SPAM Act, each commercial email needs a valid postal address and a working opt-out honored within 10 business days (FTC CAN-SPAM compliance guide). This is not legal advice.

### Signing up without JavaScript

Without JavaScript the browser posts the form itself, form-encoded. The script in `docs/apps-script-form-handler.gs` accepts that and answers with a short thank-you page. To turn it on, paste that file over the script bound to the Google Sheet, then Deploy > Manage deployments > edit the existing web app > Version: New version > Deploy. The web app address stays the same. Until then, a no-JavaScript signup gets the reply "bad request" and is not saved.

## Verification

After configuration:

1. Build and preview the site.
2. Submit valid and invalid data.
3. Test keyboard-only and screen-reader status announcements.
4. Confirm the honeypot remains visually hidden but is accepted by the endpoint.
5. Confirm success, provider error, network error, repeated submission, and slow-response behavior.
6. Confirm receipt from an outside email address.
7. Check spam and reply-to behavior.
8. Run `pnpm validate`, `pnpm browser:qa`, and `pnpm package`.
9. Repeat one real submission after deployment.

Never claim that a form works until the production endpoint and delivery path have been tested.
