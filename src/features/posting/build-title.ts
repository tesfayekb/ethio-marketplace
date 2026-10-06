import { catalogPieces, catalogText, type CatalogTokens } from "@/i18n";

import { attributeDisplayValue } from "./attribute-display";
import type { AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { conditionMet } from "./visible-when";

/** Bundle 4 step 12 (DEC-111) — the built title never passes this length. */
export const BUILT_TITLE_MAX = 70;
const TEXT_PART_MAX = 30;
const MAX_PICKS = 2;

/** A character no catalogue label holds, so a drawn {country} can be seen. */
const COUNTRY_MARK = "\u0000";

/**
 * Bundle 7 B3.2 — a label that holds the {country} token in the title's
 * language, before any token is filled in, read by the catalogue's own reader.
 */
function holdsCountry(option: AttrOption, language: string): boolean {
  const raw = catalogText(option.labelEn, option.labelAm, language);
  return catalogPieces(raw, { country: COUNTRY_MARK, categoryPath: () => null }).some(
    (piece) => piece.kind === "text" && piece.text.includes(COUNTRY_MARK),
  );
}

/** Bundle 7 B3.1 — cut at the last whole word that fits `max`. */
function cutAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const head = text.slice(0, max + 1);
  const space = head.lastIndexOf(" ");
  return (space > 0 ? head.slice(0, space) : text.slice(0, max)).trimEnd();
}

/**
 * Bundle 4 step 12 — THE TITLE IS BUILT FROM THE SELLER'S ANSWERS. The rows
 * that carry a card rank, lowest first, answered, visible and not deal rows,
 * each rendered through the review's own value renderer. A yes/no answer, a
 * list of more than two picks and a text answer over 30 characters are
 * skipped; the parts join with single spaces and the build stops before it
 * passes 70 characters. No amount, currency, period or price type enters it:
 * those are not attributes, and the deal rows are excluded by key.
 */
export function buildTitle(input: {
  definitions: AttrDef[];
  answers: Record<string, unknown>;
  options: Record<string, AttrOption[]>;
  language: string;
  dealKeys: ReadonlySet<string>;
  yearSuffix: string;
  tokens: CatalogTokens;
}): string {
  const { definitions, answers, options, language, dealKeys, yearSuffix, tokens } = input;
  const ranked = definitions
    .filter((def) => def.cardRank !== null && !dealKeys.has(def.attrKey))
    .filter((def) => conditionMet(def, answers))
    .sort((a, b) => (a.cardRank ?? 0) - (b.cardRank ?? 0));
  /**
   * Bundle 7 B3.1 — THE SELLER'S OWN NAME FOR THE ITEM LEADS: when the leaf's
   * first question in form order is a required text question with no card rank,
   * its trimmed answer opens the title (up to 70, cut at a word).
   */
  let title = "";
  const first = definitions[0];
  if (
    first !== undefined &&
    first.attrType === "text" &&
    first.isRequired &&
    first.cardRank === null &&
    typeof answers[first.attrKey] === "string"
  ) {
    title = cutAtWord(
      (answers[first.attrKey] as string).trim().replace(/\s+/g, " "),
      BUILT_TITLE_MAX,
    );
  }
  for (const def of ranked) {
    const value = answers[def.attrKey];
    if (value === undefined || value === null || value === "") continue;
    if (def.attrType === "boolean" || typeof value === "boolean") continue;
    if (Array.isArray(value) && (value.length === 0 || value.length > MAX_PICKS)) continue;
    if (def.attrType === "text" && typeof value === "string" && value.length > TEXT_PART_MAX) {
      continue;
    }
    const isChoice = ["single_select", "select", "multi_select"].includes(def.attrType);
    const held = options[def.attrKey] ?? [];
    if (isChoice) {
      // A choice whose label is not held yet is left out: a raw token is never written.
      const known = new Set(held.map((option) => option.value));
      const entries = Array.isArray(value) ? value : [value];
      const unlabelled = entries.some((entry) => {
        if (entry !== null && typeof entry === "object") {
          const other = entry as { value?: unknown; text?: unknown };
          return !(other.value === "other" && typeof other.text === "string");
        }
        return !known.has(String(entry));
      });
      if (unlabelled) continue;
      // B3.2 — no country name in a built title: a label with {country} is left out.
      const picked = new Set(entries.map((entry) => String(entry)));
      if (held.some((option) => picked.has(option.value) && holdsCountry(option, language))) {
        continue;
      }
    }
    const part = attributeDisplayValue(
      def,
      value,
      held,
      language,
      "",
      "",
      yearSuffix,
      tokens,
    ).trim();
    if (part === "") continue;
    const next = title === "" ? part : `${title} ${part}`;
    if (next.length > BUILT_TITLE_MAX) break;
    title = next;
  }
  return title;
}
