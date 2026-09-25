import { optionLabel, type AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { catalogText } from "@/i18n";

export function attributeDisplayValue(
  definition: AttrDef,
  value: unknown,
  options: AttrOption[],
  language: string,
  yes: string,
  no: string,
  yearSuffix = "",
): string {
  if (definition.attrType === "boolean") return value === true ? yes : no;
  if (definition.format === "year" && typeof value === "number") {
    return yearLabel(value, language, yearSuffix);
  }

  const labels = new Map(options.map((option) => [option.value, optionLabel(option, language)]));
  const renderOne = (entry: unknown): string => {
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const other = entry as { value?: unknown; text?: unknown };
      if (other.value === "other" && typeof other.text === "string") return other.text;
    }
    const raw = String(entry);
    return labels.get(raw) ?? raw;
  };

  const rendered = Array.isArray(value) ? value.map(renderOne).join(", ") : renderOne(value);
  const unit = catalogText(definition.unit ?? "", null, language);
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
