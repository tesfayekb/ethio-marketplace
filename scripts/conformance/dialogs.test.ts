import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-DIALOG-1 (turn S6-1, Sage §14, the operator's D268) — ONE DIALOG LOOK. Every dialog,
 * alert dialog and sheet draws its look from src/components/ui/dialog-look.ts through its three
 * primitives (ui/dialog.tsx, ui/alert-dialog.tsx, ui/sheet.tsx); a consumer chooses a variant,
 * never a look. The census, over every .tsx file under src (tests skipped):
 *  - DG-1: a dialog, alert-dialog or sheet part (CategoryModal read as a content part) outside
 *    the primitives with `overlayClassName`, or a className holding a look class: background,
 *    border, shadow, radius, padding, text size or weight, height, width, z-index, position or
 *    translate, animation. `sr-only` passes.
 *  - DG-3: a primitive that stops reading the constants, or a field (input, textarea,
 *    native-select) that stops reading DIALOG_FIELD.
 *  - DG-4: the dialog's own actions — two or more buttons laid in a row directly under its
 *    content part (looking through a form, and through a block that is the content's only
 *    element), outside its footer part. Controls inside the body (a row's own up and down, a
 *    list item's buttons) are not actions on the dialog and are not read.
 *  - DG-5: a stacked list of labelled choices — two or more labels holding a radio or a
 *    checkbox (or a mapped list of them) in one container that does not lay them in a row —
 *    reads LIST_ROW and LIST_CHOICE_ON (the choice row, menu-row.ts). A toggle sitting inside
 *    another row is a different concern and passes without an allowlist line.
 *  - DG-6: the allowlist's lines `file#rule | reason | until` (kit.ts: a date or an INC/DEC id);
 *    a stale or expired line fails.
 * The primitive's own namespace (dialog-primitive.tsx) is judged from turn S6-3, when the
 * toolbar panel moves onto the sheet; that clause skips non-modal content (the phone menu,
 * `modal={false}`, ruling 9).
 */
type Finding = { file: string; line: number; what: string };
type Src = { name: string; text: string };

const PRIMITIVES = new Set([
  "src/components/ui/dialog.tsx",
  "src/components/ui/alert-dialog.tsx",
  "src/components/ui/sheet.tsx",
]);

/** What each owner must read (DG-3). */
export const OWNERS: Record<string, readonly string[]> = {
  "src/components/ui/dialog.tsx": [
    "DIALOG_SCRIM",
    "DIALOG_PANEL",
    "DIALOG_CLOSE",
    "DIALOG_HEADER",
    "DIALOG_TITLE",
    "DIALOG_TEXT",
    "DIALOG_FOOTER",
    "DIALOG_GRABBER",
    "data-dialog-panel",
  ],
  "src/components/ui/alert-dialog.tsx": [
    "DIALOG_SCRIM",
    "DIALOG_PANEL",
    "DIALOG_HEADER",
    "DIALOG_TITLE",
    "DIALOG_TEXT",
    "DIALOG_FOOTER",
    "data-dialog-panel",
  ],
  "src/components/ui/sheet.tsx": [
    "DIALOG_SCRIM",
    "SHEET_PANEL",
    "SHEET_SIDE",
    "DIALOG_CLOSE",
    "DIALOG_GRABBER",
    "DIALOG_HEADER",
    "DIALOG_TITLE",
    "DIALOG_TEXT",
    "DIALOG_FOOTER",
    "data-dialog-panel",
  ],
  "src/components/ui/input.tsx": ["DIALOG_FIELD"],
  "src/components/ui/textarea.tsx": ["DIALOG_FIELD"],
  "src/components/ui/native-select.tsx": ["DIALOG_FIELD"],
};

const CONTENT = new Set(["DialogContent", "AlertDialogContent", "SheetContent", "CategoryModal"]);
const FOOTERS = new Set(["DialogFooter", "AlertDialogFooter", "SheetFooter"]);
const PARTS = new Set([
  ...CONTENT,
  ...FOOTERS,
  "DialogOverlay",
  "DialogHeader",
  "DialogTitle",
  "DialogDescription",
  "DialogClose",
  "AlertDialogOverlay",
  "AlertDialogHeader",
  "AlertDialogTitle",
  "AlertDialogDescription",
  "AlertDialogAction",
  "AlertDialogCancel",
  "SheetOverlay",
  "SheetHeader",
  "SheetTitle",
  "SheetDescription",
  "SheetClose",
]);
const BUTTONS = new Set([
  "Button",
  "button",
  "AlertDialogAction",
  "AlertDialogCancel",
  "DialogClose",
  "SheetClose",
]);
const CHOICES = new Set(["RadioGroupItem", "Checkbox"]);

/** A look utility, read after its variants (the text after the last `:`). */
const LOOK =
  /^-?(?:bg-|border$|border-|shadow|rounded|p[xytrblse]?-|text-(?:xs|sm|base|lg|[2-9]?xl)$|text-\[|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$|(?:min-|max-)?[hw]-|size-|z-|fixed$|absolute$|relative$|sticky$|inset|top-|bottom-|start-|end-|left-|right-|translate|animate-|fade-|zoom-|slide-|duration-)/;

function tagOf(node: ts.JsxOpeningLikeElement, source: ts.SourceFile): string {
  return node.tagName.getText(source);
}

function attr(node: ts.JsxOpeningLikeElement, name: string, source: ts.SourceFile): string | null {
  for (const prop of node.attributes.properties)
    if (ts.isJsxAttribute(prop) && prop.name.getText(source) === name)
      return prop.initializer === undefined ? "" : prop.initializer.getText(source);
  return null;
}

/** The utilities a className names, each without its variants. */
function utilities(cls: string): string[] {
  return cls
    .split(/[\s`"'{}(),+?]+/)
    .filter(Boolean)
    .map((token) => token.slice(token.lastIndexOf(":") + 1));
}

function opening(node: ts.Node): ts.JsxOpeningLikeElement | null {
  if (ts.isJsxElement(node)) return node.openingElement;
  if (ts.isJsxSelfClosingElement(node)) return node;
  return null;
}

/** The element children drawn by a `.map(…)` callback: each stands for a list of them. */
const MAPPED = new WeakSet<ts.Node>();

/** A JSX element's element children, through fragments, `{cond && …}`, `{a ? … : …}` and
 *  `{list.map((x) => …)}`. */
function elementChildren(node: ts.JsxElement | ts.JsxFragment): ts.JsxOpeningLikeElement[] {
  const out: ts.JsxOpeningLikeElement[] = [];
  const take = (child: ts.Node, mapped: boolean) => {
    const open = opening(child);
    if (open) {
      out.push(open);
      if (mapped) MAPPED.add(open);
    } else if (ts.isJsxFragment(child)) child.children.forEach((c) => take(c, mapped));
    else if (ts.isJsxExpression(child) && child.expression) take(child.expression, mapped);
    else if (ts.isBinaryExpression(child)) take(child.right, mapped);
    else if (ts.isConditionalExpression(child)) {
      take(child.whenTrue, mapped);
      take(child.whenFalse, mapped);
    } else if (ts.isParenthesizedExpression(child)) take(child.expression, mapped);
    else if (
      ts.isCallExpression(child) &&
      ts.isPropertyAccessExpression(child.expression) &&
      child.expression.name.text === "map"
    ) {
      const callback = child.arguments[0];
      if (
        callback === undefined ||
        !(ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))
      )
        return;
      if (!ts.isBlock(callback.body)) take(callback.body, true);
      else
        for (const statement of callback.body.statements)
          if (ts.isReturnStatement(statement) && statement.expression)
            take(statement.expression, true);
    }
  };
  node.children.forEach((c) => take(c, false));
  return out;
}

/** The element an opening tag opens (null for a self-closing one). */
function elementOf(open: ts.JsxOpeningLikeElement): ts.JsxElement | null {
  return ts.isJsxOpeningElement(open) && ts.isJsxElement(open.parent) ? open.parent : null;
}

/** Laid in a row: a flex row (`flex-row`, a justify along it), or flex with no column. */
function inARow(cls: string): boolean {
  const all = utilities(cls);
  if (all.some((u) => u === "flex-row" || u === "justify-end" || u === "justify-between"))
    return true;
  const flex = all.some((u) => u === "flex" || u === "inline-flex");
  return flex && !all.some((u) => u === "flex-col" || u === "flex-col-reverse");
}

function holdsChoice(node: ts.JsxElement, source: ts.SourceFile): boolean {
  let found = false;
  const walk = (child: ts.Node) => {
    const open = opening(child);
    if (open) {
      const tag = tagOf(open, source);
      const type = (attr(open, "type", source) ?? "").replace(/["'{}]/g, "");
      if (CHOICES.has(tag) || (tag === "input" && (type === "radio" || type === "checkbox")))
        found = true;
    }
    ts.forEachChild(child, walk);
  };
  node.children.forEach(walk);
  return found;
}

/** The census: one finding per refusal, each keyed `file#rule`. */
export function dialogFindings(files: Src[]): { findings: Finding[]; keys: string[] } {
  const findings: Finding[] = [];
  const keys: string[] = [];
  for (const { name, text } of files) {
    const needs = OWNERS[name];
    if (needs !== undefined) {
      const missing = needs.filter((need) => !text.includes(need));
      if (missing.length > 0) {
        keys.push(`${name}#DG-3`);
        findings.push({
          file: name,
          line: 1,
          what: `DG-3 owner: does not read ${missing.join(", ")} (dialog-look.ts)`,
        });
      }
    }
    if (!name.endsWith(".tsx") || PRIMITIVES.has(name)) continue;
    const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const push = (node: ts.Node, rule: string, what: string) => {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      keys.push(`${name}#${rule}`);
      findings.push({ file: name, line, what: `${rule} ${what}` });
    };
    const isButton = (child: ts.JsxOpeningLikeElement) => BUTTONS.has(tagOf(child, source));
    const actionRows = (content: ts.JsxElement) => {
      const kids = elementChildren(content);
      for (const kid of kids) {
        const element = elementOf(kid);
        const tag = tagOf(kid, source);
        if (element === null || FOOTERS.has(tag)) continue;
        const buttons = elementChildren(element).filter(isButton);
        if (buttons.length >= 2 && inARow(attr(kid, "className", source) ?? ""))
          push(kid, "DG-4", `${tag}: ${buttons.length} buttons in a row outside the footer part`);
        else if (tag === "form" || kids.length === 1) actionRows(element);
      }
    };
    const choiceRows = (container: ts.JsxElement) => {
      const labels = elementChildren(container).filter((child) => {
        const element = elementOf(child);
        return tagOf(child, source) === "label" && element !== null && holdsChoice(element, source);
      });
      const list = labels.length >= 2 || labels.some((label) => MAPPED.has(label));
      if (!list || inARow(attr(container.openingElement, "className", source) ?? "")) return;
      for (const label of labels) {
        const cls = attr(label, "className", source) ?? "";
        if (!/\bLIST_ROW\b/.test(cls) || !/\bLIST_CHOICE_ON\b/.test(cls))
          push(label, "DG-5", "a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)");
      }
    };
    let inContent = 0;
    const walk = (node: ts.Node) => {
      const open = opening(node);
      if (open === null) {
        ts.forEachChild(node, walk);
        return;
      }
      const tag = tagOf(open, source);
      if (PARTS.has(tag)) {
        if (attr(open, "overlayClassName", source) !== null)
          push(open, "DG-1", `${tag}: overlayClassName (use layer, dialog-look.ts)`);
        const own = utilities(attr(open, "className", source) ?? "").filter((u) => LOOK.test(u));
        if (own.length > 0) push(open, "DG-1", `${tag}: own look class "${own.join(" ")}"`);
      }
      if (CONTENT.has(tag) && ts.isJsxElement(node)) actionRows(node);
      if ((inContent > 0 || CONTENT.has(tag)) && ts.isJsxElement(node)) choiceRows(node);
      const content = CONTENT.has(tag) ? 1 : 0;
      inContent += content;
      ts.forEachChild(node, walk);
      inContent -= content;
    };
    walk(source);
  }
  return { findings, keys };
}

const ROOT = process.cwd();
const ALLOWLIST = "scripts/conformance/dialogs-allowlist.txt";

function open(found: { findings: Finding[]; keys: string[] }, path: string): Finding[] {
  const allowed = readAllowlist(path, found.keys);
  return found.findings.filter((_, index) => {
    const key = found.keys[index];
    return key === undefined || !allowed.has(key);
  });
}

describe("CF-DIALOG-1 — every dialog, alert dialog and sheet reads one look (D268)", () => {
  it(
    "the tree: no own look on a dialog part, owners read the constants, one footer, one choice row",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((name) => ({
        name: name.split("\\").join("/"),
        text: readFileSync(name, "utf8"),
      }));
      console.log(`[CF-DIALOG-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(open(dialogFindings(files), ALLOWLIST))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("DG-1 planted: a part's own look class and overlayClassName fail; sr-only passes", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <DialogContent className="max-h-[85dvh] overflow-y-auto">x</DialogContent>;\n` +
          `const b = <DialogContent overlayClassName="z-[100]">x</DialogContent>;\n` +
          `const c = <AlertDialogAction className={cn("min-h-11", x)}>y</AlertDialogAction>;\n` +
          `const d = <CategoryModal className="p-0 shadow-none">z</CategoryModal>;\n` +
          `const e = <SheetTitle className="sr-only">t</SheetTitle>;\n` +
          `const f = <DialogDescription className="break-words">t</DialogDescription>;\n`,
      },
    ]);
    expect(report(findings)).toBe(
      [
        'src/x.tsx:1 DG-1 DialogContent: own look class "max-h-[85dvh]"',
        "src/x.tsx:2 DG-1 DialogContent: overlayClassName (use layer, dialog-look.ts)",
        'src/x.tsx:3 DG-1 AlertDialogAction: own look class "min-h-11"',
        'src/x.tsx:4 DG-1 CategoryModal: own look class "p-0 shadow-none"',
      ].join("\n"),
    );
  });

  it("DG-3 planted: an owner that stops reading the constants fails", () => {
    const { findings } = dialogFindings([
      { name: "src/components/ui/sheet.tsx", text: "DIALOG_SCRIM SHEET_PANEL" },
      { name: "src/components/ui/input.tsx", text: "const Input = 1;" },
      { name: "src/components/ui/textarea.tsx", text: "DIALOG_FIELD" },
    ]);
    const text = report(findings);
    expect(text).toContain("src/components/ui/sheet.tsx:1 DG-3 owner: does not read SHEET_SIDE");
    expect(text).toContain("src/components/ui/input.tsx:1 DG-3 owner: does not read DIALOG_FIELD");
    expect(text).not.toContain("textarea");
  });

  it("DG-4 planted: the dialog's own button row outside the footer fails; body controls pass", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <DialogContent>\n` +
          `  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">\n` +
          `    <Button>a</Button>\n    {ok ? <Button>b</Button> : null}\n  </div>\n` +
          `  <div className="grid gap-2"><Button>c</Button><Button>d</Button></div>\n` +
          `  <ol><li className="flex gap-2"><Button>up</Button><Button>down</Button></li></ol>\n` +
          `  <DialogFooter><Button>e</Button><Button>f</Button></DialogFooter>\n` +
          `</DialogContent>;\n` +
          `const b = <CategoryModal><div className="space-y-3">\n` +
          `  <p>x</p>\n  <div className="flex justify-end gap-2"><Button>g</Button><Button>h</Button></div>\n` +
          `</div></CategoryModal>;\n` +
          `const c = <SheetContent><form><p>y</p>\n` +
          `  <span className="flex"><Button>i</Button><DialogClose asChild><Button>j</Button></DialogClose></span>\n` +
          `</form></SheetContent>;\n` +
          `const d = <div className="flex"><Button>k</Button><Button>l</Button></div>;\n`,
      },
    ]);
    expect(report(findings)).toBe(
      [
        "src/x.tsx:12 DG-4 div: 2 buttons in a row outside the footer part",
        "src/x.tsx:15 DG-4 span: 2 buttons in a row outside the footer part",
        "src/x.tsx:2 DG-4 div: 2 buttons in a row outside the footer part",
      ].join("\n"),
    );
  });

  it("DG-5 planted: a stacked list of choices of its own fails; a toggle inside a row passes", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <CategoryModal>\n` +
          `  <label className="flex min-h-11 gap-3"><RadioGroupItem value="a" /> A</label>\n` +
          `  <label className={cn(LIST_ROW, LIST_CHOICE_ON)}><input type="radio" /> B</label>\n` +
          `  <label className={cn(LIST_ROW)}><Checkbox /> C</label>\n` +
          `  <label className="text-sm">D</label>\n` +
          `</CategoryModal>;\n` +
          `const b = <DialogContent><div className="space-y-1">\n` +
          `  {rows.filter(keep).map((row) => (<label key={row} className="flex gap-2"><Checkbox /></label>))}\n` +
          `</div></DialogContent>;\n` +
          `const c = <DialogContent><div className="flex flex-wrap items-center gap-x-4">\n` +
          `  <label className="flex gap-2"><Checkbox /> required</label>\n` +
          `  <label className="flex gap-2"><Checkbox /> card</label>\n` +
          `</div><label className="flex gap-2"><Checkbox /> alone</label></DialogContent>;\n` +
          `const d = <div><label className="flex"><Checkbox /> E</label><label><Checkbox /> F</label></div>;\n`,
      },
    ]);
    expect(report(findings)).toBe(
      [
        "src/x.tsx:2 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
        "src/x.tsx:4 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
        "src/x.tsx:8 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
      ].join("\n"),
    );
  });

  it("DG-6 planted: a stale allowlist line fails, and so does an expired one", () => {
    const dir = join(ROOT, "node_modules/.cache/dialogs-census");
    mkdirSync(dir, { recursive: true });
    const path = join(dir, "allowlist.txt");
    const clean = dialogFindings([{ name: "src/x.tsx", text: "const a = <DialogContent />;" }]);
    const planted = dialogFindings([
      { name: "src/x.tsx", text: `const a = <DialogContent className="p-0">x</DialogContent>;` },
    ]);
    try {
      writeFileSync(path, "src/x.tsx#DG-1 | a planted reason | INC-1\n");
      expect(() => readAllowlist(path, clean.keys)).toThrow("stale allowance");
      expect(open(planted, path)).toEqual([]);
      writeFileSync(path, "src/x.tsx#DG-1 | a planted reason | 2020-01-01\n");
      expect(() => readAllowlist(path, planted.keys)).toThrow("expired allowance");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
