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
  "tier-premium-ring",
  "tier-featured-ring",
  "tier-premium-edge",
  "ribbon-pearl-1",
  "ribbon-pearl-2",
  "ribbon-pearl-3",
  "ribbon-pearl-4",
  "ribbon-pearl-5",
  "ribbon-pearl-6",
  "ribbon-pearl-end",
  "ribbon-pearl-mid",
  "ribbon-pearl-ink",
  "ribbon-pearl-emboss",
  "ribbon-pearl-shade",
  "flag-shade",
  "invite",
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
  "lift-dialog",
  "lift-rule-top",
  "lift-choice-on",
  "scrim",
  "lift-card",
  "lift-badge",
  "lift-bar-up",
  "lift-premium",
  "lift-featured",
  "lift-contact-premium",
  "lift-arrow",
  "nav-ink",
  "logo-gold",
  "nav-pill",
  "lift-pill",
  "lift-disc",
] as const;

/** Tokens a theme sets once, in its light set (the radii, the wider cards' lift — dark cards keep
 * one lift at every width — and the colours that hold in both modes: the gold and sage ribbons,
 * the satin's gloss, the mini flag's body and stars; :root only). */
export const MODE_FREE_TOKENS = [
  "lift-card-md",
  "lift-card-lg",
  "radius",
  "card-radius",
  "card-radius-md",
  "card-radius-lg",
  "box-radius",
  "box-radius-md",
  "track-radius",
  "track-radius-md",
  "segment-radius",
  "segment-radius-md",
  "ribbon-gold-1",
  "ribbon-gold-2",
  "ribbon-gold-3",
  "ribbon-gold-4",
  "ribbon-gold-5",
  "ribbon-gold-6",
  "ribbon-gold-end",
  "ribbon-gold-mid",
  "ribbon-gold-ink",
  "ribbon-gold-emboss",
  "ribbon-gold-shade",
  "ribbon-sage-1",
  "ribbon-sage-2",
  "ribbon-sage-3",
  "ribbon-sage-4",
  "ribbon-sage-5",
  "ribbon-sage-6",
  "ribbon-sage-end",
  "ribbon-sage-mid",
  "ribbon-sage-ink",
  "ribbon-sage-emboss",
  "ribbon-sage-shade",
  "ribbon-gloss",
  "ribbon-gloss-dark",
  "flag-body",
  "flag-premium-1",
  "flag-premium-2",
  "flag-premium-3",
  "flag-featured-1",
  "flag-featured-2",
  "flag-featured-3",
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

/** A fill one mode draws and the other borrows from a token (S4 ruling 4: the invite card's dark
 * fill is the Premium tier's). */
const colourOrReference = z.string().regex(new RegExp(`^(?:${OKLCH}|var\\(--[a-z][a-z0-9-]*\\))$`));

function grammarOf(name: string): z.ZodString {
  if (name.startsWith("lift-")) return shadow;
  if (name.startsWith("band")) return reference;
  if (name === "invite") return colourOrReference;
  return colour;
}

function modeFreeGrammarOf(name: string): z.ZodString {
  if (name.startsWith("lift-")) return shadow;
  if (/(?:^|-)radius(?:-|$)/.test(name)) return length;
  return colour;
}

const moded = Object.fromEntries(MODED_TOKENS.map((name) => [name, grammarOf(name)])) as Record<
  (typeof MODED_TOKENS)[number],
  z.ZodString
>;
const modeFree = Object.fromEntries(
  MODE_FREE_TOKENS.map((name) => [name, modeFreeGrammarOf(name)]),
) as Record<(typeof MODE_FREE_TOKENS)[number], z.ZodString>;

export const ThemeModeSet = z.object(moded).strict();
export const ThemeLightSet = z.object({ ...moded, ...modeFree }).strict();
export const ThemeSet = z.object({ light: ThemeLightSet, dark: ThemeModeSet }).strict();
export type ThemeSetValue = z.infer<typeof ThemeSet>;
