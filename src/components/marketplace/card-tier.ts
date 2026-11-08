import type { LevelLook } from "@/features/levels/levels-store";

import type { RibbonPalette } from "./ribbon-geometry";

/**
 * Sage S4 (spec §7, §8; G0 concern 1) — A CARD'S LEVEL LOOK IS DRAWN BY ONE MECHANISM. Every
 * surface that draws a listing card (the feed, the category pages, saved ads, similar ads, the
 * seller page) reads its look here: the card's fill and frame over CARD_SURFACE, the place
 * line's divider and ink, the ribbon's palette, and for a badged card the mini flag and the
 * level's word (tier-flag.tsx). Every value is a token class or a token reference; a surface that
 * draws a look its own way fails CF-TIER-1 (scripts/conformance/card-tiers.test.ts).
 *
 * P-2 (c) c2a (DEC-351 §8, DEC-352) — the look is the level's two axes, resolved per card by
 * `level_perks_for` and answered with the card: `placement` picks the frame (`standard` plain,
 * `boost` the green frame, `top` the gold one) and `badge` adds the flag in the frame's colours,
 * whatever the frame (a plain frame flies the green flag). A NULL or unknown placement is the
 * plain frame; a NULL badge is no flag. No level is named here.
 */
export type Placement = "standard" | "boost" | "top";

/** The frame a look's placement picks; anything else is the plain frame. */
export function placementOf(look: LevelLook): Placement {
  return look.placement === "top" || look.placement === "boost" ? look.placement : "standard";
}

export interface BadgeLook {
  /** The word beside the place, and the stars before it (spec §7). */
  word: string;
  star: string;
  stars: number;
  /** The flag: its length in picture units, its frame, fold and star stops (token references). */
  flag: { length: number; frame: string; fold: string; stops: readonly [string, string, string] };
  /** Spec §12 — the ad page's level tag: its ring. */
  ring: string;
}

export interface CardLook {
  /** Over CARD_SURFACE: the frame's fill and its edge and glow in place of the card's lift. */
  surface: string;
  /** The place line: its divider, and its ink (D269: the green fill takes its own). */
  place: string;
  palette: RibbonPalette;
  /** The flag and the word, when the look carries the badge. */
  badge: BadgeLook | null;
}

type Frame = Omit<CardLook, "badge">;

const FRAMES: Record<Placement, Frame> = {
  standard: { surface: "", place: "border-card-rule text-leaf-ink", palette: "pearl" },
  boost: {
    surface: "bg-tier-featured shadow-featured",
    place: "border-tier-featured-rule text-tier-featured-ink",
    palette: "sage",
  },
  top: {
    surface: "bg-tier-premium shadow-premium",
    place: "border-tier-premium-rule text-leaf-ink",
    palette: "gold",
  },
};

const GOLD_FLAG: BadgeLook = {
  word: "text-tier-premium-ink",
  star: "text-tier-premium-star",
  stars: 2,
  flag: {
    length: 64,
    frame: "var(--tier-premium-frame)",
    fold: "var(--tier-premium-fold)",
    stops: ["var(--flag-premium-1)", "var(--flag-premium-2)", "var(--flag-premium-3)"],
  },
  ring: "ring-tier-premium-ring",
};

const GREEN_FLAG: BadgeLook = {
  word: "text-tier-featured-ink",
  star: "text-tier-featured-star",
  stars: 1,
  flag: {
    length: 44,
    frame: "var(--tier-featured-frame)",
    fold: "var(--tier-featured-fold)",
    stops: ["var(--flag-featured-1)", "var(--flag-featured-2)", "var(--flag-featured-3)"],
  },
  ring: "ring-tier-featured-ring",
};

const FLAGS: Record<Placement, BadgeLook> = {
  standard: GREEN_FLAG,
  boost: GREEN_FLAG,
  top: GOLD_FLAG,
};

/** The look a card of this level look takes. */
export function cardLookOf(look: LevelLook): CardLook {
  const placement = placementOf(look);
  return { ...FRAMES[placement], badge: look.badge === true ? FLAGS[placement] : null };
}

/**
 * Sage S5 (spec §12, §13; ruling 1) — THE AD PAGE'S LEVEL LOOK, by the same rule as the card's:
 * on a framed ad only the title box is tinted, every other box of the ad body is white with the
 * frame, and the accents inside the body take the frame's colour (the gold frame gold; the green
 * frame keeps the site green). Each key is a class set merged over the page's own (cn), so the free entry is
 * empty where the page's own look is the free one. The safety box never reads it.
 */
export interface AdPageLook {
  /** The title box, over CARD_SURFACE: the tier's fill and frame. */
  titleBox: string;
  /** The ad body's other boxes and the section bar, over CARD_SURFACE: the tier frame. */
  box: string;
  /** The section bar's current tab, over BAND_TAB_CURRENT. */
  tab: string;
  /** The price, the links, Save, Share, Read more: the accent ink. */
  ink: string;
  /** Show contact, over the default button. */
  contact: string;
  /** The Negotiable chip, over its own look. */
  negotiable: string;
  /** A key-fact chip's edge. */
  chip: string;
  /** The dividers inside the boxes. */
  rule: string;
  /** The chosen thumbnail's edge. */
  thumbOn: string;
  /** Enlarge map's outline. */
  edge: string;
  palette: RibbonPalette;
}

const FREE_PAGE: AdPageLook = {
  titleBox: "",
  box: "",
  tab: "",
  ink: "text-primary",
  contact: "",
  negotiable: "",
  chip: "border-border",
  rule: "border-border",
  thumbOn: "border-primary",
  edge: "border-hairline",
  palette: "pearl",
};

const PAGES: Record<Placement, AdPageLook> = {
  standard: FREE_PAGE,
  boost: {
    ...FREE_PAGE,
    titleBox: "bg-tier-featured shadow-featured",
    box: "shadow-featured",
    rule: "border-tier-featured-rule",
    palette: "sage",
  },
  top: {
    titleBox: "bg-tier-premium shadow-premium",
    box: "shadow-premium",
    tab: "bg-tier-premium text-tier-premium-ink ring-1 ring-inset ring-tier-premium-ring",
    ink: "text-tier-premium-ink",
    contact: "bg-gold text-gold-foreground shadow-contact-premium hover:bg-gold/90",
    negotiable: "bg-tier-premium-chip text-tier-premium-ink",
    chip: "border-tier-premium-ring",
    rule: "border-tier-premium-rule",
    thumbOn: "border-gold",
    edge: "border-tier-premium-edge",
    palette: "gold",
  },
};

/** The look the ad page of a listing with this level look takes; null (not known) is the free look. */
export function adPageLookOf(look: LevelLook | null): AdPageLook {
  return look === null ? FREE_PAGE : PAGES[placementOf(look)];
}

/** Every look a card can take — each frame without and with the badge — for the fixture grid (/dev/style). */
export const CARD_LOOKS: readonly { id: string; look: LevelLook }[] = (
  ["standard", "boost", "top"] as const
).flatMap((placement) => [
  { id: placement, look: { placement, badge: false } },
  { id: `${placement}-badge`, look: { placement, badge: true } },
]);

/**
 * Sage S5 (ruling 1, answer 1) — a level key read from outside: a non-empty string, or null when
 * it is not known. P-2 (c) c2a — any key: levels are rows, so a fourth is a level too.
 */
export function tierOf(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}
