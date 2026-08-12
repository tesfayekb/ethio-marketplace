import { expect, test, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import {
  expectNoHorizontalOverflow,
  expectSignedIn,
  gotoReady,
  signIn,
  waitForHydration,
} from "./helpers/ui";
import { createUser } from "./helpers/users";

/**
 * Shell smoke — the design foundation.
 * Assertions read from the en catalog; no literals (law D1).
 *
 * Interaction tests navigate with gotoReady(): cold-start SSR serves the
 * chrome before React attaches, and a click on that pre-hydration markup lands
 * on a handler-less element. That is a readiness wait, not a retry.
 */

/** Escape a database-sourced name for use inside a RegExp. */
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Law C2: every real touch target is at least 44px on its short axis. */
async function expectTapTarget(page: Page, locator: ReturnType<Page["getByRole"]>, name: string) {
  const box = await locator.first().boundingBox();
  expect(box, `${name} has no box`).not.toBeNull();
  expect(box!.height, `${name} height`).toBeGreaterThanOrEqual(44);
}

test.describe("app shell", () => {
  test("mounts with header, rail slot and footer, logged out", async ({ page }, testInfo) => {
    await page.goto("/");

    // Header: the brand link is present.
    await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();

    // Footer: a known column heading.
    await expect(
      page.getByRole("heading", { name: en["footer.sectionLegal"], exact: true }),
    ).toBeVisible();

    // Logged out: a Sign in control, and no panel beyond Marketplace.
    await expect(page.getByRole("link", { name: en["auth.signIn"], exact: true })).toBeVisible();
    await expect(page.getByText(en["panel.myListings"], { exact: true })).toHaveCount(0);
    await expect(page.getByText(en["panel.account"], { exact: true })).toHaveCount(0);
    await expect(page.getByText(en["panel.admin"], { exact: true })).toHaveCount(0);

    // Band 2 is absent entirely for a Marketplace-only visitor.
    await expect(page.getByTestId("panel-tabs")).toHaveCount(0);

    if (testInfo.project.name === "desktop-1280") {
      // Desktop: the rail is persistent.
      await expect(page.getByTestId("app-rail")).toBeVisible();
    }
  });

  test("feed renders its empty state", async ({ page }) => {
    await page.goto("/");
    const empty = page.getByTestId("feed-empty");
    await expect(empty).toBeVisible();
    await expect(empty.getByText(en["feed.emptyTitle"], { exact: true })).toBeVisible();
    await expect(empty.getByText(en["feed.emptyBody"], { exact: true })).toBeVisible();
  });

  test("language toggle renders Amharic (Ge'ez path)", async ({ page }) => {
    await gotoReady(page, "/");
    // ONE affordance at every width: the same trigger, whose menu shows the
    // current language alongside the others. The trigger carries BOTH labels in
    // the DOM (one per breakpoint) and CSS shows exactly one, so assert the
    // VISIBLE label — the button's concatenated text is not what a user reads.
    const trigger = page.getByTestId("language-switcher");
    const narrow = (page.viewportSize()?.width ?? 0) < 768;
    const shown = page.getByTestId(narrow ? "language-switcher-short" : "language-switcher-full");
    const hidden = page.getByTestId(narrow ? "language-switcher-full" : "language-switcher-short");
    await expect(shown).toBeVisible();
    await expect(hidden).toBeHidden();
    await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
    await trigger.click();
    await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
    await page.getByRole("menuitem", { name: en["language.amharic"] }).click();

    const amharicHeading = page.getByRole("heading", { level: 1 });
    await expect(amharicHeading).toBeVisible();
    const text = (await amharicHeading.textContent())?.trim() ?? "";
    expect(text.length).toBeGreaterThan(0);
    // Ge'ez block U+1200–U+137F must actually be rendered.
    expect(/[\u1200-\u137F]/.test(text)).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    // The trigger itself now reports the current language.
    await expect(shown).toHaveText(narrow ? en["language.amShort"] : en["language.amharic"]);
  });

  test("the vertical stack is ordered: top bar, location row, breadcrumbs, body", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const y = async (testId: string) => {
      const box = await page.getByTestId(testId).boundingBox();
      expect(box, `${testId} has no box`).not.toBeNull();
      return box!.y;
    };
    const bar = await y("shell-topbar");
    const location = await y("location-row");
    const crumbs = await y("breadcrumbs");
    const heading = (await page.getByRole("heading", { level: 1 }).boundingBox())!.y;

    expect(bar).toBeLessThan(location);
    expect(location).toBeLessThan(crumbs);
    expect(crumbs).toBeLessThan(heading);
  });

  test("the location row cascades Country -> Region -> City, city selectable", async ({ page }) => {
    await gotoReady(page, "/");
    const row = page.getByTestId("location-row");
    await expect(row).toBeVisible();

    // FIX 3: NOTHING precedes Country — the cascade starts at level 1.
    const levels = page.locator("[data-testid^='location-level-']");
    await expect(levels).toHaveCount(1);
    await expect(levels.first()).toHaveAttribute("data-testid", "location-level-country");

    const pick = async (testId: string) => {
      await page.getByTestId(testId).click();
      const options = page.getByRole("menuitem");
      await expect(options.first()).toHaveText(en["location.anyArea"]);
      const chosen = (await options.nth(1).textContent())!.trim();
      await options.nth(1).click();
      await expect(page.getByTestId(testId)).toHaveText(new RegExp(escapeRe(chosen)));
      return chosen;
    };

    // Country -> the Region level appears.
    const country = await pick("location-level-country");
    await expect(page.getByTestId("location-level-region")).toBeVisible();

    // Region -> the City level appears.
    const region = await pick("location-level-region");
    await expect(page.getByTestId("location-level-city")).toBeVisible();

    // City IS selectable, and its selection sticks on its own picker.
    const city = await pick("location-level-city");

    // No duplicate: each chosen name appears exactly ONCE on its own picker,
    // and no area label is echoed outside the pickers. (A name may legitimately
    // occur at two LEVELS — Addis Ababa is both a region and a city — so the
    // claim is per-picker, not per-row.)
    for (const [testId, name] of [
      ["location-level-country", country],
      ["location-level-region", region],
      ["location-level-city", city],
    ] as const) {
      const occurrences = await page
        .getByTestId(testId)
        .evaluate((el, text) => (el.textContent ?? "").split(text).length - 1, name);
      expect(occurrences, `${name} rendered more than once on ${testId}`).toBe(1);
    }
    const outside = await row.evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("[data-testid^='location-level-']").forEach((n) => n.remove());
      return (clone.textContent ?? "").trim();
    });
    // Only the screen-reader-only row label may live outside the pickers.
    expect(outside, "an area label is echoed outside the pickers").toBe(en["location.label"]);
  });

  test("breadcrumb segments navigate the category path", async ({ page }) => {
    await gotoReady(page, "/");
    if ((await page.getByTestId("app-rail").count()) === 0) return;
    if (!(await page.getByTestId("app-rail").isVisible())) return;

    // Only the NAVIGATION rows — the rail foot (collapse toggle, sign out)
    // holds buttons too and must not be mistaken for a category (INC-032).
    const rows = page.getByTestId("app-rail").locator("nav").getByRole("button");
    // Row 0 is "All categories"; row 1 is the first real category, if seeded.
    if ((await rows.count()) < 2) return;
    const name = (await rows.nth(1).textContent())!.trim();
    await rows.nth(1).click();

    const crumb = page.getByTestId("breadcrumb-category");
    await expect(crumb).toHaveText(name);

    // Clicking Home walks back up to the unfiltered MARKETPLACE feed: the
    // category filter clears and the Marketplace panel is the active one.
    await page.getByTestId("breadcrumb-home").click();
    await expect(page.getByTestId("breadcrumb-category")).toHaveCount(0);
    await expect(page.getByTestId("breadcrumb-panel")).toHaveCount(0);
    await expect(page.getByText(en["panel.marketplace"], { exact: true }).first()).toBeVisible();
  });

  test("the marketplace breadcrumb is Home alone — no redundant panel segment", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const crumbs = page.getByTestId("breadcrumbs");
    await expect(crumbs.getByTestId("breadcrumb-home")).toBeVisible();
    // INC-043: "Home" IS the marketplace, so the Marketplace segment is gone.
    await expect(crumbs.getByTestId("breadcrumb-panel")).toHaveCount(0);
    await expect(crumbs.getByText(en["panel.marketplace"], { exact: true })).toHaveCount(0);
  });

  test("the feed body is centred with equal left and right gutters", async ({ page }) => {
    await gotoReady(page, "/");
    const main = page.locator("main#main");
    const container = page.getByTestId("feed-container");
    const mainBox = (await main.boundingBox())!;
    const box = (await container.boundingBox())!;
    const left = box.x - mainBox.x;
    const right = mainBox.x + mainBox.width - (box.x + box.width);
    expect(Math.abs(left - right), "feed container gutters are unequal").toBeLessThanOrEqual(1);

    const empty = (await page.getByTestId("feed-empty").boundingBox())!;
    const emptyLeft = empty.x - mainBox.x;
    const emptyRight = mainBox.x + mainBox.width - (empty.x + empty.width);
    expect(Math.abs(emptyLeft - emptyRight), "empty state is off-centre").toBeLessThanOrEqual(1);
  });

  test("the self-drawing spinner renders while the feed loads", async ({ page }) => {
    // Hold the listings read open so the busy state is observable.
    await page.route("**/rest/v1/listings*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });
    await page.goto("/");
    const spinner = page.getByTestId("spinner");
    await expect(spinner).toBeVisible();
    // Self-drawing, not rotating: the sweeping stroke path is present and no
    // spin animation is applied to the mark.
    await expect(spinner.getByTestId("spinner-draw")).toHaveCount(1);
    const animation = await spinner
      .locator("svg")
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe("none");
  });

  test("footer columns are centred as a group and each is centred", async ({ page }) => {
    await gotoReady(page, "/");
    const columns = page.getByTestId("footer-columns");
    const group = (await columns.boundingBox())!;
    const page_width = page.viewportSize()!.width;
    // Centred as a group: equal slack on both sides (2px subpixel tolerance).
    expect(Math.abs(group.x - (page_width - (group.x + group.width)))).toBeLessThanOrEqual(2);
    // Each column centres its own content.
    const alignments = await columns
      .locator("nav")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).textAlign));
    expect(alignments.every((a) => a === "center")).toBe(true);
    expect(alignments.length).toBe(3);

    // FIX 3: exactly three EQUAL columns (an explicit grid, not flex guesses).
    const tracks = await columns.evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns.split(" ").map(parseFloat),
    );
    expect(tracks.length).toBe(3);
    expect(Math.max(...tracks) - Math.min(...tracks)).toBeLessThanOrEqual(1);

    // Tightened rows: every link still owns a 44px tap box.
    const heights = await columns
      .locator("a, span.inline-flex")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
  });

  test("feed grid reflows without clipping and never overflows", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expectNoHorizontalOverflow(page);

    // Data-dependent: staging may hold zero active listings. With cards the
    // grid must reflow per breakpoint; without them the empty state stands in.
    const cards = page.locator("[data-testid='feed-empty'] , main ul > li");
    await expect(cards.first()).toBeVisible();

    const grid = page.locator("main ul.grid");
    if ((await grid.count()) > 0) {
      const columns = await grid
        .first()
        .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
      const width = page.viewportSize()?.width ?? 0;
      const expected = width < 640 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4;
      expect(columns).toBe(expected);

      // No card may spill past the grid's own box.
      const clipped = await grid.first().evaluate((el) => {
        const box = el.getBoundingClientRect();
        return Array.from(el.children).filter((c) => {
          const r = c.getBoundingClientRect();
          return r.right > box.right + 1 || r.left < box.left - 1;
        }).length;
      });
      expect(clipped).toBe(0);
    }
  });
});

test.describe("corner-block grid", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "md and up only");

  test("logo cell sits exactly above the rail and beside the top bar", async ({ page }) => {
    await gotoReady(page, "/");

    const box = async (testId: string) => {
      const b = await page.getByTestId(testId).boundingBox();
      expect(b, `${testId} has no box`).not.toBeNull();
      return b!;
    };
    const logo = await box("shell-logo-cell");
    const bar = await box("shell-topbar");
    const rail = await box("app-rail");

    // Logo cell owns the corner: same start edge and width as the rail...
    expect(Math.round(logo.x)).toBe(Math.round(rail.x));
    expect(Math.round(logo.width)).toBe(Math.round(rail.width));
    // ...and the same height/top as the bar it sits next to.
    expect(Math.round(logo.y)).toBe(Math.round(bar.y));
    expect(Math.round(logo.height)).toBe(Math.round(bar.height));
    // The bar starts where the logo cell ends — no gap, no overlap.
    expect(Math.round(bar.x)).toBe(Math.round(logo.x + logo.width));
    // The rail starts where the logo cell ends vertically.
    expect(Math.round(rail.y)).toBe(Math.round(logo.y + logo.height));
  });

  test("the lockup's second line spans the wordmark exactly", async ({ page }) => {
    await gotoReady(page, "/");
    const cell = page.getByTestId("shell-logo-cell");
    const word = await cell.getByTestId("logo-wordmark").boundingBox();
    const sub = await cell.getByTestId("logo-subline").boundingBox();
    expect(word).not.toBeNull();
    expect(sub).not.toBeNull();
    // FIT rule: same start edge, same width (1px tolerance for subpixel layout).
    expect(Math.abs(word!.x - sub!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(word!.width - sub!.width)).toBeLessThanOrEqual(1);
  });

  test("rail submenus expand and collapse", async ({ page }) => {
    await gotoReady(page, "/");
    const triggers = page.getByTestId("rail-submenu-trigger");
    const count = await triggers.count();
    // Marketplace's rail is flat until category children land; the submenu
    // mechanism is only asserted where a panel actually declares children.
    if (count === 0) return;

    const first = triggers.first();
    const expanded = (await first.getAttribute("aria-expanded")) === "true";
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", expanded ? "false" : "true");
  });

  test("every rail row carries a leading icon on one gutter", async ({ page }) => {
    await gotoReady(page, "/");
    const rail = page.getByTestId("app-rail");
    const rows = rail.locator("li > a, li > button, li > span[aria-disabled]");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    const starts = new Set<number>();
    for (let i = 0; i < count; i += 1) {
      const row = rows.nth(i);
      const svg = row.locator("svg").first();
      await expect(svg, `rail row ${i} has no icon`).toHaveCount(1);
      const box = (await svg.boundingBox())!;
      starts.add(Math.round(box.x));
    }
    // Top-level rows share ONE gutter (depth adds padding, but this rail is flat).
    expect(starts.size).toBe(1);
  });

  test("category rows carry DISTINCT icons, not one repeated glyph", async ({ page }) => {
    await gotoReady(page, "/");
    const rows = page.getByTestId("app-rail").locator("nav li > button");
    const count = await rows.count();
    // Row 0 is "All categories"; real categories follow. Needs at least two
    // seeded categories for the claim to mean anything.
    if (count < 3) return;

    const paths = new Set<string>();
    for (let i = 1; i < count; i += 1) {
      const d = await rows.nth(i).locator("svg").first().innerHTML();
      paths.add(d);
    }
    expect(paths.size, "every category icon is identical").toBeGreaterThan(1);
  });

  test("the rail collapses to icons, shows a tooltip, and remembers the choice", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const rail = page.getByTestId("app-rail");
    const toggle = page.getByTestId("rail-collapse-toggle");
    const html = page.locator("html");

    // FIX 2: the toggle lives in the TOP BAR, before the search field — and
    // nowhere inside the rail any more.
    await expect(
      page.getByTestId("shell-topbar").getByTestId("rail-collapse-toggle"),
    ).toBeVisible();
    await expect(rail.getByTestId("rail-collapse-toggle")).toHaveCount(0);
    const toggleBox = (await toggle.boundingBox())!;
    const searchBox = (await page.getByTestId("search-inline").boundingBox())!;
    expect(toggleBox.x).toBeLessThan(searchBox.x);

    // Default is EXPANDED: labels visible, full rail width.
    await expect(html).toHaveAttribute("data-rail", "expanded");
    const allCategories = rail.getByText(en["shell.allCategories"], { exact: true });
    await expect(allCategories).toBeVisible();
    const wide = (await rail.boundingBox())!.width;

    await toggle.click();

    await expect(html).toHaveAttribute("data-rail", "collapsed");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(allCategories).toBeHidden();
    const narrow = (await rail.boundingBox())!.width;
    expect(narrow).toBeLessThan(wide);
    // Icons survive the collapse — that is what makes it usable.
    await expect(rail.locator("li svg").first()).toBeVisible();

    // Hovering an icon-only row reveals its label.
    await rail.getByRole("button", { name: en["shell.allCategories"] }).hover();
    const tip = page.getByTestId("rail-tooltip").first();
    await expect(tip).toBeVisible();
    await expect(tip).toContainText(en["shell.allCategories"]);

    // The choice survives a reload, applied before the first paint.
    await page.reload();
    await waitForHydration(page);
    await expect(html).toHaveAttribute("data-rail", "collapsed");
    expect((await rail.boundingBox())!.width).toBe(narrow);

    // And it expands back.
    await page.getByTestId("rail-collapse-toggle").click();
    await expect(html).toHaveAttribute("data-rail", "expanded");
    await expect(rail.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
  });

  test("exactly one collapse toggle, and the wordmark moves into the bar when collapsed", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const html = page.locator("html");
    const bar = page.getByTestId("shell-topbar");

    // INC-046: exactly ONE desktop collapse affordance, and no hamburger here.
    await expect(page.getByTestId("rail-collapse-toggle")).toHaveCount(1);
    await expect(page.getByRole("button", { name: en["shell.openMenu"] })).toBeHidden();

    // Rail OPEN: the wordmark lives in the corner cell only — never twice.
    await expect(html).toHaveAttribute("data-rail", "expanded");
    await expect(page.getByTestId("shell-logo-cell").getByTestId("logo-wordmark")).toBeVisible();
    await expect(bar.getByTestId("topbar-wordmark")).toBeHidden();

    await page.getByTestId("rail-collapse-toggle").click();
    await expect(html).toHaveAttribute("data-rail", "collapsed");

    // Rail COLLAPSED: corner cell is the icon-only mark, the bar carries the
    // wordmark — after the toggle, before the search field (INC-045).
    await expect(page.getByTestId("shell-logo-cell").getByTestId("logo-wordmark")).toBeHidden();
    const word = bar.getByTestId("topbar-wordmark");
    await expect(word).toBeVisible();
    // INC-048: the bar lockup carries the MARKETPLACE line too, and it is the
    // lockup ONLY — the mark stays in the corner cell, never duplicated.
    await expect(word.getByTestId("logo-subline")).toBeVisible();
    await expect(word.locator("svg")).toHaveCount(0);
    const toggleBox = (await page.getByTestId("rail-collapse-toggle").boundingBox())!;
    const wordBox = (await word.boundingBox())!;
    const searchBox = (await page.getByTestId("search-inline").boundingBox())!;
    expect(toggleBox.x).toBeLessThan(wordBox.x);
    expect(wordBox.x).toBeLessThan(searchBox.x);
    // INC-049: search never grows into the right-side controls.
    const langBox = (await page.getByTestId("language-switcher").boundingBox())!;
    expect(searchBox.x + searchBox.width).toBeLessThanOrEqual(langBox.x);
  });

  test("the rail sign-out is absent for a logged-out visitor", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(page.getByTestId("rail-sign-out")).toHaveCount(0);
  });
});

test.describe("tablet chrome (md = 768px)", () => {
  // The new full-controls threshold. Run once; the viewport is overridden here
  // rather than adding a third project.
  test.use({ viewport: { width: 768, height: 1024 } });

  test("tablets get the persistent rail and the FULL controls", async ({ page }, testInfo) => {
    // Run once: the viewport here is fixed, so the second project would repeat it.
    test.skip(testInfo.project.name !== "desktop-1280", "run once");
    await gotoReady(page, "/");

    // Persistent sidebar, not a drawer: no hamburger at all.
    await expect(page.getByTestId("app-rail")).toBeVisible();
    await expect(page.getByRole("button", { name: en["shell.openMenu"] })).toHaveCount(0);

    // A real search FIELD in the bar (no icon-only toggle).
    await expect(page.getByTestId("search-inline-input")).toBeVisible();
    await expect(page.getByTestId("search-toggle")).toBeHidden();

    // The language control reads the language NAME, and sign in has text.
    const fullLabel = page.getByTestId("language-switcher-full");
    await expect(fullLabel).toBeVisible();
    await expect(fullLabel).toHaveText(en["language.english"]);
    await expect(page.getByTestId("language-switcher-short")).toBeHidden();
    await expect(page.getByRole("link", { name: en["auth.signIn"], exact: true })).toBeVisible();

    // INC-049: at tablet width the search field must not run into the language
    // control — it is capped, so the two never overlap and nothing is clipped.
    const searchBox = (await page.getByTestId("search-inline").boundingBox())!;
    const langBox = (await page.getByTestId("language-switcher").boundingBox())!;
    expect(searchBox.x + searchBox.width).toBeLessThanOrEqual(langBox.x);
    expect(langBox.width).toBeGreaterThan(40);

    await expectNoHorizontalOverflow(page);
  });

  test("the top bar is ONE band: logo-cell height AND background, location row separate", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "run once");
    await gotoReady(page, "/");
    const logo = (await page.getByTestId("shell-logo-cell").boundingBox())!;
    const bar = (await page.getByTestId("shell-topbar").boundingBox())!;
    expect(Math.round(bar.y)).toBe(Math.round(logo.y));
    expect(Math.round(bar.height)).toBe(Math.round(logo.height));

    // Same surface, no two-tone split: the band cell AND the header inside it
    // paint the logo cell's background.
    const bg = (testId: string) =>
      page.evaluate(
        (id) => getComputedStyle(document.querySelector(`[data-testid="${id}"]`)!).backgroundColor,
        testId,
      );
    const cellBg = await bg("shell-logo-cell");
    expect(await bg("shell-topbar")).toBe(cellBg);
    const headerBg = await page.evaluate(
      () =>
        getComputedStyle(document.querySelector('[data-testid="shell-topbar"] header')!)
          .backgroundColor,
    );
    expect(headerBg).toBe(cellBg);

    // The location picker is its OWN band, strictly below the bar.
    const loc = (await page.getByTestId("location-row").boundingBox())!;
    expect(loc.y).toBeGreaterThanOrEqual(bar.y + bar.height);
  });
});

test.describe("dark mode", () => {
  test("the toggle flips the mode and the surfaces actually change", async ({ page }) => {
    await gotoReady(page, "/");
    const html = page.locator("html");
    const before = await html.getAttribute("data-mode");
    const bgBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await page.getByRole("button", { name: en["shell.themeToggle"] }).click();

    const after = before === "dark" ? "light" : "dark";
    await expect(html).toHaveAttribute("data-mode", after);
    const bgAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bgAfter).not.toBe(bgBefore);

    // The choice must survive a reload with NO flash: the pre-paint script
    // has already applied it by the time the first frame exists.
    await page.reload();
    await expect(html).toHaveAttribute("data-mode", after);
  });
});

test.describe("mobile chrome", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 400, "mobile-360 only");

  test("rail is a drawer behind the hamburger", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(page.getByTestId("app-rail")).toBeHidden();

    await page.getByRole("button", { name: en["shell.openMenu"] }).click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    // U0c — the drawer names the ACTIVE panel and lists ONLY its items.
    await expect(drawer.getByTestId("drawer-panel-title")).toHaveText(en["panel.marketplace"]);
    await expect(drawer.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    // The old stacked all-panels list is gone: no non-active panel name shows
    // in the drawer body (the switcher's options live in a portal menu).
    await expect(drawer.getByText(en["panel.account"], { exact: true })).toHaveCount(0);
    await expect(drawer.getByText(en["panel.myListings"], { exact: true })).toHaveCount(0);
  });

  test("the drawer switcher swaps the active panel's items", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await signIn(page, user.email, user.password);
    await gotoReady(page, "/");

    await page.getByRole("button", { name: en["shell.openMenu"] }).click();
    const drawer = page.getByRole("dialog");
    await expect(drawer.getByTestId("drawer-panel-title")).toHaveText(en["panel.marketplace"]);

    await page.getByTestId("drawer-panel-switcher").click();
    await page.getByTestId("drawer-panel-option-account").click();

    // Drawer stays open on the new panel: its items replace marketplace's.
    await expect(drawer.getByTestId("drawer-panel-title")).toHaveText(en["panel.account"]);
    await expect(drawer.getByTestId("rail-item-ac-overview")).toBeVisible();
    await expect(drawer.getByText(en["shell.allCategories"], { exact: true })).toHaveCount(0);
  });

  test("the rail-collapse toggle does not exist on mobile", async ({ page }) => {
    // INC-054/INC-055 — below md the drawer/hamburger is the only sidebar
    // affordance; the toggle must be display:none, not merely off-screen.
    await gotoReady(page, "/");
    await expect(page.getByRole("button", { name: en["shell.openMenu"] })).toBeVisible();
    await expect(page.getByTestId("rail-collapse-toggle")).toBeHidden();
    await expect(page.getByTestId("rail-collapse-toggle")).toHaveCSS("display", "none");
  });

  test("no Settings item leaks into the mobile category drawer", async ({ page }) => {
    // INC-053 — the Marketplace rail is the live category tree, drawer included.
    await gotoReady(page, "/");
    await page.getByRole("button", { name: en["shell.openMenu"] }).click();
    const drawer = page.getByRole("dialog");
    await expect(drawer.getByTestId("drawer-panel-title")).toHaveText(en["panel.marketplace"]);
    await expect(drawer.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    await expect(drawer.getByText(en["settings.navLabel"], { exact: true })).toHaveCount(0);
  });

  test("search opens a full-width row BELOW the bar", async ({ page }) => {
    await gotoReady(page, "/");
    await page.getByTestId("search-toggle").click();
    await expect(page.getByTestId("search-input")).toBeVisible();

    const bar = (await page.locator("header").first().boundingBox())!;
    const row = (await page.getByTestId("search-row").boundingBox())!;
    // Below the bar, and the full viewport width — room to type.
    expect(row.y).toBeGreaterThanOrEqual(bar.y + bar.height - 1);
    expect(Math.round(row.width)).toBe(page.viewportSize()!.width);
    await expectNoHorizontalOverflow(page);
  });

  test("no horizontal overflow and text stays legible at 360", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expectNoHorizontalOverflow(page);

    // Nothing below 11px anywhere in the shell (law C1/C6 legibility floor).
    const tooSmall = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll("*")).filter(
          (el) =>
            el.children.length === 0 &&
            (el.textContent ?? "").trim().length > 0 &&
            parseFloat(getComputedStyle(el).fontSize) < 11,
        ).length,
    );
    expect(tooSmall).toBe(0);
  });

  test("primary touch targets are at least 44px", async ({ page }) => {
    await gotoReady(page, "/");

    await expectTapTarget(page, page.getByRole("button", { name: en["shell.openMenu"] }), "menu");
    await expectTapTarget(page, page.getByRole("link", { name: en["app.name"] }), "brand");
    await expectTapTarget(
      page,
      page.getByRole("link", { name: en["auth.signIn"], exact: true }),
      "sign in",
    );
    await expectTapTarget(page, page.getByTestId("language-switcher"), "language");
    // Scoped to the FOOTER on purpose: shadcn's BreadcrumbPage renders
    // role="link" for the current page, so an unscoped role query matched the
    // breadcrumb's 20px "Home" instead of the footer link (INC-051). The 44px
    // floor is unchanged — this asserts the element the test always meant.
    await expectTapTarget(page, page.getByTestId("footer-home"), "footer home");
    await expectTapTarget(
      page,
      page.getByRole("button", { name: en["shell.themeToggle"] }),
      "theme toggle",
    );
    await expectTapTarget(page, page.getByTestId("search-toggle"), "search toggle");

    // Category rows inside the drawer are targets too.
    await page.getByRole("button", { name: en["shell.openMenu"] }).click();
    await expectTapTarget(
      page,
      page.getByRole("button", { name: en["shell.allCategories"] }),
      "all categories",
    );
  });
});

test.describe("panel-scoped chrome", () => {
  /**
   * INC-052 — the location row is a MARKETPLACE concept: present on the
   * Marketplace panel, ABSENT on every other panel. Panel tabs only exist for
   * a signed-in user, so this needs a real session.
   */
  test("location row is present on Marketplace and absent on Account", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await signIn(page, user.email, user.password);
    await expectSignedIn(page, user.displayName);
    await gotoReady(page, "/");

    await expect(page.getByTestId("panel-tab-marketplace")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByTestId("location-row")).toBeVisible();

    await page.getByTestId("panel-tab-account").click();
    await expect(page.getByTestId("panel-tab-account")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("location-row")).toHaveCount(0);

    await page.getByTestId("panel-tab-marketplace").click();
    await expect(page.getByTestId("location-row")).toBeVisible();

    // INC-056 — the tabs row must FIT at every width: no horizontal scrollbar
    // under it, and no page-level horizontal overflow it could have caused.
    const overflow = await page.getByTestId("panel-tabs").evaluate((el) => ({
      row: el.scrollWidth - el.clientWidth,
      doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    expect(overflow.row).toBeLessThanOrEqual(1);
    expect(overflow.doc).toBeLessThanOrEqual(1);

    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const per = await page.getByTestId("panel-tabs").evaluate((el) => ({
        row: el.scrollWidth - el.clientWidth,
        doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      expect(per.row, `panel tabs overflow at ${width}px`).toBeLessThanOrEqual(1);
      expect(per.doc, `document overflow at ${width}px`).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("marketplace rail is categories only", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "persistent rail is md+");

  // INC-053 — nothing but the live category tree may appear under
  // "All categories"; Settings belongs to the Account / My Listings panels.
  test("no Settings item leaks into the category rail", async ({ page }) => {
    await gotoReady(page, "/");
    const rail = page.getByTestId("app-rail");
    await expect(rail.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    await expect(rail.getByText(en["settings.navLabel"], { exact: true })).toHaveCount(0);
  });
});

test.describe("panel follows the route", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "persistent rail is md+");

  /**
   * INC-058 — /settings is a real route, but the active panel was pure client
   * state defaulting to "marketplace", so the settings page rendered BESIDE the
   * marketplace category rail. The panel is now derived from the route.
   */
  test("/settings shows the Account context, and returning shows categories", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await signIn(page, user.email, user.password);
    await expectSignedIn(page, user.displayName);

    // Operator's path: land on marketplace first.
    await gotoReady(page, "/");
    const rail = page.getByTestId("app-rail");
    await expect(rail.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();

    await gotoReady(page, "/settings");
    await expect(page.getByTestId("panel-tab-account")).toHaveAttribute("aria-selected", "true");
    // Account rail, not the category tree; and no marketplace location row.
    await expect(rail.getByText(en["nav.overview"], { exact: true })).toBeVisible();
    await expect(rail.getByText(en["shell.allCategories"], { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("location-row")).toHaveCount(0);
    // The settings page itself still renders (no placeholder).
    await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible();

    // Back to Marketplace: categories again, Settings not among them.
    await page.getByTestId("panel-tab-marketplace").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(rail.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    await expect(rail.getByText(en["settings.navLabel"], { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("location-row")).toBeVisible();
  });

  // INC-059 — the right cluster sits flush to the bar's right edge at md+.
  test("top-bar controls are right-aligned at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoReady(page, "/");
    const header = page.getByTestId("shell-topbar");
    const controls = page.getByTestId("topbar-controls");
    const headerBox = (await header.boundingBox())!;
    const controlsBox = (await controls.boundingBox())!;
    const rightGap = headerBox.x + headerBox.width - (controlsBox.x + controlsBox.width);
    expect(rightGap).toBeLessThanOrEqual(20);
  });

  // Law F3 (UI convenience only): the Admin panel is absent for a non-admin.
  test("admin panel is absent for a normal signed-in user", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await signIn(page, user.email, user.password);
    await expectSignedIn(page, user.displayName);
    await gotoReady(page, "/");
    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  });
});
