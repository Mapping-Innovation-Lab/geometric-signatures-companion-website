import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const snapshotPath = new URL("../content/paper-snapshot.ts", import.meta.url);

test("uses _3D.tex and its revised provisional values", async () => {
  const source = await readFile(snapshotPath, "utf8");
  assert.match(source, /paper\/sr_signal_detection_3D\.tex/);
  assert.match(source, /Geometric Signatures of Conceptual Reorganization/);
  assert.match(source, /numeric\(16152, "16,152"/);
  assert.match(source, /numeric\(1044, "1,044"/);
  assert.match(source, /lower: 6\.57/);
  assert.match(source, /upper: 11\.42/);
  assert.doesNotMatch(source, /paper\/sr_signal_detection\.tex/);
  assert.doesNotMatch(source, /numeric\(20152, "20,152"/);
});

test("stores all three permutation tests for every case", async () => {
  const source = await readFile(snapshotPath, "utf8");
  assert.equal((source.match(/randomRemoval:/g) ?? []).length, 5);
  assert.equal((source.match(/scrambledAssignment:/g) ?? []).length, 5);
  assert.equal((source.match(/lookElsewhere:/g) ?? []).length, 5);
});

const expectedFigures = [
  ["method-six-stage", "method-overview.png", "outputs/schematics/fig_method_overview_v3.pdf", "fig:overview"],
  ["validation-three-tests", "validation-suite.png", "outputs/schematics/core_validation_tests_detailed_final.pdf", "fig:validation_suite"],
  ["cross-case-rankings", "cross-case-rankings.png", "outputs/cross_case_figures/fig_all_rankings.pdf", "fig:crosscase"],
  ["target-vs-context", "target-vs-context.png", "outputs/cross_case_figures/fig_target_vs_context.pdf", "fig:targetcontext"],
  ["model-independence", "model-independence.png", "outputs/cross_case_figures/fig_model_independence.pdf", "fig:modelindep"],
  ["sr-concept-year-grid", "sr-concept-year-grid.png", "outputs/special_relativity/validation/concept_year_grid/concept_year_grid_total_inertia.pdf", "fig:grid"],
  ["sr-random-null", "sr-random-null.png", "outputs/gen009_2d_robustness/sr_null_random_2d.pdf", "fig:null"],
  ["sr-scrambled-null", "sr-scrambled-null.png", "outputs/gen009_2d_robustness/sr_null_scrambled_2d.pdf", "fig:scrambled"],
  ["sr-leave-one-out", "sr-leave-one-out.png", "outputs/gen009_2d_robustness/sr_loo_2d.pdf", "fig:loo"],
  ["look-elsewhere", "sr-look-elsewhere.png", "outputs/special_relativity/validation/look_elsewhere_2d/lee2d_distribution.pdf", "fig:lee"],
  ["higgs-concept-year-grid", "higgs-concept-year-grid.png", "outputs/higgs/validation/concept_year_grid/concept_year_grid_combined.pdf", "fig:higgs_grid"],
  ["godel-concept-year-grid", "godel-concept-year-grid.png", "outputs/godel/validation/concept_year_grid/concept_year_grid_combined.pdf", "fig:godel_grid"],
  ["deep-learning-concept-year-grid", "deep-learning-concept-year-grid.png", "outputs/deep_learning/validation/concept_year_grid/concept_year_grid_combined.pdf", "fig:dl_grid"],
  ["attention-concept-year-grid", "attention-concept-year-grid.png", "outputs/attention/validation/concept_year_grid/concept_year_grid_combined.pdf", "fig:attn_grid"],
];

async function loadContentModule(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
  return import(moduleUrl);
}

async function loadFigureInventory() {
  return loadContentModule("../content/figures.ts");
}

test("figure inventory maps the approved _3D.tex assets to stable fallbacks", async () => {
  const { figures } = await loadFigureInventory();

  assert.deepEqual(Object.keys(figures), expectedFigures.map(([id]) => id));
  for (const [id, fileName, sourceAsset, manuscriptLabel] of expectedFigures) {
    const figure = figures[id];
    assert.equal(figure.id, id);
    assert.equal(figure.sourceAsset, sourceAsset);
    assert.equal(figure.manuscriptLabel, manuscriptLabel);
    assert.equal(figure.staticFallback, `/figures/${fileName}`);
    assert.equal(figure.status, "provisional");
    assert.equal(figure.source.path, "paper/sr_signal_detection_3D.tex");
    assert.equal(figure.source.locator, `Figure ${manuscriptLabel}`);
    assert.ok(figure.caption.length > 40);
    assert.ok(figure.altText.length > 20);
  }

  const inventoryText = JSON.stringify(figures);
  assert.doesNotMatch(inventoryText, /fig_method_overview_v2|mean displacement|scoring oracle/i);
});

test("maps every case route to its active concept-year evidence", async () => {
  const { caseGridFigureIds } = await loadFigureInventory();

  assert.deepEqual(caseGridFigureIds, {
    "special-relativity": "sr-concept-year-grid",
    "higgs-mechanism": "higgs-concept-year-grid",
    "godel-incompleteness": "godel-concept-year-grid",
    "deep-learning": "deep-learning-concept-year-grid",
    "attention-mechanism": "attention-concept-year-grid",
  });
});

test("validation figure copy names the current joint statistics", async () => {
  const { figures } = await loadFigureInventory();
  const randomCopy = `${figures["sr-random-null"].caption} ${figures["sr-random-null"].altText}`;
  const scrambledCopy = `${figures["sr-scrambled-null"].caption} ${figures["sr-scrambled-null"].altText}`;
  const lookElsewhereCopy = `${figures["look-elsewhere"].caption} ${figures["look-elsewhere"].altText}`;

  assert.match(randomCopy, /joint \(D_I, D_P\) plane/i);
  assert.match(randomCopy, /co-dominance/i);
  assert.match(scrambledCopy, /joint \(D_I, D_P\) plane/i);
  assert.match(scrambledCopy, /co-dominance/i);
  assert.match(lookElsewhereCopy, /grid-maximum L2 statistic/i);
  assert.match(lookElsewhereCopy, /sqrt\(D_I\^2 \+ D_P\^2\)/i);
});

function collectProvisionalNumericRecords(value, records = []) {
  if (!value || typeof value !== "object") return records;
  if (
    value.status === "provisional" &&
    typeof value.value === "number" &&
    typeof value.formatted === "string" &&
    value.source?.path === "paper/sr_signal_detection_3D.tex"
  ) {
    records.push(value);
  }
  for (const child of Object.values(value)) collectProvisionalNumericRecords(child, records);
  return records;
}

function collectStrings(value, strings = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach((child) => collectStrings(child, strings));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((child) => collectStrings(child, strings));
  }
  return strings;
}

function orphanScientificNumberViolations(figures, paperSnapshot) {
  const records = collectProvisionalNumericRecords(paperSnapshot.cases);
  const numericValues = new Set();
  const formattedValues = new Set();

  for (const record of records) {
    if (!Number.isInteger(record.value) || Math.abs(record.value) >= 10) {
      numericValues.add(record.value);
    }
    if (record.formatted !== String(record.value) || numericValues.has(record.value)) {
      formattedValues.add(record.formatted.replace(/\s+/g, " ").trim());
    }
    for (const bound of [record.uncertainty?.lower, record.uncertainty?.upper]) {
      if (typeof bound === "number") numericValues.add(bound);
    }
    if (record.uncertainty?.formatted) {
      formattedValues.add(record.uncertainty.formatted.replace(/\s+/g, " ").trim());
    }
  }

  const metadataText = collectStrings(figures).join(" \n ").replace(/\s+/g, " ").trim();
  const violations = new Set();
  for (const formatted of formattedValues) {
    if (metadataText.includes(formatted)) violations.add(formatted);
  }
  for (const match of metadataText.matchAll(/[+−-]?\d[\d,]*(?:\.\d+)?/g)) {
    const parsed = Number(match[0].replace("−", "-").replaceAll(",", ""));
    if (numericValues.has(parsed)) violations.add(String(parsed));
  }
  return [...violations].sort();
}

test("figure metadata leaves every nontrivial typed provisional value in the paper snapshot", async () => {
  const { figures } = await loadFigureInventory();
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");

  assert.deepEqual(orphanScientificNumberViolations(figures, paperSnapshot), []);
});

test("figure metadata also rejects superseded or unstructured analysis literals", async () => {
  const { figures } = await loadFigureInventory();

  assert.doesNotMatch(
    JSON.stringify(figures),
    /(?:\b7\.62\b|\b2\.30\b|\b1\.44\b|\b10\s*(?:×|x|\\times)\s*11\b)/i,
  );
});

test("orphan-number guard derives every nontrivial needle from the typed snapshot", async () => {
  const { figures } = await loadFigureInventory();
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");
  const authoritativeNeedles = [
    ...new Set(
      collectProvisionalNumericRecords(paperSnapshot.cases)
        .filter(
          (record) =>
            !Number.isInteger(record.value) ||
            Math.abs(record.value) >= 10 ||
            record.formatted !== String(record.value),
        )
        .flatMap((record) =>
          [record.formatted, record.uncertainty?.formatted].filter(Boolean),
        ),
    ),
  ];

  assert.deepEqual(orphanScientificNumberViolations(figures, paperSnapshot), []);
  assert.ok(authoritativeNeedles.length > 20);
  for (const needle of authoritativeNeedles) {
    const mutant = structuredClone(figures);
    mutant["higgs-concept-year-grid"].caption += ` Provisional result: ${needle}.`;
    assert.notDeepEqual(
      orphanScientificNumberViolations(mutant, paperSnapshot),
      [],
      `Guard missed typed provisional value ${needle}`,
    );
  }
});

test("case slugs match the manuscript snapshot before public routes are derived", async () => {
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");
  const expectedSlugs = [
    "special-relativity",
    "higgs-mechanism",
    "godel-incompleteness",
    "deep-learning",
    "attention-mechanism",
  ];

  assert.deepEqual(paperSnapshot.cases.map(({ slug }) => slug), expectedSlugs);
  const publicCaseRoutes = paperSnapshot.cases.map(({ slug }) => `/cases/${slug}`);
  assert.deepEqual(publicCaseRoutes, expectedSlugs.map((slug) => `/cases/${slug}`));
});

test("the typed provisional snapshot exactly transcribes _3D.tex corpora and cross-case tables", async () => {
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");

  assert.equal(
    paperSnapshot.manuscript.title,
    "Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding Framework for Detecting Scientific Revolutions",
  );
  assert.deepEqual(
    paperSnapshot.authors.map(({ name }) => name),
    ["Dimitris Ntounis", "Ariel Schwartzman", "Chris Chafe", "Thomas A. Ryckman"],
  );
  assert.equal(paperSnapshot.manuscript.mainTexPath, "paper/sr_signal_detection_3D.tex");
  assert.equal(paperSnapshot.manuscript.status, "provisional");
  assert.equal(paperSnapshot.manuscript.webSummary.status, "provisional");

  const projectedCases = paperSnapshot.cases.map((study) => ({
    slug: study.slug,
    corpus: [
      study.corpus.documents?.value,
      study.corpus.assignedDocuments?.value,
      study.corpus.targetDocuments.value,
      study.corpus.timeSpan.start.value,
      study.corpus.timeSpan.end.value,
      study.corpus.rollingWindowRadiusYears.value,
    ],
    results: [
      study.results.pivotYear.value,
      study.results.targetRank.value,
      study.results.effectByMetric["total-inertia"].value,
      study.results.effectByMetric["mean-pairwise-distance"].value,
      study.results.maxAbsoluteEffect.value,
      study.results.confusionFraction.value,
      study.results.validation.randomRemoval.pValue.value,
      study.results.validation.scrambledAssignment.pValue.value,
      study.results.validation.lookElsewhere.pValue.value,
    ],
  }));

  assert.deepEqual(projectedCases, [
    {
      slug: "special-relativity",
      corpus: [2314, 62, 16, 1880, 1920, 2],
      results: [1902, 1, 7.61, -0.36, 7.61, 0.25, 0.0002, 0.0002, 0.0008],
    },
    {
      slug: "higgs-mechanism",
      corpus: [27591, 746, 108, 1955, 1980, 2],
      results: [1959, 1, -3.25, -14.57, 14.57, 0.3, 0.0002, 0.0002, 0.02],
    },
    {
      slug: "godel-incompleteness",
      corpus: [599, 101, 34, 1900, 1970, 2],
      results: [1937, 1, 0.5, 2.5, 2.5, 0.1, 0.0002, 0.0006, 0.15],
    },
    {
      slug: "deep-learning",
      corpus: [16152, 4053, 1044, 2005, 2018, 1],
      results: [2011, 1, -1.55, -3.13, 3.13, 0.12, 0.023, 0.0002, 0.088],
    },
    {
      slug: "attention-mechanism",
      corpus: [37598, 2715, 63, 2005, 2023, 1],
      results: [2012, 4, 1.64, 0.9, 1.64, 0.25, 0.0008, 0.016, 0.97],
    },
  ]);

  const specialRelativity = paperSnapshot.cases[0];
  assert.deepEqual(specialRelativity.results.maxAbsoluteEffect.uncertainty, {
    kind: "bootstrap-interval",
    lower: 6.57,
    upper: 11.42,
    level: 0.95,
    formatted: "95% bootstrap CI [6.57, 11.42]",
  });

  for (const study of paperSnapshot.cases) {
    const numericRecords = [
      study.corpus.documents,
      study.corpus.assignedDocuments,
      study.corpus.targetDocuments,
      study.corpus.timeSpan.start,
      study.corpus.timeSpan.end,
      study.corpus.rollingWindowRadiusYears,
      study.results.pivotYear,
      study.results.targetRank,
      ...Object.values(study.results.effectByMetric),
      study.results.maxAbsoluteEffect,
      study.results.confusionFraction,
      study.results.validation.randomRemoval.pValue,
      study.results.validation.randomRemoval.permutations,
      study.results.validation.scrambledAssignment.pValue,
      study.results.validation.scrambledAssignment.permutations,
      study.results.validation.lookElsewhere.pValue,
      study.results.validation.lookElsewhere.permutations,
    ].filter(Boolean);
    for (const record of numericRecords) {
      assert.equal(record.status, "provisional");
      assert.equal(record.source.path, "paper/sr_signal_detection_3D.tex");
      assert.ok(record.source.locator);
    }
    assert.deepEqual(
      [
        study.results.validation.randomRemoval.permutations.value,
        study.results.validation.scrambledAssignment.permutations.value,
        study.results.validation.lookElsewhere.permutations.value,
      ],
      [5000, 5000, 5000],
    );
  }

  const attention = paperSnapshot.cases.at(-1);
  assert.ok(attention.results.validation.scrambledAssignment.pValue.value < 0.05);
  assert.ok(attention.results.validation.lookElsewhere.pValue.value >= 0.05);
  assert.doesNotMatch(attention.caveats.join(" "), /scrambled-assignment|look-elsewhere/i);
});

test("corpus windows are atomic sourced provisional numeric records", async () => {
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");
  const assertWindowRecord = (record) => {
    assert.equal(record.status, "provisional");
    assert.equal(record.source.path, "paper/sr_signal_detection_3D.tex");
    assert.equal(record.source.locator, "Table tab:corpora");
    assert.equal(record.formatted, String(record.value));
  };

  for (const study of paperSnapshot.cases) {
    const { start, end } = study.corpus.timeSpan;
    const radius = study.corpus.rollingWindowRadiusYears;
    for (const record of [start, end, radius]) {
      assertWindowRecord(record);
    }
    assert.equal(start.unit, "year");
    assert.equal(end.unit, "year");
    assert.equal(radius.unit, "years");
  }

  const mutant = structuredClone(paperSnapshot.cases[0].corpus);
  mutant.timeSpan.start = mutant.timeSpan.start.value;
  assert.throws(() => assertWindowRecord(mutant.timeSpan.start));
});

test("derived validation copy updates atomically from structured case results", async () => {
  const snapshotModule = await loadContentModule("../content/paper-snapshot.ts");
  const {
    deriveCrossCaseLookElsewhereConclusion,
    deriveValidationOutcomeSummary,
    paperSnapshot,
  } = snapshotModule;

  assert.equal(typeof deriveCrossCaseLookElsewhereConclusion, "function");
  assert.equal(typeof deriveValidationOutcomeSummary, "function");

  const conclusion = deriveCrossCaseLookElsewhereConclusion(paperSnapshot.cases);
  assert.equal(
    conclusion.text,
    "At the five-percent level, the current global look-elsewhere survivors are: Special relativity and Higgs mechanism.",
  );
  assert.equal(conclusion.status, "provisional");
  assert.equal(conclusion.source.locator, "Table tab:crosscase");
  assert.equal(conclusion.threshold.value, 0.05);
  assert.equal(conclusion.threshold.status, "provisional");
  assert.equal(conclusion.threshold.source.path, "paper/sr_signal_detection_3D.tex");

  const changedCases = structuredClone(paperSnapshot.cases);
  changedCases[2].results.validation.lookElsewhere.pValue.value = 0.01;
  assert.match(
    deriveCrossCaseLookElsewhereConclusion(changedCases).text,
    /Special relativity, Higgs mechanism, and Gödel incompleteness/,
  );

  const attention = paperSnapshot.cases.find(({ slug }) => slug === "attention-mechanism");
  const attentionSummary = deriveValidationOutcomeSummary(attention);
  assert.equal(
    attentionSummary.text,
    "The current signal passes the joint random-removal test, passes the joint scrambled-assignment test, and does not survive the global look-elsewhere test.",
  );
  assert.equal(attentionSummary.status, "provisional");
  assert.equal(attentionSummary.source.locator, "Table tab:crosscase");

  const changedAttention = structuredClone(attention);
  changedAttention.results.validation.randomRemoval.pValue.value = 0.2;
  assert.match(
    deriveValidationOutcomeSummary(changedAttention).text,
    /does not pass the joint random-removal test/,
  );

  const publishedAttention = structuredClone(attention);
  for (const result of Object.values(publishedAttention.results.validation)) {
    result.pValue.status = "published";
  }
  assert.equal(
    deriveValidationOutcomeSummary(publishedAttention).status,
    "provisional",
    "The provisional decision threshold must participate in derived-copy status",
  );
});

test("citation display treatments truthfully describe translations and abbreviations", async () => {
  const { paperSnapshot } = await loadContentModule("../content/paper-snapshot.ts");

  assert.deepEqual(
    paperSnapshot.citations.map(({ bibtexKey, titleTreatment, authorTreatment }) => ({
      bibtexKey,
      titleTreatment,
      authorTreatment,
    })),
    [
      { bibtexKey: "einstein1905electrodynamics", titleTreatment: "editorial-translation", authorTreatment: "complete" },
      { bibtexKey: "godel1931undecidable", titleTreatment: "editorial-translation", authorTreatment: "complete" },
      { bibtexKey: "higgs1964broken", titleTreatment: "bibliography-title", authorTreatment: "complete" },
      { bibtexKey: "krizhevsky2012imagenet", titleTreatment: "bibliography-title", authorTreatment: "complete" },
      { bibtexKey: "vaswani2017attention", titleTreatment: "capitalization-normalized", authorTreatment: "abbreviated" },
    ],
  );
});

test("method parameters and equations remain structured and traceable to _3D.tex", async () => {
  const { embeddingModels, methodEquations, methodParameters } = await loadContentModule(
    "../content/method.ts",
  );

  assert.deepEqual(
    Object.fromEntries(Object.entries(methodParameters).map(([id, parameter]) => [id, parameter.value])),
    {
      chunkWords: 300,
      overlapWords: 40,
      conceptCount: 10,
      paraphrasesPerAnchor: 5,
      smallerCorpusRadiusYears: 2,
      machineLearningRadiusYears: 1,
    },
  );
  assert.deepEqual(
    embeddingModels.map((model) => model.displayName),
    ["e5-base", "mxbai", "bge-m3", "SPECTER2", "MiniLM"],
  );
  assert.deepEqual(
    Object.fromEntries(Object.entries(methodEquations).map(([id, equation]) => [id, equation.latex])),
    {
      totalInertia: String.raw`d_I(t)=\sum_{c=1}^{N(t)}\left\|\mathbf{c}_c(t)-\bar{\mathbf{c}}(t)\right\|^2`,
      pairwiseDistance: String.raw`d_P(t)=\binom{N(t)}{2}^{-1}\sum_{i<j}\left(1-\cos(\mathbf{c}_i(t),\mathbf{c}_j(t))\right)`,
      ablationDelta: String.raw`\Delta(t)=g^{\mathrm{base}}(t)-g^{\mathrm{abl}}(t)`,
      cohensD: String.raw`D=\frac{\bar{\Delta}_{\mathrm{post}}-\bar{\Delta}_{\mathrm{pre}}}{s_{\mathrm{pool}}}`,
      jointCoDominance: String.raw`p_{\mathrm{co}}=\frac{1+M}{N+1}`,
      gridMaximumL2: String.raw`T_{\mathrm{LEE}}=\max_{c,t}\sqrt{D_I(c,t)^2+D_P(c,t)^2}`,
    },
  );

  for (const record of [
    ...Object.values(methodParameters),
    ...embeddingModels,
    ...Object.values(methodEquations),
  ]) {
    assert.equal(record.status, "provisional");
    assert.equal(record.source.path, "paper/sr_signal_detection_3D.tex");
    assert.match(record.source.sourceVersion, /sr_signal_detection_3D\.tex/);
  }
});
