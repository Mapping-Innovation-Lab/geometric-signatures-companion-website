import type {
  CaseStudyContent,
  CitationRecord,
  MetricDefinition,
  NumericComparator,
  NumericValue,
  PaperSnapshot,
  SourceLocator,
} from "./schema";

export const PAPER_SOURCE_COMMIT = "55ac67f9a2133c2157ef56da938fcdddb2ad62d1";
export const PAPER_SOURCE_VERSION = `paper/sr_signal_detection_3D.tex at mapping_innovation_latex commit ${PAPER_SOURCE_COMMIT} (Overleaf update 2026-08-25)`;
export const PAPER_LAST_VERIFIED = "2026-09-02";

function manuscriptSource(locator: string, kind: SourceLocator["kind"] = "manuscript"): SourceLocator {
  return {
    kind,
    path: "paper/sr_signal_detection_3D.tex",
    locator,
    sourceVersion: PAPER_SOURCE_VERSION,
    lastVerified: PAPER_LAST_VERIFIED,
  };
}

function numeric(
  value: number,
  formatted: string,
  locator: string,
  options: {
    comparator?: NumericComparator;
    unit?: string;
    caveat?: string;
  } = {},
): NumericValue {
  return {
    value,
    formatted,
    comparator: options.comparator ?? "eq",
    unit: options.unit,
    status: "provisional",
    source: manuscriptSource(locator, "table"),
    caveat: options.caveat,
  };
}

const fiveThousandPermutations = numeric(5000, "5,000", "Table tab:crosscase", {
  unit: "permutations",
});

const metrics: MetricDefinition[] = [
  {
    id: "total-inertia",
    name: "Total inertia",
    symbolLatex: String.raw`d_I(t)`,
    plainLanguage: "The total squared spread of active concept centroids around their grand centroid.",
    interpretation: "Measures whether a concept adds a new direction or redistributes the overall spread of the concept space.",
    source: manuscriptSource("Method / Counterfactual ablation / Total inertia", "equation"),
  },
  {
    id: "mean-pairwise-distance",
    name: "Mean pairwise cosine distance",
    symbolLatex: String.raw`d_P(t)`,
    plainLanguage: "The average angular separation between every pair of active concept centroids.",
    interpretation: "Measures whether a concept changes the proximity relationships among existing concepts.",
    source: manuscriptSource("Method / Counterfactual ablation / Mean pairwise cosine distance", "equation"),
  },
];

const cases: CaseStudyContent[] = [
  {
    id: "special-relativity",
    slug: "special-relativity",
    name: "Special relativity",
    shortName: "SR",
    domain: "Physics",
    historicalYear: 1905,
    historicalYearLabel: "1905",
    targetConcept: "special_rel",
    focalCitationKeys: ["einstein1905electrodynamics"],
    concentrationProfile: "concentrated",
    dek: "A strongly target-dominant signal carried by total inertia and robust to matched removals, label scrambling, and single-paper jackknife tests.",
    corpus: {
      documents: numeric(2314, "2,314", "Table tab:corpora"),
      assignedDocuments: numeric(62, "62", "Table tab:corpora"),
      targetDocuments: numeric(16, "16", "Table tab:crosscase"),
      timeSpan: {
        start: numeric(1880, "1880", "Table tab:corpora", { unit: "year" }),
        end: numeric(1920, "1920", "Table tab:corpora", { unit: "year" }),
      },
      rollingWindowRadiusYears: numeric(2, "2", "Table tab:corpora", { unit: "years" }),
    },
    results: {
      pivotYear: numeric(1902, "1902", "Table tab:crosscase", { unit: "year" }),
      targetRank: numeric(1, "#1/10", "Section Results: special relativity case study"),
      effectByMetric: {
        "total-inertia": numeric(7.61, "+7.61", "Table tab:crosscase"),
        "mean-pairwise-distance": numeric(-0.36, "−0.36", "Table tab:crosscase"),
      },
      maxAbsoluteEffect: {
        ...numeric(7.61, "7.61", "Table tab:crosscase"),
        uncertainty: {
          kind: "bootstrap-interval",
          lower: 6.57,
          upper: 11.42,
          level: 0.95,
          formatted: "95% bootstrap CI [6.57, 11.42]",
        },
      },
      validation: {
        randomRemoval: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Matched random removals are evaluated jointly on the (D_I, D_P) plane.",
        },
        scrambledAssignment: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Scrambled concept assignments are evaluated jointly on the (D_I, D_P) plane.",
        },
        lookElsewhere: {
          pValue: numeric(0.0008, "8.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "grid-maximum-l2",
          plainLanguage: "The global test compares the observed grid maximum of √(D_I² + D_P²) with permutation maxima.",
        },
      },
      confusionFraction: numeric(0.25, "0.25", "Table tab:crosscase"),
    },
    caveats: [
      "The primary signal is a collective property of the assigned concept cluster, not an estimate of one paper's causal effect.",
      "Several SR context concepts receive zero assigned papers under the confusion-aware margin.",
    ],
    source: manuscriptSource("Results: special relativity case study"),
  },
  {
    id: "higgs-mechanism",
    slug: "higgs-mechanism",
    name: "Higgs mechanism",
    shortName: "Higgs",
    domain: "Particle physics",
    historicalYear: 1964,
    historicalYearLabel: "1964",
    targetConcept: "higgs_mechanism",
    focalCitationKeys: ["higgs1964broken"],
    concentrationProfile: "diagnostic",
    dek: "A nominally large response that the current manuscript treats as an assignment diagnostic, not as supporting evidence for conceptual reorganization.",
    corpus: {
      documents: numeric(27591, "27,591", "Table tab:corpora"),
      assignedDocuments: numeric(746, "746", "Table tab:corpora"),
      targetDocuments: numeric(108, "108", "Table tab:crosscase"),
      timeSpan: {
        start: numeric(1955, "1955", "Table tab:corpora", { unit: "year" }),
        end: numeric(1980, "1980", "Table tab:corpora", { unit: "year" }),
      },
      rollingWindowRadiusYears: numeric(2, "2", "Table tab:corpora", { unit: "years" }),
    },
    results: {
      pivotYear: numeric(1959, "1959", "Table tab:crosscase", { unit: "year" }),
      targetRank: numeric(1, "#1/10", "Cross-case validation / Higgs mechanism"),
      effectByMetric: {
        "total-inertia": numeric(-3.25, "−3.25", "Table tab:crosscase"),
        "mean-pairwise-distance": numeric(-14.57, "−14.57", "Table tab:crosscase"),
      },
      maxAbsoluteEffect: numeric(14.57, "14.57", "Table tab:crosscase"),
      validation: {
        randomRemoval: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Matched random removals are evaluated jointly on the (D_I, D_P) plane.",
        },
        scrambledAssignment: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Scrambled concept assignments are evaluated jointly on the (D_I, D_P) plane.",
        },
        lookElsewhere: {
          pValue: numeric(0.02, "2.0 × 10⁻²", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "grid-maximum-l2",
          plainLanguage: "The global test compares the observed grid maximum of √(D_I² + D_P²) with permutation maxima.",
        },
      },
      confusionFraction: numeric(0.3, "0.30", "Table tab:crosscase"),
    },
    caveats: [
      "The nominal response is caused by pre-pivot sparsity: one assigned document supplies the concept centroid for all four pre-pivot observations.",
      "The historically unrelated 1956 paper concerns cosmic time in general relativity and matches the concept description through shared scalar-field and symmetry language.",
      "Removing that document lowers the response and moves the target from first to eighth, so the case is reported as an assignment diagnostic rather than supporting evidence.",
    ],
    source: manuscriptSource("Cross-case validation / Higgs mechanism"),
  },
  {
    id: "godel-incompleteness",
    slug: "godel-incompleteness",
    name: "Gödel incompleteness",
    shortName: "Gödel",
    domain: "Mathematical logic",
    historicalYear: 1931,
    historicalYearLabel: "1931",
    targetConcept: "incompleteness",
    focalCitationKeys: ["godel1931undecidable"],
    concentrationProfile: "concentrated",
    dek: "A target-dominant pairwise-distance signal that reorganizes the proximity geometry of mathematical logic.",
    corpus: {
      documents: numeric(599, "599", "Table tab:corpora"),
      assignedDocuments: numeric(101, "101", "Table tab:corpora"),
      targetDocuments: numeric(34, "34", "Table tab:crosscase"),
      timeSpan: {
        start: numeric(1900, "1900", "Table tab:corpora", { unit: "year" }),
        end: numeric(1970, "1970", "Table tab:corpora", { unit: "year" }),
      },
      rollingWindowRadiusYears: numeric(2, "2", "Table tab:corpora", { unit: "years" }),
    },
    results: {
      pivotYear: numeric(1937, "1937", "Table tab:crosscase", { unit: "year" }),
      targetRank: numeric(1, "#1/10", "Cross-case validation / Gödel incompleteness"),
      effectByMetric: {
        "total-inertia": numeric(0.5, "+0.50", "Table tab:crosscase"),
        "mean-pairwise-distance": numeric(2.5, "+2.50", "Table tab:crosscase"),
      },
      maxAbsoluteEffect: numeric(2.5, "2.50", "Table tab:crosscase"),
      validation: {
        randomRemoval: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Matched random removals are evaluated jointly on the (D_I, D_P) plane.",
        },
        scrambledAssignment: {
          pValue: numeric(0.0006, "6.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Scrambled concept assignments are evaluated jointly on the (D_I, D_P) plane.",
        },
        lookElsewhere: {
          pValue: numeric(0.15, "1.5 × 10⁻¹", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "grid-maximum-l2",
          plainLanguage: "The global test compares the observed grid maximum of √(D_I² + D_P²) with permutation maxima.",
        },
      },
      confusionFraction: numeric(0.1, "0.10", "Table tab:crosscase"),
    },
    caveats: [
      "The target passes the joint random-removal and scrambled-assignment tests but not the global look-elsewhere correction.",
      "Embedding-model dependence is stronger than for special relativity.",
    ],
    source: manuscriptSource("Cross-case validation / Gödel incompleteness"),
  },
  {
    id: "deep-learning",
    slug: "deep-learning",
    name: "Deep learning",
    shortName: "Deep learning",
    domain: "Artificial intelligence",
    historicalYear: 2012,
    historicalYearLabel: "~2012",
    targetConcept: "deep_learning",
    focalCitationKeys: ["krizhevsky2012imagenet"],
    concentrationProfile: "intermediate",
    dek: "A large, rank-one geometric shift spread across a broad literature rather than a tightly concentrated paper cluster.",
    corpus: {
      documents: numeric(16152, "16,152", "Table tab:corpora"),
      assignedDocuments: numeric(4053, "4,053", "Table tab:corpora"),
      targetDocuments: numeric(1044, "1,044", "Table tab:crosscase"),
      timeSpan: {
        start: numeric(2005, "2005", "Table tab:corpora", { unit: "year" }),
        end: numeric(2018, "2018", "Table tab:corpora", { unit: "year" }),
      },
      rollingWindowRadiusYears: numeric(1, "1", "Table tab:corpora", { unit: "years" }),
    },
    results: {
      pivotYear: numeric(2011, "2011", "Table tab:crosscase", { unit: "year" }),
      targetRank: numeric(1, "#1/10", "Cross-case validation / Deep learning"),
      effectByMetric: {
        "total-inertia": numeric(-1.55, "−1.55", "Table tab:crosscase"),
        "mean-pairwise-distance": numeric(-3.13, "−3.13", "Table tab:crosscase"),
      },
      maxAbsoluteEffect: numeric(3.13, "3.13", "Table tab:crosscase"),
      validation: {
        randomRemoval: {
          pValue: numeric(0.023, "2.3 × 10⁻²", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Matched random removals are evaluated jointly on the (D_I, D_P) plane.",
        },
        scrambledAssignment: {
          pValue: numeric(0.0002, "2.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Scrambled concept assignments are evaluated jointly on the (D_I, D_P) plane.",
        },
        lookElsewhere: {
          pValue: numeric(0.088, "8.8 × 10⁻²", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "grid-maximum-l2",
          plainLanguage: "The global test compares the observed grid maximum of √(D_I² + D_P²) with permutation maxima.",
        },
      },
      confusionFraction: numeric(0.12, "0.12", "Table tab:crosscase"),
    },
    caveats: [
      "The signal reflects a large, diffuse literature and should not be attributed to one focal publication.",
      "The case does not survive the global look-elsewhere correction in the current snapshot.",
    ],
    source: manuscriptSource("Cross-case validation / Deep learning"),
  },
  {
    id: "attention-mechanism",
    slug: "attention-mechanism",
    name: "Attention mechanism",
    shortName: "Attention",
    domain: "Artificial intelligence",
    historicalYear: 2017,
    historicalYearLabel: "~2017",
    targetConcept: "attention_mechanism",
    focalCitationKeys: ["vaswani2017attention"],
    concentrationProfile: "subfield",
    dek: "A moderate, correctly signed subfield signal embedded in a broader and more disruptive machine-learning reorganization.",
    corpus: {
      documents: numeric(37598, "37,598", "Table tab:corpora"),
      assignedDocuments: numeric(2715, "2,715", "Table tab:corpora"),
      targetDocuments: numeric(63, "63", "Table tab:crosscase"),
      timeSpan: {
        start: numeric(2005, "2005", "Table tab:corpora", { unit: "year" }),
        end: numeric(2023, "2023", "Table tab:corpora", { unit: "year" }),
      },
      rollingWindowRadiusYears: numeric(1, "1", "Table tab:corpora", { unit: "years" }),
    },
    results: {
      pivotYear: numeric(2012, "2012", "Table tab:crosscase", { unit: "year" }),
      targetRank: numeric(4, "#4/10", "Cross-case validation / Attention mechanism"),
      effectByMetric: {
        "total-inertia": numeric(1.64, "+1.64", "Table tab:crosscase"),
        "mean-pairwise-distance": numeric(0.9, "+0.90", "Table tab:crosscase"),
      },
      maxAbsoluteEffect: numeric(1.64, "1.64", "Table tab:crosscase"),
      validation: {
        randomRemoval: {
          pValue: numeric(0.0008, "8.0 × 10⁻⁴", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Matched random removals are evaluated jointly on the (D_I, D_P) plane.",
        },
        scrambledAssignment: {
          pValue: numeric(0.016, "1.6 × 10⁻²", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "joint-co-dominance",
          plainLanguage: "Scrambled concept assignments are evaluated jointly on the (D_I, D_P) plane.",
        },
        lookElsewhere: {
          pValue: numeric(0.97, "9.7 × 10⁻¹", "Table tab:crosscase"),
          permutations: fiveThousandPermutations,
          statistic: "grid-maximum-l2",
          plainLanguage: "The global test compares the observed grid maximum of √(D_I² + D_P²) with permutation maxima.",
        },
      },
      confusionFraction: numeric(0.25, "0.25", "Table tab:crosscase"),
    },
    caveats: [
      "The target ranks fourth rather than first, so the site must not present attention as the dominant reorganization in this corpus.",
    ],
    source: manuscriptSource("Cross-case validation / Attention mechanism"),
  },
];

const citations: CitationRecord[] = [
  {
    bibtexKey: "einstein1905electrodynamics",
    title: "On the Electrodynamics of Moving Bodies",
    authors: ["Albert Einstein"],
    year: 1905,
    titleTreatment: "editorial-translation",
    authorTreatment: "complete",
    source: manuscriptSource("BibTeX key einstein1905electrodynamics", "bibliography"),
  },
  {
    bibtexKey: "godel1931undecidable",
    title: "On Formally Undecidable Propositions of Principia Mathematica and Related Systems",
    authors: ["Kurt Gödel"],
    year: 1931,
    titleTreatment: "editorial-translation",
    authorTreatment: "complete",
    source: manuscriptSource("BibTeX key godel1931undecidable", "bibliography"),
  },
  {
    bibtexKey: "higgs1964broken",
    title: "Broken Symmetries and the Masses of Gauge Bosons",
    authors: ["Peter W. Higgs"],
    year: 1964,
    titleTreatment: "bibliography-title",
    authorTreatment: "complete",
    source: manuscriptSource("BibTeX key higgs1964broken", "bibliography"),
  },
  {
    bibtexKey: "krizhevsky2012imagenet",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: ["Alex Krizhevsky", "Ilya Sutskever", "Geoffrey E. Hinton"],
    year: 2012,
    titleTreatment: "bibliography-title",
    authorTreatment: "complete",
    source: manuscriptSource("BibTeX key krizhevsky2012imagenet", "bibliography"),
  },
  {
    bibtexKey: "vaswani2017attention",
    title: "Attention Is All You Need",
    authors: ["Ashish Vaswani et al."],
    year: 2017,
    titleTreatment: "capitalization-normalized",
    authorTreatment: "abbreviated",
    source: manuscriptSource("BibTeX key vaswani2017attention", "bibliography"),
  },
];

export const LOOK_ELSEWHERE_ALPHA = numeric(
  0.05,
  "five-percent",
  "Historical validation / Unified validation across historical case studies",
  { unit: "significance level" },
);

function joinCaseNames(names: readonly string[]) {
  if (names.length < 2) return names[0] ?? "none";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

function derivedStatus(values: readonly NumericValue[]) {
  if (values.some(({ status }) => status === "provisional")) return "provisional" as const;
  if (values.some(({ status }) => status === "verified")) return "verified" as const;
  return "published" as const;
}

export function deriveCrossCaseLookElsewhereConclusion(
  studies: readonly CaseStudyContent[],
) {
  if (!studies.length) throw new Error("Cross-case conclusion requires case records");
  const pValues = studies.map(
    (study) => study.results.validation.lookElsewhere.pValue,
  );
  const survivors = studies
    .filter(
      (study) =>
        study.results.validation.lookElsewhere.pValue.value <
        LOOK_ELSEWHERE_ALPHA.value,
    )
    .map(({ name }) => name);

  return {
    text: `At the five-percent level, the current global look-elsewhere survivors are: ${joinCaseNames(survivors)}.`,
    status: derivedStatus([...pValues, LOOK_ELSEWHERE_ALPHA]),
    source: pValues[0].source,
    threshold: LOOK_ELSEWHERE_ALPHA,
  };
}

export function deriveValidationOutcomeSummary(study: CaseStudyContent) {
  const { randomRemoval, scrambledAssignment, lookElsewhere } =
    study.results.validation;
  const passes = (record: NumericValue) =>
    record.value < LOOK_ELSEWHERE_ALPHA.value;
  const randomOutcome = passes(randomRemoval.pValue)
    ? "passes"
    : "does not pass";
  const scrambledOutcome = passes(scrambledAssignment.pValue)
    ? "passes"
    : "does not pass";
  const lookElsewhereOutcome = passes(lookElsewhere.pValue)
    ? "survives"
    : "does not survive";
  const pValues = [
    randomRemoval.pValue,
    scrambledAssignment.pValue,
    lookElsewhere.pValue,
  ];

  return {
    text: `The current signal ${randomOutcome} the joint random-removal test, ${scrambledOutcome} the joint scrambled-assignment test, and ${lookElsewhereOutcome} the global look-elsewhere test.`,
    status: derivedStatus([...pValues, LOOK_ELSEWHERE_ALPHA]),
    source: randomRemoval.pValue.source,
  };
}

export const paperSnapshot: PaperSnapshot = {
  manuscript: {
    title: "Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding Framework for Detecting Scientific Revolutions",
    webSummary: {
      paragraphs: [
        "This paper treats document-embedding geometry as an observable of conceptual organization. It removes the papers assigned to a candidate concept, recomputes the field’s geometry, and asks whether that perturbation changes after the concept’s historical emergence.",
        "Across retrospective case studies in physics, mathematics, and machine learning, the framework identifies geometric signatures consistent with both concentrated conceptual breakthroughs and broader distributed shifts. The Higgs case also exposes an instructive assignment failure mode. The analysis measures historical patterns; it does not establish that one paper caused a field to reorganize or prospectively predict the next breakthrough.",
      ],
      source: manuscriptSource("Abstract and Introduction"),
      status: "provisional",
    },
    statusLabel: "Near-final manuscript; structure stable, numerics provisional",
    status: "provisional",
    sourceVersion: PAPER_SOURCE_VERSION,
    receivedAt: "2026-08-25",
    lastVerified: PAPER_LAST_VERIFIED,
    mainTexPath: "paper/sr_signal_detection_3D.tex",
    bibliographyPath: "paper/references.bib",
    notes: [
      "The website must be resynchronized when the final paper or regenerated analysis outputs become available.",
      "The Overleaf export contains publication figures but not the raw plotting tables needed for fully interactive reproductions.",
      "The _3D.tex manuscript directly references fig_method_overview_v3.pdf and the two-dimensional joint validation figures; these supersede the older v2 and per-metric assets for website planning.",
      "The _3D.tex draft still contains red author notes and commented alternatives. Active TeX is the current authority; unresolved draft notes keep all scientific content provisional.",
      "The current manuscript explicitly reports the Higgs case as a diagnostic of unsupervised document assignment because a single historically unrelated 1956 document causes pre-pivot variance collapse.",
      "Geometric responses recur across encoders, but concept rankings depend on the representation. SPECTER2 assigns no documents to the Gödel target and yields no measurement, not a measured zero effect.",
    ],
  },
  authors: [
    {
      id: "dimitris-ntounis",
      name: "Dimitris Ntounis",
      affiliations: [
        "Department of Physics, Stanford University, Stanford, CA, USA",
        "SLAC National Accelerator Laboratory, Menlo Park, CA, USA",
      ],
      corresponding: true,
    },
    {
      id: "ariel-schwartzman",
      name: "Ariel Schwartzman",
      affiliations: ["SLAC National Accelerator Laboratory, Menlo Park, CA, USA"],
    },
    {
      id: "chris-chafe",
      name: "Chris Chafe",
      affiliations: ["Department of Music, Stanford University, Stanford, CA, USA"],
    },
    {
      id: "thomas-ryckman",
      name: "Thomas A. Ryckman",
      affiliations: ["Department of Philosophy, Stanford University, Stanford, CA, USA"],
    },
  ],
  metrics,
  cases,
  citations,
};
