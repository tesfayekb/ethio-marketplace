import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, signIn } from "./helpers/ui";
import { leaseUser } from "./helpers/users";

/**
 * CL-E (D264, Foundations turn F, Sage §14) — every list of choices that opens from a control
 * opens against its control, at least as wide, without a scale, on the menu surface, with the
 * menu's rows; the control shows its open state. Each width runs in its own project
 * (360 → mobile-360, 1440 → desktop-1280). The posting pickers' cases are turn F2's (ruling 6).
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

/** Samples the panel's transform on every frame of its opening: never a scale. */
async function sampleOpening(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __clScales: string[] };
    w.__clScales = [];
    const started = performance.now();
    const tick = () => {
      document
        .querySelectorAll<HTMLElement>("[data-radix-popper-content-wrapper] > *")
        .forEach((el) => w.__clScales.push(getComputedStyle(el).transform));
      if (performance.now() - started < 400) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function scales(page: Page): Promise<string[]> {
  await page.waitForTimeout(450);
  return page.evaluate(() => (window as unknown as { __clScales: string[] }).__clScales);
}

function hasScale(transform: string): boolean {
  if (transform === "none") return false;
  const m = /matrix\(([^)]+)\)/.exec(transform);
  if (!m) return true;
  const [a, b, c, d] = m[1].split(",").map(Number);
  return Math.abs(Math.hypot(a, b) - 1) > 0.001 || Math.abs(Math.hypot(c, d) - 1) > 0.001;
}

async function judge(page: Page, control: Locator, panel: Locator, rows: Locator, width: number) {
  await sampleOpening(page);
  await control.click();
  await expect(panel).toBeVisible();
  expect((await scales(page)).filter(hasScale)).toEqual([]);
  await expect(control).toHaveAttribute("data-state", "open");
  const want = await tokenValue(page, "--nav-pill", "background-color");
  expect(await control.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(want);

  const c = await control.boundingBox();
  const p = await panel.boundingBox();
  if (!c || !p) throw new Error("no box");
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
  expect(look.shadow).toBe(await tokenValue(page, "--shadow-menu", "box-shadow"));
  expect(look.bg).toBe(await tokenValue(page, "--popover", "background-color"));

  const count = await rows.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const h = (await rows.nth(i).boundingBox())?.height ?? 0;
    if (width < 768) expect(h).toBeGreaterThanOrEqual(44);
    else expect(Math.abs(h - 40)).toBeLessThanOrEqual(0.5);
  }
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`choice lists at ${width}, ${mode}`, () => {
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          width < 768 !== (testInfo.project.name === "mobile-360"),
          "each width uses its pointer project",
        );
        await openAt(page, width, mode);
      });

      test(`CL-E1 the language list (${width}, ${mode})`, async ({ page }) => {
        const control = page.locator('[data-testid="language-switcher"]:visible').first();
        await judge(page, control, page.getByRole("menu"), page.getByRole("menuitemradio"), width);
      });

      test(`CL-E2 the location list (${width}, ${mode})`, async ({ page }) => {
        const control = page.getByTestId("location-level-country");
        await judge(page, control, page.getByRole("menu"), page.getByRole("menuitem"), width);
      });

      test(`CL-E3 the account list and the panel switch (${width}, ${mode})`, async ({ page }) => {
        const user = await leaseUser();
        await signIn(page, user.email, user.password);
        await gotoReady(page, "/");
        const account = page.locator('[data-testid="account-menu"]:visible');
        if ((await account.count()) > 0)
          await judge(
            page,
            account.first(),
            page.getByRole("menu"),
            page.getByRole("menuitem"),
            width,
          );
        if (width >= 768) {
          const switcher = page.locator('[data-testid="panel-header-switcher"]:visible').first();
          await judge(page, switcher, page.getByRole("menu"), page.getByRole("menuitem"), width);
        }
      });
    });
  }
}
