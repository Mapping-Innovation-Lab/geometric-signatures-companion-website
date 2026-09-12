export const releaseResources = [
  {
    id: "paper-pdf",
    label: "Paper PDF",
    status: "added at release",
  },
  {
    id: "citation-record",
    label: "Citation record",
    status: "generated from the released paper",
  },
  {
    id: "code-data",
    label: "Code/data",
    status: "linked after release approval",
  },
] as const;

export const paperUtilityLinks = [
  { href: "/paper", label: "Paper" },
  { href: "/paper#resources", label: "Resources" },
  { href: "/paper#accessibility", label: "Accessibility" },
] as const;

export const accessibilityStatement = [
  "This companion site uses semantic headings and landmarks, visible keyboard focus, keyboard-operable controls, and text alternatives for figures. Wide comparison tables can be focused and scrolled horizontally.",
  "Motion is not required to understand the scientific content and is reduced when the browser requests reduced motion. The manuscript PDF, when released, may have accessibility characteristics separate from this website.",
] as const;
