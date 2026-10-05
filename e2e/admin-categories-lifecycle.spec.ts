import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, stepUpIfPrompted, switchUser, waitForHydration } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { stripScratchRows } from "./helpers/exports";
import {
  scratchSlug,
  bandOnly,
  surface,
  anchorRealRow,
  categoryRow,
  clearRosterSearch,
  findRow,
  dialogDump,
  actionsOf,
  action,
  openEditor,
  signInAsSuperAdmin,
  readCategory,
  readPointers,
  destroyCategory,
  createViaUi,
  lifecycleDump,
  nameFoldPresent,
  scratchFoldWord,
  rand,
} from "./helpers/categories";
/**
 * C2 — LIFECYCLE, STEP-UP AND DELETE (CT-12..CT-17).
 *
 * L1 (DEC-037): split out of admin-categories.spec.ts with titles, tags and
 * fixture identities unchanged (INC-159 shard balance).
 *
 * CLASS RULE (INC-437, INC-383 class): a file row for a row that already
 * exists carries that row's stored cells read at build time, never a constant;
 * a test asserts its own rows, not a shared roster's totals.
 */ test.describe("C2 categories console", () => {
  /**
   * CT-12 (C2d, re-armed by UI-FIX-7) — the reactivate walk. A retired scratch
   * node comes back to life through step-up and is active again in DB truth
   * and in the roster.
   *
   * J7 — EVERY wait here is a BOUNDED poll (≤15s) whose failure carries the
   * standing dump computed AT FAILURE TIME (mounted dialog/step-up testids,
   * is_active from the service client, the page's [client-error] lines), so a
   * red CT-12 says why instead of expiring on a default timeout.
   */
  test("CT-12 lifecycle: a retired category is reactivated through step-up", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    const clientErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") clientErrors.push(`[client-error] ${message.text()}`);
    });
    try {
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient().from("categories").update({ is_active: false }).eq("id", scratch!.id);
      await page.reload();
      await waitForHydration(page);
      await findRow(page, slug);

      const step = async (label: string, read: () => Promise<unknown>, expected: unknown) => {
        try {
          await expect.poll(read, { timeout: 15000, message: label }).toEqual(expected);
        } catch {
          throw new Error(`${label} — ${await lifecycleDump(page, slug, clientErrors)}`);
        }
      };

      await step(
        "CT-12 the retired row is on the roster",
        () => categoryRow(page, slug).count(),
        1,
      );
      await step(
        "CT-12 the row's Edit verb is clickable",
        () => action(page, slug, "edit").isVisible(),
        true,
      );
      await action(page, slug, "edit").click({ timeout: 15000 });
      await step(
        "CT-12 the editor's verb bar is open",
        () => page.getByTestId("category-verb-bar").isVisible(),
        true,
      );
      await step(
        "CT-12 a retired row offers Reactivate",
        () => action(page, slug, "reactivate").isVisible(),
        true,
      );

      await action(page, slug, "reactivate").click({ timeout: 15000 });
      await stepUpIfPrompted(page, secret);

      // DB truth, not the rendered badge (J4).
      await step(
        "CT-12 the row is active again in DB truth",
        async () => (await readCategory(slug))?.is_active,
        true,
      );

      /**
       * C2-CLOSE Part A — THE CLOSING TRUTH, SEARCH-ANCHORED. The editor is
       * dismissed so the roster search (the only proven anchor, CT-2/INC-147)
       * can narrow to the scratch row; the row IS on the roster, carries the
       * Active badge — resolved through its accessible description, never raw
       * English (J5) — and its editor offers Retire with Reactivate gone.
       */
      await page.keyboard.press("Escape");
      await step(
        "CT-12 the editor is dismissed before the roster search",
        () => page.getByTestId("category-edit-dialog").count(),
        0,
      );
      await findRow(page, slug);
      const activeBadge = categoryRow(page, slug).locator(
        `[aria-label="${en["admin.categories.badge.active"]}: ${en["admin.categories.tip.active"]}"]`,
      );
      await step("CT-12 the roster shows the row as Active", () => activeBadge.count(), 1);
      await openEditor(page, slug);
      await step(
        "CT-12 an active row offers Retire",
        () => action(page, slug, "retire").isVisible(),
        true,
      );
      await step(
        "CT-12 an active row no longer offers Reactivate",
        () => action(page, slug, "reactivate").count(),
        0,
      );
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-13 (C2d) — the delete walk. A wrong slug is refused with nothing
   * deleted (F5); the correct slug deletes the row AND its pointer, exclusion
   * and translation dependents, all asserted as service-client DB truth (J4).
   */
  test("CT-13 lifecycle: a typed-slug delete removes the row and its dependents", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      const id = scratch!.id;
      const supabase = adminClient();

      // Seed the dependents the cascade must take with it.
      const { data: country } = await supabase.from("countries").select("code").limit(1).single();
      await supabase.from("category_country_exclusions").insert({
        category_id: id,
        country_code: country!.code,
        created_by: "00000000-0000-0000-0000-000000000000",
      });
      await supabase.from("entity_translations").insert({
        entity_type: "category",
        entity_id: id,
        field: "name",
        lang_code: "am",
        value: `e2e ${slug}`,
        status: "machine",
        machine: true,
      });
      await supabase.from("categories").update({ is_active: false }).eq("id", id);

      await page.reload();
      await waitForHydration(page);
      await findRow(page, slug);

      // Wrong slug: refused, nothing deleted.
      await openEditor(page, slug);
      await action(page, slug, "delete").click();
      await page.getByTestId("category-delete-slug").fill(`${slug}-wrong`);
      await page.getByTestId("category-delete-submit").click();
      await expect(page.getByTestId("category-dialog-error")).toBeVisible();
      expect(await readCategory(slug)).toBeTruthy();

      // Correct slug: the row and every dependent go.
      await page.getByTestId("category-delete-slug").fill(slug);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect.poll(async () => await readCategory(slug), { timeout: 20000 }).toBeNull();
      await expect(categoryRow(page, slug)).toHaveCount(0);
      expect((await readPointers(id)).length).toBe(0);
      const { data: excl } = await supabase
        .from("category_country_exclusions")
        .select("country_code")
        .eq("category_id", id);
      expect(excl ?? []).toEqual([]);
      const { data: translations } = await supabase
        .from("entity_translations")
        .select("field")
        .eq("entity_type", "category")
        .eq("entity_id", id);
      expect(translations ?? []).toEqual([]);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-14 (C2g) — THE CATCH-ALL PARENT LAW. A catch-all is a terminal posting
   * bucket: it is never offered as a parent, the SERVER refuses it whatever
   * the client sends, and it carries no Move verbs because its order is not
   * the operator's to choose.
   */
  test("CT-14 catch-all law: never a parent, refused server-side, no move verbs", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const supabase = adminClient();
    const { data: catchall, error } = await supabase
      .from("categories")
      .select("id, slug, name_en")
      .eq("is_catchall", true)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`[e2e:c2] reading a catch-all failed: ${error.message}`);
    expect(catchall, "the ratified tree ships catch-alls").toBeTruthy();

    // (a) the server refuses the law's target directly — the console cannot
    //     talk it out of the refusal (F3).
    const refusal = await supabase.rpc("assert_parent_not_catchall", {
      p_parent_id: catchall!.id,
    });
    expect(refusal.error?.message ?? "").toContain("admin.categories.error.catchallParent");

    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/categories");
    // G28 — the roster rendered a real root, found by search; then unscoped.
    await anchorRealRow(page, "vehicles");
    await clearRosterSearch(page);

    // (b) the create dialog's parent picker never offers it.
    await page.getByTestId("category-create-open").click();
    const options = page.getByTestId("category-create-parent").locator("option");
    await expect(options.filter({ hasText: catchall!.name_en })).toHaveCount(0);
    await page.getByTestId("category-dialog-cancel").click();

    // (c) the catch-all row's editor exposes no Move verbs.
    // J5 — the row, its actions region and its verbs all resolve through the
    // twin helpers, exactly as CT-9b resolves a card row: never a bare prefix.
    await page.getByTestId("category-search").fill(catchall!.slug);
    await expect(categoryRow(page, catchall!.slug)).toBeVisible({ timeout: 20000 });
    await expect(actionsOf(page, catchall!.slug)).toBeVisible({ timeout: 20000 });
    await openEditor(page, catchall!.slug);
    await expect(action(page, catchall!.slug, "up")).toHaveCount(0);
    await expect(action(page, catchall!.slug, "down")).toHaveCount(0);

    // C2-SETTLE PART B — the editor is dismissed and GONE before the test
    // ends; no later roster assertion may run against an open dialog.
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("category-edit-dialog")).toHaveCount(0);
  });

  /**
   * CT-15 (C2h) — REORDER IS A PLAIN UPDATE. Two scratch siblings under a
   * scratch parent: Move up on the second flips the roster order, no step-up
   * modal ever appears (its ABSENCE is asserted, not merely unobserved), and
   * the sibling catch-all stays last. J1/J3 — every row here is scratch and
   * destroyed in `finally`; the ratified tree is read-only to this spec.
   */
  test("CT-15 reorder: Move up flips the order with no step-up, catch-all last", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const supabase = adminClient();
    const parentSlug = scratchSlug();
    const aSlug = `${scratchSlug()}-a`;
    const bSlug = `${scratchSlug()}-b`;
    const otherSlug = `${scratchSlug()}-other`;
    const slugs = [parentSlug, aSlug, bSlug, otherSlug];
    const clientErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") clientErrors.push(`[client-error] ${message.text()}`);
    });

    try {
      /**
       * C2j / DEC-034 — FIXTURE INVARIANT: a seeded category ALWAYS gets its
       * pointer edge in the same step. A row without an edge is an orphan by
       * construction, and an orphan is not the thing these specs are about.
       * The edge's order is the next free slot under the given parent.
       */
      const seed = async (slug: string, catchall: boolean, parent: string | null) => {
        const { data, error } = await supabase
          .from("categories")
          // C2-SETTLE PART D — scratch rows are born publicly INVISIBLE (the
          // epoch window); the admin roster is unaffected. CT-4 sets its own
          // explicit window through the UI and is untouched.
          .insert({
            slug,
            name_en: slug,
            is_active: true,
            is_catchall: catchall,
            visible_until: new Date(0).toISOString(),
          })
          .select("id")
          .single();
        if (error) throw new Error(`[e2e:c2] seeding ${slug} failed: ${error.message}`);
        const id = data.id as string;

        let nextOrder = 2_000_000; // INC-383 — scratch roots sort after every real root
        if (parent !== null) {
          const existing = await supabase
            .from("category_tree_pointers")
            .select("display_order")
            .eq("parent_id", parent)
            .order("display_order", { ascending: false })
            .limit(1);
          if (existing.error)
            throw new Error(`[e2e:c2] reading sibling order failed: ${existing.error.message}`);
          nextOrder = (existing.data?.[0]?.display_order ?? -1) + 1;
        }

        const { error: pointerError } = await supabase
          .from("category_tree_pointers")
          .insert({ parent_id: parent, child_id: id, display_order: nextOrder });
        if (pointerError)
          throw new Error(`[e2e:c2] seeding pointer for ${slug} failed: ${pointerError.message}`);
        return id;
      };
      const parentId = await seed(parentSlug, false, null);
      const aId = await seed(aSlug, false, parentId);
      const bId = await seed(bSlug, false, parentId);
      const otherId = await seed(otherSlug, true, parentId);

      // J7 — seed BEFORE navigate, and assert the seeded rows rendered before
      // acting on any of them.
      const { secret } = await signInAsSuperAdmin(page);
      expect(secret, "the walk owns a proven factor").toBeTruthy();
      await gotoReady(page, "/admin/categories");
      await page.getByTestId("category-search").fill(parentSlug.slice(0, 18));
      await expect(categoryRow(page, aSlug)).toBeVisible({ timeout: 20000 });
      await expect(categoryRow(page, bSlug)).toBeVisible({ timeout: 20000 });

      const orderOf = async (childId: string) => {
        const { data, error } = await supabase
          .from("category_tree_pointers")
          .select("display_order")
          .eq("parent_id", parentId)
          .eq("child_id", childId)
          .single();
        if (error) throw new Error(`[e2e:c2] reading order failed: ${error.message}`);
        return data.display_order as number;
      };
      expect(await orderOf(aId)).toBeLessThan(await orderOf(bId));

      await openEditor(page, bSlug);
      await action(page, bSlug, "up").click({ timeout: 15000 });

      // The ABSENCE of the gate is the assertion: reorder is a plain update.
      await expect(page.getByTestId("step-up-modal")).toHaveCount(0);

      const dump = async (label: string) =>
        `${label} — ${await lifecycleDump(page, bSlug, clientErrors)} orders=${JSON.stringify({
          a: await orderOf(aId),
          b: await orderOf(bId),
          other: await orderOf(otherId),
        })}`;

      try {
        await expect
          .poll(async () => (await orderOf(bId)) < (await orderOf(aId)), {
            timeout: 15000,
            message: "CT-15 the order flipped",
          })
          .toBe(true);
      } catch {
        throw new Error(await dump("CT-15 the order did not flip"));
      }

      // The catch-all is pinned last by the server, whatever the operator sent.
      expect(await orderOf(otherId)).toBeGreaterThan(await orderOf(aId));
      expect(await orderOf(otherId)).toBeGreaterThan(await orderOf(bId));

      // The step-up gate never opened at any point in the walk.
      await expect(page.getByTestId("step-up-modal")).toHaveCount(0);
      await expect(page.getByTestId("category-verb-error")).toHaveCount(0);
    } finally {
      for (const slug of slugs) await destroyCategory(slug);
    }
  });
  /**
   * CT-16 (C2-CLOSE Part D, INC-150) — THE DIALOG RETURN PATH. A secondary
   * surface is an axis OF the editor, not a replacement for it: closing
   * Countries returns to the OPEN editor, and only closing the editor returns
   * to the table.
   */
  test("CT-16 return path: closing a secondary dialog returns to the open editor", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await openEditor(page, slug);

      await action(page, slug, "exclusions").click();
      await expect(page.getByTestId("category-exclusions-dialog")).toBeVisible({ timeout: 20000 });
      // The editor yields the surface while its sub-dialog is open.
      await expect(page.getByTestId("category-edit-dialog")).toHaveCount(0);

      await page
        .getByTestId("category-exclusions-dialog")
        .getByTestId("category-dialog-cancel")
        .click();
      // ... and comes straight back: the editor is open, the table is not the
      // destination of a sub-dialog close.
      await expect(page.getByTestId("category-exclusions-dialog")).toHaveCount(0);
      await expect(page.getByTestId("category-edit-dialog")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("category-verb-bar")).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(page.getByTestId("category-edit-dialog")).toHaveCount(0);
      await findRow(page, slug);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-17 (C5l — the create saga's closing spec) — the TWO-STEP dialog:
   *
   *  Step 1 "Details" carries the FULL field set: the silent icon machinery
   *  (empty until named, the name only behind Change), price, expiry, the
   *  visibility window, a COUNTRY EXCLUSION and a "before sibling" POSITION.
   *  Save creates, then chains the exclusions and the reorder.
   *  Step 2 "Image" is the shared surface: generate (fake) → assets render →
   *  Finish closes.
   *
   *  DB truth: the row's fields, the exclusion row, and the pointer's edge
   *  order sitting BETWEEN the two seeded siblings it was placed before/after.
   */
  test("CT-17 create flow: two steps, chained countries + position, image", async ({ page }) => {
    bandOnly(page, "any");
    const parentSlug = scratchSlug();
    const aSlug = scratchSlug();
    const bSlug = scratchSlug();
    const slug = scratchSlug();
    const supabase = adminClient();
    const { secret } = await signInAsSuperAdmin(page);
    // C5l — a window that starts in the future, to the minute.
    const from = new Date(Date.now() + 86_400_000);
    from.setSeconds(0, 0);
    const pad = (value: number) => String(value).padStart(2, "0");
    const fromLocal = `${from.getFullYear()}-${pad(from.getMonth() + 1)}-${pad(from.getDate())}T${pad(from.getHours())}:${pad(from.getMinutes())}`;
    const orderOf = async (parentId: string, childId: string) => {
      const { data, error } = await supabase
        .from("category_tree_pointers")
        .select("display_order")
        .eq("parent_id", parentId)
        .eq("child_id", childId)
        .single();
      if (error) throw new Error(`[e2e:c5l] reading order failed: ${error.message}`);
      return data.display_order as number;
    };
    try {
      // J7 — seed BEFORE navigate: a scratch parent holding two ACTIVE siblings.
      // CT17-OPTIONS VERDICT — a ROOT needs its NULL-parent POINTER row. The
      // roster's `edge` CTE only admits categories that have SOME pointer row;
      // a pointer-less parent lands in the orphan tail, and its children (which
      // do have an edge) are then unreachable from `walk` — absent from the
      // roster entirely, so the position select renders zero sibling options.
      const seed = async (seedSlug: string, parent: string | null) => {
        const { data, error } = await supabase
          .from("categories")
          .insert({
            slug: seedSlug,
            name_en: seedSlug,
            is_active: true,
            is_catchall: false,
            visible_until: new Date(0).toISOString(),
          })
          .select("id")
          .single();
        if (error) throw new Error(`[e2e:c5l] seeding ${seedSlug} failed: ${error.message}`);
        const id = data.id as string;
        const query = supabase
          .from("category_tree_pointers")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1);
        const existing = await (parent === null
          ? query.is("parent_id", null)
          : query.eq("parent_id", parent));
        // INC-383 — a scratch root never sorts ahead of a real root (≥ 2,000,000).
        const nextOrder = Math.max(
          parent === null ? 2_000_000 : 0,
          (existing.data?.[0]?.display_order ?? -1) + 1,
        );
        const { error: pointerError } = await supabase
          .from("category_tree_pointers")
          .insert({ parent_id: parent, child_id: id, display_order: nextOrder });
        if (pointerError)
          throw new Error(`[e2e:c5l] seeding pointer failed: ${pointerError.message}`);
        return id;
      };

      const parentId = await seed(parentSlug, null);
      const aId = await seed(aSlug, parentId);
      const bId = await seed(bSlug, parentId);

      await gotoReady(page, "/admin/categories");
      await page.getByTestId("category-create-open").click();

      /**
       * STAB-1 PART A — THE BOUNDED LAW. Every pre-Save interaction polls its
       * control (≤15s) and names that control on a stall; post-Save awaits the
       * unified dialog's Image surface bounded. No bare awaits in this block.
       */
      const step = async (label: string, run: () => Promise<void>) => {
        try {
          await run();
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          throw new Error(`${label} — ${reason}\n${await dialogDump(page, `CT-17 ${label}`)}`);
        }
      };
      const present = async (label: string, locator: Locator) => {
        await step(label, async () => {
          await expect
            .poll(async () => locator.count(), { timeout: 15000, message: label })
            .toBeGreaterThan(0);
        });
      };

      // C5m PART C — a THIN create-mode case: the mode-specific truth only
      // (icon hint, position options, chained exclusion + placement), then the
      // shared editor surface the other CTs already assert.
      await present("CT-17 the icon hint", page.getByTestId("category-create-icon-hint"));
      await step("CT-17 name fill + blur", async () => {
        await page.getByTestId("category-create-name").fill(slug);
        await page.getByTestId("category-create-name").blur();
      });
      // The parent OPTION must be present before it can be selected.
      await present(
        "CT-17 the scratch parent option",
        page.getByTestId("category-create-parent").locator(`option[value="${parentId}"]`),
      );
      await step("CT-17 parent select", async () => {
        await page.getByTestId("category-create-parent").selectOption({ value: parentId });
      });
      // PART B — options are the ACTIVE children of the SELECTED parent.
      await step("CT-17 position caption names the parent", async () => {
        await expect(page.getByTestId("category-create-position-caption")).toContainText(
          parentSlug,
          { timeout: 15000 },
        );
      });
      // The "Before <sibling>" OPTION is polled by its EXACT rendered label,
      // then selected by that same label — never by index.
      const beforeLabel = en["admin.categories.create.positionBefore"].replace("{name}", bSlug);
      /**
       * CT17-OPTIONS — the position dump convicts in ONE line: every rendered
       * option label, service-client truth for both seeded siblings (id, the
       * primary edge's parent_id, is_active, is_catchall), and the form's
       * currently selected parentId.
       */
      const positionDump = async () => {
        const labels = await page
          .getByTestId("category-create-position")
          .locator("option")
          .allTextContents();
        const truth: string[] = [];
        for (const [name, id] of [
          [aSlug, aId],
          [bSlug, bId],
        ] as const) {
          const { data: row } = await supabase
            .from("categories")
            .select("id,is_active,is_catchall")
            .eq("id", id)
            .maybeSingle();
          const { data: edges } = await supabase
            .from("category_tree_pointers")
            .select("parent_id,display_order")
            .eq("child_id", id)
            .order("display_order", { ascending: true });
          truth.push(
            `${name}: id=${id} parents=${JSON.stringify(edges ?? [])} is_active=${String(
              row?.is_active,
            )} is_catchall=${String(row?.is_catchall)}`,
          );
        }
        const selectedParent = await page
          .getByTestId("category-create-parent")
          .inputValue()
          .catch(() => "(unreadable)");
        return [
          `[CT-17 position] options=${JSON.stringify(labels)}`,
          `[CT-17 position] expected=${JSON.stringify(beforeLabel)}`,
          ...truth.map((line) => `[CT-17 position] ${line}`),
          `[CT-17 position] form parentId=${selectedParent} (seeded parent ${parentId})`,
        ].join("\n");
      };
      try {
        await present(
          `CT-17 the "${beforeLabel}" position option`,
          page.getByTestId("category-create-position").locator("option", { hasText: beforeLabel }),
        );
        await step("CT-17 position select by label", async () => {
          await page.getByTestId("category-create-position").selectOption({ label: beforeLabel });
        });
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`${reason}\n${await positionDump()}`);
      }

      await step("CT-17 price off", () => page.getByTestId("category-create-price").click());
      await step("CT-17 expiry fill", () => page.getByTestId("category-create-expiry").fill("45"));
      await step("CT-17 window fill", () =>
        page.getByTestId("category-create-visible-from").fill(fromLocal),
      );
      await step("CT-17 ET exclusion", () =>
        page.getByTestId("category-create-exclusion-ET").check(),
      );

      await step("CT-17 save", async () => {
        await page.getByTestId("category-create-submit").click();
        await stepUpIfPrompted(page, secret);
      });

      // The SAME dialog transitions in place to the image surface (bounded).
      await step("CT-17 the dialog advances to the image surface", async () => {
        await expect(page.getByTestId("category-editor-image")).toBeVisible({ timeout: 20000 });
      });

      // DB truth: the row, the chained exclusion, and the edge BETWEEN the
      // two siblings it was placed before (a < new < b).
      const created = await readCategory(slug);
      expect(created?.price_enabled).toBe(false);
      expect(created?.expiry_days).toBe(45);
      expect(new Date(created?.visible_from ?? 0).getTime()).toBe(new Date(fromLocal).getTime());
      await expect
        .poll(
          async () => {
            const { data } = await supabase
              .from("category_country_exclusions")
              .select("country_code")
              .eq("category_id", created!.id);
            return (data ?? []).map((row) => row.country_code);
          },
          { timeout: 20000 },
        )
        .toEqual(["ET"]);
      const [orderA, orderNew, orderB] = [
        await orderOf(parentId, aId),
        await orderOf(parentId, created!.id),
        await orderOf(parentId, bId),
      ];
      expect(orderNew).toBeGreaterThan(orderA);
      expect(orderNew).toBeLessThan(orderB);

      await step("CT-17 close leaves the dialog gone", async () => {
        await page.getByTestId("category-editor-close").click();
        await expect(page.getByTestId("category-edit-dialog")).toHaveCount(0, { timeout: 20000 });
      });
    } finally {
      await destroyCategory(slug);
      await destroyCategory(aSlug);
      await destroyCategory(bSlug);
      await destroyCategory(parentSlug);
    }
  });
});

/**
 * CAT-IE — CATEGORY EXPORT + IMPORT (CT-18..CT-23).
 *
 * The import never writes anything the console could not write by hand: every
 * mutation travels through the lifecycle doors, and every verdict (unknown
 * parent, cycle, catch-all parent, blast radius, scope, step-up) belongs to
 * the gated RPCs (E7/F3). These blocks assert DB truth through the service
 * client (J4), never the rendered badge.
 */
test.describe("CAT-IE categories import/export", () => {
  const COLUMNS = [
    "category_path",
    "category_slug",
    "parent_slug",
    "name_en",
    "name_am",
    "display_order",
    "is_active",
    "allow_listings",
    "is_catchall",
    "price_enabled",
    // U6-C2b — the posting cells the file now carries (CT-x), in registry order.
    "capabilities",
    "default_price_period",
    "price_period_locked",
    "expiry_days",
    "icon",
    "visible_from",
    "visible_until",
    "excluded_country_codes",
    "secondary_parents",
    "listing_count",
    "origin_scope",
  ] as const;
  const HEADER = COLUMNS.join(",");

  /** RFC 4180 cell for a hand-authored fixture file. */
  function cell(value: string): string {
    return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }

  function line(
    values: Partial<Record<(typeof COLUMNS)[number], string>>,
    action?: string,
  ): string {
    const cells = COLUMNS.map((column) => cell(values[column] ?? ""));
    return action === undefined ? cells.join(",") : [...cells, cell(action)].join(",");
  }

  /**
   * INC-437 — a file row for a row that already exists carries that row's
   * stored cells, read through the service client at build time.
   */
  async function storedRootLine(slug: string): Promise<string> {
    const stored = await readCategory(slug);
    if (stored === null) throw new Error(`[e2e:c2] ${slug} is not stored`);
    return line({
      category_slug: stored.slug,
      name_en: stored.name_en,
      display_order: String(stored.display_order),
    });
  }

  function file(rows: string[], withAction = false): string {
    const header = withAction ? `${HEADER},action` : HEADER;
    return `\uFEFF${[header, ...rows].join("\r\n")}\r\n`;
  }

  async function bearerOf(page: import("@playwright/test").Page): Promise<string> {
    return page.evaluate(async () => {
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
  }

  async function importPost(
    page: import("@playwright/test").Page,
    token: string,
    body: Record<string, unknown>,
  ) {
    const response = await page.request.post("/api/admin/categories/import", {
      headers: { Authorization: `Bearer ${token}` },
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
   * A concurrent spec may create or destroy its own scratch categories between
   * the export and the preview, which would read as a phantom add. CT-18
   * asserts the invariant over the RATIFIED roster only — the strip itself is
   * the ONE harness helper (`stripScratchRows`, e2e/helpers/exports.ts,
   * R-TR34/G28): EVERY same-run scratch row under ANY `e2e_`/`e2e-` stem
   * leaves the assertion; real rows are the whole invariant.
   */

  function countsOf(text: string): number[] {
    return (text.match(/\d+/g) ?? []).map((digits) => Number(digits));
  }

  /** A scratch node written through the service client (J3), never a real row. */
  async function seedCategory(slug: string, parentId: string | null): Promise<string> {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("categories")
      .insert({ slug, name_en: slug })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:cat-ie] seeding ${slug} failed: ${error?.message}`);
    const { error: pointerError } = await supabase.from("category_tree_pointers").insert({
      parent_id: parentId,
      child_id: data.id,
      display_order: parentId === null ? 2_000_000 : 0,
    });
    if (pointerError) {
      throw new Error(`[e2e:cat-ie] pointer for ${slug} failed: ${pointerError.message}`);
    }
    return data.id;
  }

  /**
   * CT-18 — THE ROUND-TRIP INVARIANT. The whole roster is exported through the
   * real route and re-imported through the DIALOG's file picker: nothing is
   * added, changed, retired, reactivated, deleted or refused. Discard then
   * writes nothing — DB truth: no capture row at all.
   */
  test("CT-18 a real-export round trip is a no-op", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    // J6 — this test's actor. Every DB-truth assertion below is scoped to it.
    const actorId = (await signInAsSuperAdmin(page)).user.id;
    await gotoReady(page, "/admin/categories");

    const token = await bearerOf(page);
    const response = await page.request.get("/api/admin/categories/export", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const exported = stripScratchRows(await response.text());
    expect(exported.rows, "CT-18 the export produced no rows to re-import").toBeGreaterThan(0);

    const startedAt = new Date().toISOString();

    await page.getByTestId("category-import").click();
    await expect(page.getByTestId("category-import-dialog")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("category-import-file").setInputFiles({
      name: "categories.csv",
      mimeType: "text/csv",
      buffer: Buffer.from(exported.text, "utf8"),
    });

    await page.getByTestId("category-import-preview").click();
    const counts = page.getByTestId("category-import-counts");
    await expect(counts).toBeVisible({ timeout: 120_000 });

    const numbers = countsOf((await counts.textContent()) ?? "");
    expect(numbers, `CT-18 counts line: ${await counts.textContent()}`).toHaveLength(7);
    const [adds, changes, retires, reactivations, deletes, unchanged, refused] = numbers;
    expect(
      { adds, changes, retires, reactivations, deletes, refused },
      `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
    ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
    expect(unchanged).toBe(exported.rows);
    await expect(page.getByTestId("category-import-refusals")).toHaveCount(0);
    // IE-3b — the silence invariant: an unedited roster export ignores NOTHING.
    await expect(page.getByTestId("category-import-ignored")).toHaveCount(0);

    await page.getByTestId("category-import-discard").click();
    await expect(page.getByTestId("category-import-dialog")).toHaveCount(0);

    // DB TRUTH (J4) scoped by J6: only rows tagged with THIS test's pooled
    // actor (`created_by`) since `startedAt` can indict this Discard.
    const { data: batches } = await adminClient()
      .from("category_import_revisions")
      .select("id")
      .eq("created_by", actorId)
      .gte("created_at", startedAt);
    expect(batches ?? [], "CT-18 Discard wrote a batch").toHaveLength(0);
  });

  /** CT-19 — one file creates a child, renames a sibling, and UNDOES cleanly. */
  test("CT-19 a create and a rename commit through the doors and undo", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const childSlug = scratchSlug();
    const newSlug = scratchSlug();
    try {
      const parentId = await seedCategory(parentSlug, null);
      await seedCategory(childSlug, parentId);

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const renamed = `${childSlug}-renamed`;
      const categories = file([
        // INC-437 — the scratch root's CURRENT stored cells, read at build time.
        await storedRootLine(parentSlug),
        line({
          category_slug: childSlug,
          parent_slug: parentSlug,
          name_en: renamed,
          display_order: "0",
        }),
        line({
          category_slug: newSlug,
          parent_slug: parentSlug,
          name_en: newSlug,
          display_order: "1",
        }),
      ]);

      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      // INC-437 — the test's own rows' planned actions, never the file's totals.
      const items = (preview.payload["items"] ?? []) as { slug: string; op: string }[];
      const opOf = (slug: string) => items.find((item) => item.slug === slug)?.op;
      expect(preview.payload["refusals"], JSON.stringify(preview.payload)).toEqual([]);
      expect(opOf(childSlug), JSON.stringify(items)).toBe("update");
      expect(opOf(newSlug), JSON.stringify(items)).toBe("create");

      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      // DB TRUTH (J4), through the same reads the console uses.
      const created = await readCategory(newSlug);
      expect(created, "CT-19 the new child was not created").not.toBeNull();
      const pointers = await readPointers(created!.id);
      expect(pointers.map((pointer) => pointer.parent_id)).toEqual([parentId]);
      expect((await readCategory(childSlug))?.name_en).toBe(renamed);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readCategory(newSlug), "CT-19 undo left the created child").toBeNull();
      expect((await readCategory(childSlug))?.name_en).toBe(childSlug);
    } finally {
      await destroyCategory(newSlug);
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * CT-36 (M8a A2/A3, INC-314) — A CREATE ROW'S GUEST PARENTS. A created leaf
   * whose secondary_parents names a category gets its guest pointer at the
   * commit; the undo removes the leaf and both pointers; an unknown guest is
   * refused as unknownParent, naming the slug.
   */
  test("CT-36 a created leaf gets its secondary parents and the undo removes both pointers", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const rootSlug = scratchSlug();
    const guestSlug = scratchSlug();
    const leafSlug = scratchSlug();
    const ghostSlug = scratchSlug();
    try {
      const rootId = await seedCategory(rootSlug, null);
      const guestId = await seedCategory(guestSlug, null);

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const categories = file([
        await storedRootLine(rootSlug),
        await storedRootLine(guestSlug),
        line({
          category_slug: leafSlug,
          parent_slug: rootSlug,
          name_en: leafSlug,
          display_order: "0",
          secondary_parents: guestSlug,
        }),
      ]);
      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const items = (preview.payload["items"] ?? []) as { slug: string; op: string }[];
      expect(preview.payload["refusals"], JSON.stringify(preview.payload)).toEqual([]);
      expect(items.find((item) => item.slug === leafSlug)?.op, JSON.stringify(items)).toBe(
        "create",
      );

      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;

      // DB TRUTH (J4): the primary pointer under the root, the guest under the second parent.
      const created = await readCategory(leafSlug);
      expect(created, "CT-36 the leaf was not created").not.toBeNull();
      const parents = (await readPointers(created!.id)).map((pointer) => pointer.parent_id).sort();
      expect(parents, "CT-36 the leaf's pointers").toEqual([rootId, guestId].sort());

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readCategory(leafSlug), "CT-36 undo left the leaf").toBeNull();
      expect(await readPointers(created!.id), "CT-36 undo left a pointer").toEqual([]);

      // An unknown guest is refused by the planner, naming the row and the slug.
      const ghost = file([
        await storedRootLine(rootSlug),
        line({
          category_slug: leafSlug,
          parent_slug: rootSlug,
          name_en: leafSlug,
          display_order: "0",
          secondary_parents: ghostSlug,
        }),
      ]);
      const refused = await importPost(page, token, { mode: "preview", categories: ghost });
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      const refusals = (refused.payload["refusals"] ?? []) as Record<string, unknown>[];
      const named = refusals.find((refusal) => refusal["key"] === leafSlug);
      expect(named?.["reason"], `CT-36 no refusal: ${JSON.stringify(refused.payload)}`).toBe(
        "unknownParent",
      );
      expect(String(named?.["detail"] ?? ""), "CT-36 the refusal names no slug").toContain(
        ghostSlug,
      );
    } finally {
      await destroyCategory(leafSlug);
      await destroyCategory(guestSlug);
      await destroyCategory(rootSlug);
    }
  });

  /**
   * CT-37 (M8a A4/A5, INC-307) — AN UNDO RESTORES EVERY DEPENDENT ROW THE
   * DELETE REMOVED, OR SAYS WHICH IT CANNOT: the leaf's attribute links come
   * back cell for cell; a link whose attribute is gone is named as skipped.
   */
  test("CT-37 undoing a category delete restores its attribute links or names the skipped ones", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const rootSlug = scratchSlug();
    const leafSlug = scratchSlug();
    const keyX = `e2e_attr_${rand()}`;
    const keyY = `e2e_attr_${rand()}`;
    const LINK_CELLS =
      "is_required, is_filterable, is_searchable, display_order, card_rank, allowed_options, default_value, visible_when, attribute_id";
    try {
      const rootId = await seedCategory(rootSlug, null);
      const leafId = await seedCategory(leafSlug, rootId);
      const { data: attrs, error: attrError } = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: keyX,
            name_en: keyX,
            attr_type: "single_select",
            options: [
              { value: "a", label_en: "a" },
              { value: "b", label_en: "b" },
            ],
          },
          { attr_key: keyY, name_en: keyY, attr_type: "number" },
        ])
        .select("id, attr_key");
      if (attrError || !attrs) throw new Error(`CT-37 attributes failed: ${attrError?.message}`);
      const idOf = (key: string) => attrs.find((row) => row.attr_key === key)!.id as string;
      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        {
          category_id: leafId,
          attribute_id: idOf(keyX),
          display_order: 1,
          card_rank: 1,
          is_required: true,
          allowed_options: ["a"],
          default_value: "a",
        },
        {
          category_id: leafId,
          attribute_id: idOf(keyY),
          display_order: 2,
          card_rank: 2,
          is_filterable: true,
          visible_when: { key: keyX, in: ["a"] },
        },
      ]);
      if (linkError) throw new Error(`CT-37 links failed: ${linkError.message}`);

      const linksOf = async (categoryId: string) => {
        const { data, error } = await supabase
          .from("category_attribute_links")
          .select(LINK_CELLS)
          .eq("category_id", categoryId)
          .order("display_order");
        if (error) throw new Error(`CT-37 reading links failed: ${error.message}`);
        return data ?? [];
      };
      const before = await linksOf(leafId);
      expect(before, "CT-37 the seed").toHaveLength(2);

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);
      const deleteLeaf = async () => {
        const doomed = file([line({ category_slug: leafSlug, name_en: leafSlug }, "delete")], true);
        const preview = await importPost(page, token, { mode: "preview", categories: doomed });
        expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
        expect(preview.payload["refusals"], JSON.stringify(preview.payload)).toEqual([]);
        const commit = await importPost(page, token, {
          mode: "commit",
          categories: doomed,
          digest: preview.payload["digest"],
        });
        expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
        expect(await readCategory(leafSlug), "CT-37 the leaf was not deleted").toBeNull();
        return commit.payload["batch_id"] as string;
      };

      // (a) delete → the links cascade away; undo → every captured cell is back.
      const first = await deleteLeaf();
      const undo = await importPost(page, token, { mode: "undo", batchId: first });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(undo.payload, "CT-37 the undo's answer").toMatchObject({
        links_restored: 2,
        links_skipped: [],
      });
      const back = await readCategory(leafSlug);
      expect(back, "CT-37 the undo did not restore the leaf").not.toBeNull();
      expect(await linksOf(back!.id), "CT-37 the links did not come back as captured").toEqual(
        before,
      );

      // (b) delete, then the second attribute is removed, then undo: it is named.
      const second = await deleteLeaf();
      await destroyAttribute(keyY);
      const partial = await importPost(page, token, { mode: "undo", batchId: second });
      expect(partial.status, JSON.stringify(partial.payload)).toBe(200);
      expect(partial.payload, "CT-37 the partial undo's answer").toMatchObject({
        links_restored: 1,
        links_skipped: [keyY],
      });
      const again = await readCategory(leafSlug);
      expect((await linksOf(again!.id)).map((row) => row.attribute_id)).toEqual([idOf(keyX)]);
    } finally {
      await destroyCategory(leafSlug);
      await destroyCategory(rootSlug);
      await destroyAttribute(keyX);
      await destroyAttribute(keyY);
    }
  });

  /**
   * CT-35 (INC-432) — THE SELLER-NAME TABLE FOLLOWS THE CATEGORY IMPORT. A
   * category name the import creates is protected the moment the commit
   * returns, and released the moment its undo returns (DB truth: name_folds).
   */
  test("CT-35 an imported category name is in the name table after commit and gone after undo", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const slug = scratchSlug();
    const word = scratchFoldWord();
    try {
      await seedCategory(parentSlug, null);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);
      expect(await nameFoldPresent("category", word), "CT-35 the scratch word pre-exists").toBe(
        false,
      );

      // The import adds children only: a scratch root (its stored order kept)
      // and one new child whose English name is the scratch word.
      const categories = file([
        await storedRootLine(parentSlug),
        line({ category_slug: slug, parent_slug: parentSlug, name_en: word, display_order: "0" }),
      ]);
      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();
      expect(await nameFoldPresent("category", word), "CT-35 not protected after commit").toBe(
        true,
      );

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await nameFoldPresent("category", word), "CT-35 still protected after undo").toBe(
        false,
      );
    } finally {
      await destroyCategory(slug);
      await destroyCategory(parentSlug);
    }
  });

  /** CT-20 — retire and reactivate travel through the state machine, audited. */
  test("CT-20 action=retire and action=reactivate walk the state machine", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const slug = scratchSlug();
    try {
      const id = await seedCategory(slug, null);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const rowValues = { category_slug: slug, name_en: slug, display_order: "0" };
      const retireFile = file([line(rowValues, "retire")], true);
      const retirePreview = await importPost(page, token, {
        mode: "preview",
        categories: retireFile,
      });
      expect(retirePreview.status, JSON.stringify(retirePreview.payload)).toBe(200);
      expect((retirePreview.payload["counts"] as Record<string, number>).retires).toBe(1);
      const retire = await importPost(page, token, {
        mode: "commit",
        categories: retireFile,
        digest: retirePreview.payload["digest"],
      });
      expect(retire.status, JSON.stringify(retire.payload)).toBe(200);
      expect((await readCategory(slug))?.is_active).toBe(false);

      const reactivateFile = file([line(rowValues, "reactivate")], true);
      const reactivatePreview = await importPost(page, token, {
        mode: "preview",
        categories: reactivateFile,
      });
      expect(reactivatePreview.status).toBe(200);
      const reactivate = await importPost(page, token, {
        mode: "commit",
        categories: reactivateFile,
        digest: reactivatePreview.payload["digest"],
      });
      expect(reactivate.status, JSON.stringify(reactivate.payload)).toBe(200);
      expect((await readCategory(slug))?.is_active).toBe(true);

      // The doors audited both walks (F5 capture).
      const { data: audits } = await adminClient()
        .from("audit_log")
        .select("action")
        .eq("entity_id", id)
        .in("action", ["category.retire", "category.reactivate"]);
      expect((audits ?? []).map((entry) => entry.action).sort()).toEqual([
        "category.reactivate",
        "category.retire",
      ]);
    } finally {
      await destroyCategory(slug);
    }
  });

  /** CT-21 — the refusal vocabulary; a preview writes nothing (F5). */
  test("CT-21 unknown parents, cycles, catch-alls and formulas are refused", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const childSlug = scratchSlug();
    const orphanSlug = scratchSlug();
    try {
      const parentId = await seedCategory(parentSlug, null);
      await seedCategory(childSlug, parentId);

      const { data: catchall } = await adminClient()
        .from("categories")
        .select("slug")
        .eq("is_catchall", true)
        .limit(1)
        .maybeSingle();

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      // (a) a header that is not the export's is refused whole.
      const badHeader = await importPost(page, token, {
        mode: "preview",
        categories: "slug,name\r\nfoo,bar\r\n",
      });
      expect(badHeader.status).toBe(400);
      expect(badHeader.payload["error"]).toBe("badHeader");

      const rows = [
        // unknown parent
        line({
          category_slug: `${orphanSlug}-a`,
          parent_slug: `e2e-cat-nope-${rand()}`,
          name_en: `${orphanSlug}-a`,
        }),
        // a cycle: the parent asks to hang under its own child
        line({ category_slug: parentSlug, parent_slug: childSlug, name_en: parentSlug }),
        // a formula cell
        line({ category_slug: `${orphanSlug}-b`, parent_slug: parentSlug, name_en: "=SUM(1)" }),
        // deleting a category that still has children
        line({ category_slug: parentSlug, name_en: parentSlug }, "delete"),
      ];
      if (catchall?.slug) {
        rows.splice(
          1,
          0,
          line({
            category_slug: `${orphanSlug}-c`,
            parent_slug: catchall.slug,
            name_en: `${orphanSlug}-c`,
          }),
        );
      }
      // The duplicate parent row (cycle + delete) also proves duplicateSlug.
      const preview = await importPost(page, token, {
        mode: "preview",
        categories: file(rows, true),
      });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const reasons = (preview.payload["refusals"] as { reason: string }[]).map(
        (entry) => entry.reason,
      );
      expect(reasons, JSON.stringify(preview.payload["refusals"])).toEqual(
        expect.arrayContaining(["unknownParent", "cycle", "formula", "duplicateSlug"]),
      );
      if (catchall?.slug) expect(reasons).toContain("catchallParent");

      // PREVIEW WRITES NOTHING (F5).
      expect(await readCategory(`${orphanSlug}-a`)).toBeNull();
      expect(await readCategory(`${orphanSlug}-b`)).toBeNull();
      expect((await readCategory(parentSlug))?.is_active).toBe(true);
    } finally {
      await destroyCategory(`${orphanSlug}-a`);
      await destroyCategory(`${orphanSlug}-b`);
      await destroyCategory(`${orphanSlug}-c`);
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * CT-34 — bundle 2 step 17 (DEC-105). own_place is an allowed capability token
   * beside map_pin and bookable; an unknown token is still refused by name.
   */
  test("CT-34 own_place is accepted by the import and an unknown token is refused", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const parentSlug = scratchSlug();
    const ownSlug = scratchSlug();
    const badSlug = scratchSlug();
    try {
      await seedCategory(parentSlug, null);
      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);
      const preview = await importPost(page, token, {
        mode: "preview",
        categories: file([
          line({
            category_slug: ownSlug,
            parent_slug: parentSlug,
            name_en: ownSlug,
            capabilities: "map_pin|own_place",
          }),
          line({
            category_slug: badSlug,
            parent_slug: parentSlug,
            name_en: badSlug,
            capabilities: "bookable|fly",
          }),
        ]),
      });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const refusals = preview.payload["refusals"] as { reason: string; detail?: unknown }[];
      const bad = refusals.filter((entry) => entry.reason === "badCapability");
      expect(bad, JSON.stringify(refusals)).toHaveLength(1);
      expect(bad[0]?.detail, "CT-34: the unknown token was not named").toBe("fly");
      // PREVIEW WRITES NOTHING (F5).
      expect(await readCategory(ownSlug)).toBeNull();
      expect(await readCategory(badSlug)).toBeNull();
    } finally {
      await destroyCategory(ownSlug);
      await destroyCategory(badSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * A scratch role carrying exactly the named permissions (J3): no ratified
   * role is ever touched, and the role is dropped in the caller's `finally`.
   */
  async function scratchRole(wanted: [string, string][]) {
    const supabase = adminClient();
    const roleName = `e2e_catie_${rand()}`;
    const { data: role, error } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (error || !role) throw new Error(`[e2e:cat-ie] scratch role failed: ${error?.message}`);
    const { data: perms } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in(
        "resources.name",
        wanted.map(([resource]) => resource),
      );
    const chosen = (perms ?? []).filter((perm) => {
      const resource = (perm as unknown as { resources: { name: string } }).resources.name;
      return wanted.some(([name, act]) => name === resource && act === perm.action);
    });
    expect(chosen.length, "[e2e:cat-ie] the scratch role is missing a permission").toBe(
      wanted.length,
    );
    await supabase
      .from("role_permissions")
      .insert(chosen.map((perm) => ({ role_id: role.id, permission_id: perm.id })));
    return role.id;
  }

  async function dropRole(roleId: string) {
    const supabase = adminClient();
    await supabase.from("role_permissions").delete().eq("role_id", roleId);
    await supabase.from("user_roles").delete().eq("role_id", roleId);
    await supabase.from("roles").delete().eq("id", roleId);
  }

  /** CT-22 — no `categories:import`: no control, and the route refuses. */
  test("CT-22 a categories:view-only operator sees no import control and is refused", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const roleId = await scratchRole([
      ["admin_panel", "access"],
      ["categories", "view"],
    ]);
    try {
      const viewer = await leaseUser();
      await adminClient()
        .from("user_roles")
        .insert({ user_id: viewer.id, role_id: roleId, scope_type: "global" });
      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/categories");
      await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("category-import")).toHaveCount(0);

      const token = await bearerOf(page);
      const slug = scratchSlug();
      const categories = file([line({ category_slug: slug, name_en: slug })]);
      const denied = await importPost(page, token, { mode: "preview", categories });
      expect(denied.status, JSON.stringify(denied.payload)).toBe(403);
      const deniedCommit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: "whatever",
      });
      expect(deniedCommit.status).toBe(409);

      // NO BEARER, NO DOOR.
      const anonymous = await page.request.post("/api/admin/categories/import", {
        data: { mode: "preview" },
      });
      expect(anonymous.status()).toBe(401);
    } finally {
      await dropRole(roleId);
    }
  });

  /** CT-23 — an un-stepped-up importer is refused (P0009) and nothing is written. */
  test("CT-23 a commit without step-up is refused and writes nothing", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const roleId = await scratchRole([
      ["admin_panel", "access"],
      ["categories", "view"],
      ["categories", "import"],
    ]);
    const slug = scratchSlug();
    try {
      const importer = await leaseUser();
      await adminClient()
        .from("user_roles")
        .insert({ user_id: importer.id, role_id: roleId, scope_type: "global" });
      await switchUser(page, importer.email, importer.password);
      await gotoReady(page, "/admin/categories");

      const token = await bearerOf(page);
      const categories = file([line({ category_slug: slug, name_en: slug })]);
      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);

      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(428);
      expect(commit.payload["code"]).toBe("P0009");

      // A refused attempt leaves NO trace (F5).
      expect(await readCategory(slug)).toBeNull();
    } finally {
      await destroyCategory(slug);
      await dropRole(roleId);
    }
  });
  /**
   * CT-24 — GUIDED REFUSALS (IE-3). A row that keeps the name but changes the
   * address is a rename attempt: refused, and the message NAMES the address to
   * restore. A name-only edit on the real address is one ordinary change.
   */
  test("CT-24 a slug rename is refused by name, and a name edit is one change", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const childSlug = `${scratchSlug()}-c`;
    const grandchildSlug = `${scratchSlug()}-g`;
    const otherSlug = `${scratchSlug()}-o`;
    const renamedSlug = `${childSlug}-renamed`;
    const operatorSlug = `${scratchSlug()}-op`;
    try {
      const parentId = await seedCategory(parentSlug, null);
      const childId = await seedCategory(childSlug, parentId);

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      // (a) the rename attempt: a NEW address carrying the existing name.
      const renameFile = file([
        line({ category_slug: renamedSlug, parent_slug: parentSlug, name_en: childSlug }),
      ]);
      const rename = await importPost(page, token, { mode: "preview", categories: renameFile });
      expect(rename.status, JSON.stringify(rename.payload)).toBe(200);
      const refusals = rename.payload["refusals"] as { reason: string; detail?: string }[];
      expect(refusals.map((entry) => entry.reason)).toContain("slugRename");
      expect(
        refusals.find((entry) => entry.reason === "slugRename")?.detail,
        `CT-24 the refusal did not name the old address: ${JSON.stringify(refusals)}`,
      ).toBe(childSlug);
      expect(await readCategory(renamedSlug)).toBeNull();

      // (b) a name-only edit at the real address is one ordinary change.
      const renamed = `${childSlug} renamed`;
      const editFile = file([
        line({ category_slug: childSlug, parent_slug: parentSlug, name_en: renamed }),
      ]);
      const edit = await importPost(page, token, { mode: "preview", categories: editFile });
      expect(edit.status, JSON.stringify(edit.payload)).toBe(200);
      expect((edit.payload["counts"] as Record<string, number>).changes).toBe(1);

      // (c) IE-3b — the same edit on a category that HAS children and a browse
      // pointer: the detector reads the row's read-only address (path +
      // parent), not a sibling name, so it fires BEFORE the parent check and
      // still names the slug to restore. Nothing is planned as a create.
      await seedCategory(grandchildSlug, childId);
      const otherId = await seedCategory(otherSlug, null);
      const { error: pointerError } = await adminClient()
        .from("category_tree_pointers")
        .insert({ parent_id: otherId, child_id: childId, display_order: 1 });
      if (pointerError) {
        throw new Error(`[e2e:cat-ie] browse pointer failed: ${pointerError.message}`);
      }

      const addressFile = file([
        line({
          category_path: `${parentSlug}/${childSlug}`,
          category_slug: renamedSlug,
          parent_slug: parentSlug,
          name_en: childSlug,
          secondary_parents: otherSlug,
        }),
      ]);
      const address = await importPost(page, token, { mode: "preview", categories: addressFile });
      expect(address.status, JSON.stringify(address.payload)).toBe(200);
      const guided = address.payload["refusals"] as { reason: string; detail?: string }[];
      expect(
        guided.find((entry) => entry.reason === "slugRename")?.detail,
        `CT-24 the address rename was not guided: ${JSON.stringify(guided)}`,
      ).toBe(childSlug);
      expect((address.payload["counts"] as Record<string, number>).adds).toBe(0);
      expect(await readCategory(renamedSlug)).toBeNull();

      // (d) IE-3c — THE OPERATOR'S CASE, captured from the uploaded
      // categories.csv (Excel round-trip: BOM, CRLF, quoted name carrying a
      // comma, Amharic name_am, read-only address columns filled in). A
      // parent_slug typo names a category in neither the roster nor the file:
      // the refusal must NAME the values it judged, not just its reason.
      const typoParent = `${parentSlug}-typo`;
      const operatorFile = file([
        line({
          category_path: `${typoParent}/${operatorSlug}`,
          category_slug: operatorSlug,
          parent_slug: typoParent,
          name_en: "Grains, Produce & Coffee",
          name_am: "የተሰበሰበ ምርት",
          display_order: "6",
          is_active: "true",
          allow_listings: "true",
          is_catchall: "false",
          price_enabled: "true",
          icon: "Coffee",
          listing_count: "0",
        }),
      ]);
      const operator = await importPost(page, token, {
        mode: "preview",
        categories: operatorFile,
      });
      expect(operator.status, JSON.stringify(operator.payload)).toBe(200);
      const judged = operator.payload["refusals"] as {
        reason: string;
        values?: Record<string, string>;
      }[];
      const parentRefusal = judged.find((entry) => entry.reason === "unknownParent");
      expect(
        parentRefusal,
        `CT-24(d) the operator's typo was not refused as an unknown parent: ${JSON.stringify(judged)}`,
      ).toBeDefined();
      // THE VALUES ARE IN THE PAYLOAD: parent judged, row slug, and the path.
      expect(parentRefusal?.values?.["parent_slug"]).toBe(typoParent);
      expect(parentRefusal?.values?.["category_slug"]).toBe(operatorSlug);
      expect(parentRefusal?.values?.["category_path"]).toBe(`${typoParent}/${operatorSlug}`);
      expect((operator.payload["counts"] as Record<string, number>).adds).toBe(0);
    } finally {
      await destroyCategory(operatorSlug);
      await destroyCategory(grandchildSlug);
      await destroyCategory(childSlug);
      await destroyCategory(renamedSlug);
      await destroyCategory(otherSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * CT-25 — FILE IDENTITY (IE-3). An attributes definitions file dropped into
   * the categories import is refused by its headers, before any row is parsed.
   */
  test("CT-25 an attributes file is refused by identity", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/categories");

    const token = await bearerOf(page);
    const definitions = await page.request.get("/api/admin/attributes/export?file=definitions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(definitions.status()).toBe(200);
    const definitionsCsv = await definitions.text();

    const refused = await importPost(page, token, {
      mode: "preview",
      categories: definitionsCsv,
    });
    expect(refused.status, JSON.stringify(refused.payload)).toBe(400);
    expect(refused.payload["error"]).toBe("wrongFile");

    // The DIALOG refuses it too, and never posts.
    await page.getByTestId("category-import").click();
    await expect(page.getByTestId("category-import-dialog")).toBeVisible();
    await page.getByTestId("category-import-file").setInputFiles({
      name: "definitions.csv",
      mimeType: "text/csv",
      buffer: Buffer.from(definitionsCsv, "utf8"),
    });
    await expect(page.getByTestId("category-import-error")).toBeVisible();
    await expect(page.getByTestId("category-import-counts")).toHaveCount(0);
    await page.getByTestId("category-import-discard").click();
  });

  /** The am name row exactly as the DB holds it (J4 — DB truth, never a badge). */
  async function readAmName(
    categoryId: string,
  ): Promise<{ value: string | null; status: string; machine: boolean } | null> {
    const { data } = await adminClient()
      .from("entity_translations")
      .select("value,status,machine")
      .eq("entity_type", "category")
      .eq("entity_id", categoryId)
      .eq("field", "name")
      .eq("lang_code", "am")
      .maybeSingle();
    return data ?? null;
  }

  /**
   * CT-26 — IE-4a. Amharic names ride the import through the translation door:
   * a root, a child and a grandchild are created in ONE file, each carrying a
   * name_am, and each lands as a HUMAN row awaiting review ('edited',
   * machine=false) — never auto-approved. A blank am cell is silence. Undo
   * removes the categories AND the pending rows the batch itself created.
   */
  test("CT-26 imported Amharic names land pending, and undo removes them", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/categories");

    const rootSlug = scratchSlug();
    const childSlug = scratchSlug();
    const grandchildSlug = scratchSlug();
    try {
      const token = await bearerOf(page);
      const categories = file(
        [
          line({ category_slug: rootSlug, name_en: rootSlug, name_am: "ሥር" }, "create-root"),
          line(
            {
              category_slug: childSlug,
              parent_slug: rootSlug,
              name_en: childSlug,
              name_am: "ልጅ",
            },
            "upsert",
          ),
          line(
            {
              category_slug: grandchildSlug,
              parent_slug: childSlug,
              name_en: grandchildSlug,
              name_am: "",
            },
            "upsert",
          ),
        ],
        true,
      );

      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(preview.payload["counts"], JSON.stringify(preview.payload["refusals"])).toMatchObject({
        adds: 3,
        refusals: 0,
      });

      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      const root = await readCategory(rootSlug);
      const child = await readCategory(childSlug);
      const grandchild = await readCategory(grandchildSlug);
      expect(root, "CT-26 the root was not created").not.toBeNull();
      expect(child, "CT-26 the child was not created").not.toBeNull();
      expect(grandchild, "CT-26 the grandchild was not created").not.toBeNull();

      // PENDING REVIEW, NEVER APPROVED — the console still has the last word.
      expect(await readAmName(root!.id)).toMatchObject({
        value: "ሥር",
        status: "edited",
        machine: false,
      });
      expect(await readAmName(child!.id)).toMatchObject({
        value: "ልጅ",
        status: "edited",
        machine: false,
      });
      // SILENCE — a blank am cell wrote no row at all.
      expect(
        await readAmName(grandchild!.id),
        "CT-26 an empty am cell wrote a translation row",
      ).toBeNull();

      // RE-IMPORTING THE SAME FILE IS A NO-OP: an identical am value is unchanged.
      const again = await importPost(page, token, { mode: "preview", categories });
      expect(again.status, JSON.stringify(again.payload)).toBe(200);
      expect(again.payload["counts"], JSON.stringify(again.payload["refusals"])).toMatchObject({
        adds: 0,
        changes: 0,
        refusals: 0,
      });

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readCategory(grandchildSlug), "CT-26 undo left the grandchild").toBeNull();
      expect(await readCategory(childSlug), "CT-26 undo left the child").toBeNull();
      expect(await readCategory(rootSlug), "CT-26 undo left the root").toBeNull();
      expect(
        await readAmName(root!.id),
        "CT-26 undo left the pending am row it created",
      ).toBeNull();
      expect(await readAmName(child!.id)).toBeNull();
    } finally {
      await destroyCategory(grandchildSlug);
      await destroyCategory(childSlug);
      await destroyCategory(rootSlug);
    }
  });

  /**
   * CT-30 — INC-187 PART 2. The order pass is applied ONCE per primary parent
   * after every row of the batch has landed: a reversed sibling order plus a
   * created row placed mid-sequence must reproduce the FILE's sequence, a
   * catch-all's edited order cell must count as no change and stay pinned by
   * the reorder door, and Undo must restore the original numbering. Every
   * assertion reads DB truth through the service client (J4).
   */
  test("CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const rootSlug = scratchSlug();
    const slugA = scratchSlug();
    const slugB = scratchSlug();
    const slugC = scratchSlug();
    const slugD = scratchSlug();
    const slugF = scratchSlug();
    const slugE = scratchSlug();

    /** DB truth: R's primary children, slug + order, sorted by order. */
    async function childrenOf(rootId: string): Promise<{ slug: string; order: number }[]> {
      const supabase = adminClient();
      const { data: pointers, error } = await supabase
        .from("category_tree_pointers")
        .select("child_id, display_order")
        .eq("parent_id", rootId)
        .order("display_order");
      if (error) throw new Error(`[e2e:cat-ie] reading CT-30 pointers failed: ${error.message}`);
      const rows: { slug: string; order: number }[] = [];
      for (const pointer of pointers ?? []) {
        const { data: category } = await supabase
          .from("categories")
          .select("slug")
          .eq("id", pointer.child_id)
          .maybeSingle();
        rows.push({ slug: category?.slug ?? pointer.child_id, order: pointer.display_order });
      }
      return rows;
    }

    /** Names the sequence in a failure message, never English page text. */
    function label(rows: { slug: string; order: number }[], names: Record<string, string>): string {
      return JSON.stringify(rows.map((row) => ({ n: names[row.slug] ?? row.slug, o: row.order })));
    }

    try {
      // SEED BEFORE NAVIGATE (J7), fixtures through the service client (J5).
      const rootId = await seedCategory(rootSlug, null);
      const ids: Record<string, string> = {};
      const seeded: [string, number][] = [
        [slugA, 0],
        [slugB, 1],
        [slugC, 2],
        [slugD, 3],
        [slugF, 4],
      ];
      for (const [slug, order] of seeded) {
        ids[slug] = await seedCategory(slug, rootId);
        const { error } = await adminClient()
          .from("category_tree_pointers")
          .update({ display_order: order })
          .eq("child_id", ids[slug]!);
        if (error) throw new Error(`[e2e:cat-ie] CT-30 seeding order failed: ${error.message}`);
      }
      // `seedCategory` cannot seed a catch-all; the flag is set by a
      // service-client TABLE update, exactly like the order above (J5).
      const { error: catchallError } = await adminClient()
        .from("categories")
        .update({ is_catchall: true })
        .eq("id", ids[slugF]!);
      if (catchallError) {
        throw new Error(
          `[e2e:cat-ie] CT-30 seeding the catch-all failed: ${catchallError.message}`,
        );
      }

      const names: Record<string, string> = {
        [rootSlug]: "R",
        [slugA]: "A",
        [slugB]: "B",
        [slugC]: "C",
        [slugD]: "D",
        [slugE]: "E",
        [slugF]: "F",
      };

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      const categories = file([
        line({ category_slug: rootSlug, name_en: rootSlug }),
        line({ category_slug: slugD, parent_slug: rootSlug, name_en: slugD, display_order: "0" }),
        line({ category_slug: slugC, parent_slug: rootSlug, name_en: slugC, display_order: "1" }),
        line({ category_slug: slugE, parent_slug: rootSlug, name_en: slugE, display_order: "2" }),
        line({ category_slug: slugB, parent_slug: rootSlug, name_en: slugB, display_order: "3" }),
        line({ category_slug: slugA, parent_slug: rootSlug, name_en: slugA, display_order: "4" }),
        line({ category_slug: slugF, parent_slug: rootSlug, name_en: slugF, display_order: "0" }),
      ]);

      const preview = await importPost(page, token, { mode: "preview", categories });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const previewCounts = preview.payload["counts"] as Record<string, number>;
      expect(previewCounts, JSON.stringify(preview.payload)).toMatchObject({
        adds: 1,
        changes: 4,
        unchanged: 2,
        refusals: 0,
      });

      const commit = await importPost(page, token, {
        mode: "commit",
        categories,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      // DB TRUTH (J4): the file's sequence, numbered 0..4, catch-all pinned.
      const after = await childrenOf(rootId);
      const ordered = after.filter((row) => row.slug !== slugF);
      expect(
        ordered.map((row) => row.slug),
        `CT-30 the file's sequence did not land: ${label(after, names)}`,
      ).toEqual([slugD, slugC, slugE, slugB, slugA]);
      expect(
        ordered.map((row) => row.order),
        `CT-30 the numbering is not 0..4: ${label(after, names)}`,
      ).toEqual([0, 1, 2, 3, 4]);
      const pinned = after.find((row) => row.slug === slugF);
      expect(pinned, `CT-30 the catch-all vanished: ${label(after, names)}`).toBeTruthy();
      expect(
        pinned!.order,
        `CT-30 the catch-all was not pinned: ${label(after, names)}`,
      ).toBeGreaterThanOrEqual(1000000);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readCategory(slugE), "CT-30 undo left the created row").toBeNull();

      const restored = await childrenOf(rootId);
      const restoredOrder = restored.filter((row) => row.slug !== slugF);
      expect(
        restoredOrder.map((row) => row.slug),
        `CT-30 undo did not restore the order: ${label(restored, names)}`,
      ).toEqual([slugA, slugB, slugC, slugD]);
      expect(
        restoredOrder.map((row) => row.order),
        `CT-30 undo did not restore the numbering: ${label(restored, names)}`,
      ).toEqual([0, 1, 2, 3]);
      const stillPinned = restored.find((row) => row.slug === slugF);
      expect(
        stillPinned?.order ?? -1,
        `CT-30 undo unpinned the catch-all: ${label(restored, names)}`,
      ).toBeGreaterThanOrEqual(1000000);
    } finally {
      await destroyCategory(slugE);
      await destroyCategory(slugF);
      await destroyCategory(slugD);
      await destroyCategory(slugC);
      await destroyCategory(slugB);
      await destroyCategory(slugA);
      await destroyCategory(rootSlug);
    }
  });

  /**
   * CT-27 — IE-4a. A retired LEAF deletes through the blast-radius door and
   * comes back on Undo with its Amharic name exactly as it stood; a parent
   * that still holds a child is refused, and the refusal NAMES the child.
   */
  test("CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const childSlug = scratchSlug();
    try {
      const parentId = await seedCategory(parentSlug, null);
      const childId = await seedCategory(childSlug, parentId);
      const supabase = adminClient();
      await supabase.from("categories").update({ is_active: false }).in("id", [parentId, childId]);
      // The leaf carries an APPROVED am name: undo must restore that exact state.
      const { error: seedAm } = await supabase.from("entity_translations").insert({
        entity_type: "category",
        entity_id: childId,
        field: "name",
        lang_code: "am",
        value: "ቅጠል",
        status: "approved",
        machine: false,
      });
      expect(seedAm, `CT-27 seeding the am name failed: ${seedAm?.message}`).toBeNull();

      await gotoReady(page, "/admin/categories");
      const token = await bearerOf(page);

      // (a) THE PARENT IS REFUSED, AND THE REFUSAL NAMES THE CHILD.
      const refusedFile = file(
        [line({ category_slug: parentSlug, name_en: parentSlug }, "delete")],
        true,
      );
      const refused = await importPost(page, token, { mode: "preview", categories: refusedFile });
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      const refusals = (refused.payload["refusals"] ?? []) as {
        key?: string;
        reason?: string;
        detail?: string;
        children?: string[];
      }[];
      const judged = refusals.find((refusal) => refusal.key === parentSlug);
      expect(
        judged,
        `CT-27 the parent delete was not refused: ${JSON.stringify(refused.payload)}`,
      ).toBeDefined();
      expect(judged?.reason).toBe("hasChildren");
      expect(
        judged?.children ?? [],
        `CT-27 the refusal did not name the child: ${JSON.stringify(judged)}`,
      ).toContain(childSlug);
      expect(judged?.detail ?? "").toContain(childSlug);
      expect((refused.payload["counts"] as Record<string, number>).deletes).toBe(0);
      expect(await readCategory(parentSlug), "CT-27 a preview deleted a row").not.toBeNull();

      // (b) THE LEAF DELETES, AND UNDO BRINGS IT BACK WITH ITS am STATE.
      const leafFile = file(
        [line({ category_slug: childSlug, name_en: childSlug }, "delete")],
        true,
      );
      const preview = await importPost(page, token, { mode: "preview", categories: leafFile });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(preview.payload["counts"], JSON.stringify(preview.payload["refusals"])).toMatchObject({
        deletes: 1,
        refusals: 0,
      });

      const commit = await importPost(page, token, {
        mode: "commit",
        categories: leafFile,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(await readCategory(childSlug), "CT-27 the leaf survived its delete").toBeNull();

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      const restored = await readCategory(childSlug);
      expect(restored, "CT-27 undo did not restore the leaf").not.toBeNull();
      expect(
        await readAmName(restored!.id),
        "CT-27 undo did not restore the captured am state",
      ).toMatchObject({ value: "ቅጠል", status: "approved", machine: false });
    } finally {
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
    }
  });

  /**
   * CT-28 (IE-7) — THE THREE DIALOG STATES. One scratch file chosen through
   * the real picker walks Ready → Previewed → Applied: the banner is present,
   * Confirm and Discard are gone, Undo restores DB TRUTH (J4), Close closes.
   */
  test("CT-28 the import dialog reaches Applied and undoes", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);

    const parentSlug = scratchSlug();
    const slug = scratchSlug();
    try {
      await seedCategory(parentSlug, null);
      await gotoReady(page, "/admin/categories");
      await page.getByTestId("category-import").click();
      await expect(page.getByTestId("category-import-dialog")).toBeVisible({ timeout: 20000 });

      // READY — the picker is a real button and Preview waits for a file.
      await expect(page.getByTestId("category-import-file-choose")).toBeVisible();
      await expect(page.getByTestId("category-import-confirm")).toHaveCount(0);
      await expect(page.getByTestId("category-import-preview")).toBeDisabled();
      await page.getByTestId("category-import-file").setInputFiles({
        name: "categories.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(
          file([
            line({
              category_slug: slug,
              parent_slug: parentSlug,
              name_en: slug,
              display_order: "0",
            }),
          ]),
          "utf8",
        ),
      });
      await expect(page.getByTestId("category-import-file-chosen")).toHaveText("categories.csv");
      await expect(page.getByTestId("category-import-preview")).toBeEnabled();

      // PREVIEWED — the verdict, with both doors.
      await page.getByTestId("category-import-preview").click();
      const countsLine = page.getByTestId("category-import-counts");
      await expect(countsLine).toBeVisible({ timeout: 120_000 });
      expect(
        countsOf((await countsLine.textContent()) ?? ""),
        `CT-28 the scratch add was not a clean single add: ${await countsLine.textContent()}`,
      ).toEqual([1, 0, 0, 0, 0, 0, 0]);
      await expect(page.getByTestId("category-import-confirm")).toBeVisible();
      await expect(page.getByTestId("category-import-discard")).toBeVisible();

      // APPLIED — the banner, the counts, and exactly Undo + Close.
      await page.getByTestId("category-import-confirm").click();
      await stepUpIfPrompted(page, secret);
      const banner = page.getByTestId("category-import-applied");
      await expect(banner).toBeVisible({ timeout: 120_000 });
      await expect(banner).toContainText("1");
      await expect(page.getByTestId("category-import-counts")).toBeVisible();
      await expect(page.getByTestId("category-import-confirm")).toHaveCount(0);
      await expect(page.getByTestId("category-import-discard")).toHaveCount(0);
      await expect(page.getByTestId("category-import-close")).toBeVisible();
      expect(await readCategory(slug), "CT-28 the commit wrote no category").not.toBeNull();

      // UNDO — DB truth, not a banner.
      await page.getByTestId("category-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("category-import-undone")).toBeVisible({ timeout: 120_000 });
      await expect.poll(async () => await readCategory(slug), { timeout: 30000 }).toBeNull();

      await page.getByTestId("category-import-close").click();
      await expect(page.getByTestId("category-import-dialog")).toHaveCount(0);
    } finally {
      await destroyCategory(slug);
      await destroyCategory(parentSlug);
    }
  });
});

/**
 * CT-33 (DEC-080) — THE HOME IS A FLAG, NOT THE LOWEST NUMBER.
 *
 * A scratch leaf L is linked under scratch roots A (display_order 5, inserted
 * FIRST — the trigger makes it the home) and B (display_order 0). The home is A
 * although B's pointer sorts first; renumbering B's pointer below it changes
 * nothing; deleting A's pointer promotes B's. DB truth through the service
 * client only — no console, no real rows (G27).
 */
test.describe("C2-HOME categories home flag", () => {
  test("CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other", async () => {
    const supabase = adminClient();
    const slugs = [`${scratchSlug()}-a`, `${scratchSlug()}-b`, `${scratchSlug()}-l`];
    const [slugA, slugB, slugL] = slugs;
    try {
      const { data: rows, error } = await supabase
        .from("categories")
        .insert([
          {
            slug: slugA,
            name_en: slugA,
            is_active: true,
            allow_listings: false,
            display_order: 9200,
          },
          {
            slug: slugB,
            name_en: slugB,
            is_active: true,
            allow_listings: false,
            display_order: 9201,
          },
          {
            slug: slugL,
            name_en: slugL,
            is_active: true,
            allow_listings: true,
            display_order: 9202,
          },
        ])
        .select("id, slug");
      if (error || !rows) throw new Error(`[e2e:ct-33] seeding failed: ${error?.message}`);
      const id = (slug: string) => rows.find((row) => row.slug === slug)!.id;

      const insertPointer = async (parent: string, order: number) => {
        const { data, error: pointerError } = await supabase
          .from("category_tree_pointers")
          .insert({ parent_id: id(parent), child_id: id(slugL), display_order: order })
          .select("id, is_primary")
          .single();
        if (pointerError || !data)
          throw new Error(`[e2e:ct-33] linking failed: ${pointerError?.message}`);
        return data;
      };
      const pointerA = await insertPointer(slugA, 5);
      const pointerB = await insertPointer(slugB, 0);
      const home = async () => {
        const { data, error: rpcError } = await supabase.rpc("cat_primary_parent", {
          p_id: id(slugL),
        });
        if (rpcError) throw new Error(`[e2e:ct-33] cat_primary_parent failed: ${rpcError.message}`);
        return data;
      };
      const flagOf = async (pointerId: string) => {
        const { data } = await supabase
          .from("category_tree_pointers")
          .select("is_primary")
          .eq("id", pointerId)
          .single();
        return data?.is_primary;
      };

      expect(pointerA.is_primary, "CT-33 the first pointer was not made the home").toBe(true);
      expect(pointerB.is_primary, "CT-33 the second pointer was made a home").toBe(false);
      expect(await home(), "CT-33 the home is not A").toBe(id(slugA));

      const { error: updateError } = await supabase
        .from("category_tree_pointers")
        .update({ display_order: -1 })
        .eq("id", pointerB.id);
      if (updateError) throw new Error(`[e2e:ct-33] renumbering failed: ${updateError.message}`);
      expect(await home(), "CT-33 renumbering B's pointer moved the home").toBe(id(slugA));

      const { error: deleteError } = await supabase
        .from("category_tree_pointers")
        .delete()
        .eq("id", pointerA.id);
      if (deleteError) throw new Error(`[e2e:ct-33] deleting failed: ${deleteError.message}`);
      expect(await flagOf(pointerB.id), "CT-33 deleting the home did not promote B").toBe(true);
      expect(await home(), "CT-33 the home is not B after the delete").toBe(id(slugB));
    } finally {
      for (const slug of slugs) await destroyCategory(slug);
    }
  });
});
