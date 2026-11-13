import { describe, expect, it, vi } from "vitest";
import config from "../playwright.config";
import {
  browserVerdict,
  enginesOf,
  httpsErrorFindings,
  type BrowserLookup,
} from "./e2e-browser-guard";

/**
 * DEC-371 (the pictures turn) — scripts/e2e-browser-guard.ts admits Chromium and WebKit only.
 * The lookups are stand-ins: no browser is launched or resolved on this computer.
 */
const MANAGED = {
  chromium: "/ms-playwright/chromium/shell",
  webkit: "/ms-playwright/webkit/pw_run.sh",
};

function lookup(present: string[], override?: string, executable = present): BrowserLookup {
  return {
    chromiumOverride: override,
    managedPath: (engine) => MANAGED[engine],
    exists: (path) => present.includes(path),
    usable: (path) => executable.includes(path),
  };
}

describe("the browser guard admits Chromium and WebKit only (DEC-371)", () => {
  it("EBG-1 the real projects run on chromium and webkit, the WebKit pair on webkit", () => {
    const engines = enginesOf(config.projects ?? []);
    expect([...engines.keys()].sort()).toEqual(["chromium", "webkit"]);
    expect(engines.get("webkit")).toEqual(["webkit-1280", "webkit-390"]);
    expect(engines.get("chromium")).toEqual(["mobile-360", "desktop-1280", "email-serial"]);
  });

  it("EBG-2 both browsers present: nothing fails, both are resolved", () => {
    const engines = enginesOf(config.projects ?? []);
    const verdict = browserVerdict(engines, lookup([MANAGED.chromium, MANAGED.webkit]));
    expect(verdict.failures).toEqual([]);
    expect(verdict.notices).toEqual([]);
    expect(verdict.resolved).toEqual([`chromium ${MANAGED.chromium}`, `webkit ${MANAGED.webkit}`]);
  });

  it("EBG-3 WebKit missing is a notice naming its projects and remedy; Chromium missing fails", () => {
    const engines = enginesOf(config.projects ?? []);
    const noWebkit = browserVerdict(engines, lookup([MANAGED.chromium]));
    expect(noWebkit.failures).toEqual([]);
    expect(noWebkit.notices).toEqual([
      `[e2e:browser-guard] no webkit at ${MANAGED.webkit}: the projects webkit-1280, webkit-390 cannot run here\n` +
        "  remedy: bunx playwright install webkit",
    ]);
    const noChromium = browserVerdict(engines, lookup([MANAGED.webkit]));
    expect(noChromium.failures).toHaveLength(1);
    expect(noChromium.failures[0]).toContain(
      `no usable browser at the resolved path: ${MANAGED.chromium}`,
    );
  });

  it("EBG-4 E2E_CHROMIUM_PATH must exist and be executable", () => {
    const engines = enginesOf([{ name: "mobile-360", use: { defaultBrowserType: "chromium" } }]);
    expect(browserVerdict(engines, lookup(["/bin/chromium"], "/bin/chromium")).failures).toEqual(
      [],
    );
    expect(
      browserVerdict(engines, lookup(["/bin/chromium"], "/bin/chromium", [])).failures,
    ).toHaveLength(1);
  });

  it("EBG-6 only the WebKit projects skip the certificate check, and only on the temporary backend (INC-1125); planted breaches are named", async () => {
    const load = async (localBackend: string) => {
      vi.resetModules();
      vi.stubEnv("E2E_LOCAL_BACKEND", localBackend);
      const loaded = (await import("../playwright.config")).default;
      vi.unstubAllEnvs();
      return loaded;
    };
    const skipping = (c: typeof config) =>
      (c.projects ?? []).filter((p) => p.use?.ignoreHTTPSErrors === true).map((p) => p.name);
    const local = await load("1");
    const staging = await load("");
    expect(skipping(local)).toEqual(["webkit-1280", "webkit-390"]);
    expect(skipping(staging)).toEqual([]);
    expect(httpsErrorFindings(local, true)).toEqual([]);
    expect(httpsErrorFindings(staging, false)).toEqual([]);

    const chromium = {
      name: "planted-chromium",
      use: { defaultBrowserType: "chromium", ignoreHTTPSErrors: true },
    };
    const webkit = {
      name: "planted-webkit",
      use: { defaultBrowserType: "webkit", ignoreHTTPSErrors: true },
    };
    expect(httpsErrorFindings({ projects: [chromium] }, true)).toEqual([
      "[e2e:browser-guard] project planted-chromium (chromium) skips the certificate check; only WebKit may, on the temporary backend (INC-1125)",
    ]);
    expect(httpsErrorFindings({ projects: [webkit] }, true)).toEqual([]);
    expect(httpsErrorFindings({ projects: [webkit] }, false)).toEqual([
      "[e2e:browser-guard] project planted-webkit skips the certificate check off the temporary backend (INC-1125)",
    ]);
    expect(httpsErrorFindings({ use: { ignoreHTTPSErrors: true } }, true)).toHaveLength(1);
  });

  it("EBG-5 a planted project on another engine fails, by name", () => {
    const engines = enginesOf([
      { name: "mobile-360", use: { defaultBrowserType: "chromium" } },
      { name: "planted-firefox", use: { browserName: "firefox" } },
    ]);
    const verdict = browserVerdict(engines, lookup([MANAGED.chromium, MANAGED.webkit]));
    expect(verdict.failures).toEqual([
      "[e2e:browser-guard] project planted-firefox runs on firefox; the harness admits chromium and webkit only (DEC-371)",
    ]);
  });
});
