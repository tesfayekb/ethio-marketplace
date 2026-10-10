import type { ReactNode } from "react";

/**
 * BUNDLE 11 B1 (D83, D118) — THE TABLE PAGE'S HEADER ACTIONS, one place for
 * every admin list: the page's own actions on one row above the table, at its
 * end — the plain ones (Export, Import) first, the one primary action
 * ("New …") last. A page with no action renders nothing here.
 */
export function TableActions({ testid, children }: { testid: string; children?: ReactNode }) {
  if (children === null || children === undefined || children === false) return null;
  return (
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center justify-end gap-2">
      {children}
    </div>
  );
}
