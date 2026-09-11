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
 */
import { accessSync, constants, existsSync } from "node:fs";
import { chromium } from "playwright";

const override = process.env["E2E_CHROMIUM_PATH"];
const resolved = override ?? chromium.executablePath();

function usable(path: string): boolean {
  try {
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

if (!existsSync(resolved) || (override !== undefined && !usable(resolved))) {
  console.error(
    `[e2e:browser-guard] no usable browser at the resolved path: ${resolved}\n` +
      `  remedy 1: bunx playwright install chromium   (installs the Playwright-managed shell)\n` +
      `  remedy 2: E2E_CHROMIUM_PATH=<absolute path to a Chromium/Chrome binary>`,
  );
  process.exit(1);
}

console.log(`[e2e:browser-guard] browser resolved: ${resolved}`);
