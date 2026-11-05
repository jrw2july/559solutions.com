// IEIA lesson data for The Curious Architect (Introduce, Explain, Illustrate, Apply).
// Articles stay plain Markdown. Each article's exercise lives here, keyed by the article slug,
// and src/components/ieia/ draws it. Reader answers never leave the browser.

export type IeiaStep = "Introduce" | "Explain" | "Illustrate" | "Apply";

/** A pre-question shown before the explanation. The answer sits inside a closed <details>. */
export type QuestionWorthAskingData = {
  question: string;
  /** Answer paragraphs, revealed when the reader opens the question. */
  answer: string[];
  /** Label for the optional guess box. */
  guessLabel?: string;
};

/** One labeled text box in a "Use it at work" worksheet. */
export type WorksheetField = {
  id: string;
  label: string;
  hint?: string;
  /** Optional comparison grid shown instead of the text box: one column per tool, one row per check. */
  grid?: WorksheetGrid;
};

/**
 * A small comparison grid inside a worksheet: a real <table> with a labeled text box in every cell.
 * The first row holds the tool names; each later row is one check, such as "Result on our test".
 */
export type WorksheetGrid = {
  /** Number of tool columns (2 or 3 fit on a phone). */
  tools: number;
  rows: { id: string; label: string }[];
};

export type WorksheetData = {
  kind: "worksheet";
  /** Unique on the page; used for element ids and the "Save on this device" key. */
  id: string;
  title: string;
  intro?: string;
  fields: WorksheetField[];
  /** Show a number before each question (1., 2., ...) on the page, in Copy and in Print. */
  numbered?: boolean;
  /** "headings": Copy writes each question as a Markdown heading. Default: each question in bold. */
  copyFormat?: "headings";
};

/** One choice in a "Make the call" question. */
export type CallChoice = {
  id: string;
  label: string;
  correct: boolean;
  /** Why this choice is right or wrong. Shown as text, never as color alone. */
  feedback: string;
};

export type MakeTheCallData = {
  kind: "call";
  id: string;
  title: string;
  /** Short scenario shown above the choices. */
  scenario?: string;
  legend: string;
  choices: CallChoice[];
};

/** A checkbox self-check. It lists what the reader ticked and the next step; it never shows a score. */
export type SelfCheckData = {
  kind: "selfcheck";
  id: string;
  title: string;
  legend: string;
  signals: { id: string; label: string }[];
  /** Label for an optional one-line box naming the piece of work. */
  workLabel: string;
  /** Guidance shown under the boxes, with or without JavaScript. */
  guidance: string;
  nextStep: { heading: string; text: string; questions: string[] };
};

/** A short scenario played as "Make the call" steps in order. Every step and reason is readable without JavaScript. */
export type ScenarioStepsData = {
  kind: "scenario";
  id: string;
  title: string;
  intro: string;
  steps: MakeTheCallData[];
};

export type ApplyData = WorksheetData | MakeTheCallData | SelfCheckData | ScenarioStepsData;

export type GoDeeperQuestion = {
  question: string;
  /** Optional model answer, inside its own <details>. */
  answer?: string;
};

export type GoDeeperData = {
  summary?: string;
  questions: GoDeeperQuestion[];
};

/**
 * A labeled diagram (SVG) that maps one idea across rows, three steps per row: for example, the same
 * trade "on the board" and "in your systems". Each cell is given as lines of text. The third column is
 * drawn with a dashed border and its header says what it is, so nothing depends on color.
 */
export type TradeDiagramData = {
  title: string;
  description: string;
  caption: string;
  columns: [string, string, string];
  rows: { label: string; cells: [string[], string[], string[]] }[];
};

/**
 * A system context diagram (SVG): the question at the top, our system in the middle inside a dashed
 * boundary, people on one side, other systems on the other, and labeled flows. Direction "in" means the
 * flow goes toward our system. Every box names an owner, as the article recommends.
 */
export type ContextDiagramData = {
  title: string;
  description: string;
  caption: string;
  /** The question, as one line for the wide layout and as wrapped lines for the stacked layout. */
  question: string;
  questionLines: string[];
  boundaryLabel: string;
  ours: { name: string[]; owner: string };
  people: { name: string; flow: string; direction: "in" | "out" }[];
  systems: { name: string; owner: string; flow: string; direction: "in" | "out" }[];
};

/** A short, clearly made-up scenario shown at the start of a lesson. */
export type ScenarioData = {
  label: string;
  text: string;
};

/** A worked example: labeled rows in a <figure>, with a caption. */
export type WorkedExampleData = {
  heading: string;
  /** One connecting sentence before the figure. */
  lead?: string;
  rows: { label: string; value: string }[];
  caption: string;
};

/**
 * One article's lesson. Each part is placed where its marker sits in the article Markdown:
 * <!-- ieia:introduce -->, <!-- ieia:explain -->, <!-- ieia:illustrate -->, <!-- ieia:apply -->.
 * The build fails if a part has no marker or a marker has no part (src/components/ieia/ArticleBody.astro).
 */
export type Exercise = {
  scenario?: ScenarioData;
  introduce?: QuestionWorthAskingData;
  /** true: show the "Explain" label at the <!-- ieia:explain --> marker. */
  explain?: boolean;
  illustrate?: WorkedExampleData;
  /** Optional diagram shown first in the Illustrate step. */
  diagram?: TradeDiagramData;
  contextDiagram?: ContextDiagramData;
  apply?: ApplyData;
  /** One connecting sentence before the Apply worksheet. */
  applyLead?: string;
  goDeeper?: GoDeeperData;
};

/** The owner's five standing questions, for Go Deeper blocks. */
export const standingQuestions = [
  "Why does it work?",
  "What value does this hold?",
  "What happens if this changes?",
  "What causes this to run?",
  "What would you test?",
] as const;

/** Exercises for published articles, keyed by article slug. Added article by article in later steps. */
export const exercises: Record<string, Exercise> = {
  // Architect's Notebook articles (2026-11-05). New text approved by the owner. Worked examples use each
  // article's own examples; anything inferred or made up is labeled so in the caption or scenario.
  "what-chess-teaches-about-technology-decisions": {
    introduce: {
      question: "A move wins a piece for free. What should you suspect?",
      answer: [
        "Why it was left hanging. In technology, a shortcut that looks free usually costs something later, a weakness you did not notice when you made the trade.",
      ],
    },
    explain: true,
    diagram: {
      title: "The same trade on the board and in your systems",
      description:
        "Two rows with three steps each. On the board: take the piece left hanging, which puts you one piece ahead, and later leaves a pawn that cannot be defended or an exposed king. In your systems: build on one vendor's special features, which ships the feature this week, and later makes leaving that vendor expensive.",
      caption: "The same trade in two settings: a gain now that leaves a weakness later. Dashed boxes mark the weakness that comes later.",
      columns: ["The tempting move", "What it wins now", "The weakness later"],
      rows: [
        {
          label: "On the board",
          cells: [["Take the piece", "left hanging"], ["One piece ahead"], ["A pawn that cannot", "be defended, or", "an exposed king"]],
        },
        {
          label: "In your systems",
          cells: [["Build on one vendor's", "special features"], ["The feature ships", "this week"], ["Leaving that vendor", "becomes expensive"]],
        },
      ],
    },
    illustrate: {
      heading: "The trade, written down",
      lead: "Here is the vendor example from this article, written down before anyone commits.",
      rows: [
        { label: "The move", value: "A quick integration built around one vendor's special features." },
        { label: "Wins now", value: "The feature ships this week." },
        { label: "Costs later", value: "Leaving that vendor becomes expensive." },
        { label: "Easy or hard to reverse", value: "Hard. It is closer to a one-way door." },
      ],
      caption: "Before committing, write down what the move costs later, not just what it wins now.",
    },
    apply: {
      kind: "call",
      id: "chess-call",
      title: "Make the call",
      scenario:
        "A made-up example: your team can ship a reporting feature this week by building on one vendor's special export format, or take longer and build a plain export any tool can read. The vendor contract ends soon.",
      legend: "What should the team do?",
      choices: [
        {
          id: "ship-now",
          label: "Ship the shortcut now and deal with it later.",
          correct: false,
          feedback: "That makes the trade without noticing it. When the contract ends, leaving the vendor is expensive.",
        },
        {
          id: "always-plain",
          label: "Always take the slower, plain export.",
          correct: false,
          feedback: "It may be the right move, but a rule skips the position. The question is whether the move is good in this position.",
        },
        {
          id: "write-it-down",
          label: "Write down what the shortcut costs later and how hard it is to reverse, then decide.",
          correct: true,
          feedback: "None of these choices is automatically wrong. The mistake is making the trade without noticing it.",
        },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "science-fiction-and-architecture-of-consequences": {
    introduce: {
      question: "What happens after a technology works?",
      answer: [
        "People and other systems adjust to it. Those second-order effects are the hard part to predict: the automobile was easy to imagine, the traffic jam was not.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "One consequence chain, worked through",
      lead: "Here is the automated approval from this article, taken through the chain.",
      rows: [
        { label: "The change", value: "Approvals are automated." },
        { label: "First-order benefit", value: "Requests move faster." },
        {
          label: "Second-order effect",
          value: "Reviewers spend less time on each one, and errors that a slower process caught now slip through.",
        },
        {
          label: "Who carries the cost",
          value: "Customers who get a wrong approval, and whoever has to fix it. They were probably not in the room.",
        },
        { label: "What gets easy or difficult", value: "Approving gets easy. Questioning a request gets harder." },
        {
          label: "What we would test first",
          value: "Check a sample of approved requests each week for the errors the old process caught.",
        },
      ],
      caption:
        "The first three rows come from this article. The last three are a worked guess, the kind a consequences session would produce.",
    },
    applyLead: "Now take a change you are planning through the same chain. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "consequence-chain",
      title: "Consequence chain",
      fields: [
        { id: "change", label: "The change", hint: "Fast forward: it works exactly as planned." },
        { id: "first-order", label: "First-order benefit" },
        { id: "second-order", label: "Second-order effect", hint: "Ask \"and then what?\" more than once." },
        { id: "who-carries", label: "Who carries the cost (and were they asked?)" },
        { id: "easy-hard", label: "What the system makes easy or difficult", hint: "One behavior that will increase, one that will fade." },
        { id: "test-first", label: "What we would test first", hint: "Include the day it stops: what would people no longer know how to do?" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  // Process articles (2026-11-05). New text approved by the owner; worked examples reuse each article's
  // own examples, and anything made up is labeled as made up. Go Deeper holds the owner's five standing
  // questions, closed by default; model answers can be added later as `answer`.
  "how-to-run-a-better-discovery-meeting": {
    introduce: {
      question: "Which question most often derails discovery?",
      answer: [
        "Often it is the request itself, when it arrives as a solution, such as \"We need a dashboard.\" The meeting debates the fix before anyone walks through the current work.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "The agenda, filled in",
      lead: "Here is the intake meeting from the examples above, run with the simple agenda.",
      rows: [
        { label: "The decision", value: "Whether to replace the intake spreadsheet, and with what kind of tool." },
        { label: "Scope", value: "In: new client intake, from first contact to the first scheduled call. Out: billing and contract terms." },
        { label: "Current work", value: "Walk through the last new client, step by step." },
        { label: "We believe", value: "Most clients come in through the web form." },
        { label: "We disagree about", value: "Follow-up. Sales says it happens in a day. Operations says three." },
        { label: "Action", value: "Maria pulls last month's intake numbers by Friday." },
        { label: "Open question", value: "Do we need to keep intake records for a set number of years? Dev checks with the accountant." },
        { label: "Next smallest decision", value: "Map the current intake steps on one page before looking at any tools." },
      ],
      caption: "The intake meeting from this article's examples. Someone who missed it could read this and know what was decided.",
    },
    applyLead: "Fill this in before or during your next discovery meeting. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "discovery-worksheet",
      title: "Discovery worksheet",
      fields: [
        { id: "decision", label: "Decision this meeting serves", hint: "One sentence." },
        { id: "scope", label: "Scope (in and out)" },
        { id: "current-work", label: "Current work to ask about", hint: "Ask for the last time it happened." },
        { id: "assumptions", label: "Assumptions and disagreements", hint: "We believe... We disagree about..." },
        { id: "owners", label: "Owners", hint: "One owner and a date for each action." },
        { id: "questions", label: "Unanswered questions", hint: "Each with someone who will find the answer." },
        { id: "next", label: "Next smallest decision" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "when-a-process-depends-on-one-person": {
    introduce: {
      question: "When a second person first tries to run the process, what trips them up?",
      answer: [
        "Usually not the list of steps. They stumble on the triggers, decisions, exceptions, and handoffs that were never written down.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "One process, before and after capture",
      lead: "A made-up example, built on the winter vendor order from the opening.",
      rows: [
        {
          label: "Before",
          value: "Only the owner places the order. The trigger is \"I just know it's about time.\" The supplier choice lives in the owner's head.",
        },
        { label: "After: trigger", value: "A date on the shared calendar." },
        { label: "After: decision", value: "Notes on what the owner compares: price and delivery time." },
        { label: "After: exception", value: "What to do when the usual supplier is out of stock." },
        { label: "After: handoff", value: "Who confirms delivery, and tells the owner it is done." },
      ],
      caption: "The same order, captured so a second person could place it.",
    },
    apply: {
      kind: "selfcheck",
      id: "dependency-check",
      title: "One-person dependency self-check",
      workLabel: "The piece of work you have in mind",
      legend: "Which of these have you seen around that work?",
      signals: [
        { id: "waits", label: "Work waits for one person. Tasks pile up when they are out, even simple ones." },
        { id: "a-name", label: "The answer to \"how do we do this?\" is a name." },
        { id: "vacations", label: "Vacations are planned around the work." },
        { id: "mistakes", label: "Mistakes happen when someone else tries." },
        { id: "access", label: "Nobody else has the access: logins, keys, vendor contacts, or approvals." },
      ],
      guidance: "One or two of these is normal. Several of them, around the same piece of work, is a single point of failure.",
      nextStep: {
        heading: "Next step: improve the smallest risky handoff first.",
        text: "Ask two questions about the work:",
        questions: [
          "If this were missed or done wrong, how bad would it be?",
          "How much effort would it take to make it runnable by someone else?",
        ],
      },
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "why-good-processes-fail": {
    introduce: {
      question: "What happens on the day the expert is out?",
      answer: [
        "The process often stops. The document describes the steps, but not the exceptions and judgment the expert carries.",
      ],
    },
    explain: true,
    apply: {
      kind: "scenario",
      id: "rehearse-absence",
      title: "Try it: the week the approver is out",
      intro:
        "A made-up example: the person who usually approves refund requests is out this week. The backup has only read the process document.",
      steps: [
        {
          kind: "call",
          id: "absence-step-1",
          title: "Step 1",
          scenario:
            "Step 1. A request comes from a customer on an old contract with different terms. The document does not mention old contracts.",
          legend: "What should the backup do first?",
          choices: [
            {
              id: "approve",
              label: "Follow the normal path and approve it.",
              correct: false,
              feedback: "The old terms may not match the normal path, so the approval could be wrong.",
            },
            {
              id: "wait",
              label: "Wait until the approver is back.",
              correct: false,
              feedback: "Waiting is how a small exception becomes a late payment or an unhappy customer.",
            },
            {
              id: "escalate",
              label: "Use the escalation path and ask whoever is named to decide.",
              correct: true,
              feedback: "This is why ownership and escalation are written down.",
            },
          ],
        },
        {
          kind: "call",
          id: "absence-step-2",
          title: "Step 2",
          scenario: "Step 2. The backup finds that no escalation path is written down.",
          legend: "After the week, what should the team change first?",
          choices: [
            {
              id: "rewrite",
              label: "Rewrite the whole process document.",
              correct: false,
              feedback: "A big rewrite that is filed away treats documentation as a record, not an operating tool.",
            },
            {
              id: "add-case",
              label: "Add the old-contract case, name the escalation path, and rehearse absence again.",
              correct: true,
              feedback: "Update it every time something new happens, and rehearse absence again to find the next gap.",
            },
            {
              id: "no-leave",
              label: "Ask the approver not to take time off at busy times.",
              correct: false,
              feedback: "That hides the gap instead of closing it.",
            },
          ],
        },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  // Pilot lesson (2026-11-05). The scenario, answer and worked brief are new text approved by the owner;
  // the worked brief uses the article's own sample decision. No numbers are invented.
  "start-with-the-decision-not-the-ai-tool": {
    scenario: {
      label: "A made-up example",
      text: "A five-person accounting office has a free trial of an AI tool that reads invoices. The trial ends Friday. The owner wants to know whether to buy it.",
    },
    introduce: {
      question: "What fails first when a team starts with the product?",
      answer: [
        "The goal drifts toward the tool. The pilot measures what the product does well, not what the business needs. Ownership and the exit point stay vague too.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "A worked decision brief",
      lead: "Here is the accounting office's trial, written as a decision brief before anyone compares tools.",
      rows: [
        { label: "The decision", value: "Is this invoice ready to pay, or does it need review?" },
        { label: "Who owns it", value: "The office manager." },
        { label: "Evidence a good decision uses", value: "The purchase order, the vendor record, and past invoices from that vendor." },
        {
          label: "Where human judgment stays visible",
          value: "The office manager approves every invoice the tool marks ready, and sees the purchase order beside it.",
        },
        { label: "Smallest useful experiment", value: "Run the tool on last quarter's paid invoices, where the right answer is known." },
        { label: "How we'll know it worked", value: "Fewer invoices sent back for rework than in the same period before." },
      ],
      caption: "A decision brief for the made-up accounting office. It fits on one page, so the office is ready to look at tools.",
    },
    applyLead: "Now write the brief for a decision in your own work. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "decision-brief",
      title: "Build your decision brief",
      fields: [
        { id: "decision", label: "The decision", hint: "One sentence. A choice someone makes again and again." },
        { id: "owner", label: "Who owns it", hint: "One named role, not \"the team.\"" },
        { id: "evidence", label: "Evidence that would change our mind" },
        { id: "human", label: "Where human judgment stays visible", hint: "Where a person approves, changes, or rejects the output." },
        { id: "experiment", label: "Smallest useful experiment", hint: "Past cases where you already know the right answer are the safest start." },
        { id: "measure", label: "How we'll know it worked" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  // The remaining four articles (2026-11-05). New text approved by the owner; worked examples reuse each
  // article's own examples, and anything made up or inferred is labeled so.
  "the-simplest-useful-architecture-diagram": {
    introduce: {
      question: "What question must this diagram answer?",
      answer: [
        "One question, written at the top, for one named audience. If you have three questions, you may need three simple diagrams.",
      ],
    },
    explain: true,
    contextDiagram: {
      title: "A system context diagram built with this article's recipe",
      description:
        "The question at the top reads: where does customer information go after someone fills in the form? In the middle, inside a dashed boundary labeled what we own, is our system, the order form and order list, owned by the Ops team. On the left are two people: a customer, who sends order details to our system, and staff, who receive the order list from it. On the right are three other systems: a payment provider owned by a vendor, which receives payment from us; an email service owned by a vendor, which receives the confirmation email from us; and a reporting tool owned by another team, which receives a nightly customer export from us.",
      caption:
        "A made-up example built only from this article's lists: one question, people on one side, other systems on the other, labeled flows, a boundary, and an owner in every box.",
      question: "Where does customer information go after someone fills in the form?",
      questionLines: ["Where does customer information go", "after someone fills in the form?"],
      boundaryLabel: "What we own",
      ours: { name: ["Order form and", "order list"], owner: "Ops team" },
      people: [
        { name: "Customer", flow: "order details", direction: "in" },
        { name: "Staff", flow: "order list", direction: "out" },
      ],
      systems: [
        { name: "Payment provider", owner: "Vendor", flow: "payment", direction: "out" },
        { name: "Email service", owner: "Vendor", flow: "confirmation email", direction: "out" },
        { name: "Reporting tool", owner: "Another team", flow: "nightly customer export", direction: "out" },
      ],
    },
    illustrate: {
      heading: "The recipe, drawn once",
      lead: "Here is the recipe below applied to one made-up system, using only the examples from this article.",
      rows: [
        { label: "The question", value: "Where does customer information go after someone fills in the form?" },
        { label: "The audience", value: "The staff who handle orders, and the person deciding whether to replace the form." },
        { label: "What was removed", value: "Server names, the database engine, and the version of the form plugin. None changes the answer." },
      ],
      caption: "The three decisions that shaped the drawing above.",
    },
    applyLead: "Now plan a diagram for a system you work with. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "diagram-worksheet",
      title: "Diagram question worksheet",
      fields: [
        { id: "question", label: "The question", hint: "One question this diagram must answer." },
        { id: "audience", label: "The audience", hint: "Who needs the answer, and what will they decide with it?" },
        { id: "people", label: "People, by role" },
        { id: "systems", label: "Systems", hint: "Yours in the middle. The others it talks to around it." },
        { id: "flows", label: "Information flows", hint: "Each arrow labeled with what moves and why." },
        { id: "boundary", label: "Boundary and owners", hint: "What you own, and a name for every box." },
        { id: "remove", label: "Detail to remove", hint: "If I removed this, would the reader make a different decision?" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "what-architects-should-document": {
    introduce: {
      question: "Which field do teams skip most?",
      answer: [
        "The reasons: the alternatives set aside and the assumptions that felt too obvious to write down. The system can show what was built. Only a record can say why.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "A completed record",
      lead: "Here is this article's warehouse example written into every field of the template below.",
      rows: [
        { label: "Title and date", value: "Send order updates through a message queue. March." },
        { label: "Context", value: "The warehouse system's outages started stopping checkout. Orders needed to keep flowing while it was down." },
        { label: "Decision", value: "Send order updates through a message queue instead of calling the warehouse system directly." },
        { label: "Assumptions", value: "Order volume stays under a few thousand a day. The vendor keeps supporting this version through next year." },
        {
          label: "Alternatives set aside",
          value: "Call the warehouse directly with retries: checkout would still wait on the warehouse. Nightly batch file: the warehouse needs orders within minutes.",
        },
        {
          label: "Consequences",
          value: "Good: checkout keeps working during warehouse outages. Bad: one more system to run. Neutral: the queue is shared with the returns process.",
        },
        {
          label: "Owner, constraints, failure handling",
          value: "Owner: the operations team. Messages older than seven days are deleted. If the queue backs up, orders still save; the warehouse catches up when it recovers. Alert goes to the operations channel.",
        },
        { label: "Revisit when", value: "Daily orders pass ten thousand, the warehouse system is replaced, or the vendor contract comes up for renewal." },
      ],
      caption:
        "Everything here comes from this article's examples, except the owner, which is inferred from the alert going to the operations channel, and the \"bad\" consequence, which is a reasonable guess.",
    },
    applyLead: "Now write the record for a decision your team has already made. Copy gives you Markdown to store beside the code.",
    apply: {
      kind: "worksheet",
      id: "decision-record",
      title: "Decision-record builder",
      fields: [
        { id: "title", label: "Title and date" },
        { id: "context", label: "Context", hint: "What prompted the decision, and when." },
        { id: "decision", label: "Decision", hint: "One or two plain sentences." },
        { id: "assumptions", label: "Assumptions", hint: "Especially the ones that feel too obvious to mention." },
        { id: "alternatives", label: "Alternatives set aside, with reasons" },
        { id: "consequences", label: "Consequences", hint: "Good, bad, and neutral." },
        { id: "operations", label: "Owner, constraints, and failure handling", hint: "The part the person on call at night needs." },
        { id: "revisit", label: "Revisit when", hint: "What would make this decision worth looking at again?" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "how-to-choose-and-actually-use-ai-tools": {
    introduce: {
      question: "Category or brand first?",
      answer: [
        "Category. Products change quickly and the underlying job changes slowly, so describe the work first, then compare a few options against the same criteria.",
      ],
    },
    explain: true,
    illustrate: {
      heading: "A sample run-log entry",
      lead: "One made-up entry, in the eight columns this article suggests.",
      rows: [
        { label: "Date", value: "Week 2 of the pilot, Tuesday." },
        { label: "Tool and account type", value: "An AI writing assistant, team account." },
        { label: "Process or playbook", value: "First draft of the weekly customer update." },
        { label: "Input category", value: "Internal. No customer names or contract terms." },
        { label: "Output location", value: "The drafts folder, as a document named with the date." },
        { label: "Reviewer", value: "The account manager." },
        { label: "Correction or issue", value: "The draft invented a release date. The reviewer removed it." },
        { label: "Result measure", value: "Draft ready for review in 10 minutes. The week before the pilot it took 45." },
      ],
      caption: "A made-up example. The tool, the people and the numbers are not real; the columns are the article's.",
    },
    applyLead: "Now plan your own pilot and keep its log here. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "pilot-plan",
      title: "Pilot plan and run log",
      fields: [
        { id: "outcome", label: "The outcome", hint: "Who benefits, who owns the process, how the current result is measured, and what better looks like." },
        { id: "category", label: "Category of work", hint: "Describe the job before naming a product." },
        { id: "playbook", label: "Playbook", hint: "Trigger, input, steps, required human review, output, and where the result is recorded." },
        { id: "boundary", label: "Data boundary", hint: "Public, internal, or restricted. What must never go into the tool?" },
        { id: "measure", label: "The measure that decides keep, adjust, or stop" },
        { id: "log", label: "Run log", hint: "One line per run: date; tool and account type; playbook; input category; output location; reviewer; correction or issue; result measure." },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
  "the-hero-trap": {
    introduce: {
      question: "Think of a recent save on your team. What would have happened if that person had been away?",
      answer: [
        "That gap is the system's weakness, not the person's. The goal is to keep the person and remove the need for the save.",
      ],
      guessLabel: "The save you have in mind (optional)",
    },
    explain: true,
    illustrate: {
      heading: "One save, turned into a system fix",
      lead: "A made-up example of the habit this article describes.",
      rows: [
        { label: "The save", value: "A nightly job failed at 2 a.m. One person recognized the error from memory and restarted it with the right setting before anyone noticed." },
        { label: "The thank you", value: "Said in the morning stand-up, as it should be." },
        { label: "The one question", value: "How do we make sure the next person does not need to be a hero to handle this?" },
        { label: "The system change", value: "A one-page runbook for the job, an alert that names the setting to check, and a second person walked through the fix the next time it ran." },
        { label: "What was celebrated next", value: "The first night the second person handled it alone." },
      ],
      caption: "A made-up example. One improvement per crisis is enough to begin.",
    },
    applyLead: "Next time someone saves the day, fill this in while it is fresh. Your answers stay on this page.",
    apply: {
      kind: "worksheet",
      id: "after-the-save",
      title: "After-the-save worksheet",
      fields: [
        { id: "broke", label: "What broke" },
        { id: "who", label: "Who saved it, and what they knew that others did not" },
        { id: "change", label: "The one system change that prevents a repeat", hint: "A runbook, a script, a clearer alert, or a simpler handoff." },
        { id: "next", label: "Who learns it next, and how", hint: "Pair, rotate, walk through, record, or write down." },
        { id: "celebrate", label: "What we will celebrate instead" },
      ],
    },
    goDeeper: {
      summary: "Go deeper (optional): five questions to think through",
      questions: standingQuestions.map((question) => ({ question })),
    },
  },
};
