import { expect, type Locator, type Page } from "@playwright/test";

import { am } from "../../src/i18n/locales/am";
import { en } from "../../src/i18n/locales/en";

/** Escape a catalog value for literal use inside a RegExp. */
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * U0j-3 — the hamburger's accessible name in EITHER catalog, so rail helpers
 * work in an Amharic shell too.
 */
export function openMenuPattern() {
  return new RegExp(`^(${escapeRe(en["shell.openMenu"])}|${escapeRe(am["shell.openMenu"])})$`);
}

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

/** Viewport branch: below md the rail lives in the Sheet drawer. */
export function isMobile(page: Page) {
  return (page.viewportSize()?.width ?? 1280) < 768;
}

/**
 * U0j-2 — opens the rail's sign-out affordance for THIS viewport and returns
 * the scope it lives in. Strict-mode safe: never a page-wide locator.
 */
export async function openRailScope(page: Page) {
  await waitForHydration(page);
  if (isMobile(page)) {
    // U0j-3 — LOCALE-AGNOSTIC. The hamburger carries no testid (census:
    // app-header.tsx labels it with t("shell.openMenu") only, and that file is
    // outside this task's scope), so match its aria-label against BOTH
    // catalogs — an Amharic shell must reach the same control.
    await page.getByRole("button", { name: openMenuPattern() }).click();
    const drawer = page.getByRole("dialog");

    await expect(drawer).toBeVisible();
    return drawer;
  }
  const rail = page.getByTestId("app-rail");
  await expect(rail).toBeVisible();
  return rail;
}

/**
 * THE ONE sign-out path for the suite (U0k). ONE CLICK: the affordance itself
 * performs the hard reset — there is no confirmation dialog any more. Resolves
 * only on the achieved state: URL "/", no account menu, sign-in link visible.
 */
export async function signOutViaUi(page: Page, labels: { signIn?: string } = {}) {
  const scope = await openRailScope(page);
  await scope.getByTestId("rail-sign-out").click();

  await page.waitForURL(/\/$/, { timeout: 15000 });
  await expect(page.getByTestId("account-menu")).toHaveCount(0);
  await expect(page.getByRole("link", { name: labels.signIn ?? en["auth.signIn"] })).toBeVisible({
    timeout: 15000,
  });
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
 * Submits credentials and returns; makes NO claim about the outcome — for
 * expected-failure and outcome-agnostic paths. For flows that must END signed
 * in, use signIn.
 */
export async function attemptSignIn(page: Page, email: string, password: string) {
  await page.goto("/auth");
  await waitForHydration(page);

  const emailInput = page.getByRole("textbox", { name: /email/i });
  const passwordInput = page.locator("#auth-password");

  // U0j-2 precondition: a missing sign-in form must fail HERE, not later as a
  // confusing fill timeout.
  await expect(emailInput, "sign-in form did not render on /auth").toBeVisible({ timeout: 15000 });

  await fillUntilStable(emailInput, email, "email");
  await fillUntilStable(passwordInput, password, "password");

  await expect(emailInput).toHaveValue(email);
  await expect(passwordInput).toHaveValue(password);

  // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  await page.getByRole("button", { name: /^sign in$/i }).click();
}

/**
 * Signed out = no account menu anywhere. (Pre-shell this asserted the absence
 * of a header sign-out button; the account menu is that button's successor and
 * only renders on the authenticated branch, so the guarantee is identical.)
 */
export async function expectSignedOut(page: Page) {
  await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
}

/**
 * INC-074 — /auth is NOT a sign-in form for an authenticated session (U0j
 * guard redirects it away), so a second `signIn` while still signed in hangs
 * on the email field until the test times out. CLASS RULE: multi-user E2E
 * never navigates to /auth while signed in — it signs out first, or uses a
 * fresh browser context.
 */
export async function switchUser(page: Page, email: string, password: string) {
  await gotoReady(page, "/");

  // Auth state must be SETTLED before branching — after a navigation/redirect
  // the header renders its auth branch asynchronously; an instantaneous count
  // is a race (INC-074 addendum).
  await page.waitForFunction(
    ([enSignIn, amSignIn]) => {
      const accountMenu = document.querySelector('[data-testid="account-menu"]');
      if (accountMenu && accountMenu.isConnected) return true;
      for (const link of document.querySelectorAll("a")) {
        const text = link.textContent?.trim() ?? "";
        if (text === enSignIn || text === amSignIn) return true;
      }
      return false;
    },
    [en["auth.signIn"], am["auth.signIn"]],
    { timeout: 15000 },
  );

  const signedIn = await page.getByTestId("account-menu").count();
  if (signedIn > 0) {
    await signOutViaUi(page);
  }
  await signIn(page, email, password);
}

