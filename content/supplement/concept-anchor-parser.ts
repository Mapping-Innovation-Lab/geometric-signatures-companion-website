import type { ConceptAnchor, ConceptAnchorCase } from "./types";

const caseHeading = /^## (.+?) \((\d{4}-\d{4})\)$/gm;
const conceptHeading = /^### `([^`]+)`([^\n]*)$/gm;
const targetPattern = /^Target concept: `([^`]+)`$/m;
const descriptionPattern = /\*\*Description\.\*\*\s+([\s\S]*?)\n\n\*\*Aliases\.\*\*/;
const aliasesPattern = /\*\*Aliases\.\*\*\s+([^\n]+)/;
const paraphrasePattern = /^\d+\.\s+(.+)$/gm;

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseConcepts(caseMarkdown: string, targetConcept: string, caseTitle: string): ConceptAnchor[] {
  const headings = [...caseMarkdown.matchAll(conceptHeading)];
  const concepts = headings.map((heading, index) => {
    const [fullHeading, id] = heading;
    const start = (heading.index ?? 0) + fullHeading.length;
    const end = headings[index + 1]?.index ?? caseMarkdown.length;
    const conceptMarkdown = caseMarkdown.slice(start, end);
    const description = conceptMarkdown.match(descriptionPattern)?.[1]?.trim();
    const aliases = conceptMarkdown
      .match(aliasesPattern)?.[1]
      .split(";")
      .map((alias) => alias.trim())
      .filter(Boolean);
    const paraphrases = [...conceptMarkdown.matchAll(paraphrasePattern)].map((match) => match[1].trim());

    if (!description || !aliases) {
      throw new Error(`Could not parse description or aliases for concept \`${id}\` in ${caseTitle}.`);
    }
    if (paraphrases.length !== 5) {
      throw new Error(`Expected five paraphrases for concept \`${id}\` in ${caseTitle}, found ${paraphrases.length}.`);
    }

    return {
      id,
      isTarget: id === targetConcept,
      description,
      aliases,
      paraphrases,
    } satisfies ConceptAnchor;
  });

  if (concepts.length !== 10) {
    throw new Error(`Expected ten concepts for ${caseTitle}, found ${concepts.length}.`);
  }

  return concepts;
}

export function parseConceptAnchors(markdown: string): ConceptAnchorCase[] {
  const headings = [...markdown.matchAll(caseHeading)];
  if (headings.length === 0) {
    throw new Error("Could not find any concept-anchor case headings.");
  }

  return headings.map((heading, index) => {
    const [fullHeading, title, yearRange] = heading;
    const start = (heading.index ?? 0) + fullHeading.length;
    const end = headings[index + 1]?.index ?? markdown.length;
    const caseMarkdown = markdown.slice(start, end);
    const targetConcept = caseMarkdown.match(targetPattern)?.[1];

    if (!targetConcept) {
      throw new Error(`Could not find a target concept for ${title}.`);
    }

    return {
      title,
      yearRange,
      slug: toSlug(title),
      targetConcept,
      concepts: parseConcepts(caseMarkdown, targetConcept, title),
    };
  });
}
