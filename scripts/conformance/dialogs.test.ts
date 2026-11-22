import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
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
 *  - DG-2 (turn S6-4): a modal surface the primitive did not draw — `role="dialog"` or
 *    `"alertdialog"` (an attribute, a prop object, `setAttribute`), `aria-modal`, or a class list
 *    holding both `fixed` and `inset-0` (a string, a template, a whole className) — in any .ts or
 *    .tsx file outside the primitive's own (MODAL_OWNERS). Its allowlist starts empty; the phone
 *    menu is non-modal content with none of these and passes by definition (the plan's ruling 9).
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
 * Cursor-bundle-3 (Part 1) adds the anatomy's laws, over the same census:
 *  - DG-8: the body's one form. dialog-parts-look.ts's BANDS_BODY holds relative, grow, min-h-0 and
 *    overflow-y-auto and never flex-1; only PanelBody (dialog-parts.tsx) reads it, once, by the
 *    element it returns (never behind a wrapper: WebKit gives that body no height).
 *  - DG-9: a PanelBody with no footer part after it carries `end` (the bottom inset, BANDS_END); a
 *    `fill` body is exempt (END_EXEMPT, DEC-426).
 *  - DG-10: inside a panel, and the same file's components it draws, no vertical scroller of its
 *    own in a className; a sideways strip passes (SCROLLER_EXEMPT). LIMIT: a scroller in a child
 *    component's own file is not seen.
 *  - DG-11: a panel has a description: a Description part, a wrapper's `description=`, an
 *    aria-describedby naming an id the file draws, or one of DESCRIPTION_EXCEPTIONS (the four the
 *    feature doc names, each under a `// Description exception: <why>` line). Non-modal content is
 *    skipped, as DG-1 skips it.
 * DG-1 reads the low-level parts too (turn S6-3): a part of a namespace imported from
 * dialog-primitive (`<NS.Content>`, `<NS.Title>`, …) outside the primitives, skipping the
 * subtree of a `<NS.Root modal={false}>` (non-modal content: the phone menu, the plan's
 * ruling 9); and `PopoverContent` outside the popover's own files, which takes a variant.
 */
type Finding = { file: string; line: number; what: string };
type Src = { name: string; text: string };

const PRIMITIVES = new Set([
  "src/components/ui/dialog.tsx",
  "src/components/ui/alert-dialog.tsx",
  "src/components/ui/sheet.tsx",
]);

/** The files that draw the modal layer itself (DG-2): the primitives, their look and their Radix seam. */
const MODAL_OWNERS = new Set([
  ...PRIMITIVES,
  "src/components/ui/dialog-look.ts",
  "src/components/ui/dialog-primitive.tsx",
  "src/components/ui/alert-dialog-primitive.tsx",
  "src/components/ui/dialog-impl.ts",
  "src/components/ui/alert-dialog-impl.ts",
  "src/components/ui/overlays-impl.ts",
  "src/components/ui/overlay-facade.tsx",
]);
const MODAL_ROLES = new Set(["dialog", "alertdialog"]);

/** A string's text, or null: a literal, a template without parts, or a template's literal parts. */
function literalText(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node))
    return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ${} ");
  return null;
}

/** A class list holding both `fixed` and `inset-0`, read after their variants. */
function fullScreenLayer(text: string): boolean {
  const all = utilities(text);
  return all.includes("fixed") && all.includes("inset-0");
}

/** DG-2's findings in one file: each line once. */
function modalSurfaces(source: ts.SourceFile): { line: number; what: string }[] {
  const out = new Map<number, string>();
  const at = (node: ts.Node, what: string) => {
    const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
    if (!out.has(line)) out.set(line, what);
  };
  const roleOf = (node: ts.Node | undefined): string | null => {
    if (node === undefined) return null;
    if (ts.isJsxExpression(node)) return roleOf(node.expression);
    return literalText(node);
  };
  const walk = (node: ts.Node) => {
    if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(source);
      if (name === "aria-modal") at(node, "aria-modal");
      const role = name === "role" ? roleOf(node.initializer) : null;
      if (role !== null && MODAL_ROLES.has(role)) at(node, `role="${role}"`);
      if (
        name === "className" &&
        node.initializer &&
        fullScreenLayer(node.initializer.getText(source))
      )
        at(node, "a fixed inset-0 layer");
    } else if (ts.isPropertyAssignment(node)) {
      const key = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : "";
      if (key === "aria-modal") at(node, "aria-modal");
      const role = key === "role" ? literalText(node.initializer) : null;
      if (role !== null && MODAL_ROLES.has(role)) at(node, `role="${role}"`);
    } else if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "setAttribute"
    ) {
      const [first, second] = node.arguments.map((arg) => literalText(arg));
      if (first === "aria-modal") at(node, "aria-modal");
      if (first === "role" && second !== undefined && second !== null && MODAL_ROLES.has(second))
        at(node, `role="${second}"`);
    } else {
      const text = literalText(node);
      if (text !== null && fullScreenLayer(text)) at(node, "a fixed inset-0 layer");
    }
    ts.forEachChild(node, walk);
  };
  walk(source);
  return [...out].map(([line, what]) => ({ line, what }));
}

/** What each owner must read (DG-3). */
export const OWNERS: Record<string, readonly string[]> = {
  "src/components/ui/dialog.tsx": [
    "DIALOG_SCRIM",
    "DIALOG_PANEL",
    "SCREEN_PANEL",
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
/** The popover's own files, which draw its look (turn S6-3). */
const POPOVER_OWNERS = new Set([
  "src/components/ui/popover.tsx",
  "src/components/ui/popover-impl.tsx",
]);
const DIALOG_PRIMITIVE = /(?:^|\/)dialog-primitive$/;

/** The anatomy's look file and its parts (cursor-bundle-3, DG-8 to DG-11). */
const LOOK_FILE = "src/components/ui/dialog-parts-look.ts";
const PARTS_FILE = "src/components/ui/dialog-parts.tsx";

/** DG-8: what the body's one form holds, and what it never holds. */
const BODY_HOLDS = ["relative", "grow", "min-h-0", "overflow-y-auto"];
const BODY_NEVER = ["flex-1"];

/** DG-9: the parts that end a panel: a footer of any family. */
const BODY_ENDS = new Set([...FOOTERS, "PanelFooter"]);

/** DG-9's permanent exception (DEC-426): an attribute of the body, with its reason. */
export const END_EXEMPT: Record<string, string> = {
  fill: "a fill body runs to the frame's edge by design and carries no flow to inset (ruling 1, answer 4)",
};

/** DG-10: every class that makes a scroller, and the permanent exceptions among them (DEC-426). */
const SCROLLERS = [
  "overflow-auto",
  "overflow-scroll",
  "overflow-y-auto",
  "overflow-y-scroll",
  "overflow-x-auto",
  "overflow-x-scroll",
];
export const SCROLLER_EXEMPT: Record<string, string> = {
  "overflow-x-auto": "a strip that scrolls sideways is not the body's scroll (ruling 1, answer 1)",
  "overflow-x-scroll":
    "a strip that scrolls sideways is not the body's scroll (ruling 1, answer 1)",
};

/** DG-11: the parts that describe a panel, the wrappers that take a `description`, the mark. */
const DESCRIPTION_PARTS = new Set([
  "DialogDescription",
  "AlertDialogDescription",
  "SheetDescription",
]);
const DESCRIBED_WRAPPERS = new Set(["CategoryModal", "ToolbarPanel"]);
const EXCEPTION_MARK = "// Description exception:";

/**
 * DG-11's permanent exceptions (DEC-426), the four `docs/features/design-foundation.md` names
 * under "Dialog anatomy": a panel in this file may say `aria-describedby={undefined}` under a
 * `// Description exception: <why>` line. Each entry says why; one with no marked panel fails.
 */
export const DESCRIPTION_EXCEPTIONS: Record<string, string> = {
  "src/components/shell/guide-sheet.tsx": "the guide itself is the panel's content",
  "src/features/posting/preview/preview-sheet.tsx":
    "the buyer's preview is the complete panel content",
  "src/features/posting/preview/photo-gallery.tsx": "the photo itself is the panel's content",
  "src/features/posting/preview/listing-detail.tsx": "the enlarged map is the panel's content",
};

/** The local names of the namespaces a file imports from dialog-primitive. */
function primitiveNamespaces(source: ts.SourceFile): Set<string> {
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const bindings = statement.importClause?.namedBindings;
    if (
      DIALOG_PRIMITIVE.test(statement.moduleSpecifier.text) &&
      bindings !== undefined &&
      ts.isNamespaceImport(bindings)
    )
      names.add(bindings.name.text);
  }
  return names;
}

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

/** An identifier read, not a declaration or an import of it. */
function readsOf(source: ts.SourceFile, name: string): ts.Identifier[] {
  const reads: ts.Identifier[] = [];
  const walk = (node: ts.Node) => {
    if (
      ts.isIdentifier(node) &&
      node.text === name &&
      !ts.isImportSpecifier(node.parent) &&
      !(ts.isVariableDeclaration(node.parent) && node.parent.name === node)
    )
      reads.push(node);
    ts.forEachChild(node, walk);
  };
  walk(source);
  return reads;
}

/**
 * DG-8: the body's one form. In the look file `BANDS_BODY` holds every class of BODY_HOLDS and
 * none of BODY_NEVER (a zero basis, or a wrapper, gives WebKit no height). It is read only by
 * `PanelBody` in dialog-parts.tsx, once, by the element PanelBody returns: never behind a wrapper.
 */
function bodyForm(name: string, text: string): { line: number; what: string }[] {
  const out: { line: number; what: string }[] = [];
  const kind = name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
  const lineOf = (node: ts.Node) =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  if (name === LOOK_FILE) {
    let declared = false;
    const walk = (node: ts.Node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === "BANDS_BODY"
      ) {
        declared = true;
        const value = node.initializer === undefined ? null : literalText(node.initializer);
        if (value === null)
          out.push({ line: lineOf(node), what: "DG-8 BANDS_BODY is not one literal class list" });
        else {
          const held = utilities(value);
          const missing = BODY_HOLDS.filter((cls) => !held.includes(cls));
          const never = BODY_NEVER.filter((cls) => held.includes(cls));
          if (missing.length > 0)
            out.push({
              line: lineOf(node),
              what: `DG-8 the body's form (BANDS_BODY) lacks ${missing.join(", ")}`,
            });
          if (never.length > 0)
            out.push({
              line: lineOf(node),
              what: `DG-8 the body's form (BANDS_BODY) holds ${never.join(", ")}: a zero basis gives WebKit no height`,
            });
        }
      }
      ts.forEachChild(node, walk);
    };
    walk(source);
    if (!declared) out.push({ line: 1, what: "DG-8 BANDS_BODY is not declared in the look file" });
    return out;
  }
  const reads = readsOf(source, "BANDS_BODY");
  if (name !== PARTS_FILE) {
    for (const read of reads)
      out.push({
        line: lineOf(read),
        what: "DG-8 reads BANDS_BODY: only PanelBody (dialog-parts.tsx) draws the body",
      });
    return out;
  }
  const [only] = reads;
  if (reads.length !== 1 || only === undefined) {
    out.push({ line: 1, what: `DG-8 PanelBody must read BANDS_BODY once (${reads.length} reads)` });
    return out;
  }
  let inPanelBody = false;
  let element: ts.Node | undefined;
  for (let up: ts.Node | undefined = only; up !== undefined; up = up.parent) {
    if (ts.isFunctionDeclaration(up) && up.name?.text === "PanelBody") inPanelBody = true;
    if (element === undefined && (ts.isJsxElement(up) || ts.isJsxSelfClosingElement(up)))
      element = up;
  }
  if (!inPanelBody)
    out.push({ line: lineOf(only), what: "DG-8 BANDS_BODY is read outside PanelBody" });
  let returned: ts.Node | undefined = element?.parent;
  while (returned !== undefined && ts.isParenthesizedExpression(returned))
    returned = returned.parent;
  if (element === undefined || returned === undefined || !ts.isReturnStatement(returned))
    out.push({
      line: lineOf(only),
      what: "DG-8 the body is not the element PanelBody returns: it sits behind a wrapper",
    });
  return out;
}

/**
 * DG-9: a `PanelBody` with no footer part after it among its parent's element children (through
 * fragments, `&&`, conditionals and mapped lists) carries `end`, the phone's bottom inset
 * (BANDS_END). An expression (`end={footer === undefined}`) counts as carried; `end={false}` does
 * not. A body held in a variable is judged where it is written. The exempt forms are END_EXEMPT.
 */
function bodiesWithoutEnd(source: ts.SourceFile): ts.JsxOpeningLikeElement[] {
  const carried = (body: ts.JsxOpeningLikeElement) =>
    [...Object.keys(END_EXEMPT), "end"].some((name) => {
      const value = attr(body, name, source);
      return value !== null && value !== "{false}";
    });
  const bodies: ts.JsxOpeningLikeElement[] = [];
  const judged = new Set<ts.JsxOpeningLikeElement>();
  const bad: ts.JsxOpeningLikeElement[] = [];
  const walk = (node: ts.Node) => {
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      const kids = elementChildren(node);
      kids.forEach((kid, index) => {
        if (tagOf(kid, source) !== "PanelBody") return;
        judged.add(kid);
        const ended = kids.slice(index + 1).some((next) => BODY_ENDS.has(tagOf(next, source)));
        if (!carried(kid) && !ended) bad.push(kid);
      });
    }
    const open = opening(node);
    if (open !== null && tagOf(open, source) === "PanelBody") bodies.push(open);
    ts.forEachChild(node, walk);
  };
  walk(source);
  for (const body of bodies) if (!judged.has(body) && !carried(body)) bad.push(body);
  return bad;
}

/** The same file's components by name: a function, or a const holding one (wrapped or not). */
function fileComponents(source: ts.SourceFile): Map<string, ts.Node> {
  const found = new Map<string, ts.Node>();
  const walk = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) found.set(node.name.text, node);
    else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) ||
        ts.isFunctionExpression(node.initializer) ||
        ts.isCallExpression(node.initializer))
    )
      found.set(node.name.text, node.initializer);
    ts.forEachChild(node, walk);
  };
  walk(source);
  return found;
}

/**
 * A panel's own tree and every same-file component it draws (once each). A panel nested inside
 * is judged on its own. A component in another file is not seen (DG-10's one stated limit).
 */
function panelNodes(
  panel: ts.Node,
  source: ts.SourceFile,
  components: Map<string, ts.Node>,
  isPanel: (open: ts.JsxOpeningLikeElement) => boolean,
): ts.Node[] {
  const nodes: ts.Node[] = [];
  const followed = new Set<string>();
  const walk = (node: ts.Node) => {
    const open = opening(node);
    if (open !== null && node !== panel && isPanel(open)) return;
    nodes.push(node);
    if (open !== null) {
      const tag = tagOf(open, source);
      const component = components.get(tag);
      if (component !== undefined && !followed.has(tag)) {
        followed.add(tag);
        walk(component);
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(panel);
  return nodes;
}

/**
 * DG-10: a panel's body is its one scroller. Inside a panel (and the same file's components it
 * draws) no element keeps a vertical scroller of its own in its className: `overflow-auto`,
 * `overflow-scroll`, `overflow-y-auto` or `overflow-y-scroll`, read after their variants. A strip
 * that scrolls sideways passes (SCROLLER_EXEMPT). The pickers' one list popup (`LIST_SCROLLER`,
 * menu-row.ts) is a constant, never a class list written here. LIMIT: a scroller in a child
 * component's own file is not seen.
 */
function scrollersIn(nodes: ts.Node[], source: ts.SourceFile): { node: ts.Node; what: string }[] {
  const found: { node: ts.Node; what: string }[] = [];
  for (const node of nodes) {
    if (
      !ts.isJsxAttribute(node) ||
      node.name.getText(source) !== "className" ||
      node.initializer === undefined
    )
      continue;
    const own = utilities(node.initializer.getText(source)).filter(
      (cls) => SCROLLERS.includes(cls) && ownValue(SCROLLER_EXEMPT, cls) === undefined,
    );
    if (own.length > 0)
      found.push({
        node,
        what: `a scroller of its own inside a panel ("${own.join(" ")}"): the body is the one scroller (PanelBody)`,
      });
  }
  return found;
}

/** The text of every string and template literal under a node. */
function literalsOf(node: ts.Node, source: ts.SourceFile): string[] {
  const found: string[] = [];
  const walk = (child: ts.Node) => {
    if (
      ts.isStringLiteral(child) ||
      ts.isNoSubstitutionTemplateLiteral(child) ||
      ts.isTemplateExpression(child)
    )
      found.push(child.getText(source));
    ts.forEachChild(child, walk);
  };
  walk(node);
  return found;
}

/** The text of every `id` the file draws on an element. */
function drawnIds(source: ts.SourceFile): Set<string> {
  const ids = new Set<string>();
  const walk = (node: ts.Node) => {
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(source) === "id" &&
      node.initializer !== undefined
    ) {
      const value = ts.isJsxExpression(node.initializer)
        ? node.initializer.expression
        : node.initializer;
      if (value !== undefined) ids.add(value.getText(source));
    }
    ts.forEachChild(node, walk);
  };
  walk(source);
  return ids;
}

/**
 * DG-11: a panel says what it is about. It draws a Description part (or one of the same file's
 * components does), or its wrapper is called with `description=`, or `aria-describedby` names an
 * `id` the file draws, or it is one of DESCRIPTION_EXCEPTIONS: `aria-describedby={undefined}`
 * under a `// Description exception: <why>` line, in a file the table names. Returns the refusal,
 * or null; `used` collects the exceptions that held.
 */
function descriptionRefusal(
  open: ts.JsxOpeningLikeElement,
  nodes: ts.Node[],
  context: {
    source: ts.SourceFile;
    name: string;
    lines: string[];
    ids: Set<string>;
    namespacePart: (tag: string) => boolean;
    used: Set<string>;
  },
): string | null {
  const { source, name, lines, ids, namespacePart, used } = context;
  const tag = tagOf(open, source);
  let aria: ts.JsxAttribute | undefined;
  for (const prop of open.attributes.properties)
    if (ts.isJsxAttribute(prop) && prop.name.getText(source) === "aria-describedby") aria = prop;
  if (aria?.initializer?.getText(source) === "{undefined}") {
    const line = source.getLineAndCharacterOfPosition(aria.getStart(source)).line + 1;
    const above = (lines[line - 2] ?? "").trim();
    if (!above.startsWith(EXCEPTION_MARK) || above.length === EXCEPTION_MARK.length)
      return `${tag}: aria-describedby={undefined} with no "${EXCEPTION_MARK} <why>" line above it`;
    if (ownValue(DESCRIPTION_EXCEPTIONS, name) === undefined)
      return `${tag}: a description exception in a file the feature doc does not name (DESCRIPTION_EXCEPTIONS)`;
    used.add(name);
    return null;
  }
  if (DESCRIBED_WRAPPERS.has(tag) && attr(open, "description", source) !== null) return null;
  for (const node of nodes) {
    const inner = opening(node);
    if (inner === null) continue;
    const part = tagOf(inner, source);
    if (DESCRIPTION_PARTS.has(part) || (namespacePart(part) && part.endsWith(".Description")))
      return null;
  }
  if (aria?.initializer !== undefined) {
    if (literalsOf(aria.initializer, source).some((literal) => ids.has(literal))) return null;
  }
  return `${tag}: a panel with no description (a Description part, a description prop, an aria-describedby naming one the file draws, or a marked exception)`;
}

/** The census: one finding per refusal, each keyed `file#rule`. */
export function dialogFindings(files: Src[]): { findings: Finding[]; keys: string[] } {
  const findings: Finding[] = [];
  const keys: string[] = [];
  const usedExceptions = new Set<string>();
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
    const script = name.endsWith(".tsx") || name.endsWith(".ts");
    if (script && !MODAL_OWNERS.has(name)) {
      const kind = name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
      const read = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
      for (const { line, what } of modalSurfaces(read)) {
        keys.push(`${name}#DG-2`);
        findings.push({
          file: name,
          line,
          what: `DG-2 a modal surface of its own: ${what} (use Dialog's variants, dialog.tsx)`,
        });
      }
    }
    if (script && (name === LOOK_FILE || name === PARTS_FILE || text.includes("BANDS_BODY")))
      for (const { line, what } of bodyForm(name, text)) {
        keys.push(`${name}#DG-8`);
        findings.push({ file: name, line, what });
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
    const namespaces = primitiveNamespaces(source);
    const namespacePart = (tag: string) => namespaces.has(tag.slice(0, tag.indexOf(".")));
    // DG-10 and DG-11 judge a panel with the same file's components it draws.
    const components = fileComponents(source);
    const panelContext = {
      source,
      name,
      lines: text.split("\n"),
      ids: drawnIds(source),
      namespacePart,
      used: usedExceptions,
    };
    const isPanel = (open: ts.JsxOpeningLikeElement) => {
      const tag = tagOf(open, source);
      if (CONTENT.has(tag) || tag === "ToolbarPanel") return true;
      if (tag === "PopoverContent") return (attr(open, "variant", source) ?? "").includes("panel");
      return namespacePart(tag) && tag.endsWith(".Content");
    };
    const scrollerLines = new Set<number>();
    let inContent = 0;
    let nonModal = 0;
    const walk = (node: ts.Node) => {
      const open = opening(node);
      if (open === null) {
        ts.forEachChild(node, walk);
        return;
      }
      const tag = tagOf(open, source);
      const judged =
        PARTS.has(tag) ||
        (nonModal === 0 && namespacePart(tag)) ||
        (tag === "PopoverContent" && !POPOVER_OWNERS.has(name));
      if (judged) {
        if (attr(open, "overlayClassName", source) !== null)
          push(open, "DG-1", `${tag}: overlayClassName (use layer, dialog-look.ts)`);
        const own = utilities(attr(open, "className", source) ?? "").filter((u) => LOOK.test(u));
        if (own.length > 0) push(open, "DG-1", `${tag}: own look class "${own.join(" ")}"`);
      }
      if (CONTENT.has(tag) && ts.isJsxElement(node)) actionRows(node);
      if ((inContent > 0 || CONTENT.has(tag)) && ts.isJsxElement(node)) choiceRows(node);
      const content = CONTENT.has(tag) ? 1 : 0;
      const modeless =
        namespacePart(tag) && tag.endsWith(".Root") && attr(open, "modal", source) === "{false}"
          ? 1
          : 0;
      if (nonModal === 0 && isPanel(open)) {
        const nodes = panelNodes(node, source, components, isPanel);
        for (const { node: at, what } of scrollersIn(nodes, source)) {
          const line = source.getLineAndCharacterOfPosition(at.getStart(source)).line + 1;
          if (scrollerLines.has(line)) continue;
          scrollerLines.add(line);
          push(at, "DG-10", what);
        }
        const refusal = descriptionRefusal(open, nodes, panelContext);
        if (refusal !== null) push(open, "DG-11", refusal);
      }
      inContent += content;
      nonModal += modeless;
      ts.forEachChild(node, walk);
      inContent -= content;
      nonModal -= modeless;
    };
    walk(source);
    for (const body of bodiesWithoutEnd(source))
      push(
        body,
        "DG-9",
        "PanelBody: no footer part after it and no `end` (the bottom inset, BANDS_END)",
      );
  }
  for (const entry of Object.keys(DESCRIPTION_EXCEPTIONS)) {
    if (!files.some((file) => file.name === entry) || usedExceptions.has(entry)) continue;
    keys.push(`${entry}#DG-11`);
    findings.push({
      file: entry,
      line: 1,
      what: `DG-11 DESCRIPTION_EXCEPTIONS names this file but no panel in it carries the mark`,
    });
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
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-1 ")))).toBe(
      [
        'src/x.tsx:1 DG-1 DialogContent: own look class "max-h-[85dvh]"',
        "src/x.tsx:2 DG-1 DialogContent: overlayClassName (use layer, dialog-look.ts)",
        'src/x.tsx:3 DG-1 AlertDialogAction: own look class "min-h-11"',
        'src/x.tsx:4 DG-1 CategoryModal: own look class "p-0 shadow-none"',
      ].join("\n"),
    );
  });

  it("DG-7 planted: a dialog-primitive namespace part and PopoverContent with their own look fail; non-modal content and the popover's own files pass (turn S6-3)", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `import * as DP from "@/components/ui/dialog-primitive";\n` +
          `const a = <DP.Content className="fixed inset-0 bg-card">x</DP.Content>;\n` +
          `const b = <DP.Root modal={false}><DP.Content className="fixed bg-card">\n` +
          `  <DP.Title className="text-lg">t</DP.Title></DP.Content></DP.Root>;\n` +
          `const c = <DP.Title className="sr-only">t</DP.Title>;\n` +
          `const d = <PopoverContent className="w-80 p-0">y</PopoverContent>;\n` +
          `const e = <PopoverContent variant="panel" align="end">y</PopoverContent>;\n` +
          `const f = <Other.Content className="fixed">z</Other.Content>;\n` +
          `const g = <DP.Overlay overlayClassName="z-[100]" />;\n`,
      },
      {
        name: "src/components/ui/popover.tsx",
        text: `const a = <PopoverContent className="w-72 p-4">y</PopoverContent>;\n`,
      },
    ]);
    // Line 2's `fixed inset-0` is DG-2's as well (its own planted case).
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-1 ")))).toBe(
      [
        'src/x.tsx:2 DG-1 DP.Content: own look class "fixed inset-0 bg-card"',
        'src/x.tsx:6 DG-1 PopoverContent: own look class "w-80 p-0"',
        "src/x.tsx:9 DG-1 DP.Overlay: overlayClassName (use layer, dialog-look.ts)",
      ].join("\n"),
    );
  });

  it("DG-2 planted: a modal surface of its own fails in every spelling; non-modal layers and the primitive's own files pass (turn S6-4)", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <div role="dialog">x</div>;\n` +
          `const b = <div role={"alertdialog"} />;\n` +
          `const c = <div aria-modal="true" />;\n` +
          "const d = <div className={`fixed inset-0 ${Z_SHEET} bg-background`} />;\n" +
          `const e = <div className={cn("fixed", "md:inset-0", x)} />;\n` +
          `const f = { role: "dialog", "aria-modal": true };\n` +
          `el.setAttribute("aria-modal", "true");\n` +
          `el.setAttribute("role", "alertdialog");\n` +
          `const g = <div role="menu" aria-haspopup="dialog" className="fixed inset-x-0 top-13" />;\n` +
          `const h = <div className="absolute inset-0" />;\n` +
          `{/* role="dialog" aria-modal */}\n`,
      },
      { name: "src/layer.ts", text: `export const LAYER = "fixed inset-0 z-50";\n` },
      {
        name: "src/components/ui/dialog-look.ts",
        text: "export const DIALOG_SCRIM = `fixed inset-0 bg-scrim`;\n",
      },
      { name: "src/components/ui/sheet.tsx", text: `const a = <div aria-modal="true" />;\n` },
    ]);
    const text = report(findings.filter((finding) => finding.what.startsWith("DG-2")));
    const use = "(use Dialog's variants, dialog.tsx)";
    expect(text).toBe(
      [
        `src/layer.ts:1 DG-2 a modal surface of its own: a fixed inset-0 layer ${use}`,
        `src/x.tsx:1 DG-2 a modal surface of its own: role="dialog" ${use}`,
        `src/x.tsx:2 DG-2 a modal surface of its own: role="alertdialog" ${use}`,
        `src/x.tsx:3 DG-2 a modal surface of its own: aria-modal ${use}`,
        `src/x.tsx:4 DG-2 a modal surface of its own: a fixed inset-0 layer ${use}`,
        `src/x.tsx:5 DG-2 a modal surface of its own: a fixed inset-0 layer ${use}`,
        `src/x.tsx:6 DG-2 a modal surface of its own: role="dialog" ${use}`,
        `src/x.tsx:7 DG-2 a modal surface of its own: aria-modal ${use}`,
        `src/x.tsx:8 DG-2 a modal surface of its own: role="alertdialog" ${use}`,
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
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-4 ")))).toBe(
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
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-5 ")))).toBe(
      [
        "src/x.tsx:2 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
        "src/x.tsx:4 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
        "src/x.tsx:8 DG-5 a choice row not reading LIST_ROW and LIST_CHOICE_ON (menu-row.ts)",
      ].join("\n"),
    );
  });

  it("DG-8 planted: a body form with flex-1 or without relative fails, so does a second reader of BANDS_BODY and a body behind a wrapper; the one form passes", () => {
    const look = (cls: string): Src => ({
      name: LOOK_FILE,
      text: `export const BANDS_BODY = "${cls}";\n`,
    });
    const parts = (jsx: string): Src => ({
      name: PARTS_FILE,
      text: `export function PanelBody() {\n  return (\n${jsx}\n  );\n}\n`,
    });
    const run = (...files: Src[]) =>
      report(dialogFindings(files).findings.filter((finding) => finding.what.startsWith("DG-8 ")));
    const form = "relative min-h-0 grow overflow-y-auto overscroll-contain";
    const body = "<div className={cn(BANDS_BODY, extra)} />";
    expect(run(look(form), parts(body))).toBe("");
    expect(run(look("relative min-h-0 flex-1 overflow-y-auto"))).toBe(
      [
        `${LOOK_FILE}:1 DG-8 the body's form (BANDS_BODY) holds flex-1: a zero basis gives WebKit no height`,
        `${LOOK_FILE}:1 DG-8 the body's form (BANDS_BODY) lacks grow`,
      ].join("\n"),
    );
    expect(run(look("min-h-0 grow overflow-y-auto"))).toBe(
      `${LOOK_FILE}:1 DG-8 the body's form (BANDS_BODY) lacks relative`,
    );
    expect(run({ name: LOOK_FILE, text: "export const OTHER = 1;\n" })).toBe(
      `${LOOK_FILE}:1 DG-8 BANDS_BODY is not declared in the look file`,
    );
    expect(
      run({ name: "src/x.tsx", text: "const a = <div className={cn(BANDS_BODY)} />;\n" }),
    ).toBe("src/x.tsx:1 DG-8 reads BANDS_BODY: only PanelBody (dialog-parts.tsx) draws the body");
    expect(run(parts(`<section>${body}</section>`))).toBe(
      `${PARTS_FILE}:3 DG-8 the body is not the element PanelBody returns: it sits behind a wrapper`,
    );
    expect(run(parts("<div />"))).toBe(
      `${PARTS_FILE}:1 DG-8 PanelBody must read BANDS_BODY once (0 reads)`,
    );
    expect(run(parts("<div className={cn(BANDS_BODY, BANDS_BODY)} />"))).toBe(
      `${PARTS_FILE}:1 DG-8 PanelBody must read BANDS_BODY once (2 reads)`,
    );
  });

  it("DG-9 planted: a body with no footer after it and no `end` fails; end, fill and a footer after it pass", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <DialogContent bands><PanelHeader /><PanelBody>x</PanelBody></DialogContent>;\n` +
          `const b = <DialogContent bands><PanelBody end>x</PanelBody></DialogContent>;\n` +
          `const c = <DialogContent bands><PanelBody fill>x</PanelBody></DialogContent>;\n` +
          `const d = <DialogContent bands><PanelBody>x</PanelBody><PanelFooter>y</PanelFooter></DialogContent>;\n` +
          `const e = <DialogContent bands><PanelBody end={footer === undefined}>x</PanelBody>{footer ? <PanelFooter>y</PanelFooter> : null}</DialogContent>;\n` +
          `const f = <DialogContent bands><PanelBody end={false}>x</PanelBody></DialogContent>;\n` +
          `const g = <DialogContent bands><PanelBody>x</PanelBody>{ok && <DialogFooter>y</DialogFooter>}</DialogContent>;\n` +
          `const h = <DialogContent bands><PanelFooter>y</PanelFooter><PanelBody>x</PanelBody></DialogContent>;\n` +
          `const held = <PanelBody>x</PanelBody>;\n` +
          `const kept = <PanelBody end>x</PanelBody>;\n`,
      },
    ]);
    const what =
      "DG-9 PanelBody: no footer part after it and no `end` (the bottom inset, BANDS_END)";
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-9 ")))).toBe(
      [1, 6, 8, 9]
        .map((line) => `src/x.tsx:${line} ${what}`)
        .sort()
        .join("\n"),
    );
  });

  it("DG-10 planted: a vertical scroller inside a panel fails, in a variant, in a component of the same file and on the body itself; a sideways strip, LIST_SCROLLER and a scroller outside a panel pass", () => {
    const { findings } = dialogFindings([
      {
        name: "src/x.tsx",
        text:
          `const a = <DialogContent><div className="max-h-48 overflow-y-auto">x</div></DialogContent>;\n` +
          `const b = <DialogContent><div className="flex overflow-x-auto">x</div></DialogContent>;\n` +
          `const c = <DialogContent><div className={cn("grid", open && "md:overflow-auto")}>x</div></DialogContent>;\n` +
          `const d = <DialogContent><div className={LIST_SCROLLER}>x</div></DialogContent>;\n` +
          `const e = <div className="max-h-48 overflow-y-auto">x</div>;\n` +
          `const f = <DialogContent><Strip /></DialogContent>;\n` +
          `function Strip() { return <ul className="overflow-y-scroll">x</ul>; }\n` +
          `const g = <SheetContent><PanelBody className="overflow-y-auto">x</PanelBody></SheetContent>;\n` +
          `const h = <DP.Root modal={false}><DP.Content><div className="overflow-y-auto">x</div></DP.Content></DP.Root>;\n` +
          `import * as DP from "@/components/ui/dialog-primitive";\n`,
      },
    ]);
    const own = (cls: string) =>
      `a scroller of its own inside a panel ("${cls}"): the body is the one scroller (PanelBody)`;
    expect(report(findings.filter((finding) => finding.what.startsWith("DG-10 ")))).toBe(
      [
        `src/x.tsx:1 DG-10 ${own("overflow-y-auto")}`,
        `src/x.tsx:3 DG-10 ${own("overflow-auto")}`,
        `src/x.tsx:7 DG-10 ${own("overflow-y-scroll")}`,
        `src/x.tsx:8 DG-10 ${own("overflow-y-auto")}`,
      ].join("\n"),
    );
  });

  it("DG-11 planted: a panel with no description fails; a Description part, a description prop, a named id, a same-file component's part and a marked exception pass", () => {
    const none = (tag: string) =>
      `${tag}: a panel with no description (a Description part, a description prop, an aria-describedby naming one the file draws, or a marked exception)`;
    const found = (name: string, text: string) =>
      report(
        dialogFindings([{ name, text }]).findings.filter((finding) =>
          finding.what.startsWith("DG-11 "),
        ),
      );
    expect(
      found(
        "src/x.tsx",
        `const a = <DialogContent><DialogTitle>t</DialogTitle></DialogContent>;\n` +
          `const b = <DialogContent><DialogDescription>d</DialogDescription></DialogContent>;\n` +
          `const c = <CategoryModal title="t" description="d">x</CategoryModal>;\n` +
          `const d = <CategoryModal title="t">x</CategoryModal>;\n` +
          `const e = <DialogContent aria-describedby="why"><p id="why">w</p></DialogContent>;\n` +
          `const f = <DialogContent aria-describedby="other"><p id="why">w</p></DialogContent>;\n` +
          `const g = <DialogContent aria-describedby={undefined}>x</DialogContent>;\n` +
          `const h = <DialogContent><Body /></DialogContent>;\n` +
          `function Body() { return <DialogDescription>d</DialogDescription>; }\n` +
          `const i = <PopoverContent variant="panel"><p>d</p></PopoverContent>;\n` +
          `const j = <DialogContent>\n` +
          `  <DialogContent><DialogDescription>d</DialogDescription></DialogContent>\n` +
          `</DialogContent>;\n` +
          `const k = <DP.Content>x</DP.Content>;\n` +
          `const l = <DP.Root modal={false}><DP.Content>x</DP.Content></DP.Root>;\n` +
          `import * as DP from "@/components/ui/dialog-primitive";\n`,
      ),
    ).toBe(
      [
        `src/x.tsx:1 DG-11 ${none("DialogContent")}`,
        `src/x.tsx:4 DG-11 ${none("CategoryModal")}`,
        `src/x.tsx:6 DG-11 ${none("DialogContent")}`,
        `src/x.tsx:7 DG-11 DialogContent: aria-describedby={undefined} with no "// Description exception: <why>" line above it`,
        `src/x.tsx:10 DG-11 ${none("PopoverContent")}`,
        `src/x.tsx:11 DG-11 ${none("DialogContent")}`,
        `src/x.tsx:14 DG-11 ${none("DP.Content")}`,
      ]
        .sort()
        .join("\n"),
    );
    const viewer = "src/features/posting/preview/photo-gallery.tsx";
    const marked = (reason: string) =>
      `const a = (\n  <DialogContent\n    // Description exception:${reason}\n    aria-describedby={undefined}\n  >x</DialogContent>\n);\n`;
    expect(found(viewer, marked(" this full-screen viewer is the photo itself."))).toBe("");
    expect(found(viewer, marked(""))).toBe(
      [
        `${viewer}:1 DG-11 DESCRIPTION_EXCEPTIONS names this file but no panel in it carries the mark`,
        `${viewer}:2 DG-11 DialogContent: aria-describedby={undefined} with no "// Description exception: <why>" line above it`,
      ].join("\n"),
    );
    expect(found("src/x.tsx", marked(" the photo."))).toBe(
      "src/x.tsx:2 DG-11 DialogContent: a description exception in a file the feature doc does not name (DESCRIPTION_EXCEPTIONS)",
    );
    expect(
      found(
        viewer,
        "const a = <DialogContent><DialogDescription>d</DialogDescription></DialogContent>;\n",
      ),
    ).toBe(
      `${viewer}:1 DG-11 DESCRIPTION_EXCEPTIONS names this file but no panel in it carries the mark`,
    );
  });

  it("DG-6 planted: a stale allowlist line fails, and so does an expired one", () => {
    const dir = join(ROOT, "node_modules/.cache/dialogs-census");
    mkdirSync(dir, { recursive: true });
    const path = join(dir, "allowlist.txt");
    const clean = dialogFindings([{ name: "src/x.tsx", text: "const a = <DialogContent />;" }]);
    const planted = dialogFindings([
      {
        name: "src/x.tsx",
        text: `const a = <DialogContent className="p-0"><DialogDescription>d</DialogDescription></DialogContent>;`,
      },
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
