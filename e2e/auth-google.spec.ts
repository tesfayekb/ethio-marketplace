import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { waitForHydration } from "./helpers/ui";

/**
 * P1-d wiring guard.
 *
 * The FIRST hop is ours: signInWithGoogle() navigates to
 * <project>.supabase.co/auth/v1/authorize?provider=google&scopes=... — that URL is
 * built from our code, so it is the only layer our commits can regress, and the only
 * layer a scope-creep guard should watch. The second hop (Supabase → accounts.google.com)
 * is constructed server-side by Supabase, is not interceptable in Playwright (route
 * handlers fire on the request as initiated, not on server-redirect hops), and is
 * covered instead by the manual pre-launch round-trip check (Q-2 ruling).
 *
 * The intercepted request is FULFILLED (204), never aborted, so the click's navigation
 * resolves cleanly and Google is never loaded.
 */
const AUTHORIZE_GLOB = "**/auth/v1/authorize*";

const EXPECTED_SCOPES = ["email", "openid", "profile"];

test("G-1: our authorization request carries only the three intended scopes", async ({ page }) => {
  let authorizeUrl: string | null = null;

  await page.route(AUTHORIZE_GLOB, async (route) => {
    authorizeUrl = route.request().url();
    await route.fulfill({ status: 204, body: "" });
  });

  await page.goto("/auth");
  await waitForHydration(page);

  await page.getByRole("button", { name: en["auth.continueWithGoogle"] }).click();

  await expect.poll(() => authorizeUrl, { timeout: 15000 }).not.toBeNull();

  const url = new URL(authorizeUrl as unknown as string);
  expect(url.pathname.endsWith("/auth/v1/authorize")).toBe(true);
  expect(url.host.endsWith(".supabase.co")).toBe(true);
  expect(url.searchParams.get("provider")).toBe("google");

  const scopes = (url.searchParams.get("scopes") ?? "").split(/[\s+]+/).filter(Boolean);
  // Scope-creep guard: exactly the three intended scopes, nothing more.
  expect(scopes.slice().sort()).toEqual(EXPECTED_SCOPES.slice().sort());

  // The return target is our own callback route, not a third-party destination.
  expect(url.searchParams.get("redirect_to") ?? "").toContain("/auth/callback");
});

test("G-2: the Google button is present in both sign-in and sign-up modes", async ({ page }) => {
  await page.goto("/auth");
  await waitForHydration(page);
  await expect(page.getByRole("button", { name: en["auth.continueWithGoogle"] })).toBeVisible();

  await page.goto("/auth?view=sign-up");
  await waitForHydration(page);
  await expect(page.getByRole("button", { name: en["auth.continueWithGoogle"] })).toBeVisible();
});
