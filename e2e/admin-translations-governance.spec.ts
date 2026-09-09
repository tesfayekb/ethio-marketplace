import { readFile } from "node:fs/promises";

import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { FENCE_PREFIX_LIST } from "./global-setup";
import {
  describeStringsPage,
  describeSwitcher,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  waitForHydration,
} from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  langRow,
  actionsOf,
  stringRow,
  slug,
  scratchAxes,
  scratchKey,
  bulkFence,
  approveFence,
  ensureFenceLanguage,
  seedScratchKey,
  reapScratchKey,
  dumpRevisions,
  serializeRevisions,
  signInAsSuperAdmin,
} from "./helpers/translations";
import { isPseudo, PSEUDO_LANG } from "../src/features/admin/translations/pseudo";
/**
 * Phases U4f/U4g/U4i — publication gate, bulk approval, roster order, orphans,
 * export/import and pseudo-localization.
 *
 * L1 (DEC-037): split out of admin-translations.spec.ts with its titles, tags
 * and fixture identities unchanged (INC-159 shard balance).
 *//**
 * U4f (INC-098) — THE PUBLICATION GATE GOVERNS CHOICE, NOT ONLY DATA.
 *
 * The switcher's options must EQUAL the gate's own list (the `languages` public
 * SELECT: enabled_public OR is_base, ordered by sort), the admin-only fence
 * language must never appear, and a forced non-public `?lang=` must render the
 * base language. No real language is toggled by this test: it reads the gate
 * and asserts the UI agrees with it.
 */
test.describe("U4f — publication gate governs language choice", () => {
  test(
    "TR-17: switcher options equal the DB public list; a non-public ?lang falls back",
    { tag: "@global-state" },
    async ({ page }) => {
      test.info().annotations.push({ type: "global-state", description: "INC-117" });
      const supabase = adminClient();
      const { data, error } = await supabase
        .from("languages")
        .select("code, sort")
        .or("enabled_public.eq.true,is_base.eq.true")
        .order("sort", { ascending: true });
      if (error || !data)
        throw new Error(`[e2e:u4f] public language read failed: ${error?.message}`);
      // U4g-30 (INC-117) — FENCES ARE TRANSIENT TEST STATE. A concurrent TR-22
      // publishes its own fence for the duration of its run, so the fence code
      // can appear in the DB list, in the rendered options, or in only one of
      // them depending on when each side was read. It is filtered out of BOTH
      // sides before the set comparison; real languages alone are compared.
      const withoutFences = (codes: string[]) =>
        codes.filter((code) => !FENCE_PREFIX_LIST.some((prefix) => code.startsWith(prefix))).sort();
      // U4g — roster order is now operator-editable (TR-20 moves rows), so the
      // switcher is compared as a SET; ORDER is TR-20's own assertion.
      const expected = withoutFences(data.map((row) => row.code as string));
      expect(expected.length, "the gate must publish at least the base language").toBeGreaterThan(
        0,
      );

      await gotoReady(page, "/");
      await page.getByTestId("language-switcher").click();
      await expect
        .poll(
          async () =>
            withoutFences(
              await page
                .locator("[data-testid^='language-option-']")
                .evaluateAll((nodes) =>
                  nodes.map((n) =>
                    (n.getAttribute("data-testid") ?? "").replace("language-option-", ""),
                  ),
                ),
            ),
          { timeout: 15000, message: "switcher options never matched the gate's public list" },
        )
        .toEqual(expected)
        // U4g-21 (INC-113): a gate-list mismatch dumps the provider snapshot.
        .catch(async (error: unknown) => {
          throw new Error(
            `${error instanceof Error ? error.message : String(error)}\n\n${await describeSwitcher(page)}`,
          );
        });
      await page.keyboard.press("Escape");

      // A forced non-public code is refused: the runtime renders the base language.
      await gotoReady(page, "/?lang=om");
      await expect(page.locator("html")).toHaveAttribute("lang", "en", { timeout: 15000 });
    },
  );
});

/**
 * U4g — BULK APPROVAL, ROSTER ORDER, ORPHANED KEYS.
 *
 * Every mutating case works inside the fence language (INC-097d): approve-all
 * and key sync are SWEEPS by construction, so they may only sweep a surface no
 * other spec — and no operator — depends on.
 */
test.describe("U4g bulk approval, order and orphans", () => {
  test("TR-19 approve-all approves reviewed rows and skips flagged ones @global-state", async ({
    page,
  }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });
    test.setTimeout(120_000);

    const fence = approveFence();
    await ensureFenceLanguage(fence);
    // U4g-6 (INC-101): approve-all is a SWEEP — it owns its own fence so it can
    // never approve TR-12's pending rows in the shared one.
    const supabase = adminClient();
    const base = scratchKey("tr19");
    const reviewed = [`${base}.a`, `${base}.b`, `${base}.c`];
    const flagged = `${base}.flagged`;
    const keys = [...reviewed, flagged];
    for (const key of keys) await seedScratchKey(key, `Approve source ${key}`, fence);
    // Three machine rows waiting for review, one flagged row that must survive.
    const { error: seedError } = await supabase.from("ui_translations").upsert(
      [
        ...reviewed.map((key) => ({
          key,
          lang_code: fence,
          value: `⟪${fence}⟫ pending`,
          status: "machine",
          machine: true,
          flagged: false,
        })),
        {
          key: flagged,
          lang_code: fence,
          value: `⟪${fence}⟫ broken`,
          status: "machine",
          machine: true,
          flagged: true,
          flag_note: "placeholder mismatch",
        },
      ],
      { onConflict: "key,lang_code" },
    );
    if (seedError) throw new Error(`[e2e:u4g] TR-19 seeding failed: ${seedError.message}`);

    try {
      // U4g-20 (INC-112) — NAMED PHASES (J-law). The previous shape was one
      // anonymous 120s budget: the report carried a footer-only snapshot and
      // no indication of which interaction stalled. Every step below owns a
      // budget strictly shorter than the test's, and rethrows with the shared
      // describeStringsPage dump (route + query cache + testid presence).
      const step = async (name: string, body: () => Promise<void>) =>
        test.step(name, async () => {
          try {
            await body();
          } catch (error) {
            throw new Error(
              `${(error as Error).message}\n\n[INC-112] phase: ${name}\n${await describeStringsPage(page)}`,
            );
          }
        });

      let secret = "";
      await step("TR-19 sign-in", async () => {
        const signed = await signInAsSuperAdmin(page);
        secret = signed.secret;
      });

      await step("TR-19 open fence page", async () => {
        // INC-182 (J7) — ANCHOR ON THE SEEDED ROWS, NOT ON PAGE ONE. The fence
        // catalog is a thousand keys deep, so four freshly seeded rows are on
        // no first page by construction. The list's search lives in the URL
        // (`?q=`), so the page is OPENED already narrowed to this test's own
        // scratch prefix: no debounce race, and a reload keeps the anchor.
        await gotoReady(page, `/admin/translations/${fence}?q=${encodeURIComponent(base)}`);
        await expect(page.getByTestId("approve-all-bar")).toBeVisible({ timeout: 20000 });
      });

      await step("TR-19 seed check", async () => {
        // Every seeded row is written BEFORE the page is opened (above), and
        // the page's own rows query must have SEEN all four before the sweep
        // runs — otherwise "approved nothing" is indistinguishable from "never
        // loaded". The poll reloads once per turn (keeping `?q=`) so a query
        // cached before the seed cannot stick.
        await expect
          .poll(
            async () => {
              const present = await Promise.all(
                keys.map((key) => stringRow(page, slug(key)).count()),
              );
              const seen = present.filter((count) => count > 0).length;
              if (seen < keys.length) await page.reload({ waitUntil: "domcontentloaded" });
              return seen;
            },
            {
              timeout: 30000,
              message: "the strings list never rendered all four seeded TR-19 rows",
            },
          )
          .toBe(keys.length);
        // The sweep is server-side over the whole language, so it is started
        // from the narrowed view the seeded rows are provably in.
        await expect(page.getByTestId("approve-all-start")).toBeEnabled({ timeout: 20000 });
      });

      await step("TR-19 approve-all start", async () => {
        await page.getByTestId("approve-all-start").click({ timeout: 15000 });
      });

      await step("TR-19 confirm", async () => {
        await expect(page.getByTestId("approve-all-confirm")).toBeVisible({ timeout: 15000 });
        await page.getByTestId("approve-all-confirm-run").click({ timeout: 15000 });
      });

      await step("TR-19 step-up", async () => {
        await stepUpIfPrompted(page, secret);
      });

      await step("TR-19 summary", async () => {
        await expect(page.getByTestId("approve-all-summary")).toBeVisible({ timeout: 30000 });
      });

      await step("TR-19 poll DB truth", async () => {
        // DB truth per key (J4): reviewed → approved, flagged → untouched.
        for (const key of reviewed) {
          await expect
            .poll(
              async () => {
                const { data, error } = await supabase
                  .from("ui_translations")
                  .select("status, approved_by")
                  .eq("key", key)
                  .eq("lang_code", fence)
                  .maybeSingle();
                if (error) throw new Error(`[e2e:u4g] read failed for ${key}: ${error.message}`);
                return `${data?.status ?? "none"}|${data?.approved_by === null ? "noactor" : "actor"}`;
              },
              { timeout: 20000, message: `TR-19 ${key} never became approved` },
            )
            .toBe("approved|actor");

          // The approval captured its own revision (one per approved row).
          let dump = "unread";
          await expect
            .poll(
              async () => {
                const revisions = await dumpRevisions(key, fence, "[e2e:u4g]");
                dump = serializeRevisions(revisions);
                return revisions.filter((row) => row.action === "approve").length;
              },
              { timeout: 20000, message: `TR-19 expected one approve revision for ${key}` },
            )
            .toBe(1)
            .catch(async (error: unknown) => {
              throw new Error(
                `[e2e:u4g] TR-19 revision mismatch for ${key}:\n${dump}\n` +
                  `(${error instanceof Error ? error.message : String(error)})`,
              );
            });
        }

        const { data: flaggedRow } = await supabase
          .from("ui_translations")
          .select("status, flagged")
          .eq("key", flagged)
          .eq("lang_code", fence)
          .maybeSingle();
        expect(
          `${flaggedRow?.status ?? "none"}|${String(flaggedRow?.flagged)}`,
          "a flagged row is skipped, never approved",
        ).toBe("machine|true");
      });
    } finally {
      for (const key of keys) {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  /**
   * U4g-28 (INC-115e) — GLOBAL-ORDER MUTATIONS RUN IN ONE PROJECT. The roster
   * is a SINGLE global list, not a per-project surface: two projects moving the
   * same fence concurrently race on one row, and an absolute index assertion is
   * then false through no fault of the feature. Move semantics therefore run on
   * desktop-1280 only, and they assert RELATIVE order (the fence lands directly
   * above its former upper neighbour). Mobile keeps TR-20m: controls present
   * and enabled, no move.
   */
  test("TR-20 roster order is operator-editable and persists @global-state", async ({ page }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });

    test.skip(
      test.info().project.name !== "desktop-1280",
      "global order is a single list — one project mutates it",
    );
    test.setTimeout(120_000);

    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();
    const { data: before, error: beforeError } = await supabase
      .from("languages")
      .select("code, sort")
      .order("sort", { ascending: true });
    if (beforeError || !before) {
      throw new Error(`[e2e:u4g] roster read failed: ${beforeError?.message}`);
    }
    const original = before.map((row) => row.code as string);

    // U4g-3 (INC-099b) — order by (sort, code), the app's ordering law; sort
    // alone was ambiguous while every row shared sort = 0.
    // J-law: a poll budget must be STRICTLY shorter than the test budget
    // (30s polls inside a 120s test) so a mismatch asserts with values
    // instead of consuming the test and reporting only a timeout.
    const rosterCodes = async (): Promise<string[]> => {
      const { data } = await supabase
        .from("languages")
        .select("code, sort")
        .order("sort", { ascending: true })
        .order("code", { ascending: true });
      return (data ?? []).map((row) => row.code as string);
    };
    const positionOf = async (code: string) => (await rosterCodes()).indexOf(code);
    /**
     * RELATIVE order (INC-115e): the offset from the fence to its censused
     * neighbour. -1 means the fence sits directly ABOVE the neighbour, +1
     * directly below. A sibling row moving elsewhere in the list cannot change
     * this, where an absolute index would.
     */
    const offsetTo = async (neighbour: string) => {
      const codes = await rosterCodes();
      return codes.indexOf(fence) - codes.indexOf(neighbour);
    };

    try {
      // U4g-6 (INC-101) — NAMED PHASES (J-law): a stall must name the phase it
      // stalled in, so the next report reads "sign-in" / "roster" / "move up"
      // instead of one anonymous 120s timeout.
      const secret = await test.step("TR-20 sign-in", async () => {
        const signed = await signInAsSuperAdmin(page);
        return signed.secret;
      });

      let neighbour = "";
      await test.step("TR-20 roster visible", async () => {
        // U4g-10 (INC-103) — PRECONDITION, not a weakened assertion: the base
        // language is pinned first, so a fence sitting directly beneath it has
        // a legitimately disabled "up" control (Playwright would then wait out
        // the whole budget on the click). Park the fence at the end first.
        // U4g-12 (INC-105) — J-law: FIXTURE WRITES ARE TABLE WRITES. Parking is
        // setup, not the behaviour under test, so it writes `sort` directly on
        // public.languages with the service client instead of borrowing the
        // gated RPC (which would also demand step-up and audit a fake action).
        if ((await positionOf(fence)) <= 1) {
          const { data } = await supabase
            .from("languages")
            .select("code, sort")
            .order("sort", { ascending: true })
            .order("code", { ascending: true });
          const rows = data ?? [];
          const maxSort = rows.reduce((top, row) => Math.max(top, (row.sort as number) ?? 0), 0);
          const { error } = await supabase
            .from("languages")
            .update({ sort: maxSort + 1 })
            .eq("code", fence);
          if (error) throw new Error(`[e2e:u4g] parking the fence failed: ${error.message}`);
        }
        await gotoReady(page, "/admin/translations");
        await expect(langRow(page, fence)).toBeVisible({ timeout: 20000 });
        const codes = await rosterCodes();
        const at = codes.indexOf(fence);
        expect(at, "the fence must be parked with a row above it").toBeGreaterThan(0);
        neighbour = codes[at - 1]!;
      });

      // U4g-15 (INC-106c) — the three sub-phases are named SEPARATELY: click,
      // step-up, poll. A stall now reports which one consumed the budget; a
      // strict-mode or actionability stall lives in "click" and never even
      // reaches the poll's own 30s budget (that is what the earlier anonymous
      // 120s timeout actually was).
      await test.step("TR-20 move up", async () => {
        const up = actionsOf(page, `lang-row-${fence}`).getByTestId(`lang-up-${fence}`);
        await test.step("TR-20 move up · click", async () => {
          await expect(up, "the fence's up control must be enabled before the move").toBeEnabled({
            timeout: 20000,
          });
          await up.click({ timeout: 15000 });
        });
        await test.step("TR-20 move up · step-up", async () => {
          await stepUpIfPrompted(page, secret);
        });
        await test.step("TR-20 move up · poll", async () => {
          await expect
            .poll(() => offsetTo(neighbour), {
              timeout: 30000,
              message: "moving up never placed the fence above its former upper neighbour",
            })
            .toBe(-1);
        });
      });

      await test.step("TR-20 move down", async () => {
        const down = actionsOf(page, `lang-row-${fence}`).getByTestId(`lang-down-${fence}`);
        await test.step("TR-20 move down · click", async () => {
          await expect(down, "the fence's down control must be enabled").toBeEnabled({
            timeout: 20000,
          });
          await down.click({ timeout: 15000 });
        });
        await test.step("TR-20 move down · step-up", async () => {
          await stepUpIfPrompted(page, secret);
        });
        await test.step("TR-20 move down · poll", async () => {
          await expect
            .poll(() => offsetTo(neighbour), {
              timeout: 30000,
              message: "moving down never restored the fence below its neighbour",
            })
            .toBe(1);
        });
      });
    } finally {
      // The roster is shared runtime: put the censused order back verbatim.
      await supabase
        .rpc("admin_set_language_order", { p_codes: original })
        .then(async ({ error }) => {
          if (error) {
            for (const [index, code] of original.entries()) {
              await supabase
                .from("languages")
                .update({ sort: index * 10 })
                .eq("code", code);
            }
          }
        });
    }
  });

  /**
   * TR-20m (U4g-28, INC-115e) — the MOBILE half of the move surface. It proves
   * the reorder controls exist and are actionable at 360px WITHOUT mutating the
   * single global roster (that is TR-20's business, on desktop only).
   */
  test("TR-20m mobile exposes both reorder controls for the parked fence", async ({ page }) => {
    test.skip(
      test.info().project.name === "desktop-1280",
      "global order is a single list — one project mutates it",
    );
    test.setTimeout(120_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();

    // Park the fence away from the pinned base language so its "up" control is
    // legitimately enabled. A fixture write is a table write (INC-105).
    const { data: rows } = await supabase
      .from("languages")
      .select("code, sort")
      .order("sort", { ascending: true })
      .order("code", { ascending: true });
    const codes = (rows ?? []).map((row) => row.code as string);
    if (codes.indexOf(fence) <= 1) {
      const maxSort = (rows ?? []).reduce(
        (top, row) => Math.max(top, (row.sort as number) ?? 0),
        0,
      );
      const { error } = await supabase
        .from("languages")
        .update({ sort: maxSort + 1 })
        .eq("code", fence);
      if (error) throw new Error(`[e2e:u4g] TR-20m parking the fence failed: ${error.message}`);
    }

    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await expect(langRow(page, fence)).toBeVisible({ timeout: 20000 });

    const actions = actionsOf(page, `lang-row-${fence}`);
    const up = actions.getByTestId(`lang-up-${fence}`);
    const down = actions.getByTestId(`lang-down-${fence}`);
    await expect(up, "mobile must expose the up control").toBeVisible({ timeout: 20000 });
    await expect(down, "mobile must expose the down control").toBeVisible({ timeout: 20000 });
    await expect(up, "the parked fence's up control must be enabled").toBeEnabled({
      timeout: 20000,
    });
  });

  test(
    "TR-21 a key missing from the synced catalog is orphaned and excluded",
    { tag: "@global-state" },
    async ({ page }) => {
      test.info().annotations.push({ type: "global-state", description: "INC-117" });
      test.setTimeout(120_000);
      const fence = bulkFence();
      await ensureFenceLanguage(fence);
      const supabase = adminClient();
      const key = scratchKey("tr21");
      await seedScratchKey(key, "Orphan source", fence);
      // sync may only orphan sync-origin keys — INC-105. The seed is a TABLE
      // write through the service client, stamped with the origin the sweep owns.
      {
        const { error } = await supabase
          .from("ui_translations")
          .update({ origin: "sync" })
          .eq("key", key);
        if (error) throw new Error(`[e2e:u4g] stamping ${key} origin failed: ${error.message}`);
      }

      // INC-099 (J-law): fixture reads are TABLE reads through the service
      // client. The gated RPC is the app's seam, never the test's oracle.
      const statOf = async (field: "total" | "orphaned") => {
        const { count, error } = await supabase
          .from("ui_translations")
          .select("key", { count: "exact", head: true })
          .eq("lang_code", fence)
          .eq("orphaned", field === "orphaned");
        if (error) throw new Error(`[e2e:u4g] stats table read failed: ${error.message}`);
        return Number(count ?? 0);
      };

      try {
        const { secret } = await signInAsSuperAdmin(page);
        await gotoReady(page, `/admin/translations/${fence}`);

        // The compiled catalog never contains a scratch key, so the console's own
        // sync is exactly the "payload lacking this key" the law describes.
        const orphanedBefore = await statOf("orphaned");
        await gotoReady(page, "/admin/translations");
        await page.getByTestId("translations-sync-run").click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 60000 });
        // Siblings may fence-seed concurrently, so the count is asserted as a
        // floor; the per-key flag below is the exact truth (J4).
        await expect
          .poll(() => statOf("orphaned"), {
            timeout: 60000,
            message: "the sync never marked the absent key orphaned",
          })
          .toBeGreaterThan(orphanedBefore - 1);

        const { data: orphanRow } = await supabase
          .from("ui_translations")
          .select("orphaned")
          .eq("key", key)
          .eq("lang_code", fence)
          .maybeSingle();
        expect(orphanRow?.orphaned, "the absent key carries the orphan flag").toBe(true);

        // Coverage excludes it, and the console shows it behind its own chip.
        await gotoReady(page, `/admin/translations/${fence}`);
        await expect(page.getByTestId("strings-chip-orphaned")).toContainText(/\d/);
        await page.getByTestId("strings-chip-orphaned").click();
        await page.getByTestId("strings-search").fill(key);
        await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });

        // Re-inserting the key into the catalog view clears the flag (the RPC's
        // own contract): a direct re-sync would need the key in the compiled
        // catalog, so the restoration is proven through the writer's flag reset.
        const { error: restoreError } = await supabase
          .from("ui_translations")
          .update({ orphaned: false })
          .eq("key", key);
        if (restoreError) throw new Error(`[e2e:u4g] restore failed: ${restoreError.message}`);
        await expect
          .poll(() => statOf("total"), {
            timeout: 30000,
            message: "the restored key never returned to the live catalog",
          })
          .toBeGreaterThan(0);
      } finally {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    },
  );

  /**
   * TR-22 (INC-107) — A PUBLISHED LANGUAGE NEVER REQUIRES A COMPILED FILE.
   *
   * The fence language has no `src/i18n/locales/zxx.ts` and never will: it is
   * a DATABASE-only language, exactly the shape an operator creates in the
   * console. Publishing it used to crash every visitor who selected it (the
   * compiled-loader registry was indexed unguarded). The compiled layer for
   * such a language is `{}`, so the chain is compiled.en ▸ {} ▸ DB[zxx].
   *
   * J-laws: the fence stays admin-only outside this test — `enabled_public` is
   * raised HERE and lowered in `finally`. The seeded values are DETERMINISTIC
   * (never axes-stamped) so two projects running this case concurrently write
   * the same bytes and cannot race each other's assertions. The writes are
   * TABLE writes through the service client; the gated RPC is the app's seam.
   */
  test("TR-22 a published DB-only language renders with no compiled catalog @global-state", async ({
    page,
    clientErrors,
  }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });
    test.setTimeout(120_000);

    const supabase = adminClient();
    const fence = bulkFence();
    await ensureFenceLanguage(fence);

    // Three REAL chrome keys, translated inside the fence only. `zxx` is a
    // language no operator and no other spec renders, so these rows are not a
    // mutation of a shared catalog surface (J2/J3).
    const SEEDED = {
      "app.name": "zxx-brand",
      "auth.signIn": "zxx-sign-in",
      "language.label": "zxx-language",
    } as const;
    // Deliberately NOT seeded: the feed heading must fall back to English.
    const unseededHeading = en["feed.heading"].replace("{location}", en["feed.scopeAll"]);

    const publishFence = async (enabled: boolean) => {
      const { error } = await supabase
        .from("languages")
        .update({ enabled_public: enabled })
        .eq("code", fence);
      if (error)
        throw new Error(`[e2e:u4g-17] fence enabled_public=${enabled} failed: ${error.message}`);
    };

    try {
      const { error } = await supabase.from("ui_translations").upsert(
        Object.entries(SEEDED).map(([key, value]) => ({
          key,
          lang_code: fence,
          value,
          status: "approved",
          machine: false,
        })),
        { onConflict: "key,lang_code" },
      );
      if (error) throw new Error(`[e2e:u4g-17] fence seeding failed: ${error.message}`);
      await publishFence(true);

      // 1. The gate's own list now carries the fence, so the switcher lists it.
      await gotoReady(page, "/");
      await page.getByTestId("language-switcher").click();
      const option = page.getByTestId(`language-option-${fence}`);
      await expect(option, "the published fence language is missing from the switcher")
        .toBeVisible({ timeout: 20000 })
        // U4g-21 (INC-113): publication must survive a reload — if the option
        // is absent, the dump says whether the gate list arrived and what it
        // held (a cached gate list is the failure this catches).
        .catch(async (error: unknown) => {
          throw new Error(
            `${error instanceof Error ? error.message : String(error)}\n\n${await describeSwitcher(page)}`,
          );
        });

      // 2. Selecting it must RENDER, not crash: the readiness contract is the
      //    oracle (INC-085f), and the page keeps its hydrated marker.
      await option.click();
      await expect(page.locator("html")).toHaveAttribute("lang", fence, { timeout: 20000 });
      await expect(page.locator("html")).toHaveAttribute("data-app-ready", "1");
      await waitForHydration(page);

      // 3. The seeded keys render their fence values. U4g-29 (INC-116): the
      //    anchor must be visible at BOTH viewports — the wordmark (`app.name`)
      //    is `md+` only, so the sign-in link and the switcher's aria-label are
      //    the assertions. `app.name` stays seeded (the header still resolves
      //    it) but is never the oracle.
      await expect(
        page.getByRole("link", { name: SEEDED["auth.signIn"] }),
        "the seeded sign-in key did not render its DB value",
      ).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("language-switcher")).toHaveAttribute(
        "aria-label",
        SEEDED["language.label"],
      );

      // 4. … and an UNSEEDED key still renders English: a missing compiled
      //    layer is empty, never a hole in the layer beneath (INC-095/INC-107).
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(unseededHeading);
      await expectNoHorizontalOverflow(page);

      // 5. No browser-side throw at any point (law F4 — a crash is never
      //    allowed to hide behind a page that happens to paint).
      expect(
        clientErrors.filter((line) => line.startsWith("pageerror")),
        "the DB-only language threw in the browser",
      ).toEqual([]);
    } finally {
      await publishFence(false);
      await supabase
        .from("ui_translations")
        .delete()
        .eq("lang_code", fence)
        .in("key", Object.keys(SEEDED));
    }
  });

  /**
   * TR-29 (U4i ⑤) — EXPORT → EDIT → IMPORT, the offline-translator round trip.
   *
   * Walk: seed an axes-namespaced scratch key in this project's BULK FENCE,
   * export the fence's catalog as CSV from the browser, rewrite that exact CSV
   * with a translation for the scratch key plus one key that does NOT exist,
   * import it, and assert DATABASE truth per key (J4): the real key lands
   * `edited|false` with the imported value, the invented key is SKIPPED — the
   * importer counts unknown keys, it never invents them.
   *
   * The export is read through the download itself (real bytes, not a mocked
   * blob), so the CSV writer and the CSV reader are proven against each other
   * end to end rather than only in the unit round-trip test.
   */
  test("TR-29 the catalog exports as CSV and a translated CSV imports back", async ({ page }) => {
    test.setTimeout(120_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const key = scratchKey("tr29") + "-io";
    const ghost = scratchKey("tr29") + "-ghost-never-created";
    const source = `Round trip source ${key}`;
    const imported = `⟪io⟫ ${key}`;
    await seedScratchKey(key, source, fence);
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, `/admin/translations/${fence}`);
      // Seed-before-navigate (J7) still needs the list to prove it SEES the row
      // before the export button's bytes mean anything.
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");

      const [download] = await Promise.all([
        page.waitForEvent("download", { timeout: 30000 }),
        page.getByTestId("strings-export-csv").click(),
      ]);
      const exportedPath = await download.path();
      const exported = await readFile(exportedPath, "utf8");
      if (!exported.includes(key)) {
        throw new Error(
          `[e2e:u4i] TR-29 the CSV export omitted ${key}. First 500 bytes:\n${exported.slice(0, 500)}`,
        );
      }

      /**
       * U4i-4 (a) ADDENDUM — EXPORT IS CATALOG-SCOPED (INC-123). The walk
       * exported one PAGE and called it the catalog. The file's data-line count
       * is asserted against the fence language's OWN row count read with the
       * service client (J4): per-key/DB truth, never the console's summary.
       */
      const { count: catalogCount, error: catalogError } = await adminClient()
        .from("ui_translations")
        .select("key", { count: "exact", head: true })
        .eq("lang_code", fence);
      if (catalogError)
        throw new Error(`[e2e:u4i] TR-29 catalog count failed: ${catalogError.message}`);
      const exportedRows = exported.split(/\r?\n/).filter((line) => line.trim() !== "").length - 1;
      expect(
        exportedRows,
        `the CSV export was page-scoped: ${exportedRows} rows for a ${catalogCount ?? 0}-row catalog`,
      ).toBe(catalogCount ?? 0);

      // The operator's edit, expressed as the file they would send back.
      const csv = ["key,source,translation", `${key},"${source}","${imported}"`, `${ghost},"x","y"`]
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      // VISIBILITY only — the localized summary is never the count (J4).
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      await expect
        .poll(
          async () => {
            const { data, error } = await adminClient()
              .from("ui_translations")
              .select("value, status, machine")
              .eq("key", key)
              .eq("lang_code", fence)
              .maybeSingle();
            if (error) throw new Error(`[e2e:u4i] TR-29 read failed: ${error.message}`);
            if (!data) return "missing";
            return `${data.value}|${data.status}|${String(data.machine)}`;
          },
          { timeout: 20000, message: `the CSV import never landed for ${key}` },
        )
        .toBe(`${imported}|edited|false`);

      const { data: ghostRows, error: ghostError } = await adminClient()
        .from("ui_translations")
        .select("key")
        .eq("key", ghost);
      if (ghostError) throw new Error(`[e2e:u4i] TR-29 ghost read failed: ${ghostError.message}`);
      expect(ghostRows ?? [], "the importer invented a key that has no base row").toEqual([]);

      /**
       * U4i-3 (d) ADDENDUM — IMPORTS ARE IDEMPOTENT (INC-122). The row is
       * approved by fiat, then the SAME untouched file is imported again: a
       * round trip that changed nothing must write nothing, so the approval
       * survives and no new revision is captured.
       */
      const { error: approveError } = await adminClient()
        .from("ui_translations")
        .update({ status: "approved" })
        .eq("key", key)
        .eq("lang_code", fence);
      if (approveError) throw new Error(`[e2e:u4i] TR-29 approve failed: ${approveError.message}`);
      const { count: revisionsBefore, error: countError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (countError)
        throw new Error(`[e2e:u4i] TR-29 revision count failed: ${countError.message}`);

      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      const { data: afterRow, error: afterError } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (afterError)
        throw new Error(`[e2e:u4i] TR-29 re-import read failed: ${afterError.message}`);
      expect(
        `${afterRow?.value}|${afterRow?.status}`,
        "an untouched re-import demoted an approved row",
      ).toBe(`${imported}|approved`);
      const { count: revisionsAfter, error: afterCountError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (afterCountError)
        throw new Error(`[e2e:u4i] TR-29 revision recount failed: ${afterCountError.message}`);
      expect(revisionsAfter ?? 0, "an untouched re-import captured a revision").toBe(
        revisionsBefore ?? 0,
      );

      /**
       * U4i-6 (b) ADDENDUM — IDEMPOTENCY IS SERVER LAW (INC-124). The same
       * value with a trailing newline DEFEATS the client comparator, so the row
       * really reaches `admin_import_translations`. The writer normalizes
       * trailing whitespace on both sides and refuses to write: the approval
       * survives and still no revision is captured. Only a true value change
       * demotes.
       */
      const noisyCsv = ["key,source,translation", `${key},"${source}","${imported}\n"`]
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}-noisy.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(noisyCsv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      const { data: noisyRow, error: noisyError } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (noisyError) throw new Error(`[e2e:u4i6] TR-29 noisy read failed: ${noisyError.message}`);
      expect(
        `${noisyRow?.value}|${noisyRow?.status}`,
        "a whitespace-only re-import demoted an approved row (server no-op law)",
      ).toBe(`${imported}|approved`);
      const { count: noisyRevisions, error: noisyCountError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (noisyCountError)
        throw new Error(`[e2e:u4i6] TR-29 noisy recount failed: ${noisyCountError.message}`);
      expect(noisyRevisions ?? 0, "a whitespace-only re-import captured a revision").toBe(
        revisionsBefore ?? 0,
      );
    } finally {
      await adminClient().from("ui_translation_revisions").delete().eq("key", key);
      await reapScratchKey(key);
      await adminClient().from("ui_translations").delete().eq("key", ghost);
    }
  });

  /**
   * TR-32 (U4i-7) — AN IMPORT IS A TRANSACTION YOU CAN TAKE BACK (INC-125).
   *
   * Inside this project's BULK FENCE (J2), two axes-namespaced scratch keys are
   * seeded with a prior value and a prior STATUS (one approved, one edited), a
   * CSV changes both, and the summary's `data-batch` carries the run's batch id.
   * Undo restores value AND status per key — read with the service client (J4),
   * never from the rendered counts. Then a second import is partly overwritten
   * by a later edit: undo restores the untouched row and reports the other as
   * conflicted, leaving the later work exactly as it stands.
   */
  test("TR-32 an import is undoable while nothing has touched the rows", async ({ page }) => {
    test.setTimeout(150_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const keyA = scratchKey("tr32") + "-a";
    const keyB = scratchKey("tr32") + "-b";
    const priorA = `⟪undo⟫ prior A ${keyA}`;
    const priorB = `⟪undo⟫ prior B ${keyB}`;
    await seedScratchKey(keyA, `Undo source ${keyA}`, fence);
    await seedScratchKey(keyB, `Undo source ${keyB}`, fence);

    const readRow = async (key: string) => {
      const { data, error } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (error) throw new Error(`[e2e:u4i7] TR-32 read failed for ${key}: ${error.message}`);
      return `${data?.value ?? "missing"}|${data?.status ?? "missing"}`;
    };

    const importCsv = async (secret: string, rows: [string, string][], name: string) => {
      const csv = ["key,source,translation"]
        .concat(rows.map(([key, value]) => `${key},"src","${value}"`))
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      const summary = page.getByTestId("strings-transfer-summary");
      await expect(summary).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      // The batch id is the SERVER's, surfaced on the summary the operator sees.
      await expect(page.getByTestId("strings-import-undo")).toBeVisible({ timeout: 20000 });
      const batch = await summary.getAttribute("data-batch");
      expect(batch, "the import summary carried no batch id").toBeTruthy();
      return batch as string;
    };

    try {
      const { secret } = await signInAsSuperAdmin(page);
      // PRIOR STATE, seeded before navigating (J7): the approval is what an undo
      // has to bring back — a restore that loses the status is not a restore.
      const { error: seedError } = await adminClient()
        .from("ui_translations")
        .upsert(
          [
            { key: keyA, lang_code: fence, value: priorA, status: "approved", machine: false },
            { key: keyB, lang_code: fence, value: priorB, status: "edited", machine: false },
          ],
          { onConflict: "key,lang_code" },
        );
      if (seedError) throw new Error(`[e2e:u4i7] TR-32 seed failed: ${seedError.message}`);

      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(keyA);
      await expect(stringRow(page, slug(keyA))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");

      const batch = await importCsv(
        secret,
        [
          [keyA, `⟪undo⟫ imported A`],
          [keyB, `⟪undo⟫ imported B`],
        ],
        `${fence}-undo.csv`,
      );
      expect(batch.length, "the batch id is not a uuid").toBeGreaterThan(30);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the import never landed for both keys",
        })
        .toBe(`⟪undo⟫ imported A|edited::⟪undo⟫ imported B|edited`);

      await page.getByTestId("strings-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-undo-result")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the undo did not restore both rows to their exact prior value and status",
        })
        .toBe(`${priorA}|approved::${priorB}|edited`);

      // CONFLICT — later work is never overwritten.
      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(keyA);
      await expect(stringRow(page, slug(keyA))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");
      await importCsv(
        secret,
        [
          [keyA, `⟪undo⟫ second A`],
          [keyB, `⟪undo⟫ second B`],
        ],
        `${fence}-undo-2.csv`,
      );
      await expect
        .poll(async () => await readRow(keyB), {
          timeout: 20000,
          message: "the second import never landed",
        })
        .toBe(`⟪undo⟫ second B|edited`);

      const later = `⟪undo⟫ later hand edit ${keyB}`;
      const { error: laterError } = await adminClient()
        .from("ui_translations")
        .update({ value: later })
        .eq("key", keyB)
        .eq("lang_code", fence);
      if (laterError) throw new Error(`[e2e:u4i7] TR-32 later edit failed: ${laterError.message}`);

      await page.getByTestId("strings-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-undo-result")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the conflicted undo did not restore exactly one row",
        })
        .toBe(`${priorA}|approved::${later}|edited`);
    } finally {
      for (const key of [keyA, keyB]) {
        await adminClient().from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  /**
   * TR-31 (U4i-4 (b)) — DELETING A LANGUAGE, typed confirm and all four tables.
   *
   * NOT @global-state (J6): the language is created by this test, named across
   * every parallelism axis (run × shard × project × worker), touched by nobody
   * else and deleted by the flow under test — so it runs in the matrix.
   *
   * Walk: service-create the scratch language admin-only, seed two UI rows in
   * it, then drive the OPERATOR's path — roster → "Delete language…" → typed
   * code → step-up → confirm — and assert DB truth per table (J4): the roster
   * row is gone and all four tables hold zero rows for the code.
   */
  test("TR-31 a scratch language deletes with a typed confirm and leaves no rows", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const supabase = adminClient();
    // 2–8 alnum subtag, every axis inside it (J1).
    const suffix = `${scratchAxes("tr31")}`
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .slice(-8);
    const code = `zzq-${suffix}`;
    const keys = [`${scratchKey("tr31")}-d1`, `${scratchKey("tr31")}-d2`];

    const { error: langError } = await supabase.from("languages").upsert(
      {
        code,
        name_en: `E2E Scratch ${code}`,
        name_native: "E2E",
        enabled_admin: true,
        enabled_public: false,
      },
      { onConflict: "code" },
    );
    if (langError) throw new Error(`[e2e:u4i4] TR-31 language create failed: ${langError.message}`);
    for (const key of keys) await seedScratchKey(key, `Delete source ${key}`, code);

    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations");
      // Seed-before-navigate (J7): the roster must SHOW the row before the
      // delete flow's assertions mean anything.
      await expect(langRow(page, code)).toBeVisible({ timeout: 20000 });

      // U4i-5 (1) — the roster renders the delete control ONCE PER TWIN via the
      // primitive's single rowActions slot (same law as INC-106b), so a bare
      // `lang-delete-…` resolves to two elements. Every row action routes
      // through the viewport-aware twin helper (J5).
      await actionsOf(page, `lang-row-${code}`).getByTestId(`lang-delete-${code}`).click();
      await expect(page.getByTestId(`lang-delete-counts-${code}`)).toBeVisible({ timeout: 20000 });
      const submit = page.getByTestId(`lang-delete-submit-${code}`);
      // The gate itself: nothing is armed until the code is typed.
      await expect(submit).toBeDisabled();
      await page.getByTestId(`lang-delete-confirm-${code}`).fill(code);
      await expect(submit).toBeEnabled();
      await submit.click();

      /**
       * U4i-6 (a) ADDENDUM — STEP-UP OWNS THE TOP LAYER (INC-124). When the
       * gate opens it must be USABLE while the delete dialog stays open
       * beneath: the code input is visible AND holds focus. If the session is
       * already AAL2 no gate opens — a legitimate outcome, so the assertions
       * are conditional on the modal appearing (the helper below covers both).
       */
      const stepUp = page.getByTestId("step-up-modal");
      const armed = await stepUp
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      if (armed) {
        await expect(page.getByTestId("step-up-code")).toBeVisible();
        await expect(page.getByTestId("step-up-code")).toBeFocused();
        await expect(page.getByTestId(`lang-delete-counts-${code}`)).toBeVisible();
      }
      await stepUpIfPrompted(page, secret);

      await expect(langRow(page, code)).toHaveCount(0, { timeout: 30000 });

      for (const table of [
        "ui_translations",
        "entity_translations",
        "ui_translation_revisions",
        "translator_languages",
      ] as const) {
        await expect
          .poll(
            async () => {
              const { count, error } = await supabase
                .from(table)
                .select("lang_code", { count: "exact", head: true })
                .eq("lang_code", code);
              if (error) throw new Error(`[e2e:u4i4] TR-31 ${table} read failed: ${error.message}`);
              return count ?? 0;
            },
            { timeout: 20000, message: `${table} still holds rows for ${code}` },
          )
          .toBe(0);
      }
      const { data: languagesRow, error: langReadError } = await supabase
        .from("languages")
        .select("code")
        .eq("code", code)
        .maybeSingle();
      if (langReadError)
        throw new Error(`[e2e:u4i4] TR-31 language read failed: ${langReadError.message}`);
      expect(languagesRow, "the languages row survived its own deletion").toBeNull();
    } finally {
      // Idempotent residue sweep: the flow under test normally did all of this.
      for (const key of keys) {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await supabase.from("ui_translations").delete().eq("key", key);
      }
      await supabase.from("languages").delete().eq("code", code);
    }
  });

  /**
   * TR-30 (U4i ⑦) — PSEUDO-LOCALIZATION, and the publication refusal.
   *
   * This test fills the RESERVED `zxa` language for the whole base catalog, so
   * it is global state by construction (J6): it runs in ONE project and carries
   * the @global-state quarantine tag (INC-117). `zxa` is not a fence — it is a
   * product surface with a server rule of its own — so it is left in place
   * afterwards exactly as the operator would leave it, admin-only.
   *
   * Two halves:
   *  A. every filled row is `machine`, unapproved, pseudo-bracketed (⟪…⟫) and LONGER than
   *     its source (the whole point: it shows truncation before a real
   *     translation exists);
   *  B. the roster REFUSES to publish `zxa` — the server rule, not a hidden
   *     button — and the language stays unpublished in the database.
   */
  test(
    "TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state",
    { tag: "@global-state" },
    async ({ page }) => {
      test.skip(
        test.info().project.name !== "desktop-1280",
        "J6: zxa is global state — one project only",
      );
      test.info().annotations.push({
        type: "global-state",
        description: "INC-117 quarantined global-state test",
      });
      test.setTimeout(300_000);

      const { secret } = await signInAsSuperAdmin(page);
      // A key whose EN source exists for certain: the probe is a REAL catalog
      // key, read-only to this spec (J2) — pseudo rows live in zxa alone.
      const probe = "admin.translations.title";

      // U4i-3 (e): the pseudo tool lives on the Languages roster and confirms.
      await gotoReady(page, "/admin/translations");
      await page.getByTestId("pseudo-generate").click();
      await page.getByTestId("pseudo-generate-confirm-action").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-pseudo-summary")).toBeVisible({ timeout: 240_000 });
      await expect(page.getByTestId("strings-pseudo-error")).toHaveCount(0);

      const { data: baseRow, error: baseError } = await adminClient()
        .from("ui_translations")
        .select("value")
        .eq("key", probe)
        .eq("lang_code", "en")
        .maybeSingle();
      if (baseError) throw new Error(`[e2e:u4i] TR-30 base read failed: ${baseError.message}`);
      const baseValue = baseRow?.value ?? "";
      expect(baseValue, `[e2e:u4i] TR-30 probe key ${probe} has no EN source`).not.toBe("");

      await expect
        .poll(
          async () => {
            const { data, error } = await adminClient()
              .from("ui_translations")
              .select("value, status, machine")
              .eq("key", probe)
              .eq("lang_code", PSEUDO_LANG)
              .maybeSingle();
            if (error) throw new Error(`[e2e:u4i] TR-30 pseudo read failed: ${error.message}`);
            if (!data) return "missing";
            const value = data.value ?? "";
            return [
              data.status,
              String(data.machine),
              String(isPseudo(value)),
              String(value.length > baseValue.length),
            ].join("|");
          },
          { timeout: 30000, message: `pseudo text never landed for ${probe}` },
        )
        .toBe("machine|true|true|true");

      // B. THE REFUSAL. The roster's publish control is the operator's only
      //    path, and the server rule stands behind it.
      await gotoReady(page, "/admin/translations");
      // INC-182 (J5) — the roster renders BOTH twins, so the publish switch
      // exists twice: it is read through the viewport's own row, never bare.
      const publish = langRow(page, PSEUDO_LANG).getByTestId(`lang-public-${PSEUDO_LANG}`);
      await expect(publish).toBeVisible({ timeout: 20000 });
      if (await publish.isEnabled()) {
        await publish.click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("lang-flags-error")).toBeVisible({ timeout: 20000 });
      } else {
        // Disabled is a legal refusal too, but only WITH its stated reason.
        await expect(
          langRow(page, PSEUDO_LANG).getByTestId(`lang-public-gate-${PSEUDO_LANG}`),
        ).toBeVisible();
      }

      const { data: lang, error: langError } = await adminClient()
        .from("languages")
        .select("enabled_public, enabled_admin")
        .eq("code", PSEUDO_LANG)
        .maybeSingle();
      if (langError) throw new Error(`[e2e:u4i] TR-30 language read failed: ${langError.message}`);
      expect(lang?.enabled_public, "zxa reached the public switcher").toBe(false);
      expect(lang?.enabled_admin).toBe(true);
    },
  );
});
