import { answerTokens } from "./answer-tokens";
import { optionLabel, type AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { conditionMet } from "./visible-when";
import { catalogWords, type CatalogTokens } from "@/i18n";

export function attributeDisplayValue(
  definition: AttrDef,
  value: unknown,
  options: AttrOption[],
  language: string,
  yes: string,
  no: string,
  yearSuffix: string,
  tokens: CatalogTokens,
): string {
  if (definition.attrType === "boolean") return value === true ? yes : no;
  if (definition.format === "year" && typeof value === "number") {
    return yearLabel(value, language, yearSuffix);
  }

  const labels = new Map(
    options.map((option) => [option.value, optionLabel(option, language, tokens)]),
  );
  const renderOne = (entry: unknown): string => {
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const other = entry as { value?: unknown; text?: unknown };
      if (other.value === "other" && typeof other.text === "string") return other.text;
    }
    const raw = String(entry);
    return labels.get(raw) ?? raw;
  };

  const rendered = Array.isArray(value) ? value.map(renderOne).join(", ") : renderOne(value);
  const unit = catalogWords(definition.unit ?? "", null, language, tokens);
  return unit === "" ? rendered : `${rendered} ${unit}`;
}

/**
 * INC-288 — THE DOOR'S BOUND VOCABULARY, resolved exactly as `attr_bound_value`
 * does (migration 20260911193208): a literal number is itself; `year` is the
 * current UTC year; `year+N` / `year-N` offset it; anything else is no bound.
 */
export function resolveBound(raw: string | null, now: Date = new Date()): number | null {
  if (raw === null) return null;
  const text = raw.trim();
  if (text === "") return null;
  const relative = /^year(?:([+-])(\d+))?$/.exec(text);
  if (relative !== null) {
    const year = now.getUTCFullYear();
    if (relative[1] === undefined) return year;
    const offset = Number(relative[2]);
    return relative[1] === "+" ? year + offset : year - offset;
  }
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * D45 — ONE YEAR LABEL EVERYWHERE. Under Amharic a Gregorian year spans two
 * Ethiopian years (1 Jan – 10 Sep is GC−8, 11 Sep – 31 Dec is GC−7), so it
 * reads "<GC> · <GC−8>/<GC−7, two digits> <suffix>"; elsewhere the bare year.
 * The stored value is always the Gregorian integer.
 */
export function yearLabel(year: number, language: string, suffix: string): string {
  if (language !== "am") return String(year);
  const second = String((((year - 7) % 100) + 100) % 100).padStart(2, "0");
  return `${year} · ${year - 8}/${second} ${suffix}`.trim();
}

/** A range the catalogue already knows for a number (INC-374). */
export interface SettledRange {
  min: number;
  max: number;
}

function boundNumber(raw: unknown): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * INC-374 — THE NUMBERS THE CHOSEN OPTIONS SETTLE, mirroring the fold in
 * `validate_listing_attributes`: every chosen option's bound for a key narrows
 * it (tightest floor and ceiling win), and the key is settled when any of them
 * carries `"settled": true`. A settled number is not asked; it is shown as its
 * range. `min = max` stays DEC-085's pinned value (stored, hidden), so it is not
 * a range here. A number that holds an answer, or whose condition is unmet, is
 * not listed. The door remains the authority (F3).
 */
export function settledRanges(
  definitions: readonly AttrDef[],
  values: Record<string, unknown>,
  optionsOf: (definition: AttrDef) => readonly AttrOption[],
): Record<string, SettledRange> {
  const folded: Record<string, { min: number | null; max: number | null; settled: boolean }> = {};
  for (const def of definitions) {
    if (def.attrType !== "single_select" && def.attrType !== "multi_select") continue;
    const picked = answerTokens(values[def.attrKey]);
    if (picked.length === 0) continue;
    for (const option of optionsOf(def)) {
      if (!picked.includes(option.value)) continue;
      for (const [key, raw] of Object.entries(option.bounds ?? {})) {
        if (raw === null || typeof raw !== "object" || Array.isArray(raw)) continue;
        const row = raw as Record<string, unknown>;
        const min = boundNumber(row["min"]);
        const max = boundNumber(row["max"]);
        const held = (folded[key] ??= { min: null, max: null, settled: false });
        if (min !== null) held.min = held.min === null ? min : Math.max(held.min, min);
        if (max !== null) held.max = held.max === null ? max : Math.min(held.max, max);
        if (row["settled"] === true) held.settled = true;
      }
    }
  }
  const out: Record<string, SettledRange> = {};
  for (const def of definitions) {
    if (def.attrType !== "number") continue;
    const held = folded[def.attrKey];
    if (held === undefined || !held.settled || held.min === null || held.max === null) continue;
    if (held.min >= held.max) continue;
    const answer = values[def.attrKey];
    if (answer !== undefined && answer !== null && answer !== "") continue;
    if (!conditionMet(def, values)) continue;
    out[def.attrKey] = { min: held.min, max: held.max };
  }
  return out;
}

/** "<min>–<max> <unit>" — the one way a settled range is written. */
export function rangeDisplayValue(
  definition: AttrDef,
  range: SettledRange,
  language: string,
  tokens: CatalogTokens,
): string {
  const unit = catalogWords(definition.unit ?? "", null, language, tokens);
  const text = `${range.min}–${range.max}`;
  return unit === "" ? text : `${text} ${unit}`;
}
