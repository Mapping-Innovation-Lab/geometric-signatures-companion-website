import type { SourceLocator, VerificationStatus } from "./schema";

const METHOD_SOURCE_VERSION =
  "paper/sr_signal_detection_3D.tex from Overleaf near-final export received 2026-08-14";
const METHOD_LAST_VERIFIED = "2026-08-14";

function manuscriptSource(
  locator: string,
  kind: SourceLocator["kind"] = "manuscript",
): SourceLocator {
  return {
    kind,
    path: "paper/sr_signal_detection_3D.tex",
    locator,
    sourceVersion: METHOD_SOURCE_VERSION,
    lastVerified: METHOD_LAST_VERIFIED,
  };
}

export interface MethodParameter {
  id: string;
  label: string;
  value: number;
  formatted: string;
  unit: string;
  description: string;
  status: VerificationStatus;
  source: SourceLocator;
}

function parameter(
  id: string,
  label: string,
  value: number,
  formatted: string,
  unit: string,
  description: string,
  locator: string,
): MethodParameter {
  return {
    id,
    label,
    value,
    formatted,
    unit,
    description,
    status: "provisional",
    source: manuscriptSource(locator),
  };
}

export const methodParameters = {
  chunkWords: parameter(
    "chunk-words",
    "Maximum chunk length",
    300,
    "300-word chunks",
    "words",
    "Long papers are split so semantic evidence from later sections is not lost to encoder context limits.",
    "Method / Representing conceptual organization, paragraph 2",
  ),
  overlapWords: parameter(
    "overlap-words",
    "Chunk overlap",
    40,
    "40-word overlap",
    "words",
    "Adjacent chunks overlap to preserve context across boundaries before their embeddings are averaged.",
    "Method / Representing conceptual organization, paragraph 2",
  ),
  conceptCount: parameter(
    "concept-count",
    "Concepts per case",
    10,
    "ten curated concepts",
    "concepts",
    "Each case contains one target concept and contextual concepts chosen to keep the geometry historically interpretable.",
    "Method / Representing conceptual organization, paragraph 3",
  ),
  paraphrasesPerAnchor: parameter(
    "paraphrases-per-anchor",
    "Paraphrases per concept anchor",
    5,
    "five paraphrases",
    "paraphrases per anchor",
    "Each concept anchor averages several descriptions to reduce sensitivity to one wording choice.",
    "Method / Representing conceptual organization, paragraph 4",
  ),
  smallerCorpusRadiusYears: parameter(
    "smaller-corpus-radius",
    "Smaller-corpus rolling radius",
    2,
    "radius two years",
    "years",
    "The smaller historical corpora pool a wider local window to maintain enough documents per centroid.",
    "Method / Counterfactual observable, paragraph 2; Table tab:corpora",
  ),
  machineLearningRadiusYears: parameter(
    "machine-learning-radius",
    "Machine-learning rolling radius",
    1,
    "radius one year",
    "year",
    "The larger machine-learning corpora use a narrower local window for finer temporal resolution.",
    "Method / Counterfactual observable, paragraph 2; Table tab:corpora",
  ),
} as const satisfies Record<string, MethodParameter>;

export interface EmbeddingModelRecord {
  id: string;
  displayName: string;
  paradigm: string;
  dimensions: number;
  status: VerificationStatus;
  source: SourceLocator;
}

export const embeddingModels: EmbeddingModelRecord[] = [
  { id: "e5-base", displayName: "e5-base", paradigm: "Contrastive, multilingual", dimensions: 768 },
  { id: "mxbai", displayName: "mxbai", paradigm: "Contrastive", dimensions: 1024 },
  { id: "bge-m3", displayName: "bge-m3", paradigm: "Multi-task, multilingual", dimensions: 1024 },
  { id: "specter2", displayName: "SPECTER2", paradigm: "Citation prediction", dimensions: 768 },
  { id: "minilm", displayName: "MiniLM", paradigm: "Distilled, English", dimensions: 384 },
].map((model) => ({
  ...model,
  status: "provisional" as const,
  source: manuscriptSource("Table tab:embedding_models_main", "table"),
}));

export interface MethodEquation {
  id: string;
  title: string;
  latex: string;
  accessibleLabel: string;
  explanation: string;
  status: VerificationStatus;
  source: SourceLocator;
}

function equation(
  id: string,
  title: string,
  latex: string,
  accessibleLabel: string,
  explanation: string,
  locator: string,
): MethodEquation {
  return {
    id,
    title,
    latex,
    accessibleLabel,
    explanation,
    status: "provisional",
    source: manuscriptSource(locator, "equation"),
  };
}

export const methodEquations = {
  totalInertia: equation(
    "total-inertia",
    "Total inertia",
    String.raw`d_I(t)=\sum_{c=1}^{N(t)}\left\|\mathbf{c}_c(t)-\bar{\mathbf{c}}(t)\right\|^2`,
    "Definition of total inertia at time t",
    "Adds the squared distance of every active concept centroid from the grand centroid, measuring the overall spread of concept space.",
    "Method / Counterfactual observable / Total inertia",
  ),
  pairwiseDistance: equation(
    "mean-pairwise-distance",
    "Mean pairwise cosine distance",
    String.raw`d_P(t)=\binom{N(t)}{2}^{-1}\sum_{i<j}\left(1-\cos(\mathbf{c}_i(t),\mathbf{c}_j(t))\right)`,
    "Definition of mean pairwise cosine distance at time t",
    "Averages the angular separation between every pair of active concept centroids, capturing their relationship structure.",
    "Method / Counterfactual observable / Mean pairwise cosine distance",
  ),
  ablationDelta: equation(
    "ablation-delta",
    "Ablation delta",
    String.raw`\Delta(t)=g^{\mathrm{base}}(t)-g^{\mathrm{abl}}(t)`,
    "Definition of the yearly ablation delta",
    "Subtracts the geometry recomputed without the target cluster from the baseline geometry for each time window.",
    "Method / Counterfactual observable / Geometric perturbation",
  ),
  cohensD: equation(
    "cohens-d",
    "Pre/post effect size",
    String.raw`D=\frac{\bar{\Delta}_{\mathrm{post}}-\bar{\Delta}_{\mathrm{pre}}}{s_{\mathrm{pool}}}`,
    "Definition of the pre/post Cohen's D effect size",
    "Standardizes the change in the average perturbation after the pivot relative to before it.",
    "Method / Counterfactual observable / Standardized pre-post effect size",
  ),
  jointCoDominance: equation(
    "joint-co-dominance",
    "Joint co-dominance",
    String.raw`p_{\mathrm{co}}=\frac{1+M}{N+1}`,
    "Definition of the two-sided joint co-dominance p-value",
    "Counts null draws with absolute deviations from the null mean at least as large as the observation's on both axes, with a finite-sample correction. No covariance matrix is estimated or inverted.",
    "Method / Statistical validation / Equation eq:codominance",
  ),
  gridMaximumL2: equation(
    "grid-maximum-l2",
    "Grid-maximum L2 statistic",
    String.raw`T_{\mathrm{LEE}}=\max_{c,t}\sqrt{D_I(c,t)^2+D_P(c,t)^2}`,
    "Definition of the grid-maximum L2 look-elsewhere statistic",
    "Takes the largest joint effect magnitude over every scanned concept and candidate pivot year, then compares that maximum with permutation maxima.",
    "Results / Special relativity / Look-elsewhere correction",
  ),
} as const satisfies Record<string, MethodEquation>;

export const methodNarrative = {
  hero:
    "The method asks how a field's semantic geometry responds when every paper assigned to one candidate concept is removed. It compares that perturbation before and after a data-derived pivot; it does not simulate an alternative historical timeline.",
  corpus:
    "Scientific papers are represented from their text rather than from citation links. Long documents are chunked, each chunk is embedded independently, and the normalized mean becomes the document representation.",
  encoders:
    "The manuscript evaluates five encoders spanning contrastive, multilingual, citation-prediction, multi-task, and distilled training paradigms. Each encoder runs through the complete pipeline independently.",
  assignment:
    "Every case uses ten curated concepts. A concept anchor is the normalized mean of five paraphrases of its description. A document is assigned only when it clears both a corpus-level similarity floor and a confusion-aware margin over its second-best concept; otherwise it remains unassigned.",
  assignmentMargin:
    "Nearby concept anchors require more separation than isolated anchors. Documents that cannot win clearly are excluded rather than forced into a cluster.",
  metrics:
    "Within each rolling time window, the method computes centroids only for concepts with assigned papers. Two complementary observables describe the resulting geometry: its overall spread and the average separation among active concepts.",
  ablation:
    "For one candidate concept, every assigned paper is removed and all affected centroids and geometric observables are recomputed. The yearly baseline-minus-ablated difference is then summarized before and after a candidate pivot.",
  pivot:
    "The pivot is not fixed to the famous publication year. The analysis scans a concept-by-year grid, then takes the target concept's strongest row-wise response as its data-derived pivot. That search is later included in the global correction.",
  validation:
    "Matched random removals test whether any similarly sized set would disrupt the geometry. Scrambled assignments test whether paper identity matters. Leave-one-out analysis tests whether a single paper dominates the cluster signal.",
  jointNull:
    "Random-removal and scrambled-assignment significance is evaluated jointly on the (D_I, D_P) plane with a co-dominance tail that is two-sided on each axis, not with separate per-metric p-values. The paired null draws retain dependence between the axes without estimating a covariance matrix.",
  lookElsewhere:
    "Each permutation repeats the complete concept-by-year scan, so the comparison is made against the strongest joint signal found anywhere in each null grid.",
  retrospective:
    "The cases and their concept descriptions were chosen with historical hindsight, while the pivot is selected from the same grid used to measure the signal. The global grid-maximum test addresses the scan, but it does not remove the broader circularity of retrospective case construction.",
  modelVariation:
    "Encoder geometries have different scales, densities, and training histories. The method therefore calibrates assignment separately for each model and emphasizes target rank rather than comparing absolute effect magnitudes across models.",
  limitations:
    "The reported signatures are consistent with concentrated or diffuse conceptual reorganization. They do not establish historical causation, priority, or a unique account of how a field changed.",
  outlook:
    "Time-bounded embeddings, emerging-direction detection, hypothesis generation, and AI-assisted discovery are open research directions. The current study is retrospective and does not validate prospective breakthrough prediction.",
} as const;

export const validationTests = [
  {
    id: "random-removal",
    title: "Random-removal null",
    description: "Compares the target cluster with temporally matched sets of papers.",
    status: "provisional" as const,
    source: manuscriptSource("Method / Statistical validation / Random-removal null"),
  },
  {
    id: "scrambled-assignment",
    title: "Scrambled-assignment null",
    description: "Permutes concept labels while preserving the corpus's temporal structure.",
    status: "provisional" as const,
    source: manuscriptSource("Method / Statistical validation / Scrambled-assignment null"),
  },
  {
    id: "leave-one-out",
    title: "Leave-one-out stability",
    description: "Checks whether the collective signal can be reduced to one assigned paper.",
    status: "provisional" as const,
    source: manuscriptSource("Method / Statistical validation / Leave-one-out stability"),
  },
] as const;
