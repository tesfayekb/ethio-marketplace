import { expect, test } from "./fixtures";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchLanguage,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { stripScratchRows } from "./helpers/exports";
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
import {
  isCardTwin,
  librarySurface,
  libraryRows,
  openAttributeMenu,
  addOptionRow,
  seedAttribute,
  readAttribute,
  readLinks,
  destroyAttribute,
} from "./helpers/admin-attributes";

/**
 * C3-UI — THE ATTRIBUTE LIBRARY and the per-category LINK MANAGER (AT-1..AT-6).
 *
 * J-laws: every fixture is scratch and namespaced by `rand()`; every assertion
 * that matters reads DB TRUTH through the service client; nothing touches the
 * ratified 205-definition library except by reading it.
 */

test.describe("C3 attributes console", () => {
  test("AT-1 gating: a plain user is refused; the library renders for an admin", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/attributes");
    await waitForHydration(page);
    await expect(page.getByTestId("attribute-search")).toHaveCount(0);

    const admin = await leaseUser();
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
        await addOptionRow(page, "", "Alpha");
        await addOptionRow(page, "", "Beta");
        await page.getByTestId("attribute-edit-submit").click();
        await stepUpIfPrompted(page, secret);
      });

      await expect
        .poll(async () => (await readAttribute(key))?.attr_type, {
          timeout: 20000,
          message: await dialogDump(page, "AT-2 definition never landed"),
        })
        .toBe("single_select");
      /* DEC-050 L3b — every option is a full record, never a bare string. */
      expect((await readAttribute(key))?.options).toEqual([
        { value: "Alpha", label_en: "", label_am: "", parent: "" },
        { value: "Beta", label_en: "", label_am: "", parent: "" },
      ]);

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
    // J6 — this test's actor. The "still pending" claim is scoped to it.
    const actorId = (await signInAsSuperAdmin(page)).user.id;
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
      // Pending = no translation row THIS TEST's actor wrote (DB truth, J6),
      // rendered as untranslated. CENSUS: the bulk machine-translate sweep is
      // scoped by LANGUAGE only (the fence languages zxx-*/zxy-*) — there is no
      // key-prefix filter it could honour — so the isolation here is by actor.
      const { data } = await adminClient()
        .from("entity_translations")
        .select("entity_id")
        .eq("entity_type", "attribute")
        .eq("entity_id", id)
        .eq("updated_by", actorId);
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

      const viewer = await leaseUser();
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
        "attribute_key,label_en,label_am,type,options,depends_on,unit,unit_am,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only)",
      );
      expect(links.slice(1).split("\r\n")[0]).toBe(
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
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
      /**
       * The origin is no longer the last cell: the FOUR per-link cells trail it
       * (`allowed_options`, `default_value`, `visible_when`, `display_order` —
       * R-GATE echoed the last two). Only the order carries a value here.
       */
      expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
        new RegExp(`,${parentSlug},,,,\\d+$`),
      );
      // The parent's own row names ITSELF as the origin.
      const parentRow = links.split("\r\n").find((line) => line.includes(`,${parentSlug},${key},`));
      expect(parentRow!, `AT-15 the parent row's trailing cells: ${parentRow}`).toMatch(
        new RegExp(`,${parentSlug},,,,\\d+$`),
      );
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
    const plain = await leaseUser();
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
      { parent_id: null, child_id: parent.id, display_order: 2_000_900 },
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
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
      );
      // ONLY the subtree: every data row's category_slug is parent or child.
      const slugs = new Set(lines.slice(1).map((line) => line.split(",")[1]));
      expect([...slugs].sort()).toEqual([fixture.childSlug, fixture.parentSlug].sort());
      const childRow = lines.find((line) =>
        line.includes(`,${fixture.childSlug},${fixture.keyA},`),
      );
      expect(childRow, "AT-18 the inherited row is missing").toBeTruthy();
      // The origin is no longer the last cell: the FOUR per-link cells trail it
      // (R-GATE added `visible_when` and `display_order`; only the order has a value).
      expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
        new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
      );
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

  /* ------------- INH-1: inheritance follows PRIMARY lineage only ------------ */

  /**
   * AT-36 (INH-1, DEC-044 amendment) — a SECONDARY (browse) parent confers
   * NOTHING. Scratch A links two card attributes; scratch B is a ROOT that
   * carries A only as a secondary pointer, so B must show no inherited row,
   * must be absent from A's scoped export, and must KEEP the amber
   * two-must-display flag. Making A B's PRIMARY parent (dropping B's own root
   * pointer) flips all three the other way — the same primary-only set is read
   * by the console, the export and the roster.
   */
  test("AT-36 a secondary parent confers nothing, a primary parent confers", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const stamp = rand();
    const slugA = `e2e-cat-inh2-${stamp}-a`;
    const slugB = `e2e-cat-inh2-${stamp}-b`;
    const keyA = `e2e_attr_${rand()}`;
    const keyB = `e2e_attr_${rand()}`;

    // SEED BEFORE NAVIGATE (J7), through the service client (J5).
    const { data: attrs, error: attrError } = await supabase
      .from("attributes")
      .insert([
        { attr_key: keyA, name_en: keyA, attr_type: "text" },
        { attr_key: keyB, name_en: keyB, attr_type: "text" },
      ])
      .select("id, attr_key");
    if (attrError || !attrs) throw new Error(`AT-36 attributes failed: ${attrError?.message}`);
    const attrOne = attrs.find((row) => row.attr_key === keyA)!;
    const attrTwo = attrs.find((row) => row.attr_key === keyB)!;

    const { data: cats, error: catError } = await supabase
      .from("categories")
      .insert([
        { slug: slugA, name_en: slugA, is_active: true, allow_listings: true },
        { slug: slugB, name_en: slugB, is_active: true, allow_listings: true },
      ])
      .select("id, slug");
    if (catError || !cats) throw new Error(`AT-36 categories failed: ${catError?.message}`);
    const catA = cats.find((row) => row.slug === slugA)!;
    const catB = cats.find((row) => row.slug === slugB)!;

    // Both are ROOTS; A is B's SECONDARY (browse) parent only. The root pointer
    // sorts first, so B's PRIMARY edge is the root one.
    const { data: rootB, error: pointerError } = await supabase
      .from("category_tree_pointers")
      .insert([
        { parent_id: null, child_id: catA.id, display_order: 2_000_902 },
        { parent_id: null, child_id: catB.id, display_order: 2_000_903 },
        { parent_id: catA.id, child_id: catB.id, display_order: 1 },
      ])
      .select("id, parent_id, child_id");
    if (pointerError || !rootB) throw new Error(`AT-36 pointers failed: ${pointerError?.message}`);
    const rootPointerB = rootB.find((row) => row.parent_id === null && row.child_id === catB.id)!;

    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      { category_id: catA.id, attribute_id: attrOne.id, is_required: true, card_rank: 1 },
      { category_id: catA.id, attribute_id: attrTwo.id, is_required: false, card_rank: 2 },
    ]);
    if (linkError) throw new Error(`AT-36 links failed: ${linkError.message}`);

    const rowIdFor = (key: string) =>
      isCardTwin(page) ? `attribute-row-${key}-card` : `attribute-row-${key}`;

    async function scopedLinkSlugs(scope: string): Promise<string[]> {
      const token = await bearerOf(page);
      const response = await page.request.get(
        `/api/admin/attributes/export?file=links&scope=${scope}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      expect(response.status(), `AT-36 the scoped export failed for ${scope}`).toBe(200);
      const text = await response.text();
      const lines = text.slice(1).split("\r\n").filter(Boolean).slice(1);
      return [...new Set(lines.map((line) => line.split(",")[1] ?? ""))];
    }

    try {
      /* ---- SECONDARY: nothing crosses ---- */
      await gotoReady(page, `/admin/attributes?category=${slugB}`);
      const surface = librarySurface(page);
      // The filter is settled once its clear control is present.
      await expect(page.getByTestId("attribute-category-clear")).toBeVisible({ timeout: 30000 });
      await expect(
        surface.getByTestId(rowIdFor(keyA)),
        await dialogDump(page, "AT-36 a secondary parent conferred an inherited row"),
      ).toHaveCount(0);
      await expect(surface.getByTestId(`attribute-inherited-${keyA}`)).toHaveCount(0);

      expect(
        await scopedLinkSlugs(slugA),
        "AT-36 the scoped export crossed a secondary pointer",
      ).toEqual([slugA]);

      // C2k — SEARCH IS THE ANCHOR (page position never was) and J5 — the flag
      // is read inside its OWN twin row, never page-wide: both twins are in the
      // DOM, so a bare testid resolves twice.
      await gotoReady(page, "/admin/categories");
      const rowA = await findRow(page, slugA);
      await expect(rowA.getByTestId(`category-needs-card-${slugA}`)).toHaveCount(0);
      const rowBefore = await findRow(page, slugB);
      await expect(
        rowBefore.getByTestId(`category-needs-card-${slugB}`),
        await dialogDump(page, "AT-36 a secondary parent cleared the amber card flag"),
      ).toBeVisible({ timeout: 30000 });

      /* ---- PRIMARY: everything crosses ---- */
      const { error: dropError } = await supabase
        .from("category_tree_pointers")
        .delete()
        .eq("id", rootPointerB.id);
      if (dropError) throw new Error(`AT-36 promoting the pointer failed: ${dropError.message}`);

      await gotoReady(page, `/admin/attributes?category=${slugB}`);
      const badge = librarySurface(page).getByTestId(`attribute-inherited-${keyA}`);
      await expect(
        badge,
        await dialogDump(page, "AT-36 a primary parent conferred nothing"),
      ).toBeVisible({ timeout: 30000 });
      await expect(badge).toContainText(slugA);

      expect(
        (await scopedLinkSlugs(slugA)).sort(),
        "AT-36 the scoped export missed the primary descendant",
      ).toEqual([slugA, slugB].sort());

      await gotoReady(page, "/admin/categories");
      const rowAfter = await findRow(page, slugB);
      await expect(rowAfter.getByTestId(`category-needs-card-${slugB}`)).toHaveCount(0);
    } finally {
      await supabase
        .from("category_attribute_links")
        .delete()
        .in("attribute_id", [attrOne.id, attrTwo.id]);
      await destroyCategory(slugB);
      await destroyCategory(slugA);
      await destroyAttribute(keyA);
      await destroyAttribute(keyB);
    }
  });

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

  /**
   * A concurrent spec may create or destroy its own scratch fixtures between the
   * export and the preview, which would read as a phantom add. AT-20 asserts the
   * invariant over the STABLE library only — the strip itself is the ONE harness
   * helper (`stripScratchRows`, e2e/helpers/exports.ts, R-TR34/G28): EVERY record
   * naming ANY `e2e_`/`e2e-` fixture is dropped, so a worker mutating its own
   * fold set between the export and the preview never reads as a phantom change.
   */

  /** RFC 4180 cell for a hand-authored fixture file. */
  function cell(value: string): string {
    return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }
});
