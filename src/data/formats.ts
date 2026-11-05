// Article formats (2026-11-05): what kind of exercise an article has. Derived from the lesson data in
// exercises.ts rather than written in frontmatter, so a label can never claim an exercise that is not there.
import { exercises } from "@/data/exercises";

export type ArticleFormat = { slug: string; label: string };

export const articleFormats: ArticleFormat[] = [
  { slug: "worksheet", label: "Worksheet" },
  { slug: "self-check", label: "Self-check" },
  { slug: "scenario", label: "Scenario" },
];

const byKind: Record<string, string> = {
  worksheet: "worksheet",
  selfcheck: "self-check",
  scenario: "scenario",
  call: "scenario",
};

/** The format of an article's exercise, or undefined for an article with no exercise. */
export const articleFormat = (articleSlug: string): ArticleFormat | undefined => {
  const kind = exercises[articleSlug]?.apply?.kind;
  const slug = kind ? byKind[kind] : undefined;
  return articleFormats.find((format) => format.slug === slug);
};
