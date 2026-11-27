import {
  cleanCode,
  cleanMessage,
  cleanPath,
  cleanPlace,
  ERROR_REPORTS_PATH,
} from "@/lib/error-clean";
import type { BrowserFailure } from "@/lib/error-report";
import { errorStack, errorText } from "@/lib/error-text";
import { callRoute } from "@/lib/route-client";
import type { Device, ErrorReport } from "@/lib/schemas/error-report";

/**
 * DEC-474 Part F — THE BROWSER'S SENDER, downloaded only when a failure happens (src/lib/error-report.ts).
 * It cleans the report before it leaves (the server cleans it again), sends at most
 * `REPORTS_PER_VISIT` reports per page visit and the same failure once, sends nothing while the
 * device is offline, and never throws: a refused or failed send is logged once and dropped. The
 * payload is typed by the route's shape but never parsed here (the server's `.strict()` shape is
 * the authority): the cleaner and the bounds below keep every field inside it.
 */
export const REPORTS_PER_VISIT = 5;

const LANGUAGE = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/;
const VERSION = /^[0-9A-Za-z._-]{1,20}$/;

type Agent = Pick<ErrorReport, "browser" | "engine" | "browserVersion" | "device">;

/** The browsers named by their own token, most specific first (Edge and Opera also say Chrome). */
const BROWSERS: ReadonlyArray<readonly [name: string, token: RegExp]> = [
  ["Edge", /\bEdg(?:e|A|iOS)?\/(\d+)/],
  ["Opera", /\bOPR\/(\d+)/],
  ["Samsung Internet", /\bSamsungBrowser\/(\d+)/],
  ["Firefox", /\b(?:Firefox|FxiOS)\/(\d+)/],
  ["Chrome", /\b(?:Chrome|CriOS)\/(\d+)/],
  ["Safari", /\bVersion\/(\d+)[\d.]*.*\bSafari\//],
];

/** Browser, engine, major version and device type from the user agent: never the agent itself. */
export function describeAgent(agent: string): Agent {
  const apple = /\b(?:iPhone|iPad|iPod)\b/.test(agent);
  let browser: string | null = null;
  let browserVersion: string | null = null;
  for (const [name, token] of BROWSERS) {
    const found = token.exec(agent);
    if (found === null) continue;
    browser = name;
    browserVersion = found[1] !== undefined && VERSION.test(found[1]) ? found[1] : null;
    break;
  }
  let engine: string | null = null;
  if (apple || (/AppleWebKit\//.test(agent) && !/\bChrome\//.test(agent))) engine = "WebKit";
  else if (/\bChrome\//.test(agent)) engine = "Blink";
  else if (/\bGecko\/\d/.test(agent)) engine = "Gecko";
  let device: Device | null = null;
  if (/\biPad\b|\bTablet\b/.test(agent) || (/\bAndroid\b/.test(agent) && !/\bMobile\b/.test(agent)))
    device = "tablet";
  else if (/\bMobi|\biPhone\b|\biPod\b|\bAndroid\b/.test(agent)) device = "phone";
  else if (agent !== "") device = "desktop";
  return { browser, engine, browserVersion, device };
}

export type Page = { agent: string; pathname: string; origin: string; language: string };

/** The report a failure makes on a page: every text cleaned, nothing a person is named by. */
export function buildReport(failure: BrowserFailure, page: Page): ErrorReport {
  return {
    kind: failure.kind,
    code: cleanCode(failure.code),
    message: cleanMessage(errorText(failure.error)),
    place: cleanPlace(errorStack(failure.error), page.origin),
    path: cleanPath(page.pathname),
    ...describeAgent(page.agent),
    language: LANGUAGE.test(page.language) ? page.language : null,
    // ACT-034 — no build exposes its commit yet: OPEN, never invented.
    appVersion: null,
  };
}

let sentThisVisit = 0;
const seenThisVisit = new Set<string>();

/** Tests only: a fresh page visit. */
export function newVisit(): void {
  sentThisVisit = 0;
  seenThisVisit.clear();
}

function thisPage(): Page {
  return {
    agent: navigator.userAgent,
    pathname: window.location.pathname,
    origin: window.location.origin,
    language: document.documentElement.lang,
  };
}

/** Sends one report; resolves true when the route recorded it, false for anything else. */
export async function sendReport(failure: BrowserFailure): Promise<boolean> {
  try {
    if (!navigator.onLine) return false;
    const report = buildReport(failure, thisPage());
    const same = [report.kind, report.code, report.message, report.place].join("|");
    if (seenThisVisit.has(same) || sentThisVisit >= REPORTS_PER_VISIT) return false;
    seenThisVisit.add(same);
    sentThisVisit += 1;
    const answer = await callRoute(ERROR_REPORTS_PATH, {
      method: "POST",
      json: report,
      auth: "optional",
      keepalive: true,
    });
    if (answer.kind === "answered" && answer.ok) return true;
    // A report the route refuses (its address dial, its shape) is no failure of the page.
    if (answer.kind === "answered")
      console.warn("[error-report] send failed", `${answer.status} ${answer.error ?? ""}`.trim());
    else console.error("[error-report] send failed", answer.kind);
    return false;
  } catch (error) {
    console.error("[error-report] send failed", errorText(error));
    return false;
  }
}
