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

export type EntityType = "category" | "location";

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
 * The single name resolver. `field` is always `name` today; entity fields
 * beyond names arrive with the REQ-004 era.
 */
export function entityName(type: EntityType, row: NamedEntity, bundle: EntityBundle): string {
  const fromDb = bundle.map[type]?.[row.id]?.["name"];
  if (typeof fromDb === "string" && fromDb !== "") return fromDb;
  if (bundle.lang === "am" && row.nameAm) return row.nameAm;
  return row.nameEn;
}
