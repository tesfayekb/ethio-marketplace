import { useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";

import { ShellContext } from "@/components/shell-context";

type TableViewAccount = string | null | undefined;

/**
 * INC-1238 (DEC-420) — THE KEPT VIEW, ONE STORE. Per ACCOUNT and per TABLE: the hidden columns,
 * the rows per page and the filters' closed-list choices. `useHiddenColumns` (columns-state.ts)
 * and `useKeptPage` (use-kept-page.ts) are readers of it; `useTableView` is the whole view.
 *
 * - The account comes from the shell's existing context, with no new subscription or read. Not known yet: the
 *   view is the defaults and `ready` is false. No account: nothing read or written, the view
 *   lives only in the hook's own state while mounted. Sign-out removes nothing; another account reads its own key.
 * - ONE COPY IN MEMORY (ruling 1, decision 3): one entry per account and table, every hook a
 *   subscriber (`useSyncExternalStore`), every write a merge into the current entry.
 * - KEPT: column keys, the page size, closed-list filter values. NEVER kept: anything typed,
 *   dates (decision 4) — the caller never hands them to `setFilter`, and `offer` has no place for
 *   them.
 * - READ BACK IS CHECKED by hand-written guards (decision 2: no schema library on a page's first
 *   download): version 1, at most 50 column keys, at most 20 values a filter, each at most 64
 *   characters; a filter value the table does not offer today is dropped by `useTableView`. An
 *   entry that fails a guard reads as nothing.
 * - The server's render and the first browser render agree: the server snapshot is the defaults
 *   with `ready` false, and useSyncExternalStore reconciles the account entry after hydration.
 */

export const TABLE_VIEW_PREFIX = "ethio:view:";
const LEGACY_COLUMNS_PREFIX = "ethio:table-columns:";
const VERSION = 1;
export const MAX_KEPT_COLUMNS = 50;
export const MAX_KEPT_VALUES = 20;
export const MAX_KEPT_TEXT = 64;

/**
 * A page-size key and the columns id of the SAME table (ruling 1, decision 3): one entry. A
 * page-size key not named here is a table of its own, under that key.
 */
const PAGE_KEY_TABLE: Readonly<Record<string, string>> = {
  "ethio.admin.ai.pageSize": "admin-ai",
  "ethio.admin.attributes.pageSize": "admin-attributes",
  "ethio.admin.categories.pageSize": "admin-categories",
  "ethio.admin.countries.pageSize": "admin-countries",
  "ethio.admin.listings.pageSize": "admin-listings",
  "ethio.admin.locations.pageSize": "admin-places",
  "ethio.admin.monetisation.levelOverrides.pageSize": "admin-monetisation-level-overrides",
  "ethio.admin.monetisation.markets.pageSize": "admin-monetisation-markets",
  "ethio.admin.monetisation.productPrices.pageSize": "admin-monetisation-product-prices",
  "ethio.admin.screening.pageSize": "admin-screening",
  "ethio.admin.audit.pageSize": "admin-audit",
  "ethio.admin.impersonation.pageSize": "admin-impersonated-listings",
  "ethio.admin.roles.pageSize": "admin-roles",
  "ethio.admin.data.pageSize": "admin-data",
  "ethio.admin.languages.pageSize": "admin-languages",
  "ethio.admin.strings.pageSize": "admin-strings",
  "ethio.admin.users.pageSize": "admin-users",
  "ethio.myListings.pageSize": "my-listings",
};
/** products-section.tsx keys each block's two stores by its block id. */
const BLOCK_PAGE_KEY = /^ethio\.admin\.monetisation\.([a-z0-9-]+)\.pageSize$/;

export function tableOfPageKey(pageKey: string): string {
  const named = Object.prototype.hasOwnProperty.call(PAGE_KEY_TABLE, pageKey)
    ? PAGE_KEY_TABLE[pageKey]
    : undefined;
  if (named !== undefined) return named;
  const block = BLOCK_PAGE_KEY.exec(pageKey);
  return block?.[1] !== undefined ? `admin-monetisation-${block[1]}` : pageKey;
}

function legacyPageKeyOf(tableId: string): string {
  for (const [pageKey, table] of Object.entries(PAGE_KEY_TABLE)) {
    if (table === tableId) return pageKey;
  }
  const block = /^admin-monetisation-([a-z0-9-]+)$/.exec(tableId);
  return block?.[1] !== undefined ? `ethio.admin.monetisation.${block[1]}.pageSize` : tableId;
}

export interface TableViewEntry {
  readonly hidden: readonly string[];
  readonly pageSize: number | null;
  readonly filters: Readonly<Record<string, readonly string[]>>;
}

const EMPTY: TableViewEntry = Object.freeze({ hidden: [], pageSize: null, filters: {} });

const isText = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0 && value.length <= MAX_KEPT_TEXT;

const isTextList = (value: unknown, max: number): value is string[] =>
  Array.isArray(value) && value.length <= max && value.every(isText);

/** An entry read back from storage, or null when any guard fails. */
export function parseTableViewEntry(raw: string | null): TableViewEntry | null {
  if (raw === null) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    // A broken entry reads as nothing (INC-1238): the defaults stand.
    return null;
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (key !== "v" && key !== "hidden" && key !== "pageSize" && key !== "filters") return null;
  }
  if (record["v"] !== VERSION) return null;
  const hidden = record["hidden"] ?? [];
  if (!isTextList(hidden, MAX_KEPT_COLUMNS)) return null;
  const pageSize = record["pageSize"] ?? null;
  if (pageSize !== null && !(Number.isInteger(pageSize) && (pageSize as number) > 0)) return null;
  const filtersRaw = record["filters"] ?? {};
  if (typeof filtersRaw !== "object" || filtersRaw === null || Array.isArray(filtersRaw)) {
    return null;
  }
  const filters: Record<string, string[]> = {};
  for (const [id, values] of Object.entries(filtersRaw as Record<string, unknown>)) {
    if (!isText(id) || !isTextList(values, MAX_KEPT_VALUES)) return null;
    filters[id] = [...values];
  }
  return { hidden: [...hidden], pageSize: pageSize as number | null, filters };
}

function serialise(entry: TableViewEntry): string {
  return JSON.stringify({
    v: VERSION,
    hidden: entry.hidden,
    ...(entry.pageSize === null ? {} : { pageSize: entry.pageSize }),
    filters: entry.filters,
  });
}

function storageRead(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage that refuses (a private window) is not an error: nothing is kept.
    return null;
  }
}

function storageWrite(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage that refuses is not an error: the choice lasts for the visit.
  }
}

function storageRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage that refuses is not an error: the old key stays, read once more next visit.
  }
}

/** The two old stores, read once as the account's first value, then removed. */
function readLegacy(tableId: string): TableViewEntry | null {
  const columnsKey = LEGACY_COLUMNS_PREFIX + tableId;
  const pageKey = legacyPageKeyOf(tableId);
  const columnsRaw = storageRead(columnsKey);
  const pageRaw = storageRead(pageKey);
  if (columnsRaw === null && pageRaw === null) return null;
  let hidden: string[] = [];
  if (columnsRaw !== null) {
    try {
      const parsed: unknown = JSON.parse(columnsRaw);
      if (Array.isArray(parsed)) hidden = parsed.filter(isText).slice(0, MAX_KEPT_COLUMNS);
    } catch {
      // A broken old entry reads as nothing; it is removed below all the same.
    }
  }
  const size = Number(pageRaw ?? "");
  storageRemove(columnsKey);
  storageRemove(pageKey);
  return { hidden, pageSize: Number.isInteger(size) && size > 0 ? size : null, filters: {} };
}

const memory = new Map<string, TableViewEntry>();
const listeners = new Set<() => void>();

const slotOf = (account: string, tableId: string) => `${account}\u0000${tableId}`;

function entryOf(account: TableViewAccount, tableId: string): TableViewEntry {
  if (account === undefined || account === null) return EMPTY;
  const slot = slotOf(account, tableId);
  const held = memory.get(slot);
  if (held !== undefined) return held;
  let entry: TableViewEntry = EMPTY;
  if (account !== null) {
    const key = `${TABLE_VIEW_PREFIX}${account}:${tableId}`;
    const raw = storageRead(key);
    if (raw !== null) {
      entry = parseTableViewEntry(raw) ?? EMPTY;
    } else {
      const legacy = readLegacy(tableId);
      if (legacy !== null) {
        entry = legacy;
        storageWrite(key, serialise(entry));
      }
    }
  }
  memory.set(slot, entry);
  return entry;
}

function writeEntry(
  account: string,
  tableId: string,
  change: (current: TableViewEntry) => TableViewEntry,
): void {
  const next = change(entryOf(account, tableId));
  memory.set(slotOf(account, tableId), next);
  if (account !== null) storageWrite(`${TABLE_VIEW_PREFIX}${account}:${tableId}`, serialise(next));
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Unit tests only: every test starts with no account known and nothing in memory. */
export function forgetTableViewsForTests(): void {
  memory.clear();
  snapshots.clear();
}

interface Snapshot {
  readonly ready: boolean;
  readonly entry: TableViewEntry;
}
const SERVER_SNAPSHOT: Snapshot = Object.freeze({ ready: false, entry: EMPTY });
const snapshots = new Map<string, Snapshot>();

function snapshotOf(account: TableViewAccount, tableId: string): Snapshot {
  if (account === undefined || account === null) return SERVER_SNAPSHOT;
  const entry = entryOf(account, tableId);
  const id = `${String(account)}\u0000${tableId}`;
  const held = snapshots.get(id);
  if (held !== undefined && held.entry === entry) return held;
  const next = { ready: true, entry };
  snapshots.set(id, next);
  return next;
}

/** Account-bound writers: a detached table keeps only its own mounted state. */
export function useTableEntry(tableId: string) {
  const shell = useContext(ShellContext);
  const account = shell?.authLoading ? undefined : (shell?.user?.id ?? null);
  const [local, setLocal] = useState<TableViewEntry>(EMPTY);
  const read = useCallback(() => snapshotOf(account, tableId), [account, tableId]);
  const snapshot = useSyncExternalStore(subscribe, read, () => SERVER_SNAPSHOT);
  const write = useCallback(
    (change: (current: TableViewEntry) => TableViewEntry) => {
      if (account === undefined) return;
      if (account === null) setLocal(change);
      else writeEntry(account, tableId, change);
    },
    [account, tableId],
  );
  const setHidden = useCallback(
    (key: string, visible: boolean) =>
      write((current) => ({
        ...current,
        hidden: visible
          ? current.hidden.filter((k) => k !== key)
          : [...new Set([...current.hidden, key])].slice(0, MAX_KEPT_COLUMNS),
      })),
    [write],
  );
  const setPageSize = useCallback(
    (size: number) => write((current) => ({ ...current, pageSize: size })),
    [write],
  );
  const setFilter = useCallback(
    (filterId: string, values: readonly string[]) => {
      if (!isText(filterId)) return;
      const kept = values.filter(isText).slice(0, MAX_KEPT_VALUES);
      write((current) => {
        const filters = { ...current.filters };
        if (kept.length === 0) delete filters[filterId];
        else filters[filterId] = kept;
        return { ...current, filters };
      });
    },
    [write],
  );
  const clearFilters = useCallback(
    () => write((current) => ({ ...current, filters: {} })),
    [write],
  );
  return {
    ready: account !== undefined && (account === null || snapshot.ready),
    entry: account === null ? local : snapshot.entry,
    setHidden,
    setPageSize,
    setFilter,
    clearFilters,
  };
}

/** Per filter id, the values the table offers TODAY; a kept value outside it is dropped. */
export type TableViewOffer = Readonly<Record<string, readonly string[]>>;

/**
 * The whole kept view of one table. `filters` holds only today's offered values, so a retired
 * category or a market no longer open is never drawn and never sent to a door.
 */
export function useTableView(tableId: string, offer: TableViewOffer) {
  const { ready, entry, setFilter, clearFilters } = useTableEntry(tableId);
  const offerKey = JSON.stringify(offer);
  const filters = useMemo(() => {
    const allowed: TableViewOffer = JSON.parse(offerKey) as TableViewOffer;
    const out: Record<string, readonly string[]> = {};
    for (const [id, values] of Object.entries(entry.filters)) {
      const today = Object.prototype.hasOwnProperty.call(allowed, id) ? allowed[id] : undefined;
      if (today === undefined) continue;
      const kept = values.filter((value) => today.includes(value));
      if (kept.length > 0) out[id] = kept;
    }
    return out;
  }, [entry.filters, offerKey]);
  return {
    ready,
    hidden: entry.hidden,
    pageSize: entry.pageSize,
    filters,
    setFilter,
    clearFilters,
  };
}
