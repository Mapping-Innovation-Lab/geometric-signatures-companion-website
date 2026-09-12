import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../public/supplementary/archive/", import.meta.url);

test("stores exactly 12 web/vector figure pairs", async () => {
  const files = await readdir(new URL("figures/", root));
  const png = files.filter((name) => name.endsWith(".png")).map((name) => name.slice(0, -4)).sort();
  const pdf = files.filter((name) => name.endsWith(".pdf")).map((name) => name.slice(0, -4)).sort();
  assert.equal(png.length, 12);
  assert.deepEqual(png, pdf);
});

test("stores complete machine-readable supplement sources", async () => {
  const anchors = await readFile(new URL("data/concept_anchors.md", root), "utf8");
  const pvalues = JSON.parse(await readFile(new URL("data/ranking_pvalues.json", root), "utf8"));
  const rankings = JSON.parse(await readFile(new URL("data/ranking_three_way.json", root), "utf8"));
  const tau = JSON.parse(await readFile(new URL("../content/data/tau_assignment_summary.json", import.meta.url), "utf8"));
  assert.equal((anchors.match(/^### `/gm) ?? []).length, 50);
  assert.equal(Object.keys(pvalues.cases).length, 5);
  assert.equal(rankings.length, 5);
  assert.equal(tau.length, 5);
});
