import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
  it("SLB-7 a grant whose object a later migration drops is no offender; the same grant without the drop is (DEC-357)", () => {
    const root = mkdtempSync(join(tmpdir(), "surface-drops-"));
    try {
      const migrations = join(root, "supabase", "migrations");
      mkdirSync(migrations, { recursive: true });
      const allow = join(root, "allow.txt");
      writeFileSync(allow, "listed | anon | planted\n");
      const grant = join(migrations, "001_grant.sql");
      writeFileSync(
        grant,
        "GRANT EXECUTE ON FUNCTION public.gone_fn(uuid) TO authenticated;\n" +
          "GRANT SELECT ON public.gone_table TO anon;\n",
      );
      const judge = () =>
        execFileSync("bun", ["scripts/public-surface.ts", "--migration", allow, grant, root], {
          encoding: "utf8",
        });
      expect(judge()).toBe(`${grant}: gone_fn (authenticated)\n${grant}: gone_table (anon)\n`);
      writeFileSync(
        join(migrations, "002_drop.sql"),
        "DROP FUNCTION public.gone_fn(uuid);\nDROP TABLE public.gone_table;\n",
      );
      expect(judge()).toBe("");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
  it("SLB-8 a name listed twice is refused by name and line, in the parser and the CLI the migration guard runs (INC-443)", () => {
    const planted = "known | authenticated | read\nother | anon | read\nknown | anon | again\n";
    expect(() => parseSurface(planted)).toThrow("public surface: repeated name known on line 3");
    const root = mkdtempSync(join(tmpdir(), "surface-repeat-"));
    try {
      const path = join(root, "allowlist.txt");
      writeFileSync(path, planted);
      expect(() =>
        execFileSync("bun", ["scripts/public-surface.ts", "--parse", path], {
          encoding: "utf8",
          stdio: "pipe",
        }),
      ).toThrow("repeated name known on line 3");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
    // the real allowlist names each surface once
    const real = parseSurface(readFileSync("scripts/public-surface-allowlist.txt", "utf8"));
    expect(real.filter(({ name }) => name === "transition_listing")).toHaveLength(1);
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
