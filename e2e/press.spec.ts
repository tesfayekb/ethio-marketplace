import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, layoutBoxes, signIn } from "./helpers/ui";
import { adPageFixtures } from "./helpers/ad-page";

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
            target: page.getByTestId("footer-home"),
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

      // A menu row: the rail's on a wide screen, the phone menu's at 360.
      if (test.info().project.name === "mobile-360")
        await page.getByRole("button", { name: "Open menu" }).click();
      const menuRow = page.locator('[data-testid="rail-home"]:visible');
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
      const link = page.getByTestId("footer-home");
      const { before, during, after, marked } = await press(page, link);
      expect(marked).toBe(true);
      expect(during.fill).not.toBe(before.fill);
      expect(during.duration.split(",").every((d) => d.trim() === "0s")).toBe(true);
      expect(after.fill, "gone in the next frame, no fade").toBe(before.fill);
      expect(after.box).toBe(before.box);
    });
  });
}
