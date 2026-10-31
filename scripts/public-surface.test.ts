import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { migrationSurfaceOffenders, parseSurface } from "./public-surface";

describe("shared public-surface parser", () => {
  it("SLB-6 the migration CLI and lint parse the planted roles line identically", () => {
    const dir = mkdtempSync(join(tmpdir(), "surface-parser-"));
    try {
      const text = "planted | anon, authenticated | shared reader proof\n";
      const path = join(dir, "allow.txt");
      writeFileSync(path, text);
      expect(
        JSON.parse(
          execFileSync("bun", ["scripts/public-surface.ts", "--parse", path], { encoding: "utf8" }),
        ),
      ).toEqual(parseSurface(text));
      const sqlPath = join(dir, "grant.sql");
      writeFileSync(
        sqlPath,
        "GRANT EXECUTE ON FUNCTION public.planted(text) TO anon, authenticated;",
      );
      expect(
        execFileSync("bun", ["scripts/public-surface.ts", "--migration", path, sqlPath], {
          encoding: "utf8",
        }),
      ).toBe("");
      writeFileSync(sqlPath, "GRANT EXECUTE ON FUNCTION public.planted(text) TO PUBLIC;");
      expect(
        execFileSync("bun", ["scripts/public-surface.ts", "--migration", path, sqlPath], {
          encoding: "utf8",
        }),
      ).toContain("planted (public)");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
  it("refuses malformed roles and the old two-field shape", () => {
    expect(() => parseSurface("known | owner | read")).toThrow("invalid role");
    expect(() => parseSurface("known | read")).toThrow("malformed line");
  });
  it("PUBLIC covers anon and authenticated and format-grant loops keep roles", () => {
    const entries = parseSurface("known | public | pure shape");
    expect(
      migrationSurfaceOffenders(
        "GRANT EXECUTE ON FUNCTION public.known() TO anon, authenticated;",
        entries,
      ),
    ).toEqual([]);
    expect(
      migrationSurfaceOffenders(
        "FOREACH f IN ARRAY ARRAY['public.known()'] LOOP EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO anon', f); END LOOP;",
        parseSurface("known | authenticated | read"),
      ),
    ).toEqual(["known (anon)"]);
  });
});
