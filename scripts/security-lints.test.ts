import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  compareLints,
  compareSurface,
  parseLints,
  parseLintTsv,
  parseSurfaceTsv,
  type LintCount,
} from "./security-lints";
import { parseSurface } from "./public-surface";

const base = { a_error: 2, b_warn: 3 };
const at = (a: number, b: number): LintCount[] => [
  { name: "a_error", level: "ERROR", count: a },
  { name: "b_warn", level: "WARN", count: b },
];

describe("DEC-310 one public surface", () => {
  const entries = parseSurface(
    "known | anon,authenticated | public read\nlistings | anon | card fields\n",
  );
  const exact = parseSurfaceTsv("known\tfunction\ttrue\nlistings\trelation\tfalse\n");
  it("SLB-1 an unlisted anon function fails", () => {
    expect(
      compareSurface(
        [...exact, { name: "planted_unlisted", kind: "function", anon: true }],
        entries,
      ).failed,
    ).toBe(true);
  });
  it("SLB-2 a stale line fails with its public name", () => {
    const verdict = compareSurface(exact, [
      ...entries,
      ...parseSurface("retired | anon | old read"),
    ]);
    expect(verdict.failed).toBe(true);
    expect(verdict.lines).toContain("::error::public surface: stale line retired");
  });
  it("SLB-3 the exact set passes and a live table is not a stale function", () => {
    expect(compareSurface(exact, entries)).toEqual({
      lines: ["public surface: 0 unlisted anon functions; 0 stale lines"],
      failed: false,
    });
  });
  it("SLB-4 no unlisted function name appears in output", () => {
    const verdict = compareSurface(
      [...exact, { name: "private_planted_name", kind: "function", anon: true }],
      entries,
    );
    expect(verdict.failed).toBe(true);
    expect(verdict.lines.join("\n")).not.toContain("private_planted_name");
    expect(verdict.lines.join("\n")).toContain("Read-only catalogue query");
  });
  it("SLB-5 an authenticated-only line does not cover anon execute", () => {
    expect(
      compareSurface(
        exact,
        parseSurface("known | authenticated | caller read\nlistings | anon | fields"),
      ).failed,
    ).toBe(true);
  });
});

describe("compareLints", () => {
  it("fails when an ERROR count rises above its baseline", () => {
    expect(compareLints(at(3, 3), base).failed).toBe(true);
  });

  it("warns, without failing, when a WARN count rises", () => {
    const verdict = compareLints(at(2, 4), base);
    expect(verdict.failed).toBe(false);
    expect(verdict.lines.some((line) => line.startsWith("::warning::b_warn"))).toBe(true);
  });

  it("says the baseline can be lowered when a count falls, without failing", () => {
    const verdict = compareLints(at(1, 3), base);
    expect(verdict.failed).toBe(false);
    expect(verdict.lines).toContain("a_error: baseline can be lowered (2 → 1)");
  });

  it("fails when a baselined name is missing — never read as zero", () => {
    expect(compareLints([{ name: "a_error", level: "ERROR", count: 0 }], base).failed).toBe(true);
  });

  it("fails on a name the baseline does not know", () => {
    expect(
      compareLints([...at(2, 3), { name: "c_new", level: "WARN", count: 0 }], base).failed,
    ).toBe(true);
  });

  it("SLB-9 the baseline holds the database's six names; one role reaching impersonation fails", () => {
    const committed = JSON.parse(
      readFileSync(
        join(dirname(fileURLToPath(import.meta.url)), "security-lints-baseline.json"),
        "utf8",
      ),
    ) as Record<string, number>;
    expect(Object.keys(committed).sort()).toEqual([
      "function_search_path_mutable",
      "impersonation_reach",
      "rls_disabled_in_public",
      "security_definer_view",
      "table_writable_by_client",
    ]);
    const live = (reach: number): LintCount[] => [
      { name: "rls_disabled_in_public", level: "ERROR", count: 0 },
      { name: "security_definer_view", level: "ERROR", count: 0 },
      { name: "function_executable_by_anon", level: "ERROR", count: 0 },
      { name: "function_search_path_mutable", level: "WARN", count: 0 },
      { name: "table_writable_by_client", level: "WARN", count: 0 },
      { name: "impersonation_reach", level: "ERROR", count: reach },
    ];
    expect(compareLints(live(0), committed).failed).toBe(false);
    expect(compareLints(live(1), committed).lines).toContain(
      "::error::impersonation_reach 1 is above its baseline 0",
    );
  });
});

describe("parseLints", () => {
  it("DEC-240 parses three TSV lint rows", () => {
    expect(parseLintTsv("a_error\tERROR\t2\nb_warn\tWARN\t3\nc_error\tERROR\t0\n")).toEqual([
      ...at(2, 3),
      { name: "c_error", level: "ERROR", count: 0 },
    ]);
  });
  it("DEC-240 refuses a TSV non-integer count", () => {
    expect(() => parseLintTsv("a_error\tERROR\t2.5\n")).toThrow("non-integer count");
  });
  it("refuses an answer that is not an array", () => {
    expect(() => parseLints({})).toThrow();
  });
});
