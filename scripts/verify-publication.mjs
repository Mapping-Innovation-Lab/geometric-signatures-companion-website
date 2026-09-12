import { readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const root = process.env.STATIC_EXPORT_DIR
  ? resolve(process.env.STATIC_EXPORT_DIR)
  : fileURLToPath(new URL("../out", import.meta.url));
const licensePath = process.env.PUBLICATION_LICENSE_FILE
  ?? fileURLToPath(new URL("../LICENSE", import.meta.url));
const issues = [];
const warnings = [];
const allowPendingLinks = process.env.ALLOW_PENDING_PUBLICATION_LINKS === "true";
const files = await readdir(root, { recursive: true });
const pages = files.filter((file) => file.endsWith(".html"));
if (!pages.length) issues.push("No HTML pages found; build the static export first.");
for (const file of pages) {
  const document = new JSDOM(await readFile(join(root, file), "utf8")).window.document;
  const pending = [...document.querySelectorAll('[data-publication-pending="true"]')];
  for (const link of pending) {
    const message = `${file}: unresolved publication link ${link.getAttribute("href")}`;
    (allowPendingLinks ? warnings : issues).push(message);
  }
}
const license = await readFile(licensePath, "utf8").catch(() => "LICENSING_PENDING");
if (!license.trim() || license.includes("LICENSING_PENDING")) {
  issues.push("Release licensing is unresolved. Confirm code and content reuse terms in LICENSE.");
}
if (issues.length) {
  console.error(`Publication blocked:\n${[...new Set(issues)].map((issue) => `- ${issue}`).join("\n")}`);
  process.exitCode = 1;
} else {
  if (warnings.length) {
    console.warn(`Publishing with unresolved publication links by explicit override:\n${
      [...new Set(warnings)].map((warning) => `- ${warning}`).join("\n")}`);
  }
  console.log("Publication license verified. Check placeholder links again before the final paper release.");
}
