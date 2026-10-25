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
