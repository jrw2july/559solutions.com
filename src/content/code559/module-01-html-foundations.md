---
title: "Module 1: HTML Foundations"
subtitle: "Write your first pages by hand, link them together, and put them on the web."
module: 1
series: Code559 Front-End Developer Course
estimated_time: "about 2.5–3 hours (estimate)"
---

# Module 1 — HTML Foundations

*Write your first pages by hand, link them together, and put them on the web.*

**Time:** about 2.5–3 hours (estimate)

<!-- about:start -->
<details>
<summary><strong>About this module</strong></summary>

**What this module covers**

You learn how the web delivers a page, how to write HTML by hand, how to link pages together, and how to publish your first page on GitHub Pages. This is foundational: every website, framework and page builder ends up as an HTML file a browser reads. You also finish the first week with something live on the web.

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
  - [1. What happens when you visit a web page?](#1-what-happens-when-you-visit-a-web-page)
  - [2. What are the parts of a URL?](#2-what-are-the-parts-of-a-url)
  - [3. How do you create, save and see a file in VS Code?](#3-how-do-you-create-save-and-see-a-file-in-vs-code)
  - [4. What does every HTML document need?](#4-what-does-every-html-document-need)
  - [5. How do headings, paragraphs and lists work?](#5-how-do-headings-paragraphs-and-lists-work)
  - [6. How does a link work?](#6-how-does-a-link-work)
  - [7. How does an image work, and what is `alt` for?](#7-how-does-an-image-work-and-what-is-alt-for)
  - [8. What are semantic elements, and how do pages share navigation?](#8-what-are-semantic-elements-and-how-do-pages-share-navigation)
  - [9. How do you publish your first page?](#9-how-do-you-publish-your-first-page)
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

- How the web works: client, server, request and response
- The parts of a URL: scheme, host, path (and the anchor)
- How to create, save and open files in VS Code, and the save → refresh loop
- The structure of every HTML document: `<!DOCTYPE html>`, `<html lang>`, `<head>`, `<body>`, `<meta charset>`, `<meta name="viewport">`, `<title>`
- Headings, paragraphs and unordered lists
- Links and `href`, including same-page links to an `id`
- Images, `src` and `alt`
- The semantic elements `header`, `nav`, `main`, `section` and `footer`
- Multiple pages, relative paths, and shared navigation you test link by link
- **Publish your first page:** the GitHub Skills *Introduction to GitHub* exercise, then `git init`, your first commit, `gh repo create` and GitHub Pages
- The save routine you use from Module 2 on: `git status`, `git add .`, `git commit`, `git push`, then check the live page

## Why this matters

Every web page you have ever opened started as a plain text file of HTML. The browser reads that file and turns it into headings, paragraphs, links and pictures. If you can write that file by hand, you understand what every website, framework and page builder is producing under the hood.

This module starts with how a page travels from a server to your screen. Then you write one page and see how two pages link to each other. You end by putting your work on the public web with your own address, so from the first week you have something live you can show someone.

You will not style anything yet. Plain black-and-white pages are the point: structure first, appearance in Module 2.

## Before you start

1. Finish Module 0. You need VS Code (AI features off), Edge or Chrome, Git, the GitHub CLI signed in (`gh auth status`), and a `my-site` folder inside your course folder.
2. Make a second folder next to `my-site` called `practice-01`. This is your practice folder for the Exercise. Nothing in it is published directly; in step 11 you copy your finished page into `my-site`.
3. Find one picture you are happy to put on a public website (a photo you took, or a drawing). A photo taken with a phone can also store the place where it was taken, and anyone who downloads it from your site may be able to read that place (Apple Support, *Manage location metadata in Photos*). So do not use a photo taken at your home. Copy your picture into `practice-01` and rename it `image-one.jpg`, all lowercase. If yours is a `.png`, keep the `.png` ending and use that name everywhere this post says `image-one.jpg`. Windows treats `image-one.JPG` and `image-one.jpg` as the same file, but a web server may not, so the picture can work on your computer and be missing online. Use lowercase names and match them exactly.

> **Checkpoint.** You have `my-site` and `practice-01` side by side, there is an image file in `practice-01`, and `gh auth status` says you are logged in.

## Core concepts

### 1. What happens when you visit a web page?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> The web is a conversation between two computers. Your browser is the **client**. The computer that stores the website is the **server**.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> When you type an address or click a link, the client sends a **request**: "please send me this file." The server sends back a **response** with the file's contents. For a web page, that is HTML text. The browser reads the HTML, notices it also needs a stylesheet or an image, and requests those too. Then it draws the page. While you are learning, you will often open a file straight from your own disk. Then there is no server at all; the browser reads the file directly, and the address starts with `file:///`.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-request-response.png" alt="A client box (your browser) sends a request for /about.html to a server box that holds index.html, about.html, styles.css and image-one.jpg; the server sends the file's contents back." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Two messages: the request goes out, the response comes back. Everything else in this course happens inside one of these two boxes.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Open any website and click one link. Write down which part was the request and which part was the response.

### 2. What are the parts of a URL?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> MDN defines a URL as "the address of a unique resource on the internet" (MDN, *What is a URL?*).

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Read a URL left to right. The **scheme** (`https`) tells the browser which protocol to use to ask. After `://` comes the **host**, also called the domain (`www.example.com`), which says which server to ask. Then the **path** (`/about.html`) says which file on that server. An optional **anchor** (`#contact`) points to a spot inside the page. MDN notes that the part after `#` "is never sent to the server with the request"; the browser uses it to scroll.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-url-parts.png" alt="The URL https://www.example.com/about.html#contact split into colored boxes labeled scheme, host (domain), path and anchor (fragment)." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *One URL, four parts. You will write paths and anchors yourself in this module.*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Look at your browser's address bar right now. Point to the scheme, the host and the path.

### 3. How do you create, save and see a file in VS Code?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An HTML page is a text file whose name ends in `.html`. The home page of a site is called `index.html` by convention.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> In VS Code, use **File → Open Folder…** and choose the folder you want to work in. The Explorer panel on the left lists its files. Use the **New File** button at the top of the Explorer, type the full name including `.html`, and press Enter. When a tab shows a dot instead of an ✕, the file has unsaved changes. Press **Ctrl+S** to save. To see the page, open `index.html` in Edge or Chrome (double-click it in File Explorer, or drag it onto a browser window). After each save, press **F5** to reload. From then on you work in a loop: **edit → save → refresh**. If the browser does not show your change, the most common reason is that you did not save. The next thing to check is that the browser shows the file you are editing: its address bar should end with that folder and file name, for example `practice-01/index.html`.

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The first page in the next concept was opened from disk, which is why its address starts with `file:///`.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> You will create your first file in the Exercise. Remember the loop: edit, **Ctrl+S**, then F5 in the browser.

### 4. What does every HTML document need?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> HTML is made of **elements**. Most elements have an opening tag, content and a closing tag: `<p>Hello</p>`. The closing tag has a `/`.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Every page starts with the same skeleton. `<!DOCTYPE html>` tells the browser this is modern HTML. `<html lang="en">` wraps everything and states the page's language, which MDN says helps search engines and people using screen readers. The `<head>` holds information *about* the page: `<meta charset="utf-8">` sets the character encoding so any language's characters display correctly; `<meta name="viewport" content="width=device-width, initial-scale=1">` tells phones to use their real screen width instead of pretending to be a wide desktop; `<title>` is the text in the browser tab. The `<body>` holds everything visitors see.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web</h1>
    <p>This is my first web page. I typed every line of it.</p>
  </body>
</html>
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-first-page.png" alt="A browser window whose tab says My First Page, showing a large heading Hello, web and one paragraph." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The `<title>` appears on the tab, not on the page. The `<h1>` and `<p>` are the only things in the body. Measured at 800 px wide. (page real: rendered in Chromium; browser frame drawn)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: if you change only the text inside `<title>`, what changes on screen? (Only the tab.)

### 5. How do headings, paragraphs and lists work?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Headings run from `<h1>` (most important) to `<h6>`. Paragraphs are `<p>`. A bulleted list is an **unordered list**, `<ul>`, with one `<li>` (list item) per bullet.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Use one `<h1>` per page for its main title, then `<h2>` for sections and `<h3>` inside those. Choose a heading level for its meaning, not its size; size is CSS's job in Module 2. Every `<li>` must sit inside the `<ul>`.

```html
<h2>Three favorites</h2>
<ul>
  <li>A place I like to walk</li>
  <li>A song I play on repeat</li>
  <li>A food I could eat every week</li>
</ul>
```

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> You will see this exact list rendered in the Exercise.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Without looking, write the opening and closing tags of a list with two items on paper.

### 6. How does a link work?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> A link is an `<a>` (anchor) element. Its `href` attribute holds the address to go to. The text between the tags is what people click.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `href` can be a full URL (`https://developer.mozilla.org/`), a **relative path** to another file in your site (`about.html`), or an anchor on the same page (`#contact`). For a same-page link, give the target element an `id` and put `#` plus that id in the `href`. MDN puts it this way: "Elements with an `id` attribute in the document automatically create a document fragment that can be linked to" (MDN, *Creating links*). An `id` must be unique on its page.

```html
<a href="#contact">Contact</a>
...
<section id="contact">
  <h2>Contact</h2>
</section>
```

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> The Exercise page uses a full URL, and the pages in Concept 8 use relative paths and an anchor.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Predict: what happens if the `href` says `#contacts` but the `id` is `contact`? (The link does nothing, because no element has that id.)

### 7. How does an image work, and what is `alt` for?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> An image is an `<img>` element. It has no closing tag. `src` says which file to show. `alt` describes the picture in words.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> `src` is a path, just like `href`; if the image sits in the same folder as the page, the path is just the file name. `alt` is read aloud by screen readers and is shown when the image cannot load. Write what the picture shows, as you would describe it to someone on the phone.

```html
<img src="image-one.jpg" alt="A hill under a pale blue sky" width="320">
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-alt-text.png" alt="Two copies of the same img element. The first, with the correct src, shows the picture. The second, with src misspelled as imge-one.jpg, shows a small broken-image icon followed by the alt text." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *One wrong letter in `src` and the picture is gone. The `alt` text is what remains, so make it useful. (real: rendered in Chromium)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Write `alt` text for the picture you copied into `practice-01`. Keep it to one short sentence.

### 8. What are semantic elements, and how do pages share navigation?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> **Semantic** means "says what it is." `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>` look like nothing at all on their own, but they tell browsers, search engines and screen readers what each part of the page is for.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> A typical page has a `<header>` with the site name and a `<nav>` of links, one `<main>` with the page's own content split into `<section>`s, and a `<footer>`. A site with several pages repeats the same header, nav and footer on every page. In plain HTML you do that by **copying the same block into each file**. Links between your pages use relative paths: `about.html` means "the file called about.html in the same folder as this page." Because each page has its own copy of the navigation, you must **click every link on every page** after any change. A link to `index.html#contact` goes to another page *and* jumps to a spot on it. That is why the shared nav below uses `index.html#contact`, not just `#contact`: the Contact section exists only on the Home page. On the About page, a plain `#contact` looks for `id="contact"` on the About page, finds nothing, and the page does not move. `index.html#contact` works from both pages.

```html
<header>
  <h1>Practice Site</h1>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="index.html#contact">Contact</a>
  </nav>
</header>
```

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-semantic-outline.png" alt="The practice home page with dashed outlines and labels showing header containing nav, main containing two sections, and footer." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *The same page with each semantic element outlined and labeled. The outlines were added for this picture only; without CSS these elements are invisible. Measured at 800 px wide. (real: rendered in Chromium)*

<img src="../images/m01-about-after-click.png" alt="A browser window showing about.html: the same Practice Site header and links, then an About heading and paragraph." loading="lazy">

*Captured after Chromium clicked the **About** link on the home page. Same header and links, different main content: that is shared navigation. (page real: rendered in Chromium; browser frame drawn)*

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> For a two-page site, write down how many links you must click to test the navigation fully. (Three links × two pages = six clicks.)

### 9. How do you publish your first page?

<img src="../images/brand/marker-introduce.svg" alt="Introduce" width="24" height="24" class="c559-badge"> Your pages live only on your computer. To give them a public address you need three things: a Git history of your folder, a copy of that history on GitHub (a **repository**), and **GitHub Pages**, which serves a repository's HTML as a website.

<img src="../images/brand/marker-explain.svg" alt="Explain" width="24" height="24" class="c559-badge"> Start with the free **GitHub Skills** exercise *Introduction to GitHub*. Its page says it takes "less than one hour," needs no installs, and has the prerequisite "None." It introduces repositories, branches, commits and pull requests, and its four steps are: create a branch, commit a file, open a pull request, merge your pull request. You start it with its **Copy Exercise** button, which makes your own copy of the exercise repository; the page suggests making it public. You will not use branches or pull requests on your own site until Module 12, but seeing the whole cycle once now makes the rest of the course easier to follow.

Then you save your own folder's history with Git, on your computer:

```
git init
git add .
git commit -m "Add my first page"
```

`git init` turns the folder into a repository. `git add .` stages every file in the folder (the `.` means "this folder"). `git commit` saves a snapshot with a message. `git status` and `git log --oneline` show you what Git sees.

<img src="../images/m01-git-first-commit.png" alt="A terminal in my-site running git init, git add ., git status (listing image-one.jpg and index.html as new files), git commit and git log --oneline showing one commit." loading="lazy">

*`git add .` prints nothing when it works; `git status` proves the files are staged; `git log --oneline` shows your first commit; `(HEAD -> main)` marks the newest commit on `main`, the branch you are on (Module 12 explains it). Your commit id (the seven characters) will differ. (real output, rendered; captured on Linux, with the folder path changed to the course folder)*

On Windows, `git add` may also print a warning about line endings (LF and CRLF). It is not an error, and you can carry on. Whether you see it depends on your Git settings.

Then one GitHub CLI command creates the repository on GitHub and uploads your commit:

```
gh repo create my-site --public --source=. --remote=origin --push
```

The GitHub CLI manual describes the flags: `--public` "Make the new repository public"; `--source` "Specify path to local repository to use as source" (`.` is this folder); `--remote` "Specify remote name for the new repository"; `--push` "Push local commits to the new repository." This post cannot show you this command's output, because it needs your own signed-in account. When it works, it prints a few lines that start with ✓: one says the repository was created, one says a remote was added, and the last says your commits were pushed.

Finally, turn on Pages. GitHub Docs (*Configuring a publishing source for your GitHub Pages site*) gives these steps: on your repository, click **Settings**; in the **Code, planning, and automation** section of the sidebar, click **Pages**; under **Build and deployment**, under **Source**, select **Deploy from a branch**; choose the branch **main** and the folder **/ (root)**; click **Save**. A project site's address has the form `https://your-username.github.io/my-site/` (GitHub Docs, *What is GitHub Pages?*). Pages is free for public repositories.

<div role="separator" class="c559-divider"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-1"><img src="../images/brand/divider-window.svg" alt="" class="c559-window"><img src="../images/brand/divider-wall.svg" alt="" class="c559-wall-3"><img src="../images/brand/divider-door.svg" alt="" class="c559-door"></div>

<img src="../images/m01-pages-settings.png" alt="A simplified drawing of the repository Settings page with Pages selected in the sidebar, Source set to Deploy from a branch, Branch set to main and / (root), and a Save button." loading="lazy">

<img src="../images/brand/marker-illustrate.svg" alt="Illustrate" width="24" height="24" class="c559-badge"> *Where the Pages settings live. Labels follow GitHub Docs; the real page has more on it and GitHub changes its layout from time to time.*

Your Pages settings page may look slightly different from this drawing. The names **Settings**, **Pages**, **Deploy from a branch**, **main**, **/ (root)** and **Save** are what matter.

<img src="../images/brand/marker-apply.svg" alt="Apply" width="24" height="24" class="c559-badge"> Before you run anything, write down what each of the four commands above does in five words or fewer.

## Exercise

*Your hands, about 75 minutes (estimate).* Steps 1 to 10 work in `practice-01`. Steps 11 to 16 put a copy of your page in `my-site` and publish it. Type every line. Do not paste. Typing is how you learn where the angle brackets and slashes go.

1. In VS Code, **File → Open Folder…** and choose `practice-01`. Check the Explorer shows your `image-one.jpg`.
2. Create a new file called `index.html`.
3. **Predict.** Before you type the body, sketch on paper what you expect to see: how many headings, how many bullets, one link, one picture.
4. Type the skeleton from Concept 4. Change the `<title>` to `Practice Page`.
5. Inside `<body>`, type an `<h1>`, a `<p>`, and three short parts. Each part is just an `<h2>` and its content, with no `<section>` yet: one `<h2>` with a `<ul>` of three `<li>` items, one with a `<p>` containing a link to `https://developer.mozilla.org/`, and one with your `<img>`, its `alt` text and `width="320"`, as in Concept 7. Without a width, a phone photo shows at its full size, often thousands of pixels wide, and the page scrolls sideways. Choose your own words.
6. **Run.** Save with Ctrl+S. Open `index.html` in Edge or Chrome. Compare with your prediction.

   <img src="../images/m01-exercise-page.png" alt="The practice page with a large heading Things I Like, a paragraph, a bulleted list of three favorites, a part with a link to MDN Web Docs, and a part with a picture." loading="lazy">
   
   *One example of a finished practice page. Yours will have your words and your picture. Measured at 800 px wide. (real: rendered in Chromium)*

7. **Modify.** Add a fourth `<li>`. Save, refresh, and count the bullets. Click the link and use the browser's Back button.
8. **Break it on purpose.** Delete the closing `</h1>` tag. Save and refresh. Before you look, predict what will happen to the paragraph under it.

   <img src="../images/m01-break-h1.png" alt="The same practice page with the closing h1 tag removed: the paragraph under the main heading is now just as large and bold as the heading." loading="lazy">
   
   *With `</h1>` missing, the browser keeps the heading open, so the paragraph becomes part of it. The browser stops the heading when it meets the next `<h2>`, so the rest of the page looks normal. (real: rendered in Chromium)*

   The browser did not show an error. It guessed. HTML mistakes rarely produce a message; they produce a page that looks wrong. Put `</h1>` back, save and refresh.
9. **Break it again.** Change `src="image-one.jpg"` to `src="imge-one.jpg"`. Save and refresh. You should see your `alt` text where the picture was, as in Concept 7. Fix it.
10. **Debug.** Change the link's `href` to `https://developer.mozilla.orgg/` (an extra `g`). Save, refresh and click. Instead of MDN you get the browser's own error page, because no server answers at that host. Which part of the URL was wrong: scheme, host or path? Fix it and click again.

**Publish your first page.** Do the GitHub Skills exercise from Concept 9 first if you have not yet. Then:

11. **Copy your page into `my-site`.** In File Explorer, open your course folder. `my-site` is the folder you made in Module 0, next to `practice-01`; if it is missing, create it. Copy `index.html` and `image-one.jpg` from `practice-01` into `my-site`. Keep the name `index.html`: GitHub Docs says "GitHub Pages will look for an `index.html` file as the entry file for your site" (*Troubleshooting 404 errors for GitHub Pages sites*).
12. **Open `my-site` in VS Code.** **File → Open Folder…** and choose `my-site`. Then **Terminal → New Terminal**. Check the prompt: it must end in `my-site>`. If it ends in `practice-01>` or anything else, open `my-site` again before you type any Git command. If VS Code asks whether you trust this folder, trust it: it is your own.
13. **Make your first commit.** Type these commands one at a time:

    ```
    git init
    git add .
    git commit -m "Add my first page"
    git log --oneline
    ```

    `git log --oneline` should show one commit with your message, as in the picture under Concept 9. If `git commit` says "Please tell me who you are," you skipped part of Module 0: do its step 8 (all three lines). Then type `git status`. If it says `On branch master`, type `git branch -m main`, so your branch has the name GitHub Pages looks for in step 15. Then run the `git commit` line again.
14. **Create the repository and upload.** Type:

    ```
    gh repo create my-site --public --source=. --remote=origin --push
    ```

    Look for the ✓ line that says your commits were pushed. If you get an error instead, run `gh auth status` and check that you are logged in (Module 0, step 9).
15. **Turn on GitHub Pages.** In your browser, open `https://github.com/your-username/my-site` (use your own username). Click **Settings**, then **Pages** in the sidebar. Under **Build and deployment**, under **Source**, choose **Deploy from a branch**. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
16. **Check that it worked.** GitHub Docs says "It can take up to 10 minutes for changes to your site to publish" (*Creating a GitHub Pages site*). Wait a few minutes, refresh the Pages settings page, and click **Visit site**. Or type `https://your-username.github.io/my-site/` into the address bar. You should see your practice page with its picture. Click its MDN link to test it. If you see a "404" page instead, wait a few more minutes and press F5. If the page shows but the picture is missing online, check capital letters: change the `src` in `my-site/index.html` to match the picture's file name exactly, save, and use the routine in the "Save your work" box below. (Do not fix it by renaming the file: on Windows, Git keeps remembering the old name when only capital letters change.) GitHub Docs gives the same warning for the home page: `Index.html` will not work in place of `index.html` (*Troubleshooting 404 errors for GitHub Pages sites*).

> **Save your work: the routine you use from Module 2 on.** Whenever you change a file in `my-site`, put the change online with the same five steps. Work in a terminal whose prompt ends in `my-site>`:
>
> ```
> git status
> git add .
> git commit -m "Say what you changed"
> git push
> ```
>
> `git status` lists the files you changed, for example `modified:   index.html`. `git add .` stages them. `git commit` saves a snapshot with your message. `git push` uploads the new commit to GitHub; the `--push` in step 14 already connected your folder to GitHub, so plain `git push` is enough. The fifth step is to **check the live page**: open your site address and press F5. A change can take a few minutes to appear. Try it once now: change one word in `my-site/index.html`, save, and run the routine.

## Project (in the full packet)

In the Exercise you published your practice page. Your project replaces it with the start of the personal website you will build all course: a **Home** page and an **About** page in `my-site`, each with the full document skeleton, a header with shared navigation, a main area in sections, and a footer, with every link tested on both pages. Then you put the new pages online with the save routine, so anyone with the link can open `https://your-username.github.io/my-site/` and click between your two pages. The full brief, the step-by-step build, and the finishing work in Git are in the Module 1 packet. <a href="https://code559.gumroad.com/l/module-01-html-foundations" target="_blank" rel="noopener">Get the packet →<span class="visually-hidden"> (opens in a new tab)</span></a>

## Common misconception

> *"If the page looks right in my browser, the HTML is correct."*

What would you say? Hint: think about step 8 of the Exercise, where the browser quietly guessed, and about who reads `alt` text.

## Summary

A browser (the client) requests files from a server and draws the HTML it gets back. A URL names the scheme, the host, the path and optionally an anchor inside the page. You work in a loop of edit, save and refresh, and an unsaved file is the most common reason a change does not show. Every page has the same skeleton: doctype, `html` with `lang`, a `head` with charset, viewport and title, and a `body`. Headings give a page its outline, paragraphs hold text, and `ul` with `li` makes a bulleted list. An `a` element's `href` can point to another site, another page by a relative path, or an `id` on the same page. An `img` needs a correct `src` and a useful `alt`. Semantic elements name the parts of a page, and shared navigation is copied onto every page and tested link by link. Git records your folder's history, `gh repo create` puts it on GitHub, and GitHub Pages serves it at a public address. After that, every change goes online with one routine: status, add, commit, push, then check the live page.

## Check your understanding

1. In `https://www.example.com/about.html#contact`, which part is never sent to the server, and what does the browser do with it?
2. You changed your page, refreshed, and nothing changed. Name two things to check, in order.
3. **What would you test** after adding a third page to the Practice Site from Concept 8, so that its nav has four links, and how many clicks does it take?

## Before next module

- [ ] Your practice page has headings, a list, a link and an image, and you broke and fixed it
- [ ] You finished the GitHub Skills *Introduction to GitHub* exercise
- [ ] `git log --oneline` in `my-site` shows at least one commit
- [ ] Your `my-site` repository exists on GitHub and Pages is set to deploy from `main`, `/ (root)`
- [ ] Your first page opens at `https://your-username.github.io/my-site/`, with its picture, and its link works
- [ ] You ran the save routine once: git status → git add . → git commit -m "…" → git push → check the live page

## Go further

- MDN: *What is a URL?*, *What's in the head? Web page metadata*, *Creating links*, and the reference page for `<meta name="viewport">`
- MDN: search "HTML elements reference" for `header`, `nav`, `main`, `section` and `footer`
- GitHub Skills: *Introduction to GitHub* (github.com/skills/introduction-to-github)
- GitHub Docs: *What is GitHub Pages?* and *Configuring a publishing source for your GitHub Pages site*
- GitHub CLI manual: `gh repo create`
- freeCodeCamp: the HTML section of the Responsive Web Design curriculum

## What to keep

Keep your `practice-01` folder, the address of your live page, and a note of the four commands you ran to publish it. Then answer for yourself: **which step would be hardest to repeat without this post, and why?**

---

*Code559 is a 559 Solutions project. Portions adapted from Visual Studio Code documentation (CC BY 3.0 US), GitHub Docs (CC BY 4.0), and GitHub Skills (MIT). Screenshots used with permission from Microsoft.*

*Sources checked 2026-10-09: MDN "What is a URL?"; MDN "What's in the head? Web page metadata"; MDN "`<meta name="viewport">`"; MDN "Creating links"; GitHub Skills "Introduction to GitHub" (github.com/skills/introduction-to-github); GitHub Docs "What is GitHub Pages?"; GitHub Docs "Configuring a publishing source for your GitHub Pages site"; GitHub CLI manual "gh repo create". Checked 2026-10-11: GitHub Docs "Creating a GitHub Pages site"; GitHub Docs "Troubleshooting 404 errors for GitHub Pages sites"; GitHub CLI source code (cli/cli on GitHub: `pkg/cmd/repo/create/create.go` and `git/client.go`, for what `gh repo create --push` prints and does); Apple Support "Manage location metadata in Photos" (Personal Safety User Guide).*
