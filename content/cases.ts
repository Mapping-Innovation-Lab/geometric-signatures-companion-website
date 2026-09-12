import type { CaseStudyContent, PermutationStatistic } from "./schema";
import { PAPER_LAST_VERIFIED, PAPER_SOURCE_VERSION } from "./paper-snapshot";

export const concentrationProfiles: Record<
  CaseStudyContent["concentrationProfile"],
  { label: string; description: string }
> = {
  concentrated: {
    label: "Concentrated",
    description:
      "The target concept produces a comparatively localized, target-dominant geometric signature.",
  },
  intermediate: {
    label: "Intermediate / broad",
    description:
      "The target is detectable, but the reorganization is distributed across a broader literature.",
  },
  diffuse: {
    label: "Diffuse",
    description:
      "No single target cluster provides a complete account of the field-wide reorganization.",
  },
  subfield: {
    label: "Subfield signal",
    description:
      "The target carries a local signal inside a broader and more disruptive transition.",
  },
  diagnostic: {
    label: "Assignment diagnostic",
    description:
      "The nominal response exposes a document-assignment failure mode and is not supporting historical evidence.",
  },
};

export const validationStatisticLabels: Record<PermutationStatistic, string> = {
  "joint-co-dominance": "Joint co-dominance",
  "grid-maximum-l2": "Grid-maximum L2",
};

export const validationTestLabels = {
  randomRemoval: "Random-removal null",
  scrambledAssignment: "Scrambled-assignment null",
  lookElsewhere: "Look-elsewhere correction",
} as const;

export const crossCaseValidationNote = {
  text: "The leave-one-out analyses support collective signals in the benchmark cases, while the Higgs case exposes a single-document assignment failure mode.",
  status: "provisional" as const,
  source: {
    kind: "manuscript" as const,
    path: "paper/sr_signal_detection_3D.tex",
    locator: "Historical validation / Unified validation across historical case studies",
    sourceVersion: PAPER_SOURCE_VERSION,
    lastVerified: PAPER_LAST_VERIFIED,
  },
};
