import { readFileSync } from "node:fs";

import { expect, test } from "./fixtures";
import { STATE_FILE, type E2EUser } from "./global-setup";
import { layoutOf } from "./helpers/layout";
import { gotoReady, openPanel, signInViaSession } from "./helpers/ui";

async function signInPoolUser(page: import("@playwright/test").Page) {
  const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
  await signInViaSession(page, user.email, user.password);
}

async function contentRatio(page: import("@playwright/test").Page, testid: string) {
  return page
    .getByTestId(testid)
    .evaluate((node) => node.getBoundingClientRect().width / innerWidth);
}

test(
  "LY-1 wide pages use most of the desktop content width",
  { tag: "@webkit" },
  async ({ page }) => {
    test.skip(layoutOf(page) !== "desktop", "the desktop layout only");
    await signInPoolUser(page);
    for (const [path, testid] of [
      ["/settings", "settings-page-shell"],
      ["/account", "account-page-shell"],
      ["/post", "post-page-shell"],
    ] as const) {
      await gotoReady(page, path);
      await expect(page.getByTestId(testid)).toBeVisible();
      expect(
        await contentRatio(page, testid),
        `LY-1: ${path} is still a slim page`,
      ).toBeGreaterThanOrEqual(0.6);
    }
  },
);

test("LY-2 mobile pages do not overflow", { tag: "@webkit" }, async ({ page }) => {
  test.skip(layoutOf(page) !== "mobile", "the phone layout only");
  await signInPoolUser(page);
  for (const path of ["/settings", "/account", "/post"]) {
    await gotoReady(page, path);
    await expect
      .poll(
        () =>
          page.evaluate(
            () =>
              (document.scrollingElement?.scrollWidth ?? 0) <=
              (document.scrollingElement?.clientWidth ?? 0),
          ),
        { message: `LY-2: ${path} overflowed the phone's width` },
      )
      .toBe(true);
  }
});

test("LY-3 wizard actions are sticky only below md", { tag: "@webkit" }, async ({ page }) => {
  await signInPoolUser(page);
  await gotoReady(page, "/post");
  const actions = page.getByTestId("form-layout-actions");
  await expect(actions).toBeVisible();
  const position = await actions.evaluate((node) => getComputedStyle(node).position);
  expect(position).toBe(layoutOf(page) === "mobile" ? "sticky" : "static");
});

test("LY-4 wizard aside is desktop-only", { tag: "@webkit" }, async ({ page }) => {
  await signInPoolUser(page);
  await gotoReady(page, "/post");
  const aside = page.getByTestId("post-desktop-aside");
  if (layoutOf(page) === "mobile") await expect(aside).toBeHidden();
  else await expect(aside).toBeVisible();
});

test("LY-5 Account tab opens the overview and profile card", async ({ page }) => {
  await signInPoolUser(page);
  await gotoReady(page, "/");
  await openPanel(page, "account");
  await page.waitForURL(/\/account$/);
  await expect(page.getByTestId("account-profile-card")).toBeVisible();
});
