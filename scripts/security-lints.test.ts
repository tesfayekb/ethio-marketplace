import { describe, expect, it } from "vitest";

import { compareLints, parseLints, parseLintTsv, type LintCount } from "./security-lints";

const base = { a_error: 2, b_warn: 3 };
const at = (a: number, b: number): LintCount[] => [
  { name: "a_error", level: "ERROR", count: a },
  { name: "b_warn", level: "WARN", count: b },
];

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
});

describe("parseLints", () => {
  it("DEC-240 parses three TSV lint rows", () => {
    expect(parseLintTsv("a_error\tERROR\t2\nb_warn\tWARN\t3\nc_error\tERROR\t0\n")).toEqual([
      ...at(2, 3), { name: "c_error", level: "ERROR", count: 0 },
    ]);
  });
  it("DEC-240 refuses a TSV non-integer count", () => {
    expect(() => parseLintTsv("a_error\tERROR\t2.5\n")).toThrow("non-integer count");
  });
  it("refuses an answer that is not an array", () => {
    expect(() => parseLints({})).toThrow();
  });
});
