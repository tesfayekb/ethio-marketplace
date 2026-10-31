import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-PRESS-1 (turn C1, DEC-317, D263/D270) — ONE PRESSED LOOK. A press is marked by the one
 * listener (src/lib/press.ts) and drawn by each primitive from PRESSED (menu-row.ts).
 *  1. Every pressable primitive carries its PRESSED look (and, where it is not tappable by
 *     role alone, `data-pressable`).
 *  2. Nothing else draws or marks a press: no `active:` class, no `data-[pressed]` /
 *     `[data-pressed]` look and no `data-pressed` write outside menu-row.ts, press.ts and the
 *     plain-link rule in src/styles.css.
 * (Rules 3 and 4 land in C2.) The allowlist starts empty: there is none.
 */
type Finding = { file: string; line: number; what: string };

export const PRIMITIVES: ReadonlyArray<{ file: string; needs: readonly string[] }> = [
  { file: "src/components/shell/menu-row.ts", needs: ["${PRESSED.row}", "${PRESSED.list}"] },
  { file: "src/components/shell/band-row.ts", needs: ["${PRESSED.segment}"] },
  { file: "src/components/ui/button.tsx", needs: ["${PRESSED.button}", 'data-pressable=""'] },
  { file: "src/components/ui/tabs.tsx", needs: ["PRESSED.segment", 'data-pressable=""'] },
  {
    file: "src/components/marketplace/listing-card.tsx",
    needs: ["PRESSED.card", "PRESSED.cardLink", 'data-pressable=""'],
  },
  { file: "src/components/ui/sidebar.tsx", needs: ["PRESSED.list"] },
];

const OWNERS = new Set(["src/components/shell/menu-row.ts", "src/lib/press.ts", "src/styles.css"]);
const ACTIVE = /(?<![\w-])active:[\w[]/;
const PRESSED_LOOK = /data-\[pressed\]|\[data-pressed\]|["']data-pressed["']/;

export function pressFindings(files: Array<{ name: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  const byName = new Map(files.map((f) => [f.name, f.text]));
  for (const { file, needs } of PRIMITIVES) {
    const text = byName.get(file);
    if (text === undefined) continue;
    for (const need of needs)
      if (!text.includes(need)) findings.push({ file, line: 1, what: `the primitive lacks ${need}` });
  }
  for (const { name, text } of files) {
    if (OWNERS.has(name)) continue;
    codeOf(text)
      .split("\n")
      .forEach((line, index) => {
        if (ACTIVE.test(line)) findings.push({ file: name, line: index + 1, what: "an own `active:` press look" });
        if (PRESSED_LOOK.test(line))
          findings.push({ file: name, line: index + 1, what: "an own pressed look or mark (read PRESSED)" });
      });
  }
  return findings;
}

describe("CF-PRESS-1 — one pressed look, from the primitives (D263/D270)", () => {
  it(
    "the tree",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx", "css"], skipTests: true }).map((name) => ({
        name: name.split("\\").join("/"),
        text: readFileSync(name, "utf8"),
      }));
      for (const { file } of PRIMITIVES) expect(files.some((f) => f.name === file), file).toBe(true);
      expect(report(pressFindings(files))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("PR-1: a Button without its PRESSED look fails", () => {
    const found = pressFindings([
      { name: "src/components/ui/button.tsx", text: `const b = cva("inline-flex"); <Comp data-pressable="" />` },
    ]);
    expect(report(found)).toContain("lacks ${PRESSED.button}");
  });

  it("PR-2: a screen's own active: class fails", () => {
    const found = pressFindings([
      { name: "src/routes/x.tsx", text: `const a = <a className="active:bg-muted">x</a>;` },
    ]);
    expect(report(found)).toContain("own `active:` press look");
  });

  it("PR-3: a screen's own data-[pressed] look fails", () => {
    const found = pressFindings([
      { name: "src/routes/x.tsx", text: `const a = <a className="data-[pressed]:bg-card">x</a>;` },
    ]);
    expect(report(found)).toContain("own pressed look");
  });

  it("a screen reading the primitives passes", () => {
    expect(
      pressFindings([{ name: "src/routes/x.tsx", text: `const a = <Button variant="ghost">x</Button>;` }]),
    ).toEqual([]);
  });
});
