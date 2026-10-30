import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report } from "./kit";

/**
 * CF-ROWS-1 (D247, INC-1009; Foundations turn R1c) — A MENU LIST FITS BEFORE IT SCROLLS.
 * One mechanism: src/styles.css's `.menu-fit` (rows share the height between 32 and 48 px;
 * `data-many` keeps full-size rows and scrolls) with the one number MENU_FIT_MAX in
 * submenu-signal.ts. C2's exception (D247, 2026-10-30): menu rows in a list of 16 items or
 * fewer shrink to fit the height, down to 32 px, on every pointer; a list of more than 16
 * items keeps full-size rows and scrolls with a visible scrollbar. The census refuses:
 *  - the rule's bounds missing from the stylesheet (the 32 px floor, the 48 px ceiling, the
 *    `data-many` branch);
 *  - a `.menu-fit` list that is not marked `data-many` from MENU_FIT_MAX (no literal 16);
 *  - a panel row that sets its own height (min-h-*), which would outrank the list's share;
 *  - a hidden scrollbar (`scrollbar-none`) on a menu region, each remaining one an
 *    allowlist line `key | reason | until` in menu-rows-allowlist.txt.
 */
type Finding = { file: string; line: number; what: string };
type File = { name: string; text: string };

const CSS = "src/styles.css";
const SIGNAL = "src/components/shell/submenu/submenu-signal.ts";
const IMPL = "src/components/ui/submenu-impl.tsx";
const MENU_FILES = ["src/components/shell/app-rail.tsx", IMPL];

export function rowFindings(files: File[]): { findings: Finding[]; hidden: string[] } {
  const findings: Finding[] = [];
  const hidden: string[] = [];
  const byName = new Map(files.map((file) => [file.name, file.text]));
  const css = byName.get(CSS) ?? "";
  const fit =
    /\.menu-fit:not\(\[data-many\]\) > li:not\(\[aria-hidden\]\) \{[^}]*min-height: 2rem;[^}]*max-height: 3rem;/;
  if (!fit.test(css))
    findings.push({ file: CSS, line: 1, what: "the menu rows' 32–48 px share is missing (D247)" });
  if (!/\.menu-natural\[data-many\] > li > \*/.test(css))
    findings.push({ file: CSS, line: 1, what: "the >16 branch (data-many) is missing (D247)" });
  if (!/export const MENU_FIT_MAX = 16;/.test(codeOf(byName.get(SIGNAL) ?? "")))
    findings.push({ file: SIGNAL, line: 1, what: "MENU_FIT_MAX is not the one number, 16 (D247)" });
  for (const name of MENU_FILES) {
    const text = byName.get(name);
    if (text === undefined) continue;
    const code = codeOf(text);
    const lists = (code.match(/"menu-fit\b/g) ?? []).length;
    const marked = (code.match(/data-many=\{[^}]*(?:MENU_FIT_MAX|fitMax)/g) ?? []).length;
    if (lists !== marked)
      findings.push({
        file: name,
        line: 1,
        what: `${lists} menu-fit list(s), ${marked} marked data-many from MENU_FIT_MAX (D247)`,
      });
    code.split("\n").forEach((line, index) => {
      if (/data-many=\{[^}]*>\s*\d/.test(line))
        findings.push({
          file: name,
          line: index + 1,
          what: "a literal count for data-many (D247)",
        });
      if (/scrollbar-none/.test(line)) hidden.push(`${name}:${index + 1}`);
    });
  }
  const row = /const ROW =\s*\n?\s*"([^"]*)"/.exec(codeOf(byName.get(IMPL) ?? ""));
  if (row && /\bmin-h-/.test(row[1] ?? ""))
    findings.push({ file: IMPL, line: 1, what: "a panel row sets its own height (D247)" });
  return { findings, hidden };
}

const read = (name: string): File => ({ name, text: readFileSync(name, "utf8") });

describe("CF-ROWS-1 a menu list fits before it scrolls", () => {
  it("the rule is whole, every menu-fit list is counted from MENU_FIT_MAX, and no menu region hides its scrollbar unallowed", () => {
    const { findings, hidden } = rowFindings([CSS, SIGNAL, ...MENU_FILES].map(read));
    const keys = hidden.map((at) => at.replace(/:\d+$/, "") + " (scrollbar-none)");
    const counted = [...new Set(keys)].map(
      (key) => `${key.replace(" (scrollbar-none)", "")} (${keys.filter((k) => k === key).length})`,
    );
    const allowed = readAllowlist("scripts/conformance/menu-rows-allowlist.txt", counted);
    const unallowed = counted
      .filter((key) => !allowed.has(key))
      .map((key) => ({ file: key, line: 1, what: "a menu region hides its scrollbar (D247)" }));
    console.log(`[CF-ROWS-1] hidden scrollbars: ${counted.join(", ") || "none"}`);
    const all = [...findings, ...unallowed];
    expect(all, report(all)).toEqual([]);
  });

  it("self-test: a missing floor, an unmarked list, a literal 16, a sized panel row and a hidden scrollbar are refused; >16 is its own branch", () => {
    const { findings, hidden } = rowFindings([
      { name: CSS, text: ".menu-fit > li { min-height: 2.75rem; }" },
      { name: SIGNAL, text: "export const MENU_FIT_MAX = 12;" },
      {
        name: "src/components/shell/app-rail.tsx",
        text: '<ul className="menu-fit flex" data-many={rows.length > 16 ? "" : undefined} />\n<div className="overflow-y-auto scrollbar-none" />',
      },
      { name: IMPL, text: 'const ROW =\n  "flex min-h-11 w-full";' },
    ]);
    expect(findings.map((f) => f.what)).toEqual([
      "the menu rows' 32–48 px share is missing (D247)",
      "the >16 branch (data-many) is missing (D247)",
      "MENU_FIT_MAX is not the one number, 16 (D247)",
      "1 menu-fit list(s), 0 marked data-many from MENU_FIT_MAX (D247)",
      "a literal count for data-many (D247)",
      "a panel row sets its own height (D247)",
    ]);
    expect(hidden).toEqual(["src/components/shell/app-rail.tsx:2"]);
    // The >16 branch on a planted list of 17 (ROWS-E2 waits for R1d's admin menu).
    const items = Array.from({ length: 17 }, (_, index) => index);
    const MENU_FIT_MAX = 16;
    expect(items.length > MENU_FIT_MAX).toBe(true);
    expect(items.slice(0, 16).length > MENU_FIT_MAX).toBe(false);
  });
});
