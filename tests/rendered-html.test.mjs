import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { JSDOM } from "jsdom";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const document = new JSDOM(html).window.document;
const supplementHtml = await readFile(
  new URL("../out/supplement/index.html", import.meta.url),
  "utf8",
);
const supplementDocument = new JSDOM(supplementHtml).window.document;
const stylesheet = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const readingStateSource = await readFile(
  new URL("../components/reading-state.tsx", import.meta.url),
  "utf8",
).catch(() => "");

test("exports the concise companion in the approved narrative order", () => {
  const main = document.querySelector("main");
  assert.ok(main);

  const sectionIds = [...main.querySelectorAll(":scope > section")].map(
    (section) => section.id,
  );
  assert.deepEqual(sectionIds, [
    "top",
    "idea",
    "current-reading",
    "supplementary",
  ]);

  assert.equal(
    document.querySelector("#homepage-title")?.textContent?.replace(/\s+/g, " ").trim(),
    "Geometric Signatures of Conceptual Reorganization: A Counterfactual Embedding Framework for Detecting Scientific Revolutions",
  );
  assert.match(
    document.querySelector("#homepage-title > span:first-child")?.textContent ?? "",
    /Reorganization:$/,
  );
  assert.doesNotMatch(
    document.querySelector("#homepage-title > span:last-child")?.textContent ?? "",
    /^\s*:/,
  );

  for (const phrase of [
    "Geometric Signatures of Conceptual Reorganization",
    "Can we detect conceptual reorganization in scientific literature",
    "What we found",
    "Supplementary material",
  ]) {
    assert.match(main.textContent, new RegExp(phrase));
  }
});

test("introduces the method for readers who have not read the paper", () => {
  const deck = document.querySelector(".companion-hero__deck").textContent;
  assert.match(deck, /scientific papers as numerical vectors, called embeddings/);
  assert.match(deck, /semantic similarity/);
  const caption = document.querySelector(".hero-geometry figcaption").textContent;
  assert.match(caption, /successive time windows/);
  assert.match(caption, /with and without the papers associated with a selected concept/);
  const findings = document.querySelector("#current-reading").textContent;
  assert.match(findings, /special relativity providing the clearest benchmark/);
  assert.match(findings, /assignment errors can produce an apparent signal/);
  assert.doesNotMatch(document.querySelector("main").textContent, /\bpivot\b|SPECTER2|look-elsewhere|highest-ranked/);
});

test("keeps the Higgs qualification beside the supplementary results", () => {
  const nulls = supplementDocument.querySelector("#nulls");
  assert.ok(nulls);
  assert.match(nulls.querySelector(".archive-caveat").textContent, /Higgs response remains an assignment artifact/i);
  assert.doesNotMatch(document.body.textContent, /rank-one bridging signal/i);
});

test("uses one supplementary-material gateway on the homepage", () => {
  const section = document.querySelector("#supplementary");
  assert.ok(section);
  assert.equal(section.querySelectorAll("figure").length, 0);
  assert.equal(section.querySelectorAll(".supplementary-item").length, 0);
  assert.doesNotMatch(
    section.textContent ?? "",
    /supplementary archive/i,
  );
  assert.equal(
    section.querySelectorAll('a[href$="/supplement/"]').length,
    1,
  );
  assert.match(section.textContent ?? "", /open supplementary material/i);
});

test("connects the concise homepage to one unified supplement", () => {
  assert.ok(document.querySelector('a[href$="/supplement/"]'));
  assert.equal(
    document.querySelector('#supplementary a[href$="/supplement/concept-anchors/"]'),
    null,
  );
  assert.ok(
    supplementDocument.querySelector('a[href$="/supplement/concept-anchors/"]'),
  );
  assert.equal(supplementDocument.querySelector("h1")?.textContent, "Supplementary material");
  assert.doesNotMatch(supplementDocument.body.textContent ?? "", /supplementary study archive/i);
});

test("uses descriptive labels and distinguishes the two null-tail definitions", () => {
  const copy = supplementDocument.body.textContent ?? "";
  assert.doesNotMatch(copy, /Study plate|Reference plate|Reading note\./);
  assert.match(copy, /Target concept versus surrounding concepts/);
  assert.match(copy, /Interpretation note\./);
  assert.match(copy, /two-sided on each axis/);
  assert.match(copy, /directional/);
  assert.ok(supplementDocument.querySelector("#look-elsewhere .archive-chapter__reading math"));
  assert.doesNotMatch(document.body.textContent ?? "", /Current reading/);
  assert.match(document.body.textContent ?? "", /Key findings/);
});

test("composites supplementary plots into the paper surface", () => {
  const styledDom = new JSDOM(supplementHtml, { pretendToBeVisual: true });
  const style = styledDom.window.document.createElement("style");
  style.textContent = stylesheet;
  styledDom.window.document.head.append(style);

  const figure = styledDom.window.document.querySelector(
    "#robustness .supplementary-item__figure",
  );
  const image = figure?.querySelector("img");
  assert.ok(figure);
  assert.ok(image);

  const figureStyle = styledDom.window.getComputedStyle(figure);
  const imageStyle = styledDom.window.getComputedStyle(image);
  assert.equal(figureStyle.backgroundColor, "rgba(0, 0, 0, 0)");
  assert.equal(figureStyle.boxShadow, "none");
  assert.equal(imageStyle.mixBlendMode, "multiply");
});

test("keeps blended plots out of animated stacking contexts", () => {
  const scrollReveal = stylesheet.match(
    /@supports \(animation-timeline:\s*view\(\)\)\s*\{[\s\S]*?\n\}/,
  )?.[0];

  assert.ok(scrollReveal);
  assert.doesNotMatch(scrollReveal, /\.supplementary-item__figure/);
  assert.match(scrollReveal, /\.supplementary-item__copy/);
});

test("keeps the conceptual illustration accessible at desktop and mobile sizes", () => {
  const figure = document.querySelector("figure.hero-geometry");
  assert.ok(figure);
  assert.match(figure.textContent, /How the comparison works/);
  for (const layout of ["desktop", "mobile"]) {
    const labels = [...figure.querySelectorAll(`.hero-geometry__${layout} .hero-geometry__annotation`)]
      .map((label) => label.textContent.trim());
    assert.deepEqual(labels, ["Target concept included", "Target concept removed"]);
  }
  assert.match(figure.textContent, /Remove target papers/);
  assert.match(figure.querySelector("figcaption").textContent, /with and without the papers/);
  assert.match(figure.textContent, /Observed field at time t/);
  assert.match(figure.textContent, /Counterfactual field at time t/);
  assert.match(figure.textContent, /Observed centroid/);
  assert.match(figure.textContent, /Ablated centroid/);
  assert.match(figure.textContent, /Δ\(t\)/);
  assert.match(figure.textContent, /rolling time windows/i);
  assert.ok(figure.querySelector(".hero-geometry__removed-region"));
  assert.equal(figure.querySelectorAll(".hero-geometry__removed-cluster circle").length, 0);

  const desktopClouds = [
    ...figure.querySelectorAll(".hero-geometry__desktop .hero-geometry__points"),
  ];
  assert.equal(desktopClouds.length, 2);
  assert.deepEqual(
    desktopClouds.map((cloud) => cloud.querySelectorAll("circle").length),
    [7, 7],
  );
  assert.ok(figure.querySelector("svg[role='img']"));
  assert.ok(figure.querySelector("figcaption"));
});

test("does not link to the deleted paper-duplicating routes", () => {
  for (const anchor of document.querySelectorAll("a[href]")) {
    assert.doesNotMatch(
      anchor.getAttribute("href") ?? "",
      /^\/(?:method|cases|paper)(?:\/|$)/,
    );
  }

  assert.ok(document.querySelector('a[href="#supplementary"]'));
  assert.ok(document.querySelector('a[href="https://github.com/dntounis/mapping_innovation_latex"]'));
});

test("retains shared provenance and keyboard navigation landmarks", () => {
  assert.ok(document.querySelector('a.skip-link[href="#main-content"]'));
  assert.ok(document.querySelector('#main-content[tabindex="-1"]'));
  assert.match(document.body.textContent, /Dimitris Ntounis/);
  assert.match(document.body.textContent, /Ariel Schwartzman/);
});

test("keeps internal manuscript provenance out of the public interface", () => {
  assert.doesNotMatch(
    document.body.textContent,
    /Near-final manuscript; structure stable, numerics provisional/i,
  );
  assert.doesNotMatch(document.body.textContent, /Last scientific review/i);
  assert.doesNotMatch(
    document.body.textContent,
    /paper\/sr_signal_detection_3D\.tex at mapping_innovation_latex commit/i,
  );
});

test("renders a persistent wordmark and a clear action hierarchy", () => {
  assert.equal(
    document.querySelector(".site-header__brand strong")?.textContent,
    "Geometric Signatures of Scientific Revolutions",
  );
  assert.equal(document.querySelectorAll(".editorial-action--primary").length, 2);
  assert.equal(document.querySelectorAll(".editorial-action--text").length, 1);

  for (const action of document.querySelectorAll(".editorial-action")) {
    assert.ok(action.querySelector(".editorial-action__arrow[aria-hidden='true']"));
  }
});

test("renders aspect-aware supplementary plates with normalized numbering", () => {
  assert.equal(
    supplementDocument.querySelectorAll(".supplementary-item--panoramic").length,
    2,
  );
  assert.equal(
    supplementDocument.querySelectorAll(".supplementary-item--standard").length,
    0,
  );

  for (const eyebrow of supplementDocument.querySelectorAll(".supplementary-item__eyebrow")) {
    assert.match(eyebrow.textContent ?? "", /^\d{2} \/ /);
  }

  assert.match(
    stylesheet,
    /\.supplementary-item--panoramic\s*\{[^}]*grid-template-columns:\s*1fr/s,
  );
  assert.match(
    stylesheet,
    /\.supplementary-item--panoramic \.supplementary-item__figure\s*\{[^}]*width:\s*100%/s,
  );
  assert.match(
    stylesheet,
    /\.supplementary-item--standard\s*\{[^}]*grid-template-columns:/s,
  );
});

test("exports a passive reading-progress and active-section controller", () => {
  assert.ok(document.querySelector(".site-header__progress[aria-hidden='true']"));
  assert.equal(document.querySelectorAll("[data-section-link]").length, 4);
  assert.match(readingStateSource, /IntersectionObserver/);
  assert.match(readingStateSource, /passive:\s*true/);
  assert.match(readingStateSource, /--reading-progress/);
  assert.match(readingStateSource, /aria-current/);
  assert.match(readingStateSource, /removeAttribute\("open"\)/);

  for (const link of document.querySelectorAll("[data-section-link]")) {
    const sectionId = link.getAttribute("data-section-link");
    assert.ok(["idea", "current-reading", "supplementary"].includes(sectionId));
    assert.ok(link.getAttribute("href")?.endsWith(`/#${sectionId}`));
  }
});
