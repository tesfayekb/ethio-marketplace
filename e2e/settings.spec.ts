import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { SIGNED_IN_PAGES } from "../src/lib/signed-in-pages";
import {
  attemptSignIn,
  authFields,
  expectSignedIn,
  expectSignedOut,
  signIn,
  signedInMarker,
  signOutViaUi,
  waitForHydration,
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";

/**
 * Settings surface (P1-f). Google-identity paths are NOT covered here: a linked
 * Google identity cannot be minted headlessly. Those are operator deny tests
 * U-1/U-2/U-3 (see docs/features/settings-surface.md).
 */

/**
 * INC-925 (Foundations turn 34w) — every page whose door-step is requireSignedIn sends a signed-out
 * visitor to sign in AND KEEPS THEM THERE: the shell's live guard once evacuated /settings to "/"
 * a moment after /auth, and a test that only waited for /auth passed on the passing frame. The
 * signed-out marker shows in the same render that runs the guard; typing into the email field
 * then proves the sign-in page is the one that stays, and no frame ever showed "/".
 */
for (const path of SIGNED_IN_PAGES) {
  test(`S-1 ${path}: a signed-out visitor is sent to sign in and stays there (INC-923, INC-925)`, async ({
    page,
  }) => {
    const seen: string[] = [];
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) seen.push(new URL(frame.url()).pathname);
    });
    await page.goto(path);
    await page.waitForURL(/\/auth(\?|$)/, { timeout: 15000 });
    await expectSignedOut(page);
    const { email } = authFields(page);
    await email.pressSequentially("door-step@example.test");
    await expect(email).toHaveValue("door-step@example.test");
    const at = new URL(page.url());
    expect(at.pathname).toBe("/auth");
    expect(at.searchParams.get("return")).toBe(path);
    expect(seen, "the visitor never passed through the home page").not.toContain("/");
  });
}

test("S-2: settings renders all three sections and guards the only method", async ({ page }) => {
  const user = await leaseUser();
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
  // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
  await expect(page.getByText(en["settings.lastMethodGuard"]).first()).toBeVisible();
});

test("S-3 (U-4): wrong current password is rejected; correct one rotates the password", async ({
  page,
}) => {
  const user = await leaseUser();
  const newPassword = `${user.password}-rotated`;

  // INC-120 LAW: this test's subject IS the credential (rotation + signed-out
  // assertions), so it signs in through the real UI, never by injection.
  await signIn(page, user.email, user.password, { uiLogin: true });
  await expectSignedIn(page, user.displayName);
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible({
    timeout: 15000,
  });

  const current = page.locator("#current-password");
  const next = page.locator("#new-password");
  const again = page.locator("#new-password-confirm");
  const submit = page.getByRole("button", { name: en["settings.changePassword"] });
  // Bundle 11 C8 (INC-570; G26 — the operator's walk saw nothing happen): every
  // outcome is inside the Change password form, beside its button, and on screen
  // where the button was pressed — not only somewhere on the page.
  const form = page.locator("form").filter({ has: current });

  // Bundle 11 C4 (D143) — the new password typed twice; a mismatch is refused on the form.
  await current.fill(user.password);
  await next.fill(newPassword);
  await again.fill(`${newPassword}x`);
  await submit.click();
  await expect(form.getByRole("alert")).toHaveText(en["auth.errorPasswordMismatch"]);
  await expect(form.getByRole("alert")).toBeInViewport();
  await expect(page.getByRole("alert")).toHaveCount(1);

  // Wrong current password: rejected, alert visible, session intact.
  await current.fill("definitely-not-the-password");
  await next.fill(newPassword);
  await again.fill(newPassword);
  await submit.click();
  await expect(form.getByRole("alert")).toHaveText(en["auth.errorWrongCurrentPassword"], {
    timeout: 15000,
  });
  await expect(form.getByRole("alert")).toBeInViewport();
  await expect(page.getByRole("alert")).toHaveCount(1);
  // Session intact: the header account menu (the shell's authenticated-branch
  // control, successor to the old header sign-out button) is still present.
  await expect(signedInMarker(page)).toBeVisible();

  // Correct current password: success feedback.
  await current.fill(user.password);
  await next.fill(newPassword);
  await again.fill(newPassword);
  await submit.click();
  await expect(form.getByRole("status")).toHaveText(en["settings.passwordChanged"], {
    timeout: 15000,
  });
  await expect(form.getByRole("status")).toBeInViewport();
  await expect(page.getByText(en["settings.passwordChanged"])).toBeVisible();

  await signOutViaUi(page);
  await expectSignedOut(page);

  // Old password no longer works.
  await attemptSignIn(page, user.email, user.password);
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);

  // New password does.
  await signIn(page, user.email, newPassword, { uiLogin: true });
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
  const user = await leaseUser();
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
