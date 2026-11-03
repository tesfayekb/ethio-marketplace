import { type Locator, type Page } from "@playwright/test";

import { ADMIN_SECTIONS } from "../src/features/admin/sections";
import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  settled,
  switchLanguage,
  useJobSuperAdmin,
} from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * P-1c (D313) — THE GUIDE ON EVERY ADMIN BLOCK (AG-1..AG-7): one control in
 * each DataTable's toolbar opens a sheet of four parts — What this is · Each
 * column · How to add, change or remove · What to do next — whose texts live
 * in the `guide` strings layer, fetched on the first open and never before.
 *
 * Turn (a) guides Monetisation's blocks; the other consoles' Guides are owed
 * in turn (b) (scripts/conformance/admin-guides-allowlist.txt), which deletes
 * GUIDED_SECTIONS and asks AG-1 of every section, and adds AG-6 (a
 * cross-section next without the permission → /admin).
 *
 * Identity: the pooled job super admin (J9), who sees every section. Nothing
 * is written: the Guides are read, a column is hidden in this browser only.
 * Anchors: structure and testids (J5); a word is read from the catalogues.
 */

const TAG = "[e2e:ag]";
/** The sections whose every table carries its Guide after turn (a). */
const GUIDED_SECTIONS = new Set<string>(["monetisation"]);
const MARKETS = "admin-monetisation-markets";
const LEVEL = "admin-monetisation-level";
/** A Markets column that is not locked, hidden in AG-2. */
const HIDDEN_COLUMN = "since";
/** The guide layer and the sheet's own code, however the server names them. */
const GUIDE_CHUNK = /(?:en|am)-guide|block-guide-sheet/;

/** The first enabled level (a REAL row, read only): the product AG-1 opens. */
async function firstLevel(): Promise<string> {
  const { data, error } = await adminClient()
    .from("listing_packages")
    .select("key")
    .eq("kind", "level")
    .eq("enabled", true)
    .order("sort", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error || !data) throw new Error(`${TAG} no level row: ${error?.message ?? "none"}`);
  return data.key as string;
}

function guideControls(scope: Locator | Page): Locator {
  return scope.locator('[data-testid$="-guide"][aria-haspopup="dialog"]');
}

async function openGuide(page: Page, anchor: string): Promise<Locator> {
  await page.getByTestId(`${anchor}-guide`).click();
  const sheet = page.getByTestId(`${anchor}-guide-sheet`);
  await expect(sheet).toBeVisible({ timeout: 20000 });
  await expect(sheet.getByTestId(`${anchor}-guide-body`)).toBeVisible({ timeout: 20000 });
  return sheet;
}

async function openConsole(page: Page) {
  await gotoReady(page, "/admin/monetisation");
  await expect(page.getByTestId("admin-section-monetisation")).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId(`${MARKETS}-guide`)).toBeVisible({ timeout: 20000 });
}

/** The labels of the columns the Columns panel shows as on, in its order. */
async function shownColumnLabels(page: Page, columnsTestid: string): Promise<string[]> {
  await page.getByTestId(columnsTestid).click();
  const rows = page.getByTestId(`${columnsTestid}-panel`).locator("li");
  await expect(rows).not.toHaveCount(0, { timeout: 20000 });
  const labels: string[] = [];
  for (const row of await rows.all()) {
    const on = (await row.getByRole("switch").getAttribute("aria-checked")) === "true";
    if (on) labels.push(((await row.locator("label").textContent()) ?? "").trim());
  }
  // Nothing changed, so Done is disabled: Escape closes the panel.
  await page.keyboard.press("Escape");
  await expect(page.getByTestId(`${columnsTestid}-panel`)).toHaveCount(0);
  return labels;
}

test.describe("Admin › the Guide on every block (P-1c, D313)", () => {
  test("AG-1 every admin section draws; in a guided section every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    for (const section of ADMIN_SECTIONS) {
      await gotoReady(page, section.path);
      await expect(
        page.getByTestId(`admin-section-${section.id}`),
        `${TAG} AG-1 ${section.path} did not draw`,
      ).toBeVisible({ timeout: 20000 });
      const toolbars = page.getByTestId("data-table-toolbar");
      const guides = guideControls(page);
      if (GUIDED_SECTIONS.has(section.id)) {
        await expect(guides, `${TAG} AG-1 ${section.path} has no Guide`).not.toHaveCount(0, {
          timeout: 20000,
        });
        expect(await toolbars.count(), `${TAG} AG-1 ${section.path} tables`).toBeGreaterThan(0);
        for (const toolbar of await toolbars.all()) {
          await expect(guideControls(toolbar), `${TAG} AG-1 a table without its Guide`).toHaveCount(
            1,
          );
        }
      }
      for (const guide of await guides.all()) {
        const anchor = ((await guide.getAttribute("data-testid")) ?? "").replace(/-guide$/, "");
        await expect(page.locator(`#${anchor}`), `${TAG} AG-1 no frame for ${anchor}`).toHaveCount(
          1,
        );
      }
      await expectNoHorizontalOverflow(page);
    }
    // Monetisation: four Guides on the page; a product's open row brings its two inner tables' Guides.
    await openConsole(page);
    await expect(guideControls(page)).toHaveCount(4);
    const level = page.getByTestId(`product-${await firstLevel()}-open`);
    await level.click();
    await expect(level).toHaveAttribute("aria-expanded", "true");
    await expect(guideControls(page)).toHaveCount(6);
    await expectNoHorizontalOverflow(page);
  });

  test("AG-2 a Guide opens with its four parts in order; the column lines are the shown columns in order; a hidden column loses its line", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await openConsole(page);
    const sheet = await openGuide(page, MARKETS);
    await expect(sheet.getByRole("heading", { level: 2 })).toHaveText(
      en["admin.monetisation.markets.title"],
    );
    await expect(sheet.locator("h3")).toHaveText([
      en["prim.guide.what"],
      en["prim.guide.columns"],
      en["prim.guide.how"],
      en["prim.guide.next"],
    ]);
    await expect(sheet.getByTestId(`${MARKETS}-guide-next`)).toHaveText(
      en["admin.monetisation.markets.guide.next"],
    );
    const lines = sheet.locator("dl > div");
    const linesBefore = await lines.count();
    expect(linesBefore).toBeGreaterThan(3);
    await expect(sheet.getByTestId(`${MARKETS}-guide-col-${HIDDEN_COLUMN}`)).toBeVisible();
    await expect(
      sheet.getByTestId(`${MARKETS}-guide-col-${HIDDEN_COLUMN}`).locator("dd"),
    ).toHaveText(en[`admin.monetisation.markets.guide.col.${HIDDEN_COLUMN}`]);
    const termsBefore = (await lines.locator("dt").allTextContents()).map((s) => s.trim());
    await page.getByTestId(`${MARKETS}-guide-close`).click();
    await expect(sheet).toHaveCount(0);
    // The lines are the shown columns, in the table's order.
    const shown = await shownColumnLabels(page, "monetisation-markets-columns");
    expect(termsBefore).toEqual(shown);

    // Hide one column: its line goes; the others keep their order.
    await page.getByTestId("monetisation-markets-columns").click();
    await page.getByTestId(`monetisation-markets-columns-${HIDDEN_COLUMN}`).click();
    await page.getByTestId("monetisation-markets-columns-done").click();
    const again = await openGuide(page, MARKETS);
    await expect(again.getByTestId(`${MARKETS}-guide-col-${HIDDEN_COLUMN}`)).toHaveCount(0);
    await expect(again.locator("dl > div")).toHaveCount(linesBefore - 1);
    const termsAfter = (await again.locator("dt").allTextContents()).map((s) => s.trim());
    expect(termsAfter).toEqual(
      termsBefore.filter((term) => term !== en[`admin.monetisation.col.${HIDDEN_COLUMN}`]),
    );
  });

  test("AG-3 the next link closes the sheet and lands on the named block: the hash, the frame in view, the focus on it", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await openConsole(page);
    const sheet = await openGuide(page, MARKETS);
    const next = sheet.getByTestId(`${MARKETS}-guide-next`);
    await expect(next).toHaveAttribute("href", new RegExp(`#${LEVEL}$`));
    await next.click();
    await expect(sheet).toHaveCount(0);
    await expect(page).toHaveURL(new RegExp(`#${LEVEL}$`));
    await settled(page);
    await expect(page.locator(`#${LEVEL}`)).toBeInViewport();
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id ?? ""), {
        message: `${TAG} AG-3 the focus did not land on the block`,
      })
      .toBe(LEVEL);
  });

  test("AG-4 Escape closes the Guide and hands the focus back to its control", async ({ page }) => {
    await useJobSuperAdmin(page);
    await openConsole(page);
    const control = page.getByTestId(`${MARKETS}-guide`);
    await expect(control).toHaveAttribute("aria-expanded", "false");
    const sheet = await openGuide(page, MARKETS);
    await expect(control).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(sheet).toHaveCount(0);
    await expect(control).toHaveAttribute("aria-expanded", "false");
    await expect(control).toBeFocused();
  });

  test("AG-5 under Amharic the Guide's parts and texts come from the Amharic guide layer", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await openConsole(page);
    await switchLanguage(page, "am");
    await expect(page.getByTestId("monetisation-header")).toContainText(
      am["admin.section.monetisation.title"],
      { timeout: 20000 },
    );
    const sheet = await openGuide(page, MARKETS);
    await expect(sheet.locator("h3")).toHaveText([
      am["prim.guide.what"],
      am["prim.guide.columns"],
      am["prim.guide.how"],
      am["prim.guide.next"],
    ]);
    await expect(sheet.locator("section:first-of-type > p")).toHaveText(
      am["admin.monetisation.markets.guide.what"],
    );
    await expect(sheet.getByTestId(`${MARKETS}-guide-col-market`).locator("dd")).toHaveText(
      am["admin.monetisation.markets.guide.col.market"],
    );
    await expect(sheet.getByTestId(`${MARKETS}-guide-next`)).toHaveText(
      am["admin.monetisation.markets.guide.next"],
    );
    await page.getByTestId(`${MARKETS}-guide-close`).click();
    await switchLanguage(page, "en");
  });

  test("AG-7 the guide layer and the sheet's code are not downloaded before the first open; once opened, a second Guide asks for nothing more", async ({
    page,
  }) => {
    const fetched: string[] = [];
    page.on("request", (request) => {
      if (GUIDE_CHUNK.test(request.url())) fetched.push(request.url());
    });
    await useJobSuperAdmin(page);
    await openConsole(page);
    await settled(page);
    expect(
      fetched,
      `${TAG} AG-7 the guide code arrived before any open: ${fetched.join(", ")}`,
    ).toEqual([]);
    await openGuide(page, MARKETS);
    expect(fetched.length, `${TAG} AG-7 nothing was fetched for the first open`).toBeGreaterThan(0);
    const afterFirst = fetched.length;
    await page.getByTestId(`${MARKETS}-guide-close`).click();
    await openGuide(page, LEVEL);
    await page.getByTestId(`${LEVEL}-guide-close`).click();
    await openGuide(page, MARKETS);
    expect(fetched.length, `${TAG} AG-7 a later open fetched again: ${fetched.join(", ")}`).toBe(
      afterFirst,
    );
  });
});
