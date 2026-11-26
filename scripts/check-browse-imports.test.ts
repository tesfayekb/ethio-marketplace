import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Cursor bundle 7c, ruling 2 — the browse-path guard (scripts/check-browse-imports.sh) admits the
 * one hook (src/features/permissions/use-may-call.ts) from an admin folder (src/features/admin/, or
 * src/features/admin-<name>/) and still refuses every other importer of the permission seam. Each case
 * runs the guard on a fixture tree under scripts/fixtures/browse-imports/; CI's own step runs it
 * on src/ and on scripts/fixtures (which must fail).
 */

const ROOT = process.cwd();
const FIXTURES = join(ROOT, "scripts/fixtures/browse-imports");

function guard(dir: string): { status: number | null; out: string } {
  const result = spawnSync("bash", [join(ROOT, "scripts/check-browse-imports.sh"), dir], {
    encoding: "utf8",
    timeout: 60_000,
  });
  return { status: result.status, out: `${result.stdout}${result.stderr}` };
}

describe("the browse-path guard admits the hook from admin folders (cursor bundle 7c)", () => {
  it("BPG-1 an admin-folder module importing the hook passes, in admin-* and in admin/", () => {
    for (const tree of ["admin-hook", "admin-dir-hook"]) {
      const run = guard(join(FIXTURES, tree));
      expect(run.out, tree).toContain("Browse-path guard OK");
      expect(run.status, tree).toBe(0);
    }
  });

  it("BPG-2 a browse-path module importing the hook fails by its path", () => {
    const run = guard(join(FIXTURES, "browse-hook"));
    expect(run.status).toBe(1);
    expect(run.out).toContain("src/features/feed/hook-import-example.ts.txt");
  });

  it("BPG-3 an admin-folder module importing the seam beside the hook fails by its path", () => {
    const run = guard(join(FIXTURES, "admin-seam"));
    expect(run.status).toBe(1);
    expect(run.out).toContain("src/features/admin-screening/seam-import-example.ts.txt");
  });

  it("BPG-4 the real source passes, and the fixtures as a whole still fail (CI's self-test)", () => {
    expect(guard(join(ROOT, "src")).status).toBe(0);
    const fixtures = guard(join(ROOT, "scripts/fixtures"));
    expect(fixtures.status).toBe(1);
    expect(fixtures.out).toContain("bad-permission-import-example.ts.txt");
  });
});
