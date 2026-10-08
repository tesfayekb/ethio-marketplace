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

/* C2g.4 — THE WIDTH WALK: the frame is chosen by the window's width alone. */
const WALK = [320, 360, 390, 430, 600, 767, 768, 834, 1023, 1024, 1280, 1440, 1920];

async function checkFrame(page: Page, width: number) {
  const at = `${width}px`;
  const overflow = await page.evaluate(() => {
    const doc = document.scrollingElement!;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect.soft(overflow, `${at}: horizontal overflow`).toBeLessThanOrEqual(1);
  const topbar = page.getByTestId("shell-topbar");
  await expect(topbar, `${at}: top bar`).toBeVisible();
  const menuButton = topbar.getByRole("button", { name: /Open menu|Close menu/ });
  const toggle = page.getByTestId("rail-collapse-toggle");
  if (width < 1024) {
    await expect(menuButton, `${at}: menu control`).toBeVisible();
    await expect(toggle, `${at}: no collapse toggle`).toBeHidden();
  } else {
    await expect(toggle, `${at}: collapse toggle`).toBeVisible();
    await expect(menuButton, `${at}: no menu control`).toBeHidden();
  }
  if (width < 768) {
    await expect(page.getByTestId("bottom-bar"), `${at}: bar`).toBeVisible();
    await expect(page.getByTestId("rail-strip"), `${at}: strip`).toBeVisible();
    await expect(page.getByTestId("app-rail"), `${at}: no rail`).toBeHidden();
  } else {
    await expect(page.getByTestId("app-rail"), `${at}: rail`).toBeVisible();
    await expect(page.getByTestId("bottom-bar"), `${at}: no bar`).toBeHidden();
    await expect(page.getByTestId("rail-strip"), `${at}: no strip`).toBeHidden();
    if (width < 1024) {
      const box = (await page.getByTestId("app-rail").boundingBox())!;
      expect(Math.abs(box.width - 64), `${at}: rail width`).toBeLessThanOrEqual(1);
    }
  }
  if (width < 1024) {
    const short = await page.evaluate(() => {
      const scopes = ['[data-testid="shell-topbar"]', '[data-testid="bottom-bar"]'];
      const out: string[] = [];
      for (const scope of scopes) {
        for (const el of document.querySelectorAll<HTMLElement>(
          `${scope} a, ${scope} button, ${scope} input`,
        )) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.height < 44)
            out.push(`${el.getAttribute("data-testid") ?? el.tagName}:${r.height}`);
        }
      }
      return out;
    });
    expect.soft(short, `${at}: controls under 44px`).toEqual([]);
    await menuButton.click();
    await expect(page.getByTestId("rail-menu"), `${at}: menu opens`).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("rail-menu"), `${at}: menu closes`).toBeHidden();
  }
}

test.describe("width walk (C2g.4)", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "desktop-1280 only");

  test("signed out home at every width", async ({ page }) => {
    for (const width of WALK) {
      await page.setViewportSize({ width, height: 800 });
      await gotoReady(page, "/");
      await checkFrame(page, width);
    }
  });

  test("admin categories at every width", async ({ page }) => {
    await useJobSuperAdmin(page);
    for (const width of WALK) {
      await page.setViewportSize({ width, height: 800 });
      await gotoReady(page, "/admin/categories");
      await checkFrame(page, width);
    }
  });

  test("account and post at every width", async ({ page }) => {
    const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
    await signInViaSession(page, user.email, user.password);
    for (const path of ["/account", "/post"]) {
      for (const width of WALK) {
        await page.setViewportSize({ width, height: 800 });
        await gotoReady(page, path);
        await checkFrame(page, width);
      }
    }
  });

  test("one session resized through every width without a reload", async ({ page }) => {
    const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    for (const width of WALK) {
      await page.setViewportSize({ width, height: 800 });
      await checkFrame(page, width);
    }
  });
});
