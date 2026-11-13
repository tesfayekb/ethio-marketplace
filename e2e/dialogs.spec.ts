import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { fillOf, isRedFill } from "./helpers/colors";
import { layoutOf } from "./helpers/layout";
import { expectPicturesFit } from "./helpers/pictures";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  bearerOf,
  completeDraft,
  destroyListingsOf,
  destroyPostableCategory,
  leaseSeller,
  postRoute,
  seedPostableCategory,
  stopPageBeforePurge,
} from "./helpers/posting";
import { withoutEmptyLayers } from "./helpers/shadows";
import { gotoReady, layoutBoxes, settled, signInViaSession, stillPage } from "./helpers/ui";
import { listingPath } from "../src/features/ad-page/address";

/**
 * CF-DIALOG-1's browser half (turn S6-1, Sage §14, the operator's D268) — every dialog, alert
 * dialog and sheet draws one look from src/components/ui/dialog-look.ts. Measured on /dev/style's
 * specimens (ruling 13) and on Share this ad, in light and dark, at 390 (mobile-360) and at 834
 * and 1440 (desktop-1280). Every colour and shadow is compared with its token through a probe,
 * so the light and dark values are judged alike.
 */
type Mode = "light" | "dark";
const MODES: Mode[] = ["light", "dark"];

function widthsOf(page: Page): number[] {
  return layoutOf(page) === "mobile" ? [390] : [834, 1440];
}

async function openStyle(page: Page, width: number, mode: Mode) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
  await gotoReady(page, "/dev/style");
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
}

/** A token's computed value, read through a probe so it compares like for like. */
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

type Look = {
  radius: [string, string, string, string];
  padding: [string, string, string, string];
  shadow: string;
  background: string;
  color: string;
  fontSize: string;
  fontWeight: string;
};

async function lookOf(locator: Locator): Promise<Look> {
  const look = await locator.evaluate((element) => {
    const s = getComputedStyle(element);
    return {
      radius: [
        s.borderTopLeftRadius,
        s.borderTopRightRadius,
        s.borderBottomRightRadius,
        s.borderBottomLeftRadius,
      ],
      padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft],
      shadow: s.boxShadow,
      background: s.backgroundColor,
      color: s.color,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
    } satisfies Look;
  });
  return { ...look, shadow: withoutEmptyLayers(look.shadow) };
}

/** A shadow list's layers, split at its top-level commas. */
function layersOf(shadow: string): string[] {
  const layers: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < shadow.length; i += 1) {
    const ch = shadow[i];
    if (ch === "(") depth += 1;
    else if (ch === ")") depth -= 1;
    else if (ch === "," && depth === 0) {
      layers.push(shadow.slice(start, i).trim());
      start = i + 1;
    }
  }
  layers.push(shadow.slice(start).trim());
  return layers;
}

/** The panel's own look: the dialog radius and padding, the dialog shadow with its ring first. */
async function expectPanel(page: Page, panel: Locator, where: string) {
  const look = await lookOf(panel);
  expect(look.padding, `${where} padding`).toEqual(["22px", "24px", "22px", "24px"]);
  expect(look.shadow, `${where} shadow`).toBe(
    await tokenValue(page, "--lift-dialog", "box-shadow"),
  );
  const layers = layersOf(look.shadow);
  expect(layers.length, `${where} shadow layers`).toBe(3);
  expect(layers[0], `${where} the first layer is the ring`).toMatch(/ 0px 0px 0px 1px$/);
  expect(look.background, `${where} surface`).toBe(
    await tokenValue(page, "--popover", "background-color"),
  );
  const scrim = page.locator("[data-dialog-scrim][data-state='open']");
  await expect(scrim).toHaveCount(1);
  expect(await fillOf(scrim), `${where} scrim`).toBe(
    await tokenValue(page, "--scrim", "background-color"),
  );
  return look;
}

async function expectHeading(page: Page, panel: Locator, where: string) {
  const title = await lookOf(panel.getByRole("heading", { level: 2 }));
  expect([title.fontSize, title.fontWeight], `${where} title`).toEqual(["20px", "800"]);
  const id = await panel.getAttribute("aria-describedby");
  expect(id, `${where} described`).not.toBeNull();
  const text = await lookOf(page.locator(`[id="${id}"]`));
  expect(text.fontSize, `${where} description size`).toBe("14px");
  expect(text.color, `${where} description ink`).toBe(
    await tokenValue(page, "--muted-foreground", "color"),
  );
}

async function expectFooterRule(page: Page, footer: Locator, where: string) {
  expect((await lookOf(footer)).shadow, `${where} footer divider`).toBe(
    await tokenValue(page, "--lift-rule-top", "box-shadow"),
  );
}

async function expectClose(close: Locator, width: number, where: string) {
  const { box } = await layoutBoxes({ box: close });
  const size = width < 768 ? 44 : 40;
  expect([Math.round(box.width), Math.round(box.height)], `${where} close size`).toEqual([
    size,
    size,
  ]);
}

/** The area a fixed panel is laid out in (the viewport without a scrollbar). */
async function clientSize(page: Page) {
  return page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }));
}

async function open(page: Page, trigger: string, panel: string) {
  await page.getByTestId(trigger).click();
  const opened = page.getByTestId(panel);
  await expect(opened).toBeVisible();
  await settled(page);
  return opened;
}

test.describe("one dialog look (turn S6-1)", () => {
  test("DLG-E1 a dialog: panel, scrim, heading, close, footer, choice rows and a field", async ({
    page,
  }) => {
    for (const width of widthsOf(page))
      for (const mode of MODES) {
        const where = `dialog @ ${width} ${mode}`;
        await openStyle(page, width, mode);
        const panel = await open(page, "style-dialog-open", "style-dialog");
        const look = await expectPanel(page, panel, where);
        expect(look.radius, `${where} radius`).toEqual(["20px", "20px", "20px", "20px"]);
        await expectHeading(page, panel, where);
        await expectClose(page.getByTestId("style-dialog-close"), width, where);
        await expectFooterRule(page, page.getByTestId("style-dialog-footer"), where);
        const chosen = page.getByTestId("style-dialog-choice-spam");
        const other = page.getByTestId("style-dialog-choice-scam");
        const rows = await layoutBoxes({ chosen, other });
        const floor = width < 768 ? 44 : 40;
        expect(rows.chosen.height, `${where} chosen row height`).toBeGreaterThanOrEqual(floor);
        expect(rows.other.height, `${where} row height`).toBeGreaterThanOrEqual(floor);
        const on = await lookOf(chosen);
        expect(on.shadow, `${where} chosen ring`).toBe(
          await tokenValue(page, "--lift-choice-on", "box-shadow"),
        );
        expect(on.background, `${where} chosen fill`).toBe(
          await tokenValue(page, "--nav-pill", "background-color"),
        );
        expect((await lookOf(other)).shadow, `${where} a row not chosen has no ring`).not.toBe(
          on.shadow,
        );
        const field = await lookOf(page.getByTestId("style-dialog-field"));
        expect(field.background, `${where} field fill`).toBe(
          await tokenValue(page, "--field", "background-color"),
        );
        expect(field.shadow, `${where} field inset`).toBe(
          await tokenValue(page, "--lift-field", "box-shadow"),
        );
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
      }
  });

  test("DLG-E2 an alert dialog: the same panel and heading, no close button, a red action", async ({
    page,
  }) => {
    for (const width of widthsOf(page))
      for (const mode of MODES) {
        const where = `alert @ ${width} ${mode}`;
        await openStyle(page, width, mode);
        const panel = await open(page, "style-alert-open", "style-alert");
        const look = await expectPanel(page, panel, where);
        expect(look.radius, `${where} radius`).toEqual(["20px", "20px", "20px", "20px"]);
        await expectHeading(page, panel, where);
        await expect(panel.getByRole("button"), `${where} Cancel and the action only`).toHaveCount(
          2,
        );
        await expectFooterRule(page, page.getByTestId("style-alert-footer"), where);
        const action = await fillOf(page.getByTestId("style-alert-action"));
        expect(isRedFill(action), `${where} the action is red: ${action}`).toBe(true);
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
      }
  });

  test("DLG-E3 a sheet from the end edge and from the bottom: its edge, corners and grabber", async ({
    page,
  }) => {
    for (const width of widthsOf(page))
      for (const mode of MODES) {
        await openStyle(page, width, mode);
        for (const side of ["end", "bottom"] as const) {
          const where = `sheet ${side} @ ${width} ${mode}`;
          const panel = await open(page, `style-sheet-${side}-open`, `style-sheet-${side}`);
          const look = await expectPanel(page, panel, where);
          await expectHeading(page, panel, where);
          await expectClose(page.getByTestId(`style-sheet-${side}-close`), width, where);
          const { sheet } = await layoutBoxes({ sheet: panel });
          const view = await clientSize(page);
          if (side === "end") {
            expect(Math.round(sheet.x + sheet.width), `${where} on the end edge`).toBe(view.width);
            const corner = width >= 640 ? "20px" : "0px";
            expect(look.radius, `${where} corners`).toEqual([corner, "0px", "0px", corner]);
            await expect(panel.locator("[data-dialog-grabber]")).toHaveCount(0);
          } else {
            expect(Math.round(sheet.y + sheet.height), `${where} on the bottom edge`).toBe(
              view.height,
            );
            expect(look.radius, `${where} corners`).toEqual(["20px", "20px", "0px", "0px"]);
            await expect(panel.locator("[data-dialog-grabber]")).toBeVisible();
          }
          await page.keyboard.press("Escape");
          await expect(panel).toBeHidden();
        }
      }
  });

  test("DLG-E5 focus goes in on open and back to the trigger on Escape; the page does not move", async ({
    page,
  }) => {
    const [width = 390] = widthsOf(page);
    await openStyle(page, width, "light");
    for (const [trigger, id, first] of [
      ["style-dialog-open", "style-dialog", "a choice"],
      ["style-sheet-end-open", "style-sheet-end", "the field"],
    ] as const) {
      await page.getByTestId(trigger).scrollIntoViewIfNeeded();
      const before = await page.evaluate(() => window.scrollY);
      const { at } = await layoutBoxes({ at: page.getByTestId(trigger) });
      const panel = await open(page, trigger, id);
      const inside = await panel.evaluate((el) => {
        const active = document.activeElement;
        return {
          within: active !== null && el.contains(active),
          field: active?.getAttribute("data-testid") ?? "",
          radio: active?.getAttribute("role") === "radio",
        };
      });
      expect(inside.within, `${id}: the focus is inside`).toBe(true);
      if (first === "the field") expect(inside.field).toBe("style-sheet-end-field");
      else expect(inside.radio, `${id}: the focus is on the chosen choice`).toBe(true);
      expect(await page.evaluate(() => window.scrollY), `${id}: the page did not scroll`).toBe(
        before,
      );
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(page.getByTestId(trigger)).toBeFocused();
      const { after } = await layoutBoxes({ after: page.getByTestId(trigger) });
      expect([after.x, after.y], `${id}: the trigger did not move`).toEqual([at.x, at.y]);
    }
  });

  test("DLG-E6 with reduced motion a dialog and a sheet open without a running animation", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const [width = 390] = widthsOf(page);
    await openStyle(page, width, "light");
    for (const [trigger, id] of [
      ["style-dialog-open", "style-dialog"],
      ["style-sheet-bottom-open", "style-sheet-bottom"],
    ] as const) {
      await page.getByTestId(trigger).click();
      const panel = page.getByTestId(id);
      await expect(panel).toBeVisible();
      const durations = await panel.evaluate((el) =>
        getComputedStyle(el)
          .animationDuration.split(",")
          .map((d) => parseFloat(d)),
      );
      expect(
        durations.every((d) => d <= 0.001),
        `${id}: ${durations.join(", ")}`,
      ).toBe(true);
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
    }
  });
});

test.describe("one dialog look on a real surface (turn S6-1)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("DLG-E7 Share this ad: a bottom sheet with its grabber below md, a floating dialog from md", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    for (const width of widthsOf(page)) {
      const where = `share @ ${width}`;
      await page.setViewportSize({ width, height: 900 });
      await gotoReady(page, canonical);
      await page.getByTestId("listing-share-open").click();
      const panel = page.locator("[data-dialog-panel][role='dialog']");
      await expect(panel).toBeVisible();
      await settled(page);
      const look = await expectPanel(page, panel, where);
      const grabber = panel.locator("[data-dialog-grabber]");
      if (width < 768) {
        const { sheet } = await layoutBoxes({ sheet: panel });
        expect(Math.round(sheet.y + sheet.height), `${where} on the bottom edge`).toBe(
          (await clientSize(page)).height,
        );
        expect(look.radius.slice(0, 2), `${where} top corners`).toEqual(["20px", "20px"]);
        expect(look.radius.slice(2), `${where} bottom corners`).toEqual(["0px", "0px"]);
        await expect(grabber).toBeVisible();
      } else {
        expect(look.radius, `${where} corners`).toEqual(["20px", "20px", "20px", "20px"]);
        await expect(grabber).toBeHidden();
      }
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
    }
  });
});

/** A screen-sized surface opened from its opener: the one primitive, the focus inside it, the
 *  whole screen (or the 32rem card from md), no running animation under reduced motion, and the
 *  page where it was. */
async function opens(
  page: Page,
  opener: Locator,
  testId: string,
  where: string,
  shape: "screen" | "card",
  reduced: boolean,
  scrims = 1,
) {
  // The page first stops growing, then the opener is brought wholly into view and the page waits
  // again: an opener left at the viewport's edge is scrolled by the click itself, not the dialog.
  await stillPage(opener, { what: where });
  await opener.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await stillPage(opener, { what: where });
  const before = await page.evaluate(() => window.scrollY);
  const { at } = await layoutBoxes({ at: opener });
  await opener.click();
  const panel = page.getByTestId(testId);
  await expect(panel, `${where}: it opened`).toBeVisible({ timeout: 20_000 });
  await settled(page);
  await expect(panel).toHaveAttribute("role", "dialog");
  await expect(panel).toHaveAttribute("data-dialog-panel", "");
  await expect(page.locator("[data-dialog-scrim][data-state='open']")).toHaveCount(scrims);
  expect(
    await panel.evaluate((el) => el.contains(document.activeElement)),
    `${where}: the focus is inside`,
  ).toBe(true);
  const { box } = await layoutBoxes({ box: panel });
  const view = await clientSize(page);
  if (shape === "screen")
    expect(
      [box.x, box.y, Math.round(box.width), Math.round(box.height)],
      `${where}: the whole screen`,
    ).toEqual([0, 0, view.width, view.height]);
  else expect(Math.round(box.width), `${where}: the 32rem card`).toBe(512);
  if (reduced) {
    const durations = await panel.evaluate((el) =>
      getComputedStyle(el)
        .animationDuration.split(",")
        .map((d) => parseFloat(d)),
    );
    expect(
      durations.every((d) => d <= 0.001),
      `${where}: a running animation ${durations.join(", ")}`,
    ).toBe(true);
  }
  expect(await page.evaluate(() => window.scrollY), `${where}: the page scrolled`).toBe(before);
  return { panel, at };
}

/** Escape closes the top layer; the focus is back on the opener, which has not moved. */
async function closesBack(
  page: Page,
  opener: Locator,
  opened: { panel: Locator; at: { x: number; y: number } },
  where: string,
) {
  await page.keyboard.press("Escape");
  await expect(opened.panel, `${where}: Escape did not close it`).toHaveCount(0);
  await expect(opener, `${where}: the focus is not back on its opener`).toBeFocused();
  const { after } = await layoutBoxes({ after: opener });
  expect([after.x, after.y], `${where}: the opener moved`).toEqual([opened.at.x, opened.at.y]);
}

test.describe("the full-screen surfaces on the one primitive (turn S6-4)", () => {
  const { scratchSeller, seed, publicIdOf, seedPhotos, cleanup } = adPageFixtures();
  const sellers: string[] = [];
  const categories: string[] = [];
  const places: string[] = [];
  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    await cleanup();
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    for (const slug of places.splice(0)) await destroyLocation(slug);
  });

  test(
    "DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected",
    { tag: "@webkit" },
    async ({ page }) => {
      // Two modes × three surfaces, each opened and closed from a page that first stops growing,
      // after seeding two ads with photos, a category, a place chain and a draft through the route.
      test.setTimeout(300_000);
      const width = layoutOf(page) === "mobile" ? 390 : 1440;
      await page.setViewportSize({ width, height: 900 });

      // Another seller's ad with photos (the viewer on the ad page).
      const other = await scratchSeller();
      const ad = await seed(other);
      await seedPhotos(ad.id);
      const canonical = listingPath(ad.title, await publicIdOf(ad.id));

      // The signed-in seller's own draft at review, with photos (the preview, the viewer over it,
      // and the pin map on the place step).
      const user = await leaseSeller();
      sellers.push(user.id);
      await signInViaSession(page, user.email, user.password);
      const category = await seedPostableCategory();
      categories.push(category.slug);
      const chain = await seedScratchChain("ET");
      places.push(chain.region.slug as string);
      const saved = await postRoute(
        page,
        "/api/listings/draft",
        completeDraft({
          categoryId: category.id,
          cityId: chain.city.id as string,
          title: "e2e dialogs screens",
          step: 7,
        }),
        { token: await bearerOf(page), country: "ET" },
      );
      expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);
      const listingId = String(saved.payload["listing_id"]);
      await seedPhotos(listingId);

      for (const mode of MODES) {
        const reduced = mode === "dark";
        await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
        await page.evaluate(
          (mode) =>
            window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
          mode,
        );

        // The viewer on the ad page.
        await gotoReady(page, canonical);
        await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
        let where = `the viewer @ ${width} ${mode}`;
        const main = page.getByTestId("listing-detail-gallery").getByTestId("gallery-main");
        await closesBack(
          page,
          main,
          await opens(page, main, "gallery-viewer", where, "screen", reduced),
          where,
        );

        // The preview, and the viewer over it: one Escape closes the viewer only.
        await gotoReady(page, `/post/${listingId}`);
        await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
        where = `the preview @ ${width} ${mode}`;
        const open = page.getByTestId("post-preview-open");
        const sheet = await opens(page, open, "post-preview-sheet", where, "screen", reduced);
        await expectPicturesFit(page, sheet.panel.getByTestId("gallery-main"));
        const inner = sheet.panel.getByTestId("gallery-main");
        const over = `the viewer over the preview @ ${width} ${mode}`;
        await closesBack(
          page,
          inner,
          await opens(page, inner, "gallery-viewer", over, "screen", reduced, 2),
          over,
        );
        await expect(sheet.panel, `${over}: Escape closed the preview too`).toBeVisible();
        await closesBack(page, open, sheet, where);

        // The pin map on the place step: the whole screen below md, the 32rem card from md.
        await page.locator('[data-testid="post-review-edit"][data-step="6"]').click();
        await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
        where = `the pin map @ ${width} ${mode}`;
        const pin = page.getByTestId("post-where-pin-open");
        const shape = width < 768 ? "screen" : "card";
        const map = await opens(page, pin, "post-pin-sheet", where, shape, reduced);
        await expect(map.panel.getByTestId("post-pin-map")).toHaveAttribute("data-ready", "1", {
          timeout: 20_000,
        });
        await closesBack(page, pin, map, where);
      }
    },
  );
});
