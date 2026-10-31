import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, walkFiles, TREE_SCAN_MS } from "./kit";

/**
 * CF-LIST-1 (D264, Foundations turn F, Sage §14) — ONE OPEN LIST. Every list of choices
 * that opens from a control takes its rows and its panel from src/components/shell/menu-row.ts
 * (LIST_ROW, LIST_PANEL, LIST_SURFACE), never its own. The domain, by definition: every
 * dropdown-facade content part and row (DropdownMenuContent, DropdownMenuSubContent,
 * DropdownMenuItem, DropdownMenuRadioItem, DropdownMenuCheckboxItem), every PopoverContent,
 * every element with role="listbox", "menu" or "option", and every native <select> in src.
 * The census refuses:
 *  - a row part with its own row classes (py-*, px-*, min-h-*, h-*, rounded-*);
 *  - a panel part with its own panel classes (border, shadow-*, rounded-*, p-*, bg-*,
 *    zoom-*), or a facade panel with its own height (max-h-*);
 *  - a sideOffset above 0 (the panel opens against its control's edge);
 *  - an option that does not read LIST_ROW, and an owner (the facade's impl, the picker,
 *    the popover) that does not read the constants;
 *  - a native <select> (the device draws its open list).
 * Exceptions are lines `key | reason | until` in choice-lists-allowlist.txt, key
 * `file#part`; until is a date (expired fails), an INC/DEC/turn id, or `permanent`
 * with its reason; a line naming nothing found fails as stale.
 */
type Finding = { file: string; line: number; what: string };
type Src = { name: string; text: string };

const ROW_PARTS = new Set([
  "DropdownMenuItem",
  "DropdownMenuRadioItem",
  "DropdownMenuCheckboxItem",
  "DropdownMenuSubTrigger",
]);
const FACADE_PANELS = new Set(["DropdownMenuContent", "DropdownMenuSubContent"]);
const PANEL_PARTS = new Set([...FACADE_PANELS, "PopoverContent"]);
const OWN_ROW = /(?:^|\s)(?:py-|px-|min-h-|h-\d|rounded-)\S*/;
const OWN_PANEL = /(?:^|\s)(?:border(?=\s|$)|(?:border-|shadow-|rounded-|p-\d|bg-|zoom-)\S*)/;
const OWN_HEIGHT = /(?:^|\s)max-h-\S*/;
export const OWNERS: Record<string, RegExp> = {
  "src/components/ui/dropdown-menu-impl.tsx":
    /\bLIST_PANEL\b[\s\S]*\bLIST_ROW\b|\bLIST_ROW\b[\s\S]*\bLIST_PANEL\b/,
  "src/components/searchable-picker.tsx":
    /\bLIST_ROW\b[\s\S]*\bLIST_SURFACE\b|\bLIST_SURFACE\b[\s\S]*\bLIST_ROW\b/,
  "src/components/ui/popover.tsx": /\bLIST_SURFACE\b/,
};

function attr(node: ts.JsxOpeningLikeElement, name: string, source: ts.SourceFile): string | null {
  for (const prop of node.attributes.properties) {
    if (ts.isJsxAttribute(prop) && prop.name.getText(source) === name) {
      return prop.initializer === undefined ? "" : prop.initializer.getText(source);
    }
  }
  return null;
}

/** The census: one finding per refused part, each keyed `file#part`. */
export function listFindings(files: Src[]): { findings: Finding[]; keys: string[] } {
  const findings: Finding[] = [];
  const keys: string[] = [];
  for (const { name, text } of files) {
    if (!name.endsWith(".tsx")) continue;
    const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const push = (node: ts.Node, part: string, what: string) => {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      keys.push(`${name}#${part}`);
      findings.push({ file: name, line, what: `${part}: ${what}` });
    };
    const walk = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(source).replace(/^.*\./, "");
        const cls = (attr(node, "className", source) ?? "").replace(/[`"'{}()]/g, " ");
        const role = (attr(node, "role", source) ?? "").replace(/["'{}]/g, "");
        const offset = attr(node, "sideOffset", source);
        if (offset !== null && /\d/.test(offset) && !/^\{?\s*0\s*\}?$/.test(offset))
          push(node, tag, `sideOffset ${offset} leaves a gap (D264)`);
        if (tag === "select") push(node, "select", "a native list the device draws");
        if (ROW_PARTS.has(tag) || role === "option") {
          const own = cls.match(OWN_ROW);
          if (own)
            push(node, role === "option" ? "option" : tag, `own row class "${own[0].trim()}"`);
          if (role === "option" && !/\bLIST_ROW\b/.test(cls))
            push(node, "option", "an option not reading LIST_ROW");
        }
        if (PANEL_PARTS.has(tag) || role === "listbox" || role === "menu") {
          const part = PANEL_PARTS.has(tag) ? tag : role;
          const own = cls.match(OWN_PANEL);
          if (own) push(node, part, `own panel class "${own[0].trim()}"`);
          const height = FACADE_PANELS.has(tag) ? cls.match(OWN_HEIGHT) : null;
          if (height) push(node, part, `own height "${height[0].trim()}"`);
        }
      }
      ts.forEachChild(node, walk);
    };
    if (OWNERS[name] !== undefined) {
      if (!OWNERS[name].test(text)) {
        keys.push(`${name}#owner`);
        findings.push({
          file: name,
          line: 1,
          what: "owner: does not read menu-row.ts's list constants",
        });
      }
      // The owners define the look; their own literals are the mechanism.
      continue;
    }
    walk(source);
  }
  return { findings, keys };
}

export type ListAllowance = { key: string; reason: string; until: string };
export function readListAllowlist(
  text: string,
  found: Iterable<string>,
  today: string,
): Map<string, ListAllowance> {
  const keys = new Set(found);
  const out = new Map<string, ListAllowance>();
  text.split(/\r?\n/).forEach((raw, index) => {
    if (!raw.trim() || raw.trim().startsWith("#")) return;
    const cells = raw.split("|").map((cell) => cell.trim());
    const fail = (message: string): never => {
      throw new Error(`choice-lists-allowlist.txt:${index + 1} ${message}: ${raw}`);
    };
    if (cells.length !== 3 || cells.some((cell) => !cell)) fail("expected three non-empty cells");
    const [key, reason, until] = cells;
    if (/^\d{4}-\d{2}-\d{2}$/.test(until)) {
      if (until < today) fail("expired allowance");
    } else if (until === "permanent") {
      if (!reason.startsWith("permanent:")) fail("a permanent line states why in its reason");
    } else if (!/^(?:INC|DEC)-\d+$|^SAGE-S\d+\b/.test(until)) fail("invalid until");
    if (out.has(key)) fail("duplicate key");
    if (!keys.has(key)) fail("stale allowance");
    out.set(key, { key, reason, until });
  });
  return out;
}

const ALLOWLIST = "scripts/conformance/choice-lists-allowlist.txt";
const today = () => new Date().toISOString().slice(0, 10);

describe("CF-LIST-1 — every list of choices that opens from a control reads one look (D264)", () => {
  it(
    "the tree: no own row or panel classes, no gap, no unread owner",
    () => {
      const files = walkFiles(["src"], { ext: ["tsx"], skipTests: true }).map((name) => ({
        name: name.split("\\").join("/"),
        text: readFileSync(name, "utf8"),
      }));
      const { findings, keys } = listFindings(files);
      const allowed = readListAllowlist(readFileSync(ALLOWLIST, "utf8"), keys, today());
      const open = findings.filter((f) => {
        const key = keys[findings.indexOf(f)];
        return !allowed.has(key);
      });
      expect(report(open)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CL-1: a planted option with its own row padding fails", () => {
    const { findings } = listFindings([
      {
        name: "src/x.tsx",
        text: `const a = <button role="option" className={\`\${LIST_ROW} py-1.5\`} />;`,
      },
    ]);
    expect(report(findings)).toContain('own row class "py-1.5"');
  });

  it("CL-2: a planted panel with its own border and shadow fails", () => {
    const { findings } = listFindings([
      {
        name: "src/x.tsx",
        text: `const a = <DropdownMenuContent className="border shadow-lg">x</DropdownMenuContent>;`,
      },
    ]);
    expect(report(findings)).toContain('own panel class "border"');
  });

  it("CL-3: a planted gap (sideOffset 4) fails", () => {
    const { findings } = listFindings([
      { name: "src/x.tsx", text: `const a = <PopoverContent sideOffset={4}>x</PopoverContent>;` },
    ]);
    expect(report(findings)).toContain("sideOffset");
  });

  it("CL-4: a clean consumer passes", () => {
    const { findings } = listFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <DropdownMenuContent align="end"><DropdownMenuItem className={cn(on && LIST_ROW_CURRENT)}>x</DropdownMenuItem></DropdownMenuContent>;\n` +
          `const b = <button role="option" className={\`\${LIST_ROW} \${LIST_ROW_CURRENT}\`} />;`,
      },
    ]);
    expect(findings).toEqual([]);
  });

  it("CL-5: a stale allowlist line fails, and so does an expired one", () => {
    expect(() =>
      readListAllowlist("src/gone.tsx#select | a reason | SAGE-S6", [], "2026-10-31"),
    ).toThrow(/stale/);
    expect(() =>
      readListAllowlist(
        "src/a.tsx#select | a reason | 2026-01-01",
        ["src/a.tsx#select"],
        "2026-10-31",
      ),
    ).toThrow(/expired/);
    expect(() =>
      readListAllowlist(
        "src/a.tsx#select | no reason given | permanent",
        ["src/a.tsx#select"],
        "2026-10-31",
      ),
    ).toThrow(/permanent/);
  });

  it("an owner that stops reading the constants fails", () => {
    const { findings } = listFindings([
      { name: "src/components/ui/popover.tsx", text: "const x = 1;" },
    ]);
    expect(report(findings)).toContain("owner");
  });
});
