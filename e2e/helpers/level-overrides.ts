import { baselineLevelKey } from "./listing-seed";
import { adminClient } from "./users";

/**
 * P-2 (c) (D311, ruling 1 §2, ruling 2 point 2; G27, J3) — A SCRATCH PHOTO CAP.
 * An ad's photo cap is its level's `max_photos` through `level_perks_for` (the
 * door's `listing_photo_cap`, the schema's `plan` block for a new ad), and a
 * `level_overrides` row of a main category overrides it. A spec that counts
 * photos against the cap seeds such a row for the baseline level in its own
 * scratch category (every country), and reads its expectation from the row it
 * wrote — never the real baseline row, never a literal.
 *
 * The scratch cap differs from the baseline row's own, so a reader that skipped
 * the override cannot pass. The row references the category: the spec destroys
 * it (`destroyLevelOverride`, from an `afterEach`) before the category.
 */
export async function seedBaselinePhotoCap(
  categoryId: string,
): Promise<{ id: string; maxPhotos: number }> {
  const level = await baselineLevelKey();
  const supabase = adminClient();
  const own = await supabase
    .from("listing_packages")
    .select("max_photos")
    .eq("key", level)
    .single();
  if (own.error || !own.data) {
    throw new Error(
      `[e2e:cap] reading the baseline level failed: ${own.error?.message ?? "no row"}`,
    );
  }
  const scratch = own.data.max_photos === 3 ? 2 : 3;
  const { data, error } = await supabase
    .from("level_overrides")
    .insert({ level_key: level, category_id: categoryId, country_code: null, max_photos: scratch })
    .select("id, max_photos")
    .single();
  if (error || !data || typeof data.max_photos !== "number") {
    throw new Error(`[e2e:cap] seeding the photo cap failed: ${error?.message ?? "no row"}`);
  }
  return { id: String(data.id), maxPhotos: data.max_photos };
}

/** J3 — removes a scratch override; throws on failure. */
export async function destroyLevelOverride(id: string): Promise<void> {
  const { error } = await adminClient().from("level_overrides").delete().eq("id", id);
  if (error) throw new Error(`[e2e:cap] removing override ${id} failed: ${error.message}`);
}
