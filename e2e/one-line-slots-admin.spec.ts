import type { Page } from "@playwright/test";

import { ADMIN_SECTIONS } from "../src/features/admin/sections";

import { expect, test } from "./fixtures";
import { readAdminSlots, slotFaults } from "./helpers/one-line";
import { MODES, setMode, type Mode } from "./helpers/sage-look";
import { sessionsIn } from "./helpers/session";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  signIn,
  switchLanguage,
  waitForHydration,
  consumeAccountLanguage,
  watchAccountLanguage,
} from "./helpers/ui";
import { grantRole, leaseUser } from "./helpers/users";

/**
 * INC-957 — admin tables at 360. One line, the ellipsis allowed, the box inside
 * the screen or the table's own scroller. The bottom bar's labels stay fit-whole.
 * Three routes a test, so each stays inside the suite's timeout.
 */

const PATHS = ADMIN_SECTIONS.map((section) => section.path);

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
  // D239 — the reload's account read replaces a pick made while it is in flight.
  const signedIn = (await sessionsIn(page)).length > 0;
  const account = signedIn ? watchAccountLanguage(page) : Promise.resolve();
  await page.reload();
  await waitForHydration(page);
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
  await account;
}

async function walk(page: Page, paths: string[]) {
  const staff = await leaseUser();
  // The admin role's seed does not hold every section (translations, legal,
  // services). A fresh backend then sends those paths back to the landing
  // notice. super_admin is the staff fixture the other admin specs use.
  await grantRole(staff.id, "super_admin");
  await signIn(page, staff.email, staff.password);
  await consumeAccountLanguage(page);
  let languages: string[] = [];
  for (const path of paths) {
    const account = watchAccountLanguage(page);
    await gotoReady(page, path);
    await expect(page.getByTestId("admin-access-notice")).toHaveCount(0);
    await account;
    if (languages.length === 0) languages = await publicLanguages(page);
    for (const mode of MODES) {
      await ensureMode(page, mode);
      for (const language of languages) {
        await switchLanguage(page, language);
        const measured = await page.evaluate(readAdminSlots);
        expect(slotFaults(measured), `${path} ${mode} ${language}`).toEqual([]);
        await expectNoHorizontalOverflow(page);
      }
    }
  }
}

test("OLS-6 the first admin tables stay one line", async ({ page }) => {
  await walk(page, PATHS.slice(0, 3));
});

test("OLS-7 the second admin tables stay one line", async ({ page }) => {
  await walk(page, PATHS.slice(3, 6));
});

test("OLS-8 the third admin tables stay one line", async ({ page }) => {
  await walk(page, PATHS.slice(6, 9));
});

test("OLS-9 the fourth admin tables stay one line", async ({ page }) => {
  await walk(page, PATHS.slice(9, 12));
});

test("OLS-10 the remaining admin tables stay one line", async ({ page }) => {
  await walk(page, PATHS.slice(12));
});
