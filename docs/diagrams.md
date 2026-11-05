# Diagrams

Diagrams are static SVG drawn at build time with the kit in `src/components/diagrams/`. No images, no
scripts, no motion.

## The kit

`DiagramFigure.astro` wraps one diagram in a `<figure>`:

- Two drawings of the same content: `slot="wide"` and `slot="stacked"`. CSS shows the wide one from
  40rem (640px) up and the stacked one below it. Only one is displayed, so assistive technology reads it once.
- Each `<svg>` has `role="img"`, is named by its own `<title>` (`aria-labelledby`), and is described by
  the in-page text description (`aria-describedby`).
- A `<figcaption>`. The text description (`slot="description"`) follows right after the figure and must carry the id `${id}-desc`.

## Rules

- Real SVG text. Body text 16px and labels at least 13px in the drawing's own units. Wide drawings are
  at most 720 units wide; stacked drawings are 340 wide, so text stays readable at 375px without zooming.
- Meaning never depends on color alone. A colored box is also dashed and labeled.
- Lines and text are ink (`--color-ink`), so black-and-white printing keeps everything. Print uses the wide drawing.
- No motion. If one is ever needed, put it inside `@media (prefers-reduced-motion: no-preference)`.
- The text description says everything the drawing says. With CSS and images off it is all a reader gets.
- Links inside an `role="img"` drawing are hidden from assistive technology. If rooms or boxes link
  somewhere, give them `tabindex="-1"` and put the same links in the visible text description.
- Use only words the page already uses. No new facts in a drawing.

## Diagrams

| Component | Shows | Used on |
|---|---|---|
| `PlaybookDiagram.astro` | Trigger, input, prompt, who approves, where it is saved; run enough times; keep, adjust or stop | `/code559/choose-the-right-ai-tool/` (after step 4). Can be reused on `/blog/how-to-choose-and-actually-use-ai-tools/`; that article lists seven playbook parts, so check the wording first. |
| `ToolFloorPlan.astro` | One room per job group from `src/data/ai-tools.ts`, each linking to its table filter | `/code559/choose-the-right-ai-tool/` |

The older lesson diagrams (`src/components/ieia/TradeDiagram.astro`, `ContextDiagram.astro`) follow the
same rules but predate the kit.

## Share images

`src/lib/share-image.mjs` draws a page's 1200x630 share image at build time (title, a small blueprint
drawing, the logo); `src/pages/share/[slug].png.ts` writes it to `/share/<slug>.png`. Add a page by adding
an entry to `shareImages`. If drawing fails, the page uses `/images/og.png`.
