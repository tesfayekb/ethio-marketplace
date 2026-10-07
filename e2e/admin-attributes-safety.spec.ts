import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, stepUpIfPrompted } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import {
  action,
  bandOnly,
  destroyCategory,
  findRow,
  openEditor,
  rand,
  readCategory,
  scratchSlug,
  seedActiveListing,
  signInAsSuperAdmin,
} from "./helpers/categories";
import {
  destroyAttribute,
  openAttributeMenu,
  readAttribute,
  readLinks,
} from "./helpers/admin-attributes";

/**
 * Bundle 7 Part E — THE ATTRIBUTE SAFETY SCREENS (AT-73..AT-77).
 *
 * Scratch rows only (J1/J3): a scratch leaf, scratch definitions, scratch
 * listings owned by a leased pool account — seeded through the service client
 * before the console opens (J7) and reaped in `finally` by destroys that throw.
 * Expected sentences are read from the compiled English file (J5).
 */

const fill = (text: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce(
    (out, [name, value]) => out.split(`{${name}}`).join(String(value)),
    text,
  );

type Fixture = {
  slug: string;
  categoryId: string;
  listings: string[];
  keys: string[];
};

async function seedLeaf(): Promise<{ slug: string; id: string }> {
  const slug = scratchSlug();
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
    .select("id")
    .single();
  if (error || !data) throw new Error(`[e2e:at-safety] seeding ${slug}: ${error?.message}`);
  const pointer = await supabase
    .from("category_tree_pointers")
    .insert({ parent_id: null, child_id: data.id, display_order: 2_000_000 });
  if (pointer.error) throw new Error(`[e2e:at-safety] pointer: ${pointer.error.message}`);
  return { slug, id: data.id as string };
}

async function seedSelect(key: string, dependsOn: string | null = null, parent?: string) {
  const options = parent
    ? [
        { value: "x1", label_en: "X1", parent },
        { value: "x2", label_en: "X2", parent },
      ]
    : [
        { value: "a1", label_en: "A1" },
        { value: "a2", label_en: "A2" },
      ];
  const { data, error } = await adminClient()
    .from("attributes")
    .insert({
      attr_key: key,
      name_en: key,
      attr_type: "single_select",
      depends_on: dependsOn,
      options,
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`[e2e:at-safety] seeding ${key}: ${error?.message}`);
  return data.id as string;
}

async function seedLink(categoryId: string, attributeId: string, order: number) {
  const { data, error } = await adminClient()
    .from("category_attribute_links")
    .insert({ category_id: categoryId, attribute_id: attributeId, display_order: order })
    .select("id")
    .single();
  if (error || !data) throw new Error(`[e2e:at-safety] link: ${error?.message}`);
  return data.id as string;
}

async function holdAnswer(fx: Fixture, answers: Record<string, string>) {
  const seller = await leaseUser();
  const id = await seedActiveListing(fx.categoryId, seller.id);
  fx.listings.push(id);
  const update = await adminClient().from("listings").update({ attributes: answers }).eq("id", id);
  if (update.error) throw new Error(`[e2e:at-safety] answers: ${update.error.message}`);
}

async function reap(fx: Fixture) {
  for (const id of fx.listings) {
    const gone = await adminClient().from("listings").delete().eq("id", id);
    if (gone.error) throw new Error(`[e2e:reap] listing ${id}: ${gone.error.message}`);
  }
  // Children before parents: a definition another depends on is reaped last.
  for (const key of [...fx.keys].reverse()) await destroyAttribute(key);
  if (fx.slug) await destroyCategory(fx.slug);
}

function attrKey(tag: string) {
  return `e2e_${tag}_${rand()}`;
}

async function openLibrary(page: Page) {
  await gotoReady(page, "/admin/attributes");
  await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
}

const LINK_HEADER =
  "category_path,category_slug,attribute_key,is_required,is_filterable,card_rank,origin," +
  "allowed_options,default_value,visible_when,display_order,action";

async function attachLinks(page: Page, text: string, definitions?: string) {
  await page.getByTestId("attribute-import").click();
  await expect(page.getByTestId("attribute-import-dialog")).toBeVisible({ timeout: 20000 });
  if (definitions !== undefined) {
    await page.getByTestId("attribute-import-definitions").setInputFiles({
      name: "definitions.csv",
      mimeType: "text/csv",
      buffer: Buffer.from(definitions, "utf8"),
    });
  }
  await page.getByTestId("attribute-import-links").setInputFiles({
    name: "links.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(text, "utf8"),
  });
  await page.getByTestId("attribute-import-preview").click();
  await expect(page.getByTestId("attribute-import-counts")).toBeVisible({ timeout: 20000 });
}

test.describe("Bundle 7 attribute safety", () => {
  test("AT-73 Remove from a category names the listings that hold an answer, and removes", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const held = attrKey("held");
      const free = attrKey("free");
      fx.keys.push(held, free);
      await seedLink(leaf.id, await seedSelect(held), 0);
      await seedLink(leaf.id, await seedSelect(free), 1);
      await holdAnswer(fx, { [held]: "a1" });

      await openLibrary(page);
      await page.getByTestId("attribute-search").fill(held);
      await (await openAttributeMenu(page, held)).getByTestId(`attribute-remove-${held}`).click();
      await expect(page.getByTestId("attribute-remove-holders")).toHaveText(
        fill(en["admin.attributes.remove.holders"], { count: 1 }),
        { timeout: 20000 },
      );
      await page.getByTestId("attribute-remove-submit").click();
      await stepUpIfPrompted(page, secret);
      const heldId = (await readAttribute(held))!.id;
      await expect
        .poll(async () => (await readLinks(leaf.id)).some((row) => row.attribute_id === heldId), {
          timeout: 20000,
        })
        .toBe(false);

      await openLibrary(page);
      await page.getByTestId("attribute-search").fill(free);
      await (await openAttributeMenu(page, free)).getByTestId(`attribute-remove-${free}`).click();
      await expect(page.getByTestId("attribute-remove-confirm")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("attribute-remove-submit")).toBeEnabled({ timeout: 20000 });
      await expect(page.getByTestId("attribute-remove-holders")).toHaveCount(0);
      await page.getByTestId("attribute-remove-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect.poll(async () => (await readLinks(leaf.id)).length, { timeout: 20000 }).toBe(0);
    } finally {
      await reap(fx);
    }
  });

  test("AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing", async ({
    page,
  }) => {
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const held = attrKey("held");
      fx.keys.push(held);
      await seedLink(leaf.id, await seedSelect(held), 0);

      // This one case only: the holders read is answered by an error.
      await page.route("**/rest/v1/rpc/admin_attribute_holders*", (route) =>
        route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ message: "e2e forced failure", code: "XX000" }),
        }),
      );
      await openLibrary(page);
      await page.getByTestId("attribute-search").fill(held);
      await (await openAttributeMenu(page, held)).getByTestId(`attribute-remove-${held}`).click();
      await expect(page.getByTestId("attribute-remove-confirm")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
        en["admin.attributes.links.error"],
        { timeout: 20000 },
      );
      await expect(page.getByTestId("attribute-remove-submit")).toBeDisabled();
      await expect(page.getByTestId("attribute-remove-holders")).toHaveCount(0);
      expect((await readLinks(leaf.id)).length, "AT-73b a link was removed").toBe(1);
    } finally {
      await page.unroute("**/rest/v1/rpc/admin_attribute_holders*");
      await reap(fx);
    }
  });

  test("AT-74 a merge is refused while a listing holds a source's answer, and merges when none does", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const keep = attrKey("keep");
      const dupe = attrKey("dupe");
      fx.keys.push(keep, dupe);
      await seedSelect(keep);
      await seedLink(leaf.id, await seedSelect(dupe), 0);
      await holdAnswer(fx, { [dupe]: "a1" });

      const merge = async () => {
        await openLibrary(page);
        await page.getByTestId("attribute-merge-open").click();
        await expect(page.getByTestId("attribute-merge-dialog")).toBeVisible({ timeout: 20000 });
        await page
          .getByTestId("attribute-merge-target")
          .selectOption({ label: `${keep} (${keep})` });
        await page.getByTestId(`attribute-merge-source-${dupe}`).click();
        await page.getByTestId("attribute-merge-submit").click();
        await stepUpIfPrompted(page, secret);
      };

      await merge();
      await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
        fill(en["admin.attributes.error.mergeHasHolders"], { count: 1 }),
        { timeout: 20000 },
      );
      expect(await readAttribute(dupe)).toBeTruthy();

      // The holder goes; the same merge passes.
      const gone = await adminClient().from("listings").delete().eq("id", fx.listings[0]!);
      if (gone.error) throw new Error(`[e2e:at-74] ${gone.error.message}`);
      fx.listings = [];
      await merge();
      await expect.poll(async () => await readAttribute(dupe), { timeout: 20000 }).toBeNull();
    } finally {
      await reap(fx);
    }
  });

  test("AT-75 the import preview names the holders of an unlinked question and a removed answer", async ({
    page,
  }) => {
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const gone = attrKey("unlinked");
      const kept = attrKey("kept");
      fx.keys.push(gone, kept);
      await seedLink(leaf.id, await seedSelect(gone), 0);
      await seedLink(leaf.id, await seedSelect(kept), 1);
      await holdAnswer(fx, { [gone]: "a1", [kept]: "a2" });

      await openLibrary(page);
      // Unlink `gone`; keep `kept` linked; drop `kept`'s answer a2 from its options.
      const line = (key: string, order: number, verb: string) =>
        `${leaf.slug},${leaf.slug},${key},false,false,,${leaf.slug},,,,${order},${verb}`;
      const links = `${LINK_HEADER}\r\n${line(gone, 0, "unlink")}\r\n${line(kept, 1, "")}\r\n`;
      // Turn 7b item 3c — the removed answer is read ON THE SCREEN, in the same preview.
      const definitions =
        "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant,direct_link_count\r\n" +
        `${kept},${kept},,single_select,"[{""value"":""a1"",""label_en"":""A1""}]",,,,,,,,,,,,\r\n`;
      await attachLinks(page, links, definitions);
      const holders = page.getByTestId("import-holders");
      const count = fill(en["admin.attributes.import.holders"], { count: 1 });
      const unlinkedRow = holders.locator("li").filter({ hasText: gone });
      await expect(unlinkedRow, "AT-75 the unlinked question's row").toHaveCount(1, {
        timeout: 20000,
      });
      await expect(unlinkedRow).toContainText(count);
      const removedRow = holders.locator("li").filter({ hasText: `${kept} · a2` });
      await expect(removedRow, "AT-75 the removed answer's row").toHaveCount(1);
      await expect(removedRow).toContainText(count);
      await page.getByTestId("attribute-import-discard").click();
    } finally {
      await reap(fx);
    }
  });

  test("AT-76 the order control refuses a child above its parent and accepts the right order", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const parent = attrKey("par");
      const child = attrKey("chi");
      fx.keys.push(parent, child);
      const parentId = await seedSelect(parent);
      const childId = await seedSelect(child, parentId, "a1");
      // Written with no caller (exempt): the child sits first.
      await seedLink(leaf.id, childId, 0);
      await seedLink(leaf.id, parentId, 1);

      await gotoReady(page, "/admin/categories");
      await findRow(page, leaf.slug);
      await openEditor(page, leaf.slug);
      await action(page, leaf.slug, "attributes").click();
      await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({ timeout: 20000 });

      // The right order is accepted: the parent moves up.
      await page.getByTestId(`category-attribute-up-${parent}`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(async () => (await readLinks(leaf.id)).map((row) => row.attribute_id), {
          timeout: 20000,
        })
        .toEqual([parentId, childId]);

      // The wrong order is refused in words, and nothing moves.
      await page.getByTestId(`category-attribute-up-${child}`).click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
        fill(en["admin.attributes.error.parentAfterChild"], {
          detail: `${leaf.slug}: ${parent} → ${child}`,
        }),
        { timeout: 20000 },
      );
      expect((await readLinks(leaf.id)).map((row) => row.attribute_id)).toEqual([
        parentId,
        childId,
      ]);
    } finally {
      await reap(fx);
    }
  });

  test("AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    const conditionOf = async (linkId: string) => {
      const { data, error } = await adminClient()
        .from("category_attribute_links")
        .select("visible_when")
        .eq("id", linkId)
        .single();
      if (error) throw new Error(`[e2e:at-76] ${error.message}`);
      return (data?.visible_when ?? null) as unknown;
    };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const upper = attrKey("up");
      const lower = attrKey("low");
      fx.keys.push(upper, lower);
      const upperLink = await seedLink(leaf.id, await seedSelect(upper), 0);
      const lowerLink = await seedLink(leaf.id, await seedSelect(lower), 1);

      await gotoReady(page, "/admin/categories");
      await findRow(page, leaf.slug);
      await openEditor(page, leaf.slug);
      await action(page, leaf.slug, "attributes").click();
      await expect(page.getByTestId("category-attributes-dialog")).toBeVisible({ timeout: 20000 });

      // Refused: the upper question shown when the lower one is answered.
      await page.getByTestId(`category-attribute-condition-key-${upper}`).selectOption(lower);
      await page.getByTestId(`category-attribute-condition-${upper}-a1`).click();
      await page.getByTestId(`category-attribute-save-condition-${upper}`).click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
        fill(en["admin.attributes.error.parentAfterChild"], {
          detail: `${leaf.slug}: ${lower} → ${upper}`,
        }),
        { timeout: 20000 },
      );
      expect(await conditionOf(upperLink), "AT-76 the refused condition was stored").toBeNull();

      // Accepted: the lower question shown when the upper one is answered.
      await page.getByTestId(`category-attribute-condition-key-${lower}`).selectOption(upper);
      await page.getByTestId(`category-attribute-condition-${lower}-a1`).click();
      await page.getByTestId(`category-attribute-save-condition-${lower}`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(() => conditionOf(lowerLink), { timeout: 20000 })
        .toEqual({ key: upper, in: ["a1"] });
      expect(await conditionOf(upperLink)).toBeNull();
    } finally {
      await reap(fx);
    }
  });

  test("AT-77 an import whose end state asks a child first is refused whole at the commit", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const fx: Fixture = { slug: "", categoryId: "", listings: [], keys: [] };
    try {
      const leaf = await seedLeaf();
      fx.slug = leaf.slug;
      fx.categoryId = leaf.id;
      const parent = attrKey("par");
      const child = attrKey("chi");
      fx.keys.push(parent, child);
      const parentId = await seedSelect(parent);
      await seedSelect(child, parentId, "a1");
      expect(await readCategory(leaf.slug)).toBeTruthy();

      const row = (key: string, order: number) =>
        `${leaf.slug},${leaf.slug},${key},false,false,,${leaf.slug},,,,${order},`;
      await openLibrary(page);
      await attachLinks(page, `${LINK_HEADER}\r\n${row(child, 0)}\r\n${row(parent, 1)}\r\n`);
      await page.getByTestId("attribute-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-import-error-reason")).toContainText(
        fill(en["admin.attributes.error.parentAfterChild"], {
          detail: `${leaf.slug}: ${parent} → ${child}`,
        }),
        { timeout: 20000 },
      );
      expect(await readLinks(leaf.id), "AT-77 nothing of the file is written").toEqual([]);
      await page.getByTestId("attribute-import-discard").click();

      await openLibrary(page);
      await attachLinks(page, `${LINK_HEADER}\r\n${row(parent, 0)}\r\n${row(child, 1)}\r\n`);
      await page.getByTestId("attribute-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-import-applied")).toBeVisible({ timeout: 20000 });
      expect((await readLinks(leaf.id)).length).toBe(2);
    } finally {
      await reap(fx);
    }
  });
});
