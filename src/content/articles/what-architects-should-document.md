---
title: "What Architects Should Document but Usually Do Not"
slug: "what-architects-should-document"
summary: "The details that help future teams most are rarely the diagrams. They are the decision, its assumptions, the options set aside, who runs it, and when to look again."
publicationDate: "2026-10-13"
updatedDate: "2026-10-13"
author: "Joel Wells"
category: "Builder Notes"
tags: ["architecture", "documentation", "decision logs"]
imageAlt: ""
draft: false
featured: false
seoTitle: "What Architects Should Document | 559 Solutions"
seoDescription: "Document the decision and when it became necessary, the assumptions, the alternatives, ownership and failure handling, and the trigger for revisiting it."
relatedResourceCta:
  label: "See the AI-Era Solution Architect Starter Kit"
  href: "/resources/solution-architect-starter-kit/"
relatedArticles: ["the-simplest-useful-architecture-diagram", "start-with-the-decision-not-the-ai-tool"]
---

Most architecture documentation describes what was built. That is useful, but the system itself can often tell you that. Read the code, inspect the configuration, look at the running services.

What the system cannot tell you is why.

Why this database and not the other one? Why does this job run at 2 a.m.? Why is there a second copy of the customer table? When the reasons are lost, the next team has two bad choices: leave everything alone out of fear, or change it and rediscover the original problem the hard way.

In 2011, Michael Nygard made this point in a short post that introduced what are now called architecture decision records. His argument was that without the motivation behind a decision, a newcomer can only accept it blindly or reverse it blindly, and both are risky.

Here is what is worth writing down.

## The decision, and the date it became necessary

Start with the decision in one or two plain sentences. "We will send order updates through a message queue instead of calling the warehouse system directly."

Then add when, and what prompted it. "In March, the warehouse system's outages started stopping checkout. We needed orders to keep flowing while it was down."

The prompt matters as much as the decision. A future reader who knows the problem can judge whether it still exists.

## Assumptions that could change the answer

Every decision rests on things the team believed at the time:

- "Order volume will stay under a few thousand a day."
- "The vendor will keep supporting this version through next year."
- "Only the operations team needs to read this data."

Write them down, especially the ones that feel too obvious to mention. Obvious assumptions are the ones nobody checks later. When one of them stops being true, the decision may need another look, and a written list is how anyone will notice.

## Alternatives considered, and why they were set aside

Name the options that lost, with one or two sentences each:

- "Call the warehouse directly with retries. Set aside because checkout would still wait on the warehouse."
- "Nightly batch file. Set aside because the warehouse needs orders within minutes."

This saves real time. Without it, someone new will suggest the same alternatives, and the team will spend a week re-arguing a settled question. With it, the conversation starts from what has changed since, which is the useful question.

It also shows honest trade-offs. Every option had costs, including the chosen one. Nygard's format asks for the consequences, positive, negative, and neutral. Writing the negatives down is not an admission of failure. It is a warning label for the next person.

## Ownership, operating constraints, and failure handling

Designs are usually documented. Operations often are not. Add:

- **Owner.** Which team runs this, and who decides on changes.
- **Operating constraints.** Limits that shape how it can be used: "Messages older than seven days are deleted." "The queue is shared with the returns process."
- **Failure handling.** What happens when it breaks, and what someone should do. "If the queue backs up, orders still save; the warehouse catches up when it recovers. Alert goes to the operations channel."

This is the part the person on call at night needs, and the part most likely to live only in someone's memory.

## The trigger for revisiting the decision

Finally, write down what would make the decision worth looking at again:

- "If daily orders pass ten thousand."
- "If the warehouse system is replaced."
- "At the vendor contract renewal."

A trigger turns documentation from a record of the past into a tool for the future. Instead of reviewing every decision on a schedule, the team reviews the ones whose conditions have changed.

## Keep it short and close to the work

None of this needs a long document. One page per decision is plenty, and half a page is often enough. A common practice is to store these records alongside the code or configuration they describe, numbered in order, so they are easy to find and change with the system. When a decision is replaced, mark the old record as superseded and link to the new one rather than deleting it. The history is part of the value.

A simple template:

1. **Title** and **date**
2. **Context:** what prompted the decision
3. **Decision**
4. **Assumptions**
5. **Alternatives set aside**, with reasons
6. **Consequences:** good, bad, and neutral
7. **Owner, constraints, and failure handling**
8. **Revisit when**

Future teams rarely need more pages. They need the reasons.

<details class="article-fold">
<summary><h4>Sources</h4></summary>

- Michael Nygard, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), November 15, 2011.
- Martin Fowler, [Architecture Decision Record](https://www.martinfowler.com/bliki/ArchitectureDecisionRecord.html).

</details>
