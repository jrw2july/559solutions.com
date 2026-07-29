# Product and Download Setup

Resources are data-driven Markdown entries in `src/content/resources/`. The production site currently uses honest availability states and does not invent prices, checkout links, or downloads.

## Status rules

| Status | Use when | Public action |
| --- | --- | --- |
| `free` | A verified free delivery URL exists | Download/access |
| `available` | Price, terms, inventory, and checkout are final | Purchase/access |
| `coming soon` | The resource is announced but not deliverable | No transaction |
| `early access` | A real, owner-approved access process exists | Configured access only |
| `by inquiry` | Delivery requires a conversation | Contact, if configured |
| `unavailable` | The item should remain visible but cannot be obtained | No transaction |
| `draft` | The item is not ready for public listing | Excluded |

## Required owner decisions

For each item, confirm:

- Final name, description, cover art, and file format
- Status and launch date
- Price, currency, taxes, refund terms, and licensing
- Checkout provider and verified HTTPS destination
- Fulfillment method and access-expiration rules
- Support address and response expectations
- Accessibility of the delivered file
- Version number and update policy

## Files

Do not place paid product files at a guessable public URL. Use a checkout or delivery service that creates access-controlled or expiring links. Free files may be hosted under `public/downloads/` only after the owner decides that unrestricted direct access is appropriate.

Use descriptive filenames, scan deliverables for malware, remove private metadata, and retain an offline master copy.

## Checkout configuration

Set provider metadata in `src/config/site.ts` only after choosing a provider:

```ts
checkoutProvider: {
  name: "",
  allowedOrigin: "",
},
```

Store credentials at the provider or in a secure server-side service. Never add secret keys to Astro source, Markdown, JavaScript, HTML, a query string, or the cPanel deployment ZIP.

## Publishing a resource

1. Complete the owner decisions above.
2. Upload the deliverable to the approved fulfillment service.
3. Test delivery using a non-owner account.
4. Add the verified `downloadUrl` or `checkoutUrl`.
5. Set the correct `status` and `priceLabel`.
6. Review visible terms and privacy language.
7. Run the complete validation suite and inspect mobile/desktop layouts.
8. Rebuild both release archives.
9. Test the real production transaction or download after deployment.

Keep an order/refund process outside the static site and document who owns customer support.
