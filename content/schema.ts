/** Shared content contracts for the Geometric Signatures paper companion. */

export type IsoDateString = string;
export type VerificationStatus = "provisional" | "verified" | "published";
export type NumericComparator = "eq" | "lt" | "lte" | "gt" | "gte";
export type MetricId = "total-inertia" | "mean-pairwise-distance";
export type FigureTreatment = "static" | "animated" | "interactive";
export type FigurePriority = "P0" | "P1" | "P2";
export type DataReadiness = "ready" | "partial" | "missing";

export interface SourceLocator {
  kind: "manuscript" | "table" | "figure" | "equation" | "bibliography" | "analysis";
  path: string;
  locator: string;
  sourceVersion: string;
  lastVerified: IsoDateString;
}

export interface NumericUncertainty {
  kind: "standard-deviation" | "standard-error" | "confidence-interval" | "bootstrap-interval";
  lower?: number;
  upper?: number;
  level?: number;
  formatted: string;
}

export interface NumericValue {
  value: number;
  formatted: string;
  comparator?: NumericComparator;
  unit?: string;
  status: VerificationStatus;
  source: SourceLocator;
  uncertainty?: NumericUncertainty;
  caveat?: string;
}

export interface AuthorRecord {
  id: string;
  name: string;
  affiliations: string[];
  corresponding?: boolean;
  orcid?: string;
}

export interface CitationRecord {
  bibtexKey: string;
  title: string;
  authors: string[];
  year: number;
  titleTreatment: "bibliography-title" | "editorial-translation" | "capitalization-normalized";
  authorTreatment: "complete" | "abbreviated";
  venue?: string;
  doi?: string;
  url?: string;
  source: SourceLocator;
}

export interface MetricDefinition {
  id: MetricId;
  name: string;
  symbolLatex: string;
  plainLanguage: string;
  interpretation: string;
  source: SourceLocator;
}

export interface CorpusSummary {
  documents?: NumericValue;
  assignedDocuments?: NumericValue;
  targetDocuments: NumericValue;
  timeSpan: { start: NumericValue; end: NumericValue };
  rollingWindowRadiusYears: NumericValue;
}

export type PermutationStatistic = "joint-co-dominance" | "grid-maximum-l2";

export interface PermutationTestSummary {
  pValue: NumericValue;
  permutations: NumericValue;
  statistic: PermutationStatistic;
  plainLanguage: string;
}

export interface CaseResultSummary {
  pivotYear: NumericValue;
  targetRank: NumericValue;
  effectByMetric: Record<MetricId, NumericValue>;
  maxAbsoluteEffect: NumericValue;
  validation: {
    randomRemoval: PermutationTestSummary;
    scrambledAssignment: PermutationTestSummary;
    lookElsewhere: PermutationTestSummary;
  };
  confusionFraction: NumericValue;
}

export interface CaseStudyContent {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  domain: string;
  historicalYear: number;
  historicalYearLabel: string;
  targetConcept: string;
  focalCitationKeys: string[];
  concentrationProfile:
    | "concentrated"
    | "intermediate"
    | "diffuse"
    | "subfield"
    | "diagnostic";
  dek: string;
  corpus: CorpusSummary;
  results: CaseResultSummary;
  caveats: string[];
  source: SourceLocator;
}

export interface MotionMetadata {
  trigger: "scroll" | "control" | "load";
  durationMs?: number;
  reducedMotionFallback: string;
  pauseWhenOffscreen: boolean;
}

export interface FigureMetadata {
  id: string;
  title: string;
  manuscriptLabel?: string;
  sourceAsset?: string;
  route: string;
  priority: FigurePriority;
  treatment: FigureTreatment;
  caption: string;
  altText: string;
  dataReadiness: DataReadiness;
  dataSource?: string;
  controls?: string[];
  motion?: MotionMetadata;
  staticFallback: string;
  source: SourceLocator;
  status: VerificationStatus;
  caveats?: string[];
}

export interface ManuscriptSnapshot {
  title: string;
  webSummary: {
    paragraphs: string[];
    source: SourceLocator;
    status: VerificationStatus;
  };
  statusLabel: string;
  status: VerificationStatus;
  sourceVersion: string;
  receivedAt: IsoDateString;
  lastVerified: IsoDateString;
  mainTexPath: string;
  bibliographyPath: string;
  notes: string[];
}

export interface PaperSnapshot {
  manuscript: ManuscriptSnapshot;
  authors: AuthorRecord[];
  metrics: MetricDefinition[];
  cases: CaseStudyContent[];
  citations: CitationRecord[];
}
