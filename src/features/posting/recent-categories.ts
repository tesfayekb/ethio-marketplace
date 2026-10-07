import { isPostable, type CategoryTree } from "@/features/categories/category-tree";

/**
 * Bundle 7 D2 — THE "USED BEFORE" CHIPS. From the seller's recent category ids
 * (in the reader's order) the first TWO the step's own tree holds and that are
 * postable — the same test the finder's hits pass.
 */
export function recentChips(ids: readonly string[] | null, tree: CategoryTree): string[] {
  if (ids === null) return [];
  const out: string[] = [];
  for (const id of ids) {
    const node = tree.byId.get(id);
    if (node === undefined || !isPostable(tree, node)) continue;
    out.push(id);
    if (out.length === 2) break;
  }
  return out;
}
