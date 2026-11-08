import { useEffect, useState, useSyncExternalStore } from "react";

import { isBoolOrNull, isRec, isStrOrNull, type LevelLook } from "@/features/levels/level-fields";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { readAllPages } from "@/lib/read-all-pages";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { getSupabase } from "@/lib/supabase-door";

/**
 * P-2 (c) c2a (DEC-351 §8, DEC-352) — THE LEVEL ROWS, ONE STORE. A level is a
 * `listing_packages` row of kind `level`, never a word. Every card answer
 * (feed_page, seller_feed_page, my_saved_listings) carries one `levels`
 * dictionary — the enabled rows' key, sort, names and baseline flag — and each
 * card its own resolved look (`level: {key, placement, badge}`, from
 * `level_perks_for` through the feed index). The parsers here read both; the
 * card readers seed the store from the dictionary in the browser; a screen
 * with no card answer (the admin console, screening, the owner's previews)
 * reads the enabled rows once, with their base look. Nothing is written to the
 * store during a server render, so one request's rows never reach another's.
 * The pure fields (the look, the card's and the ad document's level, the one
 * name chooser `levelNameOf`) live in level-fields.ts.
 */

export interface LevelRow {
  key: string;
  sort: number;
  nameEn: string;
  nameAm: string | null;
  isBaseline: boolean;
  /** The row's base look — only from the table read; a card answer's dictionary carries none. */
  look: LevelLook | null;
}

/** One dictionary or table row, or null on any mismatch. */
function parseLevelRow(value: unknown): LevelRow | null {
  if (!isRec(value)) return null;
  const { key, sort, name_en, name_am, is_baseline } = value;
  if (typeof key !== "string" || key === "") return null;
  if (typeof sort !== "number" || !Number.isFinite(sort)) return null;
  if (typeof name_en !== "string" || !isStrOrNull(name_am)) return null;
  if (typeof is_baseline !== "boolean") return null;
  const hasLook = "placement" in value || "badge" in value;
  const placement = value.placement === undefined ? null : value.placement;
  const badge = value.badge === undefined ? null : value.badge;
  if (!isStrOrNull(placement) || !isBoolOrNull(badge)) return null;
  return {
    key,
    sort,
    nameEn: name_en,
    nameAm: name_am,
    isBaseline: is_baseline,
    look: hasLook ? { placement, badge } : null,
  };
}

/** The answer's `levels` or the table's rows, in (sort, key) order; null when any row is malformed. */
export function parseLevelRows(value: unknown): LevelRow[] | null {
  if (!Array.isArray(value)) return null;
  const rows: LevelRow[] = [];
  for (const item of value) {
    const row = parseLevelRow(item);
    if (row === null) return null;
    rows.push(row);
  }
  return rows.sort((a, b) => a.sort - b.sort || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
}

/** The row of `key`, else the baseline row (INC-1079: an unknown key keeps its card); null without either. */
export function levelOf(rows: readonly LevelRow[], key: string | null): LevelRow | null {
  const own = key === null ? undefined : rows.find((row) => row.key === key);
  return own ?? rows.find((row) => row.isBaseline) ?? null;
}

/** The row of exactly `key` (a flag's word names only its own level); null when the rows hold none. */
export function exactLevel(rows: readonly LevelRow[], key: string | null): LevelRow | null {
  return (key === null ? undefined : rows.find((row) => row.key === key)) ?? null;
}

/** The base look of `key` from the table's rows (its own row's, else the baseline's); null while not known. */
export function levelLook(rows: readonly LevelRow[], key: string | null): LevelLook | null {
  return key === null ? null : (levelOf(rows, key)?.look ?? null);
}

type Source = "none" | "answer" | "table";

let held: { rows: readonly LevelRow[]; source: Source } = { rows: [], source: "none" };
const listeners = new Set<() => void>();
let tableRead: Promise<void> | null = null;

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function sameRows(a: readonly LevelRow[], b: readonly LevelRow[]): boolean {
  return (
    a.length === b.length &&
    a.every((row, index) => {
      const other = b[index];
      return (
        other !== undefined &&
        row.key === other.key &&
        row.sort === other.sort &&
        row.nameEn === other.nameEn &&
        row.nameAm === other.nameAm &&
        row.isBaseline === other.isBaseline &&
        row.look?.placement === other.look?.placement &&
        row.look?.badge === other.look?.badge
      );
    })
  );
}

function hold(rows: readonly LevelRow[], source: Source): void {
  if (held.source === source && sameRows(held.rows, rows)) return;
  held = { rows, source };
  for (const listener of listeners) listener();
}

/**
 * The browser's seed from a card answer's dictionary; equality-guarded, and a
 * no-op during a server render. A held table read (which carries the looks)
 * is never replaced by a dictionary.
 */
export function seedLevelRows(rows: readonly LevelRow[]): void {
  if (typeof window === "undefined") return;
  if (held.source === "table") return;
  hold(rows, "answer");
}

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
  hold(parsed, "table");
}

function loadLevelTable(): Promise<void> {
  if (tableRead === null) {
    tableRead = readLevelTable().catch((error: unknown) => {
      tableRead = null;
      throw error;
    });
  }
  return tableRead;
}

export interface UseLevelRowsResult {
  rows: readonly LevelRow[];
  isLoading: boolean;
  /** F4 — a failed read is the screen's error state, never an empty list. */
  error: ReaderError | null;
}

const NO_ROWS: readonly LevelRow[] = [];

function served(looks: boolean): boolean {
  return held.source === "table" || (!looks && held.source === "answer");
}

/**
 * The level rows for a screen with no card answer: read once per page life
 * from the table (with each row's base look), shared by every reader. A screen
 * that needs only names and keys (`looks: false`) is served by a dictionary a
 * card answer already seeded, with no read.
 */
export function useLevelRows(options: { looks?: boolean } = {}): UseLevelRowsResult {
  const looks = options.looks !== false;
  const rows = useSyncExternalStore(
    subscribe,
    () => (served(looks) ? held.rows : NO_ROWS),
    () => NO_ROWS,
  );
  const [isLoading, setIsLoading] = useState(!served(looks));
  const [error, setError] = useState<ReaderError | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (served(looks)) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    loadLevelTable().then(
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

/** The store's held rows and their source, for tests. */
export function heldLevelRows(): { rows: readonly LevelRow[]; source: Source } {
  return held;
}

/** Empties the store between tests. */
export function resetLevelRows(): void {
  held = { rows: [], source: "none" };
  tableRead = null;
}
