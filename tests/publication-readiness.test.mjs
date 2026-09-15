import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { JSDOM } from "jsdom";

const root = new URL("../out/", import.meta.url);
const routes = ["", "supplement/", "supplement/concept-anchors/"];
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapping-innovation-lab.github.io/geometric-signatures-companion-website/").href;
const documents = await Promise.all(routes.map(async (route) =>
  new JSDOM(await readFile(new URL(`${route}index.html`, root), "utf8")).window.document,
));

test("links to the public analysis release without a pending marker on every route", () => {
  const analysisUrl = "https://github.com/Mapping-Innovation-Lab/geometric-signatures";
  for (const document of documents) {
    const link = document.querySelector(`.site-footer a[href="${analysisUrl}"]`);
    assert.ok(link, "footer must expose the public analysis code");
    assert.equal(link.hasAttribute("data-publication-pending"), false);
    assert.doesNotMatch(link.textContent, /link pending/i);
    assert.equal(document.querySelector('a[href="https://github.com/dntounis/mapping_innovation"]'), null);
  }
  const sourceLink = documents[1].querySelector(`#source-data a[href="${analysisUrl}"]`);
  assert.ok(sourceLink, "source-data readers must be able to find the analysis code");
  assert.equal(sourceLink.hasAttribute("download"), false);
  assert.equal(sourceLink.hasAttribute("data-publication-pending"), false);
});

test("links to the arXiv preprint on every route without pending or private manuscript links", () => {
  for (const document of documents) {
    assert.ok(document.querySelector('a[href="https://arxiv.org/abs/2609.14917"]'));
    assert.equal(document.querySelector('a[data-publication-pending="true"]'), null);
    assert.equal(document.querySelector('a[href*="mapping_innovation_latex"]'), null);
    assert.doesNotMatch(document.body.textContent, /link pending/i);
    for (const link of document.querySelectorAll('a[href^="/"], a[href^="#"]')) {
      assert.notEqual(link.dataset.publicationPending, "true");
    }
  }
});

test("retains vector assets without displaying per-figure download links", async () => {
  assert.equal(documents[0].querySelectorAll(".supplementary-item").length, 0);
  const sourceLinks = documents[1].querySelectorAll("#robustness a.source-link[download]");
  assert.equal(sourceLinks.length, 0);
  for (const stem of ["concept-count-robustness-v4", "paraphrase-stability-manuscript-rule"]) {
    await access(new URL(`supplementary/${stem}.pdf`, root));
  }
});

test("does not expose the hidden guide, calibration downloads, or obsolete public figures", async () => {
  const hiddenPaths = [
    "supplementary/archive/data/README_website_supplement.md",
    "supplementary/archive/data/tau_assignment_summary.json",
    "supplementary/archive/figures/fig_fknee_selection_5case.png",
    "supplementary/archive/figures/fig_fknee_selection_5case.pdf",
    "supplementary/contamination-diagnostics.png",
    "figures/figure-manifest.json",
  ];
  for (const path of hiddenPaths) {
    await assert.rejects(access(new URL(path, root)), { code: "ENOENT" });
  }
  for (const document of documents) {
    assert.equal(document.querySelector('a[href*="README_website_supplement"]'), null);
    assert.equal(document.querySelector(".source-stamp")?.textContent?.includes("Manuscript commit") ?? false, false);
    assert.doesNotMatch(document.body.textContent, /scientifically reviewed|Published analyses|published supplementary figures|complete supplementary archive/);
  }
  assert.equal(documents[0].querySelector("#paper"), null);
});

test("uses supplementary material terminology across every public route", async () => {
  const recoveryDocument = new JSDOM(
    await readFile(new URL("404.html", root), "utf8"),
  ).window.document;

  for (const document of [...documents, recoveryDocument]) {
    const visibleBody = document.body.cloneNode(true);
    for (const hidden of visibleBody.querySelectorAll("script, style")) hidden.remove();
    assert.doesNotMatch(visibleBody.textContent ?? "", /\bsupplement\b/i);
  }

  for (const document of documents) {
    const links = [...document.querySelectorAll(".site-header nav a")].filter(
      (link) => link.textContent === "Supplementary material",
    );
    assert.equal(links.length, 2);
    for (const link of links) assert.match(link.getAttribute("href"), /\/supplement\/$/);
  }
});

test("exports route-specific canonical and share metadata with a real social image", async () => {
  for (const [index, document] of documents.entries()) {
    assert.equal(document.querySelector('link[rel="canonical"]')?.href, `${origin}${routes[index]}`);
    assert.equal(document.querySelector('meta[property="og:url"]')?.content, `${origin}${routes[index]}`);
    assert.equal(document.querySelector('meta[property="og:title"]')?.content, document.title);
    assert.equal(document.querySelector('meta[name="twitter:card"]')?.content, "summary_large_image");
    assert.ok(document.querySelector('meta[property="og:image:alt"]')?.content);
    assert.equal(document.querySelector('meta[name="codex-preview"]'), null);
  }
  const image = documents[0].querySelector('meta[property="og:image"]')?.content;
  assert.ok(image?.startsWith(origin));
  await access(new URL(image.slice(origin.length), root));
});

test("exports a branded recovery page and a sitemap covering the real public routes", async () => {
  const notFound = new JSDOM(await readFile(new URL("404.html", root), "utf8")).window.document;
  assert.match(notFound.querySelector("h1")?.textContent ?? "", /page not found/i);
  assert.ok(notFound.querySelector('main a[href$="/geometric-signatures-companion-website/"]'));
  const sitemap = await readFile(new URL("sitemap.xml", root), "utf8");
  for (const route of routes) assert.ok(sitemap.includes(`${origin}${route}`));
  const robots = await readFile(new URL("robots.txt", root), "utf8");
  assert.ok(robots.includes(`${origin}sitemap.xml`));
});

test("normalizes the displayed Gödel label while keeping stable data IDs", () => {
  const archive = documents[1];
  assert.doesNotMatch(archive.body.textContent, /\bGodel\b/);
  assert.match(archive.body.textContent, /Gödel/);
});

test("uses note semantics for chapter caveats and avoids naming generic containers", () => {
  const caveats = [...documents[1].querySelectorAll(".archive-caveat")];
  assert.equal(caveats.length, 4);
  for (const caveat of caveats) assert.equal(caveat.getAttribute("role"), "note");
  for (const document of documents.slice(1)) {
    assert.equal(document.querySelector("main > header[aria-labelledby]"), null);
    assert.equal(document.querySelector("p[aria-label]"), null);
  }
});
