import { expect, test } from "./fixtures";
import { gotoReady, stepUpIfPrompted } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { stripScratchRows } from "./helpers/exports";
import {
  rand,
  bandOnly,
  createViaUi,
  destroyCategory,
  dialogDump,
  findRow,
  openEditor,
  action,
  readCategory,
  signInAsSuperAdmin,
} from "./helpers/categories";
import {
  librarySurface,
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
      const definitions = `${DEF_HEADER}\r\n${v2(`${key},${key},${cell(amharic)},text,,,,0`)}\r\n`;
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
      const blank = `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,1`)}\r\n`;
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
        `${v2(`${free},${free},${cell(amharic)},text,,,,0,delete`)}\r\n` +
        `${v2(`${used},${used},,text,,,,1,delete`)}\r\n`;

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
   * IE-5 — ONE FILE, ONE PASS. A definition delete is judged against the links
   * that SURVIVE the same import: unlinking its only link in the links file and
   * deleting the definition in the definitions file previews as
   * 1 unlinked · 1 deleted · 0 refused, commits, and Undo restores BOTH. Leave
   * the link in place and the same delete is refused, naming the category.
   */
  test("AT-37 a delete after the file's own unlink is accepted and undone", async ({ page }) => {
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

      const defHeader = `${DEF_HEADER},action`;
      const linkHeader = `${LINK_HEADER},action`;
      const definitions = `${defHeader}\r\n${v2(`${key},${key},,text,,,,1,delete`)}\r\n`;

      // (a) THE SURVIVING LINK REFUSES THE DELETE — no unlink in the file.
      const refusedPreview = await importPost(page, token, { mode: "preview", definitions });
      expect(refusedPreview.status, JSON.stringify(refusedPreview.payload)).toBe(200);
      const refusedCounts = refusedPreview.payload["counts"] as Record<string, number>;
      expect(refusedCounts.deletes, JSON.stringify(refusedCounts)).toBe(0);
      expect(refusedCounts.refusals, JSON.stringify(refusedCounts)).toBe(1);
      const refusals = refusedPreview.payload["refusals"] as Record<string, unknown>[];
      const blast = refusals.find((row) => row["reason"] === "blastRadius");
      expect(blast, `AT-37 no blast-radius refusal: ${JSON.stringify(refusals)}`).toBeTruthy();
      expect(blast?.["detail"], "AT-37 the refusal did not name the category").toContain(slug);

      // (b) THE SAME DELETE, with the file removing the link in the same pass.
      const links = `${linkHeader}\r\n${slug},${slug},${key},false,false,,${slug},unlink\r\n`;
      const preview = await importPost(page, token, { mode: "preview", definitions, links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(
        {
          unlinks: counts.unlinks,
          deletes: counts.deletes,
          refusals: counts.refusals,
        },
        `AT-37 the plan did not order the unlink before the delete: ${JSON.stringify(counts)}`,
      ).toEqual({ unlinks: 1, deletes: 1, refusals: 0 });

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      expect(await readAttribute(key), "AT-37 the definition survived the delete").toBeFalsy();
      expect(await readLinks(category!.id), "AT-37 the link survived the unlink").toHaveLength(0);

      // UNDO REVERSES THE ORDER: the definition comes back first, so the link
      // it carried has an attribute to point at.
      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(undo.payload["conflicted"], JSON.stringify(undo.payload)).toBe(0);

      expect(await readAttribute(key), "AT-37 undo did not restore the definition").toBeTruthy();
      expect(await readLinks(category!.id), "AT-37 undo did not restore the link").toHaveLength(1);
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /**
   * IE-6 (INC-180) — DIRECT ROWS OVER INHERITED ECHOES. A links file taken from
   * a child's export carries the parent's link as a READ-ONLY echo. Adding a
   * DIRECT row for the same key at that child is not a duplicate: the echo is
   * ignored and the direct row becomes the NEAREST link.
   */
  test("AT-38 an inherited echo does not collide with a direct row", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const stamp = rand();
    const parentSlug = `e2e-cat-ie6-${stamp}-p`;
    const childSlug = `e2e-cat-ie6-${stamp}-c`;
    let childId: string | null = null;
    try {
      const { data: attribute } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "text" })
        .select("id")
        .single();
      const { data: cats, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: parentSlug, name_en: parentSlug, is_active: true, allow_listings: true },
          { slug: childSlug, name_en: childSlug, is_active: true, allow_listings: true },
        ])
        .select("id, slug");
      if (catError || !cats) throw new Error(`AT-38 categories failed: ${catError?.message}`);
      const parent = cats.find((row) => row.slug === parentSlug)!;
      const child = cats.find((row) => row.slug === childSlug)!;
      childId = child.id;
      // The child's ONLY pointer is the parent, so the parent is primary (INH-1).
      const { error: pointerError } = await supabase.from("category_tree_pointers").insert([
        { parent_id: null, child_id: parent.id, display_order: 2_000_904 },
        { parent_id: parent.id, child_id: child.id, display_order: 1 },
      ]);
      if (pointerError) throw new Error(`AT-38 pointer failed: ${pointerError.message}`);
      const { error: linkError } = await supabase.from("category_attribute_links").insert({
        category_id: parent.id,
        attribute_id: attribute!.id,
        is_required: false,
        is_filterable: false,
      });
      if (linkError) throw new Error(`AT-38 link failed: ${linkError.message}`);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // Row 2 is the inherited ECHO the export writes; row 3 is the new DIRECT row.
      const links =
        `${LINK_HEADER}\r\n` +
        `${parentSlug} / ${childSlug},${childSlug},${key},false,false,,${parentSlug}\r\n` +
        `${parentSlug} / ${childSlug},${childSlug},${key},true,false,,\r\n`;

      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(
        { adds: counts.adds, refusals: counts.refusals },
        `AT-38 the echo collided with the direct row: ${JSON.stringify(preview.payload["refusals"])}`,
      ).toEqual({ adds: 1, refusals: 0 });

      const commit = await importPost(page, token, {
        mode: "commit",
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);

      // NEAREST WINS: the child now holds a DIRECT link of its own.
      const childLinks = await readLinks(child.id);
      expect(childLinks, "AT-38 the direct row was not written at the child").toHaveLength(1);
      expect(childLinks[0]?.is_required, "AT-38 the direct row's values were not applied").toBe(
        true,
      );

      // The console reads the same set: a direct row, never an inherited badge.
      await gotoReady(page, `/admin/attributes?category=${childSlug}`);
      await expect(page.getByTestId("attribute-category-clear")).toBeVisible({ timeout: 30000 });
      await expect(
        librarySurface(page).getByTestId(`attribute-inherited-${key}`),
        await dialogDump(page, "AT-38 the direct link still rendered as inherited"),
      ).toHaveCount(0);
    } finally {
      if (childId !== null) {
        await supabase.from("category_tree_pointers").delete().eq("child_id", childId);
      }
      await destroyAttribute(key);
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * IE-6 (INC-181) — AN EMPTY READ-ONLY CELL IS SILENCE. A file that leaves the
   * derived columns blank says "not provided"; only a filled-in read-only cell
   * that differs is reported. The Ignored panel stays empty.
   */
  test("AT-39 empty read-only cells are never reported as edits", async ({ page }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-ie6-${rand()}`;
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

      // Both files leave every derived column blank: the live rows exist, so
      // truth is present and a naive comparison WOULD have reported them.
      const definitions = `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,`)}\r\n`;
      const links = `${LINK_HEADER}\r\n,${slug},${key},false,false,,\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions, links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const ignored = (preview.payload["ignored"] ?? []) as unknown[];
      expect(
        ignored,
        `AT-39 an empty read-only cell was reported as an edit: ${JSON.stringify(ignored)}`,
      ).toHaveLength(0);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(counts.refusals, JSON.stringify(counts)).toBe(0);
    } finally {
      await destroyAttribute(key);
      await destroyCategory(slug);
    }
  });

  /**
   * FIX-SCAN-1 ISSUE 1 — THE TOGGLE IS ONE ATOMIC WRITE.
   *
   * Required/Filterable used to be unlink + relink: the relink inserted a FRESH
   * row, so the card membership (card_rank) was wiped, and a failure between
   * the two writes LOST the link. `admin_update_attribute_link` is one UPDATE:
   * the row id and card_rank survive the toggle, and a refused call leaves the
   * link exactly as it was (DB truth, J4).
   */
  test("AT-42 toggling Required keeps the card rank and never loses the link", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    let slug = "";
    try {
      await seedAttribute(key);
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);

      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "attributes").click();
      await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({ timeout: 20000 });

      await page.getByTestId("category-attribute-search").fill(key);
      await page
        .getByTestId("category-attribute-picker")
        .selectOption({ label: `${key} (${key})` });
      await page.getByTestId("category-attribute-add").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, { timeout: 20000 })
        .toBe(1);

      // Put the attribute on the card, then read the row that must survive.
      await page.getByTestId(`category-attribute-card-${key}`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readLinks(scratch!.id))[0]?.card_rank ?? null, { timeout: 20000 })
        .not.toBeNull();
      const before = (await readLinks(scratch!.id))[0]!;

      // THE TOGGLE.
      await page.getByTestId(`category-attribute-required-${key}`).click();
      await stepUpIfPrompted(page, secret);
      // UX-2 PART 5 — the atomic write announces itself beside the toggle.
      await expect(
        page.getByTestId(`category-attribute-required-saved-${key}`),
        "AT-42 the toggle never reported Saved",
      ).toBeVisible({ timeout: 20000 });
      await expect
        .poll(async () => (await readLinks(scratch!.id))[0]?.is_required ?? null, {
          timeout: 20000,
          message: await dialogDump(page, "AT-42 the toggle never landed"),
        })
        .toBe(!before.is_required);

      const after = (await readLinks(scratch!.id))[0]!;
      expect(after.id, "AT-42 the same link row was updated").toBe(before.id);
      expect(after.card_rank, "AT-42 the card rank survived the toggle").toBe(before.card_rank);
      expect(after.display_order).toBe(before.display_order);

      // A FORCED FAILURE leaves the link intact — one write, so nothing to lose.
      await page.route("**/rest/v1/rpc/admin_update_attribute_link", (route) => route.abort());
      await page.getByTestId(`category-attribute-required-${key}`).click();
      await page.waitForTimeout(1500); // eslint-disable-line no-restricted-syntax -- DEC-027: proving a NON-event (no write) needs a settle window
      await page.unroute("**/rest/v1/rpc/admin_update_attribute_link");
      const failed = await readLinks(scratch!.id);
      expect(failed.length, "AT-42 the link survived the failure").toBe(1);
      expect(failed[0]!.id).toBe(before.id);
      expect(failed[0]!.card_rank).toBe(before.card_rank);
      expect(failed[0]!.is_required).toBe(after.is_required);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /**
   * U6-C1-R3b-3a STEP 3 (AT-59) — THE LINK CELL SAYS WHERE IT STANDS.
   *
   * C4: a cell that writes owes the operator three answers — nothing to save, it
   * saved, it did not save. Save is disabled while the cell matches what is
   * stored, enabled the moment it differs, and after the door answers the cell
   * carries either its Saved caption or, on a refusal, its failure caption (F4 —
   * never a silent no-op). The numbering continues the file's own series; AT-23
   * is already taken by an earlier test.
   */
  test("AT-59 the link editor's Save reflects change, saved and error", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const values = [`${key}_one`, `${key}_two`];
    let slug = "";
    try {
      const seeded = await supabase.from("attributes").insert({
        attr_key: key,
        name_en: key,
        attr_type: "single_select",
        options: values.map((value) => ({ value, label_en: value, active: true })),
      });
      if (seeded.error) throw new Error(`AT-59 seeding the definition: ${seeded.error.message}`);

      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);

      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "attributes").click();
      await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({ timeout: 20_000 });

      await page.getByTestId("category-attribute-search").fill(key);
      await page
        .getByTestId("category-attribute-picker")
        .selectOption({ label: `${key} (${key})` });
      await page.getByTestId("category-attribute-add").click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readLinks(scratch!.id)).length, { timeout: 20_000 })
        .toBe(1);

      /** The one cell this test writes, read as DB truth (J4). */
      const allowedOf = async (): Promise<unknown> => {
        const { data } = await adminClient()
          .from("category_attribute_links")
          .select("allowed_options")
          .eq("category_id", scratch!.id)
          .limit(1);
        return (data ?? [])[0]?.allowed_options ?? null;
      };

      const save = page.getByTestId(`category-attribute-save-allowed-${key}`);
      // 1 — NOTHING TO SAVE: the cell matches what is stored.
      await expect(save, "AT-59 Save was offered with no change").toBeDisabled({
        timeout: 20_000,
      });

      // 2 — A CHANGE ENABLES IT, and the door's acceptance is announced.
      await page.getByTestId(`category-attribute-allowed-${key}-${values[0]}`).click();
      await expect(save, "AT-59 Save stayed disabled after a change").toBeEnabled({
        timeout: 20_000,
      });
      await save.click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId(`category-attribute-cell-saved-allowed-${key}`),
        "AT-59 the cell never reported Saved",
      ).toBeVisible({ timeout: 20_000 });
      await expect(save, "AT-59 Save stayed enabled after a clean save").toBeDisabled({
        timeout: 20_000,
      });
      await expect
        .poll(allowedOf, {
          timeout: 20_000,
          message: await dialogDump(page, "AT-59 the allowed options never landed"),
        })
        .toEqual([values[0]]);

      // 3 — A REFUSED WRITE SAYS SO, in the cell that asked for it.
      await page.route("**/rest/v1/rpc/admin_update_attribute_link", (route) => route.abort());
      await page.getByTestId(`category-attribute-allowed-${key}-${values[1]}`).click();
      await expect(save, "AT-59 Save stayed disabled before the failing write").toBeEnabled({
        timeout: 20_000,
      });
      await save.click();
      await expect(
        page.getByTestId(`category-attribute-cell-error-allowed-${key}`),
        "AT-59 a refused write reported no failure in the cell",
      ).toBeVisible({ timeout: 20_000 });
      await page.unroute("**/rest/v1/rpc/admin_update_attribute_link");
      // DB TRUTH (J4): the refusal wrote nothing.
      expect(await allowedOf(), "AT-59 a refused write changed the stored cell").toEqual([
        values[0],
      ]);
    } finally {
      if (slug) await destroyCategory(slug);
      await destroyAttribute(key);
    }
  });

  /**
   * U6-C1-R3b-3b STEP 2 (AT-60) — THE LINKS FILE CARRIES THE ORDER.
   *
   * M-ORDER landed `display_order` in the planner, the commit, the export and the
   * undo; the registry now offers it as an editable cell after `default_value`. The
   * proof is the ORDER THE SELLER WOULD SEE: three scratch links are reordered by
   * file and the posting read — the same read the wizard builds step 3 from —
   * lists them in the new order. A blank cell changes nothing, and a non-integer
   * is refused by name rather than rounded.
   */
  test("AT-60 a links file reorders three links and the posting read follows", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const keys = [`e2e_attr_${rand()}`, `e2e_attr_${rand()}`, `e2e_attr_${rand()}`];
    const slug = `e2e-cat-order-${rand()}`;
    try {
      const ids: string[] = [];
      for (const key of keys) {
        const { data, error } = await supabase
          .from("attributes")
          .insert({ attr_key: key, name_en: key, attr_type: "text" })
          .select("id")
          .single();
        if (error) throw new Error(`AT-60 seeding ${key}: ${error.message}`);
        ids.push(data!.id);
      }
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      for (const [index, attributeId] of ids.entries()) {
        const inserted = await supabase.from("category_attribute_links").insert({
          category_id: category!.id,
          attribute_id: attributeId,
          is_required: false,
          is_filterable: false,
          display_order: index,
        });
        if (inserted.error) throw new Error(`AT-60 seeding a link: ${inserted.error.message}`);
      }

      /** The ORDER the posting read reports, scratch keys only (J6). */
      const orderOf = async (): Promise<string[]> => {
        const { data } = await supabase.rpc("get_posting_schema", {
          p_category_id: category!.id,
        });
        const payload = (data ?? {}) as Record<string, unknown>;
        const rows = Array.isArray(payload["attributes"])
          ? (payload["attributes"] as Record<string, unknown>[])
          : [];
        return rows.map((row) => String(row["attr_key"] ?? "")).filter((key) => keys.includes(key));
      };
      expect(await orderOf(), "AT-60 the seeded order is not the read's order").toEqual(keys);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      /**
       * The trailing cells, in the FILE's own order (the gate's `optionalFrom`)
       * and the database's: `allowed_options`, `default_value`, `visible_when`,
       * then `display_order` (R-GATE — the condition cell is a file cell now).
       */
      const header = `${LINK_HEADER},allowed_options,default_value,visible_when,display_order`;
      const row = (key: string, order: string) =>
        `${slug},${slug},${key},false,false,,${slug},,,,${order}`;
      // THE NEW ORDER: third, first, second.
      const links =
        `${header}\r\n` +
        `${row(keys[0]!, "1")}\r\n` +
        `${row(keys[1]!, "2")}\r\n` +
        `${row(keys[2]!, "0")}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(
        (preview.payload["counts"] as Record<string, number>).changes,
        `AT-60 the order was not planned as a change: ${JSON.stringify(preview.payload)}`,
      ).toBe(3);
      expect((preview.payload["refusals"] ?? []) as unknown[]).toHaveLength(0);

      const commit = await importPost(page, token, {
        mode: "commit",
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);

      // DB TRUTH (J4), then the read the wizard uses.
      await expect
        .poll(orderOf, { timeout: 30_000, message: "AT-60 the posting read kept the old order" })
        .toEqual([keys[2], keys[0], keys[1]]);

      // A BLANK CELL CHANGES NOTHING.
      const blank = `${header}\r\n${slug},${slug},${keys[0]},false,false,,${slug},,,,\r\n`;
      const quiet = await importPost(page, token, { mode: "preview", links: blank });
      expect(quiet.status, JSON.stringify(quiet.payload)).toBe(200);
      expect(
        (quiet.payload["counts"] as Record<string, number>).changes,
        `AT-60 a blank order cell planned a change: ${JSON.stringify(quiet.payload)}`,
      ).toBe(0);

      /**
       * A NON-INTEGER IS REFUSED BY NAME, never rounded (F4). The GATE judges the
       * cell's shape before the RPC ever sees it, so the verdict is the gate's
       * `badNumber` naming `display_order`; the RPC's own `badDisplayOrder` is
       * what a shape-legal value the door still rejects would read.
       */
      const hostile = `${header}\r\n${slug},${slug},${keys[0]},false,false,,${slug},,,,1.5\r\n`;
      const refused = await importPost(page, token, { mode: "preview", links: hostile });
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      const refusals = (refused.payload["refusals"] ?? []) as Record<string, unknown>[];
      expect(
        refusals.map(
          (entry) => `${String(entry["reason"] ?? "")}:${String(entry["detail"] ?? "")}`,
        ),
        `AT-60 a non-integer order was not refused by name: ${JSON.stringify(refused.payload)}`,
      ).toContain("badNumber:display_order");
    } finally {
      for (const key of keys) {
        const { data: attribute } = await supabase
          .from("attributes")
          .select("id")
          .eq("attr_key", key)
          .maybeSingle();
        if (attribute) {
          await supabase.from("category_attribute_links").delete().eq("attribute_id", attribute.id);
        }
      }
      await destroyCategory(slug);
      for (const key of keys) await destroyAttribute(key);
    }
  });

  /**
   * R-GATE STEP 3 (AT-62) — A CONDITION AND AN ORDER SURVIVE A ROUND TRIP.
   *
   * INC-241's second half: the database held a link's condition and its order,
   * the file could not say either, so an operator who exported a category and
   * re-imported it silently proposed nothing about them — and, once the gate
   * knew the column, would have been told a real cell was unknown. The proof is
   * the operator's OWN walk: a scratch leaf whose second question only appears
   * for one answer to the first is exported through the real route and previewed
   * back through the real door. The export must STATE both cells, and the
   * preview must read UNCHANGED (IE-2b).
   */
  test("AT-62 an exported link's condition and order re-import as unchanged", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const parentKey = `e2e_attr_${rand()}`;
    const childKey = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-cond-${rand()}`;
    try {
      const { data: parent, error: parentError } = await supabase
        .from("attributes")
        .insert({
          attr_key: parentKey,
          name_en: parentKey,
          attr_type: "single_select",
          options: [
            { value: "saloon", label_en: "Saloon" },
            { value: "pickup", label_en: "Pickup" },
          ],
        })
        .select("id")
        .single();
      if (parentError) throw new Error(`AT-62 seeding the sibling: ${parentError.message}`);
      const { data: child, error: childError } = await supabase
        .from("attributes")
        .insert({ attr_key: childKey, name_en: childKey, attr_type: "text" })
        .select("id")
        .single();
      if (childError) throw new Error(`AT-62 seeding the conditioned row: ${childError.message}`);

      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
        .select("id")
        .single();
      if (categoryError) throw new Error(`AT-62 seeding the category: ${categoryError.message}`);
      const pointed = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: null, child_id: category!.id, display_order: 2_000_941 });
      if (pointed.error) throw new Error(`AT-62 seeding the pointer: ${pointed.error.message}`);

      const linked = await supabase.from("category_attribute_links").insert([
        {
          category_id: category!.id,
          attribute_id: parent!.id,
          is_required: false,
          is_filterable: false,
          display_order: 0,
        },
        {
          category_id: category!.id,
          attribute_id: child!.id,
          is_required: false,
          is_filterable: false,
          display_order: 7,
          visible_when: { key: parentKey, in: ["pickup"] },
        },
      ]);
      if (linked.error) throw new Error(`AT-62 seeding the links: ${linked.error.message}`);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const headers = { Authorization: `Bearer ${token}` };

      // THE REAL ROUTE, scoped to this scratch leaf alone (J6).
      const response = await page.request.get(
        `/api/admin/attributes/export?file=links&scope=${slug}`,
        { headers },
      );
      expect(response.status(), "AT-62 the scoped links export failed").toBe(200);
      const links = await response.text();

      // THE FILE STATES BOTH CELLS, in the database's own order.
      const header = links.slice(1).split("\r\n")[0] ?? "";
      expect(header, `AT-62 the export header omitted a cell: ${header}`).toContain(
        "default_value,visible_when,display_order",
      );
      const childRow = links.split("\r\n").find((line) => line.includes(childKey)) ?? "";
      expect(childRow, `AT-62 the export did not echo the condition: ${childRow}`).toContain(
        `${parentKey}=pickup`,
      );
      expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);

      // AND THE ROUND TRIP IS A NO-OP (IE-2b).
      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(
        (preview.payload["refusals"] ?? []) as unknown[],
        `AT-62 the round trip was refused: ${JSON.stringify(preview.payload)}`,
      ).toHaveLength(0);
      expect(
        [counts.adds, counts.changes],
        `AT-62 the round trip was not a no-op: ${JSON.stringify(preview.payload)}`,
      ).toEqual([0, 0]);
      expect(
        counts.unchanged,
        `AT-62 the round trip read nothing: ${JSON.stringify(preview.payload)}`,
      ).toBe(2);
    } finally {
      for (const key of [parentKey, childKey]) {
        const { data: attribute } = await supabase
          .from("attributes")
          .select("id")
          .eq("attr_key", key)
          .maybeSingle();
        if (attribute) {
          await supabase.from("category_attribute_links").delete().eq("attribute_id", attribute.id);
        }
      }
      await destroyCategory(slug);
      for (const key of [parentKey, childKey]) await destroyAttribute(key);
    }
  });

  /**
   * U6-C1-R3b-3b STEP 3 (AT-61) — A LINKS-ONLY IMPORT.
   *
   * Changing one category's copy of a shared definition — an order, a narrowing,
   * a default — needs no definitions file at all, and asking for one taught the
   * operator to re-upload the whole library to move a row. Preview now opens with
   * the links file alone, and the run is confirmed through the real doors.
   */
  test("AT-61 the import dialog previews and confirms a links-only file", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-linksonly-${rand()}`;
    try {
      const { data: attribute, error } = await supabase
        .from("attributes")
        .insert({ attr_key: key, name_en: key, attr_type: "text" })
        .select("id")
        .single();
      if (error) throw new Error(`AT-61 seeding the definition: ${error.message}`);
      const { data: category } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      const linked = await supabase.from("category_attribute_links").insert({
        category_id: category!.id,
        attribute_id: attribute!.id,
        is_required: false,
        is_filterable: false,
      });
      if (linked.error) throw new Error(`AT-61 seeding the link: ${linked.error.message}`);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-import").click();
      await expect(page.getByTestId("attribute-import-dialog")).toBeVisible({ timeout: 20_000 });
      await expect(page.getByTestId("attribute-import-preview")).toBeDisabled();

      // THE LINKS FILE ALONE opens Preview.
      await attachCsv(
        page,
        "attribute-import-links",
        "links.csv",
        `${LINK_HEADER}\r\n${slug},${slug},${key},true,false,,${slug}\r\n`,
      );
      await expect(page.getByTestId("attribute-import-links-chosen")).toHaveText("links.csv");
      await expect(
        page.getByTestId("attribute-import-preview"),
        "AT-61 Preview refused a links-only file",
      ).toBeEnabled();
      // The definitions slot stands empty — and says so, rather than naming a file.
      await expect(page.getByTestId("attribute-import-definitions-chosen")).not.toHaveText(
        "definitions.csv",
      );

      await page.getByTestId("attribute-import-preview").click();
      await expect(page.getByTestId("attribute-import-counts")).toBeVisible({ timeout: 120_000 });
      await expect(page.getByTestId("attribute-import-refusals")).toHaveCount(0);

      await page.getByTestId("attribute-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-import-applied")).toBeVisible({ timeout: 120_000 });

      // DB TRUTH (J4): the links-only run landed its one change.
      await expect
        .poll(
          async () => {
            const { data } = await adminClient()
              .from("category_attribute_links")
              .select("is_required")
              .eq("category_id", category!.id)
              .eq("attribute_id", attribute!.id)
              .maybeSingle();
            return data?.is_required ?? null;
          },
          { timeout: 30_000, message: "AT-61 the links-only commit wrote nothing" },
        )
        .toBe(true);

      await page.getByTestId("attribute-import-close").click();
      await expect(page.getByTestId("attribute-import-dialog")).toHaveCount(0);
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
   * AT-40 (IE-7) — THE THREE DIALOG STATES, DRIVEN TO APPLIED. A scratch pair
   * of files is chosen through the real pickers, previewed, confirmed through
   * step-up and then taken back: the applied banner is present, Confirm and
   * Discard are gone, Undo restores DB TRUTH (J4) and Close closes.
   */
  test("AT-40 the import dialog reaches Applied and undoes", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const key = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-ie7-${rand()}`;
    try {
      await supabase.from("categories").insert({ slug, name_en: slug });

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-import").click();
      await expect(page.getByTestId("attribute-import-dialog")).toBeVisible({ timeout: 20000 });

      /**
       * READY — Preview waits for a file; Confirm is not rendered at all.
       * C3-UX-8 — the links slot says in words that it is optional, so ONE file
       * opens Preview (the route has always accepted a definitions-only run).
       * U6-C1-R3b-3b STEP 3 — the DEFINITIONS slot is optional too now, because a
       * links-only change (an order, a narrowing) needs no definitions file; the
       * dialog still requires ONE of the two, asserted by the disabled Preview.
       */
      await expect(page.getByTestId("attribute-import-confirm")).toHaveCount(0);
      await expect(page.getByTestId("attribute-import-definitions-choose")).toBeVisible();
      await expect(page.getByTestId("attribute-import-links-optional")).toBeVisible();
      await expect(page.getByTestId("attribute-import-definitions-optional")).toBeVisible();
      await expect(page.getByTestId("attribute-import-preview")).toBeDisabled();
      await attachCsv(
        page,
        "attribute-import-definitions",
        "definitions.csv",
        `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,`)}\r\n`,
      );
      await expect(page.getByTestId("attribute-import-definitions-chosen")).toHaveText(
        "definitions.csv",
      );
      await expect(page.getByTestId("attribute-import-preview")).toBeEnabled();
      await attachCsv(
        page,
        "attribute-import-links",
        "links.csv",
        `${LINK_HEADER}\r\n,${slug},${key},false,false,,\r\n`,
      );
      await expect(page.getByTestId("attribute-import-preview")).toBeEnabled();

      // PREVIEWED — the verdict, with both doors.
      await page.getByTestId("attribute-import-preview").click();
      await expect(page.getByTestId("attribute-import-counts")).toBeVisible({ timeout: 120_000 });
      await expect(page.getByTestId("attribute-import-confirm")).toBeVisible();
      await expect(page.getByTestId("attribute-import-discard")).toBeVisible();

      // APPLIED — the banner, the counts, and exactly Undo + Close.
      await page.getByTestId("attribute-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      const banner = page.getByTestId("attribute-import-applied");
      await expect(banner).toBeVisible({ timeout: 120_000 });
      await expect(banner).toContainText("2");
      await expect(page.getByTestId("attribute-import-counts")).toBeVisible();
      await expect(page.getByTestId("attribute-import-confirm")).toHaveCount(0);
      await expect(page.getByTestId("attribute-import-discard")).toHaveCount(0);
      await expect(page.getByTestId("attribute-import-close")).toBeVisible();
      expect(await readAttribute(key), "AT-40 the commit wrote no definition").not.toBeNull();

      // UNDO — DB truth, not a banner.
      await page.getByTestId("attribute-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-import-undone")).toBeVisible({ timeout: 120_000 });
      await expect.poll(async () => await readAttribute(key), { timeout: 30000 }).toBeNull();

      await page.getByTestId("attribute-import-close").click();
      await expect(page.getByTestId("attribute-import-dialog")).toHaveCount(0);
    } finally {
      await destroyAttribute(key);
      await destroyCategory(slug);
    }
  });

  /* ---------------- INC-381: a condition with two pairs (step 26) --------------- */

  /** Two scratch selects and a conditioned text row, linked to one scratch leaf. */
  async function seedTwoPairLeaf(tag: string) {
    const supabase = adminClient();
    const k1 = `e2e_attr_${rand()}`;
    const k2 = `e2e_attr_${rand()}`;
    const child = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-andpair-${rand()}`;
    const select = (key: string, values: string[]) => ({
      attr_key: key,
      name_en: key,
      attr_type: "single_select",
      options: values.map((value) => ({ value, label_en: value })),
    });
    const { data: defs, error } = await supabase
      .from("attributes")
      .insert([
        select(k1, ["a", "b", "x"]),
        select(k2, ["c", "d", "y"]),
        { attr_key: child, name_en: child, attr_type: "text" },
      ])
      .select("id, attr_key");
    if (error || !defs) throw new Error(`${tag} seeding the definitions: ${error?.message}`);
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
      .select("id")
      .single();
    if (categoryError) throw new Error(`${tag} seeding the category: ${categoryError.message}`);
    const pointed = await supabase
      .from("category_tree_pointers")
      .insert({ parent_id: null, child_id: category!.id, display_order: 2_000_942 });
    if (pointed.error) throw new Error(`${tag} seeding the pointer: ${pointed.error.message}`);
    const order = [k1, k2, child];
    const linked = await supabase.from("category_attribute_links").insert(
      order.map((key, index) => ({
        category_id: category!.id,
        attribute_id: defs.find((row) => row.attr_key === key)!.id,
        is_required: false,
        is_filterable: false,
        display_order: index,
      })),
    );
    if (linked.error) throw new Error(`${tag} seeding the links: ${linked.error.message}`);
    const conditionOf = async (): Promise<unknown> => {
      const { data } = await supabase
        .from("category_attribute_links")
        .select("visible_when")
        .eq("category_id", category!.id)
        .eq("attribute_id", defs.find((row) => row.attr_key === child)!.id)
        .single();
      return data?.visible_when ?? null;
    };
    const destroy = async () => {
      await supabase.from("category_attribute_links").delete().eq("category_id", category!.id);
      await destroyCategory(slug);
      for (const key of order) await destroyAttribute(key);
    };
    return { k1, k2, child, slug, categoryId: category!.id as string, conditionOf, destroy };
  }

  /**
   * AT-65 (INC-381) — THE LINKS FILE CARRIES TWO PAIRS. M6 taught the planner
   * `k1=a|b&k2=c|d`; this is the proof of the file text: preview, commit and
   * undo through the real route, then an export that re-imports as zero changes.
   */
  test("AT-65 a two-pair condition imports, exports and re-imports unchanged", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const leaf = await seedTwoPairLeaf("AT-65");
    try {
      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const header = `${LINK_HEADER},allowed_options,default_value,visible_when,display_order`;
      const condition = `${leaf.k1}=a|b&${leaf.k2}=c|d`;
      const links =
        `${header}\r\n` +
        `${leaf.slug},${leaf.slug},${leaf.child},false,false,,${leaf.slug},,,${condition},2\r\n`;

      const preview = await importPost(page, token, { mode: "preview", links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect((preview.payload["refusals"] ?? []) as unknown[]).toHaveLength(0);
      expect(
        (preview.payload["counts"] as Record<string, number>).changes,
        `AT-65 the condition was not planned as a change: ${JSON.stringify(preview.payload)}`,
      ).toBe(1);
      expect(await leaf.conditionOf(), "AT-65 a preview wrote").toBeNull();

      const commit = await importPost(page, token, {
        mode: "commit",
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();
      const stored = {
        key: leaf.k1,
        in: ["a", "b"],
        and: { key: leaf.k2, in: ["c", "d"] },
      };
      expect(await leaf.conditionOf(), "AT-65 the commit stored another shape").toEqual(stored);

      const exported = await page.request.get(
        `/api/admin/attributes/export?file=links&scope=${leaf.slug}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      expect(exported.status(), "AT-65 the scoped links export failed").toBe(200);
      const file = await exported.text();
      const childRow = file.split("\r\n").find((line) => line.includes(leaf.child)) ?? "";
      expect(childRow, `AT-65 the export wrote another text: ${childRow}`).toContain(condition);

      const again = await importPost(page, token, { mode: "preview", links: file });
      expect(again.status, JSON.stringify(again.payload)).toBe(200);
      expect((again.payload["refusals"] ?? []) as unknown[]).toHaveLength(0);
      const counts = again.payload["counts"] as Record<string, number>;
      expect(
        [counts.adds, counts.changes],
        `AT-65 the round trip was not a no-op: ${JSON.stringify(again.payload)}`,
      ).toEqual([0, 0]);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await leaf.conditionOf(), "AT-65 undo kept the condition").toBeNull();
    } finally {
      await leaf.destroy();
    }
  });

  /**
   * AT-66 (INC-381) — THE LINK EDITOR WRITES THE "AND" LINE and reads it back as
   * saved when the dialog is opened again.
   */
  test("AT-66 the link editor saves and reopens a two-pair condition", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const leaf = await seedTwoPairLeaf("AT-66");
    try {
      const open = async () => {
        await gotoReady(page, "/admin/categories");
        await findRow(page, leaf.slug);
        await openEditor(page, leaf.slug);
        await action(page, leaf.slug, "attributes").click();
        await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({
          timeout: 20_000,
        });
      };
      await open();
      const id = leaf.child;
      await page.getByTestId(`category-attribute-condition-key-${id}`).selectOption(leaf.k1);
      await page.getByTestId(`category-attribute-condition-${id}-a`).click();
      await page.getByTestId(`category-attribute-condition-and-key-${id}`).selectOption(leaf.k2);
      await page.getByTestId(`category-attribute-condition-and-${id}-d`).click();
      await page.getByTestId(`category-attribute-save-condition-${id}`).click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId(`category-attribute-cell-saved-condition-${id}`)).toBeVisible({
        timeout: 20_000,
      });
      await expect
        .poll(leaf.conditionOf, { timeout: 20_000 })
        .toEqual({ key: leaf.k1, in: ["a"], and: { key: leaf.k2, in: ["d"] } });

      await page.reload();
      await open();
      await expect(page.getByTestId(`category-attribute-condition-key-${id}`)).toHaveValue(leaf.k1);
      await expect(page.getByTestId(`category-attribute-condition-${id}-a`)).toBeChecked();
      await expect(page.getByTestId(`category-attribute-condition-and-key-${id}`)).toHaveValue(
        leaf.k2,
      );
      await expect(page.getByTestId(`category-attribute-condition-and-${id}-d`)).toBeChecked();
      await expect(page.getByTestId(`category-attribute-condition-and-${id}-c`)).not.toBeChecked();
      await expect(page.getByTestId(`category-attribute-save-condition-${id}`)).toBeDisabled();
    } finally {
      await leaf.destroy();
    }
  });
});
