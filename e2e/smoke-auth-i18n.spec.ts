import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { am } from "../src/i18n/locales/am";
import { STATE_FILE, type E2EUser } from "./global-setup";
import { expectNoHorizontalOverflow, fillUntilStable } from "./helpers/ui";

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
  const signInButton = page.getByRole("button", { name: /^sign in$/i });
  await expect(signInButton).toBeVisible();
  await expect(signInButton).toBeEnabled();
  await expectNoHorizontalOverflow(page);

  // 3. Sign in through the real form.
  //    Cold-start SSR can expose editable inputs before React hydrates them. Wait
  //    for React to attach, then retry each fill until its value remains stable.
  const emailInput = page.getByRole("textbox", { name: /email/i });
  const passwordInput = page.locator("#auth-password");

  await page.waitForFunction(
    () => {
      const input = document.querySelector('input[type="email"]');
      return input && Object.keys(input).some((key) => key.startsWith("__reactProps$"));
    },
    undefined,
    { timeout: 15000 },
  );

  await fillUntilStable(emailInput, user.email, "email");
  await fillUntilStable(passwordInput, user.password, "password");

  // Verify both controlled values together immediately before submit.
  await expect(emailInput).toHaveValue(user.email);
  await expect(passwordInput).toHaveValue(user.password);

  // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  await signInButton.click();

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
