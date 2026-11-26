/**
 * DEC-459 (c), INC-1278 — THE FAILURE CRAWL'S JUDGE, the part with no browser in it: which
 * request is a read and under which key, what a forced failure answers, the allowlist's lines,
 * and the verdict on a load. e2e/helpers/failure-crawl.ts drives the browser and asks this file;
 * src/test/failure-crawl.test.ts proves the verdicts on planted loads (a page answer that
 * swallows a failure fails).
 */
import {
  PROVIDER_ERRORS,
  type ProviderErrorEntry,
  type ProviderErrorName,
} from "../../src/test/provider-errors";
import { isCountryCode } from "../../src/lib/locale";
import { UUID_RE } from "../../src/lib/uuid";

/** Who opens a page: signed out, a signed-in member, a staff account with its factor. */
export type Audience = "visitor" | "member" | "staff";

/** The backends a read reaches; each forces the server error its own source sends. */
export type Backend = "data" | "auth" | "storage" | "route" | "serverFn" | "static";

export type Read = { key: string; backend: Backend };

/** A path segment that names one row (an id, a public id, a long token) is read as `:id`; a
 *  market's two-letter code as `:country`, so a line holds whichever market the rows are in. */
function generic(segment: string): string {
  if (isCountryCode(segment)) return ":country";
  return UUID_RE.test(segment) || /^[A-Za-z0-9_-]{16,}$/.test(segment) || /^\d+$/.test(segment)
    ? ":id"
    : segment;
}

/**
 * A request's read key, or null when it is not a read of this crawl: the data API's table or
 * function, the sign-in server's path, storage's bucket, our route's path (each segment that
 * names a row read as `:id`), a server function's id, a static JSON file of our own.
 */
export function readOf(
  url: string,
  method: string,
  origins: { app: string; backend: string },
): Read | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const path = parsed.pathname;
  if (parsed.origin === origins.backend) {
    const rpc = /^\/rest\/v1\/rpc\/([a-z0-9_]+)$/.exec(path);
    if (rpc) return { key: `rpc ${rpc[1]}`, backend: "data" };
    const table = /^\/rest\/v1\/([a-z0-9_]+)$/.exec(path);
    if (table) return { key: `rest ${table[1]} ${method}`, backend: "data" };
    const auth = /^\/auth\/v1\/([a-z0-9_/-]+)$/.exec(path);
    if (auth) {
      const grant = parsed.searchParams.get("grant_type");
      const name = auth[1].split("/").map(generic).join("/");
      return { key: `auth ${name}${grant === null ? "" : `?${grant}`}`, backend: "auth" };
    }
    const bucket =
      /^\/storage\/v1\/object\/(?:(list|public|sign|authenticated)\/)?([a-z0-9-]+)/.exec(path);
    if (bucket) return { key: `storage ${bucket[1] ?? "object"} ${bucket[2]}`, backend: "storage" };
    return null;
  }
  if (parsed.origin !== origins.app) return null;
  if (path.startsWith("/_serverFn/"))
    return { key: `serverFn ${path.slice(11)}`, backend: "serverFn" };
  if (path.startsWith("/api/")) {
    if (path === "/api/catalog/find") return null;
    return { key: `api ${path.split("/").map(generic).join("/")}`, backend: "route" };
  }
  if (/^\/[a-z0-9-]+\.json$/.test(path)) return { key: `static ${path}`, backend: "static" };
  return null;
}

/** The provider's real server error for each backend (src/test/provider-errors.ts, captured). */
const SERVER_ERROR: Record<Backend, ProviderErrorName | null> = {
  data: "PGRST000",
  auth: "unexpected_failure",
  storage: "InternalError",
  route: "upstream unavailable",
  // No server error of these two was captured whole (cursor-bundle-8a ruling 1, decision 1):
  // they are crawled with the network failure only.
  serverFn: null,
  static: null,
};

export type Forced = "network" | "server" | "malformed";

/** The answer a forced failure fulfils, or null for the network failure (an abort). */
export function forcedAnswer(
  backend: Backend,
  forced: Forced,
  realShape: "array" | "object" | "other",
): { status: number; contentType: string; body: string } | null {
  if (forced === "network") return null;
  if (forced === "malformed") {
    // The wrong shape of JSON: an object where a list came, a list where an object came.
    return {
      status: 200,
      contentType: "application/json",
      body: realShape === "array" ? '{"crawl":"malformed"}' : "[]",
    };
  }
  const name = SERVER_ERROR[backend];
  if (name === null) return null;
  const entry: ProviderErrorEntry = PROVIDER_ERRORS[name];
  if (entry.body === undefined || entry.status === undefined)
    throw new Error(`[e2e:crawl] the fixture's ${name} carries no captured answer`);
  return { status: entry.status, contentType: "application/json", body: entry.body };
}

/** The forced failures a read meets: the network drop, and the server error where one is captured. */
export function failuresOf(backend: Backend): Forced[] {
  return SERVER_ERROR[backend] === null ? ["network"] : ["network", "server"];
}

/** The words a forced server error carries, none of which the screen may show raw. */
export function rawWords(): string[] {
  const words = new Set<string>(["Failed to fetch", "TypeError", "NetworkError", "net::ERR"]);
  for (const name of Object.values(SERVER_ERROR)) {
    if (name !== null) words.add(PROVIDER_ERRORS[name].message);
  }
  words.add('{"crawl":"malformed"}');
  return [...words];
}

export type CrawlAllowance = { key: string; reason: string; until: string; line: number };

/**
 * The crawl's allowlist (scripts/conformance/failure-crawl-allowlist.txt), grammar
 * `key | reason | until`:
 * `page <route>` a page the crawl does not open, `footer <key>` a footer item with no page yet
 * (DEC-463), `read <route> <read key>` a read whose failure the page meets by design with no
 * notice, and `read <route> <read key> (<forced>)` one forced failure of it only (its other
 * failures still owe the notice); `read <route> as <audience> …` either, for one audience
 * only; `read * <read key>` a shell-wide read on every page (never stale on one page: such a
 * read is asked on some loads only); `default <file> <function>` a designed default the crawl does
 * not meet on a page's load (scripts/conformance/failure-crawl.ts holds it to its function).
 * `until` is a date, an INC or DEC number, or `permanent` for a designed default. A `permanent`
 * `read` line excuses the silence only; one whose `until` names a reported defect (INC-1278)
 * excuses every problem of that forced failure (a blank, a raw error, a page error).
 */
export function parseCrawlAllowlist(text: string): CrawlAllowance[] {
  const lines: CrawlAllowance[] = [];
  text.split(/\r?\n/).forEach((raw, index) => {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const cells = trimmed.split("|").map((cell) => cell.trim());
    if (cells.length !== 3 || cells.some((cell) => !cell))
      throw new Error(`failure-crawl-allowlist.txt:${index + 1} expected three non-empty cells`);
    const [key = "", reason = "", until = ""] = cells;
    if (!/^(?:page|footer|read|default) \S/.test(key))
      throw new Error(`failure-crawl-allowlist.txt:${index + 1} unknown key form: ${key}`);
    lines.push({ key, reason, until, line: index + 1 });
  });
  return lines;
}

/** The allowed reads of one page for one audience (its `read <route> …` lines and its
 *  `read <route> as <audience> …` ones), by read key (with its forced failure, for a line that
 *  allows one failure only). */
/** A shell-wide read's line, `read * <read key>`: every page's, never stale on one page. */
const EVERY_PAGE = "read * ";

export function allowedReads(
  lines: CrawlAllowance[],
  route: string,
  audience?: string,
): Map<string, CrawlAllowance> {
  const own = `read ${route} as ${audience ?? ""} `;
  const every = `read ${route} `;
  const allowed = new Map<string, CrawlAllowance>();
  for (const line of lines) {
    if (audience !== undefined && line.key.startsWith(own)) {
      allowed.set(line.key.slice(own.length), line);
    } else if (line.key.startsWith(every) && !line.key.startsWith(`${every}as `)) {
      allowed.set(line.key.slice(every.length), line);
    } else if (line.key.startsWith(EVERY_PAGE)) {
      allowed.set(line.key.slice(EVERY_PAGE.length), line);
    }
  }
  return allowed;
}

const ONE_FAILURE = / \((network|server|malformed)\)$/;

/** Whether a read's forced failure is allowed: the whole read, or that one failure of it. */
export function isAllowed(
  allowed: Map<string, CrawlAllowance>,
  read: string,
  forced: Forced,
): boolean {
  return allowed.has(read) || allowed.has(`${read} (${forced})`);
}

export type NormalLoad = {
  width: number;
  pageErrors: string[];
  consoleErrors: string[];
  serverErrors: string[];
  scrollWidth: number;
  clientWidth: number;
  /** Each control the viewport cuts: its name and its box's left and right edge. */
  cut: string[];
  leaks: string[];
};

/** The verdict on a page's ordinary load at one width: every problem, in words. */
export function judgeNormal(route: string, load: NormalLoad): string[] {
  const at = `${route} at ${load.width}px`;
  return [
    ...load.pageErrors.map((e) => `${at}: page error ${e}`),
    ...load.consoleErrors.map((e) => `${at}: [client-error] ${e}`),
    ...load.serverErrors.map((e) => `${at}: server error ${e}`),
    ...(load.scrollWidth > load.clientWidth
      ? [`${at}: sideways scroll (${load.scrollWidth} > ${load.clientWidth})`]
      : []),
    ...load.cut.map((c) => `${at}: control cut by the viewport ${c}`),
    ...load.leaks.map((l) => `${at}: rendered ${l}`),
  ];
}

export type ForcedLoad = {
  read: string;
  forced: Forced;
  /** The read was asked while it was forced (a read the page did not ask meets no failure). */
  asked: boolean;
  /** The failure notice (data-failure-reason), the on-demand notice, or the in-place one showed. */
  noticed: boolean;
  /** The page drew nothing: no app, or no text. */
  blank: boolean;
  pageErrors: string[];
  /** The page's text, read for a raw error. */
  text: string;
};

/**
 * The verdict on a load with one read failed: the screen says so (a notice) unless the read is
 * an allowlist line; never a page error, a blank page, or the failure's raw words.
 */
export function judgeForced(
  route: string,
  load: ForcedLoad,
  allowed: Map<string, CrawlAllowance>,
): string[] {
  const at = `${route} ${load.read} (${load.forced})`;
  const line = allowed.get(load.read) ?? allowed.get(`${load.read} (${load.forced})`);
  if (line !== undefined && line.until !== "permanent") return [];
  const problems = load.pageErrors.map((e) => `${at}: page error ${e}`);
  if (load.blank) problems.push(`${at}: the page drew nothing`);
  for (const word of rawWords()) {
    if (load.text.includes(word)) problems.push(`${at}: the raw failure shows (“${word}”)`);
  }
  if (load.asked && !load.noticed && !isAllowed(allowed, load.read, load.forced))
    problems.push(`${at}: the read failed and the screen said nothing (no failure notice)`);
  return problems;
}

/** Allowed reads of a page that its load never asked: stale lines. */
export function staleReads(asked: Set<string>, allowed: Map<string, CrawlAllowance>): string[] {
  return [...allowed.entries()]
    .filter(([, line]) => !line.key.startsWith(EVERY_PAGE))
    .filter(([read]) => !asked.has(read.replace(ONE_FAILURE, "")))
    .map(([, line]) => `failure-crawl-allowlist.txt:${line.line} stale allowance: ${line.key}`);
}
