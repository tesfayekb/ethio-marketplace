import { z } from "zod";

/**
 * D250 (turn SAGE-S0) — THE SHAPE OF A THEME. A theme is token data, never raw CSS: each
 * value is one of four grammars — an oklch() colour, a shadow list of lengths and oklch()
 * colours, a rem length, or a reference to another token (`var(--name)`, or the one
 * `color-mix()` form the selected tint uses). Unknown token names are refused (`.strict()`).
 * A mode set names every moded token; the light set also names the mode-free radii.
 */

/** Tokens a theme sets per mode (light and dark), without their `--`. */
export const MODED_TOKENS = [
  "lift-bar",
  "lift-side",
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "gold",
  "gold-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "rule",
  "destructive-soft",
  "destructive-line",
  "success",
  "success-soft",
  "success-line",
  "warning",
  "warning-soft",
  "warning-line",
  "info",
  "info-soft",
  "info-line",
  "neutral",
  "neutral-soft",
  "hairline",
  "field",
  "track",
  "photo-empty",
  "leaf-ink",
  "tier-premium",
  "tier-premium-frame",
  "tier-premium-rule",
  "tier-premium-fold",
  "tier-premium-ink",
  "tier-premium-star",
  "tier-premium-chip",
  "tier-featured",
  "tier-featured-frame",
  "tier-featured-rule",
  "tier-featured-fold",
  "tier-featured-ink",
  "tier-featured-star",
  "band",
  "band-edge",
  "band-label",
  "lift-band",
  "lift-rail",
  "lift-rail-phone",
  "lift-subband",
  "lift-groove",
  "lift-groove-top",
  "lift-footer",
  "lift-field",
  "lift-control",
  "lift-button",
  "lift-tile",
  "lift-tile-on",
  "lift-row-on",
  "lift-track",
  "lift-segment",
  "lift-menu",
  "lift-card",
  "lift-badge",
  "lift-bar-up",
  "lift-premium",
  "lift-featured",
  "nav-ink",
  "logo-gold",
  "nav-pill",
  "lift-pill",
  "lift-disc",
] as const;

/** Tokens a theme sets once, in its light set (the radii, and the wider cards' lift — dark cards keep
 * one lift at every width; :root only). */
export const MODE_FREE_TOKENS = [
  "lift-card-md",
  "lift-card-lg",
  "radius",
  "card-radius",
  "card-radius-md",
  "card-radius-lg",
  "track-radius",
  "track-radius-md",
  "segment-radius",
  "segment-radius-md",
] as const;

const NUM = String.raw`-?\d+(?:\.\d+)?`;
const OKLCH = String.raw`oklch\(${NUM} ${NUM} ${NUM}(?: / ${NUM})?\)`;
const LENGTH = String.raw`${NUM}(?:px|rem)?`;
/** A layer's colour is oklch(), or another token (the disc's ring takes the bar's --card, P-S4). */
const LAYER = String.raw`(?:inset )?${LENGTH} ${LENGTH}(?: ${LENGTH}){0,2} (?:${OKLCH}|var\(--[a-z][a-z0-9-]*\))`;

const colour = z.string().regex(new RegExp(`^${OKLCH}$`));
const shadow = z.string().regex(new RegExp(`^${LAYER}(?:, ${LAYER})*$`));
const length = z.string().regex(/^\d+(?:\.\d+)?rem$/);
const reference = z
  .string()
  .regex(
    /^(?:var\(--[a-z][a-z0-9-]*\)|color-mix\(in oklab, var\(--[a-z][a-z0-9-]*\) \d+%, transparent\))$/,
  );

function grammarOf(name: string): z.ZodString {
  if (name.startsWith("lift-")) return shadow;
  if (name.startsWith("band")) return reference;
  return colour;
}

const moded = Object.fromEntries(MODED_TOKENS.map((name) => [name, grammarOf(name)])) as Record<
  (typeof MODED_TOKENS)[number],
  z.ZodString
>;
const modeFree = Object.fromEntries(
  MODE_FREE_TOKENS.map((name) => [name, name.startsWith("lift-") ? shadow : length]),
) as Record<(typeof MODE_FREE_TOKENS)[number], z.ZodString>;

export const ThemeModeSet = z.object(moded).strict();
export const ThemeLightSet = z.object({ ...moded, ...modeFree }).strict();
export const ThemeSet = z.object({ light: ThemeLightSet, dark: ThemeModeSet }).strict();
export type ThemeSetValue = z.infer<typeof ThemeSet>;
