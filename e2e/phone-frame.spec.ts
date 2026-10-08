import { readFileSync } from "node:fs";
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { adminClient, STATE_FILE, type E2EUser } from "./global-setup";
import { gotoReady, signInViaSession, useJobSuperAdmin } from "./helpers/ui";

async function checkRoutes(page: Page, routes: string[]) {
  for (const route of routes) {
    await gotoReady(page, route);
    const result = await page.evaluate(() => {
      const doc = document.scrollingElement;
      if (!doc) throw new Error("No document scrolling element");
      let right = doc.clientWidth + 1;
      let offender = "none";
      for (const element of document.querySelectorAll("*")) {
        const rect = element.getBoundingClientRect();
        if (rect.right > right) {
          right = rect.right;
          offender = `<${element.tagName.toLowerCase()}> testid=${element.getAttribute("data-testid") ?? "none"} class=${element.getAttribute("class")?.split(" ")[0] ?? "none"} right=${right.toFixed(1)}`;
        }
      }
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offender };
    });
    console.log(
      `[phone-frame] ${route} ${result.scrollWidth}/${result.clientWidth} ${result.offender}`,
    );
    expect
      .soft(result.scrollWidth, `${route}: ${result.offender}`)
      .toBeLessThanOrEqual(result.clientWidth + 1);
  }
}

async function categorySlug() {
  const { data, error } = await adminClient()
    .from("category_tree_pointers")
    .select("category:categories!category_tree_pointers_child_id_fkey!inner(slug, is_active)")
    .is("parent_id", null)
    .eq("category.is_active", true)
    .not("category.slug", "like", "e2e-%")
    .order("id")
    .limit(1)
    .single();
  if (error || !data) throw new Error(`Category anchor: ${error?.message ?? "no row"}`);
  const category = Array.isArray(data.category) ? data.category[0] : data.category;
  if (!category) throw new Error("Category anchor: no joined category");
  return category.slug;
}

test.describe("phone frame sweep", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 400, "mobile-360 only");

  test("signed out routes fit", async ({ page }) => {
    const slug = await categorySlug();
    await checkRoutes(page, ["/", `/c/${slug}`, "/auth"]);
  });

  test("pool user routes fit", async ({ page }) => {
    const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
    await signInViaSession(page, user.email, user.password);
    await checkRoutes(page, ["/settings", "/account", "/post"]);
  });

  test("super admin routes fit", async ({ page }) => {
    const { user } = await useJobSuperAdmin(page);
    const { data, error } = await adminClient()
      .from("roles")
      .select("id")
      .eq("name", "super_admin")
      .single();
    if (error || !data) throw new Error(`Role anchor: ${error?.message ?? "no row"}`);
    await checkRoutes(page, [
      "/admin",
      "/admin/users",
      "/admin/roles",
      "/admin/audit",
      "/admin/locations",
      "/admin/places",
      "/admin/countries",
      "/admin/coverage",
      "/admin/categories",
      "/admin/attributes",
      "/admin/images",
      "/admin/translations",
      "/admin/translations/am",
      `/admin/roles/${data.id}`,
      `/admin/users/${user.id}`,
    ]);
  });

  test("no account fixtures fit", async ({ page }) => {
    await checkRoutes(page, ["/dev/primitives", "/dev/style", "/dev/tall"]);
  });
});
