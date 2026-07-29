# Maintenance Guide

## For every change

1. Work from the editable source project, not `dist/` or files downloaded from cPanel.
2. Update content/configuration and preview locally.
3. Run `pnpm install --frozen-lockfile` on a clean checkout when preparing a release.
4. Run `pnpm validate`, `pnpm browser:qa`, `pnpm lighthouse`, and `pnpm audit`.
5. Review generated output and release notes.
6. Run `pnpm package`.
7. Back up the live document root before uploading.
8. Deploy during a low-risk window and complete the live checklist.
9. Record the source revision, ZIP checksum, deployment time, and operator.

## Monthly

- Test contact/newsletter delivery and resource links.
- Check the site at desktop and mobile sizes.
- Review cPanel storage, SSL status, error logs, and backup success.
- Check for broken links and 404 traffic.
- Review analytics only if an approved privacy-conscious configuration is enabled.
- Confirm service availability and resource statuses remain accurate.

## Quarterly

- Update dependencies in a separate branch or backup copy.
- Review audit findings and release notes before upgrading.
- Run the full automated and manual accessibility checklist.
- Recheck redirect coverage and search-console reports.
- Review legal, privacy, accessibility, refund, and support language with the appropriate owner/adviser.
- Test restoring the latest backup.

## Backups

Keep:

- Source under version control.
- The lockfile used for each release.
- A dated copy of every deployed ZIP and its SHA-256 checksum.
- At least one recent cPanel document-root backup outside the hosting account.
- Original product files and production brand assets in a controlled location.

Do not store secrets in the repository or static deployment archive.

## Dependency updates

Use the pinned versions and lockfile for repeatable builds. When updating:

1. Read framework and dependency release notes.
2. Update deliberately.
3. Run a clean install.
4. Run all validation and audit commands.
5. Compare build output and page screenshots.
6. Avoid deploying an upgrade that has not passed the same release gate.

## Incident response

If the site fails after deployment, preserve logs and a copy of the failed files, restore the pre-deployment backup, purge caches, and verify recovery. Diagnose in the source project, make the smallest justified change, repeat validation, then redeploy.

If the domain, SSL, DNS, checkout, forms, or email delivery fails independently of a code change, check that provider first and avoid modifying the site until the failure boundary is clear.
