import type { Locator, Page } from "@playwright/test";
import { THEMES } from "../../src/lib/themes";
import { withoutEmptyLayers } from "./shadows";

/**
 * The Sage look as the page resolves it: a token's value, an element's computed style, a lift,
 * WCAG contrast through a canvas pixel, and the theme mode a test opens in.
 */
export type Mode = "light" | "dark";
export type Token = keyof typeof THEMES.sage.light;
export const MODES: Mode[] = ["light", "dark"];

/** A value as the page resolves it inside `scope`: a probe's computed style. */
export async function resolvedIn(scope: Locator, property: string, value: string) {
  return scope.evaluate(
    (el, { property, value }) => {
      const probe = document.createElement("div");
      probe.style.setProperty(property, value);
      el.append(probe);
      const result = getComputedStyle(probe).getPropertyValue(property);
      probe.remove();
      return result;
    },
    { property, value },
  );
}

/** A Sage token's value in `mode`, resolved as the page would draw it. */
export async function tokenStyle(page: Page, mode: Mode, token: Token, property: string) {
  const tokens = { ...THEMES.sage.light, ...THEMES.sage[mode] };
  return resolvedIn(page.locator("body"), property, tokens[token]);
}

export async function style(locator: Locator, property: string) {
  const value = await locator.evaluate(
    (el, property) => getComputedStyle(el).getPropertyValue(property).trim(),
    property,
  );
  return property === "box-shadow" ? withoutEmptyLayers(value) : value;
}

/** A lift token as the page resolves it now (its layers step up at md and lg). */
export async function liftOf(page: Page, token: string) {
  return withoutEmptyLayers(
    await resolvedIn(page.locator("body"), "box-shadow", `var(--${token})`),
  );
}

/** WCAG contrast of two CSS colours, each resolved to 8-bit sRGB through a canvas pixel. */
export async function contrast(page: Page, ink: string, fill: string) {
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
      const [lo, hi] = [lum(ink), lum(fill)].sort((a, b) => a - b);
      return (hi + 0.05) / (lo + 0.05);
    },
    [ink, fill],
  );
}

/** The Sage theme in `mode`, stored where the page reads it on its next load. */
export async function setMode(page: Page, mode: Mode) {
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
}
