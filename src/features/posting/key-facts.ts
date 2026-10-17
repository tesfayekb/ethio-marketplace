import type { AttrDef } from "./posting-service";

export const KEY_FACTS_MAXIMUM = 4;

export function isKeyFactType(attrType: string): boolean {
  return ["single_select", "multi_select", "select", "number", "year"].includes(attrType);
}

/** Answered facts only; stable rank ties preserve the form's order. */
export function keyFacts(facts: readonly AttrDef[]): AttrDef[] {
  const ranked = facts.filter((fact) => fact.factRank !== null);
  if (ranked.length > 0) {
    return ranked.sort((a, b) => (a.factRank ?? 0) - (b.factRank ?? 0)).slice(0, KEY_FACTS_MAXIMUM);
  }
  return facts
    .filter((fact) => fact.isFilterable && isKeyFactType(fact.attrType) && fact.cardRank === null)
    .slice(0, KEY_FACTS_MAXIMUM);
}
