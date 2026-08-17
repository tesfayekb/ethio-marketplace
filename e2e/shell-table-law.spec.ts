import { expect, test } from "@playwright/test";

import { gotoReady, switchUser, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * U1b — THE TABLE LAW (INC-075).
 *
 * "admin tables never overflow horizontally": at 360, 768 and 1280 an admin
 * list must fit its viewport, and the DataTable container must not carry an
 * inner horizontal scroll either.
 *
 * Census: playwright.config.ts defines only mobile-360 and desktop-1280
 * projects, so the 768 case sets the viewport in-test.
 */

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:u1b] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u1b] granting ${roleName} failed: ${error.message}`);
}

test.describe("shell table law", () => {
  test("admin tables never overflow horizontally", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);

    const original = page.viewportSize() ?? { width: 1280, height: 800 };

    // (a) 360 — cards, no table, no page-level horizontal scroll.
    await page.setViewportSize({ width: 360, height: 740 });
    await gotoReady(page, "/admin/users");
    await expect(page.getByTestId("data-table-cards")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("table")).toBeHidden();
    await expectFits(page);

    // (b) 768 — the table renders and still fits.
    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForHydration(page);
    await expect(page.locator("table")).toBeVisible({ timeout: 15000 });
    await expectFits(page);

    // (c) 1280 — fits, and the container has no inner horizontal scroll.
    await page.setViewportSize({ width: 1280, height: 800 });
    await waitForHydration(page);
    await expect(page.locator("table")).toBeVisible({ timeout: 15000 });
    await expectFits(page);
    const inner = await page.getByTestId("data-table").evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(inner.scrollWidth, "data-table has an inner horizontal scroll").toBeLessThanOrEqual(
      inner.clientWidth,
    );

    // (d) the long seeded e2e email still fits inside the container.
    const row = page.getByTestId(`user-row-${staff.id}`);
    await expect(row).toBeVisible({ timeout: 15000 });
    const rowBox = (await row.boundingBox())!;
    const containerBox = (await page.getByTestId("data-table").boundingBox())!;
    expect(rowBox.width, "row is wider than its container").toBeLessThanOrEqual(
      containerBox.width + 1,
    );

    await page.setViewportSize(original);
  });
});

/** Page-level no-horizontal-overflow, measured on the scrolling element. */
async function expectFits(page: import("@playwright/test").Page) {
  const measured = await page.evaluate(() => ({
    scrollWidth: (document.scrollingElement ?? document.documentElement).scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    measured.scrollWidth,
    `page scrolls horizontally at ${measured.innerWidth}px`,
  ).toBeLessThanOrEqual(measured.innerWidth);
}
