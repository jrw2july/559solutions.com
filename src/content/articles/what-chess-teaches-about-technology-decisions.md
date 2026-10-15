---
title: "What Chess Teaches About Technology Decisions"
slug: "what-chess-teaches-about-technology-decisions"
summary: "Chess players learn to judge the whole position before reaching for one attractive move. Technology decisions benefit from the same habit."
publicationDate: "2026-10-13"
updatedDate: "2026-10-13"
author: "Joel Wells"
category: "Architect's Notebook"
tags: ["chess", "strategy", "decision-making"]
imageAlt: ""
draft: false
featured: false
seoTitle: "What Chess Teaches About Technology Decisions | 559 Solutions"
seoDescription: "Position, trade-offs, tempo, reversible moves, and reviewing the whole board: five chess habits that make technology decisions better."
relatedArticles: ["start-with-the-decision-not-the-ai-tool", "what-architects-should-document"]
---

Every chess player knows the feeling. You spot a move that wins a piece. It looks wonderful. You play it quickly, and three moves later you discover why your opponent left that piece hanging.

Technology decisions have the same trap. A new platform, a clever shortcut, or an impressive demo can look like a winning move. The question chess teaches you to ask is not "Is this move good?" It is "Is this move good in this position?"

Here are five habits from the board that carry over well.

## 1. Evaluate the position before choosing a move

Strong players do not start by looking for moves. They start by looking at the position. Where are my weaknesses? What is my opponent threatening? Which pieces are doing nothing?

The technology version:

- What are we actually trying to protect or improve?
- Where are we fragile today: a system nobody understands, a key person, a vendor contract that ends soon?
- Which tools and skills do we already have that are underused?

A move that looks brilliant in general can be a mistake in your position. A team with no one who can maintain a new language should think hard before adopting it, however good the language is.

## 2. Weigh short-term gain against long-term weakness

In chess, you can often grab material now at the cost of a weakness later: a pawn that can no longer be defended, a king left exposed. Sometimes the trade is worth it. The skill is in seeing both sides before you commit.

Technology has its own version of the weakened pawn:

- A quick integration built around one vendor's special features, which makes leaving that vendor expensive.
- A workaround that ships the feature this week and becomes the thing nobody dares to touch next year.
- A tool that saves one team time by pushing extra work onto another team.

None of these is automatically wrong. The mistake is making the trade without noticing it. Before committing, write down what the move costs later, not just what it wins now.

## 3. Respect tempo, sequencing, and readiness

Chess players talk about tempo: the value of a move made at the right time. The same move can be strong one turn and pointless the next. Order matters too. Developing your pieces before you attack is usually better than attacking with half an army.

In technology work, sequencing often decides the outcome:

- Cleaning up the data before adding analytics on top of it.
- Training the people before switching off the old system.
- Fixing the deployment process before increasing how often you deploy.

Ask of any plan: what has to be true before this step can succeed? If the answer is "something we have not done yet," do that first. A good move made too early can be worse than no move at all.

## 4. Keep your options open where you can

Some chess moves cannot be taken back in any sense. A pawn only moves forward. Once it advances, the squares behind it are no longer protected by it. Experienced players treat pawn moves with extra care for that reason.

Business decisions vary the same way. In his 2015 letter to shareholders, Jeff Bezos described some decisions as "consequential and irreversible or nearly irreversible – one-way doors," and argued that most decisions are not like that. Those are changeable, reversible "two-way doors," and he wrote that they can be made quickly by people with good judgment. He also warned that large organizations tend to treat reversible decisions with the slow, heavy process meant for irreversible ones.

That distinction is useful in technology:

- **Easy to reverse:** trying a tool on one team, a feature behind a switch, a short contract. Decide quickly, learn, adjust.
- **Hard to reverse:** migrating your core data, signing a long contract, retiring the old system. Slow down, gather evidence, and get more eyes on it.

Where you can, turn a hard-to-reverse decision into a series of easier ones. Pilot before you migrate. Keep the old system readable until the new one has proved itself.

## 5. Review the whole board after each change

After every move, the position changes for both players. A good player looks at the whole board again, not just the square where the last piece landed.

After a technology change, look beyond the system you touched:

- Did a report somewhere else stop matching?
- Did support calls go up?
- Did another team have to change how they work?
- Did one of the assumptions behind the decision turn out to be wrong?

A short review a few weeks after a change catches what nobody predicted. It also builds the team's judgment for the next decision, the way reviewing your games improves your play.

## The habit behind all five

Chess rewards patience at the moment of temptation. The attractive move is often a good one. The habit that matters is pausing long enough to see the whole position first.

Before the next technology decision, try one chess question:

> If I make this move, what will the position look like three moves from now?

<details class="article-fold">
<summary><h4>Sources</h4></summary>

- Jeff Bezos, [2015 Letter to Shareholders](https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm), Amazon.com, Inc. (filed with the U.S. Securities and Exchange Commission, 2016).

</details>
