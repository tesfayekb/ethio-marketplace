import type { MessageKey } from "@/i18n";
import { DOOR_REFUSED_KEY, doorCode, type DoorCode } from "@/lib/door-codes";
import { ownValue } from "@/lib/own-key";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { rpc } from "@/lib/supabase-door";

/**
 * P-2 turn (b) (DEC-349) — THE SELLER'S PROMOTE, through two doors only.
 *
 * `promote_options(listing)` answers everything the sheet shows in one read:
 * the ad's level, the market's paid switch and every enabled self-serve level
 * with its days, amount and availability, by the same reads and the same
 * country rule as `set_listing_level`. This module passes the door's numbers
 * through untouched — it computes no price, no days and no availability — and
 * reads the answer through a shape guard (the generated `Json` is not a shape).
 * `set_listing_level(listing, level)` sets the level; a refusal is read by
 * `doorCode` and named by `promoteRefusalKey`, never by its text.
 */

export const LEVEL_AVAILABILITY = [
  "available",
  "levelNotAvailable",
  "seasonEnded",
  "notOffered",
] as const;
export type LevelAvailability = (typeof LEVEL_AVAILABILITY)[number];

export interface PromoteLevel {
  key: string;
  nameEn: string;
  nameAm: string | null;
  sort: number;
  current: boolean;
  /** At or under the ad's level: set_listing_level would answer lowerLevel. */
  below: boolean;
  days: number | null;
  amount: number | null;
  currency: string | null;
  availability: LevelAvailability;
}

export interface PromoteOptions {
  status: string;
  level: { key: string; until: string | null; source: string | null };
  country: string;
  paidLevels: boolean;
  currency: string | null;
  levels: PromoteLevel[];
}

type Rec = Record<string, unknown>;

function isObject(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isStrOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}
function isNumOrNull(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value));
}

function parseLevel(value: unknown): PromoteLevel | null {
  if (!isObject(value)) return null;
  const availability = LEVEL_AVAILABILITY.find((entry) => entry === value.availability);
  if (
    availability === undefined ||
    typeof value.key !== "string" ||
    typeof value.name_en !== "string" ||
    !isStrOrNull(value.name_am) ||
    typeof value.sort !== "number" ||
    typeof value.current !== "boolean" ||
    typeof value.below !== "boolean" ||
    !isNumOrNull(value.days) ||
    !isNumOrNull(value.amount) ||
    !isStrOrNull(value.currency)
  )
    return null;
  return {
    key: value.key,
    nameEn: value.name_en,
    nameAm: value.name_am,
    sort: value.sort,
    current: value.current,
    below: value.below,
    days: value.days,
    amount: value.amount,
    currency: value.currency,
    availability,
  };
}

/** The door's answer, or null on any mismatch. */
export function parsePromoteOptions(value: unknown): PromoteOptions | null {
  if (!isObject(value) || value.ok !== true || typeof value.status !== "string") return null;
  const level = value.level;
  if (
    !isObject(level) ||
    typeof level.key !== "string" ||
    !isStrOrNull(level.until) ||
    !isStrOrNull(level.source)
  )
    return null;
  if (
    typeof value.country !== "string" ||
    typeof value.paidLevels !== "boolean" ||
    !isStrOrNull(value.currency) ||
    !Array.isArray(value.levels)
  )
    return null;
  const levels: PromoteLevel[] = [];
  for (const entry of value.levels) {
    const parsed = parseLevel(entry);
    if (parsed === null) return null;
    levels.push(parsed);
  }
  return {
    status: value.status,
    level: { key: level.key, until: level.until, source: level.source },
    country: value.country,
    paidLevels: value.paidLevels,
    currency: value.currency,
    levels,
  };
}

/** The sheet's one read; a refusal or a malformed answer throws a ReaderError. */
export async function readPromoteOptions(listingId: string): Promise<PromoteOptions> {
  const { data, error } = await rpc("promote_options", { p_listing_id: listingId });
  if (error !== null) throw new ReaderError(readerFailure(error));
  const options = parsePromoteOptions(data);
  if (options === null)
    throw new ReaderError({ class: "malformed", message: "promote_options: malformed answer" });
  return options;
}

const REFUSAL_KEY: Partial<Record<DoorCode, MessageKey>> = {
  rateLimited: "myListings.error.rateLimited",
  accountDeactivated: "myListings.error.deactivated",
  listingNotFound: "myListings.error.notYours",
  notLive: "myListings.promote.error.notLive",
  sameLevel: "myListings.promote.error.sameLevel",
  lowerLevel: "myListings.promote.error.lowerLevel",
  unknownLevel: "myListings.promote.error.unknownLevel",
  listingNotPlaced: "myListings.promote.error.listingNotPlaced",
  levelNotAvailable: "myListings.promote.error.levelNotAvailable",
  seasonEnded: "myListings.promote.error.seasonEnded",
  notOffered: "myListings.promote.error.notOffered",
  marketNotSet: "myListings.promote.error.marketNotSet",
  creditsNotAvailable: "myListings.promote.error.creditsNotAvailable",
};

/** A door refusal in the seller's words; a code without words of its own is `door.refused`. */
export function promoteRefusalKey(error: unknown): MessageKey {
  const { code } = doorCode(error);
  return (code === null ? undefined : ownValue(REFUSAL_KEY, code)) ?? DOOR_REFUSED_KEY;
}

/** Why a level the ad cannot take is not offered (the door's availability, in words). */
export function availabilityKey(availability: LevelAvailability): MessageKey | null {
  return availability === "available" ? null : (ownValue(REFUSAL_KEY, availability) ?? null);
}

export type SetLevelOutcome = { ok: true; until: string } | { ok: false; key: MessageKey };

/** Sets the ad's level as its seller. The door writes nothing when it refuses. */
export async function setListingLevel(
  listingId: string,
  levelKey: string,
): Promise<SetLevelOutcome> {
  const { data, error } = await rpc("set_listing_level", {
    p_listing_id: listingId,
    p_level_key: levelKey,
  });
  if (error !== null) return { ok: false, key: promoteRefusalKey(error) };
  if (!isObject(data) || data.ok !== true || typeof data.until !== "string")
    return { ok: false, key: "myListings.error.failed" };
  return { ok: true, until: data.until };
}
