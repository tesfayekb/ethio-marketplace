import { expect, type Locator, type Page } from "@playwright/test";

import { am } from "../../src/i18n/locales/am";
import { en } from "../../src/i18n/locales/en";

import { totp } from "./totp";

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
      // HELPER-WAIT LAW: exhaustion rethrows the NAMED per-attempt assertion
      // error ("<field> fill attempt 5 did not stick" / "was cleared after").
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
  // INC-084g — anchor on the testid, not the accessible name: the menu item
  // carries an icon and renders in the ACTIVE catalog, so an English-literal
  // role lookup goes blind in an Amharic shell (and was the shard-2 red).
  await expect(page.getByTestId("account-menu-sign-out")).toBeVisible({
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
export async function signOutViaMenu(page: Page, labels: { accountMenu?: string } = {}) {
  await openAccountMenu(page, labels.accountMenu ?? en["shell.accountMenu"]);
  await page.getByTestId("account-menu-sign-out").click();
}

/** Viewport branch: below md the rail lives in the Sheet drawer. */
export function isMobile(page: Page) {
  return (page.viewportSize()?.width ?? 1280) < 768;
}

/**
 * U0j-2 — opens the rail's sign-out affordance for THIS viewport and returns
 * the scope it lives in. Strict-mode safe: never a page-wide locator.
 *
 * FLAKE CLASS (2026-08-17): under parallel runners the drawer occasionally did
 * not open on the first click (two isolated mobile reds against 245 passes).
 * The contract is now hydration-gated and owns ONE bounded retry — assertions
 * are never given looser timeouts as a substitute.
 */
export async function openRailScope(page: Page) {
  await waitForHydration(page);
  if (isMobile(page)) {
    // U0j-3 — LOCALE-AGNOSTIC. The hamburger carries no testid (census:
    // app-header.tsx labels it with t("shell.openMenu") only, and that file is
    // outside this task's scope), so match its aria-label against BOTH
    // catalogs — an Amharic shell must reach the same control.
    const hamburger = page.getByRole("button", { name: openMenuPattern() });
    await expect(hamburger, "hamburger never became interactive").toBeEnabled({ timeout: 15000 });

    const drawer = page.getByRole("dialog");
    await hamburger.click();

    try {
      await expect(drawer).toBeVisible({ timeout: 3000 });
    } catch {
      // INC-082 addendum: slowness is NOT failure. If the dialog is MOUNTED it
      // is opening/animating — keep waiting, never re-click (that would toggle
      // it shut). Only a genuinely absent dialog means the click did not take.
      if ((await drawer.count()) > 0) {
        await expect(drawer, "drawer mounted but never became visible after 13s").toBeVisible({
          timeout: 10000,
        });
      } else {
        console.log("[e2e] drawer open retried");
        await hamburger.click();
        await expect(drawer, "drawer did not open after one retry").toBeVisible({ timeout: 10000 });
      }
    }

    // Settled, not merely present: the panel header has rendered its title.
    await expect(drawer.getByTestId("panel-header-title")).not.toHaveText("", { timeout: 10000 });
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

/**
 * U1g — STEP-UP FIXTURE.
 *
 * Every sensitive admin mutation now demands an AAL2 session (U1f), so the
 * legacy specs must enroll a factor and step up before they mutate anything.
 * Enrolls TOTP through Settings (the same steps MF-1 drives) and returns the
 * secret so the caller can answer later gate prompts.
 */
export async function enrollAndStepUp(page: Page): Promise<string> {
  await gotoReady(page, "/settings");
  await page.getByTestId("mfa-enroll").click();
  await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
  const secret = await page.getByTestId("mfa-secret").inputValue();
  expect(secret.length, "TOTP secret was not shown").toBeGreaterThan(10);
  await page.getByTestId("mfa-code").fill(totp(secret));
  await page.getByTestId("mfa-verify").click();
  await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], { timeout: 20000 });
  return secret;
}

/**
 * Answers the StepUpGate modal IF it opened; a no-op when the session is
 * already AAL2. Never weakens an assertion — it only supplies the code the
 * gate asks for.
 */
export async function stepUpIfPrompted(page: Page, secret: string) {
  const modal = page.getByTestId("step-up-modal");
  try {
    await modal.waitFor({ state: "visible", timeout: 5000 });
  } catch {
    // HELPER-WAIT LAW exception, declared: exhaustion here is a legitimate
    // OUTCOME (the session is already AAL2 and no gate opened), not a silent
    // failure — the caller's own assertions cover the mutation that follows.
    return;
  }
  await page.getByTestId("step-up-code").fill(totp(secret));
  await page.getByTestId("step-up-submit").click();
  await expect(modal).toBeHidden({ timeout: 20000 });
  // The client's AAL flips asynchronously after verification — settle on the
  // achieved state, never on the click (U1g-2).
  await expectAal2(page);
}

/**
 * The session actually reached AAL2 (read from the DEV client, not inferred).
 *
 * U1g-2: getAuthenticatorAssuranceLevel() resolves to { data: { currentLevel,
 * nextLevel } } — the previous read destructured currentLevel off the envelope
 * and always saw undefined.
 */
export async function readAal(page: Page) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
  return page.evaluate(async () => {
    const client = (
      window as unknown as {
        __ethioSupabase: {
          auth: {
            mfa: {
              getAuthenticatorAssuranceLevel: () => Promise<{
                data: { currentLevel: string | null } | null;
              }>;
            };
          };
        };
      }
    ).__ethioSupabase;
    const { data } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    return data?.currentLevel ?? null;
  });
}

export async function expectAal2(page: Page) {
  let level: string | null = null;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    level = await readAal(page);
    if (level === "aal2") return;
    await page.waitForTimeout(500);
  }
  expect(
    level,
    `the session did not reach aal2 after 5s of polling (last read: ${level ?? "null"})`,
  ).toBe("aal2");
}

/**
 * U1g-4 (B) — THE ONE language-switching interaction for the whole suite.
 *
 * Census: <LanguageSwitcher> renders a dropdown trigger (`language-switcher`)
 * whose label lives in `language-switcher-short` (below md) or
 * `language-switcher-full` (md and up); each menu item now carries
 * `language-option-<code>`. Anchoring on that testid removes the accessible-name
 * drift (both catalogs spell the endonym "አማርኛ", and the item also contains a
 * tick icon), which is what broke the footer/Sign-out test.
 */
/**
 * U2a / INC-084(c) — RESPONSIVE-TWIN LAW for role rows.
 *
 * DataTable renders BOTH twins and hides one by breakpoint, so a bare
 * getByTestId matches a hidden element and every assertion on it fails. Mirrors
 * userRow: card twin at mobile, table row at desktop; returns the VISIBLE one.
 */
export function roleRow(page: Page, roleName: string) {
  return page.getByTestId(isMobile(page) ? `role-row-${roleName}-card` : `role-row-${roleName}`);
}

/** Same twin rule for user rows (lifted from admin-users.spec.ts). */
export function userRow(page: Page, userId: string) {
  return page.getByTestId(isMobile(page) ? `user-row-${userId}-card` : `user-row-${userId}`);
}

export async function switchLanguage(page: Page, code: "en" | "am") {
  await waitForHydration(page);
  await page.getByTestId("language-switcher").click();
  await page.getByTestId(`language-option-${code}`).click();
  await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
}
