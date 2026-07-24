# cPanel Deployment

The deployment archive is a complete static site. cPanel does not need Node.js, pnpm, a database, or a server process.

## Before deployment

1. Download `release/559solutions-cpanel-deploy.zip`.
2. Sign in to cPanel and open File Manager.
3. Open the document root for `559solutions.com`, normally `public_html`.
4. Confirm the exact document root in cPanel's Domains screen if the account hosts more than one domain.
5. Create a dated ZIP backup of the current document-root contents.
6. Download that backup to a second location.
7. Identify unrelated cPanel-managed files or folders that must remain, such as `.well-known`, mail verification files, or other application directories.
8. Confirm that a valid SSL certificate is active for both `559solutions.com` and `www.559solutions.com`.

## Upload with File Manager

9. Put the site into a maintenance window if the current host provides that option.
10. Remove only the old website files that the new archive replaces. Preserve unrelated account files identified above.
11. Upload `559solutions-cpanel-deploy.zip` into the document root.
12. Select the archive and choose **Extract**.
13. Confirm that `index.html`, `.htaccess`, `404.html`, `images/`, `scripts/`, and route folders are directly inside the document root. There must not be an extra `dist/` or `559solutions-cpanel-deploy/` folder.
14. Delete the uploaded ZIP from the server after extraction if storage policy requires it.
15. In File Manager settings, enable “Show Hidden Files” and confirm `.htaccess` is present.

## FTP or SFTP alternative

Extract the archive locally, connect using SFTP when available, and upload the archive contents directly to the domain's document root. Include `.htaccess`. Use binary/automatic transfer mode and preserve folder names.

## Post-deployment checks

16. Open `https://559solutions.com/` in a private browser window and perform a hard refresh.
17. Verify:

    - HTTP redirects to HTTPS.
    - `www` redirects to the non-`www` canonical host.
    - Home, Resources, Services, Blog, About, Contact, Privacy, Terms, Accessibility, sitemap, and RSS routes load.
    - Both migrated article URLs load.
    - A nonexistent path displays the custom 404 page.
    - Old confirmed URLs in `docs/redirect-map.csv` redirect once to the intended new path.
    - Navigation, mobile menu, filters, skip link, keyboard focus, and reduced-motion behavior work.
    - Forms show the configured submission behavior, or the intentional owner-configuration message.
    - Resource downloads and checkout links work only where the owner configured real destinations.
    - The logo, social card, favicon, and manifest load without mixed-content warnings.
    - Browser developer tools show no unexpected console or network errors.

18. Submit live forms from a non-owner email address and verify receipt, spam controls, confirmation messaging, and privacy handling before advertising them.
19. Purge cPanel, CDN, proxy, and browser caches after the final verification. Recheck the site from a mobile network.

## File permissions

Typical permissions are `644` for files and `755` for directories. Do not make files world-writable. Keep private source files, `.env` files, backups, and the source ZIP outside `public_html`.

## Redirects and Apache

The included `.htaccess`:

- Enforces HTTPS.
- Uses `https://559solutions.com` as the canonical host.
- Applies only confirmed legacy redirects.
- Defines the custom 404 document.
- Disables directory indexes.
- Adds security, compression, and caching headers when supported modules are enabled.

If cPanel or a CDN already performs canonical redirects, test carefully for loops. Adjust only one layer at a time.

## Rollback

1. Stop further changes.
2. Preserve a copy of the failed deployment for diagnosis.
3. Clear the document root of only the new site files.
4. Restore and extract the dated pre-deployment backup into the same document root.
5. Confirm `.htaccess` and any preserved account files.
6. Purge caches.
7. Retest HTTPS, the home page, key legacy redirects, forms, and downloads.

Record the deployment time, archive checksum, operator, and any cPanel-specific changes in the maintenance log.
