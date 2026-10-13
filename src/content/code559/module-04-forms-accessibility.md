---
title: "Module 4: Forms and Accessibility"
subtitle: "Forms that send the right data and work for every visitor, with or without a mouse."
module: 4
series: Code559 Front-End Developer Course
estimated_time: "about 2 hours (estimate)"
---

# Module 4 — Forms and Accessibility

*Forms that send the right data and work for every visitor, with or without a mouse.*

**Time:** about 2 hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn to build forms with real controls, labels and radio groups, and to test them with the keyboard and style their states. It matters to every visitor: a missing label or name can leave a screen reader user guessing, or lose what a visitor typed. The browser already gives you most of the fix if you use the right elements.

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
  - [1. What are the parts of a form?](#1-what-are-the-parts-of-a-form)
  - [2. What does a form send, and why does `name` matter?](#2-what-does-a-form-send-and-why-does-name-matter)
  - [3. What makes radio buttons a group?](#3-what-makes-radio-buttons-a-group)
  - [4. What do `fieldset` and `legend` add?](#4-what-do-fieldset-and-legend-add)
  - [5. What does the `hidden` attribute do?](#5-what-does-the-hidden-attribute-do)
  - [6. How does a keyboard user move through a form?](#6-how-does-a-keyboard-user-move-through-a-form)
  - [7. What are `:focus-visible`, `aria-current` and a skip link?](#7-what-are-focus-visible-aria-current-and-a-skip-link)
  - [8. How do custom properties and state selectors style a control you cannot see?](#8-how-do-custom-properties-and-state-selectors-style-a-control-you-cannot-see)
  - [9. How do you read a design brief?](#9-how-do-you-read-a-design-brief)
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

- The parts of a form: `form`, `label` with `for`, `input` types, `textarea`, `button` and `required`
- The difference between `id` (for the page) and `name` (for the data)
- What a form sends when the browser submits it, and why only named controls send anything
- Radio buttons, where a shared `name` makes the group, and how `required` on one radio covers the whole group
- `fieldset` and `legend`, which give a group a title
- The `hidden` attribute
- Keyboard navigation: Tab between controls, arrow keys inside a radio group
- `:focus-visible`, `aria-current="page"` and the skip-link idea
- CSS custom properties (`:root`, `var()`), the state selectors `:checked`, `:hover` and `:focus-visible`, and a `.visually-hidden` class that hides a control without breaking it
- How to read a design brief and build the HTML before any CSS

## Why this matters

A form is where a visitor talks back to your site. If a label is not joined to its input, a screen reader user does not know what to type. If a control has no `name`, its value never leaves the page. If a custom-styled button cannot be reached with the Tab key, a keyboard user cannot use your form at all. None of those bugs show up when you test with a mouse.

The good news is that HTML already does most of the work. Real form controls come with keyboard behavior, validation and screen reader support built in. Your job is to use the right element, join the pieces correctly, and not break what the browser gives you when you add CSS.

By the end of this module your practice contact page is ready to send data, and you have built the HTML and CSS of a small rating card from a written brief.

## Before you start

1. Module 3 is done: you can use the viewport tag, `box-sizing: border-box`, and a mobile-first stylesheet.
2. In your course folder (for example `Documents\code559`), next to `my-site`, create a folder called `practice-04`. This is the throwaway folder for the Exercise. Nothing in it is published.
3. Put the mouse aside for a minute. Open any website and press **Tab** a few times. Watch where the focus goes. That is how many people use the web every day.

> **Checkpoint.** You have an empty `practice-04` folder, and you have moved through a page with the Tab key.

## Core concepts

### 1. What are the parts of a form?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A form is a `<form>` element holding controls the visitor fills in and a button that sends them.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Each control is an `<input>` with a `type` (`text`, `email`, `tel`, `radio`, `checkbox` and more), a `<textarea>` for longer text, or a `<button>`. Every control needs a `<label>`. MDN's `<label>` page explains that the label's `for` value is "the `id` of the labelable form control" it belongs to. Two good things follow. Clicking the label focuses or activates the control, which gives a bigger target on a phone. And, in MDN's words, "a screen reader will read out the label when the user is focused on the form input." `required` tells the browser not to send the form until that control has a value. `type="email"` also makes the browser check that the text looks like an email address.

```html
<label for="visitor-email">Email</label>
<input type="email" id="visitor-email" name="visitor-email" required>
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m04-contact-390.png" alt="A contact form at phone width with labels above four fields and a full-width Send message button." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *A contact form at 390 px. Every field has a visible label joined to it with `for` and `id`. The third field is missing something on purpose; Concept 2 shows what. (real: rendered in Chromium at 390 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> In step 1 of the Exercise you build this form as `practice-04/contact.html`. When you do, click each label's text. If the cursor does not jump into the field, that label's `for` does not match an `id`.

### 2. What does a form send, and why does `name` matter?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `id` and `name` look alike, but they have different jobs. `id` is for the page: labels, CSS and, later, JavaScript. `name` is for the data.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A form with no `method` uses GET. MDN's `<form>` page lists `get` as the default and says the form data is "appended to the `action` URL with a `?` separator." With no `action`, the data goes back to the same page. Each control is sent as `name=value`, and pairs are joined with `&`. A control with no `name` is not sent at all.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The form above was filled in (name, email, a nickname and a message) and submitted for real in Chromium.

<img src="../images/m04-contact-url.png" alt="A browser address bar with the file address of practice-04/contact.html, ending in ?visitor-name=Sam&amp;visitor-email=sam%40example.com&amp;message=Hello+there." loading="lazy">

*Three pairs arrived. The nickname was typed but is missing, because its input has no `name`. The browser also encoded the text: `@` became `%40` and a space became `+`. (real output, rendered; captured on Linux, with the folder path changed to the course folder. The page was opened from disk and submitted in Chromium; the browser frame is drawn.)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: if you remove `name` from the message box too, how many pairs will the address show? (Two.)

### 3. What makes radio buttons a group?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A radio button lets the visitor pick exactly one choice from a few.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The `name` makes the group. MDN's radio page: "A radio group is defined by giving each of radio buttons in the group the same `name`." Selecting one turns the others off. Each radio still needs its own `id`, so its label can point to it, and its own `value`, because the checked radio sends `name=value`. MDN warns that a radio with no `value` sends the string `on`, which tells you nothing.

`required` is unusual on radios. MDN says that if any radio in a same-named group has `required`, "a radio button in that group must be checked, although it doesn't have to be the one with the attribute applied." So you put `required` on one radio, and it covers the whole group.

```html
<input type="radio" name="hours" value="0-2" id="hours-low" required>
<label for="hours-low">0 to 2</label>
<input type="radio" name="hours" value="3-5" id="hours-mid">
<label for="hours-mid">3 to 5</label>
<input type="radio" name="hours" value="6-plus" id="hours-high">
<label for="hours-high">6 or more</label>
```

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> First, a real submit with "3 to 5" chosen:

<img src="../images/m04-radio-url.png" alt="A browser address bar with the file address of practice-04/radio-practice.html, ending in ?hours=3-5, above the radio form." loading="lazy">

*One group sends one pair: the group's `name` and the checked radio's `value`. (real output, rendered; captured on Linux, with the folder path changed to the course folder. The page was opened from disk and submitted in Chromium; the browser frame is drawn.)*

Second, `required` checked in the Console with nothing selected:

<img src="../images/m04-required-console.png" alt="A Console session: checkValidity is false, the third radio has no required attribute but its valueMissing is true, the message is Please select one of these options, and after clicking the third radio checkValidity is true." loading="lazy">

*Only the first radio has `required`, yet the third radio also reports `valueMissing: true`. Checking any one radio makes the whole form valid. Pressing Send with nothing chosen left the address unchanged and moved focus to the first radio. (real output, rendered; Chromium 141. The message text may be worded differently in your browser or language.)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Look at one radio in the code above and explain to yourself, out loud, what its `id`, `name` and `value` each do.[^recite] Then check yourself against the paragraph above.

### 4. What do `fieldset` and `legend` add?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A sighted visitor sees the question above the radios. A screen reader user moving into the group hears a label like "3 to 5," and nothing about what the numbers mean, unless the group has a title.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN's `<fieldset>` page says it is "used to group several controls," with "a nested `<legend>` element providing a caption." Wrap the radios in `<fieldset>`, and put the question in `<legend>` as the first thing inside it. It costs two tags.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> In the keyboard picture in Concept 6, the box around the radios is the fieldset, and "How many hours did you code this week?" sits in its border because it is the legend.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Any group of radios or checkboxes you write from now on starts with `<fieldset>` and `<legend>`.

### 5. What does the `hidden` attribute do?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Sometimes a page holds a part it is not showing yet, like a thank-you message that appears after a form is sent.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN's `hidden` page says "the browser will not render elements that are in the hidden state," and "if something is marked hidden, it is hidden from all presentations, including, for instance, screen readers." It is also out of the Tab order. One warning from the same page: a CSS `display` rule on the element (for example `display: block`) overrides `hidden`, so do not give a hidden element a `display` value in your stylesheet.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> On the skip-link page in Concept 7, a `<section hidden>` holds a button. Chromium measured the section at `offsetHeight` 0 with computed `display: none`. Pressing Tab eight times visited the skip link, four nav links and the visible button, and never reached the hidden button.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: you remove `hidden` from that section. Name two things that change. (It appears, and its button joins the Tab order.)

### 6. How does a keyboard user move through a form?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Without a mouse, a visitor uses **Tab** to move forward, **Shift+Tab** to move back, **Space** or **Enter** to press, and the **arrow keys** inside some controls.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A radio group is one stop in the Tab order. Tab enters the group, the arrow keys move the choice inside it, and the next Tab leaves the group. You get all of this for free with real `<input type="radio">` elements. You lose it if you build fake radios out of `<div>`s.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The radio page from Concept 3, driven by keyboard only in Chromium. After each key press the page was captured and asked which element had focus and which radio was checked.

<img src="../images/m04-keyboard.png" alt="Four captures of the radio form. After Tab, the first radio has a focus ring and nothing is checked. After ArrowRight, the second radio is focused and checked. After another ArrowRight, the third. After Tab, the Send button has the ring." loading="lazy">

*Tab put focus on the group without choosing anything. Each arrow key moved the focus **and** the choice. The second Tab left the group and went to Send. (real: rendered in Chromium; captured on Linux. Edge and Chrome on Windows use the same engine; check it yourself in step 5 of the Exercise.)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open `practice-04/contact.html` (step 1 of the Exercise) in Edge or Chrome, put the mouse aside, and fill in the whole form with the keyboard. Note anything you could not reach.

### 7. What are `:focus-visible`, `aria-current` and a skip link?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Three small tools make keyboard use pleasant: a clear focus ring, a marker for the current page, and a shortcut past the menu.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> **`:focus-visible`** is a CSS pseudo-class. MDN says it matches a focused element when the browser decides "the focus should be made evident," so you can style the ring for keyboard users without a ring appearing on every mouse click. In Chromium, a link clicked with the mouse did not match `:focus-visible`; the next link reached with Tab did. Never remove the outline without replacing it.

**`aria-current="page"`** goes on the nav link for the page the visitor is on. It is an ARIA attribute. ARIA (short for Accessible Rich Internet Applications) is a set of roles and attributes that pass extra information to screen readers and other assistive tools when HTML alone has no way to say it. MDN's *ARIA: aria-current attribute* says it marks "the current item within a container or set of related elements," and `page` means the current page. Screen readers announce it, and you can style it with `a[aria-current="page"]`. Square brackets in a selector match an attribute, so this one means "a link whose `aria-current` is exactly `page`."

A **skip link** is the first link on the page. It jumps to `<main id="main">`. It sits off screen until it gets focus, so mouse users never see it and keyboard users skip the whole menu with one Enter. In the CSS below, `position: absolute` takes the link out of the normal flow of the page so that `top` can place it: `top: -60px` puts it above the top edge, out of sight, and `top: 12px` brings it back into view when it has focus.

A ring also has to stand out from what is behind it. MDN's *Color contrast* asks for at least 3:1 for parts of the interface. The dark orange ring `#b45309` has 5.0:1 on white but only 2.5:1 on the dark navy bar in the pictures below, so the links on that bar and the skip link, which appears over the bar, get a light orange ring, `#fdba74` (7.3:1 on the navy). Use the light ring only where the background behind the ring is dark: on white, `#fdba74` has only 1.7:1. `outline-color` changes only the ring's color and keeps its width and style.

```css
.skip-link { position: absolute; top: -60px; }
.skip-link:focus { top: 12px; }
a:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
nav a:focus-visible { outline-color: #fdba74; }
.skip-link:focus-visible { outline-color: #fdba74; }
nav a[aria-current="page"] { text-decoration: underline; font-weight: 700; }
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m04-skip-link.png" alt="A page whose first Tab reveals a Skip to main content link with a light orange focus ring, drawn over the dark navigation bar." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The first Tab on the page reveals the skip link. Pressing Enter jumped to `<main>` (Chromium reported the address ending in `#main`), and the next Tab started from there: it went straight to the button in the main content. (real: rendered in Chromium at 600 px)*

<img src="../images/m04-focus-visible.png" alt="The same page after three Tabs: the About link on the dark navigation bar has a light orange focus ring and is bold and underlined." loading="lazy">

*Three Tabs in: the light orange ring is the `:focus-visible` style for links on the navy bar. About is bold and underlined because it has `aria-current="page"`. (real: rendered in Chromium at 600 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: a site has Home, About and Contact pages, each with the same three nav links. On the Contact page, which link gets `aria-current="page"`? (Only the Contact link. Each page's own link gets it; no other link does.) If you did the packet projects, add `aria-current="page"` to each page's own nav link in `my-site` now.

### 8. How do custom properties and state selectors style a control you cannot see?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A plain radio circle is tiny and hard to style. A common pattern is to hide the circle, style the label as a big button, and let the real radio keep doing its job underneath.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Start with **custom properties**. MDN's *Using CSS custom properties (variables)* says it is "common practice" to define them on `:root` so they can be used everywhere. In HTML, `:root` matches the `<html>` element, which holds the whole page. You read the values with `var()`. Names start with two dashes and are case sensitive.

Next, hide the radio with a **`.visually-hidden`** class. It shrinks the element to one clipped pixel, so it is invisible but still in the page: it still takes focus, is still announced by screen readers, and is still sent with the form. `display: none` and `hidden` work differently: they take the control out of sight, out of the Tab order and away from screen readers. A checked or filled control hidden that way is still sent with the form, but a keyboard or screen reader user can no longer reach it.

Finally, style the label from the radio's **state**. Put each input right before its label. `+` selects the next sibling, so `input:checked + label` means "the label right after a checked radio."

```css
:root {
  --ring: #b45309;
  --hover: #fde2b8;
  --on: #1d3557;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.choices label:hover { background: var(--hover); }
.choices input:focus-visible + label { outline: 3px solid var(--ring); }
.choices input:checked + label { background: var(--on); color: white; }
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m04-state-selectors.png" alt="Three round buttons labeled 1, 2 and 3. Button 2 is dark with a dark orange ring around it; button 3 is light orange." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *2 is checked (dark) and has keyboard focus (ring); the mouse is over 3 (`:hover`). The radios are invisible, yet Tab landed on the checked one, and Send produced `?pick=2`. When the inputs were set to `display: none` instead, the first Tab skipped the group and went straight to Send. (real: rendered in Chromium at 420 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: you swap the order of one input and its label in the HTML. Which state style stops working for that choice, and why does `+` explain it?

### 9. How do you read a design brief?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> At work you rarely get code. You get a brief: a picture of the finished thing, what the visitor must be able to do, the words, and the colors.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Read the brief twice. Then turn each part of the picture into an element, **before** you write any CSS. A heading is an `<h1>`. A choice of one from five is a `<fieldset>` with a `<legend>` and five radios that share a name. A button that sends is `<button type="submit">`. A message that appears later is a `<section hidden>`. Test that HTML with the keyboard and a real submit. If the page works with no CSS, it will keep working when the CSS is added. If it does not, CSS will only hide the problem.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m04-brief.png" alt="A sketch of a rating card with lines from each part to the element it becomes: heading to h1, paragraph to p, five circles to fieldset legend and radios, the button to button type submit, and a later thank-you to section hidden. A side list shows what the visitor can do and three color names." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Reading a brief means naming the element for each piece of the picture. Colors wait for the CSS step.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Look at the practice contact page you build in step 1 of the Exercise (`practice-04/contact.html`) and write its "brief" in three lines: what is on it, what the visitor can do, what it sends.

## Exercise

*Your hands, about 45 minutes (estimate).* Work in `practice-04`. Type it, do not paste it. `id`, `for`, `name` and `value` should go through your fingers once.

1. **Build a contact page.** Create `contact.html` with the normal head (charset, viewport, title). In the body, add `<h1>Contact me</h1>` and a `<form>`. Inside the form, write four labels, each followed by its field and joined to it with `for` and `id`, as in Concept 1:
   - **Your name:** an `<input type="text">` with `id="visitor-name"`, `name="visitor-name"` and `required`.
   - **Email:** the two lines from Concept 1.
   - **Nickname:** `<input type="text" id="nickname">` with **no** `name`. Leave it out on purpose.
   - **Message:** `<textarea id="message" name="message" required></textarea>`.

   End the form with `<button type="submit">Send message</button>`. Open `contact.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. Your page will look plainer than the picture in Concept 1, which adds a little CSS; that is fine. Click each label's text: the cursor should jump into its field. Then fill in all four fields and press **Send message**. The address bar should end the way it does in the Concept 2 picture: three `name=value` pairs, and no nickname.
2. **Write the group.** Create `radio-practice.html` with the normal head (charset, viewport, title). In the body, type the form from Concept 3 inside a `<form>`, wrapped in `<fieldset>` with `<legend>How many hours did you code this week?</legend>`, followed by `<button type="submit">Send</button>`.
3. **Use the labels.** Open `radio-practice.html` in Edge or Chrome, the same way as in step 1. Click the words, not the circles. Each label selects its radio, and choosing one turns the others off.
4. **Send it.** Choose "3 to 5" and press Send. Look at the address bar: it should end in `?hours=3-5`. If it does not, check the `name` and `value` you typed.
5. **Keyboard only.** Press **F5**. Click an empty part of the page, then press Tab until the group has focus. Press the arrow keys. Press Tab again. Write one sentence: what do the arrow keys do inside the group, and what does Tab do?
6. **Test `required`.** Press **F5**, so nothing is chosen, and press Send. The browser refuses to send, moves focus to the group and shows a short message, even though only the first radio says `required`. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab. Type this line exactly as shown. You will learn how it works in Module 9; for now, read the answer it gives.

   ```js
   document.querySelector('form').checkValidity()
   ```

   It returns `false`. Choose any radio and type the line again.
7. **Break it on purpose.** Change the **second** radio's `name` from `hours` to `hourz`. Save, press **F5**, and click all three labels. Two radios stay on at once.

   <img src="../images/m04-hourz-break.png" alt="The radio form with 3 to 5 and 6 or more both selected, above a Console that counts 2 checked inputs named hourz and hours." loading="lazy">
   
   *One typo made a second group. The Console confirms two checked radios, `hourz=3-5` and `hours=6-plus`. Submitting now would send both. You do not need to type these Console lines; they only show the check behind the picture, and a real Console prints the list with single quotes. (real: rendered in Chromium; Console values from a real run)*

   Write one sentence: what changed, and why? Then put the name back to `hours`.
8. **Style it without breaking it.** Create `states.html` with the same kind of group (three choices, `name="pick"`). Give each input `class="visually-hidden"` and put each input directly before its label inside `<fieldset class="choices">`. Add a `<style>` element inside `<head>` (it holds CSS in the HTML file itself, instead of in a separate `styles.css`) with the CSS from Concept 8, plus a size and round shape for `.choices label` (for example `display: inline-block; width: 48px; height: 48px; border-radius: 50%; background: #eee; text-align: center; line-height: 48px;`). Open `states.html` in Edge or Chrome and test with the mouse, then with Tab and the arrow keys. The ring follows the keyboard.
9. **Break it again.** Add `.gone { display: none; }` to your `<style>`, then change one input's `class="visually-hidden"` to `class="gone"`. Save, press **F5**, and Tab into the group. Write one sentence: what happened to that choice for the keyboard? Put it back.

## Project (in the full packet)

You build a **rating card** from a written brief, as a new page in `my-site`: a small card that asks "Rate this lesson," offers five round choices from 1 to 5, and has a Send rating button. It is your own design, with your own colors stored as custom properties, a visually hidden legend, radios you cannot see but can reach with the keyboard, clear `:hover`, `:checked` and `:focus-visible` states, and a thank-you section that waits with `hidden`. You build the HTML first and test it with no CSS, then add the look, phone first. Its JavaScript, which swaps the two states, comes in Module 10. The packet also adds a Contact page to `my-site`, built the same way as your practice contact page.

<img src="../images/m04-rating-card.png" alt="A finished rating card in two states. Left: Rate this lesson, five circles with 4 filled teal, and a dark Send rating button. Right: a check icon, You chose 4 out of 5, and Thanks for the feedback." loading="lazy">

*The kind of card you will build. The thank-you state was shown here by removing `hidden` in the page by hand, because the card's JavaScript is Module 10. (real: rendered in Chromium at 390 px)*

The full brief, the step-by-step build, and the finishing work in Git are in the Module 4 packet. <a href="https://code559.gumroad.com/l/module-04-forms-accessibility" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"The radio circle is what the visitor clicks, so that is where the styling and the behavior go."*

What would you say? Hint: in step 3 of the Exercise, which element received your clicks? And in step 8, which element did the CSS turn into a round button?

## Summary

A form holds controls, each joined to a `<label>` by `for` and `id`, and `required` stops the form until a control has a value. `id` is for the page and `name` is for the data. A form with no `method` sends `name=value` pairs in the address after a `?`, and a control with no `name` sends nothing. Radios with the same `name` form a group where only one can be on, and `required` on one radio covers the group. `<fieldset>` and `<legend>` give the group a title for people who cannot see it. `hidden` removes an element from sight, from screen readers and from the Tab order. Tab moves between controls and the arrow keys move inside a radio group. `:focus-visible` styles the keyboard focus ring, `aria-current="page"` marks the current nav link, and a skip link jumps past the menu. Custom properties on `:root` hold your colors, state selectors style the label from the radio's state, and `.visually-hidden` hides a control without breaking it. A brief is read twice and built as HTML first.

## Check your understanding

1. Only the first radio has `required`, but submitting with nothing selected is refused. What is `required` really attached to?
2. Your Contact form submits, but the message never appears in the address. Name the two most likely causes.
3. **What would you test** to prove that five labels are correctly joined to their five radios, without reading the HTML?

## Before next module

- [ ] `radio-practice.html` sends `?hours=…` and you wrote your two sentences from steps 5 and 7
- [ ] `states.html` works with the mouse and the keyboard, and you saw what `display: none` broke
- [ ] Every label on `practice-04/contact.html` focuses its field when clicked, and every field that should send data has a `name`
- [ ] You can say which nav link gets `aria-current="page"` on each page of a site, and how `nav a[aria-current="page"]` styles it
- [ ] If you did this module's packet project in my-site, saved it with the routine: git status → git add . → git commit -m "…" → git push → check the live page. (Your practice folder is not saved to GitHub.)

## Go further

- MDN: `<form>`; `<label>`; `<input type="radio">`; `<fieldset>`; the `hidden` global attribute; `:focus-visible`; *ARIA: aria-current attribute*; *Using CSS custom properties (variables)*; *Sending form data*
- freeCodeCamp: the HTML forms and accessibility lessons in the current curriculum (search "accessibility")

## What to keep

Keep `practice-04` with all three files fixed, and your sentences from steps 5, 7 and 9. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "`<form>`: The Form element"; MDN "`<label>`: The Label element"; MDN "`<input type="radio">`"; MDN "`<fieldset>`: The Field Set element"; MDN "hidden" (global attribute); MDN ":focus-visible"; MDN "ARIA: aria-current attribute"; MDN "Using CSS custom properties (variables)"; MDN "Sending form data". Checked 2026-10-11: MDN "hidden" (global attribute, again); MDN ":root"; MDN "ARIA"; MDN "Attribute selectors"; MDN "position"; MDN "`<style>`: The Style Information element"; MDN "Color contrast"; MDN "outline-color"; MDN "clip" (deprecated; the page points to `clip-path`); MDN "clip-path". Submissions, validity checks and keyboard behavior tested in Chromium 141 (headless, via Playwright) on Linux. Checked 2026-10-12: Ozubko and MacLeod, "The Production Effect in Memory: Evidence That Distinctiveness Underlies the Benefit," *Journal of Experimental Psychology: Learning, Memory, and Cognition* 36(6), 2010 (the footnote on saying code out loud).*

[^recite]: **Why out loud?** Most people have recited something to learn it by heart: a phone number, a poem, lines for a play. Words you say aloud stick better than words you read silently; memory researchers call this the production effect (Ozubko and MacLeod, 2010). Explaining code to yourself out loud uses the same idea. It also shows you the line you cannot explain yet, and that line is the one to study next.
