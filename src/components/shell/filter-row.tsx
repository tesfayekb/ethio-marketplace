import type { ReactNode } from "react";

/**
 * Bundle 2 (INC-1146) — a table filter's ROW: its name, its control beside it (stacked below
 * sm). Presentational: a page wires it in a later bundle.
 */
export function FilterRow({
  label,
  htmlFor,
  children,
  testId,
}: {
  label: string;
  /** The control's id, so the name labels it. */
  htmlFor?: string;
  children: ReactNode;
  testId?: string;
}) {
  return (
    <div
      data-filter-row=""
      data-testid={testId}
      className="grid min-w-0 grid-cols-1 items-center gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-3"
    >
      <label htmlFor={htmlFor} className="truncate text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
