import { defineConfig, devices } from "@playwright/test";

/**
 * E2E harness — frozen approach per docs/decisions/e2e-testing-investigation.md.
 * Target: a fresh production build served locally, talking to the ethio-staging
 * Supabase project. Never the live published app, never ethio-prod.
 */
const PORT = Number(process.env["E2E_PORT"] ?? 4173);
const BASE_URL = process.env["E2E_BASE_URL"] ?? `http://localhost:${PORT}`;

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
    },
    {
      name: "desktop-1280",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: process.env["E2E_BASE_URL"]
    ? undefined
    : {
        command: `bun run preview --port ${PORT} --strictPort`,
        url: BASE_URL,
        reuseExistingServer: !process.env["CI"],
        timeout: 120_000,
      },
});
