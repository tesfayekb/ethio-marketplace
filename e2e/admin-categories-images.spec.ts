import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, stepUpIfPrompted } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  sharedPrefix,
  bandOnly,
  categoryRow,
  findRow,
  action,
  openEditor,
  signInAsSuperAdmin,
  destroyCategory,
  createViaUi,
} from "./helpers/categories";
/**
 * C5 — CATEGORY IMAGERY FROM THE CONSOLE (CI-4, CI-5 bulk).
 *
 * L1 (DEC-037): split out of admin-categories.spec.ts with titles, tags and
 * fixture identities unchanged (INC-159 shard balance).
 */ test.describe("C2 categories console", () => {
  /** DB truth (J4): the imagery columns the route persists. */
  async function readImages(slug: string) {
    const { data, error } = await adminClient()
      .from("categories")
      .select(
        "id, image_url, image_thumb_url, og_image_url, image_generation_prompt, image_accepted_at",
      )
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`[e2e:c5b] reading imagery of ${slug} failed: ${error.message}`);
    return data;
  }

  /**
   * CI-4 (C5e PART B) — THE IMAGE TAB. Generate persists three objects and the
   * row; the preview renders all three; a regenerate produces a NEW VERSIONED
   * set, so all three URLs change. Fake mode only — CI holds no provider key.
   */
  test("CI-4 image tab: generate persists three assets and regenerate re-versions them", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "image").click();
      await expect(page.getByTestId("category-image-dialog")).toBeVisible({ timeout: 20000 });

      await page.getByTestId("category-image-generate").click();
      await expect(page.getByTestId("category-image-assets")).toBeVisible({ timeout: 60000 });
      for (const part of ["card", "thumb", "og"]) {
        await expect(page.getByTestId(`category-image-assets-${part}`)).toBeVisible();
      }
      // C5e PART A — the pipeline demonstrably ran: a done stage with 0ms of
      // processing was the regression's tell, so the timing line is asserted.
      const timings = page.getByTestId("category-image-timings");
      await expect(timings).toBeVisible();
      const processMs = Number(
        /·\s*\d+\/(\d+)\//.exec((await timings.textContent()) ?? "")?.[1] ?? "0",
      );
      expect(processMs, (await timings.textContent()) ?? "").toBeGreaterThan(0);

      await expect
        .poll(async () => (await readImages(slug))?.image_url ?? null, { timeout: 30000 })
        .not.toBeNull();
      const first = await readImages(slug);
      expect(first?.image_thumb_url).toBeTruthy();
      expect(first?.og_image_url).toBeTruthy();

      // C5i PART A — ACCEPT-CLOSES (the shipped flow): accept stamps the row and
      // the dialog closes itself; the badge is then read from STORED truth on
      // reopen, not from the local generation state.
      expect(first?.image_accepted_at).toBeNull();
      await page.getByTestId("category-image-accept").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("category-image-dialog")).toBeHidden({ timeout: 20000 });
      await expect
        .poll(async () => (await readImages(slug))?.image_accepted_at ?? null, { timeout: 30000 })
        .not.toBeNull();

      // Reopen: stored assets render and the accepted badge is present.
      await action(page, slug, "image").click();
      await expect(page.getByTestId("category-image-dialog")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("category-image-assets")).toBeVisible({ timeout: 30000 });
      for (const part of ["card", "thumb", "og"]) {
        await expect(page.getByTestId(`category-image-assets-${part}`)).toBeVisible();
      }
      await expect(page.getByTestId("category-image-accepted-badge")).toBeVisible({
        timeout: 20000,
      });
      // …and no Accept button while the shown generation is the accepted one.
      await expect(page.getByTestId("category-image-accept")).toBeHidden();

      // C5c PART C.3 — the console sends no prompt any more: the house prompt is
      // code truth, so the column stays NULL after a house generation.
      await page.getByTestId("category-image-generate").click();
      await expect
        .poll(async () => (await readImages(slug))?.image_generation_prompt ?? null, {
          timeout: 60000,
        })
        .toBeNull();
      // C5e PART B — VERSIONED: all three URLs must CHANGE between generations
      // (stronger than "overwrite" — a stale CDN copy can no longer be served).
      await expect
        .poll(async () => (await readImages(slug))?.image_url ?? null, { timeout: 60000 })
        .not.toBe(first?.image_url);
      const second = await readImages(slug);
      expect(second?.image_url).not.toBe(first?.image_url);
      expect(second?.image_thumb_url).not.toBe(first?.image_thumb_url);
      expect(second?.og_image_url).not.toBe(first?.og_image_url);
      // …and a NEW generation un-accepts: acceptance is per-generation, so the
      // badge disappears and Accept returns on the fresh assets (C5i PART A).
      expect(second?.image_accepted_at).toBeNull();
      await expect(page.getByTestId("category-image-accepted-badge")).toBeHidden({
        timeout: 20000,
      });
      await expect(page.getByTestId("category-image-accept")).toBeVisible({ timeout: 20000 });
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CI-5 (C5b PART C) — BULK FILL. Three seeded scratch rows without imagery
   * are filled by one serial run; the progress caption reaches n/N and DB truth
   * shows every row gained an image. The 25 cap is asserted as CODE truth
   * (BULK_LIMIT is the slice bound) rather than by seeding 26 fixtures — the
   * cheaper honest proof, stated here so the omission is not silent.
   */
  test(
    "CI-5 bulk fill: the missing-assets run fills every seeded row @global-state",
    // C5g PART E (INC-155) — the bulk verb walks the whole visible roster and
    // writes imagery, so it is a global-state walk: quarantined non-gating
    // (INC-117 mechanism), still run and still reporting on every push.
    { tag: "@global-state" },
    async ({ page }) => {
      test.info().annotations.push({ type: "global-state", description: "INC-117 / INC-155" });
      // C5c PART A — BUDGET TRUTH. The workload is 3 serial creations plus 3
      // serial generations, each decode → process → watermark → encode → 3
      // uploads → persist. At ~10-20s apiece plus sign-in that exceeds the 60s
      // default, so the budget is stated honestly rather than discovered as a
      // timeout.
      test.setTimeout(120_000);
      bandOnly(page, "desktop");
      const { secret } = await signInAsSuperAdmin(page);
      const slugs: string[] = [];
      // INC-153 (second occurrence) — SCOPING LAW:
      // "specs never assume a globally empty table; they scope their emptiness."
      // The bulk verb runs over the VISIBLE filtered/searched set, so this test
      // narrows the roster to exactly its own three seeded rows before running.
      const bulkDump = async (label: string) => {
        const progress = await page
          .getByTestId("category-bulk-progress")
          .textContent()
          .catch(() => null);
        const summary = await page
          .getByTestId("category-bulk-summary")
          .textContent()
          .catch(() => null);
        // C5f PART B — the failures list is part of the dump: with the service's
        // client-timeout stage, a hang reads as progress=3/3, failures carrying
        // "client-timeout" entries, and db-truth naming the rows the server
        // actually filled — self-explanatory by construction.
        const failures = await page
          .getByTestId("category-bulk-failures")
          .textContent()
          .catch(() => null);
        const truth: string[] = [];
        for (const slug of slugs)
          truth.push(`${slug}=${(await readImages(slug))?.image_url ?? "∅"}`);
        return `[bulk-dump ${label}] progress=${progress ?? "∅"} summary=${summary ?? "∅"} failures=${failures ?? "∅"} rows: ${truth.join(" | ")}`;
      };
      // C5e PART E — BREADCRUMB WATCHDOG. Every awaited line labels itself, and
      // a 110s watchdog (inside the 120s budget) rejects with the whole trail, so
      // a hang names the exact line it hung on instead of dying anonymous.
      const started = Date.now();
      const trail: string[] = [];
      const trace = (label: string) => {
        trail.push(`+${Math.round((Date.now() - started) / 1000)}s ${label}`);
      };
      let armed: ReturnType<typeof setTimeout> | null = null;
      const watchdog = new Promise<never>((_, reject) => {
        armed = setTimeout(() => {
          reject(new Error(`[ci5-watchdog 110s] trail:\n  ${trail.join("\n  ")}`));
        }, 110_000);
      });
      // Playwright fails the test on an unhandled rejection otherwise.
      watchdog.catch(() => {});
      // C5c PART A — the dump is LAZY: it is built inside the failure path only,
      // never on the happy path (six eager dumps cost six DB round-trips a run).
      const lazily = async <T>(label: string, run: () => Promise<T>): Promise<T> => {
        trace(label);
        try {
          return await Promise.race([run(), watchdog]);
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          throw new Error(`${reason}\n${await bulkDump(label)}\n[trail]\n  ${trail.join("\n  ")}`);
        }
      };
      // Every pre-poll interaction is bounded (≤15s) and dumps on failure, so an
      // id mismatch fails loudly here instead of dying silent at the 60s wall.
      const step = async (testid: string, action: (locator: Locator) => Promise<void>) => {
        const locator = page.getByTestId(testid);
        await lazily(`step ${testid}`, async () => {
          await expect.poll(async () => locator.count(), { timeout: 15000 }).toBeGreaterThan(0);
        });
        await lazily(`act ${testid}`, () => action(locator));
      };
      // C5g PART E — the watchdog is raced around the ENTIRE awaited chain, so a
      // hang on a line that is not individually wrapped still rejects with the
      // full breadcrumb trail and the standing dump.
      const chain = async () => {
        for (let index = 0; index < 3; index += 1) {
          slugs.push(await lazily(`seed ${index + 1}/3`, () => createViaUi(page, secret)));
        }
        // The search prefix is the seeder's OWN shared literal prefix, never
        // reconstructed from env.
        const prefix = sharedPrefix(slugs);
        expect(prefix.length).toBeGreaterThan(0);
        await lazily("goto roster", () => gotoReady(page, "/admin/categories"));
        await step("category-missing-filter", (locator) => locator.click());
        await step("category-search", (locator) => locator.fill(prefix));
        await step("category-page-size", async (locator) => {
          await locator.selectOption("100");
        });
        await lazily("visible-set", async () => {
          await expect
            .poll(async () => page.getByRole("table").locator("tbody tr").count(), {
              timeout: 15000,
            })
            .toBe(3);
        });
        for (const slug of slugs) {
          await expect(categoryRow(page, slug)).toBeVisible({ timeout: 15000 });
        }

        // The progress caption is transient (it clears when the run ends), so
        // the highest value it reached is captured while polling.
        let progressSeen = "";
        await step("category-bulk-generate", (locator) => locator.click());

        await lazily("summary", async () => {
          await expect
            .poll(
              async () => {
                const line = await page
                  .getByTestId("category-bulk-progress")
                  .textContent()
                  .catch(() => null);
                if (line) progressSeen = line;
                return (await page.getByTestId("category-bulk-summary").textContent()) ?? "";
              },
              { timeout: 60000 },
            )
            .toContain(`3 ${en["admin.categories.bulk.generated"]}`);
        });
        // C5f PART B — the progress assert fails with the full dump too.
        await lazily("progress-peak", async () => {
          expect(progressSeen).toContain("3/3");
        });

        await lazily("failures", async () => {
          await expect
            .poll(
              async () => (await page.getByTestId("category-bulk-summary").textContent()) ?? "",
              {
                timeout: 15000,
              },
            )
            .toContain(`0 ${en["admin.categories.bulk.failed"]}`);
        });

        for (const slug of slugs) {
          await lazily(`db-truth ${slug}`, async () => {
            await expect
              .poll(async () => (await readImages(slug))?.image_url ?? null, { timeout: 15000 })
              .not.toBeNull();
          });
        }
      };
      try {
        await Promise.race([chain(), watchdog]);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`${reason}\n${await bulkDump("chain")}\n[trail]\n  ${trail.join("\n  ")}`);
      } finally {
        if (armed !== null) clearTimeout(armed);
        for (const slug of slugs) await destroyCategory(slug);
      }
    },
  );
});
