import { useEffect, useState } from "react";

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
  isLoading: boolean;
  failed: boolean;
} {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (country === null) {
      setNodes([]);
      setFailed(false);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    countryTreeOnce(country)
      .then((rows) => {
        if (cancelled) return;
        setNodes(rows);
        setFailed(false);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setNodes([]);
        setFailed(true);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country]);

  return { nodes, isLoading, failed };
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
