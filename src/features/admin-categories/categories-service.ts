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
  /** C2c — false when the category has no image_url: a missing-assets flag. */
  hasImage: boolean;
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
    hasImage: row.has_image === true,
  }));
}

export interface CreateCategoryInput {
  nameEn: string;
  icon: string;
  parentId: string | null;
  allowListings: boolean;
}

export async function createCategory(input: CreateCategoryInput): Promise<string> {
  /**
   * C2c — the slug is SERVER-DERIVED. The console no longer sends one: the
   * RPC lowercases the name, collapses non-alphanumerics and uniquifies with
   * a numeric suffix, so uniqueness has exactly one authority (F3).
   */
  const { data, error } = await supabase.rpc("admin_create_category", {
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
  /** C2g/INC-143 — NULL is "no expiry"; the console never invents a number. */
  expiryDays: number | null;
}

export async function updateCategory(input: UpdateCategoryInput): Promise<void> {
  const { error } = await supabase.rpc("admin_update_category", {
    p_id: input.id,
    p_name_en: input.nameEn,
    p_icon: input.icon,
    p_display_order: input.displayOrder,
    p_allow_listings: input.allowListings,
    p_price_enabled: input.priceEnabled,
    p_expiry_days: input.expiryDays as number,
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

/**
 * C2c — the CREATE dialog's read-only slug preview. It mirrors the server's
 * derivation (lower, non-alphanumerics → '-', trim '-') but never decides
 * anything: the RPC owns the final value and its uniqueness suffix (F3).
 */
export function deriveSlugPreview(nameEn: string): string {
  const base = nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base === "" ? "category" : base;
}

export interface ParentOption {
  id: string;
  /** The whole browse path, e.g. "Vehicles › Cars › Sedans". */
  label: string;
}

/**
 * C2c — parent pickers offer ACTIVE nodes only, each rendered with its path.
 * A retired node is not a destination: hanging a live category under it would
 * hide the child from browse the moment it is created. C2g adds the catch-all
 * law: an "Other <Root>" bucket is terminal and never a parent — the server
 * refuses it, so the picker never offers it.
 */
export function activeParentOptions(roster: CategoryNode[], excludeId?: string): ParentOption[] {
  const byId = new Map(roster.map((row) => [row.id, row]));
  const pathOf = (row: CategoryNode): string => {
    const parts: string[] = [];
    let current: CategoryNode | undefined = row;
    while (current) {
      parts.unshift(current.nameEn);
      current = current.parentId === null ? undefined : byId.get(current.parentId);
    }
    return parts.join(" › ");
  };
  return roster
    .filter((row) => row.isActive && !row.isCatchall && row.id !== excludeId)
    .map((row) => ({ id: row.id, label: pathOf(row) }));
}

/**
 * C2d — LIFECYCLE. Reactivate is the exact inverse of retire; delete is the
 * one destructive verb, guarded server-side by a typed-slug match, a retired
 * row and a zero listing count (F3). Both re-check permission + step-up in
 * the RPC; the console only carries the confirmation UX.
 */
export async function reactivateCategory(input: { id: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_reactivate_category", { p_id: input.id });
  if (error) throw error;
}

export async function deleteCategory(input: { id: string; confirmSlug: string }): Promise<void> {
  const { error } = await supabase.rpc("admin_delete_category", {
    p_id: input.id,
    p_confirm_slug: input.confirmSlug,
  });
  if (error) throw error;
}

/**
 * C2-UI-FIX-5 — THE ROSTER'S COLUMN CONTRACT (INC-139).
 *
 * The categories roster conforms to the audit table: the DataTable primitive's
 * defaults decide everything. No per-column `minWidth`, no `cardUntil`
 * override, no pinned first column — priorities alone. The map lives here so
 * the conformance is asserted by a unit test without rendering the console.
 */
export const ROSTER_COLUMN_PRIORITIES = {
  name: "primary",
  status: "primary",
  flags: "primary",
  parent: "secondary",
  order: "detail",
  listings: "detail",
  exclusions: "detail",
} as const;
