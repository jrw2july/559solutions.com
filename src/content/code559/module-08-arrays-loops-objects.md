---
title: "Module 8: Arrays, Loops, and Objects"
subtitle: "Keep many values in one place, visit each one in turn, and give each item named facts."
module: 8
series: Code559 Front-End Developer Course
estimated_time: "about 2.5 hours (estimate)"
---

# Module 8 — Arrays, Loops, and Objects

*Keep many values in one place, visit each one in turn, and give each item named facts.*

**Time:** about 2.5 hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn to keep lists in arrays, visit every item with a loop, and give each item named facts with objects. It's the toolkit for any page built from data: twenty projects or milestones don't fit in twenty separate variables.

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
  - [1. What is an array, and why does counting start at 0?](#1-what-is-an-array-and-why-does-counting-start-at-0)
  - [2. What does `.length` tell you, and where is the last item?](#2-what-does-length-tell-you-and-where-is-the-last-item)
  - [3. How do you add an item with `.push()`?](#3-how-do-you-add-an-item-with-push)
  - [4. How does a `for` loop visit every item?](#4-how-does-a-for-loop-visit-every-item)
  - [5. How do you use a condition inside a loop?](#5-how-do-you-use-a-condition-inside-a-loop)
  - [6. When should you use `for...of` instead?](#6-when-should-you-use-forof-instead)
  - [7. How do `.includes()` and `.join()` help?](#7-how-do-includes-and-join-help)
  - [8. What is the difference between a property and a method?](#8-what-is-the-difference-between-a-property-and-a-method)
  - [9. What is an object?](#9-what-is-an-object)
  - [10. When does an array of objects beat parallel arrays?](#10-when-does-an-array-of-objects-beat-parallel-arrays)
  - [11. How do `&&`, `||` and `!` combine true and false?](#11-how-do---and--combine-true-and-false)
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

- What an array is, and why its indexes start at 0
- How `.length` works, and why the last item is at `length - 1`
- How to add an item to the end with `.push()`
- The traditional `for` loop, and what `i++` does
- How to put a condition inside a loop to count or pick items
- The `for...of` loop, for when you only need each item
- How `.includes()` checks arrays and strings, and how `.join()` turns an array into text
- Properties versus methods: `object.property` versus `object.method()`
- Objects as named bundles of properties, dot access, and arrays of objects
- When an array of objects beats several parallel arrays
- The logical operators `&&`, `||` and `!`

## Why this matters

A real site has several pages, several projects and several milestones. So far, every value in your JavaScript has lived in its own variable. That works for two or three values. It does not work for twenty, and it does not work when you do not know how many there will be.

This module gives you the three tools every data-driven page is built from. An **array** keeps a list in one variable. A **loop** visits every item in that list without you writing one line per item. An **object** gives each item named facts, like a title, a year and whether it is live. Put the three together and you have an array of objects, which is how most real web data is shaped.

You stay in the Console and Node one more time. In Module 9 you use the same patterns on a web page, where a loop over an array of objects builds a list a visitor can see.

## Before you start

1. Finish Module 7. You should be able to write a function with a parameter and a `return`, and test it with several calls.
2. In your course folder, create a throwaway folder called `practice-08`. Open it in VS Code with **File → Open Folder…**, then open a terminal with **Terminal → New Terminal**.
3. Open Edge or Chrome. Press **F12** (or **Ctrl+Shift+J**) to open DevTools, then click the **Console** tab.
4. On paper, write down three of your own interests and two projects or milestones you would like on your site. You will use them instead of the examples.

> **Checkpoint.** You have an empty `practice-08` folder open in VS Code, a terminal whose prompt ends in `practice-08>`, a Console ready, and your own short list on paper.

## Core concepts

### 1. What is an array, and why does counting start at 0?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An array is one variable that holds a list of values, in order. You write it with square brackets and commas.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Each item has a position number called an **index**. The first index is `0`, not `1`. Think of the index as "how many steps from the start": the first item is zero steps away. You read an item with the array name and the index in square brackets: `pages[0]`.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m08-indexes.png" alt="Four boxes labeled Home, About, Interests and Projects, with index 0 to 3 under them, and a dashed empty box at index 4 labeled nothing here." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Four items, indexes 0 to 3. There is no index 4.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Before you type anything, think this through: what does `pages[2]` hold?

### 2. What does `.length` tell you, and where is the last item?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `.length` is the number of items in the array.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Because counting starts at 0, the last index is always one less than the length. That is why `pages[pages.length - 1]` always gives the last item, however long the list grows. Reading at an index that does not exist is not an error. You get `undefined`, quietly.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order:

```js
const pages = ["Home", "About", "Interests", "Projects"];
pages[0]
pages[3]
pages.length
pages[pages.length - 1]
pages[4]
pages.push("Contact")
pages
```

<img src="../images/m08-array-basics.png" alt="The Console: pages[0] is 'Home', pages[3] is 'Projects', pages.length is 4, pages[pages.length - 1] is 'Projects', pages[4] is undefined, pages.push(&quot;Contact&quot;) returns 5, and pages now shows five items." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *`pages[4]` gives `undefined`, not an error. Note what `.push()` prints: `5`, the new length, not the array. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Type the `pages` array into your Console and read `pages[pages.length]`. Predict first. Why is it `undefined`?

### 3. How do you add an item with `.push()`?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `.push()` adds one or more items to the end of an array.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The array changes in place. The value `.push()` hands back is the new length (MDN, *Array.prototype.push()*: "The new length property of the object upon which the method was called"). So do not write `pages = pages.push("Contact")`. That would try to replace your array with a number. Just call `pages.push("Contact")` on its own line. This works even though `pages` was made with `const`, because `const` stops you pointing the name at a different array; it does not stop the array's contents from changing.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> In the image above, `pages.push("Contact")` printed `5`, and the next line showed five items with `'Contact'` at the end.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Push one of your own interests onto an array, then check `.length` went up by one.

### 4. How does a `for` loop visit every item?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A loop runs the same block of code again and again. Each run is called a **lap**, like one lap around a running track. The traditional `for` loop counts, so it is a natural fit for indexes.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The line `for (let i = 0; i < pages.length; i++)` has three parts between the parentheses, separated by semicolons. **Start**: `let i = 0` runs once. **Check**: `i < pages.length` runs before every lap; while it is `true`, the body runs; when it is `false`, the loop stops. **Step**: `i++` runs after every lap. `++` means "add 1 to this variable." It is short for `i = i + 1`. Inside the body, `pages[i]` is the item for this lap.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m08-loop-anatomy.png" alt="The for loop line split into four boxes: Start, Check, Body and Step, with what each part does." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The check uses `<`, not `<=`. With 4 items, `i` takes the values 0, 1, 2 and 3, and the loop stops when `i` reaches 4.*

Typed into the Console for the picture below, in this order. The first line makes a fresh four-item `pages`, without the `"Contact"` you pushed above. (The Console lets you type a `const` line again to start over; in a file, declaring the same name twice is an error.)

```js
const pages = ["Home", "About", "Interests", "Projects"];
for (let i = 0; i < pages.length; i++) {
  console.log(i + ": " + pages[i]);
}
let count = 0;
count++
count
```

<img src="../images/m08-for-loop.png" alt="The Console: the loop prints 0: Home, 1: About, 2: Interests, 3: Projects. Then let count = 0, count++ shows 0, and count shows 1." loading="lazy">

*Four laps, four lines. At the bottom, `count++` shows `0` because it hands back the old value and then adds 1. Asking for `count` on the next line shows the 1. Inside a loop you never use that handed-back value, so it does not matter there. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Change `i < pages.length` to `i < 2` and predict how many lines print.

### 5. How do you use a condition inside a loop?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Put an `if` inside the loop body, and the loop can count or pick only some items.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> The pattern is: make a counter before the loop, check each item inside the loop, and add to the counter when the check is true. After the loop, the counter holds the answer. You used `if` in Module 6; nothing about it changes inside a loop.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order. (In the picture, `let restDays = 0;` and the loop were typed as one entry. If you type them one at a time, you see one extra `undefined` after the first line.)

```js
const minutes = [30, 0, 45, 20, 0];
let restDays = 0;
for (let i = 0; i < minutes.length; i++) {
  if (minutes[i] === 0) {
    restDays++;
  }
}
restDays
```

<img src="../images/m08-loop-if.png" alt="The Console: minutes is [30, 0, 45, 20, 0]; a for loop with an if inside counts the zeros and shows 1 right after it; then restDays shows 2." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *An array of practice minutes is checked day by day, and every `0` adds one to `restDays`. The answer is `2`. The `1` right after the loop is not the answer: after any loop, the Console also shows a value left over from the last lap, often `undefined`. To see the answer, ask for the variable, as on the next line. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Change the check to `minutes[i] >= 30` and the name to `longDays`. Predict the answer before you run it. (It is 2: the 30 and the 45.)

### 6. When should you use `for...of` instead?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `for...of` is a second kind of loop. On an array, it runs one lap per item, in order, and puts the item itself in a variable for you.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `for (const amount of minutes)` gives you each value directly, with no `i` and no square brackets. Use it when you only need the items. Use the counting `for` loop when you also need the position, for example to print `1:`, `2:`, `3:` beside each one.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order, right after the Concept 5 lines (so `minutes` already exists):

```js
for (const amount of minutes) {
  console.log(amount + " min");
}
```

<img src="../images/m08-loop-if-forof.png" alt="The Console: a for...of loop over minutes prints 30 min, 0 min, 45 min, 20 min and 0 min, then undefined." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *`for...of` visits the same five values as the counting loop in Concept 5, with less to type. The `undefined` at the end is the value left over from the last lap, as in Concept 5. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Rewrite the rest-day counter with `for...of`. You need `if (amount === 0)` inside.

### 7. How do `.includes()` and `.join()` help?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> `.includes()` answers "is this in here?" with `true` or `false`. `.join()` turns an array into one piece of text.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `.includes()` works on arrays and on strings. On an array, it checks whole items. On a string, it checks for a piece of text anywhere inside. It is exact: `"Music"` and `"music"` are different. `.join()` puts the text you give it between items. With nothing in the parentheses, MDN says the items "are separated with a comma."

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order:

```js
const interests = ["drawing", "cycling", "music"];
interests.includes("music")
interests.includes("Music")
"front-end developer".includes("end")
interests.join(", ")
interests.join()
```

<img src="../images/m08-includes-join.png" alt="The Console: interests.includes(&quot;music&quot;) is true, includes(&quot;Music&quot;) is false, &quot;front-end developer&quot;.includes(&quot;end&quot;) is true, interests.join(&quot;, &quot;) is 'drawing, cycling, music', and interests.join() is 'drawing,cycling,music'." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Capital letters matter to `.includes()`. And notice the difference between `join(", ")` and `join()`: the space after the comma only appears when you ask for it. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Join your own interests with `" / "` and with `" and "`. Which reads better as a sentence?

### 8. What is the difference between a property and a method?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Arrays and strings carry named values you can read, and named actions you can run. A value is a **property**. An action is a **method**.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> You read a property with a dot and its name: `tags.length`. You run a method with a dot, its name and parentheses: `tags.push("js")`, `"  hello  ".trim()`. MDN's glossary defines a method as "a function which is a property of an object." So this is Module 7 again: a method name without parentheses is a reference to the function; with parentheses it is a call. `.trim()` returns a copy of the string without the spaces at both ends; you will lean on it in Module 10 to check form inputs.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order (two spaces before and after `hello`):

```js
const tags = ["html", "css"];
tags.length
tags.push("js")
tags.length
tags.length()
"  hello  ".length
"  hello  ".trim()
"  hello  ".trim().length
"hello".trim
```

<img src="../images/m08-props-methods.png" alt="The Console: tags.length is 2, tags.push(&quot;js&quot;) returns 3, tags.length is now 3, tags.length() throws TypeError: tags.length is not a function, &quot;  hello  &quot;.length is 9, .trim() gives 'hello', .trim().length is 5, and &quot;hello&quot;.trim with no parentheses shows ƒ trim() { [native code] }." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Parentheses on a property are an error, because a number cannot be run. A method without parentheses gives you the function itself, the same thing you saw with `showMessage` in Module 7. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> For each of these, say "property" or "method" to yourself, out loud, before you type it:[^recite] `pages.length`, `pages.push("Blog")`, `"Hi ".trim()`, `"Hi ".length`.

### 9. What is an object?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An object is a named bundle of properties. Where an array is a list in order, an object is a set of labeled facts about one thing.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> You write an object with curly braces. Each property is a name, a colon and a value, separated by commas: `{ title: "Rating card", year: 2026, live: true, tags: ["html", "css"] }`. You read a property with a dot: `project.title`. A value can be anything, including an array, so `project.tags.length` reads the length of the array stored in `tags`. Asking for a property that does not exist gives `undefined`, just like reading past the end of an array.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order:

```js
const project = { title: "Rating card", year: 2026, live: true, tags: ["html", "css"] };
project.title
project.tags.length
project.status
const projects = [
  { title: "Rating card", year: 2026, live: true },
  { title: "FAQ card", year: 2026, live: false }
];
projects[1].title
for (const p of projects) {
  console.log(p.title + " (" + p.year + ")");
}
```

<img src="../images/m08-objects.png" alt="The Console: project.title is 'Rating card', project.tags.length is 2, project.status is undefined; then an array of two project objects, projects[1].title is 'FAQ card', and a for...of loop prints Rating card (2026) and FAQ card (2026)." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *`projects[1].title` reads from left to right: the array, then item 1, then its `title`. The loop at the bottom visits each object and reads two of its properties. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Make an object for one of your own projects or milestones, with at least a `title` and a `year`. Read each property back.

### 10. When does an array of objects beat parallel arrays?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Parallel arrays are several arrays where item 0 of each belongs together, item 1 of each belongs together, and so on.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> They work until something changes. Delete an item from one array and forget the other, and every item after it is paired with the wrong facts, with no error to warn you. An array of objects keeps each item's facts together, so they cannot drift apart. Use an array of objects whenever each item has two or more facts.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m08-parallel-vs-objects.png" alt="Top: three parallel arrays of titles, years and live flags. Bottom: the same data as an array of two objects." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The same two projects, stored two ways. In the bottom version, adding a fact means adding one property, not a whole new array.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Take your paper list of projects or milestones and write it as an array of objects.

### 11. How do `&&`, `||` and `!` combine true and false?

A change of topic for the last concept: it is not about arrays, but the Exercise needs it to check two facts about each place at once.

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Logical operators join two checks into one, or flip one.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `&&` (AND) is `true` only when **both** sides are `true`. `||` (OR) is `true` when **at least one** side is `true`. `!` (NOT) flips `true` to `false` and `false` to `true`. You will use them in `if` statements, such as "the project is live AND it is from this year." MDN adds one detail: with values that are not `true` or `false`, these operators hand back one of the values themselves (for example, `"Home" && "About"` gives `'About'`). In this course you will use them with `true` and `false`.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

Typed into the Console for the picture below, in this order:

```js
[true && true, true && false, false && true, false && false]
[true || true, true || false, false || true, false || false]
[!true, !false]
const live = true;
const year = 2025;
live && year === 2026
live || year === 2026
!live
```

<img src="../images/m08-logic.png" alt="The Console: the four &amp;&amp; combinations give true, false, false, false; the four || combinations give true, true, true, false; !true is false and !false is true; with live true and year 2025, live &amp;&amp; year === 2026 is false, live || year === 2026 is true, and !live is false." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The first three lines are the full truth tables. Only one `&&` row is `true`; only one `||` row is `false`. Then a real use: `year === 2026` is `false`, so the `&&` fails and the `||` passes. (real output, rendered)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict `!live && year === 2025`, then type it to check.

## Exercise

*Your hands, about 50 minutes (estimate).* Type it, do not paste it. Work in `practice-08`. Use your own interests and places instead of the examples if you like; the shape is what matters.

1. **Create `practice.js`** and type an array of three interests named `interests`, for example `const interests = ["drawing", "cycling", "music"];`. Below it, log its `.length` and its last item using `length - 1`.
2. **Push one more** interest with `.push()`.
3. **Loop with indexes.** Write a `for` loop that logs each item with its index in front, like `0: drawing`.
4. **Check and join.** Log `interests.includes(…)` for one item you have and one you do not. Then log `interests.join(" | ")`.
5. **An array of objects.** Type this, with your own place names if you prefer:

   ```js
   const places = [
     { name: "City library", visited: true, free: true },
     { name: "Art museum", visited: false, free: false },
     { name: "River park", visited: false, free: true }
   ];

   for (const place of places) {
     if (!place.visited && place.free) {
       console.log("Next free trip: " + place.name);
     }
   }
   ```

   Read the `if` to yourself, out loud, before you run it: "not visited, and free."
6. **Run it.** Save, then type `node practice.js` in the terminal. Predict every line first. With the example data you should get 10 lines, ending in `Next free trip: River park`.
7. **Break it on purpose.** In the `for` loop from step 3, change `i < interests.length` to `i <= interests.length`. Save and run.

   <img src="../images/m08-break-it.png" alt="A terminal running node practice.js where the index loop now prints a fifth line, 4: undefined, after 3: cooking." loading="lazy">
   
   *One character added, one extra lap. On the last lap `i` is 4, which equals the length, and `interests[4]` is `undefined`. No error message, just a wrong line. This is called an off-by-one error. (real output, rendered; captured on Linux, with the folder path changed to the course folder)*

   Change `<=` back to `<`, run again, and check the `undefined` line is gone.
8. **Your own.** Below everything, write a loop that counts how many places are `free` and logs the count. With the example data, the answer is 2.
9. **Modify.** Change the `if` in step 5 from `&&` to `||`. Predict which places print now, then run it.

## Project (in the full packet)

The project is a `site-data.js` file for your personal site: your real Projects and Milestones written as two arrays of objects (each with a title, year and short description; projects also have tags and whether each one is live), plus a few small functions that summarize the data, written from one-sentence descriptions and tested in Node. One counts the live projects, one lists every title as a single line of text, and one collects the milestones from a given year. In Module 9 you use the same patterns on a web page, building a list from an array of objects.

The full brief, the step-by-step build, and the finishing work in Git are in the Module 8 packet. <a href="https://code559.gumroad.com/l/module-08-arrays-loops-objects" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"An array with 4 items ends at index 4."*

What would you say? Hint: look at what `pages[4]` printed in the Concept 2 image, and count how many steps the first item is from the start.

## Summary

An array keeps a list of values in order, and its first index is 0. `.length` is the number of items, so the last item is at `length - 1`, and reading past the end gives `undefined`. `.push()` adds to the end and hands back the new length. The traditional `for` loop has a start, a check and a step, and `i++` adds 1 to `i` after every lap. An `if` inside a loop lets you count or pick items. `for...of` gives you each item directly when you do not need its index. `.includes()` answers `true` or `false` for arrays and strings, exactly, and `.join()` turns an array into text with the separator you choose. A property is a value you read with `object.property`; a method is an action you run with `object.method()`. An object is a named bundle of properties read with dot access, and an array of objects keeps each item's facts together where parallel arrays can drift apart. `&&` needs both sides true, `||` needs one, and `!` flips a value.

## Check your understanding

1. `tags.length()` throws a `TypeError`, but `tags.push("js")` works. Why does one need parentheses and the other must not have them?
2. You have six projects in an array. Which index holds the last one, and how would you write that so it still works when you add a seventh?
3. **What value does this variable hold** after this code runs? `let n = 0; for (const p of places) { if (p.visited || p.free) { n++; } }` (use the three places from the Exercise)

## Before next module

- [ ] `practice.js` runs with `node practice.js` and every line matches your predictions
- [ ] You saw the extra `undefined` line from `<=` and fixed it
- [ ] You can say, for `.length`, `.push()` and `.trim()`, which is a property and which are methods
- [ ] Your own projects or milestones are written on paper (or in a file) as an array of objects
- [ ] If you did this module's packet project in my-site, saved it with the routine: git status → git add . → git commit -m "…" → git push → check the live page. (Your practice folder is not saved to GitHub.)

## Go further

- MDN: *Array.prototype.push()*, *Array.prototype.includes()*, *Array.prototype.join()*
- MDN: *for...of*; and search "for statement" for the counting loop
- MDN: *Logical AND (&&)*, and the matching *Logical OR (||)* and *Logical NOT (!)* pages
- MDN Glossary: *Method*; and *String.prototype.trim()*
- freeCodeCamp: the free [JavaScript Certification](https://www.freecodecamp.org/learn/javascript-v9/) (checked 2026-10-11) has practice on this topic.

## What to keep

Keep `practice.js` and your array of objects for your own projects or milestones; the Module 8 project starts from it. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "Array.prototype.push()"; MDN "Array.prototype.includes()"; MDN "Array.prototype.join()"; MDN "for...of"; MDN "Logical AND (&&)"; MDN Glossary "Method"; MDN "String.prototype.trim()"; Chromium (via Playwright) for every Console result; Node 22.22.0 for every terminal result. Checked 2026-10-11: MDN "for...of" (plain-words summary); Chromium 141 for the split Concept 5 and 6 pictures (one Console session), the value shown after each loop, `project.tags.length` and `join(" / ")`. Checked 2026-10-12: Ozubko and MacLeod, "The Production Effect in Memory: Evidence That Distinctiveness Underlies the Benefit," *Journal of Experimental Psychology: Learning, Memory, and Cognition* 36(6), 2010 (the footnote on saying code out loud).*

[^recite]: **Why out loud?** Most people have recited something to learn it by heart: a phone number, a poem, lines for a play. Words you say aloud stick better than words you read silently; memory researchers call this the production effect (Ozubko and MacLeod, 2010). Explaining code to yourself out loud uses the same idea. It also shows you the line you cannot explain yet, and that line is the one to study next.
