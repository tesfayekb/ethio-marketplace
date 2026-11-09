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
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { getSupabase } from "@/lib/supabase-door";

/**
 * P-2 (c) c2a (DEC-351 §8, DEC-355) — THE LEVEL ROWS' HOOKS, for a screen with
 * no card answer (the admin console, screening, the owner's and the wizard's
 * previews). Its own module beside the store (levels-store.ts), so the card
 * pages and the ad page, which only seed and parse, carry no reader; the read
 * itself (level-table-read.ts) arrives on demand, so no page's first download
 * carries it.
 */

const TABLE_READ = loadOnce(() =>
  import("@/features/levels/level-table-read").then((module) => module.readLevelTable),
);

type LevelTableRead = typeof import("@/features/levels/level-table-read").readLevelTable;

/** The read's module and the database client, each fetched once; a failed download is the shell's one notice. */
async function readTableOnDemand(): Promise<void> {
  let loaded: [LevelTableRead, Awaited<ReturnType<typeof getSupabase>>];
  try {
    loaded = await Promise.all([TABLE_READ.load(), getSupabase()]);
  } catch (error) {
    reportOnDemandFailure("the level rows' reader", error);
    throw new ReaderError({ class: "network", message: "the level rows' reader did not load" });
  }
  const [read, client] = loaded;
  const parsed = parseLevelRows(await read(client));
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
    oneTableRead(readTableOnDemand).then(
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
