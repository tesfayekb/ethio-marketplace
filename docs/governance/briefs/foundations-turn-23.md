# Foundations — turn 23: the phone lab and the first speed baseline of the published site (D234); every server render error counted, an abandoned request one warning (INC-894, INC-893): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 23 (2026-10-25; DEC-237; D234 raised by the operator 2026-10-25 10:59 ET: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at 7633438d92949c13a1d2ffa09869d68a51afee47). Tier B (a measurement tool, the server log's error channel, one page's server render). No migration. No new string. No package change. AGENTS.md: no change. Base: dev 7633438d92949c13a1d2ffa09869d68a51afee47 (Foundations turn 22's final commit; its CI run: A1). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the phone lab; C — the server log's error channel and the callback's server render; D — the baseline run against the published site; E — docs, register, roadmap, changelog.
BASE: 7633438d92949c13a1d2ffa09869d68a51afee47
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/perf/lab.ts
docs/perf/baseline-2026-10-25-1.json
docs/perf/baseline-2026-10-25-2.json
docs/perf/baseline-2026-10-25-3.json
docs/perf/baseline-2026-10-25-4.json
src/lib/error-capture.ts
src/lib/error-capture.test.ts
src/routes/auth_.callback.tsx
SCOPE-END

THE SYSTEM (G0) — two concerns.
CONCERN 1: how fast a page is for a person on a low-end Android phone on a slow mobile network is MEASURED the same way every time, from the published site, so every speed change is judged by numbers (D234; the operator's "lightweight" — kilobytes are the user's money).
MECHANISM 1: NONE YET — built in Part B as NEW scripts/perf/lab.ts: Playwright's Chromium (already installed for the e2e suite) under Lighthouse's own mobile throttling preset (lighthouse-core/config/constants.js `throttling.mobileSlow4G`, devtools method: 562.5 ms request latency, 1,474.56 Kbps down, 675 Kbps up, CPU 4×) on the project's 360 px phone; per page, cold-cache runs and one warm run; TTFB (from the CDP clock — Navigation Timing's responseStart is taken before DevTools throttling and under-reports it: the supervisor's check on a local test page read 5 ms from Navigation Timing and 574 ms from the CDP clock), FCP, LCP and its element, CLS, TBT, load, HTML bytes, bytes by type as the network carried them, request count. The supervisor ran this exact file against a local test site (bandwidth throttling verified: a 489 KB page loaded in 3.9 s).
CONSUMERS 1: none today — the first-paint JS budget (scripts/check-bundle-size.mjs, 305 KiB) is the only speed measure, and it measures the build, not a page on a phone. The D234 census of 2026-10-24 (TTFB/total from your sandbox, unthrottled) is the only earlier page measurement.
CONCERN 2: a page that fails to render on the server is counted by the server-error census, and a visitor who leaves mid-request is not logged as a server error (register row 33).
MECHANISM 2: the `[ssr-error]` channel counted by DEC-083's census (scripts/e2e-failure-report.ts allSsrLines; docs/features/e2e-harness.md "DEC-083 — server-error census"), and src/lib/error-capture.ts's console.error wrapper (:54-:64 at BASE), through which every server log line passes (src/server.ts :1 imports it first).
CONSUMERS 2: (a) TanStack's stream renderer reports a component that threw during the server render as `console.error("Error in renderToReadableStream:", error, info)` (node_modules/@tanstack/react-router/dist/esm/ssr/renderRouterToStream.js :14-:16; the pipeable path names renderToPipeableStream) — no `[ssr-error]` tag, so the census never counts it — bypasses; (b) h3 logs a request the client abandoned as an unhandled 500 (node_modules/h3/dist/h3.mjs :225, its cause an AbortError raised by srvx, node_modules/srvx/dist/adapters/node.mjs :232-:236) — 21 lines of stack before answer.ts :127's one `[client-aborted]` line (turn 21's Part E) — bypasses row 33; (c) the instance (a) found: src/routes/auth_.callback.tsx :48-:50 reads `window.location.search` in a useState initializer, so every server render of /auth/callback throws "window is not defined" (turn 22's E2E log, PW-182). Census of useState/useMemo/useRef initializers that read window, document, localStorage, sessionStorage or navigator in src/ (tests excluded) at BASE: this one site.
COVERED HERE: the lab (B) and its first baseline (D); (a) and (b) in error-capture.ts with ECAP-1…3; (c) the callback reads the return path through the router. INC-894 closed; INC-893 closed.
CONFORMANCE GUARD: concern 1 — NONE YET, on purpose: the budgets a CI step would hold are set from this turn's baseline and the speed study (a later turn wires the lab to CI against the built server). Concern 2 — ECAP-1…3 (src/lib/error-capture.test.ts) prove the two rules on planted calls; the census itself then counts every server render error on every CI run.
EXCEPTIONS: none.
FIVE LENSES — security: the lab only reads public pages, signed out, and records no personal data; error-capture keeps every real error's full description (ECAP-3) · performance: the lab costs nothing at runtime; error-capture adds one regex test per console.error · failure modes: a page the lab cannot find (no ad on the home page) is skipped and named, never invented; an aborted request is still one `[client-aborted]` line plus one `[aborted]` warning, never silent · consistency: one way to measure speed; one channel for server errors · future growth: a new page class is one name in the lab's list; the same lab runs against staging or a local build by --base.
FORWARD-SCAN: the speed study (D234) turns this baseline into budgets per page class and a ranked plan; the CI performance step reuses this file. REGISTER: docs/governance/mechanisms.md — row 33 (the abandoned request) and NEW row 39 (the phone lab).

WHY
- The operator: the site must be the fastest and lightest; speed work starts from real numbers on a cheap phone, measured where the published site is reachable (your sandbox; the supervisor's cannot reach it).
- Turn 22 found /auth/callback failing its server render on every visit, and the census never saw it: the framework's render-error line has no tag.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-23.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-23.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-23.md (Foundations turn 23: the phone lab and the speed baseline — D234; server render errors counted — INC-894)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 22 (docs/governance/briefs/foundations-turn-22", add `  - [ ] Turn 23 (docs/governance/briefs/foundations-turn-23.md; no migration) — scripts/perf/lab.ts and the first speed baseline of the published site (D234); server render errors tagged for the census and the callback's server render fixed (INC-894); an abandoned request one warning (INC-893).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–E; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: this turn changes no spec and no helper; a spec change you find necessary is a STOP with the test and line reported.
- Run no stateful git command. Edits with your file-editing tool.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-23.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/features/e2e-harness.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-23.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. After each batch of files: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the batch touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 (and at times EXH-11) times out in your sandbox (INC-890; they pass in CI). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each batch touched as you go; THE END-TO-END CHECK's specs, both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407). The lab runs of Part D are measurements, not tests: each command stays within the 600-second ceiling as D1 says.
- Behaviour contract: no page changes what it shows. /auth/callback lands exactly as today (the same return path, read from the same URL), now without a server render error. A server log keeps every line it writes today, except that a stream render error gains the `[ssr-error] render` tag in front and an abandoned request's unhandled-500 stack becomes one `[aborted]` warning.
- Knowledge K: K1 the two mechanisms above; K2 the report lists every useState/useMemo/useRef initializer in src/ that reads window, document, localStorage, sessionStorage or navigator, and every console.error call in src/server/ and src/lib/ that writes a framework error without a tag (file:line); K3 the ECAP tests land with the rules; K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened; red-first for ECAP-1 and ECAP-2 (paste them failing against the file at <START> — run the new test before C1 is saved — then passing).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on 7633438d92949c13a1d2ffa09869d68a51afee47). A red on 7633438d92949c13a1d2ffa09869d68a51afee47 is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part C.

PART B — THE PHONE LAB (CONCERN 1).
B1. NEW scripts/perf/lab.ts, exactly the lines between LAB-BEGIN and LAB-END below (paste its sha256sum; the supervisor's copy prints c0701c98767133e0e19a4b069d0c3313d01c330430c6036c16f7d2bbf0e91291):
LAB-BEGIN
/**
 * D234 (Foundations turn 23) — THE PHONE LAB. Opens public pages of a deployed
 * ethio.com the way a low-end Android phone on a slow 4G network does, and
 * records what a person waits for. The throttling is Lighthouse's own mobile
 * preset (lighthouse-core/config/constants.js, `throttling.mobileSlow4G`,
 * devtools method): 150 ms RTT and 1.6 Mbps down / 750 Kbps up, applied as
 * 562.5 ms request latency, 1,474.56 Kbps down and 675 Kbps up, and a 4× CPU
 * slowdown; the screen is the project's 360 px phone (360×740, DPR 1.75).
 *
 * Per run, cold cache (a new browser context): TTFB, FCP, LCP (and the LCP
 * element), CLS, TBT (long tasks after FCP, each beyond 50 ms, until the page is
 * quiet), DOMContentLoaded, load, the HTML's bytes, and every response's bytes
 * as the network carried them (CDP encodedDataLength) by type, with the request
 * count. One warm run per page (the same context again: a repeat visit).
 *
 * Usage:
 *   bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app [--runs 3]
 *     [--pages home,category,ad,seller,post,auth,terms] [--out file.json]
 * The ad, category and seller pages are discovered from the home page (the first
 * /l/ and /c/ links; the ad page's "All ads by this seller" link), unthrottled.
 * E2E_CHROMIUM_PATH overrides the browser, as for the e2e suite.
 */
import { chromium, type Browser, type BrowserContext } from "@playwright/test";
import { writeFileSync } from "node:fs";

export const THROTTLING = {
  rttMs: 150,
  throughputKbps: 1.6 * 1024,
  requestLatencyMs: 150 * 3.75,
  downloadThroughputKbps: 1.6 * 1024 * 0.9,
  uploadThroughputKbps: 750 * 0.9,
  cpuSlowdownMultiplier: 4,
} as const;

export const DEVICE = {
  viewport: { width: 360, height: 740 },
  deviceScaleFactor: 1.75,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
} as const;

export type Run = {
  ttfbMs: number;
  fcpMs: number | null;
  lcpMs: number | null;
  lcpElement: string | null;
  cls: number;
  tbtMs: number;
  domContentLoadedMs: number;
  loadMs: number;
  htmlBytes: number;
  totalBytes: number;
  requests: number;
  bytesByType: Record<string, number>;
  status: number;
};

const OBSERVERS = `(() => {
  const lab = { lcp: null, lcpElement: null, fcp: null, cls: 0, longTasks: [] };
  window.__lab = lab;
  const watch = (type, fn) => {
    try { new PerformanceObserver((list) => list.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch {}
  };
  watch("largest-contentful-paint", (e) => {
    lab.lcp = e.startTime;
    const el = e.element;
    lab.lcpElement = el ? el.tagName.toLowerCase() + (el.getAttribute("data-testid") ? "[" + el.getAttribute("data-testid") + "]" : "") + (e.url ? " " + e.url.split("?")[0].slice(-80) : "") : null;
  });
  watch("paint", (e) => { if (e.name === "first-contentful-paint") lab.fcp = e.startTime; });
  watch("layout-shift", (e) => { if (!e.hadRecentInput) lab.cls += e.value; });
  watch("longtask", (e) => { lab.longTasks.push([e.startTime, e.duration]); });
})();`;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function throttled(context: BrowserContext) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: THROTTLING.requestLatencyMs,
    downloadThroughput: (THROTTLING.downloadThroughputKbps * 1024) / 8,
    uploadThroughput: (THROTTLING.uploadThroughputKbps * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: THROTTLING.cpuSlowdownMultiplier });
  const types = new Map<string, string>();
  const bytes: Array<{ type: string; size: number }> = [];
  // Navigation Timing's responseStart is taken before DevTools throttling delays the
  // response, so the document's TTFB is read from the CDP clock, which sees the delay.
  const doc = { start: null as number | null, ttfb: null as number | null };
  cdp.on("Network.requestWillBeSent", (event) => {
    if (event.type === "Document" && doc.start === null) doc.start = event.timestamp;
  });
  cdp.on("Network.responseReceived", (event) => {
    types.set(event.requestId, event.type ?? "Other");
    if (event.type === "Document" && doc.start !== null && doc.ttfb === null)
      doc.ttfb = (event.timestamp - doc.start) * 1000;
  });
  cdp.on("Network.loadingFinished", (event) =>
    bytes.push({ type: types.get(event.requestId) ?? "Other", size: event.encodedDataLength }),
  );
  return { page, bytes, doc };
}

export async function measure(context: BrowserContext, url: string): Promise<Run> {
  await context.addInitScript(OBSERVERS);
  const { page, bytes, doc } = await throttled(context);
  const response = await page.goto(url, { waitUntil: "load", timeout: 120_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
  await page.waitForTimeout(1_000);
  const read = await page.evaluate(() => {
    const lab = (
      window as unknown as {
        __lab: {
          lcp: number | null;
          lcpElement: string | null;
          fcp: number | null;
          cls: number;
          longTasks: Array<[number, number]>;
        };
      }
    ).__lab;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    return {
      lab,
      ttfb: nav.responseStart,
      dcl: nav.domContentLoadedEventEnd,
      load: nav.loadEventEnd,
    };
  });
  const fcp = read.lab.fcp;
  const tbt = read.lab.longTasks
    .filter(([start]) => fcp !== null && start >= fcp)
    .reduce((sum, [, duration]) => sum + Math.max(0, duration - 50), 0);
  const byType: Record<string, number> = {};
  for (const { type, size } of bytes) byType[type] = (byType[type] ?? 0) + size;
  await page.close();
  return {
    ttfbMs: Math.round(doc.ttfb ?? read.ttfb),
    fcpMs: fcp === null ? null : Math.round(fcp),
    lcpMs: read.lab.lcp === null ? null : Math.round(read.lab.lcp),
    lcpElement: read.lab.lcpElement,
    cls: Number(read.lab.cls.toFixed(3)),
    tbtMs: Math.round(tbt),
    domContentLoadedMs: Math.round(read.dcl),
    loadMs: Math.round(read.load),
    htmlBytes: byType["Document"] ?? 0,
    totalBytes: bytes.reduce((sum, { size }) => sum + size, 0),
    requests: bytes.length,
    bytesByType: byType,
    status: response?.status() ?? 0,
  };
}

async function discover(browser: Browser, base: string): Promise<Record<string, string>> {
  const context = await browser.newContext({ ...DEVICE });
  const page = await context.newPage();
  const urls: Record<string, string> = {
    home: `${base}/`,
    post: `${base}/post`,
    auth: `${base}/auth`,
    terms: `${base}/terms`,
  };
  await page.goto(urls.home, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => undefined);
  const hrefs = await page
    .$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""))
    .catch(() => [] as string[]);
  const ad = hrefs.find((h) => h.startsWith("/l/"));
  const category = hrefs.find((h) => h.startsWith("/c/"));
  if (ad) urls.ad = `${base}${ad}`;
  if (category) urls.category = `${base}${category}`;
  if (urls.ad) {
    await page.goto(urls.ad, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => undefined);
    const seller = await page
      .locator('[data-testid="listing-seller-all-ads"]')
      .getAttribute("href", { timeout: 10_000 })
      .catch(() => null);
    if (seller) urls.seller = `${base}${seller}`;
  }
  await context.close();
  return urls;
}

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function main() {
  const base = (arg("base") ?? "").replace(/\/$/, "");
  if (!/^https?:\/\//.test(base)) throw new Error("--base <url> is required");
  const runs = Number(arg("runs") ?? "3");
  const wanted = (arg("pages") ?? "home,category,ad,seller,post,auth,terms").split(",");
  const browser = await chromium.launch({ executablePath: process.env["E2E_CHROMIUM_PATH"] });
  const urls = await discover(browser, base);
  const result: Record<string, unknown> = {
    base,
    when: new Date().toISOString(),
    device: DEVICE,
    throttling: THROTTLING,
    pages: [] as unknown[],
  };
  for (const name of wanted) {
    const url = urls[name];
    if (!url) {
      console.log(`[lab] ${name}: not found on the home page — skipped`);
      continue;
    }
    const cold: Run[] = [];
    for (let i = 0; i < runs; i++) {
      const context = await browser.newContext({ ...DEVICE });
      cold.push(await measure(context, url));
      await context.close();
    }
    const warmContext = await browser.newContext({ ...DEVICE });
    await measure(warmContext, url);
    const warm = await measure(warmContext, url);
    await warmContext.close();
    const pick = (key: keyof Run) =>
      median(
        cold
          .map((run) => (typeof run[key] === "number" ? (run[key] as number) : NaN))
          .filter(Number.isFinite),
      );
    const summary = {
      name,
      url,
      medianCold: {
        ttfbMs: pick("ttfbMs"),
        fcpMs: pick("fcpMs"),
        lcpMs: pick("lcpMs"),
        cls: pick("cls"),
        tbtMs: pick("tbtMs"),
        loadMs: pick("loadMs"),
        htmlKB: Math.round(pick("htmlBytes") / 102.4) / 10,
        totalKB: Math.round(pick("totalBytes") / 102.4) / 10,
        requests: pick("requests"),
      },
      warm,
      cold,
    };
    (result.pages as unknown[]).push(summary);
    const m = summary.medianCold;
    console.log(
      `[lab] ${name} ${url} — TTFB ${m.ttfbMs} ms · FCP ${m.fcpMs} ms · LCP ${m.lcpMs} ms · CLS ${m.cls} · TBT ${m.tbtMs} ms · load ${m.loadMs} ms · HTML ${m.htmlKB} KB · total ${m.totalKB} KB in ${m.requests} requests · warm LCP ${warm.lcpMs} ms, ${Math.round(warm.totalBytes / 1024)} KB`,
    );
  }
  await browser.close();
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(result, null, 2) + "\n");
}

if (process.argv[1]?.endsWith("lab.ts")) await main();
LAB-END

PART C — THE SERVER LOG'S ERROR CHANNEL AND THE CALLBACK (CONCERN 2).
C1. src/lib/error-capture.ts: directly above the comment that begins "// Wrap console.error so errors logged by any layer" (:54), add a block comment naming INC-894 and INC-893 (the two rules below, one sentence each), `const RENDER_ERROR = /^Error in renderTo(?:ReadableStream|PipeableStream):/;` and a function `abortedRequest(value: unknown): boolean` — true when `value` is an Error whose `unhandled` property is `true` and whose cause chain (at most CAUSE_DEPTH_LIMIT links) holds an object whose `name` is "AbortError". The wrapper's first lines become: when it is called with exactly one argument and `abortedRequest(that argument)`, call `console.warn("[aborted] the client left; h3 logged the request as unhandled (status 500)")` and return; when the first argument is a string matching RENDER_ERROR, put the string "[ssr-error] render" in front of the arguments; everything after (the expansion, `record`, the original console.error) stays as it is.
C2. NEW src/lib/error-capture.test.ts (the module wraps console.error when it is imported: each test sets console.error and console.warn to fresh spies, `vi.resetModules()`, imports "./error-capture", and afterEach restores the originals): ECAP-1 `console.error("Error in renderToReadableStream:", new ReferenceError("window is not defined"), { componentStack: "…" })` reaches the original console.error once, its first argument "[ssr-error] render", its second the label, its third containing "ReferenceError: window is not defined"; ECAP-2 an Error with `unhandled: true`, `status: 500` and `cause: new DOMException("This operation was aborted", "AbortError")` writes no error line and one warning containing "[aborted]"; ECAP-3 the same Error with `cause: new TypeError("boom")` writes no warning and one error line containing "(status 500)" and "caused by: TypeError: boom". Red-first as HOW TO WORK says.
C3. src/routes/auth_.callback.tsx: `useLocation` joins the import from "@tanstack/react-router"; the initializer at :48-:50 becomes `const searchStr = useLocation({ select: (location) => location.searchStr });` followed by `const [target] = useState(() => safeReturnPath(new URLSearchParams(searchStr).get("return")));`, and the comment above it gains one sentence: the router's location is read because the server render has it too (INC-894: reading `window` there threw on every server render). Nothing else in the file changes.

PART D — THE BASELINE (CONCERN 1, measured where the published site is reachable).
D1. Run the lab against the published site four times, one command each, every command inside the 600-second ceiling (`--runs 3`; if one nears the ceiling, re-run that group with `--runs 2` and say so): `bun scripts/perf/lab.ts --base https://my-market-dawn.lovable.app --runs 3 --pages home,category --out docs/perf/baseline-2026-10-25-1.json`; the same with `--pages ad,seller` → baseline-2026-10-25-2.json; `--pages post,auth` → -3.json; `--pages terms` → -4.json. Paste every `[lab]` line as printed.
D2. Paste the response headers (`curl -sI`) of the published home page, of the ad page the lab found, of one JS asset and of one image that page loads (their URLs from the lab's JSON or the page's HTML): every header, as printed — the speed study reads Cache-Control, CF-Cache-Status, Age, Content-Encoding, Server and Vary from them.
D3. A page the lab could not find on the home page is reported as such; nothing is invented or estimated.

PART E — DOCS.
E1. docs/features/performance-strategy.md: a new section at the end, "## 6. The phone lab and the baseline (D234, Foundations turn 23)": what scripts/perf/lab.ts measures and how (the throttling constants with their source, the device, cold and warm runs, the CDP TTFB note), how to run it (the D1 commands), and the baseline table — one row per page: TTFB, FCP, LCP, LCP element, CLS, TBT, load, HTML KB, total KB, requests (median of the cold runs), warm LCP and warm KB — with the date, the published URL and "budgets: set from this baseline and the speed study (a later turn)".
E2. docs/features/e2e-harness.md, the section "## DEC-083 — server-error census": one paragraph "INC-894 (Foundations turn 23)": a stream render error ("Error in renderToReadableStream:" / renderToPipeableStream) is written with the `[ssr-error] render` tag by src/lib/error-capture.ts, so the census counts every page that fails to render on the server; an abandoned request's unhandled-500 stack (INC-893) is one `[aborted]` warning (row 33).
E3. docs/governance/mechanisms.md, exactly these two edits: (a) row 33 (the row that begins "| 33 | A request whose client left") — its notes column gains "; INC-893: h3's unhandled-500 stack for an abandoned request is one `[aborted]` warning (src/lib/error-capture.ts, ECAP-2; Foundations turn 23)"; (b) NEW row 39 directly after row 38 (the row that begins "| 38 | A lint concern's rule"), exactly this line:
   | 39 | How fast a page is on a low-end phone on slow 4G is measured one way, from the published site (D234) | `scripts/perf/lab.ts` — Lighthouse's mobileSlow4G devtools constants, CPU 4×, 360×740, cold and warm runs, TTFB from the CDP clock | NONE YET — the CI budget step follows the speed study; the first-paint JS budget (scripts/check-bundle-size.mjs) stands | none | a new page class is one name in the list; any --base (published, staging, a local build) | baseline docs/perf/baseline-2026-10-25-*.json, Foundations turn 23 |
E4. docs/_changelog.md one entry "Foundations turn 23 (2026-10-25)"; roadmap.md the turn-23 line `[x]` with the final HEAD, the unit totals and the home and ad pages' median LCP and total KB.

THE CHECKS (in this order): `bun run lint` (paste the error and warning counts; expected 0 errors, 40 warnings); `bun run test:unit` (paste totals and the ECAP- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last. THE END-TO-END CHECK (both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/post-wizard-category.spec.ts by `--grep "PW-182 "` (the callback) and e2e/smoke-auth-i18n.spec.ts whole (a sign-out abandons requests); paste every count line and the server log's lines carrying `[ssr-error]`, `renderToReadableStream`, `[aborted]` and `[client-aborted]` (expected: no renderToReadableStream line; `[aborted]` warnings where the stacks used to be).

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-23.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; lab.ts's sha256; the red-first lines for ECAP-1 and ECAP-2; every `[lab]` line and the four headers dumps; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
