import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { ThemeSet } from "./schemas/theme";
import { THEME_NAMES } from "./theme-resolver";
import { DEFAULT_THEME, THEMES } from "./themes";

/**
 * D250 (turn SAGE-S0) — one source per value: every THEMES.sage value equals its :root
 * (light) or .dark (dark) value in src/styles.css, and the stylesheet sets nothing the
 * data lacks. The schema refuses raw CSS and unknown names.
 */
const css = readFileSync(resolve(__dirname, "..", "styles.css"), "utf8").replace(
  /\/\*[\s\S]*?\*\//g,
  "",
);

function block(selector: string): Map<string, string> {
  const start = css.indexOf(`${selector} {`);
  const body = css.slice(start, css.indexOf("\n}", start));
  const out = new Map<string, string>();
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g))
    out.set(m[1]!, m[2]!.replace(/\s+/g, " ").trim());
  return out;
}

/** Layout, not look: the phone bottom bar's height. */
const NOT_THEME = new Set(["bottom-bar"]);

describe("THEMES", () => {
  it("TH-1 the theme names are the resolver's names; the default is sage", () => {
    expect(Object.keys(THEMES)).toEqual([...THEME_NAMES]);
    expect(DEFAULT_THEME).toBe("sage");
  });

  it.each([
    ["light", ":root"],
    ["dark", ".dark"],
  ] as const)("TH-2 THEMES.sage.%s equals %s, name by name, both ways", (mode, selector) => {
    const sheet = block(selector);
    for (const name of NOT_THEME) sheet.delete(name);
    expect(Object.fromEntries(sheet)).toEqual(THEMES.sage[mode]);
  });

  it("TH-3 the shape refuses raw CSS, an unknown token and a missing one", () => {
    const light = { ...THEMES.sage.light };
    expect(ThemeSet.safeParse(THEMES.sage).success).toBe(true);
    expect(
      ThemeSet.safeParse({ ...THEMES.sage, light: { ...light, card: "red; } body { x: y" } })
        .success,
    ).toBe(false);
    expect(
      ThemeSet.safeParse({ ...THEMES.sage, light: { ...light, card: "#FFFFFF" } }).success,
    ).toBe(false);
    expect(
      ThemeSet.safeParse({ ...THEMES.sage, light: { ...light, "made-up": "oklch(1 0 0)" } })
        .success,
    ).toBe(false);
    const { card: _card, ...missing } = light;
    expect(ThemeSet.safeParse({ ...THEMES.sage, light: missing }).success).toBe(false);
    expect(
      ThemeSet.safeParse({
        ...THEMES.sage,
        dark: { ...THEMES.sage.dark, "lift-card": "0 0 0 1px url(x)" },
      }).success,
    ).toBe(false);
  });
});
