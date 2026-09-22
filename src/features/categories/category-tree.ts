import { useEffect, useState } from "react";

import { entityName, type EntityBundle } from "@/i18n";


/**
 * U6-C1a — THE ONE CATEGORY-TREE READER (law B2).
 *
 * WHY THIS FILE EXISTS AND WHERE IT LIVES. The `categories` +
 * `category_tree_pointers` pair was read inside `src/features/feed/use-feed.ts`,
 * where only the feed's rail could reach it. The posting wizard's step 1 needs
 * the SAME two tables — the whole tree, not just its roots — so the read was
 * lifted here rather than copied (B1/B2: one utility per concern).
 *
 * It is NOT in `/src/lib`, because that directory is pure utilities ONLY (the
 * architecture line) and nothing in it touches Supabase today; this module is a
 * data reader with a cache. It is NOT in `features/feed` or `features/posting`
 * either, because then one feature would import another's internals. It is its
 * own feature-neutral concern: `features/categories`, the tree both consumers
 * read and neither owns.
 *
 * READ ONLY. Nothing here writes, ever. The wizard's writes go through the
 * A2/B1 routes and their doors.
 *
 * VERSION-KEYED, NOT PINNED (INC-263, the INC-243 shape). The first read used to
 * be remembered for the WHOLE page session with nothing that could expire it, so
 * a curator's categories import was invisible until the tab was closed — the
 * console showed baby-food under food-drink while the wizard's tree had neither
 * the row nor the re-parenting, an hour later. The tree now comes from
 * `/api/categories/tree`, which carries the tree's OWN version as its ETag; what
 * is held here carries that version and is re-checked after `TTL_MS`, so a commit
 * lands inside the same sixty-second window the option lists promise. A read that
 * finds the version unmoved costs a 304 and keeps the SAME tree object, so no
 * consumer re-renders for nothing. A failure is NOT cached, and the last good
 * tree is kept rather than replaced by an empty one (F4).

 */

/** One category as both consumers need it. */
export interface CategoryNode {
  id: string;
  nameEn: string;
  nameAm: string | null;
  slug: string;
  /** C5i — the stored lucide glyph name; the rail renders it. */
  icon: string | null;
  /** D11 — false rows are FOLDERS: shown, drilled into, never selectable. */
  allowListings: boolean;
  /** The catch-all is never a posting target. */
  isCatchall: boolean;
  /** The illustration step 1 shows once a leaf is chosen. */
  imageUrl: string | null;
  imageThumbUrl: string | null;
  displayOrder: number;
}

export interface CategoryTree {
  /** Every active category, in `display_order`. */
  nodes: CategoryNode[];
  /**
   * child id → its FIRST parent id. A category absent from this map is a root.
   * INC-246 — a category may be surfaced under several parents; this map keeps
   * one of them so `pathOf` stays a single well-defined path (the trail a hit
   * shows). Every surfacing is in `childrenOf`.
   */
  parentOf: Map<string, string>;
  /** parent id → its children, in `display_order`. */
  childrenOf: Map<string, CategoryNode[]>;
  byId: Map<string, CategoryNode>;
}

const EMPTY_TREE: CategoryTree = {
  nodes: [],
  parentOf: new Map(),
  childrenOf: new Map(),
  byId: new Map(),
};

/**
 * How long a held tree is trusted before the version is re-checked. The route
 * holds its own answer for the same span, so an import is visible well inside
 * the sixty seconds the browser is allowed to keep the body (INC-263).
 */
const TTL_MS = 15_000;

interface Held {
  tree: CategoryTree;
  version: string;
  at: number;
}

let cache: Held | null = null;
let inFlight: Promise<CategoryTree> | null = null;

/** Tests reset the module between cases; nothing in the app calls this. */
export function forgetCategoryTree(): void {
  cache = null;
  inFlight = null;
}


/**
 * INC-246 — EVERY SURFACING IS A BRANCH. A category surfaced under two roots has
 * TWO pointer rows, and the wizard's tree must show it in both places, exactly
 * where the marketplace rail shows it. The children of a parent are therefore
 * built from the POINTERS themselves — not from a single child→parent map, which
 * could only ever remember the last row read and silently dropped the other
 * surfacing.
 */
function buildTree(
  rows: CategoryNode[],
  pointers: { child_id: string; parent_id: string | null }[],
): CategoryTree {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const parentOf = new Map<string, string>();
  const childrenOf = new Map<string, CategoryNode[]>();
  for (const pointer of pointers) {
    if (pointer.parent_id === null) continue;
    // A pointer to a row the active read did not return (an inactive parent or
    // child) is not a tree edge anyone may walk.
    const child = byId.get(pointer.child_id);
    if (child === undefined || !byId.has(pointer.parent_id)) continue;
    if (!parentOf.has(pointer.child_id)) parentOf.set(pointer.child_id, pointer.parent_id);
    const siblings = childrenOf.get(pointer.parent_id) ?? [];
    if (!siblings.some((entry) => entry.id === child.id)) siblings.push(child);
    childrenOf.set(pointer.parent_id, siblings);
  }
  for (const siblings of childrenOf.values()) {
    siblings.sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return { nodes: rows, parentOf, childrenOf, byId };
}

interface TreePayload {
  version: string;
  nodes: {
    id: string;
    name_en: string;
    name_am: string | null;
    slug: string;
    icon: string | null;
    allow_listings: boolean;
    is_catchall: boolean;
    image_url: string | null;
    image_thumb_url: string | null;
    display_order: number;
  }[];
  pointers: { child_id: string; parent_id: string | null }[];
}

/**
 * The raw read: one public route, never the browser client, so the tree carries
 * its own version and an ETag a second mount can answer with a 304 (INC-263).
 * `cache: "no-cache"` revalidates with the origin rather than serving whatever
 * the browser still holds — the stale seam this incident was about.
 */
export async function readCategoryTree(): Promise<{ tree: CategoryTree; version: string }> {
  const response = await fetch("/api/categories/tree", {
    headers: { Accept: "application/json" },
    cache: "no-cache",
  });
  // Law F4 — a failed read is a failure, never an empty tree that reads as
  // "there are no categories". The caller renders the error state.
  if (!response.ok) throw new Error(`category tree read failed (${String(response.status)})`);
  const payload = (await response.json()) as TreePayload;

  const rows: CategoryNode[] = payload.nodes.map((row) => ({
    id: row.id,
    nameEn: row.name_en,
    nameAm: row.name_am,
    slug: row.slug,
    icon: row.icon,
    allowListings: row.allow_listings,
    isCatchall: row.is_catchall,
    imageUrl: row.image_url,
    imageThumbUrl: row.image_thumb_url,
    displayOrder: row.display_order,
  }));
  return { tree: buildTree(rows, payload.pointers), version: payload.version };
}

/**
 * The shared read. A held tree younger than `TTL_MS` is the answer; older, the
 * route is asked again and an UNMOVED version keeps the same tree object, so a
 * consumer's identity checks do not fire (I3).
 */
export function loadCategoryTree(): Promise<CategoryTree> {
  const held = cache;
  if (held !== null && Date.now() - held.at < TTL_MS) return Promise.resolve(held.tree);
  inFlight ??= readCategoryTree().then(
    ({ tree, version }) => {
      const previous = cache;
      const settled = previous !== null && previous.version === version ? previous.tree : tree;
      cache = { tree: settled, version, at: Date.now() };
      inFlight = null;
      return settled;
    },
    (error: unknown) => {
      inFlight = null;
      throw error;
    },
  );
  return inFlight;
}


/** The roots: a category no active pointer names as a child. */
export function rootsOf(tree: CategoryTree): CategoryNode[] {
  return tree.nodes.filter((node) => !tree.parentOf.has(node.id));
}

/** A node's children, in `display_order`; empty means it is a LEAF. */
export function childrenOf(tree: CategoryTree, id: string): CategoryNode[] {
  return tree.childrenOf.get(id) ?? [];
}

/** True when the node has no children — the only shape D11 lets a seller pick. */
export function isLeaf(tree: CategoryTree, id: string): boolean {
  return childrenOf(tree, id).length === 0;
}

/**
 * D11 — a leaf a listing may actually be posted into: no children, listings
 * allowed, not the catch-all. A folder row (`allow_listings` false) is shown by
 * the browser but can never be chosen.
 */
export function isPostable(tree: CategoryTree, node: CategoryNode): boolean {
  return isLeaf(tree, node.id) && node.allowListings && !node.isCatchall;
}

/** Root → … → node, the full path the search hit displays. */
export function pathOf(tree: CategoryTree, id: string): CategoryNode[] {
  const path: CategoryNode[] = [];
  const seen = new Set<string>();
  let cursor: string | undefined = id;
  while (cursor !== undefined && !seen.has(cursor)) {
    seen.add(cursor);
    const node = tree.byId.get(cursor);
    if (!node) break;
    path.unshift(node);
    cursor = tree.parentOf.get(cursor);
  }
  return path;
}

/**
 * D11 — search-to-leaf. Matches the ACTIVE language's name through the entity
 * bundle and the English name, so a seller typing Amharic and a seller typing
 * English reach the same leaf. Postable leaves only: a folder is not an answer.
 */
export function searchLeaves(
  tree: CategoryTree,
  term: string,
  bundle: EntityBundle,
  limit = 12,
): CategoryNode[] {
  const needle = term.trim().toLowerCase();
  if (needle === "") return [];
  const hits: CategoryNode[] = [];
  for (const node of tree.nodes) {
    if (!isPostable(tree, node)) continue;
    const translated = entityName("category", node, bundle).toLowerCase();
    if (translated.includes(needle) || node.nameEn.toLowerCase().includes(needle)) {
      hits.push(node);
      if (hits.length >= limit) break;
    }
  }
  return hits;
}

export interface UseCategoryTreeResult {
  tree: CategoryTree;
  isLoading: boolean;
  /** F4 — a failed read is visible, never a silently empty tree. */
  error: boolean;
}

/**
 * The shared hook. Both the feed's rail and the wizard's step 1 mount this.
 *
 * INC-263 — EVERY MOUNT ASKS. The held tree renders at once so nothing flashes,
 * but the read still runs: that is what makes an import visible without closing
 * the tab. A revalidation that finds the version unmoved hands back the SAME
 * object, so this sets state to a value React treats as unchanged.
 */
export function useCategoryTree(): UseCategoryTreeResult {
  const [tree, setTree] = useState<CategoryTree>(cache?.tree ?? EMPTY_TREE);
  const [isLoading, setIsLoading] = useState(cache === null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (cache === null) setIsLoading(true);
    setError(false);

    void loadCategoryTree().then(
      (rows) => {
        if (cancelled) return;
        setTree(rows);
        setIsLoading(false);
      },
      () => {
        // CONTAINMENT (INC-031): the surface degrades to a visible error state
        // rather than throwing through the shell-wrapped root. A held tree is
        // kept — a failed revalidation never empties a screen that had rows.
        if (cancelled) return;
        if (cache === null) {
          setTree(EMPTY_TREE);
          setError(true);
        }
        setIsLoading(false);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);


  return { tree, isLoading, error };
}
