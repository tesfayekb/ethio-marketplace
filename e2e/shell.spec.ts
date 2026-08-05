import { expect, test, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expectNoHorizontalOverflow, gotoReady, waitForHydration } from "./helpers/ui";

/**
 * Shell smoke — the design foundation.
 * Assertions read from the en catalog; no literals (law D1).
 *
 * Interaction tests navigate with gotoReady(): cold-start SSR serves the
 * chrome before React attaches, and a click on that pre-hydration markup lands
 * on a handler-less element. That is a readiness wait, not a retry.
 */

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
    // current language alongside the others. Phones read the code, md+ reads
    // the language name (FIX 2).
    const trigger = page.getByTestId("language-switcher");
    const narrow = (page.viewportSize()?.width ?? 0) < 768;
    await expect(trigger).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
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
    await expect(page.getByTestId("language-switcher")).toHaveText(
      narrow ? en["language.amShort"] : en["language.amharic"],
    );
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

  test("the location row cascades country into its child level", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(page.getByTestId("location-row")).toBeVisible();
    await expect(page.getByTestId("location-current")).toHaveText(en["location.everywhere"]);

    const country = page.getByTestId("location-level-country");
    await country.click();
    const options = page.getByRole("menuitem");
    await expect(options.first()).toHaveText(en["location.anyArea"]);
    const chosen = (await options.nth(1).textContent())!.trim();
    await options.nth(1).click();

    // The chosen area is reflected, and a deeper level has appeared.
    await expect(page.getByTestId("location-current")).toHaveText(chosen);
    await expect(page.locator("[data-testid^='location-level-']")).toHaveCount(2);

    // FIX 4: the resolved area appears EXACTLY once in the row — the picker
    // that holds it reads as its level name, never as a second copy of it.
    const occurrences = await page
      .getByTestId("location-row")
      .evaluate((el, text) => (el.textContent ?? "").split(text).length - 1, chosen);
    expect(occurrences).toBe(1);
  });

  test("breadcrumb segments navigate the category path", async ({ page }) => {
    await gotoReady(page, "/");
    if ((await page.getByTestId("app-rail").count()) === 0) return;
    if (!(await page.getByTestId("app-rail").isVisible())) return;

    const rows = page.getByTestId("app-rail").getByRole("button");
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
    await expect(page.getByTestId("language-switcher")).toHaveText(en["language.english"]);
    await expect(page.getByRole("link", { name: en["auth.signIn"], exact: true })).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test("the top bar fills the grid row: same height as the logo cell", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "run once");
    await gotoReady(page, "/");
    const logo = (await page.getByTestId("shell-logo-cell").boundingBox())!;
    const bar = (await page.getByTestId("shell-topbar").boundingBox())!;
    expect(Math.round(bar.y)).toBe(Math.round(logo.y));
    expect(Math.round(bar.height)).toBe(Math.round(logo.height));
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
    await expect(drawer.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    await expect(drawer.getByText(en["panel.marketplace"], { exact: true })).toBeVisible();
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
    await expectTapTarget(page, page.getByRole("link", { name: en["nav.home"] }), "footer home");
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
