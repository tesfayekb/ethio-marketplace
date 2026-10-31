import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, isMobile, layoutBoxes, signIn, signInViaSession } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { withoutEmptyLayers } from "./helpers/shadows";
import { purgeListingObjects } from "./helpers/photos";
import { waitForServedTree, waitForTreeSlug } from "./helpers/locations";
import {
  activeCityOf,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  leaseSeller,
  nextToStep,
  pickCity,
  seedPostableCategory,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * CL-E (D264, Foundations turn F, Sage §14) — every list of choices that opens from a control
 * opens against its control, at least as wide, without a scale, on the menu surface, with the
 * menu's rows; the control shows its open state. Each width runs in its own project
 * (360 → mobile-360, 1440 → desktop-1280).
 * Turn F2 adds the row-actions menu (CL-E4), the currency picker (CL-E5) and the phone-code
 * picker (CL-E6), and the current row heard as checked with its tick (CL-E2, CL-E3; INC-1027).
 */
type Mode = "light" | "dark";
const MODES: Mode[] = ["light", "dark"];
const WIDTHS = [360, 1440];

async function openAt(page: Page, width: number, mode: Mode) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
}

/** The token's computed value, read through a probe so it compares like for like. */
async function tokenValue(page: Page, cssVar: string, property: string) {
  return page.evaluate(
    ({ cssVar, property }) => {
      const probe = document.createElement("div");
      probe.style.setProperty(property, `var(${cssVar})`);
      document.body.append(probe);
      const value = getComputedStyle(probe).getPropertyValue(property);
      probe.remove();
      return value;
    },
    { cssVar, property },
  );
}

/** The panels a list may draw: the facade's popper wrapper, or a picker's own listbox. */
const PANELS = '[data-radix-popper-content-wrapper] > *, [data-placement][class*="rounded-menu"]';

/** Samples every panel's transform on every frame of its opening: never a scale. */
async function sampleOpening(page: Page) {
  await page.evaluate((panels) => {
    const w = window as unknown as { __clScales: string[] };
    w.__clScales = [];
    const started = performance.now();
    const tick = () => {
      document
        .querySelectorAll<HTMLElement>(panels)
        .forEach((el) => w.__clScales.push(getComputedStyle(el).transform));
      if (performance.now() - started < 400) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, PANELS);
}

async function scales(page: Page): Promise<string[]> {
  // Poll on truth (J7): every opening animation on the panel has finished.
  await expect
    .poll(() =>
      page.evaluate(
        (panels) =>
          Array.from(document.querySelectorAll(panels)).every((el) =>
            el.getAnimations().every((a) => a.playState === "finished"),
          ),
        PANELS,
      ),
    )
    .toBe(true);
  return page.evaluate(() => (window as unknown as { __clScales: string[] }).__clScales);
}

function hasScale(transform: string): boolean {
  if (transform === "none") return false;
  const m = /matrix\(([^)]+)\)/.exec(transform);
  if (!m) return true;
  const [a, b, c, d] = m[1].split(",").map(Number);
  return Math.abs(Math.hypot(a, b) - 1) > 0.001 || Math.abs(Math.hypot(c, d) - 1) > 0.001;
}

type Judged = {
  control: Locator;
  panel: Locator;
  rows: Locator;
  open?: () => Promise<void>;
  close?: () => Promise<void>;
};

async function judge(page: Page, width: number, list: Judged) {
  const { control, panel, rows } = list;
  await sampleOpening(page);
  await (list.open ? list.open() : control.click());
  await expect(panel).toBeVisible();
  expect((await scales(page)).filter(hasScale)).toEqual([]);
  await expect(control).toHaveAttribute("data-state", "open");
  const want = await tokenValue(page, "--nav-pill", "background-color");
  expect(await control.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(want);

  const count = await rows.count();
  expect(count).toBeGreaterThan(0);
  // INC-940 — one settled read of the control, the panel and every row (layoutBoxes).
  const targets: Record<string, Locator> = { control, panel };
  for (let i = 0; i < count; i++) targets[`row${i}`] = rows.nth(i);
  const boxes = await layoutBoxes(targets);
  const c = boxes["control"];
  const p = boxes["panel"];
  if (c === undefined || p === undefined) throw new Error("layoutBoxes: the control or panel");
  const below = p.y >= c.y;
  const gap = below ? p.y - (c.y + c.height) : c.y - (p.y + p.height);
  expect(Math.abs(gap)).toBeLessThanOrEqual(1);
  expect(p.width).toBeGreaterThanOrEqual(c.width - 0.5);
  expect(p.x).toBeGreaterThanOrEqual(16 - 0.5);
  expect(p.x + p.width).toBeLessThanOrEqual(width - 16 + 0.5);

  const look = await panel.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      radius: s.borderTopLeftRadius,
      padding: s.paddingTop,
      shadow: s.boxShadow,
      bg: s.backgroundColor,
      border: s.borderTopWidth,
    };
  });
  expect(look.radius).toBe("14px");
  expect(look.padding).toBe("6px");
  expect(look.border).toBe("0px");
  // The ring is the shadow's first layer (ruling 2): equal to the theme's --lift-menu.
  expect(withoutEmptyLayers(look.shadow)).toBe(
    withoutEmptyLayers(await tokenValue(page, "--lift-menu", "box-shadow")),
  );
  expect(look.bg).toBe(await tokenValue(page, "--popover", "background-color"));

  for (let i = 0; i < count; i++) {
    const row = boxes[`row${i}`];
    if (row === undefined) throw new Error(`layoutBoxes: row ${i}`);
    if (width < 768) expect(row.height).toBeGreaterThanOrEqual(44);
    else expect(Math.abs(row.height - 40)).toBeLessThanOrEqual(0.5);
  }
}

/** INC-1027 — the open radio list's current row is heard (aria-checked) and carries the tick. */
async function expectCurrentHeard(page: Page) {
  const checked = page.getByRole("menuitemradio", { checked: true });
  await expect(checked).toHaveCount(1);
  await expect(checked.locator("svg.lucide-check")).toBeVisible();
}

async function closeMenu(page: Page, panel: Locator) {
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`choice lists at ${width}, ${mode}`, () => {
      const sellers: string[] = [];
      const categories: string[] = [];
      const objects: Array<{ userId: string; listingId: string }> = [];

      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          width < 768 !== (testInfo.project.name === "mobile-360"),
          "each width uses its pointer project",
        );
        await openAt(page, width, mode);
      });

      // J3 — an afterEach survives a body timeout.
      test.afterEach(async ({ page }) => {
        await stopPageBeforePurge(page);
        for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
        for (const id of sellers.splice(0)) await destroyListingsOf(id);
        for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
      });

      /** The posting walk as a seller walks it, to the price step (step 4). */
      async function toPricing(page: Page) {
        const user = await leaseSeller();
        sellers.push(user.id);
        // DEC-068 — the residency fact comes from the edge; supplied here as the edge does.
        for (const path of ["**/api/listings/**", "**/api/geo"])
          await page.route(path, (route) =>
            route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } }),
          );
        await signInViaSession(page, user.email, user.password);
        const category = await seedPostableCategory();
        categories.push(category.slug);
        await gotoReady(page, "/post");
        await page.getByTestId("post-category-search").fill(category.slug);
        const hit = page.locator(
          `[data-testid="post-category-hit"][data-category="${category.id}"]`,
        );
        await expect(hit).toBeVisible();
        await hit.click();
        await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
        const [draft] = await draftsOf(user.id);
        const listingId = String(draft?.id ?? "");
        expect(listingId, "step 1 created no draft").not.toBe("");
        objects.push({ userId: user.id, listingId });
        await page.getByTestId("post-next").click();
        await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
        await page.getByTestId("post-next").click();
        await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
        await expect(page.getByTestId("post-price-currency")).toHaveAttribute("data-code", "ETB", {
          timeout: 20_000,
        });
      }

      test(`CL-E1 the language list (${width}, ${mode})`, async ({ page }) => {
        const panel = page.getByRole("menu");
        await judge(page, width, {
          control: page.getByTestId("language-switcher"),
          panel,
          rows: page.getByRole("menuitemradio"),
        });
        await expectCurrentHeard(page);
        await closeMenu(page, panel);
      });

      test(`CL-E2 the location list (${width}, ${mode})`, async ({ page }) => {
        const panel = page.getByRole("menu");
        await judge(page, width, {
          control: page.getByTestId("location-level-country"),
          panel,
          rows: page.getByRole("menuitemradio"),
        });
        await expectCurrentHeard(page);
        await closeMenu(page, panel);
      });

      test(`CL-E3 the account list and the panel switch (${width}, ${mode})`, async ({ page }) => {
        const user = await leaseUser();
        await signIn(page, user.email, user.password);
        await gotoReady(page, "/");
        const panel = page.getByRole("menu");
        // The header holds the one account menu at every width (app-header.tsx).
        const account = page.getByTestId("account-menu");
        await expect(account).toBeVisible();
        await judge(page, width, { control: account, panel, rows: page.getByRole("menuitem") });
        await closeMenu(page, panel);
        if (!isMobile(page)) {
          // From md the panel switch heads the rail; below md the bottom bar replaces it.
          await judge(page, width, {
            control: page.getByTestId("panel-header-switcher"),
            panel,
            rows: page.getByRole("menuitemradio"),
          });
          await expectCurrentHeard(page);
          await closeMenu(page, panel);
        }
      });

      test(`CL-E4 the row-actions menu (${width}, ${mode})`, async ({ page }) => {
        await gotoReady(page, "/dev/style");
        const panel = page.getByTestId("style-row-1-menu");
        await judge(page, width, {
          control: page.getByTestId("style-row-1-more"),
          panel,
          rows: panel.getByRole("menuitem"),
        });
        await closeMenu(page, panel);
      });

      test(`CL-E5 the currency picker (${width}, ${mode})`, async ({ page }) => {
        await toPricing(page);
        const control = page.getByTestId("post-price-currency-search");
        await judge(page, width, {
          control,
          panel: page.getByTestId("post-price-currency-list"),
          rows: page.getByTestId("post-price-currency-option"),
        });
        await expect(
          page
            .getByTestId("post-price-currency-option")
            .and(page.locator('[aria-selected="true"]')),
        ).toHaveCount(1);
      });

      test(`CL-E6 the phone-code picker (${width}, ${mode})`, async ({ page }) => {
        test.slow();
        await toPricing(page);
        await page.getByTestId("post-price-mode-free").click();
        await nextToStep(page, 5);
        await page.getByTestId("post-title").fill("e2e listing title");
        await page.getByTestId("post-description").fill("e2e listing description");
        await nextToStep(page, 6);
        const city = await activeCityOf("ET");
        await waitForServedTree("ET", city.slug);
        await waitForTreeSlug(page, "ET", city.slug);
        await expect(page.getByTestId("post-where-region")).toBeVisible();
        await pickCity(page, city);
        await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1", {
          timeout: 20_000,
        });
        await nextToStep(page, 7);
        const id = "post-who-value-phone";
        const list = page.getByTestId(`${id}-country-list`);
        await judge(page, width, {
          control: page.getByTestId(`${id}-country`),
          panel: list.locator(".."),
          rows: page.getByTestId(`${id}-country-option`),
        });
      });
    });
  }
}
