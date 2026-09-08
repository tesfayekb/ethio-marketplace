import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, stepUpIfPrompted, switchUser, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
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
  rand,
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
   * asserts the invariant over the RATIFIED roster only.
   */
  function withoutScratchRows(text: string): { text: string; rows: number } {
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
    const kept = records.filter((record) => record.trim().length > 0 && !/e2e-cat-/.test(record));
    return { text: `\uFEFF${[header, ...kept].join("\r\n")}\r\n`, rows: kept.length };
  }

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
    const { error: pointerError } = await supabase
      .from("category_tree_pointers")
      .insert({ parent_id: parentId, child_id: data.id, display_order: 0 });
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
    const exported = withoutScratchRows(await response.text());
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
        line({ category_slug: parentSlug, name_en: parentSlug, display_order: "0" }),
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
      const previewCounts = preview.payload["counts"] as Record<string, number>;
      expect(previewCounts, JSON.stringify(preview.payload["refusals"])).toMatchObject({
        adds: 1,
        changes: 1,
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
      const viewer = await createUser({ confirmed: true });
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
      const importer = await createUser({ confirmed: true });
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
});
