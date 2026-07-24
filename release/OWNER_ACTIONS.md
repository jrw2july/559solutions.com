# Owner Actions Before Launch

The site is complete and safely deployable as a static build. These items require owner decisions or real external-service details and were intentionally not guessed.

## Brand and identity

- [ ] Supply the final transparent logo master, preferably SVG plus a high-resolution PNG.
- [ ] Supply or approve a square favicon/app icon set.
- [ ] Confirm the public owner/business name and any required legal entity wording.
- [ ] Approve the generated social-sharing card in `public/images/og.png`.

## Contact and forms

- [ ] Provide a monitored public email address.
- [ ] Choose and configure a secure contact-form endpoint.
- [ ] Choose and configure a newsletter provider/endpoint with appropriate consent and unsubscribe handling.
- [ ] Provide a real scheduling URL if scheduling should appear.
- [ ] Complete a production form-delivery test from an outside email address.

## Public links

- [ ] Provide and verify the official LinkedIn URL.
- [ ] Provide any other approved social-profile URLs.
- [ ] Confirm whether social links should open in a new tab.

## Resources and commerce

- [ ] Supply the final lead-magnet/checklist PDF and approve its unrestricted or gated delivery method.
- [ ] Inventory and preserve every file from the old Downloads area.
- [ ] Decide whether the email-move guide and HEIC converter will be migrated, retired, or redirected.
- [ ] Confirm the status of both legacy store-product URLs.
- [ ] Supply final resource files, cover art, prices, currency, tax/refund/license terms, and support details.
- [ ] Choose the checkout/fulfillment provider and provide verified public checkout URLs.
- [ ] Test at least one complete transaction and one download using a non-owner account before promotion.

## Content and offers

- [ ] Review the two migrated articles for final editorial and legal accuracy.
- [ ] Review the five resource descriptions and availability labels.
- [ ] Review service names, deliverables, availability, and inquiry language.
- [ ] Decide when, if ever, to complete and publish the eight draft article outlines.
- [ ] Decide whether Courses and Case Studies should be completed and published.

## SEO, domain, and analytics

- [ ] Confirm `https://559solutions.com` (non-`www`) as the canonical public URL.
- [ ] Confirm both root and `www` DNS records and SSL coverage before switching hosts.
- [ ] Review and approve the confirmed redirects in `docs/redirect-map.csv`.
- [ ] Resolve every `TBD` redirect row before canceling the old platform.
- [ ] Provide any verified former-domain path inventory before adding former-domain redirects.
- [ ] Choose an analytics provider, site ID, consent approach, and privacy disclosure, or leave analytics disabled.
- [ ] Submit the production sitemap to the selected search-console tools.

## Policy and operations

- [ ] Have Privacy, Terms, Accessibility, refund, licensing, and email-consent language reviewed by the appropriate adviser.
- [ ] Confirm the accessibility contact method and response process.
- [ ] Establish owner responsibility for form messages, customer support, refunds, downloads, and content updates.
- [ ] Take and download a full cPanel backup before deployment.
- [ ] Keep source, release archives, checksums, and production assets outside `public_html`.
- [ ] Complete the live verification checklist in `docs/CPANEL_DEPLOYMENT.md`.

## Current implementation assumptions

- Canonical host is non-`www` over HTTPS.
- Unconfirmed resources are marked `coming soon`; services are `by inquiry`.
- Forms and analytics remain disabled until configured.
- Only the two verified existing articles are published.
- Courses and Case Studies remain unpublished templates.
- No unverified price, email address, download, checkout, scheduling URL, social URL, or testimonial is shown.
