import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  LOCAL_ALLOWANCE_KIB,
  NEAR_KIB,
  ceilingFor,
  ceilingForLocal,
  nearFindings,
  exceedsCeiling,
} from "../budget-band.mjs";

/** DEC-296 (turn A): no ceiling sits inside the NEAR band of the size it judges. */
describe("the budget's NEAR band (DEC-296, turn A)", () => {
  it("NB-1 one constant and one form", () => {
    expect(NEAR_KIB).toBe(0.3);
    expect(LOCAL_ALLOWANCE_KIB).toBe(0.1);
    expect(ceilingFor(208.0)).toBe(209);
    expect(ceilingFor(208.7)).toBe(210);
    expect(ceilingFor(212.1)).toBe(213);
    expect(ceilingForLocal(208.6)).toBe(210);
  });

  it("NB-2 a ceiling 0.1 KiB over its size fails, naming page, size and ceilingFor", () => {
    const found = nearFindings([{ label: "/planted", kib: 307.9, ceiling: 308 }], true);
    expect(found).toHaveLength(1);
    expect(found[0]).toContain("/planted");
    expect(found[0]).toContain("307.9 KiB");
    expect(found[0]).toContain("ceilingFor(size) = 309");
    expect(found[0]).toContain("DEC-296");
  });

  it("NB-3 a ceiling 0.3 KiB over its size passes; an over-ceiling size is left to the ceiling check", () => {
    expect(nearFindings([{ label: "/planted", kib: 307.7, ceiling: 308 }], true)).toEqual([]);
    expect(nearFindings([{ label: "/planted", kib: 309, ceiling: 308 }], true)).toEqual([]);
  });

  it("NB-4 the entry and the stylesheet are judged like the pages", () => {
    const found = nearFindings([
      { label: "entry JS", kib: 208.9, ceiling: 209 },
      { label: "stylesheet", kib: 39.8, ceiling: 40 },
      { label: "/", kib: 221.0, ceiling: 223 },
    ], true);
    expect(found.map((line) => line.split(":")[0])).toEqual(["entry JS", "stylesheet"]);
  });

  it("NB-5 check-bundle-size.mjs reads the band for the entry, the stylesheet and every page", () => {
    const check = readFileSync("scripts/check-bundle-size.mjs", "utf8");
    expect(check).toContain('from "./budget-band.mjs"');
    expect(check).toMatch(/nearFindings\(\[\s*\.\.\.\["js", "css"\]/);
    expect(check).toContain("...rows.map(");
  });

  it("NB-6 local 398.7 under 399 is in the band, with the local ceiling form", () => {
    const found = nearFindings([{ label: "/planted", kib: 398.7, ceiling: 399 }], false);
    expect(found).toHaveLength(1);
    expect(found[0]).toContain("ceilingForLocal(size) = 400");
  });

  it("NB-7 CI's measured 398.7 under 399 is outside the band", () => {
    expect(nearFindings([{ label: "/planted", kib: 398.7, ceiling: 399 }], true)).toEqual([]);
  });

  it("NB-8 a local size 0.05 over its ceiling fails the ceiling check", () => {
    expect(exceedsCeiling(399.05, 399, false)).toBe(true);
    // The allowance must also catch a local size that looks just under the ceiling.
    expect(exceedsCeiling(398.95, 399, false)).toBe(true);
    expect(exceedsCeiling(398.95, 399, true)).toBe(false);
  });
});
