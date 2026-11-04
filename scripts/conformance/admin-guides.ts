import { existsSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import {
  attributeOf,
  elementsNamed,
  hasProperty,
  importedFrom,
  literalsOf,
  propertyNamed,
  reachableFrom,
  readGuide,
  readParts,
  sourceOf,
} from "./admin-guides-read";
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
 *
 * P-1c turn (b) (D315) — EVERY PAGE PEOPLE USE EXPLAINS ITSELF. A second census, over the
 * route files (src/routes/*.tsx) minus the structural exclusions written in ROUTES_WITHOUT_GUIDE
 * with their reasons: each remaining route reaches, through its value imports, at least one
 * Guide — a `<PageGuide spec= parts=` (src/components/shell/page-guide.tsx) or a
 * `<DataTable guide=` — else `no guide` (allowable like a table's). A page Guide's `spec` is an
 * object literal, or a constant of its file or of a relatively imported one; its `parts` an
 * array literal of `{ key: "<literal>" }`, likewise; its lines are
 * `<partsPrefix ?? prefix>.guide.part.<key>`. A `next` is `{ section }` (an admin section) or
 * `{ to: "<a route path of this tree>" }` — never a path the tree does not know.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export type GuideKind = "no guide" | "shape" | "key" | "missing" | "astray" | "unclaimed";
export type GuideFinding = { file: string; line: number; kind: GuideKind; what: string };

export type GuidedTable = { file: string; line: number; prefixes: string[]; columns: string[] };
/** A page's Guide: where it is drawn, its prefix, the prefix of its part lines, its parts. */
export type GuidedPage = {
  file: string;
  line: number;
  prefix: string;
  partsPrefix: string;
  parts: string[];
};

export type GuideCensus = {
  /** Every admin table that carries a Guide. */
  tables: GuidedTable[];
  /** Every admin table (guided or not), as root-relative files. */
  files: string[];
  /** Every page Guide (`<PageGuide`) a covered route reaches. */
  pages: GuidedPage[];
  /** Every covered route (stem → root-relative file). */
  routes: string[];
  findings: GuideFinding[];
};

/**
 * D315 — the routes that carry no Guide, each with its reason (the census covers every other
 * page route). A screen is excluded for its shape, never for want of a text.
 */
export const ROUTES_WITHOUT_GUIDE: readonly { stem: RegExp; reason: string }[] = [
  { stem: /^admin(?:\.|$)/, reason: "admin screens: each block's table carries its own Guide" },
  { stem: /^dev\./, reason: "developer screens, not pages people use" },
  { stem: /^auth_\.callback$/, reason: "a transit screen: it only finishes a sign-in" },
  { stem: /^auth_\.reset$/, reason: "one field and one button" },
  { stem: /^account_\.legal(?:_|$)/, reason: "legal texts drawn by LegalText, not a page to work" },
  { stem: /^legal\./, reason: "legal texts drawn by LegalText, not a page to work" },
  { stem: /^(?:privacy|terms)$/, reason: "legal texts drawn by LegalText, not a page to work" },
];

/** The route path a route file's stem names (`index` → `/`, `account_.saved` → `/account/saved`). */
export function routePathOf(stem: string): string {
  if (stem === "index") return "/";
  return `/${stem.split(/_?\./).join("/")}`;
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
/** The guide keys a block needs, from its prefix and its column keys. */
export function neededKeys(prefix: string, columns: readonly string[]): string[] {
  return [
    `${prefix}.guide.what`,
    ...columns.map((key) => `${prefix}.guide.col.${key}`),
    `${prefix}.guide.how`,
    `${prefix}.guide.next`,
  ];
}

/** The guide keys a page needs: its what / how / next, and one part line per part. */
export function neededPageKeys(
  prefix: string,
  partsPrefix: string,
  parts: readonly string[],
): string[] {
  return [
    `${prefix}.guide.what`,
    ...parts.map((key) => `${partsPrefix}.guide.part.${key}`),
    `${prefix}.guide.how`,
    `${prefix}.guide.next`,
  ];
}

export const CATALOGUE_FILES_OUTSIDE_GUIDE = ["en-base.ts", "en-admin.ts", "en-member.ts"];
/** The sheet's own words (`prim.guide.open`, `.what`, `.columns`, `.parts`, `.how`, `.next`): the shell's, not a block's. */
export const SHELL_GUIDE_PREFIX = "prim.guide.";
type Claim = (file: string, line: number, keys: string[]) => void;

/**
 * One file's guided tables: every `<DataTable` with a `guide=` is read and its keys claimed;
 * `bare` is told of each `<DataTable` without one (the admin census makes that a finding).
 */
function readTables(
  root: string,
  file: string,
  routePaths: ReadonlySet<string>,
  findings: GuideFinding[],
  claim: Claim,
  bare: (line: number) => void,
): GuidedTable[] {
  const rel = relative(root, file).split("\\").join("/");
  const source = sourceOf(file);
  const tables: GuidedTable[] = [];
  let columns: { keys: string[]; loose: { file: string; line: number }[] } | null = null;
  for (const table of elementsNamed(source, "DataTable")) {
    const line = source.getLineAndCharacterOfPosition(table.getStart(source)).line + 1;
    const value = attributeOf(table, "guide", source);
    if (value === undefined) {
      bare(line);
      continue;
    }
    const read = readGuide(source, value, routePaths);
    for (const error of read.shapeErrors)
      findings.push({ file: rel, line, kind: "shape", what: error });
    if (read.specs.length === 0) continue;
    columns ??= columnKeysOf(file);
    for (const hit of columns.loose) {
      findings.push({
        file: relative(root, hit.file).split("\\").join("/"),
        line: hit.line,
        kind: "key",
        what: "a column whose key is not a string literal (its guide line cannot be named)",
      });
    }
    const keys = [...new Set(columns.keys)];
    const prefixes = read.specs.map((spec) => spec.prefix);
    tables.push({ file: rel, line, prefixes, columns: keys });
    for (const prefix of prefixes) claim(rel, line, neededKeys(prefix, keys));
  }
  return tables;
}

/** One file's page Guides (`<PageGuide spec= parts=`): each read and its keys claimed. */
function readPageGuides(
  root: string,
  file: string,
  routePaths: ReadonlySet<string>,
  findings: GuideFinding[],
  claim: Claim,
): GuidedPage[] {
  const rel = relative(root, file).split("\\").join("/");
  const source = sourceOf(file);
  const pages: GuidedPage[] = [];
  for (const element of elementsNamed(source, "PageGuide")) {
    const line = source.getLineAndCharacterOfPosition(element.getStart(source)).line + 1;
    const spec = attributeOf(element, "spec", source);
    if (spec === undefined) {
      findings.push({ file: rel, line, kind: "shape", what: "a PageGuide without its spec=" });
      continue;
    }
    const read = readGuide(source, spec, routePaths);
    for (const error of read.shapeErrors)
      findings.push({ file: rel, line, kind: "shape", what: error });
    const partsValue = attributeOf(element, "parts", source);
    const parts = partsValue === undefined ? null : readParts(source, partsValue);
    if (parts === null) {
      findings.push({
        file: rel,
        line,
        kind: "key",
        what: 'a PageGuide whose parts are not an array literal of { key: "<literal>" } (inline or a constant)',
      });
    }
    if (parts === null) continue;
    for (const spec of read.specs) {
      const partsPrefix = spec.partsPrefix ?? spec.prefix;
      pages.push({ file: rel, line, prefix: spec.prefix, partsPrefix, parts });
      claim(rel, line, neededPageKeys(spec.prefix, partsPrefix, parts));
    }
  }
  return pages;
}

export function guideCensus(root = ROOT): GuideCensus {
  const featureRoot = join(root, "src", "features");
  const routesRoot = join(root, "src", "routes");
  const rel = (file: string) => relative(root, file).split("\\").join("/");
  const guideKeys = new Set(catalogueKeys(root, "en-guide.ts"));
  const findings: GuideFinding[] = [];
  const claimed = new Set<string>();
  // A key is claimed by every Guide that needs it, and reported missing once.
  const claim: Claim = (file, line, keys) => {
    for (const key of keys) {
      if (claimed.has(key)) continue;
      claimed.add(key);
      if (!guideKeys.has(key))
        findings.push({ file, line, kind: "missing", what: `en-guide.ts lacks "${key}"` });
    }
  };

  // The routes: every page route file, less the exclusions; their paths are the `to` register.
  const routeFiles = existsSync(routesRoot)
    ? walkFiles([routesRoot], { ext: ["tsx"], skipTests: true }).filter(
        (file) => dirname(file) === routesRoot && !basename(file).startsWith("__"),
      )
    : [];
  const stemOf = (file: string) => basename(file).replace(/\.tsx$/, "");
  const routePaths = new Set(routeFiles.map((file) => routePathOf(stemOf(file))));
  const covered = routeFiles.filter(
    (file) => !ROUTES_WITHOUT_GUIDE.some((exclusion) => exclusion.stem.test(stemOf(file))),
  );

  // The admin tables: every one carries a Guide, or is a `no guide` finding.
  const adminFiles = existsSync(featureRoot)
    ? walkFiles([featureRoot], {
        ext: ["tsx"],
        skipTests: true,
        skip: /\/(?:test|__tests__)\//,
      }).filter((file) => relative(featureRoot, file).startsWith("admin"))
    : [];
  const tables: GuidedTable[] = [];
  const tableFiles: string[] = [];
  for (const file of adminFiles) {
    let any = false;
    const found = readTables(root, file, routePaths, findings, claim, (line) => {
      any = true;
      findings.push({
        file: rel(file),
        line,
        kind: "no guide",
        what: "a DataTable without its Guide (guide= on the DataTable)",
      });
    });
    if (found.length > 0 || any) tableFiles.push(rel(file));
    tables.push(...found);
  }

  // The pages: every covered route reaches a Guide, or is a `no guide` finding.
  const pages: GuidedPage[] = [];
  const readFiles = new Set<string>(adminFiles);
  for (const routeFile of covered) {
    let guided = 0;
    for (const file of reachableFrom(root, routeFile)) {
      const isAdmin = readFiles.has(file);
      if (!isAdmin) {
        readFiles.add(file);
        const found = readTables(root, file, routePaths, findings, claim, () => undefined);
        tables.push(...found);
        pages.push(...readPageGuides(root, file, routePaths, findings, claim));
      }
      guided += tables.filter((table) => table.file === rel(file)).length;
      guided += pages.filter((page) => page.file === rel(file)).length;
    }
    if (guided === 0) {
      findings.push({
        file: rel(routeFile),
        line: 1,
        kind: "no guide",
        what: "a page route that reaches no Guide (a PageGuide, or guide= on its DataTable)",
      });
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
        what: `"${key}" is needed by no block or page`,
      });
    }
  });

  return { tables, files: tableFiles, pages, routes: covered.map(rel), findings };
}

// `bun run scripts/conformance/admin-guides.ts --print-guides` — the guided tables and the findings.
if (process.argv.includes("--print-guides")) {
  const census = guideCensus();
  console.log(JSON.stringify(census, null, 1));
}
