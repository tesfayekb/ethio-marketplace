import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ContentGridSpan = 1 | 2 | 3;

export function contentGridSpan(span: ContentGridSpan): string {
  return span === 3 ? "lg:col-span-2 2xl:col-span-3" : span === 2 ? "lg:col-span-2" : "";
}

/** The responsive card grid for Settings and overview pages. */
export function ContentGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6 2xl:grid-cols-3",
        className,
      )}
      data-testid="content-grid"
    >
      {children}
    </div>
  );
}

export default ContentGrid;
