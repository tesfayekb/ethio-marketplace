import { expect, test } from "./fixtures";

import {
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchLanguage,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import {
  rand,
  bandOnly,
  createViaUi,
  destroyCategory,
  dialogDump,
  findRow,
  grantRole,
  openEditor,
  action,
  readCategory,
  signInAsSuperAdmin,
} from "./helpers/categories";

/**
 * C3-UI — THE ATTRIBUTE LIBRARY and the per-category LINK MANAGER (AT-1..AT-6).
 *
 * J-laws: every fixture is scratch and namespaced by `rand()`; every assertion
 * that matters reads DB TRUTH through the service client; nothing touches the
 * ratified 205-definition library except by reading it.
 */

/**
 * C3d — TWIN-SCOPED LOCATORS (J5). Every per-row element resolves inside its
 * own row, in whichever twin the viewport renders: the DataTable primitive's
 * default boundary is 768 (cards below it, a table at and above it).
 */
// C3-UX-1 PART A — the library is a DENSE table, so it keeps cards through the
// tablet band (`cardUntil="lg"`): the twin boundary here is 1024, not 768.
const TWIN_BOUNDARY = 1024;

function isCardTwin(page: import("@playwright/test").Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

function librarySurface(page: import("@playwright/test").Page) {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

/** The row's ACTIONS region — a card sibling below md, a cell at md and up. */
function libraryRows(page: import("@playwright/test").Page) {
  return librarySurface(page).locator(
    isCardTwin(page)
      ? "[data-testid^='attribute-row-'][data-testid$='-card']:not([data-testid$='-expanded'])"
      : // INC-172 — the options expansion injects a `<tr>` whose testid shares the
        // row prefix (`…-expanded-row`); the page window is the DATA rows alone.
        "tbody tr[data-testid^='attribute-row-']:not([data-testid$='-expanded-row'])",
  );
}

function attributeActions(page: import("@playwright/test").Page, key: string) {
  return librarySurface(page).getByTestId(
    isCardTwin(page) ? `attribute-row-${key}-actions` : `attribute-row-${key}-actions-cell`,
  );
}

/**
 * C3-UX-1c — the row carries ONE \u22ef trigger and every verb lives in its menu
 * (a portal, so the menu is addressed at the page, never inside the row).
 */
async function openAttributeMenu(page: import("@playwright/test").Page, key: string) {
  await attributeActions(page, key).getByTestId(`attribute-actions-${key}`).click();
  const menu = page.getByTestId("attribute-actions-menu");
  await expect(menu).toBeVisible({ timeout: 20000 });
  return menu;
}

/** A scratch definition, minted straight through the service client (J3). */

async function seedAttribute(key: string, type = "text") {
  const { data, error } = await adminClient()
    .from("attributes")
    .insert({ attr_key: key, name_en: key, attr_type: type })
    .select("id")
    .single();
  if (error) throw new Error(`seedAttribute failed: ${error.message}`);
  return data.id as string;
}

async function readAttribute(key: string) {
  const { data } = await adminClient()
    .from("attributes")
    .select("id, attr_key, name_en, attr_type, options")
    .eq("attr_key", key)
    .maybeSingle();
  return data;
}

async function readLinks(categoryId: string) {
  const { data } = await adminClient()
    .from("category_attribute_links")
    .select("id, attribute_id, is_required, display_order, card_rank")
    .eq("category_id", categoryId)
    .order("display_order");
  return data ?? [];
}

async function destroyAttribute(key: string) {
  const row = await readAttribute(key);
  if (!row) return;
  await adminClient().from("category_attribute_links").delete().eq("attribute_id", row.id);
  // IE-4b — a scratch definition can now own an am translation row; it leaves
  // with the fixture (J3), because entity_translations carries no FK cascade.
  await adminClient()
    .from("entity_translations")
    .delete()
    .eq("entity_type", "attribute")
    .eq("entity_id", row.id);
  await adminClient().from("attributes").delete().eq("id", row.id);
}

test.describe("C3 attributes console", () => {
  test("AT-1 gating: a plain user is refused; the library renders for an admin", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/attributes");
    await waitForHydration(page);
    await expect(page.getByTestId("attribute-search")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/attributes");
    await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
    // The ratified library is non-empty, so page one carries rows.
    await expect(page.getByTestId("attribute-pagination-range")).toContainText("1–25");
    await expectNoHorizontalOverflow(page);
  });

  test("AT-2 definitions: a scratch attribute is created and renamed (DB truth)", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    try {
      await gotoReady(page, "/admin/attributes");
      /**
       * C3d — THE LIVE TYPE VOCABULARY. `attributes_attr_type_check` admits
       * text · number · single_select · multi_select · boolean · date · range.
       * "select" is not in the set, so the option-carrying single choice is
       * `single_select`.
       */
      await test.step("AT-2 create definition", async () => {
        await page.getByTestId("attribute-create-open").click();
        await expect(
          page.getByTestId("attribute-edit-dialog"),
          await dialogDump(page, "AT-2 editor never opened"),
        ).toBeVisible({ timeout: 20000 });
        await page.getByTestId("attribute-key").fill(key);
        await page.getByTestId("attribute-name").fill(key);
        await page.getByTestId("attribute-type").selectOption("single_select");
        await page.getByTestId("attribute-options").fill("Alpha\nBeta");
        await page.getByTestId("attribute-edit-submit").click();
        await stepUpIfPrompted(page, secret);
      });

      await expect
        .poll(async () => (await readAttribute(key))?.attr_type, {
          timeout: 20000,
          message: await dialogDump(page, "AT-2 definition never landed"),
        })
        .toBe("single_select");
      expect((await readAttribute(key))?.options).toEqual(["Alpha", "Beta"]);

      await test.step("AT-2 rename definition", async () => {
        await page.getByTestId("attribute-search").fill(key);
        await (await openAttributeMenu(page, key)).getByTestId(`attribute-edit-${key}`).click();
        await page.getByTestId("attribute-name").fill(`${key} renamed`);
        await page.getByTestId("attribute-edit-submit").click();
        await stepUpIfPrompted(page, secret);
      });
      await expect
        .poll(async () => (await readAttribute(key))?.name_en, {
          timeout: 20000,
          message: await dialogDump(page, "AT-2 rename never landed"),
        })
        .toBe(`${key} renamed`);
    } finally {
      await destroyAttribute(key);
    }
  });

  test("AT-3 link manager: an attribute is linked to a scratch category and unlinked", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);

      await gotoReady(page, "/admin/attributes");
      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "attributes").click();
      await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("category-attributes-empty")).toBeVisible();

      await page.getByTestId("category-attribute-search").fill(key);
      await page
        .getByTestId("category-attribute-picker")
        .selectOption({ label: `${key} (${key})` });
      await page.getByTestId("category-attribute-add").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, {
          timeout: 20000,
          message: await dialogDump(page, "AT-3 link never landed"),
        })
        .toBe(1);

      await page.getByTestId(`category-attribute-unlink-${key}`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, { timeout: 20000 })
        .toBe(0);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  test("AT-4 card picker: two ranked attributes clear the amber flag", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const keyA = `e2e_attr_${rand()}`;
    const keyB = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      const idA = await seedAttribute(keyA);
      const idB = await seedAttribute(keyB);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      // SEED BEFORE NAVIGATE (J7): both links exist before the picker opens.
      await adminClient()
        .from("category_attribute_links")
        .insert([
          { category_id: scratch!.id, attribute_id: idA, display_order: 0 },
          { category_id: scratch!.id, attribute_id: idB, display_order: 1 },
        ]);

      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "attributes").click();
      await expect(page.getByTestId(`category-attribute-link-${keyA}`)).toBeVisible({
        timeout: 20000,
      });
      await expect(page.getByTestId("category-attributes-needs-card")).toBeVisible();

      await page.getByTestId(`category-attribute-card-${keyA}`).click();
      await stepUpIfPrompted(page, secret);
      await page.getByTestId(`category-attribute-card-${keyB}`).click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(
          async () => (await readLinks(scratch!.id)).filter((row) => row.card_rank !== null).length,
          { timeout: 20000, message: await dialogDump(page, "AT-4 card ranks never landed") },
        )
        .toBe(2);
      await expect(page.getByTestId("category-attributes-needs-card")).toHaveCount(0);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(keyA);
      await destroyAttribute(keyB);
    }
  });

  test("AT-5 delete: refused while linked, accepted once unlinked", async ({ page }) => {
    /**
     * C3f — BUDGET TRUTH. This test's workload is multi-surface: a super-admin
     * sign-in, a category minted through the categories console UI, a hop to
     * the attributes library, and TWO delete submissions each of which can
     * raise a step-up (TOTP) challenge. That chain legitimately exceeds the
     * default budget on a loaded shard; the assertions are unchanged.
     */
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      const id = await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient()
        .from("category_attribute_links")
        .insert({ category_id: scratch!.id, attribute_id: id, display_order: 0 });

      await test.step("AT-5 navigate to the attribute library", async () => {
        await gotoReady(page, "/admin/attributes");
        await expect(
          page.getByTestId("attribute-search"),
          await dialogDump(page, "AT-5 library never rendered"),
        ).toBeVisible({ timeout: 20000 });
      });
      await test.step("AT-5 delete refused while linked", async () => {
        await page.getByTestId("attribute-search").fill(key);
        // J5 — the verb resolves inside ITS OWN row's actions region, in either twin.
        await (await openAttributeMenu(page, key)).getByTestId(`attribute-delete-${key}`).click();
        await expect(
          page.getByTestId("attribute-delete-blast"),
          await dialogDump(page, "AT-5 delete dialog never opened"),
        ).toBeVisible({ timeout: 20000 });
        await page.getByTestId("attribute-delete-confirm").fill(key);
        await page.getByTestId("attribute-delete-submit").click();
        await stepUpIfPrompted(page, secret);
        // C3e — the linked refusal re-states the BLAST RADIUS with the server's
        // own count (1 link here), never a generic error line. F5: no trace.
        await expect(
          page.getByTestId("attribute-delete-blast"),
          await dialogDump(page, "AT-5 refusal never restated the blast radius"),
        ).toContainText("1", { timeout: 20000 });
        await expect(page.getByTestId("attribute-dialog-error")).toHaveCount(0);
      });
      expect(await readAttribute(key)).not.toBeNull();

      await adminClient().from("category_attribute_links").delete().eq("attribute_id", id);
      await test.step("AT-5 delete accepted once unlinked", async () => {
        await page.getByTestId("attribute-delete-submit").click();
        await stepUpIfPrompted(page, secret);
        await expect
          .poll(async () => await readAttribute(key), {
            timeout: 20000,
            message: await dialogDump(page, "AT-5 definition never left"),
          })
          .toBeNull();
      });
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  test("AT-6 merge: links move to the survivor and the sources disappear", async ({ page }) => {
    /**
     * C3f — BUDGET TRUTH. Same multi-surface workload as AT-5: super-admin
     * sign-in, a category minted through the categories console UI, a hop to
     * the attributes library, and a merge submission that can raise a step-up
     * (TOTP) challenge. Assertion meanings are unchanged.
     */
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const keep = `e2e_attr_keep_${rand()}`;
    const dupe = `e2e_attr_dupe_${rand()}`;
    let slug = "";
    try {
      const keepId = await seedAttribute(keep);
      const dupeId = await seedAttribute(dupe);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient()
        .from("category_attribute_links")
        .insert({ category_id: scratch!.id, attribute_id: dupeId, display_order: 0 });

      await test.step("AT-6 navigate to the attribute library", async () => {
        await gotoReady(page, "/admin/attributes");
        await expect(
          page.getByTestId("attribute-merge-open"),
          await dialogDump(page, "AT-6 library never rendered"),
        ).toBeVisible({ timeout: 20000 });
      });
      await page.getByTestId("attribute-merge-open").click();
      await expect(page.getByTestId("attribute-merge-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("attribute-merge-target").selectOption({ label: `${keep} (${keep})` });
      await page.getByTestId(`attribute-merge-source-${dupe}`).click();
      await expect(page.getByTestId("attribute-merge-confirm")).toBeVisible();
      await page.getByTestId("attribute-merge-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect.poll(async () => await readAttribute(dupe), { timeout: 20000 }).toBeNull();
      const links = await readLinks(scratch!.id);
      expect(links.map((row) => row.attribute_id)).toEqual([keepId]);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(keep);
      await destroyAttribute(dupe);
    }
  });

  test("AT-7 filter: a category narrows the library to its linked attributes (DB truth)", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      const id = await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      // SEED BEFORE NAVIGATE (J7): the only link exists before the filter runs.
      await adminClient()
        .from("category_attribute_links")
        .insert({ category_id: scratch!.id, attribute_id: id, display_order: 0 });
      const linked = await readLinks(scratch!.id);
      expect(linked).toHaveLength(1);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-category-filter").selectOption(slug);
      // PART B — the filter is the URL, so it is shareable and reloadable.
      await expect(page).toHaveURL(new RegExp(`category=${slug}$`));
      await expect(
        librarySurface(page).getByTestId(`attribute-usedby-${key}-${slug}`),
        await dialogDump(page, "AT-7 filtered library never rendered the linked attribute"),
      ).toBeVisible({ timeout: 20000 });
      await expect
        .poll(async () => await libraryRows(page).count(), { timeout: 20000 })
        .toBe(linked.length);

      await page.getByTestId("attribute-category-clear").click();
      await expect(page).not.toHaveURL(/category=/);
      await expect
        .poll(async () => await libraryRows(page).count(), { timeout: 20000 })
        .toBeGreaterThan(1);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  test("AT-8 assign from the library: the link lands and Used by updates", async ({ page }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      await (await openAttributeMenu(page, key)).getByTestId(`attribute-assign-${key}`).click();
      await expect(
        page.getByTestId("attribute-assign-dialog"),
        await dialogDump(page, "AT-8 assign dialog never opened"),
      ).toBeVisible({ timeout: 20000 });
      await page.getByTestId("attribute-assign-picker").selectOption(scratch!.id);
      await page.getByTestId("attribute-assign-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, {
          timeout: 20000,
          message: await dialogDump(page, "AT-8 link never landed"),
        })
        .toBe(1);
      await expect(librarySurface(page).getByTestId(`attribute-usedby-${key}-${slug}`)).toBeVisible(
        { timeout: 20000 },
      );
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  test("AT-9 twins: the library renders one twin only, with no sideways scroll", async ({
    page,
  }) => {
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/attributes");
    await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
    if (isCardTwin(page)) {
      await expect(page.getByTestId("data-table-cards")).toBeVisible();
      await expect(page.getByRole("table")).toHaveCount(0);
    } else {
      await expect(page.getByRole("table")).toBeVisible();
      await expect(page.getByTestId("data-table-cards")).toBeHidden();
    }
    await expect.poll(async () => await libraryRows(page).count(), { timeout: 20000 }).toBe(25);
    await expectNoHorizontalOverflow(page);

    /* C3-UX-1d PART D — TIER PARITY. Across the desktop band the table must
       neither scroll the page sideways nor clip its last column, the ⋯ actions
       trigger must be reachable at every width, and the Options column earns
       its place only from 1280 up. */
    if (isCardTwin(page)) return;
    for (const width of [1024, 1194, 1280, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      await gotoReady(page, "/admin/attributes");
      await expect(page.getByRole("table")).toBeVisible({ timeout: 20000 });
      await expectNoHorizontalOverflow(page);
      const geometry = await page.getByRole("table").evaluate((table) => {
        let host: HTMLElement | null = table.parentElement;
        while (host && host.scrollWidth <= host.clientWidth) host = host.parentElement;
        const scroller = host ?? document.documentElement;
        const heads = table.querySelectorAll("thead th");
        const last = heads[heads.length - 1] as HTMLElement;
        return {
          overflow: scroller.scrollWidth - scroller.clientWidth,
          overshoot: Math.round(
            last.getBoundingClientRect().right - scroller.getBoundingClientRect().right,
          ),
        };
      });
      expect(geometry.overshoot, `last column clipped at ${width}`).toBeLessThanOrEqual(2);
      expect(geometry.overflow, `the library scrolls sideways at ${width}`).toBeLessThanOrEqual(1);

      // The row menu is the ONLY verb surface: it is visible at every width.
      const firstRow = libraryRows(page).nth(0);
      await expect(
        firstRow.locator('[data-testid^="attribute-actions-"]'),
        `the row menu is unreachable at ${width}`,
      ).toBeVisible();

      // The `wide` tier: Options is absent below 1280 and present from 1280.
      const optionsCells = page
        .getByRole("table")
        .locator('[data-testid^="attribute-options-"]:visible');
      if (width < 1280) {
        await expect(optionsCells, `Options should not render at ${width}`).toHaveCount(0);
      } else {
        expect(await optionsCells.count(), `Options should render at ${width}`).toBeGreaterThan(0);
      }
    }
  });

  test("AT-10 Used by names the category the attribute was assigned to (DB truth)", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      const id = await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      // SEED BEFORE NAVIGATE (J7).
      await adminClient()
        .from("category_attribute_links")
        .insert({ category_id: scratch!.id, attribute_id: id, display_order: 0 });
      expect(await readLinks(scratch!.id)).toHaveLength(1);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      const chip = librarySurface(page).getByTestId(`attribute-usedby-${key}-${slug}`);
      await expect(
        chip,
        await dialogDump(page, "AT-10 the used-by chip never rendered"),
      ).toBeVisible({ timeout: 20000 });
      await expect(chip).toHaveText(scratch!.name_en);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  test("AT-11 remove from category unlinks it and the chip disappears (DB truth)", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      const id = await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient()
        .from("category_attribute_links")
        .insert({ category_id: scratch!.id, attribute_id: id, display_order: 0 });
      expect(await readLinks(scratch!.id)).toHaveLength(1);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      await expect(librarySurface(page).getByTestId(`attribute-usedby-${key}-${slug}`)).toBeVisible(
        {
          timeout: 20000,
        },
      );

      await (await openAttributeMenu(page, key)).getByTestId(`attribute-remove-${key}`).click();
      await expect(
        page.getByTestId("attribute-remove-dialog"),
        await dialogDump(page, "AT-11 remove dialog never opened"),
      ).toBeVisible({ timeout: 20000 });
      // THE CONFIRMATION NAMES THE CATEGORY before the write.
      await expect(page.getByTestId("attribute-remove-confirm")).toContainText(scratch!.name_en);
      await page.getByTestId("attribute-remove-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, {
          timeout: 20000,
          message: await dialogDump(page, "AT-11 the link never went away"),
        })
        .toBe(0);
      await expect(librarySurface(page).getByTestId(`attribute-usedby-${key}-${slug}`)).toHaveCount(
        0,
        { timeout: 20000 },
      );
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });
  /* --------------------- C3-UX-2: labels, roster, denials ------------------ */

  /**
   * C3-UX-2 PART B — an APPROVED `am` label for entity_type 'attribute' /
   * field 'label' renders in the library when the UI language is am, and the
   * EN definition name answers again the moment the row is gone (the overlay
   * law: DB[lang] ▸ compiled ▸ EN).
   */
  test("AT-12 an approved am attribute label renders in am and falls back to EN", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    const marker = `ኢ2ኢ ${rand()}`;
    try {
      // SEED BEFORE NAVIGATE (J7): definition + its approved am label.
      const id = await seedAttribute(key);
      const { error } = await adminClient().from("entity_translations").insert({
        entity_type: "attribute",
        entity_id: id,
        field: "label",
        lang_code: "am",
        value: marker,
        status: "approved",
        machine: false,
      });
      if (error) throw new Error(`AT-12 label seed failed: ${error.message}`);

      await gotoReady(page, "/admin/attributes");
      await switchLanguage(page, "am");
      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      const row = librarySurface(page).getByTestId(
        isCardTwin(page) ? `attribute-row-${key}-card` : `attribute-row-${key}`,
      );
      await expect(row, await dialogDump(page, "AT-12 the row never rendered in am")).toBeVisible({
        timeout: 20000,
      });
      await expect(row).toContainText(marker);

      // THE FALLBACK: remove the approved row and the EN name answers again.
      await adminClient()
        .from("entity_translations")
        .delete()
        .eq("entity_type", "attribute")
        .eq("entity_id", id);
      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      await expect(row).toContainText(key, { timeout: 20000 });
      await expect(row).not.toContainText(marker);
    } finally {
      await switchLanguage(page, "en").catch(() => undefined);
      await destroyAttribute(key);
    }
  });

  /** C3-UX-2 — a scratch definition is a translatable row in the Data scope. */
  test("AT-13 a scratch attribute appears in the Data scope roster as pending", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    try {
      const id = await seedAttribute(key);
      await gotoReady(page, "/admin/translations/am?scope=data");
      await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("data-search").fill(key);
      // C3-UX-2b PART C (J5) — never a bare prefix: the Data roster renders the
      // SAME row as a card twin (<lg) or a table row, so the status badge is
      // read through the twin's surface and its own row.
      const dataSurface = isCardTwin(page)
        ? page.getByTestId("data-table-cards")
        : page.getByRole("table");
      const slug = `attribute-${id}-label`;
      const dataRow = dataSurface.getByTestId(
        isCardTwin(page) ? `entity-row-${slug}-card` : `entity-row-${slug}`,
      );
      await expect(
        dataRow,
        await dialogDump(page, "AT-13 the attribute row never rendered in the Data roster"),
      ).toBeVisible({ timeout: 20000 });
      const status = dataSurface.getByTestId(`entity-status-${slug}`);
      await expect(
        status,
        await dialogDump(page, "AT-13 the attribute never reached the Data roster"),
      ).toBeVisible({ timeout: 20000 });
      // Pending = no translation row yet (DB truth), rendered as untranslated.
      const { data } = await adminClient()
        .from("entity_translations")
        .select("entity_id")
        .eq("entity_type", "attribute")
        .eq("entity_id", id);
      expect(data ?? []).toHaveLength(0);
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * C3-UX-2 — DENY PROOFS (law F3: the server is the only authority). A
   * categories:view-only caller reads the library and is refused by every
   * write door, live, through the browser's own Supabase client.
   */
  test("AT-14 a categories:view-only user reads the library and every write door refuses", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const supabase = adminClient();
    const roleName = `e2e_viewonly_${rand()}`;
    let roleId = "";
    const key = `e2e_attr_${rand()}`;
    try {
      const attributeId = await seedAttribute(key);
      const { data: role, error: roleError } = await supabase
        .from("roles")
        .insert({ name: roleName, display_name: roleName, priority: 1 })
        .select("id")
        .single();
      if (roleError || !role) throw new Error(`AT-14 scratch role failed: ${roleError?.message}`);
      roleId = role.id;
      const { data: perms, error: permError } = await supabase
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .in("resources.name", ["admin_panel", "categories"]);
      if (permError) throw new Error(`AT-14 permission census failed: ${permError.message}`);
      const wanted = (perms ?? []).filter((p) => {
        const resource = (p as unknown as { resources: { name: string } }).resources.name;
        return (
          (resource === "admin_panel" && p.action === "access") ||
          (resource === "categories" && p.action === "view")
        );
      });
      expect(wanted, "AT-14 expected exactly admin_panel:access + categories:view").toHaveLength(2);
      await supabase
        .from("role_permissions")
        .insert(wanted.map((p) => ({ role_id: roleId, permission_id: p.id })));

      const viewer = await createUser({ confirmed: true });
      await supabase
        .from("user_roles")
        .insert({ user_id: viewer.id, role_id: roleId, scope_type: "global" });

      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/attributes");
      // THE READ LANDS.
      await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("attribute-search").fill(key);
      await expect(
        librarySurface(page).getByTestId(
          isCardTwin(page) ? `attribute-row-${key}-card` : `attribute-row-${key}`,
        ),
      ).toBeVisible({ timeout: 20000 });
      // NO WRITE VERBS: the row carries no actions trigger at all.
      await expect(page.getByTestId(`attribute-actions-${key}`)).toHaveCount(0);
      await expect(page.getByTestId("attribute-create-open")).toHaveCount(0);

      // THE SERVER REFUSES — live, from the signed-in browser client.
      const denials = await page.evaluate(
        async ([id, attrKey]) => {
          const client = (
            window as unknown as {
              __ethioSupabase: {
                rpc: (
                  fn: string,
                  args: Record<string, unknown>,
                ) => Promise<{ error: { message: string } | null }>;
              };
            }
          ).__ethioSupabase;
          const upsert = await client.rpc("admin_upsert_attribute", {
            p_id: null,
            p_attr_key: `${attrKey}_denied`,
            p_name_en: "denied",
            p_attr_type: "text",
            p_options: null,
            p_help_text_en: null,
          });
          const link = await client.rpc("admin_link_attribute", {
            p_category_id: "00000000-0000-0000-0000-000000000000",
            p_attribute_id: id,
            p_is_required: false,
            p_is_filterable: true,
            p_display_order: null,
          });
          const del = await client.rpc("admin_delete_attribute", {
            p_id: id,
            p_confirm_key: attrKey,
          });
          return {
            upsert: upsert.error?.message ?? "NO ERROR",
            link: link.error?.message ?? "NO ERROR",
            del: del.error?.message ?? "NO ERROR",
          };
        },
        [attributeId, key],
      );
      expect(denials.upsert).toContain("permission denied");
      expect(denials.link).toContain("permission denied");
      expect(denials.del).toContain("permission denied");

      // A refused attempt leaves NO trace (F5).
      const { data: after } = await supabase
        .from("attributes")
        .select("id")
        .eq("attr_key", `${key}_denied`);
      expect(after ?? []).toHaveLength(0);
      expect(await readAttribute(key)).not.toBeNull();
    } finally {
      if (roleId) {
        await supabase.from("user_roles").delete().eq("role_id", roleId);
        await supabase.from("role_permissions").delete().eq("role_id", roleId);
        await supabase.from("roles").delete().eq("id", roleId);
      }
      await destroyAttribute(key);
    }
  });

  /* --------------------------- IE-1: the export --------------------------- */

  /**
   * IE-1 — TWO FILES FROM ONE CONTROL. The columns are a contract, so they are
   * asserted VERBATIM; the inherited row proves the effective set (a child that
   * links nothing still carries its parent's attribute, `origin` naming the
   * parent slug); the "="-opening label proves formula neutralisation.
   */
  test("AT-15 the export downloads both files with their exact columns, inheritance and formula safety", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const label = `=SUM(1)_${rand()}`;
    const parentSlug = `e2e-cat-exp-${rand()}`;
    const childSlug = `e2e-cat-exp-${rand()}`;
    let attributeId = "";
    try {
      // SEED BEFORE NAVIGATE (J7), all through the service client (J5).
      const { data: attribute, error: attributeError } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: label, attr_type: "text" })
        .select("id")
        .single();
      if (attributeError || !attribute) {
        throw new Error(`AT-15 attribute seed failed: ${attributeError?.message}`);
      }
      attributeId = attribute.id;

      const { data: cats, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: parentSlug, name_en: parentSlug },
          { slug: childSlug, name_en: childSlug },
        ])
        .select("id, slug");
      if (catError || !cats) throw new Error(`AT-15 category seed failed: ${catError?.message}`);
      const parent = cats.find((row) => row.slug === parentSlug)!;
      const child = cats.find((row) => row.slug === childSlug)!;
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: parent.id, child_id: child.id, display_order: 1 });
      if (pointerError) throw new Error(`AT-15 pointer seed failed: ${pointerError.message}`);
      // The link lives on the PARENT only — the child inherits it.
      const { error: linkError } = await supabase
        .from("category_attribute_links")
        .insert({ category_id: parent.id, attribute_id: attributeId, is_required: true });
      if (linkError) throw new Error(`AT-15 link seed failed: ${linkError.message}`);

      await gotoReady(page, "/admin/attributes");
      const control = page.getByTestId("attribute-export");
      await expect(control, await dialogDump(page, "AT-15 no export control")).toBeVisible({
        timeout: 20000,
      });

      // ONE control, TWO downloads. Two concurrent `waitForEvent("download")`
      // promises BOTH settle on the first event, so the pair is collected from
      // a listener instead and the wait terminates on the achieved state.
      const captured: import("@playwright/test").Download[] = [];
      page.on("download", (download) => captured.push(download));
      await control.click();
      await expect
        .poll(() => captured.length, {
          timeout: 60000,
          message: "AT-15 the control did not produce both downloads",
        })
        .toBe(2);
      const texts = new Map<string, string>();
      for (const download of captured) {
        const path = await download.path();
        if (!path) throw new Error(`AT-15 download ${download.suggestedFilename()} has no path`);
        const { readFileSync } = await import("node:fs");
        texts.set(download.suggestedFilename(), readFileSync(path, "utf8"));
      }
      expect([...texts.keys()].sort()).toEqual(["definitions.csv", "links.csv"]);

      const definitions = texts.get("definitions.csv")!;
      const links = texts.get("links.csv")!;
      // UTF-8 BOM, so Excel reads Ge'ez.
      expect(definitions.charCodeAt(0)).toBe(0xfeff);
      expect(links.charCodeAt(0)).toBe(0xfeff);
      // THE COLUMN LAW, verbatim — IE-3: derived columns declare themselves.
      expect(definitions.slice(1).split("\r\n")[0]).toBe(
        "attribute_key,label_en,label_am,type,options,is_per_variant (read-only),direct_link_count (read-only)",
      );
      expect(links.slice(1).split("\r\n")[0]).toBe(
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only)",
      );

      // FORMULA SAFETY: the "="-opening label is prefixed with a single quote
      // (and therefore quoted, because the cell also carries a comma-free
      // formula string — the assertion reads the neutralising quote itself).
      const definitionRow = definitions.split("\r\n").find((line) => line.startsWith(`${key},`));
      expect(
        definitionRow,
        "AT-15 the scratch definition is missing from definitions.csv",
      ).toBeTruthy();
      expect(definitionRow).toContain(`'${label}`);

      // INHERITANCE: the child links nothing, yet carries the parent's
      // attribute with `origin` naming the parent slug.
      const childRow = links.split("\r\n").find((line) => line.includes(`,${childSlug},${key},`));
      expect(childRow, "AT-15 the inherited link is missing from links.csv").toBeTruthy();
      expect(childRow!.endsWith(`,${parentSlug}`)).toBe(true);
      // The parent's own row names ITSELF as the origin.
      const parentRow = links.split("\r\n").find((line) => line.includes(`,${parentSlug},${key},`));
      expect(parentRow!.endsWith(`,${parentSlug}`)).toBe(true);
    } finally {
      await supabase.from("category_attribute_links").delete().eq("attribute_id", attributeId);
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
      await destroyAttribute(key);
    }
  });

  /** IE-1 PART C — no `categories:view`, no control and no bytes (F3). */
  test("AT-16 a user without categories:view gets 403 and sees no export control", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await gotoReady(page, "/admin/attributes");
    await expect(page.getByTestId("attribute-export")).toHaveCount(0);

    const token = await page.evaluate(async () => {
      const client = (
        window as unknown as {
          __ethioSupabase: {
            auth: {
              getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
            };
          };
        }
      ).__ethioSupabase;
      const { data } = await client.auth.getSession();
      return data.session?.access_token ?? "";
    });
    expect(token).not.toBe("");

    for (const file of ["definitions", "links"]) {
      const response = await page.request.get(`/api/admin/attributes/export?file=${file}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response.status(), `AT-16 ${file} must be refused`).toBe(403);
      expect(await response.text()).not.toContain("attribute_key");
    }

    // NO BEARER, NO BYTES.
    const anonymous = await page.request.get("/api/admin/attributes/export?file=definitions");
    expect(anonymous.status()).toBe(401);
  });
  /* ------------------- C3-INH (DEC-044): inherited rows ------------------- */

  /**
   * A scratch subtree used by AT-17..AT-19: an ACTIVE, listing-accepting child
   * that links NOTHING, under a parent that links two card attributes. Seeded
   * through the service client (J5), before any navigation (J7).
   */
  async function seedInheritanceFixture() {
    const supabase = adminClient();
    const stamp = rand();
    const parentSlug = `e2e-cat-inh-${stamp}`;
    const childSlug = `e2e-cat-inh-${stamp}-child`;
    const keyA = `e2e_attr_${rand()}`;
    const keyB = `e2e_attr_${rand()}`;

    const { data: attrs, error: attrError } = await supabase
      .from("attributes")
      .insert([
        { attr_key: keyA, name_en: keyA, attr_type: "text" },
        { attr_key: keyB, name_en: keyB, attr_type: "text" },
      ])
      .select("id, attr_key");
    if (attrError || !attrs) throw new Error(`inheritance attrs failed: ${attrError?.message}`);
    const attrA = attrs.find((row) => row.attr_key === keyA)!;
    const attrB = attrs.find((row) => row.attr_key === keyB)!;

    const { data: cats, error: catError } = await supabase
      .from("categories")
      .insert([
        { slug: parentSlug, name_en: parentSlug, is_active: true, allow_listings: true },
        { slug: childSlug, name_en: childSlug, is_active: true, allow_listings: true },
      ])
      .select("id, slug");
    if (catError || !cats) throw new Error(`inheritance categories failed: ${catError?.message}`);
    const parent = cats.find((row) => row.slug === parentSlug)!;
    const child = cats.find((row) => row.slug === childSlug)!;

    // The parent is a ROOT (parent_id NULL) so both rows reach the roster walk.
    const { error: pointerError } = await supabase.from("category_tree_pointers").insert([
      { parent_id: null, child_id: parent.id, display_order: 900 },
      { parent_id: parent.id, child_id: child.id, display_order: 1 },
    ]);
    if (pointerError) throw new Error(`inheritance pointers failed: ${pointerError.message}`);

    const { data: linkRows, error: linkError } = await supabase
      .from("category_attribute_links")
      .insert([
        { category_id: parent.id, attribute_id: attrA.id, is_required: true, card_rank: 1 },
        { category_id: parent.id, attribute_id: attrB.id, is_required: false, card_rank: 2 },
      ])
      .select("id, attribute_id");
    if (linkError || !linkRows) throw new Error(`inheritance links failed: ${linkError?.message}`);

    return {
      parentSlug,
      childSlug,
      parentId: parent.id,
      childId: child.id,
      keyA,
      keyB,
      attrAId: attrA.id,
      attrBId: attrB.id,
      linkAId: linkRows.find((row) => row.attribute_id === attrA.id)!.id,
      async destroy() {
        await supabase
          .from("category_attribute_links")
          .delete()
          .in("attribute_id", [attrA.id, attrB.id]);
        await destroyCategory(childSlug);
        await destroyCategory(parentSlug);
        await destroyAttribute(keyA);
        await destroyAttribute(keyB);
      },
    };
  }

  /**
   * AT-17 — the child links nothing, yet its filtered console shows the
   * parent's attributes as INHERITED rows naming the parent; and because the
   * effective card count is 2, the roster's amber two-must-display flag is
   * clear on the child.
   */
  test("AT-17 an inherited row names its origin and clears the child's card flag", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const fixture = await seedInheritanceFixture();
    try {
      await gotoReady(page, `/admin/attributes?category=${fixture.childSlug}`);
      const surface = librarySurface(page);
      const rowId = isCardTwin(page)
        ? `attribute-row-${fixture.keyA}-card`
        : `attribute-row-${fixture.keyA}`;
      await expect(
        surface.getByTestId(rowId),
        await dialogDump(page, "AT-17 the inherited row never rendered"),
      ).toBeVisible({ timeout: 30000 });
      const badge = surface.getByTestId(`attribute-inherited-${fixture.keyA}`);
      await expect(badge).toBeVisible({ timeout: 20000 });
      await expect(badge).toContainText(fixture.parentSlug);

      // THE ROSTER: two EFFECTIVE card attributes clear the amber flag.
      await gotoReady(page, "/admin/categories");
      await expect(page.getByTestId("attribute-empty")).toHaveCount(0);
      await expect(page.getByTestId(`category-needs-card-${fixture.parentSlug}`)).toHaveCount(0);
      await expect(page.getByTestId(`category-needs-card-${fixture.childSlug}`)).toHaveCount(0);
    } finally {
      await fixture.destroy();
    }
  });

  /**
   * AT-18 — with a filter active the export is SUBTREE-scoped: only the
   * category and its descendants appear (DB truth read back from the links
   * file), the inherited row carries the parent slug as origin, and the
   * filename carries the scope slug.
   */
  test("AT-18 the scoped export carries the subtree only, with origin", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const fixture = await seedInheritanceFixture();
    try {
      await gotoReady(page, `/admin/attributes?category=${fixture.parentSlug}`);
      const control = page.getByTestId("attribute-export");
      await expect(control, await dialogDump(page, "AT-18 no export control")).toBeVisible({
        timeout: 20000,
      });
      // The filter must be SETTLED before the click, or the export is unscoped.
      await expect(page.getByTestId("attribute-category-clear")).toBeVisible({ timeout: 30000 });
      const captured: import("@playwright/test").Download[] = [];
      page.on("download", (download) => captured.push(download));
      await control.click();
      await expect
        .poll(() => captured.length, {
          timeout: 60000,
          message: "AT-18 the control did not produce both downloads",
        })
        .toBe(2);

      const texts = new Map<string, string>();
      for (const download of captured) {
        const path = await download.path();
        if (!path) throw new Error(`AT-18 download ${download.suggestedFilename()} has no path`);
        const { readFileSync } = await import("node:fs");
        texts.set(download.suggestedFilename(), readFileSync(path, "utf8"));
      }
      expect([...texts.keys()].sort()).toEqual([
        `${fixture.parentSlug}-definitions.csv`,
        `${fixture.parentSlug}-links.csv`,
      ]);

      const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
      const lines = links.slice(1).split("\r\n").filter(Boolean);
      expect(lines[0]).toBe(
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only)",
      );
      // ONLY the subtree: every data row's category_slug is parent or child.
      const slugs = new Set(lines.slice(1).map((line) => line.split(",")[1]));
      expect([...slugs].sort()).toEqual([fixture.childSlug, fixture.parentSlug].sort());
      const childRow = lines.find((line) =>
        line.includes(`,${fixture.childSlug},${fixture.keyA},`),
      );
      expect(childRow, "AT-18 the inherited row is missing").toBeTruthy();
      expect(childRow!.endsWith(`,${fixture.parentSlug}`)).toBe(true);
    } finally {
      await fixture.destroy();
    }
  });

  /**
   * AT-19 — the inherited row carries NO write verb, and the server refuses a
   * write addressed to the inherited link from the inheriting category: the UI
   * is convenience, the RPC is the authority (F3).
   */
  test("AT-19 an inherited row has no write verb and the write RPCs refuse it", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const fixture = await seedInheritanceFixture();
    const supabase = adminClient();
    try {
      await gotoReady(page, `/admin/attributes?category=${fixture.childSlug}`);
      await expect(
        librarySurface(page).getByTestId(`attribute-inherited-${fixture.keyA}`),
        await dialogDump(page, "AT-19 the inherited row never rendered"),
      ).toBeVisible({ timeout: 30000 });

      const menu = await openAttributeMenu(page, fixture.keyA);
      await expect(menu.getByTestId(`attribute-open-origin-${fixture.keyA}`)).toBeVisible();
      await expect(menu.getByTestId(`attribute-edit-${fixture.keyA}`)).toHaveCount(0);
      await expect(menu.getByTestId(`attribute-assign-${fixture.keyA}`)).toHaveCount(0);
      await expect(menu.getByTestId(`attribute-remove-${fixture.keyA}`)).toHaveCount(0);
      await expect(menu.getByTestId(`attribute-delete-${fixture.keyA}`)).toHaveCount(0);
      await page.keyboard.press("Escape");

      // SERVER LAW: the child owns no link, so ordering and card-ranking the
      // inherited link THROUGH the child are both refused.
      const denials = await page.evaluate(
        async ([childId, linkId, attrId]) => {
          const client = (
            window as unknown as {
              __ethioSupabase: {
                rpc: (
                  fn: string,
                  args: Record<string, unknown>,
                ) => Promise<{ error: { message: string } | null }>;
              };
            }
          ).__ethioSupabase;
          const order = await client.rpc("admin_set_attribute_link_order", {
            p_category_id: childId,
            p_ordered_link_ids: [linkId],
          });
          const card = await client.rpc("admin_set_card_attributes", {
            p_category_id: childId,
            p_ordered_attribute_ids: [attrId],
          });
          return {
            order: order.error?.message ?? "NO ERROR",
            card: card.error?.message ?? "NO ERROR",
          };
        },
        [fixture.childId, fixture.linkAId, fixture.attrAId],
      );
      expect(denials.order, "AT-19 ordering an inherited link must be refused").not.toBe(
        "NO ERROR",
      );
      expect(denials.card, "AT-19 card-ranking an inherited link must be refused").not.toBe(
        "NO ERROR",
      );

      // A refused attempt leaves NO trace (F5): the child still owns no link
      // and the parent's link is untouched.
      const { data: childLinks } = await supabase
        .from("category_attribute_links")
        .select("id")
        .eq("category_id", fixture.childId);
      expect(childLinks ?? []).toHaveLength(0);
      const { data: parentLink } = await supabase
        .from("category_attribute_links")
        .select("card_rank")
        .eq("id", fixture.linkAId)
        .single();
      expect(parentLink?.card_rank).toBe(1);
    } finally {
      await fixture.destroy();
    }
  });

  /* --------------------------- IE-2: the import --------------------------- */

  /**
   * The import doors are asserted through the ROUTE with the page's bearer
   * (the same door the dialog posts to), and every verdict is confirmed
   * against DB TRUTH via the service client (J4). The UI half — the control's
   * visibility — is asserted in AT-23.
   */
  const DEF_HEADER =
    "attribute_key,label_en,label_am,type,options,is_per_variant,direct_link_count";
  const LINK_HEADER =
    "category_path,category_slug,attribute_key,is_required,is_filterable,card_rank,origin";

  async function bearerOf(page: import("@playwright/test").Page): Promise<string> {
    const token = await page.evaluate(async () => {
      const client = (
        window as unknown as {
          __ethioSupabase: {
            auth: {
              getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
            };
          };
        }
      ).__ethioSupabase;
      const { data } = await client.auth.getSession();
      return data.session?.access_token ?? "";
    });
    expect(token, "IE-2 the page carries no bearer").not.toBe("");
    return token;
  }

  async function importPost(
    page: import("@playwright/test").Page,
    token: string,
    body: Record<string, unknown>,
  ) {
    const response = await page.request.post("/api/admin/attributes/import", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: body,
    });
    let payload: Record<string, unknown> = {};
    try {
      payload = (await response.json()) as Record<string, unknown>;
    } catch {
      payload = {};
    }
    return { status: response.status(), payload };
  }

  /**
   * A concurrent spec may create or destroy its own scratch fixtures between the
   * export and the preview, which would read as a phantom add. AT-20 asserts the
   * invariant over the STABLE library only: every record naming an `e2e_attr_`
   * attribute or an `e2e-cat-` category is dropped from both files.
   */
  function withoutScratchRecords(text: string): { text: string; rows: number } {
    const body = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
    const records: string[] = [];
    let current = "";
    let quoted = false;
    for (let index = 0; index < body.length; index += 1) {
      const char = body[index] as string;
      if (char === '"') {
        quoted = !quoted;
        current += char;
        continue;
      }
      if (char === "\n" && !quoted) {
        records.push(current.replace(/\r$/, ""));
        current = "";
        continue;
      }
      current += char;
    }
    if (current.length > 0) records.push(current.replace(/\r$/, ""));

    const header = records.shift() ?? "";
    const kept = records.filter(
      (record) => record.trim().length > 0 && !/e2e_attr_/.test(record) && !/e2e-cat-/.test(record),
    );
    return {
      text: `\uFEFF${[header, ...kept].join("\r\n")}\r\n`,
      rows: kept.length,
    };
  }

  /** RFC 4180 cell for a hand-authored fixture file. */
  function cell(value: string): string {
    return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }

  async function attachCsv(
    page: import("@playwright/test").Page,
    testid: string,
    name: string,
    text: string,
  ) {
    await page.getByTestId(testid).setInputFiles({
      name,
      mimeType: "text/csv",
      buffer: Buffer.from(text, "utf8"),
    });
  }

  /** The six numbers the counts line renders, in template order. */
  function countsOf(text: string): number[] {
    return (text.match(/\d+/g) ?? []).map((digits) => Number(digits));
  }

  /**
   * AT-20 — THE INVARIANT (IE-2b). The WHOLE library is exported through the
   * real route and re-imported through the DIALOG's file picker: the preview
   * must read 0 added · 0 changed · 0 unlinked · 0 deleted · 0 refused, with
   * `unchanged` equal to every data row in both files. Discard then writes
   * nothing — DB truth: no capture row exists.
   */
  test("AT-20 a real-export round trip is a no-op", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/attributes");

    const token = await bearerOf(page);
    const headers = { Authorization: `Bearer ${token}` };
    const definitionsResponse = await page.request.get(
      "/api/admin/attributes/export?file=definitions",
      { headers },
    );
    expect(definitionsResponse.status()).toBe(200);
    const linksResponse = await page.request.get("/api/admin/attributes/export?file=links", {
      headers,
    });
    expect(linksResponse.status()).toBe(200);

    const definitionsFile = withoutScratchRecords(await definitionsResponse.text());
    const linksFile = withoutScratchRecords(await linksResponse.text());
    const definitions = definitionsFile.text;
    const links = linksFile.text;
    const expectedUnchanged = definitionsFile.rows + linksFile.rows;
    expect(expectedUnchanged, "AT-20 the export produced no rows to re-import").toBeGreaterThan(0);

    const startedAt = new Date().toISOString();

    await page.getByTestId("attribute-import").click();
    await expect(page.getByTestId("attribute-import-dialog")).toBeVisible();
    await attachCsv(page, "attribute-import-definitions", "definitions.csv", definitions);
    await attachCsv(page, "attribute-import-links", "links.csv", links);

    await page.getByTestId("attribute-import-preview").click();
    const counts = page.getByTestId("attribute-import-counts");
    await expect(counts).toBeVisible({ timeout: 120_000 });

    const numbers = countsOf((await counts.textContent()) ?? "");
    expect(numbers, `AT-20 counts line: ${await counts.textContent()}`).toHaveLength(6);
    const [adds, changes, unlinks, deletes, unchanged, refused] = numbers;
    expect(
      { adds, changes, unlinks, deletes, refused },
      `AT-20 the round trip was not a no-op: ${await counts.textContent()}`,
    ).toEqual({ adds: 0, changes: 0, unlinks: 0, deletes: 0, refused: 0 });
    expect(unchanged).toBe(expectedUnchanged);
    await expect(page.getByTestId("attribute-import-refusals")).toHaveCount(0);
    // IE-3b — the silence invariant: an unedited export ignores NOTHING, so the
    // panel is absent, not merely empty (INC-178 reported whole columns).
    await expect(page.getByTestId("attribute-import-ignored")).toHaveCount(0);

    await page.getByTestId("attribute-import-discard").click();
    await expect(page.getByTestId("attribute-import-dialog")).toHaveCount(0);

    // DB TRUTH (J4): Discard wrote nothing — no capture row at all.
    const { data: batches } = await adminClient()
      .from("attribute_import_revisions")
      .select("id")
      .gte("created_at", startedAt);
    expect(batches ?? [], "AT-20 Discard wrote a batch").toHaveLength(0);
  });

  /**
   * AT-26 — SEMANTIC OPTION COMPARISON (INC-177). Option key order and an
   * explicit `"label_am": null` against an absent field are the SAME row.
   */
  test("AT-26 option key order and an explicit null preview unchanged", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const key = `e2e_attr_${rand()}`;
    try {
      await adminClient()
        .from("attributes")
        .insert({
          attr_key: key,
          name_en: key,
          attr_type: "single_select",
          options: [
            { value: "alpha", label_en: "Alpha" },
            { value: "beta", label_en: "Beta", label_am: null },
          ],
        });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // Same meaning, different spelling: keys reordered, `label_am` explicit
      // on one entry and absent on the other, and spaces around the labels.
      const options = [
        '{"label_en": " Alpha ", "value": "alpha", "label_am": null}',
        '{"label_am": "", "label_en": "Beta", "value": "beta"}',
      ].join("|");
      const definitions =
        `${DEF_HEADER}\r\n` +
        [key, key, "", "single_select", cell(options), "", "0"].join(",") +
        "\r\n";

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(
        counts,
        `AT-26 a re-spelled option list must be unchanged: ${JSON.stringify(preview.payload["refusals"])}`,
      ).toMatchObject({ adds: 0, changes: 0, refusals: 0, unchanged: 1 });
    } finally {
      await destroyAttribute(key);
    }
  });

  /** AT-21 — a real change previews, commits and then UNDOES to the old row. */
  test("AT-21 a changed link commits and the batch undoes", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-imp-${rand()}`;
    try {
      const { data: attribute } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "text" })
        .select("id")
        .single();
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      await supabase.from("category_attribute_links").insert({
        category_id: category!.id,
        attribute_id: attribute!.id,
        is_required: false,
        is_filterable: false,
      });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const definitions = `${DEF_HEADER}\r\n${key},${key},,text,,,1\r\n`;
      // required flips false → true and the attribute takes card position 1.
      const links = `${LINK_HEADER}\r\n${slug},${slug},${key},true,false,1,${slug}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions, links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect((preview.payload["counts"] as Record<string, number>).changes).toBe(1);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      const after = await readLinks(category!.id);
      expect(after[0]?.is_required, "AT-21 the commit did not apply").toBe(true);
      expect(after[0]?.card_rank).toBe(1);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(undo.payload["restored"]).toBe(1);

      const restored = await readLinks(category!.id);
      expect(restored[0]?.is_required, "AT-21 the undo did not restore the row").toBe(false);
      expect(restored[0]?.card_rank).toBeNull();
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /** AT-22 — the refusal vocabulary: bad header, formula cell, unknown slug. */
  test("AT-22 malformed files and dangerous cells are refused", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/attributes");
    const token = await bearerOf(page);

    // (a) a header that is not the export's is refused whole.
    const badHeader = await importPost(page, token, {
      mode: "preview",
      definitions: "key,label\r\nfoo,bar\r\n",
    });
    expect(badHeader.status).toBe(400);
    expect(badHeader.payload["error"]).toBe("badHeader");

    // (b) a RAW formula cell is refused per row.
    const key = `e2e_attr_${rand()}`;
    const formula = await importPost(page, token, {
      mode: "preview",
      definitions: `${DEF_HEADER}\r\n${key},"=SUM(1)",,text,,,0\r\n`,
    });
    expect(formula.status).toBe(200);
    const formulaRefusals = formula.payload["refusals"] as { reason: string }[];
    expect(formulaRefusals.map((entry) => entry.reason)).toContain("formula");

    // (c) an unknown category slug is refused per row, and nothing is written.
    const unknownSlug = `e2e-cat-nope-${rand()}`;
    const unknown = await importPost(page, token, {
      mode: "preview",
      links: `${LINK_HEADER}\r\n${unknownSlug},${unknownSlug},${key},true,false,,${unknownSlug}\r\n`,
    });
    expect(unknown.status).toBe(200);
    const unknownRefusals = unknown.payload["refusals"] as { reason: string }[];
    expect(unknownRefusals.map((entry) => entry.reason)).toContain("unknownCategory");

    // PREVIEW WRITES NOTHING (F5).
    expect(await readAttribute(key)).toBeNull();
  });

  /** AT-23 — no `categories:import`: no control, and the route refuses. */
  test("AT-23 a categories:view-only operator sees no import control and is refused", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    // A SCRATCH role carrying exactly admin_panel:access + categories:view
    // (the AT-14 recipe, J3): no ratified role is touched.
    const supabase = adminClient();
    const roleName = `e2e_viewonly_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`AT-23 scratch role failed: ${roleError?.message}`);
    try {
      const { data: perms } = await supabase
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .in("resources.name", ["admin_panel", "categories"]);
      const wanted = (perms ?? []).filter((p) => {
        const resource = (p as unknown as { resources: { name: string } }).resources.name;
        return (
          (resource === "admin_panel" && p.action === "access") ||
          (resource === "categories" && p.action === "view")
        );
      });
      expect(wanted, "AT-23 expected exactly admin_panel:access + categories:view").toHaveLength(2);
      await supabase
        .from("role_permissions")
        .insert(wanted.map((p) => ({ role_id: role.id, permission_id: p.id })));

      const viewer = await createUser({ confirmed: true });
      await supabase
        .from("user_roles")
        .insert({ user_id: viewer.id, role_id: role.id, scope_type: "global" });
      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/attributes");
      await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("attribute-import")).toHaveCount(0);

      const token = await bearerOf(page);
      const denied = await importPost(page, token, {
        mode: "preview",
        definitions: `${DEF_HEADER}\r\ne2e_attr_denied,label,,text,,,0\r\n`,
      });
      expect(denied.status, JSON.stringify(denied.payload)).toBe(403);

      // NO BEARER, NO DOOR.
      const anonymous = await page.request.post("/api/admin/attributes/import", {
        data: { mode: "preview" },
      });
      expect(anonymous.status()).toBe(401);
    } finally {
      await supabase.from("role_permissions").delete().eq("role_id", role.id);
      await supabase.from("user_roles").delete().eq("role_id", role.id);
      await supabase.from("roles").delete().eq("id", role.id);
    }
  });

  /** AT-24 — the digest is the contract: an edited file cannot be committed. */
  test("AT-24 a commit whose bytes changed since the preview is refused", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    try {
      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const definitions = `${DEF_HEADER}\r\n${key},${key},,text,,,0\r\n`;
      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status).toBe(200);

      const edited = `${DEF_HEADER}\r\n${key},${key}_edited,,text,,,0\r\n`;
      const stale = await importPost(page, token, {
        mode: "commit",
        definitions: edited,
        digest: preview.payload["digest"],
      });
      expect(stale.status).toBe(409);
      expect(stale.payload["error"]).toBe("fileChanged");
      // A refused attempt leaves NO trace (F5).
      expect(await readAttribute(key)).toBeNull();
    } finally {
      await supabase.from("attributes").delete().eq("attr_key", key);
    }
  });

  /** AT-25 — DEC-045: a `parent` that is not on the depended-on list is refused. */
  test("AT-25 an invalid option parent is refused", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const base = `e2e_attr_${rand()}`;
    const child = `e2e_attr_${rand()}`;
    try {
      await supabase
        .from("attributes")
        .insert({
          attr_key: base,
          name_en: base,
          attr_type: "single_select",
          options: ["Toyota", "Honda"],
        })
        .select("id")
        .single();

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const options = JSON.stringify([
        { depends_on: base },
        { value: "Corolla", parent: "Toyota" },
        { value: "Civic", parent: "Suzuki" },
      ]).replaceAll('"', '""');
      const definitions = `${DEF_HEADER}\r\n${child},${child},,single_select,"${options}",,0\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const refusals = preview.payload["refusals"] as { reason: string }[];
      expect(refusals.map((entry) => entry.reason)).toContain("badParent");
      expect(await readAttribute(child)).toBeNull();
    } finally {
      await destroyAttribute(child);
      await destroyAttribute(base);
    }
  });
  /**
   * AT-27 — COLUMN CLASSES (IE-3). A links row carries an edited read-only
   * cell (`category_path`) AND a real editable change (`is_required`): the
   * preview lists the ignored cell, counts exactly one change, the commit
   * applies the attribute change only, and the categories table is untouched.
   */
  test("AT-27 an edited read-only cell is ignored while the row's real change applies", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-imp-${rand()}`;
    try {
      const { data: attribute } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "text" })
        .select("id")
        .single();
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      await supabase.from("category_attribute_links").insert({
        category_id: category!.id,
        attribute_id: attribute!.id,
        is_required: false,
        is_filterable: false,
      });

      const before = await supabase
        .from("categories")
        .select("slug,name_en,name_am,is_active,allow_listings,is_catchall")
        .eq("slug", slug)
        .single();

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      // `category_path` is derived — the file lies about it on purpose. The
      // header also carries the export's " (read-only)" suffix.
      const header =
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only)";
      const links = `${header}\r\nTOTALLY WRONG PATH,${slug},${key},true,false,,${slug}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect((preview.payload["counts"] as Record<string, number>).changes).toBe(1);
      const ignored = (preview.payload["ignored"] ?? []) as { row: number; column: string }[];
      expect(
        ignored.map((entry) => entry.column),
        `AT-27 the ignored panel: ${JSON.stringify(ignored)}`,
      ).toContain("category_path");
      expect(ignored[0]?.row).toBe(2);

      const commit = await importPost(page, token, {
        mode: "commit",
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);

      const after = await readLinks(category!.id);
      expect(after[0]?.is_required, "AT-27 the editable change did not apply").toBe(true);

      // DB TRUTH (J4): the categories row is byte-identical — an attributes
      // import can only ever reach attribute doors.
      const now = await supabase
        .from("categories")
        .select("slug,name_en,name_am,is_active,allow_listings,is_catchall")
        .eq("slug", slug)
        .single();
      expect(now.data, "AT-27 the attributes import touched a category").toEqual(before.data);
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /**
   * AT-28 — FILE IDENTITY (IE-3). A categories export dropped into the
   * attributes import is refused by its headers, before any row is parsed.
   */
  test("AT-28 a categories file is refused by identity", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/attributes");

    const token = await bearerOf(page);
    const categories = await page.request.get("/api/admin/categories/export", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(categories.status()).toBe(200);
    const categoriesCsv = await categories.text();

    const refused = await importPost(page, token, {
      mode: "preview",
      definitions: categoriesCsv,
    });
    expect(refused.status, JSON.stringify(refused.payload)).toBe(400);
    expect(refused.payload["error"]).toBe("wrongFile");

    // The DIALOG refuses it too, and never posts: no counts appear.
    await page.getByTestId("attribute-import").click();
    await expect(page.getByTestId("attribute-import-dialog")).toBeVisible();
    await attachCsv(page, "attribute-import-definitions", "categories.csv", categoriesCsv);
    await expect(page.getByTestId("attribute-import-error")).toBeVisible();
    await expect(page.getByTestId("attribute-import-counts")).toHaveCount(0);
    await page.getByTestId("attribute-import-discard").click();
  });

  /* ---------------------- IE-4b: label_am and refusals --------------------- */

  async function readAmRow(attributeId: string) {
    const { data } = await adminClient()
      .from("entity_translations")
      .select("value, status, machine")
      .eq("entity_type", "attribute")
      .eq("entity_id", attributeId)
      .eq("field", "label")
      .eq("lang_code", "am");
    return data ?? [];
  }

  /**
   * AT-29 — AMHARIC THROUGH THE DOOR. A definition created with a `label_am`
   * cell lands as a HUMAN, pending-review row ('edited', machine=false) — never
   * approved by the import. An EMPTY cell afterwards is SILENCE, and Undo
   * removes the row the batch itself created.
   */
  test("AT-29 an imported label_am is pending, silent when blank, and undone", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-imp-${rand()}`;
    const amharic = "ቀለም";
    try {
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      expect(category, "AT-29 the scratch category was not created").toBeTruthy();

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const definitions = `${DEF_HEADER}\r\n${key},${key},${cell(amharic)},text,,,0\r\n`;
      const links = `${LINK_HEADER}\r\n${slug},${slug},${key},false,false,,${slug}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions, links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect((preview.payload["counts"] as Record<string, number>).adds).toBe(2);
      // The am cell is editable now: it is never reported as an ignored column.
      expect(
        (preview.payload["ignored"] as unknown[] | undefined) ?? [],
        `AT-29 label_am was reported ignored: ${JSON.stringify(preview.payload["ignored"])}`,
      ).toHaveLength(0);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      const created = await readAttribute(key);
      expect(created, "AT-29 the definition was not created").toBeTruthy();

      const rows = await readAmRow(created!.id);
      expect(rows, "AT-29 no am row reached entity_translations").toHaveLength(1);
      expect(rows[0]?.value).toBe(amharic);
      expect(rows[0]?.status, "AT-29 the import must never approve a translation").toBe("edited");
      expect(rows[0]?.machine, "AT-29 the row must be human").toBe(false);

      // SILENCE — the same definition with an EMPTY am cell is not a change,
      // and it deletes nothing.
      const blank = `${DEF_HEADER}\r\n${key},${key},,text,,,1\r\n`;
      const silent = await importPost(page, token, { mode: "preview", definitions: blank });
      expect(silent.status, JSON.stringify(silent.payload)).toBe(200);
      expect(
        (silent.payload["counts"] as Record<string, number>).changes,
        `AT-29 a blank am cell read as a change: ${JSON.stringify(silent.payload["counts"])}`,
      ).toBe(0);
      expect(await readAmRow(created!.id), "AT-29 a preview wrote").toHaveLength(1);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readAttribute(key), "AT-29 undo left the definition behind").toBeFalsy();
      expect(await readAmRow(created!.id), "AT-29 undo left the am row behind").toHaveLength(0);
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /**
   * AT-30 — DELETE, ACCEPTED AND REFUSED. An unlinked definition deletes and
   * undoes (its captured am state comes back); a LINKED one is refused with the
   * category slugs named, not counted.
   */
  test("AT-30 an unlinked delete undoes and a linked delete names its categories", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const free = `e2e_attr_${rand()}`;
    const used = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-imp-${rand()}`;
    const amharic = "መጠን";
    try {
      const { data: freeRow } = await supabase
        .from("attributes")
        .insert({ attr_key: free, name_en: free, attr_type: "text" })
        .select("id")
        .single();
      const { data: usedRow } = await supabase
        .from("attributes")
        .insert({ attr_key: used, name_en: used, attr_type: "text" })
        .select("id")
        .single();
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      await supabase.from("category_attribute_links").insert({
        category_id: category!.id,
        attribute_id: usedRow!.id,
        is_required: false,
        is_filterable: false,
      });
      // An APPROVED am row on the free definition: Undo must bring it back
      // exactly as it stood, status included.
      await supabase.from("entity_translations").insert({
        entity_type: "attribute",
        entity_id: freeRow!.id,
        field: "label",
        lang_code: "am",
        value: amharic,
        status: "approved",
        machine: false,
      });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const header = `${DEF_HEADER},action`;
      const definitions =
        `${header}\r\n` +
        `${free},${free},${cell(amharic)},text,,,0,delete\r\n` +
        `${used},${used},,text,,,1,delete\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(counts.deletes, JSON.stringify(counts)).toBe(1);
      expect(counts.refusals, JSON.stringify(counts)).toBe(1);

      const refusals = preview.payload["refusals"] as Record<string, unknown>[];
      const blast = refusals.find((row) => row["reason"] === "blastRadius");
      expect(blast, `AT-30 no blast-radius refusal: ${JSON.stringify(refusals)}`).toBeTruthy();
      expect(blast?.["key"]).toBe(used);
      // The refusal NAMES the category it judged (IE-4b), never a bare count.
      expect(blast?.["detail"], "AT-30 the refusal did not name the category").toContain(slug);
      expect(blast?.["categories"]).toEqual([slug]);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;

      expect(await readAttribute(free), "AT-30 the unlinked delete did not apply").toBeFalsy();
      expect(await readAttribute(used), "AT-30 a refused row was applied").toBeTruthy();

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      const restored = await readAttribute(free);
      expect(restored, "AT-30 undo did not restore the definition").toBeTruthy();

      const rows = await readAmRow(restored!.id);
      expect(rows, "AT-30 undo did not restore the am row").toHaveLength(1);
      expect(rows[0]?.value).toBe(amharic);
      expect(rows[0]?.status, "AT-30 undo demoted an approved translation").toBe("approved");
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(free);
      await destroyAttribute(used);
    }
  });
  /**
   * DEC-045a — the DIRECT DOOR. The dependency laws are the SERVER's (F3), so
   * the refusal proofs address the RPC itself with the operator's own bearer,
   * never through a UI that could be hiding the control for other reasons.
   */
  async function rpcAs(token: string, name: string, args: Record<string, unknown>) {
    const base = (process.env["E2E_SUPABASE_URL"] ?? "").replace(/\/+$/, "");
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
    if (base === "" || key === "") throw new Error("[AT-33] E2E supabase env is not set");
    const response = await fetch(`${base}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const body = (await response.json().catch(() => null)) as Record<string, unknown> | null;
    return {
      error: response.ok ? null : ((body?.["message"] as string | undefined) ?? "unknown"),
      data: response.ok ? body : null,
    };
  }

  /* --------------------- DEC-045a: dependent options ---------------------- */

  /**
   * AT-31 — THE CASCADE, AUTHORED AND PREVIEWED. A dependent definition's
   * options live under the parent's values: choosing make A shows only A's
   * models, switching to B switches the list, clearing the make empties it.
   */
  test("AT-31 a dependent definition cascades in the editor", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    try {
      await supabase.from("attributes").insert({
        attr_key: makeKey,
        name_en: makeKey,
        attr_type: "single_select",
        options: ["alfa", "beta"],
      });

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-create").click();
      await expect(page.getByTestId("attribute-edit-dialog")).toBeVisible();
      await page.getByTestId("attribute-key").fill(modelKey);
      await page.getByTestId("attribute-name").fill(modelKey);
      await page.getByTestId("attribute-type").selectOption("single_select");
      await page.getByTestId("attribute-depends-on").selectOption(makeKey);

      // ONE EDITOR PER PARENT VALUE.
      await page.getByTestId("attribute-options-for-alfa").fill("alfa-1\nalfa-2");
      await page.getByTestId("attribute-options-for-beta").fill("beta-1");

      // THE CASCADE: empty until a parent value is chosen.
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("alfa");
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toBeVisible();
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("beta");
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toBeVisible();
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("");
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toHaveCount(0);

      await page.getByTestId("attribute-edit-submit").click();
      await expect(page.getByTestId("attribute-edit-dialog")).toHaveCount(0, { timeout: 30000 });

      // DB TRUTH: every option carries the parent value it was authored under.
      const { data } = await supabase
        .from("attributes")
        .select("options, depends_on")
        .eq("attr_key", modelKey)
        .single();
      expect(data, "AT-31 the dependent definition was not created").toBeTruthy();
      expect(data!.depends_on, "AT-31 the dependency was not stored").toBeTruthy();
      const parents = (data!.options as { value: string; parent: string }[]).map(
        (option) => `${option.parent}/${option.value}`,
      );
      expect(parents.sort()).toEqual(["alfa/alfa-1", "alfa/alfa-2", "beta/beta-1"]);
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
    }
  });

  /**
   * AT-33 — THE REFUSALS, SERVER-SIDE. A parent value outside the parent's
   * list, a cycle, a dependency on a text definition and a delete of a parent
   * that has dependents are all refused, the last one NAMING its dependents.
   */
  test("AT-33 the dependency doors refuse and name what they judged", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    const textKey = `e2e_attr_${rand()}`;
    try {
      const { data: make } = await supabase
        .from("attributes")
        .insert({
          attr_key: makeKey,
          name_en: makeKey,
          attr_type: "single_select",
          options: ["alfa"],
        })
        .select("id")
        .single();
      const { data: text } = await supabase
        .from("attributes")
        .insert({ attr_key: textKey, name_en: textKey, attr_type: "text" })
        .select("id")
        .single();

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const call = (name: string, args: Record<string, unknown>) => rpcAs(token, name, args);

      // A parent value that is not one of the parent's values.
      const strayParent = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "ghost", parent: "gamma" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(strayParent.error, "AT-33 a stray parent value was accepted").toContain(
        "parentNotInParent",
      );

      // A dependency on a TEXT definition.
      const notSelect = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "x", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: textKey,
      });
      expect(notSelect.error, "AT-33 a text parent was accepted").toContain("dependsNotSelect");

      // The legal write, then the CYCLE it makes possible.
      const ok = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "alfa-1", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(ok.error, `AT-33 the legal dependent write failed: ${ok.error}`).toBeNull();

      const cycle = await call("admin_upsert_attribute", {
        p_id: make!.id,
        p_attr_key: makeKey,
        p_name_en: makeKey,
        p_attr_type: "single_select",
        p_options: [{ value: "alfa", parent: "alfa-1" }],
        p_help_text_en: null,
        p_depends_on: modelKey,
      });
      expect(cycle.error, "AT-33 a dependency cycle was accepted").toContain("dependsCycle");

      // DELETING THE PARENT is refused, and the refusal NAMES the dependent.
      const blocked = await call("admin_delete_attribute", {
        p_id: make!.id,
        p_confirm_key: makeKey,
      });
      expect(blocked.error, "AT-33 a parent with dependents was deleted").toContain(
        "HasDependents",
      );
      expect(blocked.error, "AT-33 the refusal did not name the dependent").toContain(modelKey);

      // Nothing was written by any refused attempt (F5: a refusal leaves no trace).
      const { data: survivor } = await supabase
        .from("attributes")
        .select("id")
        .eq("attr_key", makeKey)
        .maybeSingle();
      expect(survivor, "AT-33 the refused delete still applied").toBeTruthy();
      expect(text, "AT-33 fixture missing").toBeTruthy();
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
      await destroyAttribute(textKey);
    }
  });

  /** AT-34 — no `categories:update`: no dependency control, and the RPC refuses. */
  test("AT-34 a categories:view-only operator cannot set a dependency", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const supabase = adminClient();
    const roleName = `e2e_viewonly_${rand()}`;
    const makeKey = `e2e_attr_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`AT-34 scratch role failed: ${roleError?.message}`);
    try {
      await supabase.from("attributes").insert({
        attr_key: makeKey,
        name_en: makeKey,
        attr_type: "single_select",
        options: ["alfa"],
      });
      const { data: perms } = await supabase
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .in("resources.name", ["admin_panel", "categories"]);
      const wanted = (perms ?? []).filter((p) => {
        const resource = (p as unknown as { resources: { name: string } }).resources.name;
        return (
          (resource === "admin_panel" && p.action === "access") ||
          (resource === "categories" && p.action === "view")
        );
      });
      expect(wanted, "AT-34 expected exactly admin_panel:access + categories:view").toHaveLength(2);
      await supabase
        .from("role_permissions")
        .insert(wanted.map((p) => ({ role_id: role.id, permission_id: p.id })));

      const viewer = await createUser({ confirmed: true });
      await supabase
        .from("user_roles")
        .insert({ user_id: viewer.id, role_id: role.id, scope_type: "global" });
      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/attributes");
      await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      // The editor is unreachable, so the control cannot be on the page.
      await expect(page.getByTestId("attribute-depends-on")).toHaveCount(0);

      // THE SERVER IS THE AUTHORITY (F3): the RPC refuses regardless.
      const denied = await rpcAs(await bearerOf(page), "admin_upsert_attribute", {
        p_id: null,
        p_attr_key: `e2e_attr_denied_${rand()}`,
        p_name_en: "denied",
        p_attr_type: "single_select",
        p_options: [{ value: "x", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(denied.error, "AT-34 a view-only operator wrote a dependency").toBeTruthy();
    } finally {
      await destroyAttribute(makeKey);
      await supabase.from("role_permissions").delete().eq("role_id", role.id);
      await supabase.from("user_roles").delete().eq("role_id", role.id);
      await supabase.from("roles").delete().eq("id", role.id);
    }
  });
});
