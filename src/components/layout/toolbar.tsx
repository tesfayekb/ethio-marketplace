import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The single C8 search/filter/action row for list and console pages. */
export function Toolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-end", className)}
      data-testid="layout-toolbar"
    >
      {children}
    </div>
  );
}

export default Toolbar;
