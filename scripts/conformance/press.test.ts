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
 *     reads useShownPathname or useRouterState (a line that is the frame's own read says
 *     `// frame: INC-581`), and no `aria-current` or
 *     `current` mark reads `activePanel`.
 *     (turn W3) The panel tabs are a menu file; every menu file reads useMenuAt, and an
 *     `aria-selected` mark joins the rule — read from activePanel directly or through a const.
 *     (turn T1) A word is followed to a fixed point: a const over several lines, a const built
 *     from such a const, and a helper (`function f() {…}` or an arrow const) whose body reads
 *     one — a mark that calls the helper is read from activePanel too (PRP-10).
 *     (turn T1, W3's K2) The panel switcher (panel-header.tsx) is a menu file: its radio
 *     group's `value` and an `aria-checked` mark join the rule — PRP-11.
 *     (turn C fix 1) The section a path belongs to is panelOf's alone: a menu file declares
 *     no list of paths (`["/a", …]`) and no `startsWith("/…")` test, and the bottom bar
 *     reads panelOf.
 *  4. (turn C2, D272) The tick is press.ts's alone: no `vibrate(` call anywhere else.
 *     (turn T1, D277, INC-1032) No switch checkbox anywhere (`<input … switch>`,
 *     `setAttribute("switch")`), press.ts included: since WebKit fc1ef83 (iOS 26.5) a label
 *     clicked by script forwards an untrusted click and a switch's haptic never plays, so a
 *     hidden switch is a silent no-op; the tick is Android's `navigator.vibrate`.
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
  { file: "src/components/shell/app-header.tsx", needs: ["${PRESSED.button}"] },
  // Turn C2 (ruling 2): the bottom bar's items and the top bar's hand-built buttons.
  { file: "src/components/shell/bottom-bar.tsx", needs: ["${PRESSED.bar}", "PRESSED.barIcon"] },
];

/** Rule 3's census: every file that marks a menu's current item (D271, turn C2). */
export const MENU_FILES = [
  "src/components/shell/app-rail.tsx",
  "src/components/shell/bottom-bar.tsx",
  "src/components/shell/panel-tabs.tsx",
  "src/components/shell/panel-header.tsx",
];
const MARK =
  /\b(?:aria-current|aria-selected|aria-checked|current)=\{([^}]*)\}|RadioGroup\b[^>]*?\bvalue=\{([^}]*)\}/;
const RULE = "src/components/shell/menu-current.ts";
const SECTION_READERS = ["src/components/shell/bottom-bar.tsx"];
const PATH_LIST = /\[\s*["']\/[^"']*["']\s*,|startsWith\(\s*["'`]\//;
const TICK_OWNER = "src/lib/press.ts";
const VIBRATE = /\bvibrate\s*\(/;
const SWITCH_BOX = /<input\b[^>]*\bswitch\b|setAttribute\(\s*["']switch["']|\.switch\s*=/;

/** The end of a body opened at `open` (its matching `}`), or the text's end. */
function closeOf(code: string, open: number): number {
  let depth = 0;
  for (let at = open; at < code.length; at += 1) {
    if (code[at] === "{") depth += 1;
    if (code[at] === "}" && --depth === 0) return at;
  }
  return code.length;
}

/** Rule 3 (PRP-10) — every const and helper whose value or body reads activePanel, transitively. */
export function panelWords(code: string): string[] {
  const defs: Array<{ name: string; body: string }> = [];
  for (const match of code.matchAll(/\bconst\s+(\w+)\s*(?::[^=]+)?=([^;]*)/g))
    defs.push({ name: match[1] ?? "", body: match[2] ?? "" });
  for (const match of code.matchAll(/\bfunction\s+(\w+)\s*\([^)]*\)[^{]*\{/g)) {
    const open = (match.index ?? 0) + match[0].length - 1;
    defs.push({ name: match[1] ?? "", body: code.slice(open, closeOf(code, open)) });
  }
  const words = new Set(["activePanel"]);
  for (let grew = true; grew; ) {
    grew = false;
    for (const { name, body } of defs)
      if (!words.has(name) && [...words].some((word) => new RegExp(`\\b${word}\\b`).test(body))) {
        words.add(name);
        grew = true;
      }
  }
  return [...words];
}

export function currentFindings(files: Array<{ name: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { name, text } of files) {
    const code = codeOf(text);
    const lines = code.split("\n");
    const menu = MENU_FILES.includes(name);
    if (name !== RULE && !menu && /\bisCurrentAt\(/.test(code))
      findings.push({ file: name, line: 1, what: "isCurrentAt outside a named menu file" });
    if (menu && !/\buseMenuAt\(/.test(code))
      findings.push({ file: name, line: 1, what: "the mark does not read useMenuAt" });
    const fromPanel = panelWords(code);
    if (SECTION_READERS.includes(name) && !/\bpanelOf\(/.test(code))
      findings.push({ file: name, line: 1, what: "the bar does not read panelOf" });
    const raw = text.split("\n");
    lines.forEach((line, index) => {
      const at = { file: name, line: index + 1 };
      // The FRAME's own read (INC-581: which panel, the phone menu's close) is not a mark; it
      // says so on its line, and only that exact word passes.
      const frame = /\/\/ frame: INC-581\b/.test(raw[index] ?? "");
      if (menu && !frame && /\b(useShownPathname|useRouterState)\(/.test(line))
        findings.push({ ...at, what: "a menu's mark reads the shown page (read useMenuAt)" });
      if (menu && PATH_LIST.test(line))
        findings.push({ ...at, what: "a second path list in a menu file (read panelOf)" });
      const found = MARK.exec(line);
      const mark = found?.[1] ?? found?.[2];
      if (
        menu &&
        mark !== undefined &&
        fromPanel.some((word) => new RegExp(`\\b${word}\\b`).test(mark))
      )
        findings.push({ ...at, what: "a current mark read from activePanel" });
      if (name !== TICK_OWNER && VIBRATE.test(line))
        findings.push({ ...at, what: "a vibrate call outside press.ts" });
      if (SWITCH_BOX.test(line))
        findings.push({ ...at, what: "a switch checkbox (INC-1032: it never ticks)" });
    });
  }
  return findings;
}

const OWNERS = new Set(["src/components/shell/menu-row.ts", "src/lib/press.ts", "src/styles.css"]);
const ACTIVE = /(?<![\w-])active:[\w[]/;
const PRESSED_LOOK =
  /data-\[(?:pressed|released)\]|\[data-(?:pressed|released)\]|["']data-(?:pressed|released)["']/;

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
    const fade = pressFindings([
      {
        name: "src/routes/x.tsx",
        text: `const a = <a className="data-[released]:duration-500">x</a>;`,
      },
    ]);
    expect(report(fade)).toContain("own pressed look");
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
    const found = currentFindings([{ name: "src/routes/x.tsx", text: `navigator.vibrate(10);` }]);
    expect(report(found)).toContain("vibrate call outside press.ts");
  });

  it("PRP-7: a switch checkbox fails anywhere, press.ts included (INC-1032)", () => {
    const found = currentFindings([
      { name: "src/routes/x.tsx", text: `const b = <input type="checkbox" switch />;` },
      { name: "src/routes/y.ts", text: `box.setAttribute("switch", "");` },
      { name: "src/lib/press.ts", text: `box.setAttribute("switch", "");` },
    ]);
    expect(found).toHaveLength(3);
    expect(report(found)).toContain("src/lib/press.ts:1 a switch checkbox");
  });

  it("PRP-8: a second path list in a menu file fails, and a bar without panelOf", () => {
    const found = currentFindings([
      {
        name: "src/components/shell/bottom-bar.tsx",
        text: `const at = useMenuAt();\nconst P = { mine: ["/my-listings", "/post"] };\nconst a = p.startsWith("/admin");`,
      },
    ]);
    expect(report(found)).toContain("a second path list in a menu file");
    expect(report(found)).toContain("the bar does not read panelOf");
    expect(found).toHaveLength(3);
  });

  it("PRP-9: a panel tab marked from activePanel (through a const), or tabs without useMenuAt, fail", () => {
    const old = `const { auth, activePanel } = useShell();\nconst active = panel.id === activePanel;\n<button role="tab" aria-selected={active} />`;
    const found = currentFindings([
      { name: "src/components/shell/panel-tabs.tsx", text: old },
      {
        name: "src/components/shell/panel-tabs.tsx",
        text: `const at = useMenuAt();\n<button role="tab" aria-selected={panel.id === activePanel} />`,
      },
    ]);
    expect(report(found)).toContain("panel-tabs.tsx:3 a current mark read from activePanel");
    expect(report(found)).toContain("panel-tabs.tsx:2 a current mark read from activePanel");
    expect(report(found)).toContain("panel-tabs.tsx:1 the mark does not read useMenuAt");
    expect(found).toHaveLength(3);
    expect(
      currentFindings([
        {
          name: "src/components/shell/panel-tabs.tsx",
          text: `const chosen = panelAt(useMenuAt().pathname, panelChoice);\nconst active = panel.id === chosen;\n<button role="tab" aria-selected={active} />`,
        },
      ]),
    ).toEqual([]);
  });

  it("PRP-10: a mark read from activePanel through a multi-line const, a chain of consts or a helper fails", () => {
    const found = currentFindings([
      {
        name: "src/components/shell/panel-tabs.tsx",
        text: [
          "const at = useMenuAt();",
          "const active =",
          "  panel.id ===",
          "  activePanel;",
          "const on = active && shown;",
          "function isOn(id: string) {",
          "  if (id === '') return false;",
          "  return id === activePanel;",
          "}",
          "const isMine = (id: string) =>",
          "  isOn(id);",
          '<button role="tab" aria-selected={on} />',
          '<button role="tab" aria-selected={isOn(panel.id)} />',
          '<button role="tab" aria-selected={isMine(panel.id)} />',
        ].join("\n"),
      },
    ]);
    expect(report(found)).toContain("panel-tabs.tsx:12 a current mark read from activePanel");
    expect(report(found)).toContain("panel-tabs.tsx:13 a current mark read from activePanel");
    expect(report(found)).toContain("panel-tabs.tsx:14 a current mark read from activePanel");
    expect(found).toHaveLength(3);
    expect(
      currentFindings([
        {
          name: "src/components/shell/panel-tabs.tsx",
          text: [
            "const { activePanel, panelChoice } = useShell();",
            "const chosen = panelAt(useMenuAt().pathname, panelChoice);",
            "function isOn(id: string) {",
            "  return id === chosen;",
            "}",
            "const heading = labelOf(activePanel);",
            '<button role="tab" aria-selected={isOn(panel.id)} />',
          ].join("\n"),
        },
      ]),
    ).toEqual([]);
  });

  it("PRP-11: the panel switcher's radio value (or an aria-checked mark) read from activePanel fails; read from panelAt it passes", () => {
    const found = currentFindings([
      {
        name: "src/components/shell/panel-header.tsx",
        text: `const at = useMenuAt();\n<DropdownMenuRadioGroup value={activePanel}>\n<div role="menuitemradio" aria-checked={activePanel === p.id} />`,
      },
    ]);
    expect(report(found)).toContain("panel-header.tsx:2 a current mark read from activePanel");
    expect(report(found)).toContain("panel-header.tsx:3 a current mark read from activePanel");
    expect(found).toHaveLength(2);
    expect(
      currentFindings([
        {
          name: "src/components/shell/panel-header.tsx",
          text: `const { activePanel, panelChoice } = useShell();\nconst current = panels.find((p) => p.id === activePanel);\nconst chosen = panelAt(useMenuAt().pathname, panelChoice);\n<DropdownMenuRadioGroup value={chosen}>\n<DropdownMenuRadioItem value={panel.id} />`,
        },
      ]),
    ).toEqual([]);
  });

  it("the menus reading useMenuAt, and press.ts's own tick, pass", () => {
    expect(
      currentFindings([
        {
          name: "src/components/shell/bottom-bar.tsx",
          text: `const at = useMenuAt(); panelOf(at.pathname); isCurrentAt({ path: "/" }, at);`,
        },
        { name: "src/lib/press.ts", text: `nav.vibrate(TICK_MS);` },
        {
          name: "src/components/shell/app-rail.tsx",
          text: `const at = useMenuAt();\nconst p = useShownPathname(); // frame: INC-581 — closes the menu`,
        },
      ]),
    ).toEqual([]);
  });
});
