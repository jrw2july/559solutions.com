---
title: "Module 10: Forms and Validation with JavaScript"
subtitle: "Catch the form before it leaves, check what the visitor typed, and say clearly what to fix."
module: 10
series: Code559 Front-End Developer Course
estimated_time: "about 2 to 2½ hours (estimate)"
---

# Module 10 — Forms and Validation with JavaScript

*Catch the form before it leaves, check what the visitor typed, and say clearly what to fix.*

**Time:** about 2 to 2½ hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn to catch a form before it sends, check what was typed, show accessible error messages, and confirm success. It's a kindness to your visitors: a clear message in the right place saves them from guessing. You'll also learn why these checks are about the visitor's experience, not security.

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
  - [1. How do you catch a form before it leaves?](#1-how-do-you-catch-a-form-before-it-leaves)
  - [2. How do you read what the visitor typed, and why trim it?](#2-how-do-you-read-what-the-visitor-typed-and-why-trim-it)
  - [3. What does the browser already check for you?](#3-what-does-the-browser-already-check-for-you)
  - [4. When do you write your own checks?](#4-when-do-you-write-your-own-checks)
  - [5. How do you show an error that everyone can perceive?](#5-how-do-you-show-an-error-that-everyone-can-perceive)
  - [6. Where should the cursor go when something is wrong?](#6-where-should-the-cursor-go-when-something-is-wrong)
  - [7. How do you confirm success and clear the form?](#7-how-do-you-confirm-success-and-clear-the-form)
  - [8. How do you show what state the form is in?](#8-how-do-you-show-what-state-the-form-is-in)
  - [9. Why is client-side validation not security?](#9-why-is-client-side-validation-not-security)
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

- How to handle a form with `addEventListener("submit", …)` and stop the page from reloading with `event.preventDefault()`
- How to read what a visitor typed with `.value`
- Why `.trim()` matters, and how to check for an empty value
- What the browser checks for you: `required`, `type="email"`, `minlength`, `pattern`
- When to add your own JavaScript checks, and what `novalidate` does
- How to show an error message that a screen reader also hears, with `aria-describedby`, and why ARIA is used only when native HTML is not enough
- How to move focus to the first field with a problem with `.focus()`
- How to confirm success with a status message and clear the form with `.reset()`
- How to show form states (`idle`, `sending`, `sent`, `failed`) as classes with `classList`
- Why client-side validation is user experience, not security, and what server-side validation means

## Why this matters

In Module 4 you built forms in HTML, and the browser already refused an empty `required` field. In Module 9 you learned to find elements and react to a click. A form needs both, plus one more thing: when the visitor presses **Send**, the browser's default is to send the form and load a new page. If you want to check the answers and show a message on the same page, your JavaScript has to step in first.

Good form messages are a kindness. "Please enter your email address," right under the email box, with the cursor already in that box, saves the visitor from guessing. Bad messages, or messages only some visitors can perceive, make people give up.

This module stays on your own computer. Nothing is sent anywhere. A one-second timer stands in for a server so you can practice the states a real form goes through. The last concept explains why the checks you write here protect nobody, and why that is fine.

## Before you start

1. Finish Module 9. You should be able to find an element with `querySelector()`, change it with `textContent` and `classList`, and connect a function with `addEventListener()`.
2. In your course folder (for example `Documents\code559`), create a throwaway folder called `practice-10`. Nothing in it is published. Open it in VS Code with **File → Open Folder…**.
3. Keep Edge or Chrome open. You will open the page as a file, as in Module 9, and use **F12 → Console** to read messages and to test lines. No server is needed: a form on a page opened as a file still shows what it sends in the address bar (Exercise step 9).

> **Checkpoint.** You have an empty `practice-10` folder open in VS Code, and you know how to open a file in Edge or Chrome and open the Console.

## Core concepts

### 1. How do you catch a form before it leaves?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A form fires a `submit` event when the visitor presses a submit button or presses Enter in a one-line field, like a text or email box. In a `<textarea>`, Enter starts a new line instead.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Listen on the **form**, not the button. MDN: "The submit event fires on the `<form>` element itself, and not on any `<button>` or `<input type="submit">` inside it" (MDN, *HTMLFormElement: submit event*). The browser hands your function an **event object**, usually named `event`. Its method `preventDefault()` "tells the user agent that the event is being explicitly handled, so its default action… should not be taken" (MDN, *Event: preventDefault() method*). For a form, the default action is sending the data and loading a page. So the first line of every submit handler in this course is the same:

```js
function handleSubmit(event) {
  event.preventDefault();
  // now check the fields
}

form.addEventListener("submit", handleSubmit);
```

Notice the pattern from Module 9: `handleSubmit` with no parentheses. The browser calls it, and it passes in `event`.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> You will see what happens without this line, for real, in the Exercise break-it step.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Answer the standing question: **what causes this function to run?** Name two different things a visitor can do that fire `submit`.

### 2. How do you read what the visitor typed, and why trim it?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Every input and textarea has a `.value`, the text in it right now, as a string.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `nameInput.value` gives whatever is in the box, spaces included. A visitor who presses the space bar three times has typed `"   "`, which is **not** the empty string `""`. So a check like `if (nameInput.value === "")` lets three spaces through. `.trim()` "removes whitespace from both ends of this string and returns a new string, without modifying the original string" (MDN, *String.prototype.trim()*). Trim first, then check: `const name = nameInput.value.trim();` and `if (name === "")`. Note the parentheses: `.value` is a property you read, `.trim()` is a method you call, the same difference you met with `.length` and `.push()` in Module 8.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m10-trim-console.png" alt="The Console: &quot;   &quot; === &quot;&quot; is false; &quot;   &quot;.length is 3; &quot;   &quot;.trim() === &quot;&quot; is true; &quot;  Your Name  &quot;.trim() is &quot;Your Name&quot;." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Three spaces have a length of 3, so they are not empty. After `.trim()`, they are. (real output, rendered; evaluated in Chromium 141)*

One detail, checked in Chromium: an `<input type="email">` already strips spaces from both ends of its value (`"  you@example.com  "` came back as `"you@example.com"`), but `type="text"` and `<textarea>` do not (`"  Your Name  "` came back unchanged). Trim every field anyway. It costs nothing and you never have to remember which type does what.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: what is `"  hi  ".trim().length`?

Checkboxes and radio buttons hold their answer in a different way. A checkbox has `.checked`, which is `true` or `false`; the Exercise reads `pretendFail.checked`. For a group of radio buttons, ask for the one that is ticked: `document.querySelector('input[name="rating"]:checked')`. The outer single quotes let the double quotes around `rating` stay inside the text. `:checked` is the CSS pseudo-class for a ticked radio button, checkbox or `<option>` (MDN, *:checked*). You get the chosen radio, or `null` if nothing is chosen yet. Its `.value` is the text in its `value` attribute, as a string. Checked in Chromium on a group of five radios named `rating`: with nothing chosen the result was `null`, and after a click on 4, `.value` gave `"4"`. Check for `null` before you read `.value`; `null.value` gives the TypeError you met in Module 9.

### 3. What does the browser already check for you?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> HTML has validation built in. You used `required` in Module 4.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN lists the attributes: `required` ("needs to be filled in before the form can be submitted"), `minlength` and `maxlength` (length of text), `min` and `max` (numbers), `type` ("a number, an email address, or some other specific preset type"), and `pattern` ("a regular expression that defines a pattern the entered data needs to follow") (MDN, *Client-side form validation*). Each attribute checks only its own rule. `minlength` does not refuse an empty box: "If an input is not `required`, an empty string can be submitted even if `minlength` is set" (MDN, *minlength HTML attribute*). Checked in Chromium: a textarea with only `minlength="10"` passed `checkValidity()` while empty and failed after typing `hi`. So a field that must be filled in and be long enough needs both `required` and `minlength`. With these on a form and no JavaScript, pressing Send on an empty required field shows the browser's own message bubble and **stops the submit**. Checked in Chromium: with `novalidate` removed, a click on Send fired the `submit` event 0 times and moved focus to the empty Name field. You can read the browser's verdict yourself from the Console.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order. You can type them yourself on the Exercise page once it is open (step 4):

```js
document.querySelector("#name").validity.valueMissing
document.querySelector("#name").validationMessage
document.querySelector("#email").value = "you@"
document.querySelector("#email").checkValidity()
document.querySelector("#email").validationMessage
```

<img src="../images/m10-builtin-console.png" alt="The Console: the empty name field's validity.valueMissing is true and its validationMessage is &quot;Please fill out this field.&quot; After setting the email value to &quot;you@&quot;, checkValidity() is false and validationMessage is &quot;Please enter a part following '@'. 'you@' is incomplete.&quot;" loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *`checkValidity()` returns `true` or `false` using the HTML rules. `validationMessage` is the text the browser would show in its bubble; the exact wording differs between browsers and languages. (real output, rendered; evaluated in Chromium 141)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Which attribute would you add to make a "Message" textarea refuse anything under 10 characters?

### 4. When do you write your own checks?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> The built-in bubbles work, but you cannot style them, and they disappear after a moment.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> When you want your own messages on the page, you add `novalidate` to the `<form>`. MDN: it "stops the form from showing its own error message bubbles, and allows us to instead display the custom error messages in the DOM," and it "doesn't disable support for the constraint validation API" (MDN, *Client-side form validation*). So you keep the attributes (they still describe the rules, and `checkValidity()` still uses them) and your `submit` handler does the checking. In the Exercise, JavaScript checks three things: the trimmed name is not empty; the email is not empty, and `emailInput.checkValidity()` is `true` (the browser's own `type="email"` rule); the trimmed message is at least 10 characters long. Use built-in checks where they fit, and your own JavaScript where you need a rule HTML cannot say, like "not just spaces."

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> See the image under Concept 6.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> With `novalidate` on, what happens if your `submit` handler does no checking at all?

### 5. How do you show an error that everyone can perceive?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An error message must be seen **and** heard. A red border alone tells a screen-reader user nothing, and color alone fails visitors who do not see red.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Put an empty element for the message right after each field, and tie it to the field with `aria-describedby`:

```html
<input id="email" name="email" type="email" required aria-describedby="email-error">
<p id="email-error" class="error"></p>
```

MDN: `aria-describedby` "lists the ids of the elements that describe the object" (MDN, *ARIA: aria-describedby attribute*). When the field gets focus, a screen reader reads its label, then its description, which is your message. JavaScript fills the message with `textContent` and adds a class for the red border; it clears both when the field is fixed. Checked in Chromium's accessibility tree: after the email error appeared, the email field was a "textbox" named "Email" with the description "That email address looks incomplete. Check the @ and the part after it."

This is the only ARIA in the form, on purpose. MDN quotes the first rule of ARIA: "If you can use a native HTML element or attribute with the semantics and behavior you require already built in… then do so" (MDN, *ARIA*). The `<label for>` already names each field. `required` already says it is required. `aria-describedby` is here because HTML has no native way to say "this paragraph is the error for that input." **ARIA only when native HTML is not enough.**

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The image under Concept 6 shows two filled message elements.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Why is the message element in the HTML from the start, empty, instead of created by JavaScript when the error happens? (Hint: `aria-describedby` points to an id. What has to exist for it to point at?)

### 6. Where should the cursor go when something is wrong?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> After a failed submit, the visitor's next question is "what do I fix?" Move them there.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Every element that can take focus has a `.focus()` method. The checking function in the Exercise, `findFirstProblem()`, checks every field, shows every message, and **returns the first field with a problem, or `null`** if there is none, the same return-`null` pattern from Module 7. The submit handler then calls `firstProblem.focus()`. Focus lands in the field, a keyboard user can type the fix at once, and a screen reader reads the label and the error together.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m10-form-errors.png" alt="Two real renders at 390 px. Before: an empty form with Name, Email and Message fields, a practice checkbox and a Send button. After Send with Your Name, you@ and hi: the email box has a red border inside the dark orange focus ring, and the message &quot;That email address looks incomplete. Check the @ and the part after it.&quot; The message box also has a red border and &quot;Please write at least 10 characters.&quot;" loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Name was fine, so the first problem is Email, and that is where focus went (the dark orange ring around its red border). Both problems are listed at once, so the visitor fixes everything in one pass. Labels added above each render. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> If all three fields had problems, which field would receive focus? Why that one?

### 7. How do you confirm success and clear the form?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> When everything passes, say so, clearly, and get the form ready for the next message.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The confirmation goes into a status element that is in the HTML from the start: `<p id="status" role="status"></p>`. MDN's live-regions guide describes `role="status"` as "an area of the screen that provides an updated status of some kind"; it is a polite live region, which the guide says a screen reader speaks "whenever the user is idle." The same guide warns: "Establish the live region before updating its content… The most reliable way to ensure that live regions are registered is to include them in the initial markup" (MDN, *ARIA live regions*). Then `form.reset()`, which "restores a form element's default values" (MDN, *HTMLFormElement: reset() method*). Read anything you want to show (like the name) **before** you reset, or it will be gone.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m10-form-sent.png" alt="Two real renders at 390 px. Left, sending: fields still filled, the Send button faded, and a pale blue &quot;Sending...&quot; message. Right, one second later: all fields empty and a green message &quot;Thanks, Your Name. Your message was sent.&quot;" loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The fixed form went through `sending` and then `sent`. The name in the thank-you line was read before `form.reset()` emptied the fields. Labels added above each render. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Put these in order: `form.reset()`, read the name, show the thank-you message.

### 8. How do you show what state the form is in?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A real form is not just "filled" or "empty." It is waiting, or busy, or done, or it failed.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Give the form exactly one state class at a time and let CSS draw each state. One small function does it, using two `classList` methods from Module 9:

```js
function setState(stateName) {
  form.classList.remove("idle", "sending", "sent", "failed");
  form.classList.add(stateName);
}
```

`remove()` accepts several class names at once; classes that are not there are ignored. While sending, the button is also disabled with `sendButton.disabled = true`, so a second click cannot send twice. In the Exercise, `setTimeout(finishSending, 1000)` waits one second and then calls `finishSending`, a stand-in for a server's answer. (Same rule as listeners: you pass `finishSending`, not `finishSending()`.) A practice checkbox lets you choose whether the pretend send fails, so you can see every state. In a later, optional module (not yet published), a real server replaces the timer. **Nothing in this module leaves your computer.**

One side effect of disabling Send, checked in Chromium: if focus is on the button when it becomes disabled (after a click, or Tab and Enter), focus drops to the page itself, and `document.activeElement` is `<body>`. Focus stays there after the button comes back, so a keyboard user presses Shift+Tab to get back into the form. Pressing Enter in the Name or Email box does not have this problem: focus stays in that box.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m10-state-diagram.png" alt="A diagram: idle, an arrow labeled valid submit to sending, then two arrows to sent (thank-you, form reset) and failed (error, values kept). Under idle: a problem found, stay idle, show errors." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Four states, one class at a time. When the send fails, the values stay, so the visitor does not retype a long message.*

<img src="../images/m10-states.png" alt="Four real renders at 390 px side by side: idle (empty form), sending (faded button, Sending...), sent (empty form, green thank-you), failed (checkbox ticked, values kept, red &quot;Sorry, your message did not go through. Please try again.&quot;)." loading="lazy">

*The same page in each of the four states, driven only by the class on the `<form>` and the text in `#status`. Labels added above each render. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Which CSS selector in the Exercise colors the status message red? Find it before you type the CSS.

### 9. Why is client-side validation not security?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Everything in this module runs in the visitor's browser. The visitor controls that browser.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> MDN is direct: client-side validation "should not be considered an exhaustive security measure," because it "is too easy to bypass," and "Your apps should always perform validation, including security checks, on any form-submitted data on the server-side as well" (MDN, *Client-side form validation*). Anyone can open DevTools and delete your `required` attributes, switch off JavaScript, or skip your page entirely and send data straight to the server. So the rule for this course is: **client-side validation is user experience, not security.** It helps honest visitors fix mistakes quickly. **Server-side validation** means the program that receives the data checks it again, every time, before trusting it. Writing that program is outside this course's core; you only need to know it must exist.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order. You can type them yourself on the Exercise page once it is open (step 4):

```js
document.querySelector("#contact-form").checkValidity()
for (const field of document.querySelectorAll("[required]")) { field.removeAttribute("required"); }
document.querySelector("#contact-form").checkValidity()
```

Press **F5** afterwards to get the `required` attributes back.

<img src="../images/m10-bypass-console.png" alt="The Console on the practice page: the form's checkValidity() is false; a for...of loop over querySelectorAll(&quot;[required]&quot;) removes each required attribute; checkValidity() is now true." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *One line in the Console, using Module 9's `querySelectorAll()` and `for...of`, switched the browser's rules off. The empty form now counts as valid. (real output, rendered; evaluated in Chromium 141)*

<img src="../images/m10-client-server.png" alt="Three boxes: Browser checks (required, type, your JS; fast feedback = UX), Request travels (anyone can change it or send their own), Server checks (checks again, every time; this is the security)." loading="lazy">

*Your checks live in the first box. Only the last box protects anything.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> A friend says, "My form has `required` on every field, so no one can send me an empty message." What one sentence do you say back?

## Exercise

*Your hands, about 75 minutes (estimate).* Type it, do not paste it. Work in `practice-10`. Nothing here is published, and nothing is sent anywhere.

1. **Create the HTML.** Make `index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Form practice</title>
     <link rel="stylesheet" href="styles.css">
     <script src="script.js" defer></script>
   </head>
   <body>
     <main>
       <h1>Form practice</h1>
       <form id="contact-form" class="idle" novalidate>
         <div class="field">
           <label for="name">Name</label>
           <input id="name" name="name" type="text" required aria-describedby="name-error">
           <p id="name-error" class="error"></p>
         </div>
         <div class="field">
           <label for="email">Email</label>
           <input id="email" name="email" type="email" required aria-describedby="email-error">
           <p id="email-error" class="error"></p>
         </div>
         <div class="field">
           <label for="message">Message</label>
           <textarea id="message" name="message" rows="4" required minlength="10" aria-describedby="message-error"></textarea>
           <p id="message-error" class="error"></p>
         </div>
         <div class="field check">
           <input id="pretend-fail" type="checkbox">
           <label for="pretend-fail">Practice only: pretend the send fails</label>
         </div>
         <button id="send-btn" type="submit">Send</button>
       </form>
       <p id="status" role="status"></p>
     </main>
   </body>
   </html>
   ```

   Notice: `novalidate` on the form, `class="idle"` to start, each field's `aria-describedby` naming the empty `<p>` under it, and the `#status` paragraph outside the form, right after it.

2. **Add the CSS.** Make `styles.css`. The last block is the state styles. `.sent + #status` means "the `#status` element right after a form with the class `sent`." `:empty` matches an element with nothing inside it, not even a space (MDN, *:empty*). So `.error:empty` hides an error line until it has text. `#status:empty` only takes away the padding and margin: the empty status line takes no space, but it stays in the page, ready for screen readers (Concept 7). Checked in Chromium's accessibility tree: the empty `#status` is there at load, as a polite `status` region.

   Why `input.invalid` and not just `.invalid`? Module 2's specificity: `input[type="text"]` scores 0-1-1, because an attribute selector counts in the class column, so it beats `.invalid` (0-1-0); `input.invalid` also scores 0-1-1 and wins the tie because it comes later in the file.

   ```css
   body {
     margin: 0;
     font-family: "Segoe UI", Arial, sans-serif;
     background: #f4f1ea;
     color: #1f2328;
   }
   main { max-width: 520px; margin: 0 auto; padding: 24px 16px; }
   h1 { font-size: 1.6rem; margin: 0 0 16px; }
   form {
     background: #fff;
     border: 1px solid #ddd5c4;
     border-radius: 10px;
     padding: 16px;
   }
   .field { margin-bottom: 14px; }
   label { display: block; font-weight: 600; margin-bottom: 4px; }
   .check { display: flex; gap: 8px; align-items: center; }
   .check label { font-weight: 400; margin: 0; font-size: 0.9rem; color: #555; }
   input[type="text"], input[type="email"], textarea {
     box-sizing: border-box;
     width: 100%;
     font: inherit;
     padding: 8px 10px;
     border: 1px solid #8a8f98;
     border-radius: 6px;
   }
   input:focus-visible, textarea:focus-visible, button:focus-visible {
     outline: 3px solid #b45309;
     outline-offset: 2px;
   }
   input.invalid, textarea.invalid { border: 2px solid #b3261e; }
   .error { color: #b3261e; margin: 4px 0 0; font-size: 0.95rem; }
   .error:empty { display: none; }
   button {
     font: inherit;
     padding: 8px 20px;
     border: 0;
     border-radius: 6px;
     background: #2d4a7a;
     color: #fff;
     cursor: pointer;
   }
   /* Form states */
   .sending button { opacity: 0.6; cursor: wait; }
   #status { margin: 14px 0 0; padding: 10px 12px; border-radius: 6px; }
   #status:empty { padding: 0; margin: 0; }
   .sent + #status { background: #e3f4e5; color: #1e5b2a; }
   .failed + #status { background: #fbe4e2; color: #8c1d18; }
   .sending + #status { background: #eef1f6; color: #2d4a7a; }
   ```

3. **Type the script.** Make `script.js`. Type the three block comments first. Then fill block 1, then the small functions in block 2, then `findFirstProblem`, then `finishSending`, then `handleSubmit`, then block 3.

   ```js
   // 1. Find elements
   const form = document.querySelector("#contact-form");
   const nameInput = document.querySelector("#name");
   const emailInput = document.querySelector("#email");
   const messageInput = document.querySelector("#message");
   const nameError = document.querySelector("#name-error");
   const emailError = document.querySelector("#email-error");
   const messageError = document.querySelector("#message-error");
   const pretendFail = document.querySelector("#pretend-fail");
   const sendButton = document.querySelector("#send-btn");
   const statusMessage = document.querySelector("#status");

   // 2. Define behavior
   function setState(stateName) {
     form.classList.remove("idle", "sending", "sent", "failed");
     form.classList.add(stateName);
   }

   function showError(input, errorElement, text) {
     errorElement.textContent = text;
     input.classList.add("invalid");
   }

   function clearError(input, errorElement) {
     errorElement.textContent = "";
     input.classList.remove("invalid");
   }

   // Checks every field. Returns the first field with a problem, or null.
   function findFirstProblem() {
     let firstProblem = null;
     clearError(nameInput, nameError);
     clearError(emailInput, emailError);
     clearError(messageInput, messageError);

     const name = nameInput.value.trim();
     if (name === "") {
       showError(nameInput, nameError, "Please enter your name.");
       firstProblem = nameInput;
     }

     const email = emailInput.value.trim();
     if (email === "") {
       showError(emailInput, emailError, "Please enter your email address.");
       if (firstProblem === null) { firstProblem = emailInput; }
     } else if (!emailInput.checkValidity()) {
       showError(emailInput, emailError, "That email address looks incomplete. Check the @ and the part after it.");
       if (firstProblem === null) { firstProblem = emailInput; }
     }

     const message = messageInput.value.trim();
     if (message.length < 10) {
       showError(messageInput, messageError, "Please write at least 10 characters.");
       if (firstProblem === null) { firstProblem = messageInput; }
     }

     return firstProblem;
   }

   function finishSending() {
     if (pretendFail.checked) {
       setState("failed");
       statusMessage.textContent = "Sorry, your message did not go through. Please try again.";
     } else {
       setState("sent");
       statusMessage.textContent = "Thanks, " + nameInput.value.trim() + ". Your message was sent.";
       form.reset();
     }
     sendButton.disabled = false;
   }

   function handleSubmit(event) {
     event.preventDefault();
     statusMessage.textContent = "";
     const firstProblem = findFirstProblem();
     if (firstProblem !== null) {
       setState("idle");
       firstProblem.focus();
       return;
     }
     setState("sending");
     statusMessage.textContent = "Sending...";
     sendButton.disabled = true;
     // Stand-in for a real server: wait one second, then finish.
     setTimeout(finishSending, 1000);
   }

   // 3. Connect events
   form.addEventListener("submit", handleSubmit);
   ```

4. **Predict, then test empty.** Open `index.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab. Predict what happens when you press **Send** with every field empty: how many messages, and where does the cursor go? Then press Send.
5. **Test the tricky values.** Type three spaces in Name, `you@` in Email and `hi` in Message. Press Send. Compare with the right half of the image under Concept 6 (that one had a real name, so Name passed).
6. **Fix and send.** Fix all three fields and press Send. Watch for `Sending...` and the faded button, then the green thank-you one second later. The fields should be empty.
7. **Test the failure.** Fill the form again, tick **Practice only: pretend the send fails**, and press Send. Your values should still be in the fields, above the red message.
8. **Keyboard only.** Reload. Use only Tab, typing and Enter to fill the form with one mistake and submit it. Pressing Enter in the Name or Email box submits the form too. In the Message box, Enter starts a new line, so Tab to **Send** and press Enter there. Does focus land on the mistake?
9. **Break it on purpose.** In `handleSubmit`, comment out the first line: `// event.preventDefault();`. Save and press **F5**. Type a name, leave the rest empty, and press Send. Watch the address bar.

   <img src="../images/m10-no-prevent.png" alt="A real render of the practice page inside a drawn browser frame. The address reads file:///C:/Users/you/Documents/code559/practice-10/index.html?name=Your+Name&amp;email=&amp;message= and the form is empty, with no error messages showing." loading="lazy">
   
   *Your handler ran and even wrote the error messages, but then the browser did its default: it sent the form by adding `name=value` pairs to the address and loaded the page again. The new page starts fresh, so the name you typed and every message are gone. The `?name=Your+Name&email=&message=` part is real, captured from Chromium after the click on the page opened as a file; the frame around it is drawn. (real output, rendered; captured on Linux, with the folder path changed to the course folder)*

   The clue is the address bar, not the Console: nothing went red. Remove the `//` and save. Then delete the `?…` part of the address, press Enter to load the page again, and test again.
10. **Optional second break.** In `findFirstProblem`, change `const name = nameInput.value.trim();` to `const name = nameInput.value;`. Save and press **F5**. Type three spaces as the name, fill the rest correctly, and press Send.

    <img src="../images/m10-no-trim.png" alt="A real render at 390 px: the form is empty after a successful send, and the green message reads &quot;Thanks, . Your message was sent.&quot;" loading="lazy">
    
    *Three spaces are not `""`, so the check passed and the form "sent" with no name. The thank-you line still trims, so the visitor sees "Thanks, ." (real: rendered in Chromium)*

    Put `.trim()` back.

## Project (in the full packet)

Two projects use this module on your own site. The **Contact page** is finished: your Module 4 form gets the full validation cycle from this module, with messages written in your own voice, focus on the first problem, a confirmation that names the visitor, the four form states styled to match your site, and a keyboard-only test you write down and run. It still sends nothing; it is ready for a real server when you have one. And the **rating card** from Module 4 gets its JavaScript: it reads the chosen rating, shows it in the thank-you message, and swaps the form for the thank-you section.

The full brief, the step-by-step build, and the finishing work in Git are in the Module 10 packet. <a href="https://code559.gumroad.com/l/module-10-forms-validation" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"If my JavaScript checks every field, the data that reaches me will always be clean."*

What would you say? Hint: look again at the image under Concept 9. Who controls the browser your checks run in?

## Summary

A form fires `submit` on the form itself, and `event.preventDefault()` stops the browser from sending it and reloading the page. `.value` gives what the visitor typed as a string, and `.trim()` removes spaces at both ends so that three spaces count as empty. HTML's `required`, `type`, `minlength` and `pattern` check input with no JavaScript and block the submit. `novalidate` turns off the browser's bubbles so your own messages can appear on the page, while `checkValidity()` still uses the HTML rules. Each error message sits in an element tied to its field with `aria-describedby`, the one place native HTML is not enough. `.focus()` moves the visitor to the first field with a problem. A `role="status"` element in the initial HTML announces the confirmation, and `.reset()` clears the form after you have read what you need. One state class at a time, set with `classList`, lets CSS show `idle`, `sending`, `sent` and `failed`. Client-side validation is user experience, not security; the server must always check again.

## Check your understanding

1. Your submit handler shows the right errors, but they flash and vanish, and the address bar gains a `?`. What is missing?
2. **What value does this variable hold?** A visitor types two spaces, then `Ana`, then one space into Name. What does `nameInput.value` hold, and what does `nameInput.value.trim()` hold?
3. Why does the Exercise keep the `required` and `minlength` attributes even though `novalidate` is on and JavaScript does the checking?

## Before next module

- [ ] Your `practice-10` form shows every problem at once and puts focus on the first one
- [ ] Three spaces in Name are refused
- [ ] You saw all four states: idle, sending, sent, failed
- [ ] You saw the page reload and lose its messages without `preventDefault()`, and fixed it
- [ ] You can say in one sentence why client-side validation is not security
- [ ] If you did this module's packet project in my-site, saved it with the routine: git status → git add . → git commit -m "…" → git push → check the live page. (Your practice folder is not saved to GitHub.)

## Go further

- MDN: *Client-side form validation* (Learn web development, Forms), the whole page, including "Validating forms using JavaScript"
- MDN: *HTMLFormElement: submit event* and *Event: preventDefault() method*
- MDN: *String.prototype.trim()*
- MDN: *HTMLFormElement: reset() method*
- MDN: *ARIA: aria-describedby attribute*; *ARIA live regions*; *ARIA* (the "Before using ARIA" section and the first rule of ARIA)
- freeCodeCamp: the free [JavaScript Certification](https://www.freecodecamp.org/learn/javascript-v9/) (checked 2026-10-11) has practice on this topic.

## What to keep

Keep `practice-10` with its finished `script.js`, and write down the five tests from steps 4 to 8 as one line each: what you did, what you expected, what happened. Module 11 turns that list into a test plan. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "Client-side form validation"; MDN "HTMLFormElement: submit event"; MDN "Event: preventDefault() method"; MDN "String.prototype.trim()"; MDN "HTMLFormElement: reset() method"; MDN "ARIA: aria-describedby attribute"; MDN "ARIA live regions"; MDN "ARIA". Checked 2026-10-11: MDN ":checked"; MDN ":empty"; MDN "Handling conflicts" (attribute selectors count in the class column); MDN "HTMLFormElement: submit event" (pressing Enter in a text input); MDN "minlength HTML attribute". Every page render, Console result and accessibility-tree check was captured in Chromium 141.0.7390.37 (via Playwright) on Linux.*
