import { type Locator, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";

import { grantRole } from "./helpers/categories";
import {
  awaitGuardedOutcome,
  expectNoHorizontalOverflow,
  gotoReady,
  settled,
  stepUpIfPrompted,
  switchUser,
  useJobSuperAdmin,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * LOCATIONS ERA L2b-C2 — THE COVERAGE CONSOLE (CV-1..CV-8); P-1 — Admin › Plans
 * (CV-9..CV-12: the ad lifetime, the ads quota, the label key).
 *
 * Identity: the pooled job super admin for consumers (J9). Truth: the service
 * client, never a rendered summary (J4). Anchors: structure and testids, never
 * English text, and tones by attribute (J5).
 *
 * FIXTURES (J1 / J3, R-CV) — `free` is a REAL reference row, so NO test mutates
 * it: CV-2 and CV-6 only READ it, while CV-3, CV-4 and CV-5 each seed their OWN
 * plan through the service client and delete it in `finally`. Every scratch plan
 * carries the `e_probe_` prefix and is namespaced run × worker × project × test,
 * so both twins run every case at once (J6 needs no single-project fence here).
 * The door's shape is `^[a-z_]{2,32}$`, so the axes are spelled in letters.
 */

const TWIN_BOUNDARY = 1024;

function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

function planRow(page: Page, plan: string): Locator {
  const id = `coverage-${plan}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-card` : id);
}

function actionsOf(page: Page, plan: string): Locator {
  const id = `coverage-${plan}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-actions` : `${id}-actions-cell`);
}

/** Bundle 11 B1 — the row's Edit icon (RowActions). */
async function openEditor(page: Page, plan: string) {
  await actionsOf(page, plan).getByTestId(`coverage-actions-${plan}-edit`).click();
  await expect(page.getByTestId("coverage-editor")).toBeVisible({ timeout: 20000 });
  await settled(page);
}

/** DB truth (J4): the plan row read through the service client. */
async function readPlan(plan: string) {
  const { data, error } = await adminClient()
    .from("coverage_plans")
    .select(
      "plan, max_cities, max_regions, max_countries, max_photos, allow_everywhere, default_days, max_active_ads, label_key",
    )
    .eq("plan", plan)
    .maybeSingle();
  if (error) throw new Error(`[e2e:l2b] reading the plan ${plan} failed: ${error.message}`);
  return data;
}

/**
 * LETTERS ONLY — the door refuses a digit, so every axis is spelled out. The
 * `tag` axis keeps each test on its OWN plan (R-CV): no test mutates a real
 * reference row, and two projects running at once never read each other's
 * writes (J3 / J6).
 */
function scratchPlan(tag: string, project: string): string {
  const letters = (value: string) =>
    value
      .split("")
      .map((char) => {
        const digit = Number(char);
        return Number.isFinite(digit) && /[0-9]/.test(char)
          ? "abcdefghij"[digit]
          : /[a-z]/.test(char.toLowerCase())
            ? char.toLowerCase()
            : "_";
      })
      .join("");
  const run = letters(process.env["E2E_SHARD"] ?? "local");
  const worker = letters(process.env["TEST_WORKER_INDEX"] ?? "0");
  const twin = letters(project);
  return `e_probe_${tag}_${run}_${worker}_${twin}`.replace(/_+$/, "").slice(0, 32);
}

async function destroyPlan(plan: string) {
  if (!plan.startsWith("e_probe_")) throw new Error(`[e2e:l2b] refusing to delete ${plan}`);
  await adminClient().from("coverage_plans").delete().eq("plan", plan);
}

/**
 * Seeds the test's own plan through the service client (seed before navigate, J7).
 * P-1 — the row carries a label key (the editor requires one) and, when given,
 * a quota; the lifetime takes the column's default (30).
 */
async function seedPlan(plan: string, dials: { maxActiveAds?: number } = {}) {
  await destroyPlan(plan);
  const { error } = await adminClient()
    .from("coverage_plans")
    .insert({
      plan,
      max_cities: 1,
      max_regions: 1,
      max_countries: 1,
      allow_everywhere: false,
      label_key: `plan.${plan}`,
      ...(dials.maxActiveAds === undefined ? {} : { max_active_ads: dials.maxActiveAds }),
    });
  if (error) throw new Error(`[e2e:l2b] seeding the plan ${plan} failed: ${error.message}`);
}

/** P-1 — the door's audit rows for one plan (`coverage.plan.update`, old → new). */
async function planAudits(plan: string) {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("action,meta")
    .eq("entity_type", "coverage_plan")
    .eq("entity_id", plan)
    .eq("action", "coverage.plan.update");
  if (error) throw new Error(`[e2e:l2b] audit read failed: ${error.message}`);
  return (data ?? []) as Array<{ action: string; meta: Record<string, unknown> }>;
}

test.describe("L2b coverage console", () => {
  test("CV-1 gating: a plain user is refused; the roster renders for a super admin", async ({
    page,
  }) => {
    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/coverage");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-section-coverage")).toHaveCount(0);
    await expect(page.getByTestId("coverage-create-open")).toHaveCount(0);

    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/coverage");
    await expect(page.getByTestId("admin-section-coverage")).toBeVisible({ timeout: 20000 });
    await expect(planRow(page, "free")).toBeVisible({ timeout: 20000 });
  });

  test("CV-2 roster: the free plan renders its three limits and its everywhere state, on the agreed toolbar", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/coverage");
    const row = planRow(page, "free");
    await expect(row).toBeVisible({ timeout: 20000 });

    const stored = await readPlan("free");
    expect(stored?.max_cities).toBe(1);
    expect(stored?.max_regions).toBe(1);
    expect(stored?.max_countries).toBe(1);
    expect(stored?.allow_everywhere).toBe(false);

    await expect(row.getByTestId("coverage-free-cities")).toHaveText(String(stored?.max_cities));
    await expect(row.getByTestId("coverage-free-regions")).toHaveText(String(stored?.max_regions));
    await expect(row.getByTestId("coverage-free-countries")).toHaveText(
      String(stored?.max_countries),
    );
    await expect(row.getByTestId("coverage-free-everywhere")).toBeVisible();
    // Bundle 11 B1 — the agreed toolbar: search, then Columns (no filter on
    // this table); the note under it; the header holds New plan; the footer
    // holds the page size.
    const toolbar = page.getByTestId("coverage-toolbar");
    await expect(toolbar.getByTestId("coverage-search")).toBeVisible();
    await expect(toolbar.getByTestId("coverage-columns")).toBeVisible();
    await expect(toolbar.locator("select")).toHaveCount(0);
    await expect(page.getByTestId("data-table-toolbar").getByTestId("coverage-note")).toBeVisible();
    await expect(
      page.getByTestId("coverage-header").getByTestId("coverage-create-open"),
    ).toBeVisible();
    await expect(page.getByTestId("coverage-pagination-size")).toHaveValue("25");

    // Columns hides "photos", and the row loses it; shown again after.
    await page.getByTestId("coverage-columns").click();
    await expect(page.getByTestId("coverage-columns-plan")).toBeDisabled();
    await page.getByTestId("coverage-columns-photos").click();
    await page.keyboard.press("Escape");
    await expect(row.getByTestId("coverage-free-photos")).toHaveCount(0);
    await page.getByTestId("coverage-columns").click();
    await page.getByTestId("coverage-columns-photos").click();
    await page.keyboard.press("Escape");
    await expect(row.getByTestId("coverage-free-photos")).toBeVisible();

    // The search sieves the one read in the browser.
    await page.getByTestId("coverage-search").fill("free");
    await expect(planRow(page, "free")).toBeVisible();
    await page.getByTestId("coverage-search").fill("");
    await expectNoHorizontalOverflow(page);
  });

  test("CV-3 edit: the test's own plan is saved through the door and read back", async ({
    page,
  }, testInfo) => {
    // R-CV: this test owns its plan, so it runs on BOTH projects and never
    // touches the real `free` row (J3).
    const { secret } = await useJobSuperAdmin(page);
    const plan = scratchPlan("edit", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
      await openEditor(page, plan);
      await page.getByTestId("coverage-editor-cities").fill("3");
      await page.getByTestId("coverage-editor-regions").fill("2");
      await page.getByTestId("coverage-editor-countries").fill("1");
      await page.getByTestId("coverage-editor-everywhere").check();
      await page.getByTestId("coverage-editor-save").click();
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readPlan(plan))?.max_cities === 3,
          describe: `CV-3: coverage_plans.max_cities = 3 for ${plan}`,
        },
        { timeout: 30000 },
      );

      await expect.poll(async () => (await readPlan(plan))?.max_cities, { timeout: 20000 }).toBe(3);
      const stored = await readPlan(plan);
      expect(stored?.max_regions).toBe(2);
      expect(stored?.max_countries).toBe(1);
      expect(stored?.allow_everywhere).toBe(true);
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-7 photo cap: the plan's photo cap round-trips through the door (D22)", async ({
    page,
  }, testInfo) => {
    // D22 — the cap the posting document hands the photos step is edited HERE,
    // and this test owns its own plan, so the real `free` row is untouched (J3).
    const { secret } = await useJobSuperAdmin(page);
    const plan = scratchPlan("photos", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
      await expect(planRow(page, plan).getByTestId(`coverage-${plan}-photos`)).toBeVisible();
      await openEditor(page, plan);
      await page.getByTestId("coverage-editor-photos").fill("3");
      await page.getByTestId("coverage-editor-save").click();
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readPlan(plan))?.max_photos === 3,
          describe: `CV-7: coverage_plans.max_photos = 3 for ${plan}`,
        },
        { timeout: 30000 },
      );
      await expect.poll(async () => (await readPlan(plan))?.max_photos, { timeout: 20000 }).toBe(3);
      await expect(planRow(page, plan).getByTestId(`coverage-${plan}-photos`)).toHaveText("3", {
        timeout: 20000,
      });

      // The door's bound is the authority; the surface refuses 31 by name and
      // the stored cap stays at 3 (F3/F4).
      await openEditor(page, plan);
      await page.getByTestId("coverage-editor-photos").fill("31");
      await page.getByTestId("coverage-editor-save").click();
      await expect(page.getByTestId("coverage-editor-error")).toBeVisible({ timeout: 20000 });
      expect((await readPlan(plan))?.max_photos).toBe(3);
      await page.getByTestId("coverage-dialog-cancel").click();
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-4 refusal: a limit below one is refused by name and nothing is saved", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const plan = scratchPlan("deny", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
      await openEditor(page, plan);
      await page.getByTestId("coverage-editor-cities").fill("0");
      await page.getByTestId("coverage-editor-save").click();

      await expect(page.getByTestId("coverage-editor-error")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("coverage-editor")).toBeVisible();
      expect((await readPlan(plan))?.max_cities).toBe(1);
      await page.getByTestId("coverage-dialog-cancel").click();
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-5 add: a scratch plan is created through the door and seen in the roster", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const plan = scratchPlan("add", testInfo.project.name);

    try {
      await destroyPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, "free")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("coverage-create-open").click();
      await expect(page.getByTestId("coverage-create-dialog")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("coverage-create-plan").fill(plan);
      await page.getByTestId("coverage-create-cities").fill("2");
      await page.getByTestId("coverage-create-regions").fill("2");
      await page.getByTestId("coverage-create-countries").fill("2");
      await page.getByTestId("coverage-create-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect.poll(async () => (await readPlan(plan))?.plan, { timeout: 20000 }).toBe(plan);
      const stored = await readPlan(plan);
      expect(stored?.max_cities).toBe(2);
      expect(stored?.allow_everywhere).toBe(false);
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
    } finally {
      await destroyPlan(plan);
    }
  });

  // ───────────── P-1 (D279, D283) — ADMIN › PLANS: THE THREE DIALS (CV-9..CV-12) ─────────────
  // Each test owns its plan (R-CV); the real `free` row is only ever read. The door
  // `admin_set_coverage_plan` is the authority: a refusal is shown by its own name and
  // writes nothing; a save is proven on the stored row and its audit row (old → new).

  test("CV-9 roster: a plan's ad lifetime, its quota (Unlimited) and its label key are columns; Columns hides the label", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const plan = scratchPlan("dials", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      const row = planRow(page, plan);
      await expect(row).toBeVisible({ timeout: 20000 });
      const stored = await readPlan(plan);
      expect(stored?.default_days).toBe(30);
      expect(stored?.max_active_ads).toBeNull();
      await expect(row.getByTestId(`coverage-${plan}-days`)).toHaveText("30");
      await expect(row.getByTestId(`coverage-${plan}-ads`)).toHaveText(
        en["admin.coverage.unlimited"],
      );
      await expect(row.getByTestId(`coverage-${plan}-label`)).toHaveText(`plan.${plan}`);

      await page.getByTestId("coverage-columns").click();
      await page.getByTestId("coverage-columns-label").click();
      await page.keyboard.press("Escape");
      await expect(row.getByTestId(`coverage-${plan}-label`)).toHaveCount(0);
      await page.getByTestId("coverage-columns").click();
      await page.getByTestId("coverage-columns-label").click();
      await page.keyboard.press("Escape");
      await expect(row.getByTestId(`coverage-${plan}-label`)).toBeVisible();
      await expectNoHorizontalOverflow(page);
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-10 edit: lifetime 45, quota 20 and a label key are saved through the door, read back, and audited old → new", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const plan = scratchPlan("save", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
      await openEditor(page, plan);
      await expect(page.getByTestId("coverage-editor-days")).toHaveValue("30");
      await expect(page.getByTestId("coverage-editor-ads-unlimited")).toBeChecked();
      await expect(page.getByTestId("coverage-editor-ads")).toBeDisabled();
      await expect(page.getByTestId("coverage-editor-label")).toHaveValue(`plan.${plan}`);
      await page.getByTestId("coverage-editor-days").fill("45");
      await page.getByTestId("coverage-editor-ads-unlimited").uncheck();
      await page.getByTestId("coverage-editor-ads").fill("20");
      await page.getByTestId("coverage-editor-label").fill(`plan.${plan}.two`);
      await page.getByTestId("coverage-editor-save").click();
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readPlan(plan))?.default_days === 45,
          describe: `CV-10: coverage_plans.default_days = 45 for ${plan}`,
        },
        { timeout: 30000 },
      );
      await expect(page.getByTestId("coverage-editor")).toHaveCount(0, { timeout: 20000 });
      const stored = await readPlan(plan);
      expect(stored?.default_days).toBe(45);
      expect(stored?.max_active_ads).toBe(20);
      expect(stored?.label_key).toBe(`plan.${plan}.two`);
      // INC-188 — the save kept the limits it did not show changed.
      expect(stored?.max_cities).toBe(1);
      expect(stored?.max_photos).toBe(10);
      const row = planRow(page, plan);
      await expect(row.getByTestId(`coverage-${plan}-days`)).toHaveText("45", { timeout: 20000 });
      await expect(row.getByTestId(`coverage-${plan}-ads`)).toHaveText("20");
      await expect(row.getByTestId(`coverage-${plan}-label`)).toHaveText(`plan.${plan}.two`);

      const audits = await planAudits(plan);
      expect(audits).toHaveLength(1);
      expect(audits[0]?.meta["old"]).toMatchObject({
        default_days: 30,
        max_active_ads: null,
        label_key: `plan.${plan}`,
      });
      expect(audits[0]?.meta["new"]).toMatchObject({
        default_days: 45,
        max_active_ads: 20,
        label_key: `plan.${plan}.two`,
      });
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-11 refusal: a lifetime of 0, a quota of 0 and a bad label key are each refused by name; nothing is saved", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const plan = scratchPlan("refuse", testInfo.project.name);
    try {
      await seedPlan(plan);
      await gotoReady(page, "/admin/coverage");
      await expect(planRow(page, plan)).toBeVisible({ timeout: 20000 });
      await openEditor(page, plan);
      const error = page.getByTestId("coverage-editor-error");

      await page.getByTestId("coverage-editor-days").fill("0");
      await page.getByTestId("coverage-editor-save").click();
      await expect(error).toHaveText(en["admin.coverage.error.badDefaultDays"], {
        timeout: 20000,
      });
      await page.getByTestId("coverage-editor-days").fill("30");

      await page.getByTestId("coverage-editor-ads-unlimited").uncheck();
      await page.getByTestId("coverage-editor-ads").fill("0");
      await page.getByTestId("coverage-editor-save").click();
      await expect(error).toHaveText(en["admin.coverage.error.badMaxActiveAds"]);
      await page.getByTestId("coverage-editor-ads-unlimited").check();

      await page.getByTestId("coverage-editor-label").fill("Plan Name");
      await page.getByTestId("coverage-editor-save").click();
      await expect(error).toHaveText(en["admin.coverage.error.badLabelKey"]);

      // A blank number is refused, never read as 0 (ruling 1, answer 10).
      await page.getByTestId("coverage-editor-label").fill(`plan.${plan}`);
      await page.getByTestId("coverage-editor-days").fill("");
      await page.getByTestId("coverage-editor-save").click();
      await expect(error).toHaveText(en["admin.coverage.error.badDefaultDays"]);

      await expect(page.getByTestId("coverage-editor")).toBeVisible();
      const stored = await readPlan(plan);
      expect(stored?.default_days).toBe(30);
      expect(stored?.max_active_ads).toBeNull();
      expect(stored?.label_key).toBe(`plan.${plan}`);
      expect(await planAudits(plan)).toHaveLength(0);
      await page.getByTestId("coverage-dialog-cancel").click();
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-12 Unlimited clears a quota through the door; the roster says so", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const plan = scratchPlan("quota", testInfo.project.name);
    try {
      await seedPlan(plan, { maxActiveAds: 5 });
      await gotoReady(page, "/admin/coverage");
      const row = planRow(page, plan);
      await expect(row).toBeVisible({ timeout: 20000 });
      await expect(row.getByTestId(`coverage-${plan}-ads`)).toHaveText("5");
      await openEditor(page, plan);
      await expect(page.getByTestId("coverage-editor-ads")).toHaveValue("5");
      await expect(page.getByTestId("coverage-editor-ads-unlimited")).not.toBeChecked();
      await page.getByTestId("coverage-editor-ads-unlimited").check();
      await expect(page.getByTestId("coverage-editor-ads")).toBeDisabled();
      await page.getByTestId("coverage-editor-save").click();
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readPlan(plan))?.max_active_ads === null,
          describe: `CV-12: coverage_plans.max_active_ads is null for ${plan}`,
        },
        { timeout: 30000 },
      );
      expect((await readPlan(plan))?.max_active_ads).toBeNull();
      await expect(row.getByTestId(`coverage-${plan}-ads`)).toHaveText(
        en["admin.coverage.unlimited"],
        { timeout: 20000 },
      );
      const audits = await planAudits(plan);
      expect(audits).toHaveLength(1);
      expect(audits[0]?.meta["old"]).toMatchObject({ max_active_ads: 5 });
      expect(audits[0]?.meta["new"]).toMatchObject({ max_active_ads: null });
    } finally {
      await destroyPlan(plan);
    }
  });

  test("CV-6 geometry: nothing overflows and the editor's controls are on screen", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/coverage");
    await expect(planRow(page, "free")).toBeVisible({ timeout: 20000 });
    await expectNoHorizontalOverflow(page);

    const scroller = await page.evaluate(() => {
      const node = document.querySelector('[data-testid="data-table-scroller"]');
      return node === null
        ? null
        : { scrollWidth: node.scrollWidth, clientWidth: node.clientWidth };
    });
    if (scroller !== null) {
      expect(scroller.scrollWidth).toBeLessThanOrEqual(scroller.clientWidth);
    }

    await openEditor(page, "free");
    const boxes = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return {
        width,
        boxes: [
          ...document.querySelectorAll(
            '[data-testid^="coverage-editor-"],[data-testid="coverage-dialog-cancel"]',
          ),
        ].map((node) => {
          const box = node.getBoundingClientRect();
          return { left: Math.round(box.left), right: Math.round(box.right) };
        }),
      };
    });
    for (const box of boxes.boxes) {
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(boxes.width);
    }
    await page.getByTestId("coverage-dialog-cancel").click();
    await expectNoHorizontalOverflow(page);
  });
});

/**
 * CV-8 — bundle 12 turn T14: the browser roles read every column of the plans
 * table except updated_by, which no screen shows. Anonymous and signed-in reads
 * of the plan's own columns answer; a read naming updated_by, or every column,
 * is refused (42501). Every read asks for a plan no row has, so no row is read.
 */
test.describe("L2b coverage plans — the browser's columns", () => {
  test("CV-8 the browser roles read the plan's own columns, never updated_by", async () => {
    const url = process.env["E2E_SUPABASE_URL"] ?? "";
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
    expect(url !== "" && key !== "", "CV-8 the staging address and key are set").toBe(true);
    const none = "e_probe_none";
    const own =
      "plan, max_cities, max_regions, max_countries, max_photos, allow_everywhere, default_days, max_active_ads, label_key, updated_at";

    const anon = createClient(url, key, { auth: { persistSession: false } });
    const plain = await leaseUser();
    const signedIn = createClient(url, key, { auth: { persistSession: false } });
    const { error: signInError } = await signedIn.auth.signInWithPassword({
      email: plain.email,
      password: plain.password,
    });
    expect(
      signInError,
      `CV-8 the account did not sign in: ${signInError?.message ?? ""}`,
    ).toBeNull();

    for (const [who, client] of [
      ["anon", anon],
      ["signed-in", signedIn],
    ] as const) {
      const ownRead = await client.from("coverage_plans").select(own).eq("plan", none);
      expect(ownRead.error, `CV-8 ${who}: the plan's own columns were refused`).toBeNull();
      expect(ownRead.data, `CV-8 ${who}: a plan no row has was found`).toEqual([]);
      const hidden = await client.from("coverage_plans").select("updated_by").eq("plan", none);
      expect(hidden.error?.code, `CV-8 ${who}: updated_by was readable`).toBe("42501");
      const every = await client.from("coverage_plans").select("*").eq("plan", none);
      expect(every.error?.code, `CV-8 ${who}: every column was readable`).toBe("42501");
    }
  });
});
