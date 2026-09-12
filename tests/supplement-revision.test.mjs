import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { JSDOM } from "jsdom";

const root = new URL("../out/", import.meta.url);
const document = new JSDOM(await readFile(new URL("supplement/index.html", root), "utf8")).window.document;

test("source-data contents entry navigates to the download section", () => {
  const link = document.querySelector('.archive-contents a[href="#source-data"]');
  assert.ok(link);
  assert.match(link.textContent, /06.*Source data/);
  assert.ok(document.querySelector("#source-data a[download]"));
});

test("every archive title precedes its image in reading order", () => {
  for (const figure of document.querySelectorAll(".archive-figure")) {
    const heading = figure.querySelector("h3");
    const img = figure.querySelector("img");
    assert.ok(heading.compareDocumentPosition(img) & 4, heading.textContent);
  }
});

test("supplementary mathematics renders as accessible math, not raw notation", () => {
  for (const id of ["nulls", "look-elsewhere"]) {
    const section = document.getElementById(id);
    assert.ok(section.querySelector(".archive-chapter__reading math"));
    assert.ok(section.querySelector("th math"));
    const prose = section.cloneNode(true);
    for (const el of prose.querySelectorAll("script, .scientific-math")) el.remove();
    assert.doesNotMatch(prose.textContent, /D_I|D_P|p_2D|p_global|\|\|D\|\|_2/);
  }
  assert.equal(document.querySelectorAll(".katex-error").length, 0);
});

test("assignment calibration stays out of the public page and export", async () => {
  const figure = document.querySelector('#robustness img[src$="margin-scale-selection.png"]');
  assert.equal(figure, null);
  assert.equal(document.querySelector("#assignment-thresholds"), null);
  for (const file of ["margin-scale-selection.png", "margin-scale-selection.pdf", "assignment-thresholds.png", "paraphrase-stability.png"]) {
    await assert.rejects(access(new URL(`supplementary/${file}`, root)), { code: "ENOENT" });
  }
});

test("figure actions omit PDF downloads and redundant PNG actions", () => {
  const links = [...document.querySelectorAll('main a')];
  assert.ok(!links.some(a => a.href.endsWith(".pdf")));
  assert.ok(!links.some(a => /View full-size figure|Download figure PNG|Download vector PDF/i.test(a.textContent)));
});

test("source data retains downloads without the dated robustness update", () => {
  assert.equal(document.querySelector(".archive-correction"), null);
  assert.doesNotMatch(document.body.textContent, /Robustness update|The versioned downloads include methods, coverage, and source hashes/);
  assert.equal(document.querySelectorAll("#source-data a[download]").length, 5);
});
