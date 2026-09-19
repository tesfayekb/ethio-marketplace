/**
 * U6-C1b — THE LAZY OPTION LIST, ON THE CLIENT SIDE (DEC-053).
 *
 * A preset list can hold every make and model ever sold, so the posting form
 * NEVER ships options with the schema: it asks `/api/attributes/<id>/options`
 * the first time a seller opens that one control, and remembers the answer for
 * the rest of the visit. The route is anon-callable public reference data and is
 * cached hard at the edge; this module's own map only stops a second tap on the
 * same control from paying for a second round trip.
 *
 * A FAILURE IS A FAILURE (F4): `null` comes back, the caller says so in words
 * beside the control, and the seller can try again — never an empty list
 * pretending the catalogue has nothing.
 */

export interface AttrOption {
  value: string;
  labelEn: string;
  labelAm: string | null;
  /** DEC-050 cascade: the parent option's value this one hangs under. */
  parent: string | null;
  /**
   * D18 — WHAT THE MODEL ALREADY SAYS. A fact is either a VALUE for a sibling
   * detail (`{ fuel: "petrol" }`) or a BOUND on it (`{ year: { min: 1968 } }`).
   * A value is offered as a prefill the seller may edit; a bound narrows the
   * client mirror only — the door's own bounds remain the authority (F3).
   */
  facts: Record<string, unknown> | null;
}

const cache = new Map<string, AttrOption[]>();

function shape(row: Record<string, unknown>): AttrOption {
  const value = typeof row["value"] === "string" ? row["value"] : "";
  const facts = row["facts"];
  return {
    value,
    labelEn: typeof row["label_en"] === "string" ? row["label_en"] : value,
    labelAm: typeof row["label_am"] === "string" ? row["label_am"] : null,
    parent: typeof row["parent"] === "string" ? row["parent"] : null,
    facts:
      facts !== null && typeof facts === "object" && !Array.isArray(facts)
        ? (facts as Record<string, unknown>)
        : null,
  };
}

export async function loadAttributeOptions(attributeId: string): Promise<AttrOption[] | null> {
  const held = cache.get(attributeId);
  if (held) return held;
  try {
    const response = await fetch(`/api/attributes/${attributeId}/options`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as Record<string, unknown>;
    const list = Array.isArray(payload["options"]) ? payload["options"] : null;
    if (list === null) return null;
    const options = list
      .map((entry) => shape((entry ?? {}) as Record<string, unknown>))
      .filter((option) => option.value !== "");
    cache.set(attributeId, options);
    return options;
  } catch {
    return null;
  }
}

/**
 * AN OPTION LABEL IN THE SELLER'S LANGUAGE. Option records are not entities in
 * the translation bundle — they live inside the definition's `options` array — so
 * their overlay is the record's own Amharic label with the English one beneath
 * it. One resolver, here, so no control writes its own language ternary (B2).
 */
export function optionLabel(option: AttrOption, lang: string): string {
  if (lang === "am" && option.labelAm !== null && option.labelAm !== "") return option.labelAm;
  return option.labelEn;
}
