// Reproduce the public, path-free downloads from the reviewed revision-2 package.
// Usage: node scripts/import-robustness.mjs /path/to/extracted/package
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";

assert.ok(process.argv[2], "Provide the extracted revision-2 package directory.");
const source = resolve(process.argv[2]);
const destination = new URL("../public/supplementary/archive/data/", import.meta.url);
const manifest = JSON.parse(await readFile(join(source, "manifest.json"), "utf8"));
assert.equal(manifest.generated, "2026-09-11 revision 2");
const cases = ["sr_signal_detection", "higgs", "godel", "deep_learning", "attention"];
const pick = (record, fields) => Object.fromEntries(fields.filter(key => key in record).map(key => [key, record[key]]));

for (const [study, figure, filename] of [
  ["n_concepts_sweep_v4", "fig_n_concepts_robustness_v4", "concept-count-robustness-v4.json"],
  ["paraphrase_jaccard_v2", "fig_paraphrase_jaccard_v2", "paraphrase-stability-v2-rev2.json"],
]) {
  const result = {
    study,
    version: study === "n_concepts_sweep_v4" ? 4 : 2,
    package_revision: 2,
    provenance: {
      reviewed: "2026-09-11",
      analysis_commit: manifest.environment.repo_commit,
      manuscript_commit: manifest.environment.manuscript_commit,
      package: "gs_robustness_rerun_2026-09-11_rev2",
      source_sha256: {},
    },
    notes: study === "n_concepts_sweep_v4" ? [
      "Undefined responses and ranks are null, never measured zeros. Rank denominators include defined responses only.",
      "The target plus alphabetical context concepts changes composition and count together. The production margin scale and pivot are held fixed.",
      "The SR f-scan contains ten discrete values. Higgs remains an assignment artifact, not historical evidence.",
    ] : [
      "Empty-empty comparisons are excluded; exactly one empty side has Jaccard zero.",
      "Each concept has 5 unordered 1-vs-4 and 10 unordered 2-vs-3 partitions. Corpus bars are medians of informative per-concept means; quartiles show spread, not confidence intervals.",
      "SR production single-paraphrase comparisons are available for one concept, versus five for 2-vs-3 splits; no general matched SR improvement is claimed.",
      "The report's 63/63 total is corrected to 83/83 concept-by-rule comparisons across original/production groups with at least six common concepts. Concepts recur across rules; these are not independent observations.",
      "Greater overlap measures wording stability, not assignment correctness or historical validity. Leave-one-out anchors share four inputs with the full anchor.",
    ],
    cases: {},
  };
  for (const name of cases) {
    const bytes = await readFile(join(source, "data", study, `${name}.json`));
    const hash = createHash("sha256").update(bytes).digest("hex");
    assert.equal(hash, manifest.figures[figure].source_sha256[`outputs/${name}/${study}/results.json`]);
    result.provenance.source_sha256[name] = hash;
    const data = JSON.parse(bytes);
    if (study === "n_concepts_sweep_v4") {
      result.cases[name] = {
        ...pick(data, ["case", "target", "pivot_year", "f_knee", "assignment_method", "effect_size", "ranking", "f_scan"]),
        per_N: Object.fromEntries(Object.entries(data.per_N).map(([n, record]) => [n,
          pick(record, ["N", "concepts", "f", "pivot_year", "target", "n_defined", "n_undefined", "per_concept"]),
        ])),
      };
    } else {
      result.cases[name] = {
        ...pick(data, ["case", "target", "n_documents", "model", "f_knee", "fixed_margin", "quantile", "concept_order"]),
        per_config: Object.fromEntries(Object.entries(data.per_config).map(([config, record]) => [config, {
          ...pick(record, ["corpus", "n_documents_assigned_full_anchors", "production_cluster_sizes", "tau_full_anchors"]),
          per_concept: Object.fromEntries(Object.entries(record.per_concept).map(([concept, value]) => [concept,
            pick(value, ["production_cluster_size", "summary", "single_pairs", "disjoint_splits", "loo_vs_full"]),
          ])),
        }])),
      };
    }
  }
  const serialized = `${JSON.stringify(result, null, 2)}\n`;
  assert.doesNotMatch(serialized, /\/Users\/|\/fs\/ddn\/|\/sdf\/|inputs_sha256|doc_id/);
  await writeFile(new URL(filename, destination), serialized);
  console.log(`Imported ${filename}`);
}
