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
 *  3. (turn C2, D271) A menu's current mark reads the one rule on the chosen page: a file that
 *     calls isCurrentAt is a named menu file (MENU_FILES) and reads useMenuAt; no menu file
 *     reads useShownPathname or useRouterState for its mark, and no `aria-current` or
 *     `current` mark reads `activePanel`.
 *  4. (turn C2, D272) The tick is press.ts's alone: no `vibrate(` call and no switch checkbox
 *     (`<input … switch>`, `setAttribute("switch")`) anywhere else.
 * The allowlist starts empty: there is none.
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
  { file: "src/components/shell/app-header.tsx", needs: ["${PRESSED.button}"] },
  // Turn C2 (ruling 2): the bottom bar's items and the top bar's hand-built buttons.
  { file: "src/components/shell/bottom-bar.tsx", needs: ["${PRESSED.bar}", "PRESSED.barIcon"] },
];

/** Rule 3's census: every file that marks a menu's current item (D271, turn C2). */
export const MENU_FILES = [
  "src/components/shell/app-rail.tsx",
  "src/components/shell/bottom-bar.tsx",
];
const RULE = "src/components/shell/menu-current.ts";
const TICK_OWNER = "src/lib/press.ts";
const VIBRATE = /\bvibrate\s*\(/;
const SWITCH_BOX = /<input\b[^>]*\bswitch\b|setAttribute\(\s*["']switch["']|\.switch\s*=/;

export function currentFindings(files: Array<{ name: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { name, text } of files) {
    const code = codeOf(text);
    const lines = code.split("\n");
    const menu = MENU_FILES.includes(name);
    if (name !== RULE && /\bisCurrentAt\(/.test(code)) {
      if (!menu)
        findings.push({ file: name, line: 1, what: "isCurrentAt outside a named menu file" });
      else if (!/\buseMenuAt\(/.test(code))
        findings.push({ file: name, line: 1, what: "the mark does not read useMenuAt" });
    }
    lines.forEach((line, index) => {
      const at = { file: name, line: index + 1 };
      if (menu && /\b(useShownPathname|useRouterState)\(/.test(line))
        findings.push({ ...at, what: "a menu's mark reads the shown page (read useMenuAt)" });
      if (menu && /\b(aria-current|current)=\{[^}]*\bactivePanel\b/.test(line))
        findings.push({ ...at, what: "a current mark read from activePanel" });
      if (name !== TICK_OWNER && VIBRATE.test(line))
        findings.push({ ...at, what: "a vibrate call outside press.ts" });
      if (name !== TICK_OWNER && SWITCH_BOX.test(line))
        findings.push({ ...at, what: "a switch checkbox outside press.ts" });
    });
  }
  return findings;
}

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
      if (!text.includes(need))
        findings.push({ file, line: 1, what: `the primitive lacks ${need}` });
  }
  for (const { name, text } of files) {
    if (OWNERS.has(name)) continue;
    codeOf(text)
      .split("\n")
      .forEach((line, index) => {
        if (ACTIVE.test(line))
          findings.push({ file: name, line: index + 1, what: "an own `active:` press look" });
        if (PRESSED_LOOK.test(line))
          findings.push({
            file: name,
            line: index + 1,
            what: "an own pressed look or mark (read PRESSED)",
          });
      });
  }
  return findings;
}

describe("CF-PRESS-1 — one pressed look, from the primitives (D263/D270)", () => {
  it(
    "the tree",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx", "css"], skipTests: true }).map(
        (name) => ({
          name: name.split("\\").join("/"),
          text: readFileSync(name, "utf8"),
        }),
      );
      for (const { file } of PRIMITIVES)
        expect(
          files.some((f) => f.name === file),
          file,
        ).toBe(true);
      expect(report(pressFindings(files))).toBe("");
      for (const file of MENU_FILES)
        expect(
          files.some((f) => f.name === file),
          file,
        ).toBe(true);
      expect(report(currentFindings(files))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("PRP-1: a Button without its PRESSED look fails", () => {
    const found = pressFindings([
      {
        name: "src/components/ui/button.tsx",
        text: `const b = cva("inline-flex"); <Comp data-pressable="" />`,
      },
    ]);
    expect(report(found)).toContain("lacks ${PRESSED.button}");
  });

  it("PRP-2: a screen's own active: class fails", () => {
    const found = pressFindings([
      { name: "src/routes/x.tsx", text: `const a = <a className="active:bg-muted">x</a>;` },
    ]);
    expect(report(found)).toContain("own `active:` press look");
  });

  it("PRP-3: a screen's own data-[pressed] look fails", () => {
    const found = pressFindings([
      { name: "src/routes/x.tsx", text: `const a = <a className="data-[pressed]:bg-card">x</a>;` },
    ]);
    expect(report(found)).toContain("own pressed look");
  });

  it("a screen reading the primitives passes", () => {
    expect(
      pressFindings([
        { name: "src/routes/x.tsx", text: `const a = <Button variant="ghost">x</Button>;` },
      ]),
    ).toEqual([]);
  });

  it("PRP-4: a menu mark read from activePanel fails", () => {
    const found = currentFindings([
      {
        name: "src/components/shell/bottom-bar.tsx",
        text: `const at = useMenuAt(); <Link aria-current={activePanel === "admin" ? "page" : undefined} />`,
      },
    ]);
    expect(report(found)).toContain("read from activePanel");
  });

  it("PRP-5: a menu reading the shown page, or isCurrentAt off the census, fails", () => {
    const found = currentFindings([
      {
        name: "src/components/shell/app-rail.tsx",
        text: `const p = useShownPathname(); isCurrentAt({ path: "/" }, { pathname: p, hash: "" });`,
      },
      { name: "src/routes/x.tsx", text: `const on = isCurrentAt({ path: "/" }, at);` },
    ]);
    expect(report(found)).toContain("reads the shown page");
    expect(report(found)).toContain("does not read useMenuAt");
    expect(report(found)).toContain("isCurrentAt outside a named menu file");
  });

  it("PRP-6: a vibrate call outside press.ts fails", () => {
    const found = currentFindings([
      { name: "src/routes/x.tsx", text: `navigator.vibrate(10);` },
    ]);
    expect(report(found)).toContain("vibrate call outside press.ts");
  });

  it("PRP-7: a switch checkbox outside press.ts fails", () => {
    const found = currentFindings([
      { name: "src/routes/x.tsx", text: `const b = <input type="checkbox" switch />;` },
      { name: "src/routes/y.ts", text: `box.setAttribute("switch", "");` },
    ]);
    expect(found).toHaveLength(2);
    expect(report(found)).toContain("switch checkbox outside press.ts");
  });

  it("the menus reading useMenuAt, and press.ts's own tick, pass", () => {
    expect(
      currentFindings([
        {
          name: "src/components/shell/bottom-bar.tsx",
          text: `const at = useMenuAt(); isCurrentAt({ path: "/" }, at);`,
        },
        { name: "src/lib/press.ts", text: `nav.vibrate(TICK_MS);` },
      ]),
    ).toEqual([]);
  });
});
