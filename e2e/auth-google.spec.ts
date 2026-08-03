import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { waitForHydration } from "./helpers/ui";

/**
 * P1-d wiring guard. A real Google round-trip cannot run in CI, so the
 * authorization request is intercepted and aborted — Google is never loaded.
 */
const GOOGLE_AUTH_GLOB = "https://accounts.google.com/**";

const EXPECTED_SCOPES = ["email", "profile", "openid"];

test("G-1: the Google authorization request carries only the three intended scopes", async ({
  page,
}) => {
  let authorizationUrl: string | null = null;

  await page.route(GOOGLE_AUTH_GLOB, async (route) => {
    authorizationUrl = route.request().url();
    await route.abort();
  });

  await page.goto("/auth");
  await waitForHydration(page);

  await page.getByRole("button", { name: en["auth.continueWithGoogle"] }).click();

  await expect.poll(() => authorizationUrl, { timeout: 15000 }).not.toBeNull();

  const url = new URL(authorizationUrl as unknown as string);
  expect(url.host).toBe("accounts.google.com");

  const redirectUri = url.searchParams.get("redirect_uri") ?? "";
  expect(redirectUri).toContain("/auth/v1/callback");
  expect(new URL(redirectUri).host).toContain(".supabase.co");

  const scopes = (url.searchParams.get("scope") ?? "").split(/[\s+]+/).filter(Boolean);
  // Scope-creep guard: exactly the three intended scopes, nothing more.
  expect(scopes.slice().sort()).toEqual(EXPECTED_SCOPES.slice().sort());
});

test("G-2: the Google button is present in both sign-in and sign-up modes", async ({ page }) => {
  await page.goto("/auth");
  await waitForHydration(page);
  await expect(page.getByRole("button", { name: en["auth.continueWithGoogle"] })).toBeVisible();

  await page.goto("/auth?view=sign-up");
  await waitForHydration(page);
  await expect(page.getByRole("button", { name: en["auth.continueWithGoogle"] })).toBeVisible();
});
