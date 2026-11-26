import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { CRAWL_PAGES, type CrawlPage } from "../../e2e/helpers/crawl-pages";
import { pattern } from "../lib/pattern";

/**
 * DEC-459 (c), INC-1278 — THE FAILURE CRAWL'S PAGE-COVERAGE CENSUS (CF-CRAWL-1). Every page
 * route of src/routeTree.gen.ts (a route whose file is a `.tsx` page; the `.ts` routes are the
 * API's and the assets') is crawled by a row of e2e/helpers/crawl-pages.ts or named by a
 * `page <route>` line of scripts/conformance/failure-crawl-allowlist.txt; every footer item with
 * no route (src/components/shell/app-footer.tsx, COLUMNS beside ROUTED) is a page owed, named by a
 * `footer <key>` line (DEC-463) until its route lands; every `default <file> <function>` line
 * names a designed default the crawl does not meet on a page's load, whose function still lives
 * in its file; every `read <route> …` line belongs to a crawled route (the crawl itself judges
 * the read), and a `read * …` line to every page. A crawled row whose route is no page route
 * fails, and so does a line that names nothing (kit.ts readAllowlist: stale or expired).
 *
 * It MISSES: a page's reads (the crawl, e2e/helpers/failure-crawl.ts, records and forces them);
 * a page drawn by a route the generated tree does not list; a `read * …` line no page asks any
 * more (a shell-wide read asked on some loads only, which no one page can call stale).
 */

export const CRAWL_ALLOWLIST = "scripts/conformance/failure-crawl-allowlist.txt";
/** The route of a `read` line every page shares: a shell-wide read. */
const EVERY_PAGE = "*";

/** The page routes of the generated route tree, by full path. */
export function pageRoutes(root: string): string[] {
  const tree = readFileSync(join(root, "src", "routeTree.gen.ts"), "utf8");
  const files = new Map<string, string>();
  for (const [, name, file] of tree.matchAll(
    /^import \{ Route as (\w+) \} from '\.\/routes\/(.+)'$/gm,
  ))
    files.set(name, file);
  const body = /export interface FileRoutesByFullPath \{([\s\S]*?)\n\}/.exec(tree)?.[1];
  if (body === undefined) throw new Error("src/routeTree.gen.ts: no FileRoutesByFullPath");
  const pages: string[] = [];
  for (const [, path, route] of body.matchAll(/^\s*'([^']+)': typeof (\w+)$/gm)) {
    const name = `${route.replace(/WithChildren$/, "").replace(/Route$/, "")}RouteImport`;
    const file = files.get(name);
    if (file === undefined) throw new Error(`src/routeTree.gen.ts: ${path} has no import`);
    if (existsSync(join(root, "src", "routes", `${file}.tsx`))) pages.push(path);
  }
  return pages;
}

/** The footer's items that have no route yet: COLUMNS' items not keyed in ROUTED. */
export function unroutedFooterItems(root: string): string[] {
  const text = readFileSync(join(root, "src", "components", "shell", "app-footer.tsx"), "utf8");
  const routed = /const ROUTED[^=]*=\s*\{([\s\S]*?)\n\};/.exec(text)?.[1] ?? "";
  const routedKeys = new Set([...routed.matchAll(/"(footer\.[\w.]+)":/g)].map((m) => m[1]));
  const columns = /const COLUMNS[^=]*=\s*\[([\s\S]*?)\n\];/.exec(text)?.[1];
  if (columns === undefined) throw new Error("app-footer.tsx: no COLUMNS");
  const items: string[] = [];
  for (const [, list] of columns.matchAll(/items:\s*\[([^\]]*)\]/g))
    for (const [, key] of list.matchAll(/"(footer\.[\w.]+)"/g))
      if (!routedKeys.has(key)) items.push(key);
  return items;
}

/** Whether a file declares the named function (or a const holding one). */
function declares(root: string, file: string, name: string): boolean {
  const path = join(root, file);
  if (!existsSync(path)) return false;
  const text = readFileSync(path, "utf8");
  return pattern`\\b(?:function|const)\\s+${name}\\b`.test(text);
}

export type CrawlFinding = { what: string };

/**
 * The census's findings and the keys its allowlist may hold. `pages` and `rows` default to the
 * tree's routes and the crawl's table; a test plants its own.
 */
export function crawlCensus(
  root: string,
  allowlistText: string,
  pages: string[] = pageRoutes(root),
  rows: readonly CrawlPage[] = CRAWL_PAGES,
): { findings: CrawlFinding[]; owed: string[]; found: Set<string> } {
  const crawled = new Set(rows.map((row) => row.route));
  const pageSet = new Set(pages);
  const findings: CrawlFinding[] = [];
  for (const row of rows)
    if (!pageSet.has(row.route))
      findings.push({ what: `${row.id} crawls ${row.route}, which is no page route` });
  const owed = [
    ...pages.filter((page) => !crawled.has(page)).map((page) => `page ${page}`),
    ...unroutedFooterItems(root).map((item) => `footer ${item}`),
  ];
  const found = new Set(owed);
  for (const raw of allowlistText.split(/\r?\n/)) {
    const key = raw.split("|")[0]?.trim() ?? "";
    const read = /^read (\S+) /.exec(key);
    if (read !== null && (read[1] === EVERY_PAGE || crawled.has(read[1] ?? ""))) found.add(key);
    const designed = /^default (\S+) (\w+)$/.exec(key);
    if (designed !== null && declares(root, designed[1] ?? "", designed[2] ?? "")) found.add(key);
  }
  return { findings, owed, found };
}
