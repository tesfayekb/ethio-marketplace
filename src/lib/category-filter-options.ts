/**
 * C3-UX-5 — ONE OPTION BUILDER FOR BOTH CATALOG FILTERS (B1/B3).
 *
 * The categories roster's filter and the attributes console's filter render the
 * same list: every category in depth-first roster order, each child indented
 * under its parent. The traversal already exists (`toRoster`); this module only
 * turns those rows into option items, so neither console walks the tree again
 * and neither owns a private copy of the label shape.
 *
 * It carries NO JSX and NO user-visible strings of its own (D1): the indent
 * prefix is structure, and every translated word (the default option, the
 * retired marker) is added by the calling surface from `t()`.
 */

/** The shape both consoles already hold — a roster row. */
export interface CategoryFilterSource {
  id: string;
  slug: string;
  nameEn: string;
  depth: number;
  parentId: string | null;
  isActive: boolean;
}

export interface CategoryFilterOption {
  id: string;
  slug: string;
  depth: number;
  parentId: string | null;
  isActive: boolean;
  /** `"· ".repeat(depth) + nameEn` — indentation is structure, not a string. */
  label: string;
}

export function categoryFilterOptions(roster: CategoryFilterSource[]): CategoryFilterOption[] {
  return roster.map((row) => ({
    id: row.id,
    slug: row.slug,
    depth: row.depth,
    parentId: row.parentId,
    isActive: row.isActive,
    label: `${"· ".repeat(row.depth)}${row.nameEn}`,
  }));
}

/**
 * The chain of ids from a row up to its root (the row itself first). One
 * derivation, used by the subtree predicate AND the subtree counts, so a
 * filtered roster and the number beside its option can never disagree.
 */
export function ancestorIds(
  row: { id: string; parentId: string | null },
  byId: Map<string, { id: string; parentId: string | null }>,
): string[] {
  const chain: string[] = [];
  let current: { id: string; parentId: string | null } | undefined = row;
  const seen = new Set<string>();
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    chain.push(current.id);
    current = current.parentId === null ? undefined : byId.get(current.parentId);
  }
  return chain;
}

/** Active rows counted into every subtree they belong to (self included). */
export function subtreeCounts(roster: CategoryFilterSource[]): Map<string, number> {
  const byId = new Map(roster.map((row) => [row.id, row]));
  const counts = new Map<string, number>();
  for (const row of roster) {
    if (!row.isActive) continue;
    for (const id of ancestorIds(row, byId)) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}
