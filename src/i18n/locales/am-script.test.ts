/**
 * INC-431 — the Amharic catalogue holds readable Amharic only: no value carries
 * an unassigned code point, and every letter is Ethiopic or Latin (Latin for
 * brand names and the site name). Garbled values slipped in through letters of
 * other scripts and holes in the Ethiopic block.
 */
import { describe, expect, it } from "vitest";
import { am } from "./am";
import { amGuide } from "./am-guide";
import { enGuide } from "./en-guide";

describe("am.ts script guard (INC-431)", () => {
  const entries = Object.entries(am as Record<string, string>);

  it("no value carries an unassigned code point", () => {
    const bad = entries
      .filter(([, value]) => /\p{Cn}/u.test(value))
      .map(
        ([key, value]) =>
          `${key}: ${[...value.matchAll(/\p{Cn}/gu)].map((m) => `U+${m[0].codePointAt(0)!.toString(16).toUpperCase()}`).join(",")}`,
      );
    expect(bad).toEqual([]);
  });

  it("every letter is Ethiopic or Latin", () => {
    const foreign = /(?![\p{Script=Ethiopic}\p{Script=Latin}])\p{L}/gu;
    const bad = entries
      .filter(([, value]) => new RegExp(foreign.source, "u").test(value))
      .map(
        ([key, value]) =>
          `${key}: ${[...value.matchAll(foreign)].map((m) => `U+${m[0].codePointAt(0)!.toString(16).toUpperCase()}`).join(",")}`,
      );
    expect(bad).toEqual([]);
  });

  // P-1c turn (c) (ruling 1, 3) — a `{…}` is a template slot everywhere else in the catalogue
  // (the strings guards, `fill`, the database's placeholder validator), so a Guide text, which
  // is prose and never filled, carries no brace in either language.
  it("no guide value, English or Amharic, carries a brace", () => {
    const braced = (layer: Record<string, string>) =>
      Object.entries(layer)
        .filter(([, value]) => /[{}]/.test(value))
        .map(([key]) => key);
    expect(braced(enGuide)).toEqual([]);
    expect(braced(amGuide)).toEqual([]);
    expect(braced({ planted: "a {count} slot" })).toEqual(["planted"]);
  });
});
