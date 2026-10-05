import { expect, test } from "./fixtures";
import { gotoReady, switchUser } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { stripScratchRows } from "./helpers/exports";
import {
  rand,
  bandOnly,
  destroyCategory,
  action,
  nameFoldPresent,
  scratchFoldWord,
  signInAsSuperAdmin,
} from "./helpers/categories";
import {
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
  /* --------------------------- IE-2: the import --------------------------- */

  /**
   * The import doors are asserted through the ROUTE with the page's bearer
   * (the same door the dialog posts to), and every verdict is confirmed
   * against DB TRUTH via the service client (J4). The UI half — the control's
   * visibility — is asserted in AT-23.
   */
  /**
   * DEC-050 L2b — the nine v2 cells sit between `depends_on` and the two
   * read-only cells. The header carries them, and `v2()` splices nine empty
   * cells into a hand-authored row at the same index, so every row below reads
   * exactly as it did before and no assertion is weakened.
   */
  const V2_CELLS = [
    "unit",
    "min",
    "max",
    "decimals",
    "format",
    "preset",
    "max_length",
    "help_text_en",
    "help_text_am",
  ] as const;
  const DEF_HEADER =
    `attribute_key,label_en,label_am,type,options,depends_on,${V2_CELLS.join(",")},` +
    "is_per_variant,direct_link_count";
  /** Splices the nine empty v2 cells after `depends_on`, quotes respected. */
  function v2(row: string): string {
    const cells: string[] = [];
    let current = "";
    let quoted = false;
    for (const ch of row) {
      if (quoted) {
        current += ch;
        if (ch === '"') quoted = false;
        continue;
      }
      if (ch === '"') {
        quoted = true;
        current += ch;
        continue;
      }
      if (ch === ",") {
        cells.push(current);
        current = "";
        continue;
      }
      current += ch;
    }
    cells.push(current);
    cells.splice(6, 0, ...V2_CELLS.map(() => ""));
    return cells.join(",");
  }
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
   * invariant over the STABLE library only — the strip itself is the ONE harness
   * helper (`stripScratchRows`, e2e/helpers/exports.ts, R-TR34/G28): EVERY record
   * naming ANY `e2e_`/`e2e-` fixture is dropped, so a worker mutating its own
   * fold set between the export and the preview never reads as a phantom change.
   */

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
    // J6 — this test's actor. Every DB-truth assertion below is scoped to it.
    const actorId = (await signInAsSuperAdmin(page)).user.id;
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

    const definitionsFile = stripScratchRows(await definitionsResponse.text());
    const linksFile = stripScratchRows(await linksResponse.text());
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

    // DB TRUTH (J4) scoped by J6: Discard wrote nothing THIS TEST could have
    // written — no capture row tagged with this test's pooled actor
    // (`created_by`) since `startedAt`. A parallel worker committing its own
    // batch is another test's business and must not fail this invariant.
    const { data: batches } = await adminClient()
      .from("attribute_import_revisions")
      .select("id")
      .eq("created_by", actorId)
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
        v2([key, key, "", "single_select", cell(options), "", "", "0"].join(",")) +
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

  /**
   * AT-63 (INC-264) — A SWATCH-ONLY CHANGE PREVIEWS AS ONE CHANGE, REFUSING NONE.
   *
   * D28 gave the option record an optional `swatch`, and the door
   * (`attr_option_shape`) has allowed it since 20260922100000 — but the importer's
   * GATE keeps its own copy of the option-key list and refuses first, so a
   * definitions file whose only edit was a colour came back
   * "Option 'white' carries a field this import does not know". The two lists must
   * agree, so this asserts the operator's actual file: a valid swatch on an
   * existing definition is 1 change and 0 refusals, while a key nobody knows is
   * still refused by name.
   */
  test("AT-63 a swatch-only definitions file previews as one change", async ({ page }) => {
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
            { value: "white", label_en: "White" },
            { value: "cat_tabby", label_en: "Tabby" },
          ],
        });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // THE OPERATOR'S FILE: the only edit is the colour of each option — one
      // hex, and a pattern (D28's three kinds, two of them here).
      const withSwatches = [
        '{"value":"white","label_en":"White","swatch":"#ffffff"}',
        '{"value":"cat_tabby","label_en":"Tabby","swatch":"pattern:tabby"}',
      ].join("|");
      const definitions =
        `${DEF_HEADER}\r\n` +
        v2([key, key, "", "single_select", cell(withSwatches), "", "", "0"].join(",")) +
        "\r\n";

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(
        counts,
        `AT-63 a swatch-only file must plan as changed: ${JSON.stringify(preview.payload["refusals"])}`,
      ).toMatchObject({ adds: 0, changes: 1, refusals: 0 });

      // AND THE ALLOWLIST IS STILL AN ALLOWLIST: an invented key refuses by name.
      const invented = [
        '{"value":"white","label_en":"White","swatch":"#ffffff"}',
        '{"value":"cat_tabby","label_en":"Tabby","nope":"x"}',
      ].join("|");
      const bad =
        `${DEF_HEADER}\r\n` +
        v2([key, key, "", "single_select", cell(invented), "", "", "0"].join(",")) +
        "\r\n";
      const refused = await importPost(page, token, { mode: "preview", definitions: bad });
      const refusals = (refused.payload["refusals"] as Record<string, unknown>[]) ?? [];
      expect(JSON.stringify(refusals), "AT-63 an unknown option key escaped the gate").toContain(
        "nope",
      );

      // A SPELLING THE DOOR REJECTS IS STILL REJECTED — the gate only judges text.
      const wrong = [
        '{"value":"white","label_en":"White","swatch":"red"}',
        '{"value":"cat_tabby","label_en":"Tabby"}',
      ].join("|");
      const worse =
        `${DEF_HEADER}\r\n` +
        v2([key, key, "", "single_select", cell(wrong), "", "", "0"].join(",")) +
        "\r\n";
      const badSwatch = await importPost(page, token, { mode: "preview", definitions: worse });
      expect(
        JSON.stringify(badSwatch.payload["refusals"] ?? []),
        "AT-63 an illegal swatch spelling was not refused",
      ).toContain("badSwatch");
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-64 (INC-306) — THE LINKS EXPORT NAMES THE SAME HOME AS THE CATEGORIES
   * EXPORT. A leaf with a flagged home A and a guest pointer under B at a LOWER
   * display_order: both files must name A (DEC-080 — the home is the flag, read
   * through cat_primary_parent, never re-derived from order).
   */
  test("AT-64 the links export and the categories export agree on a category's home", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const token = rand();
    const slugA = `e2e-at64-a-${token}`;
    const slugB = `e2e-at64-b-${token}`;
    const slugL = `e2e-at64-l-${token}`;
    const key = `e2e_attr_${rand()}`;
    try {
      const { data: cats, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: slugA, name_en: slugA },
          { slug: slugB, name_en: slugB },
          { slug: slugL, name_en: slugL },
        ])
        .select("id, slug");
      if (catError || !cats) throw new Error(`AT-64 category seed failed: ${catError?.message}`);
      const idOf = (slug: string) => cats.find((row) => row.slug === slug)!.id;
      // The home pointer is inserted FIRST, so it is the flagged home.
      const { error: homeError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: idOf(slugA), child_id: idOf(slugL), display_order: 5 });
      if (homeError) throw new Error(`AT-64 home pointer seed failed: ${homeError.message}`);
      const { error: guestError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: idOf(slugB), child_id: idOf(slugL), display_order: 0 });
      if (guestError) throw new Error(`AT-64 guest pointer seed failed: ${guestError.message}`);
      const { data: attribute, error: attributeError } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "text" })
        .select("id")
        .single();
      if (attributeError || !attribute) {
        throw new Error(`AT-64 attribute seed failed: ${attributeError?.message}`);
      }
      const { error: linkError } = await supabase
        .from("category_attribute_links")
        .insert({ category_id: idOf(slugL), attribute_id: attribute.id });
      if (linkError) throw new Error(`AT-64 link seed failed: ${linkError.message}`);

      await gotoReady(page, "/admin/attributes");
      const headers = { Authorization: `Bearer ${await bearerOf(page)}` };

      const links = await page.request.get("/api/admin/attributes/export?file=links", { headers });
      expect(links.status()).toBe(200);
      const linkRow = (await links.text())
        .split("\r\n")
        .find((line) => line.includes(`,${slugL},${key},`));
      expect(linkRow, "AT-64 the scratch link is missing from links.csv").toBeTruthy();
      expect(linkRow!.split(",")[0], `AT-64 links category_path: ${linkRow}`).toBe(
        `${slugA} / ${slugL}`,
      );

      const categories = await page.request.get("/api/admin/categories/export", { headers });
      expect(categories.status()).toBe(200);
      const catLines = (await categories.text()).replace(/^\ufeff/, "").split("\r\n");
      const header = catLines[0]!.split(",").map((cell) => cell.replace(/ \(read-only\)$/, ""));
      const slugAt = header.indexOf("category_slug");
      const parentAt = header.indexOf("parent_slug");
      const catRow = catLines
        .map((line) => line.split(","))
        .find((cells) => cells[slugAt] === slugL);
      expect(catRow, "AT-64 the scratch leaf is missing from the categories export").toBeTruthy();
      expect(catRow![parentAt], `AT-64 categories parent_slug: ${catRow!.join(",")}`).toBe(slugA);
    } finally {
      await destroyAttribute(key);
      await destroyCategory(slugL);
      await destroyCategory(slugB);
      await destroyCategory(slugA);
    }
  });

  /**
   * AT-43 (UX-2 PART 6 / IE-8) — THE RENAME DETECTOR. A file that introduces a
   * new key carrying an existing definition's label, type and options while
   * dropping that definition is renaming an IDENTITY, not adding an attribute:
   * it is refused, the old key is named in the guidance, and nothing is planned.
   */
  test("AT-43 a renamed key is refused and names the key to restore", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const oldKey = `e2e_attr_${rand()}`;
    const newKey = `e2e_attr_${rand()}`;
    try {
      await seedAttribute(oldKey);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // Same label_en, same type, same (empty) options — and `oldKey` absent.
      const definitions =
        `${DEF_HEADER}\r\n` + v2([newKey, oldKey, "", "text", "", "", "", "0"].join(",")) + "\r\n";

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const refusals = preview.payload["refusals"] as Record<string, unknown>[];
      const rename = refusals.find((row) => row["reason"] === "keyRename");
      expect(rename, `AT-43 no rename refusal: ${JSON.stringify(refusals)}`).toBeTruthy();
      expect(rename!["detail"], "AT-43 the refusal names the key to restore").toBe(oldKey);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(counts.adds, JSON.stringify(counts)).toBe(0);
      expect(await readAttribute(newKey), "AT-43 the preview wrote nothing").toBeNull();
    } finally {
      await destroyAttribute(newKey);
      await destroyAttribute(oldKey);
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
      const definitions = `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,1`)}\r\n`;
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

  /**
   * AT-69 (INC-432) — THE SELLER-NAME TABLE FOLLOWS THE ATTRIBUTE IMPORT. A
   * brand option the import adds to a scratch brand definition is protected
   * the moment the commit returns and released the moment its undo returns
   * (DB truth: name_folds, kind brand).
   */
  test("AT-69 an imported brand option is in the name table after commit and gone after undo", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_brand_${rand()}`;
    const word = scratchFoldWord();
    try {
      await supabase.from("attributes").insert({
        attr_key: key,
        name_en: key,
        attr_type: "single_select",
        options: [{ value: "alpha", label_en: "Alpha" }],
      });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      expect(await nameFoldPresent("brand", word), "AT-69 the scratch word pre-exists").toBe(false);

      const options = [
        '{"value": "alpha", "label_en": "Alpha"}',
        `{"value": "${word}", "label_en": "${word}"}`,
      ].join("|");
      const definitions =
        `${DEF_HEADER}\r\n` +
        v2([key, key, "", "single_select", cell(options), "", "", "0"].join(",")) +
        "\r\n";
      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(
        (preview.payload["counts"] as Record<string, number>).changes,
        JSON.stringify(preview.payload["refusals"]),
      ).toBe(1);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();
      expect(await nameFoldPresent("brand", word), "AT-69 not protected after commit").toBe(true);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await nameFoldPresent("brand", word), "AT-69 still protected after undo").toBe(false);
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-44 (DEC-050 L2b) — THE NINE v2 CELLS TRAVEL BOTH WAYS. A file carrying
   * unit, bounds, decimals, format and help text commits, DB truth shows every
   * cell, the export echoes them, re-importing the export is a no-op, and the
   * undo restores the row to silence.
   */
  test("AT-44 the v2 definition cells commit, export and round-trip unchanged", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    try {
      await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "number" });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      // attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,
      // decimals,format,preset,max_length,help_text_en,help_text_am,
      // is_per_variant,direct_link_count
      const row = `${key},${key},,number,,,km,0,100,1,plain,,,${cell("How far it travels")},,,0`;
      const definitions = `${DEF_HEADER}\r\n${row}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(counts.changes, JSON.stringify(preview.payload)).toBe(1);
      expect(counts.refusals, JSON.stringify(preview.payload["refusals"])).toBe(0);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      // DB TRUTH (J4) — every cell landed where the schema keeps it.
      const { data: applied } = await supabase
        .from("attributes")
        .select("unit, min_bound, max_bound, decimals, format, help_text_en")
        .eq("attr_key", key)
        .single();
      expect(applied, "AT-44 the commit applied no v2 cells").toMatchObject({
        unit: "km",
        min_bound: "0",
        max_bound: "100",
        decimals: 1,
        format: "plain",
        help_text_en: "How far it travels",
      });

      // THE EXPORT ECHOES THEM, and re-importing what it wrote changes nothing.
      const exported = await page.request.get("/api/admin/attributes/export?file=definitions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(exported.status()).toBe(200);
      const text = await exported.text();
      const records = (text.charCodeAt(0) === 0xfeff ? text.slice(1) : text).split("\r\n");
      const header = records[0] ?? "";
      const mine = records.find((record) => record.startsWith(`${key},`));
      expect(mine, "AT-44 the export carries no row for this attribute").toBeTruthy();
      expect(mine!, "AT-44 the export lost the v2 cells").toContain("km,0,100,1,plain");

      const echo = await importPost(page, token, {
        mode: "preview",
        definitions: `\uFEFF${header}\r\n${mine}\r\n`,
      });
      expect(echo.status, JSON.stringify(echo.payload)).toBe(200);
      const echoCounts = echo.payload["counts"] as Record<string, number>;
      expect(
        { changes: echoCounts.changes, adds: echoCounts.adds, refusals: echoCounts.refusals },
        `AT-44 the export did not round-trip: ${JSON.stringify(echo.payload)}`,
      ).toEqual({ changes: 0, adds: 0, refusals: 0 });
      expect(echoCounts.unchanged).toBe(1);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      const { data: restored } = await supabase
        .from("attributes")
        .select("unit, min_bound, max_bound, decimals, format, help_text_en")
        .eq("attr_key", key)
        .single();
      expect(restored, "AT-44 the undo did not restore silence").toMatchObject({
        unit: null,
        min_bound: null,
        max_bound: null,
        decimals: null,
        format: null,
        help_text_en: null,
      });
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-45 (DEC-050 L2b) — AN OPTION'S DEFAULTS ARE SILENCE, AND A BAD OPTION
   * NAMES ITSELF. A file spelling out `active: true`, empty bounds and empty
   * aliases means exactly what the export writes without them, so the round
   * trip is a no-op; an option carrying a duplicate spelling is refused with
   * `badOption`, the row it sits on, and the option it is about.
   */
  test("AT-45 spelled-out option defaults are a no-op and a bad option is named", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    try {
      await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "single_select" });

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      const spelled = cell(
        '{"value": "alpha", "label_en": "Alpha", "active": true, "bounds": {}, "aliases": []}',
      );
      const definitions = `${DEF_HEADER}\r\n${v2(`${key},${key},,single_select,${spelled},,,0`)}\r\n`;
      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(
        (preview.payload["counts"] as Record<string, number>).refusals,
        JSON.stringify(preview.payload["refusals"]),
      ).toBe(0);
      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;

      // The same meaning, spelled out again: the defaults are silence, so the
      // second preview reads as unchanged, never as a change.
      const again = await importPost(page, token, { mode: "preview", definitions });
      expect(again.status, JSON.stringify(again.payload)).toBe(200);
      const againCounts = again.payload["counts"] as Record<string, number>;
      expect(
        { changes: againCounts.changes, refusals: againCounts.refusals },
        `AT-45 spelled-out defaults read as a change: ${JSON.stringify(again.payload)}`,
      ).toEqual({ changes: 0, refusals: 0 });

      // A BAD OPTION: the same spelling twice. The refusal names its row and
      // the option, so the operator can find the cell (F4).
      const hostile = cell('{"value": "alpha", "aliases": ["ALFA", "ALFA"]}');
      const bad = await importPost(page, token, {
        mode: "preview",
        definitions: `${DEF_HEADER}\r\n${v2(`${key},${key},,single_select,${hostile},,,0`)}\r\n`,
      });
      expect(bad.status, JSON.stringify(bad.payload)).toBe(200);
      const refusals = (bad.payload["refusals"] as Record<string, unknown>[]) ?? [];
      const option = refusals.find((entry) => entry["reason"] === "badOption");
      expect(option, `AT-45 no badOption refusal: ${JSON.stringify(refusals)}`).toBeTruthy();
      expect(Number(option!["row"]), "AT-45 the refusal names no row").toBeGreaterThan(1);
      expect(String(option!["detail"]), "AT-45 the refusal names no option").toContain("alpha");

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-46 (DEC-050 L2a/L2b) — EFFECTIVE CARD-RANK UNIQUENESS, BOTH WRITERS. A
   * scratch root holds a card attribute at rank 2, so its child INHERITS rank 2
   * (primary lineage, INH-1). The import refuses a direct link taking that rank
   * and names BOTH origins; a free rank is planned. The link-manager door
   * carries the same rule and raises its own key.
   *
   * LIMITATION (honest): `admin_set_card_attributes` derives each rank from the
   * ORDERED position, so a rank cannot be requested in isolation — rank 3 is
   * requested by a three-long order whose rank-2 slot is the child's own direct
   * link to the INHERITED attribute (the one override the rule allows).
   */
  test("AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const stamp = rand();
    const rootSlug = `e2e-cat-rank-${stamp}`;
    const childSlug = `e2e-cat-rank-${stamp}-child`;
    const keyInherited = `e2e_attr_${rand()}`;
    const keyDirect = `e2e_attr_${rand()}`;
    const keyFiller = `e2e_attr_${rand()}`;
    try {
      // SEED BEFORE NAVIGATE (J7), service client (J5), scratch namespace (J1).
      const { data: attrs, error: attrError } = await supabase
        .from("attributes")
        .insert([
          { attr_key: keyInherited, name_en: keyInherited, attr_type: "number" },
          { attr_key: keyDirect, name_en: keyDirect, attr_type: "number" },
          { attr_key: keyFiller, name_en: keyFiller, attr_type: "number" },
        ])
        .select("id, attr_key");
      if (attrError || !attrs) throw new Error(`AT-46 attributes failed: ${attrError?.message}`);
      const attrInherited = attrs.find((row) => row.attr_key === keyInherited)!;
      const attrDirect = attrs.find((row) => row.attr_key === keyDirect)!;
      const attrFiller = attrs.find((row) => row.attr_key === keyFiller)!;

      const { data: cats, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: rootSlug, name_en: rootSlug, is_active: true, allow_listings: true },
          { slug: childSlug, name_en: childSlug, is_active: true, allow_listings: true },
        ])
        .select("id, slug");
      if (catError || !cats) throw new Error(`AT-46 categories failed: ${catError?.message}`);
      const root = cats.find((row) => row.slug === rootSlug)!;
      const child = cats.find((row) => row.slug === childSlug)!;

      const { error: pointerError } = await supabase.from("category_tree_pointers").insert([
        { parent_id: null, child_id: root.id, display_order: 2_000_901 },
        { parent_id: root.id, child_id: child.id, display_order: 1 },
      ]);
      if (pointerError) throw new Error(`AT-46 pointers failed: ${pointerError.message}`);

      // The root's card attribute at rank 2 — the child inherits that rank.
      const { error: rootLinkError } = await supabase
        .from("category_attribute_links")
        .insert({ category_id: root.id, attribute_id: attrInherited.id, card_rank: 2 });
      if (rootLinkError) throw new Error(`AT-46 root link failed: ${rootLinkError.message}`);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const definitions =
        `${DEF_HEADER}\r\n` +
        `${v2(`${keyInherited},${keyInherited},,number,,,,1`)}\r\n` +
        `${v2(`${keyDirect},${keyDirect},,number,,,,0`)}\r\n`;

      // (a) THE IMPORT REFUSES rank 2 and names both origins.
      const clash = `${LINK_HEADER}\r\n${childSlug},${childSlug},${keyDirect},false,false,2,${childSlug}\r\n`;
      const refused = await importPost(page, token, { mode: "preview", definitions, links: clash });
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      const refusals = (refused.payload["refusals"] as Record<string, unknown>[]) ?? [];
      const clashRefusal = refusals.find((entry) => entry["reason"] === "rankInherited");
      expect(
        clashRefusal,
        `AT-46 no rankInherited refusal: ${JSON.stringify(refused.payload)}`,
      ).toBeTruthy();
      expect(
        clashRefusal!["origin_category"],
        `AT-46 the refusal names no origin category: ${JSON.stringify(clashRefusal)}`,
      ).toBe(rootSlug);
      expect(
        clashRefusal!["origin_key"],
        `AT-46 the refusal names no inherited key: ${JSON.stringify(clashRefusal)}`,
      ).toBe(keyInherited);
      expect(Number(clashRefusal!["row"]), "AT-46 the refusal names no row").toBeGreaterThan(1);
      // The preview wrote nothing (F5): the child still owns no link.
      expect(await readLinks(child.id), "AT-46 the preview wrote a link").toHaveLength(0);

      // (b) A FREE RANK IS PLANNED — one add, still nothing written.
      const free = `${LINK_HEADER}\r\n${childSlug},${childSlug},${keyDirect},false,false,3,${childSlug}\r\n`;
      const planned = await importPost(page, token, { mode: "preview", definitions, links: free });
      expect(planned.status, JSON.stringify(planned.payload)).toBe(200);
      expect(
        (planned.payload["refusals"] as unknown[]) ?? [],
        `AT-46 rank 3 was refused: ${JSON.stringify(planned.payload)}`,
      ).toHaveLength(0);
      expect(
        (planned.payload["counts"] as Record<string, number>).adds,
        `AT-46 rank 3 planned no add: ${JSON.stringify(planned.payload)}`,
      ).toBe(1);

      // (c) THE DOOR carries the same rule. The child takes its own direct
      // links first, then the ordered card request is judged.
      const { error: childLinkError } = await supabase.from("category_attribute_links").insert([
        { category_id: child.id, attribute_id: attrFiller.id },
        { category_id: child.id, attribute_id: attrDirect.id },
        { category_id: child.id, attribute_id: attrInherited.id },
      ]);
      if (childLinkError) throw new Error(`AT-46 child links failed: ${childLinkError.message}`);

      const verdicts = await page.evaluate(
        async ([childId, fillerId, directId, inheritedId]) => {
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
          // rank 2 for the direct definition — refused.
          const clashing = await client.rpc("admin_set_card_attributes", {
            p_category_id: childId,
            p_ordered_attribute_ids: [fillerId, directId, inheritedId],
          });
          // rank 3 for the direct definition — accepted.
          const accepted = await client.rpc("admin_set_card_attributes", {
            p_category_id: childId,
            p_ordered_attribute_ids: [fillerId, inheritedId, directId],
          });
          return {
            clashing: clashing.error?.message ?? "NO ERROR",
            accepted: accepted.error?.message ?? "NO ERROR",
          };
        },
        [child.id, attrFiller.id, attrDirect.id, attrInherited.id],
      );
      expect(verdicts.clashing, "AT-46 the door tolerated an inherited rank").toContain(
        "admin.attributes.error.rankInherited",
      );
      expect(verdicts.accepted, "AT-46 the door refused a free rank").toBe("NO ERROR");

      const landed = await readLinks(child.id);
      expect(
        landed.find((row) => row.attribute_id === attrDirect.id)?.card_rank,
        `AT-46 the accepted order did not land: ${JSON.stringify(landed)}`,
      ).toBe(3);
    } finally {
      // `destroyAttribute` drops every link the definition owns first, so the
      // scratch categories leave clean (J3).
      await destroyCategory(childSlug);
      await destroyCategory(rootSlug);
      await destroyAttribute(keyInherited);
      await destroyAttribute(keyDirect);
      await destroyAttribute(keyFiller);
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
      definitions: `${DEF_HEADER}\r\n${v2(`${key},"=SUM(1)",,text,,,,0`)}\r\n`,
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

    // PART 2b — THE LINK DOOR AND BOTH CONSOLE READERS SPEAK THE SAME CELLS.
    const supabase = adminClient();
    const categorySlug = `e2e-link-cells-${rand()}`;
    const parentKey = `e2e_attr_${rand()}`;
    const childKey = `e2e_attr_${rand()}`;
    const values = [`${childKey}_one`, `${childKey}_two`];
    let categoryId = "";
    let parentId = "";
    let childId = "";
    try {
      const category = await supabase
        .from("categories")
        .insert({
          slug: categorySlug,
          name_en: categorySlug,
          is_active: true,
          allow_listings: true,
        })
        .select("id")
        .single();
      if (category.error || !category.data)
        throw new Error(`AT-22 category: ${category.error?.message}`);
      categoryId = category.data.id;
      const attributes = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: parentKey,
            name_en: parentKey,
            attr_type: "single_select",
            options: [{ value: "show", label_en: "Show", active: true }],
          },
          {
            attr_key: childKey,
            name_en: childKey,
            attr_type: "single_select",
            options: values.map((value) => ({ value, label_en: value, active: true })),
          },
        ])
        .select("id,attr_key");
      if (attributes.error || !attributes.data)
        throw new Error(`AT-22 attributes: ${attributes.error?.message}`);
      parentId = attributes.data.find((row) => row.attr_key === parentKey)?.id ?? "";
      childId = attributes.data.find((row) => row.attr_key === childKey)?.id ?? "";
      expect(parentId).not.toBe("");
      expect(childId).not.toBe("");

      const landed = await page.evaluate(
        async ([cat, parent, child, first, condition]) => {
          const client = (
            window as unknown as {
              __ethioSupabase: {
                rpc: (
                  fn: string,
                  args: Record<string, unknown>,
                ) => Promise<{ data: unknown; error: { message: string } | null }>;
              };
            }
          ).__ethioSupabase;
          const parentLink = await client.rpc("admin_link_attribute", {
            p_category_id: cat,
            p_attribute_id: parent,
            p_is_required: false,
            p_is_filterable: true,
            p_display_order: 1,
          });
          if (parentLink.error) throw new Error(parentLink.error.message);
          const childLink = await client.rpc("admin_link_attribute", {
            p_category_id: cat,
            p_attribute_id: child,
            p_is_required: false,
            p_is_filterable: true,
            p_display_order: 2,
            p_allowed_options: [first],
            p_default_value: first,
            p_visible_when: { key: condition, in: ["show"] },
          });
          if (childLink.error) throw new Error(childLink.error.message);
          const own = await client.rpc("admin_list_category_attribute_links", {
            p_category_id: cat,
          });
          const effective = await client.rpc("admin_list_effective_category_links", {
            p_category_id: cat,
          });
          if (own.error || effective.error)
            throw new Error(own.error?.message ?? effective.error?.message);
          return { own: own.data, effective: effective.data };
        },
        [categoryId, parentId, childId, values[0] ?? "", parentKey],
      );
      for (const rows of [landed.own, landed.effective]) {
        const child = (rows as Record<string, unknown>[]).find(
          (row) => row["attr_key"] === childKey,
        );
        expect(child?.["allowed_options"]).toEqual([values[0]]);
        expect(child?.["default_value"]).toBe(values[0]);
        expect(child?.["visible_when"]).toEqual({ key: parentKey, in: ["show"] });
      }
    } finally {
      if (childId !== "")
        await supabase.from("category_attribute_links").delete().eq("attribute_id", childId);
      if (parentId !== "")
        await supabase.from("category_attribute_links").delete().eq("attribute_id", parentId);
      await destroyAttribute(childKey);
      await destroyAttribute(parentKey);
      if (categoryId !== "") await destroyCategory(categorySlug);
    }
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

      const viewer = await leaseUser();
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
        definitions: `${DEF_HEADER}\r\n${v2("e2e_attr_denied,label,,text,,,,0")}\r\n`,
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
      const definitions = `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,0`)}\r\n`;
      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status).toBe(200);

      const edited = `${DEF_HEADER}\r\n${v2(`${key},${key}_edited,,text,,,,0`)}\r\n`;
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
      const definitions = `${DEF_HEADER}\r\n${v2(`${child},${child},,single_select,"${options}",,,0`)}\r\n`;

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
   * AT-21 (U6-C1-R3b-1 STEP 7) — THE TWO PER-LINK CELLS (D-spec §12,
   * M-MAINT-2 B). A links FILE narrows one category's copy of a shared
   * definition (`allowed_options`) and prefills it (`default_value`); the commit
   * writes both, and the export echoes what was stored — a console that drops a
   * field it does not show is INC-188, and so is a file that does.
   */
  test("AT-21 a links file sets the allowed options and the default, and the export echoes both", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-link-${rand()}`;
    try {
      const { data: attribute } = await supabase
        .from("attributes")
        .insert({
          attr_key: key,
          name_en: key,
          attr_type: "single_select",
          options: [
            { value: "alpha", label_en: "Alpha", active: true },
            { value: "beta", label_en: "Beta", active: true },
            { value: "gamma", label_en: "Gamma", active: true },
          ],
        })
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
      // The two cells are TRAILING (the gate's `optionalFrom`), so the file the
      // console exports carries them after `origin`.
      const header = `${LINK_HEADER},allowed_options,default_value`;
      const links = `${header}\r\n${slug},${slug},${key},false,false,,${slug},alpha|beta,beta\r\n`;

      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect((preview.payload["counts"] as Record<string, number>).changes).toBe(1);
      expect((preview.payload["refusals"] ?? []) as unknown[]).toHaveLength(0);

      const commit = await importPost(page, token, {
        mode: "commit",
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);

      // DB TRUTH (J4): both cells landed on the link, and nowhere else.
      const stored = await supabase
        .from("category_attribute_links")
        .select("allowed_options,default_value")
        .eq("category_id", category!.id)
        .eq("attribute_id", attribute!.id)
        .single();
      expect(stored.data?.allowed_options, "AT-21 the narrowing was not stored").toEqual([
        "alpha",
        "beta",
      ]);
      expect(JSON.stringify(stored.data?.default_value), "AT-21 the default was not stored").toBe(
        JSON.stringify("beta"),
      );

      // THE ROUND TRIP: the export carries back exactly what was stored.
      const exported = await page.request.get("/api/admin/attributes/export?file=links", {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(exported.status()).toBe(200);
      const body = await exported.text();
      const row = body.split("\r\n").find((line) => line.includes(`,${slug},${key},`));
      expect(row, "AT-21 the scratch link is missing from the export").toBeTruthy();
      expect(row, "AT-21 the export dropped the two per-link cells").toContain(",alpha|beta,beta");
    } finally {
      const { data: row } = await supabase
        .from("attributes")
        .select("id")
        .eq("attr_key", key)
        .maybeSingle();
      if (row) await supabase.from("category_attribute_links").delete().eq("attribute_id", row.id);
      await destroyCategory(slug);
      await destroyAttribute(key);
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
        "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value";
      // U6-C1-R3b-1 STEP 7 — two more cells (`allowed_options`, `default_value`),
      // left empty here: this row is about the derived path, not about them.
      const links = `${header}\r\nTOTALLY WRONG PATH,${slug},${key},true,false,,${slug},,\r\n`;

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
   * AT-70 (M8b B2, rankClash) — THE PLANNER JUDGES THE END STATE OF DIRECT RANKS.
   * A rank held by two keys once the file is applied refuses the file row(s)
   * holding it; a swap inside one file has no clash in its end state.
   */
  test("AT-70 a direct rank held twice in the end state is refused as rankClash", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const slug = `e2e-cat-clash-${rand()}`;
    const keys = [`e2e_attr_${rand()}`, `e2e_attr_${rand()}`, `e2e_attr_${rand()}`];
    try {
      // SEED BEFORE NAVIGATE (J7), service client (J5), scratch namespace (J1).
      const { data: attrs, error: attrError } = await supabase
        .from("attributes")
        .insert(keys.map((key) => ({ attr_key: key, name_en: key, attr_type: "number" })))
        .select("id, attr_key");
      if (attrError || !attrs) throw new Error(`AT-70 attributes failed: ${attrError?.message}`);
      const idOf = (key: string) => attrs.find((row) => row.attr_key === key)!.id as string;
      const { data: cat, error: catError } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
        .select("id")
        .single();
      if (catError || !cat) throw new Error(`AT-70 category failed: ${catError?.message}`);
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: null, child_id: cat.id, display_order: 2_000_970 });
      if (pointerError) throw new Error(`AT-70 pointer failed: ${pointerError.message}`);
      const { error: linkError } = await supabase.from("category_attribute_links").insert(
        keys.map((key, at) => ({
          category_id: cat.id,
          attribute_id: idOf(key),
          display_order: at + 1,
          card_rank: at + 1,
        })),
      );
      if (linkError) throw new Error(`AT-70 links failed: ${linkError.message}`);

      const ranksOf = async () => {
        const rows = await readLinks(cat.id);
        return keys.map((key) => {
          const row = rows.find((link) => link.attribute_id === idOf(key));
          return row?.card_rank === null || row === undefined ? null : Number(row.card_rank);
        });
      };
      const linkRow = (key: string, rank: string) =>
        `${slug},${slug},${key},false,false,${rank},${slug}`;
      const refusalsOf = (payload: Record<string, unknown>) =>
        (payload["refusals"] as Record<string, unknown>[]) ?? [];

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // (a) the second key takes rank 3 while the third keeps it.
      const clash = `${LINK_HEADER}\r\n${linkRow(keys[1], "3")}\r\n`;
      const preview = await importPost(page, token, { mode: "preview", links: clash });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const refused = refusalsOf(preview.payload);
      expect(refused, `AT-70 (a) preview: ${JSON.stringify(preview.payload)}`).toHaveLength(1);
      expect(refused[0]).toMatchObject({
        reason: "rankClash",
        key: keys[1],
        category: slug,
        rank: 3,
        origin_key: keys[2],
      });
      const commit = await importPost(page, token, {
        mode: "commit",
        links: clash,
        digest: preview.payload["digest"],
      });
      expect(commit.status, `AT-70 (a) commit: ${JSON.stringify(commit.payload)}`).toBe(200);
      expect(
        refusalsOf(commit.payload).map((entry) => entry["reason"]),
        `AT-70 (a) commit refusals: ${JSON.stringify(commit.payload)}`,
      ).toEqual(["rankClash"]);
      expect(await ranksOf(), "AT-70 (a) the refused commit moved a rank").toEqual([1, 2, 3]);

      // (b) two file rows take rank 2 (one of them the holder): both refused.
      const twice =
        `${LINK_HEADER}\r\n${linkRow(keys[0], "2")}\r\n` + `${linkRow(keys[2], "2")}\r\n`;
      const twicePreview = await importPost(page, token, { mode: "preview", links: twice });
      expect(twicePreview.status, JSON.stringify(twicePreview.payload)).toBe(200);
      expect(
        refusalsOf(twicePreview.payload)
          .map((entry) => `${entry["reason"]}:${entry["key"]}`)
          .sort(),
        `AT-70 (b) preview: ${JSON.stringify(twicePreview.payload)}`,
      ).toEqual([`rankClash:${keys[0]}`, `rankClash:${keys[2]}`].sort());

      // (c) the swap 1 <-> 3: no clash in the end state.
      const swap =
        `${LINK_HEADER}\r\n${linkRow(keys[0], "3")}\r\n` + `${linkRow(keys[2], "1")}\r\n`;
      const swapPreview = await importPost(page, token, { mode: "preview", links: swap });
      expect(swapPreview.status, JSON.stringify(swapPreview.payload)).toBe(200);
      expect(
        refusalsOf(swapPreview.payload),
        `AT-70 (c) the swap was refused: ${JSON.stringify(swapPreview.payload)}`,
      ).toHaveLength(0);
      expect(await ranksOf(), "AT-70 a preview wrote a rank").toEqual([1, 2, 3]);
    } finally {
      await destroyCategory(slug);
      for (const key of keys) await destroyAttribute(key);
    }
  });

  /**
   * AT-71 (M8b B3, optionInUse) — A DEFINITIONS ROW THAT REMOVES OR RETIRES AN
   * OPTION VALUE STILL NAMED ELSEWHERE IS REFUSED, NAMING THE HOLDERS, unless
   * the same file takes care of the holder.
   */
  test("AT-71 removing an option value still in use is refused as optionInUse", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const slug = `e2e-cat-inuse-${rand()}`;
    const keyP = `e2e_attr_${rand()}`;
    const keyD = `e2e_attr_${rand()}`;
    const keyE = `e2e_attr_${rand()}`;
    const opt = (value: string, extra: Record<string, unknown> = {}) => ({
      value,
      label_en: value,
      ...extra,
    });
    try {
      const { data: attrs, error: attrError } = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: keyP,
            name_en: keyP,
            attr_type: "single_select",
            options: [opt("a"), opt("b"), opt("c")],
          },
          { attr_key: keyD, name_en: keyD, attr_type: "number" },
          {
            attr_key: keyE,
            name_en: keyE,
            attr_type: "single_select",
            options: [opt("x", { allowed: { [keyP]: ["c"] } })],
          },
        ])
        .select("id, attr_key");
      if (attrError || !attrs) throw new Error(`AT-71 attributes failed: ${attrError?.message}`);
      const idOf = (key: string) => attrs.find((row) => row.attr_key === key)!.id as string;
      const { data: cat, error: catError } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
        .select("id")
        .single();
      if (catError || !cat) throw new Error(`AT-71 category failed: ${catError?.message}`);
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: null, child_id: cat.id, display_order: 2_000_971 });
      if (pointerError) throw new Error(`AT-71 pointer failed: ${pointerError.message}`);
      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        { category_id: cat.id, attribute_id: idOf(keyP), display_order: 1 },
        {
          category_id: cat.id,
          attribute_id: idOf(keyD),
          display_order: 2,
          visible_when: { key: keyP, in: ["b"] },
        },
      ]);
      if (linkError) throw new Error(`AT-71 links failed: ${linkError.message}`);

      const pRow = (options: Record<string, unknown>[]) =>
        `${DEF_HEADER}\r\n${v2(`${keyP},${keyP},,single_select,${cell(JSON.stringify(options))},,,0`)}\r\n`;
      const refusalsOf = (payload: Record<string, unknown>) =>
        (payload["refusals"] as Record<string, unknown>[]) ?? [];

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // (a) P loses b while D's condition names b.
      const dropB = pRow([opt("a"), opt("c")]);
      const a = await importPost(page, token, { mode: "preview", definitions: dropB });
      expect(a.status, JSON.stringify(a.payload)).toBe(200);
      const aRefusal = refusalsOf(a.payload).find((entry) => entry["reason"] === "optionInUse");
      expect(aRefusal, `AT-71 (a) not refused: ${JSON.stringify(a.payload)}`).toBeTruthy();
      expect(String(aRefusal!["detail"]), "AT-71 (a) detail").toContain("b");
      expect(String(aRefusal!["detail"]), "AT-71 (a) holder").toContain(
        `${slug}·${keyD}·visible_when`,
      );

      // (b) the same file re-points D's condition at a: accepted.
      const links =
        `${LINK_HEADER},visible_when\r\n` +
        `${slug},${slug},${keyD},false,false,,${slug},${keyP}=a\r\n`;
      const b = await importPost(page, token, { mode: "preview", definitions: dropB, links });
      expect(b.status, JSON.stringify(b.payload)).toBe(200);
      expect(refusalsOf(b.payload), `AT-71 (b) refused: ${JSON.stringify(b.payload)}`).toHaveLength(
        0,
      );

      // (c) P loses c while E's option names c in its allowed record.
      const c = await importPost(page, token, {
        mode: "preview",
        definitions: pRow([opt("a"), opt("b")]),
      });
      expect(c.status, JSON.stringify(c.payload)).toBe(200);
      const cRefusal = refusalsOf(c.payload).find((entry) => entry["reason"] === "optionInUse");
      expect(cRefusal, `AT-71 (c) not refused: ${JSON.stringify(c.payload)}`).toBeTruthy();
      expect(String(cRefusal!["detail"]), "AT-71 (c) holder").toContain(`·${keyE}·allowed`);

      // (d) P retires b (active false) while D's condition names b.
      const d = await importPost(page, token, {
        mode: "preview",
        definitions: pRow([opt("a"), opt("b", { active: false }), opt("c")]),
      });
      expect(d.status, JSON.stringify(d.payload)).toBe(200);
      expect(
        refusalsOf(d.payload).map((entry) => entry["reason"]),
        `AT-71 (d) not refused: ${JSON.stringify(d.payload)}`,
      ).toContain("optionInUse");

      const stored = await readAttribute(keyP);
      expect(
        (stored?.options as { value: string }[]).map((option) => option.value),
        "AT-71 a preview wrote the options",
      ).toEqual(["a", "b", "c"]);
    } finally {
      await destroyCategory(slug);
      for (const key of [keyD, keyE, keyP]) await destroyAttribute(key);
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
});
