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

async function scales(page: Page, panel: Locator): Promise<string[]> {
  // Poll on truth (J7): every opening animation on the panel has finished.
  await expect
    .poll(() => panel.evaluate((el) => el.getAnimations().every((a) => a.playState === "finished")))
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
  expect((await scales(page, panel)).filter(hasScale)).toEqual([]);
  // A nested TooltipTrigger also writes data-state. aria-expanded belongs to
  // the list trigger itself, and OPEN_CONTROL deliberately supports it.
  await expect(control).toHaveAttribute("aria-expanded", "true");
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

/** D267 — the chrome's inner edges, read in the page from the `data-chrome` markers. */
async function chromeEdges(page: Page) {
  return page.evaluate(() => {
    const shown = (edge: string) =>
      Array.from(document.querySelectorAll<HTMLElement>(`[data-chrome="${edge}"]`))
        .filter((el) => {
          const style = getComputedStyle(el);
          const placed =
            edge === "top" || style.position === "fixed" || style.position === "sticky";
          return placed && style.display !== "none" && el.getBoundingClientRect().height > 0;
        })
        .map((el) => el.getBoundingClientRect());
    const tops = shown("top");
    const bottoms = shown("bottom");
    return {
      top: tops.length > 0 ? Math.max(...tops.map((r) => r.bottom)) : 0,
      bottom: Math.min(window.innerHeight, ...bottoms.map((r) => r.top)),
    };
  });
}

type Spot = "centred" | "near the top" | "near the bottom";
const SPOTS: Spot[] = ["centred", "near the top", "near the bottom"];

/** D267 — scroll the page so the control sits where the walk leaves it. */
async function placeControl(page: Page, control: Locator, spot: Spot) {
  const edges = await chromeEdges(page);
  await control.evaluate(
    (el, { spot, edges }) => {
      const rect = el.getBoundingClientRect();
      const target =
        spot === "centred"
          ? window.innerHeight / 2 - rect.height / 2
          : spot === "near the top"
            ? edges.top + 16
            : edges.bottom - rect.height - 16;
      window.scrollBy({ top: rect.top - target, behavior: "instant" });
    },
    { spot, edges },
  );
}

/** D267 — the open list lies wholly inside the visible area, and its first and last rows are
 *  reached (scrolled to inside the list, each the element drawn at its own centre). */
async function expectInSight(page: Page, panel: Locator, rows: Locator, inChrome?: Locator) {
  await expect(panel).toBeVisible();
  const { box } = await layoutBoxes({ box: panel });
  const edges = await chromeEdges(page);
  // A control drawn in the top chrome itself (the header) opens over the bands below it:
  // its list's top bound is the control's own bottom edge.
  if (inChrome !== undefined) {
    const { control } = await layoutBoxes({ control: inChrome });
    edges.top = Math.min(edges.top, control.y + control.height);
  }
  expect(box.y, "the list's top under the top chrome").toBeGreaterThanOrEqual(edges.top - 0.5);
  expect(box.y + box.height, "the list's bottom over the bottom chrome").toBeLessThanOrEqual(
    edges.bottom + 0.5,
  );
  const reached = await rows.evaluateAll((all) =>
    [all[0], all[all.length - 1]].map((el) => {
      if (el === undefined) return false;
      el.scrollIntoView({ block: "nearest", behavior: "instant" });
      const r = el.getBoundingClientRect();
      const at = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return at !== null && (at === el || el.contains(at));
    }),
  );
  expect(reached, "the list's first and last rows are reachable").toEqual([true, true]);
  const after = await chromeEdges(page);
  after.top = Math.min(after.top, edges.top);
  const { box: still } = await layoutBoxes({ box: panel });
  expect(still.y).toBeGreaterThanOrEqual(after.top - 0.5);
  expect(still.y + still.height).toBeLessThanOrEqual(after.bottom + 0.5);
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
      for (const spot of SPOTS) {
        test(`CL-E7 the currency list stays in sight, ${spot} (${width}, ${mode})`, async ({
          page,
        }) => {
          test.skip(width !== 360, "D267 is judged at 360 coarse");
          await toPricing(page);
          const control = page.getByTestId("post-price-currency-search");
          await placeControl(page, control, spot);
          await control.click();
          await expect(control).toHaveAttribute("data-state", "open");
          await expectInSight(
            page,
            page.getByTestId("post-price-currency-list"),
            page.getByTestId("post-price-currency-option"),
          );
        });
      }

      test(`CL-E8 the phone-code list stays in sight (${width}, ${mode})`, async ({ page }) => {
        test.skip(width !== 360, "D267 is judged at 360 coarse");
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
        const control = page.getByTestId(`${id}-country`);
        const list = page.getByTestId(`${id}-country-list`);
        for (const spot of SPOTS) {
          await test.step(spot, async () => {
            await placeControl(page, control, spot);
            await control.click();
            await expect(control).toHaveAttribute("data-state", "open");
            await expectInSight(page, list.locator(".."), page.getByTestId(`${id}-country-option`));
            await page.keyboard.press("Escape");
            await expect(list).toBeHidden();
          });
        }
      });

      test(`CL-E9 the facade menus stay in sight (${width}, ${mode})`, async ({ page }) => {
        test.skip(width !== 360, "D267 is judged at 360 coarse");
        const panel = page.getByRole("menu");
        // The header's menus: the header is fixed, so they open from the top.
        const language = page.getByTestId("language-switcher");
        await language.click();
        await expectInSight(page, panel, page.getByRole("menuitemradio"), language);
        await closeMenu(page, panel);
        for (const spot of ["near the top", "near the bottom"] as const) {
          await test.step(`location, ${spot}`, async () => {
            const control = page.getByTestId("location-level-country");
            await placeControl(page, control, spot);
            await control.click();
            await expectInSight(page, panel, page.getByRole("menuitemradio"));
            await closeMenu(page, panel);
          });
        }
        await gotoReady(page, "/dev/style");
        for (const spot of ["near the top", "near the bottom"] as const) {
          await test.step(`row actions, ${spot}`, async () => {
            const control = page.getByTestId("style-row-1-more");
            const menu = page.getByTestId("style-row-1-menu");
            await placeControl(page, control, spot);
            await control.click();
            await expectInSight(page, menu, menu.getByRole("menuitem"));
            await closeMenu(page, menu);
          });
        }
        const user = await leaseUser();
        await signIn(page, user.email, user.password);
        await gotoReady(page, "/");
        const account = page.getByTestId("account-menu");
        await account.click();
        await expectInSight(page, panel, page.getByRole("menuitem"), account);
        await closeMenu(page, panel);
      });
    });
  }
}
