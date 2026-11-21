import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { destroyCategory, scratchSlug } from "./helpers/categories";
import { pageDoor } from "./helpers/door-callers";

import { en } from "../src/i18n/locales/en";

import { expectPicturesFit } from "./helpers/pictures";
import { totp, wrongCode } from "./helpers/totp";
import {
  expectAal2,
  gotoReady,
  isMobile,
  signInJobSuperAdmin,
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
 * FRESHNESS (mfa-service.isStepUpFresh, INC-167): read from the session token
 * alone. MF-2 and MF-7b sign in again (`switchUser`) after enrolling: a fresh
 * sign-in is aal1, so the modal is guaranteed; MF-7 shortens the client window
 * instead. INC-620 (bundle 14 turn 2): the `clearStepUpFreshness` calls that
 * stood after those sign-ins wrote a local stamp nothing has read since
 * INC-167, and are removed.
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
      await switchUser(page, staff.email, staff.password);
      const secret = await enrollThroughSettings(page);

      // A fresh sign-in is aal1 again — the gate must fire.
      await switchUser(page, staff.email, staff.password);
      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("deactivate-reason").fill("MF-2 proof");
      await page.getByTestId("deactivate-user").click();

      const modal = page.getByTestId("step-up-modal");
      await expect(modal).toBeVisible({ timeout: 15000 });
      await page.getByTestId("step-up-code").fill(wrongCode(secret));
      await page.getByTestId("step-up-submit").click();
      await expect(page.getByTestId("step-up-error")).toBeVisible({ timeout: 15000 });

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

  test("MF-3 no factor: the modal explains and the RPC is never called", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    await switchUser(page, staff.email, staff.password);

    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-3 proof");
    await page.getByTestId("deactivate-user").click();

    await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("step-up-settings-link")).toBeVisible();
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
    await switchUser(page, staff.email, staff.password);

    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-8 proof");
    expect(await asked()).toEqual({ preloaded: [], fetched: [] });
    await page.getByTestId("deactivate-user").click();

    const modal = page.getByTestId("step-up-modal");
    await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
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

      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("deactivate-reason").fill("MF-6 proof");
      await page.getByTestId("deactivate-user").click();

      await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
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
      await switchUser(page, staff.email, staff.password);
      const secret = await enrollThroughSettings(page);

      // Enrollment elevated the session; wait past the (shortened) window.
      // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: deliberate wall-clock wait (rate-limit / session-expiry semantics), grandfathered pending a truth poll
      await page.waitForTimeout(4000);

      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("deactivate-reason").fill("MF-7 proof");
      await page.getByTestId("deactivate-user").click();

      const modal = page.getByTestId("step-up-modal");
      await expect(modal).toBeVisible({ timeout: 15000 });
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

      await switchUser(page, staff.email, staff.password);
      await enrollThroughSettings(page);
      // A fresh sign-in is aal1 again — the gate must fire on the next action.
      await switchUser(page, staff.email, staff.password);

      await gotoReady(page, `/admin/users/${target.id}`);
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
    "MF-7c a no-factor identity is released with the hint",
    { tag: "@private-identity" },
    async ({ page }) => {
      const staff = await createUser({ confirmed: true });
      await grantRole(staff.id, "admin");
      const target = await createUser({ confirmed: true });
      const before = await displayName(target.id);

      await switchUser(page, staff.email, staff.password);
      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("edit-display-name").fill("MF-7c never written");
      await page.getByTestId("edit-save").click();

      await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId("edit-save")).toBeEnabled();
      await expect(page.getByTestId("edit-error")).toHaveText(en["mfa.stepUpUnavailableHint"]);
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
        (window as unknown as { __stepUpSeen: typeof seen }).__stepUpSeen = seen;
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
        page.evaluate(
          () =>
            (window as unknown as { __stepUpSeen?: { count: number } }).__stepUpSeen?.count ?? -1,
        );
      const { user, secret } = await signInJobSuperAdmin(page);
      // A fresh password sign-in is aal1: the modal is guaranteed for the create.
      await switchUser(page, user.email, user.password);
      const slug = scratchSlug();
      try {
        await gotoReady(page, "/admin/categories");
        const before = await opened();
        await page.getByTestId("category-create-open").click();
        await page.getByTestId("category-create-name").fill(slug);
        await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
        await page.getByTestId("category-create-submit").click();
        const modal = page.getByTestId("step-up-modal");
        await expect(modal).toBeVisible({ timeout: 15000 });
        await page.getByTestId("step-up-code").fill(totp(secret));
        await page.getByTestId("step-up-submit").click();
        await expect(modal).toBeHidden({ timeout: 20000 });
        await expectAal2(page);
        await expect(page.getByTestId("category-editor-image")).toBeVisible({ timeout: 20000 });
        expect(await opened(), "the create asked once").toBe(before + 1);

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
        expect(await opened(), "the picture step asked again").toBe(before + 1);
        await expect(modal).toHaveCount(0);
      } finally {
        await destroyCategory(slug);
      }
    },
  );
});
