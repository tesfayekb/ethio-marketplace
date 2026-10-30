import { describe, expect, it } from "vitest";

import {
  DEFAULT_THEME,
  parseStoredTheme,
  resolveTheme,
  storedThemeText,
} from "./theme-resolver";

/** D250 (turn SAGE-S0) — the order shop → account → device → system, and its fall-through. */
describe("resolveTheme", () => {
  const dark = { name: "sage", mode: "dark" } as const;
  const light = { name: "sage", mode: "light" } as const;

  it("TR-1 the order is shop, then account, then device, then system", () => {
    const all = {
      shop: dark,
      account: { failed: false as const, value: light },
      device: storedThemeText(light),
      system: "light" as const,
    };
    expect(resolveTheme(all)).toEqual({ choice: dark, source: "shop" });
    expect(resolveTheme({ ...all, shop: undefined, account: { failed: false, value: dark } })).toEqual(
      { choice: dark, source: "account" },
    );
    expect(resolveTheme({ device: storedThemeText(dark), system: "light" })).toEqual({
      choice: dark,
      source: "device",
    });
    expect(resolveTheme({ system: "dark" })).toEqual({
      choice: { name: DEFAULT_THEME, mode: "dark" },
      source: "system",
    });
  });

  it("TR-2 an unknown name falls through to the next source", () => {
    expect(
      resolveTheme({
        shop: { name: "neon", mode: "dark" },
        device: storedThemeText(light),
        system: "dark",
      }),
    ).toEqual({ choice: light, source: "device" });
  });

  it("TR-3 a removed name stored on the device falls through to the system", () => {
    expect(
      resolveTheme({ device: JSON.stringify({ name: "coffee", mode: "dark" }), system: "light" }),
    ).toEqual({ choice: { name: DEFAULT_THEME, mode: "light" }, source: "system" });
  });

  it("TR-4 a failed account read is unknown: the device's value stands, never the system", () => {
    expect(
      resolveTheme({ account: { failed: true }, device: storedThemeText(dark), system: "light" }),
    ).toEqual({ choice: dark, source: "device" });
  });

  it("TR-5 the device text: legacy bare modes read as sage; malformed text is ignored", () => {
    expect(parseStoredTheme("dark")).toEqual(dark);
    expect(parseStoredTheme("light")).toEqual(light);
    expect(parseStoredTheme("{not json")).toBeNull();
    expect(parseStoredTheme(JSON.stringify({ name: "sage", mode: "dim" }))).toBeNull();
    expect(parseStoredTheme(JSON.stringify(["sage", "dark"]))).toBeNull();
    expect(parseStoredTheme(null)).toBeNull();
    expect(parseStoredTheme(storedThemeText(dark))).toEqual(dark);
  });
});
