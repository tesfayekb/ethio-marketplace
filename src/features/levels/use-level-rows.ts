import { useEffect, useState, useSyncExternalStore } from "react";

import type { LevelLook } from "@/features/levels/level-fields";
import {
  holdTableRows,
  levelLook,
  oneTableRead,
  parseLevelRows,
  servedRows,
  subscribeLevelRows,
  type LevelRow,
} from "@/features/levels/levels-store";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { readAllPages } from "@/lib/read-all-pages";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { getSupabase } from "@/lib/supabase-door";

/**
 * P-2 (c) c2a (DEC-351 §8) — THE LEVEL ROWS' TABLE READ, for a screen with no
 * card answer (the admin console, screening, the owner's and the wizard's
 * previews). Its own module beside the store (levels-store.ts), so the card
 * pages and the ad page, which only seed and parse, carry no reader and no
 * database client in their first download.
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
async function readLevelTable(): Promise<void> {
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

export interface UseLevelRowsResult {
  rows: readonly LevelRow[];
  isLoading: boolean;
  /** F4 — a failed read is the screen's error state, never an empty list. */
  error: ReaderError | null;
}

const NO_ROWS: readonly LevelRow[] = [];

/**
 * The level rows for a screen with no card answer: read once per page life
 * from the table (with each row's base look), shared by every reader. A screen
 * that needs only names and keys (`looks: false`) is served by a dictionary a
 * card answer already seeded, with no read.
 */
export function useLevelRows(options: { looks?: boolean } = {}): UseLevelRowsResult {
  const looks = options.looks !== false;
  const rows = useSyncExternalStore(
    subscribeLevelRows,
    () => servedRows(looks) ?? NO_ROWS,
    () => NO_ROWS,
  );
  const [isLoading, setIsLoading] = useState(servedRows(looks) === null);
  const [error, setError] = useState<ReaderError | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (servedRows(looks) !== null) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    oneTableRead(readLevelTable).then(
      () => {
        if (!cancelled) setIsLoading(false);
      },
      (failure: unknown) => {
        if (cancelled) return;
        const read = readerFailure(failure);
        console.error("[levels] the level rows read failed", read.message);
        setError(new ReaderError(read));
        setIsLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [looks]);
  return { rows, isLoading, error };
}

/**
 * The look a preview with no card answer draws (the owner's and staff's views of an ad): the
 * level row's base look from the table read; null (the free look) while not known or when the
 * read failed (the store logs the failure).
 */
export function useLevelLook(key: string | null): LevelLook | null {
  const { rows } = useLevelRows();
  return levelLook(rows, key);
}
