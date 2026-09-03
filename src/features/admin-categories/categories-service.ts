import { supabase } from "@/integrations/supabase/client";

/**
 * C2-UI — the Categories console client seam.
 *
 * Every read and write below is a SECURITY DEFINER RPC landed by C2-MIG that
 * re-checks `has_permission(auth.uid(), 'categories', …)` and, for mutations,
 * `require_step_up_if_needed(...)` server-side (laws E7 / F3). The browser
 * never touches `public.categories`, `public.category_tree_pointers` or
 * `public.category_country_exclusions` directly — the exclusions table carries
 * a `no client access` policy by design.
 *
 * Law F4 — no phantom success: every error is thrown, never swallowed.
 */

export interface CategoryRow {
  id: string;
  parentId: string | null;
  slug: string;
  nameEn: string;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  isCatchall: boolean;
  allowListings: boolean;
  priceEnabled: boolean;
  expiryDays: number | null;
  visibleFrom: string | null;
  visibleUntil: string | null;
  listingCount: number;
  exclusionCount: number;
  /** C2b — the exclusion codes themselves, so the dialog pre-ticks (INC-131). */
  excludedCountryCodes: string[];
}

export async function listCategories(): Promise<CategoryRow[]> {
  const { data, error } = await supabase.rpc("admin_list_categories");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    parentId: row.parent_id ?? null,
    slug: row.slug,
    nameEn: row.name_en,
    icon: row.icon ?? null,
    displayOrder: Number(row.display_order ?? 0),
    isActive: row.is_active,
    isCatchall: row.is_catchall,
    allowListings: row.allow_listings,
    priceEnabled: row.price_enabled,
    expiryDays: row.expiry_days === null ? null : Number(row.expiry_days),
    visibleFrom: row.visible_from ?? null,
    visibleUntil: row.visible_until ?? null,
    listingCount: Number(row.listing_count ?? 0),
    exclusionCount: Number(row.exclusion_count ?? 0),
    excludedCountryCodes: (row.excluded_country_codes ?? []) as string[],
  }));
}

export interface CreateCategoryInput {
  slug: string;
  nameEn: string;
  icon: string;
  parentId: string | null;
  allowListings: boolean;
}

export async function createCategory(input: CreateCategoryInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_create_category", {
    p_slug: input.slug,
    p_name_en: input.nameEn,
    p_icon: input.icon,
    p_parent_id: input.parentId as string,
    p_allow_listings: input.allowListings,
  });
  if (error) throw error;
  return data as string;
}

export interface UpdateCategoryInput {
  id: string;
  nameEn: string;
  icon: string;
  displayOrder: number;
  allowListings: boolean;
  priceEnabled: boolean;
  expiryDays: number;
}

export async function updateCategory(input: UpdateCategoryInput): Promise<void> {
  const { error } = await supabase.rpc("admin_update_category", {
    p_id: input.id,
    p_name_en: input.nameEn,
    p_icon: input.icon,
    p_display_order: input.displayOrder,
    p_allow_listings: input.allowListings,
    p_price_enabled: input.priceEnabled,
    p_expiry_days: input.expiryDays,
  });
  if (error) throw error;
}

export async function setCategoryWindow(input: {
  id: string;
  visibleFrom: string | null;
  visibleUntil: string | null;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_category_window", {
    p_id: input.id,
    p_visible_from: input.visibleFrom as string,
    p_visible_until: input.visibleUntil as string,
  });
  if (error) throw error;
}

export async function setCountryExclusions(input: {
  id: string;
  countryCodes: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_country_exclusions", {
    p_id: input.id,
    p_country_codes: input.countryCodes,
  });
  if (error) throw error;
}

export async function retireCategory(input: { id: string; reassignTo: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_retire_category", {
    p_id: input.id,
    p_reassign_to: input.reassignTo,
  });
  if (error) throw error;
}

export async function addCategoryPointer(input: {
  parentId: string;
  childId: string;
}): Promise<string> {
  const { data, error } = await supabase.rpc("admin_add_category_pointer", {
    p_parent_id: input.parentId,
    p_child_id: input.childId,
  });
  if (error) throw error;
  return data as string;
}

export interface CategoryPointer {
  pointerId: string;
  parentId: string | null;
  parentSlug: string | null;
  parentNameEn: string | null;
  displayOrder: number;
}

/** C2b — every browse path this category appears on (parent NULL = a root). */
export async function listCategoryPointers(categoryId: string): Promise<CategoryPointer[]> {
  const { data, error } = await supabase.rpc("admin_list_category_pointers", {
    p_category_id: categoryId,
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    pointerId: row.pointer_id,
    parentId: row.parent_id ?? null,
    parentSlug: row.parent_slug ?? null,
    parentNameEn: row.parent_name_en ?? null,
    displayOrder: Number(row.display_order ?? 0),
  }));
}

export async function moveCategoryPointer(input: {
  pointerId: string;
  newParentId: string | null;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_move_category_pointer", {
    p_pointer_id: input.pointerId,
    p_new_parent_id: input.newParentId as string,
  });
  if (error) throw error;
}

export async function removeCategoryPointer(pointerId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_remove_category_pointer", {
    p_pointer_id: pointerId,
  });
  if (error) throw error;
}

export async function reorderCategories(input: {
  parentId: string | null;
  orderedChildIds: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_reorder_categories", {
    p_parent_id: input.parentId as string,
    p_ordered_child_ids: input.orderedChildIds,
  });
  if (error) throw error;
}

/**
 * Depth-first roster order: roots by display_order, each child block directly
 * under its parent. The console renders ONE flat list (C7 dense table) with an
 * explicit depth so the tree reads at 360px without a nested layout.
 */
export interface CategoryNode extends CategoryRow {
  depth: number;
}

export function toRoster(rows: CategoryRow[]): CategoryNode[] {
  const byParent = new Map<string | null, CategoryRow[]>();
  for (const row of rows) {
    const bucket = byParent.get(row.parentId) ?? [];
    bucket.push(row);
    byParent.set(row.parentId, bucket);
  }
  for (const bucket of byParent.values()) {
    bucket.sort((a, b) => a.displayOrder - b.displayOrder || a.nameEn.localeCompare(b.nameEn));
  }
  const out: CategoryNode[] = [];
  const walk = (parentId: string | null, depth: number) => {
    for (const row of byParent.get(parentId) ?? []) {
      out.push({ ...row, depth });
      walk(row.id, depth + 1);
    }
  };
  walk(null, 0);
  return out;
}
