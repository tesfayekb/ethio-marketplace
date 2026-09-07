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
      const status = page.getByTestId(`entity-status-attribute-${id}-label`);
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
      await expect(page.getByTestId("attribute-new")).toHaveCount(0);

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
});
