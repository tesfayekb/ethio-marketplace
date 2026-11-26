import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Cursor bundle 7c, ruling 2 — the browse-path guard (scripts/check-browse-imports.sh) admits the
 * one hook (src/features/permissions/use-may-call.ts) from an admin folder (src/features/admin/, or
 * src/features/admin-<name>/) and still refuses every other importer of the permission seam. Each case
 * runs the guard on a fixture tree under scripts/fixtures/browse-imports/; CI's own step runs it
 * on src/ and on scripts/fixtures (which must fail).
 *
 * Cursor bundle 8a, ruling 2 (INC-1309) — it also admits the hook from the admin route files
 * (src/routes/admin.<…>), and every case runs twice: relative, as CI's step runs it (the tree as
 * the working folder, the argument `src`), and absolute (the full path through the tree).
 */

const ROOT = process.cwd();
const FIXTURES = join(ROOT, "scripts/fixtures/browse-imports");
const GUARD = join(ROOT, "scripts/check-browse-imports.sh");
const RUN_DEADLINE = 60_000;

type Run = { status: number | null; out: string };

function guard(dir: string, cwd = ROOT): Run {
  const result = spawnSync("bash", [GUARD, dir], { cwd, encoding: "utf8", timeout: RUN_DEADLINE });
  return { status: result.status, out: `${result.stdout}${result.stderr}` };
}

/** The guard on a fixture tree, both ways: `src` from the tree, and the tree's absolute path. */
function bothWays(tree: string): Array<[string, Run]> {
  return [
    [`${tree} (relative)`, guard("src", join(FIXTURES, tree))],
    [`${tree} (absolute)`, guard(join(FIXTURES, tree))],
  ];
}

function passes(tree: string) {
  for (const [form, run] of bothWays(tree)) {
    expect(run.out, form).toContain("Browse-path guard OK");
    expect(run.status, form).toBe(0);
  }
}

function fails(tree: string, path: string) {
  for (const [form, run] of bothWays(tree)) {
    expect(run.status, form).toBe(1);
    expect(run.out, form).toContain(path);
  }
}

describe("the browse-path guard admits the hook from admin folders (cursor bundle 7c)", () => {
  it("BPG-1 an admin-folder module importing the hook passes, in admin-* and in admin/", () => {
    passes("admin-hook");
    passes("admin-dir-hook");
  });

  it("BPG-2 a browse-path module importing the hook fails by its path", () => {
    fails("browse-hook", "src/features/feed/hook-import-example.ts.txt");
  });

  it("BPG-3 an admin-folder module importing the seam beside the hook fails by its path", () => {
    fails("admin-seam", "src/features/admin-screening/seam-import-example.ts.txt");
  });

  it(
    "BPG-4 the real source passes, and the fixtures as a whole still fail (CI's self-test)",
    () => {
      const ci = guard("src");
      expect(ci.out, "src from the root, as CI's step").toContain("Browse-path guard OK");
      expect(ci.status, "src from the root, as CI's step").toBe(0);
      expect(guard(join(ROOT, "src")).status).toBe(0);
      const fixtures = guard(join(ROOT, "scripts/fixtures"));
      expect(fixtures.status).toBe(1);
      expect(fixtures.out).toContain("bad-permission-import-example.ts.txt");
    },
    3 * RUN_DEADLINE,
  );

  it("BPG-5 an admin route file importing the hook passes (cursor bundle 8a)", () => {
    passes("admin-route-hook");
  });

  it("BPG-6 a browse-path route file importing the hook fails by its path (cursor bundle 8a)", () => {
    fails("browse-route-hook", "src/routes/listings.ts.txt");
  });

  it("BPG-7 an admin route file importing the seam beside the hook fails by its path (cursor bundle 8a)", () => {
    fails("admin-route-seam", "src/routes/admin.roles.ts.txt");
  });
});
