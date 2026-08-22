import { expect, test } from "@playwright/test";

test("CAP-1 a missing testid fails with a locator error", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await expect(page.locator("body")).toContainText(
    "sb-abcdef-auth-token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.c2lnbmF0dXJl",
    { timeout: 3000 },
  );
});

test("CAP-2 a test-level timeout records no failed step", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await page.waitForTimeout(30000);
});
