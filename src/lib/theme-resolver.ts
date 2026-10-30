/**
 * D250 (turn SAGE-S0) — WHICH THEME AND MODE A PAGE DRAWS. One order: the shop's theme, then
 * the account's, then the device's (`ethio.theme`), then the system (the default theme in the
 * device's preferred mode). A source that is absent, unknown, removed or malformed falls
 * through to the next one: that is the designed path, not an error, so it logs nothing. A
 * failed account read is unknown, never "system" (D239's rule): it falls through and the
 * device's value stands. Pure and tiny — the first paint reads only these names, never the
 * theme data (src/lib/themes.ts, whose keys themes.test.ts holds equal to THEME_NAMES).
 */

export const THEME_NAMES = ["sage"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];
export const DEFAULT_THEME: ThemeName = "sage";

export type ThemeMode = "light" | "dark";
export type ThemeChoice = { name: ThemeName; mode: ThemeMode };

/** An account's read: its stored value, or a failed read (unknown — never "system"). */
export type AccountThemeRead = { failed: false; value: unknown } | { failed: true };

export type ThemeSources = {
  shop?: unknown;
  account?: AccountThemeRead;
  /** The raw `ethio.theme` text, or null when nothing is stored. */
  device?: string | null;
  /** The device's preference (prefers-color-scheme). */
  system: ThemeMode;
};

export type ThemeSource = "shop" | "account" | "device" | "system";

function isMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

function isName(value: unknown): value is ThemeName {
  return typeof value === "string" && (THEME_NAMES as readonly string[]).includes(value);
}

/** A `{name, mode}` value with a known name and a mode; anything else is null. */
export function parseThemeChoice(value: unknown): ThemeChoice | null {
  if (typeof value !== "object" || value === null) return null;
  const { name, mode } = value as { name?: unknown; mode?: unknown };
  return isName(name) && isMode(mode) ? { name, mode } : null;
}

/** The device's stored text: `{name, mode}` JSON, or a legacy bare "light"/"dark" (= sage). */
export function parseStoredTheme(stored: string | null | undefined): ThemeChoice | null {
  if (!stored) return null;
  if (isMode(stored)) return { name: DEFAULT_THEME, mode: stored };
  try {
    return parseThemeChoice(JSON.parse(stored));
  } catch {
    // Malformed text is the designed fall-through (D250), not an error.
    return null;
  }
}

export function resolveTheme(sources: ThemeSources): { choice: ThemeChoice; source: ThemeSource } {
  const shop = parseThemeChoice(sources.shop);
  if (shop) return { choice: shop, source: "shop" };
  const account =
    sources.account && !sources.account.failed ? parseThemeChoice(sources.account.value) : null;
  if (account) return { choice: account, source: "account" };
  const device = parseStoredTheme(sources.device);
  if (device) return { choice: device, source: "device" };
  return { choice: { name: DEFAULT_THEME, mode: sources.system }, source: "system" };
}

/** The text the device stores for a choice. */
export function storedThemeText(choice: ThemeChoice): string {
  return JSON.stringify({ name: choice.name, mode: choice.mode });
}
