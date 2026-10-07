/**
 * Bundle 7 D3 (INC-473, INC-474) — THE PLACE STEP IS SEEDED FROM THE AD'S OWN
 * PLACES. Pure: the facts of each saved place (as the locations table holds
 * them) in, the rows the step draws out. The market is the country of the
 * FIRST place; a place in another country keeps ITS country; a saved place the
 * read did not return (or that is switched off) gets no made-up row.
 */
export interface PlaceFact {
  id: string;
  country: string;
  level: string;
  regionId: string | null;
  cityId: string | null;
  parentId: string | null;
  active: boolean;
}

export interface SeedRow {
  country: string;
  region: string | null;
  city: string | null;
  subCity: string | null;
}

export interface WhereSeed {
  /** The market on screen: the FIRST saved place's country. */
  country: string;
  rows: SeedRow[];
  /** True when every saved place found a row. */
  complete: boolean;
}

function rowOf(fact: PlaceFact): SeedRow | null {
  if (fact.level === "city")
    return {
      country: fact.country,
      region: fact.regionId ?? fact.parentId,
      city: fact.id,
      subCity: null,
    };
  if (fact.level === "sub_city")
    return {
      country: fact.country,
      region: fact.regionId,
      city: fact.cityId ?? fact.parentId,
      subCity: fact.id,
    };
  return null;
}

/** `null` when the draft holds no place, or its FIRST place has no row. */
export function whereSeed(coverage: string[], facts: PlaceFact[]): WhereSeed | null {
  const byId = new Map(facts.map((fact) => [fact.id, fact]));
  const rows: SeedRow[] = [];
  const seen = new Set<string>();
  let complete = true;
  for (const id of coverage) {
    if (seen.has(id)) continue;
    seen.add(id);
    const fact = byId.get(id);
    const row = fact !== undefined && fact.active ? rowOf(fact) : null;
    if (row === null) {
      complete = false;
      continue;
    }
    rows.push(row);
  }
  const first = coverage.length > 0 ? byId.get(coverage[0]!) : undefined;
  if (first === undefined || rows.length === 0 || rows[0]!.country !== first.country) return null;
  return { country: first.country, rows, complete };
}
