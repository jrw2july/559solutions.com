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

export type ApplyData = WorksheetData | MakeTheCallData;

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
