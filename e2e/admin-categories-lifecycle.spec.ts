import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, stepUpIfPrompted, waitForHydration } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  scratchSlug,
  bandOnly,
  surface,
  categoryRow,
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
} from "./helpers/categories";
/**
 * C2 — LIFECYCLE, STEP-UP AND DELETE (CT-12..CT-17).
 *
 * L1 (DEC-037): split out of admin-categories.spec.ts with titles, tags and
 * fixture identities unchanged (INC-159 shard balance).
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
    await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });

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

        let nextOrder = 900000;
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
        const nextOrder = (existing.data?.[0]?.display_order ?? -1) + 1;
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
