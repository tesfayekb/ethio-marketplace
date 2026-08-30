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
  // DEC-024 — capacity knob. Shard jobs export E2E_WORKERS=2; the scratch-key
  // identity law (run×shard×worker×project×test) makes worker parallelism safe
  // by construction. REVERT RULE: any cross-worker interference class returns
  // this knob to 1 BEFORE the class is diagnosed. Smoke/email stay serial.
  workers: process.env["E2E_WORKERS"] ? Number(process.env["E2E_WORKERS"]) : 1,
  // U1e: the json reporter is what scripts/e2e-failure-report.ts reads to
  // publish docs/tracking/e2e-last-failure.md (the artifact courier is retired).
  reporter: process.env["CI"]
    ? [["html", { open: "never" }], ["json", { outputFile: "test-results/results.json" }], ["list"]]
    : [["list"]],
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
      // INC-082: email-sending specs belong to `email-serial` ONLY.
      testIgnore: ["**/nightly/**", "**/auth-signup.spec.ts"],
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
        "**/auth-reset.spec.ts",
        "**/auth-google.spec.ts",
        "**/settings.spec.ts",
      ],
    },
    {
      // INC-082 — EMAIL QUOTA PROJECT. The Auth email/signup rate limit is
      // per-project and per-hour: these specs must run in ONE process, one
      // viewport, never sharded and never in the smoke tier. CI runs them as
      // their own small job with --workers=1.
      name: "email-serial",
      testMatch: ["**/auth-signup.spec.ts"],
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 } },
    },
  ],

  // DEC-018 — CI SERVES THE PRODUCTION BUILD (E2E mode).
  // Option B (dev-server mode) is retired for CI: the dev SSR server
  // intermittently failed document requests under 6-way parallel load and
  // served the static error page (INC-085c/d). CI now runs `bun run build:e2e`
  // as its own step and serves dist/ with the VITE_E2E instruments compiled in.
  //
  // DEC-019 / INC-088 — THAT SERVE RUNS ON NODE, NOT ON WORKERD. nitro stamps
  // the built worker's `compatibility_date` with the BUILD DAY, and a pinned
  // `wrangler dev` binary can never support a date newer than its own release
  // day, so the local serve died before the first request. The failure is in
  // the wrangler/workerd runtime class, not in our code, so CI serves the SAME
  // built application through nitro's node-server preset and one nightly
  // "cloudflare parity smoke" job keeps a wrangler-served pass on the deploy
  // runtime.
  //   CI:    bun run serve:e2e:built --port <PORT>   (node dist/server/index.mjs)
  //   local: bun run serve:e2e --port <PORT>          (vite dev, fast loop)
  webServer: process.env["E2E_BASE_URL"]
    ? undefined
    : {
        command:
          process.env["E2E_SERVE_BUILT"] === "cloudflare"
            ? `bun run serve:e2e:built:cloudflare --port ${PORT}`
            : process.env["E2E_SERVE_BUILT"] === "1"
              ? `bun run serve:e2e:built --port ${PORT}`
              : `bun run serve:e2e --port ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env["CI"],
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe",
      },
});
