import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1c — STAT CARD / STAT GRID (DEC-015 display primitive).
 *
 * A single metric tile and its responsive grid. The grid owns the column
 * count (2-up at 360, 3-up at md, 4-up at lg); the tile owns truncation-free
 * label wrapping and tabular figures so columns of numbers line up.
 */

export type StatTrend = "up" | "down" | "flat";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  delta?: string;
  trend?: StatTrend;
  hint?: string;
  icon?: ReactNode;
  loading?: boolean;
  testid?: string;
  className?: string;
}

const TREND_CLASS: Record<StatTrend, string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

const TREND_MARK: Record<StatTrend, string> = { up: "▲", down: "▼", flat: "■" };

export function StatCard({
  label,
  value,
  delta,
  trend = "flat",
  hint,
  icon,
  loading = false,
  testid = "stat-card",
  className,
}: StatCardProps) {
  const { t } = useI18n();

  if (loading) {
    return (
      <PageCard testid={`${testid}-loading`} className={cn("min-w-0 space-y-3 p-4", className)}>
        <span className="sr-only">{t("prim.state.loading")}</span>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </PageCard>
    );
  }

  return (
    <PageCard testid={testid} className={cn("min-w-0 space-y-1 p-4", className)}>
      <div className="flex min-w-0 items-start gap-2">
        {icon ? (
          <span aria-hidden="true" className="shrink-0 text-muted-foreground">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 break-words text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="min-w-0 break-words text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </div>
      {delta ? (
        <div className={cn("text-sm tabular-nums", TREND_CLASS[trend])}>
          <span aria-hidden="true" className="me-1">
            {TREND_MARK[trend]}
          </span>
          <span>{delta}</span>
        </div>
      ) : null}
      {hint ? <p className="min-w-0 break-words text-xs text-muted-foreground">{hint}</p> : null}
    </PageCard>
  );
}

export function StatGrid({
  children,
  testid = "stat-grid",
  className,
}: {
  children: ReactNode;
  testid?: string;
  className?: string;
}) {
  return (
    <div
      data-testid={testid}
      className={cn("grid min-w-0 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4", className)}
    >
      {children}
    </div>
  );
}

export default StatCard;
