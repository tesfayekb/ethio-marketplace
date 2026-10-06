/**
 * INC-458 / DEC-142 — WHICH SCRATCH ATTRIBUTE DEFINITIONS THE SETUP REAPS.
 *
 * Pure (imports nothing). A row is stale when its attr_key starts with `e2e_`
 * or `e2e-`, or carries `e2e_`/`e2e-` directly after a hyphen (a family prefix
 * such as `pricing_type-e2e_…`, INC-463), AND it was created before the cutoff;
 * any other key is never returned, whatever its age. A stale definition that a
 * definition OUTSIDE the stale set still depends on is kept for a later run.
 * The ids come back in delete order: a dependant before the definition it
 * depends on.
 */
export interface ReapRow {
  id: string;
  attr_key: string;
  created_at: string;
  depends_on: string | null;
}

export interface ReapPlan {
  ids: string[];
  kept: number;
}

const SCRATCH = /(^|-)e2e[_-]/;

export function planAttributeReap(rows: ReapRow[], cutoff: string): ReapPlan {
  const cut = Date.parse(cutoff);
  const stale = new Set(
    rows
      .filter((row) => SCRATCH.test(row.attr_key) && Date.parse(row.created_at) < cut)
      .map((row) => row.id),
  );
  const candidates = stale.size;
  const dependants = new Map<string, string[]>();
  for (const row of rows) {
    if (row.depends_on === null) continue;
    dependants.set(row.depends_on, [...(dependants.get(row.depends_on) ?? []), row.id]);
  }
  // Keep every stale row a kept row depends on, until nothing moves.
  let moved = true;
  while (moved) {
    moved = false;
    for (const row of rows) {
      if (stale.has(row.id) || row.depends_on === null) continue;
      if (stale.delete(row.depends_on)) moved = true;
    }
  }
  // Leaf first: a row goes after every stale row that depends on it.
  const ordered: string[] = [];
  const done = new Set<string>();
  const visit = (id: string, path: Set<string>): void => {
    if (done.has(id) || path.has(id)) return;
    path.add(id);
    for (const child of dependants.get(id) ?? []) if (stale.has(child)) visit(child, path);
    path.delete(id);
    done.add(id);
    ordered.push(id);
  };
  for (const row of rows) if (stale.has(row.id)) visit(row.id, new Set());
  return { ids: ordered, kept: candidates - ordered.length };
}
