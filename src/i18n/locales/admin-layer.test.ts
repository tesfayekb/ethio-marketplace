import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * DEC-231 (bundle 22 turn 22) — THE ADMIN-LAYER JUDGE.
 *
 * The English and Amharic catalogues are each two files: a base part that
 * rides in every visitor's first paint and an admin part the admin gate
 * loads. This test decides which keys may live in the admin part: an admin.*
 * key moves only when no source file an admin-only page does not own names
 * it. The marketplace weight guard (scripts/check-marketplace-imports.mjs)
 * keeps the joins and the admin parts off the first paint.
 */

const SRC = resolve("src");
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

/** Every .ts/.tsx under src except tests and the generated route tree. */
function listSources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listSources(path));
    else if (
      /\.tsx?$/.test(entry.name) &&
      !/\.test\.tsx?$/.test(entry.name) &&
      path !== join(SRC, "routeTree.gen.ts")
    ) {
      out.push(path);
    }
  }
  return out;
}

function relative(file: string): string {
  return file.replace(`${process.cwd()}/`, "");
}

function isAdminFile(rel: string): boolean {
  return (
    rel === "src/routes/admin.tsx" ||
    /^src\/routes\/admin[._][^/]*\.tsx$/.test(rel) ||
    /^src\/features\/admin[^/]*\//.test(rel)
  );
}

/** The specifier of every `from "…"`, `import("…")` and bare `import "…"`. */
function importSpecifiers(source: string): string[] {
  const specs: string[] = [];
  const patterns = [
    /(?:^|\s)from\s+["']([^"']+)["']/gm,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /^\s*import\s+["']([^"']+)["']/gm,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) specs.push(match[1] as string);
  }
  return specs;
}

function resolveImport(spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** The import closure of every non-admin source file. */
function reachedFromOutside(files: string[]): Set<string> {
  const reached = new Set<string>();
  const queue = files.filter((file) => !isAdminFile(relative(file)));
  while (queue.length > 0) {
    const file = queue.pop() as string;
    if (reached.has(file)) continue;
    reached.add(file);
    let source: string;
    try {
      source = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const spec of importSpecifiers(source)) {
      const local = resolveImport(spec, file);
      // The generated route tree is not a source file: the walk must not
      // follow it, or every admin route (and its features) reads as reached.
      if (local && local !== join(SRC, "routeTree.gen.ts") && !reached.has(local)) {
        queue.push(local);
      }
    }
  }
  return reached;
}

/**
 * The literals a file holds: whole quoted strings, and the static head of
 * template literals (the text before the first ${). A key is named by a file
 * when one of these equals the key, or ends in "." and the key starts with it.
 */
function literalsOf(source: string): { exact: string[]; prefixes: string[] } {
  const exact: string[] = [];
  const prefixes: string[] = [];
  for (const match of source.matchAll(/"([^"\\\n]*)"|'([^'\\\n]*)'|`([^`]*)`/g)) {
    let text = (match[1] ?? match[2] ?? match[3]) as string;
    if (match[3] !== undefined) text = text.split("${")[0] as string;
    if (text.endsWith(".")) prefixes.push(text);
    else exact.push(text);
  }
  return { exact, prefixes };
}

/** The key set of a catalogue file, parsed from its `"key":` entry lines. */
function catalogueKeys(file: string): string[] {
  const source = readFileSync(join(SRC, "i18n/locales", file), "utf8");
  return [...source.matchAll(/^\s*"((?:[^"\\]|\\.)+)"\s*:/gm)].map((match) => match[1] as string);
}

interface Census {
  adminOnly: Set<string>;
  exact: Map<string, string[]>;
  prefixes: { prefix: string; file: string }[];
}

/** The files that may name a key: every source file that is not admin-only, src/i18n/locales excluded. */
function census(): Census {
  const files = listSources(SRC);
  const reached = reachedFromOutside(files);
  const adminOnly = new Set(
    files.filter((file) => isAdminFile(relative(file)) && !reached.has(file)),
  );
  const exact = new Map<string, string[]>();
  const prefixes: { prefix: string; file: string }[] = [];
  for (const file of files) {
    const rel = relative(file);
    if (adminOnly.has(file) || rel.startsWith("src/i18n/locales/")) continue;
    const { exact: literals, prefixes: ends } = literalsOf(readFileSync(file, "utf8"));
    for (const literal of literals) {
      const naming = exact.get(literal) ?? [];
      naming.push(rel);
      exact.set(literal, naming);
    }
    for (const prefix of ends) prefixes.push({ prefix, file: rel });
  }
  return { adminOnly, exact, prefixes };
}

function namingFiles(key: string, c: Census): string[] {
  const files = [...(c.exact.get(key) ?? [])];
  for (const { prefix, file } of c.prefixes) {
    if (key.startsWith(prefix)) files.push(file);
  }
  return files;
}

/** The admin.* keys of the English catalogue that may move, and those that must stay. */
function judge(): { mayMove: string[]; mustStay: Map<string, string[]> } {
  const c = census();
  const mayMove: string[] = [];
  const mustStay = new Map<string, string[]>();
  for (const key of catalogueKeys("en.ts")) {
    if (!key.startsWith("admin.")) continue;
    const files = namingFiles(key, c);
    if (files.length === 0) mayMove.push(key);
    else mustStay.set(key, files);
  }
  return { mayMove, mustStay };
}

describe("the admin strings layer (DEC-231)", () => {
  it("prints the census when ADMIN_LAYER_PRINT=1", () => {
    if (!process.env.ADMIN_LAYER_PRINT) return;
    const { mayMove, mustStay } = judge();
    console.log(`admin.* keys that may move (${mayMove.length}):`);
    for (const key of mayMove) console.log(`  ${key}`);
    console.log(`admin.* keys that must stay (${mustStay.size}):`);
    for (const [key, files] of mustStay) console.log(`  ${key} — named by ${files.join(", ")}`);
  });

  it("names no enAdmin key from a source file that is not admin-only", () => {
    const c = census();
    const violations: string[] = [];
    for (const key of catalogueKeys("en-admin.ts")) {
      const files = namingFiles(key, c);
      for (const file of files) violations.push(`${key} — named by ${file}`);
    }
    expect(violations).toEqual([]);
  });

  it('holds only admin.* keys in enAdmin', () => {
    const misplaced = catalogueKeys("en-admin.ts").filter((key) => !key.startsWith("admin."));
    expect(misplaced).toEqual([]);
  });

  it("keeps the gate's own waiting line in enBase", () => {
    expect(catalogueKeys("en-base.ts")).toContain("admin.loading");
  });

  it("splits en exactly: no shared key, the union is en's key set", () => {
    const base = catalogueKeys("en-base.ts");
    const admin = catalogueKeys("en-admin.ts");
    const shared = base.filter((key) => admin.includes(key));
    expect(shared).toEqual([]);
    expect([...base, ...admin].sort()).toEqual(catalogueKeys("en.ts").sort());
  });

  it("mirrors the split in Amharic", () => {
    expect(catalogueKeys("am-base.ts").sort()).toEqual(catalogueKeys("en-base.ts").sort());
    expect(catalogueKeys("am-admin.ts").sort()).toEqual(catalogueKeys("en-admin.ts").sort());
  });
});
