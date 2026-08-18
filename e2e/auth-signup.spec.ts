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

/**
 * Diagnostic: if sign-up failed, surface the app's own error text instead of a
 * bare "heading not found". Waits for whichever surface appears first, so a
 * collision ("already registered") reads as that text in the failure report.
 * Adds no tolerance — a clean run is unaffected.
 */
async function assertNoSignUpError(page: import("@playwright/test").Page) {
  const alertRegion = page.getByRole("alert");
  const heading = page.getByRole("heading", { name: en["auth.checkEmail"] });
  await expect
    .poll(
      async () => {
        if (await heading.count()) return "ok";
        if (await alertRegion.count()) return (await alertRegion.first().innerText()).trim();
        return "pending";
      },
      { timeout: 15000, message: "sign-up surfaced an error instead of check-email" },
    )
    .toBe("ok");
}

const EMAIL_SINK = process.env["E2E_EMAIL_SINK"] === "1";

test.describe("A: sign-up + resend (needs a recipient-agnostic mail sink)", () => {
  test.skip(
    !EMAIL_SINK,
    "INC-013: ethio-staging SMTP (Resend test domain) rejects non-owner recipients, so real sign-up cannot complete. Set E2E_EMAIL_SINK=1 once staging points at a mail sink.",
  );

  /**
   * A-1 + A-2 MERGED (P1-g Step T). They were two sign-ups, and every sign-up
   * costs a real send against the staging sink — the INC-018 pacing that made
   * them slow was itself the evidence that the second send was the problem.
   * One sign-up now carries both assertions: the check-email view (A-1) and the
   * resend throttle on the very next click (A-2). No assertion was dropped.
   */
  test("A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle", async ({
    page,
  }) => {
    const email = await signUpFresh(page, 101);
    await assertNoSignUpError(page);

    // A-1 — the check-email view, echoing the exact address used.
    await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
      timeout: 15000,
    });
    const sentTo = en["auth.checkEmailSentTo"].replace("{email}", email);
    await expect(page.getByText(sentTo, { exact: false })).toBeVisible();

    const resend = page.getByRole("button", { name: en["auth.resend"] });
    await expect(resend).toBeVisible();

    // A-2 — the cooldown engages on the first click (INC-017: on initiation).
    await resend.click();
    const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();
    const throttled = page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") });
    await expect(throttled).toBeVisible({ timeout: 15000 });
    await expect(throttled).toBeDisabled();
  });
});
