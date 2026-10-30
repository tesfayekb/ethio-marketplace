import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-LOOK-1 (turn SAGE-S0, ruling 4; DEC-289, D250) — ONE LOOK: every colour, shadow, radius
 * and type value comes from src/styles.css's tokens. The census reads the code (never the
 * comments: `#185` in a comment is React's error number) of every .ts and .tsx under src/,
 * tests excluded, and finds:
 *  - a Tailwind arbitrary value for colour, shadow, radius or font — `bg-[`, `text-[#`,
 *    `border-[`, `ring-[`, `fill-[`, `stroke-[`, `shadow-[`, `rounded-…[`, `font-[` (and their
 *    side and variant forms). Widths and sizes (`ring-[3px]`, `border-[1.5px]`) are not looks;
 *    `rounded-[inherit]` and a bare token (`bg-[var(--x)]`) are not values;
 *  - a raw hex, rgb()/rgba(), hsl()/hsla() or oklch() literal. src/styles.css is the one home
 *    of these (not a .ts file, so outside the domain).
 * The existing guards cover other ground and are not repeated here: styles.tokens.test.ts
 * refuses hex and rgb() inside the stylesheet's :root and .dark; look-law.test.ts (LL-1)
 * refuses a plain card border. A recorded exception is a line in look-values-allowlist.txt
 * keyed `<file> (<findings>)` | reason | until: the part or INC that fixes it, or a review
 * date for a value that never reaches the stylesheet.
 */
type Finding = { file: string; line: number; what: string };

const ARBITRARY =
  /(?<![\w-])((?:bg|border(?:-[xytblrse])?|ring(?:-offset)?|fill|stroke|shadow|outline|decoration|divide|from|via|to|accent|caret|font|rounded(?:-(?:t|b|l|r|s|e|tl|tr|bl|br|ss|se|es|ee))?)-\[([^\]\s]+)\]|text-\[#[^\]\s]*\])/g;
const SIZE = /^-?[\d.]+(?:px|rem|em|%)?$/;
const NOT_A_VALUE = /^(?:inherit|var\(--[\w-]+\))$/;
const COLOUR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])|\b(?:rgba?|hsla?|oklch)\(/g;

/** Every finding in one file's text. */
export function lookFindings(file: string, text: string): Finding[] {
  const findings: Finding[] = [];
  codeOf(text)
    .split("\n")
    .forEach((code, index) => {
      for (const m of code.matchAll(ARBITRARY)) {
        const value = m[2];
        const kind = m[1]?.split("-[")[0] ?? "";
        if (value !== undefined && !kind.startsWith("text")) {
          if (NOT_A_VALUE.test(value)) continue;
          if (SIZE.test(value) && !kind.startsWith("rounded")) continue;
        }
        findings.push({ file, line: index + 1, what: `arbitrary look value ${m[0]}` });
      }
      for (const m of code.matchAll(COLOUR))
        findings.push({ file, line: index + 1, what: `raw colour ${m[0]}` });
    });
  return findings;
}

function keyOf(file: string, count: number): string {
  return `${file} (${count})`;
}

describe("CF-LOOK-1 one look: colours, shadows, radii and fonts come from tokens", () => {
  it(
    "CF-LOOK-1 no arbitrary look value or raw colour under src/ outside its allowlist line",
    () => {
      const byFile = new Map<string, Finding[]>();
      for (const path of walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true })) {
        const file = relative(process.cwd(), path).split("\\").join("/");
        const findings = lookFindings(file, readFileSync(path, "utf8"));
        if (findings.length) byFile.set(file, findings);
      }
      const found = new Set([...byFile].map(([file, list]) => keyOf(file, list.length)));
      const allowed = readAllowlist("scripts/conformance/look-values-allowlist.txt", found);
      const open = [...byFile]
        .filter(([file, list]) => !allowed.has(keyOf(file, list.length)))
        .flatMap(([, list]) => list);
      console.log(
        `[look-values] files with findings: ${byFile.size}; findings: ${[...byFile.values()].flat().length}; allowed files: ${allowed.size}`,
      );
      expect(report(open)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-LOOK-2 planted: each bypass is found; tokens, sizes and comments pass", () => {
    const planted = [
      'const a = "shadow-[0_0_0_1px_red]";',
      'const b = "hover:bg-[#fff]";',
      'const c = "rounded-t-[1rem]";',
      'const d = "text-[#123456]";',
      'const e = "font-[Inter]";',
      'const f = "border-s-[oklch(0.5_0.1_30)]";',
      'const g = { color: "#1E5A43" };',
      'const h = "rgba(0,0,0,.5)";',
      'const i = "hsl(10 20% 30%)";',
    ].join("\n");
    expect(lookFindings("planted.tsx", planted).map((f) => f.line)).toEqual([
      1, 2, 3, 4, 5, 6, 6, 7, 8, 9,
    ]);
    const clean = [
      'const a = "ring-[3px] border-[1.5px] rounded-[inherit] bg-[var(--sidebar)]";',
      'const b = "text-[11px] text-[0.8rem] shadow-card rounded-card bg-tier-premium";',
      "// React aborts with #185 — a comment, not a colour",
      "/* oklch(0.5 0.1 30) in a comment */",
      'const c = "data-[state=open]:bg-primary";',
    ].join("\n");
    expect(lookFindings("clean.tsx", clean)).toEqual([]);
  });
});
