import type { FigureMetadata, SourceLocator } from "./schema";

const FIGURE_SOURCE_VERSION =
  "paper/sr_signal_detection_3D.tex from Overleaf near-final export received 2026-08-14";
const FIGURE_LAST_VERIFIED = "2026-08-14";

function manuscriptFigure(manuscriptLabel: string): SourceLocator {
  return {
    kind: "figure",
    path: "paper/sr_signal_detection_3D.tex",
    locator: `Figure ${manuscriptLabel}`,
    sourceVersion: FIGURE_SOURCE_VERSION,
    lastVerified: FIGURE_LAST_VERIFIED,
  };
}

export const figures: Record<string, FigureMetadata> = {
  "method-six-stage": {
    id: "method-six-stage",
    title: "Six-stage counterfactual ablation framework",
    manuscriptLabel: "fig:overview",
    sourceAsset: "outputs/schematics/fig_method_overview_v3.pdf",
    route: "/method",
    priority: "P0",
    treatment: "animated",
    caption:
      "The six-stage framework moves from chunked papers and embeddings to concept assignment, rolling-window centroids, target-cluster ablation, and pre/post geometric effect sizes.",
    altText:
      "Six numbered panels show papers becoming embeddings and concepts, followed by target-concept ablation, recomputed geometry, and pre/post effect sizes.",
    dataReadiness: "ready",
    controls: ["Previous stage", "Next stage", "Direct stage selection"],
    motion: {
      trigger: "control",
      reducedMotionFallback: "Show all six final diagram states without transitions.",
      pauseWhenOffscreen: true,
    },
    staticFallback: "/figures/method-overview.png",
    source: manuscriptFigure("fig:overview"),
    status: "provisional",
    caveats: [
      "The manuscript figure is a methodological schematic rather than an empirical result.",
    ],
  },
  "validation-three-tests": {
    id: "validation-three-tests",
    title: "Three core validation tests",
    manuscriptLabel: "fig:validation_suite",
    sourceAsset: "outputs/schematics/core_validation_tests_detailed_final.pdf",
    route: "/method#validation",
    priority: "P0",
    treatment: "animated",
    caption:
      "The validation schematic contrasts matched random removals, scrambled concept assignments, and leave-one-out stability; quantitative joint-null and look-elsewhere results are shown separately.",
    altText:
      "Three panels explain random-removal, scrambled-assignment, and leave-one-out tests for the concept-cluster ablation signal.",
    dataReadiness: "ready",
    controls: ["Random removal", "Scrambled assignment", "Leave one out"],
    motion: {
      trigger: "control",
      reducedMotionFallback: "Show all three validation panels simultaneously.",
      pauseWhenOffscreen: true,
    },
    staticFallback: "/figures/validation-suite.png",
    source: manuscriptFigure("fig:validation_suite"),
    status: "provisional",
    caveats: [
      "This overview is explanatory; the current manuscript evaluates random and scrambled nulls jointly in two dimensions.",
      "The near-final manuscript includes an author note requesting a later schematic revision and an added look-elsewhere panel.",
    ],
  },
  "cross-case-rankings": {
    id: "cross-case-rankings",
    title: "Counterfactual rankings across five cases",
    manuscriptLabel: "fig:crosscase",
    sourceAsset: "outputs/cross_case_figures/fig_all_rankings.pdf",
    route: "/cases",
    priority: "P0",
    treatment: "interactive",
    caption:
      "Counterfactual effect-size rankings for the five historical cases, with target concepts in red, context concepts in blue, and unassigned concepts marked as unavailable.",
    altText:
      "Five horizontal bar charts compare target and context concept rankings for special relativity, the Higgs mechanism, Gödel incompleteness, deep learning, and attention.",
    dataReadiness: "missing",
    dataSource: "A machine-readable export of the full concept rankings has not yet been supplied.",
    controls: ["Case", "Metric", "Reset"],
    staticFallback: "/figures/cross-case-rankings.png",
    source: manuscriptFigure("fig:crosscase"),
    status: "provisional",
    caveats: [
      "The current release uses the reviewed static manuscript figure and does not digitize bar values.",
    ],
  },
  "target-vs-context": {
    id: "target-vs-context",
    title: "Target signal versus surrounding concepts",
    manuscriptLabel: "fig:targetcontext",
    sourceAsset: "outputs/cross_case_figures/fig_target_vs_context.pdf",
    route: "/cases",
    priority: "P0",
    treatment: "static",
    caption:
      "Target-concept absolute effect versus the mean absolute effect of context concepts: points above the diagonal indicate more concentrated target signals, while points near it indicate diffuse reorganization.",
    altText:
      "Scatter plot of target effect against mean context effect for five cases, with the Higgs mechanism and special relativity far above the equality line and attention near it.",
    dataReadiness: "partial",
    dataSource: "Target-level values are structured; full context distributions await an analysis export.",
    staticFallback: "/figures/target-vs-context.png",
    source: manuscriptFigure("fig:targetcontext"),
    status: "provisional",
    caveats: [
      "The near-final manuscript retains an author query about the plotted absolute-effect definition, so this comparison remains provisional.",
    ],
  },
  "model-independence": {
    id: "model-independence",
    title: "Robustness across embedding models",
    manuscriptLabel: "fig:modelindep",
    sourceAsset: "outputs/cross_case_figures/fig_model_independence.pdf",
    route: "/method#model-independence",
    priority: "P0",
    treatment: "interactive",
    caption:
      "Target-concept rank and maximum absolute effect across five embedding models; rankings are the primary comparison because effect magnitudes do not share a common scale across embedding spaces.",
    altText:
      "Two heatmaps compare target rank and maximum absolute effect for five historical cases across e5-base, SPECTER2, bge-m3, MiniLM, and mxbai embeddings.",
    dataReadiness: "partial",
    dataSource: "The target matrix is available in the manuscript; a reviewed structured transcription is pending.",
    controls: ["Rank or effect", "Case", "Embedding model"],
    staticFallback: "/figures/model-independence.png",
    source: manuscriptFigure("fig:modelindep"),
    status: "provisional",
    caveats: [
      "SPECTER2 assigns no Gödel target documents above the margin, so that effect is undefined.",
      "Absolute effect magnitudes must not be compared directly across embedding models.",
    ],
  },
  "sr-concept-year-grid": {
    id: "sr-concept-year-grid",
    title: "Special relativity concept-by-year grid",
    manuscriptLabel: "fig:grid",
    sourceAsset:
      "outputs/special_relativity/validation/concept_year_grid/concept_year_grid_total_inertia.pdf",
    route: "/cases/special-relativity",
    priority: "P0",
    treatment: "interactive",
    caption:
      "The special-relativity total-inertia grid evaluates every concept and candidate pivot year; the target row identifies the provisional data-derived pivot.",
    altText:
      "Heatmap of total-inertia Cohen's D by concept and pivot year, with the special-relativity maximum marked and an inset tracing the target row.",
    dataReadiness: "missing",
    dataSource: "The reviewed heatmap is available, but its underlying concept-by-year matrix is not.",
    controls: ["Metric", "Target-row focus", "Reset"],
    staticFallback: "/figures/sr-concept-year-grid.png",
    source: manuscriptFigure("fig:grid"),
    status: "provisional",
    caveats: [
      "Cell values are not reconstructed from the image; the static figure remains the quantitative authority until raw matrices are supplied.",
    ],
  },
  "sr-random-null": {
    id: "sr-random-null",
    title: "Special relativity random-removal null",
    manuscriptLabel: "fig:null",
    sourceAsset: "outputs/gen009_2d_robustness/sr_null_random_2d.pdf",
    route: "/cases/special-relativity",
    priority: "P1",
    treatment: "static",
    caption:
      "The observed special-relativity signal is compared with matched random removals on the joint (D_I, D_P) plane using a co-dominance tail that is two-sided on each axis.",
    altText:
      "Joint (D_I, D_P) plane with random-removal null draws near the origin, the observed special-relativity point far to the right, and the co-dominance region marked.",
    dataReadiness: "missing",
    dataSource: "The reviewed two-dimensional figure is available; the raw null draws are not.",
    staticFallback: "/figures/sr-random-null.png",
    source: manuscriptFigure("fig:null"),
    status: "provisional",
  },
  "sr-scrambled-null": {
    id: "sr-scrambled-null",
    title: "Special relativity scrambled-assignment null",
    manuscriptLabel: "fig:scrambled",
    sourceAsset: "outputs/gen009_2d_robustness/sr_null_scrambled_2d.pdf",
    route: "/cases/special-relativity",
    priority: "P1",
    treatment: "static",
    caption:
      "The observed special-relativity signal is compared with scrambled assignments on the joint (D_I, D_P) plane using a co-dominance tail that is two-sided on each axis.",
    altText:
      "Joint (D_I, D_P) plane with scrambled-assignment null draws around the origin, the observed special-relativity point separated to the right, and the co-dominance region marked.",
    dataReadiness: "missing",
    dataSource: "The reviewed two-dimensional figure is available; the raw scrambled draws are not.",
    staticFallback: "/figures/sr-scrambled-null.png",
    source: manuscriptFigure("fig:scrambled"),
    status: "provisional",
  },
  "sr-leave-one-out": {
    id: "sr-leave-one-out",
    title: "Special relativity single-paper stability",
    manuscriptLabel: "fig:loo",
    sourceAsset: "outputs/gen009_2d_robustness/sr_loo_2d.pdf",
    route: "/cases/special-relativity",
    priority: "P1",
    treatment: "interactive",
    caption:
      "Each bar shows the two-dimensional signal retained by one special-relativity paper alone; every single-paper value remains well below the full-cluster L2 effect.",
    altText:
      "Sorted horizontal bars show that every single-paper L2 signal remains far below the dashed full-cluster reference.",
    dataReadiness: "missing",
    dataSource: "The reviewed static figure is available; per-paper values and stable paper identifiers are not.",
    controls: ["Paper focus", "Reset"],
    staticFallback: "/figures/sr-leave-one-out.png",
    source: manuscriptFigure("fig:loo"),
    status: "provisional",
    caveats: [
      "This is a robustness test of the collective cluster signal, not a ranking of individual papers' historical influence.",
    ],
  },
  "look-elsewhere": {
    id: "look-elsewhere",
    title: "Special relativity look-elsewhere correction",
    manuscriptLabel: "fig:lee",
    sourceAsset:
      "outputs/special_relativity/validation/look_elsewhere_2d/lee2d_distribution.pdf",
    route: "/method#look-elsewhere",
    priority: "P1",
    treatment: "static",
    caption:
      "The look-elsewhere correction compares the observed value with permutation maxima of the grid-maximum L2 statistic, sqrt(D_I^2 + D_P^2), over every concept-by-year cell.",
    altText:
      "Histogram of permutation values for the grid-maximum L2 statistic sqrt(D_I^2 + D_P^2), with the observed special-relativity value marked far beyond the null distribution.",
    dataReadiness: "missing",
    dataSource: "The reviewed static distribution is available; the raw permutation maxima are not.",
    staticFallback: "/figures/sr-look-elsewhere.png",
    source: manuscriptFigure("fig:lee"),
    status: "provisional",
    caveats: [
      "The statistic is the maximum two-dimensional magnitude over the scanned grid, not a per-metric tail probability.",
    ],
  },
  "higgs-concept-year-grid": {
    id: "higgs-concept-year-grid",
    title: "Higgs mechanism concept-by-year grids",
    manuscriptLabel: "fig:higgs_grid",
    sourceAsset:
      "outputs/higgs/validation/concept_year_grid/concept_year_grid_combined.pdf",
    route: "/cases/higgs-mechanism",
    priority: "P0",
    treatment: "static",
    caption:
      "The Higgs appendix figure compares the total-inertia and mean-pairwise-distance grids across candidate concepts and pivot years.",
    altText:
      "Two heatmaps show total-inertia and mean-pairwise-distance Cohen's D for ten particle-physics concepts across candidate pivot years.",
    dataReadiness: "missing",
    dataSource: "The reviewed appendix figure is available, but its underlying grids are not.",
    staticFallback: "/figures/higgs-concept-year-grid.png",
    source: manuscriptFigure("fig:higgs_grid"),
    status: "provisional",
    caveats: [
      "The fallback contains the two active observables only; cell values are not reconstructed from the image.",
    ],
  },
  "godel-concept-year-grid": {
    id: "godel-concept-year-grid",
    title: "Gödel incompleteness concept-by-year grids",
    manuscriptLabel: "fig:godel_grid",
    sourceAsset:
      "outputs/godel/validation/concept_year_grid/concept_year_grid_combined.pdf",
    route: "/cases/godel-incompleteness",
    priority: "P0",
    treatment: "static",
    caption:
      "The Gödel appendix figure compares the total-inertia and mean-pairwise-distance grids across candidate concepts and pivot years.",
    altText:
      "Two heatmaps show total-inertia and mean-pairwise-distance Cohen's D for ten mathematical-logic concepts across candidate pivot years.",
    dataReadiness: "missing",
    dataSource: "The reviewed appendix figure is available, but its underlying grids are not.",
    staticFallback: "/figures/godel-concept-year-grid.png",
    source: manuscriptFigure("fig:godel_grid"),
    status: "provisional",
    caveats: [
      "The fallback contains the two active observables only; cell values are not reconstructed from the image.",
    ],
  },
  "deep-learning-concept-year-grid": {
    id: "deep-learning-concept-year-grid",
    title: "Deep-learning concept-by-year grids",
    manuscriptLabel: "fig:dl_grid",
    sourceAsset:
      "outputs/deep_learning/validation/concept_year_grid/concept_year_grid_combined.pdf",
    route: "/cases/deep-learning",
    priority: "P0",
    treatment: "static",
    caption:
      "The deep-learning appendix figure compares the total-inertia and mean-pairwise-distance grids; no single target cell dominates the broader corpus-wide reorganization.",
    altText:
      "Two heatmaps show total-inertia and mean-pairwise-distance Cohen's D for ten machine-learning concepts across candidate pivot years.",
    dataReadiness: "missing",
    dataSource: "The reviewed appendix figure is available, but its underlying grids are not.",
    staticFallback: "/figures/deep-learning-concept-year-grid.png",
    source: manuscriptFigure("fig:dl_grid"),
    status: "provisional",
    caveats: [
      "The fallback contains the two active observables only; cell values are not reconstructed from the image.",
    ],
  },
  "attention-concept-year-grid": {
    id: "attention-concept-year-grid",
    title: "Attention-mechanism concept-by-year grids",
    manuscriptLabel: "fig:attn_grid",
    sourceAsset:
      "outputs/attention/validation/concept_year_grid/concept_year_grid_combined.pdf",
    route: "/cases/attention-mechanism",
    priority: "P0",
    treatment: "static",
    caption:
      "The attention appendix figure compares the total-inertia and mean-pairwise-distance grids across candidate concepts and pivot years.",
    altText:
      "Two heatmaps show total-inertia and mean-pairwise-distance Cohen's D for ten machine-learning concepts across candidate pivot years.",
    dataReadiness: "missing",
    dataSource: "The reviewed appendix figure is available, but its underlying grids are not.",
    staticFallback: "/figures/attention-concept-year-grid.png",
    source: manuscriptFigure("fig:attn_grid"),
    status: "provisional",
    caveats: [
      "The fallback contains the two active observables only; cell values are not reconstructed from the image.",
    ],
  },
};

export const caseGridFigureIds = {
  "special-relativity": "sr-concept-year-grid",
  "higgs-mechanism": "higgs-concept-year-grid",
  "godel-incompleteness": "godel-concept-year-grid",
  "deep-learning": "deep-learning-concept-year-grid",
  "attention-mechanism": "attention-concept-year-grid",
} as const;
