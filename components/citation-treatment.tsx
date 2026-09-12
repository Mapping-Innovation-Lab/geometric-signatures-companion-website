import type { CitationRecord } from "@/content/schema";

export function citationTreatmentText(citation: CitationRecord) {
  const notes: string[] = [];
  if (citation.titleTreatment === "editorial-translation") {
    notes.push("English title translated editorially from the bibliography record.");
  } else if (citation.titleTreatment === "capitalization-normalized") {
    notes.push("Title capitalization normalized from the bibliography record.");
  }
  if (citation.authorTreatment === "abbreviated") {
    notes.push("Full author list abbreviated for display.");
  }
  return notes.join(" ");
}

export function CitationTreatment({ citation }: { citation: CitationRecord }) {
  const treatment = citationTreatmentText(citation);
  return treatment ? (
    <small className="citation-treatment">Display treatment: {treatment}</small>
  ) : null;
}
