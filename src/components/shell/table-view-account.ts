/**
 * INC-1238 (DEC-420) — WHOSE TABLE VIEW. The one cell that says which account the kept table
 * views belong to, set by the shell from what it already holds (`useAuth`, app-shell.tsx) and
 * read by the store (table-view-store.ts). `undefined` is not known yet (the server's render, the
 * first paint, a session still being read); `null` is no account: nothing is read or written and
 * a choice lasts for the visit. This module stays this small: the shell sits on every page.
 */
export type TableViewAccount = string | null | undefined;

let account: TableViewAccount = undefined;
const listeners = new Set<() => void>();

export function reportTableViewAccount(next: TableViewAccount): void {
  if (next === account) return;
  account = next;
  for (const listener of listeners) listener();
}

export function tableViewAccount(): TableViewAccount {
  return account;
}

export function subscribeTableViewAccount(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
