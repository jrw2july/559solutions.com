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
};

export type WorksheetData = {
  kind: "worksheet";
  /** Unique on the page; used for element ids and the "Save on this device" key. */
  id: string;
  title: string;
  intro?: string;
  fields: WorksheetField[];
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
  },
};
