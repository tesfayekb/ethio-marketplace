import { en } from "../src/i18n/locales/en";

import { expect, test } from "./fixtures";
import { staffSession } from "./helpers/staff-factor";
import { totp, totpStep } from "./helpers/totp";
import { afterTotpStep, expectAal2, gotoReady, switchUser, waitForHydration } from "./helpers/ui";
import { grantRole, leaseUser } from "./helpers/users";

/**
 * CURSOR BUNDLE 6, PART 4 (DEC-434, DEC-451) — THE STAFF SCREEN'S GATE (STAFF-E1, STAFF-E2).
 *
 * A staff screen opens only for a staff account with a verified second factor, in a session that used
 * it. The two screens the gate draws are read here as a person meets them; the server's refusal of the
 * same session is STAFF-E3 (category-image-routes.spec.ts) and the migration's proofs. Both tests
 * sign in by the real password form (aal1 — the subject IS the session that has not used its factor),
 * so they keep `switchUser`, as the staff helper's header says.
 *
 * The screen asked for is the categories console: its search box (`category-search`) is the first
 * thing a staff screen draws, so its absence is the proof that nothing of the screen opened.
 */

const SCREEN = "/admin/categories";

test.describe("STAFF — the gate in front of every staff screen", () => {
  test("STAFF-E1 a staff account with no verified factor meets the setup and no staff screen", async ({
    page,
  }) => {
    const staff = await leaseUser();
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);
    await waitForHydration(page);

    await gotoReady(page, SCREEN);
    await expect(page.getByTestId("admin-factor-setup")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("admin-factor-setup")).toContainText(
      en["admin.factorNeeded.title"],
    );
    await expect(page.getByTestId("admin-factor-setup-link")).toHaveAttribute("href", "/settings");
    await expect(page.getByTestId("category-search")).toHaveCount(0);
    await expect(page.getByTestId("admin-factor-code-panel")).toHaveCount(0);
  });

  test("STAFF-E2 a staff account whose session has not used its factor is asked for its code before any staff screen draws", async ({
    page,
  }) => {
    const staff = await leaseUser();
    await grantRole(staff.id, "admin");
    // The account holds a verified factor (the node mint enrols it and uses it once); the browser
    // session below is a plain password sign-in, so the factor is unused in it.
    const held = await staffSession(staff);
    const spent = totpStep();
    await switchUser(page, staff.email, staff.password);
    await waitForHydration(page);

    await gotoReady(page, SCREEN);
    await expect(page.getByTestId("admin-factor-code-panel")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("admin-factor-setup")).toHaveCount(0);
    await expect(page.getByTestId("category-search")).toHaveCount(0);

    // A code is spent once per step: the one the mint used is not typed again.
    await afterTotpStep(spent);
    await page.getByTestId("admin-factor-code").fill(totp(held.secret));
    await page.getByTestId("admin-factor-submit").click();
    await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("admin-factor-code-panel")).toHaveCount(0);
    await expectAal2(page);
  });
});
