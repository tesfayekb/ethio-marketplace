import { supabase } from "@/integrations/supabase/client";

/**
 * C3c — THE ATTRIBUTE LIBRARY client seam.
 *
 * Every read and write below is a SECURITY DEFINER RPC landed by C3b/C3c that
 * re-checks `has_permission(auth.uid(), 'categories', …)` and, for the
 * destructive verbs, `require_step_up_if_needed(...)` server-side (laws E7 /
 * F3). The browser never touches `public.attributes` or
 * `public.category_attribute_links`: both carry a `no client access` policy.
 *
 * Law F4 — no phantom success: every error is thrown, never swallowed.
 */

/** The select-family types are the ones that carry an options list. */
export const OPTION_TYPES = ["select", "multi_select"] as const;
export const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "select",
  "multi_select",
] as const;
export type AttributeType = (typeof ATTRIBUTE_TYPES)[number];

export function typeHasOptions(attrType: string): boolean {
  return (OPTION_TYPES as readonly string[]).includes(attrType);
}

export interface AttributeRow {
  id: string;
  attrKey: string;
  nameEn: string;
  attrType: string;
  options: string[];
  helpTextEn: string | null;
  /** How many categories link this definition (the blast radius). */
  usageCount: number;
}

/** The options JSON is authored as a plain list of strings; anything else reads empty. */
function toOptionList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry !== null && typeof entry === "object" && "value" in entry) {
        return String((entry as { value: unknown }).value);
      }
      return "";
    })
    .filter((entry) => entry !== "");
}

export async function listAttributes(): Promise<AttributeRow[]> {
  const { data, error } = await supabase.rpc("admin_list_attributes");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    attrKey: row.attr_key,
    nameEn: row.name_en,
    attrType: row.attr_type,
    options: toOptionList(row.options),
    helpTextEn: row.help_text_en ?? null,
    usageCount: Number(row.usage_count ?? 0),
  }));
}

export interface UpsertAttributeInput {
  id: string | null;
  attrKey: string;
  nameEn: string;
  attrType: string;
  options: string[];
  helpTextEn: string;
}

export async function upsertAttribute(input: UpsertAttributeInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_upsert_attribute", {
    p_id: input.id as string,
    p_attr_key: input.attrKey,
    p_name_en: input.nameEn,
    p_attr_type: input.attrType,
    p_options: typeHasOptions(input.attrType) && input.options.length > 0 ? input.options : null,
    p_help_text_en: input.helpTextEn.trim() === "" ? (null as unknown as string) : input.helpTextEn,
  });
  if (error) throw error;
  return data as string;
}

export async function deleteAttribute(input: { id: string; confirmKey: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_delete_attribute", {
    p_id: input.id,
    p_confirm_key: input.confirmKey,
  });
  if (error) throw error;
}

export interface MergeCounts {
  moved: number;
  folded: number;
  removed: number;
}

export async function mergeAttributes(input: {
  targetId: string;
  sourceIds: string[];
}): Promise<MergeCounts> {
  const { data, error } = await supabase.rpc("admin_merge_attributes", {
    p_target: input.targetId,
    p_sources: input.sourceIds,
  });
  if (error) throw error;
  const counts = (data ?? {}) as Record<string, number>;
  return {
    moved: Number(counts.moved ?? 0),
    folded: Number(counts.folded ?? 0),
    removed: Number(counts.removed ?? 0),
  };
}

/* ------------------------- per-category link manager ---------------------- */

export interface AttributeLink {
  linkId: string;
  attributeId: string;
  attrKey: string;
  nameEn: string;
  attrType: string;
  options: string[];
  isRequired: boolean;
  isFilterable: boolean;
  displayOrder: number;
  /** 1..3 when the attribute shows on the listing card, null otherwise. */
  cardRank: number | null;
}

export async function listCategoryLinks(categoryId: string): Promise<AttributeLink[]> {
  const { data, error } = await supabase.rpc("admin_list_category_attribute_links", {
    p_category_id: categoryId,
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    linkId: row.link_id,
    attributeId: row.attribute_id,
    attrKey: row.attr_key,
    nameEn: row.name_en,
    attrType: row.attr_type,
    options: toOptionList(row.options),
    isRequired: row.is_required,
    isFilterable: row.is_filterable,
    displayOrder: Number(row.display_order ?? 0),
    cardRank: row.card_rank === null ? null : Number(row.card_rank),
  }));
}

export async function linkAttribute(input: {
  categoryId: string;
  attributeId: string;
  isRequired: boolean;
  isFilterable: boolean;
  displayOrder: number | null;
}): Promise<string> {
  const { data, error } = await supabase.rpc("admin_link_attribute", {
    p_category_id: input.categoryId,
    p_attribute_id: input.attributeId,
    p_is_required: input.isRequired,
    p_is_filterable: input.isFilterable,
    p_display_order: input.displayOrder as number,
  });
  if (error) throw error;
  return data as string;
}

export async function unlinkAttribute(linkId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_unlink_attribute", { p_link_id: linkId });
  if (error) throw error;
}

export async function setCardAttributes(input: {
  categoryId: string;
  orderedAttributeIds: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_card_attributes", {
    p_category_id: input.categoryId,
    p_ordered_attribute_ids: input.orderedAttributeIds,
  });
  if (error) throw error;
}

/**
 * THE TWO-MUST-DISPLAY LAW (C3 spec). An active category that accepts
 * listings needs at least two card attributes, otherwise its listing cards
 * read as a bare title and the feed is unscannable.
 */
export const CARD_ATTRIBUTE_MINIMUM = 2;
export const CARD_ATTRIBUTE_MAXIMUM = 3;

export function needsCardAttributes(row: {
  isActive: boolean;
  allowListings: boolean;
  cardAttributeCount: number;
}): boolean {
  return row.isActive && row.allowListings && row.cardAttributeCount < CARD_ATTRIBUTE_MINIMUM;
}

/**
 * C3c PART C — MOVE UP / MOVE DOWN. The whole link list is sent in its new
 * order; the server refuses anything that is not exactly the category's own
 * set (totality, E6), so a stale client can never half-write an order.
 */
export async function setAttributeLinkOrder(input: {
  categoryId: string;
  orderedLinkIds: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_attribute_link_order", {
    p_category_id: input.categoryId,
    p_ordered_link_ids: input.orderedLinkIds,
  });
  if (error) throw error;
}
