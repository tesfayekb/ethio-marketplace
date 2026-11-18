import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-940 (Foundations turn 34f) — A PART FETCHED AFTER THE FIRST PAINT HOLDS ITS BOX FROM THE
 * FIRST PAINT. A piece of the page whose code or data arrives late (a `resilientLazy` or `lazy`
 * component, anything behind `<Suspense>`) draws, while it waits and when it cannot download, a
 * place the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2's
 * predictable layout; Core Web Vitals' cumulative layout shift). The mechanism is the reserving
 * frame — today MapFrame (src/features/posting/map/map-frame.tsx), which draws the still map's box
 * and caption from the same module the map draws them from (src/features/posting/map/still-map.ts).
 *
 * The census reads every browser file (tests excepted) for each `resilientLazy(…)` / `lazy(…)`
 * binding and each `<Suspense fallback={…}>`. A consumer is keyed `<file>#<name>`: the lazy
 * binding's name, or the tag of the Suspense's first child element. Each of its places — the
 * resilientLazy fallback and every Suspense fallback around it — holds its box: it renders a
 * RESERVER, directly or through a function of the same file that does. Otherwise the consumer
 * carries an allowance (`<file>#<name> | reason | until`) in holds-its-box-allowlist.txt. What the
 * census does not judge: whether a reserver's size equals what it reserves for — MFR-2 proves that
 * for MapFrame, and ALS-1 on the built page.
 *
 * INC-1200 — A TOP-LAYER OVERLAY HAS NO BOX TO HOLD. A late part is an overlay when its loader
 * (`import("…").then((m) => m.Name)`) names an exported component whose every return is null or an
 * element of one of OVERLAY_ROOTS, imported from that root's module. An overlay's place that draws
 * nothing (a fallback component that only returns null; `<Suspense fallback={null}>`) passes by
 * kind; a place that draws anything for it is still a finding, since it would draw in the page's
 * flow. The kind follows the binding across files (`export const LazyX = resilientLazy(…)` in one
 * file, `<LazyX>` in another). A loader, a component or an import the census cannot resolve
 * statically — a default import, a re-export, a computed specifier — is not an overlay. Whether a
 * root truly draws on the top layer is its primitive's contract (HB-3 reads its portal), not this
 * census's proof.
 */

type Finding = { file: string; line: number; what: string };

/** The components whose rendering holds a late part's box. */
export const RESERVERS = ["MapFrame"] as const;

/** The top-layer primitives: each draws through a portal and takes no box in the page's flow. */
export const OVERLAY_ROOTS = [
  { name: "Dialog", module: "src/components/ui/dialog.tsx" },
  { name: "Sheet", module: "src/components/ui/sheet.tsx" },
] as const;

const LAZY_CALLS = new Set(["resilientLazy", "lazy"]);

function rendersReserver(text: string): boolean {
  return RESERVERS.some((name) => new RegExp(`<${name}[\\s/>]`).test(text));
}

/** The text of the function `name` declares in `source` (a declaration or a const arrow), if any. */
function functionText(source: ts.SourceFile, name: string): string | undefined {
  let found: string | undefined;
  const walk = (node: ts.Node) => {
    if (found !== undefined) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) found = node.getText(source);
    else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    )
      found = node.initializer.getText(source);
    ts.forEachChild(node, walk);
  };
  walk(source);
  return found;
}

/** Whether a fallback expression holds its box: a reserver, or a same-file function that renders one. */
function holds(expression: ts.Expression | undefined, source: ts.SourceFile): boolean {
  if (expression === undefined) return false;
  if (ts.isIdentifier(expression)) {
    const body = functionText(source, expression.text);
    return body !== undefined && rendersReserver(body);
  }
  const text = expression.getText(source);
  if (rendersReserver(text)) return true;
  if (ts.isJsxSelfClosingElement(expression) || ts.isJsxElement(expression)) {
    const tag = (
      ts.isJsxSelfClosingElement(expression) ? expression : expression.openingElement
    ).tagName.getText(source);
    const body = functionText(source, tag);
    return body !== undefined && rendersReserver(body);
  }
  return false;
}

function firstChildTag(element: ts.JsxElement, source: ts.SourceFile): string {
  for (const child of element.children) {
    if (ts.isJsxSelfClosingElement(child)) return child.tagName.getText(source);
    if (ts.isJsxElement(child)) return child.openingElement.tagName.getText(source);
  }
  return "(no element child)";
}

const parsed = new Map<string, ts.SourceFile>();

function sourceOf(file: string): ts.SourceFile {
  const known = parsed.get(file);
  if (known !== undefined) return known;
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  parsed.set(file, source);
  return source;
}

/** The file a module specifier names from `from` (`@/…` under src/, `./…` beside it), if one exists. */
function resolveModule(from: string, specifier: string): string | undefined {
  const base = specifier.startsWith("@/")
    ? join("src", specifier.slice(2))
    : specifier.startsWith(".")
      ? join(dirname(from), specifier)
      : undefined;
  if (base === undefined) return undefined;
  return [`${base}.tsx`, `${base}.ts`, base, join(base, "index.tsx"), join(base, "index.ts")].find(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
}

/** The module a named import of `local` comes from in `source`, with the name it is exported as. */
function importOf(
  source: ts.SourceFile,
  local: string,
): { module: string; name: string } | undefined {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      if (element.name.text !== local) continue;
      const module = resolveModule(source.fileName, statement.moduleSpecifier.text);
      return module === undefined
        ? undefined
        : { module, name: (element.propertyName ?? element.name).text };
    }
  }
  return undefined;
}

function hasExport(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    (ts.getModifiers(node) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  );
}

/** Whether `source` exports `name` itself (a modifier, or a local `export { name }`; never a re-export). */
function exportsOwn(source: ts.SourceFile, name: string): boolean {
  return source.statements.some(
    (statement) =>
      ts.isExportDeclaration(statement) &&
      statement.moduleSpecifier === undefined &&
      statement.exportClause !== undefined &&
      ts.isNamedExports(statement.exportClause) &&
      statement.exportClause.elements.some(
        (element) => element.name.text === name && element.propertyName === undefined,
      ),
  );
}

type FunctionNode = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;

/** The top-level function `name` of `source` (a declaration, or a const arrow or function). */
function topFunction(
  source: ts.SourceFile,
  name: string,
): { node: FunctionNode; exported: boolean } | undefined {
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === name)
      return { node: statement, exported: hasExport(statement) || exportsOwn(source, name) };
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const init = declaration.initializer;
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === name &&
        init !== undefined &&
        (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
      )
        return { node: init, exported: hasExport(statement) || exportsOwn(source, name) };
    }
  }
  return undefined;
}

/** What a function returns: its concise body, or every return of its own body (nested functions excepted). */
function returnsOf(fn: FunctionNode): (ts.Expression | undefined)[] {
  if (fn.body === undefined) return [];
  if (!ts.isBlock(fn.body)) return [fn.body];
  const found: (ts.Expression | undefined)[] = [];
  const walk = (node: ts.Node) => {
    if (ts.isFunctionLike(node) || ts.isClassLike(node)) return;
    if (ts.isReturnStatement(node)) found.push(node.expression);
    ts.forEachChild(node, walk);
  };
  ts.forEachChild(fn.body, walk);
  return found;
}

function unwrap(expression: ts.Expression | undefined): ts.Expression | undefined {
  let current = expression;
  while (current !== undefined && ts.isParenthesizedExpression(current))
    current = current.expression;
  return current;
}

const isNull = (expression: ts.Expression | undefined) =>
  unwrap(expression)?.kind === ts.SyntaxKind.NullKeyword;

/** Whether a function draws nothing: it returns, and every return is null. */
function returnsOnlyNull(fn: FunctionNode): boolean {
  const values = returnsOf(fn);
  return values.length > 0 && values.every(isNull);
}

/** Whether a resilientLazy fallback draws nothing: an inline function, or a same-file one, returning only null. */
function drawsNothing(expression: ts.Expression | undefined, source: ts.SourceFile): boolean {
  const value = unwrap(expression);
  if (value === undefined) return false;
  if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) return returnsOnlyNull(value);
  if (!ts.isIdentifier(value)) return false;
  const local = topFunction(source, value.text);
  return local !== undefined && returnsOnlyNull(local.node);
}

/** Whether an element's tag is an overlay root imported from that root's own module. */
function isOverlayRoot(expression: ts.Expression | undefined, source: ts.SourceFile): boolean {
  const value = unwrap(expression);
  if (value === undefined || !(ts.isJsxElement(value) || ts.isJsxSelfClosingElement(value)))
    return false;
  const tag = (ts.isJsxElement(value) ? value.openingElement : value).tagName;
  if (!ts.isIdentifier(tag)) return false;
  const origin = importOf(source, tag.text);
  return OVERLAY_ROOTS.some(
    (root) => origin !== undefined && origin.name === root.name && origin.module === root.module,
  );
}

/** The module and export a lazy call's loader names: `() => import("m").then((x) => x.Name)`. */
function loaderTarget(call: ts.CallExpression): { specifier: string; name: string } | undefined {
  const loader = call.arguments[0];
  if (loader === undefined || !ts.isArrowFunction(loader) || !ts.isCallExpression(loader.body))
    return undefined;
  const then = loader.body;
  if (!ts.isPropertyAccessExpression(then.expression) || then.expression.name.text !== "then")
    return undefined;
  const load = then.expression.expression;
  if (!ts.isCallExpression(load) || load.expression.kind !== ts.SyntaxKind.ImportKeyword)
    return undefined;
  const specifier = load.arguments[0];
  const pick = then.arguments[0];
  if (
    specifier === undefined ||
    !ts.isStringLiteral(specifier) ||
    pick === undefined ||
    !ts.isArrowFunction(pick) ||
    pick.parameters.length !== 1
  )
    return undefined;
  const param = pick.parameters[0].name;
  const body = pick.body;
  if (
    !ts.isIdentifier(param) ||
    !ts.isPropertyAccessExpression(body) ||
    !ts.isIdentifier(body.expression) ||
    body.expression.text !== param.text
  )
    return undefined;
  return { specifier: specifier.text, name: body.name.text };
}

/** Whether a lazy call fetches an overlay: its loader's component returns an overlay root or null. */
function fetchesOverlay(call: ts.CallExpression, file: string): boolean {
  const target = loaderTarget(call);
  const module = target === undefined ? undefined : resolveModule(file, target.specifier);
  if (target === undefined || module === undefined) return false;
  const source = sourceOf(module);
  const component = topFunction(source, target.name);
  if (component === undefined || !component.exported) return false;
  const values = returnsOf(component.node);
  return (
    values.some((value) => isOverlayRoot(value, source)) &&
    values.every((value) => isNull(value) || isOverlayRoot(value, source))
  );
}

/** The lazy call `name` is bound to at the top of `source` (`[export] const name = resilientLazy(…)`). */
function lazyBinding(
  source: ts.SourceFile,
  name: string,
): { call: ts.CallExpression; exported: boolean } | undefined {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const init = declaration.initializer;
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === name &&
        init !== undefined &&
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        LAZY_CALLS.has(init.expression.text)
      )
        return { call: init, exported: hasExport(statement) || exportsOwn(source, name) };
    }
  }
  return undefined;
}

/** Whether a Suspense's first child is an overlay: a lazy binding of its file, or one imported from another. */
function childIsOverlay(tag: string, source: ts.SourceFile): boolean {
  const local = lazyBinding(source, tag);
  if (local !== undefined) return fetchesOverlay(local.call, source.fileName);
  const origin = importOf(source, tag);
  if (origin === undefined) return false;
  const remote = lazyBinding(sourceOf(origin.module), origin.name);
  return remote !== undefined && remote.exported && fetchesOverlay(remote.call, origin.module);
}

export function holdsItsBoxCensus(files: string[]): {
  consumers: string[];
  findings: Finding[];
  overlays: string[];
} {
  const consumers = new Set<string>();
  const findings: Finding[] = [];
  const overlays = new Set<string>();
  for (const file of files) {
    visitTs(file, (node, source) => {
      const line = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        LAZY_CALLS.has(node.expression.text) &&
        ts.isVariableDeclaration(node.parent) &&
        ts.isIdentifier(node.parent.name)
      ) {
        const key = `${file}#${node.parent.name.text}`;
        consumers.add(key);
        if (node.expression.text !== "resilientLazy" || holds(node.arguments[2], source)) return;
        if (drawsNothing(node.arguments[2], source) && fetchesOverlay(node, file))
          overlays.add(key);
        else
          findings.push({
            file: key,
            line: line(),
            what: "its place when it cannot download does not hold its box",
          });
        return;
      }
      if (ts.isJsxElement(node) && node.openingElement.tagName.getText(source) === "Suspense") {
        const tag = firstChildTag(node, source);
        const key = `${file}#${tag}`;
        consumers.add(key);
        const fallback = node.openingElement.attributes.properties.find(
          (property): property is ts.JsxAttribute =>
            ts.isJsxAttribute(property) && property.name.getText(source) === "fallback",
        );
        const value =
          fallback?.initializer !== undefined && ts.isJsxExpression(fallback.initializer)
            ? fallback.initializer.expression
            : undefined;
        if (holds(value, source)) return;
        if (isNull(value) && childIsOverlay(tag, source)) overlays.add(key);
        else
          findings.push({
            file: key,
            line: line(),
            what: "its place while it loads does not hold its box",
          });
      }
    });
  }
  const found = new Set(findings.map((hit) => hit.file));
  return {
    consumers: [...consumers].sort(),
    findings,
    overlays: [...overlays].filter((key) => !found.has(key)).sort(),
  };
}

const ALLOWLIST = "scripts/conformance/holds-its-box-allowlist.txt";
const BROWSER = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).filter(
  (file) => !/(?:^|\/)(?:test|server)\//.test(file) && !file.endsWith(".d.ts"),
);
const { consumers, findings, overlays } = holdsItsBoxCensus(BROWSER);
const allowances = readAllowlist(
  ALLOWLIST,
  findings.map((hit) => hit.file),
);

describe("a part fetched after the first paint holds its box (INC-940)", () => {
  it(
    "HB-1 every lazy part's places hold its box through a reserver, or the part has a live allowance",
    () => {
      console.log(
        `[HB-1] late parts: ${consumers.length}; overlays passed by kind: ${overlays.length}; outside the mechanism: ${new Set(findings.map((hit) => hit.file)).size}; allowlist: ${allowances.size}`,
      );
      expect(consumers.length).toBeGreaterThanOrEqual(13);
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      // The mechanism's own consumers stay on it: they are never allowlisted.
      for (const key of [
        "src/features/posting/preview/listing-detail.tsx#MapPreview",
        "src/features/posting/step-where.tsx#MapPreview",
      ]) {
        expect(consumers).toContain(key);
        expect(allowances.has(key)).toBe(false);
      }
    },
    TREE_SCAN_MS,
  );

  it("HB-2 the census sees a planted text place, an empty place and a silent download, and passes a reserver", () => {
    const dir = "node_modules/.cache/holds-its-box";
    mkdirSync(dir, { recursive: true });
    const text = `${dir}/hb-text.tsx`;
    const empty = `${dir}/hb-empty.tsx`;
    const silent = `${dir}/hb-silent.tsx`;
    const good = `${dir}/hb-good.tsx`;
    try {
      writeFileSync(
        text,
        'import { Suspense, lazy } from "react";\nconst Map = lazy(() => import("./map"));\nexport const A = () => (\n  <Suspense fallback={<p>Map pin</p>}>\n    <Map />\n  </Suspense>\n);\n',
      );
      writeFileSync(
        empty,
        'import { Suspense } from "react";\nimport { Feed } from "./feed";\nexport const B = () => (\n  <Suspense fallback={null}>\n    <Feed />\n  </Suspense>\n);\n',
      );
      writeFileSync(
        silent,
        'import { resilientLazy } from "@/lib/resilient-lazy";\nfunction Nothing() {\n  return null;\n}\nexport const Map = resilientLazy(() => import("./map"), "the map", Nothing);\n',
      );
      writeFileSync(
        good,
        'import { Suspense } from "react";\nimport { resilientLazy } from "@/lib/resilient-lazy";\nimport { MapFrame } from "./map-frame";\nfunction Word() {\n  return <MapFrame precision={null}>x</MapFrame>;\n}\nconst Map = resilientLazy(() => import("./map"), "the map", Word);\nexport const C = () => (\n  <Suspense fallback={<Word />}>\n    <Map />\n  </Suspense>\n);\nexport const D = () => (\n  <Suspense fallback={<MapFrame precision="exact" />}>\n    <Map />\n  </Suspense>\n);\n',
      );
      const result = holdsItsBoxCensus([text, empty, silent, good]);
      expect(result.consumers).toEqual(
        [`${empty}#Feed`, `${good}#Map`, `${silent}#Map`, `${text}#Map`].sort(),
      );
      expect(report(result.findings)).toBe(
        [
          `${empty}#Feed:4 its place while it loads does not hold its box`,
          `${silent}#Map:5 its place when it cannot download does not hold its box`,
          `${text}#Map:4 its place while it loads does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-3 every reserver exists, every overlay root is its module's portal-drawing root, and the allowlist's lines are live, reasoned and dated", () => {
    const frame = readFileSync("src/features/posting/map/map-frame.tsx", "utf8");
    for (const name of RESERVERS) expect(frame).toMatch(new RegExp(`export function ${name}\\(`));
    for (const root of OVERLAY_ROOTS) {
      const text = readFileSync(root.module, "utf8");
      expect(text).toMatch(new RegExp(`^const ${root.name} = \\w+\\.Root;$`, "m"));
      expect(text).toMatch(new RegExp(`^export \\{[^}]*\\b${root.name},`, "m"));
      expect(text).toMatch(/<\w+Portal>/);
    }
    for (const allowance of allowances.values()) {
      expect(allowance.reason.length).toBeGreaterThan(20);
      expect(allowance.until).toMatch(/^(?:\d{4}-\d{2}-\d{2}|INC-\d+|DEC-\d+)$/);
    }
  });
});

describe("a top-layer overlay with empty places has no box to hold (INC-1200)", () => {
  const ROOT = "node_modules/.cache/holds-its-box-kind";
  afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

  /** Plants `files` (name → text) in a fresh folder; answers the folder. */
  function plant(name: string, files: Record<string, string[]>): string {
    const dir = `${ROOT}/${name}`;
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    for (const [file, lines] of Object.entries(files))
      writeFileSync(`${dir}/${file}`, lines.join("\n"));
    return dir;
  }

  const X_DIALOG = [
    'import { Dialog, DialogContent } from "@/components/ui/dialog";',
    "export function XDialog({ open }: { open: boolean }) {",
    "  return (",
    "    <Dialog open={open}>",
    "      <DialogContent>x</DialogContent>",
    "    </Dialog>",
    "  );",
    "}",
  ];
  const Y_SHEET = [
    'import { Sheet as Drawer, SheetContent } from "@/components/ui/sheet";',
    "export const YSheet = ({ open }: { open: boolean }) => {",
    "  const later = () => <p>never the root</p>;",
    "  if (!open) return null;",
    "  return <Drawer open>{later()}<SheetContent /></Drawer>;",
    "};",
  ];
  const X_PANEL = [
    "export function XPanel({ open }: { open: boolean }) {",
    "  return <div>{open}</div>;",
    "}",
  ];

  it("HB-4 an overlay (its component's root a Dialog or Sheet) with empty places passes; the same overlay with a text place is a finding", () => {
    const dir = plant("hb4", {
      "x-dialog.tsx": X_DIALOG,
      "y-sheet.tsx": Y_SHEET,
      "gate.tsx": [
        'import { Suspense, useEffect } from "react";',
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        "function Unreachable({ gone }: { gone: () => void }) {",
        "  useEffect(() => {",
        "    gone();",
        "  }, [gone]);",
        "  return null;",
        "}",
        'const XDialog = resilientLazy(() => import("./x-dialog").then((m) => m.XDialog), "x", Unreachable);',
        'const YSheet = resilientLazy(() => import("./y-sheet").then((module) => module.YSheet), "y", () => null);',
        "export const A = () => (",
        "  <>",
        "    <Suspense fallback={null}>",
        "      <XDialog open />",
        "    </Suspense>",
        "    <Suspense fallback={null}>",
        "      <YSheet open />",
        "    </Suspense>",
        "  </>",
        ");",
      ],
      "text.tsx": [
        'import { Suspense } from "react";',
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        'const XDialog = resilientLazy(() => import("./x-dialog").then((m) => m.XDialog), "x", () => <p>Report</p>);',
        "export const B = () => (",
        "  <Suspense fallback={<p>Loading</p>}>",
        "    <XDialog open />",
        "  </Suspense>",
        ");",
      ],
    });
    try {
      const result = holdsItsBoxCensus([`${dir}/gate.tsx`, `${dir}/text.tsx`]);
      expect(result.overlays).toEqual([`${dir}/gate.tsx#XDialog`, `${dir}/gate.tsx#YSheet`]);
      expect(report(result.findings)).toBe(
        [
          `${dir}/text.tsx#XDialog:3 its place when it cannot download does not hold its box`,
          `${dir}/text.tsx#XDialog:5 its place while it loads does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-5 a part that is not an overlay is still a finding with an empty place, a root in one branch only included", () => {
    const dir = plant("hb5", {
      "x-panel.tsx": X_PANEL,
      "z-mixed.tsx": [
        'import { Dialog } from "@/components/ui/dialog";',
        "export function ZMixed({ open }: { open: boolean }) {",
        "  if (open) return <Dialog open />;",
        "  return <div>closed</div>;",
        "}",
      ],
      "page.tsx": [
        'import { Suspense } from "react";',
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        'const XPanel = resilientLazy(() => import("./x-panel").then((m) => m.XPanel), "x", () => null);',
        'const ZMixed = resilientLazy(() => import("./z-mixed").then((m) => m.ZMixed), "z", () => null);',
        "export const C = () => (",
        "  <Suspense fallback={null}>",
        "    <XPanel open />",
        "    <ZMixed open />",
        "  </Suspense>",
        ");",
      ],
    });
    try {
      const result = holdsItsBoxCensus([`${dir}/page.tsx`]);
      expect(result.overlays).toEqual([]);
      expect(report(result.findings)).toBe(
        [
          `${dir}/page.tsx#XPanel:3 its place when it cannot download does not hold its box`,
          `${dir}/page.tsx#XPanel:6 its place while it loads does not hold its box`,
          `${dir}/page.tsx#ZMixed:4 its place when it cannot download does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-6 an overlay consumed from another file through its exported binding passes; a part consumed the same way is judged by its own kind", () => {
    const dir = plant("hb6", {
      "x-dialog.tsx": X_DIALOG,
      "x-panel.tsx": X_PANEL,
      "lazy.ts": [
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        'export const LazyXDialog = resilientLazy(() => import("./x-dialog").then((m) => m.XDialog), "x", () => null);',
        'const LazyXPanel = resilientLazy(() => import("./x-panel").then((m) => m.XPanel), "p", () => null);',
        "export { LazyXPanel };",
      ],
      "page.tsx": [
        'import { Suspense } from "react";',
        'import { LazyXDialog, LazyXPanel } from "./lazy";',
        "export const D = () => (",
        "  <>",
        "    <Suspense fallback={null}>",
        "      <LazyXDialog open />",
        "    </Suspense>",
        "    <Suspense fallback={null}>",
        "      <LazyXPanel open />",
        "    </Suspense>",
        "  </>",
        ");",
      ],
      "alias.tsx": [
        'import { Suspense } from "react";',
        'import { LazyXDialog as Later } from "./lazy";',
        "export const E = () => (",
        "  <Suspense fallback={null}>",
        "    <Later open />",
        "  </Suspense>",
        ");",
      ],
    });
    try {
      const result = holdsItsBoxCensus([`${dir}/lazy.ts`, `${dir}/page.tsx`, `${dir}/alias.tsx`]);
      expect(result.overlays).toEqual([
        `${dir}/alias.tsx#Later`,
        `${dir}/lazy.ts#LazyXDialog`,
        `${dir}/page.tsx#LazyXDialog`,
      ]);
      expect(report(result.findings)).toBe(
        [
          `${dir}/lazy.ts#LazyXPanel:3 its place when it cannot download does not hold its box`,
          `${dir}/page.tsx#LazyXPanel:8 its place while it loads does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-7 what the census cannot resolve is not an overlay: a default import, a computed import, a re-export, another module's Dialog, a missing file", () => {
    const dir = plant("hb7", {
      "x-dialog.tsx": X_DIALOG,
      "again.ts": ['export { XDialog } from "./x-dialog";'],
      "dialog.tsx": ["export const Dialog = (props: object) => <div {...props} />;"],
      "own-dialog.tsx": [
        'import { Dialog } from "./dialog";',
        "export function OwnDialog() {",
        "  return <Dialog />;",
        "}",
      ],
      "page.tsx": [
        'import { Suspense, lazy } from "react";',
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        'import { Gone } from "./gone";',
        'const ByDefault = lazy(() => import("./x-dialog"));',
        'const where = "./x-dialog";',
        'const Computed = resilientLazy(() => import(where).then((m) => m.XDialog), "c", () => null);',
        'const Again = resilientLazy(() => import("./again").then((m) => m.XDialog), "a", () => null);',
        'const Own = resilientLazy(() => import("./own-dialog").then((m) => m.OwnDialog), "o", () => null);',
        "export const F = () => (",
        "  <>",
        "    <Suspense fallback={null}>",
        "      <ByDefault />",
        "    </Suspense>",
        "    <Suspense fallback={null}>",
        "      <Gone />",
        "    </Suspense>",
        "  </>",
        ");",
      ],
    });
    try {
      const result = holdsItsBoxCensus([`${dir}/page.tsx`]);
      expect(result.overlays).toEqual([]);
      expect(report(result.findings)).toBe(
        [
          `${dir}/page.tsx#Again:7 its place when it cannot download does not hold its box`,
          `${dir}/page.tsx#ByDefault:11 its place while it loads does not hold its box`,
          `${dir}/page.tsx#Computed:6 its place when it cannot download does not hold its box`,
          `${dir}/page.tsx#Gone:14 its place while it loads does not hold its box`,
          `${dir}/page.tsx#Own:8 its place when it cannot download does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-8 L12's two shapes (lovable/report-on-demand): the lazy binding in one file, its Suspense in another, the dialog's root a Dialog — no finding", () => {
    const dir = plant("hb8", {
      "report-ad-dialog.tsx": [
        'import { Button } from "@/components/ui/button";',
        "import {",
        "  Dialog,",
        "  DialogContent,",
        "  DialogHeader,",
        "  DialogTitle,",
        '} from "@/components/ui/dialog";',
        "export function ReportAdDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {",
        "  return (",
        "    <Dialog open={open} onOpenChange={onOpenChange}>",
        "      <DialogContent>",
        "        <DialogHeader>",
        "          <DialogTitle>x</DialogTitle>",
        "        </DialogHeader>",
        "        <Button />",
        "      </DialogContent>",
        "    </Dialog>",
        "  );",
        "}",
      ],
      "report-ad-dialog-lazy.ts": [
        'import { resilientLazy } from "@/lib/resilient-lazy";',
        "",
        "export const LazyReportAdDialog = resilientLazy(",
        '  () => import("./report-ad-dialog").then((module) => module.ReportAdDialog),',
        '  "the report dialog",',
        "  () => null,",
        ");",
      ],
      "report-ad.tsx": [
        'import { Suspense, useState } from "react";',
        'import { LazyReportAdDialog } from "./report-ad-dialog-lazy";',
        "export function ReportAd() {",
        "  const [open, setOpen] = useState(false);",
        "  return (",
        "    <>",
        "      {open ? (",
        "        <Suspense fallback={null}>",
        "          <LazyReportAdDialog open={open} onOpenChange={setOpen} />",
        "        </Suspense>",
        "      ) : null}",
        "    </>",
        "  );",
        "}",
      ],
    });
    try {
      const result = holdsItsBoxCensus([`${dir}/report-ad-dialog-lazy.ts`, `${dir}/report-ad.tsx`]);
      expect(result.findings).toEqual([]);
      expect(result.overlays).toEqual([
        `${dir}/report-ad-dialog-lazy.ts#LazyReportAdDialog`,
        `${dir}/report-ad.tsx#LazyReportAdDialog`,
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
