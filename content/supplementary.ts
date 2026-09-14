import { PAPER_SOURCE_COMMIT } from "./paper-snapshot";

const repositoryAtCommit = `https://github.com/dntounis/mapping_innovation_latex/blob/${PAPER_SOURCE_COMMIT}`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const supplementaryAsset = (file: string) => `${basePath}/supplementary/${file}`;

export interface SupplementaryItem {
  id: string;
  published: boolean;
  layout: "panoramic" | "standard";
  eyebrow: string;
  title: string;
  description: string;
  whyItMatters: string;
  imagePath: string;
  width?: number;
  height?: number;
  imageAlt: string;
  sourcePath: string;
  sourceUrl: string;
  pdfPath?: string;
  equation?: string;
  details?: readonly string[];
}

export const supplementaryItems: readonly SupplementaryItem[] = [
  {
    id: "assignment-thresholds",
    published: false,
    layout: "panoramic",
    eyebrow: "Assignment calibration",
    title: "Selecting the assignment margin across five cases.",
    description:
      "Kneedle selects f_knee from the target response curve. The margin for each concept is scaled by its separation from the nearest competing anchor, rather than fixed at 0.013 for every concept.",
    whyItMatters:
      "A paper must have this concept as its closest anchor, exceed the 60th-percentile similarity threshold among papers closest to that anchor, and meet the margin requirement. For special relativity, f_knee = 0.25 gives a target margin of approximately 0.0222. The nominal Higgs response remains an assignment artifact, not evidence for conceptual reorganization.",
    equation: String.raw`\tau(c)=f_{\mathrm{knee}}\,[1-s_{\mathrm{nn}}(c)]`,
    imagePath: supplementaryAsset("margin-scale-selection.png"),
    pdfPath: supplementaryAsset("margin-scale-selection.pdf"),
    width: 2100,
    height: 1153,
    imageAlt:
      "Five case-study response curves against confusion fraction, with stars marking the selected Kneedle operating points and surrounding-concept responses shown for comparison.",
    sourcePath:
      "outputs/for_website/fig_fknee_selection_5case.png",
    sourceUrl: "https://github.com/dntounis/mapping_innovation/blob/c41071102792a8bbd93018cb6eca33917e542427/outputs/for_website/fig_fknee_selection_5case.png",
  },
  {
    id: "concept-count-robustness",
    published: true,
    layout: "panoramic",
    eyebrow: "Granularity",
    title: "The response depends on the available concept set.",
    description:
      "We repeat the analysis with 5, 8, and 10 expert-defined concepts. Bar heights show the target's response, max(|D_I|, |D_P|), at the published pivot (the year separating the before-and-after comparison), holding f_knee fixed. Labels give its rank among concepts with a measurable response, not among all concepts included: 1/3 means first among three measurable responses. Hatching marks an undefined response, not zero.",
    whyItMatters:
      "Special relativity ranks first among 3 measurable concepts at N = 8 and 6 at N = 10. At N = 5, removing the target leaves too few active concepts for the geometry, so the response and rank are undefined. The nominal Higgs response remains an assignment artifact, not historical evidence.",
    details: [
      "Each set contains the target and the first N − 1 context concepts in alphabetical order, so composition and count change together. Paper assignments are recomputed for each set. A concept can therefore receive papers at one N but none at another. Radiation/quantum enters the set at N = 8; spectroscopy and thermodynamics enter at N = 10.",
      "A measurable response requires assigned papers and enough time windows in which both the original and the concept-removed geometry can be calculated. The implemented geometry needs at least two active concepts in a window, and the standardized before-and-after comparison needs at least two valid windows on each side of the pivot. No assigned papers and too few valid comparison windows are different reasons for an undefined response. Neither is treated as a measured zero or included in the ranking.",
      "Special relativity, N = 5: gravitation has no assigned papers. Special relativity and electron theory have assigned papers, but removing either leaves too few active concepts to calculate the post-pivot geometry. The matched comparison retains seven pre-pivot and no post-pivot windows for special relativity, and three pre-pivot and no post-pivot windows for electron theory. Only aether optics and electrodynamics have defined responses; the target itself cannot be ranked.",
      "Special relativity, N = 8: gravitation, instrumentation/measurement, and mechanics/time measurement have no assigned papers. Aether optics and electrodynamics each have one assigned paper, but their concept-removal comparisons retain only one valid pre-pivot window each (and 17 post-pivot windows), which is insufficient. The three ranked concepts are special relativity, electron theory, and radiation/quantum. The label 1/3 therefore means first among these three, not first among all eight configured concepts.",
      "Special relativity, N = 10: gravitation, instrumentation/measurement, mechanics/time measurement, and radiation/quantum have no assigned papers under this configuration. The six ranked concepts are special relativity, aether optics, electrodynamics, electron theory, spectroscopy, and thermodynamics/kinetic theory. The label 1/6 means first among these six. Aether optics and electrodynamics now have enough valid comparison windows, although each still has only one assigned paper: measurability depends on the surrounding geometry and temporal coverage, not paper count alone.",
      "Among ten sampled margin scales, special relativity never ranks first at N = 5 and ranks first at N = 8 only at f = 0.25. These are discrete samples, not a test of every margin scale or every possible concept subset. Gödel and deep learning rank first at N = 8 and 10; attention remains at ranks 3–4.",
    ],
    imagePath: supplementaryAsset("concept-count-robustness-v4.png"),
    pdfPath: supplementaryAsset("concept-count-robustness-v4.pdf"),
    width: 2326,
    height: 1036,
    imageAlt:
      "Target responses across five cases for 5, 8, and 10 concepts. Special relativity at 5 concepts is hatched as undefined; the other SR bars are ranked first among 3 and 6 measurable concepts. Higgs bars show a known assignment artifact.",
    sourcePath:
      "gs_robustness_rerun_2026-09-11_rev2/figures/fig_n_concepts_robustness_v4.png",
    sourceUrl: supplementaryAsset("archive/data/concept-count-robustness-v4.json"),
  },
  {
    id: "paraphrase-stability",
    published: true,
    layout: "panoramic",
    eyebrow: "Semantic stability",
    title: "Does changing the description change which papers are selected?",
    description:
      "If we describe the same scientific concept using different words, does the method select the same papers? We test five descriptions of each concept, both individually and in combinations. The vertical axis measures overlap between the selected paper lists: 0 means no shared papers and 1 means identical lists. Each case-study group summarizes multiple concepts, not just the target named on the horizontal axis. Fractions above the bars show how many of the ten concepts contribute usable comparisons; unlike the concept-count plot, these labels are coverage counts, not ranks.",
    whyItMatters:
      "For Higgs, Gödel, deep learning, and attention, combining two or three descriptions gives more consistent paper lists than using individual descriptions, when comparing the same measurable concepts. For special relativity, individual-description comparisons cover only 1 of 10 concepts, versus 5 when comparing combinations of two and three descriptions: those bars are not a matched comparison. Agreement tests sensitivity to wording, not whether the selected papers are historically correct.",
    details: [
      "Jaccard overlap is the number of papers shared by two lists divided by the number of distinct papers appearing in either list. For example, lists containing papers A, B, C and B, C, D share two of four distinct papers, giving an overlap of 0.5. This measures agreement between selections, not the fraction of scientifically correct assignments.",
      "A paraphrase is one of the five descriptions of a concept. We combine descriptions by averaging their embedding vectors, then use the resulting vector to select papers. Orange bars compare one description with another. Blue bars compare one description with the other four combined. Black bars compare two descriptions combined with the remaining three combined; the two groups share no descriptions.",
      "The hollow green bars compare four descriptions combined with all five. This asks how much the selection changes when one description is omitted. Because the two sides share four descriptions, high overlap here is not independent evidence that different descriptions produce the same assignments.",
      "For each concept, we average the overlap over the usable comparisons. Bars show the median of those concept-level averages; whiskers show the interquartile range across concepts. Comparisons in which both lists are empty are excluded because they provide no selected papers to compare. If only one list is empty, the overlap is zero. A concept contributes to a bar only if at least one comparison remains.",
      "Assignment rule used in the paper: a nearest-anchor-group 60th-percentile similarity threshold and a confusion-aware margin tau(c), with f_knee fixed per case. Only the anchor under study varies; the other nine retain their full five-paraphrase anchors. Thresholds and margins are recomputed for each variant.",
      "The numbers in parentheses in the legend count comparisons per concept: up to 10 single-paraphrase pairs, 5 unordered 1-versus-4 splits, and 10 unordered 2-versus-3 splits. The fractions above bars instead count contributing concepts. For special relativity, these are 1/10 for orange, 6/10 for blue, 5/10 for black, and 6/10 for hollow green. The sole contributing concept for the orange bar is electron theory, not special relativity itself. Differences between these bars therefore combine differences in description choice and concept coverage; they are not a matched comparison across the same concepts.",
      "The corrected comparison excludes empty-versus-empty pairs and counts each unordered split once, regardless of its original orientation. The earlier assignment-rule comparison remains in the downloadable source data; only the assignment rule used in the paper is shown here.",
    ],
    imagePath: supplementaryAsset("paraphrase-stability-manuscript-rule.png"),
    pdfPath: supplementaryAsset("paraphrase-stability-manuscript-rule.pdf"),
    width: 1789,
    height: 1344,
    imageAlt:
      "Assignment rule used in the paper: Jaccard overlap for single paraphrases, 1-versus-4 and 2-versus-3 splits, and leave-one-out anchors. Labels show reduced concept coverage; special relativity has only one concept for single-paraphrase comparisons versus five for 2-versus-3 splits, so those bars are not a matched comparison.",
    // Manuscript-rule-only rendering of this reviewed source; see scripts/plot-semantic-stability.py.
    sourcePath:
      "gs_robustness_rerun_2026-09-11_rev2/figures/fig_paraphrase_jaccard_v2.png",
    sourceUrl: supplementaryAsset("archive/data/paraphrase-stability-v2-rev2.json"),
  },
  {
    id: "contamination-diagnostics",
    published: false,
    layout: "panoramic",
    eyebrow: "Alternative diagnostics",
    title: "Contamination checks expose metric-specific failure modes.",
    description:
      "Alternative similarity and separation measures show where apparently strong target effects are also compatible with lexical leakage or heterogeneous assignments.",
    whyItMatters:
      "The figure turns a limitation into an audit trail: surprising historical claims must first survive assignment diagnostics.",
    imagePath: supplementaryAsset("contamination-diagnostics.png"),
    imageAlt:
      "Cross-case comparison of alternative contamination and concept-separation diagnostics.",
    sourcePath:
      "outputs/cross_case_figures/fig_contamination_alt_metrics.png",
    sourceUrl: `${repositoryAtCommit}/outputs/cross_case_figures/fig_contamination_alt_metrics.png`,
  },
] as const;

export const publishedSupplementaryItems = supplementaryItems.filter(
  (item) => item.published,
);
