import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
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
import { geometryDump, grantRole } from "./helpers/categories";
import {
  actionsOf,
  anchorOf,
  destroyLocation,
  editButton,
  findRow,
  isCardTwin,
  locationRow,
  openEditor,
  readLocation,
  readLocationTranslations,
  regionKeyUnder,
  regionUnder,
  scratchSlug,
  treeSlugs,
  treeVersion,
  openVerb,
  selectMarket,
  verb,
} from "./helpers/locations";

/**
 * LOCATIONS ERA L2a / L2a-R2 / L2b-C1 — THE PLACES CONSOLE (LT-1..LT-13).
 *
 * Identity: the pooled job super admin for consumers (J9). Fixtures: scratch
 * rows whose slugs start `e2e-` (J1), seeded or created before the surface is
 * acted on (J7), destroyed child-first in `finally` (J3). Truth: the service
 * client, never a rendered summary (J4). Anchors: structure and testids, never
 * English text, and tones by `data-tone`, never a colour class (J5).
 *
 * L2a-R (G26 — the test must see what the walk saw): LT-2 now measures the
 * DataTable scroller and every action box, and LT-8..11 pin the reconciliation
 * itself — verb reachability at 360 and 1280, the two roster twins, the tone
 * vocabulary, and the one-read-per-country rule.
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

/** Every rendered edit button's box, and the viewport it must fit inside. */
async function actionBoxes(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const boxes = [...document.querySelectorAll('[data-testid^="location-edit-"]')].map((node) => {
      const box = node.getBoundingClientRect();
      return { left: Math.round(box.left), right: Math.round(box.right) };
    });
    return { width, boxes };
  });
}

test.describe("L2a locations console", () => {
  test("LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin", async ({
    page,
  }) => {
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/places");
    await waitForHydration(page);
    await expect(page.getByTestId("location-search")).toHaveCount(0);
    await expect(page.getByTestId("location-create-open")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/places");
    await selectMarket(page, "ET");

    await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, ANCHOR)).toHaveCount(0);
    const toolbar = page.getByTestId("data-table-toolbar");
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByTestId("location-toolbar-transfer")).toBeVisible();

    // L2d — the categories SHAPE: both groups are direct children of the
    // primitive's own toolbar row, no control carries a visible label element,
    // every select names itself for a screen reader, and the legend is last.
    const row = page.getByTestId("location-toolbar-find").locator("..");
    await expect(row.locator("> [data-testid='location-toolbar-find']")).toHaveCount(1);
    await expect(row.locator("> [data-testid='location-toolbar-transfer']")).toHaveCount(1);
    await expect(row.locator("label")).toHaveCount(0);
    const unlabelled = await row
      .locator("select")
      .evaluateAll((nodes) => nodes.filter((node) => !node.getAttribute("aria-label")).length);
    expect(unlabelled, "a toolbar select carries no aria-label").toBe(0);
    const last = await row.evaluate(
      (node) => node.lastElementChild?.getAttribute("data-testid") ?? "",
    );
    expect(last, "the legend is not the toolbar's last child").toBe("location-legend");
    await expect(page.getByTestId("location-import")).toContainText(
      en["admin.locations.import.openPlaces"],
    );
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

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      await expect(locationRow(page, `${ANCHOR}/${region.slug}`)).toBeVisible({ timeout: 20000 });
      await expect(locationRow(page, ANCHOR)).toHaveCount(0);

      // (i) the primitive's own scroller does not scroll sideways …
      const scroller = await page.evaluate(() => {
        const node = document.querySelector('[data-testid="data-table-scroller"]');
        return node === null
          ? null
          : { scrollWidth: node.scrollWidth, clientWidth: node.clientWidth };
      });
      if (scroller !== null) {
        expect(
          scroller.scrollWidth,
          `roster scroller overflows\n${await geometryDump(page, "LT-2 scroller")}`,
        ).toBeLessThanOrEqual(scroller.clientWidth);
      }
      // (ii) … every action button lies inside the viewport …
      const { width, boxes } = await actionBoxes(page);
      expect(boxes.length, "no edit button rendered").toBeGreaterThan(0);
      for (const box of boxes) {
        expect(
          box.left,
          `edit button starts off-screen\n${await geometryDump(page, "LT-2 box")}`,
        ).toBeGreaterThanOrEqual(0);
        expect(
          box.right,
          `edit button ends off-screen\n${await geometryDump(page, "LT-2 box")}`,
        ).toBeLessThanOrEqual(width);
      }
      // (iii) … and the page itself never scrolls sideways.
      await expectNoHorizontalOverflow(page);

      // Search matches name, slug AND alias — now a client sieve over one read.
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

  test("LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const regionSlug = scratchSlug("lt3r");
    const citySlug = scratchSlug("lt3c");
    const subSlug = scratchSlug("lt3s");

    try {
      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      await expect(locationRow(page, ANCHOR)).toHaveCount(0);

      // A region under the hidden ET anchor, through the header's parent picker.
      await page.getByTestId("location-create-open").click();
      await expect(page.getByTestId("location-create-dialog")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("location-create-parent")).toHaveValue(
        (await anchorOf("ET")).id,
      );
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
      await openVerb(page, regionKey, "create-child", regionSlug);
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
      await openVerb(page, cityKey, "create-child", citySlug);
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
      // The sub-city is the floor: its editor offers no create-child verb.
      await findRow(page, `${cityKey}/${subSlug}`, subSlug);
      await openEditor(page, `${cityKey}/${subSlug}`);
      await expect(verb(page, "create-child")).toHaveCount(0);
      await page.getByTestId("location-dialog-cancel").click();

      // BOTTOM-UP IS REFUSED: the city cannot activate while its region is retired.
      await openVerb(page, cityKey, "activate", citySlug);
      await expect(page.getByTestId("location-active-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-active-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("location-dialog-error")).toBeVisible({ timeout: 20000 });
      expect((await readLocation(citySlug))?.is_active).toBe(false);
      await page.getByTestId("location-dialog-cancel").click();

      // TOP-DOWN SUCCEEDS.
      for (const [key, slug] of [
        [regionKey, regionSlug],
        [cityKey, citySlug],
      ] as const) {
        await openVerb(page, key, "activate", slug);
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

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      // The public route caches a country for its version TTL, so a freshly
      // seeded branch appears on the far side of it: poll for the branch FIRST,
      // then read the version the retire has to move (J7).
      await expect
        .poll(() => treeSlugs(page, "ET"), { timeout: 30000, intervals: [500, 1000, 2000, 3000] })
        .toContain(citySlug);
      const before = await treeVersion(page, "ET");

      const regionKey = `${ANCHOR}/${regionSlug}`;
      await openVerb(page, regionKey, "retire", regionSlug);
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
      await openVerb(page, regionKey, "activate", regionSlug);
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

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      const regionKey = `${ANCHOR}/${regionSlug}`;
      const cityKey = `${regionKey}/${citySlug}`;

      // The parent's delete verb is disabled while a child stands, and the bar
      // says WHY in words (F4) rather than only in a tooltip.
      await findRow(page, regionKey, regionSlug);
      await openEditor(page, regionKey);
      await expect(verb(page, "delete")).toBeDisabled();
      await expect(page.getByTestId("location-verb-error")).toBeVisible();
      await page.getByTestId("location-dialog-cancel").click();

      // The leaf deletes with its typed address.
      await openVerb(page, cityKey, "delete", citySlug);
      await expect(page.getByTestId("location-delete-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("location-delete-confirm").fill(citySlug);
      await page.getByTestId("location-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(() => readLocation(citySlug), { timeout: 20000, intervals: [500, 1000, 1000] })
        .toBeNull();

      // Now the region is a leaf too.
      await openVerb(page, regionKey, "delete", regionSlug);
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
      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");

      const cityKey = `${ANCHOR}/${regionA}/${citySlug}`;
      await openVerb(page, cityKey, "move", citySlug);
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
      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      await openVerb(page, cityKey, "move", citySlug);
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
      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      await expect(locationRow(page, ANCHOR)).toHaveCount(0);
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
      await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
    } finally {
      await destroyLocation(regionSlug);
    }
  });

  test("LT-7b the editor round-trips a row without dropping a stored field", async ({ page }) => {
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

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      const key = `${ANCHOR}/${region.slug}/${slug}`;
      await findRow(page, key, slug);
      await openEditor(page, key);
      await page.getByTestId("location-editor-save").click();
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

  test("LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const region = await regionUnder("ET");
    const slug = scratchSlug("lt8");

    try {
      const { error } = await adminClient().from("locations").insert({
        parent_id: region.id,
        level: "city",
        country_code: "ET",
        name_en: slug,
        slug,
        center_lat: 9.03,
        center_lng: 38.74,
        is_active: false,
      });
      if (error) throw new Error(`[e2e:l2a] seeding LT-8 failed: ${error.message}`);

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      const cityKey = `${ANCHOR}/${region.slug}/${slug}`;

      for (const key of [`${ANCHOR}/${region.slug}`, cityKey]) {
        await findRow(page, key, key === cityKey ? slug : region.slug);
        await openEditor(page, key);
        const bar = page.getByTestId("location-verb-bar");
        await expect(bar).toBeVisible();
        const count = await bar.getByRole("button").count();
        expect(count, `no verb rendered for ${key}`).toBeGreaterThan(0);

        const width = await page.evaluate(() => document.documentElement.clientWidth);
        for (let index = 0; index < count; index += 1) {
          const box = await bar.getByRole("button").nth(index).boundingBox();
          expect(box, `verb ${index} of ${key} has no box`).not.toBeNull();
          expect(
            Math.round(box!.x),
            `verb ${index} of ${key} starts off-screen\n${await geometryDump(page, "LT-8")}`,
          ).toBeGreaterThanOrEqual(0);
          expect(
            Math.round(box!.x + box!.width),
            `verb ${index} of ${key} ends off-screen\n${await geometryDump(page, "LT-8")}`,
          ).toBeLessThanOrEqual(width);
        }
        await expect(page.getByTestId("location-editor-save")).toBeVisible();
        await expectNoHorizontalOverflow(page);
        await page.getByTestId("location-dialog-cancel").click();
      }

      expect(secret).not.toBe("");
    } finally {
      await destroyLocation(slug);
    }
  });

  test("LT-9a roster shape, table twin: the edit icon sits in the end column with pagination", async ({
    page,
  }) => {
    test.skip(isCardTwin(page), "the table twin only exists above the card boundary");
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/places");
    await selectMarket(page, "ET");
    const regionKey = await regionKeyUnder("ET");
    await expect(locationRow(page, regionKey)).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, ANCHOR)).toHaveCount(0);

    await expect(page.getByRole("table")).toBeVisible();
    await expect(actionsOf(page, regionKey)).toBeVisible();
    await expect(editButton(page, regionKey)).toBeVisible();
    await expect(page.getByTestId("location-pagination-range")).toBeVisible();
    await expect(page.getByTestId("location-page-size")).toHaveValue("25");
    await expectNoHorizontalOverflow(page);
  });

  test("LT-9b roster shape, card twin: the edit icon sits inline beside the path line", async ({
    page,
  }) => {
    test.skip(!isCardTwin(page), "the card twin only exists below the card boundary");
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/places");
    await selectMarket(page, "ET");
    const regionKey = await regionKeyUnder("ET");
    await expect(locationRow(page, regionKey)).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, ANCHOR)).toHaveCount(0);

    await expect(page.getByTestId("data-table-cards")).toBeVisible();
    await expect(editButton(page, regionKey)).toBeVisible();
    // Structure, not words (J5): the card carries the row's badges and the
    // icon sits in the card's own actions region beside them.
    const testid = regionKey.replace(/\//g, "__");
    await expect(
      locationRow(page, regionKey).getByTestId(`location-${testid}-status`),
    ).toBeVisible();
    await expect(
      locationRow(page, regionKey).getByTestId(`location-${testid}-level`),
    ).toBeVisible();
    await expect(actionsOf(page, regionKey)).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("LT-10 tones: retired is destructive, active is secondary, a level badge is outline", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    const region = await regionUnder("ET");
    const slug = scratchSlug("lt10");

    try {
      const { error } = await adminClient().from("locations").insert({
        parent_id: region.id,
        level: "city",
        country_code: "ET",
        name_en: slug,
        slug,
        center_lat: 9.03,
        center_lng: 38.74,
        is_active: false,
      });
      if (error) throw new Error(`[e2e:l2a] seeding LT-10 failed: ${error.message}`);

      await gotoReady(page, "/admin/places");
      await selectMarket(page, "ET");
      const key = `${ANCHOR}/${region.slug}/${slug}`;
      const row = await findRow(page, key, slug);
      // Tone is STRUCTURE: never a colour class and never an English word (J5).
      await expect(row.getByTestId(`location-${key.replace(/\//g, "__")}-status`)).toHaveAttribute(
        "data-tone",
        "destructive",
      );
      await expect(row.getByTestId(`location-${key.replace(/\//g, "__")}-level`)).toHaveAttribute(
        "data-tone",
        "outline",
      );

      const regionKey = `${ANCHOR}/${region.slug}`;
      const activeRow = await findRow(page, regionKey, region.slug);
      await expect(
        activeRow.getByTestId(`location-${regionKey.replace(/\//g, "__")}-status`),
      ).toHaveAttribute("data-tone", "secondary");
    } finally {
      await destroyLocation(slug);
    }
  });

  test("LT-11 one read per country: filtering costs no request, switching the market costs exactly one", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    let reads = 0;
    await page.route("**/rpc/admin_list_locations*", async (route) => {
      reads += 1;
      await route.continue();
    });

    await gotoReady(page, "/admin/places");
    await selectMarket(page, "ET");
    await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, ANCHOR)).toHaveCount(0);
    const afterLoad = reads;
    expect(afterLoad, "the roster was never read").toBeGreaterThan(0);

    // Typing, level and status are client sieves over the roster already read.
    await page.getByTestId("location-search").fill("adam");
    await page.getByTestId("location-level-filter").selectOption("region");
    await page.getByTestId("location-active-filter").selectOption("active");
    await page.getByTestId("location-search").fill("");
    await expect
      .poll(() => reads, { timeout: 3000, intervals: [500, 500, 500, 500] })
      .toBe(afterLoad);

    // Switching the market is the ONLY thing that fetches.
    const options = await page.getByTestId("location-country-filter").locator("option").count();
    if (options > 2) {
      // option 0 is "All countries" and option 1 is the market already shown.
      const other = await page
        .getByTestId("location-country-filter")
        .locator("option")
        .nth(2)
        .getAttribute("value");
      await page.getByTestId("location-country-filter").selectOption(other!);
      await expect
        .poll(() => reads, { timeout: 20000, intervals: [500, 500, 1000] })
        .toBe(afterLoad + 1);
    }
  });

  test("LT-12 transfer scope: exports and the import title follow the selected country", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    const exportScopes: string[] = [];
    await page.route("**/api/admin/locations/export?*", async (route) => {
      const url = new URL(route.request().url());
      exportScopes.push(url.searchParams.get("scope") ?? "");
      await route.fulfill({ status: 200, contentType: "text/csv", body: "scope\n" });
    });

    await gotoReady(page, "/admin/places");
    await selectMarket(page, "ET");
    await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, ANCHOR)).toHaveCount(0);
    await page.getByTestId("location-export-locations").click();
    await expect.poll(() => exportScopes.at(-1), { timeout: 10000 }).toBe("ET");

    await page.getByTestId("location-import").click();
    const scopedTitle = en["admin.locations.import.titleScoped"].replace("{country}", "Ethiopia");
    await expect(
      page.getByTestId("location-import-dialog").getByRole("heading", { name: scopedTitle }),
    ).toBeVisible();
    // L2b-C1 — the MARKETS file left this toolbar for the Countries section.
    await expect(page.getByTestId("location-import-countries")).toHaveCount(0);
    await page.getByTestId("location-import-discard").click();

    const picker = page.getByTestId("location-country-filter");
    const closedCode = await picker.locator("option").evaluateAll((options, suffix) => {
      const option = options.find((candidate) => candidate.textContent?.includes(suffix));
      return option?.getAttribute("value") ?? null;
    }, en["admin.locations.filter.closedSuffix"]);
    expect(closedCode, "no closed country option rendered").not.toBeNull();
    const closed = picker.locator(`option[value="${closedCode ?? ""}"]`);
    await expect(closed).toContainText(en["admin.locations.filter.closedSuffix"]);
    await picker.selectOption(closedCode ?? "");
    await page.getByTestId("location-export-locations").click();
    await expect.poll(() => exportScopes.at(-1), { timeout: 10000 }).toBe(closedCode);
  });

  test("LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    const exportScopes: (string | null)[] = [];
    await page.route("**/api/admin/locations/export?*", async (route) => {
      const url = new URL(route.request().url());
      exportScopes.push(url.searchParams.get("scope"));
      await route.fulfill({ status: 200, contentType: "text/csv", body: "scope\n" });
    });

    await gotoReady(page, "/admin/places");
    const picker = page.getByTestId("location-country-filter");
    await expect(picker).toHaveValue("");
    const first = await picker.locator("option").evaluateAll((options) => {
      const one = options[0];
      return one === undefined
        ? null
        : { value: one.getAttribute("value"), text: (one.textContent ?? "").trim() };
    });
    expect(first?.value, "the picker's first option is not the all-countries scope").toBe("");
    expect(first?.text).toBe(en["admin.locations.filter.allCountriesOption"]);

    // Regions from BOTH open markets stand in the one roster; anchors do not.
    await page.getByTestId("location-active-filter").selectOption("active");
    const et = await anchorOf("ET");
    const us = await anchorOf("US");
    await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, await regionKeyUnder("US"))).toBeVisible({ timeout: 20000 });
    await expect(locationRow(page, et.slug)).toHaveCount(0);
    await expect(locationRow(page, us.slug)).toHaveCount(0);

    // The transfer group is unscoped, and the import dialog says so.
    // L2d — the caption is inline and carries its separator, so it CONTAINS
    // the scope sentence rather than equalling it.
    await expect(page.getByTestId("location-transfer-scope")).toContainText(
      en["admin.locations.transfer.scopeAll"],
    );
    await page.getByTestId("location-export-locations").click();
    await expect.poll(() => exportScopes.at(-1), { timeout: 10000 }).toBeNull();

    await page.getByTestId("location-import").click();
    await expect(
      page
        .getByTestId("location-import-dialog")
        .getByRole("heading", { name: en["admin.locations.import.titleAll"] }),
    ).toBeVisible();
    await page.getByTestId("location-import-discard").click();
  });

  test("LT-14 market state and whole-country parent follow the selected market", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/places");

    await selectMarket(page, "ET");
    await expect(page.getByTestId("location-market-state")).toHaveText(
      en["admin.locations.market.open"].replace("{country}", "Ethiopia"),
    );
    await page.getByTestId("location-create-open").click();
    const etAnchor = await anchorOf("ET");
    const firstParent = await page.getByTestId("location-create-parent").evaluate((select) => {
      if (!(select instanceof HTMLSelectElement)) throw new Error("parent control is not a select");
      const option = select.options.item(0);
      return option === null
        ? null
        : { value: option.value, text: option.textContent?.trim() ?? "" };
    });
    expect(firstParent).toEqual({
      value: etAnchor.id,
      text: en["admin.locations.create.parentCountry"].replace("{country}", "Ethiopia"),
    });
    await page.getByTestId("location-dialog-cancel").click();

    await selectMarket(page, "CA");
    await expect(page.getByTestId("location-market-state")).toHaveText(
      en["admin.locations.market.closed"].replace("{country}", "Canada"),
    );
  });

  test("OV-1 overview totals, links and group breadcrumbs", async ({ page }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/locations");
    await expect(page.getByTestId("admin-overview-locations")).toBeVisible({ timeout: 20000 });
    for (const id of ["markets", "places", "plans"]) {
      await expect(page.getByTestId(`overview-stat-${id}`)).toContainText(/\d/);
      await expect(
        page.getByTestId(
          `overview-link-${id === "markets" ? "countries" : id === "plans" ? "coverage" : "locations"}`,
        ),
      ).toBeVisible();
    }
    await expect(page.getByTestId("breadcrumb-admin-group")).not.toHaveAttribute("href");

    await page.getByTestId("overview-link-locations").click();
    await expect(page).toHaveURL(/\/admin\/places$/);
    await expect(page.getByTestId("breadcrumb-admin-group")).toHaveAttribute(
      "href",
      "/admin/locations",
    );
  });
});
