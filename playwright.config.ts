import { defineConfig, devices } from "@playwright/test";

/**
 * E2E harness — frozen approach per docs/decisions/e2e-testing-investigation.md.
 * Target: a fresh production build served locally, talking to the ethio-staging
 * Supabase project. Never the live published app, never ethio-prod.
 */
const PORT = Number(process.env["E2E_PORT"] ?? 4173);
const BASE_URL = process.env["E2E_BASE_URL"] ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  fullyParallel: false,
  forbidOnly: !!process.env["CI"],
  // Acceptance measurement requires retries: 0 (pass bar, §6 of the report).
  retries: 0,
  workers: 1,
  reporter: process.env["CI"] ? [["html", { open: "never" }], ["list"]] : [["list"]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-360",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 } },
      // Nightly specs need real elapsed time; they never run per push (INC-020).
      testIgnore: ["**/nightly/**"],
    },
    {
      name: "desktop-1280",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
      // Operator ruling (2026-08-02): auth logic/error cases run on mobile-360
      // only; the smoke spec keeps both viewports.
      testIgnore: [
        "**/nightly/**",
        "**/auth-signup.spec.ts",
        "**/auth-signin-errors.spec.ts",
        "**/auth-callback.spec.ts",
        "**/auth-google.spec.ts",
        "**/settings.spec.ts",
      ],
    },
  ],
  // Option B (evidence-based): CI serves the app with the Vite dev server.
  // The Cloudflare-worker production bundle does not reproduce in the GitHub
  // runner (dist/server/wrangler.json is absent there), so wrangler can never
  // start. Dev mode serves the same SSR app and exercises routing, i18n, auth
  // and UI faithfully; production-bundle behaviour is covered by the separate
  // post-deploy staging smoke check.
  webServer: process.env["E2E_BASE_URL"]
    ? undefined
    : {
        command: `bun run serve:e2e --port ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env["CI"],
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe",
      },
});
