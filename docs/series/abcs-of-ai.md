# Series plan: The ABCs of AI

A 26-post blog series for The Curious Architect, one post per letter, from beginner (A) to advanced (Z). This file is a plan only; it is not a page and does not ship.

## Decisions

- **Series name:** The ABCs of AI.
- **Generic label:** "AI assistant" for tools such as ChatGPT, Claude, DeepSeek, Perplexity, and Gemini. Avoid "GPT" as a generic word; it is OpenAI's model name. Save "large language model (LLM)" for post L.
- **Category:** AI Without the Hype.
- **Tag:** `ABCs of AI` on every post, so the series can be grouped later.
- **Length:** 600 to 900 words per post (proposed; confirm after post A).
- **Format:** each post follows IEIA, with the four steps as section headings: Introduce, Explain, Illustrate, Apply.
- **Sources:** every fact cites a source in a Sources list. Prefer official documentation (OpenAI, Anthropic, Google, and others) and trusted references. If a fact cannot be verified, write "I cannot confirm this."
- **Personal stories:** none invented. Leave a marked spot where the owner's experience would help.
- **Workflow:** drafts go in `src/content/articles/drafts/` with `draft: true` (see `docs/CONTENT_GUIDE.md`). Post A is drafted first and reviewed; it sets the model for the rest. Later posts follow in letter order, a few at a time.
- **Later, optional:** a series page or "next in the series" links, once several posts are published.

## Beginner (A to I): first steps

| | Topic | Introduce | Explain | Illustrate | Apply |
|---|---|---|---|---|---|
| A | AI assistants, chatbots, and models: the words | People use these words for the same thing | What each word means and how they relate | A chart: AI, then a model, then an assistant | Name the AI tools you already use |
| B | Behind the box: next-word guessing | It is not looking things up like a search engine | It predicts likely next words, one at a time | A sentence built word by word | Ask one question twice; compare the answers |
| C | Chat: your first conversation | Opening a chat can feel awkward | Back-and-forth beats one big question | The same request, refined in three turns | Hold one short chat about a real task |
| D | Drafting: your first useful job | A first draft is the easiest win | AI gives a starting point; you edit | A rough email beside the edited version | Draft one routine email with AI |
| E | Errors: confidently wrong | AI can sound sure and be wrong | Why made-up answers ("hallucinations") happen | A made-up citation beside the real one | Check one claim from an AI answer |
| F | Facts: checking what AI tells you | Trust, but check | Where to verify; which claims to check first | A checklist applied to a sample answer | Use a three-question fact check |
| G | Guardrails: what not to paste | Some information stays out of chats | Privacy settings, sensitive data, work rules | A safe and not-safe list | Write your own "never paste" list |
| H | How an AI model learns | Where its knowledge comes from | Training, in plain words | A diagram: data, then training, then model, then answer | Explain it to a friend in two sentences |
| I | Instructions: a clear request | Vague in, vague out | Goal, context, and format | A weak prompt beside a strong one | Rewrite one prompt you have used |

## Intermediate (J to R): real work

| | Topic | Introduce | Explain | Illustrate | Apply |
|---|---|---|---|---|---|
| J | Jobs to hand off | Not every task suits AI | Repetitive, low-risk, easy to check | A sort into "hand off," "assist," and "keep" | List three tasks you can hand off |
| K | Knowledge cutoff | AI may not know recent events | What a training cutoff is | A recent-event question, with and without web search | Check whether your tool can search the web |
| L | Large language models: what "large" means | "LLM" is the term underneath | Size, parameters, and why scale matters | A small and a large model on the same task | Find which model your tool uses |
| M | Memory and context | Long chats drift | Context windows and chat memory | A long chat going off track | Start a fresh chat with a short summary |
| N | Nuance: tone and voice | AI writing can sound generic | Steering tone with examples | One paragraph in three tones | Write a short style note for your voice |
| O | Output formats | Ask for the shape you need | Tables, lists, outlines, templates | The same content as prose and as a table | Ask for a table from your own notes |
| P | Prompt patterns | A few patterns cover most needs | Roles, examples, steps, limits | Four patterns side by side | Save three patterns you will reuse |
| Q | Quality checks | AI work still needs review | What a reviewer looks for | A marked-up AI draft | Make a five-point review checklist |
| R | Retrieval: your own documents | AI works better with your sources | Uploads and retrieval (RAG) in plain words | Answers with and without a source document | Ask a question about one of your files |

## Advanced (S to Z): systems

| | Topic | Introduce | Explain | Illustrate | Apply |
|---|---|---|---|---|---|
| S | System prompts and custom assistants | Set the rules once, reuse them | System prompts, custom assistants, projects | A setup for one repeated task | Build one custom assistant |
| T | Tokens and cost | Usage is measured, and limits are real | What tokens are; how they affect price and length | A paragraph split into tokens | Estimate the cost of one workflow |
| U | Unfair answers: bias | Models carry patterns from their data | Where bias comes from and how to spot it | A side-by-side bias test | Test one prompt for bias |
| V | Vision and voice | AI can read images and hear speech | Multimodal input and output | A receipt photo turned into a table | Try one image task |
| W | Workflows and automation | From single chats to repeatable steps | Connecting AI to forms, email, and sheets | A floor-plan diagram of a three-step flow | Sketch one workflow on paper |
| X | X-ray: testing AI output | Test, don't trust a gut feel | Evaluations, test sets, scoring | Ten test questions with scored answers | Build a 10-question test for your use |
| Y | Your team's AI policy | Teams need shared rules | Use, data, review, ownership | A one-page sample policy | Draft your team's first policy |
| Z | Zero-shot to fine-tuning | How far to customize | Zero-shot and few-shot prompting, retrieval, fine-tuning | A ladder from least to most effort | Pick the right rung for one project |

## Facts that need sources

These posts carry claims that change over time or vary by product. Cite each one when drafting, with the date checked:

- K: knowledge cutoffs and web search features.
- G: privacy and data-use settings for each tool.
- L, M: model sizes and context window sizes.
- S: custom assistant features (OpenAI calls theirs "GPTs").
- T: token counting and pricing.
- Z: fine-tuning availability.
