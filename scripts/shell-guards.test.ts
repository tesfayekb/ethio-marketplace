import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
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
      expect(planted.out).toContain(
        'bad-datatable-minwidth-class-example.tsx.txt:10:    minWidth: "w-fit max-w-40", // C7-dense: the planted ACT-023 case  <- ACT-023',
      );
      expect(planted.out).toContain("findings: 2");
      expect(planted.status).toBe(1);
      const tree = run("scripts/check-datatable-minwidth.sh", []);
      expect(tree.out).toContain("findings: 0");
      expect(tree.status).toBe(0);
    },
    TREE_SCAN_MS,
  );

  it("GW-4 a minWidth is exactly one min-w-* class: two classes, a width that is not a min-width, one arm of a choice, a name or a sum are refused (ACT-023)", () => {
    const dir = mkdtempSync(join(tmpdir(), "minwidth-"));
    try {
      const column = (value: string) =>
        `const c = {\n  key: "k",\n  minWidth: ${value}, // C7-dense: planted\n};\n`;
      writeFileSync(join(dir, "one.tsx"), column('"min-w-40"'));
      writeFileSync(join(dir, "arbitrary.tsx"), column('"min-w-[12rem]"'));
      writeFileSync(
        join(dir, "choice.tsx"),
        column('kind === "primary" ? "min-w-56" : (`min-w-40`)'),
      );
      expect(run("scripts/check-datatable-minwidth.sh", [dir]).out).toContain("findings: 0");
      writeFileSync(join(dir, "two.tsx"), column('"min-w-40 max-w-60"'));
      writeFileSync(join(dir, "width.tsx"), column("'w-fit'"));
      writeFileSync(join(dir, "arm.tsx"), column('wide ? "min-w-56" : "w-40"'));
      writeFileSync(join(dir, "named.tsx"), column("columnWidth"));
      writeFileSync(join(dir, "sum.tsx"), column('"min-w-40" + extra'));
      const refused = run("scripts/check-datatable-minwidth.sh", [dir]);
      for (const file of ["two", "width", "arm", "named", "sum"])
        expect(refused.out).toMatch(new RegExp(`${file}\\.tsx:3:.*<- ACT-023`));
      expect(refused.out).toContain("findings: 5");
      expect(refused.status).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  /**
   * The executor sandbox shims git read-only (add/commit/push refused even in
   * a throwaway /tmp repository), where the selftest's temporary bare repo can
   * never run. CI runs GW-3 with real git; only the shimmed sandbox skips.
   */
  const gitShimmed = (() => {
    const path = spawnSync("which", ["git"], { encoding: "utf8" }).stdout.trim();
    if (!path.startsWith("/tmp/")) return false;
    try {
      return readFileSync(path, "utf8").includes("is not allowed");
    } catch {
      return false;
    }
  })();

  it.skipIf(gitShimmed)(
    "GW-3 the publish-evidence self-test passes against its temporary bare repository (INC-855)",
    () => {
      const result = run("scripts/publish-evidence.selftest.sh", []);
      expect(result.out).toContain("publish-evidence self-test: ALL PASS");
      expect(result.status).toBe(0);
    },
    TREE_SCAN_MS,
  );
});
