import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
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
 */

type Finding = { file: string; line: number; what: string };

/** The components whose rendering holds a late part's box. */
export const RESERVERS = ["MapFrame"] as const;

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

export function holdsItsBoxCensus(files: string[]): { consumers: string[]; findings: Finding[] } {
  const consumers = new Set<string>();
  const findings: Finding[] = [];
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
        if (node.expression.text === "resilientLazy" && !holds(node.arguments[2], source))
          findings.push({
            file: key,
            line: line(),
            what: "its place when it cannot download does not hold its box",
          });
        return;
      }
      if (ts.isJsxElement(node) && node.openingElement.tagName.getText(source) === "Suspense") {
        const key = `${file}#${firstChildTag(node, source)}`;
        consumers.add(key);
        const fallback = node.openingElement.attributes.properties.find(
          (property): property is ts.JsxAttribute =>
            ts.isJsxAttribute(property) && property.name.getText(source) === "fallback",
        );
        const value =
          fallback?.initializer !== undefined && ts.isJsxExpression(fallback.initializer)
            ? fallback.initializer.expression
            : undefined;
        if (!holds(value, source))
          findings.push({
            file: key,
            line: line(),
            what: "its place while it loads does not hold its box",
          });
      }
    });
  }
  return { consumers: [...consumers].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/holds-its-box-allowlist.txt";
const BROWSER = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).filter(
  (file) => !/(?:^|\/)(?:test|server)\//.test(file) && !file.endsWith(".d.ts"),
);
const { consumers, findings } = holdsItsBoxCensus(BROWSER);
const allowances = readAllowlist(ALLOWLIST, consumers);

describe("a part fetched after the first paint holds its box (INC-940)", () => {
  it(
    "HB-1 every lazy part's places hold its box through a reserver, or the part has a live allowance",
    () => {
      console.log(
        `[HB-1] late parts: ${consumers.length}; outside the mechanism: ${new Set(findings.map((hit) => hit.file)).size}; allowlist: ${allowances.size}`,
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

  it("HB-3 every reserver exists, and the allowlist's lines are live, reasoned and dated", () => {
    const frame = readFileSync("src/features/posting/map/map-frame.tsx", "utf8");
    for (const name of RESERVERS) expect(frame).toMatch(new RegExp(`export function ${name}\\(`));
    for (const allowance of allowances.values()) {
      expect(allowance.reason.length).toBeGreaterThan(20);
      expect(allowance.until).toMatch(/^(?:\d{4}-\d{2}-\d{2}|INC-\d+|DEC-\d+)$/);
    }
  });
});
