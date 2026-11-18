import { levelNameOf } from "@/features/levels/level-fields";
import { exactLevel, type LevelRow } from "@/features/levels/levels-store";
import type { MessageKey } from "@/i18n";
import { parseNumber } from "@/lib/parse-input";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

import { badValueWords, SHARED_REFUSAL_WORDS } from "./listing-refusals";
import { NOTE_MAX } from "./move-reasons";

/**
 * Turn T1 part B (D242, D276) — what staff's "Set tier" asks for and how the
 * door's refusals read.
 *
 * The door `admin_set_listing_tier(listing, tier, reason, note)` (T1 M1) is the
 * authority: listings:enforce with a fresh second factor, a tier among the
 * three, never a draft, a removed or the caller's own listing, a change, a
 * reason from its list, a note for Other (at most 500 characters — the move
 * door's note rules). The lists below mirror the door's so the dialog offers
 * only what it accepts; `tier-reasons.test.ts` reads them back from M1.
 * P-2 (b): the level's days (blank open-ended, 1…3650, none on the baseline).
 * P-2 (c) c2a (DEC-351 §8, INC-1077) — the levels are the enabled level rows
 * (the levels store), named by their own names; the baseline is the row the
 * door reads as `is_baseline`, never a word.
 */

export const TIER_REASONS: readonly string[] = ["promotion", "promotion_ended", "other"];

/**
 * The level's name on a console line (the roster, the ad's page, its History, Screening): its
 * enabled row's own name; null when no enabled row holds the key (the caller says
 * "Level not known", never a default).
 */
export function levelLabel(
  levels: readonly LevelRow[],
  key: string | null,
  language: string,
): string | null {
  const row = exactLevel(levels, key);
  return row === null ? null : levelNameOf(row, language);
}

/** P-2 (b) — where the ad's level came from (`listings.tier_source`), in words. */
export const LEVEL_SOURCE_LABEL: Readonly<Record<string, MessageKey>> = {
  launch: "admin.listings.level.source.launch",
  staff: "admin.listings.level.source.staff",
  money: "admin.listings.level.source.money",
  credits: "admin.listings.level.source.credits",
};

/** Whether this listing can take a tier at all (the door's own rules, read before it is asked). */
export function mayTier(status: string): boolean {
  return status !== "removed" && status !== "draft";
}

/** P-2 (b) — the door's bound on a level's days (`admin_set_listing_tier`, badDays). */
export const TIER_DAYS_MAX = 3650;

/**
 * P-2 (b) — the Days field: blank is open-ended (null); a whole number from 1
 * to 3650 is that many days; anything else is undefined (refused, never a default).
 */
export function tierDays(raw: string): number | null | undefined {
  const parsed = parseNumber(raw, { integer: true, min: 1, max: TIER_DAYS_MAX });
  if (parsed.kind === "blank") return null;
  return parsed.kind === "number" ? parsed.value : undefined;
}

/** What is still missing before the change can be sent; null when nothing is. */
export function tierProblem(
  tier: string,
  current: string | null,
  reason: string,
  note: string,
  days: string,
  levels: readonly LevelRow[],
): MessageKey | null {
  const level = exactLevel(levels, tier);
  if (level === null) return "admin.listings.level.error.unknown";
  if (tier === current) return "admin.listings.level.error.same";
  if (reason === "") return "admin.listings.move.pickReason";
  if (reason === "other" && note.trim() === "") return "admin.listings.move.noteRequired";
  if (note.trim().length > NOTE_MAX) return "admin.listings.move.noteTooLong";
  const parsed = tierDays(days);
  if (parsed === undefined) return "admin.listings.level.error.days";
  if (parsed !== null && level.isBaseline) return "admin.listings.level.error.baselineDays";
  return null;
}

/** The tier door's words: the shared ones, and its own for the same, the removed and the days. */
const TIER_REFUSALS = {
  words: {
    ...SHARED_REFUSAL_WORDS,
    listingRemoved: "admin.listings.level.error.removed",
    nothingChanged: "admin.listings.level.error.same",
    badDays: "admin.listings.level.error.days",
  },
  generic: "common.error",
} as const satisfies RefusalFamily;

const TIER_BAD_VALUES = {
  reason: "admin.listings.move.pickReason",
  tier: "admin.listings.level.error.unknown",
} as const satisfies Record<string, MessageKey>;

/** The door's refusal (`code[:detail]`), as the person reads it. */
export function tierErrorKey(refusal: unknown): MessageKey {
  return badValueWords(refusal, TIER_BAD_VALUES) ?? readRefusal(refusal, TIER_REFUSALS).key;
}
