import { describe, expect, it } from "vitest";
import { authored, exactWord, flaggedPattern, literal, pattern } from "./pattern";

/**
 * CF-PATTERN-1…3 (housekeeping turn 2 Part D, INC-1102) — scripts/lib/pattern.ts builds every
 * RegExp a script makes from text: a planted string enters as itself, a hostile part cannot shape
 * the pattern, and no helper hands back a nested quantifier from its input.
 */

const HOSTILE = [".*", "(", ")", "\\", "[a-z]+", "(a+)+", "a{1,}", "^$", "x|y", "${x}", "?", "/"];

/** A group carrying a quantifier, itself quantified: `(a+)+`, `(?:x*)*`, `(b{2,})*`. */
function nestedQuantifier(source: string): boolean {
  const flat = source.replace(/\\./g, "e").replace(/\[(?:[^\]\\]|\\.)*\]/g, "c");
  const quantified: boolean[] = [];
  for (let i = 0; i < flat.length; i++) {
    const c = flat[i];
    if (c === "(") quantified.push(false);
    else if (c === ")") {
      const inner = quantified.pop() ?? false;
      if (inner && /[*+{]/.test(flat[i + 1] ?? "")) return true;
      if (inner && quantified.length > 0) quantified[quantified.length - 1] = true;
    } else if ((c === "*" || c === "+" || c === "{") && quantified.length > 0)
      quantified[quantified.length - 1] = true;
  }
  return false;
}

describe("the one pattern helper (CF-PATTERN)", () => {
  it("CF-PATTERN-1 literal escapes every metacharacter of a planted string", () => {
    const planted = String.raw`a.b*c+d?e^f$g{h}i(j)k|l[m]n\o`;
    const source = literal(planted);
    for (const c of ".*+?^${}()|[]\\") expect(source.replace(/\\./g, ""), c).not.toContain(c);
    expect(pattern`^${planted}$`.test(planted)).toBe(true);
    expect(pattern`^${planted}$`.test(planted.replace(".", "x"))).toBe(false);
    expect(literal("plain-name_1")).toBe("plain-name_1");
  });

  it("CF-PATTERN-2 a pattern built from a hostile part matches only the part's literal text", () => {
    for (const part of HOSTILE) {
      const rx = pattern`^${part}-ruling-\\d+\\.md$`;
      expect(rx.test(`${part}-ruling-2.md`), part).toBe(true);
      expect(rx.test("anything-ruling-2.md"), part).toBe(false);
      expect(rx.test(`${part}-ruling-x.md`), part).toBe(false);
      const word = exactWord(part);
      expect(word.test(` ${part} `), part).toBe(true);
      expect(word.test(`a${part}`), part).toBe(false);
    }
    expect(flaggedPattern("gi")`${"A.B"}`.flags).toBe("gi");
    expect([..."x A.B a.b axb".matchAll(flaggedPattern("gi")`${"a.b"}`)].length).toBe(2);
    const prefix = /(?:src|e2e)\//;
    expect(pattern`^${prefix}${"a.ts"}$`.test("e2e/a.ts")).toBe(true);
    expect(pattern`^${prefix}${"a.ts"}$`.test("e2e/axts")).toBe(false);
    expect(() => pattern`${/a/g}`).toThrow(/carries flags/);
    expect(() => flaggedPattern("gg")`a`).toThrow(/invalid RegExp flags/);
    expect(() => pattern(["a", "b"])).toThrow(/one more text than parts/);
    expect(authored("^a\\d+$", "m").test("x\na12")).toBe(true);
    expect(() => authored("(")).toThrow();
  });

  it("CF-PATTERN-3 no helper hands back a nested quantifier from its input", () => {
    const oldManifestKey =
      /^[a-z][a-z0-9_]*\((?:[a-z][a-z0-9 _]*(?:\[\])*(?:,[a-z][a-z0-9 _]*(?:\[\])*)*)?\)$/;
    expect(nestedQuantifier(oldManifestKey.source)).toBe(true);
    expect(nestedQuantifier("(a+)+")).toBe(true);
    for (const part of HOSTILE) {
      for (const rx of [
        pattern`${part}`,
        pattern`^${part}${part}$`,
        flaggedPattern("i")`(?:${part})?`,
        exactWord(part),
      ])
        expect(nestedQuantifier(rx.source), `${part} → ${rx.source}`).toBe(false);
    }
    const started = performance.now();
    expect(pattern`^${"(a+)+"}$`.test(`${"a".repeat(40)}!`)).toBe(false);
    expect(performance.now() - started).toBeLessThan(100);
  });
});
