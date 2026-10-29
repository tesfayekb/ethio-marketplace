import { formatLocale } from "@/lib/format-locale";

/** Reader order and region names share one module to avoid first-download chunk overhead. */
const collators = new Map<string, Intl.Collator>();
const regionNames = new Map<string, Intl.DisplayNames>();

export function collatorFor(language: string): Intl.Collator {
  const tag = formatLocale(language);
  let found = collators.get(tag);
  if (found === undefined) {
    found = new Intl.Collator(tag, { sensitivity: "base", numeric: true });
    collators.set(tag, found);
  }
  return found;
}

/** Unknown or malformed region codes are displayed unchanged. */
export function formatCountryName(code: string, language: string): string {
  const tag = formatLocale(language);
  let names = regionNames.get(tag);
  if (names === undefined) {
    names = new Intl.DisplayNames([tag], { type: "region" });
    regionNames.set(tag, names);
  }
  try {
    return names.of(code) ?? code;
  } catch {
    // Intl throws RangeError for a malformed region code; the approved fallback is its code.
    return code;
  }
}

/** Machine ids/codes use code-point order; the shell's name tie-break is explicitly ruled. */
export function compareCodes(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}