import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const exportRoot = process.env.STATIC_EXPORT_DIR
  ? pathToFileURL(`${resolve(process.env.STATIC_EXPORT_DIR)}${sep}`)
  : new URL("../out/", import.meta.url);
const exported = (path) => new URL(path, exportRoot);

const html = await readFile(exported("index.html"), "utf8");
const archiveHtml = await readFile(exported("supplement/index.html"), "utf8");
await access(exported("supplement/concept-anchors/index.html"));

assert.match(html, /id=["']supplementary["']/);
// The concise homepage omits the detailed Higgs paragraph. Where the nominal
// result is displayed in the supplement, its scientific qualification stays.
assert.match(archiveHtml, /Higgs response remains an assignment artifact/i);
assert.doesNotMatch(html, /rank-one bridging signal/i);
assert.doesNotMatch(
  html,
  /contamination checks expose metric-specific failure modes/i,
);

if (basePath) {
  assert.match(html, new RegExp(`${basePath.replaceAll("/", "\\/")}\\/_next\\/`));
}

for (const asset of [
  "concept-count-robustness-v4.png",
  "concept-count-robustness-v4.pdf",
  "paraphrase-stability-manuscript-rule.png",
  "paraphrase-stability-manuscript-rule.pdf",
]) {
  await access(exported(`supplementary/${asset}`));
}

for (const asset of ["margin-scale-selection.png", "margin-scale-selection.pdf"]) {
  await assert.rejects(access(exported(`supplementary/${asset}`)), { code: "ENOENT" });
}

const archiveFigureIds = [
  "fig_anchor_assignment_sr_signal_detection",
  "fig_anchor_assignment_higgs",
  "fig_anchor_assignment_godel",
  "fig_anchor_assignment_deep_learning",
  "fig_anchor_assignment_attention",
  "fig_null_grid_random_5case",
  "fig_null_grid_scrambled_5case",
  "fig_null_sr_random",
  "fig_null_sr_scrambled",
  "fig_lee_5case",
  "fig_lee_sr",
  "fig_target_vs_context_mean_vs_max",
];

const expectedFigureFiles = archiveFigureIds.flatMap((figureId) =>
  ["png", "pdf"].map((extension) => `${figureId}.${extension}`),
);
const actualFigureFiles = await readdir(exported("supplementary/archive/figures/"));

assert.deepEqual(
  actualFigureFiles.toSorted(),
  expectedFigureFiles.toSorted(),
  "archive figure directory must contain exactly the expected PNG/PDF pairs",
);
assert.equal(actualFigureFiles.length, 24);
assert.equal(actualFigureFiles.filter((file) => file.endsWith(".png")).length, 12);
assert.equal(actualFigureFiles.filter((file) => file.endsWith(".pdf")).length, 12);

for (const figureFile of expectedFigureFiles) {
  await access(exported(`supplementary/archive/figures/${figureFile}`));
}

const expectedDownloads = [
  "concept_anchors.md",
  "ranking_pvalues.json",
  "ranking_three_way.json",
  "concept-count-robustness-v4.json",
  "paraphrase-stability-v2-rev2.json",
];
const actualDownloads = await readdir(exported("supplementary/archive/data/"));

assert.deepEqual(
  actualDownloads.toSorted(),
  expectedDownloads.toSorted(),
  "archive data directory must contain exactly the expected downloads",
);
assert.equal(actualDownloads.length, 5);
assert.equal(actualDownloads.filter((file) => file.endsWith(".json")).length, 4);
assert.equal(actualDownloads.filter((file) => file.endsWith(".md")).length, 1);

for (const download of expectedDownloads) {
  await access(exported(`supplementary/archive/data/${download}`));
}

assert.match(
  archiveHtml,
  /most extreme cell anywhere in the grid, not the target cell/i,
);
assert.doesNotMatch(archiveHtml, /assignment calibration and stability/i);
assert.doesNotMatch(archiveHtml, /README_website_supplement\.md/);
for (const hidden of ["retained", "figures", "supplementary/contamination-diagnostics.png", "supplementary/assignment-thresholds.png", "supplementary/paraphrase-stability.png", "supplementary/concept-count-robustness.png"]) {
  await assert.rejects(access(exported(hidden)), { code: "ENOENT" });
}
assert.doesNotMatch(archiveHtml, /\bp\s*=\s*0(?:\.0+)?(?!\d|\.\d)/i);

console.log("Static export verified.");
