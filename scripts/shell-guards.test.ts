import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Turn C5 (INC-563) — two enforcing guards ran nowhere: no CI job and no unit
 * test called scripts/check-identity-tags.sh (a test that changes its own
 * sign-in factors declares @private-identity; L4b part C) or
 * scripts/check-datatable-minwidth.sh (a table column takes a tier and a
 * width, not a min-width; C3-UX-1d). The unit tests run both now, each proven
 * on its planted file first.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(script: string, args: string[]): { status: number | null; out: string } {
  const result = spawnSync("bash", [script, ...args], { cwd: ROOT, encoding: "utf8" });
  return { status: result.status, out: `${result.stdout}${result.stderr}` };
}

/**
 * INC-594 — each of these tests spawns a shell guard over the whole tree, twice.
 * The scans take 0.3 s alone, but GW-1 took 6.4 s in the executor's sandbox while
 * the rest of the suite ran beside it (turn T12), past vitest's 5 s default. The
 * time is the spawned process waiting for a CPU, not the guard's work, so the
 * two whole-tree tests carry their own timeout.
 */
const TREE_SCAN_MS = 30_000;

describe("shell guards run by the unit tests (INC-563)", () => {
  it(
    "GW-1 the identity-tag guard flags its planted tests and passes the tree",
    () => {
      const self = run("scripts/check-identity-tags.sh", ["--self-test"]);
      expect(self.out).toContain("[identity-tags] self-test OK (flagged X-1 and X-3 only)");
      expect(self.status).toBe(0);
      const tree = run("scripts/check-identity-tags.sh", []);
      expect(tree.out).toContain("[identity-tags] OK");
      expect(tree.status).toBe(0);
    },
    TREE_SCAN_MS,
  );

  it(
    "GW-2 the DataTable min-width guard flags its planted file and passes the tree",
    () => {
      const planted = run("scripts/check-datatable-minwidth.sh", ["scripts/fixtures"]);
      expect(planted.out).toContain("bad-datatable-minwidth-example.tsx.txt");
      expect(planted.out).toContain("findings: 1");
      expect(planted.status).toBe(1);
      const tree = run("scripts/check-datatable-minwidth.sh", []);
      expect(tree.out).toContain("findings: 0");
      expect(tree.status).toBe(0);
    },
    TREE_SCAN_MS,
  );
});
