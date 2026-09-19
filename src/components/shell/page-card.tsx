import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const PAGE_CARD_CLASS = "rounded-lg border border-border bg-card p-6";

/**
 * @deprecated LAYOUT-1: content pages use `Section`; this framed block remains
 * for the narrow authentication family and low-level compatibility only.
 */
export function PageCard({
  children,
  className,
  /** Placeholder/coming-soon blocks use the dashed edge. */
  dashed = false,
  testid = "page-card",
  as: As = "section",
  ...props
}: {
  children: ReactNode;
  className?: string;
  dashed?: boolean;
  testid?: string;
  as?: "section" | "div";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <As
      data-testid={testid}
      className={cn(PAGE_CARD_CLASS, dashed && "border-dashed", className)}
      {...props}
    >
      {children}
    </As>
  );
}

export default PageCard;
