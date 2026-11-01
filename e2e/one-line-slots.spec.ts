import type { Page } from "@playwright/test";

import { listingPath } from "../src/features/ad-page/address";
import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { readSlots, slotFaults } from "./helpers/one-line";
import { MODES, setMode, type Mode } from "./helpers/sage-look";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  openRailScope,
  signIn,
  switchLanguage,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * INC-957 — one line at 360, in every public language and both themes.
 * Latin is the runner's font. Ge'ez is that width times 1.22 (e2e/helpers/one-line.ts).
 * The phone project measures; the desktop project skips, as OLH-1 does.
 */

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-360", "the phone width");
  await page.setViewportSize({ width: 360, height: 800 });
});

async function publicLanguages(page: Page): Promise<string[]> {
  await expect(page.getByRole("menu")).toHaveCount(0);
  await page.getByTestId("language-switcher").click();
  const languages = await page
    .locator('[data-testid^="language-option-"]')
    .evaluateAll((els) =>
      els.map((el) => (el.getAttribute("data-testid") ?? "").replace("language-option-", "")),
    );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toHaveCount(0);
  expect(languages, "the switcher lists the public languages").toContain("en");
  return languages;
}

async function ensureMode(page: Page, mode: Mode) {
  if ((await page.locator("html").getAttribute("data-mode")) === mode) return;
  await setMode(page, mode);
  await page.reload();
  await waitForHydration(page);
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
}

async function expectFits(page: Page, where: string) {
  await expect(page.getByTestId("bottom-bar")).toBeVisible();
  const readings = await page.evaluate(readSlots, true);
  expect(slotFaults(readings), where).toEqual([]);
  await expectNoHorizontalOverflow(page);
}

test("OLS-1 the home heading and the signed-out bar fit in every public language", async ({
  page,
}) => {
  await gotoReady(page, "/");
  const languages = await publicLanguages(page);
  for (const mode of MODES) {
    await ensureMode(page, mode);
    for (const language of languages) {
      await switchLanguage(page, language);
      await expect(page.getByTestId("feed-heading").locator("[data-one-line-fixed]")).toBeVisible();
      await expect(page.getByTestId("bottom-bar").locator("[data-cut-text]")).toHaveCount(3);
      await expectFits(page, `home ${mode} ${language}`);
    }
  }
});

test("OLS-2 a signed-in bar shows the short seller label whole", async ({ page }) => {
  const user = await leaseUser();
  await signIn(page, user.email, user.password);
  await gotoReady(page, "/");
  const languages = await publicLanguages(page);
  for (const mode of MODES) {
    await ensureMode(page, mode);
    for (const language of languages) {
      await switchLanguage(page, language);
      const bar = page.getByTestId("bottom-bar");
      await expect(bar.locator("[data-cut-text]")).toHaveCount(4);
      const words = language === "am" ? am["panel.myListingsShort"] : en["panel.myListingsShort"];
      if (language === "en" || language === "am") {
        await expect(page.getByTestId("bottom-bar-my-listings")).toContainText(words);
      }
      await expectFits(page, `signed-in ${mode} ${language}`);
    }
  }
});

test("OLS-3 an admin's five-item bar shows the short seller label whole", async ({ page }) => {
  const staff = await leaseUser();
  await grantAdmin(staff.id);
  await signIn(page, staff.email, staff.password);
  await gotoReady(page, "/");
  await expect(page.getByTestId("bottom-bar-admin")).toBeVisible();
  const languages = await publicLanguages(page);
  for (const mode of MODES) {
    await ensureMode(page, mode);
    for (const language of languages) {
      await switchLanguage(page, language);
      await expect(page.getByTestId("bottom-bar").locator("[data-cut-text]")).toHaveCount(5);
      if (language === "en" || language === "am") {
        const words = language === "am" ? am["panel.myListingsShort"] : en["panel.myListingsShort"];
        await expect(page.getByTestId("bottom-bar-my-listings")).toContainText(words);
      }
      await expectFits(page, `admin bar ${mode} ${language}`);
    }
  }
});

test("OLS-4 a category heading beside the star stays one line", async ({ page }) => {
  await gotoReady(page, "/");
  const drawer = await openRailScope(page);
  const hrefs = await drawer.locator('a[href^="/c/"]').evaluateAll((els) =>
    els.flatMap((el) => {
      const href = el.getAttribute("href");
      return href === null ? [] : [href];
    }),
  );
  const href = hrefs[0];
  expect(href, "the rail lists a category").toEqual(expect.any(String));
  if (typeof href !== "string") throw new Error("the rail lists a category");
  await gotoReady(page, href);
  await expect(page).toHaveURL(/\/c\//, { timeout: 15000 });
  await expect(page.getByTestId("category-favourite")).toBeVisible();
  const languages = await publicLanguages(page);
  for (const mode of MODES) {
    await ensureMode(page, mode);
    for (const language of languages) {
      await switchLanguage(page, language);
      await expect(page.getByTestId("feed-heading").locator("[data-one-line]")).toBeVisible();
      await expectFits(page, `category ${mode} ${language}`);
    }
  }
});

test("OLS-5 an ad's section tabs, and its ribbon and tier tag when drawn, fit", async ({
  page,
}) => {
  const fixtures = adPageFixtures();
  try {
    const seller = await fixtures.scratchSeller();
    const row = await fixtures.seed(seller, "active", { pin: true });
    const marked = await adminClient()
      .from("listings")
      .update({ tier: "premium" })
      .eq("id", row.id);
    if (marked.error) throw new Error(`[e2e:ols] marking premium failed: ${marked.error.message}`);
    const path = listingPath(row.title, await fixtures.publicIdOf(row.id));
    await gotoReady(page, path);
    await expect(page.getByTestId("listing-section-nav")).toBeVisible({ timeout: 15000 });
    const languages = await publicLanguages(page);
    for (const mode of MODES) {
      await ensureMode(page, mode);
      for (const language of languages) {
        await switchLanguage(page, language);
        await expect(page.getByTestId("listing-detail-tier-tag")).toBeVisible();
        await expectFits(page, `ad ${mode} ${language}`);
      }
    }
  } finally {
    await fixtures.cleanup();
  }
});

async function grantAdmin(userId: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", "admin")
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:ols] role admin not found: ${roleError?.message ?? "none"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:ols] granting admin failed: ${error.message}`);
}
