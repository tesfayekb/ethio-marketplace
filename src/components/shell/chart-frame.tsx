import { useEffect, useRef, useState, type ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1c — CHART FRAME (DEC-015 display primitive).
 *
 * Owns the box a chart lives in: title, description, legend placement,
 * aspect ratio and — critically — measurement. The child is a render prop
 * receiving the measured {width, height} of the plot area, so no chart
 * library ever reads the window or overflows the card.
 */

export type ChartAspect = "16/9" | "4/3" | "square";

const RATIO: Record<ChartAspect, number> = { "16/9": 9 / 16, "4/3": 3 / 4, square: 1 };

export interface ChartFrameProps {
  title: string;
  description?: string;
  aspect?: ChartAspect;
  legend?: "top" | "bottom";
  legendContent?: ReactNode;
  children: (size: { width: number; height: number }) => ReactNode;
  loading?: boolean;
  empty?: boolean;
  error?: unknown;
  testid?: string;
  className?: string;
}

export function ChartFrame({
  title,
  description,
  aspect = "16/9",
  legend = "bottom",
  legendContent,
  children,
  loading = false,
  empty = false,
  error,
  testid = "chart-frame",
  className,
}: ChartFrameProps) {
  const { t } = useI18n();
  const plotRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = plotRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(node);
    setWidth(Math.floor(node.getBoundingClientRect().width));
    return () => observer.disconnect();
  }, []);

  const height = Math.max(120, Math.round(width * RATIO[aspect]));

  const legendBlock = legendContent ? (
    <div
      data-testid={`${testid}-legend`}
      className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 text-xs"
    >
      {legendContent}
    </div>
  ) : null;

  let body: ReactNode;
  if (loading) {
    body = (
      <div data-testid={`${testid}-loading`} className="min-w-0">
        <span className="sr-only">{t("prim.state.loading")}</span>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  } else if (error) {
    body = (
      <p data-testid={`${testid}-error`} className="text-sm text-destructive">
        {t("prim.state.error")}
      </p>
    );
  } else if (empty) {
    body = (
      <p data-testid={`${testid}-empty`} className="text-sm text-muted-foreground">
        {t("prim.state.empty")}
      </p>
    );
  } else {
    body = (
      <div
        ref={plotRef}
        data-testid={`${testid}-plot`}
        className="min-w-0 overflow-hidden"
        style={{ height }}
      >
        {width > 0 ? children({ width, height }) : null}
      </div>
    );
  }

  return (
    <PageCard testid={testid} className={cn("min-w-0 space-y-3", className)}>
      <div className="min-w-0 space-y-1">
        <h3 className="min-w-0 break-words text-base font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="min-w-0 break-words text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {legend === "top" ? legendBlock : null}
      <div className="min-w-0">{body}</div>
      {legend === "bottom" ? legendBlock : null}
    </PageCard>
  );
}

export default ChartFrame;
