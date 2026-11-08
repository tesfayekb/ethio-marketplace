import { catalogText } from "@/i18n/entity";

/**
 * P-2 (c) c2a (DEC-351 §8) — THE LEVEL'S FIELDS AN ANSWER CARRIES, and the one
 * name chooser. Pure: no store, no read, so the public ad page draws its flag's
 * word from its own document without the levels store (levels-store.ts), and
 * the store's rows pick their names through the same `levelNameOf`.
 */

/** A level's look on two independent axes: placement picks the frame, badge adds the flag. */
export interface LevelLook {
  placement: string | null;
  badge: boolean | null;
}

/** A level row's names; either may be NULL in a document read before its names were carried. */
export interface LevelNames {
  nameEn: string | null;
  nameAm: string | null;
}

/** The look a card or an ad shows when its level answers none (NULL perks): the plain look. */
export const PLAIN_LOOK: LevelLook = { placement: null, badge: null };

type Rec = Record<string, unknown>;

export function isRec(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isStrOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

export function isBoolOrNull(value: unknown): value is boolean | null {
  return value === null || typeof value === "boolean";
}

/** A card's `level` object: its key and its resolved look, or null on a mismatch. */
export function parseCardLevel(value: unknown): { key: string; look: LevelLook } | null {
  if (!isRec(value)) return null;
  const { key, placement, badge } = value;
  if (typeof key !== "string" || !isStrOrNull(placement) || !isBoolOrNull(badge)) return null;
  return { key, look: { placement, badge } };
}

/**
 * The ad document's `level`: a card level plus the level row's names (NULL when
 * the row is gone, absent in an answer cached before they were carried).
 */
export function parseDocumentLevel(
  value: unknown,
): { key: string; look: LevelLook; names: LevelNames } | null {
  const level = parseCardLevel(value);
  if (level === null || !isRec(value)) return null;
  const nameEn = value.name_en === undefined ? null : value.name_en;
  const nameAm = value.name_am === undefined ? null : value.name_am;
  if (!isStrOrNull(nameEn) || !isStrOrNull(nameAm)) return null;
  return { ...level, names: { nameEn, nameAm } };
}

/** THE name chooser: the level's name in the reader's language; null when it has none. */
export function levelNameOf(names: LevelNames, language: string): string | null {
  const name = catalogText(names.nameEn, names.nameAm, language);
  return name === "" ? null : name;
}
