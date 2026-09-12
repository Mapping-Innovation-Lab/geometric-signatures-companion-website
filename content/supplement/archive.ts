export type ArchiveFigureLayout = "panoramic" | "wide" | "standard";

export interface ArchiveFigure {
  id: string;
  chapterId: "anchors" | "calibration" | "nulls" | "look-elsewhere" | "context-comparison";
  title: string;
  caption: string;
  altText: string;
  layout: ArchiveFigureLayout;
  role: "primary" | "reference";
  width: number;
  height: number;
  pngPath: string;
  pdfPath: string;
}

export interface ArchiveChapter {
  id: ArchiveFigure["chapterId"];
  index: string;
  published?: boolean;
  eyebrow: string;
  title: string;
  question: string;
  result: string;
  conclusion: string;
  caveat?: string;
  figureIds: string[];
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function archiveAsset(file: string) {
  return `${basePath}/supplementary/archive/figures/${file}`;
}

type FigureRecord = Omit<ArchiveFigure, "pngPath" | "pdfPath">;

function makeFigure(record: FigureRecord): ArchiveFigure {
  return {
    ...record,
    pngPath: archiveAsset(`${record.id}.png`),
    pdfPath: archiveAsset(`${record.id}.pdf`),
  };
}

export const archiveFigures: ArchiveFigure[] = [
  makeFigure({
    id: "fig_anchor_assignment_sr_signal_detection",
    chapterId: "anchors",
    title: "Special relativity: anchor ensemble and assignment",
    caption: "Five paraphrases form one concept anchor; papers are retained only when they clear both the similarity threshold and the confusion-aware margin.",
    altText: "Two-panel special-relativity assignment diagram showing five paraphrase embeddings combined into an anchor and documents evaluated against similarity and margin thresholds.",
    layout: "panoramic",
    role: "primary",
    width: 2268,
    height: 922,
  }),
  makeFigure({
    id: "fig_anchor_assignment_higgs",
    chapterId: "anchors",
    title: "Higgs mechanism: anchor ensemble and assignment",
    caption: "The same anchor-ensemble and two-threshold rule is applied without changing the assignment geometry between cases.",
    altText: "Two-panel Higgs-mechanism assignment diagram showing the paraphrase ensemble and document positions relative to the two assignment criteria.",
    layout: "panoramic",
    role: "primary",
    width: 2277,
    height: 922,
  }),
  makeFigure({
    id: "fig_anchor_assignment_godel",
    chapterId: "anchors",
    title: "Gödel incompleteness: anchor ensemble and assignment",
    caption: "The anchor combines five hand-written descriptions, while the margin rejects documents that are similarly close to competing concepts.",
    altText: "Two-panel Gödel-incompleteness assignment diagram showing five paraphrases averaged into an anchor and document acceptance by similarity and margin.",
    layout: "panoramic",
    role: "primary",
    width: 2260,
    height: 922,
  }),
  makeFigure({
    id: "fig_anchor_assignment_deep_learning",
    chapterId: "anchors",
    title: "Deep learning: anchor ensemble and assignment",
    caption: "Assignment depends on both absolute similarity and separation from the next-closest anchor.",
    altText: "Two-panel deep-learning assignment diagram showing paraphrase embeddings, their mean anchor, and documents separated by similarity and margin thresholds.",
    layout: "panoramic",
    role: "primary",
    width: 2277,
    height: 922,
  }),
  makeFigure({
    id: "fig_anchor_assignment_attention",
    chapterId: "anchors",
    title: "Attention mechanism: anchor ensemble and assignment",
    caption: "The common assignment rule makes the five case studies directly comparable while retaining case-specific thresholds.",
    altText: "Two-panel attention-mechanism assignment diagram showing the five-paraphrase anchor ensemble and document acceptance under the similarity and margin criteria.",
    layout: "panoramic",
    role: "primary",
    width: 2277,
    height: 922,
  }),
  makeFigure({
    id: "fig_fknee_selection_5case",
    chapterId: "calibration",
    title: "Selecting the margin scale across five cases",
    caption: "Kneedle selects a case-specific scale on the valley-to-peak ascent of the target response rather than imposing one global margin.",
    altText: "Five-panel curves of target response magnitude against margin scale f, with the selected f_knee operating point marked in each case.",
    layout: "wide",
    role: "primary",
    width: 2100,
    height: 1153,
  }),
  makeFigure({
    id: "fig_fknee_selection_sr",
    chapterId: "calibration",
    title: "Special-relativity margin-scale selection",
    caption: "The single-case view exposes the operating-point choice used for special relativity.",
    altText: "Special-relativity target response magnitude plotted against margin scale f with the selected f_knee point marked.",
    layout: "standard",
    role: "reference",
    width: 1110,
    height: 998,
  }),
  makeFigure({
    id: "fig_youden_curves_ci_5case",
    chapterId: "calibration",
    title: "Assignment trade-offs across five cases",
    caption: "The selected operating points balance retention against cross-concept contamination under the same calibration logic.",
    altText: "Five case panels plotting assignment efficiency and contamination trade-offs with confidence intervals across candidate margin scales.",
    layout: "panoramic",
    role: "primary",
    width: 3874,
    height: 966,
  }),
  makeFigure({
    id: "fig_youden_curve_ci_sr",
    chapterId: "calibration",
    title: "Special-relativity assignment trade-off",
    caption: "The focused panel shows the uncertainty around the special-relativity calibration.",
    altText: "Special-relativity efficiency and contamination trade-off curve with confidence intervals and the selected operating point.",
    layout: "standard",
    role: "reference",
    width: 1027,
    height: 925,
  }),
  makeFigure({
    id: "fig_jackknife_sr",
    chapterId: "calibration",
    title: "Special-relativity leave-one-out stability",
    caption: "No single assigned paper should determine the reported special-relativity response; the jackknife displays that sensitivity directly.",
    altText: "Leave-one-out estimates of the special-relativity ablation response, showing how the result changes when each assigned paper is omitted.",
    layout: "standard",
    role: "reference",
    width: 985,
    height: 888,
  }),
  makeFigure({
    id: "fig_null_grid_random_5case",
    chapterId: "nulls",
    title: "Random-removal nulls",
    caption: "Random removal asks whether the observed response is larger than removing the same number of papers at random.",
    altText: "Five panels of random-removal null draws in the D_I and D_P plane, with co-dominance regions and observed case-study points shown as stars.",
    layout: "wide",
    role: "primary",
    width: 3069,
    height: 1838,
  }),
  makeFigure({
    id: "fig_null_grid_scrambled_5case",
    chapterId: "nulls",
    title: "Scrambled-assignment nulls",
    caption: "Scrambled assignment asks whether the response depends on which papers were assigned to a concept.",
    altText: "Five panels of scrambled-assignment null draws in the D_I and D_P plane, with co-dominance regions and observed case-study points shown as stars.",
    layout: "wide",
    role: "primary",
    width: 3034,
    height: 1810,
  }),
  makeFigure({
    id: "fig_null_sr_random",
    chapterId: "nulls",
    title: "Special-relativity random-removal reference",
    caption: "This is the manuscript's focused random-removal panel retained for direct reference.",
    altText: "Special-relativity random-removal null cloud in the D_I and D_P plane with the observed point and joint co-dominance region.",
    layout: "standard",
    role: "reference",
    width: 1042,
    height: 934,
  }),
  makeFigure({
    id: "fig_null_sr_scrambled",
    chapterId: "nulls",
    title: "Special-relativity scrambled-assignment reference",
    caption: "This is the manuscript's focused scrambled-assignment panel retained for direct reference.",
    altText: "Special-relativity scrambled-assignment null cloud in the D_I and D_P plane with the observed point and joint co-dominance region.",
    layout: "standard",
    role: "reference",
    width: 983,
    height: 887,
  }),
  makeFigure({
    id: "fig_lee_5case",
    chapterId: "look-elsewhere",
    title: "Grid-wide look-elsewhere correction",
    caption: "The corrected comparison uses the maximum over the entire 10-concept by 11-year grid in both observed and permuted data.",
    altText: "Five look-elsewhere null distributions of the maximum joint magnitude over each concept-year grid, with the observed maximum and its concept-year annotation.",
    layout: "wide",
    role: "primary",
    width: 3033,
    height: 1757,
  }),
  makeFigure({
    id: "fig_lee_sr",
    chapterId: "look-elsewhere",
    title: "Special-relativity look-elsewhere reference",
    caption: "The manuscript's focused panel shows the special-relativity grid-wide correction.",
    altText: "Special-relativity look-elsewhere null distribution for the grid-wide maximum joint magnitude with the observed target maximum marked.",
    layout: "standard",
    role: "reference",
    width: 1077,
    height: 596,
  }),
  makeFigure({
    id: "fig_target_vs_context_mean_vs_max",
    chapterId: "context-comparison",
    title: "Target response versus typical and strongest context",
    caption: "The left panel asks whether a target exceeds typical context; the right asks whether it exceeds its strongest competitor.",
    altText: "Two log-log scatter panels comparing each target response with the mean of nine context concepts and with the strongest single context concept; both include a y equals x line.",
    layout: "wide",
    role: "primary",
    width: 1905,
    height: 1096,
  }),
];

export const archiveChapters: ArchiveChapter[] = [
  {
    id: "anchors",
    index: "01",
    eyebrow: "Chapter one",
    title: "Concept anchors and assignment geometry",
    question: "How do five written paraphrases become one anchor, and when is a paper assigned to it?",
    result: "Each anchor is the L2-normalized mean of five paraphrase embeddings. A paper is assigned to its closest anchor only if it clears both that concept's 0.60-quantile similarity threshold and its confusion-aware margin threshold.",
    conclusion: "The anchor combines multiple descriptions rather than using one phrase alone. The margin requirement rejects papers that are similarly close to competing concepts; averaging does not guarantee higher assignment overlap.",
    caveat: "The complete 50-concept reference records the descriptions, aliases, and paraphrases used by the pipeline.",
    figureIds: [
      "fig_anchor_assignment_sr_signal_detection",
      "fig_anchor_assignment_higgs",
      "fig_anchor_assignment_godel",
      "fig_anchor_assignment_deep_learning",
      "fig_anchor_assignment_attention",
    ],
  },
  {
    id: "calibration",
    index: "02",
    published: false,
    eyebrow: "Chapter two",
    title: "Assignment calibration and stability",
    question: "How is the margin threshold chosen, and does that choice leave the result dependent on a few papers?",
    result: "The rule is tau(c) = f_knee * (1 - s_nn(c)). Across targets, nearest-anchor similarity ranges from about 0.898 to 0.927, while assigned-paper counts range from 16 to 1,408.",
    conclusion: "Closely spaced anchors require a confusion-aware margin; different assignment counts primarily reflect different corpus sizes.",
    caveat: "The special-relativity jackknife is a stability diagnostic, not a substitute for the null tests below.",
    figureIds: [
      "fig_fknee_selection_5case",
      "fig_fknee_selection_sr",
      "fig_youden_curves_ci_5case",
      "fig_youden_curve_ci_sr",
      "fig_jackknife_sr",
    ],
  },
  {
    id: "nulls",
    index: "03",
    eyebrow: "Chapter three",
    title: "Two-dimensional null distributions",
    question: "Is each joint response larger than expected after controlling for ablated-set size and paper identity?",
    result: "Random removal controls set size; scrambled assignment controls which papers carry a label. The paper's co-dominance test counts null draws whose absolute deviations from the null mean are at least as large as the observation's on both D_I and D_P. It is two-sided on each axis and does not require a covariance-matrix estimate.",
    conclusion: "The two nulls address different explanations for the observed response and are therefore reported separately.",
    caveat: "The Higgs response remains an assignment artifact even though it passes these null tests. Entries marked < 2e-4 indicate the finite-permutation reporting floor, not a zero probability.",
    figureIds: [
      "fig_null_grid_random_5case",
      "fig_null_grid_scrambled_5case",
      "fig_null_sr_random",
      "fig_null_sr_scrambled",
    ],
  },
  {
    id: "look-elsewhere",
    index: "04",
    eyebrow: "Chapter four",
    title: "Look-elsewhere effect and ranking robustness",
    question: "Does the result survive scanning the full concept-year grid, and does the target ranking depend on the chosen summary statistic?",
    result: "Special relativity and Gödel rank first under all three summaries; the nominal first-place Higgs result remains an assignment artifact. Deep learning ranks first under the maximum norm and directional p_2D, but second under ||D||_2 in a near-tie with graphical models. Attention remains non-leading. The supplementary p_2D ranking uses the observation's direction on each axis, unlike the paper's primary two-sided co-dominance test.",
    conclusion: "Ranking is broadly similar across these summaries, but is not identical. Special relativity survives the grid-wide correction; the nominal Higgs result inherits the assignment artifact and carries no independent evidential weight.",
    caveat: "For Gödel, deep learning, and attention, the grid-wide maximum occurs away from both the target concept and target pivot. Their p_global values test the most extreme cell anywhere in the grid, not the target cell.",
    figureIds: ["fig_lee_5case", "fig_lee_sr"],
  },
  {
    id: "context-comparison",
    index: "05",
    eyebrow: "Chapter five",
    title: "Target concept versus surrounding concepts",
    question: "Does a target exceed the typical surrounding concept, and does it also exceed the strongest competitor?",
    result: "The mean of nine contexts and the maximum single context are deliberately shown in separate panels on shared log-log axes.",
    conclusion: "The first panel compares the target with typical context. The second applies the stricter comparison with the strongest competitor.",
    caveat: "The Higgs point is retained to show the nominal measurement. Its large response is caused by pre-pivot sparsity and a misassigned paper, not evidence for a stronger conceptual reorganization.",
    figureIds: ["fig_target_vs_context_mean_vs_max"],
  },
];

const publishedChapterEyebrows = [
  "Chapter one",
  "Chapter two",
  "Chapter three",
  "Chapter four",
] as const;

export const publishedArchiveChapters: ArchiveChapter[] = archiveChapters
  .filter((chapter) => chapter.published !== false)
  .map((chapter, index) => ({
    ...chapter,
    index: String(index + 1).padStart(2, "0"),
    eyebrow: publishedChapterEyebrows[index] ?? `Chapter ${index + 1}`,
  }));

const publishedChapterIds = new Set(
  publishedArchiveChapters.map((chapter) => chapter.id),
);

export const publishedArchiveFigures = archiveFigures.filter((figure) =>
  publishedChapterIds.has(figure.chapterId),
);
