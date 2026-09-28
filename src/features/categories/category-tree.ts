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
  /**
   * DEC-080 — root id → its ROOT pointer's `display_order` (the parent-NULL
   * pointer the reorder door writes). A root with no root pointer is absent and
   * falls back to its own `displayOrder`, explicitly.
   */
  rootOrder: Map<string, number>;
}

const EMPTY_TREE: CategoryTree = {
  nodes: [],
  parentOf: new Map(),
  childrenOf: new Map(),
  byId: new Map(),
  rootOrder: new Map(),
};

/**
 * INC-265 — A MOUNT NEVER SKIPS THE ASK. The first landing trusted a held tree
 * for fifteen seconds without asking, which put a second stale window on top of
 * the route's: a category created a moment before a visit was simply not there.
 * The held tree is now a RENDERING head start, never a licence to skip the read:
 * every mount revalidates, an unmoved version answers with a 304 and hands back
 * the SAME tree object, so nothing re-renders for nothing (I3) and a curator's
 * change is on screen on the next visit.
 */
interface Held {
  tree: CategoryTree;
  version: string;
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
/**
 * D30 — A HOST'S OWN CHILDREN COME FIRST, AND "OTHER" COMES LAST.
 *
 * A category surfaced under a host (a SECONDARY pointer) is a guest: it belongs
 * after every child whose primary home this host is, so a seller reading the
 * level meets the host's own taxonomy before another branch's leaves. And a
 * catch-all row — any slug opening with `other-` — is the last thing on its
 * level wherever it sits, primary or surfaced: it is the answer a seller reaches
 * for only after the named ones failed.
 *
 * D33 — WITHIN THE GUESTS, THE POINTER DECIDES. The pointer's own
 * `display_order` orders the surfaced children, so a curator can place a guest
 * among the others; when the pointers carry no distinction the tie falls back to
 * the category's own order, which is "after the primaries" and nothing more.
 */
export function isOtherSlug(slug: string): boolean {
  return slug.startsWith("other-");
}

interface Edge {
  node: CategoryNode;
  /** False for the child's PRIMARY pointer, true for every surfacing. */
  surfaced: boolean;
  /**
   * D33 / DEC-080 — the pointer's own order, for EVERY edge: the reorder door
   * writes the pointer, never the row, so own children and guests alike are
   * sorted by it. A pointer without an order falls back to the node's own.
   */
  pointerOrder: number;
}

/** DEC-080 — catch-all last → guests after own → pointer order → row order. */
function compareEdges(a: Edge, b: Edge): number {
  const other = Number(isOtherSlug(a.node.slug)) - Number(isOtherSlug(b.node.slug));
  if (other !== 0) return other;
  const guest = Number(a.surfaced) - Number(b.surfaced);
  if (guest !== 0) return guest;
  if (a.pointerOrder !== b.pointerOrder) return a.pointerOrder - b.pointerOrder;
  return a.node.displayOrder - b.node.displayOrder;
}

/** The pointer shape both the route and the tests hand to `buildTree`. */
export interface TreePointer {
  child_id: string;
  parent_id: string | null;
  display_order?: number | null;
  /** DEC-080 — the child's HOME; absent on an older payload. */
  is_primary?: boolean;
}

/**
 * INC-246 — EVERY SURFACING IS A BRANCH. A category surfaced under two roots has
 * TWO pointer rows, and the wizard's tree must show it in both places, exactly
 * where the marketplace rail shows it. The children of a parent are therefore
 * built from the POINTERS themselves — not from a single child→parent map, which
 * could only ever remember the last row read and silently dropped the other
 * surfacing.
 *
 * DEC-080 — THE HOME IS A FLAG. A child's home is its pointer carrying
 * `is_primary` (one per child, enforced by the database); that is the edge
 * `parentOf` keeps and the home the breadcrumb shows (D30). A flagged pointer
 * whose parent is NULL makes the child a root. When no walkable pointer of a
 * child is flagged (an older payload), the first parent pointer seen is the
 * home, exactly as before — the rows arrive in `display_order`, `created_at`.
 */
export function buildTree(rows: CategoryNode[], pointers: TreePointer[]): CategoryTree {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const rootOrder = new Map<string, number>();
  // A pointer to a row the active read did not return (an inactive parent or
  // child) is not a tree edge anyone may walk.
  const walkable = pointers.filter(
    (pointer) =>
      byId.has(pointer.child_id) && (pointer.parent_id === null || byId.has(pointer.parent_id)),
  );
  const home = new Map<string, TreePointer>();
  for (const pointer of walkable) {
    if (pointer.is_primary === true) home.set(pointer.child_id, pointer);
  }
  for (const pointer of walkable) {
    if (pointer.parent_id !== null && !home.has(pointer.child_id)) {
      home.set(pointer.child_id, pointer);
    }
  }
  const parentOf = new Map<string, string>();
  for (const [childId, pointer] of home) {
    if (pointer.parent_id !== null) parentOf.set(childId, pointer.parent_id);
  }
  const edgesOf = new Map<string, Edge[]>();
  for (const pointer of walkable) {
    const child = byId.get(pointer.child_id)!;
    if (pointer.parent_id === null) {
      if (!rootOrder.has(child.id)) {
        rootOrder.set(child.id, pointer.display_order ?? child.displayOrder);
      }
      continue;
    }
    const siblings = edgesOf.get(pointer.parent_id) ?? [];
    if (!siblings.some((entry) => entry.node.id === child.id)) {
      siblings.push({
        node: child,
        surfaced: home.get(child.id) !== pointer,
        pointerOrder: pointer.display_order ?? child.displayOrder,
      });
    }
    edgesOf.set(pointer.parent_id, siblings);
  }
  const childrenOf = new Map<string, CategoryNode[]>();
  for (const [parent, siblings] of edgesOf) {
    siblings.sort(compareEdges);
    childrenOf.set(
      parent,
      siblings.map((entry) => entry.node),
    );
  }
  return { nodes: rows, parentOf, childrenOf, byId, rootOrder };
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
  pointers: {
    child_id: string;
    parent_id: string | null;
    display_order: number | null;
    is_primary: boolean;
  }[];
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
 * The shared read (INC-265). The route is ALWAYS asked — concurrent callers share
 * the one request in flight — and an UNMOVED version keeps the same tree object,
 * so a consumer's identity checks do not fire (I3) and the ask costs a 304.
 */
export function loadCategoryTree(): Promise<CategoryTree> {
  inFlight ??= readCategoryTree().then(
    ({ tree, version }) => {
      const previous = cache;
      const settled = previous !== null && previous.version === version ? previous.tree : tree;
      cache = { tree: settled, version };
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
  const roots = tree.nodes.filter((node) => !tree.parentOf.has(node.id));
  // D30 — the rail obeys the same last place for a catch-all root as every
  // deeper level does. DEC-080 — then the ROOT POINTER's order (what the reorder
  // door writes); a root without one falls back to its own `displayOrder`.
  const rank = (node: CategoryNode): number => tree.rootOrder.get(node.id) ?? node.displayOrder;
  return roots.sort(
    (a, b) => Number(isOtherSlug(a.slug)) - Number(isOtherSlug(b.slug)) || rank(a) - rank(b),
  );
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
 * D11 / D34 — a leaf a listing may actually be posted into: no children and
 * listings allowed. A folder row (`allow_listings` false) is shown by the
 * browser but can never be chosen.
 *
 * D34 — AN "OTHER" LEAF IS A POSTING TARGET. The catch-all row is the answer a
 * seller reaches for when no named leaf fits; `is_catchall` decides only where
 * it sits on its level (D30 — last), never whether it may be posted into. The
 * door agrees: `validate_listing_draft` dropped the same disjunct in the same
 * landing, so this mirror and the authority say one thing (F3).
 */
export function isPostable(tree: CategoryTree, node: CategoryNode): boolean {
  return isLeaf(tree, node.id) && node.allowListings;
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
