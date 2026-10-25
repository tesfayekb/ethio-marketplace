import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { visitTs, walkFiles } from "./kit";

/**
 * DEC-258 (Foundations turn 30; DEC-231's admin-layer judge, generalised) —
 * WHICH STRINGS RIDE IN EVERY PAGE'S FIRST DOWNLOAD, AND WHICH IN A LAYER.
 *
 * A key's home follows from the pages that can show it:
 *  - the files that NAME it: every string literal equal to the key, and every
 *    literal or template head ending in "." that the key starts with (a key
 *    built as `post.error.${code}`), in src/ outside src/i18n/locales;
 *  - the PAGES that reach those files: each top-level route file under
 *    src/routes (React pages; the server routes under src/routes/api and the
 *    .ts handlers render no strings) and src/routes/__root.tsx — every page —
 *    walked through value imports, re-exports and import(); type-only imports
 *    are erased and not followed;
 *  - the LAYERS each page loads: the strings its route file declares
 *    (`staticData: { strings: [...] }`) and those of the layout routes above
 *    it (a route file whose name is a prefix of the page's, as written).
 * A key every one of whose pages loads a layer lives in the first such layer
 * of STRINGS_LAYERS; any other key a page shows stays in the base part. A key
 * no page shows (no file names it, or only files no page reaches) has no home
 * of its own: it stays in the file it is in.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
/** DEC-258 — the layers in their order (src/i18n/compiled-catalog.ts STRINGS_LAYERS). */
export const LAYERS = ["admin", "member"] as const;
export type Layer = (typeof LAYERS)[number];
export type Home = "base" | Layer;
const EVERY_PAGE = "__root";
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

/** The catalogue file of a home, per language (src/i18n/locales). */
export function catalogueFile(home: Home, language: "en" | "am"): string {
  return `${language}-${home}.ts`;
}

/** The keys of a catalogue file, in order, from its `"key":` entry lines (none when it is absent). */
export function catalogueKeys(root: string, file: string): string[] {
  const path = join(root, "src", "i18n", "locales", file);
  if (!existsSync(path)) return [];
  const source = readFileSync(path, "utf8");
  return [...source.matchAll(/^\s*"((?:[^"\\]|\\.)+)"\s*:/gm)].map((match) => match[1] as string);
}

function resolveImport(srcRoot: string, spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(srcRoot, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

type Scan = { imports: string[]; exact: string[]; prefixes: string[]; strings: string[] };

/** One file's value imports, its literals, and (for a route file) its declared strings. */
function scan(file: string): Scan {
  const out: Scan = { imports: [], exact: [], prefixes: [], strings: [] };
  const literal = (text: string) => (text.endsWith(".") ? out.prefixes : out.exact).push(text);
  visitTs(file, (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause;
      const typeOnly =
        clause !== undefined &&
        (clause.isTypeOnly ||
          (clause.name === undefined &&
            clause.namedBindings !== undefined &&
            ts.isNamedImports(clause.namedBindings) &&
            clause.namedBindings.elements.length > 0 &&
            clause.namedBindings.elements.every((element) => element.isTypeOnly)));
      if (!typeOnly) out.imports.push(node.moduleSpecifier.text);
      return;
    }
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      if (!node.isTypeOnly) out.imports.push(node.moduleSpecifier.text);
      return;
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      out.imports.push(node.arguments[0].text);
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent)) return;
      literal(node.text);
      return;
    }
    if (ts.isTemplateExpression(node)) {
      literal(node.head.text);
      return;
    }
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText() === "staticData" &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          property.name.getText() === "strings" &&
          ts.isArrayLiteralExpression(property.initializer)
        ) {
          for (const element of property.initializer.elements) {
            if (ts.isStringLiteral(element)) out.strings.push(element.text);
          }
        }
      }
    }
  });
  return out;
}

export type StringsCensus = {
  /** Each page (route file stem, "__root" for every page) → the layers it loads. */
  pages: Map<string, Set<string>>;
  /** Each catalogue key → the files that name it (root-relative). */
  namedBy: Map<string, string[]>;
  /** Each catalogue key → the pages that reach a file naming it. */
  shownOn: Map<string, string[]>;
  /** Each catalogue key → where it belongs; null when no page shows it (it stays put). */
  home: Map<string, Home | null>;
  /** Files scanned. */
  scanned: number;
};

/** The census over a tree (the repository by default). */
export function stringsCensus(root = ROOT): StringsCensus {
  const srcRoot = join(root, "src");
  const routesRoot = join(srcRoot, "routes");
  const generated = join(routesRoot, "routeTree.gen.ts");
  const locales = join(srcRoot, "i18n", "locales");
  const files = walkFiles([srcRoot], { ext: ["ts", "tsx"], skipTests: true }).filter(
    (file) => file !== generated,
  );
  const scans = new Map<string, Scan>(files.map((file) => [file, scan(file)]));

  // Pages: the top-level React route files; each one's declared layers, then its layouts'.
  const pageFiles = files.filter((file) => dirname(file) === routesRoot && file.endsWith(".tsx"));
  const stemOf = (file: string) => basename(file).replace(/\.tsx$/, "");
  const declared = new Map<string, string[]>(
    pageFiles.map((file) => [stemOf(file), scans.get(file)?.strings ?? []]),
  );
  const pages = new Map<string, Set<string>>();
  for (const stem of declared.keys()) {
    const layers = new Set<string>();
    const segments = stem.split(".");
    for (let end = 1; end <= segments.length; end += 1) {
      for (const layer of declared.get(segments.slice(0, end).join(".")) ?? []) layers.add(layer);
    }
    pages.set(stem, layers);
  }

  // Which pages reach each file.
  const reachedBy = new Map<string, Set<string>>();
  for (const pageFile of pageFiles) {
    const page = stemOf(pageFile);
    const queue = [pageFile];
    const seen = new Set<string>();
    while (queue.length > 0) {
      const file = queue.pop() as string;
      if (seen.has(file)) continue;
      seen.add(file);
      const reached = reachedBy.get(file) ?? new Set<string>();
      reached.add(page);
      reachedBy.set(file, reached);
      for (const spec of scans.get(file)?.imports ?? []) {
        const next = resolveImport(srcRoot, spec, file);
        if (next !== null && next !== generated && !seen.has(next)) queue.push(next);
      }
    }
  }

  // Which files name each literal.
  const exact = new Map<string, Set<string>>();
  const prefixes: { prefix: string; file: string }[] = [];
  for (const [file, found] of scans) {
    if (file.startsWith(`${locales}/`)) continue;
    for (const text of found.exact) {
      const naming = exact.get(text) ?? new Set<string>();
      naming.add(file);
      exact.set(text, naming);
    }
    for (const prefix of new Set(found.prefixes)) prefixes.push({ prefix, file });
  }

  const keys = [
    ...catalogueKeys(root, "en-base.ts"),
    ...LAYERS.flatMap((layer) => catalogueKeys(root, catalogueFile(layer, "en"))),
  ];
  const namedBy = new Map<string, string[]>();
  const shownOn = new Map<string, string[]>();
  const home = new Map<string, Home | null>();
  for (const key of keys) {
    const naming = new Set(exact.get(key) ?? []);
    for (const { prefix, file } of prefixes) if (key.startsWith(prefix)) naming.add(file);
    const onPages = new Set<string>();
    for (const file of naming) for (const page of reachedBy.get(file) ?? []) onPages.add(page);
    namedBy.set(key, [...naming].map((file) => relative(root, file).split(sep).join("/")).sort());
    shownOn.set(key, [...onPages].sort());
    let where: Home | null = onPages.size === 0 ? null : "base";
    if (onPages.size > 0 && !onPages.has(EVERY_PAGE)) {
      for (const layer of LAYERS) {
        if ([...onPages].every((page) => pages.get(page)?.has(layer) === true)) {
          where = layer;
          break;
        }
      }
    }
    home.set(key, where);
  }
  return { pages, namedBy, shownOn, home, scanned: files.length };
}

/** Every key that sits in a file other than its home, one line each. */
export function misplaced(census: StringsCensus, root = ROOT): string[] {
  const lines: string[] = [];
  for (const sits of ["base", ...LAYERS] as Home[]) {
    for (const key of catalogueKeys(root, catalogueFile(sits, "en"))) {
      const belongs = census.home.get(key) ?? null;
      if (belongs === null || belongs === sits) continue;
      const pages = census.shownOn.get(key) ?? [];
      lines.push(
        `${key} — in ${catalogueFile(sits, "en")}, belongs in ${catalogueFile(belongs, "en")} (shown on: ${pages.length > 0 ? pages.join(", ") : "no page"})`,
      );
    }
  }
  return lines.sort();
}

// `bun run scripts/conformance/strings-layers.ts --print` — each key and its home, as JSON.
if (process.argv.includes("--print")) {
  const census = stringsCensus();
  console.log(JSON.stringify(Object.fromEntries(census.home), null, 1));
}
