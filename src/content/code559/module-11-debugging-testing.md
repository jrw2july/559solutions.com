---
title: "Module 11: Debugging and Testing"
subtitle: "Read the red line, find the cause, change one thing, and prove it works with a written test."
module: 11
series: Code559 Front-End Developer Course
estimated_time: "about 2 hours (estimate)"
---

# Module 11 — Debugging and Testing

*Read the red line, find the cause, change one thing, and prove it works with a written test.*

**Time:** about 2 hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn to read errors, track down bugs with the Console, test with the keyboard, and write Action / Expected / Actual test plans. It turns fixing into a method, not luck: guess-and-edit stops working once a page has real JavaScript, and a written test can be checked again after every change.

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
  - [1. What is a bug, exactly?](#1-what-is-a-bug-exactly)
  - [2. How do you read a Console error?](#2-how-do-you-read-a-console-error)
  - [3. What do the three common error types usually mean?](#3-what-do-the-three-common-error-types-usually-mean)
  - [4. What does `null` mean, and why does a `TypeError` follow it?](#4-what-does-null-mean-and-why-does-a-typeerror-follow-it)
  - [5. How do you debug a selector?](#5-how-do-you-debug-a-selector)
  - [6. How do you see what a variable holds?](#6-how-do-you-see-what-a-variable-holds)
  - [7. Why change one thing at a time?](#7-why-change-one-thing-at-a-time)
  - [8. What is the browser debugger?](#8-what-is-the-browser-debugger)
  - [9. How do you test with the keyboard?](#9-how-do-you-test-with-the-keyboard)
  - [10. What is the Action / Expected / Actual test matrix?](#10-what-is-the-action--expected--actual-test-matrix)
  - [11. What is an edge case?](#11-what-is-an-edge-case)
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

- What a bug is in plain terms: a gap between what you expected and what happened
- How to read a Console error: its type, its message, and the file name and line number
- Three common error types (`SyntaxError`, `ReferenceError`, `TypeError`) and what each one usually means
- What `null` means when it comes back from `document.querySelector()`, and the `TypeError` that follows it
- How to debug a selector by testing it in the Console
- How to use `console.log()` to see what a variable holds at the moment it matters
- Why you change one thing at a time
- What the browser debugger and a breakpoint are (awareness only)
- How to test a page with the keyboard alone, and what a focus state looks like
- The **Action / Expected / Actual** test matrix, the testing standard for the rest of this course
- How to test edge cases: empty input, the first item, the last item, and wrap-around

## Why this matters

Every page you have built so far has broken at least once. Up to now you fixed things by looking hard and trying edits until something worked. That works on small pages. It stops working the day a page has forty lines of JavaScript and the button does nothing.

Debugging is a method, not a talent. You say what you expected, you look at what happened, and you find the first place where the two split. The Console tells you more than most beginners read. A short `console.log()` line tells you the rest.

Testing is the other half. A test is a written promise: "when I do this, I expect that." If you write the promise down, you can check it again tomorrow, after every change. From this module on, every interactive feature you build gets a small written test plan in one shared format.

## Before you start

1. Finish Module 10. You should be able to make a page respond to a click or a form submit with `addEventListener()`.
2. In your course folder (for example `Documents\code559`), create a throwaway folder called `practice-11`. Nothing in it is published. Open it in VS Code with **File → Open Folder…**.
3. Open Edge or Chrome. You will press **F12** often in this module. Click the **Console** tab once so it opens there next time.
4. Have paper or a blank text file ready. You will write predictions before you run things.

> **Checkpoint.** You have an empty `practice-11` folder open in VS Code, and you can open the Console with F12.

## Core concepts

### 1. What is a bug, exactly?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A bug is a difference between what you **expected** and what **actually** happened. Nothing more. If you cannot say what you expected, you cannot say there is a bug.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN's *What went wrong? Troubleshooting JavaScript* sorts errors into kinds. A **syntax error** is a spelling or punctuation mistake that stops the code from running. A **logic error** is code that runs but gives the wrong result; MDN notes these are harder, because "there usually isn't an error message to direct you to the source of the error." So the first habit is to write down your expectation before you click. Then the comparison is easy.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m11-loop.png" alt="Five boxes in a row: Predict, Run, Compare, Change one thing, Retest." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The loop you will use for every bug in this module. Notice that "Compare" needs a written prediction to compare against.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open your `practice-10` page from Module 10 (or your own site, if you did the packet projects) and pick one button. Before you click it, write one sentence: "When I click ___, I expect ___." Click it. Did the actual result match?

### 2. How do you read a Console error?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> When JavaScript cannot go on, it stops and prints a red line in the Console. That line has three parts, and each one is a clue.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Here is a short script for a page with a button whose id is `message-button` and a paragraph whose id is `message`. The id in the script is misspelled:

```js
const messageButton = document.querySelector("#mesage-button");
messageButton.addEventListener("click", showMessage);

function showMessage() {
  document.querySelector("#message").textContent = "Hello!";
}
```

The function is written below line 2, which uses it. That is allowed: MDN's *function* page says "You can use the function before you declared it." It is placed there only so the error stays on line 2; in your own scripts, keep Module 9's order (find, define, connect).

Read the red line from left to right. **The type** comes first (`TypeError`): what kind of problem. **The message** comes next: what JavaScript tried to do. **The location** is on the right (`script.js:2`): the file and the line number. Click that link in DevTools and it opens the file at that line. The `at script.js:2:15` line underneath adds the column: character 15 on line 2.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m11-console-typeerror.png" alt="A Console showing Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') with script.js:2 on the right." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Type, message, location. The message says "of null": the variable on line 2 holds `null`. (real output, rendered; the error text, file name and line came from Chromium loading this page from a file. The Console frame is drawn.)* Your Console may look slightly different: if you do not see the `at …` lines, click the small arrow beside the red message to open them.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Find the three parts of that error and write them down: type, message, file and line.

### 3. What do the three common error types usually mean?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> You will see three error types far more than any others.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A **`SyntaxError`** means the code is not valid JavaScript, so none of the file runs; look for a missing bracket, quote or parenthesis. A **`ReferenceError`** means you used a name that does not exist; it is almost always a typo or a variable used before it was made. A **`TypeError`** means the name exists, but its value is the wrong kind for what you asked; the most common one in front-end work is trying to use `null` as if it were an element.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The same script, with the id spelled correctly, broken two other ways. First a missing `)` at the end of line 2, then a typo in the function name (`showMesage`):

<img src="../images/m11-console-syntax-reference.png" alt="A Console with two red lines: Uncaught SyntaxError: missing ) after argument list at script.js:2, and Uncaught ReferenceError: showMesage is not defined at script.js:2." loading="lazy">

*Both errors point at line 2, but they mean different things. The `SyntaxError` has no `at …` line because the file never started running. (real output, rendered; captured in Chromium from two pages loaded as files. The Console frame is drawn.)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Without running anything: which type would you get from `consol.log("hi")`? (Answer: `ReferenceError`, because `consol` is not a name JavaScript knows.)

### 4. What does `null` mean, and why does a `TypeError` follow it?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `document.querySelector()` looks for the first element that matches a CSS selector. MDN's page *Document: querySelector() method* says it plainly: "If no matches are found, `null` is returned."

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> So `null` here means **JavaScript did not find the element**. It is not an error yet. The error comes on the next line that uses the variable, because `null` has no `addEventListener` and no `textContent`. That is why the red line often points at a different line from the real mistake. MDN's troubleshooting page warns about exactly this: "the error will not necessarily be on that line." The line number tells you where `null` was *used*. You still have to trace back to where it was *made*.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> When you see "of null" in a message, go to the `querySelector` line that filled that variable, and compare its selector with the HTML, letter by letter.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> In your `practice-10/script.js` (or your own site's script), find one `querySelector` line. Write down the exact id or class it looks for. Now find that id or class in your HTML. Do they match exactly, including `#` or `.`?

### 5. How do you debug a selector?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> You do not have to guess whether a selector works. You can ask the page.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Open the page, open the Console, and type the `querySelector` call by itself. If the answer is `null`, the selector found nothing. If you see an element, the selector is fine and the bug is somewhere else. `document.querySelectorAll(...).length` tells you how many elements match, which is useful when you expected several.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m11-selector-null.png" alt="A Console where querySelector(&quot;#mesage-button&quot;) returns null, querySelector(&quot;#message-button&quot;) returns the button element, and querySelectorAll(&quot;button&quot;).length returns 1." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *One letter changes the answer from `null` to the button. Testing the selector by itself takes seconds and ends the guessing. (real output, rendered; evaluated in Chromium against the demo page)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> On that same page, open the Console and type one of your `querySelector` calls. Is the answer an element or `null`?

### 6. How do you see what a variable holds?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Logic errors give no red line. To find them, you look inside the code while it runs.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `console.log()`, in MDN's words, "outputs a message to the console." Put one line where the wrong thing happens, and print the values that line depends on. Each time that code runs, you get a new line in the Console, with the file and line number on the right. When you have found the bug, delete the log line.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> In the practice page you will build in the Exercise, the Next button eventually shows an empty tip. Adding this as the first line inside the function that draws the tip:

```js
console.log("index is", index, "tip is", tips[index]);
```

then loading the page and clicking Next three times gives this:

<img src="../images/m11-console-log-index.png" alt="Four Console log lines: index is 0, 1, 2 with tip text, then index is 3 tip is undefined, each from script.js:19." loading="lazy">

*The first line is the page load; the next three are the clicks. On the fourth line, `index` is 3, but there are only three tips, numbered 0 to 2. That is the bug, found in one run. (real output, rendered; captured in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Question to answer before the Exercise: **what value does this variable hold** when `tips[index]` is `undefined`?

### 7. Why change one thing at a time?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> When you find a suspect, it is tempting to fix three things at once.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> If you change three things and the page works, you do not know which change fixed it. If it still fails, you do not know whether you fixed one bug and made another. Change **one** thing, save, and repeat the same test. Then you know exactly what each edit did. This is also why your Git commits in Module 12 hold one change each.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Look at the loop picture in concept 1 again: "Change one thing" comes before "Retest," every time.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> For the rest of this module, write down which single thing you are changing before you save.

### 8. What is the browser debugger?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> DevTools has a **Sources** panel that can pause your code on a line, so you can look at every variable at that moment. You do not need it yet; `console.log()` is enough for this course. You should know it exists.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Chrome's documentation (*Pause your code with breakpoints*) says to open the Sources panel, open the file, and click the line number to set a **line-of-code breakpoint**. The next time that line runs, the page freezes and the side panel shows the current values. Writing `debugger;` in your code does the same thing from inside the file, but only while DevTools is open. With DevTools closed, the line does nothing; MDN's *debugger* page says that without debugging tools "this statement has no effect."

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m11-debugger.png" alt="A drawn Sources panel with script.js open, a blue marker on line 19, and a Scope panel showing index: 3." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *A breakpoint on line 19 pauses the page so you can read `index` without a log line. The code is the real practice file; the panel layout and labels are drawn and simplified.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> None today. When a `console.log()` would need five values at once, come back to this.

### 9. How do you test with the keyboard?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Some visitors never use a mouse. A page that only works with clicks is broken for them, and no red line will tell you.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN's *HTML: A good basis for accessibility* says to "try pressing the tab key" and watch focus move through the page. Press **Tab** to move forward and **Shift+Tab** to move back. Every link, button and form field should get a visible **focus state**, a ring or outline that shows where you are. A real `<button>` can be reached with Tab and pressed with Enter or Space; MDN notes you "lose the native keyboard accessibility" if you build a button out of a `<div>`. In CSS, `:focus-visible` is the selector for "focused, and the browser thinks the focus should be shown."

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m11-focus-help-fixed.png" alt="The fixed practice page at 390 px with a thick dark orange ring around the Show help button." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *After five presses of Tab, focus is on "Show help," and the dark orange `:focus-visible` outline from the stylesheet shows it. (real: rendered in Chromium at 390 px, focus moved with five real Tab key presses)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open your `practice-10` page (or your own site). Put the mouse away. Press Tab until you have visited every link and button. Write down any you could not reach or could not see.

### 10. What is the Action / Expected / Actual test matrix?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> This is the testing format for the rest of the course. Every interactive feature gets one.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> It is a table with three columns. **Action** is one thing a visitor does, written so someone else could repeat it. **Expected** is what should happen, written *before* you test. **Actual** is what did happen, written *after*. A row passes when the last two match. Here is a ready-to-use table for the tip card you will build:

| Action | Expected | Actual |
| --- | --- | --- |
| Load the page | First tip shows; count reads "Tip 1 of 3" | |
| Click Next once | Second tip; "Tip 2 of 3" | |
| Click Previous on the first tip | Wraps to the last tip; "Tip 3 of 3" | |
| Click Next on the last tip | Wraps to the first tip; "Tip 1 of 3" | |
| Submit the form with the box empty | No tip added; a message asks for text | |
| Submit with only spaces | Same as empty | |
| Click Show help | The help text appears under it | |
| Tab through the page | Every button and the text box get a visible ring, in order | |

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The Actual column is empty on purpose. You fill it in during the Exercise.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Copy the empty table into your notes now. You will need it in ten minutes.

### 11. What is an edge case?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An **edge case** is an input or a moment at the boundary of what the code expects. Bugs live there.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Four edges come up in almost every feature in this course. **Empty input**: the visitor submits nothing, or only spaces. **The first item**: what does Previous do when you are already at the start? **The last item**: what does Next do at the end? **Wrap-around**: when you go past an end, do you land on the other end, or on nothing? Not every edge case finds a bug. You still test each one, because you do not know which one will.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> Four of the eight rows in the table above are edge cases. Point to each one.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> For one feature you built in Module 10 (or on your own site), write one edge case you have never tested.

## Exercise

*Your hands, about 60 minutes (estimate).* Type it, do not paste it. This page has **six planted bugs**. Some print a red line. Some do not. Your job is to find all six with the Console, `console.log()`, the keyboard, and the test table.

1. **Make the files.** In `practice-11`, create a folder called `bug-hunt` with three files: `index.html`, `styles.css`, `script.js`.
2. **Type `index.html`.**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Bug hunt</title>
     <link rel="stylesheet" href="styles.css">
   </head>
   <body>
     <main>
       <h1>Bug hunt</h1>
       <section class="card">
         <h2>Tip of the day</h2>
         <p id="tip-text"></p>
         <p id="tip-count"></p>
         <button id="prev-button" type="button">Previous</button>
         <button id="next-button" type="button">Next</button>
       </section>
       <section class="card">
         <h2>Add a tip</h2>
         <form id="tip-form">
           <label for="new-tip">Your tip</label>
           <input id="new-tip" type="text">
           <button type="submit">Add tip</button>
         </form>
         <p id="form-message" role="status"></p>
       </section>
       <section class="card">
         <div class="help-toggle" id="help-toggle">Show help</div>
         <p id="help" class="help">Use Previous and Next to move through the tips.</p>
       </section>
     </main>
     <script src="script.js"></script>
   </body>
   </html>
   ```

3. **Type `styles.css`.**

   ```css
   body { font-family: system-ui, sans-serif; margin: 0; background: #f4f6f8; color: #1d2733; }
   main { max-width: 640px; margin: 0 auto; padding: 16px; }
   h1 { margin: 8px 0 16px; }
   .card { background: #fff; border: 1px solid #d5dbe1; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
   .card h2 { margin-top: 0; font-size: 1.2rem; }
   button, .help-toggle { font: inherit; padding: 8px 14px; border: 1px solid #2f5d8a; border-radius: 6px; background: #2f5d8a; color: #fff; cursor: pointer; display: inline-block; }
   button:focus-visible, input:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
   label { display: block; margin-bottom: 4px; }
   input { font: inherit; padding: 8px; border: 1px solid #8a96a3; border-radius: 6px; width: 100%; box-sizing: border-box; margin-bottom: 8px; }
   .help { display: none; }
   .help.is-visible { display: block; }
   ```

4. **Type `script.js`.** Type it exactly as shown, bugs included. Line numbers matter, so do not add blank lines.

   ```js
   const tips = [
     "Save before you refresh.",
     "Read the whole error message.",
     "Change one thing at a time."
   ];
   let index = 0;

   const tipText = document.querySelector("#tip-txt");
   const tipCount = document.querySelector("#tip-count");
   const prevButton = document.querySelector("#prev-button");
   const nextButton = document.querySelector("#next-button");
   const tipForm = document.querySelector("#tip-form");
   const newTip = document.querySelector("#new-tip");
   const formMessage = document.querySelector("#form-message");
   const helpToggle = document.querySelector("#help-toggle");
   const help = document.querySelector("#help");

   function showTip() {
     tipText.textContent = tips[index];
     tipCount.textContent = "Tip " + index + " of " + tips.length;
   }

   nextButton.addEventListener("click", function () {
     index = index + 1;
     if (index > tips.length) {
       index = 0;
     }
     showTip();
   });

   prevButton.addEventListener("click", function () {
     index = index - 1;
     if (index < 0) {
       index = tips.length - 1;
     }
     showTip();
   });

   tipForm.addEventListener("submit", function (event) {
     event.preventDefault();
     const text = newTip.value;
     tips.push(text);
     formMessage.textContent = "Added. There are now " + tips.length + " tips.";
     newTip.value = "";
     showTip();
   });

   helpToggle.addEventListener("click", function () {
     help.classList.toggle("visible");
   });

   showTip();
   ```

5. **Predict, then run.** Write your prediction: what will the tip card show? Open `index.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab. The tip card has buttons but no tip and no count, and the Console shows this:

   <img src="../images/m11-bughunt-console.png" alt="A Console showing Uncaught TypeError: Cannot set properties of null (setting 'textContent') at showTip (script.js:19:23) and at script.js:52:1." loading="lazy">
   
   *Read the stack from the top: the error happened inside `showTip` on line 19, and `showTip` was called from line 52. The real cause is on neither line. (real output, rendered; captured in Chromium loading the file. The Console frame is drawn.)*

   Use concepts 4 and 5 to find **bug 1**. Fix only that. Save. Press F5.

6. **Run the test table.** Now the page loads with no red line. Go through the Action / Expected / Actual table from concept 10, one row at a time, and fill in Actual. At first, every row fails; the count bug alone breaks the first four. Here are two of them:

   <img src="../images/m11-bughunt-count-390.png" alt="The tip card at 390 px reading &quot;Save before you refresh.&quot; and &quot;Tip 0 of 3&quot;." loading="lazy">
   
   *Row 1: Expected "Tip 1 of 3", Actual "Tip 0 of 3". No red line, so this is a logic error. (real: rendered in Chromium at 390 px)*

   <img src="../images/m11-bughunt-undefined-390.png" alt="The tip card at 390 px with no tip text and the count &quot;Tip 3 of 3&quot;." loading="lazy">
   
   *After three clicks on Next the tip disappears. Concept 6 shows the `console.log()` line that explains why. (real: rendered in Chromium at 390 px, after three real clicks on Next)*

7. **Fix one bug at a time.** For each row that failed: write down which line you think is wrong, change one thing, save, and run the **same row** again. Write the new Actual. Do not move on until the row passes.
8. **Break it on purpose.** Once Next wraps correctly, change `>=` (or whatever you used) back to `>`. Predict what row 4 will show now. Run row 4. Then fix it again and rerun row 4. Breaking a fixed bug and watching the test catch it is how you learn to trust the test.
9. **Check the help button.** Click "Show help" with the mouse. Does the help paragraph appear? If not, compare the class name in `script.js` with the class names in `styles.css`. Fix it, save, press F5, and click again. Do this step before step 10: until the class name is fixed, the help text cannot appear, by mouse or by keyboard.
10. **Test the keyboard.** Put the mouse away. Press Tab from the top of the page. With the HTML as you typed it, focus goes Previous → Next → the text box → Add tip, and then leaves the page; "Show help" is never reached (checked in Chromium with real Tab presses). Fix it so Tab reaches "Show help" and Enter opens the help text. Hint: concept 9.
11. **Finish the table.** Every row's Actual now matches Expected. Add one more row of your own: one edge case the table does not cover yet.

<details>
<summary>Check your hunt: the six bugs (open only after you have tried)</summary>

Line numbers are for `script.js` as you first typed it. A fix that adds lines moves the lines below it down.

1. Line 8: the selector `#tip-txt` does not match the HTML id `tip-text`, so `tipText` is `null` (the `TypeError` on line 19).
2. Line 20: the count shows `index`, which starts at 0; people count from 1.
3. Line 25: `index > tips.length` lets `index` reach 3, one past the last tip; it should wrap when `index` reaches `tips.length`.
4. Line 41: an empty or spaces-only box is still added as a tip; it needs `.trim()` and an empty check (Module 10).
5. Line 49: the script toggles `visible`, but the CSS shows `.help.is-visible`.
6. HTML: "Show help" is a `<div>`, so Tab skips it and Enter does nothing; it should be a `<button type="button">`.

In the corrected version, all eight rows of the table pass in Chromium, including both wrap-arounds and the spaces-only submit.
</details>

## Project (in the full packet)

Your personal site now has several interactive features: navigation, forms with validation, show/hide panels, maybe a gallery. In the project you write an Action / Expected / Actual test plan for **every** interactive feature on the site, including the keyboard and the four edge cases, run it on the live site, record every Actual, and fix what fails, one change at a time. The finished test plan is saved in the repository so you can rerun it after every future change. The full brief, the step-by-step build, and the finishing work in Git are in the Module 11 packet. <a href="https://code559.gumroad.com/l/module-11-debugging-testing" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"The error is on the line the Console points to."*

What would you say? Hint: in the Exercise, the red line said 19, and the mistake was on line 8.

## Summary

A bug is a gap between what you expected and what actually happened, so you write the expectation down first. A Console error gives you a type, a message, and a file and line number, and you read all three. `SyntaxError` means the code is not valid, `ReferenceError` means a name does not exist, and `TypeError` usually means a value is the wrong kind, most often `null`. `querySelector` returns `null` when it finds nothing, and the error appears later, where that `null` is used. You test a selector by typing it into the Console. `console.log()` shows what a variable holds at the moment the code runs. You change one thing at a time so you know what each change did. The Sources panel can pause code at a breakpoint when logs are not enough. A keyboard test with Tab and Shift+Tab finds problems no error message reports. The Action / Expected / Actual table is the course's test standard, and edge cases (empty input, first item, last item, wrap-around) are where most bugs hide.

## Check your understanding

1. The Console says `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')` at `script.js:14`. What do you check first, and is it on line 14?
2. Why can a page have a bug and show no red line at all? Give one example from the Exercise.
3. **What would you test?** You add a fourth tip to the `tips` array. Which rows of the table would you run again, and why those?

## Before next module

- [ ] You can name the three parts of a Console error and click through to the line
- [ ] You found all six bugs in `bug-hunt`, one change at a time, and broke one fix on purpose and caught it again
- [ ] Every row of your bug-hunt test table has an Actual that matches Expected
- [ ] You tabbed through a page you built (your `practice-10` page, or your own site) with the mouse put away, and wrote down what you could not reach
- [ ] If you did this module's packet project in my-site, saved it with the routine: git status → git add . → git commit -m "…" → git push → check the live page. (Your practice folder is not saved to GitHub.)

## Go further

- MDN: *What went wrong? Troubleshooting JavaScript*
- MDN: *TypeError: "x" is (not) "y"* (the reference page for `null` and `undefined` errors)
- MDN: *Document: querySelector() method*
- MDN: *console: log() static method*
- MDN: *HTML: A good basis for accessibility* (the keyboard sections)
- MDN: *:focus-visible*
- Chrome for Developers: *Pause your code with breakpoints*
- freeCodeCamp: the free [JavaScript Certification](https://www.freecodecamp.org/learn/javascript-v9/) (checked 2026-10-11) has practice on this topic.

## What to keep

Keep your filled-in bug-hunt test table and the empty Action / Expected / Actual template; you will use the template in every module from here on. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "What went wrong? Troubleshooting JavaScript"; MDN "TypeError: "x" is (not) "y""; MDN "Document: querySelector() method"; MDN "console: log() static method"; MDN "HTML: A good basis for accessibility"; MDN ":focus-visible"; Chrome for Developers "Pause your code with breakpoints". Checked 2026-10-11: Chrome for Developers "Open Chrome DevTools" (F12 and Ctrl+Shift+J); MDN "debugger"; MDN "function" (Hoisting).*
