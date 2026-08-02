import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { testEmail } from "./global-setup";
import { fillUntilStable, waitForHydration } from "./helpers/ui";

const RUN_ID = process.env["GITHUB_RUN_ID"] ?? "local";

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

const EMAIL_SINK = process.env["E2E_EMAIL_SINK"] === "1";

test.describe("A: sign-up + resend (needs a recipient-agnostic mail sink)", () => {
  test.skip(
    !EMAIL_SINK,
    "INC-013: ethio-staging SMTP (Resend test domain) rejects non-owner recipients, so real sign-up cannot complete. Set E2E_EMAIL_SINK=1 once staging points at a mail sink.",
  );

  test("A-1: sign-up reaches the check-email view and echoes the address", async ({ page }) => {
    const email = await signUpFresh(page, 101);

    await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
      timeout: 15000,
    });

    const sentTo = en["auth.checkEmailSentTo"].replace("{email}", email);
    await expect(page.getByText(sentTo, { exact: false })).toBeVisible();

    await expect(page.getByRole("button", { name: en["auth.resend"] })).toBeVisible();
  });

  test("A-2: resend throttle engages after one click", async ({ page }) => {
    await signUpFresh(page, 102);
    await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
      timeout: 15000,
    });

    const resend = page.getByRole("button", { name: en["auth.resend"] });
    await resend.click();

    // Cooldown copy replaces the label and the control refuses further clicks.
    const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();
    const throttled = page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") });
    await expect(throttled).toBeVisible({ timeout: 15000 });
    await expect(throttled).toBeDisabled();
  });

  test("A-3: three resends exhaust the per-visit limit", async ({ page }) => {
    // Virtual clock: the 60s cooldown is advanced with fake timers, never a
    // real-clock wait (operator ruling 2026-08-02).
    await page.clock.install();
    await signUpFresh(page, 103);
    await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
      timeout: 15000,
    });

    const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();

    for (let i = 0; i < 3; i += 1) {
      await page.getByRole("button", { name: en["auth.resend"] }).click();
      if (i === 2) break;
      await expect(
        page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") }),
      ).toBeVisible();
      await page.clock.runFor(61_000);
      await expect(page.getByRole("button", { name: en["auth.resend"] })).toBeEnabled();
    }

    await expect(page.getByText(en["auth.resendLimitReached"])).toBeVisible({ timeout: 15000 });
    // Further attempts are refused: the control stays disabled past the cooldown.
    await page.clock.runFor(61_000);
    await expect(
      page.getByRole("button", { name: new RegExp(en["auth.resend"], "i") }),
    ).toBeDisabled();
  });
});
