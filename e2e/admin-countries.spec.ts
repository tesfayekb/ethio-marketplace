import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { geometryDump, grantRole } from "./helpers/categories";
import {
  countryRow,
  destroyCountry,
  findRow,
  openEditor,
  openVerb,
  readAnchor,
  readCountry,
  readRootOrder,
  scratchCountryCode,
  scratchCountryName,
  seedCountry,
  verb,
} from "./helpers/countries";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  useJobSuperAdmin,
  waitForHydration,
} from "./helpers/ui";
import { createUser } from "./helpers/users";

/**
 * LOCATIONS ERA L2b-C1 — THE COUNTRIES CONSOLE (CO-1..CO-8).
 *
 * Identity: the pooled job super admin for consumers (J9). Fixtures: scratch
 * markets whose codes come from the ISO USER-ASSIGNED ranges (J1), seeded or
 * created before the surface is acted on (J7), destroyed in `finally` (J3).
 * Truth: the service client, never a rendered summary (J4). Anchors: structure
 * and testids, never English text, and tones by `data-tone` (J5).
 *
 * The 249-row ISO seed (L2b-S) is NOT assumed: staging carries it only after
 * the operator applies that migration, so every roster claim is `>= 6`.
 */

const MARKETS_HEADER = [
  "country_code",
  "name_en",
  "is_active",
  "unit_system",
  "currency_code",
  "display_order",
  "root_order",
  "action",
].join(",");

test.describe("L2b countries console", () => {
  test("CO-1 gating: a plain user is refused; the roster and its transfer toolbar render for an admin", async ({
    page,
  }) => {
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/countries");
    await waitForHydration(page);
    await expect(page.getByTestId("country-search")).toHaveCount(0);
    await expect(page.getByTestId("country-create-open")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/countries");

    await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });
    const toolbar = page.getByTestId("data-table-toolbar");
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByTestId("country-toolbar-transfer")).toBeVisible();
  });

  test("CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/countries");
    await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });

    // The pagination total is the roster's own count: never fewer than the six
    // seed markets, whether or not the ISO seed has been applied here.
    const total = await page.getByTestId("country-pagination").innerText();
    const digits = (total.match(/\d+/g) ?? []).map((value) => Number(value));
    expect(Math.max(...digits, 0), `roster too small\n${total}`).toBeGreaterThanOrEqual(6);

    await expect(countryRow(page, "ET").getByTestId("country-ET-status")).toHaveAttribute(
      "data-tone",
      "secondary",
    );

    // Search narrows to Ethiopia; the closed filter then hides every open one.
    await page.getByTestId("country-search").fill("eth");
    await expect(countryRow(page, "ET")).toBeVisible();
    await page.getByTestId("country-search").fill("");
    await page.getByTestId("country-status-filter").selectOption("closed");
    await expect(countryRow(page, "ET")).toHaveCount(0);
    await expect(countryRow(page, "US")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });

  test("CO-3 creation is absent from the header; the countries file is the only creation path", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/countries");
    await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("country-create-open")).toHaveCount(0);
    await expect(page.getByTestId("country-import")).toBeVisible();
  });

  test("CO-4 open and close: opening publishes the market's tree, closing takes it away", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const code = await scratchCountryCode();

    try {
      await seedCountry(code);
      await gotoReady(page, "/admin/countries");
      await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });

      // A closed market is not published: the public tree refuses it.
      expect((await page.request.get(`/api/locations/${code}`)).status()).toBe(404);

      await openVerb(page, code, "open", code);
      await expect(page.getByTestId("country-active-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("country-active-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readCountry(code))?.is_active, { timeout: 20000 })
        .toBe(true);
      expect((await readAnchor(code))?.is_active).toBe(true);

      const published = await page.request.get(`/api/locations/${code}`);
      expect(published.status()).toBe(200);
      const body = (await published.json()) as { nodes?: { slug: string; level: string }[] };
      expect(body.nodes?.[0]?.level).toBe("country");

      await openVerb(page, code, "close", code);
      await page.getByTestId("country-active-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readCountry(code))?.is_active, { timeout: 20000 })
        .toBe(false);
      await expect
        .poll(async () => (await page.request.get(`/api/locations/${code}`)).status(), {
          timeout: 20000,
        })
        .toBe(404);
    } finally {
      await destroyCountry(code);
    }
  });

  test("CO-5 profile round trip: units, currency and order are saved and read back", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const code = await scratchCountryCode();

    try {
      await seedCountry(code);
      await gotoReady(page, "/admin/countries");
      await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });

      await findRow(page, code, code);
      await openEditor(page, code);
      await page.getByTestId("country-editor-unit").selectOption("imperial");
      await page.getByTestId("country-editor-currency").fill("GBP");
      await page.getByTestId("country-editor-order").fill("7");
      await page.getByTestId("country-editor-save").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readCountry(code))?.unit_system, { timeout: 20000 })
        .toBe("imperial");
      const row = await readCountry(code);
      expect(row?.currency_code).toBe("GBP");
      expect(row?.display_order).toBe(7);
    } finally {
      await destroyCountry(code);
    }
  });

  test("CO-6 rail order: two roots are stored in position order, and the reset removes every row", async ({
    page,
  }) => {
    const { secret } = await useJobSuperAdmin(page);
    const code = await scratchCountryCode();

    try {
      await seedCountry(code);
      await gotoReady(page, "/admin/countries");
      await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });

      await openVerb(page, code, "rail-order", code);
      await expect(page.getByTestId("country-rail-dialog")).toBeVisible({ timeout: 20000 });
      // A market with no order of its own says it follows the global one.
      await expect(page.getByTestId("country-rail-global")).toBeVisible();

      const ids = await page.getByTestId("country-rail-list").evaluate((root) =>
        [...root.querySelectorAll("[data-testid]")]
          .map((node) => node.getAttribute("data-testid") ?? "")
          .filter((id) => /^country-rail-[0-9a-f-]{36}$/.test(id))
          .map((id) => id.slice("country-rail-".length)),
      );

      if (ids.length > 1) {
        // Swap the first two, then save: the DB holds the rendered order.
        await page.getByTestId(`country-rail-down-${ids[0]}`).click();
        await page.getByTestId("country-rail-save").click();
        await stepUpIfPrompted(page, secret);

        await expect
          .poll(async () => (await readRootOrder(code)).length, { timeout: 20000 })
          .toBeGreaterThan(1);
        const stored = await readRootOrder(code);
        expect(stored[0]?.position).toBe(1);
        expect(stored[0]?.category_id).toBe(ids[1]);
        expect(stored[1]?.category_id).toBe(ids[0]);
        await openVerb(page, code, "rail-order", code);
      } else {
        // Fewer than two ACTIVE ROOTS is a legitimate catalog state: there is
        // nothing to swap, so only the list itself is asserted and the reset
        // below still proves the door's empty-is-reset law.
        await expect(page.getByTestId("country-rail-list")).toBeVisible();
      }

      // The reset saves an EMPTY list: the market carries no order of its own.
      await page.getByTestId("country-rail-reset").click();
      await stepUpIfPrompted(page, secret);
      await expect.poll(async () => (await readRootOrder(code)).length, { timeout: 20000 }).toBe(0);
    } finally {
      await destroyCountry(code);
    }
  });

  test("CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back", async ({
    page,
  }) => {
    // Preview, commit and a refused undo are three step-up round trips: this one
    // test carries its own budget rather than the suite's default (J5).
    test.setTimeout(180_000);
    const { secret } = await useJobSuperAdmin(page);
    const code = await scratchCountryCode();

    try {
      await gotoReady(page, "/admin/countries");
      await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });
      const toolbar = page.getByTestId("data-table-toolbar");
      await expect(toolbar.getByTestId("country-export")).toBeVisible();
      await expect(toolbar.getByTestId("country-import")).toBeVisible();

      await toolbar.getByTestId("country-import").click();
      await expect(
        page
          .getByTestId("country-import-dialog")
          .getByRole("heading", { name: en["admin.countries.import.title"] }),
      ).toBeVisible({ timeout: 20000 });

      const body = [
        MARKETS_HEADER,
        [code, scratchCountryName(code), "false", "metric", "USD", "0", "", "upsert"].join(","),
      ].join("\n");
      await page.getByTestId("country-import-countries").setInputFiles({
        name: "countries.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(body, "utf-8"),
      });
      await page.getByTestId("country-import-preview").click();
      await expect(page.getByTestId("country-import-counts")).toBeVisible({ timeout: 20000 });
      // A PREVIEW WRITES NOTHING (F5).
      expect(await readCountry(code)).toBeNull();

      await page.getByTestId("country-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("country-import-applied")).toBeVisible({ timeout: 20000 });
      expect((await readCountry(code))?.is_active).toBe(false);

      // THE UNDO PUTS IT BACK (INC-206): the market created by this batch was
      // born with its anchor place, and the undo now takes BOTH away, so the
      // roster is exactly as it was before the file was applied.
      await page.getByTestId("country-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect.poll(async () => await readCountry(code), { timeout: 30000 }).toBeNull();
      expect(await readAnchor(code)).toBeNull();
    } finally {
      await destroyCountry(code);
    }
  });

  test("CO-8 geometry: nothing overflows and every verb is reachable in both twins", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/countries");
    await expect(countryRow(page, "ET")).toBeVisible({ timeout: 20000 });

    const scroller = await page.evaluate(() => {
      const node = document.querySelector('[data-testid="data-table-scroller"]');
      return node === null
        ? null
        : { scrollWidth: node.scrollWidth, clientWidth: node.clientWidth };
    });
    if (scroller !== null) {
      expect(
        scroller.scrollWidth,
        `roster scroller overflows\n${await geometryDump(page, "CO-8 scroller")}`,
      ).toBeLessThanOrEqual(scroller.clientWidth);
    }
    await expectNoHorizontalOverflow(page);

    await findRow(page, "ET", "eth");
    await openEditor(page, "ET");
    await expect(verb(page, "close")).toBeVisible();
    await expect(verb(page, "rail-order")).toBeVisible();
    const boxes = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return {
        width,
        boxes: [...document.querySelectorAll('[data-testid^="country-verb-"]')].map((node) => {
          const box = node.getBoundingClientRect();
          return { left: Math.round(box.left), right: Math.round(box.right) };
        }),
      };
    });
    for (const box of boxes.boxes) {
      expect(
        box.left,
        `verb starts off-screen\n${await geometryDump(page, "CO-8 box")}`,
      ).toBeGreaterThanOrEqual(0);
      expect(
        box.right,
        `verb ends off-screen\n${await geometryDump(page, "CO-8 box")}`,
      ).toBeLessThanOrEqual(boxes.width);
    }
    await page.getByTestId("country-dialog-cancel").click();
  });
});
