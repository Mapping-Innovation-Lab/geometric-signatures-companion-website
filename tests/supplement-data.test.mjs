import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadContentModule(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  return loadTranspiledModule(source);
}

async function loadTranspiledModule(source) {
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
  return import(moduleUrl);
}

async function loadSupplementSource(transform = (source) => source) {
  const source = await readFile(new URL("../content/supplement/source.ts", import.meta.url), "utf8");
  return loadTranspiledModule(
    transform(source)
      .replace('import "server-only";\n\n', "")
      .replace('import { parseConceptAnchors } from "./concept-anchor-parser";\n', "const parseConceptAnchors = () => [];\n"),
  );
}

async function loadSourceWithReorderedPValueCases() {
  const original = 'const rankingPValues = readJson<{ cases: Record<string, PValueCase> }>("ranking_pvalues.json");';
  const reordered = `const rankingPValues = {
  cases: Object.fromEntries(
    Object.entries(readJson<{ cases: Record<string, PValueCase> }>("ranking_pvalues.json").cases).reverse(),
  ),
};`;

  return loadSupplementSource((source) => {
    assert.ok(source.includes(original), "test fixture must replace the source p-value dataset");
    return source.replace(original, reordered);
  });
}

async function loadSourceWithTauRows(rows) {
  const original =
    'const tauAssignmentSummary = readJson<unknown>("tau_assignment_summary.json");';

  return loadSupplementSource((source) => {
    assert.ok(source.includes(original), "test fixture must replace the tau source dataset");
    return source.replace(
      original,
      `const tauAssignmentSummary = ${JSON.stringify(rows)};`,
    );
  });
}

test("parses five cases, fifty concepts, and five paraphrases per concept", async () => {
  const { parseConceptAnchors } = await loadContentModule("../content/supplement/concept-anchor-parser.ts");
  const markdown = await readFile(
    new URL("../public/supplementary/archive/data/concept_anchors.md", import.meta.url),
    "utf8",
  );
  const cases = parseConceptAnchors(markdown);
  assert.equal(cases.length, 5);
  assert.deepEqual(cases.map((entry) => entry.concepts.length), [10, 10, 10, 10, 10]);
  for (const entry of cases) {
    assert.equal(entry.concepts[0].id, entry.targetConcept);
    assert.equal(entry.concepts[0].isTarget, true);
    for (const concept of entry.concepts) {
      assert.ok(concept.description.length > 80);
      assert.ok(concept.aliases.length > 0);
      assert.equal(concept.paraphrases.length, 5);
    }
  }
});

test("formats finite permutation floors without claiming zero", async () => {
  const source = await readFile(new URL("../content/supplement/source.ts", import.meta.url), "utf8");
  assert.match(source, /return isFloor \? "< 2e-4"/);
  assert.doesNotMatch(source, /return isFloor \? "0"/);
});

test("keeps p-value readers in the mandated presentation order when source object order differs", async () => {
  const { getLookElsewhereRows, getNullRows } = await loadSourceWithReorderedPValueCases();
  const expectedOrder = ["special_relativity", "higgs", "godel", "deep_learning", "attention"];

  assert.deepEqual(getNullRows().map((row) => row.caseId), expectedOrder);
  assert.deepEqual(getLookElsewhereRows().map((row) => row.caseId), expectedOrder);
});

test("derives target ranking floor provenance from source permutation counts", async () => {
  const sourceRows = JSON.parse(
    await readFile(
      new URL("../public/supplementary/archive/data/ranking_three_way.json", import.meta.url),
      "utf8",
    ),
  );
  const expectedByCase = new Map(
    sourceRows.map((row) => {
      const target = row.per_concept.find((concept) => concept.concept === row.target);
      assert.ok(target, `missing target source record for ${row.case}`);
      return [row.case, target.n_null > 0 && target.n_exceed === 0];
    }),
  );
  const { getRankingRows } = await loadSourceWithReorderedPValueCases();

  assert.deepEqual(
    getRankingRows().map((row) => row.p2DIsFloor),
    ["special_relativity", "higgs", "godel", "deep_learning", "attention"].map((caseId) =>
      expectedByCase.get(caseId),
    ),
  );
});

test("derives the ranking interpretation from target and per-concept source rows", async () => {
  const { getRankingInterpretation } = await loadSupplementSource();

  assert.deepEqual(getRankingInterpretation(), {
    deepLearning: {
      label: "Deep learning",
      targetL2: 3.488041011814904,
      targetRankL2: 2,
      competitorConcept: "graphical_models",
      competitorL2: 3.5436224628725204,
      competitorRankL2: 1,
    },
    attention: {
      label: "Attention mechanism",
      rankMaxAbsD: 4,
      rankP2D: 3,
    },
  });
});

test("normalizes tau case IDs while preserving valid source order", async () => {
  const sourceRows = JSON.parse(
    await readFile(
      new URL("../content/data/tau_assignment_summary.json", import.meta.url),
      "utf8",
    ),
  ).reverse();
  const { getTauRows } = await loadSourceWithTauRows(sourceRows);
  const rows = getTauRows();

  assert.equal(sourceRows.at(-1).case, "sr_signal_detection");
  assert.equal(rows.at(-1).caseId, "special_relativity");
  assert.deepEqual(
    rows.map((row) => row.caseId),
    ["attention", "deep_learning", "godel", "higgs", "special_relativity"],
  );
});

test("rejects a non-array tau source dataset", async () => {
  const { getTauRows } = await loadSourceWithTauRows({ case: "special_relativity" });

  assert.throws(() => getTauRows(), /tau assignment summary must be an array/i);
});

test("rejects duplicate tau cases after presentation-boundary normalization", async () => {
  const sourceRows = JSON.parse(
    await readFile(
      new URL("../content/data/tau_assignment_summary.json", import.meta.url),
      "utf8",
    ),
  );
  sourceRows.push({ ...sourceRows[0], case: "special_relativity" });
  const { getTauRows } = await loadSourceWithTauRows(sourceRows);

  assert.throws(() => getTauRows(), /duplicate tau case special_relativity/i);
});

test("requires exact expected tau case membership", async () => {
  const sourceRows = JSON.parse(
    await readFile(
      new URL("../content/data/tau_assignment_summary.json", import.meta.url),
      "utf8",
    ),
  );
  const withoutAttention = sourceRows.filter((row) => row.case !== "attention");
  const withUnexpectedCase = sourceRows.map((row) =>
    row.case === "attention" ? { ...row, case: "transformers" } : row,
  );
  const missingSource = await loadSourceWithTauRows(withoutAttention);
  const unexpectedSource = await loadSourceWithTauRows(withUnexpectedCase);

  assert.throws(() => missingSource.getTauRows(), /missing tau case attention/i);
  assert.throws(() => unexpectedSource.getTauRows(), /unexpected tau case transformers/i);
});

test("rejects tau records with missing required fields", async () => {
  const sourceRows = JSON.parse(
    await readFile(
      new URL("../content/data/tau_assignment_summary.json", import.meta.url),
      "utf8",
    ),
  );
  delete sourceRows[0].tau;
  const { getTauRows } = await loadSourceWithTauRows(sourceRows);

  assert.throws(() => getTauRows(), /tau record 1 field tau must be a finite number/i);
});
