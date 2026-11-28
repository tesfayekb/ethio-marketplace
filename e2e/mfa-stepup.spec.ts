import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { destroyCategory, scratchSlug } from "./helpers/categories";
import { pageDoor } from "./helpers/door-callers";

import { en } from "../src/i18n/locales/en";

import { expectPicturesFit } from "./helpers/pictures";
import { signInStaff } from "./helpers/staff-factor";
import { totp, totpStep, wrongCode } from "./helpers/totp";
import {
  afterTotpStep,
  expectAal2,
  gotoReady,
  isMobile,
  signInJobSuperAdmin,
  staleStepUpOnClient,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser, grantRole } from "./helpers/users";

/**
 * U1f — STEP-UP AUTHENTICATION (MF-1..MF-5).
 *
 * The TOTP codes are generated in-test from the enrolled secret with the
 * RFC 6238 helper (no new dependency). Law F3 restated: the browser assertions
 * cover what RENDERS and what the client sends; the authoritative refusals are
 * the migration proofs P1–P4 plus MF-4 below, which calls the RPCs directly.
 *
 * PRE-REQUISITE (operator item): TOTP must be enabled in
 * Supabase Dashboard → Authentication → Multi-Factor for the target project.
 */

/** Enrolls a TOTP factor through the settings UI and returns its secret. */
async function enrollThroughSettings(page: Page): Promise<string> {
  await gotoReady(page, "/settings");
  await page.getByTestId("mfa-enroll").click();
  await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
  // INC-1121 — the QR is whole and square in its frame.
  const reading = await expectPicturesFit(page, page.getByTestId("mfa-enroll-panel"));
  const qr = reading.pictures.find((picture) => picture.testId === "mfa-qr");
  if (qr === undefined) throw new Error("[e2e:mf] the QR was not measured");
  expect(Math.abs(qr.content.width - qr.content.height)).toBeLessThanOrEqual(1);
  const secret = await page.getByTestId("mfa-secret").inputValue();
  expect(secret.length).toBeGreaterThan(10);
  await page.getByTestId("mfa-code").fill(totp(secret));
  await page.getByTestId("mfa-verify").click();
  await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], { timeout: 20000 });
  return secret;
}

/*
 * FRESHNESS (mfa-service.isStepUpFresh, INC-167): read from the session token alone. A staff
 * screen opens only in a session that used its factor (cursor bundle 6), so MF-2, MF-7 and MF-7b
 * sign the account in through the staff helper (aal2) and make the modal appear the way AL-28
 * does: MF-2 and MF-7b shorten the client's window (`staleStepUpOnClient`), MF-7 its init-script
 * window; the code is typed after the mint's step (`afterTotpStep`, kept until DEC-488's judge:
 * only a challenge is single-use, not a code). MF-3, MF-6, MF-7c,
 * MF-8 and MF-9 are NOT moved: each reaches a staff page with no factor, or at aal1, and waits
 * for the gate's own ruling (stop 2).
 */

/** DB truth for the profile the edit form writes. */
async function displayName(userId: string): Promise<string | null> {
  const { data, error } = await adminClient()
    .from("profiles")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:fix-scan] reading display_name failed: ${error.message}`);
  return data?.display_name ?? null;
}

async function statusChangeCount(userId: string): Promise<number> {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("audit_log")
    .select("id")
    .eq("action", "user.status_change")
    .eq("entity_id", userId);
  if (error) throw new Error(`[e2e:u1f] audit read failed: ${error.message}`);
  return (data ?? []).length;
}

test.describe("U1f step-up authentication", () => {
  test(
    "MF-1 enroll: QR + secret shown, a generated code activates the factor",
    { tag: ["@private-identity", "@webkit"] },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      await switchUser(page, staff.email, staff.password);

      await gotoReady(page, "/settings");
      await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
        timeout: 20000,
      });
      await enrollThroughSettings(page);
      await expect(page.getByTestId("mfa-success")).toBeVisible();
    },
  );

  test(
    "MF-2 gate: wrong code refused, correct code lets the action through",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      // Cursor bundle 6 — a staff screen opens only in a session that used its factor, so the
      // account signs in with one (the staff helper) and the client is told its step-up is stale:
      // the next guarded action finds none fresh and the gate fires (INC-620).
      const { secret } = await signInStaff(page, staff);
      const spentStep = totpStep();
      await gotoReady(page, `/admin/users/${target.id}`);
      await staleStepUpOnClient(page);
      await page.getByTestId("deactivate-reason").fill("MF-2 proof");
      await page.getByTestId("deactivate-user").click();

      const modal = page.getByTestId("step-up-modal");
      await expect(modal).toBeVisible({ timeout: 15000 });
      await page.getByTestId("step-up-code").fill(wrongCode(secret));
      await page.getByTestId("step-up-submit").click();
      await expect(page.getByTestId("step-up-error")).toBeVisible({ timeout: 15000 });

      // The session's own verification spent this step's code: type one the factor has not used.
      await afterTotpStep(spentStep);
      await page.getByTestId("step-up-code").fill(totp(secret));
      await page.getByTestId("step-up-submit").click();
      await expect(modal).toBeHidden({ timeout: 20000 });
      await expect(page.getByTestId("user-status")).toHaveText(
        en["admin.users.status.deactivated"],
        {
          timeout: 20000,
        },
      );
      expect(await statusChangeCount(target.id)).toBeGreaterThan(0);
    },
  );

  test("MF-3 no factor: the staff screen explains the setup and the RPC is never called", async ({
    page,
  }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    // Cursor bundle 6 — the subject is the account with no factor, so it keeps the password sign-in
    // (aal1). Its answer is now the gate's setup panel in place of the screen (DEC-434): there is no
    // deactivate control to press, and nothing is written.
    await switchUser(page, staff.email, staff.password);

    await gotoReady(page, `/admin/users/${target.id}`);
    await expect(page.getByTestId("admin-factor-setup")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("admin-factor-setup-link")).toBeVisible();
    await expect(page.getByTestId("deactivate-user")).toHaveCount(0);
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test("MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer", async ({
    page,
  }) => {
    // Turn S6-3 (row 48): step-up-dialog.tsx arrives through resilientLazy, as step-up-dialog-<hash>.js.
    const dialogChunk = /\/step-up-dialog-[^/]+\.js$/.source;
    const asked = () =>
      page.evaluate(
        (source) => ({
          preloaded: [...document.querySelectorAll<HTMLLinkElement>('link[rel="modulepreload"]')]
            .map((link) => link.href)
            .filter((href) => new RegExp(source).test(href)),
          fetched: performance
            .getEntriesByType("resource")
            .map((entry) => entry.name)
            .filter((name) => new RegExp(source).test(name)),
        }),
        dialogChunk,
      );
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    // Cursor bundle 6 — the staff helper signs the account in with a factor it used (aal2); the client
    // is told its step-up is stale, so the first guarded action asks for the code and draws the dialog.
    await signInStaff(page, staff);

    await gotoReady(page, `/admin/users/${target.id}`);
    await staleStepUpOnClient(page);
    await page.getByTestId("deactivate-reason").fill("MF-8 proof");
    expect(await asked()).toEqual({ preloaded: [], fetched: [] });
    await page.getByTestId("deactivate-user").click();

    const modal = page.getByTestId("step-up-modal");
    await expect(page.getByTestId("step-up-code")).toBeVisible({ timeout: 15000 });
    await expect(modal).toHaveCSS("z-index", "100");
    expect((await asked()).fetched).toHaveLength(1);
    await page.getByTestId("step-up-cancel").click();
    await expect(modal).toHaveCount(0);
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test("MF-4 server: permission first, then step-up — the RPC refuses regardless of UI", async ({
    page,
  }) => {
    const target = await createUser({ confirmed: true });

    const base = await createUser({ confirmed: true });
    await switchUser(page, base.email, base.password);
    await waitForHydration(page);
    const baseError = (
      await pageDoor(page, "admin_set_account_status", {
        p_user_id: target.id,
        p_status: "deactivated",
        p_reason: "MF-4",
      })
    ).error;
    expect(baseError).toBe("permissionDenied");

    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);
    await waitForHydration(page);
    const staffError = (
      await pageDoor(page, "admin_set_account_status", {
        p_user_id: target.id,
        p_status: "deactivated",
        p_reason: "MF-4",
      })
    ).error;
    expect(staffError ?? "").toMatch(/step-up required/i);
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test(
    "MF-5 unenroll requires a fresh verification",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      await switchUser(page, staff.email, staff.password);
      const secret = await enrollThroughSettings(page);

      await page.getByTestId("mfa-remove").click();
      await page.getByTestId("mfa-remove-code").fill(wrongCode(secret));
      await page.getByTestId("mfa-remove-confirm").click();
      await expect(page.getByTestId("mfa-error")).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"]);

      await page.getByTestId("mfa-remove-code").fill(totp(secret));
      await page.getByTestId("mfa-remove-confirm").click();
      await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
        timeout: 20000,
      });
    },
  );
});

/**
 * U1f-4 (INC-081) — A BEARER aal2 CLAIM IS NOT A STEP-UP.
 *
 * Both proofs come from the operator repro: after unenrolling the only factor
 * the session still carried aal2 and `deactivate` went through; and the
 * enrollment verify itself elevated the session for its whole lifetime.
 *
 * MF-7 shortens the client window through the DEV override
 * (`window.__ethioStepUp = { windowMs }`); the SERVER window stays 10 minutes,
 * so the re-verification the modal collects is accepted normally. The
 * authoritative refusals are migration proofs P5/P7.
 */
test.describe("U1f-4 step-up freshness", () => {
  test(
    "MF-6 unenrolling the only factor drops the stepped-up state",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      await switchUser(page, staff.email, staff.password);
      const secret = await enrollThroughSettings(page);

      // Remove the only factor — the session may still claim aal2.
      await page.getByTestId("mfa-remove").click();
      await page.getByTestId("mfa-remove-code").fill(totp(secret));
      await page.getByTestId("mfa-remove-confirm").click();
      await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
        timeout: 20000,
      });
      await expect(page.getByTestId("mfa-off-warning")).toBeVisible();

      // Cursor bundle 6 — with no factor left, the staff screen is the gate's setup panel (DEC-434):
      // the session's stale aal2 claim opens nothing, and nothing is written.
      await gotoReady(page, `/admin/users/${target.id}`);
      await expect(page.getByTestId("admin-factor-setup")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("deactivate-user")).toHaveCount(0);
      expect(await statusChangeCount(target.id)).toBe(0);
    },
  );

  test(
    "MF-7 a verification older than the window re-prompts",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      await page.addInitScript(() => {
        (window as unknown as { __ethioStepUp: { windowMs: number } }).__ethioStepUp = {
          windowMs: 3000,
        };
      });
      // Cursor bundle 6 — the staff helper signs the account in with a factor it used (aal2).
      const { secret } = await signInStaff(page, staff);
      const spentStep = totpStep();

      // The sign-in's verification is the one the window measures; wait past the (shortened) window.
      // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: deliberate wall-clock wait (rate-limit / session-expiry semantics), grandfathered pending a truth poll
      await page.waitForTimeout(4000);

      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("deactivate-reason").fill("MF-7 proof");
      await page.getByTestId("deactivate-user").click();

      const modal = page.getByTestId("step-up-modal");
      await expect(modal).toBeVisible({ timeout: 15000 });
      await afterTotpStep(spentStep);
      await page.getByTestId("step-up-code").fill(totp(secret));
      await page.getByTestId("step-up-submit").click();
      await expect(modal).toBeHidden({ timeout: 20000 });
      await expect(page.getByTestId("user-status")).toHaveText(
        en["admin.users.status.deactivated"],
        {
          timeout: 20000,
        },
      );
    },
  );
});

/**
 * FIX-SCAN-1 ISSUE 2 / DEC-047 — THE GATE SETTLES ON EVERY PATH.
 *
 * `guard(action)` used to leave its promise unsettled when the operator
 * cancelled the prompt or held no factor, so the caller's pending state never
 * reset ("the buttons stay stuck"). It now rejects with StepUpCancelled /
 * StepUpUnavailable: the caller resets, claims NOTHING happened (F4), and the
 * no-factor case renders the translated "set up an authenticator" hint.
 */
test.describe("FIX-SCAN-1 step-up abort", () => {
  test(
    "MF-7b cancelling the prompt releases the caller and writes nothing",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      const before = await displayName(target.id);

      // Cursor bundle 6 — the staff helper signs the account in with a factor it used; the client is
      // told its step-up is stale, so the gate fires on the next action.
      await signInStaff(page, staff);

      await gotoReady(page, `/admin/users/${target.id}`);
      await staleStepUpOnClient(page);
      await page.getByTestId("edit-display-name").fill("MF-7b never written");
      await page.getByTestId("edit-save").click();

      const modal = page.getByTestId("step-up-modal");
      await expect(modal).toBeVisible({ timeout: 15000 });
      await page.getByTestId("step-up-cancel").click();
      await expect(modal).toBeHidden({ timeout: 15000 });

      // Released: the button is usable again and neither outcome is claimed.
      await expect(page.getByTestId("edit-save")).toBeEnabled();
      await expect(page.getByTestId("edit-saved")).toBeHidden();
      await expect(page.getByTestId("edit-error")).toBeHidden();
      expect(await displayName(target.id), "MF-7b nothing was written").toBe(before);
    },
  );

  test(
    "MF-7c a no-factor identity meets the setup, and nothing is written",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      const before = await displayName(target.id);

      // Cursor bundle 6 — the subject is the account with no factor (aal1, the password sign-in).
      // The edit form is never drawn: the gate's setup panel is the screen (DEC-434).
      await switchUser(page, staff.email, staff.password);
      await gotoReady(page, `/admin/users/${target.id}`);
      await expect(page.getByTestId("admin-factor-setup")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("edit-display-name")).toHaveCount(0);
      expect(await displayName(target.id), "MF-7c nothing was written").toBe(before);
    },
  );
});

/*
 * MF-9 (cursor bundle 1, item 7; INC-1234) — ONE STEP-UP, ONE PROMPT. The operator's walk of
 * 2026-11-15 asked for the code a second time on Admin, creating a category and then generating
 * its picture, moments after the first. The cause was not found (the census ran this flow on
 * ethio-staging and the modal opened once); this test pins what the walk expected: one code
 * covers the create and the picture step. It counts every step-up modal that OPENS, by an
 * observer installed before the first paint — the one form that can see a second prompt (the
 * image specs answer a prompt silently).
 */
test.describe("INC-1234 one step-up, one prompt", () => {
  test(
    "MF-9 one code covers a category's creation and its picture step",
    { tag: "@private-identity" },
    async ({ page }) => {
      test.setTimeout(120_000);
      await page.addInitScript(() => {
        const seen = { count: 0 };
        Reflect.set(window, "__stepUpSeen", seen);
        new MutationObserver((records) => {
          for (const record of records)
            for (const node of Array.from(record.addedNodes))
              if (
                node instanceof HTMLElement &&
                (node.matches('[data-testid="step-up-modal"]') ||
                  node.querySelector('[data-testid="step-up-modal"]') !== null)
              )
                seen.count += 1;
        }).observe(document, { childList: true, subtree: true });
      });
      const opened = () =>
        page.evaluate(() => {
          const seen: unknown = Reflect.get(window, "__stepUpSeen");
          return typeof seen === "object" &&
            seen !== null &&
            "count" in seen &&
            typeof seen.count === "number"
            ? seen.count
            : -1;
        });
      const { user, secret } = await signInJobSuperAdmin(page);
      const spentStep = totpStep();
      // A fresh password sign-in is aal1: the staff screen opens only after its code is asked and given.
      await switchUser(page, user.email, user.password);
      const slug = scratchSlug();
      try {
        // Cursor bundle 6 (DEC-434) — the ONE prompt is the gate's: the code panel in place of the
        // screen. No step-up modal opens after it, for the create or the picture step.
        await gotoReady(page, "/admin/categories");
        await expect(page.getByTestId("admin-factor-code-panel")).toBeVisible({ timeout: 20000 });
        await afterTotpStep(spentStep);
        await page.getByTestId("admin-factor-code").fill(totp(secret));
        await page.getByTestId("admin-factor-submit").click();
        await expect(page.getByTestId("category-create-open")).toBeVisible({ timeout: 20000 });
        await expectAal2(page);
        expect(await opened(), "the gate's code did not open a modal").toBe(0);

        await page.getByTestId("category-create-open").click();
        await page.getByTestId("category-create-name").fill(slug);
        await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
        await page.getByTestId("category-create-submit").click();
        const modal = page.getByTestId("step-up-modal");
        await expect(page.getByTestId("category-editor-image")).toBeVisible({ timeout: 20000 });
        expect(await opened(), "the create asked again").toBe(0);

        await page.getByTestId("category-image-generate").click();
        await expect(page.getByTestId("category-image-assets")).toBeVisible({ timeout: 60000 });
        await page.getByTestId("category-image-accept").click();
        // The accept ends by its toast or its badge — or, had the gate asked again, by a modal.
        await expect
          .poll(
            async () =>
              (await page.getByTestId("category-image-accept-toast").count()) > 0 ||
              (await page.getByTestId("category-image-accepted-badge").count()) > 0 ||
              (await modal.count()) > 0,
            { timeout: 30000 },
          )
          .toBe(true);
        expect(await opened(), "the picture step asked again").toBe(0);
        await expect(modal).toHaveCount(0);
      } finally {
        await destroyCategory(slug);
      }
    },
  );
});

/*
 * MF-10, MF-11 (cursor bundle 4; INC-1147, class 2) — A SETUP THAT WAS STARTED AND NOT FINISHED. The
 * provider gives a setup's secret once, so a reload mid-setup left a pending factor the page could
 * neither show nor finish, and the next start met "a factor with this name exists". The card now says
 * a setup is in progress and offers Start again, which clears it first; and a first screen whose setup
 * a newer start replaced says so in its own words. Both read the card's own states (the account has no
 * verified factor in either).
 */
test.describe("INC-1147 a two-factor setup that survives a reload", () => {
  test(
    "MF-10 a reload mid-setup offers the setup back, and Start again begins a new one that confirms",
    { tag: "@private-identity" },
    async ({ page }) => {
      const user = await createUser({ confirmed: true });
      await switchUser(page, user.email, user.password);
      await gotoReady(page, "/settings");
      await page.getByTestId("mfa-enroll").click();
      await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });

      await gotoReady(page, "/settings");
      await expect(page.getByTestId("mfa-unfinished")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("mfa-unfinished")).toContainText(en["mfa.setupInProgress"]);
      await expect(page.getByTestId("mfa-enroll")).toHaveCount(0);

      await page.getByTestId("mfa-start-again").click();
      await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
      const secret = await page.getByTestId("mfa-secret").inputValue();
      await page.getByTestId("mfa-code").fill(totp(secret));
      await page.getByTestId("mfa-verify").click();
      await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], {
        timeout: 20000,
      });
      await expect(page.getByTestId("mfa-unfinished")).toHaveCount(0);
    },
  );

  test(
    "MF-11 a setup that a newer start replaced says so, and the newer one still confirms",
    { tag: "@private-identity" },
    async ({ page }) => {
      const user = await createUser({ confirmed: true });
      await switchUser(page, user.email, user.password);
      await gotoReady(page, "/settings");
      await page.getByTestId("mfa-enroll").click();
      await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
      const firstSecret = await page.getByTestId("mfa-secret").inputValue();

      // A second tab of the same session starts again: the first tab's setup is cleared.
      const other = await page.context().newPage();
      await gotoReady(other, "/settings");
      await expect(other.getByTestId("mfa-unfinished")).toBeVisible({ timeout: 20000 });
      await other.getByTestId("mfa-start-again").click();
      await expect(other.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
      const secondSecret = await other.getByTestId("mfa-secret").inputValue();
      expect(secondSecret).not.toBe(firstSecret);

      await page.getByTestId("mfa-code").fill(totp(firstSecret));
      await page.getByTestId("mfa-verify").click();
      await expect(page.getByTestId("mfa-error")).toHaveText(en["mfa.errorSetupReplaced"], {
        timeout: 15000,
      });

      await other.getByTestId("mfa-code").fill(totp(secondSecret));
      await other.getByTestId("mfa-verify").click();
      await expect(other.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], {
        timeout: 20000,
      });
    },
  );
});
