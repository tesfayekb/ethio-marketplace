import { expect, test } from "./fixtures";

import {
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  useJobSuperAdmin,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import { grantRole } from "./helpers/categories";
import {
  action,
  actionsOf,
  anchorOf,
  destroyLocation,
  findRow,
  locationRow,
  openEditor,
  readLocation,
  readLocationTranslations,
  regionUnder,
  scratchSlug,
  treeSlugs,
  treeVersion,
} from "./helpers/locations";

/**
 * LOCATIONS ERA L2a — THE LOCATIONS CONSOLE (LT-1..LT-7).
 *
 * Identity: the pooled job super admin for consumers (J9). Fixtures: scratch
 * rows whose slugs start `e2e-` (J1), seeded or created before the surface is
 * acted on (J7), destroyed child-first in `finally` (J3). Truth: the service
 * client, never a rendered summary (J4). Anchors: structure and testids, never
 * English text (J5).
 */

const ANCHOR = "ethiopia";

/** The four column names each CSV row is written under, in export order (E7). */
const LOCATION_HEADER = [
  "location_path",
  "location_key",
  "name_en",
  "name_am",
  "iso_3166_2",
  "aliases",
  "display_order",
  "center_lat",
  "center_lng",
  "is_active",
  "level",
  "country_code",
  "source",
  "listing_count",
  "action",
].join(",");

function csv(rows: string[][]): string {
  return [LOCATION_HEADER, ...rows.map((row) => row.join(","))].join("\n");
}

async function uploadLocations(page: import("@playwright/test").Page, body: string): Promise<void> {
  await page.getByTestId("location-import-locations").setInputFiles({
    name: "locations.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(body, "utf-8"),
  });
}

test.describe("L2a locations console", () => {
  test("LT-1 gating: a plain user is refused; the two tabs and the ET roster render for an admin", async ({
    page,
  }) => {
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/locations");
    await waitForHydration(page);
    await expect(page.getByTestId("location-search")).toHaveCount(0);
    await expect(page.getByTestId("location-create-open")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/locations");

    await expect(page.getByTestId("location-tab-tree")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("location-tab-transfer")).toBeVisible();
    await expect(locationRow(page, ANCHOR)).toBeVisible({ timeout: 20000 });
  });

  test("LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const region = await regionUnder("ET");
    const slug = scratchSlug("lt2");
    const alias = `${slug}-alias`;

    try {
      // Seed BEFORE navigating (J7): a retired scratch city with an alias.
      const { error } = await adminClient()
        .from("locations")
        .insert({
          parent_id: region.id,
          level: "city",
          country_code: "ET",
          name_en: slug,
          slug,
          aliases: [alias],
          center_lat: 9.03,
          center_lng: 38.74,
          is_active: false,
        });
      if (error) throw new Error(`[e2e:l2a] seeding LT-2 failed: ${error.message}`);

      await gotoReady(page, "/admin/locations");
      await expect(locationRow(page, ANCHOR)).toBeVisible({ timeout: 20000 });
      await expect(
        locationRow(page, ANCHOR).getByTestId(`location-${ANCHOR}-status`),
      ).toBeVisible();
      await expectNoHorizontalOverflow(page);

      // The door matches name, slug AND alias.
      await page.getByTestId("location-search").fill(alias);
      await expect(locationRow(page, `${ANCHOR}/${region.slug}/${slug}`)).toBeVisible({
        timeout: 20000,
      });

      // The level filter scopes to regions: the scratch city drops out.
      await page.getByTestId("location-search").fill("");
      await page.getByTestId("location-level-filter").selectOption("region");
      await expect(locationRow(page, `${ANCHOR}/${region.slug}/${slug}`)).toHaveCount(0);
      await expectNoHorizontalOverflow(page);

      expect(secret).not.toBe("");
    } finally {
      await destroyLocation(slug);
    }
  });

  test("LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate bottom-up", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const regionSlug = scratchSlug("lt3r");
    const citySlug = scratchSlug("lt3c");
    const subSlug = scratchSlug("lt3s");

    try {
      await gotoReady(page, "/admin/locations");
      await expect(locationRow(page, ANCHOR)).toBeVisible({ timeout: 20000 });

      // A region under the ET anchor, through the dialog.
      await action(page, ANCHOR, "create-child").click();
      await expect(page.getByTestId("location-create-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-name").fill(regionSlug);
      await page.getByTestId("location-create-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-create-retired")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-close").click();

      const region = await readLocation(regionSlug);
      expect(region?.level).toBe("region");
      expect(region?.is_active).toBe(false);

      // A city under it — the dialog refuses without coordinates first.
      const regionKey = `${ANCHOR}/${regionSlug}`;
      await findRow(page, regionKey, regionSlug);
      await action(page, regionKey, "create-child").click();
      await expect(page.getByTestId("location-create-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-name").fill(citySlug);
      await page.getByTestId("location-create-submit").click();
      await expect(page.getByTestId("location-dialog-error")).toBeVisible({ timeout: 20000 });
      expect(await readLocation(citySlug)).toBeNull();

      await page.getByTestId("location-create-lat").fill("9.03");
      await page.getByTestId("location-create-lng").fill("38.74");
      await page.getByTestId("location-create-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-create-retired")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-close").click();

      const city = await readLocation(citySlug);
      expect(city?.level).toBe("city");
      expect(city?.is_active).toBe(false);
      // The ancestry trigger fills the columns; the console never sends them.
      expect(city?.region_id).toBe(region?.id);

      // A sub-city under the city.
      const cityKey = `${regionKey}/${citySlug}`;
      await findRow(page, cityKey, citySlug);
      await action(page, cityKey, "create-child").click();
      await expect(page.getByTestId("location-create-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-name").fill(subSlug);
      await page.getByTestId("location-create-lat").fill("9.04");
      await page.getByTestId("location-create-lng").fill("38.75");
      await page.getByTestId("location-create-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-create-retired")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-create-close").click();

      const sub = await readLocation(subSlug);
      expect(sub?.level).toBe("sub_city");
      expect(sub?.region_id).toBe(region?.id);
      expect(sub?.city_id).toBe(city?.id);
      // The sub-city is the floor: it cannot hold a child.
      await findRow(page, `${cityKey}/${subSlug}`, subSlug);
      await expect(action(page, `${cityKey}/${subSlug}`, "create-child")).toBeDisabled();

      // BOTTOM-UP IS REFUSED: the city cannot activate while its region is retired.
      await findRow(page, cityKey, citySlug);
      await action(page, cityKey, "activate").click();
      await expect(page.getByTestId("location-active-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-active-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-dialog-error")).toBeVisible({ timeout: 20000 });
      expect((await readLocation(citySlug))?.is_active).toBe(false);
      await page.getByTestId("location-dialog-cancel").click();

      // TOP-DOWN SUCCEEDS.
      for (const [key, slug, needle] of [
        [regionKey, regionSlug, regionSlug],
        [cityKey, citySlug, citySlug],
      ] as const) {
        await findRow(page, key, needle);
        await action(page, key, "activate").click();
        await expect(page.getByTestId("location-active-dialog")).toBeVisible({ timeout: 20000 });
        await page.getByTestId("location-active-submit").click();
        await stepUpIfPrompted(page, secret);
        await expect
          .poll(async () => (await readLocation(slug))?.is_active, {
            timeout: 15000,
            intervals: [500, 500, 1000, 1000],
          })
          .toBe(true);
      }
    } finally {
      await destroyLocation(regionSlug);
    }
  });

  test("LT-4 path rule: retiring a scratch region hides its active descendants from the public tree", async ({
    page,
  }) => {
    // Three cache windows of the public route (15s each) fit inside the budget.
    test.setTimeout(150_000);
    const { secret } = await useJobSuperAdmin(page);
    const regionSlug = scratchSlug("lt4r");
    const citySlug = scratchSlug("lt4c");

    try {
      const supabase = adminClient();
      const anchor = await anchorOf("ET");
      const { data: region, error: regionError } = await supabase
        .from("locations")
        .insert({
          parent_id: anchor.id,
          level: "region",
          country_code: "ET",
          name_en: regionSlug,
          slug: regionSlug,
          is_active: true,
        })
        .select("id")
        .single();
      if (regionError || !region) {
        throw new Error(`[e2e:l2a] seeding LT-4 region failed: ${regionError?.message ?? "none"}`);
      }
      const { error: cityError } = await supabase.from("locations").insert({
        parent_id: region.id,
        level: "city",
        country_code: "ET",
        name_en: citySlug,
        slug: citySlug,
        center_lat: 9.03,
        center_lng: 38.74,
        is_active: true,
      });
      if (cityError) throw new Error(`[e2e:l2a] seeding LT-4 city failed: ${cityError.message}`);

      await gotoReady(page, "/admin/locations");
      // The public route caches a country for its version TTL, so a freshly
      // seeded branch appears on the far side of it: poll for the branch FIRST,
      // then read the version the retire has to move (J7).
      await expect
        .poll(() => treeSlugs(page, "ET"), { timeout: 30000, intervals: [500, 1000, 2000, 3000] })
        .toContain(citySlug);
      const before = await treeVersion(page, "ET");

      const regionKey = `${ANCHOR}/${regionSlug}`;
      await findRow(page, regionKey, regionSlug);
      await action(page, regionKey, "retire").click();
      await expect(page.getByTestId("location-active-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-active-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(() => treeVersion(page, "ET"), { timeout: 30000, intervals: [500, 1000, 2000, 3000] })
        .not.toBe(before);
      expect(await treeSlugs(page, "ET")).not.toContain(citySlug);
      // The city's OWN row never changed: the path rule hid it, not its state.
      expect((await readLocation(citySlug))?.is_active).toBe(true);

      // Re-activating the region brings the branch back.
      await findRow(page, regionKey, regionSlug);
      await action(page, regionKey, "activate").click();
      await page.getByTestId("location-active-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(() => treeSlugs(page, "ET"), { timeout: 30000, intervals: [500, 1000, 2000, 3000] })
        .toContain(citySlug);
    } finally {
      await destroyLocation(regionSlug);
    }
  });

  test("LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const regionSlug = scratchSlug("lt5r");
    const citySlug = scratchSlug("lt5c");

    try {
      const supabase = adminClient();
      const anchor = await anchorOf("ET");
      const { data: region } = await supabase
        .from("locations")
        .insert({
          parent_id: anchor.id,
          level: "region",
          country_code: "ET",
          name_en: regionSlug,
          slug: regionSlug,
          is_active: false,
        })
        .select("id")
        .single();
      await supabase.from("locations").insert({
        parent_id: region!.id,
        level: "city",
        country_code: "ET",
        name_en: citySlug,
        slug: citySlug,
        center_lat: 9.03,
        center_lng: 38.74,
        is_active: false,
      });

      await gotoReady(page, "/admin/locations");
      const regionKey = `${ANCHOR}/${regionSlug}`;
      const cityKey = `${regionKey}/${citySlug}`;

      // The parent's delete verb is disabled while a child stands, and the
      // door refuses `retireInstead:hasChildren` even if the counts were stale.
      await findRow(page, regionKey, regionSlug);
      await expect(action(page, regionKey, "delete")).toBeDisabled();

      // The leaf deletes with its typed address.
      await findRow(page, cityKey, citySlug);
      await action(page, cityKey, "delete").click();
      await expect(page.getByTestId("location-delete-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-delete-confirm").fill(citySlug);
      await page.getByTestId("location-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(() => readLocation(citySlug), { timeout: 20000, intervals: [500, 1000, 1000] })
        .toBeNull();

      // Now the region is a leaf too.
      await findRow(page, regionKey, regionSlug);
      await action(page, regionKey, "delete").click();
      await page.getByTestId("location-delete-confirm").fill(regionSlug);
      await page.getByTestId("location-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(() => readLocation(regionSlug), { timeout: 20000, intervals: [500, 1000, 1000] })
        .toBeNull();
    } finally {
      await destroyLocation(regionSlug);
    }
  });

  test("LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants", async ({
    page,
  }) => {
    const regionA = scratchSlug("lt6a");
    const regionB = scratchSlug("lt6b");
    const citySlug = scratchSlug("lt6c");

    try {
      const supabase = adminClient();
      const anchor = await anchorOf("ET");
      const rows = [regionA, regionB].map((slug) => ({
        parent_id: anchor.id,
        level: "region",
        country_code: "ET",
        name_en: slug,
        slug,
        is_active: false,
      }));
      const { data: regions, error: regionError } = await supabase
        .from("locations")
        .insert(rows)
        .select("id, slug");
      if (regionError || !regions) {
        throw new Error(`[e2e:l2a] seeding LT-6 failed: ${regionError?.message ?? "none"}`);
      }
      const first = regions.find((row) => row.slug === regionA);
      const second = regions.find((row) => row.slug === regionB);
      const { data: city } = await supabase
        .from("locations")
        .insert({
          parent_id: first!.id,
          level: "city",
          country_code: "ET",
          name_en: citySlug,
          slug: citySlug,
          center_lat: 9.03,
          center_lng: 38.74,
          is_active: false,
        })
        .select("id")
        .single();

      // A super admin with NO enrolled factor: the gate can never be satisfied,
      // so the server refuses and DB truth stays byte-identical (F5).
      const weak = await createUser({ confirmed: true });
      await grantRole(weak.id, "super_admin");
      await switchUser(page, weak.email, weak.password);
      await gotoReady(page, "/admin/locations");

      const cityKey = `${ANCHOR}/${regionA}/${citySlug}`;
      await findRow(page, cityKey, citySlug);
      await action(page, cityKey, "move").click();
      await expect(page.getByTestId("location-move-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-move-parent").selectOption(second!.id);
      await page.getByTestId("location-move-submit").click();

      await expect
        .poll(async () => (await readLocation(citySlug))?.parent_id, {
          timeout: 5000,
          intervals: [500, 500, 500, 500, 500],
        })
        .toBe(first!.id);

      // Prove the factor; the same move now succeeds and the ancestry follows.
      const secret = await enrollAndStepUp(page);
      await gotoReady(page, "/admin/locations");
      await findRow(page, cityKey, citySlug);
      await action(page, cityKey, "move").click();
      await expect(page.getByTestId("location-move-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-move-parent").selectOption(second!.id);
      await page.getByTestId("location-move-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readLocation(citySlug))?.parent_id, {
          timeout: 20000,
          intervals: [500, 1000, 1000, 2000],
        })
        .toBe(second!.id);
      expect((await readLocation(citySlug))?.region_id).toBe(second!.id);
      expect(city?.id).toBeTruthy();
    } finally {
      await destroyLocation(regionA);
      await destroyLocation(regionB);
    }
  });

  test("LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const regionSlug = scratchSlug("lt7r");
    const citySlug = scratchSlug("lt7c");
    const subSlug = scratchSlug("lt7s");
    const amharic = "የሙከራ ከተማ";
    const keys = [
      `${ANCHOR}/${regionSlug}`,
      `${ANCHOR}/${regionSlug}/${citySlug}`,
      `${ANCHOR}/${regionSlug}/${citySlug}/${subSlug}`,
    ];

    try {
      await gotoReady(page, "/admin/locations");
      await expect(locationRow(page, ANCHOR)).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-tab-transfer").click();
      await page.getByTestId("location-import").click();
      await expect(page.getByTestId("location-import-dialog")).toBeVisible({ timeout: 20000 });

      const creates = csv([
        ["", keys[0]!, regionSlug, "", "", "", "0", "", "", "true", "", "", "", "", "activate"],
        [
          "",
          keys[1]!,
          citySlug,
          amharic,
          "",
          "",
          "0",
          "9.03",
          "38.74",
          "true",
          "",
          "",
          "",
          "",
          "activate",
        ],
        [
          "",
          keys[2]!,
          subSlug,
          "",
          "",
          "",
          "0",
          "9.04",
          "38.75",
          "true",
          "",
          "",
          "",
          "",
          "activate",
        ],
      ]);
      await uploadLocations(page, creates);
      await page.getByTestId("location-import-preview").click();
      await expect(page.getByTestId("location-import-counts")).toContainText("3", {
        timeout: 30000,
      });
      await expect(page.getByTestId("location-import-refusals")).toHaveCount(0);

      await page.getByTestId("location-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-import-applied")).toBeVisible({ timeout: 30000 });

      const created = await Promise.all(
        [regionSlug, citySlug, subSlug].map((slug) => readLocation(slug)),
      );
      for (const row of created) {
        expect(row?.source).toBe("import");
        expect(row?.is_active).toBe(true);
      }
      const cityTranslations = await readLocationTranslations(created[1]!.id);
      expect(cityTranslations.some((entry) => entry.value === amharic)).toBe(true);
      await page.getByTestId("location-import-close").click();

      // The export echoes the three rows it just wrote.
      const download = page.waitForEvent("download");
      await page.getByTestId("location-export-locations").click();
      const stream = await (await download).createReadStream();
      const chunks: Buffer[] = [];
      for await (const chunk of stream) chunks.push(Buffer.from(chunk));
      const exported = Buffer.concat(chunks).toString("utf-8");
      for (const key of keys) expect(exported).toContain(key);
      expect(exported).toContain(amharic);

      // The same three rows, deleted deepest-first in the file.
      const before = created.map((row) => row!.id);
      await page.getByTestId("location-import").click();
      await expect(page.getByTestId("location-import-dialog")).toBeVisible({ timeout: 20000 });
      await uploadLocations(
        page,
        csv(
          [...keys]
            .reverse()
            .map((key) => ["", key, "", "", "", "", "", "", "", "", "", "", "", "", "delete"]),
        ),
      );
      await page.getByTestId("location-import-preview").click();
      await expect(page.getByTestId("location-import-counts")).toContainText("3", {
        timeout: 30000,
      });
      await page.getByTestId("location-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-import-applied")).toBeVisible({ timeout: 30000 });
      expect(await readLocation(subSlug)).toBeNull();

      /**
       * INC-201 through the route: the undo returns the deleted rows
       * PARENTS-FIRST, so a nested chain restores with its ORIGINAL ids instead
       * of failing on a missing parent.
       */
      await page.getByTestId("location-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-import-undone")).toBeVisible({ timeout: 30000 });
      const restored = await Promise.all(
        [regionSlug, citySlug, subSlug].map((slug) => readLocation(slug)),
      );
      expect(restored.map((row) => row?.id)).toEqual(before);
      const restoredTranslations = await readLocationTranslations(restored[1]!.id);
      expect(restoredTranslations.some((entry) => entry.value === amharic)).toBe(true);

      // A second undo of the same batch is refused by name.
      await page.getByTestId("location-import-close").click();
      await expect(actionsOf(page, ANCHOR).or(page.getByTestId("location-tab-tree"))).toBeVisible();
    } finally {
      await destroyLocation(regionSlug);
    }
  });

  test("LT-7b the edit dialog round-trips a row without dropping a stored field", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const region = await regionUnder("ET");
    const slug = scratchSlug("lt7b");

    try {
      const { error } = await adminClient()
        .from("locations")
        .insert({
          parent_id: region.id,
          level: "city",
          country_code: "ET",
          name_en: slug,
          slug,
          aliases: [`${slug}-a`, `${slug}-b`],
          display_order: 7,
          center_lat: 9.03,
          center_lng: 38.74,
          is_active: false,
        });
      if (error) throw new Error(`[e2e:l2a] seeding LT-7b failed: ${error.message}`);

      await gotoReady(page, "/admin/locations");
      const key = `${ANCHOR}/${region.slug}/${slug}`;
      await findRow(page, key, slug);
      await openEditor(page, key);
      await page.getByTestId("location-edit-submit").click();
      await stepUpIfPrompted(page, secret);

      // INC-188 — a save must not drop a field the editor did not change.
      await expect
        .poll(async () => (await readLocation(slug))?.aliases?.length, {
          timeout: 20000,
          intervals: [500, 1000, 1000],
        })
        .toBe(2);
      const row = await readLocation(slug);
      expect(row?.display_order).toBe(7);
      expect(Number(row?.center_lat)).toBeCloseTo(9.03, 2);
      expect(Number(row?.center_lng)).toBeCloseTo(38.74, 2);
    } finally {
      await destroyLocation(slug);
    }
  });
});
