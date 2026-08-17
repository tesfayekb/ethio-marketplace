import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1c — FORM SECTION (DEC-015 display primitive).
 *
 * A titled block of fields on a responsive grid (always 1-col at 360; 2-col
 * from md when columns=2), plus an actions bar that is STICKY at the bottom
 * on phones — the primary action must be thumb-reachable — and inline from md.
 */

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  help?: string;
  error?: string;
  /** Span both columns in a 2-col section (textareas, long inputs). */
  full?: boolean;
  children: ReactNode;
  testid?: string;
}

export function FormField({
  label,
  htmlFor,
  help,
  error,
  full = false,
  children,
  testid = "form-field",
}: FormFieldProps) {
  return (
    <div data-testid={testid} className={cn("min-w-0 space-y-1", full && "md:col-span-2")}>
      <label
        className="block min-w-0 break-words text-sm font-medium text-foreground"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {help ? <p className="min-w-0 break-words text-xs text-muted-foreground">{help}</p> : null}
      {error ? (
        <p role="alert" className="min-w-0 break-words text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface FormSectionProps {
  title: string;
  description?: string;
  columns?: 1 | 2;
  actions?: ReactNode;
  children: ReactNode;
  testid?: string;
  className?: string;
}

export function FormSection({
  title,
  description,
  columns = 1,
  actions,
  children,
  testid = "form-section",
  className,
}: FormSectionProps) {
  return (
    <PageCard testid={testid} className={cn("min-w-0 space-y-4", className)}>
      <div className="min-w-0 space-y-1">
        <h3 className="min-w-0 break-words text-base font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="min-w-0 break-words text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div
        data-testid={`${testid}-fields`}
        className={cn(
          "grid min-w-0 gap-4",
          columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
        )}
      >
        {children}
      </div>

      {actions ? (
        <div
          data-testid={`${testid}-actions`}
          className="sticky bottom-0 -mx-6 flex min-h-11 min-w-0 flex-wrap items-center gap-3 border-t border-border bg-card px-6 py-3 md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0"
        >
          {actions}
        </div>
      ) : null}
    </PageCard>
  );
}

export default FormSection;
