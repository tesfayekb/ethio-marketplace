import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expectSignedIn, expectSignedOut, signIn, waitForHydration } from "./helpers/ui";
import { createUser, identityProviders, mintRecoveryLink } from "./helpers/users";

/**
 * P1-g — password recovery (the email door's fourth leg) and the enumeration
 * guard on the request form.
 *
 * These cases do NOT depend on a mail sink: the recovery link is minted through
 * the admin API exactly as the callback spec mints confirmation links, so no
 * message is ever sent. R-2 asserts the neutral-always answer (ruling R4), which
 * is the B-3 enumeration guard applied to the recovery entry point.
 */

test("R-1: the sign-in view offers recovery and reaches the request form", async ({ page }) => {
  await page.goto("/auth");
  await waitForHydration(page);

  await page.getByRole("button", { name: en["auth.forgotPassword"] }).click();

  await expect(page.getByRole("heading", { name: en["auth.resetTitle"] })).toBeVisible();
  await expect(page).toHaveURL(/view=forgot/);
});

test("R-2: the reset request answers identically for a real and an unknown address", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  const unknown = `e2e+p1g-nobody-${Date.now()}@ethio-e2e.invalid`;

  const answers: string[] = [];
  for (const address of [user.email, unknown]) {
    await page.goto("/auth?view=forgot");
    await waitForHydration(page);
    await page.locator("#reset-email").fill(address);
    await page.getByRole("button", { name: en["auth.resetSend"] }).click();

    const status = page.getByRole("status");
    await expect(status).toBeVisible({ timeout: 15000 });
    answers.push((await status.innerText()).trim());
  }

  // B-3: the two answers must be indistinguishable, and neutral in wording.
  expect(answers[0]).toBe(en["auth.resetNeutral"]);
  expect(answers[1]).toBe(answers[0]);
});

test("R-3: a recovery link sets a new password, and the old one stops working", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  const newPassword = `${user.password}-recovered`;

  const link = await mintRecoveryLink(user.email);
  await page.goto(link);
  await page.waitForURL(/\/auth\/reset/, { timeout: 20000 });

  await expect(page.getByRole("heading", { name: en["auth.resetNewTitle"] })).toBeVisible({
    timeout: 20000,
  });

  await page.locator("#reset-password").fill(newPassword);
  await page.getByRole("button", { name: en["auth.resetSubmit"] }).click();
  await expect(page.getByText(en["auth.resetDone"])).toBeVisible({ timeout: 20000 });

  await page.getByRole("button", { name: en["auth.continue"] }).click();
  await page.getByRole("button", { name: /^sign out$/i }).click();
  await expectSignedOut(page);

  // The old password is dead.
  await signIn(page, user.email, user.password);
  await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);

  // The new one works.
  await signIn(page, user.email, newPassword);
  await expectSignedIn(page, user.displayName);
});

test("R-4: recovery leaves an email identity in place (truth-model read-back)", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  const newPassword = `${user.password}-recovered2`;

  const link = await mintRecoveryLink(user.email);
  await page.goto(link);
  await page.waitForURL(/\/auth\/reset/, { timeout: 20000 });
  await page.locator("#reset-password").fill(newPassword);
  await page.getByRole("button", { name: en["auth.resetSubmit"] }).click();
  await expect(page.getByText(en["auth.resetDone"])).toBeVisible({ timeout: 20000 });

  // The settings surface claims a password exists; the admin API is the check.
  const providers = await identityProviders(user.id);
  expect(providers).toContain("email");

  await page.goto("/settings");
  await expect(page.getByTestId("password-method")).toContainText(
    en["settings.passwordMethodPresent"],
    { timeout: 20000 },
  );
});

test("R-5: a reset URL with no recovery session says so instead of showing a form", async ({
  page,
}) => {
  await page.goto("/auth/reset");
  await expect(page.getByRole("heading", { name: en["auth.resetLinkInvalid"] })).toBeVisible({
    timeout: 20000,
  });
  await expect(page.locator("#reset-password")).toHaveCount(0);
});

/**
 * R-4 (INC-025) — the resubmit throttle. One submit engages the shared 60s
 * cooldown on INITIATION, so the control is refused for the rest of the window.
 * No real-clock wait and no mail send: the address is unknown to the project, so
 * GoTrue issues no message, and the neutral answer is identical either way (R4).
 */
test("R-4: the reset request is throttled after one submit", async ({ page }) => {
  await page.goto("/auth?view=forgot");
  await waitForHydration(page);

  const submit = page.getByRole("button", { name: en["auth.resetSend"] });
  await page.locator("#reset-email").fill(`e2e+p1h-throttle-${Date.now()}@ethio-e2e.invalid`);
  await submit.click();

  // Neutral answer unchanged...
  await expect(page.getByRole("status")).toHaveText(en["auth.resetNeutral"], { timeout: 15000 });

  // ...and the cooldown affordance is showing, with the control disabled.
  const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();
  const cooling = page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") });
  await expect(cooling).toBeVisible();
  await expect(cooling).toBeDisabled();
});
