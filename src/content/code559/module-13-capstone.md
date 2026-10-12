---
title: "Module 13: Capstone"
subtitle: "Build a small app from a written requirement, prove every row works, and finish your portfolio."
module: 13
series: Code559 Front-End Developer Course
estimated_time: "about 2 hours for this post; the full capstone takes longer (estimate)"
---

# Module 13 — Capstone

*Build a small app from a written requirement, prove every row works, and finish your portfolio.*

**Time:** about 2 hours for this post; the full capstone takes longer (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn to turn a written requirement into tasks, and to finish each feature with the nine-step completion standard. Then you check the whole site and audit your portfolio. It's the skill real work asks for: building from a short list with no step-by-step guide, and knowing when you are actually done.

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
  - [1. How do you read a requirement table?](#1-how-do-you-read-a-requirement-table)
  - [2. How do you turn a row into tasks?](#2-how-do-you-turn-a-row-into-tasks)
  - [3. What does the finished sample look like?](#3-what-does-the-finished-sample-look-like)
  - [4. What is the nine-step completion standard?](#4-what-is-the-nine-step-completion-standard)
  - [5. What is code-origin honesty?](#5-what-is-code-origin-honesty)
  - [6. How do you run a final accessibility pass?](#6-how-do-you-run-a-final-accessibility-pass)
  - [7. What is a portfolio audit?](#7-what-is-a-portfolio-audit)
  - [8. What comes after the core course?](#8-what-comes-after-the-core-course)
- [Exercise](#exercise)
- [Project (in the full packet)](#project-in-the-full-packet)
- [Common misconception](#common-misconception)
- [Summary](#summary)
- [Check your understanding](#check-your-understanding)
- [Before next module: what comes next](#before-next-module-what-comes-next)
- [Go further](#go-further)
- [What to keep](#what-to-keep)

<!-- contents:end -->

**In this module you will learn:**

- How to read a written requirement table and turn each row into tasks
- How to plan before you code: structure first, then look, then behavior
- The Code559 nine-step completion standard: predict, run, explain, modify, debug, retest, commit, push, verify live
- Code-origin honesty: how to mark and explain any line a tool wrote
- How to run a final accessibility pass on the whole site: keyboard, labels, alt text and color contrast
- How to audit your portfolio before you share it
- What to do after the core course, and what this course does not teach

## Why this matters

Until now every module told you what to build, step by step. Real work does not come like that. It comes as a short written list: "the visitor can do this, the page must do that." Someone hands you the list and expects a working page. The skill this module teaches is turning that list into code without a guide holding your hand.

The second skill is knowing when you are done. "It seems to work" is not done. In this course a feature is done when it has gone through nine steps, ending with you checking it on the live site. That standard is what makes your portfolio something you can stand behind in an interview: you can explain every line, and you can show that every requirement was tested.

This is also the end of the core course. The last part of the module is a whole-site check and a short list of what to do next.

## Before you start

1. Finish Modules 11 and 12. You need the Action / Expected / Actual test table from Module 11 and the full Git routine from Module 12.
2. Make sure your personal site is live on GitHub Pages and that `git status` in `my-site` says the working tree is clean.
3. In your course folder (for example `Documents\code559`), create a throwaway folder called `practice-13` and open it in VS Code with **File → Open Folder…**.
4. Have your Module 11 test-table template open in a text file.

> **Checkpoint.** Your live site loads, `my-site` has nothing uncommitted, and you have an empty `practice-13` folder open in VS Code.

## Core concepts

### 1. How do you read a requirement table?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A **requirement** is one thing the finished page must do, written in plain words. A requirement table lists them one per row, with a second column that says how you will know the row is met.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Read the whole table before you write any code. Then read it again, one row at a time, and underline the nouns (the things that must exist on the page) and the verbs (what the visitor does, and what the page does back). The "done when" column is your test. If a row has no "done when," write one before you start; otherwise you cannot tell when you have finished it. Here is a small sample from a task planner called Pocket Planner:

| # | Requirement | Done when |
| --- | --- | --- |
| 1 | A visitor can type a task and add it with the Add button or the Enter key. The text box has a visible label. | The task appears at the end of the list and the box empties. |
| 2 | An empty or spaces-only task is not added. A message says why. | The list does not change, and the message appears under the form. |
| 3 | Each task has a checkbox. Checking it marks the task done, and a line shows how many are done. | The task text is struck through, and the line reads, for example, "1 of 3 done." Unchecking undoes both. |
| 4 | One column on a phone. From 700 px wide, the form sits beside the list. | At 390 px and 699 px the panels stack; at 700 px and 1200 px they sit side by side. |

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Row 2's nouns are "task" and "message." Its verbs are "is not added" and "says why." Its test is "the list does not change, and the message appears."

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Underline the nouns and verbs in row 3. How many things must exist on the page for row 3 alone?

### 2. How do you turn a row into tasks?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A row is too big to code in one go. You break it into small tasks, one per layer.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> For each row ask three questions, in this order. **Structure:** what HTML must exist? **Look:** what CSS does it need? **Behavior:** what JavaScript makes it act? Then add a fourth line: **the test row**, copied straight from "done when" into your Action / Expected / Actual table. Structure comes first because CSS and JavaScript both need elements to select. Behavior comes last because it is the hardest to test, and it is easier to test on a page that already looks right.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m13-req-to-tasks.png" alt="A requirement row on the left with four arrows to boxes labeled Structure (HTML), Look (CSS), Behavior (JS) and Test row." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Row 2 as four small tasks. Each one is small enough to finish and check in a few minutes.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Write the four task lines for row 1 of the sample table. Keep each to one sentence.

### 3. What does the finished sample look like?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> To check that the four rows above can be built with what you already know, a minimal Pocket Planner was built for this post from those rows. It adds only two small things no row asks for: a header with the planner's name and a short tagline, and the line "No tasks yet." when the list is empty.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Most of it uses things from earlier modules: a form with a label, `querySelector`, a `submit` listener with `preventDefault()`, `.trim()` and an empty check, `createElement` and `textContent` (no `innerHTML`), `classList`, and one media query. Then each row's "done when" was run as a test. Row 3 needs one thing no earlier module taught: the checkbox's `change` event.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A checkbox fires a **`change`** event each time it is checked or unchecked, by mouse or keyboard (MDN, *HTMLElement: change event*). Inside the listener, the box's **`.checked`** property is `true` if the box is now checked and `false` if not, so the planner gives each new checkbox its own `change` listener when it makes the task. For a page with `<input id="done-box" type="checkbox">` and a `<label>` tied to it:

```js
const doneBox = document.querySelector("#done-box");
doneBox.addEventListener("change", function () {
  console.log("checked is", doneBox.checked);
});
```

*In Chromium, the first click logged `checked is true` and the second logged `checked is false`. Clicking the box's label, or pressing Space on the focused box, did the same.*

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m13-planner-390.png" alt="Pocket Planner at 390 px: a blue header, an Add a task panel, and below it a Tasks panel reading 1 of 3 done, with the first task checked and struck through." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Row 4 at 390 px: one column. Rows 1 and 3 together: three tasks added with the Enter key, the first one checked, and the line reads "1 of 3 done." (real: rendered in Chromium at 390 px, tasks typed and checked by script)*

<img src="../images/m13-planner-1200.png" alt="Pocket Planner at 1200 px: the Add a task panel on the left and the wider Tasks panel on the right." loading="lazy">

*Row 4 at 1200 px: two columns. Measured in Chromium, the grid has one column at 699 px and two at 700 px, which is the boundary the row asks for. (real: rendered in Chromium at 1200 px)*

<img src="../images/m13-planner-empty.png" alt="Pocket Planner at 390 px with the red message Type a task first. under the Add task button and No tasks yet. in the Tasks panel." loading="lazy">

*Row 2: three spaces submitted. The list stays empty and the message appears. (real: rendered in Chromium at 390 px)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Look at the 390 px picture and point to the element that proves each of rows 1, 3 and 4.

### 4. What is the nine-step completion standard?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Code559 has one definition of done. A feature is finished when it has passed all nine of these steps, in order.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> **Predict:** before you run new code, write what you expect it to do. **Run:** do it once. **Explain:** say, line by line, why it did what it did. **Modify:** change one thing on purpose and predict again. **Debug:** when actual and expected differ, find the gap with the Module 11 method. **Retest:** run the same test row again. **Commit:** one change, with a message that says what it does. **Push:** send it to GitHub. **Verify live:** open the real site, refresh it, and run the test row there. The last step catches the problems that only happen online, such as a file name whose capital letters match on your computer but not on the server.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m13-nine-steps.png" alt="Nine boxes in three rows: Predict, Run, Explain; Modify, Debug, Retest; Commit, Push, Verify live." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Read it as three groups: understand it (1–3), make it right (4–6), ship it (7–9). Skipping a group is how "it worked on my computer" happens.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Think of the last feature you built (in a practice folder or on your own site). Which of the nine steps did you skip?

### 5. What is code-origin honesty?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> This course has one honesty rule, set in Module 0: **if a tool wrote a line, you mark it and explain it.** The capstone is where that rule matters most, because it is the piece people will read.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> "A tool" means anything that wrote code for you: an AI assistant, a code generator, a snippet you copied from a website. You may use them after this course. What you may not do is present their lines as yours without understanding them. The mark is a comment above the lines, saying where they came from, what they do, and what you changed. If you cannot write the "what they do" part, you are not ready to commit those lines.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge">

```js
// Tool-written: the next two lines came from [name the tool or site].
// What they do: count the checked boxes and show "done of total".
// What I changed: renamed the variables to match my page.
```

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Search your `my-site` folder for any line you did not type yourself. Mark it with a comment like the one above, or rewrite it.

### 6. How do you run a final accessibility pass?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Before you call the site finished, check it the way a visitor with different needs would use it. Four checks cover most problems.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> **Keyboard:** put the mouse away and Tab through every page (Module 11). Every link, button, text box and checkbox must be reachable and show a visible focus ring, and Space or Enter must work on it. **Labels:** every form field needs a `<label>` tied to it with `for` and `id`; MDN's *HTML: A good basis for accessibility* points out you can then "click the label to select or activate the form element." **Alt text:** every `<img>` needs an `alt`. The same MDN page says the alt "should be brief and concise," and an image that is only decoration gets an empty `alt=""`. **Color contrast:** MDN's *Color contrast* page gives the WCAG AA minimums as **4.5:1** for normal text and **3:1** for large text (at least 18pt, or 14pt bold; W3C's *Understanding SC 1.4.3: Contrast (Minimum)* puts these at about 24px, or about 18.5px bold). Interface parts need contrast too: MDN's *Color contrast* page also asks for at least **3:1** for "user interface components and graphical objects," and that includes a focus ring you style yourself, against the colors next to it (W3C, *Understanding SC 1.4.11: Non-text Contrast*). To check in Chrome or Edge, Chrome's *Make your website more readable* says: open DevTools, click **Inspect** and hover over text; the tooltip shows the contrast ratio, with a warning icon if it is too low. For a whole page at once, the same page names a **Lighthouse** accessibility report.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The sample planner passed the keyboard check: from the text box, two presses of Tab reached the first checkbox, and Space checked it.

<img src="../images/m13-planner-focus.png" alt="Pocket Planner at 390 px with a dark orange focus ring around the first task's checkbox, which is checked, and the line 1 of 2 done." loading="lazy">

*Keyboard only: Tab, Tab, Space. The ring shows where focus is, and the summary updated, so row 3 works without a mouse. (real: rendered in Chromium at 390 px with real Tab and Space key presses)*

The planner's colors were also checked with a short Node script that applies the WCAG contrast formula. You do not need to write such a script; DevTools shows the same kind of ratio.

<img src="../images/m13-contrast.png" alt="A terminal in practice-13 running node contrast.js, listing six color pairs with the ratio each needs: four text colors pass 4.5:1 with ratios from 6.54:1 to 15.11:1, the focus ring #b45309 passes 3:1 at 5.02:1, and a light gray on white fails at 2.56:1." loading="lazy">

*The four text colors the planner uses pass 4.5:1, and its dark orange focus ring passes the 3:1 it needs. The light gray is there to show what a fail looks like: it is the kind of "soft" gray that looks elegant and is hard to read. (real output, rendered; captured on Linux, with the folder path changed to the course folder)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open your home page, open DevTools, click Inspect, and hover over your smallest, palest text. Write down the ratio.

### 7. What is a portfolio audit?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An employer looks at your site for a minute or two, and at your GitHub repositories for less. An audit makes sure that minute goes well.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Open your live site on a phone and on a computer, and go through this list. Every page loads, and every link in the navigation goes where it says. The Console shows no red lines on any page. Every interactive feature has a test plan (Module 11) that you reran this week. Each repository has a README that says what it is, how to see it live, and what you learned. Commit messages say what each change does. Nothing in any repository is a private file, a password, or a half-finished experiment you would not want read.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Treat the audit like the test table: Action ("open Contact on a phone"), Expected ("form fits, label visible"), Actual.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Do the first two checks now, on your phone.

### 8. What comes after the core course?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> You can now build, test, publish and explain a multi-page site with HTML, CSS and JavaScript. That is the core.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A later, optional module (not yet published) will cover a small **Node server** and **`fetch`**, so a form can send data to a program you wrote and show the reply without leaving the page. After that, many learners want a framework. Frameworks are a separate product, not part of this course, and you should not move to one just because you reached the last module. Move when plain JavaScript feels easy to read and write, and you can explain why a framework would help with a page you have actually built.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> A good sign you are ready for more: you can rewrite one of your own functions from a one-sentence description, with the file closed.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Pick one function you wrote in Modules 9 to 11 (or on your own site). Close the file. Rewrite it from memory, then compare.

## Exercise

*Your hands, about 45 minutes (estimate).* Type it, do not paste it. You will turn a three-row requirement into tasks and build **one** row through the first seven of the nine steps, up to commit.

The requirement, for a "Goal counter" page:

| # | Requirement | Done when |
| --- | --- | --- |
| 1 | A "+1" button raises a count shown on the page. The count starts at 0. | On load the count reads 0; after three clicks it reads 3. |
| 2 | A "Reset" button sets the count back to 0. | After any number of clicks, Reset shows 0. |
| 3 | The count stops at 10, and a message says the goal is reached. | The eleventh click leaves the count at 10 and the message appears. |

1. **Make tasks.** For each of the three rows, write Structure, Look, Behavior and Test lines (concept 2). That is twelve short lines. Do not code rows 2 or 3; the list is the deliverable for them.
2. **Make the folder.** In `practice-13`, create a folder called `goal-counter` with `index.html` and `script.js`.
3. **Structure for row 1.** Type `index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Goal counter</title>
   </head>
   <body>
     <h1>Goal counter</h1>
     <p>Count: <span id="count">0</span></p>
     <button id="add-button" type="button">+1</button>
     <script src="script.js"></script>
   </body>
   </html>
   ```

4. **Behavior for row 1.** Type `script.js`:

   ```js
   const countText = document.querySelector("#count");
   const addButton = document.querySelector("#add-button");
   let count = 0;

   function addOne() {
     count = count + 1;
     countText.textContent = count;
   }

   addButton.addEventListener("click", addOne);
   ```

5. **Predict, run, explain.** Write your prediction for row 1's test. Open `index.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab. Click +1 three times, and fill in Actual. (In Chromium: 0 on load, 3 after three clicks.) Then explain each line of `script.js` to yourself, out loud, in one sentence.[^recite]
6. **Modify.** Change `count + 1` to `count + 2`. Predict the count after three clicks. Run it. Change it back.
7. **Break it on purpose.** Change the last line to `addButton.addEventListener("click", addOne());` (with the parentheses). Predict first. Then run row 1's test again. In Chromium the count reads **1** as soon as the page loads, clicking does nothing, and there is no red line in the Console. Why? (Hint: Module 7, reference versus call, and Module 9, why `addEventListener()` takes no parentheses.)
8. **Debug and retest.** Remove the parentheses. Run row 1's test again, from a fresh page load. Write the new Actual.
9. **Commit.** Row 1 is one change, so it is one commit. Open the `goal-counter` folder in VS Code with **File → Open Folder…**, then **Terminal → New Terminal**. Check that the prompt ends in `goal-counter>`. Then type these five commands, one at a time:

   ```
   git init
   git status --short
   git add .
   git commit -m "Add +1 button for row 1"
   git log --oneline
   ```

   <img src="../images/m13-git-row1.png" alt="A terminal in practice-13\goal-counter running git init, git status --short showing two untracked files, git add ., git commit with the message Add +1 button for row 1, and git log --oneline showing one commit." loading="lazy">
   
   *One row, one commit, and the message starts with a verb (Module 12) and names the row. Your commit id will be different. (real output, rendered; captured on Linux, with the folder path changed to the course folder)*

   This is a throwaway folder, so stop at commit. In the Project, the last two of the nine steps (push and verify live) are required for every row.

## Project (in the full packet)

The capstone is the full Pocket Planner, built from a **nine-row** written requirement with far less help than any module so far: a responsive hero image, a layout that changes at set widths, a feature grid built from an array of objects, and the planner's own behavior, all without `innerHTML`. Every row goes through the nine steps, gets a test row, and is committed, pushed and checked live in its own repository, with any tool-written line marked and explained. You finish with the **required final explanation**: a written walk-through of how your capstone works, which line you were least sure about, and what you would test next. The full brief, the step-by-step build, and the finishing work in Git are in the Module 13 packet. <a href="https://code559.gumroad.com/l/module-13-capstone" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"If it works on my computer, it's done."*

What would you say? Hint: count how many of the nine steps come after "it works."

## Summary

A requirement table lists what the page must do, one row at a time, with a "done when" column that becomes your test. Each row breaks into small tasks in the order structure, look, behavior, plus a test row. The Code559 completion standard says a feature is done only after predict, run, explain, modify, debug, retest, commit, push and verify live. Any line a tool wrote is marked with a comment that says where it came from, what it does and what you changed. A final accessibility pass checks the keyboard, labels, alt text and color contrast (4.5:1 for normal text). A portfolio audit makes sure every page, link, test plan and README is ready for someone else to read. After the core, a later, optional module (not yet published) will cover a Node server with `fetch`; frameworks are a separate product, for when plain JavaScript feels easy.

## Check your understanding

1. A requirement row says "The visitor can filter the list." What is missing from it, and what would you add before you start?
2. Why does structure come before behavior when you turn a row into tasks?
3. **What happens if this changes?** In the Exercise, you add parentheses after `addOne` in the listener. What happens on load, what happens on click, and why is there no error?

## Before next module: what comes next

- [ ] Your sample tasks: twelve lines for the Goal counter's three rows, and row 1 built, broken, fixed and committed
- [ ] Every page of your live site passed the keyboard, labels, alt text and contrast checks, and you fixed what failed
- [ ] Any tool-written line in `my-site` is marked and explained, or rewritten
- [ ] Your portfolio audit is done on a phone and a computer, with no red lines in any Console
- [ ] Your final changes are saved with the routine: git status → git add . → git commit -m "…" → git push → check the live page
- [ ] You have a short list of links ready to share: your live site, your site's repository, and, if you did the packet projects, your best project's repository
- [ ] You know your next step: more practice from Go further, or a later, optional module on a Node server and `fetch` (not yet published)

## Go further

- MDN: *Color contrast* (Accessibility)
- MDN: *HTML: A good basis for accessibility*
- Chrome for Developers: *Make your website more readable* (the contrast checks in DevTools)
- Chrome for Developers: *Pause your code with breakpoints* (for debugging a larger build)
- WebAIM: *Color Contrast Checker* (named on the MDN *Color contrast* page)
- freeCodeCamp: its Responsive Web Design and JavaScript certification projects, for more practice building from a written requirement

## What to keep

Keep your requirement-to-tasks lines, your test tables, and the three links you would send to an employer. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "Color contrast"; MDN "HTML: A good basis for accessibility"; Chrome for Developers "Make your website more readable"; Chrome for Developers "Pause your code with breakpoints". Checked 2026-10-11: MDN "Color contrast" (3:1 for interface parts); W3C "Understanding SC 1.4.11: Non-text Contrast"; MDN "HTMLElement: change event"; MDN "HTMLInputElement: checked property"; Chrome for Developers "Open Chrome DevTools"; W3C "Understanding SC 1.4.3: Contrast (Minimum)" (1pt = 1.333px). The `change` example, the planner and the Goal counter were run in Chromium 141.0.7390.37 (via Playwright) on Linux. Checked 2026-10-12: Ozubko and MacLeod, "The Production Effect in Memory: Evidence That Distinctiveness Underlies the Benefit," *Journal of Experimental Psychology: Learning, Memory, and Cognition* 36(6), 2010 (the footnote on saying code out loud).*

[^recite]: **Why out loud?** Most people have recited something to learn it by heart: a phone number, a poem, lines for a play. Words you say aloud stick better than words you read silently; memory researchers call this the production effect (Ozubko and MacLeod, 2010). Explaining code to yourself out loud uses the same idea. It also shows you the line you cannot explain yet, and that line is the one to study next.
