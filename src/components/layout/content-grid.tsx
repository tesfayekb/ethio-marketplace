import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ContentGridSpan = 1 | 2 | 3;

/** The responsive card grid for Settings and overview pages. */
export function ContentGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:[&>[data-grid-span='2']]:col-span-2 lg:[&>[data-grid-span='3']]:col-span-2 2xl:grid-cols-3 2xl:[&>[data-grid-span='3']]:col-span-3",
        className,
      )}
      data-testid="content-grid"
    >
      {children}
    </div>
  );
}

export default ContentGrid;
