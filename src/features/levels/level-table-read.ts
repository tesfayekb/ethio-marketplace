import { readAllPages } from "@/lib/read-all-pages";
import type { getSupabase } from "@/lib/supabase-door";

/**
 * P-2 (c) c2a (DEC-351 §8, DEC-355) — THE LEVEL ROWS' TABLE READ, fetched on
 * demand by use-level-rows.ts (`loadOnce`), so no page's first download carries
 * the read, its pager or its query: a screen with no card answer asks for it
 * once it draws. The hook hands it the client and parses and holds the rows it
 * answers, so this module shares no code with the store or the shell.
 */

type Client = Awaited<ReturnType<typeof getSupabase>>;

type TableRow = {
  key: string;
  sort: number;
  name_en: string;
  name_am: string | null;
  is_baseline: boolean;
  placement: string | null;
  badge: boolean;
};

/** The one table read: the enabled level rows browser roles see (RLS), keyset by key. */
export function readLevelTable(client: Client): Promise<readonly TableRow[]> {
  return readAllPages<TableRow>(
    (after, limit) => {
      const query = client
        .from("listing_packages")
        .select("key, sort, name_en, name_am, is_baseline, placement, badge")
        .eq("kind", "level")
        .eq("enabled", true)
        .order("key")
        .limit(limit);
      return after === null ? query : query.gt("key", after);
    },
    (row) => row.key,
  );
}
