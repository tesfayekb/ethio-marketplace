import type { Locator, Page } from "@playwright/test";
import { THEMES } from "../src/lib/themes";
import { expect, test } from "./fixtures";
import { gotoReady } from "./helpers/ui";

/**
 * SGS-1…SGS-6 (redesign Part 2, turn SAGE-S1; spec §1, §2, §3, §10, §11) — THE SHELL IN THE
 * SAGE LOOK, light and dark, at 390, 834 and 1440 px. Every expected value is read from the
 * theme data (src/lib/themes.ts): the browser resolves it on a probe and the surface's
 * computed style must equal the probe's — never a retyped number.
 */

type Mode = "light" | "dark";
type Token = keyof typeof THEMES.sage.light;

const WIDTHS = [390, 834, 1440] as const;
const MODES: Mode[] = ["light", "dark"];

function tokenOf(mode: Mode, name: Token): string {
  const set: Record<string, string> = { ...THEMES.sage.light, ...THEMES.sage[mode] };
  const value = set[name];
  if (value === undefined) throw new Error(`no token ${name}`);
  return value;
}

/** The browser's computed form of a token value, set on a probe in the page's own scope. */
async function resolved(page: Page, property: "backgroundColor" | "boxShadow" | "color" | "borderTopColor" | "borderTopLeftRadius", value: string) {
  return page.evaluate(
    ([prop, raw]) => {
      const probe = document.createElement("div");
      if (prop === "borderTopColor") probe.style.border = `1px solid ${raw}`;
      else probe.style.setProperty(
        prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
        raw,
      );
      document.body.append(probe);
      const out = getComputedStyle(probe)[prop as "color"];
      probe.remove();
      return out;
    },
    [property, value] as const,
  );
}

const style = (locator: Locator, property: string) =>
  locator.evaluate((el, prop) => getComputedStyle(el)[prop as "color"], property);

async function open(page: Page, width: number, mode: Mode) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate(
    (m) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode: m })),
    mode,
  );
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage shell at ${width} px, ${mode}`, () => {
      test.beforeEach(async ({ page }, testInfo) => {
        const phone = width < 768;
        test.skip(
          phone !== (testInfo.project.name === "mobile-360"),
          "each width runs in the project of its pointer",
        );
        await open(page, width, mode);
      });

      test(`SGS-1 the top band and the search pill (${width}, ${mode})`, async ({ page }) => {
        const band = page.getByTestId("shell-band");
        expect(await style(band, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-band")),
        );
        if (width >= 768) {
          const field = page.getByTestId("search-inline-input");
          expect(await style(field, "backgroundColor")).toBe(
            await resolved(page, "backgroundColor", tokenOf(mode, "field")),
          );
          expect(await style(field, "boxShadow")).toBe(
            await resolved(page, "boxShadow", tokenOf(mode, "lift-field")),
          );
          expect(await style(field, "borderTopWidth")).toBe("0px");
          const box = await field.boundingBox();
          const radius = parseFloat(await style(field, "borderTopLeftRadius"));
          expect(radius, "SGS-1 the search field is a pill").toBeGreaterThanOrEqual(
            (box?.height ?? 0) / 2,
          );
        }
      });

      test(`SGS-2 the controls share one look (${width}, ${mode})`, async ({ page }) => {
        const ids = ["language-switcher", "theme-toggle", ...(width < 768 ? ["search-toggle"] : [])];
        for (const id of ids) {
          const control = page.getByTestId(id);
          expect(await style(control, "backgroundColor"), `${id} surface`).toBe(
            await resolved(page, "backgroundColor", tokenOf(mode, "card")),
          );
          expect(await style(control, "boxShadow"), `${id} lift`).toBe(
            await resolved(page, "boxShadow", tokenOf(mode, "lift-control")),
          );
          expect(await style(control, "borderTopColor"), `${id} edge`).toBe(
            await resolved(page, "borderTopColor", tokenOf(mode, "hairline")),
          );
          expect(await style(control, "borderTopLeftRadius"), `${id} corner`).toBe(
            await resolved(page, "borderTopLeftRadius", tokenOf(mode, "radius")),
          );
        }
      });

      test(`SGS-3 the menu: surface, tiles and the selected row (${width}, ${mode})`, async ({
        page,
      }) => {
        const phone = width < 768;
        const surface = page.getByTestId(phone ? "rail-strip" : "rail");
        expect(await style(surface, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, phone ? "lift-rail-phone" : "lift-rail")),
        );
        expect(await style(surface, "backgroundColor")).toBe(
          await resolved(page, "backgroundColor", tokenOf(mode, "sidebar")),
        );
        const home = page.getByTestId(phone ? "strip-home" : "rail-home");
        const tile = home.locator("span.rounded-full").first();
        expect(await style(tile, "backgroundColor"), "SGS-3 the selected tile is filled").toBe(
          await resolved(page, "backgroundColor", tokenOf(mode, "primary")),
        );
        expect(await style(tile, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-tile-on")),
        );
        if (!phone) {
          expect(await style(home, "backgroundColor"), "SGS-3 the selected row is raised").toBe(
            await resolved(page, "backgroundColor", tokenOf(mode, "card")),
          );
          expect(await style(home, "boxShadow")).toBe(
            await resolved(page, "boxShadow", tokenOf(mode, "lift-row-on")),
          );
          expect(await style(home, "color"), "SGS-3 the nav ink").toBe(
            await resolved(page, "color", tokenOf(mode, "nav-ink")),
          );
        }
        const idle = surface.locator("[data-testid^='rail-cat-'], [data-testid^='strip-cat-']");
        const idleTile = idle.first().locator("span.rounded-full").first();
        if ((await idle.count()) > 0) {
          expect(await style(idleTile, "backgroundColor"), "SGS-3 an idle tile").toBe(
            await resolved(page, "backgroundColor", tokenOf(mode, "card")),
          );
          expect(await style(idleTile, "boxShadow")).toBe(
            await resolved(page, "boxShadow", tokenOf(mode, "lift-tile")),
          );
          expect(await style(idleTile, "borderTopColor")).toBe(
            await resolved(page, "borderTopColor", tokenOf(mode, "hairline")),
          );
        }
      });

      test(`SGS-4 the footer (${width}, ${mode})`, async ({ page }) => {
        const footer = page.locator("footer").first();
        expect(await style(footer, "backgroundColor")).toBe(
          await resolved(page, "backgroundColor", tokenOf(mode, "sidebar")),
        );
        expect(await style(footer, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-footer")),
        );
        const divider = page.getByTestId("footer-copyright").locator("..");
        expect(await style(divider, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-groove-top")),
        );
      });

      test(`SGS-5 the bottom bar and the raised Post disc (${width}, ${mode})`, async ({ page }) => {
        test.skip(width >= 768, "the bottom bar is a phone's");
        const bar = page.getByTestId("bottom-bar");
        expect(await style(bar, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-bar-up")),
        );
        expect(await style(bar, "borderTopLeftRadius")).toBe(
          await resolved(page, "borderTopLeftRadius", "var(--radius-bar)"),
        );
        const disc = page.getByTestId("bottom-bar-disc");
        expect(await style(disc, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-disc")),
        );
        const d = await disc.boundingBox();
        const b = await bar.boundingBox();
        expect(Math.round(d?.width ?? 0), "SGS-5 a 40 px disc").toBe(40);
        expect(
          Math.round((b?.y ?? 0) - (d?.y ?? 0)),
          "SGS-5 raised 14 px above the bar's top edge",
        ).toBe(14);
      });

      test(`SGS-6 Sign in is raised (${width}, ${mode})`, async ({ page }) => {
        test.skip(width < 768, "the top bar's Sign in shows from 768 px");
        const signIn = page.getByTestId("topbar-controls").locator('a[href="/auth"]');
        expect(await style(signIn, "boxShadow")).toBe(
          await resolved(page, "boxShadow", tokenOf(mode, "lift-button")),
        );
        expect(await style(signIn, "fontWeight")).toBe("600");
      });
    });
  }
}
