import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expectSignedIn, expectSignedOut, signIn, waitForHydration } from "./helpers/ui";
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
  await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();

  // Correct current password: success feedback.
  await current.fill(user.password);
  await next.fill(newPassword);
  await submit.click();
  await expect(page.getByText(en["settings.passwordChanged"])).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: /sign out/i }).click();
  await expectSignedOut(page);

  // Old password no longer works.
  await signIn(page, user.email, user.password);
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);

  // New password does.
  await signIn(page, user.email, newPassword);
  await expectSignedIn(page, user.displayName);
});
