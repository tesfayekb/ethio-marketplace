import { useEffect, useState } from "react";

import { distanceKm } from "@/lib/geo-distance";

/**
 * LOCATIONS ERA L4b — THE SHELL'S GEOGRAPHY SEAM (B2: one utility, one concern).
 *
 * The picker no longer reads `public.locations` from the browser. It reads the
 * two CACHED public routes instead:
 *
 *   GET /api/locations          → the open markets (L4b)
 *   GET /api/locations/<code>   → that market's visible tree (L1c)
 *
 * Both answer with an ETag and `public, max-age=300, stale-while-revalidate`,
 * so a repeat costs a 304 or nothing at all (G1/G2). The browser's DEFAULT
 * cache is used deliberately — no cache-busting query parameter (law I6).
 *
 * A module-level promise cache keeps ONE in-flight request per key, so the shell
 * (which derives the initial path) and the selector (which renders the cascade)
 * share a single fetch rather than issuing two.
 *
 * NAMES: the routes serve `name_en` only. Every rendered name still resolves
 * through `entityName('location', …)` — the entity bundle first, `name_en` as
 * the fallback (law D3).
 *
 * THE SAVED AREA (law 12) is the cookie `ethio_area`, shaped `<CC>:<node id>`,
 * so the country is known BEFORE the tree loads. The GUESS is never written to
 * it (law 10).
 */

export interface OpenMarket {
  code: string;
  nameEn: string;
  anchorSlug: string | null;
  displayOrder: number;
}

export interface TreeNode {
  id: string;
  parentId: string | null;
  level: string;
  slug: string;
  nameEn: string | null;
  /** L4b-2 — the curated centre, so the guess can be resolved by GEOMETRY. */
  centerLat: number | null;
  centerLng: number | null;
  /** L4b-2 — the region's ISO 3166-2 code ("ET-OR"), for the region branch. */
  isoCode: string | null;
}

/* ------------------------------- the cookie ------------------------------- */

export const AREA_COOKIE = "ethio_area";
/** One year, the star cookie's own shape (§ i18n provider). */
const AREA_COOKIE_MAX_AGE = 31_536_000;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CODE_RE = /^[A-Za-z]{2}$/;

export interface SavedArea {
  country: string;
  id: string;
}

/** Parses `<CC>:<uuid>`; anything else is no saved area at all. */
export function parseAreaCookie(raw: string | null): SavedArea | null {
  if (raw === null) return null;
  const [code, id, ...rest] = raw.trim().split(":");
  if (rest.length > 0 || code === undefined || id === undefined) return null;
  if (!CODE_RE.test(code) || !UUID_RE.test(id)) return null;
  return { country: code.toUpperCase(), id };
}

export function readAreaCookie(): SavedArea | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${AREA_COOKIE}=([^;]*)`));
    return parseAreaCookie(match ? decodeURIComponent(match[1] ?? "") : null);
  } catch {
    return null;
  }
}

export function writeAreaCookie(country: string, id: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AREA_COOKIE}=${country.toUpperCase()}:${id}; Path=/; Max-Age=${AREA_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function clearAreaCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AREA_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/* -------------------------------- the reads ------------------------------- */

interface MarketsPayload {
  countries?: Array<{
    code?: unknown;
    name_en?: unknown;
    anchor_slug?: unknown;
    display_order?: unknown;
  }>;
}

interface TreePayload {
  nodes?: Array<{
    id?: unknown;
    parent_id?: unknown;
    level?: unknown;
    slug?: unknown;
    name_en?: unknown;
    center_lat?: unknown;
    center_lng?: unknown;
    iso_3166_2?: unknown;
  }>;
}

let marketsPromise: Promise<OpenMarket[]> | null = null;
const treePromises = new Map<string, Promise<TreeNode[]>>();

async function fetchMarkets(): Promise<OpenMarket[]> {
  const response = await fetch("/api/locations", { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`markets ${response.status}`);
  const payload = (await response.json()) as MarketsPayload;
  return (payload.countries ?? [])
    .map((row) => ({
      code: String(row.code ?? "")
        .trim()
        .toUpperCase(),
      nameEn: String(row.name_en ?? "").trim(),
      anchorSlug: typeof row.anchor_slug === "string" ? row.anchor_slug : null,
      displayOrder: Number(row.display_order ?? 0),
    }))
    .filter((row) => CODE_RE.test(row.code))
    .sort((a, b) => a.displayOrder - b.displayOrder || a.nameEn.localeCompare(b.nameEn));
}

async function fetchTree(country: string): Promise<TreeNode[]> {
  const response = await fetch(`/api/locations/${encodeURIComponent(country)}`, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) throw new Error(`tree ${response.status}`);
  const payload = (await response.json()) as TreePayload;
  return (payload.nodes ?? []).map((row) => ({
    id: String(row.id ?? ""),
    parentId: typeof row.parent_id === "string" ? row.parent_id : null,
    level: String(row.level ?? ""),
    slug: String(row.slug ?? ""),
    nameEn: typeof row.name_en === "string" ? row.name_en : null,
    centerLat:
      typeof row.center_lat === "number" && Number.isFinite(row.center_lat) ? row.center_lat : null,
    centerLng:
      typeof row.center_lng === "number" && Number.isFinite(row.center_lng) ? row.center_lng : null,
    isoCode:
      typeof row.iso_3166_2 === "string" && row.iso_3166_2.trim() !== ""
        ? row.iso_3166_2.trim()
        : null,
  }));
}

/** ONE in-flight request per key; a failure is not cached, so a retry is real. */
function openMarketsOnce(): Promise<OpenMarket[]> {
  if (marketsPromise === null) {
    marketsPromise = fetchMarkets().catch((error: unknown) => {
      marketsPromise = null;
      throw error;
    });
  }
  return marketsPromise;
}

function countryTreeOnce(country: string): Promise<TreeNode[]> {
  const existing = treePromises.get(country);
  if (existing) return existing;
  const promise = fetchTree(country).catch((error: unknown) => {
    treePromises.delete(country);
    throw error;
  });
  treePromises.set(country, promise);
  return promise;
}

export function useOpenMarkets(): { markets: OpenMarket[]; isLoading: boolean; failed: boolean } {
  const [markets, setMarkets] = useState<OpenMarket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    openMarketsOnce()
      .then((rows) => {
        if (cancelled) return;
        setMarkets(rows);
        setFailed(false);
        setIsLoading(false);
      })
      .catch(() => {
        // C4/F4 — a failed read renders the translated caption, never a blank
        // picker and never a throw through the shell.
        if (cancelled) return;
        setMarkets([]);
        setFailed(true);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { markets, isLoading, failed };
}

export function useCountryTree(country: string | null): {
  nodes: TreeNode[];
  /**
   * INC-211 — THE MARKET THE ROWS BELONG TO, published WITH the rows. A guard
   * that compares the requested country with itself proves nothing: an effect
   * downstream still reads the previous market's rows from the render in which
   * the country changed. `loadedCountry` moves in lockstep with `nodes`, so a
   * consumer can refuse rows that are not the picked market's.
   */
  loadedCountry: string | null;
  isLoading: boolean;
  failed: boolean;
} {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loadedCountry, setLoadedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (country === null) {
      setNodes([]);
      setLoadedCountry(null);
      setFailed(false);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    // INC-211 — THE STALE TREE. The previous market's rows used to survive the
    // country change until the new fetch resolved, so a consumer (the shell's
    // anchor effect) could read the OLD market's anchor under the NEW country
    // and even save it. The tree is therefore emptied FIRST, every time: while
    // a market's tree is in flight there is no tree at all.
    setNodes([]);
    setLoadedCountry(null);
    setFailed(false);
    setIsLoading(true);
    countryTreeOnce(country)
      .then((rows) => {
        if (cancelled) return;
        setNodes(rows);
        setLoadedCountry(country);
        setFailed(false);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setNodes([]);
        setLoadedCountry(null);
        setFailed(true);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country]);

  return { nodes, loadedCountry, isLoading, failed };
}

/* -------------------------------- the shapes ------------------------------ */

/** The market anchor of a fetched tree: the one node with no parent. */
export function anchorOf(nodes: TreeNode[]): TreeNode | null {
  return nodes.find((node) => node.parentId === null && node.level === "country") ?? null;
}

/** The full path from the anchor down to `id`, or an empty path when absent. */
export function pathToNode(nodes: TreeNode[], id: string): TreeNode[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const path: TreeNode[] = [];
  let cursor = byId.get(id) ?? null;
  let hops = 0;
  while (cursor !== null && hops < 8) {
    path.unshift(cursor);
    cursor = cursor.parentId === null ? null : (byId.get(cursor.parentId) ?? null);
    hops += 1;
  }
  return path.length > 0 && path[0]!.parentId === null ? path : [];
}

/** The shell's own node shape (structurally `LocationNode` in app-shell). */
export interface ShellLocationNode {
  id: string;
  name_en: string;
  name_am: string | null;
  level: string;
  parent_id: string | null;
}

/** A fetched tree node as the shell's location path carries it. */
export function asLocationNode(node: TreeNode): ShellLocationNode {
  return {
    id: node.id,
    name_en: node.nameEn ?? node.slug,
    name_am: null,
    level: node.level,
    parent_id: node.parentId,
  };
}

/**
 * L4b-3 (operator ruling 2026-09-16) — THE AUTO-SELECT LAW, as one pure step.
 *
 * A level with exactly ONE option is not a choice, so the path extends into it
 * by itself, recursively (one region → one city → one sub-city). Two or more
 * options stop the walk: that IS a choice and the user makes it. The control
 * still renders the single option, so the selection remains changeable.
 *
 * Pure: a tree and a path in, a path out. NO fetch is added — the walk reads the
 * tree the picker has already cached.
 */
export function autoExtendPath(nodes: TreeNode[], path: ShellLocationNode[]): ShellLocationNode[] {
  if (path.length === 0 || nodes.length === 0) return path;
  const out = [...path];
  // The tree is at most four levels deep; the bound makes a cycle impossible.
  for (let step = 0; step < 4; step += 1) {
    const deepest = out[out.length - 1]!;
    const children = nodes.filter((node) => node.parentId === deepest.id);
    if (children.length !== 1) break;
    out.push(asLocationNode(children[0]!));
  }
  return out;
}

/* ------------------------------- the guess -------------------------------- */

/**
 * L4b-2 — RESOLVING THE EDGE'S GUESS OVER THE CACHED TREE. Pure: a tree and an
 * answer in, one node out, no React, no fetch, no cookie (law 10 — the guess is
 * never persisted; only a pick is).
 *
 * THE ORDER, pre-committed (DEC-063 amended: geometry first, as deep as the
 * edge's facts allow):
 *   (a) coordinates → the NEAREST curated city or sub-city within 60 km; a
 *       sub-city is taken only within 8 km, otherwise its parent city;
 *   (b) else the region whose `iso_3166_2` is `<CC>-<regionCode>`;
 *   (c) else a city or sub-city whose SLUG equals the slugified city name;
 *   (d) else the market anchor — a fact about an open market, never a default.
 *
 * NAMED SEAM (weight law): the tree payload carries no `aliases`, so (c) matches
 * the slugified name only. Alias matching waits for a batch that adds aliases to
 * the read; until then a city known to the edge under another name falls to (d).
 */
export interface GuessFacts {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
}

/** The nearest-metro window, in kilometres, and the sub-city window inside it. */
const METRO_KM = 60;
const SUB_CITY_KM = 8;

function slugifyName(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isSettlement(node: TreeNode): boolean {
  return node.level === "city" || node.level === "sub_city";
}

function nearestSettlement(nodes: TreeNode[], lat: number, lng: number): TreeNode | null {
  let best: TreeNode | null = null;
  let bestKm = Number.POSITIVE_INFINITY;
  for (const node of nodes) {
    if (!isSettlement(node) || node.centerLat === null || node.centerLng === null) continue;
    const km = distanceKm(lat, lng, node.centerLat, node.centerLng);
    if (km < bestKm) {
      best = node;
      bestKm = km;
    }
  }
  if (best === null || bestKm > METRO_KM) return null;
  if (best.level === "sub_city" && bestKm > SUB_CITY_KM) {
    const parent = nodes.find((node) => node.id === best!.parentId) ?? null;
    return parent !== null && parent.level === "city" ? parent : best;
  }
  return best;
}

export function resolveGuess(nodes: TreeNode[], geo: GuessFacts): TreeNode | null {
  const anchor = anchorOf(nodes);
  if (anchor === null || geo.country === null) return null;
  const country = geo.country.toUpperCase();

  // (a) geometry
  if (geo.lat !== null && geo.lng !== null) {
    const nearest = nearestSettlement(nodes, geo.lat, geo.lng);
    if (nearest !== null) return nearest;
  }

  // (b) the region's ISO 3166-2 code
  if (geo.regionCode !== null) {
    const wanted = `${country}-${geo.regionCode}`.toLowerCase();
    const region = nodes.find(
      (node) => node.level === "region" && (node.isoCode ?? "").toLowerCase() === wanted,
    );
    if (region) return region;
  }

  // (c) the city name, slugified: the node's own slug or its slugified name
  // (the alias seam above — the payload carries no aliases).
  if (geo.city !== null) {
    const slug = slugifyName(geo.city);
    if (slug !== "") {
      const named = nodes.find(
        (node) =>
          isSettlement(node) &&
          (node.slug.toLowerCase() === slug || slugifyName(node.nameEn ?? "") === slug),
      );
      if (named) return named;
    }
  }

  // (d) the market itself
  return anchor;
}
