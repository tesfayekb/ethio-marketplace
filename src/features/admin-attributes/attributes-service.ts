import { supabase } from "@/integrations/supabase/client";

import type {
  NumberFieldsValue,
  TextFieldsValue,
} from "./components/attribute-v2-fields";

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
export const OPTION_TYPES = ["single_select", "multi_select"] as const;
/** The live CHECK set on public.attributes.attr_type (C3b) — the only legal vocabulary. */
export const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "single_select",
  "multi_select",
  "boolean",
  "date",
  "range",
] as const;
export type AttributeType = (typeof ATTRIBUTE_TYPES)[number];

export function typeHasOptions(attrType: string): boolean {
  return (OPTION_TYPES as readonly string[]).includes(attrType);
}

/**
 * DEC-045 — an option is a VALUE plus, for a dependent definition, the PARENT
 * value it belongs to. A flat list is the same shape with `parent === ""`.
 */
export interface AttributeOption {
  value: string;
  labelEn: string;
  labelAm: string;
  parent: string;
}

export function optionValues(options: AttributeOption[]): string[] {
  return options.map((option) => option.value);
}

/** An option READS as its English label; the stored value is the fallback. */
export function optionLabel(option: AttributeOption): string {
  return option.labelEn.trim() === "" ? option.value : option.labelEn;
}

/**
 * DEC-045b PART B — the library's Options expansion, as ONE string.
 *
 * A flat definition reads "seagull · dolphin". A DEPENDENT one is grouped by
 * the parent value it hangs under: "byd: seagull · dolphin — toyota: corolla".
 * Never the raw objects: stringifying them is what produced "[object Object]".
 */
export function describeOptions(options: AttributeOption[]): string {
  const groups: { parent: string; labels: string[] }[] = [];
  for (const option of options) {
    const group = groups.find((entry) => entry.parent === option.parent);
    if (group) group.labels.push(optionLabel(option));
    else groups.push({ parent: option.parent, labels: [optionLabel(option)] });
  }
  return groups
    .map((group) =>
      group.parent === ""
        ? group.labels.join(" · ")
        : `${group.parent}: ${group.labels.join(" · ")}`,
    )
    .join(" — ");
}

export interface AttributeRow {
  id: string;
  attrKey: string;
  nameEn: string;
  attrType: string;
  options: AttributeOption[];
  helpTextEn: string | null;
  /** How many categories link this definition (the blast radius). */
  usageCount: number;
  /** DEC-045 — the key of the single_select definition this one depends on. */
  dependsOnKey: string | null;
  /* DEC-050 — the v2 cells; every one nullable, the door's CHECKs authoritative. */
  helpTextAm: string | null;
  unit: string | null;
  minBound: string | null;
  maxBound: string | null;
  decimals: number | null;
  format: string | null;
  preset: string | null;
  maxLength: number | null;
}

/**
 * The options JSON is either a plain list of strings (a flat definition) or a
 * list of `{value,label_en,label_am,parent}` objects (a dependent one). Both
 * read into the same shape; anything else reads empty.
 */
function toOptionList(raw: unknown): AttributeOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): AttributeOption => {
      if (typeof entry === "string") {
        return { value: entry, labelEn: "", labelAm: "", parent: "" };
      }
      if (entry !== null && typeof entry === "object" && "value" in entry) {
        const record = entry as Record<string, unknown>;
        const text = (name: string) =>
          typeof record[name] === "string" ? (record[name] as string) : "";
        return {
          value: String(record["value"] ?? ""),
          labelEn: text("label_en"),
          labelAm: text("label_am"),
          parent: text("parent"),
        };
      }
      return { value: "", labelEn: "", labelAm: "", parent: "" };
    })
    .filter((entry) => entry.value !== "");
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
    dependsOnKey: row.depends_on_key ?? null,
    // DEC-050 L3a-mig — the reader returns the v2 cells, so the editor can
    // pre-fill them; without the prefill an UPDATE would erase them.
    helpTextAm: row.help_text_am ?? null,
    unit: row.unit ?? null,
    minBound: row.min_bound ?? null,
    maxBound: row.max_bound ?? null,
    decimals: row.decimals === null || row.decimals === undefined ? null : Number(row.decimals),
    format: row.format ?? null,
    preset: row.preset ?? null,
    maxLength:
      row.max_length === null || row.max_length === undefined ? null : Number(row.max_length),
  }));
}

/**
 * DEC-050 L3a — Amharic option coverage, once for the whole library. The RPC
 * carries the same `categories:view` gate as every other console read (E7).
 */
export interface OptionCoverage {
  attributeId: string;
  attrKey: string;
  total: number;
  withAm: number;
}

export async function listOptionCoverage(): Promise<OptionCoverage[]> {
  const { data, error } = await supabase.rpc("admin_attribute_option_coverage");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    attributeId: row.attribute_id,
    attrKey: row.attr_key,
    total: Number(row.options_total ?? 0),
    withAm: Number(row.options_with_am ?? 0),
  }));
}

export interface UpsertAttributeInput {
  id: string | null;
  attrKey: string;
  nameEn: string;
  attrType: string;
  options: AttributeOption[];
  helpTextEn: string;
  dependsOnKey: string | null;
  /* DEC-050 L3a — every v2 cell reaches the door; empty is null. */
  helpTextAm: string;
  unit: string | null;
  minBound: string | null;
  maxBound: string | null;
  decimals: number | null;
  format: string | null;
  preset: string | null;
  maxLength: number | null;
}

/**
 * A FLAT definition keeps writing plain strings — the storage shape the whole
 * library already carries, so nothing round-trips differently. Only a
 * dependent definition writes objects, and only the fields it actually uses.
 */
function toOptionsJson(options: AttributeOption[]): unknown[] {
  const dependent = options.some((option) => option.parent !== "");
  return dependent
    ? options.map((option) => ({ value: option.value, parent: option.parent }))
    : options.map((option) => option.value);
}

export async function upsertAttribute(input: UpsertAttributeInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_upsert_attribute", {
    p_id: input.id as string,
    p_attr_key: input.attrKey,
    p_name_en: input.nameEn,
    p_attr_type: input.attrType,
    p_options:
      typeHasOptions(input.attrType) && input.options.length > 0
        ? (toOptionsJson(input.options) as never)
        : null,
    p_help_text_en: input.helpTextEn.trim() === "" ? (null as unknown as string) : input.helpTextEn,
    p_depends_on: input.dependsOnKey as string,
    p_help_text_am:
      input.helpTextAm.trim() === "" ? (null as unknown as string) : input.helpTextAm.trim(),
    p_unit: input.unit as string,
    p_min_bound: input.minBound as string,
    p_max_bound: input.maxBound as string,
    p_decimals: input.decimals as number,
    p_format: input.format as string,
    p_preset: input.preset as string,
    p_max_length: input.maxLength as number,
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
  options: AttributeOption[];
  isRequired: boolean;
  isFilterable: boolean;
  displayOrder: number;
  /** 1..3 when the attribute shows on the listing card, null otherwise. */
  cardRank: number | null;
  /** DEC-045 — the parent definition's key, or null for a flat attribute. */
  dependsOnKey: string | null;
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
    dependsOnKey: row.depends_on_key ?? null,
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

/**
 * FIX-SCAN-1 ISSUE 1 — ONE ATOMIC WRITE FOR THE LINK FLAGS.
 *
 * Toggling Required/Filterable used to unlink then relink: a failure between
 * the two LOST the link, and the fresh row dropped `card_rank`. The definer
 * RPC updates the two flags in place; ordering and the card setting are never
 * touched.
 */
export async function updateAttributeLink(input: {
  linkId: string;
  isRequired?: boolean;
  isFilterable?: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_update_attribute_link", {
    p_link_id: input.linkId,
    p_is_required: input.isRequired ?? (null as unknown as boolean),
    p_is_filterable: input.isFilterable ?? (null as unknown as boolean),
  });
  if (error) throw error;
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

/* ---------------------- C3-UX-1c — used-by, by NAME ----------------------- */

/**
 * `admin_list_attributes` reports a bare usage COUNT, so the library could
 * neither NAME the categories a definition is used by nor address the link row
 * a "remove from category" verb must delete. `admin_list_attribute_categories`
 * (same `categories:view` gate, E7) supplies both, once, for the whole library.
 */
export interface AttributeCategory {
  linkId: string;
  attributeId: string;
  categoryId: string;
  categorySlug: string;
  nameEn: string;
  isActive: boolean;
}

export async function listAttributeCategories(): Promise<AttributeCategory[]> {
  const { data, error } = await supabase.rpc("admin_list_attribute_categories");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    linkId: row.link_id,
    attributeId: row.attribute_id,
    categoryId: row.category_id,
    categorySlug: row.category_slug,
    nameEn: row.category_name_en,
    isActive: row.is_active,
  }));
}

/** attribute id → the categories that link it, in the RPC's name order. */
export function groupByAttribute(rows: AttributeCategory[]): Map<string, AttributeCategory[]> {
  const map = new Map<string, AttributeCategory[]>();
  for (const row of rows) {
    const list = map.get(row.attributeId);
    if (list) list.push(row);
    else map.set(row.attributeId, [row]);
  }
  return map;
}

/* ------------------- C3-INH (DEC-044) — EFFECTIVE LINKS ------------------- */

/**
 * A category shows its OWN links plus every link inherited from an ancestor
 * category (nearest link wins). `admin_list_effective_category_links` is the
 * one reader for that set: `inherited` says which side of the line a row is on
 * and `origin*` names the category the row actually lives in. Inherited rows
 * are READ-ONLY in every surface — the write RPCs address the ORIGIN's link,
 * which is why the console offers only "open origin category" for them (F3:
 * the server refuses regardless).
 */
export interface EffectiveLink extends AttributeLink {
  inherited: boolean;
  originId: string;
  originSlug: string;
  originNameEn: string;
}

export async function listEffectiveCategoryLinks(categoryId: string): Promise<EffectiveLink[]> {
  const { data, error } = await supabase.rpc("admin_list_effective_category_links", {
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
    dependsOnKey: row.depends_on_key ?? null,
    inherited: row.inherited === true,
    originId: row.origin_id,
    originSlug: row.origin_slug,
    originNameEn: row.origin_name_en,
  }));
}

/* ----------------------- DEC-050 L3a — v2 cell shapes ---------------------- */

/**
 * The editor's v2 field values and their serialization to the door's cells.
 * They live beside the mapping (not in the component file) because the token
 * shape is a wire concern: the door stores `digits:N` · `vin` · `plate-et` ·
 * `alnum:A-B` · `free:N` and nothing else.
 */
export const EMPTY_NUMBER_FIELDS: NumberFieldsValue = {
  unit: "",
  min: "",
  max: "",
  decimals: "",
  format: "",
};

export const EMPTY_TEXT_FIELDS: TextFieldsValue = {
  preset: "",
  presetN: "",
  presetA: "",
  presetB: "",
  maxLength: "",
};

/** An incomplete builder serializes to null — the cell stays empty, never half. */
export function presetToken(value: TextFieldsValue): string | null {
  const arg = (raw: string) => raw.trim();
  switch (value.preset) {
    case "digits":
      return arg(value.presetN) === "" ? null : `digits:${arg(value.presetN)}`;
    case "free":
      return arg(value.presetN) === "" ? null : `free:${arg(value.presetN)}`;
    case "alnum":
      return arg(value.presetA) === "" || arg(value.presetB) === ""
        ? null
        : `alnum:${arg(value.presetA)}-${arg(value.presetB)}`;
    case "vin":
    case "plate-et":
      return value.preset;
    default:
      return null;
  }
}

/** The inverse: a stored token pre-fills the builder when a row is reopened. */
export function parsePreset(raw: string | null): Omit<TextFieldsValue, "maxLength"> {
  const empty = { preset: "", presetN: "", presetA: "", presetB: "" };
  if (raw === null || raw.trim() === "") return empty;
  const token = raw.trim();
  if (token === "vin" || token === "plate-et") return { ...empty, preset: token };
  const [kind, arg = ""] = token.split(":");
  if (kind === "digits" || kind === "free") return { ...empty, preset: kind, presetN: arg };
  if (kind === "alnum") {
    const [a = "", b = ""] = arg.split("-");
    return { ...empty, preset: "alnum", presetA: a, presetB: b };
  }
  return empty;
}
