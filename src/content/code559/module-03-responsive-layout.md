---
title: "Module 3: Responsive Layout"
subtitle: "One page that works on a phone, a tablet and a laptop."
module: 3
series: Code559 Front-End Developer Course
estimated_time: "about 2 hours (estimate)"
---

# Module 3 — Responsive Layout

*One page that works on a phone, a tablet and a laptop.*

**Time:** about 2 hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn the box model, mobile-first media queries, CSS Grid and responsive images, and how to test a page at different widths. It's essential because more visitors will see your site on a phone than on a laptop, and one HTML file with one stylesheet can serve them all.

**Tips for the learner**

Some prompts ask you to explain code to yourself, out loud. Others ask you to write something down. Each habit does a different job.

**Recite to understand.** When a prompt says "out loud," explain the code in your own words, as if you were teaching it. Saying it aloud makes a deeper impression than reading silently. It helps you picture how the pieces of code fit together. And it shows you right away which line you cannot explain yet. That line is the one to review.

**Write it down to check yourself.** When a prompt says "write down," it is usually a prediction, a choice, or a guess about a bug. A written answer can't change after you see the result, so the comparison is fair and you learn from the difference. Writing also keeps your attention on the lesson and helps you pick out the main points.

**Keep one notebook for this course.** Use it for your predictions, key terms, steps, mistakes, and questions to come back to. Date each entry and write the module number, so you can find it later. Before you start a new module, read your last few entries and recite one or two of them out loud.

**The four badges**

Every core concept moves through the same four steps, called IEIA. Each step is marked with its badge.

<img src="../images/brand/marker-introduce.svg" alt="" width="24" height="24" class="c559-badge"> - **Introduce** (a lightbulb: a new idea) - You meet the concept: its name, and why it matters to you, in a sentence or two.

<img src="../images/brand/marker-explain.svg" alt="" width="24" height="24" class="c559-badge"> - **Explain** (a speech bubble: the idea in words) - How it works, one idea at a time, in plain words.

<img src="../images/brand/marker-illustrate.svg" alt="" width="24" height="24" class="c559-badge"> - **Illustrate** (an eye: see it) - A small example you can look at: a code snippet, a real screenshot or a diagram. Its caption, which starts with this badge, tells you what to notice.

<img src="../images/brand/marker-apply.svg" alt="" width="24" height="24" class="c559-badge"> - **Apply** (a keyboard: your turn) - A short task to do right now, before you read on. Often you type or predict something; sometimes you write it down, sketch it, or explain code to yourself out loud.

</details>
<!-- about:end -->

<!-- contents:start -->

**Contents**

- [Why this matters](#why-this-matters)
- [Before you start](#before-you-start)
- [Core concepts](#core-concepts)
  - [1. What is the box model?](#1-what-is-the-box-model)
  - [2. What does `box-sizing: border-box` change?](#2-what-does-box-sizing-border-box-change)
  - [3. What does the viewport meta tag do?](#3-what-does-the-viewport-meta-tag-do)
  - [4. How does a mobile-first media query work?](#4-how-does-a-mobile-first-media-query-work)
  - [5. What makes navigation responsive?](#5-what-makes-navigation-responsive)
  - [6. How does CSS Grid make a card layout?](#6-how-does-css-grid-make-a-card-layout)
  - [7. How do responsive images work?](#7-how-do-responsive-images-work)
  - [8. How do you test at different widths?](#8-how-do-you-test-at-different-widths)
- [Exercise](#exercise)
- [Project (in the full packet)](#project-in-the-full-packet)
- [Common misconception](#common-misconception)
- [Summary](#summary)
- [Check your understanding](#check-your-understanding)
- [Before next module](#before-next-module)
- [Go further](#go-further)
- [What to keep](#what-to-keep)

<!-- contents:end -->

**In this module you will learn:**

- The box model: content, padding, border and margin
- What `box-sizing: border-box` changes, and why most stylesheets start with it
- What the viewport meta tag does, and what happens on a phone without it
- Mobile-first media queries with `min-width`, and why the order of your rules matters
- A responsive navigation bar that stacks on a phone and sits in a row on a laptop
- CSS Grid: `display: grid`, `repeat(auto-fit, minmax(220px, 1fr))`, `gap` and `grid-column: span 2`
- Responsive images: `srcset` with `w` descriptors, `sizes`, `width` and `height` to stop layout shift, `loading="lazy"`, and `figure` with `figcaption`
- How to test a page at different widths with the DevTools device toolbar

## Why this matters

More people will open your site on a phone than on a laptop. If the page only looks right on the screen you built it on, most visitors see a broken version. Responsive layout means one HTML file and one stylesheet that adapt to the width they are given.

You do not need a separate phone site, and you do not need JavaScript. The tools in this module are plain CSS and a few HTML attributes. Once you know them, every page you build for the rest of the course starts on a phone and grows.

This module also brings in CSS Grid. In Module 2 you used Flexbox to put things in a row. Grid puts things in rows **and** columns at the same time, which is exactly what a page of cards needs.

## Before you start

1. Module 2 is done: you can link a page to an external stylesheet, and you have used Flexbox to put a navigation bar in a row.
2. Open your course folder (for example `Documents\code559`). Next to `my-site`, create a new folder called `practice-03`. This is the throwaway folder for the Exercise. Nothing in it is published.
3. Open Edge or Chrome and press **F12** once to check that DevTools opens. Press F12 again to close it.

> **Checkpoint.** You have an empty `practice-03` folder next to `my-site`, and F12 opens DevTools in your browser.

## Core concepts

### 1. What is the box model?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Every element on a page is a rectangle. CSS calls that rectangle a box, and every box has four layers.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> From the inside out: the **content** is your text or image. **Padding** is space inside the border; it takes the element's background color. The **border** is the visible edge. **Margin** is space outside the border that pushes other boxes away. MDN's *The box model* page says that in the default model, "if you set `width` and `height` property values on a box, these values define the `width` and `height` of the *content box*. Any padding and borders are then added." So a box with `width: 300px`, `padding: 20px` and a `5px` border is really 350 pixels wide on the screen.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m03-box-model.png" alt="Four nested rectangles labeled margin, border, padding and content, with a short note about each." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Margin is outside the border, padding is inside it, and `width` sets only the content in the default model.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open any page you built in Edge or Chrome, press F12, click an element in the Elements panel and find the Computed tab. DevTools draws that element's box with all four layers and their sizes.

### 2. What does `box-sizing: border-box` change?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `box-sizing` decides what `width` measures.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> With `box-sizing: border-box`, MDN says "any width is the width of the visible box on the page." The padding and border fit **inside** the width you set, so 300 means 300. That makes layouts much easier to reason about, which is why many stylesheets begin with this rule for every element:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Two boxes with the same CSS (`width: 300px; padding: 20px; border: 5px solid`). The only difference is `box-sizing`. A small script on the page wrote each box's real width into it.

<img src="../images/m03-box-sizing.png" alt="Two boxes under orange 300-pixel rulers. The content-box one reads offsetWidth 350px and sticks out past the ruler; the border-box one reads 300px and matches it." loading="lazy">

*The orange bars are 300 px wide. The default box is 350 px; the border-box one is exactly 300 px. The numbers are `offsetWidth`, measured by the page in Chromium. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: with `border-box`, what happens to the content area if you raise the padding from 20px to 40px? (It shrinks by 40 px; the outside stays 300 px.)

### 3. What does the viewport meta tag do?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> You have been typing this line in every `<head>` since Module 1:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN's page on `<meta name="viewport">` explains that some phones lay a page out in a "virtual viewport" that is wider than the screen, for example 980 px, "and then it will be shrunk down to fit." When that happens, MDN goes on, media queries meant for narrow screens "will never be used." The viewport tag tells the phone to use its real width. `initial-scale=1` asks it to start at 100% zoom.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> You will see this for yourself in step 8 of the Exercise. Here is the result in advance.

<img src="../images/m03-viewport-break.png" alt="Two phone-width renders of the same page side by side. With the viewport tag, the text is large and the cards are in one column. Without it, the whole desktop layout is shrunk down and the text is tiny." loading="lazy">

*Same page, same 390 px phone, in Chromium's phone emulation. With the tag removed, the page measured `innerWidth` 980 and laid out 4 grid columns, then shrank everything to fit. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Look at the `<head>` of your Home page now. Is the viewport line there, spelled exactly? If not, add it.

### 4. How does a mobile-first media query work?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A media query is a block of CSS that only applies when a condition is true, such as "the viewport is at least 700 px wide."

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> **Mobile first** means you write the phone layout as your normal rules, then add `@media (min-width: …)` blocks that change only what is different on wider screens. MDN's *Using media queries* page notes that range features like `width` take `min-` and `max-` prefixes, and that these comparisons are inclusive, so `min-width: 700px` is true at exactly 700.

The order matters. A rule inside a media query has the same specificity as the same rule outside it. When two rules tie, **the later one wins** (you met this in Module 2's cascade). So the media query must come **after** the base rules it changes. If you put it first, the base rule comes later and always wins.

```css
/* Base rules: the phone layout */
.site-header {
  display: flex;
  flex-direction: column;
}

/* Wider screens: added on top of the base rules */
@media (min-width: 700px) {
  .site-header {
    flex-direction: row;
    justify-content: space-between;
  }
}
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m03-rule-order.png" alt="Two 1200-pixel-wide headers. With the media query after the base rules, the logo is left and the links are right. With the media query moved above, the header is stacked even on a wide screen." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Both renders are 1200 px wide, so the media query is true in both. Moved above the base rules, it loses: Chromium measured `flex-direction: column` instead of `row`. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: with the CSS above, which `flex-direction` does the header get on a 500 px screen? (`column`: the media query is false below 700 px, so only the base rule applies.)

### 5. What makes navigation responsive?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Navigation is usually the first thing to break on a phone. Four links in a row fit on a laptop and overflow on a phone.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The simplest responsive navigation needs no JavaScript. On a phone, the header stacks (logo above links) and the links use `flex-wrap: wrap` so they flow onto a second line if they must. At 700 px and up, the media query from Concept 4 puts the logo and the links in one row. Give each link some padding so it is easy to tap with a finger. Menus that open and close with a button need JavaScript, which comes in Module 9.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Compare the top of the 390 px and 1200 px screenshots in Concept 6 below. Same HTML, same stylesheet.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open your `practice-02/styles.css` from Module 2. Add `flex-wrap: wrap` to the `nav` rule and `padding: 0.4rem 0.75rem` to the `nav a` rule. Save and press **F5**. If the links ever run out of room on a narrow window, they now move onto a second line instead of running off the edge.

### 6. How does CSS Grid make a card layout?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Grid lays out children in columns and rows. You turn it on with `display: grid` on the parent.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> This one line does most of the work:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
```

Read it from the inside out. `1fr` is, in MDN's words in *Basic concepts of grid layout*, "a fraction of the available space in the grid container." `minmax(220px, 1fr)` means "each column is at least 220 px, and shares any extra space equally." `repeat(auto-fit, …)` means "make as many of those columns as will fit." MDN's `repeat()` page adds that `auto-fit` collapses any empty columns, so a short row of cards stretches to fill the width. `gap` puts space between the cells; MDN notes it is taken out before the `fr` space is shared.

There is no media query in that rule. The number of columns changes with the width by itself. Here is what Chromium measured on the Exercise page (`getComputedStyle(grid).gridTemplateColumns`):

| Viewport width | Columns measured | Each column |
|---|---|---|
| 390 px | 1 | 358px |
| 800 px | 3 | 245.328px |
| 1200 px | 4 | 255px |

One card can be wider than the others with `grid-column: span 2`. Put that inside the `min-width` media query. When it was applied at all widths, Chromium measured `220px 122px` at 390 px: the span forced a second, squeezed column onto a phone.

The minimum in `minmax()` always holds: if the space is narrower than one minimum-width column, Grid still makes that column at the minimum width, and it sticks out past the edge, so the page scrolls sideways. And if only one column fits but a card has `span 2`, Grid adds a column anyway, and that extra column comes out narrower than the first one, as in the `220px 122px` measurement above.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m03-grid-390.png" alt="The Exercise page at 390 pixels: the header is stacked, and all six cards are in one column." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *390 px (a phone): one column, header stacked. (real: rendered in Chromium at 390 px)*

<img src="../images/m03-grid-800.png" alt="The same page at 800 pixels: the header is one row, card one spans two of three columns." loading="lazy">

*800 px (a tablet): three columns, and the featured card spans two of them. (real: rendered in Chromium at 800 px)*

<img src="../images/m03-grid-1200.png" alt="The same page at 1200 pixels: four columns, the featured card spans two, and the page stops growing at 1100 pixels wide." loading="lazy">

*1200 px (a laptop): four columns. `main` has `max-width: 1100px`, so the cards stop growing. Notice that cards two and three are as tall as card one: items in the same grid row stretch to the row's height by default. (real: rendered in Chromium at 1200 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: how many columns at 1000 px? Write your guess down. You will check it in the Exercise.

### 7. How do responsive images work?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A photo big enough for a laptop is a waste of data on a phone. HTML lets you offer several sizes and lets the browser choose.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Four attributes and one pair of elements do the job:

- **`srcset`** lists the files and their real widths with a `w` descriptor. MDN's *Using responsive images in HTML* points out that `480w` "uses the `w` unit, not `px` as you might expect." The number must match the file's real pixel width.
- **`sizes`** tells the browser how wide the image will be shown, before the CSS has loaded. `(min-width: 700px) 50vw, 100vw` means "about half the viewport on wider screens, the full width otherwise." The browser uses the first condition that is true.
- **`width` and `height`** are the image's real pixel size, with no unit. MDN's `<img>` page says they let the browser work out the aspect ratio "prior to the image being loaded" and reserve the space, which stops the text below from jumping. Keep `img { max-width: 100%; height: auto; }` in your CSS so the image still shrinks.
- **`loading="lazy"`** waits to download an image until it is near the screen. MDN warns that lazy images especially need `width` and `height`, and that lazy loading only happens when JavaScript is enabled.
- **`<figure>` and `<figcaption>`** wrap an image and its caption so they belong together.

```html
<figure>
  <img src="images/photo-one-800.jpg"
       srcset="images/photo-one-400.jpg 400w,
               images/photo-one-800.jpg 800w,
               images/photo-one-1600.jpg 1600w"
       sizes="(min-width: 700px) 50vw, 100vw"
       width="1600" height="1000"
       loading="lazy"
       alt="Describe what the photo shows">
  <figcaption>A caption the reader can see.</figcaption>
</figure>
```

The browser also counts pixel density. A phone screen often has two or three device pixels per CSS pixel, so it picks a bigger file. The demo images have their own file name painted on them, so you can see which one loaded. Chromium chose (`img.currentSrc`, measured):

| Viewport | 1 pixel per CSS px | 2 pixels per CSS px |
|---|---|---|
| 390 px | photo-one-400.jpg | photo-one-800.jpg |
| 800 px | photo-one-400.jpg | photo-one-800.jpg |
| 1200 px | photo-one-800.jpg | photo-one-1600.jpg |

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> To see the reserved space, the page below asks for two photos that never arrive. The left one has `width` and `height`; the right one does not.

<img src="../images/m03-layout-shift.png" alt="Two panels. The left panel has a grey placeholder the size of the photo with the text below it. The right panel has no placeholder, and its text sits right under the heading." loading="lazy">

*While the photos were still loading, Chromium measured the left image at 221 px tall and the right one at 0 px. When the right photo arrives, its text jumps down. (real: rendered in Chromium at 800 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Pick the picture on your `practice-02` page. Find its real pixel size (right-click the file in File Explorer, **Properties → Details**). In its `<img>` tag, set `width` to the real width (replace `320` if it is there) and add `height` with the real height. Then add `img { max-width: 100%; height: auto; }` to `practice-02/styles.css` so the picture still fits the window. Save and press **F5**. The picture may now show larger, but never wider than the page.

### 8. How do you test at different widths?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> You do not need three devices to test three widths. DevTools can resize the page for you.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Open DevTools (F12), then press **Ctrl+Shift+M** (Chrome DevTools' shortcut for *Toggle Device Mode*; Edge uses the same DevTools). A toolbar appears above the page. Leave the dimensions on Responsive and type a width: 390, then 800, then 1200. You can also drag the handle on the side of the page. Chrome's documentation calls device mode "a first-order approximation" of a phone, so check on a real phone when you can.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m03-devtools-device.png" alt="A drawn browser with the device toolbar open, set to 390 by 844, a phone-width page in the middle, and the DevTools panel on the right with the device toolbar toggle highlighted." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The device toolbar sits above the page; the toggle is next to the Elements tab. Labels in your browser may differ slightly.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open your Home page in Edge or Chrome, open device mode (F12, then Ctrl+Shift+M), and try 390, 800 and 1200. Write down one thing that looks wrong at 390.

## Exercise

*Your hands, about 50 minutes (estimate).* Work in `practice-03`. Type it, do not paste it. The `srcset` and the grid line especially should go through your fingers once.

1. **Make the files.** In `practice-03`, create `index.html`, `styles.css` and a folder called `images`. Put three copies of any one photo in `images`, resized to 400, 800 and 1600 px wide, and name them `photo-one-400.jpg`, `photo-one-800.jpg` and `photo-one-1600.jpg`. (The Windows Photos app can resize; any image editor works.)
2. **Write the HTML.** The normal head, with the viewport line and a link to `styles.css`. In the body: a `<header class="site-header">` with a logo link (a plain text link with your site's name, such as `<a href="index.html">My site</a>`; no image needed) and a `<nav>` holding a `<ul class="nav-list">` of four links; then a `<main>` with an `<h1>` and a `<ul class="card-grid">` of six `<li class="card">` items. Give the first card `class="card featured"` and put the `<figure>` from Concept 7 in it. In its `<img>`, change `height="1000"` to the real height of your `photo-one-1600.jpg` (right-click the file, **Properties → Details**); `1000` is right only for a photo that is 1600 × 1000. The other five get an `<h2>` and a `<p>`.
3. **Write the base CSS, phone first.** The `box-sizing` rule from Concept 2. `img { max-width: 100%; height: auto; display: block; }`. The stacked `.site-header` from Concept 4. `.nav-list` with `display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; padding: 0;`. `main { max-width: 1100px; margin: 0 auto; padding: 1rem; }`. The `.card-grid` rule from Concept 6 (add `list-style: none; padding: 0;`). Give `.card` some padding, a border and a white background. Add `body { margin: 0; }` and `figure { margin: 0; }`: browsers give the page and every figure a margin by default. Without the `body` rule your column widths will not match the table in Concept 6; without the `figure` rule the photos do not fill their cards as they do in the pictures.
4. **Add the media query last.** At the bottom of `styles.css`, one `@media (min-width: 700px)` block that turns the header into a row and gives `.featured` `grid-column: span 2`.
5. **Look at three widths.** Open `index.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab. With DevTools open, press **Ctrl+Shift+M** to turn on device mode, and check 390, 800 and 1200. You should see 1, 3 and 4 columns. Now check your prediction from Concept 6 at 1000.
6. **Check the image.** Click in the Console. Type this line exactly as shown. You will learn how it works in Module 9; for now, read the answer it gives.

   ```js
   document.querySelector('.featured img').currentSrc
   ```

   Which file did your browser choose? Change the width, press **F5**, then type the line again. Device mode's Responsive setting counts 2 device pixels per CSS pixel (step 8a says why), so compare your answers with the "2 pixels per CSS px" column of the table in Concept 7.
7. **Watch the columns change.** Click in the Console. Type this line exactly as shown. You will learn how it works in Module 9; for now, read the answer it gives.

   ```js
   getComputedStyle(document.querySelector('.card-grid')).gridTemplateColumns
   ```

   The answer is a list of column widths. Count them.
8. **Break it on purpose (two ways).**
   - **a. Remove the viewport line.** Delete the `<meta name="viewport" …>` line, save, and press **F5** with device mode on at 390. The page is shrunk and the text is tiny. You do not need to pick a phone from the Dimensions menu: Responsive already acts like a phone by default, because the Chrome DevTools source code (the file `DeviceModeModel.ts`) sets its default device type to Mobile and its default pixel ratio to 2. Click in the Console. Type this line exactly as shown. You will learn how it works in Module 9; for now, read the answer it gives.

     ```js
     innerWidth
     ```

     The answer no longer matches the phone's 390. Chromium reported 980 when this post tested it the same way (a phone at 390 px, pixel ratio 2). Put the line back.
   - **b. Move the media query to the top.** Cut the `@media` block and paste it above the `.site-header` rule. Save, press **F5** and look at 1200 px. The header is stacked again. Write one sentence: why did the base rule win? Then move the block back to the bottom.

## Project (in the full packet)

You add an **Interests** page to `my-site` and build it as a responsive card grid: one card per interest, each with a photo in a `<figure>`, a short caption and a sentence about why you like it. On a phone it is one easy column; on a laptop it spreads into a grid, with your favorite interest spanning two columns. Every photo comes in sizes the browser can choose from, and the page never jumps while the photos load. The full brief, the step-by-step build, and the finishing work in Git are in the Module 3 packet. <a href="https://code559.gumroad.com/l/module-03-responsive-layout" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"Responsive design means writing a separate stylesheet for phones."*

What would you say? Hint: look at how many media queries the Exercise page used, and how many times the number of grid columns changed.

## Summary

Every element is a box of content, padding, border and margin, and `box-sizing: border-box` makes `width` mean the visible width. The viewport meta tag makes a phone lay the page out at its real width, so your media queries can fire. Mobile first means phone rules first, then `min-width` media queries below them, because the later of two equal rules wins. Responsive navigation stacks on a phone and becomes a row in a media query. `repeat(auto-fit, minmax(220px, 1fr))` makes as many columns as fit, `gap` spaces them, and `grid-column: span 2` widens one card. `srcset` with `w` descriptors and `sizes` let the browser pick an image file, `width` and `height` reserve its space, `loading="lazy"` delays it, and `figure` with `figcaption` keeps it with its caption. The DevTools device toolbar lets you test any width without another device.

## Check your understanding

1. A box has `width: 200px; padding: 10px; border: 2px solid;` and no `box-sizing` rule. How wide is it on screen? What if you add `box-sizing: border-box`?
2. Your `@media (min-width: 700px)` rule works at 1200 px on your laptop but never fires on your phone. Name the first thing you would check.
3. **What happens if this changes?** In `minmax(220px, 1fr)`, you change 220px to 400px. What happens to the number of columns at 800 px and at 390 px?

## Before next module

- [ ] `practice-03` shows 1, 3 and 4 columns at 390, 800 and 1200 px
- [ ] You have seen both breaks in step 8 and put both back
- [ ] Your `practice-03` page has the viewport line and the `box-sizing` rule
- [ ] The `@media` block in `practice-03/styles.css` is below the rules it changes
- [ ] If you did this module's packet project in my-site, saved it with the routine: git status → git add . → git commit -m "…" → git push → check the live page. (Your practice folder is not saved to GitHub.)

## Go further

- MDN: *The box model*; *Using media queries*; *Basic concepts of grid layout*; *repeat()*; *Using responsive images in HTML*; the `<img>` element page; `<meta name="viewport">`
- Chrome for Developers: *Simulate mobile devices with device mode*; *Keyboard shortcuts* (DevTools)
- freeCodeCamp: the responsive web design and CSS Grid lessons in the current curriculum (search "CSS Grid")

## What to keep

Keep `practice-03` with the media query back at the bottom, and a note of which image file your browser chose at each width. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "The box model"; MDN "Using media queries"; MDN "Basic concepts of grid layout"; MDN "repeat()"; MDN "Using responsive images in HTML"; MDN "`<img>`: The Image Embed element"; MDN "`<meta name="viewport">`"; Chrome for Developers "Simulate mobile devices with device mode" and "Keyboard shortcuts". Checked 2026-10-11: Chrome DevTools source code, `front_end/models/emulation/DeviceModeModel.ts` (GitHub, ChromeDevTools/devtools-frontend: Responsive defaults to Mobile with pixel ratio 2); HTML Standard "Rendering" (default margins of `body` and `figure`). Measurements made with Chromium 141 (headless, via Playwright).*
