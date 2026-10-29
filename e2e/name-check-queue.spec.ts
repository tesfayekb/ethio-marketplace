import type { Locator, Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { adPageFixtures, token } from "./helpers/ad-page";
import { signInAsSuperAdmin } from "./helpers/categories";
import { markName, readNameCheck, releaseHold, saveOwnAlias } from "./helpers/seller-name";
import { gotoReady, stepUpIfPrompted, waitForHydration } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";
import en from "../src/i18n/locales/en";

/**
 * N1b-3c (INC-977) — THE STAFF QUEUE FOR HELD SELLER NAMES AND THE RE-CHECK'S
 * LINE, through the real doors in a real browser.
 *
 * Fixtures (J1/J3/J7/R7): the scratch seller (J9 pool) saves its own name through
 * save_posting_identity; the hold is made only through the service door
 * name_check_mark, before the page is opened; afterEach releases any hold the test
 * left, whatever the name became, before the scratch reap — a timeout included.
 *
 * NCQ-E2E-3 (Resume) runs in ONE project (J6): the pause row is the job's own
 * (job_pauses is keyed by the job, one row for the whole backend), so two projects
 * pausing and resuming it at once would undo each other. The pause is made through
 * the service door job_pause_set and removed in afterEach through job_pause_clear.
 */
const JOB = "name-check-catchup";

function rowIn(page: Page, profileId: string): Locator {
  const cards = (page.viewportSize()?.width ?? 1280) < 1024;
  const section = page.getByTestId("admin-name-checks");
  return cards
    ? section.getByTestId("data-table-cards").getByTestId(`admin-name-check-${profileId}-card`)
    : section.getByRole("table").getByTestId(`admin-name-check-${profileId}`);
}

/** The row's three-dots: in a phone card it sits in the card's box (`<row>-actions`), beside `-card`. */
async function chooseInRow(page: Page, profileId: string, key: "allow" | "rename") {
  const cards = (page.viewportSize()?.width ?? 1280) < 1024;
  const row = cards
    ? page
        .getByTestId("admin-name-checks")
        .getByTestId("data-table-cards")
        .getByTestId(`admin-name-check-${profileId}-actions`)
    : rowIn(page, profileId);
  await row.getByTestId(`admin-name-check-${profileId}-actions-more`).click();
  await page.getByTestId(`admin-name-check-${profileId}-actions-more-${key}`).click();
}

test.describe("SCREENING — the seller names held for review (N1b-3, INC-977)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  const held: string[] = [];
  let paused = false;
  test.afterEach(async () => {
    try {
      for (const id of held.splice(0)) await releaseHold(id);
      if (paused) {
        const cleared = await adminClient().rpc("job_pause_clear", { p_job: JOB });
        if (cleared.error) throw new Error(`[e2e:ncq] job_pause_clear: ${cleared.error.message}`);
        paused = false;
      }
    } finally {
      await cleanup();
    }
  });

  test("NCQ-E2E-1 Allow: a held name is listed with what it imitates; staff allow it under step-up; buyers see it again", async ({
    page,
  }) => {
    // The pool's seller keeps its audit history across runs: read only this test's rows.
    const started = new Date().toISOString();
    const seller = await scratchSeller();
    const alias = `eallow_${token()}`;
    await saveOwnAlias(seller, alias);
    const ad = await seed(seller);
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    await markName(seller.id, alias, "imitates", "Ethio Telecom");
    held.push(seller.id);

    const staff = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    const row = rowIn(page, seller.id);
    await expect(row).toBeVisible({ timeout: 15000 });
    await expect(row.getByTestId("admin-name-check-name")).toHaveText(alias);
    await expect(row.getByTestId("admin-name-check-of")).toHaveText(
      en["admin.screening.names.of"].replace("{of}", "Ethio Telecom"),
    );

    await chooseInRow(page, seller.id, "allow");
    const dialog = page.getByTestId("admin-name-check-allow");
    await expect(dialog).toBeVisible();
    await dialog.getByTestId("admin-name-check-allow-reason").fill("e2e staff review");
    await dialog.getByTestId("admin-name-check-allow-go").click();
    await stepUpIfPrompted(page, staff.secret);
    await expect(page.getByText(en["admin.screening.names.clear.done"])).toBeVisible({
      timeout: 15000,
    });
    await expect(rowIn(page, seller.id)).toHaveCount(0);

    // DB truth (J4): the row is clean, and one audit row carries the reason.
    expect((await readNameCheck(seller.id))?.state).toBe("clean");
    const audit = await adminClient()
      .from("audit_log")
      .select("meta")
      .eq("action", "name_check.cleared")
      .eq("entity_id", seller.id)
      .gte("created_at", started);
    expect(audit.error).toBeNull();
    expect(audit.data?.length).toBe(1);
    expect((audit.data?.[0]?.meta as { reason?: string } | null)?.reason).toBe("e2e staff review");

    // A buyer sees the name again.
    await page.context().clearCookies();
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-seller-name")).toHaveText(alias, {
      timeout: 15000,
    });
  });

  test("NCQ-E2E-2 Rename: the row opens the user's editor; staff rename; the new name is not held and buyers see it", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const alias = `erename_${token()}`;
    const renamed = `erenamed_${token()}`;
    await saveOwnAlias(seller, alias);
    const ad = await seed(seller);
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    await markName(seller.id, alias, "imitates");
    held.push(seller.id);

    const staff = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    const row = rowIn(page, seller.id);
    await expect(row).toBeVisible({ timeout: 15000 });
    // A hold from before `of` existed (or the model gave none) says so, never blank.
    await expect(row.getByTestId("admin-name-check-of")).toHaveText(
      en["admin.screening.names.noReason"],
    );

    await chooseInRow(page, seller.id, "rename");
    await expect(page).toHaveURL(new RegExp(`/admin/users/${seller.id}#edit-seller-alias$`));
    await waitForHydration(page);
    const field = page.getByTestId("edit-seller-alias");
    await expect(field).toHaveValue(alias, { timeout: 15000 });
    await field.fill(renamed);
    await page.getByTestId("edit-save").click();
    await stepUpIfPrompted(page, staff.secret);
    await expect(page.getByTestId("edit-saved")).toBeVisible({ timeout: 15000 });

    // DB truth (J4): a staff-assigned name lands clean.
    const check = await readNameCheck(seller.id);
    expect(check?.state).toBe("clean");
    expect(check?.checked_text).toBe(renamed);

    await gotoReady(page, "/admin/screening");
    await expect(page.getByTestId("admin-name-checks")).toBeVisible({ timeout: 15000 });
    await expect(rowIn(page, seller.id)).toHaveCount(0);

    await page.context().clearCookies();
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-seller-name")).toHaveText(renamed, {
      timeout: 15000,
    });
  });

  test("NCQ-E2E-3 Resume: a paused re-check names its reason; staff resume it under step-up; the pause is gone and audited", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "J6: the job's one pause row");
    const started = new Date().toISOString();
    const set = await adminClient().rpc("job_pause_set", { p_job: JOB, p_reason: "credits" });
    if (set.error) throw new Error(`[e2e:ncq] job_pause_set: ${set.error.message}`);
    paused = true;

    const staff = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    const line = page.getByTestId("admin-job-line");
    await expect(line).toHaveAttribute("data-state", "paused", { timeout: 15000 });
    await expect(line).toContainText(en["admin.screening.job.pause.credits"]);

    await line.getByTestId("admin-job-resume").click();
    await stepUpIfPrompted(page, staff.secret);
    await expect(page.getByText(en["admin.screening.job.resume.done"])).toBeVisible({
      timeout: 15000,
    });
    await expect(line).not.toHaveAttribute("data-state", "paused");
    await expect(line).not.toHaveAttribute("data-state", "error");
    await expect(page.getByTestId("admin-job-resume")).toHaveCount(0);

    // DB truth (J4): no pause row, and one job.resumed audit row by this staff member.
    const pauses = await adminClient().from("job_pauses").select("job").eq("job", JOB);
    expect(pauses.error).toBeNull();
    expect(pauses.data).toEqual([]);
    paused = false;
    const audit = await adminClient()
      .from("audit_log")
      .select("actor_id")
      .eq("action", "job.resumed")
      .eq("entity_id", JOB)
      .gte("created_at", started);
    expect(audit.error).toBeNull();
    expect(audit.data?.map((r) => r.actor_id)).toEqual([staff.user.id]);
  });
});
