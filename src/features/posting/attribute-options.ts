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

import { catalogText } from "@/i18n";

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
  /**
   * INC-244 — WHAT THE MODEL RULES OUT. `allowed` names sibling details and the
   * ONLY answers they may hold under this option (`{ fuel: ["electric"] }`). The
   * form narrows the sibling's picker to them, clears an answer outside them and
   * locks the picker on a single one; the door narrows too, so this is the mirror
   * (F3).
   */
  allowed: Record<string, string[]> | null;
  /**
   * R-SW / INC-249 — WHAT THE MODEL BOUNDS. The door's own option record keeps a
   * bound in its OWN `bounds` object, beside `facts`:
   * `{"bounds": {"year": {"min": 2020}}}`. This shape was never read here, so the
   * posting form saw no floor at all on real catalogue data and offered years the
   * catalogue had ruled out. The numbers arrive as the file wrote them — a string
   * is still a number (INC-247) — so they are kept raw and read by the form's one
   * bound reader. The door's bounds remain the authority (F3).
   */
  bounds: Record<string, unknown> | null;
  /**
   * D28 / M-SWATCH — WHAT COLOUR THIS OPTION ACTUALLY IS, said by the catalogue
   * rather than guessed from the word: one hex, two hexes for a two-tone, or
   * `pattern:<name>`. Absent, the form falls back to the value's own name
   * (INC-259). The door validates the cell (`attr_option_shape`).
   */
  swatch: string | null;
}

/**
 * INC-243 — A LIST IS REMEMBERED, NOT PINNED. The page-session cache used to hold
 * the first answer for the whole visit, so a curator's file commit could not
 * reach a form already open — although the door's own version DOES move (the
 * commit writes `attributes.updated_at`, and the version is derived from it). The
 * entry now carries the version it was read at and expires after a minute; the
 * refetch is a conditional request the edge answers with 304 when nothing moved.
 */
const TTL_MS = 60_000;

interface CacheEntry {
  options: AttrOption[];
  version: string;
  at: number;
}

const cache = new Map<string, CacheEntry>();

/** The version of the list currently held, if any — the form's refetch signal. */
export function heldOptionsVersion(attributeId: string): string | null {
  return cache.get(attributeId)?.version ?? null;
}

/** Drops what is held, so the next open re-asks (a category change, a retry). */
export function forgetAttributeOptions(): void {
  cache.clear();
}

function stringList(raw: unknown): string[] {
  if (typeof raw === "string") return [raw];
  return Array.isArray(raw)
    ? raw.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function shape(row: Record<string, unknown>): AttrOption {
  const value = typeof row["value"] === "string" ? row["value"] : "";
  const facts = row["facts"];
  const boundsRaw = row["bounds"];
  const allowedRaw = row["allowed"];
  let allowed: Record<string, string[]> | null = null;
  if (allowedRaw !== null && typeof allowedRaw === "object" && !Array.isArray(allowedRaw)) {
    const out: Record<string, string[]> = {};
    for (const [key, entry] of Object.entries(allowedRaw as Record<string, unknown>)) {
      const list = stringList(entry);
      if (list.length > 0) out[key] = list;
    }
    if (Object.keys(out).length > 0) allowed = out;
  }
  return {
    value,
    labelEn: typeof row["label_en"] === "string" ? row["label_en"] : value,
    labelAm: typeof row["label_am"] === "string" ? row["label_am"] : null,
    parent: typeof row["parent"] === "string" ? row["parent"] : null,
    facts:
      facts !== null && typeof facts === "object" && !Array.isArray(facts)
        ? (facts as Record<string, unknown>)
        : null,
    allowed,
    bounds:
      boundsRaw !== null && typeof boundsRaw === "object" && !Array.isArray(boundsRaw)
        ? (boundsRaw as Record<string, unknown>)
        : null,
    swatch: typeof row["swatch"] === "string" ? row["swatch"] : null,
  };
}

export async function loadAttributeOptions(attributeId: string): Promise<AttrOption[] | null> {
  const held = cache.get(attributeId);
  if (held && Date.now() - held.at < TTL_MS) return held.options;
  try {
    const response = await fetch(`/api/attributes/${attributeId}/options`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return held ? held.options : null;
    const payload = (await response.json()) as Record<string, unknown>;
    const list = Array.isArray(payload["options"]) ? payload["options"] : null;
    if (list === null) return held ? held.options : null;
    const options = list
      .map((entry) => shape((entry ?? {}) as Record<string, unknown>))
      .filter((option) => option.value !== "");
    cache.set(attributeId, {
      options,
      version: typeof payload["version"] === "string" ? payload["version"] : "",
      at: Date.now(),
    });
    return options;
  } catch {
    return held ? held.options : null;
  }
}

/**
 * AN OPTION LABEL IN THE SELLER'S LANGUAGE. Option records are not entities in
 * the translation bundle — they live inside the definition's `options` array — so
 * their overlay is the record's own Amharic label with the English one beneath
 * it. One resolver, here, so no control writes its own language ternary (B2).
 */
export function optionLabel(option: AttrOption, lang: string): string {
  return catalogText(option.labelEn, option.labelAm, lang);
}
