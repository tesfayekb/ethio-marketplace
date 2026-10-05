/**
 * INC-431 — the Amharic catalogue holds readable Amharic only: no value carries
 * an unassigned code point, and every letter is Ethiopic or Latin (Latin for
 * brand names and the site name). Garbled values slipped in through letters of
 * other scripts and holes in the Ethiopic block.
 */
import { describe, expect, it } from "vitest";
import { am } from "./am";

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
});
