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
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

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
export const MUST_STAY_LAZY = [
  "reader-failure",
  "legal-page-data",
  "zod",
  "posting-service",
  // Foundations turn 31 (DEC-259) — the tooltip's and the menu's code arrives on demand.
  "overlays-impl",
];

/**
 * DEC-261 (Foundations turn 34) — WHAT NO FIRST DOWNLOAD MAY CARRY, found by its text:
 * the bundler names a shared chunk after any module grouped into it, so a name prefix
 * cannot find the Supabase client; its auth class's name survives minification.
 */
export const MUST_NOT_CARRY = ["GoTrueClient"];

/** The first chunk of `closureNames` whose text (`textOf(name)`) carries a marker, or null. */
export function carriedViolation(closureNames, textOf, markers = MUST_NOT_CARRY) {
  for (const name of closureNames) {
    const text = textOf(name);
    const marker = markers.find((candidate) => text.includes(candidate));
    if (marker !== undefined) return { name, marker };
  }
  return null;
}

/** The first closure chunk name that must stay lazy, or null. */
export function mustStayLazyViolation(closureNames) {
  return (
    closureNames.find((name) => MUST_STAY_LAZY.some((prefix) => name.startsWith(prefix))) ?? null
  );
}

/**
 * D234 speed turn S1 — WHAT A PAGE DOWNLOADS BEFORE IT CAN RUN. The entry's
 * closure is only the shell; a page also needs its route's chunks, which the
 * server render names as modulepreload links. TanStack Start writes them to the
 * build's route manifest (dist/server/_tanstack-start-manifest_v-*.mjs, a
 * module with no imports that exports `tsrStartManifest()`): each route lists
 * its own `preloads` and its parent in `children`. A route's first download is
 * the static closure of its chain's preloads; the entry is the root's.
 */
export async function readRouteManifest(serverDir) {
  const name = existsSync(serverDir)
    ? readdirSync(serverDir).find((file) => /^_tanstack-start-manifest.*\.mjs$/.test(file))
    : undefined;
  if (name === undefined) {
    throw new Error(`route manifest: no _tanstack-start-manifest*.mjs in ${serverDir}`);
  }
  const module = await import(pathToFileURL(resolve(serverDir, name)).href);
  const routes = module.tsrStartManifest?.().routes;
  if (routes === undefined || routes === null || typeof routes !== "object") {
    throw new Error(`route manifest: ${name} exports no routes`);
  }
  return routes;
}

/**
 * The chunk file names a route preloads: its own and every ancestor's, root included.
 * Route ids come from a build file, so the manifest is read as its own entries only
 * (a Map; the own-key rule — never `routes[id]`), and a cycle cannot loop.
 */
export function routePreloads(routes, routeId) {
  const table = new Map(Object.entries(routes));
  if (!table.has(routeId)) throw new Error(`route manifest: no route ${routeId}`);
  const parent = new Map();
  for (const [id, route] of table) {
    for (const child of route.children ?? []) parent.set(child, id);
  }
  const names = new Set();
  const seen = new Set();
  for (let id = routeId; id !== undefined && !seen.has(id); id = parent.get(id)) {
    seen.add(id);
    for (const path of table.get(id)?.preloads ?? []) names.add(path.split("/").pop());
  }
  return [...names].sort();
}

/**
 * D234 S1 — chunks that must never reach a PUBLIC page's first download (a page a
 * visitor opens signed out: home, category, ad, seller, sign-in, legal). The
 * posting doors, the schema library, the calendar, the category glyph map and the
 * map library load only where their feature is used; the strings layers (DEC-258)
 * load only where a route declares them.
 */
export const PUBLIC_MUST_STAY_LAZY = [
  "posting-service",
  "zod",
  "category-glyphs",
  "date-calendar",
  "leaflet",
  "en-member",
  "am-member",
  "en-admin",
  "am-admin",
  "overlays-impl",
];

/** The first chunk name in a closure that starts with one of `prefixes`, or null. */
export function firstLazyViolation(closureNames, prefixes) {
  return closureNames.find((name) => prefixes.some((prefix) => name.startsWith(prefix))) ?? null;
}

/** The routes that are pages: every manifest route but the root and the server routes under /api/. */
export function pageRouteIds(routes) {
  return Object.keys(routes)
    .filter((id) => id !== "__root__" && !id.startsWith("/api/"))
    .sort();
}

/**
 * D234 S1 — judge every page against its ceiling. `measure(id)` answers the
 * page's first download as `{ kib, closure }`. A page with no ceiling, a ceiling
 * with no page, a page over its ceiling, a page `slack` KiB or more under it (the
 * ratchet: lower it), a public page holding a must-stay-lazy chunk, and a public page
 * whose chunks carry a MUST_NOT_CARRY marker (`carries(closure)`, DEC-261) each fail.
 */
export function judgeRouteBudgets({ routeIds, budgets, measure, slack, publicLazy, carries }) {
  // Page ids come from the build's manifest: the ceilings are read as own entries only.
  const ceilings = new Map(Object.entries(budgets));
  const rows = [];
  const failures = [];
  for (const id of routeIds) {
    const budget = ceilings.get(id);
    if (budget === undefined) {
      failures.push(
        `${id}: no ceiling in scripts/route-budgets.mjs (every page declares its first download)`,
      );
      continue;
    }
    const { kib, closure } = measure(id);
    rows.push({ id, kib, ceiling: budget.ceiling });
    if (kib > budget.ceiling) {
      failures.push(`${id}: ${kib.toFixed(1)} KiB, over its ceiling of ${budget.ceiling} KiB`);
    } else if (budget.ceiling - kib >= slack) {
      failures.push(
        `${id}: ${kib.toFixed(1)} KiB, ${slack} KiB or more under its ceiling of ${budget.ceiling} KiB (ratchet: lower the ceiling to ${Math.ceil(kib + 3)})`,
      );
    }
    if (budget.public) {
      const lazy = firstLazyViolation(closure, publicLazy);
      if (lazy) failures.push(`${id}: ${lazy} must stay lazy on a public page (D234)`);
      const carried = carries === undefined ? null : carries(closure);
      if (carried)
        failures.push(
          `${id}: ${carried.name} carries ${carried.marker} on a public page (DEC-261)`,
        );
    }
  }
  for (const id of ceilings.keys()) {
    if (!routeIds.includes(id))
      failures.push(`${id}: a ceiling for a page the build does not have`);
  }
  return { rows, failures };
}
