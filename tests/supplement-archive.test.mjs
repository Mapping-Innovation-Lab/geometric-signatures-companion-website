import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { JSDOM } from "jsdom";
import ts from "typescript";

async function loadArchiveManifest() {
  const source = await readFile(new URL("../content/supplement/archive.ts", import.meta.url), "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
  return import(moduleUrl);
}

function runStaticVerifier(fixture) {
  const scriptPath = fileURLToPath(
    new URL("../scripts/verify-static-export.mjs", import.meta.url),
  );
  return spawnSync(process.execPath, [scriptPath], {
    encoding: "utf8",
    env: { ...process.env, STATIC_EXPORT_DIR: fixture },
  });
}

test("defines one ordered manifest for all archive chapters and figure pairs", async () => {
  const { archiveChapters, archiveFigures } = await loadArchiveManifest();
  const expectedChapterIds = [
    "anchors",
    "calibration",
    "nulls",
    "look-elsewhere",
    "context-comparison",
  ];
  const figureIds = archiveFigures.map((figure) => figure.id);

  assert.equal(archiveFigures.length, 17);
  assert.deepEqual(archiveChapters.map((chapter) => chapter.id), expectedChapterIds);
  assert.equal(new Set(figureIds).size, 17);
  assert.deepEqual(archiveChapters.flatMap((chapter) => chapter.figureIds), figureIds);

  for (const chapter of archiveChapters) {
    for (const figureId of chapter.figureIds) {
      assert.equal(
        archiveFigures.find((figure) => figure.id === figureId)?.chapterId,
        chapter.id,
      );
    }
  }

  const pngPaths = archiveFigures.map((figure) => figure.pngPath);
  const pdfPaths = archiveFigures.map((figure) => figure.pdfPath);
  assert.equal(new Set(pngPaths).size, 17);
  assert.equal(new Set(pdfPaths).size, 17);
  for (const figure of archiveFigures) {
    assert.match(figure.pngPath, new RegExp(`/${figure.id}\\.png$`));
    assert.match(figure.pdfPath, new RegExp(`/${figure.id}\\.pdf$`));
  }
});

test("publishes four continuously numbered chapters while retaining calibration in the source manifest", async () => {
  const {
    archiveChapters,
    archiveFigures,
    publishedArchiveChapters,
    publishedArchiveFigures,
  } = await loadArchiveManifest();

  assert.equal(archiveChapters.length, 5);
  assert.equal(archiveFigures.length, 17);
  assert.deepEqual(
    publishedArchiveChapters.map((chapter) => chapter.id),
    ["anchors", "nulls", "look-elsewhere", "context-comparison"],
  );
  assert.deepEqual(
    publishedArchiveChapters.map((chapter) => chapter.index),
    ["01", "02", "03", "04"],
  );
  assert.equal(publishedArchiveFigures.length, 12);
  assert.ok(archiveChapters.some((chapter) => chapter.id === "calibration"));
});

test("merges homepage studies and archive figures into one supplementary page", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  const figures = [...document.querySelectorAll(".archive-figure")];
  const robustnessFigures = [...document.querySelectorAll("#robustness .supplementary-item")];

  assert.equal(document.querySelector("h1")?.textContent, "Supplementary material");
  assert.equal(figures.length, 12);
  assert.equal(robustnessFigures.length, 2);
  assert.equal(document.querySelectorAll("figure").length, 14);
  assert.equal(document.querySelectorAll(".archive-chapter").length, 5);
  assert.equal(document.querySelector("#calibration"), null);
  assert.deepEqual(
    [...document.querySelectorAll(".archive-chapter .section-index")].map(
      (index) => index.textContent?.trim(),
    ),
    [
      "01 / Chapter one",
      "02 / Chapter two",
      "03 / Chapter three",
      "04 / Chapter four",
      "05 / Chapter five",
    ],
  );
  for (const figure of figures) {
    assert.ok(figure.querySelector("img[alt]"));
    assert.ok(figure.querySelector("figcaption"));
    assert.equal(figure.querySelector("a[download]"), null);
  }
  for (const figure of robustnessFigures) {
    assert.ok(figure.querySelector("img[alt]"));
    assert.equal(figure.querySelector("a[download]"), null);
  }
});

test("defines PC1 and PC2 before the assignment-geometry figures", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  const definition = document.querySelector("#anchors .archive-definition[role='note']");

  assert.ok(definition);
  assert.match(definition.textContent ?? "", /PC1 and PC2.*first and second principal components/i);
  assert.match(definition.textContent ?? "", /two-dimensional display/i);
  assert.match(definition.textContent ?? "", /full embedding space/i);
});

test("reserves intrinsic space for every archive figure", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  const images = [...document.querySelectorAll(".archive-figure img")];
  const expectedDimensions = [
    ["fig_anchor_assignment_sr_signal_detection", 2268, 922],
    ["fig_anchor_assignment_higgs", 2277, 922],
    ["fig_anchor_assignment_godel", 2260, 922],
    ["fig_anchor_assignment_deep_learning", 2277, 922],
    ["fig_anchor_assignment_attention", 2277, 922],
    ["fig_null_grid_random_5case", 3069, 1838],
    ["fig_null_grid_scrambled_5case", 3034, 1810],
    ["fig_null_sr_random", 1042, 934],
    ["fig_null_sr_scrambled", 983, 887],
    ["fig_lee_5case", 3033, 1757],
    ["fig_lee_sr", 1077, 596],
    ["fig_target_vs_context_mean_vs_max", 1905, 1096],
  ];

  assert.deepEqual(
    images.map((image) => [
      image.getAttribute("src")?.match(/([^/]+)\.png$/)?.[1],
      Number(image.getAttribute("width")),
      Number(image.getAttribute("height")),
    ]),
    expectedDimensions,
  );
});

test("renders the source-derived ranking interpretation beside the ranking table", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  const interpretation = document.querySelector(".archive-ranking-interpretation");

  assert.ok(interpretation);
  assert.match(interpretation.textContent ?? "", /graphical_models/);
  assert.match(interpretation.textContent ?? "", /rank 2[^.]*3\.488/i);
  assert.match(interpretation.textContent ?? "", /rank 1[^.]*3\.544/i);
  assert.match(interpretation.textContent ?? "", /4\s*→\s*3/);
});

test("renders archive chapter prose without literal Markdown backticks", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;

  for (const prose of document.querySelectorAll(".archive-chapter__reading, .archive-caveat")) {
    assert.doesNotMatch(prose.textContent ?? "", /`/);
  }
});

test("provides visible reduced-motion end states for rendered archive entry targets", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const reducedMotion = stylesheet.slice(
    stylesheet.indexOf("@media (prefers-reduced-motion: reduce)"),
  );
  const entryTargets = [
    ".archive-hero .editorial-kicker",
    ".archive-hero h1",
    ".archive-hero__deck",
    ".archive-contents",
    ".archive-chapter__header",
    ".archive-chapter__reading",
    ".archive-caveat",
  ];

  for (const selector of entryTargets) {
    assert.ok(document.querySelector(selector), `missing rendered reduced-motion target ${selector}`);
    assert.match(reducedMotion, new RegExp(selector.replaceAll(".", "\\.")));
  }
  assert.match(reducedMotion, /animation:\s*none\s*!important/);
  assert.match(reducedMotion, /animation-timeline:\s*none\s*!important/);
  assert.match(reducedMotion, /opacity:\s*1\s*!important/);
  assert.match(reducedMotion, /transform:\s*none\s*!important/);
});

test("renders ranking floors from selector provenance without inferring the draw count", async () => {
  const source = await readFile(new URL("../app/supplement/page.tsx", import.meta.url), "utf8");
  assert.match(source, /formatPValue\(row\.p2D, row\.p2DIsFloor\)/);
  assert.doesNotMatch(source, /\/\s*5000/);
});

test("renders the complete concept-anchor reference", async () => {
  const html = await readFile(new URL("../out/supplement/concept-anchors/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;
  assert.equal(document.querySelectorAll(".anchor-case").length, 5);
  assert.equal(document.querySelectorAll("details.anchor-concept").length, 50);
  assert.equal(document.querySelectorAll(".anchor-concept--target").length, 5);
  assert.equal(document.querySelectorAll(".anchor-concept__paraphrases li").length, 250);
  for (const details of document.querySelectorAll("details.anchor-concept")) {
    assert.ok(details.querySelector(".anchor-concept__description")?.textContent?.trim());
    assert.ok(details.querySelector(".anchor-concept__aliases")?.textContent?.trim());
  }
});

test("keeps nested-route navigation anchored to the real homepage", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;

  for (const hash of ["#idea", "#current-reading"]) {
    assert.ok(document.querySelector(`.site-header a[href$="/${hash}"]`));
  }

  assert.ok(document.querySelector('.site-footer a[href$="/#top"]'));
  assert.ok(document.querySelector('.site-footer a[href$="/supplement/"]'));
  assert.ok(document.querySelector('.site-footer a[href$="/supplement/concept-anchors/"]'));
  assert.ok(document.querySelector('link[rel~="icon"][href$="/favicon.svg"]'));
});

test("does not mark archive navigation as an observed homepage section", async () => {
  const html = await readFile(new URL("../out/supplement/index.html", import.meta.url), "utf8");
  const document = new JSDOM(html).window.document;

  for (const link of document.querySelectorAll("[data-section-link]")) {
    assert.doesNotMatch(link.getAttribute("href") ?? "", /\/supplement\/$/);
    assert.doesNotMatch(link.getAttribute("href") ?? "", /\/supplement\/concept-anchors\/$/);
  }
});

test("rejects an incomplete nested static export", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "mapping-innovation-static-"));

  try {
    await writeFile(join(fixture, "index.html"), '<section id="supplementary">assignment diagnostic</section>');
    const result = runStaticVerifier(fixture);

    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /supplement\/index\.html/);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("rejects unexpected archive figure and data artifacts", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "mapping-innovation-static-extra-"));
  const fixture = join(fixtureRoot, "out");
  const verifyFixture = () => runStaticVerifier(fixture);

  try {
    await cp(fileURLToPath(new URL("../out", import.meta.url)), fixture, {
      recursive: true,
    });

    const extraPng = join(
      fixture,
      "supplementary/archive/figures/fig_unexpected_extra.png",
    );
    const extraPdf = join(
      fixture,
      "supplementary/archive/figures/fig_unexpected_extra.pdf",
    );
    await writeFile(extraPng, "unexpected PNG");
    await writeFile(extraPdf, "unexpected PDF");

    const extraFigureResult = verifyFixture();
    assert.notEqual(extraFigureResult.status, 0);
    assert.match(
      `${extraFigureResult.stdout}\n${extraFigureResult.stderr}`,
      /fig_unexpected_extra/,
    );

    await rm(extraPng);
    await rm(extraPdf);
    await writeFile(
      join(fixture, "supplementary/archive/data/unexpected_results.json"),
      "{}",
    );

    const extraDataResult = verifyFixture();
    assert.notEqual(extraDataResult.status, 0);
    assert.match(
      `${extraDataResult.stdout}\n${extraDataResult.stderr}`,
      /unexpected_results\.json/,
    );
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});

test("accepts nonzero decimal p-value prose in a complete static export", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "mapping-innovation-static-p-nonzero-"));
  const fixture = join(fixtureRoot, "out");

  try {
    await cp(fileURLToPath(new URL("../out", import.meta.url)), fixture, {
      recursive: true,
    });
    const archivePath = join(fixture, "supplement/index.html");
    const archiveHtml = await readFile(archivePath, "utf8");
    await writeFile(archivePath, `${archiveHtml}<p>Reference threshold: p = 0.05.</p>`);

    const result = runStaticVerifier(fixture);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});

test("rejects integer and decimal spellings of an exact zero p-value", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "mapping-innovation-static-p-zero-"));
  const fixture = join(fixtureRoot, "out");

  try {
    await cp(fileURLToPath(new URL("../out", import.meta.url)), fixture, {
      recursive: true,
    });
    const archivePath = join(fixture, "supplement/index.html");
    const archiveHtml = await readFile(archivePath, "utf8");

    for (const value of ["0", "0.000"]) {
      await writeFile(archivePath, `${archiveHtml}<p>Invalid result: p = ${value}.</p>`);
      const result = runStaticVerifier(fixture);
      assert.notEqual(result.status, 0, `verifier accepted p = ${value}`);
    }
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});
