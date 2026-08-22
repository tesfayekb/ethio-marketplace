import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  testMatch: ["**/tmp-capture.spec.ts"],
  outputDir: "test-results",
  reporter: [["json", { outputFile: "test-results/results.json" }], ["list"]],
  timeout: 20000,
  use: {
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath:
        "/nix/store/nw961dvpvik5m19kbay4cg27wxgl3sdv-playwright-chromium-headless-shell/chrome-linux/headless_shell",
    },
  },
  projects: [{ name: "desktop-1280", use: { viewport: { width: 1280, height: 800 } } }],
});
