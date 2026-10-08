import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import en from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { gotoReady } from "./helpers/ui";

/**
 * BUNDLE 9 A4 — THE HOUSE-STYLE FIXTURE (/dev/style), both projects.
 * HS-1: no horizontal overflow and the five new badge variants render.
 * HS-2: axe finds no serious or critical violation, light then dark.
 * No account, no seeded row.
 */

const NEW_BADGES = ["success", "warning", "info", "danger", "neutral"] as const;

async function seriousOrCritical(page: Page, mode: string): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  const rules = result.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.impact}:${v.id}×${v.nodes.length}`);
  console.log(`[a11y] dev-style ${mode} ${test.info().project.name} ${rules.join(" ") || "clean"}`);
  expect(rules, `dev-style ${mode}`).toEqual([]);
}

test.describe("house style fixture", () => {
  test("HS-1 no horizontal overflow and the new badges render", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    await expect(page.getByTestId("dev-style")).toBeVisible();
    for (const v of NEW_BADGES) await expect(page.getByTestId(`style-badge-${v}`)).toBeVisible();
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.scrollingElement!.scrollWidth,
      clientWidth: document.scrollingElement!.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test("HS-2 axe is clean in light and in dark mode", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    await expect(page.getByTestId("dev-style")).toBeVisible();
    const html = page.locator("html");
    const before = await html.getAttribute("data-mode");
    await seriousOrCritical(page, before ?? "light");
    await page.getByRole("button", { name: en["shell.themeToggle"] }).click();
    const after = before === "dark" ? "light" : "dark";
    await expect(html).toHaveAttribute("data-mode", after);
    await seriousOrCritical(page, after);
  });
});
