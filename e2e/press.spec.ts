import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, signIn } from "./helpers/ui";
import { adPageFixtures } from "./helpers/ad-page";

/**
 * Turn C1 (D263/D270, DEC-317) — a press shows the raised look at once.
 * PS-1: at 360 (coarse) and 1440 (fine), light and dark, within one frame of pointerdown a
 *   menu row, a band segment, a list row, a button, a plain link and a card each show their
 *   raised state (shadow layers or fill change), the box does not move, and the pressed
 *   text keeps 4.5 : 1 on its own fill. The press is released off the element (past the
 *   slop), so nothing is chosen.
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
  const box = await target.boundingBox();
  if (box === null) throw new Error("[e2e:ps] the element has no box");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  const before = await lookOf(surface);
  await page.mouse.down();
  const during = await lookOf(surface);
  const marked = await target.evaluate((el) => el.closest("[data-pressed]") !== null);
  await page.mouse.move(x + 200, y + 200, { steps: 2 });
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
      await page.setViewportSize(phone ? { width: 360, height: 800 } : { width: 1440, height: 900 });
    });

    test(`PS-1 a press raises each primitive at once and nothing moves (${mode})`, async ({
      page,
    }) => {
      const seller = await feed.scratchSeller();
      await feed.seed(seller);
      await page.goto("/");
      await setMode(page, mode);
      await signIn(page, seller.email, seller.password);
      await gotoReady(page, `/c/${seller.leafSlug}`);
      await expect(page.locator("html")).toHaveAttribute("data-mode", mode);

      const cardLink = page.getByTestId("listing-card-link").first();
      const cases: Array<{ name: string; target: Locator; surface?: Locator; inkCheck: boolean }> = [
        {
          name: "menu row",
          target: page.getByTestId("app-rail").locator("a[href]:visible").first(),
          inkCheck: true,
        },
        {
          name: "band segment",
          target: page.getByTestId("location-track").locator("button:visible").first(),
          inkCheck: true,
        },
        { name: "button", target: page.locator("header button[data-pressable]:visible").first(), inkCheck: false },
        {
          name: "plain link",
          target: page.getByTestId("footer-column").locator("a[href]").first(),
          inkCheck: true,
        },
        {
          name: "card",
          target: cardLink,
          surface: page.getByTestId("listing-card").first(),
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
          expect(await contrast(page, during.ink, during.fill), `${name}: pressed ink`).toBeGreaterThanOrEqual(4.5);
      }

      // A list row: the language list's first option.
      await page.getByTestId("language-switcher").click();
      const option = page.locator('[data-testid^="language-option-"]').first();
      await expect(option).toBeVisible();
      const row = await press(page, option);
      expect(row.marked, "list row: marked").toBe(true);
      expect(row.during.fill, "list row: the current pill").not.toBe(row.before.fill === row.during.fill ? "" : row.before.fill);
      expect(await contrast(page, row.during.ink, row.during.fill), "list row: pressed ink").toBeGreaterThanOrEqual(4.5);
      expect(row.during.box).toBe(row.before.box);
    });

    test(`PS-4 under reduced motion the press comes and goes with no transition (${mode})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await setMode(page, mode);
      await gotoReady(page, "/");
      const link = page.getByTestId("footer-column").locator("a[href]").first();
      const { before, during, after, marked } = await press(page, link);
      expect(marked).toBe(true);
      expect(during.fill).not.toBe(before.fill);
      expect(during.duration.split(",").every((d) => d.trim() === "0s")).toBe(true);
      expect(after.fill, "gone in the next frame, no fade").toBe(before.fill);
      expect(after.box).toBe(before.box);
    });
  });
}
