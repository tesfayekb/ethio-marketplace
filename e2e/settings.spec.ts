import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import {
  attemptSignIn,
  expectSignedIn,
  expectSignedOut,
  signIn,
  signOutViaUi,
  waitForHydration,
} from "./helpers/ui";
import { createUser } from "./helpers/users";

/**
 * Settings surface (P1-f). Google-identity paths are NOT covered here: a linked
 * Google identity cannot be minted headlessly. Those are operator deny tests
 * U-1/U-2/U-3 (see docs/features/settings-surface.md).
 */

test("S-1: unauthenticated /settings lands on /auth", async ({ page }) => {
  await page.goto("/settings");
  await page.waitForURL(/\/auth(\?|$)/, { timeout: 15000 });
  await expectSignedOut(page);
});

test("S-2: settings renders all three sections and guards the only method", async ({ page }) => {
  const user = await createUser({ confirmed: true });
  await signIn(page, user.email, user.password);
  await expectSignedIn(page, user.displayName);

  await page.goto("/settings");
  await waitForHydration(page).catch(() => undefined);

  await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible({
    timeout: 15000,
  });
  await expect(page.getByRole("heading", { name: en["settings.identity"] })).toBeVisible();
  await expect(page.getByRole("heading", { name: en["settings.methods"] })).toBeVisible();
  await expect(page.getByRole("heading", { name: en["settings.security"] })).toBeVisible();

  // The email identity row, with its unlink control disabled (single method).
  await expect(page.getByText(en["settings.providerEmail"], { exact: true })).toBeVisible();
  const unlink = page.getByRole("button", { name: en["settings.unlink"] });
  await expect(unlink).toHaveCount(1);
  await expect(unlink).toBeDisabled();
  await expect(page.getByText(en["settings.lastMethodGuard"]).first()).toBeVisible();
});

test("S-3 (U-4): wrong current password is rejected; correct one rotates the password", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  const newPassword = `${user.password}-rotated`;

  await signIn(page, user.email, user.password);
  await expectSignedIn(page, user.displayName);
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible({
    timeout: 15000,
  });

  const current = page.locator("#current-password");
  const next = page.locator("#new-password");
  const submit = page.getByRole("button", { name: en["settings.changePassword"] });

  // Wrong current password: rejected, alert visible, session intact.
  await current.fill("definitely-not-the-password");
  await next.fill(newPassword);
  await submit.click();
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("alert")).toHaveText(en["auth.errorWrongCurrentPassword"]);
  // Session intact: the header account menu (the shell's authenticated-branch
  // control, successor to the old header sign-out button) is still present.
  await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toBeVisible();

  // Correct current password: success feedback.
  await current.fill(user.password);
  await next.fill(newPassword);
  await submit.click();
  await expect(page.getByText(en["settings.passwordChanged"])).toBeVisible({ timeout: 15000 });

  await signOutViaUi(page);
  await expectSignedOut(page);

  // Old password no longer works.
  await attemptSignIn(page, user.email, user.password);
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);

  // New password does.
  await signIn(page, user.email, newPassword);
  await expectSignedIn(page, user.displayName);
});

/**
 * P1-g truth model (S-4). The password is its own row in the sign-in-methods
 * list, answered by public.has_password(). For a freshly minted email-only user
 * the row must say a password EXISTS, and Remove must be refused — the account
 * has no other door. The disabled control is honesty; the server's
 * remove_own_password() guard is the authority (law F3).
 */
test("S-4: the password renders as its own method and cannot be removed alone", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  await signIn(page, user.email, user.password);
  await expectSignedIn(page, user.displayName);

  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible({
    timeout: 15000,
  });

  const passwordRow = page.getByTestId("password-method");
  await expect(passwordRow).toBeVisible({ timeout: 15000 });
  await expect(passwordRow).toContainText(en["settings.passwordMethod"]);
  await expect(passwordRow).toContainText(en["settings.passwordMethodPresent"]);

  const remove = page.getByRole("button", { name: en["settings.removePassword"] });
  await expect(remove).toHaveCount(1);
  await expect(remove).toBeDisabled();
});
