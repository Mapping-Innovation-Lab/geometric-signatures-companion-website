import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";
import { JSDOM } from "jsdom";

const root = new URL("../out/", import.meta.url);
const document = new JSDOM(await readFile(new URL("supplement/index.html", root), "utf8")).window.document;

test("semantic stability presents only the manuscript rule and retains the coverage caveat", () => {
  const section = document.querySelector("#paraphrase-stability");
  assert.match(section.textContent, /Assignment rule used in the paper/);
  assert.doesNotMatch(section.textContent, /production rule|Panel \(a\)|Panel \(b\)/);
  assert.match(section.textContent, /1 of 10 concepts, versus 5/);
  assert.match(section.textContent, /not a matched comparison/);
  assert.match(section.querySelector("img").src, /paraphrase-stability-manuscript-rule\.png$/);
});

test("reviewed robustness figures preserve exported PNG and vector PDF assets with correct dimensions", async () => {
  for (const [stem, width, height] of [
    ["concept-count-robustness-v4", 2326, 1036],
    ["paraphrase-stability-manuscript-rule", 1789, 1344],
  ]) {
    const img = document.querySelector(`#robustness img[src$="${stem}.png"]`);
    assert.ok(img, `missing reviewed figure ${stem}`);
    assert.equal(Number(img.getAttribute("width")), width);
    assert.equal(Number(img.getAttribute("height")), height);
    const article = img.closest("article");
    assert.equal(article.querySelector(`a[href$="${stem}.pdf"]`), null);
    for (const ext of ["png", "pdf"]) await access(new URL(`supplementary/${stem}.${ext}`, root));
  }
});

test("public source downloads preserve undefined responses and corrected Jaccard coverage", async () => {
  const files = ["concept-count-robustness-v4.json", "paraphrase-stability-v2-rev2.json"];
  for (const file of files) {
    assert.ok(document.querySelector(`#source-data a[download][href$="${file}"]`));
  }
  const read = async file => JSON.parse(await readFile(new URL(`supplementary/archive/data/${file}`, root), "utf8"));
  const sweep = await read(files[0]);
  const sr = sweep.cases.sr_signal_detection.per_N;
  assert.equal(sr[5].target.status, "undefined");
  assert.equal(sr[5].target.max_abs_d, null);
  assert.equal(sr[5].target.rank, null);
  assert.equal(sr[8].target.n_ranked, 3);
  assert.equal(sr[10].target.n_ranked, 6);
  const jaccard = await read(files[1]);
  const corpus = jaccard.cases.sr_signal_detection.per_config.production_v3.corpus;
  assert.equal(corpus.disjoint_1v4.n_pairs_total, 50);
  assert.equal(corpus.disjoint_2v3.n_pairs_total, 100);
  assert.equal(corpus.single_pairs.n_concepts_available, 1);
  assert.equal(corpus.disjoint_2v3.n_concepts_available, 5);
  assert.ok(Math.abs(corpus.disjoint_2v3.median_of_concept_means - 0.16790123456790124) < 1e-12);
  for (const data of [sweep, jaccard]) {
    assert.equal(data.provenance.reviewed, "2026-09-11");
    assert.ok(Object.keys(data.provenance.source_sha256).length >= 5);
    assert.doesNotMatch(JSON.stringify(data), /\/Users\/|\/fs\/ddn\/|\/sdf\/|inputs_sha256|doc_id/);
  }
});
