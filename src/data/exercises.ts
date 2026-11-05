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

export type Exercise = {
  introduce?: QuestionWorthAskingData;
  apply?: ApplyData;
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

// Sample content for the component demo page (/ieia-demo/). It is clearly labeled as a sample there.
// Remove this entry when the demo page is removed.
export const demoExercise = {
  introduce: {
    question: "What usually fails first when a team starts with a product instead of a decision?",
    answer: [
      "The goal drifts toward what the tool does well. The pilot then measures the tool, not the work.",
      "Naming the decision first gives the team something to judge the tool against.",
    ],
    guessLabel: "Your guess (optional)",
  },
  apply: {
    kind: "worksheet",
    id: "demo-brief",
    title: "Build your decision brief",
    intro: "Fill in what you know. Leave a box blank if you do not know yet. That is useful too.",
    fields: [
      { id: "decision", label: "The decision", hint: "The choice someone makes again and again." },
      { id: "owner", label: "Who owns it" },
      { id: "evidence", label: "Evidence that would change our mind" },
      { id: "experiment", label: "Smallest useful experiment" },
    ],
  },
  call: {
    kind: "call",
    id: "demo-call",
    title: "Make the call",
    scenario:
      "A small team has a free trial of an AI tool that ends Friday. Nobody has said which decision it should help with.",
    legend: "What should the team do first?",
    choices: [
      {
        id: "extend",
        label: "Ask the vendor to extend the trial.",
        correct: false,
        feedback: "More time with the tool does not tell the team what to judge it against.",
      },
      {
        id: "name-decision",
        label: "Name the decision the tool should improve and who owns it.",
        correct: true,
        feedback: "With a named decision and owner, the trial has a clear test.",
      },
      {
        id: "compare",
        label: "Compare three more tools before Friday.",
        correct: false,
        feedback: "More products add more answers. The team still has no question.",
      },
    ],
  },
  goDeeper: {
    questions: standingQuestions.map((question) => ({ question })),
  },
} satisfies {
  introduce: QuestionWorthAskingData;
  apply: WorksheetData;
  call: MakeTheCallData;
  goDeeper: GoDeeperData;
};

/** Exercises for published articles, keyed by article slug. Added article by article in later steps. */
export const exercises: Record<string, Exercise> = {};
