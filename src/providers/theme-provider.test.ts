import { describe, expect, it, vi } from "vitest";

import { parseStoredTheme, resolveTheme } from "@/lib/theme-resolver";

import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "./theme-provider";

/**
 * D250 (turn SAGE-S0) — the pre-paint script reads `ethio.theme` the way the resolver's
 * device → system order does, and writes data-theme, data-mode and .dark before the paint.
 */
function runScript(stored: string | null, prefersDark: boolean, storageThrows = false) {
  const attrs = new Map<string, string>();
  const classes = new Set<string>();
  const documentElement = {
    setAttribute: (name: string, value: string) => attrs.set(name, value),
    classList: {
      toggle: (name: string, on: boolean) => (on ? classes.add(name) : classes.delete(name)),
    },
  };
  const window = {
    localStorage: {
      getItem: (key: string) => {
        if (storageThrows) throw new Error("denied");
        return key === THEME_STORAGE_KEY ? stored : null;
      },
    },
    matchMedia: () => ({ matches: prefersDark }),
  };
  new Function("window", "document", THEME_INIT_SCRIPT)(window, { documentElement });
  return {
    theme: attrs.get("data-theme"),
    mode: attrs.get("data-mode"),
    dark: classes.has("dark"),
  };
}

const CASES: Array<[string, string | null, boolean]> = [
  ["nothing stored, light system", null, false],
  ["nothing stored, dark system", null, true],
  ["legacy bare dark", "dark", false],
  ["legacy bare light", "light", true],
  ["{name, mode}", JSON.stringify({ name: "sage", mode: "dark" }), false],
  ["malformed text", "{oops", true],
  ["an unknown name", JSON.stringify({ name: "neon", mode: "dark" }), false],
  ["a bad mode", JSON.stringify({ name: "sage", mode: "dim" }), false],
];

describe("THEME_INIT_SCRIPT", () => {
  it.each(CASES)("TP-1 %s: the script and the resolver agree", (_label, stored, prefersDark) => {
    const got = runScript(stored, prefersDark);
    const { choice } = resolveTheme({ device: stored, system: prefersDark ? "dark" : "light" });
    expect(got).toEqual({ theme: choice.name, mode: choice.mode, dark: choice.mode === "dark" });
  });

  it("TP-2 the legacy bare value reads as {sage, <mode>}; malformed text falls to the system", () => {
    expect(parseStoredTheme("dark")).toEqual({ name: "sage", mode: "dark" });
    expect(runScript("dark", false)).toEqual({ theme: "sage", mode: "dark", dark: true });
    expect(runScript("{oops", false)).toEqual({ theme: "sage", mode: "light", dark: false });
  });

  it("TP-3 a storage refusal still paints the system's mode", () => {
    expect(runScript("dark", true, true)).toEqual({ theme: "sage", mode: "dark", dark: true });
  });

  it("TP-4 a theme name containing </script> cannot close the element (scriptLiteral)", async () => {
    const planted = "</script><script>window.planted=1</script>";
    vi.resetModules();
    vi.doMock("@/lib/theme-resolver", async (importOriginal) => ({
      ...(await importOriginal<typeof import("@/lib/theme-resolver")>()),
      THEME_NAMES: ["sage", planted],
    }));
    try {
      const { THEME_INIT_SCRIPT: script } = await import("./theme-provider");
      expect(script).not.toMatch(/<\/?script/i);
      const attrs = new Map<string, string>();
      const window = {
        localStorage: { getItem: () => JSON.stringify({ name: planted, mode: "dark" }) },
        matchMedia: () => ({ matches: false }),
      };
      const documentElement = {
        setAttribute: (name: string, value: string) => attrs.set(name, value),
        classList: { toggle: () => undefined },
      };
      new Function("window", "document", script)(window, { documentElement });
      expect(attrs.get("data-theme")).toBe(planted);
    } finally {
      vi.doUnmock("@/lib/theme-resolver");
      vi.resetModules();
    }
  });
});
