import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
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
 * PROCESS-LIFETIME CACHE (INC-050, carried over from the feed): the tree is
 * admin-managed reference data that every rail render and every wizard mount
 * needs, so re-reading it per mount cost a visible lag on a slow mobile
 * connection. The first read is shared by every concurrent caller (`inFlight`)
 * and remembered for the page session (`cache`). A failure is NOT cached, so the
 * next mount retries.
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
  /** child id → parent id. A category absent from this map is a root. */
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

let cache: CategoryTree | null = null;
let inFlight: Promise<CategoryTree> | null = null;

function buildTree(
  rows: CategoryNode[],
  pointers: { child_id: string; parent_id: string | null }[],
): CategoryTree {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const parentOf = new Map<string, string>();
  for (const pointer of pointers) {
    if (pointer.parent_id === null) continue;
    // A pointer to a row the active read did not return (an inactive parent or
    // child) is not a tree edge anyone may walk.
    if (!byId.has(pointer.child_id) || !byId.has(pointer.parent_id)) continue;
    parentOf.set(pointer.child_id, pointer.parent_id);
  }
  const childrenOf = new Map<string, CategoryNode[]>();
  for (const row of rows) {
    const parent = parentOf.get(row.id);
    if (parent === undefined) continue;
    const siblings = childrenOf.get(parent) ?? [];
    siblings.push(row);
    childrenOf.set(parent, siblings);
  }
  return { nodes: rows, parentOf, childrenOf, byId };
}

/** The raw read. Exported for tests; app code uses the hook or `loadCategoryTree`. */
export async function readCategoryTree(): Promise<CategoryTree> {
  const [{ data: cats, error: catError }, { data: pointers, error: pointerError }] =
    await Promise.all([
      supabase
        .from("categories")
        .select(
          "id,name_en,name_am,slug,icon,display_order,allow_listings,is_catchall,image_url,image_thumb_url",
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase.from("category_tree_pointers").select("child_id,parent_id"),
    ]);
  // Law F4 — a failed read is a failure, never an empty tree that reads as
  // "there are no categories". The caller renders the error state.
  if (catError) throw new Error(catError.message);
  if (pointerError) throw new Error(pointerError.message);

  const rows: CategoryNode[] = (cats ?? []).map((row) => ({
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
  return buildTree(rows, pointers ?? []);
}

/** The cached read every consumer shares. */
export function loadCategoryTree(): Promise<CategoryTree> {
  if (cache !== null) return Promise.resolve(cache);
  inFlight ??= readCategoryTree().then(
    (tree) => {
      cache = tree;
      inFlight = null;
      return tree;
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

/** The shared hook. Both the feed's rail and the wizard's step 1 mount this. */
export function useCategoryTree(): UseCategoryTreeResult {
  const [tree, setTree] = useState<CategoryTree>(cache ?? EMPTY_TREE);
  const [isLoading, setIsLoading] = useState(cache === null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache !== null) return;
    let cancelled = false;
    setIsLoading(true);
    setError(false);

    void loadCategoryTree().then(
      (rows) => {
        if (cancelled) return;
        setTree(rows);
        setIsLoading(false);
      },
      () => {
        // CONTAINMENT (INC-031): the surface degrades to a visible error state
        // rather than throwing through the shell-wrapped root.
        if (cancelled) return;
        setTree(EMPTY_TREE);
        setError(true);
        setIsLoading(false);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return { tree, isLoading, error };
}
