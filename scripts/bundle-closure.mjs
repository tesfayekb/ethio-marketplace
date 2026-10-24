/**
 * INC-556 (DEC-176, bundle 11 turn C8) — what the browser loads before paint,
 * measured as the entry chunk's STATIC IMPORT CLOSURE.
 *
 * The build emits no HTML (the pages are rendered on the server), so the budget
 * guard used to count the chunks whose file NAME starts with client, entry,
 * index, main or styles. That read 173 KiB where the entry's closure was
 * 307 KiB, and it jumped by 57 KiB when the bundler happened to name the shared
 * Supabase chunk "client-…". Here the entry is followed through every static
 * `import … from "./x.js"` / `import "./x.js"` (each chunk the browser must
 * fetch before the entry can run); a dynamic `import("./x.js")` is loaded on
 * demand and is left out. Used by scripts/check-bundle-size.mjs; tested by
 * scripts/bundle-closure.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// `import "./x.js"`, `import { a } from "./x.js"` and `export … from "./x.js"`;
// a dynamic `import("./x.js")` has a parenthesis before its quote and never matches.
const STATIC = /(?:\bfrom\s*|\bimport\s*)["'](\.\/[^"']+\.js)["']/g;

/** The chunk files one chunk imports statically (names in the same folder). */
export function staticImportsOf(source) {
  return [...new Set([...source.matchAll(STATIC)].map((m) => m[1].slice(2)))];
}

/** Every chunk reached from `entries` through static imports, entries included. */
export function staticClosure(dir, entries) {
  const seen = new Set();
  const stack = [...entries];
  while (stack.length > 0) {
    const name = stack.pop();
    if (seen.has(name)) continue;
    const path = join(dir, name);
    if (!existsSync(path)) throw new Error(`bundle closure: ${name} is imported but not in ${dir}`);
    seen.add(name);
    for (const next of staticImportsOf(readFileSync(path, "utf8"))) stack.push(next);
  }
  return [...seen].sort();
}

/** The client entry chunks: the JS files named entry-, index- or main- (never a shared chunk). */
export function entryChunks(names) {
  return names.filter((n) => /^(entry|index|main)[.-][^/]*\.js$/.test(n));
}

/**
 * INC-864 (Foundations turn 1) — chunks that must NEVER reach the first paint,
 * by file-name prefix. A page-only module that drifts into the entry's static
 * closure fails the budget guard with its name, whatever the total weight.
 */
export const MUST_STAY_LAZY = ["reader-failure", "legal-page-data", "zod", "posting-service"];

/** The first closure chunk name that must stay lazy, or null. */
export function mustStayLazyViolation(closureNames) {
  return (
    closureNames.find((name) => MUST_STAY_LAZY.some((prefix) => name.startsWith(prefix))) ?? null
  );
}
