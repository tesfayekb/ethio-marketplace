import { expect, test } from "@playwright/test";

test.describe("panel-scoped chrome", () => {
  test("CAP-3 a describe-nested failure records its chain", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("definitely-not-here-cap3")).toBeVisible({ timeout: 3000 });
  });
});
