import { type Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { seedScratchChain, destroyLocation } from "./helpers/locations";
import { seedListingRow } from "./helpers/listing-seed";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  rand,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, signInJobSuperAdmin, stepUpIfPrompted } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * DEC-469 (cursor bundle 7b) — SCREENING'S REJECT ASKS A REASON. SRJ-1 nothing is sent without a
 * reason; SRJ-2 Other needs a note; SRJ-3 a reason and a note reject the ad, name both in the one
 * audit row and in the seller's notice; SRJ-4 the ticked ones take one reason and note, one notice
 * each; SRJ-5 an Approve asks for nothing. Seeded as admin-screening.spec.ts seeds (the shared
 * helpers), found by their unique titles; truth read through the service client; cleanup in
 * afterEach (J3).
 */
test.describe("ADMIN SCREENING REJECT", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const listings: string[] = [];

  test.afterEach(async () => {
    if (listings.length > 0) {
      const gone = await adminClient().from("seller_notices").delete().in("listing_id", listings);
      if (gone.error) throw new Error(`[e2e:srj] notices reap failed: ${gone.error.message}`);
      listings.length = 0;
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  async function seedWaiting() {
    const seller = await leaseSeller({ alias: true });
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch({});
    branches.push([parent.slug, leaf.slug]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);
    const title = `e2e-reject-${RUN}-${rand()}`;
    const row = await seedListingRow(
      {
        category_id: leaf.id,
        seller_id: seller.id,
        location_id: chain.city.id,
        home_country_code: "ET",
        title,
        description: "e2e scratch listing for the reject dialog",
        status: "screening",
        published_at: null,
      },
      { tag: "srj" },
    );
    const id = row.id as string;
    listings.push(id);
    return { id, sellerId: seller.id, title };
  }

  async function statusOf(id: string) {
    const { data, error } = await adminClient()
      .from("listings")
      .select("status")
      .eq("id", id)
      .single();
    if (error || !data) throw new Error(`[e2e:srj] reading the listing failed: ${error?.message}`);
    return data.status as string;
  }

  async function noticesOf(id: string) {
    const { data, error } = await adminClient()
      .from("seller_notices")
      .select("kind, reason, note")
      .eq("listing_id", id);
    if (error || !data) throw new Error(`[e2e:srj] reading the notices failed: ${error?.message}`);
    return data as Array<{ kind: string; reason: string | null; note: string | null }>;
  }

  async function auditOf(id: string) {
    const { data, error } = await adminClient()
      .from("audit_log")
      .select("meta")
      .eq("entity_type", "listing")
      .eq("entity_id", id)
      .eq("action", "listing.rejected");
    if (error || !data) throw new Error(`[e2e:srj] reading audit_log failed: ${error?.message}`);
    return data.map((row) => row.meta as Record<string, unknown>);
  }

  /** The ad's row in whichever twin the width draws; the menu's Reject opens the dialog. */
  async function askReject(page: Page, ad: { id: string; title: string }) {
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(ad.title);
    const wide = (page.viewportSize()?.width ?? 1024) >= 1024;
    const surface = wide ? page.getByRole("table") : page.getByTestId("data-table-cards");
    await expect(
      surface.getByTestId(
        wide ? `admin-screening-row-${ad.id}` : `admin-screening-row-${ad.id}-card`,
      ),
    ).toBeVisible({ timeout: 20000 });
    const actions = surface.getByTestId(
      wide ? `admin-screening-row-${ad.id}-actions-cell` : `admin-screening-row-${ad.id}-actions`,
    );
    await actions.getByTestId(`admin-screening-actions-${ad.id}-more`).click();
    await page.getByTestId(`admin-screening-actions-${ad.id}-more-reject`).click();
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
  }

  test("SRJ-1 a Reject with no reason is not sent: the dialog asks for one", async ({ page }) => {
    const ad = await seedWaiting();
    await signInJobSuperAdmin(page);
    await askReject(page, ad);
    await page.getByTestId("admin-screening-confirm-go").click();
    await expect(page.getByTestId("admin-screening-confirm-problem")).toHaveText(
      en["admin.listings.move.pickReason"],
    );
    expect(await statusOf(ad.id)).toBe("screening");
    expect(await noticesOf(ad.id)).toEqual([]);
  });

  test("SRJ-2 Other with no note is not sent: the dialog asks for the note", async ({ page }) => {
    const ad = await seedWaiting();
    await signInJobSuperAdmin(page);
    await askReject(page, ad);
    await page.getByTestId("admin-screening-confirm-reason-other").click();
    await page.getByTestId("admin-screening-confirm-go").click();
    await expect(page.getByTestId("admin-screening-confirm-problem")).toHaveText(
      en["admin.listings.move.noteRequired"],
    );
    expect(await statusOf(ad.id)).toBe("screening");
  });

  test("SRJ-3 a reason and a note reject the ad; the audit row and the seller's notice name both", async ({
    page,
  }) => {
    const ad = await seedWaiting();
    const { secret } = await signInJobSuperAdmin(page);
    await askReject(page, ad);
    const note = `Not an ad ${rand()}`;
    await page.getByTestId("admin-screening-confirm-reason-other").click();
    await page.getByTestId("admin-screening-confirm-note").fill(note);
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.rejected"],
      { timeout: 20000 },
    );
    expect(await statusOf(ad.id)).toBe("rejected");
    expect(await noticesOf(ad.id)).toEqual([{ kind: "admin_reject", reason: "other", note }]);
    expect(await auditOf(ad.id)).toEqual([
      { from: "screening", to: "rejected", reason: "other", note },
    ]);
  });

  test("SRJ-4 the ticked ads take one reason, one notice each", async ({ page }) => {
    const first = await seedWaiting();
    const second = await seedWaiting();
    const { secret } = await signInJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    const wide = (page.viewportSize()?.width ?? 1024) >= 1024;
    for (const ad of [first, second]) {
      await page.getByTestId("admin-screening-search").fill(ad.title);
      const surface = wide ? page.getByRole("table") : page.getByTestId("data-table-cards");
      const tick = surface.getByTestId(
        wide ? `admin-screening-row-${ad.id}-select-cell` : `admin-screening-row-${ad.id}-select`,
      );
      await expect(tick).toBeVisible({ timeout: 20000 });
      await tick.click();
    }
    await expect(page.getByTestId("data-table-selection")).toContainText("2");
    await page.getByTestId("admin-screening-bulk-reject").click();
    await page.getByTestId("admin-screening-confirm-reason-duplicate").click();
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.rejected"],
      { timeout: 20000 },
    );
    for (const ad of [first, second]) {
      expect(await statusOf(ad.id)).toBe("rejected");
      expect(await noticesOf(ad.id)).toEqual([
        { kind: "admin_reject", reason: "duplicate", note: null },
      ]);
    }
  });

  test("SRJ-5 an Approve asks for no reason", async ({ page }) => {
    const ad = await seedWaiting();
    await signInJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(ad.title);
    const wide = (page.viewportSize()?.width ?? 1024) >= 1024;
    const surface = wide ? page.getByRole("table") : page.getByTestId("data-table-cards");
    await expect(
      surface.getByTestId(
        wide ? `admin-screening-row-${ad.id}` : `admin-screening-row-${ad.id}-card`,
      ),
    ).toBeVisible({ timeout: 20000 });
    const actions = surface.getByTestId(
      wide ? `admin-screening-row-${ad.id}-actions-cell` : `admin-screening-row-${ad.id}-actions`,
    );
    await actions.getByTestId(`admin-screening-actions-${ad.id}-more`).click();
    await page.getByTestId(`admin-screening-actions-${ad.id}-more-approve`).click();
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
    await expect(page.getByTestId("admin-screening-confirm-reason-other")).toHaveCount(0);
    await expect(page.getByTestId("admin-screening-confirm-note")).toHaveCount(0);
  });
});
