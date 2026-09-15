import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

/**
 * LOCATIONS ERA L2a — THE LOCATIONS CONSOLE CLIENT SEAM.
 *
 * Every write below is a SECURITY DEFINER door landed by L1a
 * (20260915162505) that re-checks `has_permission(auth.uid(), 'locations', …)`
 * and `require_step_up_if_needed(...)` server-side (E7 / F3). The browser never
 * writes `public.locations`; the ONE direct read is `public.countries`, which
 * is public reference data behind `countries_public_read`.
 *
 * Law F4 — no phantom success: every error is thrown, never swallowed, and
 * `locationErrorKey` turns the door's own refusal id into a translated key.
 */

export type LocationLevel = "country" | "region" | "city" | "sub_city";

export const LOCATION_LEVELS: readonly LocationLevel[] = [
  "country",
  "region",
  "city",
  "sub_city",
] as const;

/** The level rank the doors and the public read both order by. */
export function levelRank(level: string): number {
  const index = LOCATION_LEVELS.indexOf(level as LocationLevel);
  return index === -1 ? LOCATION_LEVELS.length : index;
}

/** The level a child of `level` is born at; null when the floor is reached. */
export function childLevelOf(level: string): LocationLevel | null {
  const next = LOCATION_LEVELS[levelRank(level) + 1];
  return next ?? null;
}

export interface LocationRow {
  id: string;
  parentId: string | null;
  level: string;
  countryCode: string;
  regionId: string | null;
  cityId: string | null;
  slug: string;
  nameEn: string;
  iso: string | null;
  aliases: string[];
  displayOrder: number;
  centerLat: number | null;
  centerLng: number | null;
  isActive: boolean;
  source: string;
  /** The door's own human path ("Ethiopia › Oromia › Adama"). */
  path: string;
  childCount: number;
  listingCount: number;
  coverageCount: number;
  profileDefaultCount: number;
}

/**
 * L2a-R — ONE READ PER COUNTRY. The door still narrows by country, but search,
 * level and status are NOT arguments any more: they narrowed a read on every
 * keystroke, which is a request per character on an expensive-data device (G2).
 * The country's whole roster is read once and sieved in the browser
 * (`filterLocations`), so only switching the market fetches.
 */
export async function listLocations(countryCode: string): Promise<LocationRow[]> {
  const { data, error } = await supabase.rpc("admin_list_locations", {
    p_country_code: countryCode,
    p_search: "",
    p_level: null as unknown as string,
    p_active: null as unknown as boolean,
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    parentId: row.parent_id ?? null,
    level: row.level,
    countryCode: row.country_code,
    regionId: row.region_id ?? null,
    cityId: row.city_id ?? null,
    slug: row.slug,
    nameEn: row.name_en,
    iso: row.iso_3166_2 ?? null,
    aliases: (row.aliases ?? []) as string[],
    displayOrder: Number(row.display_order ?? 0),
    centerLat: row.center_lat === null ? null : Number(row.center_lat),
    centerLng: row.center_lng === null ? null : Number(row.center_lng),
    isActive: row.is_active === true,
    source: row.source ?? "admin",
    path: row.path ?? "",
    childCount: Number(row.child_count ?? 0),
    listingCount: Number(row.listing_count ?? 0),
    coverageCount: Number(row.coverage_count ?? 0),
    profileDefaultCount: Number(row.profile_default_count ?? 0),
  }));
}

export interface UpsertLocationInput {
  /** NULL creates; the door decides the level, the slug and the birth state. */
  id: string | null;
  parentId: string | null;
  level: string | null;
  nameEn: string;
  slug: string | null;
  iso: string | null;
  aliases: string[];
  displayOrder: number;
  centerLat: number | null;
  centerLng: number | null;
}

export async function upsertLocation(input: UpsertLocationInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_upsert_location", {
    p_id: input.id as string,
    p_parent_id: input.parentId as string,
    p_level: input.level as string,
    p_name_en: input.nameEn,
    p_slug: input.slug as string,
    p_iso_3166_2: input.iso as string,
    p_aliases: input.aliases,
    p_display_order: input.displayOrder,
    p_center_lat: input.centerLat as number,
    p_center_lng: input.centerLng as number,
  });
  if (error) throw error;
  return data as string;
}

export async function setLocationActive(input: { id: string; active: boolean }): Promise<void> {
  const { error } = await supabase.rpc("admin_set_location_active", {
    p_id: input.id,
    p_active: input.active,
  });
  if (error) throw error;
}

export async function moveLocation(input: { id: string; newParentId: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_move_location", {
    p_id: input.id,
    p_new_parent_id: input.newParentId,
  });
  if (error) throw error;
}

export async function reorderLocations(input: { parentId: string; ids: string[] }): Promise<void> {
  const { error } = await supabase.rpc("admin_reorder_locations", {
    p_parent_id: input.parentId,
    p_ids: input.ids,
  });
  if (error) throw error;
}

export async function deleteLocation(input: { id: string; slug: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_delete_location", {
    p_id: input.id,
    p_slug: input.slug,
  });
  if (error) throw error;
}

export interface CountryOption {
  code: string;
  nameEn: string;
  isActive: boolean;
  displayOrder: number;
}

/**
 * EVERY country, open or closed. `listCountries` (the users console's helper)
 * filters closed markets out because a profile may only point at an open one;
 * the locations filter must offer the CLOSED ones too — a market is curated
 * before it opens. Sibling, not a copy (B3).
 */
export async function listAllCountries(): Promise<CountryOption[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("code, name_en, is_active, display_order")
    .order("display_order")
    .order("code");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    code: row.code,
    nameEn: row.name_en,
    isActive: row.is_active === true,
    displayOrder: Number(row.display_order ?? 0),
  }));
}

/* ------------------------------- roster ---------------------------------- */

export interface LocationNode extends LocationRow {
  depth: number;
  /** The SLASH KEY of slugs — the import family's identity, and the row's id
   *  in the console, because a slug is not unique across parents. */
  key: string;
}

/**
 * Depth-first roster order: the country anchor first, then each child block
 * directly under its parent.
 *
 * L2a-R — the read is now the country's WHOLE tree, so every row's parent is
 * present and both the slash key and the nesting come from these rows alone in
 * one pass. The separate "ancestry" read that used to supply the key is gone.
 */
export function toRoster(rows: LocationRow[]): LocationNode[] {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const keyOf = (row: LocationRow): string => {
    const parts: string[] = [];
    let current: LocationRow | undefined = row;
    const seen = new Set<string>();
    while (current !== undefined && !seen.has(current.id)) {
      seen.add(current.id);
      parts.unshift(current.slug);
      current = current.parentId === null ? undefined : byId.get(current.parentId);
    }
    return parts.join("/");
  };

  const byParent = new Map<string, LocationRow[]>();
  const roots: LocationRow[] = [];
  for (const row of rows) {
    if (row.parentId === null || !byId.has(row.parentId)) {
      roots.push(row);
      continue;
    }
    const bucket = byParent.get(row.parentId) ?? [];
    bucket.push(row);
    byParent.set(row.parentId, bucket);
  }
  const order = (bucket: LocationRow[]) =>
    [...bucket].sort(
      (a, b) =>
        levelRank(a.level) - levelRank(b.level) ||
        a.displayOrder - b.displayOrder ||
        a.nameEn.localeCompare(b.nameEn),
    );

  const out: LocationNode[] = [];
  const walk = (row: LocationRow) => {
    const key = keyOf(row);
    out.push({ ...row, depth: key.split("/").length - 1, key });
    for (const child of order(byParent.get(row.id) ?? [])) walk(child);
  };
  for (const root of order(roots)) walk(root);
  return out;
}

export interface LocationFilter {
  /** Matched against the name, the slug and every alias — the door's own rule. */
  search: string;
  /** "" = every level. */
  level: string;
  /** "" = both, "active" | "retired" otherwise. */
  status: string;
}

/**
 * L2a-R — THE CLIENT SIEVE. It keeps the roster's depth-first order and every
 * row's absolute key (both were computed over the whole tree), so a filter can
 * never change a row's address or make it vanish under an absent parent.
 */
export function filterLocations(roster: LocationNode[], filter: LocationFilter): LocationNode[] {
  const needle = filter.search.trim().toLowerCase();
  return roster.filter((row) => {
    if (filter.level !== "" && row.level !== filter.level) return false;
    if (filter.status === "active" && !row.isActive) return false;
    if (filter.status === "retired" && row.isActive) return false;
    if (needle === "") return true;
    return (
      row.nameEn.toLowerCase().includes(needle) ||
      row.slug.toLowerCase().includes(needle) ||
      row.aliases.some((alias) => alias.toLowerCase().includes(needle))
    );
  });
}

/** The console's slash key rendered as a testid segment. */
export function keyTestId(key: string): string {
  return key.replace(/\//g, "__");
}

/**
 * The create dialog's read-only slug preview. It mirrors
 * `location_slug_candidate` (lower, non-alphanumerics → '-', trim '-') but
 * decides nothing: the door owns the final value and its uniqueness (F3).
 */
export function deriveLocationSlug(nameEn: string): string {
  const base = nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base === "" ? "place" : base;
}

/* ------------------------------ refusals --------------------------------- */

/**
 * F4 — EVERY REFUSAL IS RENDERED BY NAME. The doors raise their own vocabulary
 * (`parentInactive`, `useMoveDoor`, `retireInstead:hasChildren`, …); each id
 * maps to `admin.locations.error.<id>` and a `retireInstead` detail renders
 * beside it. Anything else is `unknown` with the raw message beneath, so an
 * unrecognised failure is still readable and pastable — never swallowed.
 */
const REFUSAL_IDS = [
  "locationMissing",
  "parentMissing",
  "parentInactive",
  "levelMismatch",
  "crossCountry",
  "badSlug",
  "missingCoordinates",
  "rootMustBeCountry",
  "badLevel",
  "isoOnRegionsOnly",
  "nameRequired",
  "unknownCountry",
  "useMoveDoor",
  "cannotMoveCountry",
  "orderCountriesInProfile",
  "notAChild",
  "slugMismatch",
  "retireInstead",
] as const;

const DETAIL_IDS = ["hasChildren", "hasListings", "hasCoverage", "hasProfileDefaults"] as const;

export interface LocationRefusal {
  key: MessageKey;
  /** A translated detail key when the door named one; else null. */
  detailKey: MessageKey | null;
  /** The raw server message, rendered only for `unknown`. */
  raw: string | null;
}

export function locationErrorKey(message: string): LocationRefusal {
  const raw = (message ?? "").trim();
  if (/permission denied/i.test(raw)) {
    return { key: "admin.locations.error.denied", detailKey: null, raw: null };
  }
  if (/step[ -]?up/i.test(raw)) {
    return { key: "admin.locations.error.stepUp", detailKey: null, raw: null };
  }
  const colon = raw.indexOf(":");
  const head = colon === -1 ? raw : raw.slice(0, colon);
  const tail = colon === -1 ? "" : raw.slice(colon + 1).trim();
  if ((REFUSAL_IDS as readonly string[]).includes(head)) {
    const detail = (DETAIL_IDS as readonly string[]).includes(tail)
      ? (`admin.locations.error.detail.${tail}` as MessageKey)
      : null;
    return {
      key: `admin.locations.error.${head}` as MessageKey,
      detailKey: detail,
      raw: null,
    };
  }
  return {
    key: "admin.locations.error.unknown",
    detailKey: null,
    raw: raw === "" ? null : raw,
  };
}

/**
 * The roster's column contract. No `minWidth` anywhere (C7): priorities alone
 * decide what a width shows, exactly as the categories roster does.
 */
export const LOCATION_COLUMN_PRIORITIES = {
  name: "primary",
  path: "secondary",
  status: "primary",
  counts: "detail",
  order: "detail",
  aliases: "wide",
  iso: "wide",
} as const;
