import { holdTableRows, parseLevelRows } from "@/features/levels/levels-store";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { readAllPages } from "@/lib/read-all-pages";
import { ReaderError } from "@/lib/reader-failure";
import { getSupabase } from "@/lib/supabase-door";

/**
 * P-2 (c) c2a (DEC-351 §8, DEC-355) — THE LEVEL ROWS' TABLE READ, fetched on
 * demand by use-level-rows.ts (`loadOnce`), so no page's first download carries
 * the read, its pager or its query: a screen with no card answer asks for it
 * once it draws.
 */

type TableRow = {
  key: string;
  sort: number;
  name_en: string;
  name_am: string | null;
  is_baseline: boolean;
  placement: string | null;
  badge: boolean;
};

/** The database client, fetched on demand; a failed download is the shell's one notice. */
async function levelClient() {
  try {
    return await getSupabase();
  } catch (error) {
    reportOnDemandFailure("the level rows' reader", error);
    throw new ReaderError({ class: "network", message: "the level rows' reader did not load" });
  }
}

/** The one table read: the enabled level rows browser roles see (RLS), keyset by key. */
export async function readLevelTable(): Promise<void> {
  const client = await levelClient();
  const rows = await readAllPages<TableRow>(
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
  const parsed = parseLevelRows(rows);
  if (parsed === null) {
    throw new ReaderError({ class: "malformed", message: "listing_packages: a level row" });
  }
  holdTableRows(parsed);
}
