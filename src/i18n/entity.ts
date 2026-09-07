/**
 * U4d — ENTITY NAME RESOLUTION.
 *
 * Content copy (category and location names) is served from
 * `entity_translations` through the anon-callable `get_entity_bundle(lang)`,
 * under the SAME overlay law the UI bundle follows (INC-095):
 *
 *   DB[lang]  ▸  the row's own `name_am` column  ▸  `name_en`
 *
 * The DB bundle is an OVERLAY, never a replacement: an empty, partial or
 * failing bundle is invisible because the column and the base name still
 * answer. There is exactly ONE resolver — `entityName` — and every read site
 * calls it (law B2: one source of truth per concern).
 */

/**
 * C3-UX-2 — `attribute` joins the entity vocabulary: an attribute definition's
 * LABEL (field `label`) is translated exactly like a category or location name,
 * under the same overlay law.
 */
export type EntityType = "category" | "location" | "attribute";

/** Approved values only: `{ type: { id: { field: value } } }`, per language. */
export type EntityBundleMap = Record<string, Record<string, Record<string, string>>>;

export interface EntityBundle {
  /** The language this map was fetched for — the resolver needs it for the column tier. */
  lang: string;
  map: EntityBundleMap;
}

export const EMPTY_ENTITY_BUNDLE: EntityBundle = Object.freeze({
  lang: "en",
  map: Object.freeze({}) as EntityBundleMap,
});

export interface NamedEntity {
  id: string;
  nameEn: string;
  nameAm?: string | null;
}

/**
 * The translated FIELD each entity type carries (C3-UX-2b PART D). A category
 * and a location translate their `name`; an attribute definition translates its
 * `label` — the field the console writes and `get_entity_bundle` shapes the map
 * by. Reading the wrong field is an invisible miss (the base name still
 * answers), so the mapping lives here, once, beside the resolver.
 */
const NAME_FIELD: Record<EntityType, string> = {
  category: "name",
  location: "name",
  attribute: "label",
};

/** The single name resolver, over each type's translated field. */
export function entityName(type: EntityType, row: NamedEntity, bundle: EntityBundle): string {
  const fromDb = bundle.map[type]?.[row.id]?.[NAME_FIELD[type]];
  if (typeof fromDb === "string" && fromDb !== "") return fromDb;
  if (bundle.lang === "am" && row.nameAm) return row.nameAm;
  return row.nameEn;
}
