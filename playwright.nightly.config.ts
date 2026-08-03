import { defineConfig, devices } from "@playwright/test";

import base from "./playwright.config";

/**
 * Nightly E2E — cases that need REAL elapsed time (see docs/features/nightly-e2e.md).
 * Same target contract as the per-push suite: local build/dev server against the
 * ethio-staging Supabase project, never ethio-prod.
 */
export default defineConfig({
  ...base,
  testDir: "./e2e/nightly",
  globalSetup: base.globalSetup,
  globalTeardown: base.globalTeardown,
  retries: 0,
  workers: 1,
  projects: [
    {
      name: "nightly-mobile-360",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 } },
    },
  ],
  webServer: base.webServer,
});
