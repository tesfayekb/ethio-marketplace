import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { STATE_FILE, type E2EUser } from "./global-setup";
import {
  expectNoHorizontalOverflow,
  expectSignedIn,
  fillUntilStable,
  openAccountMenu,
  signOutViaMenu,
  waitForHydration,
} from "./helpers/ui";

test("smoke: sign in, header identity, Amharic switch, 360px overflow, sign out", async ({
  page,
}) => {
  const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;

  // 1. Home renders.
  //    The <h1> is the FEED heading now, not the brand — the shell made the
  //    logo a header link (aria-label = app.name), and at 360 it renders the
  //    mark alone with no wordmark text. Assert the brand by its accessible
  //    name, which holds at every breakpoint, and assert the h1 separately.
  await page.goto("/");
  await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  // 2. /auth always opens in sign-in mode (BUG 2c regression guard).
  await page.goto("/auth");
  const signInButton = page.getByRole("button", { name: /^sign in$/i });
  await expect(signInButton).toBeVisible();
  await expect(signInButton).toBeEnabled();
  await expectNoHorizontalOverflow(page);

  // 3. Sign in through the real form.
  //    Cold-start SSR can expose editable inputs before React hydrates them. Wait
  //    for React to attach, then retry each fill until its value remains stable.
  const emailInput = page.getByRole("textbox", { name: /email/i });
  const passwordInput = page.locator("#auth-password");

  await waitForHydration(page);

  await fillUntilStable(emailInput, user.email, "email");
  await fillUntilStable(passwordInput, user.password, "password");

  // Verify both controlled values together immediately before submit.
  await expect(emailInput).toHaveValue(user.email);
  await expect(passwordInput).toHaveValue(user.password);

  // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  await signInButton.click();

  // 4. The definitive signed-in signal is the header ACCOUNT MENU, which only
  //    renders on the authenticated branch. Identity and sign-out live inside
  //    it now; expectSignedIn opens it and asserts both.
  await expectSignedIn(page, user.displayName);

  // 5. Switch to Amharic — assert against the locale source of truth, not a
  //    literal. The switcher renders in BOTH header and footer, so scope to the
  //    first (the header copy above sm, the footer copy at 360 where the header
  //    one is display:none and therefore out of the a11y tree).
  await page.getByRole("button", { name: am["language.amharic"] }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "am");

  // Sign-out is still reachable, now under the Amharic account-menu label.
  await openAccountMenu(page, am["shell.accountMenu"]);
  await expect(page.getByRole("menuitem", { name: am["auth.signOut"] })).toBeVisible();
  await page.keyboard.press("Escape");
  await expectNoHorizontalOverflow(page);

  // 6. Sign out returns the header to the signed-out state.
  await signOutViaMenu(page, {
    accountMenu: am["shell.accountMenu"],
    signOut: am["auth.signOut"],
  });
  await expect(page.getByRole("link", { name: am["auth.signIn"] })).toBeVisible();
});
