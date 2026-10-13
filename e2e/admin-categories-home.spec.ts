import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { fillOf, isRedFill } from "./helpers/colors";
import { awaitGuardedOutcome, gotoReady, stepUpIfPrompted } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import {
  action,
  bandOnly,
  createViaUi,
  destroyCategory,
  findRow,
  openEditor,
  rand,
  readCategory,
  scratchSlug,
  seedActiveListing,
  signInAsSuperAdmin,
} from "./helpers/categories";
import { destroyAttribute } from "./helpers/admin-attributes";

/**
 * Bundle 7 Part E — THE CATEGORY DOORS (CT-38..CT-41).
 *
 * Every row here is a scratch row (J1/J3), seeded through the service client
 * BEFORE the console is opened (J7) and destroyed in `finally` by a reaper that
 * throws on failure. The screens are read in English from the compiled file,
 * never by a literal (J5); a refusal must read as words, never as its key.
 */

async function seedCategory(slug: string, parentId: string | null, active = true) {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({ slug, name_en: slug, is_active: active })
    .select("id")
    .single();
  if (error || !data) throw new Error(`[e2e:ct-home] seeding ${slug} failed: ${error?.message}`);
  const pointer = await supabase.from("category_tree_pointers").insert({
    parent_id: parentId,
    child_id: data.id,
    display_order: parentId === null ? 2_000_000 : 0,
  });
  if (pointer.error) throw new Error(`[e2e:ct-home] pointer of ${slug}: ${pointer.error.message}`);
  return data.id as string;
}

async function pointersOf(childId: string) {
  const { data, error } = await adminClient()
    .from("category_tree_pointers")
    .select("id, parent_id, display_order, is_primary")
    .eq("child_id", childId);
  if (error) throw new Error(`[e2e:ct-home] reading pointers: ${error.message}`);
  return data ?? [];
}

async function openDelete(page: Page, slug: string) {
  await gotoReady(page, "/admin/categories");
  await findRow(page, slug);
  await openEditor(page, slug);
  await action(page, slug, "delete").click();
  await page.getByTestId("category-delete-slug").fill(slug);
}

/** Reaps a scratch listing; throws on failure (J3). */
async function reapListing(id: string) {
  const gone = await adminClient().from("listings").delete().eq("id", id);
  if (gone.error) throw new Error(`[e2e:reap] listing ${id}: ${gone.error.message}`);
}

const fill = (text: string, count: number) => text.replace("{count}", String(count));

test.describe("Bundle 7 category doors", () => {
  test("CT-38 a retired category with a child is not deleted until the child moves away", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const parent = scratchSlug();
    const child = scratchSlug();
    try {
      const parentId = await seedCategory(parent, null, false);
      const childId = await seedCategory(child, parentId);

      await openDelete(page, parent);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("category-dialog-error")).toHaveText(
        fill(en["admin.categories.error.delete_has_children"], 1),
        { timeout: 20000 },
      );
      expect(await readCategory(parent)).toBeTruthy();

      // The child is moved away (to a root of its own); the same delete passes.
      const moved = await adminClient()
        .from("category_tree_pointers")
        .update({ parent_id: null, display_order: 2_000_001 })
        .eq("child_id", childId)
        .eq("parent_id", parentId);
      if (moved.error) throw new Error(`[e2e:ct-38] moving the child: ${moved.error.message}`);

      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect.poll(async () => await readCategory(parent), { timeout: 20000 }).toBeNull();
    } finally {
      await destroyCategory(child);
      await destroyCategory(parent);
    }
  });

  test("CT-39 the badge sits on the home path, and Make primary moves it", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const home = scratchSlug();
    const other = scratchSlug();
    const child = scratchSlug();
    try {
      const homeId = await seedCategory(home, null);
      const otherId = await seedCategory(other, null);
      // The first pointer becomes the home path; the second has the LOWER order.
      const childId = await seedCategory(child, homeId);
      const supabase = adminClient();
      const lower = await supabase
        .from("category_tree_pointers")
        .update({ display_order: 9 })
        .eq("child_id", childId);
      if (lower.error) throw new Error(`[e2e:ct-39] ${lower.error.message}`);
      const second = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: otherId, child_id: childId, display_order: 0 })
        .select("id")
        .single();
      if (second.error || !second.data) throw new Error(`[e2e:ct-39] ${second.error?.message}`);
      const before = await pointersOf(childId);
      const homePointer = before.find((row) => row.parent_id === homeId)!;
      const otherPointer = before.find((row) => row.parent_id === otherId)!;
      expect(homePointer.is_primary).toBe(true);
      expect(otherPointer.is_primary).toBe(false);

      await gotoReady(page, "/admin/categories");
      await findRow(page, child);
      await openEditor(page, child);
      await action(page, child, "pointer").click();
      await expect(page.getByTestId(`category-path-primary-${homePointer.id}`)).toBeVisible({
        timeout: 20000,
      });
      await expect(page.getByTestId(`category-path-primary-${otherPointer.id}`)).toHaveCount(0);
      await expect(page.getByTestId(`category-path-make-primary-${homePointer.id}`)).toHaveCount(0);
      // Bundle 11 B3 (G29) — Remove path removes at once: its button is red.
      await expect
        .poll(
          async () =>
            isRedFill(await fillOf(page.getByTestId(`category-path-remove-${otherPointer.id}`))),
          { message: "CT-39: Remove path is not red" },
        )
        .toBe(true);

      await page.getByTestId(`category-path-make-primary-${otherPointer.id}`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(
          async () =>
            (await pointersOf(childId)).find((row) => row.id === otherPointer.id)?.is_primary,
          { timeout: 20000 },
        )
        .toBe(true);
      await expect(page.getByTestId(`category-path-primary-${otherPointer.id}`)).toBeVisible({
        timeout: 20000,
      });
      await expect(page.getByTestId(`category-path-primary-${homePointer.id}`)).toHaveCount(0);
    } finally {
      await destroyCategory(child);
      await destroyCategory(other);
      await destroyCategory(home);
    }
  });

  test("CT-40 the delete door's refusals read as words, never as keys", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const active = scratchSlug();
    const held = scratchSlug();
    let listingId = "";
    try {
      // The console offers Delete on a retired row only, so the row is retired
      // when the dialog opens and made active again before the door is asked.
      const activeId = await seedCategory(active, null, false);
      const heldId = await seedCategory(held, null, false);
      const seller = await leaseUser();
      listingId = await seedActiveListing(heldId, seller.id);

      await openDelete(page, active);
      const revive = await adminClient()
        .from("categories")
        .update({ is_active: true })
        .eq("id", activeId);
      if (revive.error) throw new Error(`[e2e:ct-40] ${revive.error.message}`);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      const error = page.getByTestId("category-dialog-error");
      await expect(error).toHaveText(en["admin.categories.error.delete_active"], {
        timeout: 20000,
      });
      await expect(error).not.toContainText("admin.categories.error");

      // A fresh page: the first walk's dialogs never cover the second.
      await page.goto("about:blank");
      await openDelete(page, held);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("category-dialog-error")).toHaveText(
        fill(en["admin.categories.error.delete_has_listings"], 1),
        { timeout: 20000 },
      );
      expect(await readCategory(held)).toBeTruthy();
    } finally {
      if (listingId) await reapListing(listingId);
      await destroyCategory(held);
      await destroyCategory(active);
    }
  });

  test("CT-41 the admin's own client cannot write the eight door tables; the doors still can", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      // The door creates the scratch row …
      slug = await createViaUi(page, secret);
      const row = await readCategory(slug);
      const pointer = (await pointersOf(row!.id))[0]!;

      // … and the admin's OWN token, sent straight to the data API, is refused.
      const token = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i += 1) {
          const name = localStorage.key(i) ?? "";
          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
            return (JSON.parse(localStorage.getItem(name) ?? "{}") as { access_token?: string })
              .access_token;
          }
        }
        return undefined;
      });
      expect(token, "CT-41 the page holds the admin's session").toBeTruthy();
      const base = process.env["E2E_SUPABASE_URL"]!;
      const apikey = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!;
      const headers = {
        apikey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      };
      const target: Record<string, string> = {
        categories: row!.id,
        category_tree_pointers: pointer.id,
      };
      const tables = [
        "categories",
        "category_tree_pointers",
        "category_attributes",
        "locations",
        "resources",
        "permissions",
        "roles",
        "role_permissions",
      ];
      const allowed: string[] = [];
      for (const table of tables) {
        const id = target[table] ?? "00000000-0000-4000-8000-000000000041";
        const attempts: [string, string, string | undefined][] = [
          ["POST", `${base}/rest/v1/${table}`, JSON.stringify({})],
          ["PATCH", `${base}/rest/v1/${table}?id=eq.${id}`, JSON.stringify({ id })],
          ["DELETE", `${base}/rest/v1/${table}?id=eq.${id}`, undefined],
        ];
        for (const [method, url, body] of attempts) {
          const response = await fetch(url, { method, headers, body });
          const text = await response.text();
          // Refused means the privilege check answered (42501), not a row miss.
          if (!(response.status === 401 || response.status === 403) || !text.includes("42501")) {
            allowed.push(`${method} ${table} → ${response.status}`);
          }
        }
      }
      expect(allowed, "CT-41 every direct write is refused by privilege").toEqual([]);
      expect(await readCategory(slug)).toBeTruthy();

      // The doors still change and delete the same scratch row.
      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await action(page, slug, "edit").click();
      await page.getByTestId("category-edit-name").fill(`E2E renamed ${slug}`);
      await page.getByTestId("category-edit-submit").click();
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readCategory(slug))?.name_en === `E2E renamed ${slug}`,
          describe: `CT-41: categories.name_en = "E2E renamed ${slug}"`,
        },
        { timeout: 30000 },
      );
      // Retiring is the precondition of the delete door (CT-12 proves its verb).
      const retire = await adminClient()
        .from("categories")
        .update({ is_active: false })
        .eq("id", row!.id);
      if (retire.error) throw new Error(`[e2e:ct-41] ${retire.error.message}`);
      await openDelete(page, slug);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect.poll(async () => await readCategory(slug), { timeout: 20000 }).toBeNull();
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * T7 (DEC-144 rule 2) — A MOVE IS JUDGED PARENT FIRST. P2 asks A (place 1);
   * the leaf, under P1, asks C, which depends on A (place 0). Moved under P2 it
   * would inherit A and ask C before it: the move door refuses with the
   * parent-first refusal and the leaf stays under P1. Moved under P3, which asks
   * nothing, it passes. Scratch rows only, seeded through the service client
   * before the door is called (J3, J7); the door is called as the super admin.
   */
  test("CT-45 a move that would ask a question before its parent is refused; another move passes", async ({
    page,
  }) => {
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const [p1, p2, p3, leaf] = [scratchSlug(), scratchSlug(), scratchSlug(), scratchSlug()];
    const keyA = `e2e_attr_${rand()}_a`;
    const keyC = `e2e_attr_${rand()}_c`;
    try {
      const p1Id = await seedCategory(p1, null);
      const p2Id = await seedCategory(p2, null);
      const p3Id = await seedCategory(p3, null);
      const leafId = await seedCategory(leaf, p1Id);
      const a = await supabase
        .from("attributes")
        .insert({
          attr_key: keyA,
          name_en: keyA,
          attr_type: "single_select",
          options: [{ value: "a", label_en: "A" }],
        })
        .select("id")
        .single();
      if (a.error || !a.data) throw new Error(`[e2e:ct-45] seeding A: ${a.error?.message}`);
      const c = await supabase
        .from("attributes")
        .insert({
          attr_key: keyC,
          name_en: keyC,
          attr_type: "single_select",
          options: [{ value: "x", label_en: "X" }],
          depends_on: a.data.id,
        })
        .select("id")
        .single();
      if (c.error || !c.data) throw new Error(`[e2e:ct-45] seeding C: ${c.error?.message}`);
      const links = await supabase.from("category_attribute_links").insert([
        { category_id: p2Id, attribute_id: a.data.id, display_order: 1 },
        { category_id: leafId, attribute_id: c.data.id, display_order: 0 },
      ]);
      if (links.error) throw new Error(`[e2e:ct-45] seeding links: ${links.error.message}`);
      const pointers = await pointersOf(leafId);
      expect(
        pointers.map((pointer) => pointer.parent_id),
        "CT-45 the leaf starts under P1",
      ).toEqual([p1Id]);
      const pointerId = pointers[0]!.id;

      const token = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i += 1) {
          const name = localStorage.key(i) ?? "";
          if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
            return (JSON.parse(localStorage.getItem(name) ?? "{}") as { access_token?: string })
              .access_token;
          }
        }
        return undefined;
      });
      expect(token, "CT-45 the page holds the admin's session").toBeTruthy();
      /** The console's own door, called with the admin's session. */
      const move = async (parentId: string) => {
        const response = await fetch(
          `${process.env["E2E_SUPABASE_URL"]!}/rest/v1/rpc/admin_move_category_pointer`,
          {
            method: "POST",
            headers: {
              apikey: process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_pointer_id: pointerId, p_new_parent_id: parentId }),
          },
        );
        const text = await response.text();
        let message = "";
        try {
          message = String((JSON.parse(text) as { message?: unknown }).message ?? "");
        } catch {
          message = "";
        }
        return { ok: response.ok, status: response.status, text, message };
      };

      const refused = await move(p2Id);
      expect(refused.ok, `CT-45 the move under P2 was not refused: ${refused.text}`).toBe(false);
      expect(refused.message, "CT-45 the refusal is the parent-first key").toBe(
        `admin.attributes.error.parentAfterChild:${leaf}: ${keyA} → ${keyC}`,
      );
      expect(
        (await pointersOf(leafId)).map((pointer) => pointer.parent_id),
        "CT-45 the refused move left the leaf under P1",
      ).toEqual([p1Id]);

      const moved = await move(p3Id);
      expect(moved.ok, `CT-45 the move under P3 was refused: ${moved.text}`).toBe(true);
      expect(
        (await pointersOf(leafId)).map((pointer) => pointer.parent_id),
        "CT-45 the leaf is now under P3",
      ).toEqual([p3Id]);
    } finally {
      await destroyAttribute(keyC);
      await destroyAttribute(keyA);
      for (const slug of [leaf, p1, p2, p3]) await destroyCategory(slug);
    }
  });
});
