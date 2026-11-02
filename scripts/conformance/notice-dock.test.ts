import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-DOCK-1 (turn W3) — A NOTICE ON A PHONE IS DOCKED ON THE BOTTOM BAR, through the one constant
 * (src/components/shell/notice-dock.ts, NOTICE_DOCK). The census reads every browser file under
 * src/ (tests excepted):
 *  1. A class string that computes a bottom from `--bottom-bar` (`bottom-[…]` or
 *     `[inset-block-end:…]`, at any variant) is the constant's own, or a sticky bar's (`sticky` in
 *     the same string: an action bar rides the page, it is not pinned). Anything else — a fixed
 *     element, or a string handed to one — is a finding.
 *  2. A style object that pairs `position: "fixed"` with a bottom from `--bottom-bar`, and a CSS
 *     rule that pairs `position: fixed` with one, are findings.
 *  3. (NDK-4) The constant's start inset is the phone strip's width (app-rail.tsx `rail-strip`):
 *     the notice starts where the strip ends, and the two cannot drift apart.
 * A finding's key is `<file>#<data-testid of its element>` (or `#<line>`); the allowlist
 * (`notice-dock-allowlist.txt`, `key | reason | until`) names the surfaces that are not notices.
 */
type Finding = { file: string; line: number; what: string; key: string };

const OWNER = "src/components/shell/notice-dock.ts";
const RAIL = "src/components/shell/app-rail.tsx";
const ALLOWLIST = "scripts/conformance/notice-dock-allowlist.txt";
const FROM_BAR =
  /(?:^|[\s"'`])(?:[\w-]+:)*(?:bottom-\[[^\]\s]*--bottom-bar|\[inset-block-end:[^\]\s]*--bottom-bar)/;
const STICKY = /(?:^|[\s"'`])(?:[\w-]+:)*sticky(?=[\s"'`]|$)/;
const CSS_FIXED = /(?:^|[;{\s])position\s*:\s*fixed\b/;
const CSS_FROM_BAR = /(?:^|[;{\s])(?:bottom|inset-block-end)\s*:[^;}]*--bottom-bar/;

/** The data-testid of the JSX element a node sits in (its own attribute list), or null. */
function testidOf(node: ts.Node): string | null {
  for (let at: ts.Node | undefined = node; at !== undefined; at = at.parent) {
    if (ts.isJsxOpeningElement(at) || ts.isJsxSelfClosingElement(at)) {
      for (const attr of at.attributes.properties)
        if (
          ts.isJsxAttribute(attr) &&
          attr.name.getText() === "data-testid" &&
          attr.initializer !== undefined &&
          ts.isStringLiteral(attr.initializer)
        )
          return attr.initializer.text;
      return null;
    }
  }
  return null;
}

function propertyText(object: ts.ObjectLiteralExpression, names: string[]): string | null {
  for (const prop of object.properties)
    if (
      ts.isPropertyAssignment(prop) &&
      names.includes(prop.name.getText().replace(/^["']|["']$/g, ""))
    )
      return prop.initializer.getText();
  return null;
}

export function dockFindings(files: Array<{ name: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { name, text } of files) {
    if (name === OWNER) continue;
    if (name.endsWith(".css")) {
      let offset = 0;
      for (const block of text.split("}")) {
        if (CSS_FIXED.test(block) && CSS_FROM_BAR.test(block)) {
          const line = text.slice(0, offset + block.search(CSS_FROM_BAR)).split("\n").length;
          findings.push({
            file: name,
            line,
            what: "a fixed rule's bottom from --bottom-bar (use NOTICE_DOCK)",
            key: `${name}#${line}`,
          });
        }
        offset += block.length + 1;
      }
      continue;
    }
    const source = ts.createSourceFile(
      name,
      text,
      ts.ScriptTarget.Latest,
      true,
      name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const push = (node: ts.Node, what: string) => {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      findings.push({ file: name, line, what, key: `${name}#${testidOf(node) ?? line}` });
    };
    const walk = (node: ts.Node) => {
      if (
        ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node) ||
        ts.isTemplateExpression(node)
      ) {
        const classes = node.getText(source);
        if (FROM_BAR.test(classes) && !STICKY.test(classes))
          push(node, "a pinned bottom from --bottom-bar outside notice-dock.ts (use NOTICE_DOCK)");
        if (ts.isTemplateExpression(node)) return;
      }
      if (ts.isObjectLiteralExpression(node)) {
        const position = propertyText(node, ["position"]);
        const bottom = propertyText(node, ["bottom", "insetBlockEnd", "inset-block-end"]);
        if (position?.includes("fixed") && bottom?.includes("--bottom-bar"))
          push(node, "a fixed style's bottom from --bottom-bar (use NOTICE_DOCK)");
      }
      ts.forEachChild(node, walk);
    };
    walk(source);
  }
  return findings;
}

/** NDK-4 — the phone strip's width class and the dock's start inset name the same width. */
export function stripTieFindings(railText: string, dockText: string): Finding[] {
  const strip = /data-testid="rail-strip"[\s\S]*?className="([^"]*)"/.exec(railText)?.[1];
  const width = strip === undefined ? null : (/(?:^|\s)w-(\S+)/.exec(strip)?.[1] ?? null);
  const inset = /max-md:inset-s-(\S+?)(?=[\s`"])/.exec(dockText)?.[1] ?? null;
  if (width !== null && inset !== null && width === inset) return [];
  return [
    {
      file: OWNER,
      line: 1,
      what: `NOTICE_DOCK's start inset (${inset ?? "none"}) is not the phone strip's width (${width ?? "none"})`,
      key: `${OWNER}#strip`,
    },
  ];
}

function treeFiles() {
  return walkFiles(["src"], { ext: ["ts", "tsx", "css"], skipTests: true }).map((name) => ({
    name: name.split("\\").join("/"),
    text: readFileSync(name, "utf8"),
  }));
}

const SESSION_NOTICE_BEFORE = `<div data-testid="session-notice" className="fixed inset-x-2 bottom-[calc(var(--bottom-bar)+var(--bar-rise)+0.5rem)] z-50 mx-auto flex max-w-md" />`;

describe("CF-DOCK-1 — a notice on a phone is docked on the bottom bar (turn W3)", () => {
  it(
    "NDK-1 the tree: no pinned bottom from --bottom-bar outside the constant but its allowlisted surfaces; the strip and the dock agree",
    () => {
      const files = treeFiles();
      expect(files.some((f) => f.name === OWNER)).toBe(true);
      const found = dockFindings(files);
      const allowed = readAllowlist(
        ALLOWLIST,
        found.map((f) => f.key),
      );
      expect(report(found.filter((f) => !allowed.has(f.key)))).toBe("");
      const rail = files.find((f) => f.name === RAIL);
      const dock = files.find((f) => f.name === OWNER);
      expect(rail).toBeDefined();
      expect(report(stripTieFindings(rail?.text ?? "", dock?.text ?? ""))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("NDK-2 a planted bypass fails: the old floating notice, a split class, a fixed style, a fixed CSS rule", () => {
    const found = dockFindings([
      { name: "src/components/app-shell.tsx", text: SESSION_NOTICE_BEFORE },
      {
        name: "src/routes/x.tsx",
        text: `<p className={cn("fixed inset-x-0", "max-md:bottom-[var(--bottom-bar)]")} />`,
      },
      {
        name: "src/routes/y.tsx",
        text: `<p style={{ position: "fixed", bottom: "var(--bottom-bar)" }} />`,
      },
      {
        name: "src/z.css",
        text: `.toast {\n  position: fixed;\n  bottom: calc(var(--bottom-bar) + 1rem);\n}`,
      },
    ]);
    expect(found.map((f) => f.key)).toEqual([
      "src/components/app-shell.tsx#session-notice",
      "src/routes/x.tsx#1",
      "src/routes/y.tsx#1",
      "src/z.css#3",
    ]);
    expect(report(found)).toContain("outside notice-dock.ts");
  });

  it("a sticky bar, the constant's own file, a notice reading the constant and the page's scroll padding pass", () => {
    expect(
      dockFindings([
        {
          name: "src/components/layout/form-layout.tsx",
          text: "<div className={`sticky [inset-block-end:var(--bottom-bar)] ${Z_ACTION_BAR} border-t`} />",
        },
        { name: OWNER, text: 'export const NOTICE_DOCK = "max-md:bottom-[var(--bottom-bar)]";' },
        {
          name: "src/components/app-shell.tsx",
          text: `<div className={cn("fixed inset-x-2 bottom-2 z-50", NOTICE_DOCK)} />`,
        },
        {
          name: "src/styles.css",
          text: "html {\n  scroll-padding-bottom: calc(var(--bottom-bar) + var(--bar-rise));\n}",
        },
      ]),
    ).toEqual([]);
  });

  it("NDK-3 the allowlist: a line no finding needs is stale, an expired line fails", () => {
    const dir = mkdtempSync(join(tmpdir(), "ndk-"));
    try {
      const path = join(dir, "allow.txt");
      const found = ["src/b.tsx#here"];
      writeFileSync(path, "src/a.tsx#gone | not a notice | 2099-01-01\n");
      expect(() => readAllowlist(path, found)).toThrow(/stale allowance/);
      writeFileSync(path, "src/b.tsx#here | not a notice | 2020-01-01\n");
      expect(() => readAllowlist(path, found)).toThrow(/expired allowance/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("NDK-4 the strip's width and the dock's start inset: equal passes, a strip of another width fails", () => {
    const dock = readFileSync(OWNER, "utf8");
    const rail = (width: string) =>
      `<div\n  data-testid="rail-strip"\n  className="fixed start-0 top-13 ${width} flex-col md:hidden"\n>`;
    expect(stripTieFindings(rail("w-12"), dock)).toEqual([]);
    expect(report(stripTieFindings(rail("w-14"), dock))).toContain(
      "is not the phone strip's width (14)",
    );
  });
});
