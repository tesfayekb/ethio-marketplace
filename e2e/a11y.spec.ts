import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { createUser } from "./helpers/users";
import {
  destroyListingsOf,
  destroyPostableCategory,
  seedPostableCategory,
} from "./helpers/posting";

/**
 * DEC-084 — THE ACCESSIBILITY PASS (smoke tier, NON-GATING this turn).
 *
 * axe-core runs on the marketplace home, /auth, and wizard steps 1, 3 and 5 for
 * a scratch seller, at both projects. The test NEVER fails on a violation: it
 * writes the serious/critical counts to its annotations and to the console as
 * `[a11y] <page> <project> serious=<n> critical=<n>`, which the reporter reads
 * into its "Accessibility" line. The public listing page and the seller
 * storefront join the roster in the turn that builds each of them.
 *
 * axe is imported HERE only — the test runner, never the app bundle.
 */

async function audit(page: Page, name: string): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  const count = (impact: string) => result.violations.filter((v) => v.impact === impact).length;
  const serious = count("serious");
  const critical = count("critical");
  const project = test.info().project.name;
  const line = `[a11y] ${name} ${project} serious=${serious} critical=${critical}`;
  console.log(line);
  const rules = result.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.impact}:${v.id}×${v.nodes.length}`)
    .join(" ");
  if (rules) console.log(`[a11y-rules] ${name} ${project} ${rules}`);
  test.info().annotations.push({ type: "a11y", description: `${line}${rules ? ` ${rules}` : ""}` });
}

test.describe("A11Y SMOKE (DEC-084, non-gating)", () => {
  const sellers: string[] = [];
  const categories: string[] = [];

  test.afterEach(async () => {
    // J3 — cleanup survives a body timeout; each destroy throws on failure.
    for (const id of sellers.splice(0)) await destroyListingsOf(id);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  test("A11Y-1 marketplace home and sign-in @a11y", async ({ page }) => {
    await gotoReady(page, "/");
    await audit(page, "home");
    await gotoReady(page, "/auth");
    await audit(page, "auth");
  });

  test("A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y", async ({ page }) => {
    // DEC-068 — the residency fact arrives as the edge sends it (see PW asEdge).
    for (const path of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(path, async (route) => {
        await route.fallback({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
    const user = await createUser({ confirmed: true });
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    const leaf = await seedPostableCategory();
    categories.push(leaf.slug);

    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await audit(page, "wizard-1");

    await page.getByTestId("post-category-search").fill(leaf.slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${leaf.id}"]`);
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await audit(page, "wizard-3");

    // D39 order: 3 → 2 (photos) → 4 (details) → 5 (price).
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e a11y listing title");
    await page.getByTestId("post-description").fill("e2e a11y listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await audit(page, "wizard-5");
  });
});
