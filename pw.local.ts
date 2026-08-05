import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "/dev-server/e2e",
  fullyParallel: false, retries: 0, workers: 1, timeout: 60000,
  expect: { timeout: 10000 },
  reporter: [["list"]],
  use: { baseURL: "http://localhost:8080", launchOptions: { executablePath: "/opt/ms-playwright/chromium-1194/chrome-linux/chrome" } },
  projects: [
    { name: "mobile-360", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 } } },
    { name: "desktop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
  ],
});
