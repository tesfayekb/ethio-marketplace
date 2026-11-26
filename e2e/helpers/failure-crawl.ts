import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, type Page, type Request, type Route } from "@playwright/test";

import am from "../../src/i18n/locales/am";
import en from "../../src/i18n/locales/en";
import { errorText } from "../../src/lib/error-text";
import type { CrawlPage } from "./crawl-pages";
import {
  allowedReads,
  failuresOf,
  forcedAnswer,
  isAllowed,
  judgeForced,
  judgeNormal,
  parseCrawlAllowlist,
  readOf,
  staleReads,
  type Backend,
  type Forced,
  type ForcedLoad,
  type NormalLoad,
} from "./failure-crawl-judge";
import { pageWentAway } from "./route-guard";
import { waitForHydration } from "./ui";

/**
 * DEC-459 (c), INC-1278 — THE FAILURE CRAWL. A page opens at 360, 768 and 1280 px with no page
 * error, no `[client-error]`, no sideways scroll and no control the viewport cuts; then, at 360,
 * each read its load made fails alone — as a dropped network and as the provider's real server
 * error (src/test/provider-errors.ts, captured) — and its first read once more as an answer of
 * the wrong shape. Each time the screen says so (the failure notice, the on-demand notice, the
 * in-place one, the router's page-failed answer, or a screen's own words in an alert the ordinary
 * load did not show), unless the read is a line of scripts/conformance/failure-crawl-allowlist.txt.
 * The verdicts are failure-crawl-judge.ts's; the pages are crawl-pages.ts's.
 *
 * The start page: a page's own reads are the ones its start page did not make. Visitors and
 * members start on /dev/tall (no read of its own: its reads are the shell's, crawled by its own
 * row); staff start on /admin/ (the staff shell's reads, crawled by the /admin/ row).
 */

export const CRAWL_WIDTHS = [360, 768, 1280] as const;
const HEIGHT = 740;
/** A load has settled when no read was in flight for this long (above the retry gaps). */
const QUIET_MS = 1_500;
const FORCED_QUIET_MS = 4_500;
/** The longest a load may take to settle; the failure notice waits behind the query's retries
 *  (four tries, 1, 2 and 4 s apart), each a data read the client itself tries four times (1, 2
 *  and 4 s apart, @supabase/postgrest-js on a GET): about 35 s before the query fails. */
const SETTLE_CAP_MS = 20_000;
const NOTICE_CAP_MS = 45_000;

const ALLOWLIST = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../scripts/conformance/failure-crawl-allowlist.txt",
);

const LOAD_FAILED = [en["common.loadFailed"], am["common.loadFailed"]];

export function startPathOf(row: CrawlPage): string {
  return row.audience === "staff" ? "/admin/" : "/dev/tall";
}

function backendOrigin(): string {
  const url = process.env["VITE_SUPABASE_URL"] ?? process.env["E2E_SUPABASE_URL"];
  if (url === undefined) throw new Error("[e2e:crawl] no backend address in the environment");
  return new URL(url).origin;
}

type Recorder = {
  reads: Map<string, { backend: Backend; shape: "array" | "object" | "other" }>;
  order: string[];
  inFlight: Set<Request>;
  lastActivity: number;
  pageErrors: string[];
  consoleErrors: string[];
  serverErrors: string[];
  stop: () => void;
};

/** Watches the page's reads (fetch and XHR), its page errors, console errors and server errors. */
function record(page: Page, origins: { app: string; backend: string }): Recorder {
  const rec: Recorder = {
    reads: new Map(),
    order: [],
    inFlight: new Set(),
    lastActivity: Date.now(),
    pageErrors: [],
    consoleErrors: [],
    serverErrors: [],
    stop: () => undefined,
  };
  const isRead = (request: Request) =>
    (request.resourceType() === "fetch" || request.resourceType() === "xhr") &&
    readOf(request.url(), request.method(), origins) !== null;
  const onRequest = (request: Request) => {
    if (!isRead(request)) return;
    rec.inFlight.add(request);
    rec.lastActivity = Date.now();
  };
  const onDone = (request: Request) => {
    if (!rec.inFlight.delete(request)) return;
    rec.lastActivity = Date.now();
  };
  const onResponse = (response: import("@playwright/test").Response) => {
    const request = response.request();
    const read = readOf(request.url(), request.method(), origins);
    if (response.status() >= 500)
      rec.serverErrors.push(`${response.status()} ${request.method()} ${request.url()}`);
    if (read === null || !isRead(request) || rec.reads.has(read.key)) return;
    rec.order.push(read.key);
    rec.reads.set(read.key, { backend: read.backend, shape: "other" });
    void response
      .json()
      .then((body: unknown) => {
        const entry = rec.reads.get(read.key);
        if (entry)
          entry.shape = Array.isArray(body)
            ? "array"
            : body !== null && typeof body === "object"
              ? "object"
              : "other";
      })
      .catch(() => undefined);
  };
  const onPageError = (error: Error) => rec.pageErrors.push(error.message);
  const onConsole = (message: import("@playwright/test").ConsoleMessage) => {
    if (message.type() === "error") rec.consoleErrors.push(message.text().slice(0, 300));
  };
  page.on("request", onRequest);
  page.on("requestfinished", onDone);
  page.on("requestfailed", onDone);
  page.on("response", onResponse);
  page.on("pageerror", onPageError);
  page.on("console", onConsole);
  rec.stop = () => {
    page.off("request", onRequest);
    page.off("requestfinished", onDone);
    page.off("requestfailed", onDone);
    page.off("response", onResponse);
    page.off("pageerror", onPageError);
    page.off("console", onConsole);
  };
  return rec;
}

/** Whether no read was in flight for `quietMs`. */
function isQuiet(rec: Recorder, quietMs: number): boolean {
  return rec.inFlight.size === 0 && Date.now() - rec.lastActivity >= quietMs;
}

/** Waits until no read was in flight for QUIET_MS (bounded by SETTLE_CAP_MS). */
async function quiet(page: Page, rec: Recorder): Promise<void> {
  await expect
    .poll(() => isQuiet(rec, QUIET_MS), {
      message: `[e2e:crawl] ${page.url()} never settled (reads in flight)`,
      timeout: SETTLE_CAP_MS,
      intervals: [250],
    })
    .toBe(true);
}

/** Each visible control the viewport cuts (a control wholly off-screen, or clipped by its own
 *  scrolling strip, is not cut by the viewport). */
async function cutControls(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const width = window.innerWidth;
    const found: string[] = [];
    const controls = document.querySelectorAll(
      'button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"], [role="menuitem"]',
    );
    for (const el of Array.from(controls)) {
      if (!(el instanceof HTMLElement)) continue;
      if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      const box = el.getBoundingClientRect();
      if (box.width <= 1 || box.height <= 1) continue;
      if (box.right <= 0 || box.left >= width) continue;
      if (box.left >= -0.5 && box.right <= width + 0.5) continue;
      let clipped = false;
      for (let up = el.parentElement; up !== null; up = up.parentElement) {
        const overflow = getComputedStyle(up).overflowX;
        if (overflow !== "visible" && up.scrollWidth > up.clientWidth + 1) {
          clipped = true;
          break;
        }
      }
      if (clipped) continue;
      const id = el.getAttribute("data-testid");
      const name = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40);
      found.push(
        `${el.tagName.toLowerCase()}${id === null ? "" : `[data-testid=${id}]`} “${name}” ${Math.round(box.left)}…${Math.round(box.right)}`,
      );
    }
    return found;
  });
}

/** The render invariant's three tokens (ui.ts assertNoStringifiedLeak), as findings. */
async function leaks(page: Page): Promise<string[]> {
  const body = await page.evaluate(() => document.body.innerText);
  const found = ["[object Object]", "NaN"].filter((token) => body.includes(token));
  if (/(^|[\s>[("'])undefined([\s<\])"'.,:;!?]|$)/.test(body)) found.push("undefined");
  return found;
}

/** The visible alerts' texts: the ordinary load's are the baseline a failure's own words beat. */
async function alertTexts(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="alert"]'))
      .filter((el) => el instanceof HTMLElement && el.checkVisibility({ checkVisibilityCSS: true }))
      .map((el) => (el.textContent ?? "").trim())
      .filter((text) => text !== ""),
  );
}

/** Whether the screen says a read failed: the failure notice, the on-demand one, the router's
 *  page-failed answer (src/routes/__root.tsx ErrorContent, with its Refresh), the in-place one,
 *  or a screen's own words in an alert the ordinary load did not show. */
async function noticed(page: Page, baseline: ReadonlySet<string>): Promise<boolean> {
  const shown = await page.evaluate((words: string[]) => {
    const seen = (el: Element) =>
      el instanceof HTMLElement && el.checkVisibility({ checkVisibilityCSS: true });
    const notices = document.querySelectorAll(
      '[data-failure-reason], [data-testid="on-demand-failed"], [data-testid="route-error-refresh"]',
    );
    if (Array.from(notices).some(seen)) return true;
    return Array.from(document.querySelectorAll('[role="alert"]')).some(
      (alert) => seen(alert) && words.some((word) => (alert.textContent ?? "").includes(word)),
    );
  }, LOAD_FAILED);
  return shown || (await alertTexts(page)).some((text) => !baseline.has(text));
}

/** Opens a path the client's way: the router's own history (a popstate it listens to). The page
 *  may redirect (/legal/terms answers /terms), so it waits only for the start page to be left. */
async function clientNavigate(page: Page, path: string): Promise<void> {
  const from = new URL(page.url()).pathname;
  await page.evaluate((to: string) => {
    window.history.pushState(window.history.state, "", to);
    window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
  }, path);
  await expect.poll(() => new URL(page.url()).pathname).not.toBe(from);
}

export type CrawlResult = { problems: string[]; reads: string[]; loads: number; ms: number };

/**
 * Crawls one page for one audience (already signed in as it); `path` is the route with its
 * params filled. Answers every problem found, never throws on one: the test asserts the list.
 */
export async function crawlPage(page: Page, row: CrawlPage, path: string): Promise<CrawlResult> {
  const began = Date.now();
  const lines = parseCrawlAllowlist(readFileSync(ALLOWLIST, "utf8"));
  const allowed = allowedReads(lines, row.route, row.audience);
  const problems: string[] = [];
  let loads = 0;
  await page.goto(startPathOf(row));
  await waitForHydration(page);
  const origins = { app: new URL(page.url()).origin, backend: backendOrigin() };

  // The start page's own reads: the shell's, crawled on the start page's row. The start page
  // settles first on every row, so no read of it is cut off by the next navigation.
  const start = startPathOf(row);
  const startRec = record(page, origins);
  await page.goto(start);
  await waitForHydration(page);
  await quiet(page, startRec);
  startRec.stop();
  loads += 1;
  const shell = row.route === start ? new Set<string>() : new Set(startRec.order);

  // The ordinary loads, at each width; the reads and the alerts are recorded at the first.
  let reads: Recorder | null = null;
  let baseline = new Set<string>();
  for (const width of CRAWL_WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    let rec: Recorder | null = null;
    if (row.via === "client") {
      await page.goto(start);
      await waitForHydration(page);
      rec = record(page, origins);
      await quiet(page, rec);
      await clientNavigate(page, path);
    } else {
      rec = record(page, origins);
      await page.goto(path);
    }
    await waitForHydration(page);
    await quiet(page, rec);
    loads += 1;
    const scroll = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    const load: NormalLoad = {
      width,
      pageErrors: rec.pageErrors,
      consoleErrors: rec.consoleErrors,
      serverErrors: rec.serverErrors,
      ...scroll,
      cut: await cutControls(page),
      leaks: await leaks(page),
    };
    rec.stop();
    problems.push(...judgeNormal(row.route, load));
    if (reads === null) {
      reads = rec;
      baseline = new Set(await alertTexts(page));
    }
  }
  await page.setViewportSize({ width: CRAWL_WIDTHS[0], height: HEIGHT });
  if (reads === null) throw new Error("[e2e:crawl] no load was recorded");

  const asked = new Set(reads.order);
  const own = reads.order.filter((key) => !shell.has(key));
  problems.push(...staleReads(asked, allowed));

  // Each read failed alone; the first read once more with the wrong shape.
  const plan: Array<{ key: string; forced: Forced }> = [];
  for (const key of own) {
    const entry = reads.reads.get(key);
    if (entry === undefined) continue;
    for (const forced of failuresOf(entry.backend))
      if (!isAllowed(allowed, key, forced)) plan.push({ key, forced });
  }
  const first = own.find((key) => !allowed.has(key));
  if (first !== undefined && !isAllowed(allowed, first, "malformed"))
    plan.push({ key: first, forced: "malformed" });

  for (const { key, forced } of plan) {
    const entry = reads.reads.get(key);
    if (entry === undefined) continue;
    const answer = forcedAnswer(entry.backend, forced, entry.shape);
    let hit = false;
    const hits: string[] = [];
    const handler = async (route: Route) => {
      const request = route.request();
      const read = readOf(request.url(), request.method(), origins);
      const isFetch = request.resourceType() === "fetch" || request.resourceType() === "xhr";
      if (!isFetch || read === null || read.key !== key) return route.fallback();
      hit = true;
      hits.push(new URL(request.url()).pathname + new URL(request.url()).search.slice(0, 80));
      const done =
        answer === null
          ? route.abort("internetdisconnected")
          : route.fulfill({
              status: answer.status,
              contentType: answer.contentType,
              body: answer.body,
            });
      await done.catch((error: unknown) => {
        if (!pageWentAway(error)) throw error;
      });
    };
    if (row.via === "client") {
      await page.goto(start);
      await waitForHydration(page);
    }
    await page.route("**/*", handler);
    const rec = record(page, origins);
    let blank = false;
    try {
      if (row.via === "client") await clientNavigate(page, path);
      else await page.goto(path);
      await waitForHydration(page);
    } catch (error) {
      blank = true;
      problems.push(`${row.route} ${key} (${forced}): ${errorText(error).split("\n")[0] ?? ""}`);
    }
    loads += 1;
    // Until the notice shows, the page has settled with none, or NOTICE_CAP_MS passed.
    let saw = false;
    const waitStart = Date.now();
    if (!blank)
      await expect
        .poll(
          async () => {
            saw = await noticed(page, baseline);
            return saw || isQuiet(rec, FORCED_QUIET_MS) || Date.now() - waitStart >= NOTICE_CAP_MS;
          },
          { timeout: NOTICE_CAP_MS + 5_000, intervals: [250] },
        )
        .toBe(true);
    const text = blank ? "" : await page.evaluate(() => document.body.innerText);
    rec.stop();
    await page.unroute("**/*", handler);
    const load: ForcedLoad = {
      read: key,
      forced,
      asked: hit,
      noticed: saw,
      blank: blank || text.trim().length === 0,
      pageErrors: rec.pageErrors,
      text,
    };
    if (!hit)
      console.log(`[e2e:crawl] ${row.route} ${key} (${forced}) not asked on the forced load`);
    else if (!saw) {
      const main = blank
        ? ""
        : await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText);
      console.log(
        `[e2e:crawl] ${row.route} ${key} (${forced}) said nothing after ${Date.now() - waitStart} ms, ${hits.length} forced (${[...new Set(hits)].join(", ")}); the screen: ${main.replace(/\s+/g, " ").slice(0, 160)}`,
      );
    }
    problems.push(...judgeForced(row.route, load, allowed));
  }
  const ms = Date.now() - began;
  console.log(
    `[e2e:crawl] ${row.id} ${row.route} as ${row.audience}: ${asked.size} read(s), ${own.length} own, ${loads} load(s), ${ms} ms`,
  );
  return { problems, reads: [...asked], loads, ms };
}
