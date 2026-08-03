import { expect, test } from "@playwright/test";

import { en } from "../../src/i18n/locales/en";
import { testEmail } from "../global-setup";
import { fillUntilStable, waitForHydration } from "../helpers/ui";

const RUN_ID = process.env["GITHUB_RUN_ID"] ?? "local";

// This case waits out two REAL 60-second cooldowns plus Mailtrap pacing. The
// timeout is raised because the test is genuinely slow by design (real elapsed
// time is the thing under test), NOT to paper over a failure or a flake.
test.setTimeout(300_000);

/** Drives the real sign-up form to the check-email view. Returns the address used. */
async function signUpFresh(page: import("@playwright/test").Page, n: number) {
  const email = testEmail(RUN_ID, n);
  const password = `Pw-${n}-aX9!qmzT`;

  await page.goto("/auth");
  await waitForHydration(page);
  await page.getByRole("button", { name: en["auth.toggleToSignUp"] }).click();

  await fillUntilStable(page.getByRole("textbox", { name: /email/i }), email, "email");
  await fillUntilStable(page.locator("#auth-password"), password, "password");
  await page.getByRole("button", { name: new RegExp(`^${en["auth.signUpButton"]}$`, "i") }).click();

  return email;
}

/**
 * Diagnostic: if sign-up failed, surface the app's own error text instead of a
 * bare "heading not found". Adds no tolerance — a clean run is unaffected.
 */
async function assertNoSignUpError(page: import("@playwright/test").Page) {
  const alertRegion = page.getByRole("alert");
  if (await alertRegion.count()) {
    const alertText = await alertRegion.first().innerText();
    expect(alertText, `sign-up surfaced an error instead of check-email`).toBe("");
  }
}

test("A-3: three resends exhaust the per-visit limit", async ({ page }) => {
  // INC-018: Mailtrap's free sandbox refuses sends issued seconds apart, which
  // surfaces as Supabase 500 "Error sending confirmation email". Environment
  // pacing only — no assertion is relaxed and no retry is added.
  await page.waitForTimeout(15_000);
  await signUpFresh(page, 103);
  await assertNoSignUpError(page);
  await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
    timeout: 15000,
  });

  // Real elapsed time (INC-020): the cooldown countdown does not reach zero under
  // Playwright's virtual clock. 61s, because Supabase enforces ~60s per address
  // server-side and the client cooldown is 60s.
  const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();

  for (let i = 0; i < 3; i += 1) {
    await page.getByRole("button", { name: en["auth.resend"] }).click();
    if (i === 2) break;
    await expect(page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") })).toBeVisible();
    await page.waitForTimeout(61_000);
    await expect(page.getByRole("button", { name: en["auth.resend"] })).toBeEnabled();
  }

  await expect(page.getByText(en["auth.resendLimitReached"])).toBeVisible({ timeout: 15000 });
  // Further attempts are refused: the control stays disabled past the cooldown.
  await page.waitForTimeout(61_000);
  await expect(
    page.getByRole("button", { name: new RegExp(en["auth.resend"], "i") }),
  ).toBeDisabled();
});
