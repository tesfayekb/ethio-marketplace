/**
 * ACT-C3-2 — e2e:local VERIFIES THE BROWSER BEFORE IT BUILDS.
 *
 * Three local runs in two days (INC-174 reproduction, INC-187 part 2,
 * C3-UX-5) found the executor image without the Playwright-managed Chromium
 * shell and needed `E2E_CHROMIUM_PATH=/bin/chromium` by hand — and the failure
 * surfaced only AFTER `vite build`, as a launch error. DEC-023's proof is only
 * as reliable as that runtime, so the local lane now resolves the browser
 * EXACTLY as playwright.config.ts does and fails fast with the remedy:
 *
 *   - `E2E_CHROMIUM_PATH` set  → that path must exist and be executable;
 *   - otherwise                → `chromium.executablePath()` must exist.
 *
 * On failure the guard prints the resolved path and both remedies and exits 1
 * before anything is built. No launch, no install, no network, no side effects
 * — an existence + executable-bit check is the whole test.
 *
 * DEC-371 (the pictures turn) — the projects name two engines, Chromium and
 * WebKit (webkit-1280, webkit-390), and the guard admits those two only: a
 * project on any other engine fails it. Chromium stays required. The guard
 * cannot see which projects a run asks for (e2e:local hands its arguments to
 * Playwright alone), so a WebKit the computer lacks is a notice with its
 * remedy, never a failure: a Chromium-only run needs no WebKit.
 */
import { accessSync, constants, existsSync } from "node:fs";
import { chromium, webkit } from "playwright";
import config from "../playwright.config";

export const ADMITTED_ENGINES = ["chromium", "webkit"] as const;
export type Engine = (typeof ADMITTED_ENGINES)[number];

type ProjectShape = {
  name?: string;
  use?: { browserName?: string; defaultBrowserType?: string };
};

/** Each engine the projects run on, with the projects that name it. */
export function enginesOf(projects: readonly ProjectShape[]): Map<string, string[]> {
  const engines = new Map<string, string[]>();
  for (const project of projects) {
    const engine = project.use?.browserName ?? project.use?.defaultBrowserType ?? "chromium";
    engines.set(engine, [...(engines.get(engine) ?? []), project.name ?? "(unnamed)"]);
  }
  return engines;
}

function isAdmitted(engine: string): engine is Engine {
  return ADMITTED_ENGINES.some((admitted) => admitted === engine);
}

export type BrowserLookup = {
  /** `E2E_CHROMIUM_PATH`, when set. */
  chromiumOverride: string | undefined;
  /** The Playwright-managed binary of an engine. */
  managedPath: (engine: Engine) => string;
  exists: (path: string) => boolean;
  usable: (path: string) => boolean;
};

export type BrowserVerdict = { failures: string[]; notices: string[]; resolved: string[] };

/** The guard's verdict over the projects' engines; a failure stops e2e:local. */
export function browserVerdict(
  engines: ReadonlyMap<string, readonly string[]>,
  lookup: BrowserLookup,
): BrowserVerdict {
  const verdict: BrowserVerdict = { failures: [], notices: [], resolved: [] };
  for (const [engine, projects] of engines) {
    const named = projects.join(", ");
    if (!isAdmitted(engine)) {
      verdict.failures.push(
        `[e2e:browser-guard] project ${named} runs on ${engine}; the harness admits ${ADMITTED_ENGINES.join(" and ")} only (DEC-371)`,
      );
      continue;
    }
    if (engine === "chromium") {
      const override = lookup.chromiumOverride;
      const path = override ?? lookup.managedPath("chromium");
      if (!lookup.exists(path) || (override !== undefined && !lookup.usable(path))) {
        verdict.failures.push(
          `[e2e:browser-guard] no usable browser at the resolved path: ${path}\n` +
            `  remedy 1: bunx playwright install chromium   (installs the Playwright-managed shell)\n` +
            `  remedy 2: E2E_CHROMIUM_PATH=<absolute path to a Chromium/Chrome binary>`,
        );
      } else verdict.resolved.push(`chromium ${path}`);
      continue;
    }
    const path = lookup.managedPath(engine);
    if (lookup.exists(path)) verdict.resolved.push(`${engine} ${path}`);
    else
      verdict.notices.push(
        `[e2e:browser-guard] no ${engine} at ${path}: the projects ${named} cannot run here\n` +
          `  remedy: bunx playwright install ${engine}`,
      );
  }
  return verdict;
}

function usable(path: string): boolean {
  try {
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

if (import.meta.main) {
  const verdict = browserVerdict(enginesOf(config.projects ?? []), {
    chromiumOverride: process.env["E2E_CHROMIUM_PATH"],
    managedPath: (engine) => (engine === "webkit" ? webkit : chromium).executablePath(),
    exists: existsSync,
    usable,
  });
  for (const notice of verdict.notices) console.log(notice);
  if (verdict.failures.length > 0) {
    for (const failure of verdict.failures) console.error(failure);
    process.exit(1);
  }
  console.log(`[e2e:browser-guard] browser resolved: ${verdict.resolved.join("; ")}`);
}
