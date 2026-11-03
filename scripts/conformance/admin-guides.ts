import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { ADMIN_SECTIONS } from "../../src/features/admin/sections";
import { walkFiles } from "./kit";
import { catalogueKeys } from "./strings-layers";

/**
 * P-1c (D313) — CF-GUIDE-1: EVERY ADMIN BLOCK EXPLAINS ITSELF.
 *
 * The mechanism is DataTable's `guide` prop (src/components/shell/block-guide.tsx): a block names
 * its key prefix and its next step, and the Guide sheet reads `<prefix>.guide.what`,
 * `<prefix>.guide.col.<columnKey>` for each visible column, `<prefix>.guide.how` and
 * `<prefix>.guide.next` from the `guide` strings layer (src/i18n/locales/en-guide.ts). The census,
 * over every admin feature file that draws a `<DataTable` (src/features/admin*, tests excepted):
 *
 *  - `no guide`: a `<DataTable` without a `guide=` prop (the only finding an allowance may cover:
 *    `file | reason | until` in admin-guides-allowlist.txt);
 *  - `shape`: a `guide` whose `prefix` is not a string literal (or a conditional of literals), or
 *    whose `next` is not `{ section: "<an ADMIN_SECTIONS id>", block? }` — the next step is a
 *    typed prop resolved through sections.ts, never a translation key or a path;
 *  - `key`: a column key that is not a string literal (the census cannot name its guide line);
 *  - `missing`: a guide key the block needs that en-guide.ts does not hold;
 *  - `astray`: a `.guide.` key in any catalogue file but en-guide.ts (the sheet's own part names,
 *    `prim.guide.*`, are the shell's and sit in the member layer);
 *  - `unclaimed`: a key in en-guide.ts no block needs.
 *
 * The block's columns are the file's column objects — every object literal with a string `key`
 * and a `cell` — plus those a spread's callee returns, when the callee is a function of this file
 * or of a relatively imported one (`...attributionColumns(...)`). A file's keys count for every
 * guided table in it. Amharic mirrors English file by file under CF-SL-2.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];
const SECTION_IDS = new Set<string>(ADMIN_SECTIONS.map((section) => section.id));

export type GuideKind = "no guide" | "shape" | "key" | "missing" | "astray" | "unclaimed";
export type GuideFinding = { file: string; line: number; kind: GuideKind; what: string };

export type GuidedTable = { file: string; line: number; prefixes: string[]; columns: string[] };

export type GuideCensus = {
  /** Every admin table that carries a Guide. */
  tables: GuidedTable[];
  /** Every admin table (guided or not), as root-relative files. */
  files: string[];
  findings: GuideFinding[];
};

function sourceOf(file: string): ts.SourceFile {
  return ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function resolveRelative(spec: string, fromFile: string): string | null {
  if (!spec.startsWith(".")) return null;
  const base = resolve(dirname(fromFile), spec);
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function propertyNamed(object: ts.ObjectLiteralExpression, name: string): ts.Expression | null {
  for (const property of object.properties) {
    if (ts.isPropertyAssignment(property) && property.name.getText() === name)
      return property.initializer;
    if (ts.isShorthandPropertyAssignment(property) && property.name.text === name)
      return property.name;
  }
  return null;
}

function hasProperty(object: ts.ObjectLiteralExpression, name: string): boolean {
  return object.properties.some(
    (property) =>
      (ts.isPropertyAssignment(property) ||
        ts.isShorthandPropertyAssignment(property) ||
        ts.isMethodDeclaration(property)) &&
      property.name !== undefined &&
      property.name.getText() === name,
  );
}

/** The string literals an expression can be: a literal, or a conditional of such. */
function literalsOf(expression: ts.Expression): string[] | null {
  const bare = ts.isParenthesizedExpression(expression) ? expression.expression : expression;
  if (ts.isStringLiteral(bare) || ts.isNoSubstitutionTemplateLiteral(bare)) return [bare.text];
  if (ts.isConditionalExpression(bare)) {
    const yes = literalsOf(bare.whenTrue);
    const no = literalsOf(bare.whenFalse);
    return yes !== null && no !== null ? [...yes, ...no] : null;
  }
  return null;
}

type ColumnScan = { keys: string[]; loose: { line: number }[]; spreads: string[] };

/** The column objects (string `key` + `cell`) of a source, and the callees its spreads name. */
function scanColumns(source: ts.SourceFile): ColumnScan {
  const out: ColumnScan = { keys: [], loose: [], spreads: [] };
  const walk = (node: ts.Node) => {
    if (
      ts.isObjectLiteralExpression(node) &&
      hasProperty(node, "key") &&
      hasProperty(node, "cell")
    ) {
      const key = propertyNamed(node, "key");
      const keys = key === null ? null : literalsOf(key);
      if (keys === null) {
        out.loose.push({
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        });
      } else out.keys.push(...keys);
    }
    if (ts.isSpreadElement(node) && ts.isCallExpression(node.expression)) {
      const callee = node.expression.expression;
      if (ts.isIdentifier(callee)) out.spreads.push(callee.text);
    }
    ts.forEachChild(node, walk);
  };
  walk(source);
  return out;
}

/** Whether `source` declares a function named `name` (a declaration or a const arrow). */
function declaresFunction(source: ts.SourceFile, name: string): boolean {
  let found = false;
  const walk = (node: ts.Node) => {
    if (found) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) found = true;
    else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    )
      found = true;
    ts.forEachChild(node, walk);
  };
  walk(source);
  return found;
}

/** The relatively imported module that names `name` among its imports, resolved. */
function importedFrom(source: ts.SourceFile, name: string): string | null {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    if (bindings.elements.some((element) => element.name.text === name))
      return resolveRelative(statement.moduleSpecifier.text, source.fileName);
  }
  return null;
}

/** A file's column keys: its own, plus those of every spread callee it declares or imports relatively. */
export function columnKeysOf(
  file: string,
  seen = new Set<string>(),
): { keys: string[]; loose: { file: string; line: number }[] } {
  if (seen.has(file)) return { keys: [], loose: [] };
  seen.add(file);
  const source = sourceOf(file);
  const scan = scanColumns(source);
  const keys = [...scan.keys];
  const loose = scan.loose.map((hit) => ({ file, line: hit.line }));
  for (const callee of new Set(scan.spreads)) {
    const home = declaresFunction(source, callee) ? null : importedFrom(source, callee);
    if (home === null || home === file) continue;
    const inner = columnKeysOf(home, seen);
    keys.push(...inner.keys);
    loose.push(...inner.loose);
  }
  return { keys, loose };
}

type GuideProp = { prefixes: string[]; shapeErrors: string[] };

/** The `guide` prop's shape: literal prefix(es), a literal next.section among the sections, a literal block. */
function readGuide(value: ts.Expression): GuideProp {
  const errors: string[] = [];
  const bare = ts.isParenthesizedExpression(value) ? value.expression : value;
  if (!ts.isObjectLiteralExpression(bare)) {
    return { prefixes: [], shapeErrors: ["guide is not an object literal"] };
  }
  const prefix = propertyNamed(bare, "prefix");
  const prefixes = prefix === null ? null : literalsOf(prefix);
  if (prefixes === null) errors.push("guide.prefix is not a string literal");
  const next = propertyNamed(bare, "next");
  if (next === null || !ts.isObjectLiteralExpression(next)) {
    errors.push("guide.next is not an object literal { section, block? }");
  } else {
    const section = propertyNamed(next, "section");
    const sections = section === null ? null : literalsOf(section);
    if (sections === null) errors.push("guide.next.section is not a string literal");
    else {
      for (const id of sections) {
        if (!SECTION_IDS.has(id)) errors.push(`guide.next.section "${id}" is not an admin section`);
      }
    }
    // `block` is a frame id the page composes (a constant, a helper's answer): the
    // type holds it to a string; the census judges the section only.
  }
  return { prefixes: prefixes ?? [], shapeErrors: errors };
}

/** The guide keys a block needs, from its prefix and its column keys. */
export function neededKeys(prefix: string, columns: readonly string[]): string[] {
  return [
    `${prefix}.guide.what`,
    ...columns.map((key) => `${prefix}.guide.col.${key}`),
    `${prefix}.guide.how`,
    `${prefix}.guide.next`,
  ];
}

export const CATALOGUE_FILES_OUTSIDE_GUIDE = ["en-base.ts", "en-admin.ts", "en-member.ts"];
/** The sheet's own part names (`prim.guide.open`, `.what`, `.columns`, `.how`, `.next`): the shell's, not a block's. */
export const SHELL_GUIDE_PREFIX = "prim.guide.";

export function guideCensus(root = ROOT): GuideCensus {
  const featureRoot = join(root, "src", "features");
  const files = walkFiles([featureRoot], {
    ext: ["tsx"],
    skipTests: true,
    skip: /\/(?:test|__tests__)\//,
  }).filter((file) => relative(featureRoot, file).startsWith("admin"));
  const rel = (file: string) => relative(root, file).split("\\").join("/");
  const guideKeys = new Set(catalogueKeys(root, "en-guide.ts"));
  const tables: GuidedTable[] = [];
  const tableFiles: string[] = [];
  const findings: GuideFinding[] = [];
  const claimed = new Set<string>();

  for (const file of files) {
    const source = sourceOf(file);
    const dataTables: (ts.JsxOpeningElement | ts.JsxSelfClosingElement)[] = [];
    const walk = (node: ts.Node) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getText(source) === "DataTable"
      )
        dataTables.push(node);
      ts.forEachChild(node, walk);
    };
    walk(source);
    if (dataTables.length === 0) continue;
    tableFiles.push(rel(file));
    let columns: { keys: string[]; loose: { file: string; line: number }[] } | null = null;
    for (const table of dataTables) {
      const line = source.getLineAndCharacterOfPosition(table.getStart(source)).line + 1;
      const guide = table.attributes.properties.find(
        (property): property is ts.JsxAttribute =>
          ts.isJsxAttribute(property) && property.name.getText(source) === "guide",
      );
      const value =
        guide?.initializer !== undefined && ts.isJsxExpression(guide.initializer)
          ? guide.initializer.expression
          : undefined;
      if (value === undefined) {
        findings.push({
          file: rel(file),
          line,
          kind: "no guide",
          what: "a DataTable without its Guide (guide= on the DataTable)",
        });
        continue;
      }
      const read = readGuide(value);
      for (const error of read.shapeErrors)
        findings.push({ file: rel(file), line, kind: "shape", what: error });
      if (read.prefixes.length === 0) continue;
      columns ??= columnKeysOf(file);
      for (const hit of columns.loose) {
        findings.push({
          file: rel(hit.file),
          line: hit.line,
          kind: "key",
          what: "a column whose key is not a string literal (its guide line cannot be named)",
        });
      }
      const keys = [...new Set(columns.keys)];
      tables.push({ file: rel(file), line, prefixes: read.prefixes, columns: keys });
      for (const prefix of read.prefixes) {
        for (const key of neededKeys(prefix, keys)) {
          claimed.add(key);
          if (!guideKeys.has(key)) {
            findings.push({
              file: rel(file),
              line,
              kind: "missing",
              what: `en-guide.ts lacks "${key}"`,
            });
          }
        }
      }
    }
  }

  for (const catalogue of CATALOGUE_FILES_OUTSIDE_GUIDE) {
    catalogueKeys(root, catalogue).forEach((key, index) => {
      if (key.includes(".guide.") && !key.startsWith(SHELL_GUIDE_PREFIX)) {
        findings.push({
          file: `src/i18n/locales/${catalogue}`,
          line: index + 1,
          kind: "astray",
          what: `"${key}" is a guide key outside the guide layer`,
        });
      }
    });
  }
  [...guideKeys].forEach((key) => {
    if (!claimed.has(key)) {
      findings.push({
        file: "src/i18n/locales/en-guide.ts",
        line: 0,
        kind: "unclaimed",
        what: `"${key}" is needed by no admin block`,
      });
    }
  });

  return { tables, files: tableFiles, findings };
}

// `bun run scripts/conformance/admin-guides.ts --print-guides` — the guided tables and the findings.
if (process.argv.includes("--print-guides")) {
  const census = guideCensus();
  console.log(JSON.stringify(census, null, 1));
}
