import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheet = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

function token(name) {
  const value = stylesheet.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1];
  assert.ok(value, `Expected ${name} to be defined as a six-digit hex color`);
  return value;
}

function luminance(hex) {
  const channels = hex
    .match(/[0-9a-f]{2}/gi)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort(
    (left, right) => right - left,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("keeps editorial text and primary actions at AA contrast", () => {
  assert.ok(contrast(token("--ink"), token("--paper")) >= 4.5);
  assert.ok(contrast(token("--blue-dark"), token("--paper")) >= 4.5);
  assert.ok(contrast(token("--paper"), token("--blue-dark")) >= 4.5);
});

test("keeps pending publication links readable on both paper and dark footer", () => {
  const paperRed = stylesheet.match(/a\[data-publication-pending="true"\]:focus-visible\s*\{\s*color:\s*(#[0-9a-f]{6})/i)?.[1];
  const footerRed = stylesheet.match(/\.site-footer a\[data-publication-pending="true"\]:focus-visible\s*\{\s*color:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(paperRed);
  assert.ok(footerRed, "The dark footer requires its own readable red");
  assert.ok(contrast(paperRed, token("--paper")) >= 4.5);
  assert.ok(contrast(footerRed, token("--ink")) >= 4.5);
});

test("uses restrained editorial surfaces rather than a card grid", () => {
  assert.match(stylesheet, /\.supplementary-list\s*\{[^}]*border-top:/s);
  assert.match(stylesheet, /\.supplementary-item\s*\{[^}]*border-bottom:/s);
  assert.doesNotMatch(stylesheet, /\.supplementary-item\s*\{[^}]*border-radius:/s);
});

test("disables entry and reveal motion at a fully visible reduced-motion end state", () => {
  const reducedMotion = stylesheet.match(
    /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*\}\s*$/,
  )?.[0];
  assert.ok(reducedMotion);
  assert.match(reducedMotion, /animation:\s*none\s*!important/);
  assert.match(reducedMotion, /animation-timeline:\s*none\s*!important/);
  assert.match(reducedMotion, /opacity:\s*1\s*!important/);
  assert.match(reducedMotion, /transform:\s*none\s*!important/);
  assert.match(reducedMotion, /transition-duration:\s*0\.01ms\s*!important/);
  assert.match(reducedMotion, /scroll-behavior:\s*auto/);
  assert.match(reducedMotion, /body::before\s*\{[^}]*display:\s*none/s);
  assert.match(stylesheet, /\.archive-figure img\s*\{[^}]*mix-blend-mode:\s*multiply/s);
});

test("keeps responsive breakpoints for the illustration and supplement", () => {
  const intermediateHeader = stylesheet.match(
    /@media \(max-width: 1100px\)\s*\{[\s\S]*?\n\}/,
  )?.[0];

  assert.ok(intermediateHeader);
  assert.match(intermediateHeader, /\.site-header__nav\s*\{[^}]*display:\s*none/s);
  assert.match(intermediateHeader, /\.site-header__menu\s*\{[^}]*display:\s*block/s);
  assert.match(intermediateHeader, /\.companion-hero\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(stylesheet, /@media \(max-width: 900px\)/);
  assert.match(stylesheet, /@media \(max-width: 560px\)/);
  assert.match(stylesheet, /\.hero-geometry__mobile\s*\{[^}]*display:\s*grid/s);
  assert.match(stylesheet, /\.hero-geometry__mobile-state\s*\{[^}]*border:\s*0/s);
  assert.match(stylesheet, /\.supplementary-item\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

test("self-hosts and applies one editorial serif family", () => {
  assert.ok(packageJson.dependencies["@fontsource-variable/newsreader"]);
  assert.match(layout, /@fontsource-variable\/newsreader/);
  assert.match(stylesheet, /--serif:\s*"Newsreader Variable"/);
  assert.match(stylesheet, /font-optical-sizing:\s*auto/);
});

test("uses balanced editorial typography and tabular metadata", () => {
  assert.match(stylesheet, /h1,[\s\S]*h2,[\s\S]*h3\s*\{[^}]*text-wrap:\s*balance/s);
  assert.match(stylesheet, /p\s*\{[^}]*text-wrap:\s*pretty/s);
  assert.match(
    stylesheet,
    /\.section-index,[\s\S]*\.source-stamp\s*\{[^}]*font-variant-numeric:\s*tabular-nums/s,
  );
});

test("keeps a visible mobile wordmark and a restrained secondary action", () => {
  assert.doesNotMatch(
    stylesheet,
    /@media \(max-width: 560px\)[\s\S]*?\.site-header__brand strong\s*\{[^}]*display:\s*none/s,
  );
  assert.match(stylesheet, /\.editorial-action--text\s*\{[^}]*border-color:\s*transparent/s);
  assert.match(stylesheet, /\.editorial-action__arrow\s*\{[^}]*transition:\s*transform/s);
  assert.doesNotMatch(
    stylesheet,
    /\.editorial-action:hover,[\s\S]*?transform:\s*translateY/s,
  );
});

test("draws an unambiguous global keyboard focus ring", () => {
  assert.match(stylesheet, /:focus-visible\s*\{[^}]*outline:/s);
  assert.match(stylesheet, /:focus-visible\s*\{[^}]*outline-offset:/s);
});

test("uses finite, purposeful motion with progressive scroll reveals", () => {
  assert.match(stylesheet, /@keyframes editorial-rise/);
  assert.match(stylesheet, /@keyframes editorial-reveal/);
  assert.match(stylesheet, /@supports \(animation-timeline:\s*view\(\)\)/);
  assert.match(stylesheet, /animation-timeline:\s*view\(\)/);
  assert.doesNotMatch(stylesheet, /animation:[^;]*infinite/);
});

test("preserves text contrast throughout scroll-driven reveals", () => {
  const reveal = stylesheet.match(/@keyframes editorial-reveal\s*\{[\s\S]*?\n\}/)?.[0];
  assert.ok(reveal);
  for (const [, opacity] of reveal.matchAll(/opacity:\s*([0-9.]+)/g)) {
    assert.equal(Number(opacity), 1, "Scroll motion must not fade readable text");
  }
});

test("adds a subtle paper grain that reduced motion can suppress", () => {
  assert.match(
    stylesheet,
    /body::before\s*\{[^}]*background-image:\s*url\("data:image\/svg\+xml/s,
  );
  assert.match(stylesheet, /body::before\s*\{[^}]*opacity:\s*0\.0[12]/s);
  assert.match(
    stylesheet,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*body::before\s*\{[^}]*display:\s*none/s,
  );
});

test("styles active reading state without turning the header into glass", () => {
  assert.match(stylesheet, /\.site-header__progress\s*\{[^}]*transform:\s*scaleX\(var\(--reading-progress\)\)/s);
  assert.match(stylesheet, /\[aria-current="location"\]/);
  assert.match(stylesheet, /backdrop-filter:\s*blur\([4-8]px\)/);
});

test("lets reading copy and inline actions shrink inside the mobile grid", () => {
  assert.match(stylesheet, /\.companion-reading__copy\s*\{[^}]*min-width:\s*0/s);
  assert.match(
    stylesheet,
    /\.text-link,[\s\S]*\.source-link\s*\{[^}]*overflow-wrap:\s*anywhere/s,
  );
  assert.match(
    stylesheet,
    /@media \(max-width: 560px\)[\s\S]*\.companion-reading__copy \.text-link\s*\{[^}]*width:\s*100%/s,
  );
});

test("keeps panoramic captions before their figures on narrow screens", () => {
  assert.match(
    stylesheet,
    /@media \(max-width: 900px\)[\s\S]*\.supplementary-item--panoramic \.supplementary-item__figure\s*\{[^}]*order:\s*2/s,
  );
});
