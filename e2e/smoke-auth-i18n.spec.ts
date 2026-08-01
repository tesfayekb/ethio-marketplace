import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { am } from "../src/i18n/locales/am";
import { STATE_FILE, type E2EUser } from "./global-setup";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
}

test("smoke: sign in, header identity, Amharic switch, 360px overflow, sign out", async ({
  page,
}) => {
  const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;

  // 1. Home renders.
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ethio.com");
  await expectNoHorizontalOverflow(page);

  // 2. /auth always opens in sign-in mode (BUG 2c regression guard).
  await page.goto("/auth");
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  // 3. Sign in through the real form.
  await page.getByLabel(/email/i).fill(user.email);
  await page
    .getByLabel(/password/i, { exact: false })
    .first()
    .fill(user.password);
  await page.getByRole("button", { name: /^sign in$/i }).click();

  // 4. Wait for the definitive signed-in signal before asserting identity.
  //    The Sign out button only renders in the signed-in header branch, so its
  //    visibility gates the submit-vs-assert race (no arbitrary sleeps).
  const signOutButton = page.getByRole("button", { name: /sign out/i });
  await signOutButton.waitFor({ state: "visible", timeout: 15000 });
  await expect(signOutButton).toBeVisible();

  // Then the display name, which the signed-in header renders alongside it.
  await expect(page.getByText(user.displayName, { exact: false })).toBeVisible();

  // 5. Switch to Amharic — assert against the locale source of truth, not a literal.
  await page.getByRole("button", { name: am["language.amharic"] }).click();
  await expect(page.getByRole("button", { name: am["auth.signOut"] })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  await expectNoHorizontalOverflow(page);

  // 6. Sign out returns the header to the signed-out state.
  await page.getByRole("button", { name: am["auth.signOut"] }).click();
  await expect(page.getByRole("link", { name: am["auth.signIn"] })).toBeVisible();
});
