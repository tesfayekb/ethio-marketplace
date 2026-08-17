import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1c — DETAIL PANEL (DEC-015 display primitive).
 *
 * Read-only key/value pairs: 1-col at 360, 2-col at md. Values WRAP — a
 * detail panel never truncates silently, because the value is the payload.
 */

export interface DetailPair {
  label: string;
  value: ReactNode;
  hint?: string;
}

export interface DetailPanelProps {
  title?: string;
  pairs: DetailPair[];
  loading?: boolean;
  error?: unknown;
  testid?: string;
  className?: string;
}

export function DetailPanel({
  title,
  pairs,
  loading = false,
  error,
  testid = "detail-panel",
  className,
}: DetailPanelProps) {
  const { t } = useI18n();

  if (loading) {
    return (
      <PageCard testid={`${testid}-loading`} className={cn("min-w-0 space-y-3", className)}>
        <span className="sr-only">{t("prim.state.loading")}</span>
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </PageCard>
    );
  }
  if (error) {
    return (
      <PageCard testid={`${testid}-error`} className={cn("min-w-0", className)}>
        <p className="text-sm text-destructive">{t("prim.state.error")}</p>
      </PageCard>
    );
  }
  if (pairs.length === 0) {
    return (
      <PageCard testid={`${testid}-empty`} className={cn("min-w-0", className)}>
        <p className="text-sm text-muted-foreground">{t("prim.state.empty")}</p>
      </PageCard>
    );
  }

  return (
    <PageCard testid={testid} className={cn("min-w-0 space-y-4", className)}>
      {title ? (
        <h3 className="min-w-0 break-words text-base font-semibold text-foreground">{title}</h3>
      ) : null}
      <dl className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        {pairs.map((pair, index) => (
          <div key={`${pair.label}-${index}`} className="min-w-0 space-y-1">
            <dt className="min-w-0 break-words text-xs font-medium uppercase text-muted-foreground">
              {pair.label}
            </dt>
            <dd className="min-w-0 break-words text-sm text-foreground">{pair.value}</dd>
            {pair.hint ? (
              <p className="min-w-0 break-words text-xs text-muted-foreground">{pair.hint}</p>
            ) : null}
          </div>
        ))}
      </dl>
    </PageCard>
  );
}

export default DetailPanel;
