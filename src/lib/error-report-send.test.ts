import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ErrorReportBody } from "@/lib/schemas/error-report";

import {
  buildReport,
  describeAgent,
  newVisit,
  REPORTS_PER_VISIT,
  sendReport,
} from "./error-report-send";

const mocks = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute: mocks.callRoute }));

/** The user agents Playwright's own device list holds (the lock's playwright-core). */
function agentOf(device: string): string {
  const path = resolve(
    process.cwd(),
    "node_modules/playwright-core/lib/server/deviceDescriptorsSource.json",
  );
  const list: unknown = JSON.parse(readFileSync(path, "utf8"));
  const entry: unknown =
    list !== null && typeof list === "object" ? Reflect.get(list, device) : null;
  const agent: unknown =
    entry !== null && typeof entry === "object" ? Reflect.get(entry, "userAgent") : null;
  if (typeof agent !== "string") throw new Error(`no user agent for ${device}`);
  return agent;
}

const ANSWERED = { kind: "answered", status: 200, ok: true, error: null };

describe("the browser's report sender (DEC-474 Part F)", () => {
  beforeEach(() => {
    newVisit();
    mocks.callRoute.mockReset();
    mocks.callRoute.mockResolvedValue(ANSWERED);
    window.history.pushState({}, "", "/l/abc?ref=someone@example.com#photos");
    document.documentElement.lang = "en";
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ERSN-1 the user agent becomes a browser, an engine, a major version and a device type, never the agent", () => {
    expect(describeAgent(agentOf("iPhone 13"))).toEqual({
      browser: "Safari",
      engine: "WebKit",
      browserVersion: "26",
      device: "phone",
    });
    expect(describeAgent(agentOf("iPad Pro 11"))).toMatchObject({
      engine: "WebKit",
      device: "tablet",
    });
    expect(describeAgent(agentOf("Galaxy S9+"))).toEqual({
      browser: "Chrome",
      engine: "Blink",
      browserVersion: "145",
      device: "phone",
    });
    expect(describeAgent(agentOf("Galaxy Tab S4"))).toMatchObject({
      browser: "Chrome",
      device: "tablet",
    });
    expect(describeAgent(agentOf("Desktop Firefox"))).toEqual({
      browser: "Firefox",
      engine: "Gecko",
      browserVersion: "146",
      device: "desktop",
    });
    expect(describeAgent(agentOf("Desktop Edge"))).toMatchObject({
      browser: "Edge",
      engine: "Blink",
    });
    expect(describeAgent(agentOf("Desktop Safari"))).toMatchObject({
      browser: "Safari",
      engine: "WebKit",
      device: "desktop",
    });
    expect(describeAgent("")).toEqual({
      browser: null,
      engine: null,
      browserVersion: null,
      device: null,
    });
  });

  it("ERSN-2 a report holds the cleaned message, our own place, the bare path and the page language; no app version is invented", () => {
    const error = new Error("Read failed for someone@example.com");
    error.stack = [
      "Error: Read failed for someone@example.com",
      "    at chrome-extension://abc/inject.js:1:1",
      "    at http://localhost:3000/assets/feed-x1.js?v=2:42:7",
    ].join("\n");
    const report = buildReport(
      { kind: "notice", code: "500", error },
      {
        agent: agentOf("Pixel 7"),
        pathname: "/l/abc",
        origin: "http://localhost:3000",
        language: "am",
      },
    );
    expect(report).toEqual({
      kind: "notice",
      code: "500",
      message: "Read failed for <email>",
      place: "/assets/feed-x1.js:42",
      path: "/l/abc",
      browser: "Chrome",
      engine: "Blink",
      browserVersion: "145",
      device: "phone",
      language: "am",
      appVersion: null,
    });
    const odd = buildReport(
      { kind: "crash", code: "not a code!", error: "boom" },
      { agent: "", pathname: "/x", origin: "http://localhost:3000", language: "" },
    );
    expect(odd).toMatchObject({ code: null, place: null, language: null, message: "boom" });
    // The sender sends the report unparsed: it holds the route's keys, no more, and fits them.
    for (const built of [report, odd]) {
      expect(Object.keys(built).sort()).toEqual(Object.keys(ErrorReportBody.shape).sort());
      expect(ErrorReportBody.safeParse(built).success).toBe(true);
    }
  });

  it("ERSN-3 a failure is sent once, as the optional caller, by the report route, with the page's path bare", async () => {
    expect(await sendReport({ kind: "crash", code: null, error: new Error("boom") })).toBe(true);
    expect(mocks.callRoute).toHaveBeenCalledTimes(1);
    const [path, init] = mocks.callRoute.mock.calls[0] ?? [];
    expect(path).toBe("/api/error-reports");
    expect(init).toMatchObject({ method: "POST", auth: "optional", keepalive: true });
    expect(init.json).toMatchObject({ kind: "crash", path: "/l/abc", language: "en" });
    expect(Object.keys(init.json).sort()).toEqual(Object.keys(ErrorReportBody.shape).sort());
    expect(ErrorReportBody.safeParse(init.json).success).toBe(true);
    expect(JSON.stringify(init.json)).not.toContain("example.com");
  });

  it("ERSN-4 the same failure goes once per visit, and at most REPORTS_PER_VISIT go in all", async () => {
    const same = () => sendReport({ kind: "notice", code: "500", error: new Error("boom") });
    expect(await same()).toBe(true);
    expect(await same()).toBe(false);
    expect(mocks.callRoute).toHaveBeenCalledTimes(1);
    for (let n = 0; n < REPORTS_PER_VISIT + 3; n += 1)
      await sendReport({ kind: "notice", code: "500", error: new Error(`other ${n}`) });
    expect(mocks.callRoute).toHaveBeenCalledTimes(REPORTS_PER_VISIT);
    newVisit();
    expect(await same()).toBe(true);
  });

  it("ERSN-5 an offline device sends nothing", async () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    expect(await sendReport({ kind: "crash", code: null, error: new Error("boom") })).toBe(false);
    expect(mocks.callRoute).not.toHaveBeenCalled();
  });

  it("ERSN-6 a refused send is warned, an unreachable or throwing one logged, once each as [error-report] send failed, never thrown, never retried", async () => {
    const warned = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.callRoute.mockResolvedValueOnce({
      kind: "answered",
      status: 429,
      ok: false,
      error: "rateLimited",
    });
    mocks.callRoute.mockResolvedValueOnce({ kind: "unreachable", reason: "network" });
    mocks.callRoute.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    for (const n of [1, 2, 3])
      expect(await sendReport({ kind: "crash", code: null, error: new Error(`boom ${n}`) })).toBe(
        false,
      );
    expect(mocks.callRoute).toHaveBeenCalledTimes(3);
    expect(warned.mock.calls.map((call) => call.join(" "))).toEqual([
      "[error-report] send failed 429 rateLimited",
    ]);
    expect(logged.mock.calls.map((call) => call.join(" "))).toEqual([
      "[error-report] send failed unreachable",
      "[error-report] send failed Failed to fetch",
    ]);
  });
});
