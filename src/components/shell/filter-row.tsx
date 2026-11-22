import type { ReactNode } from "react";

/**
 * Bundle 2 (INC-1146) — a table filter's ROW: its name and its control beside it at every width. Presentational: a page wires it in a later bundle.
 */
export function FilterRow({
  label,
  htmlFor,
  children,
  testId,
  dates = false,
}: {
  label: string;
  /** The control's id, so the name labels it. */
  htmlFor?: string;
  children: ReactNode;
  testId?: string;
  /** Only the date pair may occupy a second row. */
  dates?: boolean;
}) {
  return (
    <div
      data-filter-row=""
      data-testid={testId}
      className="flex min-w-0 flex-wrap items-center gap-3"
    >
      <label
        htmlFor={htmlFor}
        title={label}
        className="w-1/3 min-w-0 truncate text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className={dates ? "w-full min-w-0" : "min-w-0 flex-1"}>{children}</div>
    </div>
  );
}
