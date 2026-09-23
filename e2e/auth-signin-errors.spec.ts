import { expect, test } from "./fixtures";
import { readFileSync } from "node:fs";

import { en } from "../src/i18n/locales/en";
import { STATE_FILE, testEmail, type E2EUser } from "./global-setup";
import { injectSession, passwordGrant } from "./helpers/session";
import { attemptSignIn, expectSignedIn, expectSignedOut, signIn } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

const RUN_ID = process.env["GITHUB_RUN_ID"] ?? "local";

function knownUser(): E2EUser {
  return JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
}

/** The single rendered error region on the auth screen. */
function errorRegion(page: import("@playwright/test").Page) {
  return page.getByRole("alert");
}

async function visibleControlNames(page: import("@playwright/test").Page): Promise<string[]> {
  const names = await page.getByRole("button").allInnerTexts();
  return names.map((n) => n.trim()).sort();
}

test("B-1: wrong password is rejected and no session is created", async ({ page }) => {
  const user = knownUser();
  await attemptSignIn(page, user.email, "definitely-not-the-password");

  await expect(errorRegion(page)).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);
});

test("B-2: unknown email is rejected and no session is created", async ({ page }) => {
  await attemptSignIn(page, testEmail(RUN_ID, 901), "definitely-not-the-password");

  await expect(errorRegion(page)).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);
});

test("B-3: wrong-password and unknown-email are indistinguishable", async ({ page }) => {
  const user = knownUser();

  await attemptSignIn(page, user.email, "definitely-not-the-password");
  await expect(errorRegion(page)).toBeVisible({ timeout: 15000 });
  const wrongPasswordText = ((await errorRegion(page).textContent()) ?? "").trim();
  const wrongPasswordControls = await visibleControlNames(page);

  await attemptSignIn(page, testEmail(RUN_ID, 902), "definitely-not-the-password");
  await expect(errorRegion(page)).toBeVisible({ timeout: 15000 });
  const unknownEmailText = ((await errorRegion(page).textContent()) ?? "").trim();
  const unknownEmailControls = await visibleControlNames(page);

  // Enumeration capstone: identical copy AND identical affordances.
  expect(wrongPasswordText).not.toBe("");
  expect(unknownEmailText).toBe(wrongPasswordText);
  expect(unknownEmailControls).toEqual(wrongPasswordControls);
});

test("B-4: unconfirmed account cannot sign in", async ({ page }) => {
  const user = await createUser({ confirmed: false });
  await attemptSignIn(page, user.email, user.password);

  await expect(errorRegion(page)).toBeVisible({ timeout: 15000 });
  await expect(errorRegion(page)).toHaveText(en["auth.errorEmailNotConfirmed"]);
  await expectSignedOut(page);
});

/**
 * B-5 (INC-266 / DEC-076) — THE EXPIRED PRIOR SESSION.
 *
 * The fixture is the reproduction, not a shortcut: a real grant for a scratch
 * user is retired SERVER-SIDE (its refresh token revoked) and planted with an
 * `expires_at` twelve hours in the past — exactly what a tab left open
 * overnight holds. The door is then driven for real (DEC-041): ONE sign-in must
 * land with a session. Before the fix the stale refresh removed the new session
 * after the redirect, so the first attempt reached the marketplace signed out.
 */
test("B-5: one sign-in after a 12h-expired prior session lands with a session", async ({
  page,
}) => {
  const user = await createUser({ confirmed: true });
  const session = await passwordGrant(user.email, user.password);

  // Server-side retirement: the refresh token this browser holds is now dead.
  const { error } = await adminClient().auth.admin.signOut(session.access_token, "global");
  if (error) throw new Error(`[e2e:B-5] could not retire the grant: ${error.message}`);

  await injectSession(page, {
    ...session,
    expires_in: 0,
    expires_at: Math.floor(Date.now() / 1000) - 12 * 60 * 60,
  });

  await signIn(page, user.email, user.password);
  await expectSignedIn(page, user.displayName);
});
