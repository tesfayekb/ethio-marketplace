import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, layoutBoxes, openRailScope, signIn } from "./helpers/ui";
import { adPageFixtures } from "./helpers/ad-page";
import { whilePageLives } from "./helpers/route-guard";

/**
 * Turn C1 (D263/D270, DEC-317) — a press shows the raised look at once.
 * PSP-1: at 360 (coarse) and 1440 (fine), light and dark, within one frame of pointerdown a
 *   menu row, a band segment, a list row, a button, a plain link and a card each show their
 *   raised state (shadow layers or fill change), the box does not move, and the pressed
 *   text keeps 4.5 : 1 on its own fill. The press is released with its click swallowed, so
 *   nothing is chosen.
 * PS-4: under reduced motion the press comes and goes with no transition.
 */
type Mode = "light" | "dark";
const MODES: Mode[] = ["light", "dark"];

type Look = { shadow: string; fill: string; ink: string; box: string; duration: string };

async function setMode(page: Page, mode: Mode) {
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
}

/** The look of `surface` (the element that carries the raised state) in the next frame. */
function lookOf(surface: Locator): Promise<Look> {
  return surface.evaluate(
    (el) =>
      new Promise<Look>((resolve) =>
        requestAnimationFrame(() => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          resolve({
            shadow: s.boxShadow,
            fill: s.backgroundColor,
            ink: s.color,
            box: [r.x, r.y, r.width, r.height].map((n) => n.toFixed(1)).join(","),
            duration: s.transitionDuration,
          });
        }),
      ),
  );
}

async function contrast(page: Page, ink: string, fill: string) {
  return page.evaluate(
    ([ink, fill]) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx === null) throw new Error("no 2d context");
      const lum = (color: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3), (v) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const [a, b] = [lum(ink), lum(fill)].sort((x, y) => y - x);
      return (a + 0.05) / (b + 0.05);
    },
    [ink, fill],
  );
}

/** Presses `target` (pointer down at its centre), reads `surface` one frame later, then
 *  slides off past the slop and releases there, so nothing is chosen. */
async function press(page: Page, target: Locator, surface: Locator = target) {
  await target.scrollIntoViewIfNeeded();
  const { box } = await layoutBoxes({ box: target });
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  const before = await lookOf(surface);
  await page.mouse.down();
  const during = await lookOf(surface);
  const marked = await target.evaluate((el) => el.closest("[data-pressed]") !== null);
  // Released in place with its click swallowed once: the press ends, nothing is chosen
  // (a slide off a link would start a drag instead).
  await target.evaluate((el) =>
    el.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      { capture: true, once: true },
    ),
  );
  await page.mouse.up();
  const after = await lookOf(surface);
  return { before, during, after, marked };
}

for (const mode of MODES) {
  test.describe(`The raised press (${mode})`, () => {
    const feed = adPageFixtures();
    test.afterEach(async () => {
      await feed.cleanup();
    });
    test.beforeEach(async ({ page }, testInfo) => {
      const phone = testInfo.project.name === "mobile-360";
      await page.setViewportSize(
        phone ? { width: 360, height: 800 } : { width: 1440, height: 900 },
      );
    });

    test(`PSP-1 a press raises each primitive at once and nothing moves (${mode})`, async ({
      page,
    }) => {
      const seller = await feed.scratchSeller();
      await feed.seed(seller);
      await page.goto("/");
      await setMode(page, mode);
      await signIn(page, seller.email, seller.password);
      await gotoReady(page, `/c/${seller.leafSlug}`);
      await expect(page.locator("html")).toHaveAttribute("data-mode", mode);

      const cardLink = page.getByTestId("listing-card-link");
      const cases: Array<{ name: string; target: Locator; surface?: Locator; inkCheck: boolean }> =
        [
          {
            name: "band segment",
            target: page.getByTestId("breadcrumb-home"),
            inkCheck: true,
          },
          {
            name: "button",
            target: page.getByTestId("theme-toggle"),
            inkCheck: false,
          },
          {
            name: "plain link",
            target: page.getByTestId("footer-terms"),
            inkCheck: true,
          },
          {
            name: "card",
            target: cardLink,
            surface: page.getByTestId("listing-card"),
            inkCheck: false,
          },
        ];
      for (const { name, target, surface, inkCheck } of cases) {
        await expect(target, name).toBeVisible();
        const { before, during, after, marked } = await press(page, target, surface);
        expect(marked, `${name}: marked at pointerdown`).toBe(true);
        expect(
          during.shadow !== before.shadow || during.fill !== before.fill,
          `${name}: raised in the first frame (${JSON.stringify(before)} → ${JSON.stringify(during)})`,
        ).toBe(true);
        expect(during.box, `${name}: the box did not move`).toBe(before.box);
        expect(after.box, `${name}: the box after`).toBe(before.box);
        if (inkCheck)
          expect(
            await contrast(page, during.ink, during.fill),
            `${name}: pressed ink`,
          ).toBeGreaterThanOrEqual(4.5);
      }

      // A list row: the language list's first option.
      await page.getByTestId("language-switcher").click();
      const option = page.getByTestId("language-option-en");
      await expect(option).toBeVisible();
      const row = await press(page, option);
      expect(row.marked, "list row: marked").toBe(true);
      // The list's pointer highlight already wears the current pill; the press keeps it.
      const pill = await page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.backgroundColor = "var(--color-nav-pill)";
        document.body.append(probe);
        const value = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return value;
      });
      expect(row.during.fill, "list row: the current pill").toBe(pill);
      expect(
        await contrast(page, row.during.ink, row.during.fill),
        "list row: pressed ink",
      ).toBeGreaterThanOrEqual(4.5);
      expect(row.during.box).toBe(row.before.box);
      await page.keyboard.press("Escape");
      await expect(page.getByRole("menu")).toHaveCount(0);

      // A menu row: the rail on a wide screen, the phone menu at 360 (openRailScope).
      // On a category page the menu opens at its level: its back row is an idle ITEM_CORE row.
      // (the phone's menu shows the back row; the wide rail keeps Home, idle here).
      const phoneMenu = test.info().project.name === "mobile-360";
      const menuRow = (await openRailScope(page)).getByTestId(
        phoneMenu ? "rail-menu-back" : "rail-home",
      );
      await expect(menuRow, "menu row").toBeVisible();
      const m = await press(page, menuRow);
      expect(m.marked, "menu row: marked").toBe(true);
      expect(
        m.during.shadow !== m.before.shadow || m.during.fill !== m.before.fill,
        "menu row: raised",
      ).toBe(true);
      expect(m.during.box, "menu row: the box did not move").toBe(m.before.box);
      expect(
        await contrast(page, m.during.ink, m.during.fill),
        "menu row: pressed ink",
      ).toBeGreaterThanOrEqual(4.5);
    });

    test(`PS-4 under reduced motion the press comes and goes with no transition (${mode})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await setMode(page, mode);
      await gotoReady(page, "/");
      const link = page.getByTestId("footer-terms");
      const { before, during, after, marked } = await press(page, link);
      expect(marked).toBe(true);
      expect(during.fill).not.toBe(before.fill);
      expect(during.duration.split(",").every((d) => d.trim() === "0s")).toBe(true);
      expect(after.fill, "gone in the next frame, no fade").toBe(before.fill);
      expect(after.box).toBe(before.box);
    });
  });
}

/**
 * Turn C2 (D263/D271/D272, DEC-317) — the chosen mark and the tap tick.
 * PS-2: a chosen rail item (wide) or bottom-bar item (360) is current while the chosen page's
 *   code is still held — the body (and so the frame, INC-581) still shows the old page.
 * PS-3: a choice superseded before it lands (the old item tapped again) brings the old mark
 *   back, and the chosen page never shows.
 * PS-5 (D271, 360): the bottom bar marks the page from any door — Sign in on its page signed
 *   out; Home after the breadcrumb's Home; Account on /settings.
 * PS-6 (D272): /settings' "This device" switch — role switch, on by default, kept per device
 *   across a reload; a touch on a button ticks once (10 ms) while on, never while off.
 */
const ANY_CODE = /\/assets\/[^/]*\.js(?:\?|$)/;

/** Holds every code download from now until `release` (the chosen page cannot land). */
async function holdCode(page: Page) {
  let release = () => undefined as void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(
    ANY_CODE,
    whilePageLives(async (route) => {
      await held;
      await route.continue();
    }),
  );
  return async () => {
    release();
    await page.unroute(ANY_CODE);
  };
}

test.describe("The chosen mark moves at once", () => {
  const feed = adPageFixtures();
  test.afterEach(async () => {
    await feed.cleanup();
  });

  test("PS-2 the chosen item is current before its page lands; the frame waits", async ({
    page,
  }) => {
    const seller = await feed.scratchSeller();
    const phone = test.info().project.name === "mobile-360";
    await page.goto("/");
    await signIn(page, seller.email, seller.password);
    if (phone) {
      await gotoReady(page, "/");
      const home = page.getByTestId("bottom-bar-home");
      const account = page.getByTestId("bottom-bar-account");
      await expect(home).toHaveAttribute("aria-current", "page");
      const release = await holdCode(page);
      await account.click();
      await expect(account).toHaveAttribute("aria-current", "page");
      await expect(home).not.toHaveAttribute("aria-current", /.*/);
      await expect(page.getByTestId("account-page-shell")).toHaveCount(0);
      await release();
      await expect(page.getByTestId("account-page-shell")).toBeVisible({ timeout: 15000 });
      await expect(account).toHaveAttribute("aria-current", "page");
    } else {
      await gotoReady(page, "/account");
      const rail = page.getByTestId("app-rail");
      const overview = rail.getByTestId("rail-item-ac-overview");
      const settings = rail.getByTestId("rail-item-ac-settings");
      await expect(overview).toHaveAttribute("aria-current", "page", { timeout: 15000 });
      const release = await holdCode(page);
      await settings.click();
      await expect(settings).toHaveAttribute("aria-current", "page");
      await expect(overview).not.toHaveAttribute("aria-current", /.*/);
      // INC-581: the body — and the frame around it — still shows the old page.
      await expect(page.getByTestId("account-page-shell")).toBeVisible();
      await expect(page.getByTestId("settings-page-shell")).toHaveCount(0);
      await release();
      await expect(page.getByTestId("settings-page-shell")).toBeVisible({ timeout: 15000 });
      await expect(settings).toHaveAttribute("aria-current", "page");
    }
  });

  test("PS-3 a superseded choice brings the old mark back", async ({ page }) => {
    const seller = await feed.scratchSeller();
    const phone = test.info().project.name === "mobile-360";
    await page.goto("/");
    await signIn(page, seller.email, seller.password);
    if (phone) {
      await gotoReady(page, "/");
      const home = page.getByTestId("bottom-bar-home");
      const account = page.getByTestId("bottom-bar-account");
      const release = await holdCode(page);
      await account.click();
      await expect(account).toHaveAttribute("aria-current", "page");
      await home.click();
      await expect(home).toHaveAttribute("aria-current", "page");
      await expect(account).not.toHaveAttribute("aria-current", /.*/);
      await release();
      await expect(page).toHaveURL(/\/$/);
      await expect(page.getByTestId("account-page-shell")).toHaveCount(0);
      await expect(home).toHaveAttribute("aria-current", "page");
    } else {
      await gotoReady(page, "/account");
      const rail = page.getByTestId("app-rail");
      const overview = rail.getByTestId("rail-item-ac-overview");
      const settings = rail.getByTestId("rail-item-ac-settings");
      await expect(overview).toHaveAttribute("aria-current", "page", { timeout: 15000 });
      const release = await holdCode(page);
      await settings.click();
      await expect(settings).toHaveAttribute("aria-current", "page");
      await overview.click();
      await expect(overview).toHaveAttribute("aria-current", "page");
      await expect(settings).not.toHaveAttribute("aria-current", /.*/);
      await release();
      await expect(page).toHaveURL(/\/account$/);
      await expect(page.getByTestId("settings-page-shell")).toHaveCount(0);
      await expect(overview).toHaveAttribute("aria-current", "page");
    }
  });

  test("PS-5 the bottom bar marks the page from any door (D271)", async ({ page }) => {
    test.skip(
      test.info().project.name !== "mobile-360",
      "the bottom bar is the phone's (below md)",
    );
    await gotoReady(page, "/auth");
    const signInItem = page.getByTestId("bottom-bar-sign-in");
    await expect(signInItem).toHaveAttribute("aria-current", "page");
    await expect(signInItem.getByTestId("bottom-bar-pill")).toBeVisible();
    await expect(page.getByTestId("bottom-bar-home")).not.toHaveAttribute("aria-current", /.*/);

    const seller = await feed.scratchSeller();
    await signIn(page, seller.email, seller.password);
    await gotoReady(page, `/c/${seller.leafSlug}`);
    const home = page.getByTestId("bottom-bar-home");
    await expect(home).toHaveAttribute("aria-current", "page");
    await gotoReady(page, "/settings");
    await expect(page.getByTestId("bottom-bar-account")).toHaveAttribute("aria-current", "page");
    await expect(home).not.toHaveAttribute("aria-current", /.*/);
    await page.getByTestId("breadcrumb-home").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(home).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("bottom-bar-account")).not.toHaveAttribute("aria-current", /.*/);
  });
});

test.describe("The tap tick (D272)", () => {
  test.use({ hasTouch: true });
  const feed = adPageFixtures();
  test.afterEach(async () => {
    await feed.cleanup();
  });

  /** Counts the page's vibrate calls (the app's own call goes through). */
  async function spyTicks(page: Page) {
    await page.evaluate(() => {
      const w = window as unknown as { __ticks: unknown[] };
      w.__ticks = [];
      Object.defineProperty(navigator, "vibrate", {
        configurable: true,
        value: (pattern: unknown) => {
          w.__ticks.push(pattern);
          return true;
        },
      });
    });
  }
  const ticks = (page: Page) =>
    page.evaluate(() => (window as unknown as { __ticks: unknown[] }).__ticks);

  test("PS-6 the Settings switch: on by default, kept per device, and it governs the tick", async ({
    page,
  }) => {
    const seller = await feed.scratchSeller();
    await page.goto("/");
    await signIn(page, seller.email, seller.password);
    await gotoReady(page, "/settings");
    const toggle = page.getByRole("switch", { name: "Vibrate on tap" });
    await expect(page.getByTestId("settings-this-device")).toContainText("This device");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    const theme = page.getByTestId("theme-toggle");
    await spyTicks(page);
    await theme.tap();
    expect(await ticks(page)).toEqual([10]);
    await theme.click(); // a mouse never ticks
    expect(await ticks(page)).toEqual([10]);
    await toggle.tap(); // ticks once, as the choice is still on when it is pressed
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(await ticks(page)).toEqual([10, 10]);
    await theme.tap();
    expect(await ticks(page)).toEqual([10, 10]);

    await page.reload();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await spyTicks(page);
    await theme.tap();
    expect(await ticks(page)).toEqual([]);
    await toggle.tap();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await theme.tap();
    expect(await ticks(page)).toEqual([10]);
    // A plain text link never ticks.
    await page
      .getByTestId("footer-terms")
      .evaluate((el) =>
        el.addEventListener("click", (event) => event.preventDefault(), { once: true }),
      );
    await page.getByTestId("footer-terms").tap();
    expect(await ticks(page)).toEqual([10]);
  });
});
