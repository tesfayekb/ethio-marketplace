import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady } from "./helpers/ui";

/**
 * INC-1005 — OPENING OR CLOSING AN OVERLAY NEVER MOVES THE PAGE (OVS-1, OVS-2).
 *
 * Playwright launches headless Chromium with `--hide-scrollbars`, which takes the
 * scrollbar's width to 0 and hides the shift this spec exists to catch. This file
 * keeps the harness's own launch options and drops only that flag, then proves a
 * real scrollbar is drawn before it measures anything.
 *
 * The cause (measured, foundations-turn-r1a.report.md): the root element is the
 * page's scroll container, so a dropdown menu's scroll lock on body never hides the
 * scrollbar — but the lock library still adds the scrollbar's width as body's
 * right margin, and the main column narrows by it. The mechanism is src/styles.css
 * (`scrollbar-gutter: stable` on the root; the lock's compensation neutralised),
 * guarded by CF-SHIFT-1.
 */
test.use({
  launchOptions: {
    ...(process.env["E2E_CHROMIUM_PATH"]
      ? { executablePath: process.env["E2E_CHROMIUM_PATH"] }
      : {}),
    ignoreDefaultArgs: ["--hide-scrollbars"],
  },
});

type Box = { x: number; width: number; scrollbar: number; scrollY: number };

async function measure(page: Page): Promise<Box> {
  return page.evaluate(() => {
    const main = document.querySelector("main");
    const box = main?.getBoundingClientRect();
    return {
      x: box?.x ?? Number.NaN,
      width: box?.width ?? Number.NaN,
      scrollbar: window.innerWidth - document.documentElement.clientWidth,
      scrollY: window.scrollY,
    };
  });
}

/** A scrolling page: the viewport is made shorter than the page, whatever the feed holds. */
async function scrollingPage(page: Page) {
  const size = page.viewportSize();
  await page.setViewportSize({ width: size?.width ?? 1280, height: 400 });
  await scrollingPage(page);
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight), {
      message: "OVS: the page does not scroll at a 400 px viewport",
    })
    .toBeGreaterThan(200);
}

async function openAndClose(page: Page): Promise<Box[]> {
  const before = await measure(page);
  await page.getByTestId("language-switcher").click();
  await expect(page.getByRole("menu")).toBeVisible();
  const during = await measure(page);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toHaveCount(0);
  const after = await measure(page);
  return [before, during, after];
}

test.describe("INC-1005 overlay shift", () => {
  test("OVS-1 the language menu opens and closes without moving the main column", async ({
    page,
  }) => {
    await scrollingPage(page);
    const [before, during, after] = await openAndClose(page);
    expect(
      before.scrollbar,
      "OVS-1: no scrollbar was drawn; the measurement proves nothing",
    ).toBeGreaterThan(0);
    expect(during, "OVS-1: the main column moved while the menu was open").toEqual({
      ...before,
    });
    expect(after, "OVS-1: the main column moved after the menu closed").toEqual({ ...before });
  });

  test("OVS-2 on a page scrolled down, the menu keeps the column and the scroll position", async ({
    page,
  }) => {
    await scrollingPage(page);
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    const [before, during, after] = await openAndClose(page);
    expect(
      before.scrollbar,
      "OVS-2: no scrollbar was drawn; the measurement proves nothing",
    ).toBeGreaterThan(0);
    expect(during, "OVS-2: the page moved while the menu was open").toEqual({ ...before });
    expect(after, "OVS-2: the page moved after the menu closed").toEqual({ ...before });
  });
});
