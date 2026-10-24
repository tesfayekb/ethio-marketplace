import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * Foundations turn 3 (DEC-237) — "THIS LISTING IS THE CALLER'S": one read AS
 * THE CALLER, carrying both conditions — the id and the seller — never a
 * caller-scoped read alone (INC-830). The three outcomes stay distinct; each
 * route maps them to its own answers.
 */
export type Row<C extends string> = Record<string, unknown> & { readonly __columns?: C };

export type OwnListingOutcome<C extends string> =
  | { row: Row<C> }
  | { error: PostgrestError }
  | { row: null };

export async function ownListing<C extends string>(
  supabase: SupabaseClient<Database>,
  userId: string,
  listingId: string,
  columns: C,
): Promise<OwnListingOutcome<C>> {
  const { data, error } = await supabase
    .from("listings")
    .select(columns)
    .eq("id", listingId)
    .eq("seller_id", userId)
    .maybeSingle();
  if (error) return { error };
  if (data === null) return { row: null };
  return { row: data as unknown as Row<C> };
}
