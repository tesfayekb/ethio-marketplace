import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";
import { adminClient, enrolTotpFactor } from "../global-setup";
import { asBearer } from "./door-callers";
import {
  assertInjectedIdentity,
  besideSessionKey,
  injectSession,
  passwordGrant,
  sessionUserId,
  storageKey,
  untilSignOutCleared,
  type PersistedSession,
} from "./session";
import {
  aal2Session,
  expectAal2,
  gotoReady,
  pooledSuperAdmin,
  signedInMarker,
  signInMarker,
  signOutViaUi,
  waitForHydration,
} from "./ui";

/**
 * CURSOR BUNDLE 6 (DEC-434, DEC-438, DEC-451) — THE ONE STAFF SIGN-IN.
 *
 * A staff screen opens only in a session that used its second factor, and a staff door refuses one
 * that did not (door_context, has_permission): so a test that signs a staff account in — to read an
 * /admin page, to call a staff door, to read a staff table — signs it in with a verified factor, in a
 * session that used it (aal2). This is the one place that does so (K1): the account's factor is
 * enrolled in node through the auth server's own factor endpoints (once per account in a worker),
 * and every sign-in mints a session through `aal2Session` — the same node mint the pool's sessions
 * use (ui.ts). Nothing here weakens a check: the session is a real aal2 session.
 *
 * - `signInStaff(page, account)` — the browser: the page holds the aal2 session, signed-in marker
 *   and aal2 read back (a persona mix-up names both ids). Replaces `switchUser`, `signIn` and
 *   `signInViaSession` for a staff account.
 * - `asStaff(account)` — node: a door-caller (`asPerson`'s shape) over the aal2 session.
 * - `staffSession(account)` — node: the aal2 session itself, for a test that needs its tokens.
 *
 * A test whose SUBJECT is the aal1 staff session (the server's refusal of it: MF-4, CT-7, IMP-5)
 * keeps `switchUser`/`asPerson` and says so.
 */

/** An account a test holds: a leased or minted user. `id` is read from the session when absent. */
export type StaffAccount = { id?: string; email: string; password: string };

/** A factor the account holds: its id and its base32 secret. */
export type StaffFactor = { factorId: string; secret: string };

/** The factors enrolled or declared in this worker, by account address. */
const factors = new Map<string, StaffFactor>();

/**
 * Declares the factor an account already holds (a test that enrolled it through the Settings screen
 * knows its secret; the pool's accounts carry theirs): later mints use it instead of enrolling again.
 */
export function declareStaffFactor(account: StaffAccount, factor: StaffFactor): void {
  factors.set(account.email, factor);
}

/** The pool's super admin's factor, when `account` is that identity. */
function pooledFactorOf(account: StaffAccount): StaffFactor | null {
  let pool;
  try {
    pool = pooledSuperAdmin();
  } catch {
    return null;
  }
  return pool.email === account.email ? { factorId: pool.factorId, secret: pool.secret } : null;
}

/** Enrols a TOTP factor for the account through the auth server (the app's own factor endpoints). */
async function enrolFactor(account: StaffAccount): Promise<StaffFactor> {
  const grant = await passwordGrant(account.email, account.password, { fresh: true });
  return enrolTotpFactor(grant.access_token, "staff-test-factor", "staff factor");
}

/**
 * True while the account still holds the factor, verified: a leased account is reaped between its
 * borrowers and its factors go with it, so a worker's memory of one is checked before it is used.
 */
async function stillHeld(account: StaffAccount, factor: StaffFactor): Promise<boolean> {
  const userId = account.id ?? sessionUserId(await passwordGrant(account.email, account.password));
  const { data, error } = await adminClient().auth.admin.mfa.listFactors({ userId });
  if (error) throw new Error(`[e2e:staff] the factor read failed: ${error.message}`);
  return (data?.factors ?? []).some(
    (held) => held.id === factor.factorId && held.status === "verified",
  );
}

/** The account's factor: declared, the pool's, or enrolled now (once per borrower of an account). */
async function factorOf(account: StaffAccount): Promise<StaffFactor> {
  const known = factors.get(account.email) ?? pooledFactorOf(account);
  if (known !== null && known !== undefined && (await stillHeld(account, known))) {
    factors.set(account.email, known);
    return known;
  }
  const enrolled = await enrolFactor(account);
  factors.set(account.email, enrolled);
  return enrolled;
}

/** A session of the account that used its factor (aal2): the node mint, shared with the pool's. */
export async function staffSession(
  account: StaffAccount,
): Promise<PersistedSession & { secret: string }> {
  const factor = await factorOf(account);
  const session = await aal2Session({
    email: account.email,
    password: account.password,
    factorId: factor.factorId,
    secret: factor.secret,
    label: `staff ${account.email.split("@")[0] ?? ""}`,
  });
  return { ...session, secret: factor.secret };
}

/** A staff person from node: the door's data and its error, over a session that used its factor. */
export async function asStaff(
  account: StaffAccount,
): Promise<ReturnType<typeof asBearer> & { userId: string; secret: string }> {
  const session = await staffSession(account);
  return {
    ...asBearer(session.access_token),
    userId: sessionUserId(session),
    secret: session.secret,
  };
}

/**
 * INC-1324 — what the page held when `signInStaff` found no session after its write: whether the
 * store's key is present, whether the account menu or the sign-in link shows, and the page's path.
 * No token, secret or e-mail address.
 */
async function staffDump(page: Page): Promise<string[]> {
  const stored = await page
    .evaluate((key: string) => window.localStorage.getItem(key) !== null, storageKey())
    .then(String, (error: unknown) => `unread (${errorText(error)})`);
  const menu = await signedInMarker(page).count();
  const signIn = await signInMarker(page).count();
  return [
    `[staff-dump] stored session key present: ${stored}`,
    `[staff-dump] account menu shown: ${menu > 0}; sign-in link shown: ${signIn > 0}`,
    `[staff-dump] address: ${new URL(page.url()).pathname}`,
  ];
}

/**
 * A staff account in the browser, signed in with a session that used its factor. Signs a signed-in page
 * out first (INC-074: /auth is no form for a session) and waits until that sign-out has cleared the
 * store (INC-1324), writes the session where the app's client keeps
 * it with no step-up hint (a fresh sign-in's state; an init script too, so it outlives an earlier
 * persona's), reloads and reads the identity and aal2 back.
 * Answers the factor's secret, so a later step-up prompt can be answered.
 */
export async function signInStaff(page: Page, account: StaffAccount): Promise<{ secret: string }> {
  const session = await staffSession(account);
  await gotoReady(page, "/");
  await waitForHydration(page);
  if ((await page.getByTestId("account-menu").count()) > 0) {
    await signOutViaUi(page);
    await untilSignOutCleared(page);
  }
  // An earlier persona's init script (switchUser, injectSession) reruns on every load: the last one
  // registered wins (the per-user sentinel, INC-120b), so this one is registered too.
  await injectSession(page, session);
  await page.evaluate(
    ({ key, steppedUp, value }: { key: string; steppedUp: string; value: string }) => {
      window.localStorage.removeItem(steppedUp);
      window.localStorage.setItem(key, value);
    },
    {
      key: storageKey(),
      steppedUp: besideSessionKey("stepped-up-at"),
      value: JSON.stringify(session),
    },
  );
  await gotoReady(page, "/");
  try {
    await assertInjectedIdentity(page, session);
  } catch (error) {
    throw new Error(`${errorText(error)}\n${(await staffDump(page)).join("\n")}`);
  }
  await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
  await waitForHydration(page);
  await expectAal2(page);
  return { secret: session.secret };
}
