import type { AttrDef, PostingSchema } from "./posting-service";
import type { CategoryFacts } from "./types";
import { shapeCondition } from "./visible-when";

/**
 * D234 speed turn S1 — THE PURE SHAPERS of the posting schema and the deal block,
 * moved out of posting-service.ts unchanged so a page that only SHAPES a public
 * read (the ad page's public-listing.ts) never downloads the posting doors, the
 * Supabase client calls and reader-failure with them. posting-service.ts
 * re-exports both names, so every other importer is unchanged.
 */
function str(row: Record<string, unknown>, key: string): string | null {
  const value = row[key];
  return typeof value === "string" && value !== "" ? value : null;
}

function int(row: Record<string, unknown>, key: string): number | null {
  const value = row[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function shapeDefinition(row: Record<string, unknown>): AttrDef {
  return {
    attributeId: str(row, "attribute_id") ?? "",
    attrKey: str(row, "attr_key") ?? "",
    attrType: str(row, "attr_type") ?? "text",
    nameEn: str(row, "name_en") ?? str(row, "attr_key") ?? "",
    nameAm: str(row, "name_am"),
    helpTextEn: str(row, "help_text_en"),
    helpTextAm: str(row, "help_text_am"),
    isRequired: row["is_required"] === true,
    isFilterable: row["is_filterable"] === true,
    unit: str(row, "unit"),
    unitAm: str(row, "unit_am"),
    minBound: str(row, "min_bound"),
    maxBound: str(row, "max_bound"),
    decimals: int(row, "decimals"),
    format: str(row, "format"),
    preset: str(row, "preset"),
    maxLength: int(row, "max_length"),
    optionCount: int(row, "option_count") ?? 0,
    allowOther: row["allow_other"] === true,
    allowedOptions: Array.isArray(row["allowed_options"])
      ? (row["allowed_options"] as unknown[]).filter(
          (entry): entry is string => typeof entry === "string",
        )
      : null,
    defaultValue: row["default_value"] ?? null,
    visibleWhen: shapeCondition(row["visible_when"]),
    cardRank: int(row, "card_rank"),
    factRank: int(row, "fact_rank"),
  };
}

/** DEC-109 — the door's `deal` block; a missing or malformed list reads as empty. */
export function shapeDeal(raw: unknown): CategoryFacts["deal"] {
  const row =
    raw !== null && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const list = (key: string): string[] =>
    Array.isArray(row[key])
      ? (row[key] as unknown[]).filter((entry): entry is string => typeof entry === "string")
      : [];
  return {
    basis: list("basis"),
    size: list("size"),
    quantity: list("quantity"),
    terms: list("terms"),
  };
}

/**
 * K5 — a payload without its question list is a FAILED read (`null`), never an
 * empty list: under rule 1 an empty list would drop every answer the draft holds.
 * An empty ARRAY stays an empty list (a category with no questions).
 */
export function shapePostingSchema(data: unknown): PostingSchema | null {
  if (data === null || typeof data !== "object") return null;
  const payload = data as Record<string, unknown>;
  if (!Array.isArray(payload["attributes"])) return null;
  const definitions = payload["attributes"] as Record<string, unknown>[];
  const attributes = definitions.map(shapeDefinition).filter((row) => row.attrKey !== "");
  const block = (payload["category"] ?? null) as Record<string, unknown> | null;
  const capabilities = Array.isArray(block?.["capabilities"])
    ? (block["capabilities"] as unknown[]).filter(
        (entry): entry is string => typeof entry === "string",
      )
    : [];
  const planBlock = (payload["plan"] ?? null) as Record<string, unknown> | null;
  return {
    details: attributes.length,
    required: attributes.filter((row) => row.isRequired).length,
    attributes,
    plan:
      planBlock === null
        ? null
        : {
            plan: str(planBlock, "plan") ?? "",
            maxCities: int(planBlock, "max_cities"),
            maxRegions: int(planBlock, "max_regions"),
            maxCountries: int(planBlock, "max_countries"),
            maxPhotos: int(planBlock, "max_photos"),
          },
    category:
      block === null
        ? null
        : {
            id: str(block, "id") ?? "",
            slug: str(block, "slug") ?? "",
            nameEn: str(block, "name_en") ?? "",
            priceEnabled: block["price_enabled"] !== false,
            defaultPricePeriod: str(block, "default_price_period") ?? "once",
            pricePeriodLocked: block["price_period_locked"] === true,
            expiryDays: int(block, "expiry_days"),
            capabilities,
            deal: shapeDeal(block["deal"]),
          },
  };
}
