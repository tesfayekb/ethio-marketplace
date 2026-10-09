import { childrenOf, type CategoryTree } from "@/features/categories/category-tree";

/**
 * D119 — WHAT THE INVITE CARD CARRIES TO /post: a category and a place, each a
 * lowercase uuid or absent. Anything else in the address is dropped here, the
 * one parse point; the wizard reads only what this returns.
 */
export interface PostSearch {
  category?: string;
  place?: string;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function postSearchOf(search: Record<string, unknown>): PostSearch {
  const out: PostSearch = {};
  const category = search["category"];
  const place = search["place"];
  if (typeof category === "string" && UUID.test(category)) out.category = category;
  if (typeof place === "string" && UUID.test(place)) out.place = place;
  return out;
}

/** The address the sign-in doors come back to (D20): /post, with the invite kept. */
export function postReturnPath(search: PostSearch): string {
  const params = new URLSearchParams();
  if (search.category !== undefined) params.set("category", search.category);
  if (search.place !== undefined) params.set("place", search.place);
  const query = params.toString();
  return query === "" ? "/post" : `/post?${query}`;
}

/**
 * D119 — the level step 1 opens on: a folder opens inside itself; a leaf opens
 * on its parent's level (the top level for a top-level leaf). `undefined` when
 * the tree does not hold the id: step 1 then opens as it always has.
 */
export function prefillCursor(tree: CategoryTree, id: string): string | null | undefined {
  if (!tree.byId.has(id)) return undefined;
  if (childrenOf(tree, id).length > 0) return id;
  return tree.parentOf.get(id) ?? null;
}
