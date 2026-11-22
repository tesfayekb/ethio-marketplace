import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";
import { castFiles, doubleCastLines, GENERATED, typeCastCensus } from "./type-casts";

/**
 * INC-1239 — rule 10's ban on the double cast is judged. The mechanism is type-casts.ts (the census
 * over src/, e2e/ and scripts/, generated files left out as a class); its ratchet is
 * type-casts-allowlist.txt — one line per file, keyed `<file> (<count>)`, `key | reason | until`,
 * so a file that sheds a cast lowers its line (the old line goes stale and fails) and a file that
 * gains one is named.
 */

const ALLOWLIST = "scripts/conformance/type-casts-allowlist.txt";
/** The ban's words, spelled by their parts so this file's own text carries none. */
const DOUBLE = ["as", "unknown", "as"].join(" ");

describe("rule 10's double cast is judged (INC-1239)", () => {
  it(
    "CF-CAST-1 every file holds no more double casts than its allowlist line says, and a file with none holds no line",
    () => {
      const files = castFiles();
      const { keys, findings } = typeCastCensus(files);
      const allowed = readAllowlist(ALLOWLIST, keys);
      console.log(
        `[CF-CAST-1] files read: ${files.length}; files holding a double cast: ${keys.length}; casts: ${findings.length}; allowlist: ${allowed.size}`,
      );
      expect(files.length).toBeGreaterThan(1000);
      expect(report(findings.filter((hit) => !allowed.has(hit.file)))).toBe("");
      // The files this bundle moved off the cast stay off it.
      for (const moved of [
        "e2e/admin-categories-console.spec.ts",
        "e2e/admin-users.spec.ts",
        "e2e/my-listings-page.spec.ts",
        "e2e/post-wizard-bundle2.spec.ts",
        "src/features/admin-screening/use-screening.ts",
      ])
        expect(keys.filter((key) => key.startsWith(`${moved} (`))).toEqual([]);
      // The generated files are a class the census leaves out, by path.
      expect(GENERATED.test("src/integrations/supabase/types.ts")).toBe(true);
      expect(GENERATED.test("src/routeTree.gen.ts")).toBe(true);
      expect(GENERATED.test("src/features/posting/map/pin.ts")).toBe(false);
      expect(files.filter((file) => GENERATED.test(file))).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CF-CAST-2 a planted double cast is found at its line — wrapped or split over lines — and a string, a comment, a single cast and a guard are not", () => {
    const text = [
      `const a = value ${DOUBLE} Row;`,
      `const b = (value as unknown) as Row;`,
      `const c = value ${DOUBLE}`,
      `  Row;`,
      `const quiet = "${DOUBLE} Row";`,
      `// value ${DOUBLE} Row`,
      `const single = value as Row;`,
      `const unknownOnly = value as unknown;`,
      `const guarded = isRow(value) ? value : null;`,
    ].join("\n");
    expect(doubleCastLines("planted.ts", text)).toEqual([1, 2, 3]);
    expect(doubleCastLines("clean.ts", "export const x = 1;\n")).toEqual([]);
    const planted = typeCastCensus(["planted.ts", "clean.ts"], (file) =>
      file === "planted.ts" ? text : "export const x = 1;\n",
    );
    expect(planted.keys).toEqual(["planted.ts (3)"]);
    expect(planted.findings.map((hit) => `${hit.file}:${hit.line}`)).toEqual([
      "planted.ts (3):1",
      "planted.ts (3):2",
      "planted.ts (3):3",
    ]);
    // The same census reads a real file from disk (the walker's own reading).
    const dir = "node_modules/.cache/type-casts";
    mkdirSync(dir, { recursive: true });
    try {
      const file = `${dir}/planted.ts`;
      writeFileSync(file, `export const v = (1 ${DOUBLE} string).length;\n`);
      expect(doubleCastLines(file)).toEqual([1]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-CAST-3 a stale, expired, malformed or duplicate allowance fails, and a file that sheds a cast leaves a stale line", () => {
    const dir = "node_modules/.cache/type-casts-list";
    mkdirSync(dir, { recursive: true });
    const list = `${dir}/allowlist.txt`;
    try {
      const census = { keys: ["planted.ts (2)"] };
      const shed = { keys: ["planted.ts (1)"] };
      writeFileSync(list, "planted.ts (2) | written before the rule | INC-1239\n");
      expect([...readAllowlist(list, census.keys).keys()]).toEqual(["planted.ts (2)"]);
      // The file shed one: its census key is now (1), so the old line is stale.
      expect(() => readAllowlist(list, shed.keys)).toThrow("stale allowance");
      writeFileSync(list, "planted.ts (2) | written before the rule | 2020-01-01\n");
      expect(() => readAllowlist(list, census.keys)).toThrow("expired allowance");
      writeFileSync(list, "planted.ts (2) | written before the rule\n");
      expect(() => readAllowlist(list, census.keys)).toThrow("three non-empty cells");
      writeFileSync(list, "planted.ts (2) | a | INC-1239\nplanted.ts (2) | b | INC-1239\n");
      expect(() => readAllowlist(list, census.keys)).toThrow("duplicate key");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
