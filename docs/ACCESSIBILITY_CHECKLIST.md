# Accessibility Checklist

The implementation targets WCAG 2.2 AA practices. Automated tools help find defects but do not establish conformance on their own.

## Automated checks

- `pnpm check`
- `pnpm validate`
- `pnpm browser:qa`
- `pnpm lighthouse`
- Browser accessibility-tree inspection
- A production scan with a second tool such as axe, WAVE, or Accessibility Insights

## Keyboard

- Tab through every interactive element in source order.
- Verify the skip link is the first useful focus target.
- Open and close mobile navigation with keyboard controls.
- Confirm focus is visible against every background.
- Confirm no keyboard trap exists.
- Test forms, filters, links, and buttons without a mouse.
- Ensure sticky elements do not obscure focused controls.

## Screen reader

- Confirm the page title and primary heading describe the page.
- Navigate by landmarks and headings.
- Verify navigation labels distinguish primary, mobile, and footer regions.
- Confirm images have appropriate alt text.
- Confirm form labels, required state, instructions, errors, and success status are announced.
- Verify buttons and links have meaningful accessible names.
- Ensure status and filter updates are understandable without relying on color or position.

## Visual

- Test at 200% browser zoom and at 320 CSS pixels wide.
- Test text spacing overrides.
- Check contrast for text, icons, controls, borders, focus indicators, and disabled states.
- Confirm content reflows without two-dimensional scrolling except where essential.
- Test Windows High Contrast/forced-colors mode.
- Verify that information is not communicated by color alone.

## Motion and media

- Enable `prefers-reduced-motion` and confirm nonessential motion stops.
- Do not autoplay audio.
- Add captions/transcripts before publishing meaningful audio or video.
- Avoid flashing content.

## Content

- Use plain language and descriptive link text.
- Keep heading levels logical.
- Explain acronyms at first use when the audience may not know them.
- Avoid instructions that depend only on shape, color, or location.
- Keep error messages specific and actionable.

## Release gate

Repeat manual keyboard, screen-reader, zoom/reflow, and contrast testing after material design or content changes. Record the browsers, assistive technologies, dates, issues, and remediation decisions. Have the published accessibility statement and contact channel reviewed by the owner.
