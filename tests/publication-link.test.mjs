import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = await readFile(new URL("../components/publication-link.tsx", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
} }).outputText;

for (const pending of [true, false]) {
  test(`publication link ${pending ? "marks a pending" : "clears a resolved"} destination`, () => {
    const testModule = { exports: {} };
    const load = (name) => name === "@/content/site-copy"
      ? { publicationLinks: { paper: { href: "https://example.org/paper", pending } } }
      : require(name);
    new Function("require", "module", "exports", javascript)(load, testModule, testModule.exports);
    const html = renderToStaticMarkup(createElement(testModule.exports.PublicationLink,
      { resource: "paper", className: "text-link" }, "Read the paper"));
    const link = new JSDOM(html).window.document.querySelector("a");
    assert.equal(link.href, "https://example.org/paper");
    assert.equal(link.className, "text-link");
    assert.equal(link.getAttribute("data-publication-pending"), pending ? "true" : null);
    assert.equal(link.textContent, pending ? "Read the paper (link pending)" : "Read the paper");
    assert.equal(link.hasAttribute("title"), pending);
  });
}
