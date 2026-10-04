import type { MessageKey } from "@/i18n";
import { entityName, type EntityBundle } from "@/i18n/entity";
import { attributeDisplayValue } from "./attribute-display";
import type { AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { fill } from "./refusal-text";
import type { DealLists } from "./types";

/**
 * Bundle 4 step 10 — WHAT THE AD SAYS ABOUT THE DEAL, under the price: the
 * size as one line ("One pack: 12 pieces · 500 g") and each term as
 * "<label>: <value>", through the review's own value renderer. A row with no
 * answer, or no definition on screen yet, prints nothing.
 */
export function dealLines(input: {
  deal: DealLists | null;
  attributes: Record<string, unknown>;
  definitions: AttrDef[];
  attributeOptions: Record<string, AttrOption[]>;
  unit: string | null;
  language: string;
  entities: EntityBundle;
  t: (key: MessageKey) => string;
}): { size: string | null; terms: string[] } {
  const { deal, attributes, definitions, attributeOptions, unit, language, entities, t } = input;
  if (deal === null) return { size: null, terms: [] };
  const render = (key: string): { name: string; value: string } | null => {
    const value = attributes[key];
    if (value === undefined || value === null || value === "") return null;
    const def = definitions.find((entry) => entry.attrKey === key);
    if (def === undefined) return null;
    return {
      name: entityName(
        "attribute",
        { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
        entities,
      ),
      value: attributeDisplayValue(
        def,
        value,
        attributeOptions[key] ?? [],
        language,
        t("post.review.yes"),
        t("post.review.no"),
        t("post.specs.yearEcSuffix"),
      ),
    };
  };
  const sizes = deal.size.map(render).filter((row) => row !== null);
  const values = sizes.map((row) => row.value).join(" · ");
  const size =
    sizes.length === 0
      ? null
      : unit !== null && unit.trim() !== ""
        ? fill(t("post.review.sizeLine"), { unit: unit.trim(), values })
        : values;
  const terms = deal.terms
    .map(render)
    .filter((row) => row !== null)
    .map((row) => `${row.name}: ${row.value}`);
  return { size, terms };
}
