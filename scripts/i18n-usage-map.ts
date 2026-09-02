#!/usr/bin/env bun
/**
 * U4i ② — BUILD-TIME "USED ON" MAP.
 *
 * Scans `src/` for literal `t("key")` call sites and records WHERE each key is
 * rendered, so a translator can see the surface a string lands on before
 * choosing a wording.
 *
 * U4i-3 (b) — SURFACES ARE PAGES, NOT FILE PATHS. A translator cannot act on
 * "features/admin". Every source file is resolved through the STATIC IMPORT
 * GRAPH back to the route files that reach it, so a key used in a shared
 * feature component reports the ROUTE PATHS it is rendered on
 * (e.g. `/admin/translations`). A file no route reaches (dev-only helpers,
 * modules imported dynamically only) reports `component: <name>` — honest
 * about what the static graph can prove rather than inventing a page.
 *
 * OUTPUTS (both tracked, both machine-generated → prettier-ignored, Knowledge E5):
 *   * docs/generated/i18n-usage.json — the reviewable artifact.
 *   * public/i18n-usage.json         — the byte-identical copy the console
 *     fetches. RULING (law A3, stated up front): the spec asked for "a small
 *     gated RPC-free route/asset". `docs/` is outside every serving root and a
 *     server route cannot read the repo from the Worker bundle, so the SERVED
 *     copy is a static asset under `public/`. One generator writes both in one
 *     pass, so the CI freshness check (`git diff --exit-code`) covers both and
 *     they can never drift.
 *
 * HONESTY (law F4): only LITERAL keys can be attributed. A `t(someVariable)`
 * call is counted into `dynamicCallSites` and the console renders "dynamic"
 * rather than pretending the key is unused.
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, dirname, resolve, basename } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const OUTPUTS = [
  join(ROOT, "docs", "generated", "i18n-usage.json"),
  join(ROOT, "public", "i18n-usage.json"),
];

const LITERAL_T = /\bt\(\s*"([^"\\]+)"/g;
const DYNAMIC_T = /\bt\(\s*[^"')\s]/g;
/** Static and dynamic `import`s plus `export … from`, specifier in group 1|2|3. */
const IMPORT_FROM = /(?:from\s*|import\s*\(\s*)["']([^"']+)["']/g;
const SKIP_DIRS = new Set(["node_modules", "generated"]);
const EXTENSIONS = [".ts", ".tsx"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
      continue;
    }
    if (!EXTENSIONS.some((ext) => entry.endsWith(ext))) continue;
    if (entry.endsWith(".test.ts") || entry.endsWith(".test.tsx")) continue;
    out.push(full);
  }
  return out;
}

/** Resolve a `@/…` or relative specifier to a file inside src/, or null. */
function resolveImport(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith("@/")) base = join(SRC, specifier.slice(2));
  else if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
  else return null; // a package: outside the repo graph.
  const candidates = [
    base,
    ...EXTENSIONS.map((ext) => `${base}${ext}`),
    ...EXTENSIONS.map((ext) => join(base, `index${ext}`)),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/**
 * The URL a route file serves. TanStack's flat routing maps dots to slashes,
 * `_` layout segments vanish from the URL, and `index` is the leaf.
 */
function routePathFor(file: string): string | null {
  const rel = relative(SRC, file).split(sep).join("/");
  if (rel === "routes/__root.tsx") return "(every page)";
  if (!rel.startsWith("routes/")) return null;
  if (rel.startsWith("routes/api/"))
    return `/${rel.slice("routes/".length).replace(/\.tsx?$/, "")}`;
  const name = rel.slice("routes/".length).replace(/\.tsx?$/, "");
  const path = name
    .split(".")
    .filter((segment) => segment !== "index")
    .map((segment) => segment.replace(/_$/, ""))
    .filter((segment) => segment !== "" && !segment.startsWith("_"))
    .join("/");
  return `/${path}`;
}

/** Shared modules answer with the component/module NAME, never a directory. */
function componentNameFor(file: string): string {
  const name = basename(file).replace(/\.tsx?$/, "");
  return `component: ${name === "index" ? basename(dirname(file)) : name}`;
}

/** Routes sort before components; each group alphabetically (chips show routes first). */
function sortSurfaces(surfaces: Iterable<string>): string[] {
  return [...surfaces].sort((a, b) => {
    const aComponent = a.startsWith("component: ") ? 1 : 0;
    const bComponent = b.startsWith("component: ") ? 1 : 0;
    if (aComponent !== bComponent) return aComponent - bComponent;
    return a.localeCompare(b);
  });
}

function main(): void {
  const files = walk(SRC);

  // 1. Import graph: file → the files it statically pulls in.
  const importsOf = new Map<string, string[]>();
  const textOf = new Map<string, string>();
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    textOf.set(file, text);
    const targets: string[] = [];
    for (const match of text.matchAll(IMPORT_FROM)) {
      const specifier = match[1];
      if (specifier === undefined) continue;
      const resolved = resolveImport(file, specifier);
      if (resolved !== null) targets.push(resolved);
    }
    importsOf.set(file, targets);
  }

  // 2. Reachability: every file gets the set of route paths that reach it.
  const routesReaching = new Map<string, Set<string>>();
  for (const file of files) {
    const routePath = routePathFor(file);
    if (routePath === null) continue;
    const seen = new Set<string>([file]);
    const queue = [file];
    while (queue.length > 0) {
      const current = queue.shift() as string;
      const set = routesReaching.get(current) ?? new Set<string>();
      set.add(routePath);
      routesReaching.set(current, set);
      for (const next of importsOf.get(current) ?? []) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push(next);
      }
    }
  }

  // 3. Keys → surfaces.
  const byKey = new Map<string, Set<string>>();
  let dynamicCallSites = 0;
  for (const file of files) {
    const text = textOf.get(file) ?? "";
    const reached = routesReaching.get(file);
    const surfaces = reached && reached.size > 0 ? [...reached] : [componentNameFor(file)];
    for (const match of text.matchAll(LITERAL_T)) {
      const key = match[1];
      if (key === undefined || !key.includes(".")) continue;
      const set = byKey.get(key) ?? new Set<string>();
      for (const surface of surfaces) set.add(surface);
      byKey.set(key, set);
    }
    dynamicCallSites += [...text.matchAll(DYNAMIC_T)].length;
  }

  const keys: Record<string, string[]> = {};
  for (const key of [...byKey.keys()].sort()) {
    keys[key] = sortSurfaces(byKey.get(key) ?? []);
  }

  const payload = {
    // No timestamp: a generated artifact must be a pure function of the source,
    // or the freshness check would fail on every run.
    generator: "scripts/i18n-usage-map.ts",
    scanned: files.length,
    dynamicCallSites,
    keys,
  };
  const json = `${JSON.stringify(payload, null, 2)}\n`;

  for (const output of OUTPUTS) {
    mkdirSync(join(output, ".."), { recursive: true });
    writeFileSync(output, json, "utf8");
  }

  console.log(
    `i18n usage map: ${Object.keys(keys).length} keys across ${files.length} files ` +
      `(${dynamicCallSites} dynamic call sites)`,
  );
}

main();
