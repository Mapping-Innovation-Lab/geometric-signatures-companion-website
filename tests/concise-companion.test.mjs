import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

async function readOptional(relativePath) {
  try {
    return await read(relativePath);
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

test("uses the August 25 manuscript and frames Higgs as an assignment diagnostic", async () => {
  const snapshot = await read("../content/paper-snapshot.ts");

  assert.match(snapshot, /55ac67f9a2133c2157ef56da938fcdddb2ad62d1/);
  assert.match(snapshot, /2026-08-25/);
  assert.match(snapshot, /pre-pivot sparsity/i);
  assert.match(snapshot, /historically unrelated 1956/i);
  assert.match(snapshot, /assignment diagnostic/i);
  assert.doesNotMatch(snapshot, /rank-one bridging signal/i);
});

test("reduces the public homepage to the approved paper-companion sections", async () => {
  const homepage = await read("../app/page.tsx");

  for (const id of ["top", "idea", "current-reading", "supplementary"]) {
    assert.match(homepage, new RegExp(`id=["']${id}["']`));
  }

  for (const removedId of [
    "method-summary",
    "metric-geometry",
    "case-studies",
    "profiles",
    "validation-questions",
    "limitations",
    "outlook",
  ]) {
    assert.doesNotMatch(homepage, new RegExp(`id=["']${removedId}["']`));
  }

  assert.doesNotMatch(homepage, /CaseSelector|MetricGeometry|methodStages|validationTests/);
});

test("curates four supplementary analyses excluded from the manuscript", async () => {
  const supplementary = await readOptional("../content/supplementary.ts");
  const siteCopy = await read("../content/site-copy.ts");

  assert.equal((supplementary.match(/id: "/g) ?? []).length, 4);
  for (const source of [
    "fig_fknee_selection_5case.png",
    "fig_n_concepts_robustness_v4.png",
    "fig_paraphrase_jaccard_v2.png",
    "fig_contamination_alt_metrics.png",
  ]) {
    assert.match(supplementary, new RegExp(source));
  }
  assert.match(supplementary, /import \{ PAPER_SOURCE_COMMIT \}/);
  assert.match(supplementary, /blob\/\$\{PAPER_SOURCE_COMMIT\}/);
  assert.match(siteCopy, /Open supplementary material/);
  assert.doesNotMatch(siteCopy, /Open the supplementary archive/);
});

test("classifies supplementary figures by their editorial aspect ratio", async () => {
  const supplementary = await readOptional("../content/supplementary.ts");

  assert.match(supplementary, /layout:\s*"panoramic"\s*\|\s*"standard"/);
  assert.equal((supplementary.match(/^    layout:\s*"panoramic"/gm) ?? []).length, 4);
});

test("configures a static export and an official GitHub Pages deployment", async () => {
  const nextConfig = await read("../next.config.ts");
  const packageJson = JSON.parse(await read("../package.json"));
  const workflow = await readOptional("../.github/workflows/pages.yml");

  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /trailingSlash:\s*true/);
  assert.match(nextConfig, /basePath/);
  assert.equal(packageJson.scripts.build, "next build");
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*\/geometric-signatures-companion-website/);
});

test("removes public routes that duplicate the paper", async () => {
  const homepage = await read("../app/page.tsx");
  const header = await read("../components/site-header.tsx");

  assert.doesNotMatch(`${homepage}\n${header}`, /href=["']\/(?:method|cases|paper)/);
  assert.match(header, /homeSectionUrl\(link\.id\)/);
  assert.match(header, /href=\{SUPPLEMENT_URL\}/);
});
