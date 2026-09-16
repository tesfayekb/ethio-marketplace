import { type Locator, type Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { grantRole } from "./helpers/categories";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  useJobSuperAdmin,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * LOCATIONS ERA L2b-C2 — THE COVERAGE CONSOLE (CV-1..CV-6).
 *
 * Identity: the pooled job super admin for consumers (J9). Truth: the service
 * client, never a rendered summary (J4). Anchors: structure and testids, never
 * English text, and tones by attribute (J5).
 *
 * FIXTURES (J1) — `free` is a REAL reference row, so CV-3 restores it in
 * `finally` rather than leaving it edited; CV-5's own plan carries the
 * `e_probe_` prefix and is deleted in `finally` (J3). The door's own shape is
 * `^[a-z_]{2,32}$`, so the axes are spelled in letters, never digits.
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

async function openEditor(page: Page, plan: string) {
  await actionsOf(page, plan).getByTestId(`coverage-edit-${plan}`).click();
  await expect(page.getByTestId("coverage-editor")).toBeVisible({ timeout: 20000 });
}

/** DB truth (J4): the plan row read through the service client. */
async function readPlan(plan: string) {
  const { data, error } = await adminClient()
    .from("coverage_plans")
    .select("plan, max_cities, max_regions, max_countries, allow_everywhere")
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

/** Seeds the test's own plan through the service client (seed before navigate, J7). */
async function seedPlan(plan: string) {
  await destroyPlan(plan);
  const { error } = await adminClient()
    .from("coverage_plans")
    .insert({
      plan,
      max_cities: 1,
      max_regions: 1,
      max_countries: 1,
      allow_everywhere: false,
    });
  if (error) throw new Error(`[e2e:l2b] seeding the plan ${plan} failed: ${error.message}`);
}

test.describe("L2b coverage console", () => {
  test("CV-1 gating: a plain user is refused; the roster renders for a super admin", async ({
    page,
  }) => {
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/coverage");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-section-coverage")).toHaveCount(0);
    await expect(page.getByTestId("coverage-create-open")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/coverage");
    await expect(page.getByTestId("admin-section-coverage")).toBeVisible({ timeout: 20000 });
    await expect(planRow(page, "free")).toBeVisible({ timeout: 20000 });
  });

  test("CV-2 roster: the free plan renders its three limits and its everywhere state", async ({
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
    // L2d — the categories SHAPE: the find group is a direct child of the
    // primitive's toolbar row, no visible label element, the note wraps last.
    const toolbarRow = page.getByTestId("coverage-toolbar-find").locator("..");
    await expect(toolbarRow.locator("> [data-testid='coverage-toolbar-find']")).toHaveCount(1);
    await expect(toolbarRow.locator("label")).toHaveCount(0);
    const last = await toolbarRow.evaluate(
      (node) => node.lastElementChild?.getAttribute("data-testid") ?? "",
    );
    expect(last, "the note is not the toolbar's last child").toBe("coverage-note");
    await expect(page.getByTestId("coverage-note")).toBeVisible();

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
      await stepUpIfPrompted(page, secret);

      await expect.poll(async () => (await readPlan(plan))?.max_cities, { timeout: 20000 }).toBe(3);
      const stored = await readPlan(plan);
      expect(stored?.max_regions).toBe(2);
      expect(stored?.max_countries).toBe(1);
      expect(stored?.allow_everywhere).toBe(true);
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
