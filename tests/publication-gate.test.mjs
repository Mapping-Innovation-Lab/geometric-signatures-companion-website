import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("publication gate rejects pending destinations in nested pages and pending licensing", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "publication-gate-"));
  const license = join(fixture, "LICENSE");
  const run = (extraEnv = {}) => spawnSync(process.execPath,
    [fileURLToPath(new URL("../scripts/verify-publication.mjs", import.meta.url))],
    { encoding: "utf8", env: { ...process.env, STATIC_EXPORT_DIR: fixture,
      PUBLICATION_LICENSE_FILE: license, ...extraEnv } });
  try {
    await mkdir(join(fixture, "supplement"));
    await writeFile(join(fixture, "index.html"), '<a href="https://example.com/paper">Paper</a>');
    await writeFile(join(fixture, "supplement/index.html"), '<a href="https://example.com/code" data-publication-pending="true">Code</a>');
    await writeFile(license, "LICENSING_PENDING");
    let result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /supplement\/index\.html/);
    assert.match(result.stderr, /licens/i);

    await writeFile(license, "Selected release terms");
    result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /unresolved publication link/i);

    result = run({ ALLOW_PENDING_PUBLICATION_LINKS: "true" });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stderr, /publishing with unresolved publication links/i);

    await writeFile(join(fixture, "supplement/index.html"), '<a href="https://example.com/code">Code</a>');
    result = run();
    assert.equal(result.status, 0, result.stderr);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
