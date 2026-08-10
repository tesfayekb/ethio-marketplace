import { expect, type Locator, type Page } from "@playwright/test";

import { en } from "../../src/i18n/locales/en";

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c). */
export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
}

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
  await expect(input, `${fieldName} field is not editable`).toBeEditable();

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    await input.fill("");
    await input.fill(value);

    try {
      await expect(input, `${fieldName} fill attempt ${attempt} did not stick`).toHaveValue(value, {
        timeout: 500,
      });
      await input.page().waitForTimeout(150);
      await expect(input, `${fieldName} was cleared after fill attempt ${attempt}`).toHaveValue(
        value,
        { timeout: 500 },
      );
      return;
    } catch (error) {
      if (attempt === 5) throw error;
      await input.page().waitForTimeout(150);
    }
  }
}

/**
 * Cold-start SSR serves interactive-LOOKING markup before React attaches. A
 * click on that markup lands on a handler-less element and silently does
 * nothing — the failure then surfaces as a timed-out assertion downstream.
 *
 * This is a readiness signal, NOT a retry: it waits for React to have attached
 * props to a real control, which is the moment the page genuinely becomes
 * interactive. The original P1-c version keyed off input[type=email], which
 * only exists on /auth; the shell put interactive chrome on every route, so the
 * probe now accepts any attached control.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(
    () => {
      const controls = document.querySelectorAll("button, input, a[href]");
      return Array.from(controls).some((el) =>
        Object.keys(el).some((key) => key.startsWith("__reactProps$")),
      );
    },
    undefined,
    { timeout: 15000 },
  );
}

/** Navigate and wait for the page to be genuinely interactive. */
export async function gotoReady(page: Page, path: string) {
  await page.goto(path);
  await waitForHydration(page);
}

/**
 * The shell moved the signed-in controls (identity, profile, settings, sign
 * out) into the header account menu. Opening it is now a prerequisite for
 * asserting any of them.
 */
export async function openAccountMenu(page: Page, label: string = en["shell.accountMenu"]) {
  await waitForHydration(page);
  const trigger = page.getByRole("button", { name: label });
  await trigger.waitFor({ state: "visible", timeout: 15000 });
  await trigger.click();
  return trigger;
}

/** Signed-in identity + the sign-out affordance, both inside the account menu. */
export async function expectSignedIn(page: Page, displayName: string) {
  const trigger = await openAccountMenu(page);
  await expect(page.getByRole("menuitem", { name: en["auth.signOut"] })).toBeVisible({
    timeout: 15000,
  });
  // The identity now renders in TWO places (the trigger span and the menu
  // label), so scope the assertion to the opened menu's label — one element,
  // same intent: the signed-in user's identity is shown (INC-032).
  await expect(page.getByTestId("account-menu-identity")).toContainText(displayName);
  // Leave the page as we found it so later interactions are not blocked.
  await page.keyboard.press("Escape");
  await expect(trigger).toBeVisible();
}

/** Sign out through the account menu. `labels` allows the Amharic pass. */
export async function signOutViaMenu(
  page: Page,
  labels: { accountMenu?: string; signOut?: string } = {},
) {
  await openAccountMenu(page, labels.accountMenu ?? en["shell.accountMenu"]);
  await page.getByRole("menuitem", { name: labels.signOut ?? en["auth.signOut"] }).click();
}

/**
 * Drives the real sign-in form and resolves only when the session is
 * established and persisted — callers may navigate immediately.
 *
 * INC-068: the helper used to return on the CLICK, so callers raced the token
 * exchange. It now terminates on the achieved state: the post-sign-in route
 * ("/" — src/routes/auth.tsx navigates there on password success), the header's
 * authenticated-only account menu, and the persisted `sb-<ref>-auth-token`
 * localStorage entry written by @supabase/supabase-js.
 */
export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth");
  await waitForHydration(page);

  const emailInput = page.getByRole("textbox", { name: /email/i });
  const passwordInput = page.locator("#auth-password");

  await fillUntilStable(emailInput, email, "email");
  await fillUntilStable(passwordInput, password, "password");

  await expect(emailInput).toHaveValue(email);
  await expect(passwordInput).toHaveValue(password);

  // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  await page.getByRole("button", { name: /^sign in$/i }).click();

  // 1. The route the auth screen navigates to on password success.
  await page.waitForURL(/\/$/, { timeout: 15000 });
  // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  //    the authenticated branch of app-header (stable testid, no hover/open
  //    prerequisite), unlike the signed-out "Sign in" link whose absence is
  //    also true mid-render.
  await expect(page.getByTestId("account-menu")).toBeVisible({ timeout: 15000 });
  // 3. Belt: the session is persisted, so a full navigation rehydrates it.
  await page.waitForFunction(
    () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
    undefined,
    { timeout: 15000 },
  );
}


/**
 * Signed out = no account menu anywhere. (Pre-shell this asserted the absence
 * of a header sign-out button; the account menu is that button's successor and
 * only renders on the authenticated branch, so the guarantee is identical.)
 */
export async function expectSignedOut(page: Page) {
  await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
}
