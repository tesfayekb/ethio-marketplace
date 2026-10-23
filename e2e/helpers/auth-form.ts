import { type Page } from "@playwright/test";

import { en } from "../../src/i18n/locales/en";

import { fillUntilStable, waitForHydration } from "./ui";

/**
 * Bundle 22 turn 32 (K1) — THE ONE SIGN-UP FORM DRIVER. Every spec that makes
 * an account through the real form goes through here: the view toggle, the
 * three fields, the agreement tick (D230; `agree: false` leaves it unticked,
 * so the drawn-closed Create account is tapped into its refusal) and the
 * Create account click. `confirmPassword` defaults to `password`; SU-1 passes
 * a different one to prove the mismatch refusal.
 */
export async function signUpThroughForm(
  page: Page,
  input: { email: string; password: string; confirmPassword?: string; agree?: boolean },
) {
  await page.goto("/auth");
  await waitForHydration(page);
  await page.getByTestId("auth-toggle-view").click();

  await fillUntilStable(page.getByRole("textbox", { name: /email/i }), input.email, "email");
  await fillUntilStable(page.locator("#auth-password"), input.password, "password");
  // Bundle 11 C4 (D143) — sign-up asks for the password twice.
  await fillUntilStable(
    page.locator("#auth-password-confirm"),
    input.confirmPassword ?? input.password,
    "password confirmation",
  );
  if (input.agree !== false) await page.getByTestId("auth-agree-tick").click();
  await page
    .getByRole("button", { name: new RegExp(`^${en["auth.signUpButton"]}$`, "i") })
    .click();
}
